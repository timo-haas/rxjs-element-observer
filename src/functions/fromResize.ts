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

export type ResizeObserverEntryWithTypedTarget<
  T extends Element
> = ResizeObserverEntry & {
  readonly target: T;
};

export function fromResize<T extends Element>(
  domElement: T,
  options?: ResizeObserverOptions
): Observable<ResizeObserverEntryWithTypedTarget<T>> {
  const globalThat = globalThis || window || self;
  if (!globalThat) {
    return EMPTY;
  }
  if (typeof (globalThat as any).ResizeObserver !== "function") {
    return EMPTY;
  }
  return new Observable<ResizeObserverEntryWithTypedTarget<T>>((subscriber) => {
    const elementObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        subscriber.next(entry as ResizeObserverEntryWithTypedTarget<T>);
      });
    });
    elementObserver.observe(domElement, options);
    return () => {
      elementObserver.unobserve(domElement);
    };
  });
}
