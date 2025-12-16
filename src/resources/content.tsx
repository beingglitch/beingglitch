import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Suraj",
  lastName: "Shukla",
  name: `Suraj Shukla`,
  role: "Founder & CTO",
  avatar: "/images/avatar.jpg",
  email: "surajshukla5604@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Hindi"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly insights on defense robotics and engineering.</>,
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
  description: `Portfolio website showcasing my work as ${person.role}`,
  headline: <>Engineering the future of <br/> autonomous defense</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Bramer Pvt Ltd</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Current Focus
        </Text>
      </Row>
    ),
    href: "https://bramer.in", // Assuming a placeholder or your specific project link
  },
  subline: (
    <>
      I'm Suraj Shukla, Founder & CTO at <Text as="span" size="xl" weight="strong">Bramer Private Limited</Text>, where I architect <br /> hybrid drone systems and software ecosystems.
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
    display: true, // Set to false if you don't use Cal.com
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Suraj is a Delhi-based robotics engineer and entrepreneur with a deep focus on 
        Autonomous Systems, SLAM, and Hybrid Propulsion. As the CTO of a defense startup, 
        he bridges the gap between hardware engineering (IC engines, Jetson Orin) and 
        advanced software architectures.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Bramer Private Limited",
        timeframe: "2023 - Present",
        role: "Founder & CTO",
        achievements: [
          <>
            Leading an iDEX (Innovations for Defence Excellence) project focused on hybrid-powered autonomous robotics.
          </>,
          <>
            Architecting the company's core software stack including 'Console' (Next.js/Tauri), 'Link' (FastAPI), 'Fabric' (ML), and 'Automate' (ROS 2).
          </>,
          <>
            Developing autonomous navigation systems using Visual SLAM (ORB-SLAM) on NVIDIA Jetson Orin Nano and AGX platforms.
          </>,
        ],
        images: [
          // Add actual screenshots of your Console or Drone prototypes here
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Bramer Console UI",
            width: 16,
            height: 9,
          },
        ],
      },
      // You can add your internship period here if you wish to display it
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
          <>Developing autonomous behaviors with ROS 2, ORB-SLAM, and Computer Vision on Edge AI hardware.</>
        ),
        tags: [
          {
            name: "ROS 2",
            icon: "ros", // Ensure you have a ROS icon or use a generic terminal icon
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
            alt: "Drone Prototype",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Full Stack Engineering",
        description: (
          <>Building robust control interfaces with Next.js, Tauri, and FastAPI.</>
        ),
        tags: [
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Tailwind",
            icon: "tailwind",
          },
          {
            name: "Tauri",
            icon: "app", // Generic app icon if tauri not available
          },
          {
            name: "FastAPI",
            icon: "python", 
          },
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Console Dashboard",
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
  description: `Robotics and Software projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A glimpse into my life and prototypes`,
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