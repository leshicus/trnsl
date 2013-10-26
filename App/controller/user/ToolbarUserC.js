Ext.define('App.controller.user.ToolbarUserC', {
    extend: 'Ext.app.Controller',
    views: [
        'user.ToolbarUserV'
    ],
    models: [

    ],
    stores: [

    ],
    refs: [
        {
            ref: 'toolbarUser',
            selector: 'toolbarUser'
        }
    ],

    init: function () {
        console.log('ToolbarC init');

        this.control({
            'toolbarUser #testMI': {
                click: function (me, e, eOpts) {
                    var toolbarUser = me.up('toolbarUser'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('panelTest')[0],
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.user.PanelTestV');
                    }
                    var comboExam = panel.down('#comboExam'),
                        storeExam = comboExam.store;
                    storeExam.load();
                    //TODO разобраться почему если 2 раза кликнуть на одну кнопку, то ругается на cascade
                    if(layout.activeItem){
                        layout.activeItem.cascade(cascadeRemoveGrid, {scope:this, args:true});
                        layout.activeItem.add(panel);
                    }

                }
            },
            'toolbarUser #mainMI': {
                click: function (me, e, eOpts) {
                    var viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    layout.activeItem.cascade(cascadeRemoveGrid, false);
                    layout.setActiveItem(0);
                }
            },
            'toolbarUser #selfMI': {
                click: function (me, e, eOpts) {
                    var toolbarUser = me.up('toolbarUser'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('panelSelf')[0],
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.user.PanelSelfV');
                    }
                    if(layout.activeItem){
                        layout.activeItem.cascade(cascadeRemoveGrid, {scope:this, args:false});
                        layout.activeItem.add(panel);
                    }
                }
            }
        });

        console.log('ToolbarC end');
    }
});

