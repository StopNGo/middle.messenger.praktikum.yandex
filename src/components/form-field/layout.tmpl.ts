let formFieldTmpl = `
<div class="form__field {{class}}">
    <label class="form__label {{class}}-label">{{label}}</label>
    <input class="form__input {{class}}-input" data-name="{{data_name}}" type="{{type}}"
    value="{{value}}" {{pattern}} placeholder="{{placeholder}}" {{required}} {{readonly}}>
</div>
`;

export default formFieldTmpl;
