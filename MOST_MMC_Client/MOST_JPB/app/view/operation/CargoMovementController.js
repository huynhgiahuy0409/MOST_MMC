Ext.define('MOST.view.operation.CargoMovementController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.cargomovement',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	CARGO_MOVEMENT_PROXY_URL : MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomovement/cargoMovement',
	prevData:null,
	
    m_unusedCells: [],
    m_rentalCells: [],
    m_displayOccupiedInfo: null,
    m_cachedWhLocId: '',  //Cached first whLocId
    m_cachedCell: '',
    m_whConfigItems: [],
    MODE_ADD: 1,
    MODE_UPDATE: 2,
    MODE_DELETE: 3,
    m_parm: {},
    m_item: {},
    
    whType: '',
    toWhType: '',
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
		var store = me.getStore('confirmMovement');
		var params = me.getSearchCondition();
		
		store.load({
			params:params,
			callback: function(record, operation, success) {
				if(success){
					if(record != null && record.length > 0){
						record[0].data.eachM3 = params.eachM3;
						record[0].data.eachMt = params.eachMt;
						me.setDetailInitialize(record[0]);
					}
				}
			}
		});
	},
	
    /**
	 * INITIALIZE END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onWarehouseAllocation : function(controlName){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		if(	!refs.refConfirmMovementPopupMoveDateTime.getValue() && !refs.refShift.getValue()){
			Ext.MessageBox.show({
		        title : 'Messsage',
			    msg : 'Please input the movement date',
			    width : 300,
			    buttons : Ext.MessageBox.OK,
			    icon : Ext.MessageBox.INFO
			});	
			return;
		}
		
		if(StringUtil.isNullorEmpty(detailItem.get('lorryNo'))){
			MessageUtil.warning('warning_msg', 'confirmmovememt_input_yt_msg');
			return;
		}
		
		var selection = Ext.create('MOST.model.operation.CargoHandlingOut', {
			vslCallId: detailItem.get('vslCallId'),
			scn: detailItem.get('scn'),
			whTpCd:'G',
			cgNo: '',
			grMt: refs.ctlMovementWgt.getValue(),
			grM3: refs.ctlMovementWgtMsrmt.getValue(),
			grQty: refs.ctlMovementWgtMsrmtPkgQty.getValue(),
			catgCd : detailItem.get('catgCd'),
			blSn : detailItem.get('blSn'),
			eachM3: detailItem.get('eachM3'),
			eachMt:  detailItem.get('eachMt'),
			rehandleCheck: 'Y'
		});

		me.openCodePopup('app-warehousemovement',controlName, selection);	
	},
	
	// Date Change Event
	onDateChange:function( control, newValue, oldValue, eOpts ) {
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var shiftStore = me.getStore('confirmMovementShiftList');
		var targetMin = newValue.getHours() * 60 + newValue.getMinutes();
		var fromMin, toMin;
		var fromDt, toDt;
		
		var index = shiftStore.findBy(function(record, index){
						fromDt = Ext.Date.parse(record.get('fmHhmm'), 'Hi');
						toDt = Ext.Date.parse(record.get('toHhmm'), 'Hi');
						fromMin = fromDt.getHours() * 60 + fromDt.getMinutes();
						toMin = toDt.getHours() * 60 + toDt.getMinutes();
						
						if(fromMin > toMin){ // ex 2300 ~ 0659 
							if(targetMin >= fromMin || targetMin <= toMin){
								return true;
							}
						} else {
							if(targetMin >= fromMin && targetMin <= toMin){
								return true;
							}
						}
					});
		
		if(index >= 0){
			detailItem.set('shftNm', shiftStore.getAt(index).get('shftNm'));
			detailItem.set('shftId', shiftStore.getAt(index).get('shftId'));
		} else {
			detailItem.set('shftNm', null);
			detailItem.set('shftId', null);
		}
		
		detailItem.set('stDt', newValue);
		detailItem.set('endDt', newValue);
	},
	
	// Detail Save
	onDetailSave:function(){
		var me = this;
		var infoForm = me.getView().form;

		if(infoForm.isValid()){
			var theDetail = me.getViewModel().get('theDetail');
			//MMC_JPB_OPR-020 Movement:
			if (theDetail.get('cgTpCd') == CodeConstants.MT_CGTP_BBK) {
				me.onPBZB10Validation();
			} else {
				me.onPassedPBZB10Validation();
			}

			//Bonded WH validation
			// if(!StringUtil.isNullorEmpty(me.whType) && me.whType != CodeConstants.MT_WHTP_BW
			// 		&& !StringUtil.isNullorEmpty(me.toWhType) && me.toWhType != CodeConstants.MT_WHTP_BW){
			// 	me.cudData();
			// }
			// else {
			// 	if(!StringUtil.isNullorEmpty(me.whType) && me.whType == CodeConstants.MT_WHTP_BW){
			// 		if(Token.getCustomHoldChk() === 'Y') {
			// 			me.onOutBondedWhValidation();
			// 		}
			// 		else {
			// 			me.cudData();
			// 		}
			// 	}
			// 	else {
			// 		if(!StringUtil.isNullorEmpty(me.toWhType) && me.toWhType == CodeConstants.MT_WHTP_BW){
			// 			if(Token.getCustomHoldChk() === 'Y') {
			// 				me.onInBondedWhValidation();
			// 			}
			// 			else {
			// 				me.cudData();
			// 			}
			// 		}
			// 	}
			// }
		}
	},
	
	//OPR-001
	openAssignmentYardTruckPopup:function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var params = {
				vslCallId : detailItem.get('vslCallId'),
				blNo : detailItem.get('opeClassCd') == 'I' ? detailItem.get('blSn') : '',
				shipgNoteNo : detailItem.get('opeClassCd') != 'I' ? detailItem.get('blSn') : ''
			}
		me.openCodePopup('popup-assignmentyardtruckpopup', 'refYardTruck', params);
	},
	
	/**
	 * EVENT HANDLER END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	afterSetCodePopupData:function(xtype, targetControl, returnValue){
		var me = this;
		var refs = me.getReferences();
		
		if(targetControl == 'ctlFromLocation') {
			var detailItem = me.getViewModel().get('theDetail');
			detailItem.set('fmLocId', returnValue.data.fmLocId);
			detailItem.set('toLocId', returnValue.data.toLocId);
			detailItem.set('fmLoc', returnValue.data.fmLocId);
			detailItem.set('toLoc', returnValue.data.toLocId);
			detailItem.set('pkgQty', returnValue.data.pkgQty);
			detailItem.set('wgt', returnValue.data.wgt);
			detailItem.set('msrmt', returnValue.data.msrmt);
			detailItem.set('cgNo', returnValue.data.cgNo);
			
			me.whType = returnValue.data.locTpCd;
			me.toWhType = returnValue.data.toLocTpCd;
			
			var store = me.getStore('confirmMovementList'); 
			var returnStore = returnValue.data.whConfigurationMap;
			store.removeAll();
			
			for(var i = 0; i< returnStore.data.length; i++){
				var record = returnStore.data.items[i];
				record.dirty = true;
				store.insert(0, record);
			}
		}
		
		if(targetControl == 'refYardTruck'){
			var detailItem = me.getViewModel().get('theDetail');
			detailItem.set('wbTransactionNo', returnValue.item.get('wbTransactionNo'));
			detailItem.set('firstWgt', returnValue.item.get('firstWgt'));
			detailItem.set('contrator', returnValue.item.get('contrator'));
		}
	},	
	
	// Detail Initialize
	setDetailInitialize:function(masterItem){
		var me = this;
		var recvData = me.getView().recvData;
		var shiftStore = me.getStore('confirmMovementShiftList');
		
		if(masterItem.get('items') != null && masterItem.get('items').length > 0){
			var detailItem = new Ext.create('MOST.model.operation.CargoMovement');
			masterItem.get('items')[0].eachM3 = masterItem.data.eachM3;
			masterItem.get('items')[0].eachMt = masterItem.data.eachMt;
			detailItem.data = masterItem.get('items')[0];
			detailItem.set('cgTpCd', recvData.get('cgTpCd'));
			
			//MMC_JPB_OPR-020 Movement 
			if (recvData.get('cgTpCd') == CodeConstants.MT_CGTP_BBK) {
				detailItem.set('cgTpCd', recvData.get('cgTpCd'));
				detailItem.set('zb10BalPkgQty', masterItem.get('zb10BalPkgQty'));
				detailItem.set('zb10BalWgt', masterItem.get('zb10BalWgt'));
				detailItem.set('zb10BalMsrmt', masterItem.get('zb10BalMsrmt'));
			}
			
			detailItem.phantom = false; // UPDATE
			detailItem.commit();
			me.getViewModel().setData({theDetail:detailItem});
			me.prevData = me.getView().recvData.clone(); 
			me.getView().recvData = detailItem;
		}
		
		shiftStore.setData(masterItem.get('shiftList'));
		shiftStore.commitChanges();
	},
	
	// Search Condition
	getSearchCondition : function(){
		var me = this;
     	var refs = me.getReferences();
     	var recvData = me.getView().recvData;
     	var searchType = recvData.get('caTyCd');
		if (recvData.get('blNo') == null) {
			var eachM3 = recvData.get('eachM3');
			var eachMt = recvData.get('eachMt');
		} 
		else {
			var eachM3 = recvData.get('eachVolume');
			var eachMt = recvData.get('eachWeight');
		}
     	
    	var params = {
			scn : recvData.get('scn'),
			vslCallId : recvData.get('vslCallId'),
			vslCd : recvData.get('vslCd'),
			callYear : recvData.get('callYear'),
			callSeq : recvData.get('callSeq'),
			mfDocId : recvData.get('mfDocId'),
			grNo : recvData.get('grNo'),
			cgNo : recvData.get('cgNo'),
			shipgNoteNo : recvData.get('shipgNoteNo'),
			locId : recvData.get('locId'),
			searchType : searchType,
			eachM3: eachM3,
			eachMt: eachMt
		};
    	
    	return params;
	},
	
	// cudData
	cudData: function(){
		var me = this;
		var window = me.getView().up('window');
		var arrItems = new Array();
		var store = me.getStore('confirmMovementList');
		var detailItem = me.getViewModel().get('theDetail');
		detailItem.set('userId', Token.getUserId());
		
		// CREATE, UPDATE RECORD
		store.getModifiedRecords().forEach(function(record, index, array){
			record.set('userId', Token.getUserId());
			arrItems.push(record.data);
		});
		

		if (arrItems.length <= 0) {
			MessageUtil.warning('warning_msg', 'confirmMovementNothingtoSave');
			return;
		}
		
		detailItem.set('whItems', arrItems);
		var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
		updateParm.getProxy().url = me.CARGO_MOVEMENT_PROXY_URL;
		updateParm.phantom = false;
		updateParm.set('workingStatus', WorkingStatus.INSERT);
		updateParm.set('item', detailItem.data);
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
	
	onOutBondedWhValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'BONDED_WH_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('mfDocId'),
				col3: 'O'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'BondedWH_validation_msg');
							return false;
						}
						else {
							if(!StringUtil.isNullorEmpty(me.toWhType) && me.toWhType == CodeConstants.MT_WHTP_BW){
								me.onInBondedWhValidation();
							}
							else {
								me.cudData();
							}
							
						}
					}
					else {
						if(!StringUtil.isNullorEmpty(me.toWhType) && me.toWhType == CodeConstants.MT_WHTP_BW){
							me.onInBondedWhValidation();
						}
						else {
							me.cudData();
						}
					}
				}
			}
		});
	},
	
	onInBondedWhValidation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		
		var store = me.getStore('validationCheck');
		store.load({
			params : {
				tyCd: 'BONDED_WH_VALIDATION',
				col1: detailItem.get('vslCallId'),
				col2: detailItem.get('mfDocId'),
				col3: 'I'
			},
			
			callback: function(records, operation, success) {
				if (success) {
					if(records.length > 0){
						if(records[0].get('isValidated') == 'N'){
							MessageUtil.warning('warning_msg', 'BondedWH_validation_msg');
							return false;
						}
						else {
							me.cudData();
							
						}
					}
					else {
						me.cudData();
					}
				}
			}
		});
	},

	onPBZB10Validation : function(){
		var me = this;
		var refs = me.getReferences();
		var detailItem = me.getViewModel().get('theDetail');
		var store = me.getStore('validatePBZB10');	
		var searchType = me.prevData.get('caTyCd');

		var params = {
			searchType: searchType,
			vslCd: me.prevData.get('vslCd'),
			callYear: me.prevData.get('callYear'),
			callSeq: me.prevData.get('callSeq'),
			vslCallId: me.prevData.get('vslCallId'),
			scn: me.prevData.get('scn'),
			mfDocId: me.prevData.get('mfDocId'),
			cgNo: me.prevData.get('cgNo'),
		};

		store.load({
			params : params,
			
			callback: function(records, operation, success) {
				if (success) {
					var isValid = false;
					if(records.length > 0){
						detailItem.set('zb10BalPkgQty', records[0].get('zb10BalPkgQty'));
						detailItem.set('zb10BalWgt', records[0].get('zb10BalWgt'));
						detailItem.set('zb10BalMsrmt', records[0].get('zb10BalMsrmt'));
						
						if(records[0].get('zb10BalPkgQty') >= detailItem.get('pkgQty')){
							isValid = true;
						}
					}

					if (!isValid) {
						MessageUtil.warning('warning_msg', 'confirmZb10_block');
						return false;
					} else {
						me.onPassedPBZB10Validation();
					}
				}
			}
		});
	},

	onPassedPBZB10Validation : function(){
		var me = this;
		me.cudData();
	},
	/**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */
	
	/* HHT TABLET - START
	 * ====================================================
	 * 
	 */
	onLoadHHT: function() {
	    var me = this;
	    var refs = me.getReferences();
	    var store = me.getStore('confirmMovement');
	    var params = me.getSearchConditionHHT();
	    me.m_parm = me.getView().recvData.data;
	   // me.m_isSpareCg = me.m_parm.isSpareCg;
	    store.load({
	        params: params,
	        callback: function (record, operation, success) {
	            if (success) {
	                if (record != null && record.length > 0) {
	                    me.setDetailInitializeHHT(record[0]);
	                }
	            }
	        }
	    });
	},

	// Search Condition
	getSearchConditionHHT: function() {
	    var me = this;
	    var refs = me.getReferences();
	    var recvData = me.getView().recvData;
	    var searchType = recvData.get('caTyCd');
	    var params = {
	        vslCallId: recvData.get('vslCallId'),
	        cgNo: recvData.get('cgNo'),
	        searchType: searchType
	    };

	    return params;
	},

	setDetailInitializeHHT: function(masterItem) {
	    var me = this;
	    var refs = me.getReferences();
	    var recvData = me.getView().recvData;
	    //var shiftStore = me.getStore('confirmMovementShiftList');
	    if (masterItem.get('items') != null && masterItem.get('items').length > 0) {
	        var detailItem = new Ext.create('MOST.model.operation.CargoMovement');
	        detailItem.data = masterItem.get('items')[0];

	        detailItem.phantom = false; // UPDATE
	        detailItem.commit();

	        me.m_item = detailItem;

	        me.InitializeToWH();
	        me.InitializeFromWH(me.m_parm.cgNo);
	        me.GetPlannedLocationHHT();
	    }
	    
	    //shiftStore.setData(masterItem.get('shiftList'));
	    //shiftStore.commitChanges();
	    
	    refs.reftxtCgNo.setValue(me.m_parm.cgNo);
	    refs.reftxtMT.setValue(0);
	    refs.reftxtM3.setValue(0);
	    refs.reftxtQty.setValue(0);
	},

	InitializeToWH: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var warehouseCombo = me.getStore('warehouseCombo');
	    warehouseCombo.load({
	        params: {
	            locDivCd: "WHO"
	        },
	        callback: function (records, operation, success) {
	            if (success) {

	            }
	        }
	    });
	    //	        refs.reftxtPlannedLoc.setLabel(me.m_displayOccupiedInfo ? 'Occupied' : 'Planned Loc');
	    //	        me.getPlannedOccupiedLocation(); 
	},

	initializeRowBay: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var whId = refs.refcboWHNO.getValue();

	    var preRow = refs.refcboRow.getValue();
	    var preBay = refs.refcboBay.getValue();

	    if (whId) {
	        //ROW
	        var warehouseListRow = me.getViewModel().getStore('warehouseListRow');
	        warehouseListRow.load({
	            params: {
	                whId: whId,
	                locDivCd: "ROW"
	            },
	            callback: function (records, operation, success) {
	                if (success) {
	                    warehouseListRow.insert(0, { rowwId: 'Select' });                    
	                    records.forEach(function(record) {
	                       if(record.data.rowwId == preRow){
	                    	   refs.refcboRow.setValue(preRow)
	                    	   return false;
	                       }
	                    });
	                }
	            }
	        });
	        //BAY
	        var warehouseListBay = me.getViewModel().getStore('warehouseListBay');
	        warehouseListBay.load({
	            params: {
	                whId: whId,
	                locDivCd: "BAY"
	            },
	            callback: function (records, operation, success) {
	                if (success) {
	                    warehouseListBay.insert(0, { rowwId: 'Select' });
	                    records.forEach(function(record) {
		                  if(record.data.bayId == preBay){
			                    refs.refcboBay.setValue(preBay);
			                    return false;
		                      }
		                  });
	                }
	            }
	        });
	        // Unused cell: A1,B5,C2
	        me.m_unusedCells = [];
	        var warehouseListUnused = me.getViewModel().getStore('warehouseListUnused');
	        warehouseListUnused.load({
	            params: {
	                whId: whId,
	                locUseYn: 'N',
	                locDivCd: "CEL"
	            },
	            callback: function (records, operation, success) {
	                if (success) {
	                    records.forEach(function (item) {
	                        me.m_unusedCells.push(item.data.rowwId + item.data.bayId);
	                    })
	                }
	            }
	        });
	    }
	},
	GetPlannedLocationHHT: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var parm = {};
	    //	if (me.m_displayOccupiedInfo) {
	    //	parm.searchType = "occupiedInfoHHT";
	    //	parm.cgNo = me.m_parm.cgNo;
	    //	}
	    //	else {
	    // Display planned info of S/N or B/L
	    parm.searchType = "planInfoHHT";
	    parm.whId = "";
	    parm.blSn == me.m_parm.ShipgNoteNo ? me.m_parm.ShipgNoteNo : me.m_parm.cgNo;
	    //       }
	    parm.vslCallId = me.m_parm.vslCallId;
	    var warehouseOccupiedLocation = me.getViewModel().getStore('warehouseOccupiedLocation');
	    warehouseOccupiedLocation.load({
	        params: parm,
	        callback: function (records, operation, success) {
	            if (success) {
	                var i = 0;
	                var strPlannedLoc = '';
	                records.forEach(function (item) {
	                    if (i > 0) {
	                        strPlannedLoc += "," + item.data.locId;
	                        if (item.data.whTpCdNm) {
	                            strPlannedLoc += "[" + item.data.whTpCdNm + "]";
	                        }
	                    }
	                    else {
	                        // Cache first whLocId and cell
	                        me.m_cachedWhLocId = item.data.whLocId;
	                        me.m_cachedCell = item.data.locId;
	                        strPlannedLoc += item.data.locId;
	                        if (item.data.whTpCdNm) {
	                            strPlannedLoc += "[" + item.data.whTpCdNm + "]";
	                        }
	                    }
	                    i++;
	                });
	                refs.reftxtPlannedLoc.setValue(strPlannedLoc);
	                //	if (me.m_displayOccupiedInfo) {
	                //	// Display cached occupied WH ID and cell (in case of Loading Cancel)
	                //	// WH ID: displayed according to m_cachedWhLocId.
	                //	if (me.m_cachedWhLocId) {
	                //	refs.refcboWHNO.setValue(me.m_cachedWhLocId);
	                //	}
	                //	}
	            }
	        }
	    });
	},
	InitializeFromWH: function (strCgNo) {
	    var me = this;
	    var refs = me.getReferences();
	    if (strCgNo) {
	        var locList = me.getViewModel().getStore('locList');
	        me.m_whConfigItems = [];
	        var warehouseViewList = me.getViewModel().getStore('warehouseViewList');
	        warehouseViewList.load({
	            params: {
	                cgNo: strCgNo,
	                searchType: 'HHTWhViewList',
	            },
	            callback: function (records, operation, success) {
	                if (success && locList.getCount() <= 0) {
	                    var i = 0;
	                    records.forEach(function (item) {
	                        var strLoc = item.data.locId + "[" + item.data.whTpCdNm + "]";
	                        locList.insert(i, { locId: item.data.locId, strLoc: strLoc, wgt: item.data.wgt, msrmt: item.data.msrmt, pkgQty: item.data.pkgQty, whTpCd: item.data.whTpCd });
	                        me.m_whConfigItems.push(item);
	                        i++;
	                    })
	                }
	            }
	        });
	    }
	},
	calcAmount: function (dCellMt, dCellM3, iCellQty) {
	    var me = this;
	    var refs = me.getReferences();
	    var grdData = refs.refCgMovementHHTGrid.getStore();
	    var strCellMt = 0;
	    var strCellM3 = 0;
	    var strCellQty = 0;

	    var dblBalMt = 0;
	    var dblBalM3 = 0;
	    var intBalQty = 0;

	    var dGrdMt = 0;
	    var dGrdM3 = 0;
	    var iGrdQty = 0;

	    var item = refs.refcboLocation.getSelection();
	    if (item) {
	        // Amount that was stacked into W/H before
	        strCellMt = item.data.wgt;
	        strCellM3 = item.data.msrmt;
	        strCellQty = parseInt(item.data.pkgQty);

	        var str = item.data.strLoc
	        var type = str.substring(str.indexOf("[") + 1, str.indexOf("]"));
	        var strFmWhTpCd = item.data.whTpCd;
	        var strFmLocId = item.data.locId;

	        refs.refFmWhTpHHTTextField.setValue(type);

	        // Total of grid amount
	        if (grdData) {
	            var rowNum = grdData.getCount();
	            if (grdData.getCount() > 0) {
	                for (var i = 0; i < rowNum; i++) {
	                    var item = grdData.getAt(i);
	                    var strMvWhTpCd = item.data.whTpCd;
	                    var strMvLocId = item.data.fmLocId;
	                    if (strFmLocId == strMvLocId && strFmWhTpCd == strMvWhTpCd) {
	                        dGrdMt += item.data.wgt;
	                        dGrdM3 += item.data.msrmt;
	                        iGrdQty += item.data.pkgQty;
	                    }

	                }
	            }
	        }

	        // Calculate balance amount
	        dblBalMt = strCellMt - dGrdMt;
	        dblBalM3 = strCellM3 - dGrdM3;
	        intBalQty = strCellQty - iGrdQty;

	    }
	    // Display the smaller one at actual amount text box.
	    refs.reftxtCellMt.setValue(dblBalMt);
	    refs.reftxtCellM3.setValue(dblBalM3);
	    refs.reftxtCellQty.setValue(intBalQty);

//	    refs.reftxtMT.setValue(refs.reftxtCellMt.getValue());
//	    refs.reftxtM3.setValue(refs.reftxtCellM3.getValue());
//	    refs.reftxtQty.setValue(refs.reftxtCellQty.getValue());

	},

	//cud hht	    
	onAdd: function () {
	    var me = this;
	    if (me.onValidate(me.MODE_ADD)) {
	        if (!me.isExistAlready(me.MODE_ADD)) {
	            me.addWHInfo();
	        }
	        else {
	            MessageUtil.warning('warning_msg', 'whCheckerExist');
	        }
	        me.calcAmount();
	    }
	},
	addWHInfo: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var grid = refs.refCgMovementHHTGrid;
	    var gridStore = refs.refCgMovementHHTGrid.getStore();
	    var item = refs.refcboLocation.getSelection();
	    var newRow = Ext.create('MOST.model.configuration.WhConfiguration');

	    newRow.data.vslCallId = me.m_parm.vslCallId;
	    newRow.data.cgNo = refs.reftxtCgNo.getValue();
	    newRow.data.wgt = refs.reftxtMT.getValue();
	    newRow.data.msrmt = refs.reftxtM3.getValue();
	    newRow.data.pkgQty = refs.reftxtQty.getValue();
	    newRow.data.fmWgt = refs.reftxtCellMt.getValue();
	    newRow.data.fmMsrmt = refs.reftxtCellM3.getValue();
	    newRow.data.fmPkgQty = refs.reftxtCellQty.getValue();

	    newRow.data.toLocId = me.GetToLocationHHT();
	    newRow.data.fmLocId = item.data.locId;
	    newRow.data.whTpCd = item.data.whTpCd;
	    var str = item.data.strLoc
	    newRow.data.whTpCdNm = str.substring(str.indexOf("[") + 1, str.indexOf("]"));
	    newRow.data.SpCaCoCd = item.data.SpCaCoCd;
	    //  newRow.data.rhdlMode = "";

	    newRow.data.toWh = refs.refcboWHNO.getValue();
	    newRow.data.toRow = refs.refcboRow.getValue();
	    newRow.data.toBay = refs.refcboBay.getValue();

	    gridStore.add(newRow);
	    grid.refresh();
	},
	onUpdate: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var grid = refs.refCgMovementHHTGrid;
	    var selectedRecord = grid.getSelection();
	    if (!selectedRecord) {
	        MessageUtil.warning("warning_msg", "whCheckerUpdateRecordEmptyMsg");
	        return;
	    }
	    if (me.onValidate(me.MODE_UPDATE) && !me.isExistAlready(me.MODE_UPDATE)) {
	        me.updateWHInfo();
	        me.calcAmount();
	    }
	},
	updateWHInfo: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var grid = refs.refCgMovementHHTGrid;
	    var selection = grid.getSelection();
	    var item = refs.refcboLocation.getSelection();
	    var row = Ext.create('MOST.model.configuration.WhConfiguration');

	    row.data.vslCallId = me.m_parm.vslCallId;
	    row.data.cgNo = refs.reftxtCgNo.getValue();
	    row.data.wgt = refs.reftxtMT.getValue();
	    row.data.msrmt = refs.reftxtM3.getValue();
	    row.data.pkgQty = refs.reftxtQty.getValue();

	    row.data.fmWgt = refs.reftxtCellMt.getValue();
	    row.data.fmMsrmt = refs.reftxtCellM3.getValue();
	    row.data.fmPkgQty = refs.reftxtCellQty.getValue();

	    row.data.toLocId = me.GetToLocationHHT();
	    row.data.fmLocId = item.data.locId;
	    row.data.whTpCd = item.data.whTpCd;
	    var str = item.data.strLoc
	    row.data.whTpCdNm = str.substring(str.indexOf("[") + 1, str.indexOf("]"));
	    row.data.SpCaCoCd = item.data.SpCaCoCd;
	    //  row.data.rhdlMode = "";

	    row.data.toWh = refs.refcboWHNO.getValue();
	    row.data.toRow = refs.refcboRow.getValue();
	    row.data.toBay = refs.refcboBay.getValue();

	    selection.data = row.data;
	    grid.refresh();
	},
	onDelete: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var grid = refs.refCgMovementHHTGrid;
	    var selectedRecord = grid.getSelection();
	    if (!selectedRecord) {
	        MessageUtil.warning("warning_msg", "whCheckerDeleteRecordEmptyMsg");
	        return;
	    }
	    me.deleteWHInfo();
	    me.calcAmount();
	},
	deleteWHInfo: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var gridStore = refs.refCgMovementHHTGrid.getStore();
	    var selection = refs.refCgMovementHHTGrid.getSelection();
	    if (selection) {
	        gridStore.remove(selection);
	    }
	},
	onValidate: function (mode) {
	    var me = this;
	    var refs = me.getReferences();

	    var detailForm = refs.refDetailHHT.validate();
	    //Check required field:
	    if (!detailForm) {
	        MessageUtil.warning('warning_msg', 'whCheckerMissingRequiredField');
	        return false;
	    }
	    if (me.isUnusedOrRentalCell()) {
	        return false;
	    }
	    if (!me.validateAmount(mode)) {
	        return false;
	    }
	    return true;
	},

	isUnusedOrRentalCell: function () {
	    var me = this;
	    var refs = me.getReferences();
	    // Selected cell: A2
	    var selectedCell = refs.refcboRow.getValue() + refs.refcboBay.getValue();
	    if (me.m_unusedCells.includes(selectedCell)) {
	        MessageUtil.warning('warning_msg', 'whCheckerUnusedArea');
	        return true;
	    }
	},

	validateAmount: function (mode) {
	    var me = this;
	    var refs = me.getReferences();
	    var selection = refs.refCgMovementHHTGrid.getSelection();
	    var result = true;

	    var balMt = refs.reftxtCellMt.getValue();
	    var balM3 = refs.reftxtCellM3.getValue();
	    var balQty = refs.reftxtCellQty.getValue();

	    var actMt = refs.reftxtMT.getValue();
	    var actM3 = refs.reftxtM3.getValue();
	    var actQty = refs.reftxtQty.getValue();
	    
	    if(actMt == 0 && actM3 == 0 && actQty ==0){
	    	MessageUtil.warning('warning_msg', 'MV Amount is zero.Please check again');
	        result = false;
	    }
	    
	    if ((balQty < actQty || balMt < actMt || balM3 < actM3) && mode == me.MODE_ADD) {
	        MessageUtil.warning('warning_msg', 'whCheckerActualAmountExceed');
	        result = false;
	    }
	    if (mode == me.MODE_UPDATE) {
	        var item = refs.refcboLocation.getSelection();
	        strCellMt = selection.get('wgt');
	        strCellM3 = selection.get('msrmt');
	        strCellQty = parseInt(selection.get('pkgQty'));
	        if (strCellQty + balQty < actQty || strCellMt + balMt < actMt || strCellM3 + balM3 < actM3) {
	            MessageUtil.warning('warning_msg', 'whCheckerActualAmountExceed');
	            result = false;
	        }
	    }
	    return result;
	},

	isExistAlready: function (mode) {
	    var me = this;
	    var refs = me.getReferences();
	    var record = refs.refcboLocation.getSelection();
	    // Make sure FROM LOCATION && TO LOCATION to be unique.
	    var strToLocCbo = refs.refcboWHNO.getValue() + "-" + refs.refcboRow.getValue() + refs.refcboBay.getValue();
	    var strFmLocCbo = record.data.locId;
	    var whtpcd = record.data.whTpCd;

	    var grdData = refs.refCgMovementHHTGrid.getStore();
	    if (grdData) {
	        var count = grdData.getCount()
	        if (count > 0) {
	            var index = count - 1;
	            var item = grdData.getAt(index);
	            var strMvWhTpCd = item.data.whTpCd;
	            var strMvLocId = item.data.fmLocId;
	            var strToLocId = item.data.toLocId
	            var grid = refs.refCgMovementHHTGrid;
	            var selectedRecord = grid.getSelection();
	            var currentRowIndex = grid.store.indexOf(selectedRecord);
	            while (whtpcd !== strMvWhTpCd || strFmLocCbo !== strMvLocId || strToLocCbo !== strToLocId) {
	                index = index - 1;
	                item = grdData.getAt(index);
	                if (index < 0) {
	                    return false;
	                }
	                if (mode == me.MODE_ADD || (mode == me.MODE_UPDATE && index != currentRowIndex)) {
	                    strMvWhTpCd = item.data.whTpCd;
	                    strMvLocId = item.data.fmLocId;
	                    strToLocId = item.data.toLocId
	                }
	            }
	            if (mode == me.MODE_ADD) {
	                if (index >= 0) {
	                    MessageUtil.warning('warning_msg', 'whCheckerExist');
	                    return true;
	                }
	            }
	            else if (mode == me.MODE_UPDATE) {
	                if (index >= 0 && index != currentRowIndex) {
	                    MessageUtil.warning('warning_msg', 'whCheckerExist');
	                    return true;
	                }
	            }
	        }
	    }
	    return false;
	},
	//end cud hht
	onGridCgMovementClick: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var grid = me.lookupReference('refCgMovementHHTGrid');
	    var locList = me.getStore('locList');
	    var selection = grid.getSelection() == null ? null : grid.getSelection();

	    me.getViewModel().set('theWarehouse', selection.getData());

	    refs.refcboLocation.setValue(selection.data.fmLocId+"["+selection.data.whTpCdNm+"]");
	    refs.refcboRow.setValue(selection.data.toRow);
	    refs.refcboBay.setValue(selection.data.toBay);
	    refs.refcboWHNO.setValue(selection.data.toWh);
	},

	GetToLocationHHT: function() {
	    var me = this
	    var refs = me.getReferences();

	    return refs.refcboWHNO.getValue() + "-" + refs.refcboRow.getValue() + refs.refcboBay.getValue();

	},

	onConfirmHHT: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var window = me.getView().up('window');
	    var arrItems = new Array();
	    var store = me.getStore('confirmMovementList');
	    var item = Ext.create('MOST.model.operation.CargoMovement');
	    var gridStore = refs.refCgMovementHHTGrid.getStore();

	    item = me.m_item;
	    item.set('stDt', Ext.Date.parse(refs.ConfirmMovementHHTDt.getValue(), 'd/m/Y H:i'));
	    item.set('endDt', Ext.Date.parse(refs.ConfirmMovementHHTDt.getValue(), 'd/m/Y H:i'));

	    var whPreFromName = item.data.whId;
	    var whPreToName = item.data.whId;
	    var fmTotalLoc = "";
	    var toTotalLoc = "";
	    if (gridStore.getCount() > 0) {
	        var rowCnt = gridStore.getCount();
	        var itemRow = gridStore.getAt(0);
	        var strFromLocId = itemRow.data.fmLocId;
	        var strToLocId = itemRow.data.toLocId;

	        if (!StringUtil.isNullorEmpty(strFromLocId)) {
	            var whPreFromName = strFromLocId.substring(0, strFromLocId.indexOf("-", 0));
	            fmTotalLoc = whPreFromName + "(" + strFromLocId.substring(strFromLocId.indexOf("-", 0) + 1) + "," + rowCnt + ")";
	        }
	        if (!StringUtil.isNullorEmpty(strToLocId)) {
	            var whPreToName = strToLocId.substring(0, strToLocId.indexOf("-", 0));
	            toTotalLoc = whPreToName + "(" + strToLocId.substring(strToLocId.indexOf("-", 0) + 1) + "," + rowCnt + ")";
	        }
	    }
	    item.set('fmLocId', fmTotalLoc);
	    item.set('toLocId', toTotalLoc);
	    item.set('allocateYN', 'N');

	    var fmLoc = ""; var toLoc = ""; var iLoc = 0;
	    var fmDmgLoc = ""; var toDmgLoc = ""; var iDmgLoc = 0;
	    var fmShuLoc = ""; var toShuLoc = ""; var iShuLoc = 0;
	    var fmDmgRhdlCLoc = ""; var toDmgRhdlCLoc = ""; var iDmgRhdlCLoc = 0;
	    var fmDmgRhdlRLoc = ""; var toDmgRhdlRLoc = ""; var iDmgRhdlRLoc = 0;
	    var fmShuRhdlCLoc = ""; var toShuRhdlCLoc = ""; var iShuRhdlCLoc = 0;
	    var fmShuRhdlRLoc = ""; var toShuRhdlRLoc = ""; var iShuRhdlRLoc = 0;

	    var fmSpSLoc = ""; var toSpSLoc = ""; var iSpSLoc = 0;
	    var fmSpSDmgLoc = ""; var toSpSDmgLoc = ""; var iSpSDmgLoc = 0;
	    var fmSpSShuLoc = ""; var toSpSShuLoc = ""; var iSpSShuLoc = 0;
	    var fmSpSDmgRhdlCLoc = ""; var toSpSDmgRhdlCLoc = ""; var iSpSDmgRhdlCLoc = 0;
	    var fmSpSDmgRhdlRLoc = ""; var toSpSDmgRhdlRLoc = ""; var iSpSDmgRhdlRLoc = 0;
	    var fmSpSShuRhdlCLoc = ""; var toSpSShuRhdlCLoc = ""; var iSpSShuRhdlCLoc = 0;
	    var fmSpSShuRhdlRLoc = ""; var toSpSShuRhdlRLoc = ""; var iSpSShuRhdlRLoc = 0;

	    var fmSpOLoc = ""; var toSpOLoc = ""; var iSpOLoc = 0;
	    var fmSpODmgLoc = ""; var toSpODmgLoc = ""; var iSpODmgLoc = 0;
	    var fmSpOShuLoc = ""; var toSpOShuLoc = ""; var iSpOShuLoc = 0;
	    var fmSpODmgRhdlCLoc = ""; var toSpODmgRhdlCLoc = ""; var iSpODmgRhdlCLoc = 0;
	    var fmSpODmgRhdlRLoc = ""; var toSpODmgRhdlRLoc = ""; var iSpODmgRhdlRLoc = 0;
	    var fmSpOShuRhdlCLoc = ""; var toSpOShuRhdlCLoc = ""; var iSpOShuRhdlCLoc = 0;
	    var fmSpOShuRhdlRLoc = ""; var toSpOShuRhdlRLoc = ""; var iSpOShuRhdlRLoc = 0;

	    // CREATE, UPDATE RECORD
	    store.each(function (record, index, array) {
	        // Add arrItems to whItems
	        arrItems.push(record.data);

	        var strWhTpCd = record.data.whTpCd;
	        var strRhdlMode = record.data.rhdlMode;
	        var strSpCaCoCd = record.data.SpCaCoCd;
	        var _fmLoc = record.data.fmLocId;
	        var _toLoc = record.data.toLocId;

	        // None of special cargo
	        if (StringUtil.isNullorEmpty(strSpCaCoCd)) {
	            // Normal cargo
	            if (strWhTpCd == 'G') {
	                if (StringUtil.isNullorEmpty(fmLoc) || StringUtil.isNullorEmpty(toLoc)) {
	                    fmLoc = _fmLoc;
	                    toLoc = _toLoc;
	                }
	                iLoc += 1;
	            }
	            // Damage cargo
	            else if (strWhTpCd == 'D') {
	                // Damage
	                if (StringUtil.isNullorEmpty(strRhdlMode)) {
	                    if (StringUtil.isNullorEmpty(fmDmgLoc) || StringUtil.isNullorEmpty(toDmgLoc)) {
	                        fmDmgLoc = _fmLoc;
	                        toDmgLoc = _toLoc;
	                    }
	                    iDmgLoc += 1;
	                }
	                // Damage cargo with re-handling with Mode = C
	                else if (strRhdlMode == 'C') {
	                    if (StringUtil.isNullorEmpty(fmDmgRhdlCLoc) || StringUtil.isNullorEmpty(toDmgRhdlCLoc)) {
	                        fmDmgRhdlCLoc = _fmLoc;
	                        toDmgRhdlCLoc = _toLoc;
	                    }
	                    iDmgRhdlCLoc += 1;
	                }
	                // Damage cargo with re-handling with Mode = R
	                else if (strRhdlMode == 'R') {
	                    if (StringUtil.isNullorEmpty(fmDmgRhdlRLoc) || StringUtil.isNullorEmpty(toDmgRhdlRLoc)) {
	                        fmDmgRhdlRLoc = _fmLoc;
	                        toDmgRhdlRLoc = _toLoc;
	                    }
	                    iDmgRhdlRLoc += 1;
	                }
	            }
	            // Shut-out cargo
	            else if (strWhTpCd == 'S') {
	                if (StringUtil.isNullorEmpty(strRhdlMode)) {
	                    if (StringUtil.isNullorEmpty(fmShuLoc) || StringUtil.isNullorEmpty(toShuLoc)) {
	                        fmShuLoc = _fmLoc;
	                        toShuLoc = _toLoc;
	                    }
	                    iShuLoc += 1;
	                }
	                else if (strRhdlMode == 'C') {
	                    //Shut-out cargo with Mode = C
	                    if (StringUtil.isNullorEmpty(fmShuRhdlCLoc) || StringUtil.isNullorEmpty(toShuRhdlCLoc)) {
	                        fmShuRhdlCLoc = _fmLoc;
	                        toShuRhdlCLoc = _toLoc;
	                    }
	                    iShuRhdlCLoc += 1;
	                }
	                else if (strRhdlMode == 'R') {
	                    //Shut-out cargo with Mode = R
	                    if (StringUtil.isNullorEmpty(fmShuRhdlRLoc) || StringUtil.isNullorEmpty(toShuRhdlRLoc)) {
	                        fmShuRhdlRLoc = _fmLoc;
	                        toShuRhdlRLoc = _toLoc;
	                    }
	                    iShuRhdlRLoc += 1;
	                }
	            }
	        }
	        // Spare
	        else if (strSpCaCoCd == 'S') {
	            if (strWhTpCd == 'G') {
	                //General cargo
	                if (StringUtil.isNullorEmpty(fmSpSLoc) || StringUtil.isNullorEmpty(toSpSLoc)) {
	                    fmSpSLoc = _fmLoc;
	                    toSpSLoc = _toLoc;
	                }
	                iSpSLoc += 1;
	            }
	            else if (strWhTpCd == 'D') {
	                //Damage cargo
	                if (StringUtil.isNullorEmpty(strRhdlMode)) {
	                    if (StringUtil.isNullorEmpty(fmSpSDmgLoc) || StringUtil.isNullorEmpty(toSpSDmgLoc)) {
	                        fmSpSDmgLoc = _fmLoc;
	                        toSpSDmgLoc = _toLoc;
	                    }
	                    iSpSDmgLoc += 1;
	                }
	                else if (strRhdlMode == 'C') {
	                    //Damage cargo with re-handling with Mode = C
	                    if (StringUtil.isNullorEmpty(fmSpSDmgRhdlCLoc) || StringUtil.isNullorEmpty(toSpSDmgRhdlCLoc)) {
	                        fmSpSDmgRhdlCLoc = _fmLoc;
	                        toSpSDmgRhdlCLoc = _toLoc;
	                    }
	                    iSpSDmgRhdlCLoc += 1;
	                }
	                else if (strRhdlMode == 'R') {
	                    //Damage cargo with re-handling with Mode = L
	                    if (StringUtil.isNullorEmpty(fmSpSDmgRhdlRLoc) || StringUtil.isNullorEmpty(toSpSDmgRhdlRLoc)) {
	                        fmSpSDmgRhdlRLoc = _fmLoc;
	                        toSpSDmgRhdlRLoc = _toLoc;
	                    }
	                    iSpSDmgRhdlRLoc += 1;
	                }
	            }
	            else if (strWhTpCd == 'S') {
	                //Shut-out cargo
	                if (StringUtil.isNullorEmpty(strRhdlMode)) {
	                    if (StringUtil.isNullorEmpty(fmSpSShuLoc) || StringUtil.isNullorEmpty(toSpSShuLoc)) {
	                        fmSpSShuLoc = _fmLoc;
	                        toSpSShuLoc = _toLoc;
	                    }
	                    iSpSShuLoc += 1;
	                }
	                else if (strRhdlMode == 'C') {
	                    //Shut-out cargo with Mode = C
	                    if (StringUtil.isNullorEmpty(fmSpSShuRhdlCLoc) || StringUtil.isNullorEmpty(toSpSShuRhdlCLoc)) {
	                        fmSpSShuRhdlCLoc = _fmLoc;
	                        toSpSShuRhdlCLoc = _toLoc;
	                    }
	                    iSpSShuRhdlCLoc += 1;
	                }
	                else if (strRhdlMode == 'R') {
	                    //Shut-out cargo with Mode = R
	                    if (StringUtil.isNullorEmpty(fmSpSShuRhdlRLoc) || StringUtil.isNullorEmpty(toSpSShuRhdlRLoc)) {
	                        fmSpSShuRhdlRLoc = _fmLoc;
	                        toSpSShuRhdlRLoc = _toLoc;
	                    }
	                    iSpSShuRhdlRLoc += 1;
	                }
	            }
	        }
	        // ???
	        else if (strSpCaCoCd == 'O') {
	            if (strWhTpCd == 'G') {
	                //General cargo
	                if (StringUtil.isNullorEmpty(fmSpOLoc) || StringUtil.isNullorEmpty(toSpOLoc)) {
	                    fmSpOLoc = _fmLoc;
	                    toSpOLoc = _toLoc;
	                }
	                iSpOLoc += 1;
	            }
	            else if (strWhTpCd == 'D') {
	                //Damage cargo
	                if (StringUtil.isNullorEmpty(strRhdlMode)) {
	                    if (StringUtil.isNullorEmpty(fmSpODmgLoc) || StringUtil.isNullorEmpty(toSpODmgLoc)) {
	                        fmSpODmgLoc = _fmLoc;
	                        toSpODmgLoc = _toLoc;
	                    }
	                    iSpODmgLoc += 1;
	                }
	                else if (strRhdlMode == 'C') {
	                    //Damage cargo with re-handling with Mode = C
	                    if (StringUtil.isNullorEmpty(fmSpODmgRhdlCLoc) || StringUtil.isNullorEmpty(toSpODmgRhdlCLoc)) {
	                        fmSpODmgRhdlCLoc = _fmLoc;
	                        toSpODmgRhdlCLoc = _toLoc;
	                    }
	                    iSpODmgRhdlCLoc += 1;
	                }
	                else if (strRhdlMode == 'R') {
	                    //Damage cargo with re-handling with Mode = R
	                    if (StringUtil.isNullorEmpty(fmSpODmgRhdlRLoc) || StringUtil.isNullorEmpty(toSpODmgRhdlRLoc)) {
	                        fmSpODmgRhdlRLoc = _fmLoc;
	                        toSpODmgRhdlRLoc = _toLoc;
	                    }
	                    iSpODmgRhdlRLoc += 1;
	                }
	            }
	            else if (strWhTpCd == 'S') {
	                //Shut-out cargo
	                if (StringUtil.isNullorEmpty(strRhdlMode)) {
	                    if (StringUtil.isNullorEmpty(fmSpOShuLoc) || StringUtil.isNullorEmpty(toSpOShuLoc)) {
	                        fmSpOShuLoc = _fmLoc;
	                        toSpOShuLoc = _toLoc;
	                    }
	                    iSpOShuLoc += 1;
	                }
	                else if (strRhdlMode == 'C') {
	                    //Shut-out cargo with Mode = C
	                    if (StringUtil.isNullorEmpty(fmSpOShuRhdlCLoc) || StringUtil.isNullorEmpty(toSpOShuRhdlCLoc)) {
	                        fmSpOShuRhdlCLoc = _fmLoc;
	                        toSpOShuRhdlCLoc = _toLoc;
	                    }
	                    iSpOShuRhdlCLoc += 1;
	                }
	                else if (strRhdlMode == 'R') {
	                    //Shut-out cargo with Mode = R
	                    if (StringUtil.isNullorEmpty(fmSpOShuRhdlRLoc) || StringUtil.isNullorEmpty(toSpOShuRhdlRLoc)) {
	                        fmSpOShuRhdlRLoc = _fmLoc;
	                        toSpOShuRhdlRLoc = _toLoc;
	                    }
	                    iSpOShuRhdlRLoc += 1;
	                }
	            }
	        }
	        item.set('wgt', record.wgt);
	        item.set('msrmt', record.msrmt);
	        item.set('pkgQty', parseInt(record.pkgQty));

	        if (!StringUtil.isNullorEmpty(fmLoc)) {
	            item.set('fmLoc', whPreFromName + "(" + fmLoc.substring(fmLoc.indexOf("-", 0) + 1) + "," + iLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toLoc)) {
	            item.set('toLoc', whPreToName + "(" + toLoc.substring(toLoc.indexOf("-", 0) + 1) + "," + iLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmDmgLoc)) {
	            item.set('fmDmgLoc', whPreFromName + "(" + fmDmgLoc.substring(fmDmgLoc.indexOf("-", 0) + 1) + "," + iDmgLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toDmgLoc)) {
	            item.set('toDmgLoc', whPreToName + "(" + toDmgLoc.substring(toDmgLoc.indexOf("-", 0) + 1) + "," + iDmgLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmDmgRhdlCLoc)) {
	            item.set('fmDmgRhdlCLoc', whPreFromName + "(" + fmDmgRhdlCLoc.substring(fmDmgRhdlCLoc.indexOf("-", 0) + 1) + "," + iDmgRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toDmgRhdlCLoc)) {
	            item.set('toDmgRhdlCLoc', whPreToName + "(" + toDmgRhdlCLoc.substring(toDmgRhdlCLoc.indexOf("-", 0) + 1) + "," + iDmgRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmDmgRhdlRLoc)) {
	            item.set('fmDmgRhdlRLoc', whPreFromName + "(" + fmDmgRhdlRLoc.substring(fmDmgRhdlRLoc.indexOf("-", 0) + 1) + "," + iDmgRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toDmgRhdlRLoc)) {
	            item.set('toDmgRhdlRLoc', whPreToName + "(" + toDmgRhdlRLoc.substring(toDmgRhdlRLoc.indexOf("-", 0) + 1) + "," + iDmgRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmShuLoc)) {
	            item.set('fmShuLoc', whPreFromName + "(" + fmShuLoc.substring(fmShuLoc.indexOf("-", 0) + 1) + "," + iShuLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toShuLoc)) {
	            item.set('toShuLoc', whPreToName + "(" + toShuLoc.substring(toShuLoc.indexOf("-", 0) + 1) + "," + iShuLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmShuRhdlCLoc)) {
	            item.set('fmShuRhdlCLoc', whPreFromName + "(" + fmShuRhdlCLoc.substring(fmShuRhdlCLoc.indexOf("-", 0) + 1) + "," + iShuRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toShuRhdlCLoc)) {
	            item.set('toShuRhdlCLoc', whPreToName + "(" + toShuRhdlCLoc.substring(toShuRhdlCLoc.indexOf("-", 0) + 1) + "," + iShuRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmShuRhdlRLoc)) {
	            item.set('fmShuRhdlRLoc', whPreFromName + "(" + fmShuRhdlRLoc.substring(fmShuRhdlRLoc.indexOf("-", 0) + 1) + "," + iShuRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toShuRhdlRLoc)) {
	            item.set('toShuRhdlRLoc', whPreToName + "(" + toShuRhdlRLoc.substring(toShuRhdlRLoc.indexOf("-", 0) + 1) + "," + iShuRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpSLoc)) {
	            item.set('fmSpSLoc', whPreFromName + "(" + fmSpSLoc.substring(fmSpSLoc.indexOf("-", 0) + 1) + "," + iSpSLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpSLoc)) {
	            item.set('toSpSLoc', whPreToName + "(" + toSpSLoc.substring(toSpSLoc.indexOf("-", 0) + 1) + "," + iSpSLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpSDmgLoc)) {
	            item.set('fmSpSDmgLoc', whPreFromName + "(" + fmSpSDmgLoc.substring(fmSpSDmgLoc.indexOf("-", 0) + 1) + "," + iSpSDmgLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpSDmgLoc)) {
	            item.set('toSpSDmgLoc', whPreToName + "(" + toSpSDmgLoc.substring(toSpSDmgLoc.indexOf("-", 0) + 1) + "," + iSpSDmgLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpSDmgRhdlCLoc)) {
	            item.set('fmSpSDmgRhdlCLoc', whPreFromName + "(" + fmSpSDmgRhdlCLoc.substring(fmSpSDmgRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpSDmgRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpSDmgRhdlCLoc)) {
	            item.set('toSpSDmgRhdlCLoc', whPreToName + "(" + toSpSDmgRhdlCLoc.substring(toSpSDmgRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpSDmgRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpSDmgRhdlRLoc)) {
	            item.set('fmSpSDmgRhdlRLoc', whPreFromName + "(" + fmSpSDmgRhdlRLoc.substring(fmSpSDmgRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpSDmgRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpSDmgRhdlRLoc)) {
	            item.set('toSpSDmgRhdlRLoc', whPreToName + "(" + toSpSDmgRhdlRLoc.substring(toSpSDmgRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpSDmgRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpSShuLoc)) {
	            item.set('fmSpSShuLoc', whPreFromName + "(" + fmSpSShuLoc.substring(fmSpSShuLoc.indexOf("-", 0) + 1) + "," + iSpSShuLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpSShuLoc)) {
	            item.set('toSpSShuLoc', whPreToName + "(" + toSpSShuLoc.substring(toSpSShuLoc.indexOf("-", 0) + 1) + "," + iSpSShuLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpSShuRhdlCLoc)) {
	            item.set('fmSpSShuRhdlCLoc', whPreFromName + "(" + fmSpSShuRhdlCLoc.substring(fmSpSShuRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpSShuRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpSShuRhdlCLoc)) {
	            item.set('toSpSShuRhdlCLoc', whPreToName + "(" + toSpSShuRhdlCLoc.substring(toSpSShuRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpSShuRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpSShuRhdlRLoc)) {
	            item.set('fmSpSShuRhdlRLoc', whPreFromName + "(" + fmSpSShuRhdlRLoc.substring(fmSpSShuRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpSShuRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpSShuRhdlRLoc)) {
	            item.set('toSpSShuRhdlRLoc', whPreToName + "(" + toSpSShuRhdlRLoc.substring(toSpSShuRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpSShuRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpOLoc)) {
	            item.set('fmSpOLoc', whPreFromName + "(" + fmSpOLoc.substring(fmSpOLoc.indexOf("-", 0) + 1) + "," + iSpOLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpOLoc)) {
	            item.set('toSpOLoc', whPreToName + "(" + toSpOLoc.substring(toSpOLoc.indexOf("-", 0) + 1) + "," + iSpOLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpODmgLoc)) {
	            item.set('fmSpODmgLoc', whPreFromName + "(" + fmSpODmgLoc.substring(fmSpODmgLoc.indexOf("-", 0) + 1) + "," + iSpODmgLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpODmgLoc)) {
	            item.set('toSpODmgLoc', whPreToName + "(" + toSpODmgLoc.substring(toSpODmgLoc.indexOf("-", 0) + 1) + "," + iSpODmgLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpODmgRhdlCLoc)) {
	            item.set('fmSpODmgRhdlCLoc', whPreFromName + "(" + fmSpODmgRhdlCLoc.substring(fmSpODmgRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpODmgRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpODmgRhdlCLoc)) {
	            item.set('toSpODmgRhdlCLoc', whPreToName + "(" + toSpODmgRhdlCLoc.substring(toSpODmgRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpODmgRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpODmgRhdlRLoc)) {
	            item.set('fmSpODmgRhdlRLoc', whPreFromName + "(" + fmSpODmgRhdlRLoc.substring(fmSpODmgRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpODmgRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpODmgRhdlRLoc)) {
	            item.set('toSpODmgRhdlRLoc', whPreToName + "(" + toSpODmgRhdlRLoc.substring(toSpODmgRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpODmgRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpOShuLoc)) {
	            item.set('fmSpOShuLoc', whPreFromName + "(" + fmSpOShuLoc.substring(fmSpOShuLoc.indexOf("-", 0) + 1) + "," + iSpOShuLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpOShuLoc)) {
	            item.set('toSpOShuLoc', whPreToName + "(" + toSpOShuLoc.substring(toSpOShuLoc.indexOf("-", 0) + 1) + "," + iSpOShuLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpOShuRhdlCLoc)) {
	            item.set('fmSpOShuRhdlCLoc', whPreFromName + "(" + fmSpOShuRhdlCLoc.substring(fmSpOShuRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpOShuRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpOShuRhdlCLoc)) {
	            item.set('toSpOShuRhdlCLoc', whPreToName + "(" + toSpOShuRhdlCLoc.substring(toSpOShuRhdlCLoc.indexOf("-", 0) + 1) + "," + iSpOShuRhdlCLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(fmSpOShuRhdlRLoc)) {
	            item.set('fmSpOShuRhdlRLoc', whPreFromName + "(" + fmSpOShuRhdlRLoc.substring(fmSpOShuRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpOShuRhdlRLoc + ")");
	        }
	        if (!StringUtil.isNullorEmpty(toSpOShuRhdlRLoc)) {
	            item.set('toSpOShuRhdlRLoc', whPreToName + "(" + toSpOShuRhdlRLoc.substring(toSpOShuRhdlRLoc.indexOf("-", 0) + 1) + "," + iSpOShuRhdlRLoc + ")");
	        }
	    });	// end for

	    item.set('workingStatus', 'C');
	    item.set('userId', MOST.config.Token.getUserId());
	    if (arrItems.length > 0) {
	        var proxy = item.getProxy();
	        proxy.url = MOST.config.Locale.getRestApiDestUrl() + '/v1/cargomovement/cargoMovement'
	        item.set('whItems', arrItems);

	        item.save({
	            success: function () {
	                MessageUtil.saveSuccess();

	                var parentView = me.getParentView();
	                if (parentView.getController().onTblRetrieve()) {
	                    parentView.getController().onTblRetrieve();
	                }

	                window.close();
	            }
	        });
	    }

	},
	onCancelHHT: function () {
	    var me = this;
	    var refs = me.getReferences();
	    var gridStore = refs.refCgMovementHHTGrid.getStore();
	    if (gridStore.getCount() > 0) {
	        MessageUtil.questionModern('confirm', 'Changes NOT saved. Commit changes', null,
	            function (button) {
	                if (button === 'cancel') {
	                    var window = me.getView().up('window');
	                    window.close();
	                }
	                else if (button === 'ok') {
	                    me.onConfirmHHT();
	                }
	            });
	    }
	    else {
	        var window = me.getView().up('window');
	        window.close();
	    }
	},

	onDateChangeHHT: function(control, newValue, oldValue, eOpts) {
	    var me = this;
	    var refs = me.getReferences();
	    var shiftStore = me.getStore('confirmMovementShiftList');
	    var targetMin = newValue.getHours() * 60 + newValue.getMinutes();
	    var fromMin, toMin;
	    var fromDt, toDt;

	    var index = shiftStore.findBy(function (record, index) {
	        fromDt = Ext.Date.parse(record.get('fmHhmm'), 'Hi');
	        toDt = Ext.Date.parse(record.get('toHhmm'), 'Hi');
	        fromMin = fromDt.getHours() * 60 + fromDt.getMinutes();
	        toMin = toDt.getHours() * 60 + toDt.getMinutes();

	        if (fromMin > toMin) { // ex 2300 ~ 0659 
	            if (targetMin >= fromMin || targetMin <= toMin) {
	                return true;
	            }
	        } else {
	            if (targetMin >= fromMin && targetMin <= toMin) {
	                return true;
	            }
	        }
	    });

	    if (index >= 0) {
	        detailItem.set('shftNm', shiftStore.getAt(index).get('shftNm'));
	        detailItem.set('shftId', shiftStore.getAt(index).get('shftId'));
	    } else {
	        detailItem.set('shftNm', null);
	        detailItem.set('shftId', null);
	    }

	    detailItem.set('stDt', newValue);
	    detailItem.set('endDt', newValue);
	},
	/**
	 * =========================================================================================================================
	 * HHT TABLET END.
	 * 
	 */
});