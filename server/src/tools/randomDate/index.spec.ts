import RandomDateAroundThisMonth from '.';

describe('get random Date around this month', () => {
    it('month should in range', () => {
        const result = RandomDateAroundThisMonth();
        const now = new Date();
        expect(result.getMonth()).toBe(now.getMonth());
    });
});
