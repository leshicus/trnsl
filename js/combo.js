var cSubject=Ext.create('Ext.form.ComboBox', 
{
	store:sSubject,
	displayField:'SUBJECT_NAME',
	valueField:'SUBJECT_ID',
	fieldLabel:'Выберите область знаний',
	labelWidth:180,
	inputWidth:window.innerHeight,
	emptyText:'- предмет -',
	submitEmptyText:false,
	editable:false,
	margin:10,
	listeners:
	{
		select:function(combo,records,eOpts)
		{
			//console.log(combo.value);
			gQuestion.setVisible(true);
			Ext.getCmp('bQuestion').setDisabled(true);
			Ext.getCmp('bAnswer').setDisabled(true);
			gQuestion.store.load({params:{SUBJECT_ID:combo.getValue()}});
			if(wAnswer.isVisible())
			{
				wAnswer.hide();
			}
		}
	}
});