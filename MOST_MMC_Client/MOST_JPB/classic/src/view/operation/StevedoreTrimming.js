Ext.define('MOST.view.operation.StevedoreTrimming', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-stevedoretrimming',
	requires: [
		'MOST.view.operation.StevedoreTrimmingModel',
		'MOST.view.operation.StevedoreTrimmingController',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	controller: 'stevedoretrimming',
	
	viewModel: {
		type: 'stevedoretrimming'
	},
		
	listeners:{
		afterrender: 'onLoad'
	},
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 2,
			pluginId :'stevedoreTrimmingGridEditor',
			listeners: {
				cancelEdit: 'onCancelEdit',		
				validateedit: 'onValidateEdit',	
				edit: 'onEdit'
			}
		});
		
		Ext.apply(me, {
			layout : {
				type: 'vbox',
				align: 'stretch'
			},			
			items: [{
				xtype:'container',
				layout:{
					type:'hbox',
					align : 'stretch'
				},
				items:[
					{
						xtype :'fieldset',
						title : 'Hatch Info',
						layout:{
							type: 'vbox',
					        align : 'stretch'
						},
						margin : '0 0 0 0',
						defaults:{
							labelAlign: 'right',
							labelWidth: 80,
							margin : '3 0 0 0'
						},
						height : 250,
						flex : 1,
						items:[{
								xtype: 'datefield',
								fieldLabel: 'Work Date',
								format: MOST.config.Locale.getShortDate(),
						        readOnly: true,
						        bind:'{theStevedore.workYmd}',
						        //reference:'refWorkYmd'
							},{
		            			xtype: 'combo',
		            			fieldLabel : 'Shift',
		            			bind: {
									store: '{shiftCombo}',
									value: '{theStevedore.shftId}'
								},
								queryMode: 'local',
						        displayField: 'shftNm',
						        valueField: 'shftId',
						        readOnly: true
		            		},{
				    			xtype: 'textfield',
				    			fieldLabel : 'AP/FP',
				    			//reference: 'refTextfieldRemark',
				    			readOnly: true,
				    			bind:'{theStevedore.hatchDrtCd}',
				    			//maxLength: 100,
				    			//enforceMaxLength : true
							},{
				    			xtype: 'textfield',
				    			fieldLabel : 'Hatch No',
				    			//reference: 'refTextfieldRemark',
				    			readOnly: true,
				    			bind:'{theStevedore.hatchNo}',
				    			//maxLength: 100,
				    			//enforceMaxLength : true
							}
						]
					},{
						xtype :'fieldset',
						reference :'refBreakBulkContainer',
						title : 'Break Bulk',
						margin : '0 0 0 5',
						layout:{
							type:'vbox',
							align:'stretch'
						},
						defaults:{
							labelAlign: 'right',
							labelWidth: 80,
							margin : '3 0 0 0'
						},
						height : 250,
						flex : 1,
						items:[
							{
								xtype:'partnercdfield',
								// flex:1,
								 fieldLabel: 'Stevedores',
								//bind:{value : '{theStevedore.workBBKComp}'},
								reference:'refStedoreCompanyInBBK',
								margin : '3 0 0 0',
								params:{
									viewType: 'MG',
									searchPtyDivCd: 'STV'
								}
							},
							{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Supervisor',
	                            reference: 'refSupervisorInBBK',
	                            listeners:{
	                            	change: 'onSupervisorChange'
	                            }
	                            	
	                            //bind:'{theStevedore.spr}'
	                        },{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Winch Men',
	                            reference: 'refWinchMenInBBK',
	                            bind:'{theStevedore.winch}'
	                        },{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'General',
	                            reference: 'refGeneralInBBK',
                            	listeners:{
 	                            	change: 'onGeneralChange'
 	                            }
	                            //bind:'{theStevedore.winch}'
	                        },
							{
	                        	xtype: 'numberfield',
	                        	reference: 'refNosOfGangLashingStv',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Nos of Gang',
	                            bind:'{theStevedore.lashingGangNos}'
	                        },
							{
	                        	xtype: 'numberfield',
	                        	reference: 'refTallyWorker',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Tally Worker',
	                            bind:'{theStevedore.tallyWorker}'
	                        }
						]
					},{
						xtype :'fieldset',
						reference: 'refDryBulkContainer',
						title : 'Dry Bulk',
						margin : '0 0 0 5',
						layout:{
							type:'vbox',
							align:'stretch'
						},
						defaults:{
							labelAlign: 'right',
							labelWidth: 90,
							margin : '3 0 0 0'
						},
						height : 250,
						flex : 1,
						items:[
							{
								xtype:'partnercdfield',
								fieldLabel: 'Trimming Co',
								reference:'refStedoreCompanyInDBK',
								margin : '3 0 0 2',
								params:{
									viewType: 'MG',
									searchPtyDivCd: 'TRM'
								}
							},
							{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Supervisor',
	                            reference: 'refSupervisorInDBK',
                            	listeners:{
 	                            	change: 'onSupervisorChange'
 	                            }
	                            //bind:'{theStevedore.winch}'
	                        },{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                        	reference: 'refSingnalMenInDBK',
	                            fieldLabel: 'Signal Men',
	                            //reference: 'ctlStvReqHh',
	                            bind:'{theStevedore.signal}'
	                        },{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                        	reference: 'refDeckWorkerInDBK',
	                            fieldLabel: 'Deck Worker',
	                            //reference: 'ctlStvReqHh',
	                            bind:'{theStevedore.deck}'
	                        },{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Hopper Men',
	                            reference: 'refHoperMenInDBK',
	                            //reference: 'ctlStvReqHh',
	                            bind:'{theStevedore.hoper}'
	                        },{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'General',
	                            reference: 'refGeneralInDBK',
                            	listeners:{
 	                            	change: 'onGeneralChange'
 	                            }
	                            //bind:'{theStevedore.general}'
	                        }
						]
					},{
						xtype :'fieldset',
						title : 'Additional',
						margin : '0 5 0 5',
						layout:{
							type:'vbox',
							align: 'stretch'
						},
						defaults:{
							labelAlign: 'right',
							labelWidth: 80,
							margin : '3 0 0 0'
						},
						height : 250,
						flex : 1,
						items:[
							{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Supervisor',
	                            //reference: 'ctlStvReqHh',
	                            bind:'{theStevedore.supervisor}'
	                        },{
	                        	xtype: 'numberfield',
	                            minValue : 0,
	                        	maxValue: 9999999,
	                        	selectOnFocus : true,
	                            fieldLabel: 'Non-Tonnage',
	                            //reference: 'ctlStvReqHh',
	                            bind:'{theStevedore.nonworker}'
	                        }
						]
					}
				]
			},{
				xtype: 'tsb-datagrid',
				reference: 'refStevedoreTrimmingGrid',
				flex : 1,
				margin : '5 5 5 0',
				stateful : true,
				stateId : 'stateStevedoreTrimmingGrid',
				plugins: [
					//rowEditing, 
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{stevedoreTrimmingList}'
	    		},
	    		listeners: {
	    			celldblclick: 'onDblClick',
	    			selectionchange: 'onSelectionChange'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items: GridUtil.getGridColumns('StevedoreTrimmingList')
				}
		    }],
			dockedItems:[{//Toolbar buttons:
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [{
					xtype: 'tbfill'
				},{
					xtype: 'button',
					itemId: 'inquiryItemId',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},{
					xtype: 'button',
					itemId: 'saveItemId',
					reference:'refBtnSave',
					text: ViewUtil.getLabel('save'),
					ui: 'update-button',
					iconCls: 'x-fa fa-save',
					listeners: {
						click: 'onSave'
					}
				},
				{
					xtype: 'button',
					cls: 'column-setting-button',
					iconCls: 'x-fa fa-columns',
					text: ViewUtil.getLabel('column'),
					listeners: {
						click: 'onColumnSettingPopup',
						args: [me.MAIN_GRID_REF_NAME]
					}
	        	
				}]
			},{// Toolbar SearchCondition and VesselInfo:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[{
					xtype: 'fieldset',
					autoScroll: true,
					collapsible:true,
					margin: '5 5 5 5',
					flex:1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults:{
						margin: '0 0 5 0'
					},
					items:[{// Left: Search Condition
						xtype: 'searchfieldset',
						title: ViewUtil.getLabel('search'),
						layout: {
							type: 'vbox'
						},
						items: [
							{
								xtype: 'container',
								layout: { type: 'hbox'},
								defaults:{
									margin: '0 0 0 5',
									labelAlign: 'right'
								},
								items: [
									{
										xtype: 'shipcallnofield',
										reference: 'ctlScn',
										//emptyText: ViewUtil.getLabel('shipCallNo'),
										fieldLabel: ViewUtil.getLabel('shipCallNo'),
										labelWidth: 85,
										width:300,
										bind: {
											value: '{theSearch.scn}',
										},
										
									}
								]
							},
							{
							xtype: 'container',
							layout: { type: 'hbox'},
							defaults:{
								margin: '5 5 0 5',
								labelAlign: 'right'
							},
							items: [{
								xtype:'vesselcalllistfield',
								reference:'ctlVslCallId',
								fieldLabel: ViewUtil.getLabel('vslcallid'),
								labelWidth: 85,
								width:300,
								flex: 1,
							}]
						},{
							xtype: 'container',
							layout: { type: 'hbox'},
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'combo',
									labelWidth: 90,
									width:305,
									reference: 'ctlBulkDryCombo',
									fieldLabel: ViewUtil.getLabel('stevedoreTrimmingBulk'),
									queryMode: 'local',
									bind: {
										store: '{bulkDryCombo}'
									},
									displayField: 'label',
									valueField: 'data',
									value: '',
									listeners:{
										change:'onSearch'
									}
								},
							]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							flex:1,
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'combo',
									reference: 'ctlShiftCombo',
									labelWidth: 90,
									width:305,
									fieldLabel: ViewUtil.getLabel('stevedoreTrimmingShift'),
									queryMode: 'local',
									bind: {
										store: '{shiftCombo}'
									   },
									displayField: 'shftNm',
									valueField: 'shftId',
									value: '',
									listeners:{
										change:'onSearch'
									}
								}
							]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							flex:1,
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [	
							{
								xtype: 'datefield',
								labelWidth: 90,
								width:305,
								reference:'ctlWorkYmdField',
								fieldLabel: ViewUtil.getLabel('stevedoreTrimmingDate'),
								format: MOST.config.Locale.getShortDate(),
								listeners:{
									change:'onSearch'
								}
							}]
						},
					]
					},{//Right: VesselInfo:
						xtype: 'fieldset',
						title: ViewUtil.getLabel('vslInfo'),
						layout: {
							type: 'vbox',
							align: 'stretch'
						},
						flex: 1,
						margin: '0 0 5 5',
						items: [
						{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel:  ViewUtil.getLabel('vesselCode'),
									bind: '{theSdTrm.vslCd}',
									labelWidth: 90,
								},
								{
									xtype: 'textfield',
									width: 220,
									editable: false,
									fieldLabel: ViewUtil.getLabel('arrvSaId'),
									bind: '{theSdTrm.arrvSaId}',
									labelWidth: 50,
									hasFocus: false,
								},
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel: ViewUtil.getLabel('berthingLoc'),
									bind: '{theSdTrm.berthLoc}',
									labelWidth: 80,
								}
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel: ViewUtil.getLabel('vesselName'),
									bind: '{theSdTrm.vslNm}',
									labelWidth: 90
								},
								{
									xtype:'textfield',
									reference:'dtEta',
									editable: false,
									width: 220,
									fieldLabel: ViewUtil.getLabel('deprSaId'),
									bind: '{theSdTrm.depSaId}',
									labelWidth: 50
								},
								{
									xtype: 'textfield',
									width: 250,
									editable: false,
									fieldLabel: ViewUtil.getLabel('storageLoc'),
									labelWidth: 80
								}
							]
						},{
							xtype: 'container',
							layout: {
								type: 'hbox'
							},
							defaults:{
								margin: '5 5 0 0',
								labelAlign: 'right'
							},
							items: [{
								xtype: 'textfield',
								editable: false,
								width: 250,
								fieldLabel: ViewUtil.getLabel('voyage'),
								bind: '{theSdTrm.voyage}',
								labelWidth: 90
							},{
								xtype:'datefield',
								editable: false,
								readOnly:true,
								width: 220,
								fieldLabel: ViewUtil.getLabel('eta'),
								bind: '{theSdTrm.eta}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								labelWidth: 50
							},{
								xtype:'datefield',
								editable: false,
								readOnly:true,
								width: 250,
								fieldLabel: ViewUtil.getLabel('etd'),
								bind: '{theSdTrm.etd}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								labelWidth: 80
							}]
						}]
					}]
				}]
			}]
		});
		
		me.callParent();
	}
});

