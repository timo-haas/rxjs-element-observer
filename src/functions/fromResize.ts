import { EMPTY, Observable } from "rxjs";

export declare interface ResizeObserverSize {
  readonly inlineSize: number;
  readonly blockSize: number;
}

export declare interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: ResizeObserverSize[];
  readonly contentBoxSize: ResizeObserverSize[];
  readonly devicePixelContentBoxSize: ResizeObserverSize[];
}

export declare type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void;

export declare interface ResizeObserverOptions {
  box: "content-box" | "border-box";
}

export declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe(target: Element, options?: ResizeObserverOptions): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

export function fromResize(
  domElement: Element,
  options?: ResizeObserverOptions
): Observable<ResizeObserverEntry> {
  if (typeof (globalThis as any).ResizeObserver !== "function") {
    return EMPTY;
  }
  return new Observable<ResizeObserverEntry>((subscriber) => {
    const elementObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        subscriber.next(entry);
      });
    });
    elementObserver.observe(domElement, options);
    return () => {
      elementObserver.unobserve(domElement);
    };
  });
}
