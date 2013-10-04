Ext.define('App.view.TabRegV', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.form.Panel',
    alias: 'widget.tabReg',
    itemId: 'tabReg',
    url:'php/register.php',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    title: 'Регистрация',
    initComponent: function () {
        console.log('TabRegV init');
        var textLogin = {
                xtype: 'textfield',
                itemId: 'textLogin',
                name: 'textLogin',
                allowBlank: false,
                fieldLabel: 'Логин'
            },
            textFamily = {
                xtype: 'textfield',
                itemId: 'textFamily',
                name: 'textFamily',
                allowBlank: false,
                fieldLabel: 'Фамилия'
            },
            textName = {
                xtype: 'textfield',
                itemId: 'textName',
                name: 'textName',
                allowBlank: false,
                fieldLabel: 'Имя'
            },
            textLastname = {
                xtype: 'textfield',
                itemId: 'textLastname',
                name: 'textLastname',
                fieldLabel: 'Отчество'
            },
            comboSpeciality = {
                xtype: 'combo',
                store: 'manage.GridSpecS',
                itemId: 'comboSpeciality',
                name: 'comboSpeciality',
                queryMode: 'local',
                editable: false,
                valueField: 'specid',
                displayField: 'specname',
                allowBlank: false,
                fieldLabel: 'Специальность'
            },
        // TODO сделать валидацию на поля, в т.ч. на пароль
            textPassword = {
                xtype: 'textfield',
                itemId: 'textPassword',
                name: 'textPassword',
                inputType: 'password',
                fieldLabel: 'Пароль',
                allowBlank: false
                //style: 'margin-top:15px'
            };
            /*fieldsetUser = Ext.create('Ext.form.FieldSet', {
                xtype: 'fieldset',
                title: 'ФИО',
                itemId: 'fieldsetUser',
                defaults: {
                    anchor: '100%',
                    labelWidth: 120
                },
                items: [
                    textFamily,
                    textName,
                    textLastname,
                    comboSpeciality
                ]
            }),
            fieldsetAuth = Ext.create('Ext.form.FieldSet', {
                xtype: 'fieldset',
                title: 'Логин',
                itemId: 'fieldsetAuth',
                defaults: {
                    anchor: '100%',
                    labelWidth: 120
                },
                items: [
                    textLogin,
                    textPassword
                ]
            });*/

        this.items = [
            /*fieldsetUser,
            fieldsetAuth*/
            textFamily,
            textName,
            textLastname,
            comboSpeciality,
            textLogin,
            textPassword
        ];

        this.buttons = [
            {
                text: 'Зарегистрироваться',
                action: 'register'
            },
            {
                text: 'Очистить',
                action: 'refresh'
            }/*,
            { xtype: 'tbspacer', width: 110 }*/
        ];


        this.callParent(arguments);
        console.log('TabRegV end');
    }
});