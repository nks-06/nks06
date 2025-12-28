import { Experience, Skill, PersonalInfo } from "@/types/portfolio";
import profileImage1 from "@/assets/profile-1.png";
import profileImage2 from "@/assets/profile-2.png";

export const personalInfo: PersonalInfo = {
  name: "Nasif Kamal",
  title: "ERP & AI Automation Expert",
  subtitle: "Software Developer | IT Administrator | MIS Specialist",
  email: "nasif.kamal06@gmail.com",
  phone: "+8801780522666",
  location: "Uttara, Dhaka, Bangladesh",
  bio: "More than 7 years of professional experience both in the Service and Manufacturing industries while functioning in diversified areas of Data Management and IT Operations with specialties in Software implementation & Operations Management, Process Improvement, Software Testing, Bug fixing & Training Planning, and Procurement & Commercial and Integrated ERP Management Systems. Effectively communicating and performing with leadership in multi-national and local professional groups.",
  profileImage: profileImage1,
  profileImage2: profileImage2,
  linkedin: "https://www.linkedin.com/in/nk06",
  whatsapp: "+8801780522666",
};

export const experiences: Experience[] = [
  {
    id: "1",
    company: "JAAGO Foundation",
    position: "Asst. Manager – Software Systems Administrator",
    startDate: "March 2025",
    endDate: "Present",
    description: "Leading software systems administration across all departments, managing Zoho (CRM, Books, People) and Odoo ERP implementations.",
    responsibilities: [
      "Oversaw and maintained software systems across all departments, including Zoho and Odoo ERP",
      "Led the implementation of Odoo software across multiple departments for seamless transition",
      "Conducted employee training sessions to enhance operational efficiency",
      "Designed and implemented workflows within software platforms to improve operational efficiency",
      "Developed monitoring systems using data visualization tools and dashboards",
    ],
    isCurrent: true,
  },
  {
    id: "2",
    company: "Water and Life Bangladesh",
    position: "Senior Officer – Software Operation",
    startDate: "Jan 2024",
    endDate: "March 2025",
    description: "Managed software operations including Wamasys & Lucca systems, GIS mapping, and data collection tools.",
    responsibilities: [
      "Forming & Operating Wamasys & Lucca systems",
      "Implemented standard forms and formats in the data encoding process",
      "GIS mapping & data collection tools operating",
      "Reduced water loss by 6.09% through process monitoring and controlling",
      "Demand forecasting & planning for collector operations",
    ],
  },
  {
    id: "3",
    company: "Expo Accessories Limited",
    position: "Lead – ERP Implement & Training",
    startDate: "Dec 2022",
    endDate: "Dec 2023",
    description: "Led ERP system implementation to monitor and control entire operation process for warehouse handling materials worth $5.52 million average.",
    responsibilities: [
      "Implemented ERP System to monitor & control the whole operation process",
      "Prepared warehouse handling material worth of average $5.52 million for ERP setup",
      "Process modification to manage monthly average 4,000 tons material movement record",
      "Order booking, production order operation flow management",
      "Logistics optimization and vehicle allocation for 4,000 tons of materials monthly",
    ],
  },
  {
    id: "4",
    company: "APM ERP",
    position: "Senior Executive – ERP & OPS",
    startDate: "Aug 2021",
    endDate: "Nov 2022",
    description: "Focused on combining and establishing standard format ERP for garments accessories with UI/UX design for client requirements.",
    responsibilities: [
      "Combined & established standard format ERP for garments accessories",
      "UI & UX design for client requirements",
      "Set up Data Center (Server Room) for multiple vendors",
      "Sales CRM module management and user ID creation",
      "Production planning module coordination and weekly reporting",
    ],
  },
  {
    id: "5",
    company: "Workspace Infotech Limited",
    position: "Sr. Executive – IT",
    startDate: "Sep 2018",
    endDate: "Apr 2020",
    description: "Handled user training and access control in web applications, maintained web server databases for clients.",
    responsibilities: [
      "Handled user training and access control in Web Applications",
      "Built and maintained database for Web Server",
      "Set up new websites for clients including BOS International",
      "Implemented new web applications for existing and new clients",
      "Performed software tests and prepared QA test reports",
    ],
  },
  {
    id: "6",
    company: "Environ IT Limited",
    position: "Officer – Software Developer",
    startDate: "Jan 2017",
    endDate: "Jun 2018",
    description: "Software development and IT operations focused on delivering quality software solutions.",
    responsibilities: [
      "Software development and testing",
      "Database management and optimization",
      "Client requirement analysis and implementation",
      "Technical documentation and reporting",
    ],
  },
];

export const skills: Skill[] = [
  { name: "ERP Management (Odoo, JDE, ITS)", level: 95, category: "ERP" },
  { name: "AI Automation", level: 85, category: "Technology" },
  { name: "Data Management", level: 92, category: "Data" },
  { name: "IT Operations", level: 90, category: "IT" },
  { name: "Web Development", level: 85, category: "Development" },
  { name: "Data Mining & Analysis", level: 88, category: "Data" },
  { name: "Software Development", level: 82, category: "Development" },
  { name: "GIS & QGIS", level: 80, category: "Technology" },
  { name: "MS Office Suite", level: 95, category: "Tools" },
  { name: "Training & Mentoring", level: 90, category: "Soft Skills" },
  { name: "Process Improvement", level: 88, category: "Management" },
  { name: "Project Management", level: 85, category: "Management" },
];

export const education = [
  {
    degree: "Master of Science in Computer Science",
    institution: "American International University Bangladesh",
    year: "Completed",
    gpa: "2.88/4.00",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "American International University Bangladesh",
    year: "Completed",
    gpa: "Completed",
  },
  {
    degree: "Higher Secondary School Certificate",
    institution: "Cantonment Public School & College, Rangpur",
    year: "Completed",
    gpa: "4.88/5.00",
  },
  {
    degree: "Secondary School Certificate",
    institution: "Cantonment Public School & College, Rangpur",
    year: "Completed",
    gpa: "5.00/5.00",
  },
];

export const certifications = [
  { name: "ERP Management", institution: "APM ERP, Dhaka", year: "2021" },
  { name: "CCNA (Cisco Certified Network Associate)", institution: "AIUB, Dhaka", year: "2021" },
  { name: "Fire Safety & Compliance", institution: "Red Crescent, Rangpur", year: "2015" },
  { name: "Business English", institution: "SPEED", year: "2017" },
  { name: "Advanced Microsoft Excel", institution: "SPEED", year: "2018" },
];
