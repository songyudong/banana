module.exports = 
{
    chatRecord : [],
    
    onChatMsg:function(msg)
    {
        this.chatRecord.push(msg)
        cc.log(this.chatRecord);

        if(this.chatNode)
        {
            var chat = this.chatNode.getComponent("chat");
            chat.refresh();
        }
    },

    socket : null,
    persist : null,
    chatNode : null,
};