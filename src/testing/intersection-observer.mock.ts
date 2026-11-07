/**
 * Minimal IntersectionObserver replacement for jsdom, which does not implement it.
 * Tests can trigger intersections manually via MockIntersectionObserver.trigger().
 */
export class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  readonly targets = new Set<Element>();
  disconnected = false;

  constructor(
    private readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.targets.add(target);
  }

  unobserve(target: Element): void {
    this.targets.delete(target);
  }

  disconnect(): void {
    this.disconnected = true;
    this.targets.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Simulates the target entering (or leaving) the observed area. */
  static trigger(target: Element, isIntersecting = true): void {
    for (const observer of MockIntersectionObserver.instances) {
      if (observer.targets.has(target)) {
        observer.callback([{ target, isIntersecting } as IntersectionObserverEntry], observer as unknown as IntersectionObserver);
      }
    }
  }
}

export function installMockIntersectionObserver(): void {
  MockIntersectionObserver.instances = [];
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
}
