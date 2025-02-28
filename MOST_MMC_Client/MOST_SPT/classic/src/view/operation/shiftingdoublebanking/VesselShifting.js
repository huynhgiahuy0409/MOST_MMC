Ext.define('MOST.view.operation.shiftingdoublebanking.VesselShifting', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-vslshifting',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel'
    ],
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refVesselShiftingGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vslShftList',
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
			xtype:'container',
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items:[{
				xtype: 'container',
				layout:{
					type :'hbox',
					align: 'stretch'
				},
				items:[
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'vbox'
						},
						items: [
							{
								xtype: 'container',
								width: '100%',
								layout: {
									type: 'hbox',
									align: 'stretch'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									margin: '5 5 0 0', 
									flex: 1
								},
								items: [
									{
										xtype: 'textfield',
										fieldLabel: ViewUtil.getLabel('vslShiftingCurrLoc'),
										readOnly: true,
										reference: 'txtCurrLoc',
										bind: '{theVesselShifting.currWharf}'
									}
								]
							}, {
								xtype: 'container',
								width: '100%',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'textfield',
										fieldLabel: ViewUtil.getLabel('vslShiftingCurrLocMark'),
										readOnly: true,
										reference: 'txtCurrWharfMakrFm',
										flex: 1,
										bind: '{theVesselShifting.currWharfMakrFm}'
									}, {
										xtype: 'textfield',
										readOnly: true,
										reference: 'txtCurrWharfMakrTo',
										flex: 0.6,
										margin: '5 5 0 5',
										bind: '{theVesselShifting.currWharfMakrTo}'
									}
								]
							}, {
								xtype: 'container',
								width: '100%',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									flex: 1,
									margin: '5 5 0 0'
								},
								items: [
									{
										xtype: 'datetimefield',
										fieldLabel: ViewUtil.getLabel('vslShiftingCurrATB'),
										readOnly: true,
										reference: 'refPrevAtb',
										format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
										bind: '{theVesselShifting.prevAtbDate}'
									},
								]
							}, {
								xtype: 'container',
								width: '100%',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									flex: 1,
									margin: '5 5 0 0'
								},
								items: [{
									xtype: 'datetimefield',
									fieldLabel: ViewUtil.getLabel('vslShiftingNewATU'),
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'refNewAtu',
									bind: '{theVesselShifting.atuDate}'
								},
								]
							}, {
								xtype: 'container',
								width: '100%',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									flex: 1,
									margin: '5 5 0 0'
								},
								items: [{
									xtype: 'datetimefield',
									fieldLabel: ViewUtil.getLabel('vslShiftingNewATB'),
									bind: '{theVesselShifting.atbDate}',
									format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
									reference: 'refNewAtb'
								},
								]
							}, {
								xtype: 'container',
								width: '100%',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									flex: 1,
									margin: '5 5 0 0'
								},
								items: [{
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('vslShiftingNewLoc'),
									bind: {
										store: '{berths}',
										value: '{theVesselShifting.nxBerthNo}'
									},
									queryMode: 'local',
									displayField: 'berthCd',
									valueField: 'berthCd',
									forceSelection: true,
									reference: 'refNewBerthNo'
								},
								]
							}
						]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'vbox',
							align: 'stretch',
							package: 'end'
						},
						items: [
							{
								xtype: 'datetimefield',
								margin: '67 0 0 0',
								fieldLabel: ViewUtil.getLabel('vslShiftingCurrATU'),
								labelAlign: 'right',
								readOnly: true,
								reference: 'refPrevAtu',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								bind: '{theVesselShifting.prevAtuDate}'
							},
							{
								xtype: 'textfield',
								fieldLabel: 'Requester',
								reference: 'txtRequester',
								labelAlign: 'right',
								margin: '5 0 0 0',
								bind: '{theVesselShifting.reqr}',
								triggers: {
									someField: {
										cls: 'fa-search',
										scope: 'controller',
										handler: 'onRequesterTriggerClick'
									}
								}
							},
							{
								header: ViewUtil.getLabel('vslShiftingATW'),
								fieldLabel: ViewUtil.getLabel('vslShiftingATW'),
								labelAlign: 'right',
								margin: '5 0 0 0',
								reference: 'refNewAtw',
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								bind: '{theVesselShifting.atwDate}',
								xtype: 'datetimefield',
								readOnly: true,
								align: 'center'
							},
							{
								header: ViewUtil.getLabel('vslShiftingATC'),
								fieldLabel: ViewUtil.getLabel('vslShiftingATC'),
								labelAlign: 'right',
								margin: '5 0 0 0',
								readOnly: true,
								format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
								xtype: 'datetimefield',
								reference: 'refNewAtc',
								align: 'center',
								bind: '{theVesselShifting.atcDate}'
							}
						]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'vbox'
						},
						defaults: {
							width: '100%'
						},
						items: [
							{
								xtype: 'container',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									margin: '5 0 0 0'
								},
								items: [{
									xtype: 'textfield',
									fieldLabel: ViewUtil.getLabel('vslShiftingNewLocMark'),
									reference: 'txtWharfMarkFm',
									flex: 1,
									maskRe: /[0-9.]/,
									bind: '{theVesselShifting.wharfMarkFm}',
									listeners: {
										focusleave: 'onWharfMarkToCalculation'
									}
								}, {
									xtype: 'textfield',
									reference: 'txtWharfMarkTo',
									flex: 0.6,
									margin: '5 0 0 5',
									maskRe: /[0-9.]/,
									bind: '{theVesselShifting.wharfMarkTo}'
								}
								]
							}, {
								xtype: 'container',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									margin: '5 0 0 0',
									flex: 1
								},
								items: [
									{
										xtype: 'combo',
										fieldLabel: ViewUtil.getLabel('vslShiftingShiftingPosition'),
										bind: {
											store: '{shiftPositionListCombo}',
											value: '{theVesselShifting.berthAlongside}'
										},
										queryMode: 'local',
										displayField: 'scdNm',
										valueField: 'scd',
										forceSelection: true,
										reference: 'refCobShftPosition',
									}
								]
							}, {
								xtype: 'container',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									flex: 1,
									margin: '5 0 0 0'
								},
								items: [
									{
										xtype: 'combo',
										fieldLabel: ViewUtil.getLabel('vslShiftingReason'),
										bind: {
											store: '{reasonListCombo}',
											value: '{theVesselShifting.rsnCd}'
										},
										queryMode: 'local',
										displayField: 'scdNm',
										valueField: 'scd',
										forceSelection: true,
										reference: 'refCobReason',
									}
								]
							}, {
								xtype: 'container',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									margin: '5 0 0 0'
								},
								items: [{
									xtype: 'combo',
									fieldLabel: ViewUtil.getLabel('vslShiftingPilot'),
									bind: {
										store: '{pilotYnCombo}',
										value: '{theVesselShifting.pilotYn}'
									},
									queryMode: 'local',
									displayField: 'scdNm',
									valueField: 'scd',
									forceSelection: true,
									reference: 'refCboPilotYn',
									width: '100%',
									hidden: true
								}
								]
							}, {
								xtype: 'container',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									margin: '5 0 0 0',
									width: '100%',
								},
								items: [{
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('vslShiftingMooring'),
									reference: 'txtMooring',
									fieldStyle: 'text-align:right',
									bind: '{theVesselShifting.mooring}',
									minValue: 0,
									listeners: {
										focusleave: function (field) {
											if (field.getValue() < 0) {
												field.setValue(0);
											}
										}
									},
									hidden: true
								}, {
									xtype: 'numberfield',
									fieldLabel: ViewUtil.getLabel('vslShiftingTug'),
									reference: 'txtTug',
									labelWidth: 60,
									width: '100%',
									fieldStyle: 'text-align:right',
									bind: '{theVesselShifting.tug}',
									minValue: 0,
									listeners: {
										focusleave: function (field) {
											if (field.getValue() < 0) {
												field.setValue(0);
											}
										}
									},
									hidden: true
								}
								]
							}, {
								xtype: 'container',
								layout: {
									type: 'hbox'
								},
								defaults: {
									labelWidth: 100,
									labelAlign: 'right',
									margin: '5 0 0 0',
									width: '100%',
								},
								items: [
									{
										xtype: 'textfield',
										fieldLabel: ViewUtil.getLabel('vslShiftingRemark'),
										reference: 'txtRemark',
										fieldStyle: 'text-align:left',
										bind: '{theVesselShifting.rmk}'
									}
								]
							}
						]
					},
					{
						xtype: 'container',
						flex: 1
					}, 
				]
			},{
            	xtype:'tsb-datagrid',
            	margin:'5 0 5 0',
            	flex : 1,
				stateful : true,
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
				stateId : 'stateShiftingDoubleBankingVSGrid',
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{' + me.MAIN_STORE_NAME + '}'
	    		},
				listeners: {
					cellclick: 'onVslShftGridClick'
				},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				scrollable:true,
		        columns:{
		        	items: GridUtil.getGridColumns('VesselShifting'),
		        }
            }]
		});
		
		me.callParent();
	}
});