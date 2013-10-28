Ext.define('App.controller.manage.PanelSpecC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridSpecV',
        'manage.TreeSpecV',
        'manage.PanelSpecV'
    ],
    models: [
        'manage.GridSpecM'
    ],
    stores: [
        'manage.GridSpecS',
        'manage.TreeSpecS'
    ],
    refs: [
        {
            ref: 'gridSpec',
            selector: 'gridSpec'
        },
        {
            ref: 'treeSpec',
            selector: 'treeSpec'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelSpecC init');

        this.control({
            'treeSpec': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('treeSpec cellclick');

                    var treeSpec = this.getTreeSpec(),
                        gridSpec = this.getGridSpec(),
                        storeSpec = gridSpec.store,
                        selection = treeSpec.getSelected();
                    if(selection.raw){
                        var groupid = selection.raw.groupid;
                        storeSpec.clearFilter();
                        storeSpec.filter(function (rec) {
                            if (rec.get('groupid') == groupid)
                                return true;
                        });
                    }
                },
                render: function () {
                    var gridSpec = this.getGridSpec(),
                        storeSpec = gridSpec.store;
                    storeSpec.filter(function () {
                        return false
                    });
                }
            },
            'treeSpec dataview':{
                // чтобы не добавлялась запись в tree при драгндропе:
                // сохраняем перемещаемую запись в переменную droppedRecords, очищаем список перемещаемых записей
                beforedrop:function (node, gridRec, overModel, dropPos, opts) {
                    this.droppedRecords = gridRec.records;
                    gridRec.records = [];
                },
                nodedragover: function(targetNode, position, dragData){ // * добавляьб только в ОЗ
                    var groupid = targetNode.raw.groupid;
                    return groupid ? true : false;
                },
                drop:function (node, data, treeRec, dropPosition) {
                    var gridSpec = this.getGridSpec();

                    Ext.iterate(this.droppedRecords, function(record) {
                        var specid = record.get('specid'),
                            oldRec = gridSpec.store.findRecord('specid',specid);
                        if(treeRec.raw){
                            var groupid = treeRec.raw.groupid;
                            oldRec.set('groupid',groupid);
                            gridSpec.store.clearFilter();
                            gridSpec.store.filter(function (rec) {
                                if (rec.get('groupid') == groupid)
                                    return true;
                            });
                        }
                    });
                    this.droppedRecords = undefined;
                    gridSpec.store.sync();
                }
            },
            /*'#refreshTreeSpecS':{
                click:function (button) {
                    console.log('click refreshTreeSpecS');

                    var treeSpec = this.getTreeSpec();
                    treeSpec.store.load();
                }
            },*/
// *  gridSpec
            'gridSpec': {
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
            'gridSpec button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridSpecM'),
                        rowEditing = grid.plugins[0],
                        treeSpec = this.getTreeSpec(),
                        selectedTree = treeSpec.getSelected();
                    if (selectedTree.raw) {
                        var groupid = selectedTree.raw.groupid;
                        newRecord.set('groupid', groupid);
                    }
                    rowEditing.cancelEdit();
                    grid.store.insert(0, newRecord);
                    rowEditing.startEdit(0, 0);
                }
            },
            'gridSpec button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    grid.store.remove(selection);
                    grid.store.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Специальность не удалена');
                        },
                        scope: this
                    });
                }
            }
        });
        console.log('PanelSpecC end');
    }
});