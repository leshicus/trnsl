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
        },
        {
            ref: 'gridSigngroup',
            selector: 'gridSigngroup'
        },
        {
            ref: 'gridPerson',
            selector: 'gridPerson'
        }
    ],

    onLaunch: function () {
        //var me = this;
    },
    init: function () {
        console.log('PanelClassC init');

        this.control({
            'gridExam': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('gridExam cellclick');

                    var gridSigngroup = this.getGridSigngroup(),
                        gridPerson = this.getGridPerson(),
                        gridExam = this.getGridExam(),
                        selection = gridExam.getSelected(),
                        examid = selection.get('examid');
                    gridSigngroup.store.clearFilter();
                    gridPerson.store.clearFilter();
                    gridSigngroup.store.filter(function (rec) {
                        if (rec.get('examid') == examid)
                            return true;
                    });
                    gridPerson.store.filter(function (rec) {
                        if (rec.get('examid') == examid)
                            return true;
                    });

                    // * старт опроса подавших заявки сотрудников в классе
                    Ext.TaskManager.start(taskClassCheck);
                }
            },
            'gridExam button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.admin.GridExamM');
                    grid.store.insert(0, newRecord);
                    /*grid.store.sync({
                     failure: function () {
                     Ext.MessageBox.alert('Ошибка', 'Экзамен не добавлен');
                     },
                     scope: this
                     });*/
                }
            },
            'gridExam button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected(),
                        examid = selection.get('examid'),
                        gridPerson = this.getGridPerson(),
                        storePerson = gridPerson.store,
                        recordUser = storePerson.findRecord('examid', examid);
                    if (examid && !recordUser) {
                        grid.store.remove(selection);
                    } else {
                        Ext.example.msg('Не удалено', 'В классе находятся сотрудники');
                    }
                    /*grid.store.sync({
                     failure: function () {
                     Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                     },
                     scope: this
                     });*/
                }
            },
            'gridExam #dateFindFrom': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.DELETE) {
                        field.reset();
                    }
                    if (e.getKey() == e.ENTER) {
                        var grid = field.up('grid'),
                            dateFindTo = grid.down('#dateFindTo');
                        grid.store.load({
                            params: {
                                dateFindFrom: field.getValue(),
                                dateFindTo: dateFindTo.getValue()
                            }
                        });
                    }
                }
            },
            'gridExam #dateFindTo': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.DELETE) {
                        field.reset();
                    }
                    if (e.getKey() == e.ENTER) {
                        var grid = field.up('grid'),
                            dateFindFrom = grid.down('#dateFindFrom');
                        grid.store.load({
                            params: {
                                dateFindFrom: dateFindFrom.getValue(),
                                dateFindTo: field.getValue()
                            }
                        });
                    }
                }
            },

            '#refreshGridExamS': {
                click: function (button) {
                    console.log('click refreshGridExamS');

                    var gridExam = this.getGridExam();
                    gridExam.store.load();
                }
            },
            'gridSigngroup button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.admin.GridSigngroupM'),
                        selectionExam = this.getGridExam().getSelected();

                    if (selectionExam) {
                        var examid = selectionExam.get('examid');
                        newRecord.set('examid', examid);
                        grid.store.insert(0, newRecord);
                        /*grid.store.sync({
                         failure: function () {
                         Ext.MessageBox.alert('Ошибка', 'Подписант не добавлен');
                         },
                         scope: this
                         });*/
                    }

                }
            },
            'gridSigngroup button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    grid.store.remove(selection);
                    /*grid.store.sync({
                     failure: function () {
                     Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                     },
                     scope: this
                     });*/
                }
            },
            'gridPerson': {
                // * чтобы контекстное меню показывалось
                itemcontextmenu: function (view, rec, node, index, e) {
                    e.stopEvent();
                    view.ownerCt.contextMenu.showAt(e.getXY());
                    return false;
                }
            },
            'gridPerson button[action=delete]': {
                click: function (button) {
                    var grid = button.up('grid'),
                        selection = grid.getSelected();

                    // * удаляем несколько пемеченных записей
                    Ext.each(selection, function (item) {
                        var result = item.get('result');
                        if (!result) {
                            grid.store.remove(item);
                        } else {
                            Ext.example.msg('Не удалено', 'Сотрудник проходил тест');
                        }
                    });


                    /*grid.store.sync({
                     failure: function () {
                     Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                     },
                     scope: this
                     });*/
                }
            },
            '#menuReg': {
                click: function (button) {
                    console.log('click menuReg');

                    var grid = this.getGridPerson(),
                        selection = grid.getSelected();
                    Ext.each(selection, function (item) {
                        item.set('reg', 1);
                    });

                }
            },
            '#menuUnreg': {
                click: function (button) {
                    console.log('click menuUnreg');

                    var grid = this.getGridPerson(),
                        selection = grid.getSelected();
                    Ext.each(selection, function (item) {
                        item.set('reg', 0);
                    });
                }
            },
            '#refreshGridPerson': {
                click: function (button) {
                    var grid = this.getGridPerson();
                    grid.store.load();
                }
            }
        });
        console.log('PanelClassC end');
    }
});