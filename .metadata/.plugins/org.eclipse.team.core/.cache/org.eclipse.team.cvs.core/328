Ext.define('MOST.view.document.VesselScheduleDetailController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.vesselscheduledetail',
	
	VIEW_TYPE_CREATE : 'CREATE',
	VIEW_TYPE_UPDATE : 'UPDATE',
	VIEW_TYPE_COPY : 'COPY',
	USER_TYPE_INTERNAL : "I", 				// MOST.config.Token.getUserType()\
	USER_TYPE_EXTERNAL : "E", 				// MOST.config.Token.getUserType()
	CURRENT_VIEW_TYPE : '',
	MAX_DATE_PERIOD : 15,	// MAX PERIOD DATE
	MAIN_GRID_REF_NAME: 'refVesselScheduleGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'vesselScheduleList',
	DETAIL_STORE_NAME: 'vesselScheduleDetail',
	
	BERTH_ALONGSIDE_COMBO_STORE: 'berthAlongSideCombo',
	CARGO_OPERATION_TYPE_COMBO: 'cgOpTypeCombo',
	/**
	 * EVENT HANDLER DETAIl START
	 * =========================================================================================================================
	 */
	onDetailLoadVsl: function(){
		var me = this;
		var refs = me.getReferences();
		var purposeStrore = me.getStore('purpCallCombo');
		var cargoTypeStore = me.getStore('cargoTypeCombo');
		var detailItemStore = me.getStore(me.DETAIL_STORE_NAME);
		var prePortStore = me.getStore('prvPortList');
		var recvData = null;
		var detailView = null;
		var infoForm = null;
		var userType = MOST.config.Token.getUserType();
		
		me.setComboBoxWithLocalCache(CacheServiceConstants.BERTH_ALONG_SIDE_COMBOBOX, me.BERTH_ALONGSIDE_COMBO_STORE);
		me.setComboBoxWithLocalCache(CacheServiceConstants.CARGO_OPERATION_TYPE_COMBO, me.CARGO_OPERATION_TYPE_COMBO);
		
		purposeStrore.load();
		cargoTypeStore.load();
		
		if(userType == me.USER_TYPE_EXTERNAL){
			refs.ctlAta.setReadOnly(true);
			refs.ctlAtd.setReadOnly(true);
		}else{
			refs.ctlAta.setReadOnly(false);
			refs.ctlAtd.setReadOnly(false);
		}
		
		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
			refs.refBtnSave.setHidden(true);
		}else{
			refs.refBtnSave.setHidden(false);
		}
		
		refs.refBtnSave.setHidden(true);
		refs.refBtnCancel.setHidden(true);
		
		detailView = me.getView();
		recvData = me.getView().recvData;
		me.getViewModel().setData({theVslSchl: new Ext.create('MOST.model.document.VesselScheduleRegister')});
		me.getViewModel().setData({theVslSchl: recvData});

		var vslItem = me.getViewModel().getData().theVslSchl;
		
		me.validStatus(me, vslItem.get('summitStat'));
		
		if(vslItem.get('vslPartiItem').vslTp == CodeConstants.VC_VSLTP_BRGE){
			refs.refDomesticChk.setValue(true);
		}
		
		infoForm = detailView.getForm();
		infoForm.isValid();
	},
	onCheckDateRule: function(datetimefield, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		var ata = refs.ctlAta.getValue();
		var atb = refs.ctlAtb.getValue();
		var atu = refs.ctlAtu.getValue();
		var atd = refs.ctlAtd.getValue();
		
		if (datetimefield.reference === 'ctlAta') {
	        if (ata !== null) {
	        	if (atb !== null && ata > atb) {
	        		MessageUtil.alert('Warning', 'ATB must greater than ATA.');
	        		refs.ctlAta.setValue('');
	        		return false;
	        	} else if (atu !== null && ata > atu) {
	        		MessageUtil.alert('Warning', 'ATU must greater than ATA.');
	        		refs.ctlAta.setValue('');
	        		return false;
	        	} else if (atd !== null && ata > atd) {
	        		MessageUtil.alert('Warning', 'ATD must greater than ATA.');
	        		refs.ctlAta.setValue('');
	        		return false;
	        	}
	        }
	    } else if (datetimefield.reference === 'ctlAtb') {
	    	 if (atb !== null) {
		        	if (ata !== null && atb < ata) {
		        		MessageUtil.alert('Warning', 'ATB must greater than ATA.');
		        		refs.ctlAtb.setValue('');
		        		return false;
		        	} else if (atu !== null && atb > atu) {
		        		MessageUtil.alert('Warning', 'ATU must greater than ATB.');
		        		refs.ctlAtb.setValue('');
		        		return false;
		        	} else if (atd !== null && atb > atd) {
		        		MessageUtil.alert('Warning', 'ATD must greater than ATB.');
		        		refs.ctlAtb.setValue('');
		        		return false;
		        	}
		        }
	    } else if (datetimefield.reference === 'ctlAtu') {
	    	if (atu !== null) {
	        	if (ata !== null && atu < ata) {
	        		MessageUtil.alert('Warning', 'ATU must greater than ATA.');
	        		refs.ctlAtu.setValue('');
	        		return false;
	        	} else if (atb !== null && atu < atb) {
	        		MessageUtil.alert('Warning', 'ATU must greater than ATB.');
	        		refs.ctlAtu.setValue('');
	        		return false;
	        	} else if (atd !== null && atu > atd) {
	        		MessageUtil.alert('Warning', 'ATD must greater than ATU.');
	        		refs.ctlAtu.setValue('');
	        		return false;
	        	}
	        }
	    } else if (datetimefield.reference === 'ctlAtd') {
	    	if (atd !== null) {
	        	if (ata !== null && atd < ata) {
	        		MessageUtil.alert('Warning', 'ATD must greater than ATA.');
	        		refs.ctlAtd.setValue('');
	        		return false;
	        	} else if (atb !== null && atd < atb) {
	        		MessageUtil.alert('Warning', 'ATD must greater than ATB.');
	        		refs.ctlAtd.setValue('');
	        		return false;
	        	} else if (atu !== null && atd < atu) {
	        		MessageUtil.alert('Warning', 'ATD must greater than ATU.');
	        		refs.ctlAtd.setValue('');
	        		return false;
	        	}
	        }
	    }
	},
	
	
	
	onDetailSave: function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getView();
		var recvData = detailView.recvData;
		var detailStore = this.getStore(me.DETAIL_STORE_NAME);
		var date = new Date();
		var curYear = date.getFullYear();
		var berthLoc = refs.cboBerthLoc.getValue();
		var statusCrud = '';
		var eta = refs.ctlEta.getValue();
		var etaString = eta==null?null:Ext.Date.format(eta, MOST.config.Locale.getShortDate());
		var etd = refs.ctlEtd.getValue();
		var etdString = etd==null?null:Ext.Date.format(etd, MOST.config.Locale.getShortDate());
		var etw = refs.ctlEtw.getValue();
		var etb = refs.ctlEtb.getValue();
		
		if (etw === null && etb !== null) {
		    if (!(eta < etb && etb < etd)) {
		        MessageUtil.alert('Warning', 'The rule ETA < ETB < ETW < ETD is not satisfied.');
				return false;
		    } 
		} else if (etb === null && etw !== null) { 
			if (!(eta < etw && etw < etd)) {
				MessageUtil.alert('Warning', 'The rule ETA < ETB < ETW < ETD is not satisfied.');
				return false;
			}
		}
			else if (etb === null && etw === null) {
				if (eta > etd) {
					MessageUtil.alert('Warning', 'The rule ETA < ETB < ETW < ETD is not satisfied.');
					return false;
				}
			}
		 else if (etb !== null && etw !== null){ 
			if (!(eta < etb && etb < etw && etw < etd)) {
				MessageUtil.alert('Warning', 'The rule ETA < ETB < ETW < ETD is not satisfied.');
				return false;
			}
		}
