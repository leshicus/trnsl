Ext.define('App.controller.manage.PanelQuestionC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridQuestionV',
        'manage.GridAnswerV',
        'manage.TreeQuestionV',
        'manage.PanelQuestionV'
    ],
    models: [
        'manage.GridAnswerM',
        'manage.GridQuestionM'
    ],
    stores: [
        'manage.GridAnswerS',
        'manage.GridQuestionS',
        'manage.TreeQuestionS'
    ],
    refs: [
        {
            ref: 'gridQuestion',
            selector: 'gridQuestion'
        },
        {
            ref: 'gridAnswer',
            selector: 'gridAnswer'
        },
        {
            ref: 'treeQuestion',
            selector: 'treeQuestion'
        }
    ],

    onLaunch: function () {
        var me = this;
        me.getStore('manage.GridAnswerS').on('filterchange', me.onFilterChange, me);
       // me.getStore('manage.GridQuestionS').on('write', me.onSyncQuestion, me);

    },
    init: function () {
        console.log('PanelQuestionC init');

        this.control({
            'treeQuestion': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('treeQuestion cellclick');

                    var treeQuestion = this.getTreeQuestion(),
                        gridQuestion = this.getGridQuestion(),
                        storeQuestion = gridQuestion.store,
                        selection = treeQuestion.getSelected(),
                        gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store;

                    storeAnswer.filter(function () {
                        return false
                    });
                    storeQuestion.clearFilter();
                    if(selection.raw){
                        var knowid = selection.raw.knowid,
                            groupid = selection.raw.groupid;
                        storeQuestion.filter(function (rec) {
                            if (rec.get('knowid') == knowid
                                && rec.get('groupid') == groupid)
                                return true;
                        });
                    }

                },
                render: function () {
                    var gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store,
                        gridQuestion = this.getGridQuestion(),
                        storeQuestion = gridQuestion.store;
                    storeAnswer.filter(function () {
                        return false
                    });
                    storeQuestion.filter(function () {
                        return false
                    });
                }
            },
            'treeQuestion dataview':{
                // чтобы не добавлялась запись в tree при драгндропе:
                // сохраняем перемещаемую запись в переменную droppedRecords, очищаем список перемещаемых записей
                beforedrop:function (node, gridRec, overModel, dropPos, opts) {
                    this.droppedRecords = gridRec.records;
                    gridRec.records = [];
                },
                nodedragover: function(targetNode, position, dragData){ // * добавляьб только в ОЗ
                    var knowid;
                    if(targetNode.raw){
                        knowid = targetNode.raw.knowid;
                    }
                    return knowid ? true : false;
                },
                drop:function (node, data, treeRec, dropPosition) {
                    var treeQuestion = this.getTreeQuestion(),
                        sel = treeQuestion.getSelected(),
                        /*treeId = sel.getId(),
                        rec = treeQuestion.store.getNodeById(treeId),*/
                        gridQuestion = this.getGridQuestion();
                    //treeQuestion.getView().deselect(treeRec);
                    //treeQuestion.getSelectionModel().deselectAll();
                    //treeQuestion.getSelectionModel().select(rec);

                    Ext.iterate(this.droppedRecords, function(record) {
                        var questionid = record.get('questionid'),
                            oldRec = gridQuestion.store.findRecord('questionid',questionid);
                        gridQuestion.store.clearFilter();
                        if(treeRec.raw){
                            var knowid = treeRec.raw.knowid,
                                groupid = treeRec.raw.groupid;
                            oldRec.set('knowid',knowid);
                            oldRec.set('groupid',groupid);
                            gridQuestion.store.filter(function (rec) {
                                if (rec.get('knowid') == knowid
                                    && rec.get('groupid') == groupid)
                                    return true;
                            });
                        }
                    });
                    this.droppedRecords = undefined;
                    gridQuestion.store.sync();
                }
            },
            /*'#refreshTreeQuestionS':{
                click:function (button) {
                    console.log('click refreshTreeQuestionS');

                    var treeQuestion = this.getTreeQuestion();
                    treeQuestion.store.load();
                }
            },*/
// * gridQuestion
            'gridQuestion': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('gridQuestion cellclick');

                    var gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store,
                        gridQuestion = this.getGridQuestion(),
                        selection = gridQuestion.getSelected(),
                        questionid = selection.get('questionid');
                    storeAnswer.clearFilter();
                    storeAnswer.filter(function (rec) {
                        if (rec.get('questionid') == questionid)
                            return true;
                    });
                },
                edit: function (editor, context) {
                    console.log('edit');
                    context.grid.store.sync({
                         failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                }
            },
            'gridQuestion button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridQuestionM'),
                        rowEditing = grid.plugins[0],
                        treeQuestion = this.getTreeQuestion(),
                        selectedTree = treeQuestion.getSelected(),
                        gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store;
                    storeAnswer.filter(function () {
                        return false
                    });
                    if (selectedTree.raw) {
                        var knowid = selectedTree.raw.knowid,
                            groupid = selectedTree.raw.groupid;
                        newRecord.set('groupid', groupid);
                        newRecord.set('knowid', knowid);
                    }
                    rowEditing.cancelEdit();
                    grid.store.insert(0, newRecord);
                    rowEditing.startEdit(0, 0);
                }
            },
            'gridQuestion button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected(),
                        questionid = selection.get('questionid'),
                        gridAnswer = this.getGridAnswer(),
                        removedAnswers = gridAnswer.store.getRemovedRecords();
                    console.log(removedAnswers);
                    if(removedAnswers.length){
                        console.log('removedAnswers');
                        gridAnswer.store.sync({ // * синхронизация ответов, на случай если забудут нажать Сохранить
                            success: function () {
                                grid.store.remove(selection);
                                grid.store.sync({
                                    failure: function () {
                                        Ext.MessageBox.alert('Ошибка', 'Вопрос не удален');
                                    },
                                    scope: this
                                });
                            },
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Ответы не удалены');
                            },
                            scope: this
                        });
                    }else{
                        console.log('no removedAnswers');
                        // * проверим, может есть ответы
                        var rec = gridAnswer.store.findRecord('questionid', questionid);
                        if(!rec){
                            grid.store.remove(selection);
                            grid.store.sync({
                                failure: function () {
                                    Ext.MessageBox.alert('Ошибка', 'Вопрос не удален');
                                },
                                scope: this
                            });
                        }else{
                            Ext.MessageBox.alert('Ошибка', 'Удалите сначала ответы');
                        }

                    }
                }
            },
            /*'gridQuestion dataview':{
                // чтобы не добавлялась запись в грид при драгндропе:
                // сохраняем перемещаемую запись в переменную droppedRecords, очищаем список перемещаемых записей
                beforedrop:function (node, data, overModel, dropPos, opts) {
                    this.droppedRecords = data.records;
                    data.records = [];
                },
                drop:function (node, data, dropRec, dropPosition) {
                    Ext.iterate(this.droppedRecords, function(record) {
                        console.log(record);
                    });
                    //groupGrid.dropSuitableType(this.droppedRecords[0], dropRec);
                }
            },*/
