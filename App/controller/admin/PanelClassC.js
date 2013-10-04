Ext.define('App.controller.admin.PanelClassC', {
    extend: 'Ext.app.Controller',
    views: [
        'admin.GridExamV',
        'admin.GridSigngroupV',
        'admin.GridPersonV',
        'admin.PanelClassV'
    ],
    models: [
        'admin.GridExamM',
        'admin.GridSigngroupM',
        'admin.GridPersonM'
    ],
    stores: [
        'admin.GridExamS',
        'admin.GridSigngroupS',
        'admin.GridPersonS'
    ],
    refs: [
        {
            ref: 'gridExam',
            selector: 'gridExam'
        }
    ],

    onLaunch: function () {
        //var me = this;
    },
    init: function () {
        console.log('PanelClassC init');

        this.control({
            '#refreshGridExamS': {
                click: function (button) {
                    console.log('click refreshGridExamS');

                    var gridExam = this.getGridExam();
                    gridExam.store.load();
                }
            }

        });
        console.log('PanelClassC end');
    }
});