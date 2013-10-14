Ext.define('App.view.user.PanelTestingV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelTesting',
    itemId: 'panelTesting',
    frame:true,
    flex: 1,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelTestingV init');

        this.tbar = [
            {
                xtype:'textfield',
                fieldLabel:'Время',
                itemId:'textTime',
                labelWidth:70,
                readOnly:true
            },
            {
                xtype:'textfield',
                fieldLabel:'Вопрос',
                itemId:'textQuestionNumber',
                labelWidth:70,
                readOnly:true
            },
            {
                xtype:'textfield',
                fieldLabel:'Ответ',
                itemId:'textAnswer',
                labelWidth:70,
                readOnly:true
            }
        ];

        this.bbar = [
            {
                xtype:'button',
                action: 'nextquestion',
                itemId:'nextQuestion',
                text: 'Следующий вопрос'
            }
        ];

        this.callParent(arguments);
        console.log('PanelTestingV end');
    }
});