Ext.define('App.view.admin.TreeUserV', {
    extend: 'Ext.tree.TreePanel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Ext.util.Point',
        'Ext.layout.container.HBox'
    ],
    frame:true,
    border: 5,
    title: 'Структура',
    alias:'widget.treeUser',
    itemId:'treeUser',
    store: 'admin.TreeUserS',
    //store: Ext.create('App.store.admin.TreeUserS'),
    margin: '0 5 0 0',

    initComponent: function(){
        /*this.tools = [
            {
                type:'refresh',
                itemId:'refreshTreeUserS',
                tooltip: 'Обновить'
            }
        ];*/
        this.callParent(arguments);
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        if (rs.length) {
            return rs[0];
        }
        return null;
    }
});
