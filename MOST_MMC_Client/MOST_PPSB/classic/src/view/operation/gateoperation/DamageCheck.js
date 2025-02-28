Ext.define('MOST.view.gateoperation.DamageCheck', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-damagecheck',
	
	requires: [
		'MOST.view.operation.DamageCheckModel',
		'MOST.view.operation.DamageCheckController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	title:"Damage Check",
	width: 850,
	height: 500,
	scrollable: false,
	
	controller: 'damagecheck',
	
	viewModel: {
		type: 'damagecheck'
	},
	
	listeners: {
		afterrender: 'onLoad'
	},
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DAMAGE_STORE_REF_NAME: 'refDamamageStore',  
	DAMAGE_STORE_NAME: 'theDamageStore',           
	FILE_UPLOAD_STORE_NAME :'uploadedFileDamageStore',
	FILE_UPLOAD_REF_NAME : 'refFileUpload',
	
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	layout: {
		type: 'vbox', 
		align: 'stretch' 
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
			items: [
				{
					xtype: 'container',
					layout: {
						type: 'hbox',
						align: 'stretch' 
					},

					items: [
						//col1
						{
							xtype: 'container',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch' 
							},
							defaults: {
								//width: 280,
				                labelWidth : 100,
				                labelAlign : 'right',
								margin : '5 0 0 5'
							},
							items: [
								{
									xtype : 'vesselcalllistfield',
									reference : 'ctlVslCallId',
									fieldLabel : ViewUtil.getLabel('vslcallid'),
									emptyText : ViewUtil.getLabel('vslcallid'),
									bind : {
										value : '{theDmg.vslCallId}'
									}
								},
								{
									xtype : 'combo',
									fieldLabel : ViewUtil.getLabel('blSN'),
									reference : 'ctlSearchBlNo',
									bind: {
				    	    			store: '{snBlCombo}',
				    	    			value: '{theDmg.cgNo}'
				    	    		},
				    	    		displayField: 'cdNm',
				   					valueField: 'cd',
				   					queryMode: 'local',
				                    listeners:{
										select:'getDoGrCombo'
									},
								},
								{
									xtype : 'combo',
									fieldLabel : ViewUtil.getLabel('doGR'),
									reference : 'ctlSearchGRNo',
									bind: {
				    	    			store: '{doGrCombo}',
				    	    			value: '{theDmg.doGrCd}'
				    	    		},
				    	    		displayField: 'doGrNm',
				   					valueField: 'doGrCd',
				   					queryMode: 'local'
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
		        		                    xtype: 'label',
		        		                    margin: '0 0 0 120',
		        		                    width: 15,
		        		                    text: ViewUtil.getLabel('damage.qty'),
		        		   				},
		        		   				{
		        		                    xtype: 'label',
		        		                    margin: '0 0 0 100',
		        		                    width: 15,
		        		                    text: ViewUtil.getLabel('damage.mt'),
		        		   				},
		        		   				{
		        		                    xtype: 'label',
		        		                    margin: '0 0 0 100',
		        		                    width: 15,
		        		                    text: ViewUtil.getLabel('damage.m3'),
		        		   				},
									]
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									items: [
										{
				                        	xtype:'numberfield',
											fieldLabel: ViewUtil.getLabel('damage.amt'),
											width : 200,
											labelWidth : 100,
											margin: '0 5 0 0',
											reference:'ctlDmgAmtQty',
											labelAlign: 'right',
											bind: {
					    	   					value: '{theDmg.dmgQty}'
					    	   				},
					    	   				maskRe: /[0-9]/,
					    	   				minValue: 0,
											maxValue: 999999999999,
				                        },
				                        {
				                        	xtype:'numberfield',
											reference:'ctlDmgAmtMT',
											margin: '0 5 0 5',
											width : 100,
											bind: {
					    	   					value: '{theDmg.dmgMt}'
					    	   				},
					    	   				maskRe: /[0-9]/,
					    	   				minValue: 0,
											maxValue: 999999999999,
				                        },
				                        {
				                        	xtype:'numberfield',
											reference:'ctlDmgAmtM3',
											margin: '0 5 0 5',
											width : 100,
											bind: {
					    	   					value: '{theDmg.dmgM3}'
					    	   				},
					    	   				maskRe: /[0-9]/,
					    	   				minValue: 0,
											maxValue: 999999999999,
				                        }
									]
								},
								{
									xtype: 'textfield',
									fieldLabel : ViewUtil.getLabel('checkTime'),
									reference : 'ctlCheckTime',
									editable: false,
									bind: {
										value: '{theDmg.checkedDt}'
				    	    		},
				    	    		format: 'MOST.config.Locale.getDefaultDateFormatWithNoSeconds()'
								},
								{
									xtype : 'combobox',
									fieldLabel : ViewUtil.getLabel('damage.part'),
									reference : 'ctlTheDamagePart',
									emptyText: "Select",
									bind: {
				    	    			store: '{theDamageParts}',
				    	    			value: '{theDmg.dmgPart}'
				    	    		},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									allowBlank: false,
								},
								{
									xtype : 'combobox',
									fieldLabel : ViewUtil.getLabel('damage.level'),
									reference : 'ctlTheDamageLevel',
									emptyText: "Select",
									bind: {
				    	    			store: '{theDamageLevels}',
				    	    			value: '{theDmg.dmgLevel}'
				    	    		},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									allowBlank: false,
								},
								
								 {
									xtype: 'container',
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									defaults: {
										margin : '0 0 0 5'
									},
									items: [
										{
				                            xtype: 'button',
				                            reference: 'btnClear',
				                            text: ViewUtil.getLabel('damage.clear'),
				                            iconCls: 'fa fa-file-o',
				                            disabled: false,
				                            listeners: {
				                            	click:'onClearDmg_clickHandler'
											}
				                        },
				                        {
				                            xtype: 'button',
				                            reference: 'btnAdd',
				                            text: ViewUtil.getLabel('add'),
				        					iconCls: 'x-fa fa-plus',
				                            disabled: false,
				                            listeners: {
												click:'onAddDmg_clickHandler'
											}
				                        },
				                        {
				                            xtype: 'button',
				                            reference: 'btnUpdate',
				                            text: 'Update',
				                            listeners: {
												click:'onUpdateDmg_clickHandler'
											}
				                        },
				                        {
				                            xtype: 'button',
				                            text: ViewUtil.getLabel('delete'),
				         					ui: 'delete-button',
				         					iconCls: 'x-fa fa-minus',
				                            reference: 'btnRemove',
				                            listeners: {
												click:'onRemoveDmg_clickHandler'
											}
				                        },
									]
		                        },
							]
						},
						//col2
						{
							xtype: 'container',
							margin : '5 5 0 5',
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch' 
							},
							defaults: {
				                labelWidth : 100,
				                labelAlign : 'right',
								margin : '5 0 5 5'
							},
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										pack: 'end'
									},
									defaults: {
										margin: '0 0 0 5'
									},
									items: [
				                        {
				                            xtype: 'filefield',
				                            name : 'fileUpload',
					        				itemId: 'createButton',
				                            reference: 'refFileField',
					        				id: 'fileUpload',
					        				buttonText: '',
					                    	enctype: 'multipart/form-data',
				                            method: 'POST',
				                            fileUpload: true,
					        		        buttonOnly: true,
					        		        multiple: true,
				                            width: 100,
				                            style: 'text-align:left',
				                            buttonConfig: {
					        					text:  ViewUtil.getLabel('add'),
					        					iconCls: 'x-fa fa-plus',
					        		    	},
					        		    	listeners: {
					        		    		change: 'onAddFile_clickHandler',
					        		    		afterrender:function(cmp){
					        		                cmp.fileInputEl.set({
//					        		                	accept: 'image/*' //only accept image
					        		                	multiple:'multiple'
					        		                });
					        		            }
					        			    }
				                        },
				                        {
				                            xtype: 'button',
				                            //margin : '0 0 0 5',
				                            reference: 'btnRemoveFile',
				                            text: ViewUtil.getLabel('delete'),
				         					ui: 'delete-button',
				         					iconCls: 'x-fa fa-minus',
				                            disabled: false,
				                            listeners: {
												click:'onRemoveFile_clickHandler'
											}
				                        },
									]
								},
								{
									xtype: 'tsb-datagrid',
									usePagingToolbar : false,
									reference: me.FILE_UPLOAD_REF_NAME,
									height: 120,
									plugins: [
										'gridexporter',
										'gridfilters',
									],
									bind: {
										store: '{' + me.FILE_UPLOAD_STORE_NAME + '}'
									},
									selModel: {
										type: 'checkboxmodel',  
		            		            checkOnly: false,
		            		            showHeaderCheckbox: true
									},
									columns: {
										defaults: {
						            		style : 'text-align:center',
						            		align: 'center'
						            	},
						            	items: GridUtil.getGridColumns('UploadDamageGridList')
									}
								},
								
								{
		                            xtype: 'textareafield',
		                            fieldLabel: 'Remark',
		                            reference: 'ctlDamageRemark',
		                            bind: '{theDmg.remark}'
		                        },
							]
						},
					]
				},
				
				{
					xtype: 'container',
					flex: 1,
					defaults: {
		                labelWidth : 100,
		                labelAlign : 'right',
		                margin : '5 0 0 5',
					},
					items: [
                        {
							xtype: 'tsb-datagrid',
							height: 150,
							usePagingToolbar : false,
							reference: me.DAMAGE_STORE_REF_NAME,
							plugins: [
								'clipboard',
								'gridfilters',
							],
							stateful: true,
							stateId: "",
							viewConfig: {
								stripeRows: true,
								enableTextSelection: true,
							},
							bind: {
								store: '{' + me.DAMAGE_STORE_NAME + '}'
							},
							selModel: {
								type: 'spreadsheet',
								cellSelect: false
							},
							columns: {
								defaults: {
				            		style : 'text-align:center',
				            		align: 'center'
				            	},
				            	items: GridUtil.getGridColumns('DamageGridList')
							}
                        },
					]
				},
				
				{
					xtype: 'container',
					margin: '5 0 5 0',
					layout: {
						type: 'hbox',
						pack: 'center'
					},
					items: [
						{
                            xtype: 'button',
                            reference: 'btnConfirm',
                            text: 'Confirm',
                            listeners: {
								click:'onConfirm_clickHandler'
							}
					 	},
					]
                }
			],
		});
		
		me.callParent();
	}
});