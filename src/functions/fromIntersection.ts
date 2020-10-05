import { EMPTY, Observable } from "rxjs";

export function fromIntersection(
  domElement: Element,
  options?: IntersectionObserverInit
): Observable<IntersectionObserverEntry> {
  if (typeof globalThis.IntersectionObserver !== "function") {
    return EMPTY;
  }
  return new Observable<IntersectionObserverEntry>((subscriber) => {
    const elementObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        subscriber.next(entry);
      });
    }, options);
    elementObserver.observe(domElement);
    return () => {
      elementObserver.unobserve(domElement);
    };
  });
}
