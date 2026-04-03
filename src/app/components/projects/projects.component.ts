import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: 'Web' | 'Mobile' | 'Backend';
  demo?: string;
  repo?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  filters = ['All', 'Web', 'Mobile', 'Backend'];
  activeFilter = 'All';

  projects: Project[] = [
    {
      title: 'AI Assistant Chat',
      description: 'Contributed to system architecture and backend integration for an AI-powered assistant chat. Ensured smooth interaction flow between AI models and end users while improving reliability and UX.',
      tags: ['Node.js', 'NestJS', 'GraphQL'],
      category: 'Backend',
    },
    {
      title: 'Health Tracker Feature',
      description: 'Built a complex health-tracker feature that processes large volumes of data at scale. Overcame multiple technical challenges to ensure reliable performance under load.',
      tags: ['Angular', 'Node.js', 'AWS Lambda'],
      category: 'Web',
    },
    {
      title: 'CRM Web Application',
      description: 'Internal CRM platform for managing customer relationships and business workflows. Built with Angular for a responsive, real-time interface connected to a NestJS backend.',
      tags: ['Angular', 'TypeScript', 'NestJS', 'GraphQL'],
      category: 'Web',
    },
    {
      title: 'Company Profile Website',
      description: 'Public-facing company profile website with a clean design and fast load times. Delivered as a Vue.js SPA with a headless CMS integration.',
      tags: ['Vue.js', 'TypeScript'],
      category: 'Web',
    },
    {
      title: 'Hybrid Mobile App',
      description: 'Cross-platform mobile application deployed to both iOS and Android using Ionic and Capacitor. Responsible for end-to-end development and app store release.',
      tags: ['Ionic', 'Angular', 'Capacitor'],
      category: 'Mobile',
    },
    {
      title: 'Microservices Backend',
      description: 'Designed and developed backend services using a microservices architecture with AWS Lambda functions, enabling scalable and independently deployable modules.',
      tags: ['Node.js', 'AWS Lambda', 'GraphQL'],
      category: 'Backend',
    },
  ];

  get filtered(): Project[] {
    if (this.activeFilter === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }
}
