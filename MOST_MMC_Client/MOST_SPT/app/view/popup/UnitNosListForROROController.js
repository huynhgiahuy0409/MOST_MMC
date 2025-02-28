Ext.define('MOST.view.popup.UnitNosListForROROController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.unitnoforrorolistpopup',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refUnitNosListPopupGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'unitNosList',			// Main Store Name
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START	
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
    	var recvData = me.getView().recvData;
    	var doNo, sdoNo, delvTpCd, searchType;
    	var searchType, unitNo, grNo = '';
    	if(recvData.get('delvTpCd') == 'I'){
    		doNo = recvData.get('doNo');
    	}else{
    		sdoNo = recvData.get('sdoNo');
    	}
    	if(me.getParentView().refs.ctlDirectOperation){
    		if(me.getParentView().refs.ctlDirectOperation.value){
        		delvTpCd = 'D';
        		doNo = recvData.get('doNo');
        	}else if(me.getParentView().refs.ctlIndirectOperation.value){
        		delvTpCd = 'I';
        		doNo = recvData.get('doNo');
        	}
    	}
    	
    	if(recvData.get('searchType')){
    		searchType = recvData.get('searchType');
    	}
    	if(recvData.get('unitNo')){
    		unitNo = recvData.get('unitNo');
    	}
    	store.load({
			params: {
				vslCallId	: recvData.get('vslCallId'),
				blNo		: recvData.get('blNo'),
				shipgNoteNo	: recvData.get('shipgNoteNo'),
				delvTpCd	: delvTpCd,
				searchType	: searchType,
				doNo		: doNo,
				sdoNo		: sdoNo,
				grNo		: recvData.get('grNo'),
				catgCd		: recvData.get('catgCd'),
				unitNo		: unitNo
			},
			callback: function(records, operation, success) {
				if (success) {
					var strSplit = me.getView().codeValue.split(',');
					if(strSplit.length > 0){
						for(var i = 0; i < strSplit.length; i++){
							record = store.findRecord('unitNo', strSplit[i].trim());
							if(record){
								record.set('unitChk', 1);
							}
						}
						store.commitChanges();
					}
					if(recvData.get('flag')){
			    		
			    	}else{
			    		me.getJob();
			    	}
				}
			}
		});
	},
	
	getJob: function(btn){
		var me = this;
		var refs = me.getReferences();
		var jobStore = me.getStore('getJobRORO');
    	var recvData = me.getView().recvData;
    	var cgNo, jobPurpCd = '';
    	
    	if(recvData.get('blNo') != null && recvData.get('blNo') != ''){
    		cgNo = recvData.get('blNo');
    	}
    	if(recvData.get('shipgNoteNo') != null && recvData.get('shipgNoteNo') != ''){
    		cgNo = recvData.get('shipgNoteNo');
    	}
    	if(recvData.get('jobPurpCd') != null && recvData.get('jobPurpCd') != ''){
    		jobPurpCd = recvData.get('jobPurpCd');
    	}
    	jobStore.load({
			params: {
				vslCallId	: recvData.get('vslCallId'),
				blNo		: recvData.get('blNo'),
				shipgNoteNo	: recvData.get('shipgNoteNo'),
				catgCd		: recvData.get('catgCd'),
				jobTpCd		: recvData.get('jobTpCd'),
				jobPurpCd	: jobPurpCd,
				cgNo		: cgNo,
				cgTpCd		: 'RCV'
				
			},
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						var store = me.getStore(me.MAIN_STORE_NAME);
						//sMantis: 0167299
						var unitNos = [];
						for(var i = 0; i < records.length; i++) {
							unitNos.push(... records[i].get('unitNos').split(','));
						}
						for(var i = 0; i < unitNos.length; i++) {
							store.each(function(record, index){
								if(record.get('unitNo') != null && record.get('unitNo') == unitNos[i]){
									store.remove(record);
								}
							});
						}
						store.commitChanges();
						//eMantis: 0167299
					}
				}
			}
		});
	},
	
	onSaveUnitNoList: function(btn){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var unitListStrore = me.getStore('unitNosList');
		var roroItems = new Array();
		var chasNo='';
		var totalMT = 0;
		var totalCnt = 0;
		var totalCbm = 0;
		unitListStrore.each(function(record){
			if(record.get('unitChk') === true || record.get('unitChk') === 1){
				if(chasNo == ''){
					chasNo = record.get('unitNo');
				}else{
					chasNo += "," +  record.get('unitNo');
				}
				if(record.get('cbm') != null && record.get('cbm') != ''){
					totalCbm += parseFloat(record.get('cbm'));
				}
				totalMT += parseFloat(record.get('docWgt'));
				totalCnt += 1;
				roroItems.push(record.data);
			}
		});
		var returnItem = {
				code : chasNo,
				totalMT: totalMT.toFixed(3),
				totalCnt:totalCnt,
				totalCbm:totalCbm.toFixed(3),
				items : roroItems
		}
		window.returnValue = returnItem;
		window.close();
	},
	
	onMultiCheckChange: function(chkbox, rowIdx, checked, record, e, eOpts){
		var me = this;
	},
	
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
});