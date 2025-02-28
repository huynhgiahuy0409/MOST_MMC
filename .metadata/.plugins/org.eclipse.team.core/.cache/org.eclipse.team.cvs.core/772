Ext.define('MOST.view.operation.rehandleoperation.RehandleCargoHandlingOut', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-confirmrehandlehandlingoutpopup',
	
	requires:[
		'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Checkbox'
	],
	
	width: 640,
	height: 480,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	controller: 'confirmrehandlehandlingoutpopup',
	
	viewModel: {
		type: 'confirmrehandlehandlingoutpopup'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			items:[{
				xtype:'fieldset',
				//flex:1,
				layout:{
					type:'vbox',
					align:'stretch',
				},
				margin:'5 5 5 5',
				items:[{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[{
						xtype: 'textfield',
	                    fieldLabel: ViewUtil.getLabel('confirmRehandleHandlingOutBlGr'),
	                    reference: 'txtGR',
	                    labelWidth: 50,
	                    bind:'{theDetail.cgNo}',
	                    width:180,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: ViewUtil.getLabel('confirmRehandleHandlingOutBlGr')
					},{
						xtype: 'combobox',
	                    reference: 'cboDeliveryMode',
	                    fieldLabel: ViewUtil.getLabel('confirmRehandleHandlingOutCargoClearanceStatus'),
	                    bind: {store: '{deliveryModeCombo}'},
	                    matchFieldWidth: true,
						queryMode: 'local',
				        displayField: 'scdNm',
				        valueField: 'scd',
				        editable: false,
				        disabled:true,
				        labelWidth:160,
				        labelAlign: 'right'
					}]
				}]
			},{
				xtype:'fieldset',
				layout:{
					type:'vbox',
					align:'stretch',
				},
				margin:'5 5 5 5',
				items:[{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					items:[{
	                	xtype: 'datetimefield',
	                	reference: 'dtStart',
	                	fieldLabel: ViewUtil.getLabel('fromtimeTitle'),
	                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                	labelAlign: 'left',
	                	labelWidth: 70,
	                	width:250,
	                	editable: false,
	                	disabled: false,
	                	bind:'{theDetail.hdlOutStDt}',
						listeners: {
							//blur: 'onDateChange'
						}
	                }]
				},{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					margin:'5 0 0 0',
					items:[{
	                	xtype: 'datetimefield',
	                	reference: 'dtEnd',
	                	fieldLabel: ViewUtil.getLabel('endtime'),
	                	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
	                	labelAlign: 'left',
	                	labelWidth: 70,
	                	width:250,
	                	editable: false,
	                	disabled: false,
	                	bind:'{theDetail.hdlOutEndDt}',
						listeners: {
							//blur: 'onDateChange'
						}
	                }]
				},{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'stretch'
					},
					margin:'5 0 0 0',
					items:[{
						xtype:'label',
						text: ViewUtil.getLabel('rehandleoperationLorryNo'),
						width:70,
						margin: '10 5 0 0'
					},{
                        xtype: 'truckfield',
                        reference:'ctlLorryNo',
                        labelWidth:70,
                        disabled:false,
                        editable: false,
                        allowBlank:false,
                        bind :{
                        	value : '{theDetail.lorryId}',
	   						lorryNo : '{theDetail.lorryId}',
	   						vslCallId: '{theDetail.vslCallId}',
	   						ptnrCd: '{theDetail.tsptr}',
	   						grNo: '{theDetail.cgNo}',
	   						searchDivCd : 'IN-GATE'
	   					}
                    },{
						xtype: 'textfield',
	                    fieldLabel: ViewUtil.getLabel('lorryCompany'),
	                    reference: 'txtLorryCompany',
	                    labelWidth: 120,
	                    bind:'{theDetail.tsptr}',
	                    width:300,
	                    labelAlign: 'right',
	                    editable:false,
	                    emptyText: ViewUtil.getLabel('lorryCompany')
					}]
				}]
			},{
				xtype:'fieldset',
				layout:{
					type:'hbox'
					//align:'stretch'
				},
				margin: '5 5 5 5',
				items:[{
					xtype:'container',
					layout:{
						type:'vbox'
						//align:'stretch'
					},
					items:[{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						items:[{
							xtype:'label',
							width:100
						},{
							xtype:'label',
							text:ViewUtil.getLabel('mt'),
							width:120,
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							margin: '0 0 0 3',
							text:ViewUtil.getLabel('m3'),
							width:120,
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							margin: '0 0 0 3',
							text:ViewUtil.getLabel('qTY'),
							width:120,
							style:{
								'text-align': 'center'
							}
						},{
							xtype:'label',
							width:100
							
						}]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox',
							//align:'stretch'
						},
						
						margin:'5 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: ViewUtil.getLabel('confirmrehandlehandlingout_dcoAmt'),
							maskRe: /[0-9.]/,
							value:0,
							width:220,
							bind:'{theDetail.docMt}',
							labelWidth: 100,
							reference: 'txtActAmt',
							editable:false
						},{
							xtype:'textfield',
							width:120,
							maskRe: /[0-9.]/,
							value:0,
							margin:'0 0 0 3',
							reference: 'txtActM3',
							bind:'{theDetail.docM3}',
							editable:false
						},{
							xtype:'textfield',
							width:120,
							margin:'0 0 0 3',
							maskRe: /[0-9.]/,
							value:0,
							reference: 'txtActQty',
							bind:'{theDetail.docQty}',
							editable:false
						}]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						margin:'5 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: ViewUtil.getLabel('confirmrehandlehandlingout_actualAmt'),
							width:220,
							labelWidth: 100,
							reference: 'txtBalAmt',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theDetail.actMt}',
							editable:false
						},{
							xtype:'textfield',
							width:120,
							margin:'0 0 0 3',
							reference: 'txtBalM3',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theDetail.actM3}',
							editable:false
						},{
							xtype:'textfield',
							width:120,
							margin:'0 0 0 3',
							reference: 'txtBalQty',
							maskRe: /[0-9.]/,
							value:0,
							bind:'{theDetail.actQty}',
							editable:false
						}]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						margin:'5 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: ViewUtil.getLabel('confirmrehandlehandlingout_whBalance'),
							bind:'{theDetail.balMt}',
							width:220,
							labelWidth: 100,
							reference: 'txtLoadMT',
							maskRe: /[0-9.]/,
							value:0,
							disabled:true,
							editable:true
						},{
							xtype:'textfield',
							width:120,
							margin:'0 0 0 3',
							reference: 'txtLoadM3',
							bind:'{theDetail.balM3}',
							maskRe: /[0-9.]/,
							value:0,
							disabled:true,
							editable:true
						},{
							xtype:'textfield',
							width:120,
							margin:'0 0 0 3',
							reference: 'txtLoadQty',
							bind:'{theDetail.balQty}',
							maskRe: /[0-9.]/,
							value:0,
							disabled:true,
							editable:true
						}]
					},,{
						xtype:'container',
						flex:1,
						margin:'5 0 0 0',
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						items:[{
                        	xtype : 'numberfield',
                        	minValue : 0,
                        	maxValue: 999999999999.999,
							fieldLabel: ViewUtil.getLabel('confirmrehandlehandlingout_lorryLoad'),
							width:220,
							labelWidth: 100,
							reference: 'txtLoadDmgMT',
							maskRe: /[0-9.]/,
							value:0,
							disabled:false,
							bind:'{theDetail.loadMt}',
							editable:true
						},{
                        	xtype : 'numberfield',
                        	minValue : 0,
                        	maxValue: 999999999999.999,
							width:120,
							margin:'0 0 0 3',
							reference: 'txtLoadDmgM3',
							bind:'{theDetail.loadM3}',
							maskRe: /[0-9.]/,
							disabled:false,
							value:0,
							editable:true
						},{
                        	xtype : 'numberfield',
                        	minValue : 0,
                        	maxValue: 999999999999.999,
							width:120,
							margin:'0 0 0 3',
							reference: 'txtLoadDmgPkgQty',
							bind:'{theDetail.loadQty}',
							maskRe: /[0-9.]/,
							disabled:false,
							value:0,
							editable:true
						},{
		                    xtype: 'checkboxfield',
		                    //flex: 2,
		                    boxLabel: ViewUtil.getLabel('finalDelivery'),
		                    margin: '0 0 0 10',
		                    //labelAlign:'left',
		                    reference: 'chkFnlOpeYn',
		                    //listeners: {
			    				//change: 'onNonJPVCChange'
			    			//}
		                }]
					},{
						xtype:'container',
						flex:1,
						layout:{
							type:'hbox'
							//align:'stretch'
						},
						margin:'5 0 0 0',
						items:[{
							xtype:'textfield',
							fieldLabel: ViewUtil.getLabel('location'),
							width:316,
							labelWidth: 100,
							reference: 'txtLocationId',
							editable:false
						},{
							xtype:'button',
							text: ViewUtil.getLabel('whDeAllocation'),
							margin:'0 0 0 5',
							reference:'btnLocation',
							listeners:{
		                		click: 'onOpenWarehousePopup',
	                			click: {
	                				fn : 'onOpenWarehousePopup',
	                				args : ['txtLocationId']
	                			}						
		                	}
						}]
					},{
						xtype:'container',
						margin:'5 0 0 0',
						layout:{
							type:'hbox',
							//align:'stretch'
						},
						items:[{
							xtype:'textfield',
							fieldLabel: ViewUtil.getLabel('remark'),
							width:450,
							labelWidth: 100,
							reference: 'txtRemark',
							bind:'{theDetail.rmk}',
							editable:true
						}]
					}]
				}]
			},{
				xtype:'container',
				layout:{
					type:'hbox',
					pack:'center'
				},
				
				margin:'5 5 0 5',
				items:[{
					xtype:'button',
					margin:'0 5 5 0',
					text: ViewUtil.getLabel('confirm'),
                	reference:'btnOk',
                	iconCls: 'fa fa-floppy-o',
					cls: 'search-button',                 	
                	listeners:{
                		click: 'onOk'
                	}
				},{
					xtype:'button',
					text: ViewUtil.getLabel('cancel'),
                	reference:'btnCancel',
                	iconCls: 'fa fa-window-close',
					cls: 'search-button',                 	
                	listeners:{
                		click: 'onCancel'
                	}
				}]
			}]
		});
		
		me.callParent();
		
	}
})
