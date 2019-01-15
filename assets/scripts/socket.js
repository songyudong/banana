cc.Class({
    extends: cc.Component,

    properties: 
	{
		webSocketRes:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () 
	{
		//this.sendWebSocket();		
		this.testLeafServer();
    },
	
	testLeafServer : function()
	{
		
		console.log("test leafserver");
        var self = this;
		self.webSocketRes.string = "";
        var ws = new WebSocket("ws://127.0.0.1:3653");
		ws.binaryType = "arraybuffer"
		ws.onopen = function() 
		{
			ws.send(JSON.stringify({Hello:{
				Name: 'leaf'
			}}))
		}
		
		ws.onmessage = function(event)
		{
			cc.log("---------------------");
			//cc.log(event);
			//self.webSocketRes.string = self.webSocketRes.string + "message" + "--" + event;
			var decoder = new window.TextDecoder("utf-8")
			var data = JSON.parse(decoder.decode(event.data));
			cc.log(data);
			self.webSocketRes.string = self.webSocketRes.string + "message" + "--" + data.Hello.Name;
		}
		
		ws.onclose = function(event)
		{
			cc.log("---------------------");
			cc.log(event.type);
			self.webSocketRes.string = self.webSocketRes.string + "close" + "--" + event;
		}
	},
	
	sendWebSocket : function()
	{
		console.log("sendWebSocket");
        var self = this;
        var webSocket = new WebSocket("ws://127.0.0.1:3653");
        webSocket.binaryType = "arraybuffer";//一个字符串表示被传输二进制的内容的类型

        self.webSocketRes.string = "";
        webSocket.onopen = function(event)
		{
            console.log("webSocket.onopen:");
            console.log(event);
            self.webSocketRes.string = event.type
        }
        webSocket.onmessage = function(event)
		{
            console.log("webSocket.onmessage:");
            console.log(event);
            self.webSocketRes.string = self.webSocketRes.string + "--" + event.type
            webSocket.close();
            webSocket = null;
        }
        webSocket.onerror = function(event)
		{
            console.log("webSocket.onerror:");
            console.log(event);
            self.webSocketRes.string = self.webSocketRes.string + "--" + event.type
        }
        webSocket.onclose = function(event)
		{
            console.log("webSocket.onclose:");
            console.log(event);
            self.webSocketRes.string = self.webSocketRes.string + "--" + event.type
        }

        var getReadyState = function()
		{
            console.log(webSocket.readyState);
            if(webSocket.readyState == WebSocket.OPEN)
			{
                var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";
                var arrData = new Uint16Array(buf.length);
                for (var i = 0; i < buf.length; i++) 
				{
                    arrData[i] = buf.charCodeAt(i);
                }
                //向websocket发送消息
                webSocket.send(arrData.buffer);
            }
        }
        this.scheduleOnce(getReadyState,1)
    },
	
	sendSockerIO : function()
	{
		var self = this;
		var socketIo = io.connect("http://www.baidu.com");

        socketIo.on("connect",function(){
            console.log("sendSockerIO connect:");
            socketIo.send("Hello Socket.IO!");
        });
        socketIo.on("echotest",function(data){
            console.log("sendSockerIO echotest:");
            console.log(data);
        });
        socketIo.on("message",function(data){
            console.log("sendSockerIO message:");
            console.log(data);
            self.SocketIORes.string = data;
        });
        socketIo.on("testevent",function(data){
            console.log("sendSockerIO testevent:");
            console.log(data);
        });
        socketIo.on("disconnect",function(){
            console.log("sendSockerIO disconnect:");
        });
	},

    // update (dt) {},
});
