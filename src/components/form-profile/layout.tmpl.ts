let profileTmpl = `
<form class="form profile" id="profile-form">
<div class="profile__content">
    <div class="profile__avatar">
        <img src="{{avatar}}">
    </div>
    <fields></fields>
    <div class="form-actions profile__actions">
        <div class="form-actions__action profile-actions__action" id="change-data" data-action="change">
            <button class="button--link-like">{{change_data_text}}</button>
        </div>
        <div class="form-actions__action profile-actions__action" id="change-password">
            <a href="{{change_password_link}}">{{change_password_text}}</a>
        </div>
        <div class="form-actions__action form-actions__action--dimmed profile-actions__action" id="exit">
            <a href="{{logout_link}}">{{logout_text}}</a>
        </div>
    </div>
    <div class="profile__backlink">
        <a href="{{backlink_link}}">{{backlink_text}}</a>
    </div>
</div>
</form>

`;

export default profileTmpl;
