import getWeek from '.';

describe('should get correct week number of a Date', () => {
    it('the week should be different', () => {
        const [, result1] = getWeek(new Date('2021-05-19T00:00:00.000Z'));
        const [, result2] = getWeek(new Date('2021-05-27T00:00:00.000Z')); // these two days are not in the same week!
        expect(result1 === result2).toBe(false);
    });
    it('the week should be the same', () => {
        const [, result1] = getWeek(new Date('2021-05-23T00:00:00.000Z'));
        const [, result2] = getWeek(new Date('2021-05-29T00:00:00.000Z')); // these two days are in the same week!
        expect(result1 === result2).toBe(false);
    });
});
