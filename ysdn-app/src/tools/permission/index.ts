export function* check(needCheck: string, rules: object) {
    for (const i of Object.values(rules)) {
        if (typeof i === 'string' || i instanceof RegExp)
            yield new RegExp(i).test(needCheck);
        else
            throw new TypeError(
                'rules value is not or can not been transfer to a RegExp!'
            );
    }
    return false;
}

export function Check(needCheck: string, rules: object) {
    let final = false;
    for (const i of check(needCheck, rules)) {
        try {
            final ||= i;
        } catch (e) {
            console.error(e);
        }
    }
    return final;
}
