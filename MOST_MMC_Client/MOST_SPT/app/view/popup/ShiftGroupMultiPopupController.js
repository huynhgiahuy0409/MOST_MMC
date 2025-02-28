Ext.define('MOST.view.popup.ShiftGroupMultiPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.shiftgroupmultipopup',
	
	SHFT_01: '',
	SHFT_02: '',
	SHFT_03: '',
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	// After Renderer Event
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var store = me.getStore('shiftList');
    	var record = Ext.create('MOST.model.planning.RosterConfigurationMonthly');
    	var strDate = me.getView().recvData[0];
    	var date = strDate.substr(6,7) + "/" +  strDate.substr(4,2) + "/" + strDate.substr(0,4);
    	var shftDivCd = me.getView().recvData[1];
    	var params = {};

    	refs.txtDate.setText("Date : " + date);
    	
	    params.divCd = shftDivCd;
	    params.useYn = 'Y';
	    store.getProxy().extraParams = params;
	    
    	store.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						for(var i=0; i<records.length; i++ ){
							if(records[i].get('shftIdx') == '1'){
								me.SHFT_01 = records[i].get('shftId')
							} else if(records[i].get('shftIdx') == '2'){
								me.SHFT_02 = records[i].get('shftId')
							} else if(records[i].get('shftIdx') == '3'){
								me.SHFT_03 = records[i].get('shftId')
							}
						}
						
						if(store.find('shftIdx', '1') == -1){
							refs.refShiftGroupPopupGrid1.setHidden(true);
							refs.chkAll1.setHidden(true);
							refs.lbShft1.setHidden(true);
						} else {
							refs.refShiftGroupPopupGrid1.setHidden(false);
							refs.chkAll1.setHidden(false);
							refs.lbShft1.setHidden(false);
						}
						
						if(store.find('shftIdx', '2') == -1){
							refs.refShiftGroupPopupGrid2.setHidden(true);
							refs.chkAll2.setHidden(true);
							refs.lbShft2.setHidden(true);
						} else {
							refs.refShiftGroupPopupGrid2.setHidden(false);
							refs.chkAll2.setHidden(false);
							refs.lbShft2.setHidden(false);
						}
						
						if(store.find('shftIdx', '3') == -1){
							refs.refShiftGroupPopupGrid3.setHidden(true);
							refs.chkAll3.setHidden(true);
							refs.lbShft3.setHidden(true);
						} else {
							refs.refShiftGroupPopupGrid3.setHidden(false);
							refs.chkAll3.setHidden(false);
							refs.lbShft3.setHidden(false);
						}
						
						me.onSetGroupData();
					}
				}
			}
    	});
	},
	
	onSetGroupData:function(){
		var me = this;
		var refs = me.getReferences();
    	var store1 = me.getStore('shiftGroupMultiList1');
    	var store2 = me.getStore('shiftGroupMultiList2');
    	var store3 = me.getStore('shiftGroupMultiList3');
    	var store4 = me.getStore('shiftGroupMultiList4');
    	var record = Ext.create('MOST.model.planning.RosterConfigurationMonthly');
    	var strDate = me.getView().recvData[0];
    	var date = strDate.substr(6,7) + "/" +  strDate.substr(4,2) + "/" + strDate.substr(0,4);
    	
    	refs.txtDate.setText("Date : " + date);
    	
    	var shftDivCd = me.getView().recvData[1];
    	var params = {};
    	
	    params.divCd = shftDivCd;
	    params.useYn = 'Y';
	    store1.getProxy().extraParams = params;
	    store2.getProxy().extraParams = params;
	    store3.getProxy().extraParams = params;
	    store4.getProxy().extraParams = params;
    	
    	store1.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(me.getView().recvData.length > 2){
							for (var i = 2; i < me.getView().recvData.length;i++){
								var item = me.getView().recvData[i];
								
								if(item.idx == '1'){
									var shtGrpCds = item.id.substr(14);
									var strSplit = shtGrpCds.split('|');
									if(strSplit.length > 0){
										for(var j = 0; j < strSplit.length; j++){
											record = store1.findRecord('groupCd', strSplit[j]);
											
											if(record){
												record.set('chkShiftGroupMulti', 1);
											}
										}
										store1.commitChanges();
									}
								}
							}
						}
					}
				}
			}
		});
		store2.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(me.getView().recvData){
							for (var i = 2; i < me.getView().recvData.length;i++){
								var item = me.getView().recvData[i];
								if(item.idx == '2'){
									var shtGrpCds = item.id.substr(14);
									var strSplit = shtGrpCds.split('|');
									if(strSplit.length > 0){
										for(var j = 0; j < strSplit.length; j++){
											record = store2.findRecord('groupCd', strSplit[j]);
											if(record){
												record.set('chkShiftGroupMulti', 1);
											}
										}
										store2.commitChanges();
									}
								}
							}
						}
					}
				}
			}
		});
		store3.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(me.getView().recvData){
							for (var i = 2; i < me.getView().recvData.length;i++){
								var item = me.getView().recvData[i];
								if(item.idx == '3'){
									var shtGrpCds = item.id.substr(14);
									var strSplit = shtGrpCds.split('|');
									if(strSplit.length > 0){
										for(var j = 0; j < strSplit.length; j++){
											record = store3.findRecord('groupCd', strSplit[j]);
											if(record){
												record.set('chkShiftGroupMulti', 1);
											}
										}
										store3.commitChanges();
									}
								}
							}
						}
					}
				}
			}
		});
		store4.load({
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(me.getView().recvData){
							for (var i = 0; i < me.getView().recvData.length;i++){
								var item = me.getView().recvData[i];
								
								if(item.idx == '99'){
									var shtGrpCds = item.id.substr(14);
									var strSplit = shtGrpCds.split('|');
									
									if(strSplit.length > 0){
										for(var j = 0; j < strSplit.length; j++){
											record = store4.findRecord('groupCd', strSplit[j]);
											
											if(record){
												record.set('chkShiftGroupMulti', 1);
											}
										}
										
										store4.commitChanges();
									}
								}
							}
						}
					}
				}
			}
		});
	},
	
	onUpdate: function(){
		var me = this;
		var refs = me.getReferences();
		var store1 = me.getStore('shiftGroupMultiList1');	
		var store2 = me.getStore('shiftGroupMultiList2');	
		var store3 = me.getStore('shiftGroupMultiList3');	
		var store4 = me.getStore('shiftGroupMultiList4');	
		var setChkGrpCdValues = '';
		var setChkGrpNmValues = '';
		var selectArray = new Array();
		
		MessageUtil.question('confirmTitle', 'roster_add_grp_success',null,
	    	function(button){
				if(button === 'ok'){
					var cnt = 0;
					var setChkGrpCdValue = '';
					var setChkGrpNmValue = '';
					var storeTotal = store1.totalCount;
					
					store1.each(function(record,idx){
						if(record.data.chkShiftGroupMulti === 1) {
							if(storeTotal > cnt ){
								if(setChkGrpCdValue === ''){
									setChkGrpCdValue = record.data.groupCd
									setChkGrpNmValue = record.data.groupNm
								} else {
									setChkGrpCdValue += "|" + record.data.groupCd
									setChkGrpNmValue += "|" + record.data.groupNm
								}
								selectArray.push(record.data);
							}
							cnt++;
						}
					});	
					
					if(setChkGrpCdValue != ''){
						if(setChkGrpCdValues == ''){
							setChkGrpCdValues = me.SHFT_01 + setChkGrpCdValue
							setChkGrpNmValues = me.SHFT_01 + setChkGrpNmValue
						} else {
							setChkGrpCdValues += "&" + me.SHFT_01 + setChkGrpCdValue
							setChkGrpNmValues += "&" + me.SHFT_01 + setChkGrpNmValue
						}
					}
					
					var cnt = 0;
					var setChkGrpCdValue = '';
					var setChkGrpNmValue = '';
					var storeTotal = store2.totalCount;
					
					store2.each(function(record,idx){
						if(record.data.chkShiftGroupMulti === 1) {
							if(storeTotal > cnt ){
								if(setChkGrpCdValue === ''){
									setChkGrpCdValue = record.data.groupCd
									setChkGrpNmValue = record.data.groupNm
								} else {
									setChkGrpCdValue += "|" + record.data.groupCd
									setChkGrpNmValue += "|" + record.data.groupNm
								}
								selectArray.push(record.data);
							}
							cnt++;
						}
					});	
					
					if(setChkGrpCdValue != ''){
						if(setChkGrpCdValues == ''){
							setChkGrpCdValues = me.SHFT_02 + setChkGrpCdValue
							setChkGrpNmValues = me.SHFT_02 + setChkGrpNmValue
						} else {
							setChkGrpCdValues += "&" + me.SHFT_02 + setChkGrpCdValue
							setChkGrpNmValues += "&" + me.SHFT_02 + setChkGrpNmValue
						}
					}
					
					var cnt = 0;
					var setChkGrpCdValue = '';
					var setChkGrpNmValue = '';
					var storeTotal = store3.totalCount;
					
					store3.each(function(record,idx){
						if(record.data.chkShiftGroupMulti === 1) {
							if(storeTotal > cnt ){
								if(setChkGrpCdValue === ''){
									setChkGrpCdValue = record.data.groupCd
									setChkGrpNmValue = record.data.groupNm
								} else {
									setChkGrpCdValue += "|" + record.data.groupCd
									setChkGrpNmValue += "|" + record.data.groupNm
								}
								selectArray.push(record.data);
							}
							cnt++;
						}
					});	
					
					if(setChkGrpCdValue !=  ''){
						if(setChkGrpCdValues == ''){
							setChkGrpCdValues = me.SHFT_03 + setChkGrpCdValue
							setChkGrpNmValues = me.SHFT_03 + setChkGrpNmValue
						} else {
							setChkGrpCdValues += "&" + me.SHFT_03 + setChkGrpCdValue
							setChkGrpNmValues += "&" + me.SHFT_03 + setChkGrpNmValue
						}
					}
					
					var cnt = 0;
					var setChkGrpCdValue = '';
					var setChkGrpNmValue = '';
					var storeTotal = store4.totalCount;
					
					store4.each(function(record,idx){
						if(record.data.chkShiftGroupMulti === 1) {
							if(storeTotal > cnt ){
								if(setChkGrpCdValue === ''){
									setChkGrpCdValue = record.data.groupCd
									setChkGrpNmValue = record.data.groupNm
								} else {
									setChkGrpCdValue += "|" + record.data.groupCd
									setChkGrpNmValue += "|" + record.data.groupNm
								}
								selectArray.push(record.data);
							}
							cnt++;
						}
					});	
					
					if(setChkGrpCdValue != ''){
						if(setChkGrpCdValues == ''){
							setChkGrpCdValues = 'DOSHFT' + setChkGrpCdValue
							setChkGrpNmValues = 'DOSHFT' + setChkGrpNmValue
						} else {
							setChkGrpCdValues += "&" + 'DOSHFT' + setChkGrpCdValue
							setChkGrpNmValues += "&" + 'DOSHFT' + setChkGrpNmValue
						}
					}
	
					if(!me.validateShiftDuplication(selectArray)){
						MessageUtil.question('confirmTitle', 'Shift Group is already assigned, do you want to keep continue?',null,
							function(button) {
								if (button === 'ok') {
									me.onUpdateRoster(setChkGrpCdValues, setChkGrpNmValues, selectArray);
								} if (button === 'cancel'){
									selectArray = new Array();
								}
							});
					} else {
						me.onUpdateRoster(setChkGrpCdValues, setChkGrpNmValues, selectArray);
					}
				}
			}
		);
	},

	onUpdateRoster: function(setChkGrpCdValues, setChkGrpNmValues, selectArray){
		var me = this;
		var window = me.getView().up('window');
		var returnItem = {
			code : setChkGrpCdValues,
			name : setChkGrpNmValues,
			item : selectArray,
			status: 'Success',
			shftTpCd: me.getView().recvData[1]
		}

		window.returnValue = returnItem;
		window.close(); //return afterSetCodePopupData() function RosterConfigurationController.js
	},
	
	onShiftGroupMultiCheckChange: function(changedCheckbox, rowIdx, checked, record, e, eOpts){
		var me = this;
		var refs = me.getReferences(); 
		
		if (checked) {
			var groupCd = record.data.groupCd;
			var groupNm = record.data.groupNm;
			var shiftGroupListOnlyStore = me.getStore('shiftGroupListOnlyStore');
			shiftGroupListOnlyStore.load({
				params: {
					shftGrpCd: groupCd,
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records.length == 0) {
							MessageUtil.warning('Warning', 'noStaffAddedInGroup',[groupNm]);
							return;
						}
						else {
							record.set({
								chkShiftGroupMulti: 1
							});
						}
					}
				}
			});
			
		} else {
			me.onSetLoadingAndDisable(true);
			
			var groupCd = record.data.groupCd;
			var deployedGroupStaffListOnlyStore = me.getStore('deployedGroupStaffListOnlyStore');
			var date = refs.txtDate.text.split(':')[1].trim();
			var shftId = me.getCurrentShiftIdOfClickedGrid(changedCheckbox);
			
			deployedGroupStaffListOnlyStore.load({
				params: {
					groupCd: groupCd,
					plannedYmd: date,
					shftId: shftId
				},
				callback: function(records, operation, success) {
					if (success) {
						if(records.length > 0) {
							record.set({
				            	chkShiftGroupMulti: 1
							});
							me.onSetLoadingAndDisable(false);
							MessageUtil.warning('Warning', 'The Group has been used for planning, cannot remove');
							return;
						}
						else {
							 record.set({
					            	chkShiftGroupMulti: 0
							 });
							 me.onSetLoadingAndDisable(false);
						}
					}
				}
			});
           
		}
		record.store.commitChanges();
	},
	
	getCurrentShiftIdOfClickedGrid: function(changedCheckbox) {
		var me = this;
		var currentShiftId;
		
		if (changedCheckbox.up('[reference=refShiftGroupPopupGrid1]')) {
			currentShiftId = me.SHFT_01
	    } else if (changedCheckbox.up('[reference=refShiftGroupPopupGrid2]')) {
	    	currentShiftId = me.SHFT_02
	    } else if (changedCheckbox.up('[reference=refShiftGroupPopupGrid3]')) {
	    	currentShiftId = me.SHFT_03
	    } else if (changedCheckbox.up('[reference=refShiftGroupPopupGrid4]')) {
	    	currentShiftId = 'DOSHFT'
	    }
		
		return currentShiftId;
	},
	
	onSetLoadingAndDisable: function(flag) {
		var me 			= this;
		var refs 		= me.getReferences(); 
		
		var gridShift1 	= refs.refShiftGroupPopupGrid1;
		var gridShift2 	= refs.refShiftGroupPopupGrid2;
		var gridShift3 	= refs.refShiftGroupPopupGrid3;
		var gridDayOff 	= refs.refShiftGroupPopupGrid4;
		var chkAll1 	= refs.chkAll1;
		var chkAll2 	= refs.chkAll2;
		var chkAll3 	= refs.chkAll3;
		var chkAllDayOff = refs.chkAll4;
		var btnUpdate 	= refs.btnUpdate;
		
		gridShift1.setLoading(flag);
		gridShift2.setLoading(flag);
		gridShift3.setLoading(flag);
		gridDayOff.setLoading(flag);
		chkAll1.setDisabled(flag);
		chkAll2.setDisabled(flag);
		chkAll3.setDisabled(flag);
		btnUpdate.setDisabled(flag);
		chkAllDayOff.setDisabled(flag);
	},
	
	getAllGroupNameThatBeingUsed: function (shiftId) {
		var me = this;
		var combinedShftGrpCd = me.compDomain.controller.view.recvData;
		var foundValues = []; 
		var foundIndex = -1;
			
		combinedShftGrpCd.forEach(function(data, index) {
			if (data.id && data.id.indexOf(shiftId) !== -1) {
				foundValues.push(data.id);
				foundIndex = index;
			}
		});

		return foundIndex !== -1 ? combinedShftGrpCd[foundIndex].title : '';
	},
	
	onCheckAllMatchedRecordsOnGridShiftStore: function(staffListStore, gridShiftStore) {
		gridShiftStore.each(function(record){
			var matchRecord = staffListStore.findRecord('shftGroupCd', record.get('groupCd'));
			if(matchRecord) 
				record.set({ chkShiftGroupMulti: 1 });
		})
	},
	
	onAllCheck1: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var gridShift1store = me.getStore('shiftGroupMultiList1');
		var staffListStore = me.getStore('staffListStore');
		
		if(chk.value){
			staffListStore.load({
				callback: function(records, operation, success) {
					if(success) {
						me.onCheckAllMatchedRecordsOnGridShiftStore(staffListStore, gridShift1store);
					}
				}
			});

		} else {
			me.onSetLoadingAndDisable(true);
			
			if (me.getAllGroupNameThatBeingUsed(me.SHFT_01) != '') {
			    var warningMessage = 'Group ' + me.getAllGroupNameThatBeingUsed(me.SHFT_01) + ' have been used for planning, cannot remove';
			    MessageUtil.warning('Warning', warningMessage);
				me.onSetLoadingAndDisable(false);
			} else {
			    gridShift1store.each(function(record) {
			        record.set({
			            chkShiftGroupMulti: 0
			        });
			    });
			    me.onSetLoadingAndDisable(false);
			}
		}
		
		gridShift1store.commitChanges();
	},
	
	onAllCheck2: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var gridShift2store = me.getStore('shiftGroupMultiList2');
		var staffListStore = me.getStore('staffListStore');
		
		if(chk.value){
			staffListStore.load({
				callback: function(records, operation, success) {
					if(success) {
						me.onCheckAllMatchedRecordsOnGridShiftStore(staffListStore, gridShift2store);
					}
				}
			});
		} else {
			me.onSetLoadingAndDisable(true);
			
			if (me.getAllGroupNameThatBeingUsed(me.SHFT_02) != '') {
			    var warningMessage = 'Group ' + me.getAllGroupNameThatBeingUsed(me.SHFT_02) + ' have been used for planning, cannot remove';
			    MessageUtil.warning('Warning', warningMessage);
				me.onSetLoadingAndDisable(false);
			} else {
			    gridShift2store.each(function(record) {
			        record.set({
			            chkShiftGroupMulti: 0
			        });
			    });
			    me.onSetLoadingAndDisable(false);
			}
		}
		
		gridShift2store.commitChanges();
	},
	
	onAllCheck3: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var gridShift3store = me.getStore('shiftGroupMultiList3');
		var staffListStore = me.getStore('staffListStore');
		
		
		if(chk.value){
			staffListStore.load({
				callback: function(records, operation, success) {
					if(success) {
						me.onCheckAllMatchedRecordsOnGridShiftStore(staffListStore, gridShift3store);
					}
				}
			});
		} else {
			me.onSetLoadingAndDisable(true);
			
			if (me.getAllGroupNameThatBeingUsed(me.SHFT_03) != '') {
			    var warningMessage = 'Group ' + me.getAllGroupNameThatBeingUsed(me.SHFT_03) + ' have been used for planning, cannot remove';
			    MessageUtil.warning('Warning', warningMessage);
				me.onSetLoadingAndDisable(false);
			} else {
			    gridShift3store.each(function(record) {
			        record.set({
			            chkShiftGroupMulti: 0
			        });
			    });
			    me.onSetLoadingAndDisable(false);
			}
		}
		
		gridShift3store.commitChanges();
	},
	
	onAllCheck4: function(chk, newValue, oldValue, eOpts) {
		var me = this;
		var gridDayOffShiftStore = me.getStore('shiftGroupMultiList4');
		var staffListStore = me.getStore('staffListStore');
		
		if(chk.value){
			staffListStore.load({
				callback: function(records, operation, success) {
					if(success) {
						me.onCheckAllMatchedRecordsOnGridShiftStore(staffListStore, gridDayOffShiftStore);
					}
				}
			});
		} else {
			me.onSetLoadingAndDisable(true);
			
			if (me.getAllGroupNameThatBeingUsed('DOSHFT') != '') {
			    var warningMessage = 'Group ' + me.getAllGroupNameThatBeingUsed('DOSHFT') + ' have been used for planning, cannot remove';
			    MessageUtil.warning('Warning', warningMessage);
				me.onSetLoadingAndDisable(false);
			} else {
				gridDayOffShiftStore.each(function(record) {
			        record.set({
			            chkShiftGroupMulti: 0
			        });
			    });
			    me.onSetLoadingAndDisable(false);
			}
		}
		
		gridDayOffShiftStore.commitChanges();
	},


	validateShiftDuplication: function(selectItems){
		var valid = true;
		for(i = 0; i < selectItems.length; i++){
			for(j = 0; j<selectItems.length; j++){
				if(i != j && selectItems[i].groupCd === selectItems[j].groupCd){
					valid = false;
					break;
				}
			}
		}

		return valid;
	}
	
});