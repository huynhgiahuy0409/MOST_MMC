Ext.define('MOST.view.popup.PackageNoMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.packagenomultipopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPackageNoMultiPopupGrid',
	MAIN_STORE_NAME: 'packageNoList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = Ext.create('MOST.model.popup.SearchPopupServiceParm');
		
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		searchParm.set('progress', 'N');
		
		me.onSearch();
	},
	
	// Search Event Handler
	onSearch: function() {
    	var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
		var params = me.getSearchCondition();
		var deliveryMode = params.delvTpCd;
		
		store.load({
			params: params, 
			callback: function(records, operation, success) {
				if(deliveryMode == 'D'){
					store.each(function(record){
						record.set({
							chkMulti: 1
						});
					});
					
					store.commitChanges();
				}
			}
		});
    },
	
	// Grid Row Double
	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},

	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		var selectArray = new Array();
		selectArray.push(selection.data);
		
		var returnItem = {
			code : selection.data.packageNo,
			item : selectArray
		}
	
		return returnItem;
	},
	
	onUpdate: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);	
		var setChkPtyCdValue = '';
		var cnt = 0;
		var storeTotal = store.totalCount;
		var selectArray = new Array();
		
		store.each(function(record,idx){
			if(record.data.chkMulti === 1) {
				if(storeTotal > cnt ){
					if(setChkPtyCdValue === ''){
						setChkPtyCdValue = record.get("packageNo")
					} else {
						setChkPtyCdValue += "," + record.get("packageNo")
					}
					
					selectArray.push(record.data);
				}
				cnt++;
			}
		});	
		
		var window = me.getView().up('window');
		var returnItem = {
			code : setChkPtyCdValue,
			item : selectArray
		}
		
    	window.returnValue = returnItem;
       	window.close();
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
     	var vslCallId ='';
     	var shipgNoteNo = '';
     	var blNo='';
     	var ixCd= '';
     	var jobPurpCd = '';
     	var subDoNo = '';
     	var lorryNo = '';
     	var grNo = '';
     	
     	var splitPtnr = new Array();	
     	
     	if(me.getView().recvData){
			vslCallId = me.getView().recvData.vslCallId;
			shipgNoteNo = me.getView().recvData.shipgNoteNo;
			blNo = me.getView().recvData.blNo;
			ixCd = me.getView().recvData.ixCd;
			jobPurpCd = me.getView().recvData.jobPurpCd;
			delvTpCd = me.getView().recvData.delvTpCd;
     	} 
     	
     	if(me.getParentView().id.indexOf('cargodischarging') != -1){
     		if(me.getParentView().refs.ctlBargeOperationVB.checked == true){
     			jobPurpCd = 'VB';
     			subDoNo = me.getViewModel().get('theDetail').get('sdoNo');
     		}
     		if(me.getParentView().refs.ctlIndirectOperation.checked == true){
     			jobPurpCd = 'VA';
     			subDoNo = me.getViewModel().get('theDetail').get('sdoNo');
     		}
     		if(me.getParentView().refs.ctlBargeOperationAB.checked == true){
     			jobPurpCd = 'AB';
     			lorryNo = me.getParentView().refs.txtABTruckNo.getValue();
     			subDoNo = me.getViewModel().get('theDetail').get('sdoNo');
     		}
     		if(me.getParentView().refs.ctlDirectOperation.checked == true){
     			jobPurpCd = 'VG';
     			subDoNo = me.getViewModel().get('theDetail').get('sdoNo');
     		}
     	}
     	
     	if(me.getParentView().id.indexOf('cargohandlingout') != -1){
     		subDoNo = me.getViewModel().get('theDetail').get('sdoNo');
     	}
     	
     	if(me.getParentView().id.indexOf('cargoloading') != -1){
     		if(me.getParentView().refs.ctlRadioBV.checked == true){
     			jobPurpCd = 'BV';
     			grNo = me.getViewModel().get('theDetail').get('grNo');
     		}
     		if(me.getParentView().refs.ctlRadioGV.checked == true){
     			jobPurpCd = 'GV';
     			grNo = me.getViewModel().get('theDetail').get('grNo');
     		}
     	}
     	
     	if(me.getParentView().id.indexOf('cargohandlingin') != -1){
     		grNo = me.getViewModel().get('theDetail').get('grNo');
     	}
     	
		var params = {
			vslCallId: vslCallId,
			shipgNoteNo: shipgNoteNo,
			blNo: blNo,
			packageNo: searchParm.get("packageNo"),
			ixCd: ixCd,
			jobPurpCd: jobPurpCd,
			subDoNo: subDoNo,
			lorryNo: lorryNo,
			grNo: grNo,
			delvTpCd: delvTpCd
		}
		
    	return params;
    	
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	onMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME );
		var refs = me.getReferences();
		
		if (checked) {
			record.set({
				chkMulti: 1
			});
		} else {
            record.set({
            	chkMulti: 0
            });
		}
		
		store.commitChanges();
	},
	
	onAllCheck: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var store = me.getStore(me.MAIN_STORE_NAME);
		
		if(chk){
			store.each(function(record){
				if(record.data.chkMulti === 1){
					record.set({
						chkMulti: 0
					});
				} else {
					record.set({
						chkMulti: 1
					});
				}
			});
		} else {
			store.clearFilter();
		}
		
		store.commitChanges();
	}
});