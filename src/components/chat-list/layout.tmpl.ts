let chatListTmpl = `
<section class="chat-list {{classes}}">
    <div class="chat-list__search">
        <input class="chat-list__search-input" type="text" placeholder="Поиск">
        <button class="chat-list__search-button"></button>
    </div>
    <div class="chat-list__scroll-area">
        <items></items>
    </div>
    <div class="chat-list__add-button-wrapper">
        <button class="chat-list__add-button button button--icon-solo"></button>
    </div>
</section>
`;

export default chatListTmpl;
