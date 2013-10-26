Ext.define('App.view.admin.GridExamV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridExam',
    itemId: 'gridExam',
    frame: true,
    flex: 1,
    margin: '0 0 5 0',
    forceFit: true,
    //store: Ext.create('App.store.admin.GridExamS'),
    store: 'admin.GridExamS',
    title: 'Экзамены',
    columnLines: true,
    initComponent: function () {
        console.log('GridExam init');
        /*this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
        ];*/

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridExamS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = Ext.create('Ext.toolbar.Toolbar');
        this.tbar.add(buttonSaveDelete);
        this.tbar.add(buttonDateFromTo);

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnExamid',
                dataIndex: 'examid',
                width: 50
            },
            {
                text: 'Дата',
                itemId: 'columnExamdate',
                dataIndex: 'examdate',
                format: 'd.m.Y H:i',
                width: 100
            },
            {
                text: 'ФИО наблюдателя',
                itemId: 'columnFio',
                dataIndex: 'fio',
                width: 230
            }
        ];
        this.callParent(arguments);
        console.log('GridExam end');
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