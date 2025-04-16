import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "~/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogPortal = ({children} : {children: React.ReactNode}) => (
    <DialogPrimitive.Portal>{children}</DialogPrimitive.Portal>
);

const DialogOverlay = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.DialogOverlay>
>(
    ({ className, ...props }, ref) => (
        <DialogPrimitive.Overlay
            ref={ref}
            className={cn(
                "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-80",
                className
            )}
            {...props}
        /> 
    )
);

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(
    ({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, ref: React.Ref<HTMLDivElement>) => (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    "fixed z-50 grid w-full gap-4 border bg-background p-6 shadow-lg animate-in fade-in-80 data-[state=closed]:animate-out slide-out-to-top",
                    "sm:max-w-sm sm:rounded-lg",
                    className
                )}
                {...props}
            >
                {children}
                <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                    <span aria-hidden>×</span>
                </DialogClose>
            </DialogPrimitive.Content>
        </DialogPortal>
    )
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn("flex flex-col space-y-1", className)} {...props} />
);
const DialogDescription = DialogPrimitive.Description;
const DialogTitle = DialogPrimitive.Title;
const DialogFooter = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-row-reverse justify-end space-x-2 space-x-reverse py-4 pt-0">
        {children}
    </div>
);

export {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
};
