"""
Measure transferred bytes + Core Web Vitals for a deployed page.
Mobile-emulated (iPhone-class), cold-cache load. Usage: python scripts/measure-bundle.py <url>
"""
import sys, json, time
from collections import defaultdict
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "https://cortexautomations.ai/"

WEB_VITALS_JS = r"""
() => new Promise((resolve) => {
  const vitals = { fcp: null, lcp: null, cls: 0, ttfb: null };

  const nav = performance.getEntriesByType('navigation')[0];
  if (nav) vitals.ttfb = nav.responseStart;

  const paints = performance.getEntriesByType('paint');
  const fcp = paints.find(p => p.name === 'first-contentful-paint');
  if (fcp) vitals.fcp = fcp.startTime;

  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) vitals.lcp = last.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {}

  try {
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (!e.hadRecentInput) vitals.cls += e.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (e) {}

  setTimeout(() => resolve(vitals), 4000);
});
"""

def categorize(url, content_type):
    ct = (content_type or "").lower()
    if "javascript" in ct or url.endswith(".js"): return "js"
    if "css" in ct or url.endswith(".css"): return "css"
    if "html" in ct: return "html"
    if "font" in ct or any(url.endswith(e) for e in [".woff", ".woff2", ".ttf", ".otf"]): return "font"
    if "image" in ct or any(url.endswith(e) for e in [".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg", ".gif", ".ico"]): return "image"
    if "json" in ct: return "json"
    return "other"

def main():
    results = {"resources": [], "by_type": defaultdict(lambda: {"count": 0, "bytes": 0})}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=3,
            is_mobile=True,
            has_touch=True,
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        )
        page = ctx.new_page()

        def on_response(resp):
            try:
                hdrs = resp.headers
                size = int(hdrs.get("content-length") or 0)
                if size == 0:
                    try:
                        body = resp.body()
                        size = len(body)
                    except Exception:
                        size = 0
                cat = categorize(resp.url, hdrs.get("content-type", ""))
                results["resources"].append({
                    "url": resp.url, "type": cat, "status": resp.status, "bytes": size,
                })
                results["by_type"][cat]["count"] += 1
                results["by_type"][cat]["bytes"] += size
            except Exception as e:
                pass

        page.on("response", on_response)

        t0 = time.time()
        page.goto(URL, wait_until="load", timeout=60000)
        page.wait_for_load_state("networkidle", timeout=30000)
        load_ms = (time.time() - t0) * 1000

        vitals = page.evaluate(WEB_VITALS_JS)

        total_bytes = sum(t["bytes"] for t in results["by_type"].values())
        js_chunks = sorted(
            [r for r in results["resources"] if r["type"] == "js"],
            key=lambda r: -r["bytes"],
        )

        print("=" * 70)
        print(f"URL: {URL}")
        print(f"Mobile: 390x844, iPhone UA, cold cache")
        print(f"Wall time to networkidle: {load_ms:.0f} ms")
        print("=" * 70)
        print("\nCore Web Vitals:")
        print(f"  TTFB: {vitals['ttfb']:.0f} ms" if vitals['ttfb'] else "  TTFB: n/a")
        print(f"  FCP:  {vitals['fcp']:.0f} ms" if vitals['fcp'] else "  FCP:  n/a")
        print(f"  LCP:  {vitals['lcp']:.0f} ms" if vitals['lcp'] else "  LCP:  n/a")
        print(f"  CLS:  {vitals['cls']:.4f}")

        print(f"\nTotal transferred: {total_bytes:,} bytes ({total_bytes/1024:.1f} KB)")
        print("\nBy type:")
        for t in sorted(results["by_type"].keys(), key=lambda k: -results["by_type"][k]["bytes"]):
            v = results["by_type"][t]
            print(f"  {t:7} {v['count']:3} files  {v['bytes']:>9,} B  ({v['bytes']/1024:.1f} KB)")

        print(f"\nTop JS chunks ({len(js_chunks)} total):")
        for r in js_chunks[:15]:
            print(f"  {r['bytes']:>8,} B  {r['url']}")

        print(f"\nAll 'other' resources:")
        for r in [x for x in results["resources"] if x["type"] == "other"]:
            print(f"  {r['bytes']:>8,} B  {r['url']}")

        browser.close()

if __name__ == "__main__":
    main()
