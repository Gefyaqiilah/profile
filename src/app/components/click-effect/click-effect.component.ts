import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser, NgFor } from '@angular/common';
import lottie, { AnimationItem } from 'lottie-web';

interface ClickAnimation {
  id: number;
  x: number;
  y: number;
  element?: HTMLElement;
  animation?: AnimationItem;
}

@Component({
  selector: 'app-click-effect',
  standalone: true,
  imports: [NgFor],
  template: `
    <div
      *ngFor="let item of animations"
      [id]="'click-anim-' + item.id"
      class="click-animation"
      [style.left.px]="item.x"
      [style.top.px]="item.y"
    ></div>
  `,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    }

    .click-animation {
      position: absolute;
      width: 120px;
      height: 120px;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }
  `],
})
export class ClickEffectComponent implements OnInit, OnDestroy {
  animations: ClickAnimation[] = [];
  private counter = 0;
  private clickListener!: (e: MouseEvent) => void;
  private themeObserver!: MutationObserver;
  private isDark = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    this.themeObserver = new MutationObserver(() => {
      this.isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    });
    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    this.clickListener = (e: MouseEvent) => {
      this.ngZone.run(() => this.spawnAnimation(e.clientX, e.clientY));
    };

    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.removeEventListener('click', this.clickListener);
    this.themeObserver?.disconnect();
  }

  private spawnAnimation(x: number, y: number): void {
    const id = this.counter++;
    const entry: ClickAnimation = { id, x, y };
    this.animations.push(entry);

    const animPath = this.isDark
      ? 'assets/animations/mouse-hits-white.json'
      : 'assets/animations/mouse-hits.json';

    setTimeout(() => {
      const el = document.getElementById(`click-anim-${id}`);
      if (!el) return;

      const anim = lottie.loadAnimation({
        container: el,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: animPath,
      });

      anim.addEventListener('complete', () => {
        anim.destroy();
        this.ngZone.run(() => {
          this.animations = this.animations.filter((a) => a.id !== id);
        });
      });
    }, 0);
  }
}
