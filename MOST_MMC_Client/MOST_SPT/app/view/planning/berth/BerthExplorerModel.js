Ext.define('MOST.view.planning.berth.BerthExplorerModel', {
	extend: 'MOST.view.foundation.BaseViewModel',
	
	alias: 'viewmodel.berthexplorer',

	requires: [
		'MOST.model.common.Locale',
		'MOST.model.planning.berth.BerthStructure',
		'MOST.model.planning.berth.BittStructure',
		'MOST.model.planning.berth.BerthPlan'
	],
	
	data: {
		selectedBerthPlan: null,
		selectedSftBerthPlan: null,
		planIndex: -1,
		undoStack: [],
		undoRemained: 0,
		vesselSchedule: null
	},
	
    formulas: {
  		disable:{
  			bind:{
  				bindTo:'{selectedBerthPlan.vslStat}'
  			},
  			get:function(value){
				if(value === 'DPV') {
					return true;
				}else{
					return false;
				}
  			}
  		}
    },
    
	stores: {
		meta: {
			model: 'MOST.model.common.Locale',
			storeId: 'metaDrawingStore',
			proxy: {
				type: 'ajax',
				url: 'resources/data/MetaDrawBerthExplorer.json',
				reader: {
					type: 'json',
					rootProperty: 'data'
				}
			}
		},
		
		berthingStatusCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'vesselTypeComboStore',
			proxy: {
				type: 'rest',
				showProgressBar : false,
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd : CodeConstants.LCD_MOST,
					mcd : CodeConstants.MCD_MT_VSLSTAT,
					scdUse : 'Y'
				}
			},
			listeners: {
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'All',
			              scd: ''
			          }]);
			     }
			}
		},
		
		terminals: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'terminalsStore',
			fields: ['scdNm','scd'],
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					lcd: CodeConstants.LCD_MOST,
					mcd: CodeConstants.MCD_MT_WPCD
				}
			},
			filters : function(item){
				var excludes = ["WHO", "HTC", "OTH"];
				
				if(!excludes.includes(item.data.scd)){
					return item;
				}
			},

		},
		
		berths: {
			model: 'MOST.model.planning.berth.BerthStructure',
			storeId: 'berthsStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthplan/berthstructure'
			}
		},

		bitts: {
			model: 'MOST.model.planning.berth.BittStructure',
			storeId: 'bittsStore',
			proxy: {
				showProgressBar : false,
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl()+ '/v1/berthplan/bittcodes'
			}
		},
		
		plans: {
			model: 'MOST.model.planning.berth.BerthPlan',
			storeId: 'plansStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthplan/plans'
			}
		},
		
		sftPlans: {
			model: 'MOST.model.planning.berth.BerthPlan',
			storeId: 'sftPlansStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/berthplan/sftplans'
			}
		},
		
		priorityCombo : {},
		
		berthAlongSideCombo:{},

		shftBerthAlongSideCombo:{},
  		
  		printPDF: {
        	model: 'MOST.model.common.PackageItem',
            storeId: 'printBayPlanStore',
            proxy: {
                type: 'rest',
                url: MOST.config.Locale.getRestApiDestUrl() + '/v1/print/printPDF'
            }
        },
        
        generatePDF: {
        	model: 'MOST.model.common.PackageItem',
			storeId: 'generatePDFStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/print/previewpdf'
			}
		},
	}
});