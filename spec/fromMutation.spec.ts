import { fromMutation } from '.rxjs-element-observer';
describe('fromMutation', () => {
    it('should work', (done) => {
        const testElement = document.createElement('div');
        document.body.appendChild(testElement);
        fromMutation(testElement, { attributes: true }).subscribe((records) => {
            const firstRecord = records[0];
            expect(firstRecord).toBeDefined();
            const {
                type,
                target,
                addedNodes,
                removedNodes,
                previousSibling,
                nextSibling,
                attributeName,
                attributeNamespace,
                oldValue,
            } = firstRecord;
            expect(type).toBe('attributes');
            expect(attributeName).toBe('id');
            done();
        });
        testElement.id = 'testId';
    });
});
