Ext.define('MOST.view.billing.WHRentalStatus', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-whrentalstatus',
	requires: [
		'MOST.view.billing.WHRentalStatusController',
		'MOST.view.billing.WHRentalStatusModel',
		'Ext.grid.plugin.RowEditing',
	    'Ext.grid.plugin.Exporter',
	    'Ext.grid.plugin.Clipboard',
		'Ext.grid.filters.Filters',
		'Ext.grid.selection.SpreadsheetModel',
		'MOST.view.planning.berth.BerthApprovalModel',
		'MOST.view.planning.berth.BerthApprovalController'
	],

	controller: 'whrentalstatus',
	
	viewModel: {
		type: 'whrentalstatus'
	},
	
	listeners:{
		afterrender: 'onLoad'
	},

    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refWHRentalStatusGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'whRentalStatus',        // Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */

    layout : {type  : 'vbox', align : 'stretch'},

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
			layout: {
				type: 'vbox', 
				align: 'stretch' 
			},
            items: [{
				xtype: 'tsb-datagrid', 
				reference: me.MAIN_GRID_REF_NAME,
				flex : 1,
				plugins: [
					'gridexporter',
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
					pagingSearch: 'onSearch'
				},
				columns: {
	            	defaults: {
	            		style : 'text-align:center',
	            		align : 'center'
					},
					items: GridUtil.getGridColumns('WHRentalStatus')
				}
		    }],
			dockedItems: [{
                xtype: 'container',
                style: { "background-color":"white" },
                layout: {
                	type: 'hbox',
                },
                defaults: {
                    margin: '1 1 1 1'
                },
                items: [{
					xtype: 'tbfill'
				},
				{
					xtype: 'button',
					reference:'refBtnRetrieve',
					text: ViewUtil.getLabel('search'),
					iconCls: 'x-fa fa-search', 
					cls: 'search-button', 
					listeners: {
						click: 'onSearch'
					}
				},]
		    },
		    {
				xtype: 'toolbar',
				enableOverflow: true,
				padding : '0 0 0 0',
				margin: '0 0 0 0',
				defaults: {
					labelAlign: 'right',
				},
       			items: [{
       				xtype:'searchfieldset',
       				title: ViewUtil.getLabel('search'),
					autoScroll: true,
					collapsible:true,
					margin: '5 5 5 5',
					flex: 1,
       				layout:{
       					type:'vbox',
       					align:'stretch'
       				},
       				defaults:{
						margin: '0 0 5 0'
					},
       				items:[
		            {
						xtype: 'container',
						layout: {
							type: 'hbox',
							align: 'stretch'
						}, 
						defaults: {
							labelAlign: 'right',
							margin: '0 5 0 0',
							editable: false
						},
						items: [
						
						{
							xtype:'partnercdtypefield',
							reference:'ctlPayer',
							fieldLabel:ViewUtil.getLabel('payerCd'),
							emptyText:ViewUtil.getLabel('payerCd'),
							change: function(field, newValue){
								   field.setValue(newValue.toUpperCase());
							},
							bind : {
								value : '{theSearch.payer}'
							},
							labelWidth: 70,
							width: 250,
							editable: false
						},
						{
							xtype: 'combobox',
							reference: 'ctlWhCombo',
							labelWidth:70,
							width:250,
							fieldLabel: ViewUtil.getLabel('Wh'),
							queryMode: 'local',
							bind: {
								store: '{whCombo}',
								value: '{theSearch.whCd}'
							},
							displayField: 'scdNm',
							valueField: 'scd',
							value : '',
							editable: true,
							allowBlank: true,
							forceSelection:true
						},
						{
							xtype: 'datefield',
							reference: 'ctlFromDt',
							labelWidth:70,
							width:220,
							fieldLabel: ViewUtil.getLabel('duration'),
							format: MOST.config.Locale.getShortDate(),
						},
						{
							xtype: 'datefield',
							reference: 'ctlToDt',
							width:150,
							format: MOST.config.Locale.getShortDate(),
						}]
					},
					{
						xtype: 'container',
						flex: 1,
						layout: {
							type: 'hbox'
						}, 
						defaults: {
							labelAlign: 'right',
							margin: '0 5 0 0',
						},
						items: [
						{
							xtype: 'textfield',
							reference: 'ctlRentalNo',
							labelWidth:70,
							width:250,
							fieldLabel: ViewUtil.getLabel('rentalNo'),
							bind: {
								value: '{theSearch.conttNo}'
							},
						},
						{
							xtype:'textfield',
							reference: 'ctlRefNo',
							width:250,
							labelWidth:70,
							fieldLabel:ViewUtil.getLabel('refNo'),
							editable: true,
							bind: {
								value: '{theSearch.refNo}'
							},
						},
						{
							xtype: 'combobox',
							reference: 'ctlStatus',
							labelWidth:70,
							width:250,
							fieldLabel: ViewUtil.getLabel('ssrStatCd'),
							queryMode: 'local',
							bind: {
								store: '{statusCombo}',
								value: '{theSearch.statCd}'
							},
							value : '',
							displayField: 'name',
							valueField: 'code'
						},]
					}]
       			}],
			}]
		    
        });
		me.callParent();
    }
});