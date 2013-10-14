Ext.define('App.view.admin.PanelClassV', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.panelClass',
    itemId: 'panelClass',
    border: false,
    flex: 1,
    padding: '0 0 0 0',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelClassV init');

        var gridExam = Ext.create('App.view.admin.GridExamV', {
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
        ];
        this.callParent(arguments);
        console.log('PanelClassV end');
    }
});