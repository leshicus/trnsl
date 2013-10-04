Ext.define('App.view.admin.GridPersonV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridPerson',
    itemId: 'gridPerson',
    frame: true,
    flex:1,
    margin: '0 0 0 5',
    forceFit: true,
    store: 'admin.GridPersonS',
    title: 'Сотрудники',
    columnLines: true,
    initComponent: function () {
        console.log('GridPerson init');

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
            },
            {
                text: 'Баллы',
                itemId: 'columnBalls',
                dataIndex: 'balls',
                width: 30
            },
            {
                text: 'Результат',
                itemId: 'columnResult',
                dataIndex: 'result',
                width: 30
            }
        ];
        this.callParent(arguments);
        console.log('GridPerson end');
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