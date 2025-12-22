import { ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSectionProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FormSection = ({ title, children, isOpen, onToggle }: FormSectionProps) => {
  return (
    <div className="border border-panel-border rounded-md overflow-hidden bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary transition-colors"
      >
        <span className="font-medium text-foreground">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div className="p-4 space-y-3">{children}</div>}
    </div>
  );
};

export default FormSection;
