const chatSendTmpl = `
<form class="chat-current__send-form">
    <input class="chat-current__send-input" type="text" placeholder="{{placeholder}}" {{pattern}} disabled>
    <button class="chat-current__attach-button"></button>
    <div class="chat-current__send-button-wrapper">
        <button class="chat-current__send-button button button--icon-solo" disabled></button>
    </div>
</form>
`;

export default chatSendTmpl;
