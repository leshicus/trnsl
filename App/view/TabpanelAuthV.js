Ext.define('App.view.TabpanelAuthV', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabpanelAuth',
    itemId: 'tabpanelAuth',
    height: 320,
    width: 500,
    frame: true,
    activeTab: 0,
    defaults: {
        bodyPadding: 10
    },
    initComponent: function () {
        console.log('TabpanelAuthV init');

        this.items = [
            /*{xtype: 'tabAuth'},*/
            {xtype: 'tabReg'}
        ];

        this.callParent(arguments);
        console.log('TabpanelAuthV end');
    }
});