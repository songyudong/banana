var common = require("common");
cc.Class({
    extends: cc.Component,

    properties: 
	{
		input : cc.EditBox,
		record : cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

	onLoad () 
	{
		common.chatNode = this;
	},

	start () 
	{
		
	},
	
	onSendButton:function()
	{
		cc.log("chat send")
		cc.log(this.input.string);
		common.socket.send({CSChat:{
			Content:this.input.string,
		}});

		this.input.string = ""
	},

	onDestroy:function()
	{
		common.chatNode = null;
	},

	refresh:function()
	{
		var all = "";
		for(let i=0; i<common.chatRecord.length; i++)
		{
			let rc = common.chatRecord[i];
			all += rc.UserName + ":" + rc.Content;
			if(i!=common.chatRecord.length-1)
			{
				all += "\n"
			}
		}

		this.record.string = all;
	},

    // update (dt) {},
});
