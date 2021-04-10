let chatMessageTmpl = `
<div class="chat-message {{classes}}">
    <div class="chat-message__time">{{time}}<span class="chat-message__meta"></span></div>
    <div class="chat-message__text">
        {{content}}
    </div>
</div>
`;

export default chatMessageTmpl;
