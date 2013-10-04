Ext.define('App.view.admin.GridSigngroupV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridSigngroup',
    itemId: 'gridSigngroup',
    frame: true,
    //flex:1,
    height:200,
    forceFit: true,
    store: 'admin.GridSigngroupS',
    title: 'Подписанты',
    columnLines: true,
    initComponent: function () {
        console.log('GridSigngroup init');

        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ];

        this.tbar = buttonSaveDelete;

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'ФИО',
                itemId: 'columnFio',
                dataIndex: 'fio'
            }
        ];
        this.callParent(arguments);
        console.log('GridSigngroup end');
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