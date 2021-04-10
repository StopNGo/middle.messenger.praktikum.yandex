import formData from './data.json';

window.onload = () => {
    const DOMstrings = {
        profileForm: 'profile-form',
        changeData: 'change-data',
        dataField: '.profile input'
    };

    const profileForm = document.getElementById(DOMstrings.profileForm);
    const changeData = document.getElementById(DOMstrings.changeData);
    if (profileForm && changeData) {
        const dataFeilds = document.querySelectorAll(DOMstrings.dataField);
        if (dataFeilds) {
            profileForm.addEventListener('submit', evt => {
                if (changeData.dataset.action === 'change') {
                    evt.preventDefault();
                    dataFeilds.forEach((field: HTMLInputElement) => {
                        field.readOnly = false;
                    });
                    changeData.dataset.action = 'save';
                    if (changeData.firstElementChild) {
                        changeData.firstElementChild.textContent = formData.form_body.save_data_text;
                    }
                } else if (changeData.dataset.action === 'save') {
                    evt.preventDefault();
                    const dataOutput: {[name: string]: any} = {};
                    dataFeilds.forEach((field: HTMLInputElement) => {
                        field.readOnly = true;
                        if (field.dataset.name) {
                            dataOutput[field.dataset.name] = field.value;
                        }
                    });
                    console.log(dataOutput);
                    changeData.dataset.action = 'change';
                    if (changeData.firstElementChild) {
                        changeData.firstElementChild.textContent = formData.form_body.change_data_text;
                    }
                }
            });
        }
    }
};
