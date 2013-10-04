Ext.define('App.view.manage.GridActV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridAct',
    itemId: 'gridAct',
    frame: true,
    flex:1,
    //height: gridHeight,
    //forceFit: true,
    store: 'manage.GridActS',
    title: 'Виды деятельности',
    columnLines: true,
    initComponent: function () {
        console.log('GridAct init');

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
                text: 'Номер',
                itemId: 'columnActnum',
                dataIndex: 'actnum',
                width:100,
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
            },
            {
                text: 'Краткое наименование',
                itemId: 'columnActabbr',
                dataIndex: 'actabbr',
                tdCls: 'wrapText',
                width:160,
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
            },
            {
                text: 'Полное наименование',
                itemId: 'columnActname',
                dataIndex: 'actname',
                tdCls: 'wrapText',
                //width:100,
                flex:1,
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
            },
            {
                text: 'Лимит времени (мин)',
                itemId: 'columnTimelimit',
                dataIndex: 'timelimit',
                width:150,
                editor: {
                    xtype: 'textfield',
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
        console.log('GridAct end');
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