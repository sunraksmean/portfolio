// src/data/seed.ts
import type { Skill, Experience, Project, Certification, Testimonial } from '../types';

export const defaultSkills: Skill[] = [
  {
    "id": "s1",
    "name": "Windows OS Administration",
    "level": 95,
    "category": "Systems & Support"
  },
  {
    "id": "s2",
    "name": "Microsoft 365 & Office",
    "level": 90,
    "category": "Systems & Support"
  },
  {
    "id": "s3",
    "name": "Active Directory",
    "level": 80,
    "category": "Systems & Support"
  },
  {
    "id": "s4",
    "name": "Helpdesk / Ticketing Systems",
    "level": 92,
    "category": "Systems & Support"
  },
  {
    "id": "s5",
    "name": "IT Asset Management",
    "level": 85,
    "category": "Systems & Support"
  },
  {
    "id": "n1",
    "name": "TCP/IP, DNS, DHCP",
    "level": 88,
    "category": "Networking"
  },
  {
    "id": "n2",
    "name": "Router & Switch Config",
    "level": 82,
    "category": "Networking"
  },
  {
    "id": "n3",
    "name": "Wi-Fi Setup & Troubleshooting",
    "level": 90,
    "category": "Networking"
  },
  {
    "id": "n4",
    "name": "MikroTik (Winbox)",
    "level": 78,
    "category": "Networking"
  },
  {
    "id": "n5",
    "name": "LAN/WAN Setup",
    "level": 85,
    "category": "Networking"
  },
  {
    "id": "d1",
    "name": "SQL Queries & Reporting",
    "level": 80,
    "category": "Database & Reporting"
  },
  {
    "id": "d2",
    "name": "MySQL / SQL Server",
    "level": 78,
    "category": "Database & Reporting"
  },
  {
    "id": "d3",
    "name": "Database Backup & Restore",
    "level": 85,
    "category": "Database & Reporting"
  },
  {
    "id": "d4",
    "name": "Core Banking System Support",
    "level": 88,
    "category": "Database & Reporting"
  },
  {
    "id": "t1",
    "name": "AnyDesk / TeamViewer",
    "level": 95,
    "category": "Tools & Security"
  },
  {
    "id": "t2",
    "name": "VMware / VirtualBox",
    "level": 75,
    "category": "Tools & Security"
  },
  {
    "id": "t3",
    "name": "PowerShell / CMD Scripting",
    "level": 72,
    "category": "Tools & Security"
  },
  {
    "id": "t4",
    "name": "Antivirus & System Security",
    "level": 88,
    "category": "Tools & Security"
  },
  {
    "id": "t5",
    "name": "Data Backup & Recovery",
    "level": 85,
    "category": "Tools & Security"
  }
];

