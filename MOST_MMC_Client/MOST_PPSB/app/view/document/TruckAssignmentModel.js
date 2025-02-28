Ext.define('MOST.view.document.TruckAssignmentModel', {
	extend: 'MOST.view.foundation.BaseViewModel',

    alias: 'viewmodel.truckAssignment',

	requires: [
		'Ext.data.proxy.Rest',
		'MOST.model.document.TruckAssignment',
		'MOST.model.foundation.dataitem.DataItem'
	],
	
	theLorryAssignment: {
	},
	
	formulas:{
		permitChecked:{
  			bind:{
  				bindTo:'{theLorryAssignment.permitYn}'
  			},
  			get:function(value){
  				if(value === 'true'){
  					return 'Y';
  				}else if(value === 'false'){
  					return 'N';
  				}else{
  					return value; 
  				}
  			},
  			set:function(value){
  				var me = this;
  				var stringValue = 'N';
  				if(value == true){
  					stringValue = 'Y';
  				}
  				
				var detailItem = me.getView().getViewModel().get('theLorryAssignment');
				detailItem.set('permitYn', stringValue);
  			}
  		}
	},
	
	stores: {
		
		masterBlCombo : {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'masterBlComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_MBL_NO
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  mfDocId: ''
			          }]);
			     }
			}
		},
		
		blNoCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'blNoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO,
					//divCd: ComboboxServiceConstants.COMBO_TRUCK
				}
			},
			listeners: 
			{
				load: function(store, records) {
			          store.insert(0, [{
			        	  scdNm: 'Select',
			        	  blNo: ''
			          }]);
			     }
			}
		},
		
		shipgNoteCombo: {
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'shipgNoteComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_SN_NO
				}
			}
		},
		
		goodsReceiptCombo: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'goodsReceiptComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/grItems'
			}
		},
		
		subDoCombo: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'subDoComboStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/sdoItems'
			}
		},
		
		GRNoDetail: {//GR Detail For Assignment
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'SNNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/grItem'
			}
		},
		
		BLDetail: {//BL Detail For Assignment
			model: 'MOST.model.combobox.ComboBoxService',
			storeId: 'SNNoListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/combobox/codeMaster',
				extraParams:{
					searchType: ComboboxServiceConstants.COMBO_BL_NO
				}
			}
		},
		
		LorryAssignmentGridList: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'lorryAssignmentGridListStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/lorryassignmentinquiry'
			}
		},
		
		truckAssignmentOfROROList: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			storeId: 'truckAssignmentOfROROListStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/list'
			}
		},
		
		
		BLSNNoDetail: {
			model: 'MOST.model.document.TruckAssignment',
			storeId: 'BLSNNoDetailStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/changeBLSNo'
			}
		},
		
		permitCertificateUpload: {
			model: 'MOST.model.fileupload.FileUpload',
			storeId: 'permitCertificateUploadUpload',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckAssignment/filelist'
			}
		},
		
		permitCertificateDownload : {
			model : 'MOST.model.fileupload.FileUpload',
			storeId: 'permitCertificateDownloadStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/filedownload/download'
			}
		},
		
		validationCheck: {
			storeId: 'validationCheck',
			autoLoad: false,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/validationcode/list',
				
			}
		},
		assigningDriversForVehicle: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			pageSize:CommonConstants.PAGE_SIZE,
			storeId: 'assigningDriversForVehicleStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/assigningdriversforvehicle'
			}
		},
		
		assigningTrucksForVehicle: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			storeId: 'assigningTrucksForVehicleStore',
			pageSize:CommonConstants.PAGE_SIZE,
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/assigningtrucksforvehicle'
			}
		},
		
		assignedDriversAndTrucks: {
			model: 'MOST.model.document.TruckAssignmentOfRORO',
			pageSize:CommonConstants.PAGE_SIZE,
			storeId: 'assignedDriversAndTrucksStore',
			proxy: {
				type: 'rest',
				url: MOST.config.Locale.getRestApiDestUrl() + '/v1/truckassignmentofroro/assigneddriversandtrucks'
			}
		},
		
	}
});
