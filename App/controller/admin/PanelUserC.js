Ext.define('App.controller.admin.PanelUserC', {
    extend: 'Ext.app.Controller',
    views: [
        'admin.GridUserV',
        'admin.TreeUserV',
        'admin.PanelUserV'
    ],
    models: [
        'admin.GridUserM'
    ],
    stores: [
        'admin.GridUserS',
        'admin.TreeUserS',
        'admin.ComboRoleS'
    ],
    refs: [
        {
            ref: 'gridUser',
            selector: 'gridUser'
        },
        {
            ref: 'treeUser',
            selector: 'treeUser'
        }
    ],

    onLaunch: function () {
        //var me = this;
    },
    init: function () {
        console.log('PanelUserC init');

        this.control({
            'treeUser': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('treeUser cellclick');

                    var treeUser = this.getTreeUser(),
                        gridUser = this.getGridUser(),
                        storeUser = gridUser.store,
                        selection = treeUser.getSelected();
                    if (selection) {
                        var groupid = selection.raw.groupid;
                        storeUser.clearFilter();
                        storeUser.filter(function (rec) {
                            if (rec.get('groupid') == groupid)
                                return true;
                        });
                    }
                },
                render: function () {
                    var gridUser = this.getGridUser(),
                        storeUser = gridUser.store;
                    storeUser.filter(function () {
                        return false
                    });
                }
            },

            /*'#refreshTreeUserS':{
             click:function (button) {
             console.log('click refreshTreeUserS');

             var treeUser = this.getTreeUser();
             treeUser.store.load();
             }
             },*/
// *  gridUser
            '#refreshGridUserS': {
                click: function (button) {
                    console.log('click refreshGridUserS');

                    var gridUser = this.getGridUser();
                    gridUser.store.load();
                }
            },
            'gridUser': {
                edit: function (editor, context) {
                    console.log('edit');
                    context.grid.store.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                },
                // * чтобы контекстное меню показывалось
                itemcontextmenu: function (view, rec, node, index, e) {
                    e.stopEvent();
                    view.ownerCt.contextMenu.showAt(e.getXY());
                    return false;
                }
            },
            'gridUser button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    grid.store.remove(selection);
                    grid.store.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                        },
                        scope: this
                    });
                }
            },
            '#menuResetPassword': {
                click: function (button) {
                    console.log('click menuResetPassword');

                    var grid = this.getGridUser(),
                        record = grid.getSelected();
                    Ext.Msg.confirm('Сброс пароля', 'Сбросить пароль на начальный?', function (button) {
                        if (button == 'yes') {
                            record.set("password", null);
                            grid.store.sync();
                        }
                    }, this);

                }
            },
            '#menuBlock': {
                click: function (button) {
                    console.log('click menuBlock');

                    var grid = this.getGridUser(),
                        record = grid.getSelected();
                    Ext.Msg.confirm('Блокировка пользователя', 'Заблокировать учетную запись пользователя?', function (button) {
                        if (button == 'yes') {
                            // * преобразование даты в удобочитаемый формат
                            function f(x) {
                                return ((x < 10 ? '0' : '') + x)
                            };
                            var now = new Date(),
                                date = [f(now.getDate()), f(now.getMonth() + 1), now.getFullYear()].join('.')
                                    + ' ' + now.getHours() + ':' + now.getMinutes();
                            record.set('enddate', date);
                            grid.store.sync();
                        }
                    }, this);
                }
            },
            '#menuUnblock': {
                click: function (button) {
                    console.log('click menuUnblock');

                    var grid = this.getGridUser(),
                        record = grid.getSelected();
                    Ext.Msg.confirm('Разблокировка пользователя', 'Разблокировать учетную запись пользователя?', function (button) {
                        if (button == 'yes') {
                            record.set('enddate', nullDate);
                            grid.store.sync();
                        }
                    }, this);

                }
            }/*,
            'gridUser actioncolumn': {
                click: function (grid, view, recordIndex, cellIndex, item, e) {
                    console.log('actioncolumn');

                    Ext.Msg.confirm('Сброс пароля', 'Сбросить пароль на начальный?', function (button) {
                        if (button == 'yes') {
                            grid.store.getAt(recordIndex).set("password", null);
                            grid.store.sync();
                        }
                    }, this);
                }
            }*/

        });
        console.log('PanelUserC end');
    }
});