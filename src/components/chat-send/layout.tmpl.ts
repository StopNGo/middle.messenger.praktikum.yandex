let chatSendTmpl = `
<form class="chat-current__send-form">
    <input class="chat-current__send-input" type="text" placeholder="{{placeholder}}" {{pattern}}>
    <button class="chat-current__attach-button"></button>
    <div class="chat-current__send-button-wrapper">
        <button class="chat-current__send-button button button--icon-solo"></button>
    </div>
</form>
`;

export default chatSendTmpl;
