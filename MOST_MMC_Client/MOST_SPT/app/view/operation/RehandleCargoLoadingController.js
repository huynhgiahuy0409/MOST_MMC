Ext.define('MOST.view.operation.RehandleCargoLoadingController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.confirmrehandleloadingpopup',	
	autoLocFlag: false,
	autoPartialFlag: false,
	autoNorLocFlag: false,
	norManualFlag: false,
	amtNorFlag: false,
	empNorLocCount: false,
	amtOverNorLoc: false,
	prevWhItems : new Array(),
	/**
	 * =========================================================================================================================
	 * INITIALIZE START	
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var ctlLorryNo = refs.ctlLorryNo;
		var deliveryModeComboStore = me.getStore('deliveryModeCombo');
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingLoadingList');
		var hatchNoCombo = me.getStore('hatchNoCombo');
		var cboClearance = refs.cboClearance;
		var clearanceComboStore = me.getStore('clearanceCombo');
		var modeOfOprComboStore = me.getStore('modeOfOprCombo');
		var cboTsptTpCd = refs.cboTsptTpCd;
		var cboBreakBulkHatchNo = refs.cboBreakBulkHatchNo;
		var cntDryBulk = refs.cntDryBulk;
		var cntBreakBulk = refs.cntBreakBulk;
		var txtDryBulkEquip = refs.txtDryBulkEquip;
		var txtFacility = refs.txtFacility;
		var cboDryBulkHatchNo = refs.cboDryBulkHatchNo;
		var txtStevedore = refs.txtStevedore;
		var txtBreakBulkEquip = refs.txtBreakBulkEquip;
		var txtHatchDrtCd = refs.txtHatchDrtCd;
		
		var cboDeliveryMode = refs.cboDeliveryMode;
		var recvData = me.getView().recvData;
		
		var selection = recvData['selection'];
		var shiftInfo = recvData['shiftInfo'];
		var shiftDt = shiftInfo.get('shftDt');
		var shiftNo = shiftInfo.get('shftId');
		var nxVslCallId = selection.get('nxVslCallId');
		var cgTpCd = selection.get('cgTpCd');
	
		ctlLorryNo.getReferences().ctlField.labelEl.setStyle({"text-align":"left"});
		cboClearance.bindStore(clearanceComboStore);
		
		deliveryModeComboStore.load();
		cboDeliveryMode.setValue("I");
		
		if(cgTpCd == "BBK"){
			txtDryBulkEquip.setDisabled(true);
			txtFacility.setDisabled(true);
			cboDryBulkHatchNo.setDisabled(true);
			
			txtStevedore.setDisabled(false);
			txtBreakBulkEquip.setDisabled(false);
			txtHatchDrtCd.setDisabled(false);
			cboBreakBulkHatchNo.setDisabled(false);	
		}
		
		if(cgTpCd == "DBK"){
			txtDryBulkEquip.setDisabled(false);
			txtFacility.setDisabled(false);
			cboDryBulkHatchNo.setDisabled(false);
			
			txtStevedore.setDisabled(true);
			txtBreakBulkEquip.setDisabled(true);
			txtHatchDrtCd.setDisabled(true);
			cboBreakBulkHatchNo.setDisabled(true);
		}
		
		cargoRehandlingLoadingListStore.load({
			params:{
				vslCallId: nxVslCallId,
				shiftDt: shiftDt,
				shiftId: shiftNo,
				cgTpCd: selection.get('cgTpCd'),
				rhdlGroupNo: selection.get('rhdlGroupNo'),
				cgNo: selection.get('nxCgNo'),
				shipgNoteNo: selection.get('nxRefNo'),
				rhdlGroupNo: selection.get('rhdlGroupNo')
			},
			callback: function(records, operation, success) {
				if (success) {
					var detailItem = new Ext.create('MOST.model.operation.CargoLoading');
					detailItem.data = records[0].data;
					detailItem.set('shftNm', shiftInfo.get('shftNm'));
					detailItem.set('shftId', shiftInfo.get('shftId'));
					detailItem.set('shftDt', shiftInfo.get('shftDt'));
					
					DateUtil.convertDateToLong(detailItem.data, ['shiftStartDt', 'shiftEndDt']);
					
					detailItem.set('startDt', detailItem.get('shiftStartDt'));
					detailItem.set('endDt', detailItem.get('shiftEndDt'));
						
					me.getViewModel().setData({theRhdlDetail:detailItem});
//					me.getViewModel().setData({theOprSetHatch:records[0].data.operationSetHatchList[0]});
//					hatchNoCombo.setData(records[0].data.hatchNoList);
					modeOfOprComboStore.setData(records[0].data.modeOfOprList);
						
					if(records[0].data.custMode == null || records[0].data.custMode == ''){
						cboClearance.setValue("Hold");
					}else{
						cboClearance.setValue(records[0].data.custMode);
					}
					
					cboTsptTpCd.setValue(records[0].data.tsptTpCd)
					
					if(StringUtil.isNullorEmpty(records[0].get('cgNo'))){
						
						MessageUtil.show(Ext.Msg.WARNING,'Warning' ,'confirmrehandleloading_loading_data_empty','',
								function(button){
								if (button === 'ok') {
									me.getView().up('window').close();
						        }
						});
					}
					me.operationSeting(records[0]);
					//cboBreakBulkHatchNo.setValue(records[0].data.operationSetHatchList.)
				}
			}
		})
		
		//window.setPosition(-180,-500,true);
		window.center();
	},
	
	// operationSeting
	operationSeting : function(recvData){
		var me = this;
     	var refs = me.getReferences();

		if(recvData.get('cgTpCd') === 'BBK'){
			refs.cboBreakBulkHatchNo.setReadOnly(false);
			refs.cboDryBulkHatchNo.setReadOnly(true);
			
			me.getHatchComboInformation(recvData);

		} else if (recvData.get('cgTpCd') === 'DBE' || 
				   recvData.get('cgTpCd') === 'DBN' ||
				   recvData.get('cgTpCd') === 'DBK'){
			refs.cboBreakBulkHatchNo.setReadOnly(true);
			refs.cboDryBulkHatchNo.setReadOnly(false);
			
			me.getHatchComboInformation(recvData);
		} else {
			MessageUtil.warning('warning_msg', 'confirmloading_can_not_operation_msg', recvData.get('cgTpCd'));
			var window = me.getView().up('window');
			window.close();
		}
	},
	
	getHatchComboInformation: function (recvData){
		var me = this;
		var refs = me.getReferences();
//		var recvData =  me.prevData;
		var hatchListStore = me.getStore('confirmLoadingHatchList');
		var hatchNoComboForBbk = me.getStore('hatchNoCombo');
		var hatchNoComboForDbk = me.getStore('hatchNoCombo');

		var cgTpCd = '';

		if(recvData.get('cgTpCd') === 'BBK'){
			cgTpCd = 'BBK';
		} else if (recvData.get('cgTpCd') === 'DBE' || 
					recvData.get('cgTpCd') === 'DBN' ||
					recvData.get('cgTpCd') === 'DBK'){
			cgTpCd = 'DBK';
		}

		hatchListStore.load({
					params:{
						vslCallId : recvData.get('vslCallId'),
						shftId: recvData.get('shftId'),
						shftDt: recvData.get('shftDt'),
						cgTpCd: cgTpCd
					},
					callback: function(record, operation, success) {
						if(success){
							if(record != null && record.length > 0){
								hatchNoComboForBbk.removeAll();
								hatchNoComboForDbk.removeAll();
								hatchNoComboForBbk.setData(record[0].get('bbkOpHatchList'));
								hatchNoComboForDbk.setData(record[0].get('dbkOpHatchList'));
								hatchNoComboForBbk.commitChanges();
								hatchNoComboForDbk.commitChanges();
							}
						}
					}
				});
	},
	
	onSelectHatch:function(ele, rec, idx){
		var me = this;
		var refs = me.getReferences();
		var txtStevedore = refs.txtStevedore;
		var txtBreakBulkEquip = refs.txtBreakBulkEquip;
		var hatchNo= rec.get('hatchNo');
		
		var detailItem = me.getViewModel().get('theRhdlDetail');
		txtStevedore.setValue(rec.data.steveDoreNm);
		txtBreakBulkEquip.setValue(rec.data.eqNm);
		detailItem.set('hatchNo',hatchNo);
	},
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		
		window.close();
	},
	
	onSave:function(){
		var me = this;
		var refs = me.getReferences();
		var ctlLorryNo = refs.ctlLorryNo;
		var txtLorryCompany = refs.txtLorryCompany;
		var cboBreakBulkHatchNo = refs.cboBreakBulkHatchNo;
		var lorryAssignmentListStore = me.getStore('lorryAssignmentList');
		
		var detailItem = me.getViewModel().get('theRhdlDetail');
		var lorryNo = ctlLorryNo.getValue();
		var lorryCompany = txtLorryCompany.getValue();
		var hatchNo = detailItem.get('hatchNo');
		var params;
		
		
		if(StringUtil.isNullorEmpty(hatchNo)){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Hatch No');
			return;
		}
		
		var temp;
		if(lorryCompany && lorryCompany !==''){
			var arr = lorryCompany.split(',');
			for(var i = 0; i < arr.length; i++){
				if(temp == undefined){
					temp = "'" + arr[i] + "'";
				}else{
					temp += "','" + arr[i] + "'";
				}
			}
		}

		if(StringUtil.isNullorEmpty(lorryNo) && temp && temp !== ''){
			MessageUtil.warning('warning_msg', 'mandatoryField_msg', 'Lorry No');
			return;
		}
		
		if(temp && temp !== '' && lorryNo && lorryNo != ''){
			params = {
				ptnrCd: temp,
				cd: lorryNo,
				divCd: 'LR',
				searchType:'popUpList',
				screenId:'confirmRehandleLoading'
			}
		
			lorryAssignmentListStore.load({
				params: params,
				callback: function(records, operation, success){
					if(success){
						if(records.length == 0){
							MessageUtil.info('info_msg','confirmrehandleloading_lorry_no_msg');
							return;
						}else
							me.proceedRehandleLoading();
					}
				}
			});
		}else{
			me.proceedRehandleLoading();
		}
	},
	
	proceedRehandleLoading:function(){
		var me = this;
		var refs = me.getReferences();
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingLoadingList');
		var cargoRehandlingData = cargoRehandlingLoadingListStore.getAt(0);
		var cboClearance = refs.cboClearance;
				
		if(cargoRehandlingData.get('snLdYn') == "N"){
			MessageUtil.info('info_msg','confirmrehandleloading_shipping_note_status_n_msg');
			return;
		};
		
		if(cargoRehandlingData.get('fnlLoadYn') != "" 
			&& cargoRehandlingData.get('fnlLoadYn') != null 
			&& cargoRehandlingData.get('fnlLoadYn') != undefined 
			&& cargoRehandlingData.get('fnlLoadYn') == "Y"){
			
			MessageUtil.info('info_msg','confirmrehandleloading_loading_final_msg');
			return;
		};
		
		if(cboClearance.getValue() != 'Release'){
			MessageUtil.question('Loading Confirm Clearance', 'confirmrehandleloading_cofirm_loading_msg',null, 
					function(button){
						if (button === 'ok') {
			    		   	me.clearance();
						}
				});
		}else{
			me.clearance();
		}
	},
	
	isGroupLocationAuto:function(){
		var me = this;
		var refs = me.getReferences();
		
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingLoadingList');
		var cargoRehandlingData = cargoRehandlingLoadingListStore.getAt(0);
		
		if(parseInt(parseInt(cargoRehandlingData.get('rhdlGroupCnt'),0)) > 1){
			return true;
		}else{
			return false;
		}
	},
	
	isGroupLocation:function(){
		var me = this;
		var refs = me.getReferences();
		var txtLocID = refs.ctlLorryNo;
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingLoadingList');
		var cargoRehandlingData = cargoRehandlingLoadingListStore.getAt(0);
		
		if(parseInt(parseInt(cargoRehandlingData.get('rhdlGroupCnt'),0)) > 1){
			if(txtLocId.getValue() == null || txtLocId.getValue() == ''){
				return true;
			}
			return false;
		}else{
			return false;
		}
	},
	
	checkLocation:function(){
		var me = this;
		var refs= me.getReferences();
		var locFlag = true;
		
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingLoadingList');
		var cargoRehandlingData = cargoRehandlingLoadingListStore.getAt(0);
		
		if(Number(cargoRehandlingData.get('loadMt')) > 0 && (cargoRehandlingData.get('locId') == null || cargoRehandlingData.get('locId') == '')){
			locFlag = false;
		}else if(Number(cargoRehandlingData.get('loadQty')) > 0 && (cargoRehandlingData.get('locId') == null || cargoRehandlingData.get('locId') == '')){
			locFlag = false;
		}else{
			logFlag = true;
		}
		
		return logFlag;
	},
	
	isAutoLocation:function(){
		autoLocFlag = false;
		autoNorLocFlag = false;
		norManualFlag = false;
		
		if(!me.amtNorFlag){
	 		if(me.isAutoNorLocFlag()){	 	 			 
	 			autoLocFlag = true;
	 			autoNorLocFlag = true;
	 		}
	 	};
	 	
	 	if(autoLocFlag){
	 		return true
	 	}
	 		
		return false;
	},
	
	isAutoNorLocFlag:function(){
		var actMT = 0;
		var actM3 = 0;
		var actQty = 0;
		
		var me = this;
		var refs = me.getReferences();
		var txtLocationId = refs.txtLocationId;
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingLoadingList');
		var cargoRehandlingData = cargoRehandlingLoadingListStore.getAt(0);
		
		var txtLoadMT = refs.txtLoadMT;
		var txtLoadM3 = refs.txtLoadM3;
		var txtLoadQty = refs.txtLoadQty;
		
		actMT =  Number(txtLoadMT.getValue());
		actM3 =  Number(txtLoadM3.getValue());
		actQty =  Number(txtLoadQty.getValue());
						
		/* var sumMt:Number = Number(txtBalMT.Value.toString());
		var sumM3:Number = Number(txtBalM3.Value.toString());
		var sumQty:int = int(txtBalQty.Value.toString()); */
		var sumMt = Number(cargoRehandlingData.get('balMt'));
		var sumM3 = Number(cargoRehandlingData.get('balM3'));
		var sumQty = Number(cargoRehandlingData.get('balQty'));
		
		var autoLocFlag = false;
		norManualFlag = false;
	 	empNorLocCount = false;
		amtOverNorLoc = false;
		
		if(cargoRehandlingData.get('cgTpCd') !=  null){
			////////////Start Normal Case
			if(actMT > 0){ //ACTUAL WGT VALUE - CASE OF BBK
				if(sumMt == actMT){
				   if(Number(cargoRehandlingData.get('locCount')) == 1){
				   	   autoLocFlag = true;
				   	   norManualFlag = false;
				   }else if(Number(cargoRehandlingData.get('locCount'))> 1){
				  			autoPartialFlag = false; 						  			
				   			autoLocFlag = true;
				   			norManualFlag = false;
				   }else{						   		
				   	 	autoLocFlag = false;
				   	 	empNorLocCount = true;
				   	 	/* norManualFlag = true; */
				   }
		        }else if(sumMt > actMT){
					if(Number(cargoRehandlingData.get('locCount')) == 1){
				   	   autoLocFlag = true;
				   	   norManualFlag = false;
				   }else if(Number(cargoRehandlingData.get('locCount'))> 1){
				  			autoPartialFlag = false; 						  			
				   			autoLocFlag = false;//autoLocaFlag
				   			norManualFlag = false;
				   }else{						   		
				   	 	autoLocFlag = false;
				   	 	empNorLocCount = true;
				   	 	/* norManualFlag = true; */
				   }
				}else{// amountOver
						autoLocFlag = false;
						amtOverNorLoc = true;
				}
			}else if(actQty >0){
				if(sumQty == actQty){
				  if(Number(cargoRehandlingData.get('locCount')) == 1){
				   	   autoLocFlag = true;
				   	   norManualFlag = false;
				   }else if(Number(cargoRehandlingData.get('locCount'))> 1){
				  			autoPartialFlag = false; 						  			
				   			autoLocFlag = true;
				   			norManualFlag = false;
				   }else{						   		
				   	 	autoLocFlag = false;
				   	 	empNorLocCount = true;
				   	 	/* norManualFlag = true; */
				   }
			    }else if(sumMt > actMT){
				 if(Number(cargoRehandlingData.get('locCount')) == 1){
				   	   autoLocFlag = true;
				   	   norManualFlag = false;
				   }else if(Number(cargoRehandlingData.get('locCount'))> 1){
				  			autoPartialFlag = false; 						  			
				   			autoLocFlag = false;//autoLocaFlag
				   			norManualFlag = false;
				   }else{						   		
				   	 	autoLocFlag = false;
				   	 	empNorLocCount = true;
				   	 	/* norManualFlag = true; */
				   }
				}else{// amountOver
						autoLocFlag = false;
						amtOverNorLoc = true;
				}	
			}else if(actM3 >0){
				if(sumM3 == actM3){
				  if(Number(cargoRehandlingData.get('locCount')) == 1){
				   	   autoLocFlag = true;
				   	   norManualFlag = false;
				   }else if(Number(cargoRehandlingData.get('locCount'))> 1){
				  			autoPartialFlag = false; 						  			
				   			autoLocFlag = true;
				   			norManualFlag = false;
				   }else{						   		
				   	 	autoLocFlag = false;
				   	 	empNorLocCount = true;
				   	 	/* norManualFlag = true; */
				   }
				 }else if(sumM3 > actM3){
					if(Number(cargoRehandlingData.get('locCount')) == 1){
				   	   autoLocFlag = true;
				   	   norManualFlag = false;
				   }else if(Number(cargoRehandlingData.get('locCount'))> 1){
				  			autoPartialFlag = false; 						  			
				   			autoLocFlag = false;//autoLocaFlag
				   			norManualFlag = false;
				   }else{						   		
				   	 	autoLocFlag = false;
				   	 	empNorLocCount = true;
				   	 	/* norManualFlag = true; */
				   }
				}else{// amountOver
						autoLocFlag = false;
						amtOverNorLoc = true;
				}									
			}//////////// End Normal Case
								
		} 
		
		if(autoLocFlag){
				this.autoNorLocFlag = true;
				return true;
		}else{					
			if(txtLocationId.getValue() == '' || txtLocationId.getValue() == null){
			    norManualFlag = true;//location empty
			}else{
				 norManualFlag = false;
			}
			this.autoNorLocFlag = false;
			return false;
		}
		/* return autoLocFlag; */
		
	},
	
	onLoadDmgCheck:function(chk, newValue, oldValue, eOpts){
		var me = this;
     	var refs = me.getReferences();
     	var txtLoadDmgMT = refs.txtLoadDmgMT;
     	var txtLoadDmgM3 = refs.txtLoadDmgM3;
     	var txtLoadDmgPkgQty = refs.txtLoadDmgPkgQty;
     	
     	if(chk.value){
     		txtLoadDmgMT.setDisabled(false);
     		txtLoadDmgM3.setDisabled(false);
     		txtLoadDmgPkgQty.setDisabled(false);
     	}else{
     		txtLoadDmgMT.setDisabled(true);
     		txtLoadDmgM3.setDisabled(true);
     		txtLoadDmgPkgQty.setDisabled(true);
     	}
	},
	
	
	
	clearance:function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		
		var deliveryModeComboStore = me.getStore('deliveryModeCombo');
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingLoadingList');
		var cargoRehandlingData = cargoRehandlingLoadingListStore.getAt(0);
		var recvData = me.getView().recvData.selection;
		var detailItem = me.getViewModel().get('theRhdlDetail');

		var actMTLoad = detailItem.get('accuSumWgt');
		var actQtyLoad = detailItem.get('accuSumQty');	
		var actM3Load = detailItem.get('accuSumMsrmt');	
		var dcMT = detailItem.get('snMt');
		var dcQty = detailItem.get('snQty');	
		var dcM3 = detailItem.get('snM3');
		var actMT = detailItem.get('loadMt');
		var actQty = detailItem.get('loadQty');	
		var actM3 = detailItem.get('loadM3');
		var balQty = refs.txtBalQty.getValue();
		var balM3 = refs.txtBalM3.getValue();
		var balMT = refs.txtBalAmt.getValue();
		
		var sumMt = Number(detailItem.get('balMt'));
		var sumM3 = Number(detailItem.get('balM3'));
		var sumQty = Number(detailItem.get('balQty'));
		
		if(detailItem.get('cgTpCd') == "BBK"){
			if(!(actMT == "0" && actQty == "0")){					
				if(Number(balMT) <= 0 && Number(balQty) <=0){
					MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_bal_amt_msg'); 
					return;
				}
				if( (Number(actMT) > Number(balMT) || Number(actQty) > Number(balQty)) ){
					MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_bal_amt_msg'); 
					return;
				}
			}else if(Number(actMT) > 0 && Number(actQty) <= 0){
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_mt_qty_zero_msg'); 
				return;
			}else if(Number(actMT) <= 0 && Number(actQty) > 0){
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_mt_qty_zero_msg'); 
				return;
			}
		}else{
			if(!(Number(actMT) == 0)){					
				if(Number(balMT) <= 0){
					MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_bal_amt_msg'); 
					return;
				}
				if( (Number(actMT) > Number(balMT)) ){
					MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_bal_amt_msg'); 
					return;
				}
			}else if(Number(actMT) == 0 && (Number(actQty) > 0 || Number(actM3) > 0)){
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_dbk_amt_zero_msg'); 
				return;;
			}	
		};
		
		if(me.isGroupLocationAuto()){
			if(!checkLocation()){
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_deallocate_msg'); 
				return;;
			}
			
			cargoRehandlingData.data.autoLocFlag = false;
		}else{
			cargoRehandlingData.data.autoLocFlag = me.autoLocFlag
		}
		
		if(detailItem.get('cgTpCd') == 'BBK' && (sumMt <= 0 || sumQty <= 0)){
			MessageUtil.warning("warning_msg","confirmrehandleloading_warning_loading_amt_empty_msg");
	 		return;
		}else if(sumQty <= 0){
			MessageUtil.warning("warning_msg","confirmrehandleloading_warning_loading_amt_empty_msg");
	 		return;
		}
		
		if(me.isGroupLocation()){
			MessageUtil.warning("warning_msg","confirmrehandleloading_warning_deallocate_auto_msg");
	 		return;
		} 
		
		if(me.isGroupLocation()){
			if(!autoNorLocFlag){
				if(me.norManualFlag){
					MessageUtil.warning("warning_msg","confirmrehandleloading_warning_deallocate_auto_msg");
			 		return;
				}
			}
		}else{
			if(me.norManualFlag){
				MessageUtil.warning("warning_msg","confirmrehandleloading_warning_deallocate_auto_msg");
		 		return;
			}
		}
		
		if(Number(detailItem.get('loadMt'))>0 && (detailItem.get('locId') == null || detailItem.get('locId') == '')){
			MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_deallocate_msg'); 
			return;;
		}else if(Number(detailItem.get('loadQty'))>0 && (detailItem.get('locId') == null || detailItem.get('locId') == '')){
			MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_deallocate_msg'); 
			return;;
		}
		
		detailItem.set('userId', MOST.config.Token.getUserId());
		detailItem.set('jobCoCd', detailItem.data.orgCgItems[0].jobCoCd);
		detailItem.set('rhdlNo', recvData.get('rhdlNo'));
		
		detailItem.set('whConfigurationItems', me.prevWhItems);	
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		
		updateParm.getProxy().url = cargoRehandlingLoadingListStore.getProxy().url;
