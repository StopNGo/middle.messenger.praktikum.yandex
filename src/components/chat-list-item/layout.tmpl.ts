const chatListItemTmpl = `
<div class="chat-list-item {{classes}}">
    <div class="chat-list-item__avatar"><img src="{{avatar}}"></div>
    <div class="chat-list-item__content">
        <div class="chat-list-item__name">{{name}}</div>
        <div class="chat-list-item__text">{{text}}</div>
    </div>
    <div class="chat-list-item__meta">
        <time class="chat-list-item__time">{{time}}</time>
        <div class="chat-list-item__counter">{{counter}}</div>
    </div>
    <div class="chat-list-item__delete"></div>
</div>
`;

export default chatListItemTmpl;
