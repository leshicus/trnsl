Ext.define('App.view.user.PanelTestV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelTest',
    itemId: 'panelTest',
    flex: 1,
    border: false,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    constructor: function () {
        console.log('PanelTestV init');

        var storeExam = Ext.create('App.store.admin.GridExamS');
        //storeExam.load();
        this.items = [
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border:false,
                frame:false,
                width: 500,
                items: [
                    {
                        xtype:'panel',
                        title:'Регистрация на экзамен',
                        frame:true,
                        height:150,
                        border:false,
                        margin:'0 0 5 0',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults:{
                            margin:'5 5 5 5',
                            labelWidth:130
                        },
                        items:[
                            {
                                xtype:'combobox',
                                store:storeExam,
                                itemId:'comboExam',
                                queryMode:'local',
                                editable:false,
                                width:450,
                                //labelWidth:130,
                                valueField:'examid',
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item">{examdate} - {fio}</div>',
                                    '</tpl>'
                                ),
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{examdate} {fio}',
                                    '</tpl>'
                                ),
                                fieldLabel:'Выберите экзамен'
                            },
                            {
                                xtype:'textfield',
                                fieldLabel:'Статус',
                                itemId:'textStatus',
                                //labelWidth:70,
                                value:'',
                                readOnly:true
                            }
                        ],
                        buttons : [
                            {
                                xtype:'button',
                                action: 'starttest',
                                itemId:'startTest',
                                disabled:true,
                                text: 'Начать тестирование'
                            }
                        ]
                    },
                    {
                        xtype:'panel',
                        frame:true,
                        flex:2,
                        title:'Прогресс',
                        defaults:{
                            margin:'5 5 5 5',
                            labelWidth:130
                        },
                        items:[
                            {
                                xtype:'textfield',
                                fieldLabel:'Времени осталось',
                                itemId:'textTime',
                                readOnly:true
                            },
                            {
                                xtype:'textfield',
                                fieldLabel:'Вопрос',
                                itemId:'textQuestionNumber',
                                readOnly:true
                            },
                            {
                                xtype:'textfield',
                                fieldLabel:'Ответ',
                                itemId:'textAnswer',
                                readOnly:true
                            }
                        ]
                    }
                ]
            },
            {
                xtype:'panel',
                title:'Билеты',
                flex:1,
                frame:true,
                margin: '0 0 0 5',
                border:false,
                buttons : [
                    {
                        xtype:'button',
                        action: 'nextquestion',
                        itemId:'nextQuestion',
                        text: 'Следующий вопрос'
                    }
                ]
            }
        ];

        this.callParent(arguments);
        console.log('PanelTestV end');
    }
});