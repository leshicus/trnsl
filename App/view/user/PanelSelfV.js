Ext.define('App.view.user.PanelSelfV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelSelf',
    itemId: 'panelSelf',
    flex: 1,
    border: false,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    myPropCascadeDelete:true, // * свойство по которому происходит удаление при смене панели кнопками
    constructor: function () {
        console.log('PanelSelfV init');

        //var storeKnow = Ext.create('App.store.user.KnowS');
        this.items = [
// * левая половина: Информация
            {
                xtype: 'panel',
                frame: true,
                border: false,
                width: 300,
                itemId: 'panelProgress',
                title: 'Прогресс',
                defaults: {
                    margin: '5 5 5 5',
                    labelWidth: 130
                },
                items: [
                    {
                        xtype: 'combobox',
                        store: 'user.KnowS',
                        itemId: 'comboKnow',
                        queryMode: 'local',
                        editable: false,
                        valueField: 'knowid',
                        fieldLabel: 'Область знаний',
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item">{knownum}  {knowname}</div>',
                            '</tpl>'
                        ),
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{knownum} {knowname}',
                            '</tpl>'
                        )
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
                        xtype: 'displayfield',
                        fieldLabel: 'Нормативный документ',
                        itemId: 'textNormdoc'
                    }
                ],
                buttons: [
                    {
                        xtype: 'button',
                        action: 'starttest',
                        itemId: 'startTest',
                        text: 'Начать тестирование'
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
                buttonAlign: 'left',
                questionNumber: 0, // * текущий вопрос билета
                buttons: [
                    {
                        xtype: 'button',
                        action: 'nextquestion',
                        itemId: 'nextQuestion',
                        disabled: true,
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
                        title:'Вопрос',
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
        console.log('PanelSelfV end');
    }
});