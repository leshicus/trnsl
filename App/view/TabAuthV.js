Ext.define('App.view.TabAuthV', {
    extend: 'Ext.form.Panel',
    alias: 'widget.tabAuth',
    itemId: 'tabAuth',
    title: 'Авторизация',
    url: 'php/auth.php',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {
        console.log('TabAuthV init');

        var textLogin = {
                xtype: 'textfield',
                itemId: 'textLogin',
                name: 'textLogin',
                allowBlank: false,
                afterLabelTextTpl: required,
                fieldLabel: 'Логин'
            },
            comboSystem = {
                xtype: 'combo',
                store: dataSystem,
                itemId: 'comboSystem',
                name: 'comboSystem',
                queryMode: 'local',
                editable: false,
                value:1,
                valueField: 'id',
                displayField: 'name',
                allowBlank: false,
                afterLabelTextTpl: required,
                fieldLabel: 'Подсистема'
            },
            textPassword = {
                xtype: 'textfield',
                itemId: 'textPassword',
                name: 'textPassword',
                inputType: 'password',
                fieldLabel: 'Пароль',
                allowBlank: false,
                afterLabelTextTpl: required
                //style: 'margin-top:15px'
            },
        // TODO сделать валидацию на поля, в т.ч. на пароли
            textOldPassword = {
                xtype: 'textfield',
                itemId: 'textOldPassword',
                name: 'textOldPassword',
                inputType: 'password',
                fieldLabel: 'Старый пароль'
            },
            textNewPassword = {
                xtype: 'textfield',
                itemId: 'textNewPassword',
                name: 'textNewPassword',
                inputType: 'password',
                fieldLabel: 'Новый пароль'
            },
            buttonChangePas = {
                xtype: 'button',
                text: 'Поменять',
                anchor: '20%',
                action: 'changepassword'

                //fieldLabel: '&nbsp;',
                //labelSeparator: ''
            },
            fieldsetChangePas = Ext.create('Ext.form.FieldSet', {
                xtype: 'fieldset',
                title: 'Смена пароля',
                itemId: 'fieldsetChangePas',
                padding:'5 5 5 5',
                margin:'10 0 0 0',
                //style: { textAlign: 'center', width: '100px' },
                defaults: {
                    anchor: '100%',
                    labelWidth: 120
                },
                items: [
                    textOldPassword,
                    textNewPassword,
                    buttonChangePas
                ]
            });

        this.items = [
            /*fieldsetUser,
             fieldsetAuth*/
            comboSystem,
            textLogin,
            textPassword,
            fieldsetChangePas
        ];

        this.buttons = [
            {
                text: 'Вход',
                action: 'enter'
            },
            {
                text: 'Очистить',
                action: 'refresh'
            }/*,
             { xtype: 'tbspacer', width: 150 }*/
        ];

        this.callParent(arguments);
        console.log('TabAuthV end');
    }
});