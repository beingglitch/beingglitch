import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "Suraj",
  lastName: "Shukla",
  name: `Suraj Shukla`,
  role: "Full Stack & Robotics Engineer",
  avatar: "/images/avatar.jpg",
  email: "surajshukla5604@gmail.com",
  location: "Asia/Kolkata", // Timezone
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly insights on autonomous and distributed systems engineering.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/beingglitch",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/surjshuk/",
    essential: true,
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/beingglitch",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.png",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  // Headline and subline are managed from /admin/featured and stored in the
  // database now — these stay as the Home type's required fallback.
  headline: <></>,
  featured: {
    display: false,
    title: <></>,
    href: "",
  },
  subline: <></>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  // description is managed from /admin/featured and stored in the database now
  // — this stays as the About type's required fallback.
  intro: {
    display: true,
    title: "Introduction",
    description: <></>,
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Divergent Classes",
        timeframe: "Dates TBD",
        role: "Software Engineer",
        achievements: [
          <>
            Created an agentic ad-management application to automate Divergent Classes' marketing
            campaigns.
          </>,
        ],
        images: [],
      },
      {
        company: "Bramer Private Limited",
        timeframe: "Dates TBD",
        role: "Co-founder & CTO",
        achievements: [
          <>
            Led a cross-functional team of 6 across software, AI, electronics, and hardware on a
            $300K (₹3 crore) R&D program.
          </>,
          <>
            Built the founding product stack: a cross-platform ground control station, an
            event-driven backend, and edge ML inference on embedded NVIDIA Jetson hardware.
          </>,
          <>
            Built a three-phase geospatial pipeline for a border infrastructure organization:
            pre-phase site planning from historical and satellite data, drone-collected field surveys
            during execution, and post-phase fusion into a predictive road-construction
            susceptibility model.
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "System Architecture",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "I-Hub Foundation for Cobotics (IHFC), IIT Delhi",
        timeframe: "Dates TBD",
        role: "Research Fellow",
        achievements: [
          <>
            Selected for a competitive fellowship in collaborative robotics at IHFC, a Department of
            Science and Technology Innovation Hub at IIT Delhi, to build a swarm-coordination system
            for multi-agent robotics.
          </>,
        ],
        images: [],
      },
      {
        company: "DTU IoT Research Lab",
        timeframe: "Dates TBD",
        role: "Head of Development",
        achievements: [
          <>
            Leading a team of student developers across research and development projects in
            computer vision, signal processing, software-defined networks (SDN), and robotics
            applications.
          </>,
        ],
        images: [],
      },
      {
        company: "DTU Unmanned Aerial Systems (UAS) Team",
        timeframe: "Dates TBD",
        role: "Software & Autonomy Lead",
        achievements: [
          <>
            Led the software and autonomy sub-team; developed a swarm-coordination framework for
            drones with GPS-denied visual navigation and an action pipeline on ROS 2.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Delhi Technological University (DTU)",
        description: <>B.Tech in Software Engineering, 2022 to 2026, Delhi, India.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        description: <>The languages I reach for day to day.</>,
        tags: [
          { name: "Python", icon: "python" },
          { name: "JavaScript / TypeScript", icon: "javascript" },
          { name: "Rust" },
          { name: "Go" },
          { name: "SQL" },
        ],
        images: [],
      },
      {
        title: "Frontend",
        description: <>Building performant web, desktop, and mobile interfaces.</>,
        tags: [
          { name: "React", icon: "react" },
          { name: "Next.js", icon: "nextjs" },
          { name: "React Native" },
          { name: "TanStack" },
          { name: "Zustand" },
          { name: "Tauri 2" },
          { name: "Tailwind CSS" },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Web Interface",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Backend",
        description: <>Services, protocols, and the runtimes underneath them.</>,
        tags: [
          { name: "Node.js" },
          { name: "FastAPI", icon: "python" },
          { name: "Axum" },
          { name: "Tokio" },
          { name: "REST" },
          { name: "WebSocket" },
          { name: "WebRTC" },
        ],
        images: [],
      },
      {
        title: "Data",
        description: <>Storage and data layers across projects.</>,
        tags: [
          { name: "PostgreSQL" },
          { name: "PostGIS" },
          { name: "MongoDB" },
          { name: "Cassandra" },
          { name: "Redis" },
          { name: "Firebase" },
          { name: "Prisma" },
          { name: "SQLite" },
        ],
        images: [],
      },
      {
        title: "Cloud & Infrastructure",
        description: <>Shipping, running, and operating everything above.</>,
        tags: [
          { name: "AWS" },
          { name: "GCP" },
          { name: "Docker", icon: "docker" },
          { name: "Nginx" },
          { name: "GitHub Actions" },
        ],
        images: [],
      },
      {
        title: "Machine Learning & Robotics",
        description: (
          <>
            Autonomous navigation, Visual SLAM, and agentic AI on top of Edge AI hardware.
          </>
        ),
        tags: [
          { name: "ROS", icon: "ros" },
          { name: "Gazebo" },
          { name: "PyTorch" },
          { name: "OpenCV", icon: "opencv" },
          { name: "LangGraph" },
          { name: "LangChain" },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Robotics Prototype",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Blockchain",
        description: <>Onchain programs on Solana.</>,
        tags: [{ name: "Anchor" }, { name: "Solana" }],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Engineering Journal",
  description: `Read what ${person.name} has been working on`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Engineering projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A collection of my prototypes and travels`,
  // Images are managed from /admin/gallery and stored in the database now —
  // this stays empty as the Gallery type's required fallback.
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
