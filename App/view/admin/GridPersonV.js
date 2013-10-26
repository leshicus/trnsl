Ext.define('App.view.admin.GridPersonV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridPerson',
    itemId: 'gridPerson',
    frame: true,
    //flex:1,
    margin: '0 0 0 5',
    //forceFit: true,
    //store: Ext.create('App.store.admin.GridPersonS'),
    store: 'admin.GridPersonS',
    title: 'Сотрудники',
    columnLines: true,
    initComponent: function () {
        console.log('GridPerson init');

        var self = this;

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox:0,
            mode:'MULTI'
        });

        this.tbar = [
            {
                text: 'Удалить',
                action: 'delete',
                iconCls: 'icon_delete'
            }
        ];

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridPerson',
                tooltip: 'Обновить'
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'ФИО',
                itemId: 'columnFio',
                dataIndex: 'fio',
                flex:1
            },
            {
                text: 'Время',
                itemId: 'columnTime',
                dataIndex: 'timelimit',
                width: 60
            },
            {
                text: 'Баллы',
                itemId: 'columnBalls',
                dataIndex: 'balls',
                width: 60
            },
            {
                text: 'Результат',
                itemId: 'columnResult',
                dataIndex: 'result',
                width: 130,
                renderer:renderResult
            },
            {
                text: 'Регистрация',
                itemId: 'columnReg',
                dataIndex: 'reg',
                width: 150,
                renderer:function (value, metaData) {
                    if (value == 1) {
                        metaData.style += 'color:green; font-weight: bold;';
                        return regString;
                    } else if (value == 0 || value == null){
                        metaData.style += 'color:red; font-weight: bold;';
                        return unregString;
                    }
                }
            }
        ];

        this.contextMenu = Ext.create('Ext.menu.Menu', {
            plain:true,
            items:[
                {
                    text:'Зарегистрировать',
                    itemId:'menuReg'
                },
                {
                    text:'Снять регистрацию',
                    itemId:'menuUnreg'
                }
            ]
        });

        this.getSelectionModel().on({
            selectionchange:function (sm, records) {
                if(records.length){
                    var reg = records[0].get('reg');
                    if(!reg || reg == 0){
                        self.getMenuReg().enable();
                        self.getMenuUnreg().disable();
                    }else{
                        self.getMenuReg().disable();
                        self.getMenuUnreg().enable();
                    }
                }
            }
        });

        this.callParent(arguments);
        console.log('GridPerson end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    },
    getMenuReg:function () {
        return this.contextMenu.query('#menuReg')[0];
    },
    getMenuUnreg:function () {
        return this.contextMenu.query('#menuUnreg')[0];
    }
});