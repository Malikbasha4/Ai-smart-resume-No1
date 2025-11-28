import { Resume } from '../types';
import { INITIAL_RESUME } from '../constants';

export interface RoleTemplate {
  id: string;
  name: string;
  category: string;
  data: Partial<Resume>;
}

export const ROLE_TEMPLATES: RoleTemplate[] = [
  {
    id: 'software-engineer',
    name: 'Software Engineer',
    category: 'Technology',
    data: {
      title: 'Senior Software Engineer',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Innovative Software Engineer with 6+ years of experience in full-stack development, cloud computing, and system architecture. Proven track record of delivering scalable web applications and leading agile teams. Expert in React, Node.js, and AWS.',
      },
      skills: [
        { id: '1', name: 'React.js', level: 'Expert' },
        { id: '2', name: 'Node.js', level: 'Advanced' },
        { id: '3', name: 'TypeScript', level: 'Advanced' },
        { id: '4', name: 'AWS (Lambda, S3, EC2)', level: 'Intermediate' },
        { id: '5', name: 'Docker & Kubernetes', level: 'Intermediate' },
        { id: '6', name: 'System Design', level: 'Advanced' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'TechFlow Solutions',
          position: 'Senior Software Engineer',
          startDate: '2021-03-01',
          endDate: '',
          current: true,
          description: 'Lead a team of 5 developers in rebuilding the legacy CRM system, resulting in a 40% performance improvement.\nArchitected and deployed microservices using Node.js and Docker on AWS.\nImplemented CI/CD pipelines reducing deployment time by 60%.'
        },
        {
          id: 'exp2',
          company: 'Innovate Digital',
          position: 'Software Developer',
          startDate: '2018-06-01',
          endDate: '2021-02-28',
          current: false,
          description: 'Developed responsive frontend interfaces using React and Redux.\nCollaborated with UX designers to implement pixel-perfect designs.\nOptimized database queries in PostgreSQL, reducing load times by 25%.'
        }
      ],
      education: [
        {
          id: 'edu1',
          school: 'University of Technology',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2014-09-01',
          endDate: '2018-05-01',
          current: false
        }
      ],
      projects: [
        {
          id: 'proj1',
          name: 'E-Commerce Platform',
          description: 'Built a full-featured e-commerce platform handling 10k+ daily users.',
          technologies: 'Next.js, Stripe, PostgreSQL'
        }
      ]
    }
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    category: 'Data',
    data: {
      title: 'Data Analyst',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Detail-oriented Data Analyst with expertise in data visualization, statistical analysis, and predictive modeling. Skilled in transforming complex datasets into actionable strategic insights. Proficient in Python, SQL, and Tableau.',
      },
      skills: [
        { id: '1', name: 'Python (Pandas, NumPy)', level: 'Advanced' },
        { id: '2', name: 'SQL', level: 'Expert' },
        { id: '3', name: 'Tableau / PowerBI', level: 'Advanced' },
        { id: '4', name: 'Statistical Analysis', level: 'Advanced' },
        { id: '5', name: 'Machine Learning Basics', level: 'Intermediate' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'Global Insights Corp',
          position: 'Data Analyst',
          startDate: '2020-01-01',
          endDate: '',
          current: true,
          description: 'Designed interactive dashboards in Tableau to track KPIs, saving the management team 10 hours of reporting time weekly.\nAnalyzed customer churn data to identify key risk factors, leading to a 15% retention strategy improvement.\nAutomated ETL processes using Python scripts.'
        }
      ],
      education: [
        {
          id: 'edu1',
          school: 'State University',
          degree: 'Bachelor of Science',
          field: 'Statistics',
          startDate: '2015-09-01',
          endDate: '2019-05-01',
          current: false
        }
      ],
      projects: []
    }
  },
  {
    id: 'business-analyst',
    name: 'Business Analyst',
    category: 'Business',
    data: {
      title: 'Business Analyst',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Strategic Business Analyst with 5+ years of experience bridging the gap between IT and business stakeholders. Expert in requirements gathering, process modeling, and agile methodologies. Committed to driving operational efficiency.',
      },
      skills: [
        { id: '1', name: 'Requirements Gathering', level: 'Expert' },
        { id: '2', name: 'Process Modeling (BPMN)', level: 'Advanced' },
        { id: '3', name: 'Agile & Scrum', level: 'Advanced' },
        { id: '4', name: 'JIRA / Confluence', level: 'Advanced' },
        { id: '5', name: 'SQL', level: 'Intermediate' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'FinTech Corp',
          position: 'Senior Business Analyst',
          startDate: '2019-05-01',
          endDate: '',
          current: true,
          description: 'Facilitated workshops to gather requirements for a new loan processing system.\nCreated detailed user stories and acceptance criteria for the development team.\nConducted UAT testing and user training sessions.'
        }
      ],
      education: [],
      projects: []
    }
  },
  {
    id: 'nurse',
    name: 'Registered Nurse',
    category: 'Healthcare',
    data: {
      title: 'Registered Nurse (RN)',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Compassionate Registered Nurse with 7 years of experience in ER and ICU settings. Dedicated to providing high-quality patient care, advocating for patient needs, and maintaining strict safety protocols. Certified in ACLS and BLS.',
      },
      skills: [
        { id: '1', name: 'Patient Care', level: 'Expert' },
        { id: '2', name: 'Emergency Response', level: 'Expert' },
        { id: '3', name: 'Medication Administration', level: 'Expert' },
        { id: '4', name: 'Electronic Health Records (Epic)', level: 'Advanced' },
        { id: '5', name: 'Team Leadership', level: 'Advanced' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'City General Hospital',
          position: 'ICU Nurse',
          startDate: '2018-08-01',
          endDate: '',
          current: true,
          description: 'Monitor critical patients and administer life-saving treatments in a high-pressure environment.\nCollaborate with multidisciplinary teams to develop and implement patient care plans.\nMentor new nursing staff and students.'
        }
      ],
      education: [
        {
          id: 'edu1',
          school: 'Medical College',
          degree: 'Bachelor of Science',
          field: 'Nursing',
          startDate: '2014-09-01',
          endDate: '2018-05-01',
          current: false
        }
      ],
      projects: []
    }
  },
  {
    id: 'it-support',
    name: 'IT Support Specialist',
    category: 'Technology',
    data: {
      title: 'IT Support Specialist',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Reliable IT Support Specialist with strong troubleshooting skills and a customer-centric approach. Experienced in hardware configuration, network troubleshooting, and software deployment. Proven ability to resolve tickets efficiently under SLAs.',
      },
      skills: [
        { id: '1', name: 'Hardware Troubleshooting', level: 'Expert' },
        { id: '2', name: 'Windows/MacOS/Linux', level: 'Advanced' },
        { id: '3', name: 'Active Directory', level: 'Intermediate' },
        { id: '4', name: 'Office 365 Admin', level: 'Intermediate' },
        { id: '5', name: 'Network Fundamentals', level: 'Intermediate' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'TechServices Inc.',
          position: 'IT Helpdesk Technician',
          startDate: '2020-02-01',
          endDate: '',
          current: true,
          description: 'Resolved 50+ support tickets daily regarding hardware, software, and network connectivity.\nManaged user accounts and permissions in Active Directory.\nDeployed and reimaged workstations for new hires.'
        }
      ],
      education: [],
      projects: []
    }
  },
  {
    id: 'customer-support',
    name: 'Customer Support',
    category: 'Service',
    data: {
      title: 'Customer Support Representative',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Empathetic Customer Support Professional committed to delivering exceptional service and resolving complex issues. Strong communication skills with a track record of maintaining high CSAT scores. Experienced with Zendesk and Salesforce.',
      },
      skills: [
        { id: '1', name: 'Conflict Resolution', level: 'Expert' },
        { id: '2', name: 'CRM Software (Zendesk)', level: 'Advanced' },
        { id: '3', name: 'Written Communication', level: 'Expert' },
        { id: '4', name: 'Technical Support', level: 'Intermediate' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'SaaS Startup',
          position: 'Customer Success Specialist',
          startDate: '2021-01-01',
          endDate: '',
          current: true,
          description: 'Handled inbound inquiries via chat, email, and phone, maintaining a 98% satisfaction rating.\nCreated knowledge base articles to reduce ticket volume.\nCollaborated with product teams to escalate and resolve bugs.'
        }
      ],
      education: [],
      projects: []
    }
  },
  {
    id: 'qa-analyst',
    name: 'QA Analyst',
    category: 'Technology',
    data: {
      title: 'Quality Assurance Analyst',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Detail-oriented QA Analyst with experience in manual and automated testing. Skilled in designing test plans, identifying bugs, and ensuring software quality. proficient in Selenium, Jira, and SQL.',
      },
      skills: [
        { id: '1', name: 'Manual Testing', level: 'Expert' },
        { id: '2', name: 'Test Automation (Selenium)', level: 'Intermediate' },
        { id: '3', name: 'JIRA / Bug Tracking', level: 'Advanced' },
        { id: '4', name: 'API Testing (Postman)', level: 'Intermediate' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'SoftSys',
          position: 'QA Engineer',
          startDate: '2019-06-01',
          endDate: '',
          current: true,
          description: 'Executed test cases for web and mobile applications, identifying critical defects prior to release.\nDeveloped automated test scripts using Selenium WebDriver, reducing regression testing time by 30%.\nParticipated in daily stand-ups and sprint planning.'
        }
      ],
      education: [],
      projects: []
    }
  },
  {
    id: 'pharmacist',
    name: 'Pharmacist',
    category: 'Healthcare',
    data: {
      title: 'Clinical Pharmacist',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Licensed Pharmacist with extensive knowledge of pharmaceuticals, drug interactions, and patient counseling. Committed to ensuring medication safety and accuracy. Strong attention to detail and ability to work in fast-paced environments.',
      },
      skills: [
        { id: '1', name: 'Medication Dispensing', level: 'Expert' },
        { id: '2', name: 'Patient Counseling', level: 'Expert' },
        { id: '3', name: 'Inventory Management', level: 'Advanced' },
        { id: '4', name: 'Pharmacy Software', level: 'Advanced' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'HealthPlus Pharmacy',
          position: 'Staff Pharmacist',
          startDate: '2018-01-01',
          endDate: '',
          current: true,
          description: 'Review prescriptions for accuracy and potential drug interactions.\nCounsel patients on proper medication usage and side effects.\nManage inventory and order controlled substances.'
        }
      ],
      education: [
         {
          id: 'edu1',
          school: 'School of Pharmacy',
          degree: 'Doctor of Pharmacy (Pharm.D.)',
          field: 'Pharmacy',
          startDate: '2012-09-01',
          endDate: '2016-05-01',
          current: false
        }
      ],
      projects: []
    }
  },
  {
    id: 'data-entry',
    name: 'Data Entry Clerk',
    category: 'Admin',
    data: {
      title: 'Data Entry Specialist',
      personalInfo: {
        ...INITIAL_RESUME.personalInfo,
        summary: 'Efficient Data Entry Specialist with excellent typing speed (80+ WPM) and accuracy. Proficient in MS Excel and database management. Highly organized and capable of handling large volumes of data with confidentiality.',
      },
      skills: [
        { id: '1', name: 'Fast Typing (80 WPM)', level: 'Expert' },
        { id: '2', name: 'Microsoft Excel', level: 'Advanced' },
        { id: '3', name: 'Data Verification', level: 'Advanced' },
        { id: '4', name: 'Attention to Detail', level: 'Expert' }
      ],
      workExperience: [
        {
          id: 'exp1',
          company: 'Logistics Co.',
          position: 'Data Entry Clerk',
          startDate: '2020-01-01',
          endDate: '',
          current: true,
          description: 'Entered shipping and inventory data into the ERP system with 99.9% accuracy.\nVerified data integrity by comparing source documents with system records.\nGenerated weekly reports for management.'
        }
      ],
      education: [],
      projects: []
    }
  }
];