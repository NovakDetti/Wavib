import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui-elements/card";
import { Button } from "@/components/ui-elements/button";
import { Badge } from "@/components/ui-elements/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  name: string;
  price?: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  disabled?: boolean;
  badge?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export function PlanCard({
  name,
  price,
  period,
  description,
  features,
  highlighted = false,
  disabled = false,
  badge,
  onAction,
  actionLabel = "Csomag választása",
}: PlanCardProps) {
  return (
    <Card
      className={cn(
        "relative border-border/50 bg-card/50 backdrop-blur-sm transition-all",
        highlighted && "border-primary shadow-lg ring-2 ring-primary/20",
        disabled && "opacity-60"
      )}
    >
      {badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">
          {badge}
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {price && (
          <div className="mt-4">
            <span className="text-3xl font-bold">{price}</span>
            {period && <span className="text-muted-foreground ml-2">/ {period}</span>}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      {onAction && (
        <CardFooter>
          <Button
            onClick={onAction}
            disabled={disabled}
            variant={highlighted ? "default" : "outline"}
            className="w-full"
          >
            {actionLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
