const form = document.querySelector('form');
const select = document.querySelector('select');
const tbody = document.querySelector('tbody');
form.onsubmit = async (e) => {
    e.preventDefault();
    tbody.innerHTML = "";
    const body = select.value;
    const res = await fetch('/query', { method: 'POST', body });
    const json = await res.json();
    json.forEach((A) => {
        const tr = document.createElement('tr');
        A.map((v) => {
            const td = document.createElement('td');
            td.innerText = v;
            return td;
        }).forEach((d) => {
            tr.appendChild(d);
        });
        tbody.appendChild(tr);
    });
};
