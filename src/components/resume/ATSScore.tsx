import { ResumeData } from "@/types/resume";
import { useMemo } from "react";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ATSScoreProps {
  data: ResumeData;
}

interface ScoreFactor {
  name: string;
  score: number;
  maxScore: number;
  status: "good" | "warning" | "error";
  tip: string;
}

const ATSScore = ({ data }: ATSScoreProps) => {
  const { totalScore, factors } = useMemo(() => {
    const factors: ScoreFactor[] = [];

    // 1. Contact Information (15 points)
    let contactScore = 0;
    if (data.contact.email) contactScore += 5;
    if (data.contact.phone) contactScore += 5;
    if (data.contact.linkedin || data.contact.github) contactScore += 5;
    factors.push({
      name: "Contact Info",
      score: contactScore,
      maxScore: 15,
      status: contactScore >= 15 ? "good" : contactScore >= 10 ? "warning" : "error",
      tip: contactScore >= 15 ? "Complete contact info" : "Add email, phone, and LinkedIn/GitHub",
    });

    // 2. Name & Title (10 points)
    let headerScore = 0;
    if (data.name && data.name.length > 2) headerScore += 5;
    if (data.title && data.title.length > 2) headerScore += 5;
    factors.push({
      name: "Header",
      score: headerScore,
      maxScore: 10,
      status: headerScore >= 10 ? "good" : headerScore >= 5 ? "warning" : "error",
      tip: headerScore >= 10 ? "Name and title present" : "Add your name and professional title",
    });

    // 3. Work Experience (25 points)
    let expScore = 0;
    if (data.experience.length > 0) {
      expScore += 10;
      const totalBullets = data.experience.reduce((acc, exp) => acc + exp.bullets.length, 0);
      if (totalBullets >= 3) expScore += 5;
      if (totalBullets >= 6) expScore += 5;
      // Check for action verbs and metrics
      const allBullets = data.experience.flatMap(exp => exp.bullets).join(" ");
      const hasActionVerbs = /\b(developed|created|managed|led|increased|decreased|improved|built|designed|implemented|achieved|delivered|optimized|reduced|launched|coordinated)\b/i.test(allBullets);
      const hasMetrics = /\d+%|\$\d+|\d+\+|\d+ (users|clients|customers|projects|team)/i.test(allBullets);
      if (hasActionVerbs) expScore += 3;
      if (hasMetrics) expScore += 2;
    }
    factors.push({
      name: "Experience",
      score: expScore,
      maxScore: 25,
      status: expScore >= 20 ? "good" : expScore >= 10 ? "warning" : "error",
      tip: expScore >= 20 ? "Strong experience section" : "Add more bullet points with action verbs and metrics",
    });

    // 4. Education (15 points)
    let eduScore = 0;
    if (data.education.length > 0) {
      eduScore += 10;
      const hasComplete = data.education.some(edu => edu.institution && edu.degree && edu.duration);
      if (hasComplete) eduScore += 5;
    }
    factors.push({
      name: "Education",
      score: eduScore,
      maxScore: 15,
      status: eduScore >= 15 ? "good" : eduScore >= 10 ? "warning" : "error",
      tip: eduScore >= 15 ? "Education complete" : "Add institution, degree, and dates",
    });

    // 5. Skills (20 points)
    let skillsScore = 0;
    if (data.skills.languages) skillsScore += 7;
    if (data.skills.frameworks) skillsScore += 7;
    if (data.skills.tools) skillsScore += 6;
    factors.push({
      name: "Skills",
      score: skillsScore,
      maxScore: 20,
      status: skillsScore >= 18 ? "good" : skillsScore >= 10 ? "warning" : "error",
      tip: skillsScore >= 18 ? "Skills well documented" : "Add languages, frameworks, and tools",
    });

    // 6. Projects (10 points)
    let projectScore = 0;
    if (data.projects.length > 0) {
      projectScore += 5;
      const hasBullets = data.projects.some(p => p.bullets.length > 0);
      if (hasBullets) projectScore += 5;
    }
    factors.push({
      name: "Projects",
      score: projectScore,
      maxScore: 10,
      status: projectScore >= 10 ? "good" : projectScore >= 5 ? "warning" : "error",
      tip: projectScore >= 10 ? "Projects included" : "Add projects with descriptions",
    });

    // 7. Extras (5 points)
    let extrasScore = 0;
    if (data.activities.length > 0) extrasScore += 2;
    if (data.certifications.length > 0) extrasScore += 3;
    factors.push({
      name: "Extras",
      score: extrasScore,
      maxScore: 5,
      status: extrasScore >= 4 ? "good" : extrasScore >= 2 ? "warning" : "error",
      tip: extrasScore >= 4 ? "Activities & certs added" : "Consider adding certifications",
    });

    const totalScore = factors.reduce((acc, f) => acc + f.score, 0);
    return { totalScore, factors };
  }, [data]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-yellow-500";
    return "text-destructive";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-destructive";
  };

  const getStatusIcon = (status: "good" | "warning" | "error") => {
    switch (status) {
      case "good":
        return <CheckCircle2 className="w-3 h-3 text-emerald-500" />;
      case "warning":
        return <AlertCircle className="w-3 h-3 text-yellow-500" />;
      case "error":
        return <XCircle className="w-3 h-3 text-destructive" />;
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg cursor-help">
            {/* Score circle */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  className={getScoreBg(totalScore)}
                  strokeWidth="3"
                  strokeDasharray={`${totalScore * 0.94} 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${getScoreColor(totalScore)}`}>
                {totalScore}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs font-medium text-foreground">ATS Score</span>
              <span className={`block text-[10px] ${getScoreColor(totalScore)}`}>
                {totalScore >= 80 ? "Excellent" : totalScore >= 60 ? "Good" : "Needs Work"}
              </span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="w-64 p-3">
          <p className="text-xs font-medium mb-2">ATS Compatibility Breakdown</p>
          <div className="space-y-1.5">
            {factors.map((factor) => (
              <div key={factor.name} className="flex items-center gap-2 text-xs">
                {getStatusIcon(factor.status)}
                <span className="flex-1">{factor.name}</span>
                <span className="text-muted-foreground">
                  {factor.score}/{factor.maxScore}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-[10px] text-muted-foreground">
              {factors.find(f => f.status !== "good")?.tip || "Great job! Your resume is ATS-optimized."}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ATSScore;