export const defaultExperience: Experience[] = [
  {
    "id": "e1",
    "company": "Prasithpheap Credit PLC",
    "role": "Acting Deputy IT Manager",
    "period": "Sep 2022 – Present",
    "duration": "Current",
    "current": true,
    "description": [
      "Leading IT operations and managing the IT team across multiple branches",
      "Set up and supported Loan Management System ensuring smooth daily operations",
      "Organized and coordinated new branch openings including full IT system deployment",
      "Generated and analyzed business reports for CEO, DCEO, CFO, and Branch Managers using SQL queries",
      "Prepared key reports: loan performance, profit & expense, collection, branch targets, staff attendance"
    ]
  },
  {
    "id": "exp-1778746693357",
    "company": "KongVong Finance",
    "role": "Sharehoder  and Owner",
    "period": "",
    "duration": "",
    "description": [
      "Installed, configured and maintained computers, printers, network devices and office software",
      "Provided helpdesk support to staff (hardware, software, network and user accounts)",
      "Managed user access, passwords and permissions",
      "Monitored and maintained office network, Wi-Fi and internet connectivity",
      "Performed system backup and data recovery",
      "Installed and supported business applications used by finance and operations",
      "Maintained company website and basic hosting/deployment",
      "Troubleshoot technical issues quickly to minimize downtime",
      "Supported daily use of accounting and financial systems",
      "Assisted finance team with:",
      "System setup and troubleshooting",
      "Data entry and system validation",
      "Generating reports from systems",
      "Helped ensure data accuracy and system reliability",
      "Supported digital record keeping and document management"
    ],
    "current": false,
    "descText": "Installed, configured and maintained computers, printers, network devices and office software\nProvided helpdesk support to staff (hardware, software, network and user accounts)\nManaged user access, passwords and permissions\nMonitored and maintained office network, Wi-Fi and internet connectivity\nPerformed system backup and data recovery\nInstalled and supported business applications used by finance and operations\nMaintained company website and basic hosting/deployment\nTroubleshoot technical issues quickly to minimize downtime\nSupported daily use of accounting and financial systems\nAssisted finance team with:\nSystem setup and troubleshooting\nData entry and system validation\nGenerating reports from systems\nHelped ensure data accuracy and system reliability\nSupported digital record keeping and document management"
  },
  {
    "id": "exp-1778736273718",
    "company": "Jek Meas168 Hang Banhcham",
    "role": "IT Support – Finance & Operations Support",
    "period": "March 2021 - Sep 2022",
    "duration": "",
    "description": [
      "Installed, configured and maintained computers, printers, network devices and office software",
      "Provided helpdesk support to staff (hardware, software, network and user accounts)",
      "Managed user access, passwords and permissions",
      "Monitored and maintained office network, Wi-Fi and internet connectivity",
      "Performed system backup and data recovery",
      "Installed and supported business applications used by finance and operations",
      "Maintained company website and basic hosting/deployment",
      "Troubleshoot technical issues quickly to minimize downtime",
      "Supported daily use of accounting and financial systems",
      "Assisted finance team with:",
      "System setup and troubleshooting",
      "Data entry and system validation",
      "Generating reports from systems",
      "Helped ensure data accuracy and system reliability",
      "Supported digital record keeping and document management"
    ],
    "current": false,
    "descText": "\nInstalled, configured and maintained computers, printers, network devices and office software\nProvided helpdesk support to staff (hardware, software, network and user accounts)\nManaged user access, passwords and permissions\nMonitored and maintained office network, Wi-Fi and internet connectivity\nPerformed system backup and data recovery\nInstalled and supported business applications used by finance and operations\nMaintained company website and basic hosting/deployment\nTroubleshoot technical issues quickly to minimize downtime\nSupported daily use of accounting and financial systems\nAssisted finance team with:\nSystem setup and troubleshooting\nData entry and system validation\nGenerating reports from systems\nHelped ensure data accuracy and system reliability\nSupported digital record keeping and document management"
  },
  {
    "id": "e2",
    "company": "Prasithpheap Credit PLC",
    "role": "IT Support & System Administrator",
    "period": "Jan 2018 – Feb 2021",
    "duration": "3 years",
    "description": [
      "Worked as Helpdesk Technician and Junior System Administrator",
      "Provided support via phone, remote tools, and on-site assistance",
      "Troubleshot and maintained printers, scanners, and network devices",
      "Provided end-user support and training to improve system usage and efficiency",
      "Installed and maintained CCTV / security camera systems"
    ]
  },
  {
    "id": "e3",
    "company": "IT Global Computer Shop",
    "role": "IT Technician",
    "period": "Mar 2016 – Jan 2018",
    "duration": "Nearly 2 years",
    "description": [
      "Provided IT support services to government ministries, companies, factories, and home users",
      "Installed, configured, and repaired desktop and laptop computers",
      "Set up, configured, and maintained printers (network & local)",
      "Supported network setup including LAN/Wi-Fi configuration and troubleshooting",
      "Delivered and installed IT equipment at customer locations with full setup and testing"
    ]
  }
];

