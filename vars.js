// константы
var gridHeight = 600;
var dataSystem = [
    [1, "Тестирование"],
    [2, "Администрирование"],
    [3, "Ведение"]
]

var userid;


// чтобы нормально значения в комбо отображались
comboRenderer = function (combo) {
    return function (value) {
        var record = combo.findRecord(combo.valueField || combo.displayField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    }
};

comboStoreRenderer = function (combo, store) {
    return function (value) {
        var record = store.findRecord(combo.valueField || combo.displayField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    }
};
renderGridQuestion = function (value, metaData, record, rowIndex, colIndex, store, view) {
    metaData.style = 'white-space:normal !important;';
    return value;
};

columnStatus = function (value, metaData, record, rowIndex, colIndex, store, view) {
    if (value && value != '0000-00-00') {
        metaData.style += 'background:rgb(243, 169, 202);';
        return value;
    }
}


function CopyAutoLoadStore(store1) {
    var records = [],
        storeClass = Ext.getClass(store1);

    store1.each(function (r) {
        records.push(r.copy());
    });

    var store2 = Ext.create(storeClass.getName(), {
        model:store1.model.prototype.modelName
    });

    return store2;
};

function CopyStore (store1) {
    var records = [],
        storeClass = Ext.getClass(store1);

    store1.each(function (r) {
        records.push(r.copy());
    });

    var store2 = Ext.create(storeClass.getName(), {
        model:store1.model.prototype.modelName
    });

    store2.add(records);
    //console.log(store1.model.prototype.modelName, store1, store2);
    return store2;
};

var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToMoveEditor: 1,
    autoCancel: false
});

// * удаление старых гридов при нажатии на кнопку меню
cascadeRemoveGrid = function (item) {
    var viewport = item.up('viewport');
    if (viewport) {
        var layout = viewport.getLayout(),
            activeCard = layout.activeItem;
        //console.log(item,item.superclass.xtype, item.xtype);
        if (item.superclass.xtype == 'gridpanel'
            || item.superclass.xtype == 'panel') {
            activeCard.remove(item, false);
        }
    }
};

var buttonSaveDelete =[
    {
        text: 'Добавить',
        action: 'add',
        iconCls: 'icon_add'
    },
    '-',
    {
        text: 'Удалить',
        action: 'delete',
        iconCls: 'icon_delete'
    }
];

renderGridGroup = function (combo) {
    return function (value) {
        var record = combo.findRecord(combo.valueField || combo.displayField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    }
};