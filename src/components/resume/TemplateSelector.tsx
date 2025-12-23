import { ResumeTemplate, templates } from "@/types/templates";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  value: ResumeTemplate;
  onChange: (template: ResumeTemplate) => void;
}

const TemplateSelector = ({ value, onChange }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onChange(template.id)}
          className={cn(
            "text-left p-3 rounded-lg border-2 transition-all",
            value === template.id
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/50 hover:bg-muted/50"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">{template.name}</span>
            {value === template.id && (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                Active
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
          <p className="text-xs text-muted-foreground/70 mt-1 font-mono">{template.preview}</p>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
