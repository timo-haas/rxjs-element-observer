import { fromMutation } from '.rxjs-element-observer';
import { Subscription } from 'rxjs';

describe('fromMutation', () => {
    let testElement: HTMLDivElement;
    let subscription: Subscription;

    beforeEach(() => {
        testElement = document.createElement('div');
        document.body.appendChild(testElement);
    });
    afterEach(() => {
        subscription.unsubscribe();
        document.body.removeChild(testElement);
    });

    it('should trigger attribute id mutation', (done) => {
        subscription = fromMutation(testElement, {
            attributes: true,
        }).subscribe((records) => {
            const record = records[0];
            expect(record).toBeDefined();
            expect(record.type).toBe('attributes');
            expect(record.attributeName).toBe('id');
            done();
        });
        testElement.id = 'testId';
    });
});
