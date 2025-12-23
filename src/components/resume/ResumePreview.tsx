import { ResumeData, SectionType } from "@/types/resume";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableSection from "./DraggableSection";

interface ResumePreviewProps {
  data: ResumeData;
  onSectionReorder?: (newOrder: SectionType[]) => void;
}

const ResumePreview = ({ data, onSectionReorder }: ResumePreviewProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && onSectionReorder) {
      const oldIndex = data.sectionOrder.indexOf(active.id as SectionType);
      const newIndex = data.sectionOrder.indexOf(over.id as SectionType);
      const newOrder = arrayMove(data.sectionOrder, oldIndex, newIndex);
      onSectionReorder(newOrder);
    }
  };

  const renderSection = (sectionType: SectionType) => {
    switch (sectionType) {
      case "education":
        if (data.education.length === 0) return null;
        return (
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
        );

      case "skills":
        if (!data.skills.languages && !data.skills.frameworks && !data.skills.tools) return null;
        return (
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
        );

      case "experience":
        if (data.experience.length === 0) return null;
        return (
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
        );

      case "projects":
        if (data.projects.length === 0) return null;
        return (
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
        );

      case "activities":
        if (data.activities.length === 0) return null;
        return (
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
        );

      case "certifications":
        if (data.certifications.length === 0) return null;
        return (
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
        );

      default:
        return null;
    }
  };

  const sectionOrder = data.sectionOrder || [
    "education",
    "skills",
    "experience",
    "projects",
    "activities",
    "certifications",
  ];

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

        {/* Contact Info - Plain text without icons */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-[9pt]">
          {data.contact.phone && <span>{data.contact.phone}</span>}
          {data.contact.phone && data.contact.email && <span>|</span>}
          {data.contact.email && <span>{data.contact.email}</span>}
          {data.contact.email && data.contact.linkedin && <span>|</span>}
          {data.contact.linkedin && <span>{data.contact.linkedin}</span>}
          {data.contact.linkedin && data.contact.github && <span>|</span>}
          {data.contact.github && <span>{data.contact.github}</span>}
        </div>
      </header>

      <div className="resume-divider" />

      {/* Draggable Sections */}
      {onSectionReorder ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            {sectionOrder.map((sectionType) => {
              const content = renderSection(sectionType);
              if (!content) return null;
              return (
                <DraggableSection key={sectionType} id={sectionType}>
                  {content}
                </DraggableSection>
              );
            })}
          </SortableContext>
        </DndContext>
      ) : (
        sectionOrder.map((sectionType) => (
          <div key={sectionType}>{renderSection(sectionType)}</div>
        ))
      )}
    </div>
  );
};

export default ResumePreview;
