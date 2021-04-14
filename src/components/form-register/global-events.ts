import getDataFromForm from '../../modules/getdator/getdator';

window.onload = () => {
    const DOMstrings = {
        form: '.register-form',
        dataField: '.register-form input'
    };

    getDataFromForm(DOMstrings);
};
