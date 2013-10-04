Ext.define('App.view.admin.PanelUserV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelUser',
    itemId: 'panelUser',
    border: 0,
    flex:1,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelUserV init');

        var treeUser = Ext.create('App.view.admin.TreeUserV', {
                    //flex: 1
                    width: 250
                }
            ),
            gridUser = Ext.create('App.view.admin.GridUserV', {
                    flex: 2
                }
            );
        this.items = [
            treeUser,
            gridUser
        ];
        this.callParent(arguments);
        console.log('PanelUserV end');
    }
});