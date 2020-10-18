import { fromIntersection } from '.rxjs-element-observer';
import { Subscription } from 'rxjs';

describe('fromIntersection', () => {
    let testElement: HTMLDivElement;
    let subscription: Subscription;

    beforeEach(() => {
        testElement = document.createElement('div');
        testElement.style.width = '100px';
        testElement.style.height = '100px';
        testElement.style.position = 'absolute';
        testElement.style.top = '-200px';
        document.body.appendChild(testElement);
    });
    afterEach(() => {
        subscription.unsubscribe();
        document.body.removeChild(testElement);
    });

    it('top 0 should intersect by 1', (done) => {
        subscription = fromIntersection(testElement).subscribe((entry) => {
            expect(entry).toBeDefined();
            expect(entry.target).toBe(testElement);
            expect(entry.isIntersecting).toBe(true);
            expect(entry.intersectionRatio).toBe(1);
            done();
        });
        testElement.style.top = '0px';
    });

    it('top -50 should intersect by 0.5', (done) => {
        subscription = fromIntersection(testElement).subscribe((entry) => {
            expect(entry).toBeDefined();
            expect(entry.target).toBe(testElement);
            expect(entry.isIntersecting).toBe(true);
            expect(entry.intersectionRatio).toBe(0.5);
            done();
        });
        testElement.style.top = '-50px';
    });

    it('top -100 should intersect by 0', (done) => {
        subscription = fromIntersection(testElement).subscribe((entry) => {
            expect(entry).toBeDefined();
            expect(entry.target).toBe(testElement);
            expect(entry.isIntersecting).toBe(true);
            expect(entry.intersectionRatio).toBe(0);
            done();
        });
        testElement.style.top = '-100px';
    });

    it('top -101 should not intersect', (done) => {
        subscription = fromIntersection(testElement).subscribe((entry) => {
            expect(entry).toBeDefined();
            expect(entry.target).toBe(testElement);
            expect(entry.isIntersecting).toBe(false);
            expect(entry.intersectionRatio).toBe(0);
            done();
        });
        testElement.style.top = '-101px';
    });
});
