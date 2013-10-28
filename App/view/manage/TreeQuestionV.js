Ext.define('App.view.manage.TreeQuestionV', {
    extend: 'Ext.tree.TreePanel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Ext.util.Point',
        'Ext.layout.container.HBox'
    ],
    height: gridHeight,
    frame:true,
    border: 5,
    title: 'Структура',
    alias:'widget.treeQuestion',
    itemId:'treeQuestion',
    store: 'manage.TreeQuestionS',
    margin: '0 5 0 0',
   // allowDeselect: true,
    //selModel: {  allowDeselect: true },
    //rootVisible: false,
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            dropGroup: 'ddgroup',
            //appendOnly: true,
            sortOnDrop: true, // * чтобы deselect происходил
            enableDrag: false,
            //enableDrop: true,
            containerScroll: true
        }
    },
    initComponent: function(){
        /*this.tools = [
            {
                type:'refresh',
                itemId:'refreshTreeQuestionS',
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
