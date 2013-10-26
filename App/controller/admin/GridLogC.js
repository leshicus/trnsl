Ext.define('App.controller.admin.GridLogC', {
    extend: 'Ext.app.Controller',
    views: [
        'admin.GridLogV'
    ],
    models: [
        'admin.GridLogM'
    ],
    stores: [
        'admin.GridLogS'
    ],
    refs: [
        {
            ref: 'gridLog',
            selector: 'gridLog'
        }
    ],

    onLaunch: function () {
        //var me = this;
    },
    init: function () {
        console.log('GridLogC init');

        this.control({
            '#refreshGridLogS': {
                click: function (button) {
                    console.log('click refreshGridLogS');

                    var gridLog = this.getGridLog();
                    gridLog.store.load();
                }
            },
            'gridLog #dateFindFrom': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.DELETE) {
                        field.reset();
                    }
                    if (e.getKey() == e.ENTER) {
                        var grid = field.up('grid'),
                            dateFindTo = grid.down('#dateFindTo'),
                            comboLogtype = grid.down('#comboLogtype');
                        grid.store.load({
                            params: {
                                dateFindFrom: field.getValue(),
                                dateFindTo: dateFindTo.getValue(),
                                comboLogtype:comboLogtype.getValue()
                            }
                        });
                    }
                }
            },
            'gridLog #dateFindTo': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.DELETE) {
                        field.reset();
                    }
                    if (e.getKey() == e.ENTER) {
                        var grid = field.up('grid'),
                            dateFindFrom = grid.down('#dateFindFrom'),
                            comboLogtype = grid.down('#comboLogtype');
                        grid.store.load({
                            params: {
                                dateFindFrom: dateFindFrom.getValue(),
                                dateFindTo: field.getValue(),
                                comboLogtype:comboLogtype.getValue()
                            }
                        });
                    }
                }
            },
            'gridLog #comboLogtype': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.DELETE) {
                        field.reset();
                    }
                    if (e.getKey() == e.ENTER) {
                        var grid = field.up('grid'),
                            dateFindFrom = grid.down('#dateFindFrom'),
                            dateFindTo = grid.down('#dateFindTo');
                        grid.store.load({
                            params: {
                                dateFindFrom: dateFindFrom.getValue(),
                                dateFindTo: dateFindTo.getValue(),
                                comboLogtype:field.getValue()
                            }
                        });
                    }
                }
            }

        });
        console.log('GridLogC end');
    }
});