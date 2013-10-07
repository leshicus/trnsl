Ext.define('App.view.admin.GridUserV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridUser',
    itemId: 'gridUser',
    frame: true,
    flex: 1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    store: 'admin.GridUserS',
    title: 'Пользователи',
    columnLines: true,
    initComponent: function () {
        console.log('GridUser init');

        var self = this;

        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
        ];

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridUserS',
                tooltip: 'Обновить'
            }
        ];

        this.tbar = [
            {
                text: 'Удалить',
                action: 'delete',
                iconCls: 'icon_delete'
            }
        ];

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox:0,
            mode:'MULTI'
        });

        var comboSpec = Ext.create('Ext.form.ComboBox', {
            store: 'manage.GridSpecS',
            valueField: 'specid',
            name: 'specid',
            displayField: 'specname',
            listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                afterrender: function () {
                    var me = this;
                    me.el.swallowEvent(['keypress', 'keydown' ]);
                }
            }
        });
// TODO при первом открытии combo грузится повторно стор
        var comboRole = Ext.create('Ext.form.ComboBox', {
            store: 'admin.ComboRoleS',
            valueField: 'id',
            name: 'roleid',
            displayField: 'name',
            listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                afterrender: function () {
                    var me = this;
                    me.el.swallowEvent(['keypress', 'keydown' ]);
                }
            }
        });


        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Фамилия',
                itemId: 'columnFamilyname',
                dataIndex: 'familyname',
                editor: {
                    xtype: 'textarea',
                    errorSummary: false,
                    allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                }
            },
            {
                text: 'Имя',
                itemId: 'columnFirstname',
                dataIndex: 'firstname',
                editor: {
                    xtype: 'textarea',
                    errorSummary: false,
                    allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                }
            },
            {
                text: 'Отчество',
                itemId: 'columnLastname',
                dataIndex: 'lastname',
                editor: {
                    xtype: 'textarea',
                    errorSummary: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                }
            },
            {
                text: 'Специальность',
                itemId: 'columnSpecid',
                dataIndex: 'specid',
                editor: comboSpec,
                tdCls: 'wrapText',
                renderer: comboRenderer(comboSpec)
            },
            {
                text: 'Роль',
                itemId: 'columnRoleid',
                dataIndex: 'roleid',
                editor: comboRole,
                renderer: comboRenderer(comboRole)
            },
            {
                text: 'Блокирован',
                itemId: 'columnStatus',
                width: 80,
                format:'d.m.Y H:i',
                dataIndex: 'enddate',
                editor: {
                    xtype: 'datefield',
                    errorSummary: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                },
                renderer: columnStatus
            }
        ];

        this.contextMenu = Ext.create('Ext.menu.Menu', {
            items:[
                {
                    text:'Сбросить пароль',
                    itemId:'menuResetPassword'
                },
                '-',
                {
                    text:'Блокировать',
                    itemId:'menuBlock'
                },
                {
                    text:'Разблокировать',
                    itemId:'menuUnblock'
                }
            ]
        });

        this.getSelectionModel().on({
            selectionchange:function (sm, records) {
                if(records.length){
                    var block = records[0].get('enddate');
                    //console.log(block);
                    if(block != '00.00.0000 00:00' && block){
                        self.getMenuBlock().disable();
                        self.getMenuUnblock().enable();
                    }else{
                        self.getMenuBlock().enable();
                        self.getMenuUnblock().disable();
                    }
                    self.getMenuResetPassword().enable();

                }
            }
        });

        this.callParent(arguments);
        console.log('GridUser end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    },
    getMenuResetPassword:function () {
        return this.contextMenu.query('#menuResetPassword')[0];
    },
    getMenuBlock:function () {
        return this.contextMenu.query('#menuBlock')[0];
    },
    getMenuUnblock:function () {
        return this.contextMenu.query('#menuUnblock')[0];
    }
});