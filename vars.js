// константы
var gridHeight = 600,
    dataSystem = [
        [1, "Тестирование"],
        [2, "Администрирование"],
        [3, "Ведение"]
    ],
    regString = 'зарегистрирован',
    unregString = 'подана заявка',
    correctString = 'верный',
    uncorrectString = 'не верный',
    passString = 'экзамен сдан',
    unpassString = 'экзамен не сдан',
    userid,
    nullDate = '00.00.0000 00:00',
    required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
    buttonSaveDelete = [
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
    ],
    buttonDateFromTo = [
        {
            xtype: 'datefield',
            itemId: 'dateFindFrom',
            emptyText: 'Дата c',
            width: 100,
            format: 'd.m.Y'
        },
        '-',
        {
            xtype: 'datefield',
            itemId: 'dateFindTo',
            emptyText: 'Дата по',
            width: 100,
            format: 'd.m.Y'
        }
    ],
    rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
    }),
    regStatusIntervalSec = 5,  // * интервал опроса по регистрации
    regStatusDurationSec = 20, // * продолжительность опроса класса на регистрации
    examTimerMin = 2, // * минут на экзамен
    examTimerSec = 60, // * секунд в минуте
    colorStatusTextUnreg = {
        color: '#FF0000',
        'font-weight': 'bold',
        'font-size': 'larger',
        'font-family': 'monospace'
    },
    colorStatusTextReg = {
        color: '#008000',
        'font-weight': 'bold',
        'font-size': 'larger',
        'font-family': 'monospace'
    },
    rightAnswersAmount = 0, // * количество данных правильных ответов
    questionNumber = 0, // * текущий номер вопроса
    questionAmount = 3, // * число вопросов в билете
    passAmount = 2; // * число правильных ответов для успешного прохождения экзамена


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
    if (value && value != nullDate) {
        metaData.style += 'background:rgb(243, 169, 202);';
        return value;
    }
};

renderGridGroup = function (combo) {
    return function (value) {
        var record = combo.findRecord(combo.valueField || combo.displayField, value);
        return record ? record.get(combo.displayField) : combo.valueNotFoundText;
    }
};

renderResult = function (value, metaData) {
    if (value == 1) {
        metaData.style += 'color:green; font-weight: bold;';
        return passString;
    } else if (value == 0) {
        metaData.style += 'color:red; font-weight: bold;';
        return unpassString;
    } else {
        metaData.style += 'color:blue; font-weight: bold;';
        return 'не сдавал';
    }

};

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

// * всплывающее сообщение с ошибкой
errorMessage = function (title, msg) {
    Ext.MessageBox.show({
        title: title,
        msg: msg,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR
    });
}
infoMessage = function (title, msg) {
    Ext.MessageBox.show({
        title: title,
        msg: msg,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO
    });
}

// * запрос на регистрацию из системы Тестирование
var taskRegStatus = {
    run: function () {
        var comboExam = Ext.ComponentQuery.query('#comboExam')[0],
            examid = comboExam.getValue();
        Ext.Ajax.request({
            url: 'php/user/getRegStatus.php?examid=' + examid,
            success: function (response, options) {
                var resp = Ext.decode(response.responseText),
                    cnt = resp.cnt;
                if (cnt == 1) {
                    var textStatus = Ext.ComponentQuery.query('#textStatus')[0],
                        buttonStartTest = Ext.ComponentQuery.query('#startTest')[0];
                    textStatus.setValue(regString);
                    textStatus.setFieldStyle(colorStatusTextReg);
                    Ext.TaskManager.stop(taskRegStatus);
                    comboExam.setReadOnly(true);
                    buttonStartTest.enable();
                }
            },
            failure: function () {
                Ext.MessageBox.show({
                    title: 'Ошибка',
                    msg: 'Не удалось проверить статус заявки на регистрацию',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    interval: 1000 * regStatusIntervalSec, // в секундах
    duration: 1000 * regStatusDurationSec
};

// * опрос подавших заявку на тест в классе
var taskClassCheck = {
    run: function () {
        var gridPerson = Ext.ComponentQuery.query('#gridPerson')[0];
        gridPerson.store.load();
    },
    interval: 1000 * regStatusIntervalSec, // в секундах
    duration: 1000 * regStatusDurationSec
};


