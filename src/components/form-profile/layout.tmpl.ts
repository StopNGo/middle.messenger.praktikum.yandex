let profileTmpl = `
<div class="form profile">
    <div class="profile__content">
        <div class="profile__avatar">
            <img src="{{avatar}}">
            <form class="profile__avatar-form">
                <div class="profile__avatar-input-bg"></div>
                <label>
                    <input class="profile__avatar-input" type="file" name="avatar" accept="image/*">
                    <a class="profile__avatar-link">{{upload_avatar_text}}</a>
                </label>
            </form>
        </div>
        <div class="profile__id">{{id_text}} {{id}}</div>
        <form id="profile-form">
            <fields></fields>
            <div class="form-actions profile__actions">
                <div class="form-actions__action profile-actions__action" id="change-data" data-action="change">
                    <button class="button--link-like">{{change_data_text}}</button>
                </div>
                <div class="form-actions__action profile-actions__action" id="change-password">
                    <a href="{{change_password_link}}">{{change_password_text}}</a>
                </div>
                <div class="form-actions__action form-actions__action--dimmed profile-actions__action" id="exit">
                    <a href="{{logout_link}}" class="profile__logoutlink">{{logout_text}}</a>
                </div>
            </div>
            <div class="profile__backlink">
                <a href="{{backlink_link}}">{{backlink_text}}</a>
            </div>
        </form>
    </div>
</div>

`;

export default profileTmpl;
