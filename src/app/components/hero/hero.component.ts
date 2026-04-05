import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, AfterViewInit, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  roles = ['Fullstack Developer', 'Mobile Developer', 'Angular & Vue Specialist', 'Ionic Developer'];
  currentRole = '';
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private nameSpeakerAnimation: AnimationItem | null = null;
  private themeObserver!: MutationObserver;
  private baseNameSpeakerDuration = 5;
  private isDark = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.typeEffect();

    } else {
      this.currentRole = this.roles[0];
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    this.isDark.set(document.documentElement.getAttribute('data-theme') === 'dark');

    this.themeObserver = new MutationObserver(() => {
      this.isDark.set(document.documentElement.getAttribute('data-theme') === 'dark');
      console.log('Theme changed, isDark:', this.isDark());
      this.loadNameSpeakerAnimation();
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    setTimeout(() => {
      this.loadNameSpeakerAnimation();
    }, 300);
    }
  }

  loadNameSpeakerAnimation() {
    if (this.nameSpeakerAnimation) {
      this.nameSpeakerAnimation.destroy();
      this.nameSpeakerAnimation = null;
    }
    const el = document.getElementById('name-speaker');
    if (!el) {
      console.error('Element name-speaker not found');
      return;
    }
    const animPath = this.isDark() ? 'assets/animations/speaker-white.json' : 'assets/animations/speaker.json';
    try {
      this.nameSpeakerAnimation = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: animPath,
      });
      this.nameSpeakerAnimation.goToAndStop(this.baseNameSpeakerDuration, true);
      el.onclick = () => {
        const audio = new Audio('/assets/audio/myname.m4a');
        audio.play();
        this.nameSpeakerAnimation?.goToAndPlay(this.baseNameSpeakerDuration, true);
        audio.onended = () => {
          this.nameSpeakerAnimation?.goToAndStop(this.baseNameSpeakerDuration, true);
        }
      }
      this.nameSpeakerAnimation.goToAndStop(5, true);
    } catch (error) {
      console.error('Failed to load lottie animation:', error);
    }
  }
  

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
    if (this.nameSpeakerAnimation) {
      this.nameSpeakerAnimation.destroy();
      this.nameSpeakerAnimation = null;
    }
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
