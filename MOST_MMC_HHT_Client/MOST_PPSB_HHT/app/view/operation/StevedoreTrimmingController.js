Ext.define('MOST.view.controller.StevedoreTrimmingController', {
	extend: 'MOST.view.foundation.BaseViewController',
	
	requires: [
	],

	alias: 'controller.stevedoretrimming',	
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	
	MAX_HATCH_NO : 11,	// Hatch Setting
	prevAddData:{
		cgTpCd: ''
	},
	searchPtyDivCd: '',
	
	CONST_SHIPCR_NM:"Ship'sCrew",
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
		
		me.onComboRest('commonCode');
	},
	onComboRest: function(searchType){
		var me = this;
		var refs = me.getReferences();
		var stevedoreTrimmingComboSet = me.getStore('stevedoreTrimmingComboSet');
	
		stevedoreTrimmingComboSet.load({
    		params: {
    			searchType: searchType
    		},
    		callback: function(records, operation, success) {
    			if(success){
    				if(records.length > 0){
    					me.onComboStore(records[0].data);
    				}
    			}
    		}
		});
	},
	
	onInitialize:function(){
		var me = this;
		var refs = me.getReferences();

		var record =Ext.create('MOST.model.controller.StevedoreTrimming');
		me.getViewModel().set('theStevedore', record);
	},
	
	onComboStore:function(metaItem){
		var me = this;
		var refs = me.getReferences();
		var shiftCombo = me.getStore('shiftCombo');
		
		if(metaItem.shiftCombo){
			shiftCombo.setData(metaItem.shiftCombo);
			shiftCombo.insert(0, [{shftNm: 'ALL',shftId: ''}]);
			refs.ctlShiftCombo.setValue('');
		}
		
		me.onHatchDataSet();
	},
	
	 /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	// Search Event Handler
	
	onSearch: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('stevedoreTrimmingList');
		var partnerCdPopupCombo = me.getStore('partnerCdPopupCombo');
		var lashingStvCombo = me.getStore('lashingStvCombo');
		var params = me.getSearchCondition();
		
    	if(params == null){
    		return;
    	}
    	
    	store.load({
			params: params,
			callback: function(records, operation, success) {
    			if(success){
    				if(records.length > 0){
    					if(records[0].get('cgTpCd') === 'BBK'){
    						me.searchPtyDivCd = 'STV';
    					} else {
    						me.searchPtyDivCd = 'TRM';
    					}
					}
    				
    				partnerCdPopupCombo.load({
						params: {
							ptyDivCd: me.searchPtyDivCd
						},
						callback: function(records, operation, success) {
			    			if(success){
			    				lashingStvCombo.load({
		    						params: {
		    							ptyDivCd: 'STV'
		    						}
		    					});
			    			}
						}
					});
    			}
    		}
		});
	},
	
	onDblClick: function() {
		var me = this;	
		var grid = me.lookupReference('refStevedoreTrimmingGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		var withGears = '';
		
		if (selection == null) {
			return;
		} else {
			me.prevAddData.cgTpCd = selection.data.cgTpCd;
//			me.onRowEditSet();
//			
//			if (selection.data.shipsCrewYn === 'Y') {	
//				me.onDisabledBreakDryBulkSet();
//			} else {
//				me.onEnableBreakDryBulkSet();
//			}
		}
	},
	
	onLashingStevedoreChange:function(e, newValue, oldValue, eOpts){
		var me = this;
		var refs = me.getReferences();
		
		refs.refLashingStedoreCompany.setValue('');
		refs.refNosOfGangLashingStv.setValue('0');
	},
	
	onSelectionChange: function(selectable, selectRecords, eOpts) {
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refStevedoreTrimmingGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(!selection) return;
		
		if(selection){
			//?
			me.prevAddData.cgTpCd = selection.data.cgTpCd;
			
			me.getViewModel().set('theStevedore', selection);
			
			
			if(refs.refLashingStedoreCompany.getValue()){
				refs.refsCheckboxLashingStv.checked = true;
			}else{
				refs.refsCheckboxLashingStv.checked = false;
			}
			
			if(selection.get('cgTpCd')==='DBK'){
				me.onFieldsetDisabled(refs.refBreakBulkContainer, true);
				me.onFieldsetDisabled(refs.refLashingStvContainer, false);
				refs.refNosOfGangLashingStv.setDisabled(false);
				refs.refNosOfGangLashingStv.el.animate({
	                opacity: 1
	            });

				me.onFieldsetDisabled(refs.refDryBulkContainer, false);
				
				if(selection.get('shipsCrewYn') === 'Y'){
					selection.set('shipsCrewYn', 'Y');
					selection.set('workComp', "Ship's Crew");
				}else{
					selection.set('shipsCrewYn', 'N');
					refs.refStedoreCompanyInDBK.setValue(selection.get('workComp'));
					if(selection.get('workComp') === "Ship's Crew"){
						refs.refStedoreCompanyInDBK.setValue('');
						selection.set('workComp', '');
					}
				}

				refs.refStedoreCompanyInBBK.setValue('');

				var spr = selection.get('spr');
				var general = selection.get('general');

				refs.refSupervisorInBBK.setValue(0);
				refs.refGeneralInBBK.setValue(0);
				
				selection.set('spr', spr);
				selection.set('general', general);
				
				refs.refSupervisorInDBK.setValue(selection.get('spr'));
				refs.refGeneralInDBK.setValue(selection.get('general'));
			}else{
				me.onFieldsetDisabled(refs.refBreakBulkContainer, false);
				me.onFieldsetDisabled(refs.refDryBulkContainer, true);
				
				if(selection.get('shipsCrewYn') === 'Y'){
					selection.set('shipsCrewYn', 'Y');
					selection.set('workComp', "Ship's Crew");
				}else{
					selection.set('shipsCrewYn', 'N');
					refs.refStedoreCompanyInBBK.setValue(selection.get('workComp'));
					
					if(selection.get('workComp') === "Ship's Crew"){
						refs.refStedoreCompanyInBBK.setValue('');
						selection.set('workComp', '');
					}
				}
				refs.refStedoreCompanyInDBK.setValue('');

				var spr = selection.get('spr');
				var general = selection.get('general');

				refs.refSupervisorInDBK.setValue(0);
				refs.refGeneralInDBK.setValue(0);
				
				selection.set('spr', spr);
				selection.set('general', general);

				refs.refSupervisorInBBK.setValue(selection.get('spr'));
				refs.refGeneralInBBK.setValue(selection.get('general'));
				
				if(refs.refShipCrewRadioBBKGroup.getValue().bbkWorkType === 'N'){
					refs.refCheckBoxWidthGears.setDisabled(true);
					
					refs.refStedoreCompanyInBBK.setDisabled(false);
					refs.refSupervisorInBBK.setDisabled(false);
					refs.refWinchMenInBBK.setDisabled(false);
					refs.refGeneralInBBK.setDisabled(false);
					refs.refSupervisorInBBK.setReadOnly(false);
					refs.refWinchMenInBBK.setReadOnly(false);
					refs.refGeneralInBBK.setReadOnly(false);

				}else{
					refs.refCheckBoxWidthGears.setDisabled(false);

					refs.refStedoreCompanyInBBK.setDisabled(true);
					refs.refSupervisorInBBK.setDisabled(true);
					refs.refWinchMenInBBK.setDisabled(true);
					refs.refGeneralInBBK.setDisabled(true);
					refs.refSupervisorInBBK.setReadOnly(true);
					refs.refWinchMenInBBK.setReadOnly(true);
					refs.refGeneralInBBK.setReadOnly(true);
				}
			}
			if(selection.get('lashingCompCd') && selection.get('lashingCompCd') !==''){
				refs.refsCheckboxLashingStv.setValue('Y');
			}else{
				refs.refsCheckboxLashingStv.setValue('N');
			}
		}
	},
	
	shipCrewRadioGroupChangeInBBK : function(e, newValue, oldValue, eOpts ){
		var me = this;
		var refs = me.getReferences();
		if(newValue.bbkWorkType === 'N'){
			refs.refCheckBoxWidthGears.setDisabled(true);
			
			refs.refStedoreCompanyInBBK.setDisabled(false);
			refs.refSupervisorInBBK.setDisabled(false);
			refs.refWinchMenInBBK.setDisabled(false);
			refs.refGeneralInBBK.setDisabled(false);
			refs.refSupervisorInBBK.setReadOnly(false);
			refs.refWinchMenInBBK.setReadOnly(false);
			refs.refGeneralInBBK.setReadOnly(false);

		}else{
			refs.refCheckBoxWidthGears.setDisabled(false);

			refs.refStedoreCompanyInBBK.setDisabled(true);
			refs.refSupervisorInBBK.setDisabled(true);
			refs.refWinchMenInBBK.setDisabled(true);
			refs.refGeneralInBBK.setDisabled(true);
			refs.refSupervisorInBBK.setReadOnly(true);
			refs.refWinchMenInBBK.setReadOnly(true);
			refs.refGeneralInBBK.setReadOnly(true);
		}
		
		var selection = me.getViewModel().get('theStevedore');
		if(selection){
			if(selection.get('cgTpCd') === 'DBK'){
				return;
			}
			if(newValue.bbkWorkType === 'Y'){
				selection.set('shipsCrewYn', 'Y');
				selection.set('cwDiv', 'Y');
				selection.set('workComp', "Ship's Crew");
				
				refs.refStedoreCompanyInBBK.setValue('');
				refs.refSupervisorInBBK.setValue(0);
				refs.refWinchMenInBBK.setValue(0);
				refs.refGeneralInBBK.setValue(0);
				
				selection.set('spr', 		0);
				selection.set('winch', 		0);
				selection.set('general', 	0);
			}else{
				selection.set('shipsCrewYn', 'N');
				selection.set('cwDiv', 'N');
				selection.set('withGears', 'N');
				refs.refStedoreCompanyInBBK.setValue(selection.get('workComp'));
				
				if(selection.get('workComp') === "Ship's Crew"){
					refs.refStedoreCompanyInBBK.setValue('');
					selection.set('workComp', '');
				}
			}
		}
		refs.refStedoreCompanyInDBK.setValue('');
	},
	
	shipCrewRadioGroupChangeInDBK : function(e, newValue, oldValue, eOpts ){
		var me = this;
		var refs = me.getReferences();
		
		if(newValue.dbkWorkType === 'N'){
			refs.refStedoreCompanyInDBK.setDisabled(false);
			
			refs.refSupervisorInDBK.setReadOnly(false);
			refs.refSingnalMenInDBK.setReadOnly(false);
			refs.refDeckWorkerInDBK.setReadOnly(false);
			refs.refHoperMenInDBK.setReadOnly(false);
			refs.refGeneralInDBK.setReadOnly(false);
			
			refs.refSupervisorInDBK.setDisabled(false);
			refs.refSingnalMenInDBK.setDisabled(false);
			refs.refDeckWorkerInDBK.setDisabled(false);
			refs.refHoperMenInDBK.setDisabled(false);
			refs.refGeneralInDBK.setDisabled(false);
		}else{
			refs.refStedoreCompanyInDBK.setDisabled(true);
			
			refs.refSupervisorInDBK.setReadOnly(true);
			refs.refSingnalMenInDBK.setReadOnly(true);
			refs.refDeckWorkerInDBK.setReadOnly(true);
			refs.refHoperMenInDBK.setReadOnly(true);
			refs.refGeneralInDBK.setReadOnly(true);
			
			refs.refSupervisorInDBK.setDisabled(true);
			refs.refSingnalMenInDBK.setDisabled(true);
			refs.refDeckWorkerInDBK.setDisabled(true);
			refs.refHoperMenInDBK.setDisabled(true);
			refs.refGeneralInDBK.setDisabled(true);
		}
		
		var selection = me.getViewModel().get('theStevedore');
		if(selection){
			if(selection.get('cgTpCd') === 'BBK'){
				return;
			}
			if(newValue.dbkWorkType === 'Y'){
				selection.set('shipsCrewYn', 'Y');
				selection.set('cwDiv', 'Y');
				selection.set('workComp', "Ship's Crew");
				refs.refStedoreCompanyInDBK.setValue('');
				
				refs.refSupervisorInDBK.setValue(0);
				refs.refGeneralInDBK.setValue(0);
				selection.set('spr', 		0);
				selection.set('signal', 	0);
				selection.set('deck', 		0);
				selection.set('hoper', 		0);
				selection.set('general', 	0);
			}else{
				selection.set('shipsCrewYn', 'N');
				selection.set('cwDiv', 'N');
				refs.refStedoreCompanyInDBK.setValue(selection.get('workComp'));

				if(selection.get('workComp') === "Ship's Crew"){
					refs.refStedoreCompanyInDBK.setValue('');
					selection.set('workComp', '');
				}
			}
		}
		refs.refStedoreCompanyInBBK.setValue('');
	},
	
	onSupervisorChange: function(e, newValue, oldValue, eOpts){
		var me = this;
		var selection = me.getViewModel().get('theStevedore');
		if(selection){
			selection.set('spr', newValue);
		}
	},
	onGeneralChange: function(e, newValue, oldValue, eOpts){
		var me = this;
		var selection = me.getViewModel().get('theStevedore');
		if(selection){
			selection.set('general', newValue);
		}
	},
	
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var stevedoreTrimmingList = me.getStore('stevedoreTrimmingList');
		
		if(!me.onValidation()){
			MessageUtil.warning('warning_msg', 'Please input the required fields.');
			return;
		}
		
		stevedoreTrimmingList.save({
			success:function(){
				MessageUtil.saveSuccess(); 
				//me.onInitialize();
			}
		})
	},
	onValidation: function(){
		var me = this;
		var refs = me.getReferences();
		var bValidation = true;
		
		var store = me.getStore('stevedoreTrimmingList');
		store.getModifiedRecords().forEach(function(record, index, array){
			if(record.get('hatchDrtCd').trim() ===''){
				record.set('hatchDrtCd', null);
			}
            if(record.get('withGears').trim() ==='false'){
				record.set('withGears', 'N');
			}
            if(record.get('withGears').trim() ==='true'){
				record.set('withGears', 'Y');
			}
            
			if(record.get('shipsCrewYn') === 'N' && !record.get('workComp')){
				bValidation = false;
			}
			
			if(record.get('lashingCompCd') !==''){
				if(record.get('lashingGangNos') === 0){
					refs.refsCheckboxLashingStv.setValue('N');
					bValidation = false;	
				}
			}

			if(record.get('lashingGangNos') > 0){
				if(record.get('lashingCompCd') ===''){
					refs.refsCheckboxLashingStv.setValue('N');
					bValidation = false;
				}
			}
    	});
		
		return bValidation;
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	

	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var vslCallId = me.getViewModel().get('globalVesselCallId')
     	var workYmd = me.getViewModel().get('globalWorkDate')
     	var cgTpCd = refs.ctlBulkDryCombo.getValue();
     	var shift = me.getViewModel().get('globalWorkShift')
    	var params;
     	
     	if(!StringUtil.isNullorEmpty(vslCallId)){ 
     		params = {
 	    		vslCallId: vslCallId,
 	    		workYmd: workYmd,
 	    		cgTpCd: cgTpCd,
 	    		shift: shift,
 	    		searchType: 'infoSheet'
     		};
		} else {
			MessageUtil.error('fail_msg', "requiredJpvcmessage");
			params = null;
		}
    	
    	return params;
	},
	
	onValidateEdit : function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		
	},
	
	onEdit: function(editor, context) {
		var me = this;
		var refs = me.getReferences();
		
		if(context){
			if(context.newValues.shipsCrewYn === 'Y'){
				context.record.set('cwDiv', 'Y');
			} else {
				context.record.set('cwDiv', 'N');
			}
			
			context.record.set('vslCallId', me.getViewModel().get('theSdTrm').get('vslCallId'));
			context.record.set('hatchDrtCd', context.record.get('hatchDrtCd').trim());
			context.record.set('rsDivCd', 'WC');
		}
		
		me.gridEdit(editor, context, false);
    },
    
    onCancelEdit : function(rowEditing, context) {
		var me = this;
		me.gridCancelEdit(rowEditing, context);
	},
	
	onHatchDataSet: function(){
		var me = this;
		var store = me.getStore('hatchNoCombo');
		
		for(var i = 0; i < me.MAX_HATCH_NO; i++){	
			store.insert(i, [{
				cdNm: 'H' + (i+1),
				cd: 'H' + (i+1)
			}])
		}
		store.commitChanges();
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		var saChangeCombo = me.getStore('saChangeCombo');
		
		if(targetControl === 'ctlJpvc'){
			if(returnValue){
				me.getViewModel().setData({theSdTrm: returnValue.item});
				me.onSearch();
			}
		}else if(targetControl === 'refContratorField'){		
			refs.refContratorField.setValue(returnValue.code);
		}else if(targetControl === 'refBtnSearchStvBb'){		
			refs.refFindStvBbTextField.setValue(returnValue.code);
		}else if(targetControl === 'refBtnSearchStevedoreDb'){		
			refs.refTrimmingTextField.setValue(returnValue.code);
		}else if(targetControl === 'refBtnlashingStv'){		
			refs.refLashingStvTextsField.setValue(returnValue.code);
		}else if(targetControl === 'refStedoreCompanyInBBK' || targetControl === 'refStedoreCompanyInDBK'){
			if(returnValue){
				var selection = me.getViewModel().get('theStevedore');
				if(selection){
					selection.set('workComp',returnValue.code)
				}
			}
		}else if(targetControl === 'refLashingStedoreCompany'){
			if(returnValue.code){
				refs.refsCheckboxLashingStv.setValue('Y');
			}else{
				refs.refsCheckboxLashingStv.setValue('N');
			}
		}
	},
	
	onShipCrewCompYnChange : function(field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		
		if (!StringUtil.isNullorEmpty(newValue)) {
			if (oldValue != null) {
				if (newValue === 'Y') {
					refs.refWorkComp.getEditor().setValue('Ship\'s Crew');
					me.onDisabledBreakDryBulkSet();
				} else {
					refs.refWorkComp.getEditor().setValue('');
					me.onEnableBreakDryBulkSet();
				}
			}
		}
	},
	
	onWithGearsChange : function(field, newValue, oldValue) {
		var me = this;
		var refs = me.getReferences();
		
		if (!StringUtil.isNullorEmpty(newValue)) {
			if (oldValue != null) {
				if(newValue === 'Y'){
					me.onEnableBreakDryBulkSet();
				} else {
					me.onDisabledBreakDryBulkSet();
				}
			}
		}
	},

	onGridComboRenderer: function(val, cell){
		var me = this;
        var refs = me.getReferences();
		var codeComboStore = null;
		var displayFieldName = 'shftNm';
		var codeFieldName = 'shftId';
		
		if(cell.column != undefined){
			if(cell.column.dataIndex == 'shftId'){
				codeComboStore = me.getViewModel().getStore('stevedoreTrimmingList');
			} 

			if(codeComboStore != null){
				var indx = -1;
				
				if(cell.column.dataIndex == 'shftId'){
					indx = codeComboStore.find(codeFieldName, val);
					
				} else {
					indx = codeComboStore.find(codeFieldName, val);
				}				

				if (indx != -1){
					return codeComboStore.getAt(indx).get(displayFieldName); 
				}
			}
		}
		return '';
	},
	
	onEnableBreakDryBulkSet: function(){
		var me = this;
		var refs = me.getReferences();
		
		if (me.prevAddData.cgTpCd === 'BBK') {
			refs.refWithGears.getEditor().setEditable(false);
			refs.refWithGears.getEditor().setDisabled(true);
			
			refs.refWinch.getEditor().setEditable(true);
			refs.refWinch.getEditor().setDisabled(false);
			
//			refs.refAddSup.getEditor().setEditable(true);
//			refs.refAddSup.getEditor().setDisabled(false);
//			
//			refs.refAddNon.getEditor().setEditable(true);
//			refs.refAddNon.getEditor().setDisabled(false);
		} else {
			refs.refSignal.getEditor().setEditable(true);
			refs.refSignal.getEditor().setDisabled(false);
			
			refs.refDeck.getEditor().setEditable(true);
			refs.refDeck.getEditor().setDisabled(false);
			
			refs.refHoper.getEditor().setEditable(true);
			refs.refHoper.getEditor().setDisabled(false);
		}
		
		refs.refAddSup.getEditor().setEditable(true);
		refs.refAddSup.getEditor().setDisabled(false);
		
		refs.refAddNon.getEditor().setEditable(true);
		refs.refAddNon.getEditor().setDisabled(false);
		
		refs.refWorkComp.getEditor().setEditable(true);
		refs.refWorkComp.getEditor().setDisabled(false);
		
		refs.refSpr.getEditor().setEditable(true);
		refs.refSpr.getEditor().setDisabled(false);
		
		refs.refGeneral.getEditor().setEditable(true);
		refs.refGeneral.getEditor().setDisabled(false);
	},
	
	onDisabledBreakDryBulkSet: function(){
		var me = this;
		var refs = me.getReferences();
		
		if (me.prevAddData.cgTpCd === 'BBK') {
			refs.refWithGears.getEditor().setEditable(true);
			refs.refWithGears.getEditor().setDisabled(false);
			
			refs.refWinch.getEditor().setEditable(false);
			refs.refWinch.getEditor().setDisabled(true);
			
//			refs.refAddSup.getEditor().setEditable(false);
//			refs.refAddSup.getEditor().setDisabled(true);
//			
//			refs.refAddNon.getEditor().setEditable(false);
//			refs.refAddNon.getEditor().setDisabled(true);
		} else {
			refs.refSignal.getEditor().setEditable(false);
			refs.refSignal.getEditor().setDisabled(true);
			
			refs.refDeck.getEditor().setEditable(false);
			refs.refDeck.getEditor().setDisabled(true);
			
			refs.refHoper.getEditor().setEditable(false);
			refs.refHoper.getEditor().setDisabled(true);
		}
		
		refs.refAddSup.getEditor().setEditable(false);
		refs.refAddSup.getEditor().setDisabled(true);
		
		refs.refAddNon.getEditor().setEditable(false);
		refs.refAddNon.getEditor().setDisabled(true);
		
		refs.refWorkComp.getEditor().setEditable(false);
		refs.refWorkComp.getEditor().setDisabled(true);
		
		refs.refSpr.getEditor().setEditable(false);
		refs.refSpr.getEditor().setDisabled(true);
		
		refs.refGeneral.getEditor().setEditable(false);
		refs.refGeneral.getEditor().setDisabled(true);		
	},
	
	onRowEditSet: function(){
		var me = this;
		var refs = me.getReferences();
		
		if (me.prevAddData.cgTpCd === 'BBK') {
			refs.refSignal.getEditor().setEditable(false);
			refs.refSignal.getEditor().setDisabled(true);
			
			refs.refDeck.getEditor().setEditable(false);
			refs.refDeck.getEditor().setDisabled(true);
			
			refs.refHoper.getEditor().setEditable(false);
			refs.refHoper.getEditor().setDisabled(true);
			
			refs.refWinch.getEditor().setEditable(true);
			refs.refWinch.getEditor().setDisabled(false);
			
		} else {
			refs.refWithGears.getEditor().setEditable(false);
			refs.refWithGears.getEditor().setDisabled(true);
			
			refs.refWinch.getEditor().setEditable(false);
			refs.refWinch.getEditor().setDisabled(true);
			
			refs.refSignal.getEditor().setEditable(true);
			refs.refSignal.getEditor().setDisabled(false);
			
			refs.refDeck.getEditor().setEditable(true);
			refs.refDeck.getEditor().setDisabled(false);
			
			refs.refHoper.getEditor().setEditable(true);
			refs.refHoper.getEditor().setDisabled(false);
		}
	},
	
	onComboBlur : function(combo, event, eOpts){
		var displayFieldName = 'ptyCd';
		ControlUtil.validationQueryMatch(combo, displayFieldName);
	},
	
	exportTo: function(btn) {
    	var me = this;
    	var refs = me.getReferences();
    	
        var cfg = Ext.merge({
            title: 'Stevedore And Trimming',
            fileName: 'StevedoreTrimming' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        var grid = refs.refStevedoreTrimmingGrid;
        grid.saveDocumentAs(cfg);
    },
	
	/*
	*  Tablet:
	*/	
	onTabletLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var stevedore = me.getStore('stevedoreTrimmingList');
		var globalVslCallId = me.getViewModel().get('globalVesselCallId');
		var globalWorkDate = me.getViewModel().get('globalWorkDate');
		var glbShift = me.getViewModel().get('globalWorkShift');
		//Penalty Date
		refs.refWorkDateTextfield.setValue(globalWorkDate);
		
		stevedore.load({
    		params: {
    			searchType: 'infoSheet',
    			vslCallId: globalVslCallId,
				workYmd: globalWorkDate,
				shiftId: glbShift
    		},
    		callback: function(records, operation, success) {
    			if(success){
    			}
    		}
		});
		var pnty = me.getStore('vesselDelayPntyList');
		pnty.load({
    		params:{
    			vslCallId: globalVslCallId,
    			pntyDt:globalWorkDate,
    			shftId:glbShift,
    			searchType : 'reportList'
    		},
    		callback: function(records, operation, success) {
    			if(success){
    			}
    		}
		});
		
		// var comboStore = me.getStore('vesselDelayPntyCombo');
		var hatchNoStore = me.getStore('hatchNoCombo');
		var particularsStore = me.getStore('particularsCombo');
		var roleStore = me.getStore('roleCombo');
		var shiftStore = me.getStore('shiftCombo');

		hatchNoStore.load();
		roleStore.load();
		particularsStore.load();
		shiftStore.load();
		// comboStore.load({
		// 	params: {
		// 		searchType : 'comboList'
		// 	},
		// 	callback: function(records, operation, success) {
		// 		if (success) {
		// 			if(records != null && records.length > 0){
		// 				hatchNoStore.setData(records[0].get('hatchNoList'));						
		// 				particularsStore.setData(records[0].get('particulars'));						
		// 				roleStore.setData(records[0].get('roleList'));						
		// 				shiftStore.setData(records[0].get('shiftList'));
						
		// 				me.setWorkingShiftDate();					
		// 			}
		// 		}
		// 	}
		// });
		
	},
	setWorkingShiftDate: function(){
		var me = this;
		var refs = me.getReferences();
		var glbDt = Ext.Date.format(MOST.config.Token.getWorkDate(), 'd/m/Y');
		var glbShft = MOST.config.Token.getWorkShift();		
		refs.refWDTextfield.setValue(Ext.Date.parse(glbDt, 'd/m/Y'));
		
		refs.refShiftCbx.setValue(glbShft);
	},
	onCheckStvRadioField:function(radioField,newValue, oldValue){
		var me = this;
		var refs = me.getReferences();
		var fieldsetDb = me.lookupReference('refdrybulkField');
		var fieldsetBb = me.lookupReference('refbreakBulkField');
		if((radioField.getValue() == 'stevedore'|| radioField.getValue() == 'shipscreBb') && newValue ){
			var BbEnable = radioField.getValue() == 'shipscreBb' ? true : false;
			
			refs.refsWithGrearsCbx.setDisabled(!BbEnable); 			
				// refs.refBtnSearchStvBb.setDisabled(BbEnable);
				refs.refBb3field.setDisabled(BbEnable);
				refs.refSupervisornearNonTTextField.setDisabled(BbEnable);
				refs.refNonTonnageTextField.setDisabled(BbEnable);	
				refs.refSupervisorTextField.setDisabled(BbEnable)
				refs.refWinchmenTextField.setDisabled(BbEnable)
				refs.refGeneralBbTextField.setDisabled(BbEnable)

//				refs.refdrybulkField.setDisabled(true);				
//				refs.refBtnSearchStevedoreDb.setDisabled(true);				
				// refs.refNOGangTextField.setDisabled(false);
//				refs.refStvLashingField.setDisabled(false);
//				
				refs.refStevedoreRdo.enable();
				refs.refShipsCreBbRdo.enable();		
		}
		else if((radioField.getValue() == 'trimming'|| radioField.getValue() == 'shipscreDb') && newValue){
			var DbEnable = radioField.getValue() == 'shipscreDb' ? true : false;
			refs.refDb5Field.setDisabled(DbEnable);
			refs.refSupervisornearNonTTextField.setDisabled(DbEnable);
			refs.refNonTonnageTextField.setDisabled(DbEnable);				
			// refs.refBtnSearchStevedoreDb.setDisabled(DbEnable);		
//			refs.refbreakBulkField.setDisabled(true);
//			refs.refStvLashingField.setDisabled(true);
			// refs.refNOGangTextField.setDisabled(false);
//			refs.refBtnlashingStv.setDisabled(true);
//			refs.refBtnSearchStvBb.setDisabled(true);
//			refs.refShipsCreBbRdo.setDisabled(true);	
//			refs.refsWithGrearsCrefTrimmingRdobx.updateChecked(false);
//			refs.refsWithGrearsCbx._checked = false;
			refs.refTrimmingRdo.enable();
			refs.refShipsCreDbRdo.enable();
			refs.refLashingStvTextsField.setDisabled(true);
		}
	},	
	onCellClick:function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refStevedoreTrimmingGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null) return;	
		me.rowIndex = rowIndex;
		me.prevAddData.cgTpCd = selection.get("cgTpCd");
 		me.lookupReference('refbreakBulkField').setHidden(!(selection.get("cgTpCd") == "BBK"));
 		me.lookupReference('refdrybulkField').setHidden(!(selection.get("cgTpCd") == "DBK"));
 		me.lookupReference('refCtnAdditional').setHidden(false);
 		
		if(selection.get("cgTpCd") == "BBK"){
			me.getViewModel().set('theStevedoreTrimmingBb', selection);		
			me.onDisplayBreakDryBulkSet("BBK",selection.get("shipsCrewYn"));

			var withGrears = selection.get("withGears") == "Y" ? true : false;
			refs.refsWithGrearsCbx.updateChecked(withGrears);
			refs.refsWithGrearsCbx._checked = withGrears;
			var lashing = selection.get("lashingCompCd") == "" && selection.get("lashingGangNos") == 0 ? false : true;
			refs.refLashingCbx._checked = lashing;
			refs.refLashingCbx.updateChecked(lashing);
			refs.refbreakBulkField._required = true;
			refs.refCtnAdditional._required = false;
			refs.refdrybulkField._required = false;
			me.getViewModel().set('theStevedoreTrimmingDb', null);
		}
		else{
			me.getViewModel().set('theStevedoreTrimmingDb', selection);			
			me.onDisplayBreakDryBulkSet("DBK",selection.get("shipsCrewYn"));
			
			refs.refLashingCbx.updateChecked(false);
			refs.refLashingCbx._checked = false;
			refs.refbreakBulkField._required = false;
			refs.refCtnAdditional._required = false;
			refs.refdrybulkField._required = true;
			me.getViewModel().set('theStevedoreTrimmingBb', null);
		}	
		me.getViewModel().set('theAdditional', selection);
		
	},
	
	onDisplayBreakDryBulkSet: function(cgTpCd,shipsCrewYn){
		var me = this;
		var refs = me.getReferences();
		var shipCrewYn = shipsCrewYn == 'Y' ? true : false;
		if (cgTpCd == "BBK") {
			if(shipCrewYn){
				refs.refShipsCreBbRdo._checked = shipCrewYn ;
				refs.refShipsCreBbRdo.updateChecked(shipCrewYn);
				refs.refFindStvBbTextField.setValue("");
			}else{
				refs.refStevedoreRdo._checked =!shipCrewYn;
				refs.refStevedoreRdo.updateChecked(!shipCrewYn);		
			}	
		} else {
			if(shipCrewYn){
				refs.refShipsCreDbRdo.updateChecked(shipCrewYn);
				refs.refShipsCreDbRdo._checked = shipCrewYn;
				refs.refTrimmingTextField.setValue("");
			}else{
				refs.refTrimmingRdo.updateChecked(!shipCrewYn);		
				refs.refTrimmingRdo._checked = !shipCrewYn;
			}
		}
		
	},
	onUpdateHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refStevedoreTrimmingGrid;
		var store = me.getStore('stevedoreTrimmingList');		
		var selectedRecord = grid.getSelection() ;		
		var cgTpCd = selectedRecord.getData().cgTpCd;
		if(selectedRecord == undefined || selectedRecord == null){
			MessageUtil.info('info_msg','vslDlPnl_grid_selection_empty_msg');
			return;
		}
		
		var isValidForm = false;
		if(cgTpCd && cgTpCd == 'BBK'){
			isValidForm = refs.refbreakBulkField.validate() && refs.refCtnAdditional.validate();
		}else if(cgTpCd && cgTpCd == 'DBK'){
			isValidForm = refs.refdrybulkField.validate();
		}
		if(!isValidForm){
			MessageUtil.warning('warning_msg', 'tbl_dbbanking_missing_require');
			return;
		}
		
		var withGrear = "";
		
		if(refs.refsWithGrearsCbx._disabled == false){
			 withGrear = refs.refsWithGrearsCbx._checked == true ? 'Y' : "";
		}
		me.doUpdateHHT();
		// if(selecedRecord.get("workComp") == refs.refFindStvBbTextField.getValue() &&selecedRecord.get("lashingCompCd") == refs.refLashingStvTextsField.getValue() ){
		// }else{
		// 	return me.onFieldFocusleaveHHT(refs.refFindStvBbTextField,null,null,true).then(()=>{ me.onFieldFocusleaveHHT(refs.refLashingStvTextsField,null,null,true).then(()=>me.doUpdateHHT()).catch(()=>
		// 	{
		// 		MessageUtil.alert('Warning', 'Please input all require fields');
		// 		return false;
		// 	})}).catch(()=>
		// 	{
		// 		MessageUtil.alert('Warning', 'Please input all require fields');
		// 		return false;
		// 	}
		// 	)
		// }
	},
	
	doUpdateHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refStevedoreTrimmingGrid;
		var store = me.getStore('stevedoreTrimmingList');		
		var selecedRecord = grid.getSelection() ;		
		
		var withGrear = "";
		
		if(refs.refsWithGrearsCbx._disabled == false){
			 withGrear = refs.refsWithGrearsCbx._checked == true ? 'Y' : "";
		}	
		
		
	var sltIndex = grid.store.indexOf(selecedRecord);
	var item =Ext.create('MOST.model.controller.StevedoreTrimming');
	store.each(function(record, index){
		if(index === sltIndex){
			record.set('crud', 'U');
			record.set('vslCallId', me.getViewModel().get('globalVesselCallId').toUpperCase());
			record.set('vslCd', selecedRecord.get("vslCd"));
			record.set('callYear', selecedRecord.get("callYear"));
			record.set('callSeq', selecedRecord.get("callSeq"));
			record.set('rsDivCd', 'WC');
			record.set('userId', MOST.config.Token.getUserId());
			record.set('cgTpCd', selecedRecord.get("cgTpCd"));
			record.set('hatchDrtCd', selecedRecord.get("hatchDrtCd").trim());//AP/FP
			record.set('workYmd', selecedRecord.get("workYmd"));
			record.set('shftId', selecedRecord.get("shftId"));
			record.set('hatchNo', selecedRecord.get("hatchNo"));
			if(selecedRecord.get("cgTpCd") == 'BBK'){
				if(refs.refShipsCreBbRdo._checked){
					record.set('shipsCrewYn', "Y");
					record.set('cwDiv', "Y");
					record.set('workComp',me.CONST_SHIPCR_NM);
					record.set('withGears', withGrear);
					record.set('spr', 0);
					record.set('winch', 0);
					record.set('general',0);
					record.set('supervisor', 0);
					record.set('nonworker', 0);
				}
				else{
					record.set('shipsCrewYn', "N");
					record.set('cwDiv', "N");
					record.set('workComp', refs.refFindStvBbTextField.getValue() == "Ship's Crew" ? "" : refs.refFindStvBbTextField.getValue().toUpperCase());
					record.set('withGears', "");
					record.set('spr', refs.refSupervisorTextField.getValue());
					record.set('winch', refs.refWinchmenTextField.getValue());
					record.set('general', refs.refGeneralBbTextField.getValue());
					record.set('supervisor', refs.refSupervisornearNonTTextField.getValue());
					record.set('nonworker', refs.refNonTonnageTextField.getValue());
					
				}
				
				if(refs.refLashingCbx._checked){
					record.set('lashingCompCd', refs.refLashingStvTextsField.getValue().toUpperCase());
					record.set('lashingGangNos', refs.refNOGangTextField.getValue());						
				}else{
					record.set('lashingCompCd', "");
					record.set('lashingGangNos', 0);
					
				}
			}
			else {//drybulk
				if(refs.refShipsCreDbRdo._checked){
					record.set('shipsCrewYn', "Y");
					record.set('cwDiv', "Y");
					record.set('withGears', "");
					record.set('workComp',me.CONST_SHIPCR_NM);
					record.set('spr', 0);
					record.set('signal',0);
					record.set('deck', 0);
					record.set('hoper',0);
					record.set('supervisor', 0);
					record.set('nonworker', 0);
				}else{
					record.set('shipsCrewYn', "N");
					record.set('cwDiv', "N");		
					record.set('withGears', "");
					record.set('workComp', refs.refTrimmingTextField.getValue() == "Ship's Crew" ? "" : refs.refTrimmingTextField.getValue().toUpperCase());
					record.set('spr', refs.refSvisorTrimmingTextField.getValue());
					record.set('signal', refs.refSignalTextField.getValue());
					record.set('deck', refs.refDeckTextField.getValue());
					record.set('hoper', refs.refHopperTextField.getValue());
					record.set('general', refs.refgeneralDbTextField.getValue());
					record.set('supervisor', refs.refSupervisornearNonTTextField.getValue());
					record.set('nonworker', refs.refNonTonnageTextField.getValue());
				}
				
			}
			record.dirty = true;
		}
	});
	
	MessageUtil.questionModern('Confirm', 'infoupdate_msg',null,
			function(button){
				if (button === 'ok') {
					store.sync({
						success:function(){
							MessageUtil.saveSuccess();
							me.onClearAllStevedoreField();
							me.onTabletLoad();
						}
					});
						
		        }else if(button === 'cancel'){
		        	return;
		        };
			}
		);
},
	
	onLashingStvStrimChecked: function(checkbox, newValue){
		var me = this;
		var refs = me.getReferences();
		
		if(!checkbox._checked){
			refs.refNOGangTextField.setValue("");
			refs.refLashingStvTextsField.setValue("");;
		}
		
		refs.refNOGangTextField.setDisabled(!checkbox._checked);
		// refs.refBtnlashingStv.setDisabled(!checkbox._checked);
		refs.refLashingStvTextsField.setDisabled(!checkbox._checked);
	},
	
	onClickRetrieveHHT: function() {
		this.onClearAllStevedoreField();
		this.onTabletLoad();	
		this.onClearField();
	},
	
	onClearAllStevedoreField: function(){
		var me = this;
		var refs = me.getReferences();

		refs.refFindStvBbTextField.setValue("");
		refs.refSupervisorTextField.setValue(0);
		refs.refWinchmenTextField.setValue(0);
		refs.refGeneralBbTextField.setValue(0);
		refs.refSupervisornearNonTTextField.setValue(0);
		refs.refNonTonnageTextField.setValue(0);		
		refs.refTrimmingTextField.setValue("");		
		refs.refSvisorTrimmingTextField.setValue(0);
		refs.refSignalTextField.setValue(0);
		refs.refDeckTextField.setValue(0);
		refs.refHopperTextField.setValue(0);
		refs.refgeneralDbTextField.setValue(0);
		refs.refLashingStvTextsField.setValue("");
		refs.refNOGangTextField.setValue(0);
		
		refs.refStevedoreRdo.updateChecked(false);
		refs.refShipsCreBbRdo.updateChecked(false);
		refs.refTrimmingRdo.updateChecked(false);
		refs.refShipsCreDbRdo.updateChecked(false);
		this.getViewModel().set('theStevedoreTrimmingBb', null)
		this.getViewModel().set('theStevedoreTrimmingDb', null)
		this.getViewModel().set('theAdditional', null)
	},
	
	// pentalty
	changeParticularsEventHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselDelayPntyList');
		var grid = me.lookupReference('refVesselDelayPenaltyGrid');
		var particularsItem = refs.refParticularField.getValue();
		var penaltyDescrListStore = me.getStore('penaltyDescrList');
		if(particularsItem != null && particularsItem != ''){
			if(particularsItem == 'FSG'
			|| particularsItem == 'FSGE'
			|| particularsItem == 'NAP'
			|| particularsItem == 'FSM'
			|| particularsItem == 'FSSU'
			|| particularsItem == 'FSSI'
			|| particularsItem == 'FSH'){

				refs.refRoleField.clearValue();
				refs.refRoleField.setDisabled(true);
				refs.refpntyTimefield.setValue('');
				refs.refpntyTimefield.setDisabled(true);
				refs.refpntyEndTimefield.setValue('');
				refs.refpntyEndTimefield.setDisabled(true);
				
			}else if(particularsItem == 'SWL'
			|| particularsItem == 'SWE'){
				refs.refRoleField.setDisabled(false);
				refs.refpntyTimefield.setDisabled(false);
				refs.refpntyEndTimefield.setDisabled(false);
				me.setTimeWithShiftHHT();
			}
			
			penaltyDescrListStore.load({
				params: {
					itemCd : particularsItem,
					// roleCd : '*',
					searchType : 'penaltyDescr'
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							for(var i = 0; i < records.length; i++){
							
								refs.refPenaltyfield.setValue(records[0].data.pntyDescr);
								refs.refunitPrcfield.setValue(records[0].data.unitPrc);
								var itemQty = refs.refItemQtyfield.getValue();
								var unitPrc = refs.refunitPrcfield.getValue();
						     	if(itemQty != null || itemQty != 0){
						     		var totalHRS = unitPrc * itemQty;
						     		refs.refTotalHRSfield.setValue(totalHRS);
						     	}
							}
							
						}
					}
				}
				
			});
		}
	},
	
	changeRoleEventHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('vesselDelayPntyList');
		var grid = me.lookupReference('refVesselDelayPenaltyGrid');
		var particularsItem = refs.refParticularField.getValue();
		var roleItem = refs.refRoleField.getValue();
		var penaltyDescrListStore = me.getStore('penaltyDescrList');
			
			penaltyDescrListStore.load({
				params: {
					itemCd : particularsItem,
					roleCd : roleItem,
					searchType : 'penaltyDescr'
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records != null && records.length > 0){
							for(var i = 0; i < records.length; i++){
							
								refs.refPenaltyfield.setValue(records[0].data.pntyDescr);
								refs.refunitPrcfield.setValue(records[0].data.unitPrc);
								var itemQty = refs.refItemQtyfield.getValue();
								var unitPrc = refs.refunitPrcfield.getValue();
						     	if(itemQty != null || itemQty != 0){
						     		var totalHRS = unitPrc * itemQty;
						     		refs.refTotalHRSfield.setValue(totalHRS);
						     	}
							}
							
						}
					}
				}
				
			});
		
	},
	setTimeWithShiftHHT: function(tab){
		var me = this;
		var refs = me.getReferences();
		var shiftId = me.getViewModel().get('globalWorkShift');
		var shiftStore = me.getStore('shiftCombo')
		var shift = shiftStore.findRecord('shftId', shiftId);
		var strWKDate = me.getViewModel().get('globalWorkDate');
		var strStartDt = strWKDate + ' ' + shift.get('fmHhMm').substr(0, 2) + ':' + shift.get('fmHhMm').substr(2, 4);
		var strEndDt = strWKDate + ' ' + shift.get('toHhMm').substr(0, 2) + ':' + shift.get('toHhMm').substr(2, 4);

		if(shift.get('shftId') === 'SF0013'){
			var temp = Ext.Date.parse(strEndDt, 'd/m/Y H:i');
			var endShftDTime = new Date(temp.getTime() + (24 * 60 * 60 * 1000));
			strEndDt = Ext.Date.format(endShftDTime, 'd/m/Y H:i');
		}
		refs.refpntyTimefield.setValue(strStartDt);
    	refs.refpntyEndTimefield.setValue(strEndDt);
	},
	onGridPenaltyClick:function(ctx, td, cellIndex, record, tr, rowIndex, e, eOpts){
		var me = this;
		var refs = me.getReferences();
		var grid = me.lookupReference('refVesselDelayPenaltyGrid');
		var selection = grid.getSelection() == null ? null : grid.getSelection();
		if(selection == null) return;	
		me.rowIndex = rowIndex;
		me.getViewModel().set('theVesselDelayPenalty', selection.getData());
		
		refs.refHatchField.setValue(selection.get("hatchNo"));
		refs.refParticularField.setValue(selection.get("itemCd"));
		refs.refRoleField.setValue(selection.get("roleCd"));
		refs.refWorkDateTextfield.setValue(selection.get("pntyDt"));	
		refs.refpntyTimefield.setValue(selection.get("pntyTime"));
		refs.refpntyEndTimefield.setValue(selection.get("pntyEndTime"));
	},
	
	onCheckAddHHT:function(){
		var me = this;
		if(!me.onValidateSubmit()){
			return;
		}
		MessageUtil.questionModern('Confirm', 'infoinsert_msg',null,
				function(button){
					if (button === 'ok') {
						me.onAddHHT();
			        }else if(button === 'cancel'){
			        	return;
			        };
				}
			);
	},
	
	onAddHHT:function(){
		var me = this;
		var store = me.getStore('vesselDelayPntyList');
		var refs = me.getReferences();
		var userIdCd = MOST.config.Token.getUserId();
		var vslCallId = me.getViewModel().get('globalVesselCallId').toUpperCase();
		let shiftId = me.getViewModel().get('globalWorkShift');
		var masterItem = Ext.create('MOST.model.controller.VesselDelayPenaltyReport');
		masterItem.data.vslCallId = vslCallId;
		masterItem.data.shftId = shiftId;
		masterItem.data.hatchNo = refs.refHatchField.getValue();
		masterItem.data.pntyDt = Ext.Date.format(refs.refWorkDateTextfield.getValue(), 'd/m/Y');
		masterItem.data.itemCd = refs.refParticularField.getValue();
		masterItem.data.roleCd = refs.refRoleField.getValue() == " " ||refs.refRoleField.getValue() == "" ? "*" : refs.refRoleField.getValue();
		masterItem.data.contrator = refs.refContratorField.getValue();
		masterItem.data.pntyEndTime =refs.refpntyEndTimefield.getValue();
		masterItem.data.pntyTime = refs.refpntyTimefield.getValue();
		masterItem.data.pntyDescr = refs.refPenaltyfield.getValue();
		masterItem.data.pntyAmt = refs.refTotalHRSfield.getValue();
		masterItem.data.itemQty = refs.refItemQtyfield.getValue();
		masterItem.data.unitPrc = refs.refunitPrcfield.getValue();
		masterItem.data.userId = MOST.config.Token.getUserId();

		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.phantom = true;
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.INSERT);
		updateParm.set('items', [masterItem.data]);
		updateParm.save({
			success: function(){
				MessageUtil.saveSuccess();
				me.onTabletLoad();	
				MessageUtil.saveSuccess();
				me.onClearField();
			}
		});
	},
	onUpdatePenatlyHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refVesselDelayPenaltyGrid;
		var store = me.getStore('vesselDelayPntyList');
		var selecedRecord = grid.getSelection() ;
		if(selecedRecord == undefined || selecedRecord == null){
			MessageUtil.info('info_msg','vslDlPnl_grid_selection_empty_msg');
			return;
		}
		
		if(!me.onValidateSubmit()){
			return;
		}		
		var sltIndex = grid.store.indexOf(selecedRecord);
		var item =Ext.create('MOST.model.controller.VesselDelayPenaltyReport');
		store.each(function(record, index){
			if(index === sltIndex){				
				record.set('vslCallID', me.getViewModel().get('globalVesselCallId').toUpperCase());
				record.set('shftId', me.getViewModel().get('globalWorkShift'));
				record.set('hatchNo', refs.refHatchField.getValue());
				record.set('pntyDt', Ext.Date.format(refs.refWorkDateTextfield.getValue(), 'd/m/Y'));
				record.set('itemCd',refs.refParticularField.getValue());
				record.set('pntyEndTime',refs.refpntyEndTimefield.getValue());
				record.set('roleCd', refs.refRoleField.getValue() == " " || refs.refRoleField.getValue() == "" ? "*" : refs.refRoleField.getValue());		
				record.set('unitPrc', refs.refunitPrcfield.getValue());
				record.set('contrator', refs.refContratorField.getValue());
				record.set('pntyTime',refs.refpntyTimefield.getValue());
				record.set('pntyDescr', refs.refPenaltyfield.getValue());
				record.set('pntyAmt',  refs.refTotalHRSfield.getValue());
				record.set('itemQty', refs.refItemQtyfield.getValue());
				record.set('userId',MOST.config.Token.getUserId());
				record.dirty = true;
				item = record
			}
		});
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.phantom = false;
		updateParm.getProxy().url = store.getProxy().url;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('items', [item.data]);
		MessageUtil.questionModern('Confirm', 'infoupdate_msg',null,
			function(button){
				if (button === 'ok') {
					updateParm.save({
						success:function(){
							me.onTabletLoad();
							MessageUtil.saveSuccess();
							me.onClearField();
						}
					});
			    }else if(button === 'cancel'){
			    	return;
			    };
				}
			);
	},
	onDeleteHHT:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refVesselDelayPenaltyGrid;
		var store = me.getStore('vesselDelayPntyList');
		var selecedRecord = grid.getSelection() ;
		var sltIndex = grid.store.indexOf(selecedRecord);
		if(selecedRecord == undefined || selecedRecord == null){
			MessageUtil.info('info_msg','vslDlPnl_grid_selection_empty_msg');
			return;
		}
		
		//	selectedRecordx = grid.getSelection()[0];		
		var item =Ext.create('MOST.model.controller.VesselDelayPenaltyReport');
		MessageUtil.questionModern('Delete', 'infodelete_msg',null,
				function(button){
					if (button === 'ok') {
						store.each(function(record, index){
							if(index === sltIndex){			
								record.set('vslCallId', me.getViewModel().get('globalVesselCallId').toUpperCase());
								store.remove(record);
							}
						});
						
						store.sync({
							success:function(){
								me.onTabletLoad();
								MessageUtil.saveSuccess();
								me.onClearField();
							}
						});
			        }else if(button === 'cancel'){
			        	return;
			        };
				}
			);
	
	},
	onValidateSubmit: function(){
		var me = this;
		var refs = me.getReferences();

		var startDate = refs.refpntyTimefield.getValue();
		var endDate = refs.refpntyEndTimefield.getValue();
		var contrator= refs.refContratorField.getValue();
		var particulars= refs.refParticularField.getValue();
		
		var starDateTime = Ext.Date.parse(startDate,'d/m/Y H:i');
		var endDateTime = Ext.Date.parse(endDate,'d/m/Y H:i');
		var role = refs.refRoleField.getValue();
		
		var nos = refs.refItemQtyfield.getValue();
		if(nos <= 0){
			MessageUtil.alert('Warning', 'vslDlPnl_nos_empty');
			return false;
		}
				
		var shiftListStore = me.getStore('shiftCombo');
		var shftId = refs.refShiftCbx.getValue();
		var shift = shiftListStore.findRecord('shftId', shftId);
		if(shift == null || shift == ''){
			shift = shiftListStore.findRecord('shftNm', shftId);
		}
		
		var inptDt = Ext.Date.format(refs.refWorkDateTextfield.getValue(), 'd/m/Y');	
		if(particulars == 'SWL'
			|| particulars == 'SWE')	{
			if(role == null || role == ''){
				MessageUtil.alert('Warning', 'vesselDelayRole');
				return false;
			}
			if(startDate == null || startDate == endDate){
				MessageUtil.alert('Warning', 'vslDlPnl_date_empty');
				return false;
			}
			var fmShiftTime = Ext.Date.parse(inptDt + ' ' + shift.get('fmHhmm').substr(0,2) + ':' + shift.get('fmHhmm').substr(2,2),'d/m/Y H:i');
			var toShiftTime = Ext.Date.parse(inptDt + ' ' + shift.get('toHhmm').substr(0,2) + ':' + shift.get('toHhmm').substr(2,2),'d/m/Y H:i');
			if(shftId == 'SF0013' || shftId == '3RD'){
				toShiftTime.setDate(toShiftTime.getDate() + 1);
			}
			
			if(starDateTime != '' && starDateTime != null  && endDateTime != '' && endDateTime != null){
				var dateValidation = me.validateFromToDate(starDateTime, endDateTime);
			
				if(!dateValidation){
					return false;
				}
			}
			
			if(starDateTime != '' && starDateTime != null){
				if(starDateTime < fmShiftTime ||  starDateTime > toShiftTime){
					MessageUtil.alert('Warning', 'vesselDelay_start_shift_time__msg');
					return false;
				}
			}
			
			if(endDateTime != '' && endDateTime != null){
				if(endDateTime < fmShiftTime ||  endDateTime > toShiftTime){
					MessageUtil.alert('Warning', 'vesselDelay_end_shift_time_msg');
					return false;
				}
			}
		}
		
		var myFrom = refs.stevedorePenaltyDetail.validate();
		if(!myFrom){
			Ext.Msg.alert('Validate', 'You are missing requires field');
			return false;
		}
		
		return true;
	},
	
	onClearField : function(){
		var me = this;
		var refs = me.getReferences();
		
		refs.refHatchField.clearValue();
		refs.refParticularField.clearValue();
		refs.refRoleField.clearValue();
		refs.refContratorField.setValue("");
		refs.refpntyEndTimefield.setValue("");
		refs.refpntyTimefield.setValue("");
		refs.refPenaltyfield.setValue("");
		refs.refunitPrcfield.setValue("");
		refs.refTotalHRSfield.setValue("");
		refs.refItemQtyfield.setValue("");
	},
	
	itemQtyLostFocus: function(){
		var me = this;
		var refs = me.getReferences();
		
		var unit = refs.refunitPrcfield.getValue();
		var qty = refs.refItemQtyfield.getValue();
		if(unit == 0 || unit == null || qty == 0 || qty == null){
			refs.refTotalHRSfield.setValue(0);
		}else{
			refs.refTotalHRSfield.setValue(unit*qty);
		}
	},
	
	onSearchContractorPenaltyHHT: function(){
		var me = this;
		var refs = me.getReferences();
		var	title = 'Contractor';
		var	searchType = 'CTT';
		var	targetCtl = 'refContratorField';
		var params = {
			title: title,
			searchType: searchType,
		};		
		ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);	
	},
	onSearchSteveDoreBbHHT: function(){
			var me = this;
			var targetCtl = 'refBtnSearchStvBb';
			var title = 'Stevedore';
			var params = {
					title: title,
					searchType: 'STV',
				};
			ViewUtil.openCodePopup(this, 'app-commoncodepopuphht', targetCtl, params);
	},	
		
	onBtnSearchStvLashing:function(){
		var me = this;
		var title = 'Stevedore';
		var params = {
				title: title,
				searchType: 'STV',
			};	
			ViewUtil.openCodePopup(me, 'app-commoncodepopuphht', 'refBtnlashingStv', params);
		},
	onSearchTrimmingDbHHT:function(){
		var me = this;
		var title = 'Trimming';
		var params = {
				title: title,
				searchType: 'TRM',
			};		
			ViewUtil.openCodePopup(me, 'app-commoncodepopuphht', 'refBtnSearchStevedoreDb', params);
		},
	onPartnerFocusleave: function(ref,event,type) {
		var me = this;
	  	var refs = me.getReferences();
	   	var store = me.getStore('VSRValidationCode');
	   	var tyCd ='';
    	var col1 = '';
	    	
	   	if(StringUtil.isNullorEmpty(ref.getValue())) return;
    	
	   	if(type.e === 'Contractor'){
    			tyCd= "checkCTTForHHT";
	   			col1= ref.getValue().toUpperCase();		
	   	}else if(type.e === 'Requestor'){
	   			tyCd= "checkFWDForHHT";
	   			col1= ref.getValue().toUpperCase();
	   	}else{
	   		return;
	   	}
	   	var params ={
	   			tyCd: tyCd,
				col1: col1,
	   	}
	   	store.load({
			params : params,		
			callback: function(records, operation, success) {
				if (success) {
					if(records != null && records.length > 0){
						if(records[0].get('isValidated') === 'N'){
							ref.setValue("");
							MessageUtil.warning('warning_msg', 'vslchecklist_input_wrongValue_msg',type.e);
						} 
					}
				}
			}
		});
	},
	IsZero: function(ref, val){
		if (ref.getValue() == 0){
			ref.setValue("")
		}
	},
	onFieldFocusleaveHHT:function(ref, event, eOpts,updateCheck){
		// var me = this;
	  	// var refs = me.getReferences();
		// var store = me.getStore('partnerCdPopupStore');
		// var compareFieldName = "ptyCd";
		// var params = {};
		// refs.refBtnUpdate.suspendEvents();
		
		// if (StringUtil.isNullorEmpty(ref.getValue())){
		// 	return;
		// }
		
		// var returnItemFieldNames = {
		// 		code : "ptyCd",
		// 		codeName : "engPtyNm"
		// 	};
		
		// if(me.getView().params){
		// 	params = me.getView().params;
		// }
		
		// params["ptyDivCd"] = "SHA";
		// params["tyCd"] = "CD";
    	
    	// if(params){
    	// 	params[compareFieldName] = ref.getValue().toUpperCase();
    	// }
    	// return new Ext.Promise(function (resolve, reject) {
        // 	store.load({
    	// 		params: params,
    	// 		callback: function(records, operation, success) {
    	// 			if (success) {
    	// 				if(records.length > 0){
    	// 					if(!ref._disabled && ref.getValue()){
    	// 					    ref.setValue(records[0].get(returnItemFieldNames.code));
    	// 					}
    	// 						if(updateCheck)
    	// 					{
    	// 						resolve();
    	// 					}
    						
    						
    	// 				} else {
    	// 					ref.setValue("");
    	// 					if(updateCheck)
    	// 					{
    	// 						reject();
    	// 					}
    						
    	// 				}
    	// 				//refs.refBtnUpdate.resumeEvents();
    	// 			}
    	// 		}
    	// 	});
        // 	});
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
});

