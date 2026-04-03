import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  open: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      role: 'Fullstack Developer',
      company: 'Asa Ren Global Nusantara',
      period: 'March 2021 — Present',
      description: 'Develop end-to-end projects across mobile, frontend, and backend. Collaborate with the team to analyse and provide technical solutions during grooming sessions. Serve as technical representative in communications with company partners. Provide technical documentation for proposed solutions. Responsible for mobile app deployment for iOS and Android releases. Work closely with UI/UX to ensure implementation aligns with stakeholder expectations.',
      tags: ['Angular', 'Vue.js', 'Ionic', 'Node.js', 'NestJS', 'Bun', 'GraphQL', 'AWS Lambda', 'Mobile App Deployment (iOS & Android)', 'Technical Documentation', 'Agile SDLC'],
      open: true
    }
  ];

  achievements = [
    'Built an AI assistant chat for Asa Ren — contributed to system architecture, backend integration, and ensuring smooth interaction flow between AI and users.',
    'Built a complex health-tracker feature processing large volumes of data, overcoming multiple technical challenges to ensure the system runs reliably at scale.',
    'Awarded Overall Best Employee in Tech Division (2023).',
  ];

  toggle(exp: Experience) {
    exp.open = !exp.open;
  }
}
