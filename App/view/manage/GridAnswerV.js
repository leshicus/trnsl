Ext.define('App.view.manage.GridAnswerV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridAnswer',
    itemId: 'gridAnswer',
    frame: true,
    height: gridHeight,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    store:'manage.GridAnswerS',
    title: 'Ответы',
    columnLines: true,
    initComponent: function () {
        console.log('GridAnswers init');
        var me = this;
        this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        }) ];

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox:0,
            mode:'MULTI'/*,
            listeners: {
                selectionchange: function(sm, selections) {
                    // * кнопка Сохранить доступна если отмечена одна запись
                    me.down('#buttonSave').setDisabled(selections.length != 1);
                }
            }*/
        });

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
            },
            '-',
            {
                text: 'Сохранить',
                action: 'save',
                itemId:'buttonSave'
                //iconCls: 'icon_delete'
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Текст ответа',
                itemId: 'columnAnswertext',
                dataIndex: 'answertext',
                tdCls: 'wrapText',
                flex:1,
                editor: {
                    xtype:'textarea',
                    errorSummary:false,
                    //allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function(){
                            var me = this;
                            me.el.swallowEvent(['keypress','keydown' ]);
                        }
                    }
                }
            },
            {
                xtype: 'checkcolumn',
                header: 'Верный',
                itemId: 'columnCorrect',
                dataIndex: 'correct',
                width: 65
            },
            {
                text: 'Нормативный документ',
                itemId: 'columnNormdoc',
                dataIndex: 'normdoc',
                width:170,
                tdCls: 'wrapText',
                editor: {
                    xtype:'textarea',
                    //errorSummary:false,
                    //allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function(){
                            var me = this;
                            me.el.swallowEvent(['keypress','keydown' ]);
                        }
                    }
                }
            }
        ];
        this.callParent(arguments);
        console.log('GridAnswers end');
    },

    // отмеченные ячейки (массив)
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});