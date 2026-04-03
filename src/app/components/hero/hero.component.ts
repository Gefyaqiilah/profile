import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  roles = ['Fullstack Developer', 'Mobile Developer', 'Angular & Vue Specialist', 'Ionic Developer'];
  currentRole = '';
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.typeEffect();
    } else {
      this.currentRole = this.roles[0];
    }
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  private typeEffect() {
    const role = this.roles[this.roleIndex];
    if (!this.isDeleting) {
      this.currentRole = role.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === role.length) {
        this.isDeleting = true;
        this.timer = setTimeout(() => this.typeEffect(), 1800);
        return;
      }
    } else {
      this.currentRole = role.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
    }
    this.timer = setTimeout(() => this.typeEffect(), this.isDeleting ? 60 : 100);
  }
}