//		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('items', new Array());
		updateParm.get('items').push(detailItem.data);
		updateParm.save({
			callback: function(records, operation, success) {
				if (success) {
					detailItem.commit();
					MessageUtil.saveSuccess(); // Success Message
					
					var parentView = me.getParentView();
					if(parentView.getController().onSearch){
						parentView.getController().onSearch();
					}
					window.close(); 
				}
			}
		});
	},
	
	onWarehouseDeAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theRhdlDetail');
		
		if(	refs.txtLoadMT.getValue() <= 0 &&
			refs.txtLoadM3.getValue() <= 0 &&
			refs.txtLoadQty.getValue()<= 0){
			
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please input location amount',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
		}
		selection = Ext.create('MOST.model.operation.CargoHandlingOut', {
			vslCallId: detailItem.get('orgVslCallId'),
			whTpCd: (detailItem.get('orgCgItems').length > 0) ? detailItem.get('orgCgItems')[0].jobCoCd : 'G',
			blSn: detailItem.get('orgBlSn'),
			cgNo: detailItem.get('orgCgNo'),
			grMt: refs.txtLoadMT.getValue(),
			grM3: refs.txtLoadM3.getValue(),
			grQty: refs.txtLoadQty.getValue(),
			catgCd : detailItem.get('orgOpeClassCd'),
			orgCgItems: detailItem.get('orgCgItems')
		});

		me.openCodePopup('app-warehouserehandle',controlName, selection);		
	},	
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(xtype === 'popup-lorryspopup' || xtype ==='popup-cmmcdpopup' || xtype==='popup-cmmcdpopup'){
			return;
		}
		
		var control = me.lookupReference(targetControl);
		control.setValue(returnValue.data.locId);
		
		var whItems = new Array();
		for(var i = 0; i < returnValue.data.whConfigurationMap.data.items.length; i++){
			var invLocItem = returnValue.data.whConfigurationMap.data.items[i];
			var handlingItem = Ext.create('MOST.model.configuration.WhConfiguration', {
				whId: invLocItem.data.whId,
				locId : invLocItem.data.locId,
				vslCallId : invLocItem.data.vslCallId,
				cgNo : invLocItem.data.cgNo,
				wgt: invLocItem.data.wgt,
				msrmt: invLocItem.data.msrmt,
				pkgQty: invLocItem.data.pkgQty,
				whTpCd : invLocItem.data.whTpCd,
				whTpCdNm : invLocItem.data.whwhTpCdNmId,
				spCaCoCd :'',
				rhdlNo: invLocItem.data.rhdlNo
			});
			whItems.push(handlingItem.data);
		}
		me.prevWhItems = whItems;			
	}
});