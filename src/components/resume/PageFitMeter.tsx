import { useEffect, useState, useCallback } from "react";
import { AlertTriangle, Check } from "lucide-react";

interface PageFitMeterProps {
  targetElementId: string;
}

// A4 page height in mm minus padding (297mm - 30mm top/bottom padding = ~267mm usable)
const A4_HEIGHT_PX = 1122.52; // 297mm at 96dpi

const PageFitMeter = ({ targetElementId }: PageFitMeterProps) => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const calculateFill = useCallback(() => {
    const element = document.getElementById(targetElementId);
    if (!element) return;

    const contentHeight = element.scrollHeight;
    const containerHeight = element.clientHeight || A4_HEIGHT_PX;
    
    // Calculate percentage based on actual A4 height
    const percentage = Math.round((contentHeight / containerHeight) * 100);
    setFillPercentage(Math.min(percentage, 150)); // Cap at 150% for display
    setIsOverflowing(contentHeight > containerHeight);

    // Toggle overflow class on sections for highlighting
    const resumePage = element;
    if (isOverflowing) {
      resumePage.classList.add("overflow-warning");
    } else {
      resumePage.classList.remove("overflow-warning");
    }
  }, [targetElementId, isOverflowing]);

  useEffect(() => {
    // Initial calculation
    calculateFill();

    // Set up MutationObserver to detect content changes
    const element = document.getElementById(targetElementId);
    if (!element) return;

    const observer = new MutationObserver(calculateFill);
    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    // Also listen for window resize
    window.addEventListener("resize", calculateFill);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateFill);
    };
  }, [targetElementId, calculateFill]);

  const getStatusColor = () => {
    if (fillPercentage > 100) return "bg-destructive";
    if (fillPercentage > 90) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getStatusTextColor = () => {
    if (fillPercentage > 100) return "text-destructive";
    if (fillPercentage > 90) return "text-yellow-600 dark:text-yellow-400";
    return "text-emerald-600 dark:text-emerald-400";
  };

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded-lg">
      {/* Icon */}
      <div className={`flex-shrink-0 ${getStatusTextColor()}`}>
        {isOverflowing ? (
          <AlertTriangle className="w-4 h-4" />
        ) : (
          <Check className="w-4 h-4" />
        )}
      </div>

      {/* Progress bar */}
      <div className="flex-1 min-w-[100px]">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${getStatusColor()}`}
            style={{ width: `${Math.min(fillPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Percentage text */}
      <span className={`text-sm font-medium min-w-[60px] text-right ${getStatusTextColor()}`}>
        {fillPercentage}% full
      </span>

      {/* Overflow warning */}
      {isOverflowing && (
        <span className="text-xs text-destructive font-medium">
          Overflow!
        </span>
      )}
    </div>
  );
};

export default PageFitMeter;
