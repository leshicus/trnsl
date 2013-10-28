Ext.define('App.view.admin.GridLogV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridLog',
    itemId: 'gridLog',
    frame: true,
    flex: 1,
    //margin: '0 0 5 0',
    //forceFit: true,
    store: 'admin.GridLogS',
    title: 'Журнал действий пользователя',
    columnLines: true,
    initComponent: function () {
        console.log('GridLog init');

        var comboLogtype = Ext.create('Ext.form.ComboBox', {
            store:Ext.create('App.store.admin.ComboLogtypeS'),
            emptyText:'Тип',
            itemId:'comboLogtype',
            valueField:'id',
            queryMode: 'local',
            editable: false,
            displayField:'name'
        });

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridLogS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = Ext.create('Ext.toolbar.Toolbar');

        this.tbar.add(comboLogtype);
        this.tbar.add(buttonDateFromTo);

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 60
            },
            {
                text: 'Дата',
                itemId: 'columnLogdate',
                dataIndex: 'logdate',
                format: 'd.m.Y H:i',
                width: 130
            },
            {
                text: 'Пользователь',
                itemId: 'columnUserid',
                dataIndex: 'fio',
                width: 230
            },
            {
                text: 'Тип',
                itemId: 'columnLogtypeid',
                dataIndex: 'logtypename',
                width: 150
            },
            {
                text: 'Параметр',
                itemId: 'columnParameter',
                dataIndex: 'parameter',
                tdCls: 'wrapText',
                flex:1
            }

        ];
        this.callParent(arguments);
        console.log('GridLog end');
    }
});