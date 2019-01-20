var common = require("common");
cc.Class({
    extends: cc.Component,

    properties: 
	{
		inited : false,		
		chatNode : cc.Node,
		
		ip : "127.0.0.1",
		port : 3653,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
	{
		common.socket = this
	},
	
	connect()
	{
		if(this.inited)
		{
			cc.log("socket has already inited");
			return;
		}
		var url = "ws://" + this.ip + ":" + this.port;
		this.ws = new WebSocket(url);
		this.ws.binaryType = "arraybuffer"
		var self = this;
		this.ws.onopen = function()
		{
			cc.log("login");
			cc.log(self.ws)
			
			self.inited = true;
			self.ws.send(JSON.stringify({CSLogin:{
					UserName:'song',
					Password:'111111'
				}}))
		};
		
		this.ws.onmessage = function(event)
		{
			var decoder = new window.TextDecoder("utf-8")
			var data = JSON.parse(decoder.decode(event.data));
			self.receive(data);
		};
		
		this.ws.onerror = function (event) 
		{
			cc.log("network error");
		};
		
		this.ws.onclose = function()
		{
			cc.log("network colsed");
			self.inited = false;
		};
	},
	
	
    start () 
	{
		this.connect();
		
    },
	
	send:function(data)
	{
		cc.log(this.ws)
		if(this.inited==false)
		{
			cc.log("socket is not ready");
		}
		else if(this.ws.readyState == WebSocket.OPEN)
		{
			cc.log("send msg:"+data)
			let pdata = JSON.stringify(data);
			this.ws.send(pdata);
		}
		else
		{
			cc.log("socket ready state:" + this.ws.readyState);
		}
			
	},
	
	receive:function(data)
	{
		cc.log("receive messsage:" + data)
		this.node.emit("receive", data);
	},
	

    // update (dt) {},
});
