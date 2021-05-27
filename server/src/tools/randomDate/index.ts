export default function RandomDateAroundThisMonth(): Date {
    const seed = Math.ceil(Math.random() * 100 * Math.random() * 100) % 31;
    return new Date(
        new Date().getTime() -
            ((seed *
                24 *
                60 *
                Math.ceil(Math.random() * 100 * Math.random() * 100)) %
                60) *
                1000,
    );
}
