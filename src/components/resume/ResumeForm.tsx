import { useState } from "react";
import { ResumeData, Education, WorkExperience, Project } from "@/types/resume";
import { ResumeTemplate } from "@/types/templates";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import FormSection from "./FormSection";
import BulletList from "./BulletList";
import TemplateSelector from "./TemplateSelector";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm = ({ data, onChange }: ResumeFormProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    template: true,
    header: false,
    education: false,
    skills: false,
    experience: false,
    projects: false,
    activities: false,
    certifications: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      institution: "",
      location: "",
      degree: "",
      duration: "",
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: generateId(),
      role: "",
      company: "",
      location: "",
      duration: "",
      bullets: [""],
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  // Project handlers
  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      title: "",
      techStack: "",
      bullets: [""],
    };
    onChange({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    });
  };

  const handleTemplateChange = (template: ResumeTemplate) => {
    onChange({ ...data, template });
  };

  return (
    <div className="space-y-3">
      {/* Template Selection */}
      <FormSection
        title="Template Style"
        isOpen={openSections.template}
        onToggle={() => toggleSection("template")}
      >
        <TemplateSelector
          value={data.template || "classic"}
          onChange={handleTemplateChange}
        />
      </FormSection>

      {/* Header Section */}
      <FormSection
        title="Header & Contact"
        isOpen={openSections.header}
        onToggle={() => toggleSection("header")}
      >
        <div className="space-y-3">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="title">Title/Role (Optional)</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Software Engineer"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.contact.phone}
                onChange={(e) =>
                  onChange({ ...data, contact: { ...data.contact, phone: e.target.value } })
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.contact.email}
                onChange={(e) =>
                  onChange({ ...data, contact: { ...data.contact, email: e.target.value } })
                }
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={data.contact.linkedin}
                onChange={(e) =>
                  onChange({ ...data, contact: { ...data.contact, linkedin: e.target.value } })
                }
                placeholder="linkedin.com/in/username"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={data.contact.github}
                onChange={(e) =>
                  onChange({ ...data, contact: { ...data.contact, github: e.target.value } })
                }
                placeholder="github.com/username"
              />
            </div>
          </div>
        </div>
      </FormSection>

      {/* Education Section */}
      <FormSection
        title="Education"
        isOpen={openSections.education}
        onToggle={() => toggleSection("education")}
      >
        {data.education.map((edu, idx) => (
          <div key={edu.id} className="p-3 border border-border rounded-md space-y-2 relative">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Education #{idx + 1}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(edu.id)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={edu.duration}
                  onChange={(e) => updateEducation(edu.id, "duration", e.target.value)}
                  placeholder="Aug 2018 - May 2022"
                />
              </div>
              <div className="col-span-2">
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addEducation} className="w-full">
          <Plus className="w-4 h-4 mr-1" />
          Add Education
        </Button>
      </FormSection>

      {/* Technical Skills Section */}
      <FormSection
        title="Technical Skills"
        isOpen={openSections.skills}
        onToggle={() => toggleSection("skills")}
      >
        <div className="space-y-3">
          <div>
            <Label>Programming Languages</Label>
            <Textarea
              value={data.skills.languages}
              onChange={(e) =>
                onChange({ ...data, skills: { ...data.skills, languages: e.target.value } })
              }
              placeholder="Python, JavaScript, TypeScript, Java..."
              className="min-h-[60px]"
            />
          </div>
          <div>
            <Label>Frameworks & Libraries</Label>
            <Textarea
              value={data.skills.frameworks}
              onChange={(e) =>
                onChange({ ...data, skills: { ...data.skills, frameworks: e.target.value } })
              }
              placeholder="React, Node.js, Django, Flask..."
              className="min-h-[60px]"
            />
          </div>
          <div>
            <Label>Tools & Technologies</Label>
            <Textarea
              value={data.skills.tools}
              onChange={(e) =>
                onChange({ ...data, skills: { ...data.skills, tools: e.target.value } })
              }
              placeholder="Git, Docker, AWS, PostgreSQL..."
              className="min-h-[60px]"
            />
          </div>
        </div>
      </FormSection>

      {/* Work Experience Section */}
      <FormSection
        title="Work Experience"
        isOpen={openSections.experience}
        onToggle={() => toggleSection("experience")}
      >
        {data.experience.map((exp, idx) => (
          <div key={exp.id} className="p-3 border border-border rounded-md space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Experience #{idx + 1}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExperience(exp.id)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Role/Position</Label>
                <Input
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                  placeholder="Jun 2022 - Present"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>
            <div>
              <Label>Bullet Points</Label>
              <BulletList
                bullets={exp.bullets}
                onChange={(bullets) => updateExperience(exp.id, "bullets", bullets)}
                placeholder="Describe your achievement..."
              />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addExperience} className="w-full">
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </Button>
      </FormSection>

      {/* Projects Section */}
      <FormSection
        title="Projects"
        isOpen={openSections.projects}
        onToggle={() => toggleSection("projects")}
      >
        {data.projects.map((project, idx) => (
          <div key={project.id} className="p-3 border border-border rounded-md space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Project #{idx + 1}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProject(project.id)}
                className="h-7 w-7 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(project.id, "title", e.target.value)}
                  placeholder="Project Name"
                />
              </div>
              <div>
                <Label>Tech Stack</Label>
                <Input
                  value={project.techStack}
                  onChange={(e) => updateProject(project.id, "techStack", e.target.value)}
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>
            </div>
            <div>
              <Label>Bullet Points</Label>
              <BulletList
                bullets={project.bullets}
                onChange={(bullets) => updateProject(project.id, "bullets", bullets)}
                placeholder="Describe the project..."
              />
            </div>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={addProject} className="w-full">
          <Plus className="w-4 h-4 mr-1" />
          Add Project
        </Button>
      </FormSection>

      {/* Activities Section */}
      <FormSection
        title="Extra Curricular Activities"
        isOpen={openSections.activities}
        onToggle={() => toggleSection("activities")}
      >
        <BulletList
          bullets={data.activities}
          onChange={(activities) => onChange({ ...data, activities })}
          placeholder="Describe an activity or achievement..."
        />
      </FormSection>

      {/* Certifications Section */}
      <FormSection
        title="Certifications"
        isOpen={openSections.certifications}
        onToggle={() => toggleSection("certifications")}
      >
        <BulletList
          bullets={data.certifications}
          onChange={(certifications) => onChange({ ...data, certifications })}
          placeholder="Add a certification..."
        />
      </FormSection>
    </div>
  );
};

export default ResumeForm;
