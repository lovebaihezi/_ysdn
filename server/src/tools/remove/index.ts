export function remove<
    T extends Record<string | number | symbol, unknown>,
    U extends keyof T | '' = ''
>(target: T, ...rest: (keyof T)[]): Omit<T, U> {
    const keyValue = Object.entries(target).filter(([n]) => !rest.includes(n));
    const o = {};
    for (const [n, v] of keyValue) {
        o[n] = v;
    }
    return o as Omit<T, U>;
}

export function get<
    T extends Record<string | number | symbol, unknown>,
    U extends keyof T | '' = ''
>(target: T, ...rest: (keyof T)[]): Omit<T, U> {
    const keyValue = Object.entries(target).filter(([n]) => rest.includes(n));
    const o = {};
    for (const [n, v] of keyValue) {
        o[n] = v;
    }
    return o as Omit<T, U>;
}

export const Remove = <T extends Record<string | number | symbol, unknown>>(
    ...rest: (keyof T)[]
) => (target: T) => remove(target, ...rest);

export const Get = <T extends Record<string | number | symbol, unknown>>(
    ...rest: (keyof T)[]
) => (target: T) => get(target, ...rest);
