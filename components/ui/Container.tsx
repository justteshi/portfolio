import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps<T extends ElementType> = { as?: T; children: ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Container<T extends ElementType = "div">({ as, children, className, ...props }: ContainerProps<T>) {
  const Component = as ?? "div";
  return <Component className={cn("container-shell", className)} {...props}>{children}</Component>;
}
