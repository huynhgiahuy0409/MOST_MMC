Ext.define('MOST.view.planning.NonManifestedCargoOfGcController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
    ],

	alias: 'controller.nonmanifestedcargoofgc',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refNonManifestedCargoOfGcGrid',  // Main Grid Name 
	MAIN_STORE_NAME: 'nonManifestedCargoOfGc',			// Main Store Name
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
		var searchParm = Ext.create('MOST.model.planning.NonManifestedCargoOfGc');
		var recvData = me.getView().recvData;
		
		me.setSearchParm(searchParm);
		me.getViewModel().setData({theSearch:searchParm});
		me.updateViewStyle(me.getView());
		
	    if(recvData === undefined) {
			recvData = Ext.create('MOST.model.planning.NonManifestedCargoOfGc');
		}
		
		me.getViewModel().setData({theDetail:recvData});
	},
	
	onRegisterLoad: function() {
		var me = this;
		var refs = me.getReferences();
		var recvData = me.getView().recvData;
		var shiftStore = me.getStore('getShiftInforStore');
		if(recvData){
			var nonManifestedItem = Ext.create('MOST.model.planning.NonManifestedCargoOfGc');
			if(recvData.vslCallId != null && recvData.vslCallId != ''){
				nonManifestedItem.set('vslCallId', recvData.vslCallId);
			}
			if(recvData.shftId != null && recvData.shftId != ''){
				shiftStore.load({
					params: {
						shftId: recvData.shftId,
						shftDt: recvData.shftDt
					},
					callback: function(records, operation, success) {
						if (success) {
							nonManifestedItem.set('hdlInStDt', Ext.util.Format.date(records[0].get('hdlInStDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
							nonManifestedItem.set('hdlInEndDt', Ext.util.Format.date(records[0].get('hdlInEndDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
						}
					}
				});
			}
		}
		
		me.getViewModel().setData({theDetail:nonManifestedItem});
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	
	onSearch: function() {
		var me = this;
     	var refs = me.getReferences();
     	var store = this.getStore(me.MAIN_STORE_NAME);
     	var params = me.getSearchCondition();
     	
     	if(refs.ctlJpvc.getValue() == ''){
     		MessageUtil.warning("Non Manifested Cargo Of Gc", "customsCargoReleaseControl_vslCallId_msg");
     		return;
     	}
    	
    	me.onDetailClear();
    	
    	if(params == null){
    		return;
    	}
    	
		store.load({
			params: params,
			callback: function(records, operation, success) {
				if (success) {
					if(records.length === 0){
						MessageUtil.noMatchData();
					}
				}
			}
		});
	},
	
	onCellClick:function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore(me.MAIN_STORE_NAME);
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var grCombo = refs.refDtlGrNo;
		var snCombo = refs.refDtlSnNo;
		var blCombo = refs.refDtlSubBlNo;
		
		if(selection == null) return;
		
		me.rowIndex = rowIndex;
		
		refs.refsUpdateBtn.setDisabled(false);
		refs.refsRemoveBtn.setDisabled(false);
		
		if(selection.data.catgCd == CodeConstants.MT_CATGTP_I){
			snCombo.setValue('');
			grCombo.setValue('');
			
			blCombo.setDisabled(false);
			grCombo.setDisabled(true);
			snCombo.setDisabled(true);
		}else{
			blCombo.setValue('');
			
			blCombo.setDisabled(true);
			grCombo.setDisabled(false);
			snCombo.setDisabled(false);
			
			var searchParm = me.getViewModel().get('theSearch');
			var grStore = me.getStore('grItems');
			
			grStore.load({
				params: {
					vslCallId : searchParm.data.vslCallId,
					snNo: selection.data.linkageBlSnNo
				}
			});
		}
		
		me.getViewModel().setData({theDetail:selection});
		
		refs.refTxtOriginalCgNo.setEditable(false);
		refs.refMt.setEditable(false);
		refs.refM3.setEditable(false);
		refs.refQty.setEditable(false);
	},
	
		
	onRefresh:function(){
		var me = this;
		var refs = me.getReferences();
		var store = this.getStore(me.MAIN_STORE_NAME);
		
		store.removeAll();
		
		refs.ctlJpvc.setValue("");
		refs.ctlSubBlNoCombo.setValue("");
		refs.ctlSnCombo.setValue("");
		
		me.onDetailClear();
	},
	
	
	onUpdate: function(){
		var me = this;
		var phantom =  false;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(refs.refDtlSubBlNo.getValue() == '' && refs.refDtlGrNo.getValue() == ''){
			MessageUtil.show(Ext.Msg.INFO,'update' ,'updateMandatory_msg','');
			return;
		}
		
		if(refs.refDtlSubBlNo.getValue() != '' && refs.refDtlSubBlNo.getValue() == detailItem.get('orgCgNo')){
			MessageUtil.show(Ext.Msg.INFO,'update' ,'updateDuplicate_msg','');
			return;
		}
		
		if(refs.refDtlGrNo.getValue() != '' && refs.refDtlGrNo.getValue() == detailItem.get('orgCgNo')){
			MessageUtil.show(Ext.Msg.INFO,'update' ,'updateDuplicate_msg','');
			return;
		}
		
		var validationStore = me.getStore('deleteValidation');
		
		if(detailItem.data.nonManifestedStatus == "L"){
			validationStore.load({
				params: {
					vslCallId: detailItem.data.vslCallId,
					cgNo: detailItem.data.currentCgNo
				},
				callback: function(records, operation, success) {
					if (records.length > 0 ) {
						var isValid = records[0].get('isDeleteValidated');

	                    if(isValid == 'N'){
	                    	MessageUtil.show(Ext.Msg.INFO,'update' ,'deleteValidation_msg','');			
	                    }else
	                    	me.saveProcess(phantom);
					}
				}
			});
		}else{
			me.saveProcess(phantom);
		}
	},
	
	onAdd: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParams = {};
		var title = 'Registering Non-Manifested Cargo';
		
		if(refs.ctlJpvc.getValue() != null && refs.ctlJpvc.getValue() != ''){
			searchParams['vslCallId'] = refs.ctlJpvc.getValue();
		}else{
			MessageUtil.warning("Registering Non-Manifested Cargo", "importexportreconcileliquid_jpvc_require_msg");
     		return;
		}
		
		me.getView().detailViewAlias = 'app-nonmanifestedcargoregister';
		me.openDetailPopup(searchParams, title);
	},
	
	saveProcess : function(phantom){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var detailItem = me.getViewModel().get('theDetail');
		var detailView = me.getDetailBizView();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		if(detailItem.data.catgCd == CodeConstants.MT_CATGTP_I)
			detailItem.data.linkageCgNo = refs.refDtlSubBlNo.getValue();
		else if(detailItem.data.catgCd == CodeConstants.MT_CATGTP_E)
			detailItem.data.linkageCgNo = refs.refDtlGrNo.getValue();
		
		detailItem.set("userId",MOST.config.Token.getUserId());

		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('item', detailItem.data);
		updateParm.phantom = phantom;
		updateParm.save({
			success:function(record){
				detailItem.set('version', record.get('newVersion'));
				detailItem.commit();
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							me.onSearch();
						}
				});
			}
		});
	},
	
	onRemove: function(){
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var validationStore = me.getStore('deleteValidation');
		var isDeleteValidation = false;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(selection.data.nonManifestedStatus == "L"){
			validationStore.load({
				params: {
					vslCallId: selection.data.vslCallId,
					cgNo: selection.data.linkageBlSnNo
				},
				callback: function(records, operation, success) {
					if (records.length > 0 ) {
						var isValid = records[0].get('isDeleteValidated');

	                    if(isValid == 'N'){
	                    	MessageUtil.show(Ext.Msg.INFO,'delete' ,'deleteValidation_msg','');			
	                    }else
	                    	MessageUtil.question('remove', 'deleteLinked_msg', null,
                				function(button){
                					if (button === 'ok') {
                						me.deleteProcess(selection);
                					}
                				}
                			);
					}
				}
			});
		}else{
			MessageUtil.question('remove', 'infodelete_msg', null,
				function(button){
					if (button === 'ok') {
						me.deleteProcess(selection);
					}
				}
			);
		}
    },
    
    deleteProcess: function(selection){
    	var me = this;
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var store = me.getStore(me.MAIN_STORE_NAME);
		var deleteItems = new Array();
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		deleteItems.push(selection.data);
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = false;
		updateParm.drop();
		updateParm.set('workingStatus', WorkingStatus.DELETE);
		updateParm.set('items', deleteItems);
		updateParm.save({
			success : function(record, operation) {
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
					function(button){
						if (button === 'ok') {
							updateParm.commit();
							store.reload();
						}
				});
			}
		});
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
     	var store = me.getStore(me.MAIN_STORE_NAME);
    	var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
    	var pageNo = store.currentPage;
    	var sizePerPage = CommonConstants.PAGE_SIZE;
    	var searchParm = me.getViewModel().get('theSearch');
    	var params = me.createParam(searchParm);

        params['vslCallId'] = searchParm.data.vslCallId;
		params['blNo'] = searchParm.data.blNo;
		params['snNo'] = searchParm.data.snNo;
		params['pageNo'] = pageNo;
		params['sizePerPage'] = sizePerPage;
		params['sort'] = grid.getSortString();
     	
    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var detailItem = me.getView().getViewModel().get('theDetail');
		var refs = me.getReferences();
		
		if(targetControl === 'ctlJpvc'){
			var grItems = me.getStore('grItems');

			refs.refDtlSubBlNo.setDisabled(false);
			refs.refDtlGrNo.setDisabled(false);
			refs.refDtlSnNo.setDisabled(false);
			
			grItems.removeAll();
			
			me.onDetailClear();
			
			if(returnValue){
				me.getBlList();
				
				refs.refDtlSubBlNo.setDisabled(false);
				refs.refDtlSnNo.setDisabled(true);
				refs.refDtlGrNo.setDisabled(true);
				
			}else{
				var blStore = me.getStore('blItems');
				var snStore = me.getStore('snItems');
				blStore.removeAll();
				snStore.removeAll();
			}
		}else if(targetControl === 'refLocation'){
			refs.refLocation.setValue(returnValue.data.locId);
		}else if(targetControl === 'ctlNonManifestedLocId'){
			refs.ctlNonManifestLocId.setValue(returnValue.data.locId);
		}
	},
	
	getBlList: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('orgBlItems');
		
		store.load({
			params: {
				vslCallId : searchParm.data.vslCallId
			}
		});
	},
	
	getSnList: function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = me.getStore('snItems');
		
		store.load({
			params: {
				vslCallId : searchParm.data.vslCallId
			}
		});
	},
	
	onDetailClear:function(){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var store = this.getStore(me.MAIN_STORE_NAME);
		var orgBlItems = me.getStore('orgBlItems');
		
		me.onLinkageInfoClear();
		
		refs.refOriginalCgNo.setValue("");
		refs.refMt.setValue("");
		refs.refM3.setValue("");
		refs.refQty.setValue("");
		refs.refLocation.setValue("");
		refs.refDtlSubBlNo.value ="";
		refs.refDtlRemark.setValue("");
		
		refs.refTxtOriginalCgNo.setEditable(true);
		refs.refsUpdateBtn.setDisabled(true);
		refs.refsRemoveBtn.setDisabled(true);
		refs.refDtlSubBlNo.setDisabled(false);
		
		orgBlItems.load({
			params: {
				vslCallId : searchParm.data.vslCallId,
			}
		});
	},
	
	onLinkageInfoClear:function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.refCategory.setValue('');
		refs.refCargoType.setValue('');
		refs.refMasterBlBookkingNo.setValue('');
		refs.refDeliveryMode.setValue('');
		refs.refCommodity.setValue('');
		refs.refCommodityNm.setValue('');
		refs.refSha.setValue('');
		refs.refShaNm.setValue('');
		refs.refFwd.setValue('');
		refs.refFwdNm.setValue('');
		refs.refCns.setValue('');
		refs.refCnsNm.setValue('');
	},
	
	onSelectSnNo: function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		var searchParm = me.getViewModel().get('theSearch');
		var grStore = me.getStore('grItems');
		
		me.onLinkageInfoClear();
		
		refs.refDtlSubBlNo.setValue("");
		
		refs.refCategory.setValue(newValue.data.catgNm);
		refs.refCargoType.setValue(newValue.data.cgTpNm);
		refs.refMasterBlBookkingNo.setValue(newValue.data.txtDocNo);
		refs.refDeliveryMode.setValue(newValue.data.delvTpNm);
		refs.refCommodity.setValue(newValue.data.cmdtCd);
		refs.refCommodityNm.setValue(newValue.data.cmdtNm);
		refs.refSha.setValue(newValue.data.shaCd);
		refs.refShaNm.setValue(newValue.data.shaNm);
		refs.refFwd.setValue(newValue.data.fwdCd);
		refs.refFwdNm.setValue(newValue.data.fwdNm);
		refs.refCns.setValue(newValue.data.cnsCd);
		refs.refCnsNm.setValue(newValue.data.cnsNm);
		
		if(newValue.data.cgTpCd == CodeConstants.MT_CGTP_BB)
			refs.refQty.setAllowBlank(false);
		else
			refs.refQty.setAllowBlank(true);
		
		grStore.load({
			params: {
				vslCallId : searchParm.data.vslCallId,
				snNo: newValue.data.cd
			}
		});
	},
	
	onSelectBLSNNo: function(field, newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		me.onLinkageInfoClear();
		refs.refDtlSnNo.setValue("");
		refs.refDtlGrNo.setValue("");
		
		if(selection == null){
			MessageUtil.warning("Non Manifested Cargo Of Gc", "rehandleoperation_grid_selection_empty_msg");
			return;
		}
		
		selection.set('linkageBlSnNo',newValue.data.cd);

		refs.refCategory.setValue(newValue.data.catgNm);
		refs.refCargoType.setValue(newValue.data.cgTpNm);
		refs.refBLMt.setValue(newValue.data.wgt);
		refs.refBLM3.setValue(newValue.data.m3);
		refs.refBLQty.setValue(newValue.data.pkgQty);
		refs.refDeliveryMode.setValue(newValue.data.delvTpNm);
		refs.refCommodity.setValue(newValue.data.cmdtCd);
		refs.refCommodityNm.setValue(newValue.data.cmdtNm);
		refs.refSha.setValue(newValue.data.shaCd);
		refs.refShaNm.setValue(newValue.data.shaNm);
		refs.refFwd.setValue(newValue.data.fwdCd);
		refs.refFwdNm.setValue(newValue.data.fwdNm);
		refs.refCns.setValue(newValue.data.cnsCd);
		refs.refCnsNm.setValue(newValue.data.cnsNm);
		
		if(newValue.data.cgTpCd == CodeConstants.MT_CGTP_BB)
			refs.refQty.setAllowBlank(false);
		else
			refs.refQty.setAllowBlank(true);
	},
	
	onWarehouseAllocation: function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var control = me.lookupReference(controlName);
		var title = 'Warehouse Allocation';
		var selection;
		var orgCgNo = '';
		
		if(	refs.refMt.getValue() <= 0){
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please input location amount',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			
			return;
		}
		
		orgCgNo = refs.refTxtOriginalCgNo.getValue();
		
		selection = Ext.create('MOST.model.operation.CargoHandlingIn', {
			vslCallId: refs.ctlJpvc.getValue(),
			whTpCd: CodeConstants.INVLOC_WH_TP_NORMAL,
			cgNo: orgCgNo,
			grMt: refs.refMt.getValue(),
			grM3: refs.refM3.getValue(),
			grQty: refs.refQty.getValue(),
			catgCd : detailItem.get('catgCd')
		});
		
		me.openCodePopup('app-warehouseallocation',controlName, selection);
	},
	
	// WarehouseAllocation in register popup
	onWarehouseRegisterAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var selection;
		
		if(controlName === 'ctlNonManifestedLocId'){
			if(	refs.ctlWhMT.getValue() <= 0){
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'Please input location amount',
				    width : 300,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.INFO
				});	
				
				return;
			}
			
			selection = Ext.create('MOST.model.planning.NonManifestedCargoOfGc', {
				vslCallId: detailItem.get('vslCallId'),
				whTpCd: CodeConstants.INVLOC_WH_TP_NORMAL,
				grMt: refs.ctlWhMT.getValue(),
				grM3: refs.ctlWhM3.getValue(),
				grQty: refs.ctlWhQty.getValue(),
				title: 'Warehouse Allocation'
			});
		}
		
		me.openCodePopup('app-warehouseallocation',controlName, selection);		
	},
	
	onWarehouseDetailRegisterAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var selection;
		
		if(controlName === 'ctlNonManifestedLocId'){
			if(refs.ctlWhMT.getValue() <= 0){
				Ext.MessageBox.show({
			        title : 'Messsage',
				    msg : 'Please input location amount',
				    width : 300,
				    buttons : Ext.MessageBox.OK,
				    icon : Ext.MessageBox.INFO
				});
				
				return;
			}
			
			selection = Ext.create('MOST.model.planning.NonManifestedCargoOfGc', {
				vslCallId: detailItem.get('vslCallId'),
				whTpCd: CodeConstants.INVLOC_WH_TP_NORMAL,
				grMt: refs.ctlWhMT.getValue(),
				grM3: refs.ctlWhM3.getValue(),
				grQty: refs.ctlWhQty.getValue(),
				title: 'Warehouse Allocation',
				catgCd : CodeConstants.MT_CATGTP_I
			});
		}
		
		me.openCodePopup('app-warehouseallocation',controlName, selection);		
	},
	
	onSave: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var window = me.getView().up('window');
		var store = me.getStore('nonManifestRegisterStore');
		var proxy = detailItem.getProxy();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		detailItem.set('hdlInStDt', Ext.util.Format.date(detailItem.get('hdlInStDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		detailItem.set('hdlInEndDt', Ext.util.Format.date(detailItem.get('hdlInEndDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		
		proxy.url = store.getProxy().url;
		
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(detailItem.data);	
		updateParm.save({
			success : function(){
				MessageUtil.saveSuccess(); // Success Message
				window.close();
			}
		});
	},
	
	onRegisterSave: function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var recvData = me.getView().recvData;
		var window = me.getView().up('window');
		var store = me.getStore('nonManifestRegisterStore');
		var proxy = detailItem.getProxy();
		var isCreated = detailItem.phantom;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		proxy.url = store.getProxy().url;
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		
		if(recvData.shftId == null || recvData.shftId == ''){
			detailItem.set('hdlInStDt', Ext.util.Format.date(detailItem.get('hdlInStDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
			detailItem.set('hdlInEndDt', Ext.util.Format.date(detailItem.get('hdlInEndDt'),MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
		}
		
		updateParm.getProxy().url = proxy.url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('items', new Array());
		
		updateParm.get('items').push(detailItem.data);	
		updateParm.save({
			success : function(){
				MessageUtil.saveSuccess(); // Success Message
				window.close();
			}
		});
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		
		window.close();
	},
	
	openVslCallListPopup: function(){
    	var me = this;
		me.openCodePopup('popup-vesselcalllistpopup', 'ctlJpvc');
    },
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});