Ext.define('MOST.view.monitoring.CargoJob', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-jobmonitoring',
	requires: [
		'MOST.view.monitoring.CargoJobModel',
		'MOST.view.monitoring.CargoJobController',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
	],

	width: 1500,
	height: 500,
	title: 'Cargo Job',
	controller: 'jobmonitoring',
	
	viewModel: {
		type: 'jobmonitoring'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},
	
	MAIN_GRID_REF_NAME: 'refJobMonitoringGrid',
	
	layout : {type  : 'vbox', align : 'stretch'},

	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [{
				xtype:'container',
				layout:{
					type:'hbox'
				},
				margin: '0 5 0 5',
				items:[
					{
						xtype:'container',
						layout:{
							type:'vbox',
							align: 'stretch'
						},
						flex: 1,
						margin : '',
						defaults:{
							labelAlign:'right',
							labelWidth: 80,
							margin : '2 0 0 0',
						},
						items:[
							{
								xtype:'textfield',
            					reference:'ctlJobMonitoringCgNo',
            					fieldLabel: ViewUtil.getLabel('cargoNo'),
            					bind:'{selectedRecord.cgNo}',
            					editable:false,
            					allowBlank: false,
            					flex: 1
							},{
								xtype: 'combo',
								fieldLabel: ViewUtil.getLabel('hatchNo'),
								reference: 'refCboHatchNo',
								bind: {
									store: '{jobMonitoringHatchNoCombo}',
									value: '{selectedRecord.hatchNo}',
								},
								queryMode: 'local',
								editable:false,
						        displayField: 'scdNm',
						        valueField: 'scd',
						        flex: 1
							},{
								xtype:'textfield',
            					fieldLabel: ViewUtil.getLabel('packageNo'),
            					bind:'{selectedRecord.pkgNo}',
            					editable:false,
            					flex: 1
							},{
								xtype:'textfield',
								reference: 'refTxtPkgTp',
								fieldLabel: ViewUtil.getLabel('packageType'),
            					bind:'{selectedRecord.repkgTypeCd}',
            					editable:false,
            					flex: 1
							},
						]
					},{
						xtype:'container',
						layut:{
							type:'vbox',
							align: 'stretch'
						},
						defaults:{
							labelAlign:'right',
							labelWidth: 100,
							width : 250,
							margin : '2 0 0 0',
						},
						items:[
							{
    							xtype : 'numberfield',
								reference: 'refCgGrossWgt',
								fieldLabel: ViewUtil.getLabel('cgGrossWgt'),
    							minValue : 0,
    							maxValue: 999999999999.999,
    							align : 'right',
    							bind:'{selectedRecord.cgGrossWgt}',
    							decimalPrecision: 3,
    							selectOnFocus : true,
    							allowBlank: true
    						},
							{
    							xtype : 'numberfield',
								reference: 'refCgNetWgt',
								fieldLabel: ViewUtil.getLabel('cgNetWgt'),
    							minValue : 0,
    							maxValue: 999999999999.999,
    							align : 'right',
    							bind:'{selectedRecord.wgt}',
    							decimalPrecision: 3,
    							selectOnFocus : true,
    							allowBlank: false
    						},{
    							xtype : 'numberfield',
								reference: 'refBagWgt',
								fieldLabel: ViewUtil.getLabel('bagWgt'),
    							minValue : 0,
    							maxValue: 999999999999.999,
    							align : 'right',
    							bind:'{selectedRecord.bagWgt}',
    							decimalPrecision: 3,
    							selectOnFocus : true,
    							allowBlank: true
    						},{
								xtype : 'numberfield',
								reference: 'refPkgQty',
								fieldLabel: ViewUtil.getLabel('quantity'),
								bind:'{selectedRecord.pkgQty}',
								minValue : 0,
								align : 'right',
								maxValue: 999999999,
								allowBlank: false,
								allowDecimals: false,
	    						allowNegative: false,
								listeners: {
									change: 'onChangeQty'
								}
							}
						]
					},{
						xtype:'container',
						layut:{
							type:'vbox',
							align: 'stretch'
						},
						flex: 1,
						defaults:{
							labelAlign:'right',
							labelWidth: 100,
							margin : '2 10 0 0',
						},
						items:[
							{
    							xtype : 'numberfield',
								reference: 'refCgVol',
								fieldLabel: ViewUtil.getLabel('m3'),
    							minValue : 0,
    							bind:'{selectedRecord.msrmt}',
    							maxValue: 999999999999.999,
    							align : 'right',
    							decimalPrecision: 3,
    							selectOnFocus : true,
    							allowBlank: false
    						},
							{
								xtype: 'combo',
								reference: 'refCboOpeMode',
								fieldLabel: ViewUtil.getLabel('modeofOPR'),
								bind: {
									store: '{jobMonitoringModeOfOprCombo}',
									value: '{selectedRecord.tsptTpCd}'
								},
								queryMode: 'local',
						        displayField: 'scdNm',
						        valueField: 'scd',
						        allowBlank: false
							},{
								xtype: 'combo',
								reference: 'refCboFinal',
								fieldLabel: ViewUtil.getLabel('fnlOpeYn'),
								bind: {
									store: '{jobMonitoringYnCombo}',
									value: '{selectedRecord.fnlOpeYn}'
								},
								queryMode: 'local',
						        displayField: 'scdNm',
						        valueField: 'scd',
						        allowBlank: false
							}
						]
					},{
						xtype:'container',
						layut:{
							type:'vbox',
							align: 'stretch'
						},
						flex: 1,
						defaults:{
							labelAlign:'right',
							labelWidth: 100,
							margin : '2 0 0 0',
						},
						margin : '0 10 0 0',
						items:[
							{
								xtype: 'datetimefield',
								fieldLabel: ViewUtil.getLabel('workStDt'),
								bind:'{selectedRecord.workStDt}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						        allowBlank: false
			                },{
								xtype: 'datetimefield',
								reference: 'refTxtEndDt',
								fieldLabel: ViewUtil.getLabel('workEndDt'),
								bind:'{selectedRecord.workEndDt}',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
						        allowBlank: false
			                }
						]
					}
				]
			},{
				xtype: 'tsb-datagrid',
				reference: 'refJobMonitoringGrid',
				usePagingToolbar : false,
				flex : 1,
				margin : '5 0 0 0',
				stateful : true,
				stateId : 'stateJobMonitoringGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{jobMonitoring}'
	    		},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				listeners: {
					cellClick: 'onJobMonitoringGridClick'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
	            	},
	            	items:GridUtil.getGridColumns('JobMonitoring')
				}
		    }],
		    
		    dockedItems: [{
				xtype: 'container',
				enableOverflow: true,
				defaults: {
					labelAlign: 'right',
					margin : '2 5 2 0'
	        	},
				items: [
					{
						xtype: 'button',
						itemId: 'updateItemId',
						text: 'Update',
						
						ui: 'update-button',
						iconCls: 'x-fa fa-save',
						reference:'refBtnSave2',
						listeners: {
							click: 'onUpdate'
						}
					},
					{
						xtype: 'button',
						itemId: 'deleteItemId',
						reference:'refBtnDelete',
						text: ViewUtil.getLabel('remove'),
						reference:'refBtnDelete2',
						ui: 'delete-button',
						iconCls: 'x-fa fa-minus',
						listeners: {
							click: 'onRemove'
						}
					},
					{
						xtype: 'button',
						itemId: 'exportToExcelButton',
						text: ViewUtil.getLabel('exportToExcel'),
						iconCls: 'excel-button-image', 
						cls: 'excel-button',
						listeners: {
							click: {
								fn: 'onExportExcelPdfWithServer',
								args:[me.MAIN_GRID_REF_NAME, true]
							}
						}
					}
				]
			}]
			
		});
		
		me.callParent();
	}
});

