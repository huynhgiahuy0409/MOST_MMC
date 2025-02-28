Ext.define('MOST.model.map.bulk.SalesPivot', {
	extend: 'MOST.model.map.foundation.dataitem.DataItem',

	fields: [{
		name: 'vesselCode',
		type: 'string'
	}, {
		name: 'vesselName',
		type: 'string'
	}, {
		name: 'voyageNo',
		type: 'string'
	}, {
		name: 'departmentCode',
		type: 'string'
	}, {
		name: 'departmentName',
		type: 'string'
	}, {
		name: 'workGroupCode',
		type: 'string'
	}, {
		name: 'workGroupName',
		type: 'string'
	}, {
		name: 'fleetCode',
		type: 'string'
	}, {
		name: 'fleetName',
		type: 'string'
	}, {
		name: 'periodTCT',
		type: 'string'
	}, {
		name: 'cargoCode',
		type: 'string'
	}, {
		name: 'cargoName',
		type: 'string'
	}, {
		name: 'coacvcspot',
		type: 'string'
	}, {
		name: 'affiliateCode',
		type: 'string'
	}, {
		name: 'affiliateName',
		type: 'string'
	}, {
		name: 'month',
		type: 'string'
	}, {
		name: 'actualFreight',
		type: 'number'			
	}, {
		name: 'actualProfitLoss',
		type: 'number'			
	}, {
		name: 'actualQuantity',
		type: 'number'			
	}, {
		name: 'comparedFreight',
		type: 'number'			
	}, {
		name: 'comparedProfitLoss',
		type: 'number'			
	}, {
		name: 'comparedQuantity',
		type: 'number'	
	}, {
		name : 'diffFreight',
		type : 'number',
		calculate : function(data) {
			return data.actualFreight- data.comparedFreight;
		}
	}, {
		name : 'diffProfitLoss',
		type : 'number',
		calculate : function(data) {
			return data.actualProfitLoss - data.comparedProfitLoss;
		}
	}, {
		name : 'diffQuantity',
		type : 'number',
		calculate : function(data) {
			return data.actualQuantity - data.comparedQuantity;
		}
	}, {
		name : 'quarter',
		type : 'number',
		calculate : function(data) {
			var month = data.month.substring(4, 6);
			if(month === '01' || month === '02' || month === '03') {
				return 'Q1';
			} else if(month === '04' || month === '05' || month === '06') {
				return 'Q2';
			} else if(month === '07' || month === '08' || month === '09') {
				return 'Q3';
			} else if(month === '10' || month === '11' || month === '12') {
				return 'Q4';
			} else {
				return '';
			}
		}
	}]
});
