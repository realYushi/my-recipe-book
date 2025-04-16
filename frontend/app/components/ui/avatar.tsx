import * as React from "react";
import { cn } from "~/lib/utils";

export function Avatar({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div
            className={cn(
                "relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
                className
            )}
            {...props}
        />
    );
}

export function AvatarImage({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"img">) {
    return (
        <img
            className={cn("h-full w-full rounded-full", className)}
            {...props}
        />
    );
}

export function AvatarFallback({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"span">) {
    return (
        <span
            className={cn(
                "flex h-full w-full items-center justify-center rounded-full bg-muted",
                className
            )}
            {...props}
        />
    );
}