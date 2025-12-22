import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BulletListProps {
  bullets: string[];
  onChange: (bullets: string[]) => void;
  placeholder?: string;
}

const BulletList = ({ bullets, onChange, placeholder = "Add a bullet point..." }: BulletListProps) => {
  const addBullet = () => {
    onChange([...bullets, ""]);
  };

  const updateBullet = (index: number, value: string) => {
    const updated = [...bullets];
    updated[index] = value;
    onChange(updated);
  };

  const removeBullet = (index: number) => {
    onChange(bullets.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {bullets.map((bullet, idx) => (
        <div key={idx} className="flex gap-2">
          <Textarea
            value={bullet}
            onChange={(e) => updateBullet(idx, e.target.value)}
            placeholder={placeholder}
            className="min-h-[60px] text-sm resize-none"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeBullet(idx)}
            className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addBullet}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Bullet
      </Button>
    </div>
  );
};

export default BulletList;
