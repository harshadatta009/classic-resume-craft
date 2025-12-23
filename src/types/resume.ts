export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Education {
  id: string;
  institution: string;
  location: string;
  degree: string;
  duration: string;
}

export interface TechnicalSkills {
  languages: string;
  frameworks: string;
  tools: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string;
  bullets: string[];
}

export type SectionType = 
  | "education"
  | "skills"
  | "experience"
  | "projects"
  | "activities"
  | "certifications";

export interface ResumeData {
  name: string;
  title: string;
  contact: ContactInfo;
  education: Education[];
  skills: TechnicalSkills;
  experience: WorkExperience[];
  projects: Project[];
  activities: string[];
  certifications: string[];
  sectionOrder: SectionType[];
}

export const defaultResumeData: ResumeData = {
  name: "John Doe",
  title: "Software Engineer",
  contact: {
    phone: "+1 (555) 123-4567",
    email: "john.doe@email.com",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
  },
  education: [
    {
      id: "1",
      institution: "Massachusetts Institute of Technology",
      location: "Cambridge, MA",
      degree: "Bachelor of Science in Computer Science",
      duration: "Aug 2018 - May 2022",
    },
  ],
  skills: {
    languages: "Python, JavaScript, TypeScript, Java, C++, SQL, HTML/CSS",
    frameworks: "React, Node.js, Express, Django, Flask, TensorFlow, PyTorch",
    tools: "Git, Docker, AWS, PostgreSQL, MongoDB, Redis, Linux, CI/CD",
  },
  experience: [
    {
      id: "1",
      role: "Software Engineer",
      company: "Tech Company Inc.",
      location: "San Francisco, CA",
      duration: "Jun 2022 - Present",
      bullets: [
        "Developed and maintained scalable web applications serving 1M+ daily active users",
        "Led migration of legacy systems to microservices architecture, reducing latency by 40%",
        "Implemented automated testing pipelines, increasing code coverage from 45% to 92%",
      ],
    },
    {
      id: "2",
      role: "Software Engineering Intern",
      company: "Startup Labs",
      location: "Boston, MA",
      duration: "May 2021 - Aug 2021",
      bullets: [
        "Built RESTful APIs handling 10K+ requests per minute using Node.js and Express",
        "Designed and implemented a real-time notification system using WebSockets",
        "Collaborated with cross-functional teams to deliver features 2 weeks ahead of schedule",
      ],
    },
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      techStack: "React, Node.js, PostgreSQL, Stripe",
      bullets: [
        "Built a full-stack e-commerce platform with user authentication and payment processing",
        "Implemented product search with filters and pagination, improving UX significantly",
      ],
    },
    {
      id: "2",
      title: "Machine Learning Pipeline",
      techStack: "Python, TensorFlow, AWS SageMaker",
      bullets: [
        "Developed an ML pipeline for image classification with 95% accuracy",
        "Deployed models using AWS SageMaker, handling 5K+ predictions daily",
      ],
    },
  ],
  activities: [
    "Mentor at Code for Good, teaching programming to underprivileged students",
    "Open source contributor to popular JavaScript frameworks with 500+ GitHub stars",
    "Speaker at local tech meetups on topics including React best practices and system design",
  ],
  certifications: [
    "AWS Certified Solutions Architect - Associate",
    "Google Cloud Professional Data Engineer",
    "Certified Kubernetes Administrator (CKA)",
  ],
  sectionOrder: ["education", "skills", "experience", "projects", "activities", "certifications"],
};
