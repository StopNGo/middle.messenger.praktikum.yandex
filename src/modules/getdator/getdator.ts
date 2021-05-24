export default function getDataFromForm(DOMstrings: {[key: string]: string}) {
    const form = document.querySelector(DOMstrings.form);
    if (form) {
        const dataFeilds = document.querySelectorAll<HTMLInputElement>(DOMstrings.dataField);
        if (dataFeilds) {
            form.addEventListener('submit', evt => {
                evt.preventDefault();
                const dataOutput: {[name: string]: any} = {};
                dataFeilds.forEach(field => {
                    if (field.dataset.name) {
                        dataOutput[field.dataset.name] = field.value;
                    }
                });
            });
        }
    }
}
