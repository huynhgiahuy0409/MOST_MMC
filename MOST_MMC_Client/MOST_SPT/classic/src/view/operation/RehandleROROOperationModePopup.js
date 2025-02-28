Ext.define('MOST.view.operation.RehandleROROOperationModePopup', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-rehandlerorooperationmodepopup',
	requires: [],


	width: 1150,
	height: 520,
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refRehandleROROOperationModeGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'rehandleROROOperationModeStore',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	listeners:{
		afterrender: 'onDetailRORORehandleLoad'
	},
	initComponent: function () {

		var me = this;

		Ext.apply(me, {
			items: [
				{
					xtype: 'tsb-datagrid',
					reference: 'refROROUnitsList',
					flex: 1,
					margin: '5 5 5 5',
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					bind: {
						store: '{unitsStackedListStore}'
					},
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					title: '',
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('unitsStackedForRehandleList')
					}
				},{
					xtype: 'container',
					layout: {
						type: 'vbox',
						align: 'center',
						pack: 'center'
					},
					items: [
						{
							xtype: 'button',
							width: 90,
							text: ViewUtil.getLabel('add'),
							margin: '100 0 0 0',
							ui: 'create-button',
							iconCls: 'x-fa fa-plus',
							reference: 'refBtnCreate',
							listeners: {
								click: 'onAssigningUnitsForRehandleAdd'
							}
						},
						{
							xtype: 'button',
							margin: '5 0 0 0',
							width: 90,
							text: ViewUtil.getLabel('remove'),
							ui: 'delete-button',
							iconCls: 'x-fa fa-minus',
							reference: 'refBtnRemove',
							listeners: {
								click: 'onAssigningUnitsForRehandleRemove'
							}
						}
					]
				},
				{
					xtype: 'tsb-datagrid',
					reference: me.MAIN_GRID_REF_NAME,
					flex: 1,
					margin: '5 5 5 5',
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					bind: {
						store: '{' + me.MAIN_STORE_NAME + '}'
					},
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					title: '',
					columns: {
						defaults: {
							style: 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('AssigningUnitsListForRehandle')
					}
				}],

			dockedItems: [{
				xtype: 'toolbar',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right'
				},
				items: [{
					xtype: 'fieldset',
					flex: 1,
					layout: {
						type: 'hbox',
						align: 'stretch'
					},
					defaults: {
						labelWidth: 90,
						labelAlign: 'right',
						margin: '5 0 0 0'
					},
					items: [
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								margin: '4 0 0 0',
							},
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
				   					reference: 'ctlRehandleOpModeRehandleMode',
				   					xtype: 'combo',
				   					fieldLabel: ViewUtil.getLabel('rehandleRehandleMode'),
				   					queryMode: 'local',
				   					bind: {
				    	    			store: '{rehandleModeCombo}',
				    	    			value: '{theRRDetail.rhdlMode}'
				    	    		},
				   					displayField: 'scdNm',
				   					valueField: 'scd',
				   					forceSelection: true,
				   					emptyText:'Selected',
				   					editable: false,
		        					listeners: {
		        						change: 'onChangeRehandleModeForRORO'
		        					}
				   				},
				   				{
				                	xtype:'vesselcalllistfield',
				                	reference:'ctlRehandleROROOpModeNextJpvc',
				                	margin: '5 5 0 5',
					                labelWidth: 95,
									with: 250,
				                    fieldLabel: ViewUtil.getLabel('rehandleNextVessel'),
				                    //editableControl: false,
				                    bind:{
				                    	value : '{theRRDetail.nxVslCallId}'
				                    },
									allowSetVessel: false,
				                }
							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								margin: '4 0 0 0',
								labelWidth: 90
							},
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
				                    xtype: 'combo',
				                    reference:'ctlRehandleOpModeSnNoCombo',
				                    fieldLabel: ViewUtil.getLabel('rehandleNextSn'),
				   					queryMode: 'local',
				   					bind: {
				    	    			store: '{rehandleOpModeNextSnNoCombo}',
				    	    			value: '{theRRDetail.nxRefNo}'
				    	    		},
				    	    		emptyText:'Select',
				   					displayField: 'shipgNoteNo',
				   					valueField: 'shipgNoteNo',
				   					forceSelection:true,
		        					listeners: {
		        						change: 'onOpModeNextSnChangeForRORO'
		        					}
				                },
                                {
                                    xtype: 'numberfield',
                                    readOnly: true,
                                    fieldLabel: ViewUtil.getLabel('docQty'),
                                    bind:'{theRRDetail.pkgQty}'
                                }
							]
						},
						{
							xtype: 'container',
							defaults: {
								labelAlign: 'right',
								margin: '4 0 0 0',
								labelWidth: 90
							},
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'container',
									flex: 2
								},
								{
				                    xtype: 'textfield',
				                    reference:'ctlTxtAssignedQTy',
				                    fieldLabel: ViewUtil.getLabel('assigedQty'),
				   					queryMode: 'local',
//				   					bind: {
//				    	    			value: '{theRRDetail.rhdlPkgQty}'
//				    	    		},
									editable: false
				                },
							]
						},
						{
							xtype: 'container',
							hidden:true,
							defaults: {
								labelAlign: 'right',
								labelWidth: 90,
								margin: '4 0 0 0',
							},
							flex: 1,
							layout: {
								type: 'vbox',
								align: 'stretch'
							},
							items: [
								{
									xtype: 'textfield',
									reference: 'refDriverNm',
									fieldStyle: 'text-transform:uppercase',
									fieldLabel: ViewUtil.getLabel('driverNm')
								},
								{
									xtype: 'textfield',
									reference: 'refTruckNo',
									fieldStyle: 'text-transform:uppercase',
									fieldLabel: ViewUtil.getLabel('truckNo')
								}
							]
						},
						{
							xtype: 'container',
							layout: {
								type: 'vbox',
								align: 'center',
								pack: 'center'
							},
							margin: '5 0 0 10',
							items: [
								{
									xtype: 'button',
									width: 90,
									text: ViewUtil.getLabel('search'),
									cls: 'search-button',
									reference: 'CtlBtnSearch',
									listeners: {
										click: 'onAssigningSearch'
									}
								},
								{
									xtype: 'button',
									margin: '5 0 0 0',
									width: 90,
									text: ViewUtil.getLabel('ok'),
									reference: 'ctlBtnOk',
									listeners: {
										click: 'onClickOk'
									}
								}
							]
						},
					]
				}]
			},
			{
                xtype:'toolbar',
                dock : 'bottom',
                items : [{
						xtype: 'container',
						layout: {
							type: 'vbox',
							align:'center'
						},
						flex:1,
						items: [{
							xtype:'container',
							layout: {
								type: 'hbox',
								align:'center'
						    },
						    items:[
								{
									xtype:'button',
									margin:'0 5 5 0',
									text: ViewUtil.getLabel('confirm'),
									reference:'btnOk',
									iconCls: 'fa fa-floppy-o',
									cls: 'search-button',                 	
									listeners:{
										click: 'onSave'
									}
								},{
									xtype:'button',
									text: ViewUtil.getLabel('cancel'),
									reference:'btnCancel',
									iconCls: 'fa fa-window-close',
									ui: 'delete-button',                 	
									listeners:{
										click: 'onCancel'
									}
								}
						    ]
						}
                    ]
					}
               	]
		    }]
		});

		me.callParent();

	}
});

