var common = require("common");
cc.Class({
    extends: cc.Component,

    properties: 
    {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () 
    {
        cc.game.addPersistRootNode(this.node);
        common.persist = this;
    },

    start () 
    {

    },

    // update (dt) {},
});
