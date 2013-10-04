Ext.define('App.view.manage.PanelQuestionV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelQuestion',
    itemId: 'panelQuestion',
    border: 0,
    flex:1,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelQuestionV init');

        var treeQuestion = Ext.create('App.view.manage.TreeQuestionV', {
                    //flex: 1
                    width: 270
                }
            ),
            gridQuestion = Ext.create('App.view.manage.GridQuestionV', {
                    flex: 2
                }
            ),
            gridAnswer = Ext.create('App.view.manage.GridAnswerV', {
                    margin: '0 0 0 5',
                    flex: 2
                }
            );
        this.items = [
            treeQuestion,
            gridQuestion,
            gridAnswer

        ];
        this.callParent(arguments);
        console.log('PanelQuestionV end');
    }
});