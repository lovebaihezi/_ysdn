function* GeneratorTake(target: HTMLFormElement) {
    const InputElements: Array<HTMLInputElement> = [
        ...target.querySelectorAll('input'),
    ];
    for (const e of InputElements) {
        if (e.matches('input') && e.type !== 'submit') {
            yield [e.name, e.value];
        }
    }
}

export default function formTake(target: HTMLFormElement) {
    let x: any = {};
    for (const [name, value] of GeneratorTake(target)) {
        x[name] = value;
    }
    return x;
}
