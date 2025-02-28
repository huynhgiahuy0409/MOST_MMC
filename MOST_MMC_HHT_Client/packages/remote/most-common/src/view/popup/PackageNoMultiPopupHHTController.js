Ext.define('MOST.view.popup.PackageNoMultiPopupHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',
	alias: 'controller.packagenomultipopuphht',
	
	requires: [
	],

	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refPackageNoMultiPopupGrid',
	MAIN_STORE_NAME: 'packageNoList',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var title ='';
		var vslCallId = me.getViewModel().get('globalVesselCallId');
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var recvData = me.getView().recvData;
		
		if(me.getView().recvData){
			title = me.getView().recvData.title;
			me.getView().up('window').setTitle(title);
			
			vslCallId = me.getView().recvData.vslCallId;
		}
		
		if(vslCallId != '' && vslCallId != null){
			var store = me.getStore(me.MAIN_STORE_NAME);
			var params = me.getSearchCondition();
			
			if(params == null){
				return;
			}
			
			store.load({
				params: params,
				callback: function(records, operation, success) {
					if (success) {
					}
				}
			});
			
		}
	},

	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
     	var params = me.getSearchCondition();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
	},
	
	// Grid Row Double
	onHHTDblClick: function() {
		var me = this; 
		var window = me.getView().up('window');
		
    	window.returnValue = me.getReturnData();
       	window.close();
	},
	
	onSelectData : function(ref){
		var me = this; 
		var window = me.getView().up('window');
		if(ref.getReference() == 'refBtnSelectButton'){
			window.returnValue = me.getReturnData();
		}
		if(window.returnValue != null){
			window.close();	
		}
	},

	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
//	// Search Condition
	getSearchCondition : function(){
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var vslCallId,
			packageNo,
			ixCd,
			jobPurpCd;
		
		
		packageNo = refs.txtPackageNo.getValue();
     	
     	var blNo = '';
     	var shipgNoteNo = '';
     	
     	if(me.getView().recvData){
     		vslCallId = me.getView().recvData.vslCallId;
			blNo = me.getView().recvData.blNo;
			shipgNoteNo = me.getView().recvData.shipgNoteNo;
			ixCd = me.getView().recvData.ixCd;
			jobPurpCd = me.getView().recvData.jobPurpCd;
		}
     	
     	if(vslCallId === ''){
     		return null;
     	} 
     		
		var params = {
			vslCallId: vslCallId,
			blNo: blNo,
			shipgNoteNo: shipgNoteNo,
			packageNo: packageNo,
			ixCd: ixCd,
			jobPurpCd: jobPurpCd
		}
 	    return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelections() == null ? null : grid.getSelections();
		
		var pkgNo = '';
		if(selection){
			for(var i =0; i<selection.length; i++){
				pkgNo = (pkgNo == '' ? selection[i].get('packageNo') : (pkgNo + ',' + selection[i].get('packageNo') ));
			}
		}
		
		var returnItem = {
			code : pkgNo,
			item : selection
		}
		
		return returnItem;
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});