Ext.define('MOST.view.planning.roster.ShiftDefinitionMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.app-shiftdefinitionmain',
	requires: [
		'MOST.view.planning.roster.ShiftDefinitionList',
		'MOST.view.planning.roster.ShiftDefinitionGroup',
		'Ext.grid.plugin.Exporter',
		'Ext.grid.selection.SpreadsheetModel'
	],
	
	width: 1000,
	height: 700,
//	y:-50,
	
	layout : {type  : 'vbox', align : 'stretch'},
	
	config: {
		recvData : null
	},
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			xtype:'container',
			defaults:{
				margin: '5 5 0 5'
			},
			layout : {
				type: 'vbox',
				align: 'stretch'
			},

			items: [{
				flex: 1,
				xtype: 'app-shiftdefinitionlist',
				reference: 'refSiftDefinitionList'						
			},
            {
				flex: 1,
				xtype: 'app-shiftdefinitiongroup',
				reference: 'refSiftDefinitionGroup'
			}]
		});
		
		me.callParent();
	}
});


