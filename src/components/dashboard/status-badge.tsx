import { Badge } from "@/components/ui-elements/badge";
import { cn } from "@/lib/utils";

type StatusVariant = 'success' | 'warning' | 'danger' | 'neutral';

interface StatusBadgeProps {
  variant: StatusVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-accent/10 text-accent border-accent/20",
  warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn(variantStyles[variant], className)}>
      {children}
    </Badge>
  );
}
