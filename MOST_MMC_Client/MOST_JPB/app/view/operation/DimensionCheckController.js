Ext.define('MOST.view.operation.DimensionCheckController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
		
	],

	alias: 'controller.dimensioncheck',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DIMENSION_STORE_REF_NAME: 'refDimensionStore',  
	DIMENSION_STORE_NAME: 'theDimensionStore',
	DEFAULT_MODEL : 'MOST.model.operation.DimensionCheck',
	prevData:null,
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 * 
	 * 
	 * /**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var recvData = me.getView().recvData;
		
		var parentView = me.getParentView();
		
		if(recvData == undefined){
			var currentDay = new Date();
			var today = Ext.Date.format(currentDay, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			
			if(parentView.viewModel.get('theDimension') == null){
				refs.ctlCheckTime.setValue(today);
			}
			refs.btnConfirm.setDisabled(false);
			
		}else{
			me.getViewModel().setData({theDimension : recvData});
			
			refs.ctlSearchBlNo.setValue(recvData.get('blSnNo'));
			refs.ctlVslCallId.setValue(recvData.get('vslCallId'));
			
			if(parentView.reference != null || me.getParentView().xtype !== 'app-thelistofdimensioncheck'){
				var dimensionInfo = me.getViewModel().get('theDimension');
				dimensionInfo.set('docHeight', recvData.get('height'));
				dimensionInfo.set('docLength', recvData.get('length'));
				dimensionInfo.set('docWidth', recvData.get('width'));
				
				dimensionInfo.set('vslCallId', recvData.get('vslCallId'));
				dimensionInfo.set('vslCd', recvData.get('vslCd'));
				dimensionInfo.set('callYear', recvData.get('callYear'));
				dimensionInfo.set('callSeq', recvData.get('callSeq'));
				
				if(!StringUtil.isNullorEmpty(recvData.get('blNo'))) {
					dimensionInfo.set('blSnNo', recvData.get('blNo'));
					dimensionInfo.set('cgNo', recvData.get('blNo'));
					dimensionInfo.set('doGrCd', recvData.get('doNo'));
					dimensionInfo.set('ixCd', 'I');
				} else if(!StringUtil.isNullorEmpty(recvData.get('shipgNoteNo'))) {
					dimensionInfo.set('blSnNo', recvData.get('shipgNoteNo'));
					
					if(!StringUtil.isNullorEmpty(recvData.get('grNo'))) {
						dimensionInfo.set('cgNo', recvData.get('grNo'));
						dimensionInfo.set('doGrCd', recvData.get('grNo'));
					} else {
						dimensionInfo.set('cgNo', recvData.get('shipgNoteNo'));
					}
					dimensionInfo.set('ixCd', 'X');
				}

				var currentDay = new Date();
				var today = Ext.Date.format(currentDay, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
				refs.ctlCheckTime.setValue(today);
			} else {
				refs.btnConfirm.setDisabled(true);
			}
			
			me.getSnBlComboItems();
		}
	},

    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onConfirm_clickHandler: function(){
		var me = this;
		var refs = me.getReferences();
		var params = me.getSearchCondition();
		var dimensionInfo = me.getViewModel().get('theDimension');
		var parentView = me.getParentView();
		var dimensionStore  = parentView.viewModel.get('dimensionStore');				
		var record = Ext.create(me.DEFAULT_MODEL);
		var dimensionItems = me.getViewModel().get('theDimensionInfo');
		var dimensionList = new Array();
		var theDimensionStore = me.getStore('theDimensionStore');
		
		if(parentView.reference != null || me.getParentView().xtype == 'app-gateoperations' 
			|| me.getParentView().xtype == 'popup-confirmrehandleloadingpopup'
				|| me.getParentView().xtype == 'popup-confirmrehandlehandlingoutpopup'){
			if(dimensionStore != null){
				dimensionStore.removeAll();
			}
			
			record.set('vslCallId', dimensionInfo.get('vslCallId'));		
			if(dimensionInfo.get('vslCd') != null && dimensionInfo.get('vslCd') != ''){
				record.set('vslCd', dimensionInfo.get('vslCd'));
			}else{
				record.set('vslCd', dimensionInfo.get('vslCode'));
			}
			record.set('callYear', dimensionInfo.get('callYear'));
			record.set('callSeq', dimensionInfo.get('callSeq'));
			
			record.set('actHeight', dimensionInfo.get('actHeight'));
			record.set('actLength', dimensionInfo.get('actLength'));
			record.set('actWidth', dimensionInfo.get('actWidth'));
			record.set('checkTime', dimensionInfo.get('checkTime'));
			record.set('cgNo', dimensionInfo.get('cgNo'));
			record.set('ixCd', dimensionInfo.get('ixCd'));
			record.set('jobNo', dimensionInfo.get('jobNo'));
			record.set('catgCd', dimensionInfo.get('catgCd'));
			record.set('dimensionRemark', refs.ctlDimensionRemark.getValue());
			record.set('userId', MOST.config.Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);

			dimensionStore.insert(0, record);
			dimensionStore.commitChanges();
			var win = me.getView().up('window');
			
//			var returnItem = {
//					code : '',
//					item : record
//				}

			if (win) {
				//win.returnValue = returnItem;
				win.close();
			}
		}else{
			record.set('actHeight', refs.ctlActHeight.getValue());
			record.set('actLength', refs.ctlActLength.getValue());
			record.set('actWidth', refs.ctlActWidth.getValue());
			record.set('checkTime', refs.ctlCheckTime.getValue());
			record.set('vslCallId', refs.ctlVslCallId.getValue());
			if(dimensionItems){
				record.set('vslCd', dimensionItems.vslCd);
				record.set('callYear', dimensionItems.callYear);
				record.set('callSeq', dimensionItems.callSeq);
			}else {
				record.set('vslCd', dimensionInfo.get('vslCd'));
				record.set('callYear', dimensionInfo.get('callYear'));
				record.set('callSeq', dimensionInfo.get('callSeq'));
			}
			record.set('blSnNo', refs.ctlSearchBlNo.getValue());
			record.set('cgNo', refs.ctlSearchGRNo.getValue());
			record.set('dimensionRemark', refs.ctlDimensionRemark.getValue());
			record.set('userId', MOST.config.Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);
			
			if(!refs.ctlSearchGRNo.getValue()){
				MessageUtil.warning("Warning", "Please select DO/GR");
				return;
			}
			
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = theDimensionStore.getProxy().url;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('items', new Array());
			updateParm.get('items').push(record.data);
			updateParm.save({
				success: function () {				
						MessageUtil.saveSuccess();
						var win = me.getView().up('window');
						if (win) {
							win.close();
						}						
				}
			});
		}		
	},
	
	afterSetCodePopupData: function (xtype, targetControl, returnValue) {
		var me = this;
		var refs = me.getReferences();
		if (targetControl === 'ctlVslCallId') {
			if (returnValue) {
				me.getViewModel().setData({ theDimensionInfo: returnValue.item.data });
				me.getSnBlComboItems();
			}
		}
	},
	
	getSnBlComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var snBlCombo = me.getStore('snBlCombo');
		var searchParm = me.getViewModel().get('theSearch');
		snBlCombo.load({
			params: {
				vslCallId: refs.ctlVslCallId.getValue(),
				cgNo: refs.ctlSearchBlNo.getValue()
			},

			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						snBlCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
						
						if(records.length == 1) {
							refs.ctlDocHeight.setValue(records[0].get('docHeight'));
							refs.ctlDockLength.setValue(records[0].get('docLength'));
							refs.ctlDocWidth.setValue(records[0].get('docWidth'));
							me.getDoGrComboItems();
						} else if(records.length >= 2) {
							refs.ctlDocHeight.setValue();
							refs.ctlDockLength.setValue();
							refs.ctlDocWidth.setValue();
							refs.ctlSearchGRNo.setValue();
						}
					}
				}
			}
		});
	},
	
	getDoGrComboItems: function () {
		var me = this;
		var refs = me.getReferences();
		var doGrCombo = me.getStore('doGrCombo');
		doGrCombo.load({
			params: {
				vslCallId: refs.ctlVslCallId.getValue(),
				blNo: refs.ctlSearchBlNo.getValue()
			},

			callback: function (records, operation, success) {
				if (success) {
					if (records.length > 0) {
						if(records[0].data.doGrCd != null){
							doGrCombo.insert(0, [{ doGrNm: 'Select', doGrCd: '' }]);
						} else {
							doGrCombo.insert(0, [{ cdNm: 'Select', cd: '' }]);
						}
					}
				}
			}
		});
	},
	
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var dimensionStore = me.getStore(me.DIMENSION_STORE_NAME);
		dimensionStore.removeAll();
     	var recvData = me.getView().recvData;
     	var params;
     	if(recvData == undefined || recvData == null) return;
     	me.prevData = recvData.clone();
     	
     	if(me.getViewModel().get('theDimension')){
     		var searchParm = me.getViewModel().get('theDimension');
     		params = me.createParam(searchParm);
     		
     	} else if( me.getViewModel().get('theDimensionInfo')){
     		var searchParm = me.getViewModel().get('theDimensionInfo');
     		params = me.createParam(searchParm);
     		
     	}else if(me.getViewModel().get('theSearch')){
     		var searchParm = me.getViewModel().get('theSearch');
     		params = me.createParam(searchParm);
     		
     	}
		
		params['vslCallId'] = 	me.prevData.get('vslCallId');
		params['vslCd'] = 		me.prevData.get('vslCd');
		params['vslCode'] = 	me.prevData.get('vslCode');
		params['callSeq'] = 	me.prevData.get('callSeq');
		params['callYear'] = 	me.prevData.get('callYear');
		params['catgCd'] = 		me.prevData.get('catgCd');
		params['cgTpCd'] = 		me.prevData.get('cgTpCd');
		params['cgTpCdNm'] = 	me.prevData.get('cgTpCdNm');
		params['delvTpCd'] = 	me.prevData.get('delvTpCd');
		params['delvTpNm'] = 	me.prevData.get('delvTpNm');
		params['lorryNo'] = 	me.prevData.get('lorryNo');
		params['scgNo'] = 		me.prevData.get('scgNo');
		params['checkedDt'] = 	me.prevData.get('checkedDt');
		params['endDate'] = 	me.prevData.get('endDate');
		params['cmdtCd'] = 		me.prevData.get('cmdtCd');
		params['blNo'] = 		me.prevData.get('blNo');
     	params['blsnNo'] = 		me.prevData.get('blsnNo');
     	params['grNo'] = 		me.prevData.get('grNo');
     	params['doNo'] = 		me.prevData.get('doNo');
     	params['snNo'] = 		me.prevData.get('snNo');
     	params['shipgNoteNo'] = me.prevData.get('shipgNoteNo');
    	params['jobGroup'] = 	me.prevData.get('jobGroup');
     	params['jobNo'] = 		me.prevData.get('jobNo');
     	
     	if(me.prevData.get('length') || me.prevData.get('height') || me.prevData.get('width')){
     		params['length'] =		me.prevData.get('length');
         	params['height'] =		me.prevData.get('height');
         	params['width'] =		me.prevData.get('width');
     	}else {
     		params['length'] =		me.prevData.get('length');
         	params['height'] =		me.prevData.get('height');
         	params['width'] =		me.prevData.get('width');
     	}
     	
     	params['docM3'] = 		me.prevData.get('docM3');
     	params['docMt'] = 		me.prevData.get('docMt');
     	params['docQty'] = 		me.prevData.get('docQty');
     	
    	return params;
	}
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});