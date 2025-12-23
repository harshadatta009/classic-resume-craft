import { FontSize, Spacing, Margins, LayoutSettings } from "@/types/resume";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LayoutControlsProps {
  value: LayoutSettings;
  onChange: (settings: LayoutSettings) => void;
}

const fontSizeOptions: { value: FontSize; label: string; description: string }[] = [
  { value: "small", label: "Small", description: "9pt body text" },
  { value: "medium", label: "Medium", description: "10.5pt body text" },
  { value: "large", label: "Large", description: "11pt body text" },
];

const spacingOptions: { value: Spacing; label: string; description: string }[] = [
  { value: "compact", label: "Compact", description: "Tight line height" },
  { value: "normal", label: "Normal", description: "Standard spacing" },
  { value: "relaxed", label: "Relaxed", description: "More breathing room" },
];

const marginOptions: { value: Margins; label: string; description: string }[] = [
  { value: "narrow", label: "Narrow", description: "12mm margins" },
  { value: "normal", label: "Normal", description: "18mm margins" },
  { value: "wide", label: "Wide", description: "24mm margins" },
];

const LayoutControls = ({ value, onChange }: LayoutControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Font Size */}
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Font Size</Label>
        <div className="grid grid-cols-3 gap-2">
          {fontSizeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange({ ...value, fontSize: option.value })}
              className={cn(
                "p-2 rounded-md border text-center transition-all",
                value.fontSize === option.value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="block text-sm font-medium">{option.label}</span>
              <span className="block text-xs opacity-70">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Line Spacing</Label>
        <div className="grid grid-cols-3 gap-2">
          {spacingOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange({ ...value, spacing: option.value })}
              className={cn(
                "p-2 rounded-md border text-center transition-all",
                value.spacing === option.value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="block text-sm font-medium">{option.label}</span>
              <span className="block text-xs opacity-70">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Margins */}
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Page Margins</Label>
        <div className="grid grid-cols-3 gap-2">
          {marginOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange({ ...value, margins: option.value })}
              className={cn(
                "p-2 rounded-md border text-center transition-all",
                value.margins === option.value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="block text-sm font-medium">{option.label}</span>
              <span className="block text-xs opacity-70">{option.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LayoutControls;
