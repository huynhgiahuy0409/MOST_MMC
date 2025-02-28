Ext.define('MOST.model.planning.berth.BittStructure', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	
	fields: [{
		name: 'terminalCd',
		type: 'string'
	}, {
		name: 'berthTp',
		type: 'string'
	}, {
		name: 'berthCd',
		type: 'string'
	}, {
		name: 'bittCd',
		type: 'string'
	}, {
		name: 'xPos',
		type: 'string'
	}, {
		name: 'yPos',
		type: 'string'
	}]
});