//		if(StringUtil.isNullorEmpty(berthLoc)){
//			MessageUtil.alert('warning', 'vslschlBerthLocation_empty');
//			return false;
//		}else{
//			var berthWh = refs.cboBerthWharf.getValue();
//			
//			if(StringUtil.isNullorEmpty(berthWh)){
//				MessageUtil.alert('warning', 'vslschlBerthLocation_empty');
//				return false;
//			}
//		}
		var berthWh = refs.cboBerthWharf.getValue();
		
		if(StringUtil.isNullorEmpty(berthWh)){
			MessageUtil.alert('warning', 'vslschlBerthLocation_empty');
			return false;
		}
		
		if(me.CURRENT_VIEW_TYPE !=='UPDATE'){
			if (eta < date || etd < date){
				MessageUtil.alert('warning', 'vslschlETAorETDLessThanCurr_msg');
				return false; 
			} 
		} 
		
		if (me.CURRENT_VIEW_TYPE !=='CREATE'){
			if ((eta < date && eta <etd) || (date < eta < etd)){
				var eta = refs.ctlEta.getValue()
			} else {
				MessageUtil.alert('warning', 'vslschlETALessThanCurrentDt_msg');
				return false;
			}
		}

		if(etd < date && me.CURRENT_VIEW_TYPE !=='UPDATE'){
			MessageUtil.alert('warning', 'vslschlETDLessThanCurrentDt_msg');
			return false; 
		}
		
		if(StringUtil.isNullorEmpty(etaString)){
			MessageUtil.alert('warning', 'vslschlETA_empty');
			return false;
		}
		
		if(StringUtil.isNullorEmpty(etdString)){
			MessageUtil.alert('warning', 'vslschlETD_empty');
			return false;
		}
		
		statusCrud = me.getView().recvData.get('crud');

		if (statusCrud == 'C') {
			var model = me.getViewModel().getData().theVslSchl;
			var eta = refs.ctlEta.getValue();
			var etaString = eta == null ? null : Ext.Date.format(eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var etd = refs.ctlEtd.getValue();
			var etdString = etd == null ? null : Ext.Date.format(etd, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var ata = refs.ctlAta.getValue();
			var ataString = ata == null ? null : Ext.Date.format(ata, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var atd = refs.ctlAtd.getValue();
			var atdString = atd == null ? null : Ext.Date.format(atd, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var atb = refs.ctlAtb.getValue();
			var atbString = atb == null ? null : Ext.Date.format(atb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var atu = refs.ctlAtu.getValue();
			var atuString = atu == null ? null : Ext.Date.format(atu, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var portStore = me.getStore('prvPortList');
			var callYear = model.get('callYear');
			var vslCd = model.get('vslCd');
			var duplicateStt = false;
			var portArr = new Array();
			var txtOutVoyage = model.get('outbVoy');
			
			model.set('eta', etaString);
			model.set('etd', etdString);
			model.set('ata', ataString);
			model.set('atd', atdString);
			model.set('atb', atbString);
			model.set('atu', atuString);
			model.set('rqQtyBkr', refs.rdQtyBunker.getValue().QtyBkr);
			model.set('rqChangdelling', refs.rdChandelling.getValue().rbChdl);
			model.set('rqFreshWt', refs.rdFreshWater.getValue().rbFWt);
			model.set('updUsrId', MOST.config.Token.getUserId());
			model.set('copyStt', 'C');
			model.set('insUsrId', MOST.config.Token.getUserId());
			model.set('updUsrId', MOST.config.Token.getUserId());
			model.set('summitStat', 'ST');
			model.set('domesticChk', refs.refDomesticChk.checked ? 'Y' : 'N');
			
			if(!StringUtil.isNullorEmpty(MOST.config.Token.getPtnrCode())){
				model.set('ptnrCd', MOST.config.Token.getPtnrCode());
			}else{
				model.set('ptnrCd', model.get('arrvSaId'));
			}
			
			if(StringUtil.isNullorEmpty(callYear)){
				callYear = date.getFullYear();
				model.set('callYear', callYear);
			}
		
			if(me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_COPY){
				tmpVslCalId = callYear.toString().substr(2) + vslCd + '-' + txtOutVoyage;;
				model.set('vslCallId', tmpVslCalId);
			}
			
			detailView.items.get(0).vslCd = model.get('vslCd');
			detailStore.insert(0, model);
			
			if (refs.txtJPVC.getValue() === null) {
			    if (me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY) {
			        MessageUtil.alert('warning', 'vslschlJPVCEmpty_msg');
			        return false;
			    }
			} else if (refs.txtJPVC.getValue() === '') {
			    if (me.CURRENT_VIEW_TYPE === me.VIEW_TYPE_COPY) {
			        MessageUtil.alert('warning', 'vslschlJPVCNull_msg');
			        return false;
			    }
			}else{
				var vslCallId = model.get('vslCallId');
				var duplicateVesselCallIdStore = me.getStore('duplicateVesselCallIdStore');
				
				if(StringUtil.isNullorEmpty(vslCallId) && me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_COPY){
					vslCallId = model.get('vslCallId');
				}
				
				duplicateVesselCallIdStore.load({
					params:{
						vslCallId: vslCallId
					},
					callback: function(records, ope, success){
						if(success){
							if(records.length>0){
								duplicateStt = true;
								if(duplicateStt == true){
									MessageUtil.alert('warning', 'vslschlJPVCNoDuplicate_msg');
									return false;
								}
							}else{
								me.saveProcess(detailStore);
							}
						}
					}
				});
			}
		} else if (statusCrud == 'U'){
			var model = me.getViewModel().getData().theVslSchl;
			var eta = refs.ctlEta.getValue();
			var etaString = eta==null?null:Ext.Date.format(eta, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var etd = refs.ctlEtd.getValue();
			var etdString = etd==null?null:Ext.Date.format(etd, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var ata = refs.ctlAta.getValue();
			var ataString = ata==null?null:Ext.Date.format(ata, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var atd = refs.ctlAtd.getValue();
			var atdString = atd==null?null:Ext.Date.format(atd, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var atb = refs.ctlAtb.getValue();
			var atbString = atb == null ? null : Ext.Date.format(atb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var atu = refs.ctlAtu.getValue();
			var atuString = atu == null ? null : Ext.Date.format(atu, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			var portStore = me.getStore('prvPortList');
			var portArr = new Array();
			
			model.set('copyStt', 'U');
			model.set('eta', etaString);
			model.set('etd', etdString);
			model.set('ata', ataString);
			model.set('atd', atdString);
			model.set('atb', atbString);
			model.set('atu', atuString);
			model.set('rqQtyBkr', refs.rdQtyBunker.getValue().QtyBkr);
			model.set('rqChangdelling', refs.rdChandelling.getValue().rbChdl);
			model.set('rqFreshWt', refs.rdFreshWater.getValue().rbFWt);
			model.set('updUsrId', MOST.config.Token.getUserId());
			model.set('domesticChk', refs.refDomesticChk.checked ? 'Y' : 'N');
			
			me.saveProcess(detailStore);
		}
	},
	
	saveProcess: function(detailStore) {
		var me = this;
		var refs = me.getReferences();
		var model = me.getViewModel().getData().theVslSchl;
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = model.phantom;
		
		updateParm.getProxy().url = detailStore.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', model.data);
		
		updateParm.save({
			success : function(records,success){
				MessageUtil.show(Ext.Msg.INFO,'success_msg' ,'savesuccess_msg','',
						function(button){
							if (button === 'ok') {
								me.onDetailLoadVsl();
								var win = Ext.WindowManager.getActive();
								if (win) {
								    win.close();
								}
							}else{
								me.onDetailLoadVsl();
								var win = Ext.WindowManager.getActive();
								if (win) {
								    win.close();
								}
							}
					});
			}
		});
	},
	
	onChangeOutVoyage:function(field, newValue){
		var me = this;
		var refs = me.getReferences();
		var tmpVslCalId = '';
		var theVslSchl = me.getViewModel().getData().theVslSchl;
		var callYear = theVslSchl.get('callYear');
		var vslCd = theVslSchl.get('vslCd');
		var txtOutVoyage = refs.txtOboundVoy.getValue();
		
		field.setValue(newValue.toUpperCase());
		
		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY && refs.txtJPVC.getValue() != ''){
			tmpVslCalId = callYear.substr(2) + vslCd + '-' + txtOutVoyage;
			refs.txtJPVC.setValue(tmpVslCalId);
		}
	},
	
	onLostFocusOutVoyage:function(rec){
		var me = this;
		var refs = me.getReferences();
		var outVoyage = refs.txtOboundVoy;
		var tmpVslCalId = '';
		var theVslSchl = me.getViewModel().getData().theVslSchl;
		var callYear = theVslSchl.get('callYear');
		var vslCd = theVslSchl.get('vslCd');
		var txtOutVoyage = refs.txtOboundVoy.getValue();
		
		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY){
			tmpVslCalId = callYear.substr(2) + vslCd + '-' + txtOutVoyage;
			theVslSchl.set('vslCallId', tmpVslCalId);
		}
	},
	
	onSelectcgTp: function(car){
		var me = this;
		var refs = me.getReferences();
		var carTp = refs.cboPurposeCall1.getValue();
		
		refs.txtLoadCargo.setValue('');
		refs.txtDischCargo.setValue('');
		refs.txtLoadQty.setValue('');
		refs.txtDischQty.setValue('');
		
		me.onHandleCgTp(carTp);
	},
	
	onSelectCargoType: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslSchl = me.getViewModel().get('theVslSchl');
	},
	
	onCellMandatorySetting: function(){
		var me = this;
		var refs = me.getReferences();
		var theVslSchl = me.getViewModel().get('theVslSchl');
		var detailView = me.getView();
		
		detailView.getForm().isValid();
	},
	/**
	 * EVENT HANDLER DETAIl END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	onSelectPurpo: function(){
		var me = this;
		var refs = me.getReferences();
		var purp = refs.cboPurpCall.getValue();
		
		me.onHandlePurp(purp);
		
		if( purp === 'OT'){
			refs.txtPurposeCall.setValue('');
			refs.txtLoadCargo.setValue('');
			refs.txtDischCargo.setValue('');
			refs.txtLoadQty.setValue('');
			refs.txtDischQty.setValue('');
		}else if(purp === 'CO'){
			refs.cboPurposeCall1.setValue('');
		}else if(purp == 'PO'){
			refs.txtLoadCargo.setValue('');
			refs.txtDischCargo.setValue('');
			refs.txtLoadQty.setValue('');
			refs.txtDischQty.setValue('');
		}
	},
	
	onSelectBerth: function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var berthWharf =  me.getStore('berthWharfCombo');
		var filterWharfCombo = me.getStore('filterWharfCombo');		
		var locArr = new Array();

		berthWharf.clearFilter();
		
		filterWharfCombo.clearData();	
		filterWharfCombo.commitChanges();
		
		berthWharf.filter([{
			filterFn: function(item) {
		    	if(item.get('selectId') == rec.get('optionValue')){
		    		locArr.push(item.data);
		    	};
		    }
    	}]);
		
		filterWharfCombo.setData(locArr);
		filterWharfCombo.commitChanges();
		
		refs.cboBerthWharf.bindStore(filterWharfCombo);
	},

	onPurposeCallRender(val){
		var me = this ;
		var purposeCallStrore = me.getStore('purpCallCombo');
		
		index = purposeCallStrore.findExact('optionValue',val);
		
		if(index != -1){
			rs = purposeCallStrore.getAt(index).data.optionName;
			return rs;
		}
	},
	
	onHandlePurp: function(purp){
		var me = this;
		var refs = me.getReferences();
		
		if(purp == 'CO'){
			refs.cboPurposeCall1.setHidden(false);
			refs.txtPurposeCall.setHidden(true);
			refs.refSpace.setHidden(true);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setEditable(false);
		}else if(purp == 'OT'){
			refs.cboPurposeCall1.setHidden(true);
			refs.txtPurposeCall.setHidden(false);
			refs.refSpace.setHidden(true);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setEditable(false);
		}else{
			refs.cboPurposeCall1.setHidden(true);
			refs.txtPurposeCall.setHidden(true);
			refs.refSpace.setHidden(false);
			
			if(purp == CodeConstants.VSLSCH_PURPCALL_PO){
				refs.txtLoadCargo.allowBlank = true;
				refs.txtLoadCargo.setEditable(false);
				refs.txtDischCargo.allowBlank = true;
				refs.txtDischCargo.setEditable(false);
				refs.txtLoadQty.allowBlank = false;
				refs.txtLoadQty.setStyle('{background-color: #B3DEF6;}');
				refs.txtLoadQty.setEditable(true);
				refs.txtDischQty.allowBlank = false;
				refs.txtDischQty.setEditable(true);
			}
		}
	},
	
	onHandleCgTp: function(carTp){
		var me = this;
		var refs = me.getReferences();
		
		if(carTp == "B"){
			refs.txtLoadCargo.setEditable(true);
			refs.txtLoadCargo.allowBlank = false;
			refs.txtLoadCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischCargo.setEditable(true);
			refs.txtDischCargo.allowBlank = false;
			refs.txtDischCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtLoadQty.setEditable(true);
			refs.txtLoadQty.allowBlank = false;
			refs.txtLoadQty.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischQty.setEditable(true);
			refs.txtDischQty.allowBlank = false;
			refs.txtDischQty.setFieldStyle('background-Color: #c6e2ff;');
			
		}else if(carTp == 'D'){
			refs.txtLoadCargo.setEditable(false);
			refs.txtLoadCargo.allowBlank = true;
			refs.txtLoadCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischCargo.setEditable(true);
			refs.txtDischCargo.allowBlank = false;
			refs.txtDischCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtLoadQty.setEditable(false);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischQty.setEditable(true);
			refs.txtDischQty.allowBlank = false;
			refs.txtDischQty.setFieldStyle('background-Color: #c6e2ff;');
		}else if(carTp == "L"){
			refs.txtLoadCargo.setEditable(true);
			refs.txtLoadCargo.allowBlank = false;
			refs.txtLoadCargo.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischCargo.setEditable(false);
			refs.txtDischCargo.allowBlank = true;
			refs.txtDischCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtLoadQty.setEditable(true);
			refs.txtLoadQty.allowBlank = false;
			refs.txtLoadQty.setFieldStyle('background-Color: #c6e2ff;');
			refs.txtDischQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setFieldStyle('background-Color: #FFFFFF;');
		}else{
			refs.txtLoadCargo.setEditable(false);
			refs.txtLoadCargo.allowBlank = true;
			refs.txtLoadCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischCargo.setEditable(false);
			refs.txtDischCargo.allowBlank = true;
			refs.txtDischCargo.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtLoadQty.setEditable(false);
			refs.txtLoadQty.allowBlank = true;
			refs.txtLoadQty.setFieldStyle('background-Color: #FFFFFF;');
			refs.txtDischQty.setEditable(false);
			refs.txtDischQty.allowBlank = true;
			refs.txtDischQty.setFieldStyle('background-Color: #FFFFFF;');
		}
	}, 
	
	onSelectEta: function(field, value){
		var me = this;
		var refs = me.getReferences();

		refs.ctlEtd.setValue(Ext.Date.subtract(value, Ext.Date.HOUR, -4));
	},
	
	validStatus: function(view, status){
		if(status == "ST"){ //submit
			this.quickChangeBtnStatus(view, true, false, true, false, false, false);
		}else if(status == "AP"){ //approve
			this.quickChangeBtnStatus(view, true, true, true, true, false, false);
		}else if(status == 'RC'){ //request cancel
			this.quickChangeBtnStatus(view, true, true, false, true, true, false);
		}else if(status == 'CC'){ //cancel
			this.quickChangeBtnStatus(view, false, false, true, true, false, true);
		}else{
			this.quickChangeBtnStatus(view, true, false, true, false, false, false);
		}
	},
	
	quickChangeBtnStatus: function(view, bSub, bApprv, bRApprv, bCancel, bSave, bCopy){
		var btnSubmit = view.lookupReference('refBtnSub');
		var btnCancel = view.lookupReference('refBtnCancel');

		btnSubmit.setHidden(bSub);
		btnCancel.setHidden(bCancel);
		btnCancel.setHidden(true);
	},
	
	onVesselDataSync: function(store,view){
		var me = this;
		var detailItemStore = me.getStore(me.DETAIL_STORE_NAME);
		var item = store.getAt(0);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		var isCreated = item.phantom;
		
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.phantom = isCreated;
		updateParm.set('workingStatus', isCreated ? WorkingStatus.INSERT : WorkingStatus.UPDATE);
		updateParm.set('item', item.data);
		
		updateParm.save({
			success : function(records,success){
				me.onDetailLoadVsl();
				MessageUtil.saveSuccess();
			}
		});
	},
	onApprove: function(btn){
		var me=this;
		var refs = me.getReferences();
		var view = refs.refVslDtlView;
		var itemDetail = me.getStore(me.DETAIL_STORE_NAME).getAt(0);
		var store = me.getStore('vesselScheduleStatus');
		
		store.insert(0, itemDetail);
		
		var item = store.getAt(0);
	
		item.set('summitStat', 'AP');
		me.onVesselDataSync(store, me);
	},
	
	onSubmit:function(btn){
		var me=this;
		var refs = me.getReferences();
		var itemDetail = me.getStore(me.DETAIL_STORE_NAME).getAt(0);
		var store = me.getStore('vesselScheduleStatus');
		
		store.insert(0, itemDetail);
		
		var item = store.getAt(0);
	
		item.set('summitStat', 'ST');
		me.onVesselDataSync(store, me);
	},
	
	onChangeInOutVoyage:function(field, newValue){
		var me = this;
		var refs = me.getReferences();
		var tmpvslCallId = '';
		var theVslSchl = me.getViewModel().getData().theVslSchl;
		var vslCd = theVslSchl.get('vslCd');
		
		var txtOutVoyage = refs.txtOboundVoy.getValue();
		var txtInVoyage =  refs.txtIboundVoy.getValue();
	
		var date = new Date();
		var curYear = date.getFullYear();
		
		if(StringUtil.isNullorEmpty(theVslSchl.get('callYear'))){
			theVslSchl.set('callYear', curYear);
		}
		
		var callYear = theVslSchl.get('callYear');
//		if(me.CURRENT_VIEW_TYPE != me.VIEW_TYPE_COPY){
//		}
		
		if((txtOutVoyage != null && txtOutVoyage != '') && (txtInVoyage != null && txtInVoyage != '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtOutVoyage;
		}
		
		if((txtOutVoyage != null && txtOutVoyage != '') && (txtInVoyage == null || txtInVoyage == '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtOutVoyage;
		}
		
		if((txtOutVoyage == null || txtOutVoyage == '') && (txtInVoyage != null && txtInVoyage != '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd + '-' + txtInVoyage;
		}
		
		if((txtOutVoyage == null || txtOutVoyage == '') && (txtInVoyage == null || txtInVoyage == '')){					
			tmpvslCallId = callYear.toString().substr(2) + vslCd;
		}
			
		refs.txtJPVC.setValue(tmpvslCallId);
		
		field.setValue(newValue.toUpperCase());
		
//		if(me.CURRENT_VIEW_TYPE == me.VIEW_TYPE_COPY && refs.txtJPVC.getValue() != ''){
//			tmpvslCallId = callYear.substr(2) + vslCd;
//		}
	},
	
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
});