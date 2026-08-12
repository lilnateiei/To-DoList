import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        secondary:
          "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
        destructive:
          "border-transparent bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]",
        outline: "text-[hsl(var(--foreground))]",
        // Category variants
        design: "border-transparent bg-pink-50 text-pink-600",
        development: "border-transparent bg-blue-50 text-blue-600",
        marketing: "border-transparent bg-amber-50 text-amber-600",
        research: "border-transparent bg-teal-50 text-teal-600",
        meeting: "border-transparent bg-orange-50 text-orange-600",
        other: "border-transparent bg-gray-100 text-gray-600",
        // Priority variants
        high: "border-transparent bg-red-50 text-red-600",
        medium: "border-transparent bg-amber-50 text-amber-600",
        low: "border-transparent bg-emerald-50 text-emerald-600",
        // Status variants
        success: "border-transparent bg-emerald-50 text-emerald-600",
        warning: "border-transparent bg-amber-50 text-amber-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  type?: string;
  value?: string;
}

function Badge({ className, variant, type, value, children, ...props }: BadgeProps) {
  const computedVariant = variant || (value ? (value.toLowerCase() as any) : "default");
  const displayContent = children ?? value;

  return (
    <span className={cn(badgeVariants({ variant: computedVariant }), className)} {...props}>
      {displayContent}
    </span>
  );
}

export { Badge, badgeVariants };
export default Badge;