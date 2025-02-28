Ext.define('MOST.view.dashboard.CargoFlowDashboardController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],

	alias: 'controller.cargoflowdashboard',	
	
	/**
	 * =========================================================================================================================
	 * VARIABLE/CONSTANT START
	 */
	hatchQty: 0,
	DEFAULT_HATCH_NO : 10,	// Hatch Setting
	REFRESH_INTERVAL : 5*1000*60,	// Interval
	
	UNIT_COMBO_STORE: 'unitCombo',
	/**
	 * VARIABLE/CONSTANT END
	 * =========================================================================================================================
	 */	
	onLoad:function(){
		var me = this;
		var refs = me.getReferences();
		
		var searchParm = Ext.create('MOST.model.dashboard.SearchCargoFlowDashboardParm');
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		
		me.refreshOnEveryFiveMinutes();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.QUANTITY_COMBOBOX, me.UNIT_COMBO_STORE);
	},
	
	onSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var store = me.getStore('vesselschedule');
		var disCmmdstore = me.getStore('dischargingcommoditylist');
		var loadCmmdstore = me.getStore('loadingcommoditylist');
		
		var disVslStore = me.getStore('discharginghatchvessellist');
		var loadVslStore = me.getStore('loadinghatchvessellist');
		
		
		var hatchQty = 0;
		
    	if(params == null){
    		return;
    	}
    	
		Ext.MessageBox.show({
			title : 'Server Processing Messagebox', //Do not change the title
			msg: 'Progressing...',
			width:320,
			height:0,
			wait:true,
			waitConfig: {interval:200, text:''}
		});
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if (records && records.length <= 0) {
						MessageUtil.noMatchData();
					}else{
						hatchQty  = records[0].get("hatchQty");
						params.hatchQty = hatchQty;
						me.hatchQty = hatchQty;
						
				    	disCmmdstore.load({
				    		params: params,
							callback: function(records, operation, success) {
								
								//me.dischargingCmmdLayout(records);
								me.summaryDischargingByVsl(records);
								
								loadCmmdstore.load({
						    		params: params,
									callback: function(records, operation, success) {
										//me.loadingCmmdLayout(records);
										me.summaryLoadingByVsl(records);
										
										disVslStore.load({
								    		params: params,
											callback: function(records, operation, success) {
												//me.dischargingHatchLayout(records);
												me.dischargingHatchLayoutByVsl(records);
												
												loadVslStore.load({
										    		params: params,
													callback: function(records, operation, success) {
														//me.loadingHatchLayout(records);
														me.loadingHatchLayoutByVsl(records);
														
														Ext.MessageBox.hide();
													}
												});
												//Ext.MessageBox.hide();
											}
										});
									}
								});
							}
				    	});
					}
				}
			}
		});
    	
	},
	
	onSelectUnitType:function(){
		var me = this;
		var refs = me.getReferences();
		
		me.onSearch();
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	dischargingCmmdLayout_v1:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refDischargeCmmd.removeAll();
		
		var disName = {
				xtype: 'label',
                margin: '30 0 0 0',
                width: 170,
                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
            	text: 'Discharging'
        };
		
		refs.refDischargeCmmd.add(disName);
		
		for(var i=0;i<records.length;i++){
			var disCmmdField = {
				xtype: 'fieldset',
				reference:'refdisCmmdField'+i,
				style: { "background-color":"white" },
				height: 100,
				margin: '2 0 0 2',
		    	layout: {
		    		type: 'vbox',
		            align: 'stretch'
	    		},
            	items:[{}]};
			
			var disCmmdNm = {
					xtype: 'label',
                    width: 200,
                    reference:'refdisCmmdNm'+i,
                    margin: '0 0 0 0',
                    style: "font-weight:bold;display:inline-block;text-align:center",
                    bind: '{theDisCmmd'+i+'.cmmdNm}'
			};
			
			var disCmmdTotal ={
					xtype: 'label',
					width: 200,
                    reference:'refdisTotalSum'+i,
                    margin: '0 0 0 0',
                    style: "font-weight:bold;display:inline-block;text-align:center",
                    bind: '{theDisCmmd'+i+'.cmmdSumTotal}'
			}
			
			var disCmmdInDirect ={
					xtype: 'label',
					width: 200,
                    reference:'refdisCmmdIndirect'+i,
                    margin: '0 0 0 0',
                    style: "font-weight:bold;display:inline-block;text-align:center",
                    bind: '{theDisCmmd'+i+'.cmmdSumIndirect}'
			}
			
			var disCmmdDirect ={
					xtype: 'label',
                    width: 200,
                    reference:'refdisCmmdDirect'+i,
                    margin: '0 0 0 0',
                    style: "font-weight:bold;display:inline-block;text-align:center;color",
                    bind: '{theDisCmmd'+i+'.cmmdSumDirect}'
			}
			
			refs.refDischargeCmmd.add(disCmmdField);
			
			me.lookupReference("refdisCmmdField"+i).add(disCmmdNm);
			me.lookupReference("refdisCmmdField"+i).add(disCmmdTotal);
			me.lookupReference("refdisCmmdField"+i).add(disCmmdInDirect);
			me.lookupReference("refdisCmmdField"+i).add(disCmmdDirect);
			
			me.getViewModel().setData({["theDisCmmd"+i]:records[i]})
			
		}
		
	},
	
	dischargingCmmdLayout:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refDischargeCmmd.removeAll();
		
		if(records.length > 0) {
			var disName = {
					xtype: 'label',
	                margin: '30 0 0 0',
	                width: 200,
	                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
	            	text: 'Discharging'
	        };
			
			refs.refDischargeCmmd.add(disName);
			
			for(var i=0;i<records.length;i++){
				var item = records[i];
				var disCmmdField = {
						xtype: 'fieldset',
						reference:'refdisCmmdField'+i,
						style: { "background-color":"white" },
						height: 130,
						width: 250,
						margin: '2 0 0 2',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				var disCmmdFieldPercentage = {
						xtype: 'progressbarwidget',
	                    style: "background-color: white; border: 1px solid;",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;color:red">' + item.get('percentageStr') +  '</span>'
	                    ],
	                    value: item.get('percentage'),
	                    width: 220,
	                    height:20
		    		
				};
				
				var disCmmdNm = {
						xtype: 'label',
	                    width: 220,
	                    reference:'refdisCmmdNm'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left;color:red",
	                    bind: '{theDisCmmd'+i+'.cmmdNm}'
				};
				
				var disCmmdTotal ={
						xtype: 'label',
						width: 220,
	                    reference:'refdisTotalSum'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left",
	                    bind: '{theDisCmmd'+i+'.cmmdSumTotal}'
				}
				
				var disCmmdInDirect ={
						xtype: 'label',
						width: 220,
	                    reference:'refdisCmmdIndirect'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left",
	                    bind: '{theDisCmmd'+i+'.cmmdSumIndirect}'
				}
				
				var disCmmdDirect ={
						xtype: 'label',
	                    width: 220,
	                    reference:'refdisCmmdDirect'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left;",
	                    bind: '{theDisCmmd'+i+'.cmmdSumDirect}'
				}
				
				var disCmmdDirectByBarge ={
						xtype: 'label',
	                    width: 220,
	                    reference:'refdisCmmdDirectByBarge'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left;",
	                    bind: '{theDisCmmd'+i+'.cmmdSumDirectByBarge}'
				}
				
				refs.refDischargeCmmd.add(disCmmdField);
				
				me.lookupReference("refdisCmmdField"+i).add(disCmmdNm);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdTotal);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdInDirect);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdDirect);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdDirectByBarge);
				
				me.lookupReference("refdisCmmdField"+i).add(disCmmdFieldPercentage);
				
				me.getViewModel().setData({["theDisCmmd"+i]:records[i]})
				
			}
			
		}
		
	},
	
	summaryDischargingByVsl:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refDischargeCmmd.removeAll();
		
		if(records.length > 0) {
			var disName = {
					xtype: 'label',
	                //margin: '30 0 0 0',
	                width: 200,
	                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
	            	text: ViewUtil.getLabel('discharging')
	        };
			
			refs.refDischargeCmmd.add(disName);
			
			for(var i=0;i<records.length;i++){
				var item = records[i];
				var disCmmdField = {
						xtype: 'fieldset',
						reference:'refdisCmmdField'+i,
						style: { "background-color":"white" },
						width: 350,
						margin: '2 0 0 2',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				

				var disCmmdTotal = {
						xtype: 'progressbarwidget',
						reference:'disCmmdTotal'+i,
						style: "background-color: white; border: 1px solid;color:#eef73b;",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;color:red;font-size:13px">' + item.get('cmmdSumTotal') +  '</span>'
	                    ],
	                    value: item.get('percentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				
				var disCmmdInDirect = {
						xtype: 'progressbarwidget',
						reference:'disCmmdInDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumIndirect') +  '</span>'
	                    ],
	                    value: item.get('whPercentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				var disCmmdDirect = {
						xtype: 'progressbarwidget',
						reference:'disCmmdDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirect') +  '</span>'
	                    ],
	                    value: item.get('truckPercentage'),
	                    width: 320,
	                    margin: '2 0 2 0'
				};
				
				var disCmmdDirectByBarge = {
						xtype: 'progressbarwidget',
						reference:'disCmmdDirectByBarge'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirectByBarge') +  '</span>'
	                    ],
	                    value: item.get('vslPercentage'),
	                    width: 320
				};
				
				refs.refDischargeCmmd.add(disCmmdField);

				me.lookupReference("refdisCmmdField"+i).add(disCmmdTotal);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdInDirect);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdDirect);
				me.lookupReference("refdisCmmdField"+i).add(disCmmdDirectByBarge);
				
				me.getViewModel().setData({["theDisCmmd"+i]:records[i]})
				
				//config CSS--------------------------------------------------------
				//Total
				var totalRefEl = me.lookupReference("disCmmdTotal"+i).getEl();
				totalRefEl.child(".x-progress-bar", true).style.backgroundColor = "#eef73b9c";//4caf509c
				totalRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
