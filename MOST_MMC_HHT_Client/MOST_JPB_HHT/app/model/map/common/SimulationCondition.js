Ext.define('MOST.model.map.common.SimulationCondition', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{ 
		 name:'portCode', 
		 type:'string' 
	},{ 
		 name:'portName', 
		 type:'string' 
	},{ 
		 name:'distance', 
		 type:'string' 
	},{ 
		name:'weather', 
		type:'string' 
	},{ 
		 name:'speed', 
		 type:'string' 
	},{ 
		 name:'portDays', 
		 type:'string' 
	},{ 
		 name:'arrivalDate', 
		 type:'string' 
	},{ 
		 name:'departureDate', 
		 type:'string' 
	}]
});
