import { fromResize } from '.rxjs-element-observer';
import { Subscription } from 'rxjs';

describe('fromResize', () => {
    let testElement: HTMLDivElement;
    let subscription: Subscription;

    beforeEach(() => {
        testElement = document.createElement('div');
        testElement.style.width = '100px';
        testElement.style.height = '100px';
        document.body.appendChild(testElement);
    });
    afterEach(() => {
        subscription.unsubscribe();
        document.body.removeChild(testElement);
    });

    it('should trigger on width change', (done) => {
        subscription = fromResize(testElement).subscribe((entry) => {
            expect(entry).toBeDefined();
            expect(entry.target).toBe(testElement);
            done();
        });
        testElement.style.width = '50px';
    });

    it('should trigger on from child append', (done) => {
        testElement.style.width = 'auto';

        subscription = fromResize(testElement).subscribe((entry) => {
            expect(entry).toBeDefined();
            expect(entry.target).toBe(testElement);
            done();
        });
        const childTestElement = document.createElement('div');
        childTestElement.style.width = '100px';
        childTestElement.style.height = '100px';
        testElement.appendChild(childTestElement);
    });
});
