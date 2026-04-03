import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgFor],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  categories = [
    {
      name: 'Frontend',
      items: ['Angular', 'Vue.js', 'Javascript','TypeScript', 'RxJS', 'HTML & CSS', 'State Management (NgRx, Reduxe, Vuex)']
    },
    {
      name: 'Mobile',
      items: ['Ionic', 'Capacitor', 'Cordova', 'iOS & Android', 'Hybrid Apps']
    },
    {
      name: 'Backend',
      items: ['Node.js', 'NestJS', 'GraphQL', 'AWS Lambda', 'Microservices', 'REST API']
    },
    {
      name: 'Testing',
      items: ['Vitest', 'Karma']
    },
    {
      name: 'Practices',
      items: ['Agile SDLC', 'UI/UX Implementation', 'System Analysis', 'Technical Documentation', 'Code Review', 'Mobile App Deployment (IOS & Android)']
    }
  ];
}
