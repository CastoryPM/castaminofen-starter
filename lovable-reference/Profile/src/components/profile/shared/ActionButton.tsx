import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const actionButtonVariants = cva(
  "silk inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50",
  {
    variants: {
      variant: {
        ember:
          "bg-ember-gradient text-ember-foreground hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0",
        outline:
          "border border-border bg-surface/60 text-foreground backdrop-blur hover:border-primary/50 hover:bg-surface",
        ghost: "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
        quiet: "bg-surface-2 text-foreground hover:bg-surface-2/70",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof actionButtonVariants>;

export function ActionButton({ className, variant, size, ...props }: Props) {
  return <button className={cn(actionButtonVariants({ variant, size }), className)} {...props} />;
}