import {
  ArrowUpCircle,
  Circle,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface SkillGroup {
  name: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
  image: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  achievements?: string[];
}

class ContactForm {
  name: string = "";
  email: string = "";
  subject: string = "";
  message: string = "";
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

interface NavLinkProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  section: string;
}

interface MousePosition {
  x: number;
  y: number;
}

interface SectionRef {
  [key: string]: React.RefObject<HTMLElement>;
}

const TypewriterEffect: React.FC<{ words: string[] }> = ({ words }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 200;
    const deletingSpeed = 100;
    const wordDelay = 2000; // Delay between words

    const word = words[currentWordIndex];

    if (!isDeleting && currentText === word) {
      // Wait before starting to delete
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, wordDelay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return prev.slice(0, -1);
          }
          return word.slice(0, prev.length + 1);
        });
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className="inline-block min-w-[300px]">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [formData, setFormData] = useState<ContactForm>(new ContactForm());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [navbarOpaque, setNavbarOpaque] = useState<boolean>(false);

  // Create refs for all sections
  const sectionRefs: SectionRef = {
    home: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    work: useRef<HTMLElement>(null),
    education: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      // Replace with actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      // Show scroll to top button after scrolling 300px
      setShowScrollTop(window.scrollY > 300);

      // Make navbar opaque after scrolling past the top
      setNavbarOpaque(window.scrollY > 50);

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      Object.keys(sectionRefs).forEach((section) => {
        const element = sectionRefs[section]?.current;
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRefs]);

  // Scroll to section function
  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = sectionRefs[section].current;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const personalInfo: PersonalInfo = {
    name: "Gurudatt Ashok Mallya",
    title: "Software Engineering Student",
    email: "gurudutt.mallya@gmail.com",
    github: "https://github.com/gurudattmallya", // Update with your GitHub URL
    linkedin: "https://linkedin.com/in/gurudutt-mallya", // Update with your LinkedIn URL
    skills: [
      {
        name: "Programming",
        items: ["C", "C++", "Java", "Python", "JavaScript"],
      },
      {
        name: "Web Technologies",
        items: ["React", "Express.js", "JavaFX", "HTML", "CSS"],
      },
      {
        name: "Databases",
        items: ["MySQL", "MariaDB"],
      },
      {
        name: "Tools & Technologies",
        items: [
          "Amazon S3",
          "Cisco Packet Tracer",
          "Microsoft Excel",
          "Git",
          "Arduino",
        ],
      },
    ],
    projects: [
      {
        title: "Temple Seva Management",
        description:
          "Developed a comprehensive temple management system for managing sevas, donations, and bookings with modern web technologies.",
        techStack: ["Vite", "React", "Express.js", "MariaDB"],
        github: "#", // Add your project repository link
        demo: "#", // Add your live demo link if available
        image: "/temple-project.jpg", // Add your project screenshot
      },
      {
        title: "Hate Speech Detection using ML",
        description:
          "Developed a model to detect hate speech in Instagram comments using advanced machine learning techniques.",
        techStack: ["TensorFlow", "React", "Apify", "Python"],
        github: "#", // Add your project GitHub link
        demo: "#", // Add your project demo link
        image: "/api/placeholder/600/400", // Add project screenshot
      },
      {
        title: "Gesture Controlled Video Playback",
        description:
          "Built an IoT system for controlling video playback using gesture recognition and ultrasonic sensors.",
        techStack: ["Python", "ESP32", "Arduino UNO", "IoT"],
        github: "#",
        demo: "#",
        image: "/api/placeholder/600/400",
      },
      {
        title: "Hotel Management System",
        description:
          "Streamlined event planning and management system with comprehensive features.",
        techStack: ["Java", "JavaFX", "Socket Programming", "MySQL"],
        github: "#",
        demo: "#",
        image: "/api/placeholder/600/400",
      },
      {
        title: "Quiz Application",
        description:
          "Interactive Android application for testing knowledge across multiple categories.",
        techStack: ["Java", "Android", "SQLite"],
        github: "#",
        demo: "#",
        image: "/api/placeholder/600/400",
      },
    ],
    experience: [
      {
        title: "Intern",
        company: "Arisecraft Technologies",
        period: "December 2025 - March 2025",
        description: [
          "Worked on full-stack development",
          // Add more details about your internship responsibilities
        ],
        technologies: ["React", "Express.js", "MySQL"],
      },
      {
        title: "ERP Intern",
        company: "Echochem Labs",
        period: "February 2023 - March 2023",
        description: [
          "Worked on Enterprise Resource Planning systems",
          "Gained hands-on experience with ERP implementation",
        ],
        technologies: ["ERP Systems"],
      },
    ],
    education: [
      {
        degree: "Bachelor of Engineering in Information Science",
        institution: "NMAM Institute of Technology",
        period: "2021 - Present",
        location: "Nitte, Karnataka",
        description: "Currently pursuing Information Science and Engineering",
        achievements: [
          "Cumulative GPA: 9.01/10.00",
          // Add any academic achievements or relevant coursework
        ],
      },
      {
        degree: "Pre-University Education",
        institution: "Bhandarkar's Pre-University College",
        period: "2019 - 2021",
        location: "Kundapura, Karnataka",
        description: "Karnataka Pre-University Board",
        achievements: ["Percentage Scored: 97.3%"],
      },
      {
        degree: "Secondary Education",
        institution: "Sri Venkataramana English Medium School",
        period: "2008 - 2019",
        location: "Kundapura, Karnataka",
        description: "Karnataka State Board of Secondary Education",
        achievements: ["Percentage Scored: 93.76%"],
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Enhanced animated background with multiple gradients */}
      <div
        className="fixed inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}px ${
            mousePosition.y
          }px, rgba(59, 130, 246, 0.3), transparent 25%),
            radial-gradient(circle at ${mousePosition.x - 100}px ${
            mousePosition.y + 100
          }px, rgba(147, 51, 234, 0.3), transparent 35%),
            radial-gradient(circle at ${mousePosition.x + 100}px ${
            mousePosition.y - 100
          }px, rgba(236, 72, 153, 0.3), transparent 30%)
          `,
        }}
      />

      {/* Navigation Bar with scroll-based opacity */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 ${
          navbarOpaque
            ? "bg-black/80 backdrop-blur-xl shadow-xl"
            : "bg-black/30 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 md:h-20">
            {/* Logo/Name - Takes up 1/4 of space */}
            <div className="flex-1">
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {personalInfo.name}
              </div>
            </div>

            {/* Centered Navigation - Takes up 1/2 of space */}
            <div className="flex-2 hidden md:flex justify-center">
              <div className="flex space-x-8">
                <NavLink
                  active={activeSection === "home"}
                  onClick={() => scrollToSection("home")}
                  section="home"
                >
                  Home
                </NavLink>
                <NavLink
                  active={activeSection === "skills"}
                  onClick={() => scrollToSection("skills")}
                  section="skills"
                >
                  Skills
                </NavLink>
                <NavLink
                  active={activeSection === "experience"}
                  onClick={() => scrollToSection("experience")}
                  section="experience"
                >
                  Experience
                </NavLink>
                <NavLink
                  active={activeSection === "work"}
                  onClick={() => scrollToSection("work")}
                  section="work"
                >
                  Work
                </NavLink>
                <NavLink
                  active={activeSection === "contact"}
                  onClick={() => scrollToSection("contact")}
                  section="contact"
                >
                  Contact
                </NavLink>
              </div>
            </div>

            {/* GitHub Button - Takes up 1/4 of space */}
            <div className="flex-1 flex justify-end">
              <div className="hidden md:block">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center px-6 py-2.5 rounded-full border-2 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <Github className="w-4 h-4 mr-2" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-medium">
                    Github
                  </span>
                </a>
              </div>
              <button
                className="md:hidden text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Improved Mobile Menu with animation */}
        <div
          className={`md:hidden absolute w-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/10 transform transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-2 space-y-4">
            <NavLink
              active={activeSection === "home"}
              onClick={() => scrollToSection("home")}
              section="home"
            >
              Home
            </NavLink>
            <NavLink
              active={activeSection === "skills"}
              onClick={() => scrollToSection("skills")}
              section="skills"
            >
              Skills
            </NavLink>
            <NavLink
              active={activeSection === "experience"}
              onClick={() => scrollToSection("experience")}
              section="experience"
            >
              Experience
            </NavLink>
            <NavLink
              active={activeSection === "work"}
              onClick={() => scrollToSection("work")}
              section="work"
            >
              Work
            </NavLink>
            <NavLink
              active={activeSection === "contact"}
              onClick={() => scrollToSection("contact")}
              section="contact"
            >
              Contact
            </NavLink>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-transparent transition-all duration-300 ease-in-out hover:bg-purple-500 text-purple-400 font-semibold hover:text-white py-3 px-4 border border-purple-500 hover:border-transparent rounded-full text-center"
            >
              <span className="flex items-center justify-center">
                <Github className="w-4 h-4 mr-2" />
                Github
              </span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with enhanced responsiveness */}
      <section
        ref={sectionRefs.home}
        className="relative min-h-screen flex items-center pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 order-2 md:order-1 text-center md:text-left">
              <div className="space-y-4">
                <div className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-400/10 text-blue-400 mb-2">
                  👋 Hello, I'm
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">I'm a</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                    <TypewriterEffect
                      words={[
                        "Information Science Student",
                        "Tech Enthusiast",
                        "Problem Solver"
                      ]}
                    />
                  </span>
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-gray-400 max-w-md mx-auto md:mx-0">
                Crafting digital experiences that blend creativity with
                technical excellence. Specialized in building modern web
                applications.
              </p>
              <div className="flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Hire Me
                </button>
                <button className="w-full sm:w-auto group relative px-8 py-3 bg-transparent text-white rounded-full border-2 border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center">
                  <span className="relative z-10 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Download CV
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </button>
              </div>
              <div className="pt-4 flex space-x-4 justify-center md:justify-start">
                <a
                  href={personalInfo.github}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transform hover:scale-110 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transform hover:scale-110 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transform hover:scale-110 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="relative flex justify-center order-1 md:order-2">
              {/* Enhanced profile container with simple gradient border */}
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-20" />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIqOomsUSZWC3NYJQVI-57KDvyIVgDCsOgEA&s"
                  alt="Profile"
                  className="absolute inset-1 rounded-full object-cover border-2 border-white/10 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2">
          <div className="text-sm text-gray-400 tracking-wider font-light">
            Scroll Down
          </div>
          <div className="relative w-6 h-9 rounded-full border-2 border-gray-400/20 flex justify-center">
            <div className="absolute top-2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-scroll-down"></div>
          </div>
        </div>

        {/* Mobile scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="flex flex-col items-center space-y-1">
            <div className="w-1 h-8 relative overflow-hidden rounded-full bg-gradient-to-b from-blue-400/20 via-purple-500/20 to-pink-500/20">
              <div className="absolute top-0 w-full h-1/2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse-down"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with improved cards */}
      <section ref={sectionRefs.skills} className="py-20 relative" id="skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-400/10 text-blue-400 mb-2">
              My Expertise
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {personalInfo.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="group relative p-6 md:p-8 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-xl backdrop-blur-sm hover:from-white/10 hover:via-white/15 hover:to-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {skillGroup.name}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                    >
                      <Circle className="w-2 h-2 mr-2 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section with enhanced timeline styling */}
      <section
        ref={sectionRefs.experience}
        className="py-20 relative"
        id="experience"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-400/10 text-blue-400 mb-2">
              Professional Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Work Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>

          <div className="space-y-12 relative">
            {/* Enhanced timeline line with gradient and animation */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block opacity-20">
              <div className="absolute inset-0 animate-pulse"></div>
            </div>

            {personalInfo.experience.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot with pulse effect */}
                <div className="absolute left-0 md:left-1/2 top-0 transform -translate-x-1/2 hidden md:block">
                  <div className="relative w-4 h-4">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-ping opacity-75"></div>
                  </div>
                </div>

                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="group relative p-6 md:p-8 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-xl backdrop-blur-sm hover:from-white/10 hover:via-white/15 hover:to-white/10 transition-all duration-500">
                    {/* Animated line pattern background */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                      <div className="absolute inset-0 opacity-20">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-[1px] w-full transform rotate-[30deg] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-slide-diagonal"
                            style={{
                              top: `${i * 50}px`,
                              animationDelay: `${i * 0.2}s`,
                              left: "-100%",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex flex-col mb-6">
                        <span className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                          {exp.title}
                        </span>
                        <div className="flex items-center mt-2">
                          <span className="text-lg text-gray-300">
                            {exp.company}
                          </span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-purple-400 font-medium text-sm px-3 py-1 rounded-full bg-purple-400/10">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                      {/* ... rest of the content ... */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section with improved grid for mobile */}
      <section ref={sectionRefs.work} className="py-20 relative" id="work">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-400/10 text-blue-400 mb-2">
              My Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12">
            {personalInfo.projects.map((project: Project, index: number) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-xl overflow-hidden transition-all duration-500 transform hover:scale-102 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      <a
                        href={project.github}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-blue-500 transition-colors duration-300"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.demo}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-purple-500 transition-colors duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="relative p-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section with cards */}
      <section
        ref={sectionRefs.education}
        className="py-20 relative"
        id="education"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-400/10 text-blue-400 mb-2">
              Academic Background
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Education & Qualifications
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {personalInfo.education.map((edu, index) => (
              <div
                key={index}
                className="group relative p-6 md:p-8 bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-xl backdrop-blur-sm hover:from-white/10 hover:via-white/15 hover:to-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="mb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-gray-400">{edu.institution}</p>
                  </div>
                  <span className="px-3 py-1 text-sm rounded-full bg-blue-400/10 text-blue-400">
                    {edu.period}
                  </span>
                </div>
                <p className="text-gray-300 mb-2">{edu.location}</p>
                <p className="text-gray-400 mb-4">{edu.description}</p>
                {edu.achievements && (
                  <div className="space-y-2">
                    <h4 className="text-md font-medium text-gray-300">
                      Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start group-hover:transform group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <Circle className="w-2 h-2 mr-2 text-purple-400 flex-shrink-0 mt-1.5" />
                          <span className="text-gray-400">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with enhanced form styling */}
      <section
        ref={sectionRefs.contact}
        className="py-20 relative"
        id="contact"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-semibold py-1 px-3 rounded-full bg-blue-400/10 text-blue-400 mb-2">
              Get In Touch
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Contact Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-gray-400 mb-6">
                Feel free to reach out for projects, questions, or just to say
                hello!
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-400/10 text-blue-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300">Email</h4>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-400/10 text-purple-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300">
                      GitHub
                    </h4>
                    <a
                      href={personalInfo.github}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {personalInfo.github.replace("https://github.com/", "")}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-400/10 text-pink-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300">
                      LinkedIn
                    </h4>
                    <a
                      href={personalInfo.linkedin}
                      className="text-gray-400 hover:text-pink-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {personalInfo.linkedin.replace(
                        "https://linkedin.com/in/",
                        ""
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 rounded-xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-500 transition-all resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 text-white font-medium flex items-center justify-center"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submitStatus === "success" && (
                  <div className="px-4 py-3 rounded-lg bg-green-400/10 text-green-400 text-center">
                    Message sent successfully!
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="px-4 py-3 rounded-lg bg-red-400/10 text-red-400 text-center">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                {personalInfo.name}
              </div>
              <p className="text-gray-400 mt-1">
                Professional Fullstack Developer
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transform hover:scale-110 transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transform hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transform hover:scale-110 transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 p-3 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-purple-500/25 transform transition-all duration-300 z-40 ${
          showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUpCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

const NavLink: React.FC<NavLinkProps> = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative block py-2 px-4 text-base transition-all duration-300 md:hover:text-transparent md:hover:bg-clip-text md:hover:bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 ${
        active
          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-medium"
          : "text-gray-400 hover:text-white"
      }`}
    >
      <span>{children}</span>
    </button>
  );
};

export default Portfolio;
