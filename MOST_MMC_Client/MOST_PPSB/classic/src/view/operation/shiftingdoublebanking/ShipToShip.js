Ext.define('MOST.view.operation.shiftingdoublebanking.ShipToShip', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-shiptoship',
    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refStsGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'stsOperationList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			xtype:'container',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[{
					xtype:'container',
					layout:{
						type:'hbox',
						align:'strecth'
					},
					items:[
						{
							xtype:'container',
							flex: 1,
							layout:{
								type:'vbox',
								align:'strecth'
							},
							defaults:{
								labelWidth : 100,
								labelAlign : 'right',
								width : '100%',
								margin : '5 5 0 0'
							},
							items: [
								{
									xtype: 'vesselcalllistfield',
									reference: 'ctlNextJpvc',
									fieldLabel: ViewUtil.getLabel('nextVessel'),
									emptyText: me.lblJpvc,
									bind: {
										value: '{theShipToShip.nextCalCallId}'
									},
								}, {
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('oprmode'),
									bind: {
										store: '{oprModeCombo}',
										value: '{theShipToShip.stsOpTp}'
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									forceSelection: true,
									allowBlank: false,
									editable: false,
									reference: 'refStsOprMode',
									listeners: {
										select: 'onSelectOprMode'
									}
								},
								{
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('blSnNo'),
									reference: 'refBlSnCombo',
									required: true,
									bind: {
										value: '{theShipToShip.blSnNo}',
										store: '{stsBlSnCombo}',
									},
									listeners:{
										change :'onSelectBlSn'
									},
									displayField: 'blSnNo',
									valueField: 'blSnNo',
									queryMode: 'local',
									clearable: true,
									typeAhead: true,
									anyMatch: true,
									disabled: true,
									required: true
								},
								{
									xtype: 'container',
									layout: {
										type: 'hbox'
									},
									margin: '0 0 0 0',
									defaults: {
										labelWidth: 100,
										labelAlign: 'right',
										margin: '5 5 0 0'
									},
									items: [
										{
											xtype: 'combo',
											reference: 'refSTSHatchNo',
											fieldLabel: ViewUtil.getLabel('shipToShipHatch'),
											bind: {
												store: '{hatchListCombo}',
												value: '{theShipToShip.hatchNo}'
											},
											flex: 1,
											queryMode: 'local',
											displayField: 'scdNm',
											valueField: 'scd',
											forceSelection: true,
											allowBlank: false,
											editable: false,
											required: true
										}, {
											xtype: 'combo',
											flex: 0.55,
											bind: {
												store: '{apFpListCombo}',
												value: '{theShipToShip.hatchDrtCd}'
											},
											queryMode: 'local',
											displayField: 'scd',
											valueField: 'scd',
											forceSelection: true,
											allowBlank: false,
											editable: false,
											required: true
										}
									]
								}, {
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('shipToShipCargoType'),
									bind: {
										// store: '{cgTpAllListCombo}',
										value: '{theShipToShip.cgTpCd}'
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									forceSelection: true,
									allowBlank: false,
									reference: 'refStsCargoType',
									editable: false,
									listeners: {
										change: 'onSTSCgTpChange'
									}
								}, {
									xtype: 'textfield',
									reference: 'refSTSCmdty',
									fieldLabel: ViewUtil.getLabel('shipToShipCommodity'),
									bind: {
										// store: '{cmdtCdAllListCombo}',
										value: '{theShipToShip.cmdtCd}'
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									forceSelection: true,
									allowBlank: false,
									editable: false
								}, {
									xtype: 'textfield',
									reference: 'refStsPkgTp',
									fieldLabel: ViewUtil.getLabel('shipToShipPkgType'),
									bind: {
										value: '{theShipToShip.pkgTpCd}'
									},
								}
							]
						},
						{
							xtype:'container',
							flex: 1,
							layout:{
								type:'vbox',
								align:'strecth'
							},
							defaults: {
								width: '100%'
							},
							flex: 1,
							items: [
								{
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										margin: '15 0 0 0'
									},
									items: [
										{
											xtype: 'container',
											width: 80
										},
										{
											xtype: 'label',
											style: {
												'text-align': 'center'
											},
											text: ViewUtil.getLabel('shipToShipMT'),
											flex: 1
										},
										{
											xtype: 'label',
											style: {
												'text-align': 'center'
											},
											width: 50,
											text: ViewUtil.getLabel('shipToShipM3'),
											flex: 1
										},
										{
											xtype: 'label',
											style: {
												'text-align': 'center'
											},
											text: ViewUtil.getLabel('shipToShipQty'),
											flex: 1
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right', 
										margin: '5 5 0 0'
									},
									items: [
										{
											xtype: 'label',
											margin: '10 5 0 0',
											width: 80,
											style: {
												'text-align': 'right'
											},
											text: ViewUtil.getLabel('shipToShipDoc')
										},
										{
											xtype: 'numberfield',
											bind: '{theShipToShip.docMt}',
											decimalPrecision: 3,
											readOnly: true,
											flex: 1,
										},
										{
											xtype: 'numberfield',
											bind: '{theShipToShip.docM3}',
											decimalPrecision: 3,
											readOnly: true,
											flex: 1,
										},
										{
											xtype: 'numberfield',
											bind: '{theShipToShip.docQty}',
											readOnly: true,
											flex: 1,
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right',
										
										margin: '5 5 0 0'
									},
									items: [
										{
											xtype: 'label',
											margin: '10 5 0 0',
											width: 80,
											style: {
												'text-align': 'right'
											},
											text: ViewUtil.getLabel('shipToShipActual')
										},
										{
											xtype: 'numberfield',
											reference: 'refsSTSMt',
											bind: '{theShipToShip.mt}',
											minValue: 0,
											decimalPrecision: 3,
											flex: 1,
											//readOnly:true
										},
										{
											xtype: 'numberfield',
											reference: 'refsSTSM3',
											bind: '{theShipToShip.m3}',
											minValue: 0,
											decimalPrecision: 3,
											flex: 1,
											//readOnly:true
										},
										{
											xtype: 'numberfield',
											reference: 'refsSTSQty',
											bind: '{theShipToShip.qty}',
											minValue: 0,
											flex: 1,
											//readOnly:true
										}
									]
								}, {
									xtype: 'container',
									layout: {
										type: 'hbox',
										align: 'stretch'
									},
									defaults: {
										labelAlign: 'right', 
										margin: '5 5 0 0'
									},
									items: [
										{
											xtype: 'label',
											margin: '10 5 0 0',
											width: 80,
											style: {
												'text-align': 'right'
											},
											text: ViewUtil.getLabel('shipToShipBalance')
										},
										{
											xtype: 'numberfield',
											bind: '{theShipToShip.balMt}',
											decimalPrecision: 3,
											readOnly: true,
											flex: 1,
										},
										{
											xtype: 'numberfield',
											bind: '{theShipToShip.balM3}',
											decimalPrecision: 3,
											readOnly: true,
											flex: 1,
										},
										{
											xtype: 'numberfield',
											bind: '{theShipToShip.balQty}',
											readOnly: true,
											flex: 1,
										}
									]
								}, {
									xtype: 'datetimefield',
									reference: 'refSTSStDtm',
									fieldLabel: ViewUtil.getLabel('shipToShipStartTime'),
									margin: '5 5 0 0',
									labelWidth: 80,
									bind: '{theShipToShip.stDate}',
									labelAlign: 'right',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									allowBlank: false
								}, {
									xtype: 'datetimefield',
									reference: 'refSTSEndDtm',
									margin: '5 5 0 0',
									fieldLabel: ViewUtil.getLabel('shipToShipEndTime'),
									labelWidth: 80,
									bind: '{theShipToShip.endDate}',
									labelAlign: 'right',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									allowBlank: false
								}
							]
						},
						{
							xtype: 'container',
							flex: 2
						}
					]
				},{
                	xtype:'tsb-datagrid',
                	flex : 1,
                	margin : '5 0 5 0',
    				stateful : true,
    				stateId : 'stateShiftingDoubleBankingSSGrid',
    				reference: me.MAIN_GRID_REF_NAME,
    				usePagingToolbar : false,
    				plugins: [
    					'gridexporter',
    					'gridfilters',
    					'clipboard'
    	    		],
    	    		bind: {
    	    			store: '{' + me.MAIN_STORE_NAME + '}'
    	    		},
    				listeners: {
    					cellclick: 'onStsGridClick'
    				},
    	    		selModel: {
    					type: 'spreadsheet',
    					cellSelect: false
    				},
    				scrollable:true,
    		        columns:{
    		        	items: GridUtil.getGridColumns('ShipToShip'),
    		        }
                }]
		});
		
		me.callParent();
	}
});