Ext.define('App.view.manage.PanelSpecV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelSpec',
    itemId: 'panelSpec',
    border: 0,
    flex:1,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelSpecV init');

        var treeSpec = Ext.create('App.view.manage.TreeSpecV', {
                    //flex: 1
                    width: 250
                }
            ),
            gridSpec = Ext.create('App.view.manage.GridSpecV', {
                    flex: 2
                }
            );
        this.items = [
            treeSpec,
            gridSpec
        ];
        this.callParent(arguments);
        console.log('PanelSpecV end');
    }
});