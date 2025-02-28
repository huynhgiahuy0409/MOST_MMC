Ext.define('MOST.view.document.terminalholdreleasecontrol.TerminalHoldReleaseControlHistory', {
	extend: 'Ext.form.Panel',
	alias: 'widget.app-terminalholdreleasecontrolhistory',
	
	width: 900,
	height: 450,
	
	listeners:{
		afterrender: 'onDetailLoad'
	},
	 /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	HISTORY_GRID_REF_NAME: 'refTerminalHoldReleaseControlHistoryGrid',  // History Grid Name 
	HISTORY_STORE_NAME: 'terminalHoldReleaseControlHistory',			// History Store Name
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
			layout : {
				type: 'vbox',
				align: 'stretch'
			},
			items: [
                {//Grid
					xtype: 'tsb-datagrid',
					reference: me.HISTORY_GRID_REF_NAME,
					flex: 1,
					stateful : true,
					stateId : 'stateTerminalHoldReleaseControlHistoryGrid',
					plugins: [
						'gridexporter',
						'gridfilters',
						'clipboard'
					],
					bind: {
						store: '{' + me.HISTORY_STORE_NAME + '}'
					},
					selModel: {
						type: 'spreadsheet',
						cellSelect: false
					},
					listeners : {
						pagingSearch:'onSearch'
					},
					columns: {
						defaults: {
							style : 'text-align:center',
							align: 'center'
						},
						items: GridUtil.getGridColumns('TerminalHoldReleaseControlHistory')
					}
                }
            ],
		});
		me.callParent();
	}
});