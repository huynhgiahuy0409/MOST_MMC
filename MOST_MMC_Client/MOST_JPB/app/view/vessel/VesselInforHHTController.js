Ext.define('MOST.view.vessel.VesselInforHHTController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],
	alias: 'controller.vesselinforhht',

    listen: {
		controller: {
			'*': {
				loadVesselDetailHHT: 'onLoadVslInfoHHT',
				clearVesslDetailInfo: 'onResetVesselDetailInfo'
			}
		}
	},   	
	
	USER_TYPE_INTERNAL : "I", 				// MOST.config.Token.getUserType()
	USER_TYPE_EXTERNAL : "E", 				// MOST.config.Token.getUserType()
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onInitialize: function(){
		var me = this;
        var refs = me.getReferences();
//        var globalShiftCombo = me.getStore('globalShiftCombo');
//        if(globalShiftCombo.loadCount <= 0){
//        	globalShiftCombo.load({
//                callback: function(record, ope, success){
//        			if(success){
//        				var workDate = Ext.Date.parse(me.getViewModel().get('globalWorkDate'), 'd/m/Y');
//        				refs.refDateChange.setValue(workDate);
//        				refs.refCboShiftChange.setValue(me.getViewModel().get('globalWorkShift'));
//
//        				var currShift = globalShiftCombo.findRecord('shftId', me.getViewModel().get('globalWorkShift'));
//        				me.getViewModel().set('globalWorkShiftInfo', currShift.getData());
//        			}
//                }
//            });
//        }
	},
	
	onPainted: function(){
		var me = this;
        var refs = me.getReferences();
		me.lookupReference('refJpvcRadiofield').setChecked(!refs.refNonJpvcRadiofield.getChecked());
	},
	
	onLoadVslInfoHHT: function(){
    	var me = this;
        var refs = me.getReferences();
        var berthListCombo = me.getStore('berthingListCombo');
        berthListCombo.load({
            callback: function(record, ope, success){
    			if(success){
                    berthListCombo.commitChanges();
                    me.onLoadVslDetailHHT();
    			}
            }
        });
    },

    onLoadVslDetailHHT: function(STT){
        var me = this;
        var refs = me.getReferences();
        var glbVslCallId = me.getViewModel().get('globalVesselCallId');
        if(!glbVslCallId)
            return;
        var vslDetailStore = me.getStore('vesselScheduleDetailHHT');
        
        vslDetailStore.load({
            params:{
            	vslCallId: glbVslCallId
            },
            callback: function(records, ope, success){
                if(success){
                    me.getViewModel().setData({theVslSchl: records[0]});
                    if(STT && STT === 'RELOAD'){
                    	me.setGlobalVessel();
                    }
                }
            }
        });
    },
    
    onSelectBerth: function(ref, newSel, ev){
        var me = this;
        var refs = me.getReferences();
        var berthSelected = ref.getSelection();
        refs.refTxtPsStart.setValue(newSel.get('pstSta'));
        refs.refTxtPsEnd.setValue(newSel.get('pstEnd'));
    },

    onSaveHHT: function(){
        var me = this;
        var refs = me.getReferences();
        var validateWharf
        if(!me.validateVslTime()){
			return;
        }
        if(!me.validateWharf()){
            MessageUtil.warning('warning_msg', 'vslinfohht_wharfstart_end');
			return;
        }
        var store = me.getStore('vesselScheduleDetailHHT');
        var theDetail = me.getViewModel().getData().theVslSchl;

        var atbPilot = refs.refChkAtbPilot.getChecked() ? 'Y':'N';
        var atuPilot = refs.refChkAtuPilot.getChecked() ? 'Y':'N';
        var atb = refs.refDtVslSchAtb.getValue();
        var atu = refs.refDtVslSchAtu.getValue();

        theDetail.set('atb', Ext.Date.parse(atb, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
        theDetail.set('atu', Ext.Date.parse(atu, MOST.config.Locale.getDefaultDateFormatWithNoSeconds()));
        theDetail.set('atbPilot', atbPilot);
        theDetail.set('atuPilot', atuPilot);
        theDetail.dirty = true;
        
        store.insert(0, theDetail);
        MessageUtil.questionModern('tbl_confrm_update', 'vslinfohht_confirm_upd', null, function(button){
            if(button === 'ok'){
                store.sync({
                    success:function(){
                        MessageUtil.saveSuccess();
                        me.onLoadVslDetailHHT('RELOAD');
                    }
                });
            }
        });
    },
    
    validateVslTime: function(){
        var me = this;
        var refs = me.getReferences();
        var theDetail = me.getViewModel().getData().theVslSchl;
        var ata = Ext.Date.format(theDetail.get('ata'), MOST.config.Locale.getDefaultDateFormatWithNoSeconds());    
        var atb = refs.refDtVslSchAtb.getValue();
        var atw = refs.refDtVslSchAtw.getValue();
        var atc = refs.refDtVslSchAtc.getValue();
        var atu = refs.refDtVslSchAtu.getValue();

        if(!atb){
            MessageUtil.warning('warning_msg', 'vslinfohht_upd_atb');
            return false;
        }

        var arrDt = new Array (ata, atb, atw, atc, atu);
		for(var i = 0; i < arrDt.length - 1; i++){
			if(arrDt[i] == null)
				continue;
			var dt1 = Ext.Date.parse(arrDt[i], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			for(var j = i+1; j < arrDt.length; j++){
				if(arrDt[j] == null)
					continue;
				var dt2 = Ext.Date.parse(arrDt[j], MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
                if(dt1 >= dt2){
                    MessageUtil.warning('warning_msg', 'vslinfohht_invalid_ordertime');
					return false;
                }
			}
        }
		return true;
    },

    validateWharf: function(){
        var me = this;
        var refs = me.getReferences();
        var wStart = refs.refWharfMarkFrom.getValue();
        var wEnd = refs.refWharfMarkTo.getValue();
        if(!wStart || !wEnd){
            return true;
        }
        if(refs.refWharfMarkFrom.getValue() >= refs.refWharfMarkTo.getValue()){
            return false;
        }
        return true;
    },

    wharfMarkFocusOut: function(ref, value, eOp){
        var me = this;
        var refs = me.getReferences();
        var loa = refs.refTxtLoad.getValue();
        var wStart = refs.refWharfMarkFrom.getValue();
        var wEnd = refs.refWharfMarkTo.getValue();
        if(ref.reference == 'refWharfMarkFrom'){
            refs.refWharfMarkTo.setValue(wStart+loa);
        }
    },

    setGlobalVessel: function(){
        var me = this;
        var theDetail = me.getViewModel().getData().theVslSchl;
        theDetail.set('vslCallId', theDetail.data.jpvcNo);

        me.getViewModel().set('globalVesselName', 			theDetail.data.vslNm);
        me.getViewModel().set('globalVesselLoa', 			theDetail.data.loa);
        me.getViewModel().set('globalBerthNo', 				theDetail.data.berthLoc);
        me.getViewModel().set('globalBerthFrom', 			theDetail.data.berthFrom);
        me.getViewModel().set('globalBerthTo', 				theDetail.data.berthTo);
        me.getViewModel().set('globalWharfStart', 			theDetail.data.wharfMarkFrom);
        me.getViewModel().set('globalWharfEnd', 			theDetail.data.wharfMarkTo);
        me.getViewModel().set('globalEta', 					theDetail.data.eta);
        me.getViewModel().set('globalAtb', 					theDetail.data.atb);
        me.getViewModel().set('globalArrivalPilotCheck', 	theDetail.data.atbPilot === 'Y');
        me.getViewModel().set('globalArrivalMooring', 		theDetail.data.atbMooring);
        me.getViewModel().set('globalArrivalTug', 			theDetail.data.atbTug);
        me.getViewModel().set('globalAtw', 					theDetail.data.atw);
        me.getViewModel().set('globalAtc', 					theDetail.data.atc);
        me.getViewModel().set('globalAtu', 					theDetail.data.atu);
        me.getViewModel().set('globalDeparturePilotCheck', 	theDetail.data.atuPilot === 'Y');
        me.getViewModel().set('globalDepartureMooring', 	theDetail.data.atuMooring);
        me.getViewModel().set('globalDepartureTug', 		theDetail.data.atuTug);
        me.getViewModel().set('theVessel',theDetail.data);			
    },
    
    
    //******************************************************************************************
    //***********Vessel Schedule Picker - HHT first screen**************************************
    //******************************************************************************************
	
	onChangeUpperCase: function(field, newValue){
    	var me = this;
    	var vslStore = me.getStore('JPVCPopupStore');
    	var refs = me.getReferences();
    	
		field.setValue(newValue.toUpperCase());
		vslStore.removeAll();
		vslStore.commitChanges();
		var grid = refs.refVesselScheduleGrid;
		grid.getStore().removeAll();
	},
	
    onCheckJpvcRadioField: function(radioField, newValue, oldValue, eOpts) {
		var me = this;
		var refs = me.getReferences();
		
		if (radioField.getValue() === 'VESSEL' && newValue === true) {
			refs.refVesselScheduleButton.setDisabled(false);
			me.fireEvent('closeAllTab');
			
			var prevGlobalVsl = me.getViewModel().get('prevGlobalVsl');
			if(prevGlobalVsl){
				me.fireEvent('setVesselSchedule', 'VESSEL', prevGlobalVsl);
			}
			refs.refVesselScheduleGridPanel.setHidden(false);
			
		} else if (radioField.getValue() === 'VESSEL' && newValue === false) {
			//initiate vessel schedule
			me.fireEvent('setVesselSchedule', 'NON-VESSEL', null);

			//hide vessel scheduler gird panel
			var panel = refs.refVesselScheduleGridPanel;
			var grid = refs.refVesselScheduleGrid;
		}
	},
	
	onResetVesselDetailInfo: function(){
		var me = this;
		var refs = me.getReferences();
		//refs.refFrmPanelVesselDetailInfoPicker.reset();
	},
	
	onOpenVesselSchedule: function(btn){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refVesselScheduleGridPanel;
		panel.setHeight(300);
		me.onLoadDefaultListVessel();
	},
	
	onOpenChangeShiftDate: function(btn){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refChangeShiftDateGridPanel;
		panel.setHidden(false);
	},
	onApplyNewShiftDate: function (btn){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refChangeShiftDateGridPanel;
		if(!panel.validate()){
			MessageUtil.warning('warning_msg', 'vslinfohht_date_shift');
			return;
		}
		
		MessageUtil.questionModern('info_msg', 'vslinfohht_cfm_change_date_shift', null, 
			function(button){
				if(button == 'ok'){
					me.applyChangeShiftDate();
				}else{
					me.onCancelChangeShiftDate();
				}
			}
		);
	},
	
	onCancelChangeShiftDate: function(){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refChangeShiftDateGridPanel;
		
		var crrWkDate = MOST.config.Token.getWorkDate(); //DateType
		var crrWkShift = MOST.config.Token.getWorkShift();
		
		var workDate = me.lookupReference('refDateChange').setValue(crrWkDate);
		var workShift = me.lookupReference('refCboShiftChange').setValue(crrWkShift);
		
		panel.setHidden(true);
	},
	
	applyChangeShiftDate: function(){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refChangeShiftDateGridPanel;
		
		//Process change:
		me.fireEvent('closeAllTab');
		
		var workDate = me.lookupReference('refDateChange').getValue();
		var workShift = me.lookupReference('refCboShiftChange').getValue();
		var workShiftDisplay = me.lookupReference('refCboShiftChange').getInputValue();
		
		//set to Token:
		MOST.config.Token.setWorkDate(workDate); //DateType
		MOST.config.Token.setWorkShift(workShift);
		MOST.config.Token.setWorkShiftDisplay(workShiftDisplay);
		
		//set to Global:
		me.getViewModel().set('globalWorkDate',Ext.Date.format(workDate, 'd/m/Y'));//String of Date
		me.getViewModel().set('globalWorkShift',  MOST.config.Token.getWorkShift());
		me.getViewModel().set('globalWorkShiftDisplay', MOST.config.Token.getWorkShiftDisplay());
		me.getViewModel().set('globalWorkShiftInfo', refs.refCboShiftChange.getSelection().getData());
		
		//clear VesselList Store
		var vslStore = me.getStore('JPVCPopupStore');
		vslStore.removeAll();
		vslStore.commitChanges();
		
		//Hide form
		panel.setHidden(true);
	},

	onApplyVesselSchedule: function(btn){
		var me = this;
		var refs = me.getReferences();
		var panel = refs.refVesselScheduleGridPanel;
		var grid = refs.refVesselScheduleGrid;
		var selection = grid.getSelection();
		
		

		if(btn.reference === 'refBtnStorageVessel'){
			refs.refNonJpvcRadiofield.setChecked(true);
			panel.setHeight(1);
			me.fireEvent('setVesselSchedule', 'NON-VESSEL', null);
			
		}else if (btn.reference === 'refBtnSelectVessel'){
			//Select VSL:
			if(!selection){
				MessageUtil.warning('warning_msg', 'select_list_msg');
				return;
			}else if (selection) {
				me.fireEvent('setVesselSchedule', 'VESSEL', selection);
				panel.setHeight(1);
				refs.refJpvcRadiofield.setChecked(true);
			}
		}
		
	},
	
	//Load Default vessel latest one month order by ATB desc:
	onLoadDefaultListVessel: function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('JPVCPopupStore');
     	workingDt = me.getViewModel().get('globalWorkDate');
     	if(!workingDt){
     		return;
     	}

		store.load({
			params: {
 				hhtYn: 'Y',
 				searchType: 'HHT_DEFAULT',
 				workDt: workingDt,
			},
			callback: function(records, operation, success) {
				if (success) {
				}
			}
		});
		
	},

	onSearchVesselSchedule: function(btn) {
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore('JPVCPopupStore');
     	var panel = refs.refVesselScheduleGridPanel;
		var inputStr = refs.refFindScheduleTextField.getValue();
		
		panel.setHeight(300);
		panel.setHidden(false);

 		var inputVslCallId = (inputStr!=null ? inputStr.toUpperCase() : inputStr);
 		params = {
 			vslCallId : inputVslCallId,
		}
    	
    	if(params == null){
    		me.me.onOpenVesselSchedule();
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
	
	onChangeDateTextField:function(ctl, newValue, oldValue, eOpts){
		if(newValue && newValue instanceof Date && newValue != oldValue){
			var value = Ext.Date.format(newValue, MOST.config.Locale.getDefaultDateFormatWithNoSeconds());
			ctl.setValue(value);
		}
	}    
    
});
