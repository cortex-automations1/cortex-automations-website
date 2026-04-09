import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle gradient accent */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(91, 127, 255, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          {/* Logo text */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-2px",
              }}
            >
              Cortex
            </span>
            <span
              style={{
                fontSize: "72px",
                fontWeight: 700,
                color: "#5B7FFF",
                letterSpacing: "-2px",
              }}
            >
              Automations
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: 500,
              color: "#9ca3af",
              marginBottom: "16px",
            }}
          >
            Custom Software Development
          </div>

          {/* Services line */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#6b7280",
              display: "flex",
              gap: "8px",
            }}
          >
            SaaS Platforms · Websites · Mobile Apps · AI Automations
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
