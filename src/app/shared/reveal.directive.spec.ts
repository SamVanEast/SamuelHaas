import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RevealDirective } from './reveal.directive';
import { MockIntersectionObserver, installMockIntersectionObserver } from '../../testing/intersection-observer.mock';

@Component({
  imports: [RevealDirective],
  template: `
    <p id="up" appReveal>up</p>
    <p id="left" appReveal="left">left</p>
    <p id="right" appReveal="right">right</p>
  `,
})
class HostComponent {}

describe('RevealDirective', () => {
  afterEach(() => vi.unstubAllGlobals());

  async function render() {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const element = (id: string): HTMLElement => fixture.nativeElement.querySelector(`#${id}`);
    return { fixture, element };
  }

  it('should mark the elements with the direction they slide in from', async () => {
    const { element } = await render();
    expect(element('up').className).toBe('reveal is-visible');
    expect(element('left').classList).toContain('reveal--left');
    expect(element('right').classList).toContain('reveal--right');
  });

  it('should show the content right away when IntersectionObserver is not available', async () => {
    const { element } = await render();
    expect(element('up').classList).toContain('is-visible');
  });

  it('should reveal an element only once it scrolls into view', async () => {
    installMockIntersectionObserver();
    const { fixture, element } = await render();
    expect(element('left').classList).not.toContain('is-visible');

    MockIntersectionObserver.trigger(element('left'));
    await fixture.whenStable();

    expect(element('left').classList).toContain('is-visible');
    expect(element('right').classList).not.toContain('is-visible');
  });
});
