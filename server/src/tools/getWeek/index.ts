export default function getWeek(date: Date): [number, number] {
    const nearestThursday = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    nearestThursday.setUTCDate(
        nearestThursday.getUTCDate() + 4 - (nearestThursday.getUTCDay() || 7),
    );
    const FirstDayOfYear = new Date(
        `${date.getFullYear()}-01-01T00:00:00.000Z`,
    );
    return [
        date.getFullYear(),
        Math.ceil(
            ((nearestThursday.getTime() - FirstDayOfYear.getTime()) / 86400000 +
                1) /
                7,
        ) + 1,
    ];
}

export const getThisWeekAndPreviousWeek = (): [Date, Date] => {
    const thisWeek = new Date();
    const lastWeek = new Date(thisWeek.getTime() - 7 * 24 * 60 * 60 * 1000);
    return [thisWeek, lastWeek];
};
