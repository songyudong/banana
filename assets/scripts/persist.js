var common = require("common");
cc.Class({
    extends: cc.Component,

    properties: 
    {
        block : cc.Node,
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
