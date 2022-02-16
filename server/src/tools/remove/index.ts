export function remove<
    T extends Record<string | number | symbol, unknown>,
    U extends keyof T | '' = ''
>(target: T, ...rest: (keyof T)[]): Omit<T, U> {
    return Object.fromEntries(
        Object.entries(target).filter(([n]) => !rest.includes(n)),
    ) as Omit<T, U>;
}

export function get<
    T extends Record<string | number | symbol, unknown>,
    U extends keyof T | '' = ''
>(target: T, ...rest: (keyof T)[]): Pick<T, U> {
    return Object.fromEntries(
        Object.entries(target).filter(([n]) => rest.includes(n)),
    ) as Pick<T, U>;
}

export const Remove = <T extends Record<string | number | symbol, unknown>>(
    ...rest: (keyof T)[]
) => (target: T) => remove(target, ...rest);

export const Get = <T extends Record<string | number | symbol, unknown>>(
    ...rest: (keyof T)[]
) => (target: T) => get(target, ...rest);
