Ext.define('App.view.user.PanelTestV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelTest',
    itemId: 'panelTest',
    border: 0,
    flex: 1,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelTestV init');

        /*var gridExam = Ext.create('App.view.admin.GridExamV', {
                    //flex: 1
                }
            ),
            gridSigngroup = Ext.create('App.view.admin.GridSigngroupV', {
                    //flex: 1
                }
            ),
            gridPerson = Ext.create('App.view.admin.GridPersonV', {
                    flex: 2
                }
            );
        this.items = [
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                width: 500,
                items: [
                    gridExam,
                    gridSigngroup

                ]
            },
            gridPerson
        ];*/

        var storeExam = Ext.create('App.store.admin.GridExamS');
        //storeExam.load();

        this.tbar = [
            {
                xtype:'combobox',
                store:storeExam,
                itemId:'comboExam',
                queryMode:'local',
                editable:false,
                width:450,
                labelWidth:130,
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
                xtype:'button',
                action: 'add',
                disabled:true,
                text: 'Начать тестирование'
            }
        ];

        this.callParent(arguments);
        console.log('PanelTestV end');
    }
});