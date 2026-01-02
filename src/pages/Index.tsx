import { useState, useEffect, useRef } from "react";
import { ResumeData, defaultResumeData, SectionType } from "@/types/resume";
import ResumeForm from "@/components/resume/ResumeForm";
import ResumePreview from "@/components/resume/ResumePreview";
import PageFitMeter from "@/components/resume/PageFitMeter";
import { Button } from "@/components/ui/button";
import { Download, FileText, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2pdf from "html2pdf.js";

const STORAGE_KEY = "resume-builder-data";

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure sectionOrder, template, and layout exist for backward compatibility
        if (!parsed.sectionOrder) {
          parsed.sectionOrder = ["education", "skills", "experience", "projects", "activities", "certifications"];
        }
        if (!parsed.template) {
          parsed.template = "classic";
        }
        if (!parsed.layout) {
          parsed.layout = { fontSize: "medium", spacing: "normal", margins: "normal" };
        }
        return parsed;
      } catch {
        return defaultResumeData;
      }
    }
    return defaultResumeData;
  });

  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
  }, [resumeData]);

  const handleSectionReorder = (newOrder: SectionType[]) => {
    setResumeData((prev) => ({ ...prev, sectionOrder: newOrder }));
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("resume-content");
    if (!element) return;

    toast({
      title: "Generating PDF...",
      description: "Please wait while your resume is being prepared.",
    });

    const opt = {
      margin: 0,
      filename: `${resumeData.name.replace(/\s+/g, "_") || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        height: element.scrollHeight,
        windowHeight: element.scrollHeight,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: 'avoid-all' },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast({
        title: "PDF Downloaded!",
        description: "Your resume has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setResumeData(defaultResumeData);
    toast({
      title: "Resume Reset",
      description: "Your resume has been reset to the default template.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold text-foreground">Resume Builder</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
            <Button size="sm" onClick={handleExportPDF}>
              <Download className="w-4 h-4 mr-1" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Form Panel */}
          <aside className="lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:sticky lg:top-20 pr-2">
            <div className="pb-4">
              <h2 className="text-sm font-medium text-muted-foreground mb-3">
                Fill in your details below
              </h2>
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </div>
          </aside>

          {/* Preview Panel */}
          <div className="lg:overflow-auto" ref={previewRef}>
            <div className="bg-muted/30 p-6 rounded-lg min-h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Live Preview (drag sections to reorder)
                </h2>
                <PageFitMeter targetElementId="resume-content" />
              </div>
              <div className="flex justify-center">
                <div className="shadow-xl rounded overflow-hidden">
                  <ResumePreview
                    data={resumeData}
                    onSectionReorder={handleSectionReorder}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
