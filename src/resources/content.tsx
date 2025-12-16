import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Suraj",
  lastName: "Shukla",
  name: `Suraj Shukla`,
  role: "Robotics Engineer & Full Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "surajshukla5604@gmail.com",
  location: "Asia/Kolkata", // Timezone
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly insights on autonomous systems and engineering.</>,
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
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building intelligent <br/> autonomous systems</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Latest Work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Robotics & Web
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm Suraj Shukla, a robotics engineer bridging the gap between <br /> hardware engineering and advanced software architectures.
    </>
  ),
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
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Suraj is a robotics engineer with a deep focus on Autonomous Systems, 
        SLAM, and Hybrid Propulsion. He specializes in integrating complex 
        hardware (IC engines, Edge AI) with robust full-stack software solutions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Stealth Startup",
        timeframe: "2023 - Present",
        role: "Lead Robotics Engineer",
        achievements: [
          <>
            Leading R&D projects focused on hybrid-powered autonomous robotics and navigation systems.
          </>,
          <>
            Architecting a comprehensive software ecosystem including control interfaces, backend infrastructure, and ML pipelines.
          </>,
          <>
            Developing autonomous behaviors using Visual SLAM and Computer Vision on Edge AI platforms.
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
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Delhi Technological University",
        description: <>B.Tech in Computer Science.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Robotics & AI",
        description: (
          <>Experience with autonomous navigation, SLAM, and Edge AI.</>
        ),
        tags: [
          {
            name: "ROS 2",
            icon: "ros",
          },
          {
            name: "C++",
            icon: "cplusplus",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "OpenCV",
            icon: "opencv",
          }
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
        title: "Full Stack Development",
        description: (
          <>Building performant web applications and control interfaces.</>
        ),
        tags: [
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "React",
            icon: "react",
          },
          {
            name: "FastAPI",
            icon: "python", 
          },
          {
            name: "Docker",
            icon: "docker",
          },
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
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };