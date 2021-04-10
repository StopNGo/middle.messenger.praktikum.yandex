let formLoginTmpl = `
    <form action="{{submit_button_link}}" class="form {{class}}">
        <h2 class="form__title {{class}}__title">{{title}}</h2>
        <fields></fields>
        <div class="form_actions {{class}}__actions">
            <div class="form__button-wrapper {{class}}__submit-button-wrapper">
                <button class="form_button {{class}}__submit-button">{{submit_button_text}}</button>
            </div>
            <a class="form__aditional-link {{class}}__additional-link" href="{{additional_link}}">{{additional_link_text}}</a>
        </div>
    </form>

`;

export default formLoginTmpl;
