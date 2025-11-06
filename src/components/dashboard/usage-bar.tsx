import { Progress } from "@/components/ui-elements/progress";
import { cn } from "@/lib/utils";

interface UsageBarProps {
  value: number;
  max: number;
  label: string;
  className?: string;
}

export function UsageBar({ value, max, label, className }: UsageBarProps) {
  const percentage = (value / max) * 100;
  const isNearLimit = percentage >= 80;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className={cn("text-muted-foreground", isNearLimit && "text-destructive")}>
          {value.toLocaleString()} / {max.toLocaleString()}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <p className="text-xs text-muted-foreground">
        {percentage.toFixed(1)}% felhasználva{isNearLimit && " – hamarosan eléred a limitet"}
      </p>
    </div>
  );
}