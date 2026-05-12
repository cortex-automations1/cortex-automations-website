"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

const hiddenOffset: Record<Direction, string> = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "translate-x-10",
  right: "-translate-x-10",
};

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  className?: string;
}

function useReveal(rootMargin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, visible] as const;
}

export function ScrollReveal({
  children,
  direction = "up",
  duration = 0.6,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${Math.round(duration * 1000)}ms`,
        transitionDelay: `${Math.round(delay * 1000)}ms`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
      className={cn(
        "transition-[opacity,transform] motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${hiddenOffset[direction]}`,
        className,
      )}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

// Internal prop used by StaggerContainer to pass per-child reveal state
// down to StaggerItem. Not part of the public API; consumers don't
// pass __stagger directly.
type InternalStagger = { visible: boolean; delay: number };

export function StaggerContainer({
  children,
  stagger = 0.1,
  className,
}: StaggerContainerProps) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as ReactElement<{ __stagger?: InternalStagger }>, {
          __stagger: { visible, delay: i * stagger },
        });
      })}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  __stagger?: InternalStagger;
}

export function StaggerItem({ children, className, __stagger }: StaggerItemProps) {
  const visible = __stagger?.visible ?? true;
  const delay = __stagger?.delay ?? 0;
  return (
    <div
      style={{
        transitionDelay: `${Math.round(delay * 1000)}ms`,
        transitionDuration: "500ms",
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
      className={cn(
        "transition-[opacity,transform] motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
