var common = require("common");
cc.Class({
    extends: cc.Component,

    properties: 
    {
        
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.socket = this.node.getComponent("socket")
        var self = this;
        this.node.on('receive', function (msg) 
		{
            if(msg.SCLogin)
            {
                cc.log("receive sclogin msg");
                cc.log(msg.SCLogin);
                if(msg.SCLogin.ErrorCode!=0)
                {
                    self.socket.logined = false;
                }
                else
                {
                    self.socket.logined = true;
                    common.enableBlock(false);
                }
            }
            else if(msg.SCChat)
            {
                cc.log("receive chat msg")
                cc.log(msg.SCChat)
                common.onChatMsg(msg.SCChat);
            }
		});	
    },

    start () 
    {
        
    },

    // update (dt) {},
});
