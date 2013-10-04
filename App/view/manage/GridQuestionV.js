Ext.define('App.view.manage.GridQuestionV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridQuestion',
    itemId: 'gridQuestion',
    frame: true,
    flex:1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    store: 'manage.GridQuestionS',
    title: 'Вопросы',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'ddgroup'
        }
    },
    columnLines: true,
    initComponent: function () {
        console.log('GridQuestion init');

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
                text: 'Текст вопроса',
                itemId: 'columnQuestiontext',
                dataIndex: 'questiontext',
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
        console.log('GridQuestion end');
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