// * gridAnswer
            'gridAnswer button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var gridAnswer = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridAnswerM'),
                        rowEditing = gridAnswer.plugins[0],
                        gridQuestion = this.getGridQuestion(),
                        selectedQuestion = gridQuestion.getSelected(),
                        questionid = selectedQuestion.get('questionid');
                    rowEditing.cancelEdit();
                    newRecord.set('questionid', questionid);
                    gridAnswer.store.insert(0, newRecord);
                    rowEditing.startEdit(0, 0);
                }
            },
            'gridAnswer button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    // * удаляем несколько пемеченных записей
                    Ext.each(selection, function (item) {
                        grid.store.remove(item);
                    });
                }
            },
            'gridAnswer button[action=save]': {
                render: function (button) {
                    console.log('button render');

                    var controller = App.app.getController('manage.PanelQuestionC');
                    controller.buttonSaveDisable();
                },
                click: function (button) {
                    console.log('action=save');

                    var grid = button.up('grid');
                    grid.store.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                    //grid.body.mask('Saving Record Please Wait...');
                }
            },
            'gridAnswer checkcolumn': {
                checkchange: function (me, rowIndex, checked, eOpts) {
                    var controller = App.app.getController('manage.PanelQuestionC');
                    controller.buttonSaveDisable();
                }
            }
        });
        console.log('PanelQuestionC end');
    },
    // * изменение фильтра в Ответах
    onFilterChange: function (store) {
        this.buttonSaveDisable();
    },
    // * сработала синхронизация
    /*onSyncQuestion: function (store, aOperation) {
        // * такой непростой способ достать id добавленной записи
        var action = aOperation.action;
        if (action == 'create') {
            var questionid = aOperation.batch.operations[0].request.scope.reader.jsonData["questionid"],
                rec = store.getAt(0);
            rec.data['questionid'] = questionid;
        }

    },*/
    // * изменение видимости кнопки Сохранить в Ответах
    buttonSaveDisable: function () {
        var grid = this.getGridAnswer(),
            store = grid.store,
            flag = false;
        store.data.each(function (rec) {
            if (rec.get('correct'))
                if (flag == true) {
                    flag = false;
                } else
                    flag = true;
        });
        grid.down('#buttonSave').setDisabled(!flag);
    }
});