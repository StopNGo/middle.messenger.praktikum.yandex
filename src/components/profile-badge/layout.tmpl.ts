let profileBadgeTmpl = `
<div class="profile-badge">
    <a href="{{link}}">
        <div class="profile-badge__avatar"><img src="{{avatar}}"></div>
    </a>
    <form action="{{link}}">
        <button class="profile-badge__profile-menu-button" submit></button>
    </form>
</div>
`;

export default profileBadgeTmpl;
