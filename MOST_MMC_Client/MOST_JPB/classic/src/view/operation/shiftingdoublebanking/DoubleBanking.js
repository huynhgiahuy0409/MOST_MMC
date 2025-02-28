Ext.define('MOST.view.operation.shiftingdoublebanking.DoubleBanking', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-doublebanking',

    requires: [
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
    ],
	
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refDoubleBankingGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'doubleBankingList',
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
				xtype: 'container',
				layout:{
					type: 'hbox',
					align: 'stretch'
				},
				defaults:{
					margin: '0 5 0 0'
				},
				items:[
					{
						xtype: 'fieldset',
						title: 'Banking Type',
						layout: {
							type: 'vbox'
						},
						flex: 1,
						padding: '0 10 10 10',
						margin: '0 5 0 5',
						defaults: {
							labelAlign: 'right',
							labelWidth: 80, 
							width: '100%'
						}, 
						items: [
							{
								xtype: 'combo',
								bind: {
									store: '{bankingTypeCombo}',
									value: '{theDoubleBanking.dblBnkDivCd}'
								},
								queryMode: 'local',
								displayField: 'scdNm',
								valueField: 'scd',
								forceSelection: true,
								allowBlank: false,
								editable: false,
								value: '',
								reference: 'refCboBankingType',
								listeners: {
									select: 'onSelectBankingType'
								}
							}
						]
					},
					{
						xtype: 'fieldset',
						title: '2nd Vessel',
						reference: 'ref2ndVslFldset',
						layout: {
							type: 'vbox'
						},
						flex: 1,
						padding: '0 10 10 10',
						defaults: {
							margin: '5 0 0 0',
							labelAlign: 'right',
							labelWidth: 50,
							width: '100%'
						},
						bind: {
							disabled: '{theDoubleBanking.dblBnkDivCd === null || theDoubleBanking.dblBnkDivCd === ""}'

						},
						items: [{
							xtype: 'vesselcalllistfield',
							reference: 'ctl2ndJpvc',
						}, {
							xtype: 'numberfield',
							reference: 'ctl2ndLoa',
							fieldLabel: ViewUtil.getLabel('doubleBankingLOA'),
							minValue: 0,
							maxValue: 9999,
							bind: '{theDoubleBanking.ship1Loa}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATB'),
							reference: 'ctl2ndAtb',
							editable: true,
							bind: '{theDoubleBanking.ship1AtbDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATW'),
							reference: 'ctl2ndAtw',
							editable: true,
							bind: '{theDoubleBanking.ship1AtwDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATC'),
							reference: 'ctl2ndAtc',
							editable: true,
							bind: '{theDoubleBanking.ship1AtcDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATU'),
							reference: 'ctl2ndAtu',
							editable: true,
							bind: '{theDoubleBanking.ship1AtuDt}'
						}
						]
					},
					{
						xtype: 'fieldset',
						reference: 'ref3rdVslFldset',
						title: '3rd Vessel',
						layout: {
							type: 'vbox'
						},
						flex: 1,
						padding: '0 10 10 10',
						defaults: {
							margin: '5 0 0 0',
							labelAlign: 'right',
							labelWidth: 50,
							width: '100%'
						},
						bind: {
							disabled: '{theDoubleBanking.dblBnkDivCd === null || theDoubleBanking.dblBnkDivCd === ""}'
						},
						items: [{
							xtype: 'vesselcalllistfield',
							reference: 'ctl3ndJpvc',
						}, {
							xtype: 'numberfield',
							fieldLabel: ViewUtil.getLabel('doubleBankingLOA'),
							minValue: 0,
							maxValue: 9999,
							reference: 'ctl3ndLoa',
							bind: '{theDoubleBanking.ship2Loa}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATB'),
							reference: 'ctl3ndAtb',
							bind: '{theDoubleBanking.ship2AtbDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATW'),
							reference: 'ctl3ndAtw',
							bind: '{theDoubleBanking.ship2AtwDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATC'),
							reference: 'ctl3ndAtc',
							bind: '{theDoubleBanking.ship2AtcDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATU'),
							reference: 'ctl3ndAtu',
							bind: '{theDoubleBanking.ship2AtuDt}'
						}
						]
					},
					//4th Vessel
					{
						xtype: 'fieldset',
						flex: 1,
						reference: 'ref4thVslFldset',
						title: '4th Vessel',
						layout: {
							type: 'vbox'
						},
						defaults: {
							margin: '5 0 0 0',
							labelAlign: 'right',
							labelWidth: 50,
						},
						bind: {
							disabled: '{theDoubleBanking.dblBnkDivCd === null || theDoubleBanking.dblBnkDivCd === ""}'

						},
						hidden: true,
						items: [{
							xtype: 'vesselcalllistfield',
							reference: 'ctl4thVslCallId',
						}, {
							xtype: 'numberfield',
							fieldLabel: ViewUtil.getLabel('doubleBankingLOA'),
							minValue: 0,
							maxValue: 9999,
							reference: 'ctl4thLoa',
							bind: '{theDoubleBanking.ship3Loa}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATB'),
							reference: 'ctl4thAtb',
							editable: false,
							bind: '{theDoubleBanking.ship3AtbDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATW'),
							reference: 'ctl4thAtw',
							editable: false,
							bind: '{theDoubleBanking.ship3AtwDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATC'),
							reference: 'ctl4thAtc',
							editable: false,
							bind: '{theDoubleBanking.ship3AtcDt}'
						}, {
							xtype: 'datetimefield',
							format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
							fieldLabel: ViewUtil.getLabel('doubleBankingATU'),
							reference: 'ctl4thAtu',
							editable: false,
							bind: '{theDoubleBanking.ship3AtuDt}'
						}
						]
					}
				]
			},{
            	xtype:'tsb-datagrid',
            	flex : 1,
            	margin : '5 0 5 0',
				stateful : true,
				stateId : 'stateShiftingDoubleBankingDBGrid',
				reference: me.MAIN_GRID_REF_NAME,
				usePagingToolbar : false,
				plugins: [
					'gridexporter',
					'gridfilters',
					'clipboard'
	    		],
	    		bind: {
	    			store: '{doubleBankingList}'
	    		},
				listeners: {
					cellClick: 'onDobuleBankingGridClick'
				},
	    		selModel: {
					type: 'spreadsheet',
					cellSelect: false
				},
				scrollable:true,
		        columns:{
		        	items: GridUtil.getGridColumns('DoubleBanking'),
		        }
            }]
		});
		
		me.callParent();
	}
});