//				totalRefEl.child(".x-progress-text", true).style.textAlign = "left";
//				totalRefEl.child(".x-progress-text", true).style.color = "red";
//				totalRefEl.child(".x-progress-text", true).style.fontSize = "13px";
				
				//Direct by Truck
				var truckRefEl = me.lookupReference("disCmmdDirect"+i).getEl();
				truckRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				truckRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Direcct by Vsl
				var vslRefEl = me.lookupReference("disCmmdDirectByBarge"+i).getEl();
				vslRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				vslRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Indirect (WH)
				var whRefEl = me.lookupReference("disCmmdInDirect"+i).getEl();
				whRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				whRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
			}
		}
		
	},
	
	loadingCmmdLayout_v1:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refLoadingCmmd.removeAll();
		
		if(records.length > 0) {
			var loadName = {
					xtype: 'label',
					margin: '30 0 0 0',
					width: 170,
	                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
	            	text: 'Loading'
	        };
			
			refs.refLoadingCmmd.add(loadName);
			
			for(var i=0;i<records.length;i++){
				var loadCmmdField = {
					xtype: 'fieldset',
					reference:'refloadCmmdField'+i,
					style: { "background-color":"white" },
					margin: '2 0 0 2',
					height: 100,
			    	layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
	            	items:[{}]};
				
				var loadCmmdNm = {
						xtype: 'label',
	                    width: 170,
	                    reference:'refloadCmmdNm'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:center",
	                    bind: '{theLoadCmmd'+i+'.cmmdNm}'
				};
				
				var loadCmmdTotal ={
						xtype: 'label',
	                    width: 170,
	                    reference:'refloadTotalSum'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:center",
	                    bind: '{theLoadCmmd'+i+'.cmmdSumTotal}'
				}
				
				var loadCmmdInDirect ={
						xtype: 'label',
	                    width: 170,
	                    reference:'refloadCmmdIndirect'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:center",
	                    bind: '{theLoadCmmd'+i+'.cmmdSumIndirect}'
				}
				
				var loadCmmdDirect ={
						xtype: 'label',
	                    width: 170,
	                    reference:'refloadCmmdDirect'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:center;color",
	                    bind: '{theLoadCmmd'+i+'.cmmdSumDirect}'
				}
				
				refs.refLoadingCmmd.add(loadCmmdField);
				
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdNm);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdTotal);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdInDirect);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdDirect);
				
				me.getViewModel().setData({["theLoadCmmd"+i]:records[i]})
				
			}
		}
		
	},
	
	loadingCmmdLayout:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refLoadingCmmd.removeAll();
		
		if(records.length > 0) {
			var loadName = {
					xtype: 'label',
					//margin: '30 0 0 0',
					width: 200,
	                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
	            	text: 'Loading'
	        };
			
			refs.refLoadingCmmd.add(loadName);
			
			for(var i=0;i<records.length;i++){
				var item = records[i];
				
				var loadCmmdField = {
					xtype: 'fieldset',
					reference:'refloadCmmdField'+i,
					style: { "background-color":"white" },
					margin: '2 0 0 2',
					height: 130,
					width: 250,
			    	layout: {
			    		type: 'vbox',
			            align: 'stretch'
		    		},
	            	items:[{}]};
				
				var loadCmmdFieldPercentage = {
						xtype: 'progressbarwidget',
	                    style: "background-color: white; border: 1px solid;color:green",
	                    textTpl: [
	                    	'<span style="color:red; text-align:left; font-weight:bold;">' + item.get('percentageStr') +  '</span>'
	                    ],
	                    //margin: '0 0 0 0',
	                    value: item.get('percentage'),
	                    width: 220,
	                    height:20
		    		
				};
				
				
				var loadCmmdNm = {
						xtype: 'label',
	                    width: 220,
	                    reference:'refloadCmmdNm'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left;color:red",
	                    bind: '{theLoadCmmd'+i+'.cmmdNm}'
				};
				
				var loadCmmdTotal ={
						xtype: 'label',
	                    width: 220,
	                    reference:'refloadTotalSum'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left",
	                    bind: '{theLoadCmmd'+i+'.cmmdSumTotal}'
				}
				
				var loadCmmdInDirect ={
						xtype: 'label',
	                    width: 220,
	                    reference:'refloadCmmdIndirect'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left",
	                    bind: '{theLoadCmmd'+i+'.cmmdSumIndirect}'
				}
				
				var loadCmmdDirect ={
						xtype: 'label',
	                    width: 220,
	                    reference:'refloadCmmdDirect'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left",
	                    bind: '{theLoadCmmd'+i+'.cmmdSumDirect}'
				}
				
				var loadCmmdDirectByBarge ={
						xtype: 'label',
	                    width: 220,
	                    reference:'refloadCmmdDirectByBarge'+i,
	                    margin: '0 0 0 0',
	                    style: "font-weight:bold;display:inline-block;text-align:left",
	                    bind: '{theLoadCmmd'+i+'.cmmdSumDirectByBarge}'
				}
				
				refs.refLoadingCmmd.add(loadCmmdField);
				
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdNm);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdTotal);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdInDirect);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdDirect);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdDirectByBarge);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdFieldPercentage);
				
				me.getViewModel().setData({["theLoadCmmd"+i]:records[i]})
				
			}
		}
		
	},
	
	summaryLoadingByVsl:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refLoadingCmmd.removeAll();
		
		if(records.length > 0) {
			var loadName = {
					xtype: 'label',
	                //margin: '30 0 0 0',
	                width: 200,
	                style: "font-weight:bold;font-size:15px;display:inline-block;text-align:center;color:BLACK",
	            	text: ViewUtil.getLabel('loading')
	        };
			
			refs.refLoadingCmmd.add(loadName);
			
			for(var i=0;i<records.length;i++){
				var item = records[i];
				var loadCmmdField = {
						xtype: 'fieldset',
						reference:'refloadCmmdField'+i,
						style: { "background-color":"white" },
						width: 350,
						margin: '2 0 0 2',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				

				var loadCmmdTotal = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdTotal'+i,
						style: "background-color: white; border: 1px solid;color:#eef73b;",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;color:red;font-size:13px">' + item.get('cmmdSumTotal') +  '</span>'
	                    ],
	                    value: item.get('percentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				
				var loadCmmdInDirect = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdInDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumIndirect') +  '</span>'
	                    ],
	                    value: item.get('whPercentage'),
	                    margin: '2 0 2 0',
	                    width: 320
				};

				var loadCmmdDirect = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdDirect'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirect') +  '</span>'
	                    ],
	                    value: item.get('truckPercentage'),
	                    width: 320,
	                    margin: '2 0 2 0'
				};
				
				var loadCmmdDirectByBarge = {
						xtype: 'progressbarwidget',
						reference:'loadCmmdDirectByBarge'+i,
	                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
	                    textTpl: [
	                    	'<span style="font-weight:bold;display:inline-block;text-align:left;">' + '<i class="fa fa-check-square-o"></i> ' + item.get('cmmdSumDirectByBarge') +  '</span>'
	                    ],
	                    value: item.get('vslPercentage'),
	                    width: 320
				};
				
				refs.refLoadingCmmd.add(loadCmmdField);

				me.lookupReference("refloadCmmdField"+i).add(loadCmmdTotal);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdInDirect);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdDirect);
				me.lookupReference("refloadCmmdField"+i).add(loadCmmdDirectByBarge);
				
				me.getViewModel().setData({["theLoadCmmd"+i]:records[i]})
				
				//config CSS--------------------------------------------------------
				//Total
				var totalRefEl = me.lookupReference("loadCmmdTotal"+i).getEl();
				totalRefEl.child(".x-progress-bar", true).style.backgroundColor = "#eef73b9c";//4caf509c
				totalRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Direct by Truck
				var truckRefEl = me.lookupReference("loadCmmdDirect"+i).getEl();
				truckRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				truckRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Direcct by Vsl
				var vslRefEl = me.lookupReference("loadCmmdDirectByBarge"+i).getEl();
				vslRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				vslRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
				
				//Indirect (WH)
				var whRefEl = me.lookupReference("loadCmmdInDirect"+i).getEl();
				whRefEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
				whRefEl.child(".x-progress-bar", true).style.backgroundImage = "none";
			}
		}
		
	},
	
	dischargingHatchLayoutByVsl:function(records){
		var me = this;
		var refs = me.getReferences();
			
		refs.refcargoflowdishatchlayout.removeAll();

		var vslItems = null;
		if(records.length > 0){
			vslItems = records[0].get('vslDischargedItems');
		}
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refDisHatchCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchNo = {
						xtype: 'label',
		                margin: '80 0 0 0',
		                reference:'refDisHatchCntrNo'+i,
		                style: "font-weight:bold;text-align: center",
		            	text: 'Hatch-' + i
		        };
				
				var vslHatchField = {
						xtype: 'container',
						reference:'refDisVslfieldSetCntr'+i,
						margin: '2 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refcargoflowdishatchlayout.add(hatchCntr);
				
				me.lookupReference("refDisHatchCntr"+i).add(hatchNo);
				me.lookupReference("refDisHatchCntr"+i).add(vslHatchField);
				
				var cnt = 0;
				if(vslItems){
					for(var j=0;j<vslItems.length;j++){
						var item = vslItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balAmt + ' (' + item.actAmt + ' / ' + item.totalAmt + ') ' + item.tobeRecvAmt
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    reference:'disVslHatch'+j,
				                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
				                    textTpl: [
				                    	'<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red; text-align:center; font-weight:bold;font-size:13px">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 5',
				                    value: item.percentage,
				                    width: 200,
				                    height:85
				                };
							
							me.lookupReference("refDisVslfieldSetCntr"+i).add(vslHatchProgressField);
							
							//CSS
							var refEl = me.lookupReference("disVslHatch"+j).getEl();
							refEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
							refEl.child(".x-progress-bar", true).style.backgroundImage = "none";
						}
					}
				}
				
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid;color:#3bcbf7",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 5',
		                  value: 0,
		                  width: 200,
		                  height:85
		              }
					
					me.lookupReference("refDisVslfieldSetCntr"+i).add(vslHatchProgressField);
				}
				
			}
		}
	},
	
	dischargingHatchLayout:function(records){
		var me = this;
		var refs = me.getReferences();
			
		refs.refcargoflowdishatchlayout.removeAll();
		
		refs.refWHDischargedHatchLayout.removeAll();
		refs.refGateDischargedHatchLayout.removeAll();
		
		var vslItems = null;
		var whItems = null;
		var gateItems = null;
		if(records.length > 0){
			vslItems = records[0].get('vslDischargedItems');
			whItems = records[0].get('whDischargedItems');;
			gateItems = records[0].get('gateDischargedItems');
		}
		
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refDisHatchCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchNo = {
						xtype: 'label',
		                margin: '80 0 0 0',
		                reference:'refDisHatchCntrNo'+i,
		                style: "font-weight:bold;text-align: center",
		            	text: 'Hatch-' + i
		        };
				
				var vslHatchField = {
						xtype: 'container',
						reference:'refDisVslfieldSetCntr'+i,
						//style: { "background-color":"white" },
						margin: '2 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refcargoflowdishatchlayout.add(hatchCntr);
				
				me.lookupReference("refDisHatchCntr"+i).add(hatchNo);
				me.lookupReference("refDisHatchCntr"+i).add(vslHatchField);
				
				var cnt = 0;
				if(vslItems){
					for(var j=0;j<vslItems.length;j++){
						var item = vslItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balMt + ' (' + item.actMt + ' / ' + item.totalMt + ') ' + item.tobeRecvMt
							var percent = Ext.util.Format.number(Number(item.percentage)*100, '0,000.000') + '%';
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    style: "background-color: white; border: 1px solid",
				                    textTpl: [
				                    	'<span style="color:red; text-align:center; font-weight:bold;">' + item.cmmdNm +  '</span>'
				                    	//+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.cgTpNm +  '</span>'
				                    	+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.delvTpNm +  '</span>'
				                    	+ '<br>' + '<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red; text-align:center; font-weight:bold;">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 2',
				                    value: item.percentage,
				                    width: 200,
				                    height:115
				                }
							
							me.lookupReference("refDisVslfieldSetCntr"+i).add(vslHatchProgressField);
						}
					}
				}
				
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 2',
		                  value: 0,
		                  width: 200,
		                  height:115
		              }
					
					me.lookupReference("refDisVslfieldSetCntr"+i).add(vslHatchProgressField);
				}
				
			}
			
