var common = require("common");
cc.Class({
    extends: cc.Component,

    properties: 
    {
        
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        this.node.on('receive', function (msg) 
		{
            if(msg.SCLogin)
            {
                cc.log("receive sclogin msg");
                cc.log(msg.SCLogin);
            }
            else if(msg.SCChat)
            {
                cc.log("receive chat msg")
                cc.log(msg.SCChat)
                common.onChatMsg(msg.SCChat);
            }
		});	
    },

    start () {

    },

    // update (dt) {},
});
