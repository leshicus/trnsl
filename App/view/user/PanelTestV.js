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
    myPropCascadeDelete:true, // * свойство по которому происходит удаление при смене панели кнопками
    constructor: function () {
        console.log('PanelTestV init');

        var storeExam = Ext.create('App.store.admin.GridExamS');
        //storeExam.load();
        this.items = [
// * левая половина: регистрация и прогресс
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                frame: false,
                width: 300,
                items: [
// * регистрация
                    {
                        xtype: 'panel',
                        title: 'Регистрация на экзамен',
                        frame: true,
                        height: 150,
                        border: false,
                        margin: '0 0 5 0',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '5 5 5 5',
                            labelWidth: 130
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                store: storeExam,
                                itemId: 'comboExam',
                                queryMode: 'local',
                                editable: false,
                                width: 450,
                                //labelWidth:130,
                                valueField: 'examid',
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
                                fieldLabel: 'Выберите экзамен'
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Статус',
                                itemId: 'textStatus',
                                //labelWidth:70,
                                value: '',
                                readOnly: true
                            }
                        ],
                        tools: [
                            {
                                type: 'refresh',
                                itemId: 'refreshComboExam',
                                tooltip: 'Обновить'
                            }
                        ],
                        buttons: [
                            {
                                xtype: 'button',
                                action: 'starttest',
                                itemId: 'startTest',
                                disabled: true,
                                text: 'Начать тестирование'
                            }
                        ]
                    },
// * прогресс
                    {
                        xtype: 'panel',
                        frame: true,
                        flex: 2,
                        itemId: 'panelProgress',
                        title: 'Прогресс',
                        defaults: {
                            margin: '5 5 5 5',
                            labelWidth: 130
                        },
                        items: [
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Времени осталось',
                                itemId: 'textTime',
                                readOnly: true,
                                fieldStyle: {
                                    color: '#666666',
                                    'font-weight': 'bold',
                                    'font-size': 'larger',
                                    'font-variant': 'small-caps'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Вопрос',
                                itemId: 'textQuestion',
                                fieldStyle: {
                                    color: '#666666',
                                    'font-weight': 'bold',
                                    'font-size': 'larger',
                                    'font-variant': 'small-caps'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Ответ',
                                itemId: 'textAnswer'
                            },
                            {
                                xtype: 'box',
                                style: {
                                    color: '#666666',
                                    backgroundColor: '#000000'
                                },
                                height: 1
                            },
                            {
                                xtype: 'box',
                                style: {
                                    color: '#666666',
                                    backgroundColor: '#000000'
                                },
                                height: 1
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Результат',
                                itemId: 'textResult'
                            }
                        ]
                    }
                ]
            },
// * билет
            {
                xtype: 'panel',
                title: 'Билет',
                itemId: 'panelCard',
                flex: 1,
                frame: true,
                margin: '0 0 0 5',
                border: false,
                hidden: true,
                buttonAlign: 'left',
                questionNumber: 0, // * текущий вопрос билета
                buttons: [
                    {
                        xtype: 'button',
                        action: 'nextquestion',
                        itemId: 'nextQuestion',
                        text: 'Следующий вопрос'
                    }
                ],
                layout: {
                    type: 'accordion',
                    titleCollapse: false,
                    fill: false,
                    multi: true
                },
                items: [
                    {
                        //title: 'Вопрос №1',
                        itemId: 'questionAccordion',
                        flex: 1,
                        style: {
                            'font-variant': 'small-caps',
                            'font-style': 'italic'
                        },
                        hideCollapseTool: true,
                        items: [
                            {
                                xtype: 'displayfield',
                                itemId: 'question',
                                padding: '20 20 20 20'
                            }
                        ]
                    },
                    {
                        title: 'Варианты ответа',
                        flex: 1,
                        style: {
                            'font-variant': 'small-caps',
                            'font-style': 'italic'
                        },
                        itemId: 'answerAccordion',
                        hideCollapseTool: true,
                        defaultType: 'radiofield',
                        defaults: {
                            flex: 1,
                            name: 'answertext',
                            padding: '10 20 5 20'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
        console.log('PanelTestV end');
    }
});