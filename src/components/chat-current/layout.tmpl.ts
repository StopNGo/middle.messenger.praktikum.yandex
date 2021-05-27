const chatListItemTmpl = `
<section class="chat-current">
    <div class="chat-current__name">
        <h2>{{name}}</h2>
        <div class="chat-current__actions">
            <a href="#" class="chat-current__action chat-current__action--add-user">{{add_user_text}}</a>
            <a href="#" class="chat-current__action chat-current__action--delete-user">{{delete_user_text}}</a>
        </div>
    </div>
    <div class="chat-current__messages">
        <messages></messages>
    </div>
    <send></send>
</section>
`;

export default chatListItemTmpl;
