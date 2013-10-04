Ext.define('App.view.admin.GridPersonV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridPerson',
    itemId: 'gridPerson',
    frame: true,
    flex:1,
    margin: '0 0 0 5',
    //forceFit: true,
    store: 'admin.GridPersonS',
    title: 'Сотрудники',
    columnLines: true,
    initComponent: function () {
        console.log('GridPerson init');

        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2
            })
        ];

        //this.tbar = buttonSaveDelete;

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
                itemId: 'columnPersonnum',
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
                editor: combo
                //renderer:renderGridPerson(combo)
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