Ext.onReady(function()
{
	Ext.QuickTips.init();
	//setup the state provider, all state information will be saved to a cookie
	Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
	
	var current_question=0;
	var answer_wrong=0;
	var answer_right=0;
	
	var pStatus=Ext.create('Ext.panel.Panel',
	{
		autoDestroy:false,
		border:0,
		hidden:true,
		width:200,
		height:40,
		items:
		[
			{
				xtype:'label',
				html:''
			}
		]
	});
	var pTime=Ext.create('Ext.panel.Panel',
	{
		autoDestroy:false,
		border:0,
		hidden:true,
		width:100,
		height:40,
		items:
		[
			{
				xtype:'label',
				html:'<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:gray;">-:-</p></center>'
			}
		]
	});
	var pInfo=Ext.create('Ext.panel.Panel',
	{
		autoDestroy:false,
		margin:10,
		border:0,
		html:'<p style="font-size:16px;font-weight:bold;color:gray;"> Добро пожаловать в Систему тестирования! </p>',
	});
	/*var ptQuestion=Ext.create('Ext.panel.Panel',
	{
		autoDestroy:false,
		margin:10,
		border:0,
		html:'<p style="font-size:16px;font-weight:bold;color:gray;"> Для начала тестирования нажмите кнопку...</p>',
	});*/
	var menu=Ext.create('Ext.toolbar.Toolbar',
	{
		border:0,
		defaults:
		{
			xtype:'button',
			scale:'large'
		},
		items:
		[
			{
				tooltip:'На главную',
				id:'mbHome',
				icon:'img/home2.ico',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add([pInfo]);
				}
				
			},'-','-',
			{
				text:'Тестирование',
				icon:'img/answer.ico',
				id:'mbTest',
				tooltip:'Пройти тест',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add(
					[
						{
							autoDestroy:false,
							id:'ptQuestion',
							margin:10,
							height:window.innerHeight-125,
							border:1,
							items:
							[
								{
									xtype:'label',
									html:'<p style="padding-left:10px;padding-top:10px;font-size:16px;font-weight:bold;color:gray;"> Для начала тестирования нажмите кнопку...</p>'
								},
								{
									xtype:'button',
									scale:'large',
									text:'НАЧАТЬ!',
									margin:10,
									handler:function(btn)
									{
										var ptQuestion=Ext.getCmp('ptQuestion');
										sQuestion.load(
										{
											scope:this,
											callback:function(records,operation,success)
											{
												Ext.getCmp('mbHome').setDisabled(true);
												Ext.getCmp('mbTest').setVisible(false);
												Ext.getCmp('mbLearn').setVisible(false);
												
												if(!pTime.isVisible())
													pTime.setVisible(true);
												
												/*if(!pStatus.isVisible())
													pStatus.setVisible(true);*/
													
												menu.insert(2,[pTime]);
												menu.insert(4,[pStatus]);
												
												/*menu.insert(2,[{xtype:'button',text:'-:-',scale:'large',width:50}]);
												menu.insert(4,[{xtype:'button',text:'---',scale:'large',width:100}]);*/
												
												ptQuestion.removeAll(false);
												ptQuestion.add(
												{
													xtype:'panel',
													id:'qtDetail',
													bodyPadding:10,
													border:0,
													html:''
												});
												Ext.getCmp('qtDetail').update('<p style="font-size:16px;font-weight:bold;">'+sQuestion.getAt(current_question).data['QUESTION_TEXT']+'</p>');
												ptQuestion.add(
												{
													xtype:'radiogroup',
													id:'atGroup',
													height:200,
													columns:1,
													vertical:true,
													margin:10
												});
												Ext.Ajax.request(
												{
													url:'php/testing/get_answer.php?qid='+sQuestion.getAt(current_question).data['QUESTION_ID'],
													success:function(response)
													{
														var array=new Array();
														array=response.responseText.split('_');
														for(var j=0;j<array.length;j++)
														{
															var array2=new Array();
															array2=array[j].split('-');
															Ext.getCmp('atGroup').add(
															{ 
																boxLabel:array2[1],
																name:'rb'+current_question,
																inputValue:array2[0]
															});
														}
													}
												});
												ptQuestion.add(
												{
													xtype:'button',
													text:'СЛЕДУЮЩИЙ',
													id:'btNext',
													scale:'large',
													icon:'img/next.ico',
													iconAlign:'right',
													margin:10,
													handler:function()
													{
														if(Ext.getCmp('atGroup').getChecked().length==0)
														{
															Ext.Msg.alert('Предупреждение','Вы не выбрали ни одного ответа! Сделайте выбор.');
														}
														else
														{
															Ext.Ajax.request(
															{
																url:'php/testing/check_answer.php?aid='+Ext.getCmp('answer_group').getChecked()[0].inputValue,
																success:function(response)
																{
																	var r=response.responseText;
																	if(r=='0')
																	{
																		answer_wrong++;
																		pStatus.setVisible(true);
																		pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:red;">НЕВЕРНЫЙ ОТВЕТ!</p></center>');
																	}
																	else
																	{
																		answer_right++;
																		pStatus.setVisible(true);
																		pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:green;">ВЕРНЫЙ ОТВЕТ!</p></center>');
																	}
																}
															});
															
															current_question++;
															Ext.getCmp('qtDetail').update('<p style="font-size:16px;font-weight:bold;">'+sQuestion.getAt(current_question).data['QUESTION_TEXT']+'</p>');
															Ext.getCmp('atGroup').removeAll();
															Ext.Ajax.request(
															{
																url:'php/testing/get_answer.php?qid='+sQuestion.getAt(current_question).data['QUESTION_ID'],
																success:function(response)
																{
																	var array=new Array();
																	array=response.responseText.split('_');
																	for(var j=0;j<array.length;j++)
																	{
																		var array2=new Array();
																		array2=array[j].split('-');
																		Ext.getCmp('atGroup').add(
																		{ 
																			boxLabel:array2[1],
																			name:'rb'+current_question,
																			inputValue:array2[0]
																		});
																	}
																}
															});
															if(current_question==14)
															{
																plQuestion.remove('btNext');
																plQuestion.add(
																{
																	xtype:'button',
																	text:'ЗАВЕРШИТЬ',
																	scale:'large',
																	id:'btFinish',
																	icon:'img/finish.ico',
																	margin:10,
																	handler:function()
																	{
																		if(Ext.getCmp('atGroup').getChecked().length==0)
																		{
																			Ext.Msg.alert('Предупреждение','Вы не выбрали ни одного ответа! Сделайте выбор.');
																		}
																		else
																		{
																			Ext.Ajax.request(
																			{
																				url:'php/testing/check_answer.php?aid='+Ext.getCmp('atGroup').getChecked()[0].inputValue,
																				success:function(response)
																				{
																					var r=response.responseText;
																					if(r=='0')
																					{
																						answer_wrong++;
																						pStatus.setVisible(true);
																						pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:red;">НЕВЕРНЫЙ ОТВЕТ!</p></center>');
																					}
																					else
																					{
																						answer_right++;
																						pStatus.setVisible(true);
																						pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:green;">ВЕРНЫЙ ОТВЕТ!</p></center>');
																					}
																					ptQuestion.removeAll(false);
																					
																					Ext.getCmp('mbHome').setDisabled(false);
																					Ext.getCmp('mbTest').setVisible(true);
																					Ext.getCmp('mbLearn').setVisible(true);
																					
																					pTime.setVisible(false);
																					pStatus.setVisible(false);
																					var status='Тест пройден';
																					if(answer_right<12)
																					{
																						status='Тест не пройден';
																					}
																					ptQuestion.add(
																						{
																							xtype:'displayfield',
																							fieldLabel:'Статус:',
																							value:status,
																							margin:10
																						},
																						{
																							xtype:'displayfield',
																							fieldLabel:'Правильных ответов:',
																							value:answer_right,
																							margin:10
																						},
																						{
																							xtype:'displayfield',
																							fieldLabel:'Неправильных ответов:',
																							value:answer_wrong,
																							margin:10
																						}
																					);
																					answer_wrong=0;
																					answer_right=0;
																					current_question=0;
																				}
																			});
																		}
																	}
																});
															}
														}
													}
												});
											}
										});
									}
								}
							]
						}
					]);
				}
			},'-',
			{
				text:'Обучение',
				id:'mbLearn',
				icon:'img/learn.ico',
				tooltip:'Пройти обучение',
				handler:function(btn)
				{
					btn.up('panel').removeAll(false);
					btn.up('panel').add(
					[
						{
							autoDestroy:false,
							id:'plQuestion',
							margin:10,
							height:window.innerHeight-125,
							border:1,
							items:
							[
								{
									xtype:'label',
									html:'<p style="padding-left:10px;padding-top:10px;font-size:16px;font-weight:bold;color:gray;"> Для начала обучения нажмите кнопку...</p>'
								},
								{
									xtype:'button',
									scale:'large',
									text:'НАЧАТЬ!',
									margin:10,
									handler:function(btn)
									{
										var plQuestion=Ext.getCmp('plQuestion');
										sQuestion.load(
										{
											scope:this,
											callback:function(records,operation,success)
											{
												Ext.getCmp('mbHome').setDisabled(true);
												Ext.getCmp('mbTest').setVisible(false);
												Ext.getCmp('mbLearn').setVisible(false);
												
												if(!pTime.isVisible())
													pTime.setVisible(true);
												
												/*if(!pStatus.isVisible())
													pStatus.setVisible(true);*/
													
												menu.insert(2,[pTime]);
												menu.insert(4,[pStatus]);
												
												/*menu.insert(2,[{xtype:'button',text:'-:-',scale:'large',width:50}]);
												menu.insert(4,[{xtype:'button',text:'---',scale:'large',width:100}]);*/
												
												plQuestion.removeAll(false);
												plQuestion.add(
												{
													xtype:'panel',
													id:'qDetail',
													bodyPadding:10,
													border:0,
													html:''
												});
												Ext.getCmp('qDetail').update('<p style="font-size:16px;font-weight:bold;">'+sQuestion.getAt(current_question).data['QUESTION_TEXT']+'</p>');
												plQuestion.add(
												{
													xtype:'radiogroup',
													id:'answer_group',
													height:200,
													columns:1,
													vertical:true,
													margin:10
												});
												Ext.Ajax.request(
												{
													url:'php/testing/get_answer.php?qid='+sQuestion.getAt(current_question).data['QUESTION_ID']/*+'&curqid='+current_question*/,
													success:function(response)
													{
														var array=new Array();
														array=response.responseText.split('_');
														for(var j=0;j<array.length;j++)
														{
															var array2=new Array();
															array2=array[j].split('-');
															Ext.getCmp('answer_group').add(
															{ 
																boxLabel:array2[1],
																name:'rb'+current_question,
																inputValue:array2[0]
															});
														}
													}
												});
												plQuestion.add(
												{
													xtype:'button',
													text:'СЛЕДУЮЩИЙ',
													id:'bNext',
													scale:'large',
													icon:'img/next.ico',
													iconAlign:'right',
													margin:10,
													handler:function()
													{
														if(Ext.getCmp('answer_group').getChecked().length==0)
														{
															Ext.Msg.alert('Предупреждение','Вы не выбрали ни одного ответа! Сделайте выбор.');
														}
														else
														{
															//console.log(Ext.getCmp('answer_group').getChecked()[0].inputValue);
															Ext.Ajax.request(
															{
																url:'php/testing/check_answer.php?aid='+Ext.getCmp('answer_group').getChecked()[0].inputValue,
																success:function(response)
																{
																	var r=response.responseText;
																	if(r=='0')
																	{
																		answer_wrong++;
																		pStatus.setVisible(true);
																		pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:red;">НЕВЕРНЫЙ ОТВЕТ!</p></center>');
																	}
																	else
																	{
																		answer_right++;
																		pStatus.setVisible(true);
																		pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:green;">ВЕРНЫЙ ОТВЕТ!</p></center>');
																	}
																}
															});
															
															current_question++;
															Ext.getCmp('qDetail').update('<p style="font-size:16px;font-weight:bold;">'+sQuestion.getAt(current_question).data['QUESTION_TEXT']+'</p>');
															Ext.getCmp('answer_group').removeAll();
															Ext.Ajax.request(
															{
																url:'php/testing/get_answer.php?qid='+sQuestion.getAt(current_question).data['QUESTION_ID']/*+'&curqid='+current_question*/,
																success:function(response)
																{
																	var array=new Array();
																	array=response.responseText.split('_');
																	for(var j=0;j<array.length;j++)
																	{
																		var array2=new Array();
																		array2=array[j].split('-');
																		Ext.getCmp('answer_group').add(
																		{ 
																			boxLabel:array2[1],
																			name:'rb'+current_question,
																			inputValue:array2[0]
																		});
																	}
																}
															});
															if(current_question==14)
															{
																plQuestion.remove('bNext');
																plQuestion.add(
																{
																	xtype:'button',
																	text:'ЗАВЕРШИТЬ',
																	scale:'large',
																	id:'bFinish',
																	icon:'img/finish.ico',
																	margin:10,
																	handler:function()
																	{
																		if(Ext.getCmp('answer_group').getChecked().length==0)
																		{
																			Ext.Msg.alert('Предупреждение','Вы не выбрали ни одного ответа! Сделайте выбор.');
																		}
																		else
																		{
																			Ext.Ajax.request(
																			{
																				url:'php/testing/check_answer.php?aid='+Ext.getCmp('answer_group').getChecked()[0].inputValue,
																				success:function(response)
																				{
																					var r=response.responseText;
																					if(r=='0')
																					{
																						answer_wrong++;
																						pStatus.setVisible(true);
																						pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:red;">НЕВЕРНЫЙ ОТВЕТ!</p></center>');
																					}
																					else
																					{
																						answer_right++;
																						pStatus.setVisible(true);
																						pStatus.update('<center><p style="padding-top:10;font-size:16px;font-weight:bold;color:green;">ВЕРНЫЙ ОТВЕТ!</p></center>');
																					}
																					plQuestion.removeAll(false);
																					
																					Ext.getCmp('mbHome').setDisabled(false);
																					Ext.getCmp('mbTest').setVisible(true);
																					Ext.getCmp('mbLearn').setVisible(true);
																					
																					pTime.setVisible(false);
																					pStatus.setVisible(false);
																					var status='Тест пройден';
																					if(answer_right<12)
																					{
																						status='Тест не пройден';
																					}
																					plQuestion.add(
																						{
																							xtype:'displayfield',
																							fieldLabel:'Статус:',
																							name:'status',
																							id:'status',
																							value:status,
																							margin:10
																						},
																						{
																							xtype:'displayfield',
																							fieldLabel:'Правильных ответов:',
																							name:'right',
																							id:'right',
																							value:answer_right,
																							margin:10
																						},
																						{
																							xtype:'displayfield',
																							fieldLabel:'Неправильных ответов:',
																							name:'wrong',
																							id:'wrong',
																							value:answer_wrong,
																							margin:10
																						}
																					);
																					answer_wrong=0;
																					answer_right=0;
																					current_question=0;
																					/*console.log(answer_wrong+'-wrong');
																					console.log(answer_right+'-right');*/
																				}
																			});
																		}
																	}
																});
															}
														}
													}
												});
											}
										});
									}
								}
							]
						}
					]);
				}
			}
		]
	});
	var pAdministrator=Ext.create('Ext.panel.Panel',
	{
		id:'iPanel',
		border:0,
		autoScroll:true,
		title:'Пользователь системы',
		width:'100%',
		height:'100%',
		tbar:
		[
			menu
		],
		items:
		[
			pInfo
		],
		tools:
		[
			{
				type:'refresh',
				tooltip:'Обновить страницу',
				handler: function(event,toolEl,panelHeader) 
				{
					document.location.reload();
				}
			},
			{
				type:'help',
				tooltip:'Информация',
				callback: function(panel,tool,event)
				{
				}
			}
		],
		renderTo:Ext.getBody()
	});
});