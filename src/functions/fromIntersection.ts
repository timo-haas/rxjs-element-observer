import { EMPTY, Observable } from 'rxjs';

export type IntersectionObserverEntryWithTypedTarget<
    T extends Element
> = IntersectionObserverEntry & {
    readonly target: T;
};

export function fromIntersection<T extends Element>(
    domElement: T,
    options?: IntersectionObserverInit,
): Observable<IntersectionObserverEntryWithTypedTarget<T>> {
    const globalThat = globalThis || window || self;
    if (!globalThat) {
        return EMPTY;
    }
    if (typeof globalThat.IntersectionObserver !== 'function') {
        return EMPTY;
    }
    return new Observable<IntersectionObserverEntryWithTypedTarget<T>>(
        (subscriber) => {
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    subscriber.next(
                        entry as IntersectionObserverEntryWithTypedTarget<T>,
                    );
                });
            }, options);
            elementObserver.observe(domElement);
            return () => {
                elementObserver.unobserve(domElement);
            };
        },
    );
}
