Ext.define('App.view.admin.GridSigngroupV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridSigngroup',
    itemId: 'gridSigngroup',
    frame: true,
    //flex:1,
    height:250,
    forceFit: true,
    //store: Ext.create('App.store.admin.GridSigngroupS'),
    store: 'admin.GridSigngroupS',
    title: 'Комиссия',
    columnLines: true,
    initComponent: function () {
        console.log('GridSigngroup init');

        this.plugins = [ Ext.create('Ext.grid.plugin.CellEditing', {
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
                text: 'Фамилия',
                itemId: 'columnFamily',
                dataIndex: 'familyname',
                width: 50,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
            {
                text: 'Имя',
                itemId: 'columnName',
                dataIndex: 'firstname',
                width: 50,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
            {
                text: 'Отчество',
                itemId: 'columnLastname',
                dataIndex: 'lastname',
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
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