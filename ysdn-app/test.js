const countdown = (time, ...rest) => new Promise((access, denied) => {
    const tricker = setTimeout(
        rest => {
            clearTimeout(tricker);
            access.apply(access, rest);
        },
        time,
        rest
    );
});

(async () => {
    console.log(new Date())
    countdown(500, 1, 2, 3).then(console.log)
})()