//			if(whItems) {
//				me.dischargingHatchWarehouseLayout(whItems);
//			}
//			
//			if(gateItems) {
//				me.dischargingHatchGateLayout(gateItems);
//			}
		}
	},
	
	dischargingHatchWarehouseLayout:function(whItems){
		var me = this;
		var refs = me.getReferences();
		
		refs.refDisWarehouse.setSize(173,100);
		refs.refDisWarehouse.setText(ViewUtil.getLabel('warehouse'));
		refs.refWHDischargedHatchLayout.removeAll();
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refDisHatchWhCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchField = {
						xtype: 'container',
						reference:'refDisWhFieldSetCntr'+i,
						margin: '2 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refWHDischargedHatchLayout.add(hatchCntr);
				me.lookupReference("refDisHatchWhCntr"+i).add(hatchField);
				
				var cnt = 0;
				if(whItems){
					for(var j=0;j<whItems.length;j++){
						var item = whItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balMt + ' (' + item.actMt + ' / ' + item.totalMt + ') ' + item.tobeRecvMt
							var percent = Number(item.percentage)*100 + '%';
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    style: "background-color: white; border: 1px solid",
				                    textTpl: [
				                    	'<span style="color:red; text-align:center; font-weight:bold;">' + item.cmmdNm +  '</span>'
				                    	//+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.cgTpNm +  '</span>'
				                    	+ '<br>' + '<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red; text-align:center; font-weight:bold;">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 2',
				                    value: item.percentage,
				                    width: 200,
				                    height:100
				                }
							
							me.lookupReference("refDisWhFieldSetCntr"+i).add(vslHatchProgressField);
						}
					}
				}
				
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 2',
		                  value: 0,
		                  width: 200,
		                  height:100
		              }
					
					me.lookupReference("refDisWhFieldSetCntr"+i).add(vslHatchProgressField);
				}
				
			}
		}
	},
	
	dischargingHatchGateLayout:function(gateItems){
		var me = this;
		var refs = me.getReferences();
		
		refs.refDisGate.setSize(173,100);
		refs.refDisGate.setText(ViewUtil.getLabel('gateNm'));
		refs.refGateDischargedHatchLayout.removeAll();
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refDisHatchGateCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchField = {
						xtype: 'container',
						reference:'refDisGateFieldSetCntr'+i,
						margin: '2 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refGateDischargedHatchLayout.add(hatchCntr);
				me.lookupReference("refDisHatchGateCntr"+i).add(hatchField);
				
				var cnt = 0;
				if(gateItems){
					for(var j=0;j<gateItems.length;j++){
						var item = gateItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balMt + ' (' + item.actMt + ' / ' + item.totalMt + ') ' + item.tobeRecvMt
							var percent = Number(item.percentage)*100 + '%';
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    style: "background-color: white; border: 1px solid",
				                    textTpl: [
				                    	'<span style="color:red; text-align:center; font-weight:bold;">' + item.cmmdNm +  '</span>'
				                    	//+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.cgTpNm +  '</span>'
				                    	+ '<br>' + '<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red;text-align:center; font-weight:bold;">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 2',
				                    value: item.percentage,
				                    width: 200,
				                    height:100
				                }
							
							me.lookupReference("refDisGateFieldSetCntr"+i).add(vslHatchProgressField);
						}
					}
				}
				
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 2',
		                  value: 0,
		                  width: 200,
		                  height:100
		              }
					
					me.lookupReference("refDisGateFieldSetCntr"+i).add(vslHatchProgressField);
				}
				
			}
		}
	},
	
	loadingHatchLayout:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refcargoflowloadhatchlayout.removeAll();
		
		refs.refWHLoadingHatchLayout.removeAll();
		refs.refGateLoadingHatchLayout.removeAll();
		
		var vslItems = null;
		var whItems = null;
		var gateItems = null;
		if(records.length > 0){
			vslItems = records[0].get('vslLoadingItems');
			whItems = records[0].get('whLoadingItems');
			gateItems = records[0].get('gateLoadingItems');
		}
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refLoadHatchCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchNo = {
						xtype: 'label',
		                margin: '80 0 0 0',
		                reference:'refLoadHatchCntrNo'+i,
		                style: "font-weight:bold;text-align: center",
		            	text: 'Hatch-' + i
		        };
				
				var vslHatchField = {
						xtype: 'container',
						reference:'refLoadVslfieldSetCntr'+i,
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refcargoflowloadhatchlayout.add(hatchCntr);
				me.lookupReference("refLoadHatchCntr"+i).add(hatchNo);
				me.lookupReference("refLoadHatchCntr"+i).add(vslHatchField);
				
				var cnt = 0;
				if(vslItems){
					for(var j=0;j<vslItems.length;j++){
						var item = vslItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balMt + ' (' + item.actMt + ' / ' + item.totalMt + ') ' + item.tobeRecvMt
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    style: "background-color: white; border: 1px solid",
				                    textTpl: [
				                    	'<span style="color:red; text-align:center; font-weight:bold;">' + item.cmmdNm +  '</span>'
				                    	//+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.cgTpNm +  '</span>'
				                    	+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.delvTpNm +  '</span>'
				                    	+ '<br>' + '<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red; text-align:center; font-weight:bold;">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 2',
				                    value: item.percentage,
				                    width: 200,
				                    height:115
				                }
							
							me.lookupReference("refLoadVslfieldSetCntr"+i).add(vslHatchProgressField);
						}
					}
				}
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 2',
		                  value: 0,
		                  width: 200,
		                  height:115
		              }
					
					me.lookupReference("refLoadVslfieldSetCntr"+i).add(vslHatchProgressField);
				}
			}
			
