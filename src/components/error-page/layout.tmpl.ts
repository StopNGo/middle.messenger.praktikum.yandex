let errorPageTmpl = `
<div class="error-page">
    <div class="error-page__content">
        <h1 class="error-page__error-number">{{error_number}}</h1>
        <div class="error-page__error-text">{{error_text}}</div>
    </div>
    <div class="error-page__backlink">
        <a href="{{backlink_link}}">{{backlink_text}}</a>
    </div>
</div>
`;

export default errorPageTmpl;
