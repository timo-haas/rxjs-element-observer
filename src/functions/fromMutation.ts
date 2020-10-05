import { EMPTY, Observable } from "rxjs";

export function fromMutation(
  domElement: Element
): Observable<MutationRecord[]> {
  if (typeof globalThis.MutationObserver !== "function") {
    return EMPTY;
  }
  return new Observable<MutationRecord[]>((subscriber) => {
    const elementObserver = new MutationObserver((entries) => {
      subscriber.next(entries);
    });
    elementObserver.observe(domElement);
    return () => {
      elementObserver.disconnect();
    };
  });
}