//			if(whItems) {
//				me.loadingHatchWarehouseLayout(whItems);
//			}
//			
//			if(gateItems) {
//				me.loadingHatchGateLayout(gateItems);
//			}
		}
	},
	
	loadingHatchLayoutByVsl:function(records){
		var me = this;
		var refs = me.getReferences();
		
		refs.refcargoflowloadhatchlayout.removeAll();
		
		var vslItems = null;
		if(records.length > 0){
			vslItems = records[0].get('vslLoadingItems');
		}
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refLoadHatchCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchNo = {
						xtype: 'label',
		                margin: '80 0 0 0',
		                reference:'refLoadHatchCntrNo'+i,
		                style: "font-weight:bold;text-align: center",
		            	text: 'Hatch-' + i
		        };
				
				var vslHatchField = {
						xtype: 'container',
						reference:'refLoadVslfieldSetCntr'+i,
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refcargoflowloadhatchlayout.add(hatchCntr);
				me.lookupReference("refLoadHatchCntr"+i).add(hatchNo);
				me.lookupReference("refLoadHatchCntr"+i).add(vslHatchField);
				
				var cnt = 0;
				if(vslItems){
					for(var j=0;j<vslItems.length;j++){
						var item = vslItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balAmt + ' (' + item.actAmt + ' / ' + item.totalAmt + ') ' + item.tobeRecvAmt
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    reference:'loadVslHatch'+j,
				                    style: "background-color: white; border: 1px solid;color:#3bcbf7",
				                    textTpl: [
				                    	'<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red; text-align:center; font-weight:bold;font-size:13px">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 5',
				                    value: item.percentage,
				                    width: 200,
				                    height:85
				                }
							
							me.lookupReference("refLoadVslfieldSetCntr"+i).add(vslHatchProgressField);
							
							//CSS
							var refEl = me.lookupReference("loadVslHatch"+j).getEl();
							refEl.child(".x-progress-bar", true).style.backgroundColor = "#1a9cd9";
							refEl.child(".x-progress-bar", true).style.backgroundImage = "none";
						}
					}
				}
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid;color:#3bcbf7",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 5',
		                  value: 0,
		                  width: 200,
		                  height:85
		              }
					
					me.lookupReference("refLoadVslfieldSetCntr"+i).add(vslHatchProgressField);
				}
			}
		}
	},
	
	
	loadingHatchWarehouseLayout:function(whItems){
		var me = this;
		var refs = me.getReferences();
		
		refs.refLoadWarehouse.setSize(173,100);
		refs.refLoadWarehouse.setText(ViewUtil.getLabel('warehouse'));
		refs.refWHLoadingHatchLayout.removeAll();
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refLoadHatchWhCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchField = {
						xtype: 'container',
						reference:'refLoadWhFieldSetCntr'+i,
						margin: '2 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refWHLoadingHatchLayout.add(hatchCntr);
				me.lookupReference("refLoadHatchWhCntr"+i).add(hatchField);
				
				var cnt = 0;
				if(whItems){
					for(var j=0;j<whItems.length;j++){
						var item = whItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balMt + ' (' + item.actMt + ' / ' + item.totalMt + ') ' + item.tobeRecvMt
							var percent = Number(item.percentage)*100 + '%';
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    style: "background-color: white; border: 1px solid",
				                    textTpl: [
				                    	'<span style="color:red; text-align:center; font-weight:bold;">' + item.cmmdNm +  '</span>'
				                    	//+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.cgTpNm +  '</span>'
				                    	+ '<br>' + '<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red; text-align:center; font-weight:bold;">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 2',
				                    value: item.percentage,
				                    width: 200,
				                    height:100
				                }
							
							me.lookupReference("refLoadWhFieldSetCntr"+i).add(vslHatchProgressField);
						}
					}
				}
				
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 2',
		                  value: 0,
		                  width: 200,
		                  height:100
		              }
					
					me.lookupReference("refLoadWhFieldSetCntr"+i).add(vslHatchProgressField);
				}
				
			}
		}
	},
	
	loadingHatchGateLayout:function(gateItems){
		var me = this;
		var refs = me.getReferences();
		
		refs.refLoadGate.setSize(173,100);
		refs.refLoadGate.setText(ViewUtil.getLabel('gateNm'));
		refs.refGateLoadingHatchLayout.removeAll();
		
		if(me.hatchQty > 0) {
			for(var i=1;i<=me.hatchQty;i++){
				var hatch = 'H' + i;
				var hatchCntr = {
			        	xtype: 'container',
		                style: { "background-color":"whitesmoke" },
			        	reference:'refLoadHatchGateCntr'+i,
				    	margin: '0 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		}
				};
				
				var hatchField = {
						xtype: 'container',
						reference:'refLoadGateFieldSetCntr'+i,
						margin: '2 0 0 0',
				    	layout: {
				    		type: 'vbox',
				            align: 'stretch'
			    		},
		            	items:[{}]};
				
				refs.refGateLoadingHatchLayout.add(hatchCntr);
				me.lookupReference("refLoadHatchGateCntr"+i).add(hatchField);
				
				var cnt = 0;
				if(gateItems){
					for(var j=0;j<gateItems.length;j++){
						var item = gateItems[j];
						if(item.hatchNo === hatch){
							cnt ++;
							var amt = item.balMt + ' (' + item.actMt + ' / ' + item.totalMt + ') ' + item.tobeRecvMt
							var percent = Number(item.percentage)*100 + '%';
							var vslHatchProgressField = {
				                    xtype: 'progressbarwidget',
				                    style: "background-color: white; border: 1px solid",
				                    textTpl: [
				                    	'<span style="color:red; text-align:center; font-weight:bold;">' + item.cmmdNm +  '</span>'
				                    	//+ '<br>' + '<span style="font-weight:bold;text-align:center">' + item.cgTpNm +  '</span>'
				                    	+ '<br>' + '<span style="text-align:center; font-weight:bold;">' + amt +  '</span>'
				                    	+ '<br>' + '<span style="color:red;text-align:center; font-weight:bold;">' + item.percentageStr +  '</span>'
				                    ],
				                    margin: '2 0 0 2',
				                    value: item.percentage,
				                    width: 200,
				                    height:100
				                }
							
							me.lookupReference("refLoadGateFieldSetCntr"+i).add(vslHatchProgressField);
						}
					}
				}
				
				if(cnt == 0) {
					var vslHatchProgressField = {
		                  xtype: 'progressbarwidget',
		                  style: "background-color: white; border: 1px solid",
		                  textTpl: [
		                  ],
		                  margin: '2 0 0 2',
		                  value: 0,
		                  width: 200,
		                  height:100
		              }
					
					me.lookupReference("refLoadGateFieldSetCntr"+i).add(vslHatchProgressField);
				}
				
			}
		}
	},
	
	refreshOnEveryFiveMinutes : function(){
		var me = this;
		
		var intervalFunc = setInterval(function(){
			var prefix = 'menu';
			var menuId = 'MPCT708';
			var id = prefix + '_' + menuId;
			var mainView = Ext.ComponentQuery.query('[xtype="app-main"]')[0];

			var tabs = mainView.lookupReference('ref-maintab');
			var tab = tabs.items.getByKey(id);
			
			if(!tab){
				clearInterval(intervalFunc);
				return;
			}else{
				if(tabs.getActiveTab().xtype == "app-cargoflowdashboard"){
					var params = me.getSearchCondition();
					
			    	if(params['vslCallId'] != ""){
			    		tab.getController().onSearch();
			    	}
				}
			}
		},
		
		MOST.config.Token.getDashboardinterval() ?  MOST.config.Token.getDashboardinterval() * 1000 * 60: me.REFRESH_INTERVAL);

	},
	
	getSearchCondition: function(){
		var me = this;
		var searchParm = me.getViewModel().get('theSearch');
		var params = me.createParam(searchParm);
    	
    	if(StringUtil.isNullorEmpty(params.vslCallId)){
    		MessageUtil.warning('Warning', 'inputVslCallIdMsg');
			return;
		}
    	
		params['vslCallId'] = searchParm.get("vslCallId");
		params['unitTp'] = searchParm.get("unitTp");
		params['scn'] = searchParm.get('scn');
		
		return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVslInfo:returnValue.item});
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			}
			else {
				refs.ctlScn.setValue('');
				me.getViewModel().setData({theVslInfo:null});
			}
		} else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
				}else {
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
	},
	
});