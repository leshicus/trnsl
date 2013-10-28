Ext.define('App.view.manage.GridGroupV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridGroup',
    itemId: 'gridGroup',
    frame: true,
    flex:1,
    //forceFit: true,
    store: 'manage.GridGroupS',
    title: 'Группы',
    columnLines: true,
    initComponent: function () {
        console.log('GridGroup init');

        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ];

        this.tbar = buttonSaveDelete;

        var store = Ext.data.StoreManager.lookup('manage.GridActS');
        var combo = Ext.create('Ext.form.ComboBox', {
            store:store,
            valueField:'actid',
            name:'actid',
            displayField:'actabbr',
            listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                afterrender: function () {
                    var me = this;
                    me.el.swallowEvent(['keypress', 'keydown' ]);
                }
            }
        });

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnGroupnum',
                dataIndex: 'groupnum',
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
                text: 'Вид деятельности',
                itemId: 'columnActid',
                dataIndex: 'actid',
                width:200,
                editor: combo,
                renderer:renderGridGroup(combo)
            }
        ];
        this.callParent(arguments);
        console.log('GridGroup end');
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