Ext.define('MOST.model.planning.berth.CalculationItems', {
	extend: 'MOST.model.foundation.dataitem.DataItem',
	fields: [{
		name: 'pdrate',
		type: 'float'
	}, {
		name: 'loa',
		type: 'float'
	}, {
		name: 'pdtotal',
		calculate: function (data) {
			return data.loa * data.pdrate;
		}
	}, {
		name: 'dkrate',
		type: 'float'
	}, {
		name: 'dkhours',
		type: 'float'
	}, {
		name: 'dktotal',
		calculate: function (data) {
			return data.loa * data.dkrate * data.dkhours;
		}
	}, {
		name: 'sdrate',
		type: 'float'
	}, {
		name: 'sdton',
		type: 'float'
	}, {
		name: 'sdtotal',
		calculate: function (data) {
			return data.sdrate * data.sdton;
		}
	}, {
		name: 'ptdrate',
		type: 'float'
	}, {
		name: 'ptdtotal',
		calculate: function (data) {
			return data.ptdrate * data.loa * 2;
		}
	}, {
		name: 'tsrate',
		type: 'float'
	}, {
		name: 'tshours',
		type: 'float'
	}, {
		name: 'tstugqty',
		type: 'float'
	}, {
		name: 'tstotal',
		calculate: function (data) {
			return data.tsrate * data.loa * data.tshours * data.tstugqty * 2;
		}
	}, {
		name: 'pfrate',
		type: 'float'
	}, {
		name: 'pfhours',
		type: 'float'
	}, {
		name: 'pftotal',
		calculate: function (data) {
			return data.pfrate * data.pfhours * 2;
		}
	}, {
		name: 'moorrate',
		type: 'float'
	}, {
		name: 'moortotal',
		calculate: function (data) {
			return data.moorrate * data.loa * 2;
		}
	}, {
		name: 'amount',
		calculate: function (data) {
			return data.moortotal + data.pftotal + data.tstotal + data.ptdtotal + data.sdtotal + data.dktotal + data.pdtotal;
		}
	}, {
		name: 'tax',
		calculate: function (data) {
			return data.amount / data.pecent;
		}
	}, {
		name: 'pecent',
		type: 'float'
	}, {
		name: 'totalamount',
		calculate: function (data) {
			return data.amount + data.tax;
		}
	}]
});