
cc.Class({
    extends: cc.Component,

    properties: 
	{
    
    },

    // LIFE-CYCLE CALLBACKS:

	onLoad () 
	{
		cc.log("33333333333333333333");
		this.node.on('say-hello', function (msg) 
		{
			cc.log("22222222222222222");
			console.log(msg);
		});	
	},

    start () {

    },

    // update (dt) {},
});
