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
                    console.log('click testMI');


                }
            },
            'toolbarUser #mainMI': {
                click: function (me, e, eOpts) {
                    console.log('click mainMI');

                    var viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    layout.activeItem.cascade(cascadeRemoveGrid);
                    layout.setActiveItem(0);
                }
            },
            'toolbarUser #selfMI': {
                click: function (me, e, eOpts) {
                    console.log('click selfMI');


                }
            }
        });

        console.log('ToolbarC end');
    }
});