export const defaultProjects: Project[] = [
  {
    "id": "p1",
    "title": "HelpDesk Pro",
    "description": "A full-featured IT helpdesk ticketing system with real-time notifications, SLA tracking, and multi-tier support escalation built for enterprise use.",
    "tech": [
      "React",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "TypeScript",
      "Socket.io"
    ],
    "highlights": [
      "Real-time ticket updates via WebSocket",
      "SLA management and breach alerts",
      "Role-based access control (Admin, Agent, User)",
      "Analytics dashboard with response time metrics",
      "Email notification integration"
    ],
    "status": "live",
    "color": "#0ea5e9"
  },
  {
    "id": "p2",
    "title": "AssetFlow",
    "description": "IT Asset Management System for tracking hardware and software inventory, maintenance schedules, depreciation, and asset assignments across branches.",
    "tech": [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Chart.js"
    ],
    "highlights": [
      "Full lifecycle asset tracking from procurement to disposal",
      "QR code-based asset identification",
      "Maintenance scheduling and reminder system",
      "Branch-wise inventory reports",
      "Depreciation calculator with export to Excel"
    ],
    "status": "live",
    "color": "#06b6d4"
  },
  {
    "id": "p3",
    "title": "Support Analytics Dashboard",
    "description": "Business intelligence dashboard visualizing IT support metrics, response trends, hardware failure rates, and team performance for management reporting.",
    "tech": [
      "React",
      "Recharts",
      "SQL Server",
      "REST API",
      "TypeScript"
    ],
    "highlights": [
      "Interactive charts for ticket volume trends",
      "Team performance and KPI tracking",
      "Hardware failure pattern analysis",
      "Automated daily/weekly/monthly report generation",
      "Export to PDF and Excel"
    ],
    "status": "live",
    "color": "#3b82f6"
  },
  {
    "id": "p4",
    "title": "KnowledgeBase Portal",
    "description": "Internal knowledge base and documentation portal for IT procedures, troubleshooting guides, and standard operating procedures for staff.",
    "tech": [
      "React",
      "Markdown",
      "Node.js",
      "SQLite",
      "Full-text Search"
    ],
    "highlights": [
      "Markdown-based article editor with live preview",
      "Full-text search across all documentation",
      "Category and tag-based organization",
      "Version history and change tracking",
      "Role-based content publishing workflow"
    ],
    "status": "development",
    "color": "#8b5cf6"
  },
  {
    "id": "p5",
    "title": "Personal Portfolio Website",
    "description": "This portfolio website — a responsive, dark/light mode professional showcase built with React + Vite featuring edit mode for dynamic content management.",
    "tech": [
      "React",
      "Vite",
      "TypeScript",
      "CSS Variables",
      "localStorage"
    ],
    "highlights": [
      "Full dark/light mode with smooth transition",
      "Edit mode for real-time content management",
      "Persistent data with localStorage",
      "Fully responsive mobile-first design",
      "Kantumruy Pro font with Khmer heritage"
    ],
    "status": "live",
    "color": "#10b981"
  }
];

export const defaultCertifications: Certification[] = [
  {
    "id": "c1",
    "title": "Bachelor of Information Technology",
    "issuer": "Royal University of Phnom Penh (RUPP)",
    "year": "2018",
    "icon": "🎓"
  },
  {
    "id": "c2",
    "title": "Cisco Networking Fundamentals",
    "issuer": "Cisco Networking Academy",
    "year": "2017",
    "icon": "🌐"
  },
  {
    "id": "c3",
    "title": "Microsoft 365 Fundamentals",
    "issuer": "Microsoft",
    "year": "2022",
    "icon": "☁️"
  },
  {
    "id": "c4",
    "title": "MikroTik Certified Network Associate",
    "issuer": "MikroTik",
    "year": "2021",
    "icon": "📡"
  },
  {
    "id": "c5",
    "title": "Windows Server Administration",
    "issuer": "Microsoft (Self-Study)",
    "year": "2019",
    "icon": "🖥️"
  }
];

export const defaultTestimonials: Testimonial[] = [
  {
    "id": "t1",
    "name": "So Pitou",
    "role": "IT Manager",
    "company": "Prasithpheap Credit PLC",
    "message": "Raksmean is an incredibly dedicated IT professional. His ability to handle complex system deployments across multiple branches while maintaining high service quality is remarkable. He consistently goes above and beyond.",
    "initials": "SP"
  },
  {
    "id": "t2",
    "name": "Branch Operations Team",
    "role": "Operations",
    "company": "Prasithpheap Credit PLC",
    "message": "Whenever we had IT issues, Raksmean was always responsive and professional. His remote support skills saved us countless hours of downtime. A true team player who explains things clearly to non-technical staff.",
    "initials": "BT"
  },
  {
    "id": "t3",
    "name": "Management Team",
    "role": "Senior Management",
    "company": "Prasithpheap Credit PLC",
    "message": "The reports Raksmean generates are always accurate, insightful, and delivered on time. His SQL analysis has helped us make better decisions about branch performance and resource allocation.",
    "initials": "MT"
  }
];
