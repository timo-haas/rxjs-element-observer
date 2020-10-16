import { EMPTY, Observable } from 'rxjs';

type FromMutationOptions = MutationObserverInit &
    (
        | {
              childList: true;
          }
        | {
              attributes: true;
          }
        | {
              characterData: true;
          }
    );

export function fromMutation(
    domElement: Element,
    options: FromMutationOptions,
): Observable<MutationRecord[]> {
    const globalThat = globalThis || window || self;
    if (!globalThat) {
        return EMPTY;
    }
    if (typeof globalThat.MutationObserver !== 'function') {
        return EMPTY;
    }
    return new Observable<MutationRecord[]>((subscriber) => {
        const elementObserver = new MutationObserver((entries) => {
            subscriber.next(entries);
        });
        elementObserver.observe(domElement, options);
        return () => {
            elementObserver.disconnect();
        };
    });
}
