Ext.define('MOST.view.operation.hht.DimensionofCargoHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.dimensionofcargohhtctl',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	DIMENSION_STORE_NAME: 'theDimensionStore',
	DEFAULT_MODEL : 'MOST.model.operation.DimensionCheck',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */	
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onHHTLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		window.setTitle('Dimension Check');
		window.setX(window.getX()/2);
		window.setY(0);
		var recvData = me.getView().recvData;
		var dimensionStore = me.getStore(me.DIMENSION_STORE_NAME);
		dimensionStore.removeAll();
		
		me.getViewModel().setData({theDimensionHHT:recvData});
		
		refs.refChkDt.setValue(Ext.Date.format(new Date(), MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		
		var dimensionInfo = me.getViewModel().get('theDimensionHHT');
		dimensionInfo.set('docHeight', recvData.get('height'));
		dimensionInfo.set('docLength', recvData.get('length'));
		dimensionInfo.set('docWidth', recvData.get('width'));
		
		if(recvData.get('blNo') == null || recvData.get('blNo') == ''){
			if(recvData.get('snNo') == null || recvData.get('snNo') == ''){
				dimensionInfo.set('blsnNo', recvData.get('shipgNoteNo'));
			}else{
				dimensionInfo.set('blsnNo', recvData.get('snNo'));
			}
			dimensionInfo.set('cgNo', recvData.get('grNo'));
			dimensionInfo.set('scgNo', recvData.get('grNo'));
			dimensionInfo.set('ixCd', 'X');
		}else{
			dimensionInfo.set('blsnNo', recvData.get('blNo'));
			dimensionInfo.set('cgNo', recvData.get('doNo'));
			dimensionInfo.set('scgNo', recvData.get('doNo'));
			dimensionInfo.set('ixCd', 'I');
		}
		
		refs.refFindGRBLTextField.setValue(dimensionInfo.get('blsnNo'));
		
		if(dimensionInfo.get('jobNo') != null && dimensionInfo.get('jobNo') != ''){
			var params = {
					jobNo : dimensionInfo.get('jobNo')
			}
			dimensionStore.load({
				params : params,
				callback: function (records, operation, success) {
					if (success) {
						me.loadBasicData(records);
					}
				}
			});
		}
	},
	
	loadBasicData: function(masterItem){
		var me = this;
		var refs = me.getReferences();
		var dimensionInfo = me.getViewModel().get('theDimensionHHT');
		var checkTime = masterItem[0].data.checkTime;
		if(checkTime) {
			refs.refChkDt.setValue(Ext.Date.format(checkTime, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		}
		dimensionInfo.set('height', masterItem.actHeight);
		dimensionInfo.set('length', masterItem.actLength);
		dimensionInfo.set('width', masterItem.actWidth);
		dimensionInfo.set('dimensionRemark', masterItem[0].data.dimensionRemark);
		dimensionInfo.set('callSeq', masterItem[0].data.callSeq);
		dimensionInfo.set('callYear', masterItem[0].data.callYear);
		dimensionInfo.set('vslCallId', masterItem[0].data.vslCallId);
		dimensionInfo.set('vslCd', masterItem[0].data.vslCd);
		
		if(masterItem.vslCd != null && masterItem.vslCd != ''){
			dimensionInfo.set('vslCd', masterItem.vslCd);
		}else{
			dimensionInfo.set('vslCd', masterItem.vslCode);
		}
	},
	
	onSave: function(){
		var me = this;
		var refs = me.getReferences();
		
		var dimensionInfo = me.getViewModel().get('theDimensionHHT');
		var parentView = me.getParentView();
		var dimensionStore  = parentView.viewModel.get('dimensionStore');				
		var record = Ext.create('MOST.model.operation.DimensionCheck');
		var dimensionList = new Array();
		var theDimensionStore = me.getStore('theDimensionStore');
		var chkDt = refs.refChkDt.getValue();
		
//		record.set('actHeight', dimensionInfo.get('actHeight'));
//		record.set('actLength', dimensionInfo.get('actLength'));
//		record.set('actWidth', dimensionInfo.get('actWidth'));
//		record.set('checkTime', chkDt);
//		record.set('vslCallId', dimensionInfo.get('vslCallId'));
//		record.set('vslCd', dimensionInfo.get('vslCd'));
//		record.set('callYear', dimensionInfo.get('callYear'));
//		record.set('callSeq', dimensionInfo.get('callSeq'));
//		if(dimensionInfo.get('blNo') == null || dimensionInfo.get('blNo') == ''){
//			record.set('cgNo', dimensionInfo.get('cgNo'));
//			record.set('ixCd', 'E');
//		}else{
//			record.set('cgNo', dimensionInfo.get('blNo'));
//			record.set('ixCd', 'I');
//		}
//		record.set('jobNo', dimensionInfo.get('jobNo'));
//		record.set('catgCd', dimensionInfo.get('catgCd'));
//		record.set('dimensionRemark', refs.refRemarkTextField.getValue());
//		record.set('userId', MOST.config.Token.getUserId());
//		record.set('workingStatus', WorkingStatus.INSERT);
//
//		dimensionStore.insert(0, record);
//		//dimensionStore.commitChanges();
		
		
		if(parentView.reference != null || me.getParentView().xtype == 'app-gateoperations'){
			if(dimensionStore != null){
				dimensionStore.removeAll();
			}
			
			record.set('actHeight', dimensionInfo.get('actHeight'));
			record.set('actLength', dimensionInfo.get('actLength'));
			record.set('actWidth', dimensionInfo.get('actWidth'));
			record.set('checkTime', dimensionInfo.get('checkTime'));
			record.set('vslCallId', dimensionInfo.get('vslCallId'));		
			
			if(dimensionInfo.get('vslCd') != null && dimensionInfo.get('vslCd') != ''){
				record.set('vslCd', dimensionInfo.get('vslCd'));
			}else{
				record.set('vslCd', dimensionInfo.get('vslCode'));
			}
			
			record.set('callYear', dimensionInfo.get('callYear'));
			record.set('callSeq', dimensionInfo.get('callSeq'));
			record.set('cgNo', dimensionInfo.get('cgNo'));
			record.set('ixCd', dimensionInfo.get('ixCd'));
			record.set('jobNo', dimensionInfo.get('jobNo'));
			record.set('catgCd', dimensionInfo.get('catgCd'));
			record.set('dimensionRemark', refs.refRemarkTextField.getValue());
			record.set('userId', MOST.config.Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);

		}else{
			record.set('actHeight', refs.ctlActHeight.getValue());
			record.set('actLength', refs.ctlActLength.getValue());
			record.set('actWidth', refs.ctlActWidth.getValue());
			record.set('checkTime', refs.refChkDt.getValue());
			record.set('vslCallId', dimensionInfo.get('vslCallId'));
			record.set('vslCd', dimensionInfo.get('vslCd'));
			record.set('callYear', dimensionInfo.get('callYear'));
			record.set('callSeq', dimensionInfo.get('callSeq'));
			record.set('cgNo', refs.refFindGPTextField.getValue());
			record.set('dimensionRemark', refs.refRemarkTextField.getValue());
			record.set('userId', MOST.config.Token.getUserId());
			record.set('workingStatus', WorkingStatus.INSERT);
			
		}
		
		dimensionStore.insert(0, record);
		//dimensionStore.commitChanges();
		
		var win = me.getView().up('window');
		if (win) {
			win.close();
		}
	},
	
	onSearchGLBL:function(){;
		var me = this;
		var refs = me.getReferences();
		var jpvcNo = refs.refJpvcText.getValue();
		var params = {
			title: 'SN/BL Code',
			vslCallId : jpvcNo
		};		
		ViewUtil.openCodePopup(this, 'app-glblpopuphht', 'refFindGRBLTextField', params);
	},
	
	onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();

		if(radioField.getValue()=='JPVC'){
			refs.refJpvcText.setDisabled(true);
		}else{
			refs.refJpvcText.setDisabled(false);
			refs.refJpvcText.setValue(null);
		}			
 	},
 	
 	onCloseWin :function(){
 		var me = this; 
		var window = me.getView().up('window');
		window.returnValue = "success"
		window.close();
 	},
});