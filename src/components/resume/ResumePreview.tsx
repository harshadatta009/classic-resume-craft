import { ResumeData } from "@/types/resume";
import { Phone, Mail, Linkedin, Github } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <div className="resume-preview resume-page" id="resume-content">
      {/* Header */}
      <header className="text-center mb-2">
        <h1 className="resume-name">{data.name || "Your Name"}</h1>
        {data.title && (
          <p className="text-sm mt-1 text-resume-text-secondary font-serif italic">
            {data.title}
          </p>
        )}
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-[9pt]">
          {data.contact.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {data.contact.phone}
            </span>
          )}
          {data.contact.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {data.contact.email}
            </span>
          )}
          {data.contact.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {data.contact.linkedin}
            </span>
          )}
          {data.contact.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3" />
              {data.contact.github}
            </span>
          )}
        </div>
      </header>

      <div className="resume-divider" />

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-2">
          <h2 className="resume-section-title">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-baseline">
                <span className="resume-entry-title">{edu.institution}</span>
                <span className="text-[9pt]">{edu.location}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="resume-entry-subtitle">{edu.degree}</span>
                <span className="text-[9pt] italic">{edu.duration}</span>
              </div>
            </div>
          ))}
          <div className="resume-divider" />
        </section>
      )}

      {/* Technical Skills */}
      {(data.skills.languages || data.skills.frameworks || data.skills.tools) && (
        <section className="mb-2">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="space-y-0.5">
            {data.skills.languages && (
              <p className="text-[10pt]">
                <strong>Programming Languages:</strong> {data.skills.languages}
              </p>
            )}
            {data.skills.frameworks && (
              <p className="text-[10pt]">
                <strong>Frameworks & Libraries:</strong> {data.skills.frameworks}
              </p>
            )}
            {data.skills.tools && (
              <p className="text-[10pt]">
                <strong>Tools & Technologies:</strong> {data.skills.tools}
              </p>
            )}
          </div>
          <div className="resume-divider" />
        </section>
      )}

      {/* Work Experience */}
      {data.experience.length > 0 && (
        <section className="mb-2">
          <h2 className="resume-section-title">Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="resume-entry-title">{exp.role}</span>
                <span className="text-[9pt]">{exp.duration}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="resume-entry-subtitle">{exp.company}</span>
                <span className="text-[9pt]">{exp.location}</span>
              </div>
              <ul className="mt-1 space-y-0.5">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="resume-bullet text-[10pt]">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="resume-divider" />
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-2">
          <h2 className="resume-section-title">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="resume-entry-title">{project.title}</span>
                <span className="text-[9pt] italic">{project.techStack}</span>
              </div>
              <ul className="mt-1 space-y-0.5">
                {project.bullets.map((bullet, idx) => (
                  <li key={idx} className="resume-bullet text-[10pt]">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="resume-divider" />
        </section>
      )}

      {/* Extra Curricular Activities */}
      {data.activities.length > 0 && (
        <section className="mb-2">
          <h2 className="resume-section-title">Extra Curricular Activities</h2>
          <ul className="space-y-0.5">
            {data.activities.map((activity, idx) => (
              <li key={idx} className="resume-bullet text-[10pt]">
                {activity}
              </li>
            ))}
          </ul>
          <div className="resume-divider" />
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="resume-section-title">Certifications</h2>
          <ul className="space-y-0.5">
            {data.certifications.map((cert, idx) => (
              <li key={idx} className="resume-bullet text-[10pt]">
                {cert}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
