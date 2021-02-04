export default function* takeForm<T extends object>(
    form: HTMLFormElement,
    format: T
) {
    const Form = new FormData(form);
    for (const name of Object.keys(format)) {
        yield { name, data: Form.get(name) };
    }
}
