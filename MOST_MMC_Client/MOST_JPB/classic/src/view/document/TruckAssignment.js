Ext.define('MOST.view.document.TruckAssignment', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-lorryassignment',

	requires: [
		'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.document.TruckAssignmentController',
		'MOST.view.document.TruckAssignmentModel'
	],

	controller: 'truckAssignment',
	
	viewModel: {
		type: 'truckAssignment'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME : 'refTruckAssignmentGrid', 	// Main Grid Name 
	MAIN_STORE_NAME : 'LorryAssignmentGridList', 	// Main Store Name
	
	DETAIL_GRID_FILEUPLOAD_NAME: 'refPermitCertificateUploadGrid',
	DETAIL_STORE_FILEUPLOAD_NAME: 'permitCertificateUpload',
	
	/**refTruckAssignmentGrid
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(this, {
			xtype:'container',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
			{ // Row : 3
				xtype: 'container',
				layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex:1,
                margin: '0 0 0 0',
                items: [
	                {
	                    xtype: 'tabpanel',
	                    flex: 1,
	                    activeTab: 0,
			            margin: '0 5 5 0',
			            reference:'ctlTruckAssignmentTabPanel',
			            listeners:{
			            	tabchange:'onTabChange'
			            },
	                    items: [
	                        {
	                        	xtype:'container',
	                        	title: 'General Cargo',
	                        	name:'general',
			                    scrollable: 'both',
			                    layout: { type: 'vbox', align: 'stretch'},
	                        	items : [
	                        		{
	                    				xtype: 'fieldset',
	                    				margin : '0 0 5 0',
										padding: '10 10 1 10',
	                    				items:[{
	                    					xtype: 'container',
	                    					layout: {
	                    						type: 'hbox'
	                    					},
	                    					items: [{
	                    						xtype: 'container',
												margin: '5 0 26 0',
	                    						defaults: {
	                    							labelAlign: 'right',
	                    							labelWidth: 80,
	                    							margin: '5 0 0 0',
	                    						},
	                    						layout: {
	                    							type: 'vbox',
	                    							align: 'stretch'
	                    						},
	                    						flex: 1,
	                    						items: [
													{
														xtype: 'radiogroup',
														reference: 'rdTruckMode',
														margin: '0 0 0 80',
														width:400,
														bind: {
															//value:'{theLorryAssignment.truckMode}'
														},
														listeners: {
															change: 'onChangeTruckMode'
														},
														items:[
															{
																boxLabel: ViewUtil.getLabel('externalTruck'),
																name: 'truckMode',
																flex: 1,
																inputValue: 'E',
															},
															{
																boxLabel: ViewUtil.getLabel('internalTruck'),
																name: 'truckMode',
																flex: 1,
																inputValue: 'I',
																checked: true,
															}
														]
													},
	                    							{
	                    								xtype: 'combobox',
	                    								fieldLabel: ViewUtil.getLabel('masterBLNo'),
	                    								reference:'ctlMasterBlNo',
	                    								bind: {
	                    									store: '{masterBlCombo}',
	                    									value: '{theLorryAssignment.mfDocId}'
	                    								},
	                    								// listeners:{
	                    								// 	select : 'onSelectMasterBl',
	                    								// }, 
	                    								readOnly: true,
	                    								queryMode: 'local',
	                    								forceSelection : true,
	                    								editable : false,
	                    								displayField: 'scdNm',
	                    								valueField: 'mfDocId',
	                    								emptyText:'Select',
	                    							},
	                    							{
	                    							xtype: 'combobox',
	                    							fieldLabel: ViewUtil.getLabel('LABLNo'),
	                    							reference:'ctlBlNo',
	                    							bind: {
	                    								store: '{blNoCombo}',
	                    								value: '{theLorryAssignment.blNo}'
	                    							},
	                    							listeners:{
	                    								select : 'onSelectBl',
	                    							},
	                    							displayField: 'scdNm',
	                    							valueField: 'blNo',
	                    							queryMode: 'local',
	                    							emptyText: "select",
	                    							forceSelection : true,
	                    							anyMatch: true
	                    						},
	                    						{
	                    							xtype: 'textfield',
	                    							reference :'refDoNo',
	                    							fieldLabel: ViewUtil.getLabel('LADONo'),
	                    							bind: {
	                    								value: '{theLorryAssignment.doNo}',
	                    							},
	                    							readOnly:true
	                    						},
	                    						{
	                    							xtype: 'combobox',
													hidden: true,
	                    							flex: 3,
	                    							fieldLabel: ViewUtil.getLabel('subDoNo'),
	                    							reference:'ctlSubDoNo',
	                    							emptyText: "select",
	                    							bind: {
	                    								store: '{subDoCombo}',
	                    								value: '{theLorryAssignment.subDoNo}'
	                    							},
	                    							listeners:{
	                    								select : 'onSelectSDO'
	                    							},
	                    							displayField: 'cdNm',
	                    							valueField: 'cd',
	                    							queryMode: 'local',
	                    							forceSelection : true,
	                    							editable : true,
													anyMatch: true
	                    						},
	                    						{
	                    							xtype: 'combobox',
	                    							flex: 3,
	                    							fieldLabel: ViewUtil.getLabel('LASNNo'),
	                    							reference:'ctlSNNo',
	                    							emptyText: "select",
	                    							bind: {
	                    								store: '{shipgNoteCombo}',
	                    								value: '{theLorryAssignment.shipgNoteNo}'
	                    							},
	                    							listeners:{
	                    								select : 'onSelectSNNo'
	                    							},
	                    							displayField: 'scdNm',
	                    							valueField: 'shipgNoteNo',
	                    							queryMode: 'local',
	                    							forceSelection : true,
	                    							anyMatch: true
	                    						},
	                    						{
	                    							xtype: 'combobox',
	                    							flex: 2,
	                    							fieldLabel: ViewUtil.getLabel('LAGRNo'),
	                    							reference:'ctlGR',
	                    							emptyText: "select",
	                    							bind: {
	                    								store: '{goodsReceiptCombo}',
	                    								value: '{theLorryAssignment.grNo}'
	                    							},
	                    							listeners:{
	                    								select : 'onSelectGR'
	                    							},
	                    							displayField: 'cdNm',
	                    							valueField: 'cd',
	                    							queryMode: 'local',
	                    							forceSelection : true,
	                    							anyMatch: true
	                    						}]
	                    					},
	                    					//End of col1
	                    					{
	                    						xtype: 'container',
												margin: '31 0 0 0',
	                    						defaults: {
													labelAlign: 'right',
	                    							labelWidth: 80,
													margin: '5 0 0 0',
	                    						},
	                    						layout: {
	                    							type: 'vbox',
	                    							align: 'stretch'
	                    						},
	                    						flex: 1,
	                    						items: [{
	                    							xtype: 'textfield',
	                    							reference :'refDelvTpCd',
	                    							fieldLabel: ViewUtil.getLabel('LADMode'),
	                    							bind: '{theLorryAssignment.delvTpCd}',
	                    							readOnly:true
	                    						},
	                    						{
	                    							xtype: 'textfield',
	                    							fieldLabel: ViewUtil.getLabel('LATransporter'),
	                    							bind: '{theLorryAssignment.tsptr}',
	                    							reference:'ctlTransporter',
	                    							editable: false
	                    						},
	                    						{
	                    							xtype: 'textfield',
	                    							reference :'refCmdtCd',
	                    							fieldLabel: ViewUtil.getLabel('LACommodity'),
	                    							bind: '{theLorryAssignment.cmdtCd}',
	                    							readOnly:true
	                    						},
	                    						{
	                    							xtype: 'container',
	                    							defaults: {
	                    								labelAlign: 'right',
	                    								labelWidth: 80,
	                    							},
	                    							layout: {
	                    								type: 'hbox',
	                    								align: 'stretch'
	                    							},
	                    							items: [{
	                    								xtype: 'textfield',
	                    								flex: 1,
	                    								fieldLabel: ViewUtil.getLabel('LALorryNo'),
	                    								readOnly: true,
	                    								bind:{
	                    									value : '{theLorryAssignment.lorryNo}'
	                    								},
	                    								reference:'ctlLorryNo'
	                    							},{
	                    								xtype: 'button',
	                    								margin: '0 0 0 5',
	                    			 					iconCls: 'x-fa fa-search',
	                    			 					listeners: {
	                    			 						click: 'openLorrysPopup'
	                    			 					}
	                    							}]
	                    						},
	                    						{
	                    							xtype: 'container',
	                    							defaults: {
	                    								labelAlign: 'right',
	                    								labelWidth: 80,
	                    							},
	                    							layout: {
	                    								type: 'hbox',
	                    								align: 'stretch'
	                    							},
	                    							items: [{
	                    								xtype: 'textfield',
	                    								fieldLabel: ViewUtil.getLabel('chassisNo'),
	                    								reference:'ctlChassisNo',
	                    								flex: 1,
	                    								readOnly: true,
	                    								bind:{
	                    									value : '{theLorryAssignment.chassisNo}'
	                    								}
	                    							},{
	                    								xtype: 'button',
	                    								margin: '0 0 0 5',
	                    			 					iconCls: 'x-fa fa-search',
	                    			 					listeners: {
	                    			 						click: 'openChassisPopup'
	                    			 					}
	                    							}]
	                    						},
	                    						{
	                    							xtype: 'container',
	                    							defaults: {
	                    								labelAlign: 'right',
	                    								labelWidth: 80,
	                    							},
	                    							layout: {
	                    								type: 'hbox',
	                    								align: 'stretch'
	                    							},
	                    							items: [{
	                    								xtype: 'textfield',
	                    							 	flex: 1,
	                    							 	readOnly: true,
	                    								fieldLabel: ViewUtil.getLabel('LADriverIC'),
	                    								bind:{
	                    									value : '{theLorryAssignment.driverId}'
	                    								},
	                    								reference:'ctlDriverIC',
	                    							},
	                    							{
	                    								xtype: 'button',
	                    								margin: '0 0 0 5',
	                    			 					iconCls: 'x-fa fa-search',
	                    			 					listeners: {
	                    			 						click: 'openDriversPopup'
	                    			 					}
	                    							}]
	                    						},
												{
													xtype: 'container',
													defaults: {
														labelAlign: 'right',
														margin: '5 0 0 0'
													},
													layout: {
														type: 'hbox',
														align: 'stretch'
													},
													items: [
														{
															xtype: 'textfield',
															flex: 1,
															fieldLabel: ViewUtil.getLabel('LADriverNm'),
															bind: { value: '{theLorryAssignment.driverNm}' },
															reference: 'ctlDriverNm',
															hidden: true
														}
													]
												},
	                    						{
	                    							xtype: 'container',
	                    							defaults: {
	                    								 labelAlign: 'right',
	                    							 },
	                    							 layout: {
	                    								 type: 'hbox',
	                    								 align: 'stretch'
	                    							 },
	                    							 items: [ 
	                    								 {
	                    								 	xtype: 'textfield',
	                    								 	flex: 1,
	                    								 	margin: '2 0 0 0',
	                    									fieldLabel: ViewUtil.getLabel('LALorryId'),
	                    									bind:{value : '{theLorryAssignment.lorryId}'},
	                    									reference:'ctlLorryId',
	                    									hidden: true
	                    								 }
	                    							 ]
	                    						}]
	                    					},
	                    					//End of col2
	                    					{
	                    						xtype: 'container',
	                    						layout:{
	                    							type: 'vbox'
	                    						},
	                    						items:[
	                    							{
	                    								xtype: 'container',
	                    								layout: {
	                    									type: 'hbox',
	                    									align: 'stretch'
	                    								},
	                    								items: [
	                    									{
	                    										xtype: 'container',
	                    										defaults: {
	                    											labelAlign: 'right',
	                    											labelWidth: 100
	                    										},
	                    										flex: 1,
	                    										layout: {
	                    											type: 'vbox',
	                    											align: 'stretch'
	                    										},
	                    										items: [
	                    											{
	                    												xtype: 'label',
	                    												margin: '15 0 0 145',
	                    												text: ViewUtil.getLabel('LAMT'),
	                    												readOnly:true
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refWgt',
	                    												fieldLabel: ViewUtil.getLabel('LADoc'),
	                    												width: 200,
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.wgt}'
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refDmt',
	                    												fieldLabel: ViewUtil.getLabel('LADirect'),
	                    												readOnly:true,
	                    												width: 200,
	                    												bind: '{theLorryAssignment.dmt}'
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refImt',
	                    												fieldLabel: ViewUtil.getLabel('LAIndirect'),
	                    												width: 200,
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.imt}'
	                    											},
																	{
	                    												xtype: 'numberfield',
	                    												margin: '5 5 0 0',
	                    												reference : 'ctlAdvMt',
	                    												fieldLabel: ViewUtil.getLabel('LAAdviceAmount'),
	                    												width: 200,
																		regex: /^[0-9]*$/,
																		regexText: 'Only non-negative numbers are allowed.',
	                    												bind: '{theLorryAssignment.advMt}'
	                    											}
	                    										]
	                    									},
	                    									{
	                    										xtype: 'container',
	                    										defaults: {
	                    											labelAlign: 'right',
	                    											labelWidth: 100
	                    										},
	                    										flex: 1,
	                    										layout: {
	                    											type: 'vbox',
	                    											align: 'stretch'
	                    										},
	                    										items: [
	                    											{
	                    												xtype: 'label',
	                    												margin: '15 0 0 45',
	                    												text: ViewUtil.getLabel('LAM3'),
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refVol',
	                    												fieldLabel: '',
	                    												width: 100,
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.vol}'
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refDm3',
	                    												fieldLabel: '',
	                    												width: 100,
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.dm3}'
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refIm3',
	                    												width: 100,
	                    												fieldLabel: '',
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.im3}'
	                    											},
																	{
	                    												xtype: 'numberfield',
	                    												margin: '5 5 0 0',
	                    												reference :'ctlAdvM3',
	                    												width: 100,
	                    												fieldLabel: '',
	                    												bind: '{theLorryAssignment.advM3}'
	                    											}
	                    										]
	                    									},
	                    									{
	                    										xtype: 'container',
	                    										defaults: {
	                    											labelAlign: 'right',
	                    											labelWidth: 50
	                    										},
	                    										flex: 1,
	                    										layout: {
	                    											type: 'vbox',
	                    											align: 'stretch'
	                    										},
	                    										items: [
	                    											{
	                    												xtype: 'label',
	                    												margin: '15 0 0 45',
	                    												text: ViewUtil.getLabel('LAQty'),
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refPkgqty',
	                    												fieldLabel: '',
	                    												width: 100,
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.pkgqty}'
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refDqtyd',
	                    												fieldLabel: '',
	                    												width: 100,
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.dqty}'
	                    											},
	                    											{
	                    												xtype: 'textfield',
	                    												margin: '5 5 0 0',
	                    												reference :'refIqty',
	                    												fieldLabel: '',
	                    												width: 100,
	                    												readOnly:true,
	                    												bind: '{theLorryAssignment.iqty}'
	                    											},
																	{
	                    												xtype: 'numberfield',
	                    												margin: '5 5 0 0',
	                    												reference :'ctlAdvQty',
	                    												fieldLabel: '',
	                    												width: 100,
	                    												bind: '{theLorryAssignment.advQty}'
	                    											}
	                    										]
	                    									},
	                    									{
	                    										xtype: 'container',
	                    										defaults: {
	                    											labelAlign: 'right',
	                    											labelWidth: 50
	                    										},
	                    										margin : '30 0 5 0',
	                    										flex: 1,
	                    										layout: {
	                    											type: 'vbox',
	                    											align: 'stretch'
	                    										},
	                    										items:[{
	                    											xtype: 'button',
	                    											itemId: 'btnAdd',
	                    											margin : '10 0 5 0',
	                    											text: ViewUtil.getLabel('add'),
	                    											iconCls: 'x-fa fa-plus',
	                    											listeners: {
	                    												click: 'onAdd'
	                    											},
	                    											hidden: true
	                    										},
	                    										{
	                    											xtype: 'button',
	                    											itemId: 'btnClear',
	                    											margin : '10 0 5 0',
	                    											text: ViewUtil.getLabel('clear'),
	                    											iconCls: 'x-fa fa-refresh',
	                    											listeners: {
	                    												click: 'onClear'
	                    											},
	                    											hidden: true
	                    										},
	                    										{
	                    											xtype: 'button',
	                    											itemId: 'btnDelete',
	                    											hidden: true,
	                    											margin : '5 0 5 0',
	                    											text: ViewUtil.getLabel('remove'),
	                    											ui: 'delete-button',
	                    											iconCls: 'x-fa fa-minus',
	                    											listeners: {
	                    												click: 'onRemove'
	                    											}
	                    										}]
	                    									}
	                    								]
	                    							},{
	                    								xtype: 'container',
	                    								layout:{
	                    									type: 'hbox'
	                    								},
	                    								items:[
	                    									{
	                    										xtype: 'container',
	                    										flex: 1,
	                    										defaults: {
	                    											labelAlign: 'right',
	                    											labelWidth: 100,
	                    											width: 410, 
	                    										},
	                    										items:[
	                    											{
	                    												xtype: 'numberfield',
	                    												fieldLabel: ViewUtil.getLabel('allowWgt'),
	                    												references: 'refAllowWgt',
	                    												bind: '{theLorryAssignment.allowWgt}',
																		margin: '5 0 0 0',
	                    												readOnly: true,
	                    												minValue: 0,
	                    		    									maxValue: 999999999999999.999,
	                    		    									decimalPrecision: 3
	                    											},
	                    											{
	                    												xtype: 'numberfield',
	                    												minValue: 0,
	                    		    									maxValue: 999999999999999.999,
	                    		    									decimalPrecision: 3,
																		margin: '-2 0 0 0',
	                    												reference: 'ctlAllowWgtVal',
	                    												fieldLabel: ViewUtil.getLabel('allowWgtVal'),
	                    												bind: '{theLorryAssignment.allowWgtVal}',
	                    												listeners:{
//	                    													change: 'onActiveOverloadBtn',
//	                    													blur: 'onActiveOverloadBtn'
	                    												}
	                    											},
																	{
																		xtype: 'partnercdfield',
																		fieldLabel: ViewUtil.getLabel('EQContractor'),
																		reference: 'ctlContractor',
																		bind: {
																		},
																		params: {
																			ptnrType: CodeConstants.CM_PTNRTP_CTT,
																		},
																	},
	                    										]
	                    									},
	                    									{
	                    										xtype: 'button',
	                    										references: 'refOverLoadPermitBtn',
	                    										text: ViewUtil.getLabel('permit'),
	                    										margin: '13 0 0 5',
	                    										iconCls : 'x-fa fa-plus',
	                    										disable: true,
	                    										hidden: true
	                    									}
	                    								]
	                    							}
	                    						]
	                    					},
	                    					//End of col3
											{
												xtype: 'container',
												flex: 1,
												layout : {
													type: 'vbox',
													align: 'stretch'
												},
												items:[
													{
														xtype: 'container',
														flex: 1,
														layout : {
															type: 'hbox',
															pack: 'end'
														},
														items:[
															{
																xtype: 'button',
																margin: '0 0 0 5',
																text: ViewUtil.getLabel('send'),
																iconCls: 'fa fa-envelope-o',
																 listeners: {
																	 click: 'onSendMessage'
																 }
															}
														]
													},
													{
														xtype: 'fieldset',
														reference: 'refSpecialPermissionForm',
														padding: '0 10 10 10',
														height: 186,
														title: ViewUtil.getLabel('SpecialPermission'),
														defaults: {
															labelAlign: 'right',
															labelWidth: 80
														},
														layout: {
															type: 'vbox',
															align: 'stretch'
														},
														flex: 1,
														items: [
															{
																xtype: 'checkboxfield',
																boxLabel: ViewUtil.getLabel('SpecialPermission'),
																reference: 'refSpecialPermissionChk',
		//	                    								bind: '{theLorryAssignment.permitYn}',
																bind: '{permitChecked}',
																inputValue: 'Y',
																uncheckedValue: 'N',
																checked:false,
																listeners:{
																	change: 'onChangeSpecialPermission'
																}
															},
															{
																xtype: 'container',
																margin: '0 0 5 0',
																layout: {
																	type: 'hbox',
																	align: 'right',
																	pack: 'end'
																},
																items: [{
																	xtype: 'filefield',
																	name : 'fileUpload',
																	itemId: 'createButton',
																	reference: 'refBtnAddFile',
																	id:'permitCertificateUpload',
																	style: 'text-align:left', 
																	width: 68,
																	method: 'POST',
																	fileUpload: true,
																	enctype: 'multipart/form-data',
																	buttonText: '',
																	buttonOnly: true,
																	multiple: true,
																	buttonConfig: {
																		text:  ViewUtil.getLabel('add'),
																		iconCls: 'x-fa fa-plus' 
																	},
																	listeners: {
																		change: 'onPermitCertificateFileUploadAdd',
																		afterrender:function(cmp){
																			cmp.fileInputEl.set({
																				multiple:'multiple'
																			});
																		}
																	}
																},{
																	xtype: 'button',
																	reference: 'refBtnRemoveFile',
																	ui: 'delete-button',
																	iconCls: 'x-fa fa-minus',
																	text: ViewUtil.getLabel('remove'),
																	listeners: {
																		click: 'onPermitCertificateFileUploadRemove'
																	}
																}]
															},	
															{
																xtype: 'tsb-datagrid',
																reference: me.DETAIL_GRID_FILEUPLOAD_NAME,
																flex : 1,
																//height: 65,
																stateful : true,
																usePagingToolbar : false,
																stateId : 'stateTruckAssignmentUploadGrid',
																plugins: [
																	'gridexporter',
																	'gridfilters',
																	'clipboard'
																],
																bind: {
																	store: '{'+me.DETAIL_STORE_FILEUPLOAD_NAME+'}'
																},
																listeners: {
																	celldblclick: 'onFileDownloadDblClick'
																},
																selModel: {
		//	                    	            		            type: 'checkboxmodel',  
		//	                    	            		            checkOnly: false,
		//	                    	            		            showHeaderCheckbox: true
																},
																columns: {
																	defaults: {
																		style : 'text-align:center',
																		align : 'center'
																	},
																	//items: GridUtil.getGridColumns('PermitCertificateFileList')
																	items: GridUtil.getGridColumns('ShippingNoteFileUpload')
																}
															}
														]
													}
												]
											},
	                    					]
	                    				}]
	                    			},
	                    			{
	                    				xtype: 'container',
	                    				flex: 1,
	                    				layout: {
	                    					type: 'hbox',
	                    					align: 'stretch'
	                    				},
	                    				items: [
	                    					{
	                    						xtype: 'tsb-datagrid',
	                    						reference: me.MAIN_GRID_REF_NAME,
	                    						flex : 1,
	                    						margin : '0 0 5 0',
	                    						stateful : true,
	                    						stateId : '',
	                    						viewConfig: {
	                    							stripeRows: true,
	                    							enableTextSelection: true,
	                    						},
	                    						plugins: [
	                    							'gridfilters',
	                    							'clipboard'
	                    						],
	                    						bind: {
	                    							store: '{' + me.MAIN_STORE_NAME + '}'
	                    						},
	                    						selModel: {
	                    							type: 'spreadsheet',
	                    							cellSelect: false
	                    						},
	                    						listeners: {
	                    							cellClick: 'onCellClick',
	                    							pagingSearch : 'onSearch'
	                    						},
	                    						columns: {
	                    							defaults: {
	                    								style : 'text-align:center',
	                    								align : 'center'
	                    							},
	                    							items : GridUtil.getGridColumns('TruckAssignment')
	                    						}
	                    					}
	                    				]
	                    			}
	        					]
	                        },{
			                    xtype: 'container',
			                    title: 'RORO Cargo',
			                    name:'roro',
			                    scrollable: 'both',
			                    layout: { type: 'vbox', align: 'stretch'},
	    						items : [
	    							{
		    							xtype: 'app-truckassignmentofroro',
		    				    		reference: 'refTruckAssignmentOfRORO',
		    				    		flex: 1
		    						}
	    						]
			                },
	                    ]
	                }
	            ]
			}],
			
			dockedItems:[{
				xtype : 'container',
				style: { "background-color":"white" },
				layout: {
					type: 'hbox',
				},
				defaults: {
					margin: '1 1 1 1'
				},
				items: [
				{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					itemId: 'inquiryItemId',
					reference: 'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search',
					cls: 'search-button',
					listeners: {
						click: 'onSearch'
					}
				},
				{
					xtype: 'button',
					itemId: 'clearItemId',
					reference:'refBtnRefresh',
					text: ViewUtil.getLabel('refresh'),
					iconCls: 'x-fa fa-refresh',
					listeners: {
						click: 'onRefresh'
					},
				
				},
				{	
					xtype: 'button',
					itemId: 'createItemId',
					reference:'refBtnCreate',
					text: ViewUtil.getLabel('add'),
					ui: 'create-button',
					iconCls: 'x-fa fa-plus',
					hidden:false,
					listeners: {
						click: 'onAdd'
					}
		    	},
				{
					xtype: 'button',
					itemId: 'btnDelete',
					reference:'refBtnDelete',
					text: ViewUtil.getLabel('remove'),
					ui: 'delete-button',
					iconCls: 'x-fa fa-minus',
					hidden:false,
					listeners: {
						click: 'onRemove'
					}
				},
				{
					xtype: 'button',
					itemId: 'exportToPdfButton',
					reference:'refBtnPreview',
					text: ViewUtil.getLabel('preview'),
					iconCls: 'x-fa fa-file-pdf-o',
					cls: 'excel-button',
					listeners: {
						click: {
							fn: 'onPreview',
						}
					}
				},
				{
					xtype: 'button',
					itemId: 'saveItemId',
					reference:'refBtnSave',
					iconCls: 'x-fa fa-save',
					hidden:false,
					text: ViewUtil.getLabel('save'),
					listeners: {
						click: 'onSave'
					},
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
			},
			{//Search Condition and VP infor:
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 5 0 0',
				defaults: {
					labelAlign: 'right',
				},
				items:[
					{
						xtype: 'fieldset',
						autoScroll: true,
						collapsible: true,
						margin: '0 0 10 0',
						padding: '0 10 10 10',
						flex: 1,
						layout: {
							type: 'hbox',
							align: 'stretch'
						},
						defaults: {
							margin: '0 0 0 0'
						},
						items: [
							{// Left: Search Condition
								xtype: 'searchfieldset',
								title: ViewUtil.getLabel('search'),
								layout: {
									type: 'hbox'
								},
								padding: '0 10 10 10',
								defaults: {
									labelAlign: 'right',
									labelWidth: 80,
									// margin: '5 5 0 0'
								},
								items: [
									{
										xtype: 'container',
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										padding: '0 10 0 0',
										width: 240,
										flex: 1,
										items: [
											{
												xtype: 'shipcallnofield',
												reference: 'ctlScn',
												emptyText: ViewUtil.getLabel('shipCallNo'),
												fieldLabel: ViewUtil.getLabel('shipCallNo'),
												bind: {
													value: '{theSearch.scn}',
												},
												margin: '0 0 5 0',
												labelWidth: 80
											},
											{
												xtype: 'vesselcalllistfield',
												reference: 'ctlVslCallId',
												fieldLabel: ViewUtil.getLabel('vessel'),
												emptyText: ViewUtil.getLabel('vslcallid'),
												allowBlank: false,
												bind: {
													value: '{theSearch.vslCallId}'
												},
												labelWidth: 80
											},
											{
												xtype: 'combobox',
												fieldLabel: ViewUtil.getLabel('masterBLNo'),
												reference: 'ctlSearchMasterBlNo',
												bind: {
													store: '{masterBlCombo}',
													value: '{theSearch.mfDocId}'
												},
												listeners: {
													select: 'onSelectMasterBl',
													//change: 'onSearch'
												},
												queryMode: 'local',
												forceSelection: true,
												anyMatch: true,
												disable: true,
												displayField: 'scdNm',
												valueField: 'mfDocId',
												emptyText: 'select',
												labelWidth: 80,
												labelAlign: 'right',
												margin: '5 0 0 0'
											},
											{
												xtype: 'combobox',
												reference: 'refSearchBlno',
												fieldLabel: ViewUtil.getLabel('LABLNo'),
												emptyText: "select",
												bind: {
													store: '{blNoCombo}',
													value: '{theSearch.blNo}'
												},
												listeners: {
													select: 'onSelectBLSNNo',
													//change: 'onSearch'
												},
												displayField: 'scdNm',
												valueField: 'blNo',
												queryMode: 'local',
												forceSelection: true,
												anyMatch: true,
												labelWidth: 80,
												labelAlign: 'right',
												margin: '5 0 0 0'
											},
											{
												xtype: 'combobox',
												hidden: true,
												reference: 'refSearchSDONo',
												fieldLabel: ViewUtil.getLabel('subDoNo'),
												emptyText: "select",
												bind: {
													store: '{subDoCombo}',
													value: '{theSearch.subDoNo}'
												},
												// listeners:{
												// 	select : 'onSearch',
												// 	change:'onSearch'
												// },
												displayField: 'cdNm',
												valueField: 'cd',
												queryMode: 'local',
												forceSelection: true,
												anyMatch: true,
												labelWidth: 80,
												labelAlign: 'right',
												margin: '5 0 0 0'
											}
										]
									},
									{
										xtype: 'container',
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										flex: 1,
										width: 200,
										padding: '31 0 0 0',
										items: [
											{
												xtype: 'combobox',
												reference: 'refSearchSnNo',
												fieldLabel: ViewUtil.getLabel('LASNNo'),
												emptyText: "select",
												bind: {
													store: '{shipgNoteCombo}',
													value: '{theSearch.shipgNoteNo}'
												},
												listeners: {
													change: 'onSelectBLSNNo',
													//select: 'onSearch'
												},
												displayField: 'scdNm',
												valueField: 'shipgNoteNo',
												queryMode: 'local',
												forceSelection: true,
												anyMatch: true,
												labelWidth: 40,
												labelAlign: 'right'
											},
											{
												xtype: 'combobox',
												reference: 'refSearchGrNo',
												fieldLabel: ViewUtil.getLabel('LAGRNo'),
												emptyText: "select",
												bind: {
													store: '{goodsReceiptCombo}',
													value: '{theSearch.grNo}'
												},
												// listeners:{
												// 	select : 'onSearch',
												// 	change:'onSearch'
												// },
												displayField: 'cdNm',
												valueField: 'cd',
												queryMode: 'local',
												forceSelection: true,
												anyMatch: true,
												labelWidth: 40,
												labelAlign: 'right',
												margin: '-5 0 0 0'
											}
										]
									}
								]
							},
							{//Right: VesselInfo:
								xtype: 'fieldset',
								title: ViewUtil.getLabel('vslInfo'),
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								padding: '26 10 0 10',
								flex: 1,
								margin: '0 0 0 5',
								items: [
									{
										xtype: 'container',
										defaults: {
											labelAlign: 'right',
											margin: '5 0 0 0',
											labelWidth: 90
										},
										flex: 1,
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										items: [
											{
												xtype: 'textfield',
												bind: '{theVslInfo.vslCd}',
												fieldLabel: ViewUtil.getLabel('vesselCode'),
												readOnly: true

											},
											{
												xtype: 'textfield',
												bind: '{theVslInfo.vslNm}',
												fieldLabel: ViewUtil.getLabel('vesselName'),
												readOnly: true
											},
											{
												xtype: 'textfield',
												bind: '{theVslInfo.voyage}',
												fieldLabel: ViewUtil.getLabel('voyage'),
												readOnly: true
											}]
									},
									{
										xtype: 'container',
										defaults: {
											labelAlign: 'right',
											margin: '5 0 0 0',
											labelWidth: 90
										},
										flex: 1,
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										items: [
											{
												xtype: 'textfield',
												bind: '{theVslInfo.arrvSaId}',
												fieldLabel: ViewUtil.getLabel('SNLASA'),
												readOnly: true
											},
											{
												xtype: 'datefield',
												fieldLabel: ViewUtil.getLabel('eta'),
												bind: '{theVslInfo.eta}',
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												readOnly: true,
											},
											{
												xtype: 'datefield',
												fieldLabel: ViewUtil.getLabel('etd'),
												bind: '{theVslInfo.etd}',
												format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
												readOnly: true,
											}]
									},
									{
										xtype: 'container',
										defaults: {
											labelAlign: 'right',
											labelWidth: 90,
											margin: '5 0 0 0',
										},
										flex: 1,
										layout: {
											type: 'vbox',
											align: 'stretch'
										},
										items: [
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('berthingLoc'),
												bind: '{theVslInfo.berthLoc}',
												readOnly: true
											},
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('storageLoc'),
												bind: '{theVslInfo.storageLoc}',
												readOnly: true
											},
											{
												xtype: 'textfield',
												fieldLabel: ViewUtil.getLabel('SNLDSA'),
												bind: '{theVslInfo.sAgent}',
												readOnly: true
											}]
									}]
							}
						]
					}
				]
			}]
		});
		
		me.callParent();
	}
});