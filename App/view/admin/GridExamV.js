Ext.define('App.view.admin.GridExamV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridExam',
    itemId: 'gridExam',
    frame: true,
    flex: 1,
    margin: '0 0 5 0',
    forceFit: true,
    store: 'admin.GridExamS',
    title: 'Экзамены',
    columnLines: true,
    initComponent: function () {
        console.log('GridExam init');

        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
        ];

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridExamS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = buttonSaveDelete;

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnExamid',
                dataIndex: 'examid',
                width: 60
            },
            {
                text: 'Дата',
                itemId: 'columnExamdate',
                dataIndex: 'examdate',
                format: 'd.m.Y',
                width: 100
            },
            {
                text: 'ФИО наблюдателя',
                itemId: 'columnFio',
                dataIndex: 'fio',
                width: 200
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