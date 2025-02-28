Ext.define('MOST.model.map.common.SimulationResult', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{ 
		 name:'fromPort', 
		 type:'string' 
	},{ 
		 name:'toPort', 
		 type:'string' 
	},{ 
		 name:'distance', 
		 type:'string' 
	},{ 
		 name:'startDate', 
		 type:'string' 
	},{ 
		 name:'endDate', 
		 type:'string' 
	},{ 
		 name:'latLon', 
		 type:'auto' 
	},{ 
		 name:'timeZone', 
		 type:'string' 
	},{ 
		 name:'areaCode', 
		 type:'string' 
	},{ 
		 name:'totalDistance', 
		 type:'string' 
	},{ 
		 name:'totalDay', 
		 type:'string' 
	},{ 
		 name:'routes', 
		 type:'string' 
	}]
});
