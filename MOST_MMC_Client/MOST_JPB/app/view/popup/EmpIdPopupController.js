Ext.define('MOST.view.popup.EmpIdPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.empidpopup',	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var empIdPopupDataSet = me.getStore('empIdPopupDataSet');
		var roleCd = '';
		var vslCallId = '';
		var shftId = '';
		var workYmd = '';
		
		if(me.getView().recvData){
			roleCd = me.getView().recvData.roleCd;
			vslCallId = me.getView().recvData.vslCallId;
			shftId = me.getView().recvData.shftId;
			workYmd = me.getView().recvData.workYmd;
		} 
		
		if(roleCd != null && roleCd != ''){
			me.onSearchComboSelect(roleCd);
			refs.ctlRoleCdCombo.setHidden(true);
			
		} else {
			empIdPopupDataSet.load({
				params: {
					searchType: 'roleCd',
					// vslCallId : vslCallId,
					// shftId : shftId,
					// workYmd : workYmd
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0){
							me.setComboStore(records[0].data);
							me.setDetailTabControl(records[0].data);
						}
					}
				}
			});
		}
	},
	
	onSearchComboSelect: function(searchString){
		var me = this;
     	var refs = me.getReferences();
    	var empIdPopupDataSet = me.getStore('empIdPopupDataSet');
    	var params = me.getSearchCondition(searchString);
    	var empIdCombo = me.getStore('empIdCombo');
    	
    	if(params == null){
    		return;
    	}
    	
    	empIdPopupDataSet.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(empIdCombo && empIdCombo.getData().length === 0){
							me.setComboStore(records[0].data);
						}

						if(searchString != 'this' && empIdCombo != null){
							var index = empIdCombo.find('scd', searchString);

							if(index != -1){
								setRoleCd =  empIdCombo.getAt(index).get('scd');
								refs.ctlRoleCdCombo.setValue(setRoleCd);
							}
						}
						
						me.setDetailTabControl(records[0].data);
					}
				}
			}
		});
    	
	},
	
	setComboStore:function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var empIdCombo = me.getStore('empIdCombo');
		
		if(masterItem.empIdCombo){
			empIdCombo.setData(masterItem.empIdCombo);
		}
		
		empIdCombo.insert(0, [{scdNm: 'Select',scd: ''}]);

	},
	
	setDetailTabControl: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var empIdList = me.getStore('empIdList');
		
		if(masterItem.empIdList){
			empIdList.setData(masterItem.empIdList);
			empIdList.commitChanges();
		}
	},

	onDblClick: function() {
		var me = this;
		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
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
	getSearchCondition : function(searchString){
		var me = this;
     	var refs = me.getReferences();
     	var roleCdComboValue = refs.ctlRoleCdCombo.getValue();
		var searchType = 'craneList';
		var roleCd = '';
		var vslCallId = '';
		var shftId = '';
		var workYmd = '';
		
		if(me.getView().recvData){
			roleCd = me.getView().recvData.roleCd;
			vslCallId = me.getView().recvData.vslCallId;
			shftId = me.getView().recvData.shftId;
			workYmd = me.getView().recvData.workYmd;
		} 
		
		// if(roleCdComboValue === '' && roleCd === '' && vslCallId === '' && shftId === '' && workYmd === ''){
		// 	return null;
		// }
		
		if(!StringUtil.isNullorEmpty(searchString) && searchString === 'this'){
			searchType = 'EmpId';
			roleCd = roleCdComboValue;
			
		} else if (!StringUtil.isNullorEmpty(searchString)) {
			searchType = 'InitEmpId';
			roleCd = roleCd;
		}
		
		var params = {
			searchType: searchType,
			roleCd: roleCd,
			// vslCallID: vslCallId,
			// shftId: shftId,
			// workYmd: workYmd
		}
		
    	return params;
	},
	
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var grid = me.lookupReference('refEmpIdPopupGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var returnItem = {
			code : selection.data.roleCd,
			item : selection
		}
		
		return returnItem;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});