const [start, end] = [...document.querySelectorAll('select')];
(async () => {
    start.innerHTML = "";
    start.value = "fetching..";
    const res = await fetch('/start', { method: 'POST' });
    const text = await res.json();
    const json = JSON.parse(text);
    start.innerHTML = '<option value="">...select</option>';
    const elements = json.map(((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.text = name;
        return option;
    }));
    elements.forEach((e) => {
        start.appendChild(e);
    });
})().catch(e => {
    alert(e);
});
start.onclick = async () => {
    if (start.value === '...select') {
        end.innerHTML = "no result";
    }
    else {
        try {
            end.innerHTML = "";
            const res = await fetch('/end', { method: 'post', body: start.value });
            const text = await res.text();
            const json = JSON.parse(text);
            const elements = json.map(((name) => {
                const option = document.createElement('option');
                option.value = name;
                option.text = name;
                return option;
            }));
            elements.forEach((e) => {
                end.appendChild(e);
            });
        }
        catch (e) {
            alert(e);
        }
    }
};
