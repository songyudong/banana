var common = require("common");
cc.Class({
    extends: cc.Component,

    properties: 
    {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        
    },

    start () 
    {
        cc.game.config.showFPS = false;
    },

    // update (dt) {},

    onChatButton:function()
    {
        cc.director.loadScene("chat");
    }
});
