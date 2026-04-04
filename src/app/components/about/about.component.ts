import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  stats = [
    { value: '5+', label: 'Years Experience' },
    { value: '2021', label: 'Started Professionally' },
    { value: '🏆', label: 'Best Employee in Tech (2023)' },
  ];
}
