export type ResumeTemplate = "classic" | "modern" | "minimal" | "bold" | "elegant";

export interface TemplateInfo {
  id: ResumeTemplate;
  name: string;
  description: string;
  preview: string;
}

export const templates: TemplateInfo[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional serif typography, perfect for academic and professional roles",
    preview: "Crimson Pro • Serif • Traditional",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean sans-serif with blue accent, ideal for tech and creative fields",
    preview: "Source Sans • Sans-serif • Blue accent",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Ultra-clean with generous whitespace, great for design-focused roles",
    preview: "Roboto • Light weight • Spacious",
  },
  {
    id: "bold",
    name: "Bold",
    description: "Strong typography with dark headers, makes a powerful impression",
    preview: "Playfair Display • Serif • Dark headers",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated design with warm accents, perfect for executive roles",
    preview: "Merriweather • Serif • Warm accent",
  },
];
