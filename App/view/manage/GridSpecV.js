Ext.define('App.view.manage.GridSpecV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridSpec',
    itemId: 'gridSpec',
    frame: true,
    flex:1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    store: 'manage.GridSpecS',
    title: 'Специальности',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'ddspec'
        }
    },
    columnLines: true,
    initComponent: function () {
        console.log('GridSpec init');

        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ];

        this.tbar = [
            {
                text: 'Добавить',
                action: 'add',
                iconCls: 'icon_add'
            },
            '-',
            {
                text: 'Удалить',
                action: 'delete',
                iconCls: 'icon_delete'
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Специальность',
                itemId: 'columnSpecname',
                dataIndex: 'specname',
                tdCls: 'wrapText',
                editor: {
                    xtype: 'textarea',
                    errorSummary: false,
                    //allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                }
            }
        ];
        this.callParent(arguments);
        console.log('GridSpec end');
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