Ext.define('MOST.view.operation.RehandleCargoHandlingOutController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [],

	alias: 'controller.confirmrehandlehandlingoutpopup',	
	autoLocFlag: false,
	autoPartialFlag: false,
	autoNorLocFlag: false,
	norManualFlag: false,
	amtNorFlag: false,
	empNorLocCount: false,
	amtOverNorLoc: false,
	booleanDirSpr: false,

	prevWhItems : new Array(),
	CUST_RELEASE: 'RELEASE', //CUSTOMS MODE
	CUST_HOLD: 'HOLD', //CUSTOMS MODE
	/**
	 * =========================================================================================================================
	 * INITIALIZE START	
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var window = me.getView().up('window');
		var deliveryModeComboStore = me.getStore('deliveryModeCombo');
		var cargoRehandlingHandlingOutList = me.getStore('cargoRehandlingHandlingOutList');
		var cboDeliveryMode = refs.cboDeliveryMode;
		var data = me.getView().recvData.selection.getData();
		
		deliveryModeComboStore.load();
		
		cargoRehandlingHandlingOutList.load({
			params:{
				vslCallId: data.vslCallId,
				cgNo: data.cgNo,
				jobCoCd: data.cgCoCd,
				grNo: data.grNo,
				blNo: data.blNo,
				orgRefNo: data.orgRefNo,
				blSn: data.orgRefNo,
				rhdlNo: data.rhdlNo,
				spCaCoCd: data.spCaCoCd,
				shipgNoteNo: data.shipgNoteNo
			},
			callback: function(records, operation, success){
				if(success){
					me.getViewModel().setData({theDetail:records[0]});
					
					if(records[0].get('custMode') == "" || records[0].get('custMode') == null){
						cboDeliveryMode.setValue(me.CUST_HOLD);
					}
				}
			}
		})
		//window.setPosition(-220,-500,true);
		window.center();
	},
	
	isAutoLocation:function(){
		var me = this;
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
		
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingHandlingOutList');
		var cargoRehandlingData = me.getViewModel().get('theDetail');
		
		var txtLoadMT = refs.txtLoadMT;
		var txtLoadM3 = refs.txtLoadM3;
		var txtLoadQty = refs.txtLoadQty;
		
		actMT =  Number(txtLoadMT.Value.toString());
		actM3 =  Number(txtLoadM3.Value.toString());
		actQty =  Number(txtLoadQty.Value.toString());
						
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
				 if(Number(argoRehandlingData.get('locCount')) == 1){
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
			if(txtLocId.Value.toString() == '' || txtLocId.Value.toString() == null){
			    norManualFlag = true;//location empty
			}else{
				 norManualFlag = false;
			}
			this.autoNorLocFlag = false;
			return false;
		}
		/* return autoLocFlag; */
		
	},
	
	checkLocation:function(){
		var me = this;
		var refs= me.getReferences();
		var locFlag = true;
		
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingHandlingOutList');
		var cargoRehandlingData = me.getViewModel().get('theDetail');
		
		if(Number(cargoRehandlingData.get('loadMt')) > 0 && (cargoRehandlingData.get('locId') == null || cargoRehandlingData.get('locId') == '')){
			locFlag = false;
		}else if(Number(cargoRehandlingData.get('loadQty')) > 0 && (cargoRehandlingData.get('locId') == null || cargoRehandlingData.get('locId') == '')){
			locFlag = false;
		}else{
			logFlag = true;
		}
		
		return logFlag;
	},
	
	isAutoNorLocFlag:function(){
		var actMT = 0;
		var actM3 = 0;
		var actQty = 0;
		
		var me = this;
		var refs = me.getReferences();
		var txtLocationId = refs.txtLocationId;
		
		var cargoRehandlingLoadingListStore = me.getStore('cargoRehandlingHandlingOutList');
		var cargoRehandlingData = cargoRehandlingLoadingListStore.getAt(0);
		
		var txtLoadMT = refs.txtLoadMT;
		var txtLoadM3 = refs.txtLoadM3;
		var txtLoadQty = refs.txtLoadQty;
		
		actMT =  Number(txtLoadMT.getValue());
		actM3 =  Number(txtLoadM3.getValue());
		actQty =  Number(txtLoadQty.getValue());
						
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
	
	onCancel:function(){
		var me = this;
		var window = me.getView().up('window');
		
		window.close();
	},
	
	onOpenWarehousePopup:function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		if(	refs.txtLoadDmgMT.getValue() <= 0 &&
			refs.txtLoadDmgM3.getValue() <= 0 &&
			refs.txtLoadDmgPkgQty.getValue()<= 0){
				
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
			vslCallId: detailItem.vslCallId,
			whTpCd:'G',
			cgNo: refs.txtGR.getValue(),
			grMt: refs.txtLoadDmgMT.getValue(),
			grM3: refs.txtLoadDmgM3.getValue(),
			grQty: refs.txtLoadDmgPkgQty.getValue(),
			catgCd : detailItem.catgCd,
			blSn : detailItem.shipgNoteNo
		});

		me.openCodePopup('app-warehouseallocation', controlName, selection);		
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(xtype === 'popup-cmmcdpopup' || xtype === 'popup-lorryspopup'){
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
				spCaCoCd :''
			});
			whItems.push(handlingItem.data);
		}
		me.prevWhItems = whItems;		
	},		
	
	
	onOk:function(){
		var me = this;
		var refs = me.getReferences();
		var ctlLorryNo = refs.ctlLorryNo;
		var txtLorryCompany = refs.txtLorryCompany;
	
		var lorryAssignmentListStore = me.getStore('lorryAssignmentList');
		
		var lorryNo = ctlLorryNo.getValue();
		var lorryCompany = Ext.util.Format.htmlDecode(txtLorryCompany.getValue());
		
		var arrTsptr = lorryCompany.split(",");
		var partnerCdArr = new Array();
		arrTsptr.forEach(function(data){
			partnerCdArr.push(Ext.String.format("'{0}'", data));
		});
		
		
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
		
		me.proceedRehandleHandlingOut();
			
	},
	
	proceedRehandleHandlingOut:function(){
		var me = this;
		var refs = me.getReferences();
		var cargoRehandlingHandlingOutList = me.getStore('cargoRehandlingHandlingOutList');
		var cargoRehandlingData = me.getViewModel().get('theDetail');
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
		
		MessageUtil.question('Loading Confirm Clearance', 'confirmrehandleloading_cofirm_loading_msg',null, 
				function(button){
					if (button === 'ok') {
		    		   	me.clearance();
					}
		});
	},
	
	clearance:function(){
		var me = this;
		var refs = me.getReferences();
		
		var deliveryModeComboStore = me.getStore('deliveryModeCombo');
		var cargoRehandlingHandlingOutList = me.getStore('cargoRehandlingHandlingOutList');
		var cargoRehandlingData = me.getViewModel().get('theDetail');
		var cboTsptTpCd = refs.cboTsptTpCd;
		var txtLoadDmgMT = refs.txtLoadDmgMT;
		var txtLoadDmgM3 = refs.txtLoadDmgM3;
		var txtLoadDmgPkgQty = refs.txtLoadDmgPkgQty;
		var dtStart = refs.dtStart;
		var dtEnd = refs.dtEnd;
		var txtBalQty = refs.txtBalQty;
		var txtBalM3 = refs.txtBalM3;
		var txtBalAmt = refs.txtBalAmt;
		var recvData = me.getView().recvData;
		var newStartDate = Ext.Date.format(dtStart.getValue(),'d/m/Y');
		var newEndDate = Ext.Date.format(dtEnd.getValue(),'d/m/Y');
		var actMTLoad = cargoRehandlingData.get('accuSumWgt');
		var actQtyLoad = cargoRehandlingData.get('accuSumQty');	
		var actM3Load = cargoRehandlingData.get('accuSumMsrmt');	
		var dcMT = cargoRehandlingData.get('snMt');
		var dcQty = cargoRehandlingData.get('snQty');	
		var dcM3 = cargoRehandlingData.get('snM3');
		var actMT = cargoRehandlingData.get('loadMt');
		var actQty = cargoRehandlingData.get('loadQty');	
		var actM3 = cargoRehandlingData.get('loadM3');
		var balQty = txtBalQty.getValue();
		var balM3 = txtBalM3.getValue();
		var balMT = txtBalAmt.getValue();
		var sumMt = Number(cargoRehandlingData.get('balMt'));
		var sumM3 = Number(cargoRehandlingData.get('balM3'));
		var sumQty = Number(cargoRehandlingData.get('balQty'));
		
		var window = me.getView().up('window');
		
		if(newStartDate == null || newStartDate == ""){
			MessageUtil.warning('warning_msg', 'confirmrehandlehandlingout_startDt_empty');
			return;
		}
		
		if(newEndDate != null || newEndDate != ""){
			if(newEndDate < newStartDate){
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_cofirm_loading_msg_start_end_date_msg'); // "Start Date Should Be Less Than End Date"
				return;
			}
		}else{
			MessageUtil.warning('warning_msg', 'confirmrehandlehandlingout_endDt_empty');
			return;
		}
		
		if(cargoRehandlingData.get('spCaCoCd') == 'S'){
			if(cargoRehandlingData.get('delvTpCd') == 'D'){
			  	me.booleanDirSpr = true;
			}else{
			 	me.booleanDirSpr = false;		
			}	
		}else{
			me.booleanDirSpr = false;
		}
		
		if(cargoRehandlingData.get('cgTpCd') == "BBK"){
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
			}else{
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_dbk_amt_zero_msg'); 
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
				return;
			}else{
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_dbk_amt_zero_msg'); 
				return;
			}	
		};
		
		if(me.isAutoLocation()){
			if(!autoNorLocFlag){
				if(norManualFlag){
					MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_deallocate_auto_msg');
		       	 	 //Normal "This Cargo cases can't De-Allocate automatically"
		    	 	return;
		       	  
		  	  	}
			}
		}else{
			if(me.norManualFlag){
				MessageUtil.warning('warning_msg', 'confirmrehandleloading_warning_deallocate_auto_msg');
				return;
			}
		}
		
		cargoRehandlingData.set('whConfigurationItems', me.prevWhItems);
		cargoRehandlingData.set('hdlOutStDt', dtStart.getValue());
		cargoRehandlingData.set('hdlOutEndDt', dtEnd.getValue());
		cargoRehandlingData.set('userId', MOST.config.Token.getUserId());
		
		var proxy = cargoRehandlingData.getProxy();
		proxy.url = cargoRehandlingHandlingOutList.getProxy().url;
		
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = cargoRehandlingHandlingOutList.getProxy().url;
		updateParm.phantom = false;

		updateParm.set('workingStatus', WorkingStatus.UPDATE);
		updateParm.set('items', new Array());
		updateParm.get('items').push(cargoRehandlingData.data);
		
		updateParm.save({
			success : function(records,success){
				MessageUtil.saveSuccess(); // Success Message
				window.close(); 
			}
		});
	}
});