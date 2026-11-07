import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';

export type RevealDirection = 'up' | 'left' | 'right';

/**
 * Fades an element in (optionally sliding from the left or right) once it scrolls into view.
 * The styles live in styles.scss (.reveal); users who prefer reduced motion see the content without animation.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal--left]': "appReveal() === 'left'",
    '[class.reveal--right]': "appReveal() === 'right'",
    '[class.is-visible]': 'visible()',
  },
})
export class RevealDirective {
  /** Direction the element slides in from; an empty attribute means "up". */
  readonly appReveal = input<RevealDirection | ''>('up');
  protected readonly visible = signal(false);

  constructor() {
    const element: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        // reveal once the top of the element has passed 85% of the viewport height
        { rootMargin: '0px 0px -15% 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
