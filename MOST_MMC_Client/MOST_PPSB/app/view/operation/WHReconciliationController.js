Ext.define('MOST.view.operation.WHReconciliationController', {
	extend: 'MOST.view.foundation.BaseViewController',

	requires: [
	],

	alias: 'controller.whreconciliation',
	
	/**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
	MAIN_GRID_REF_NAME: 'refWHReconcilGrid',				// Main Grid Name 
	MAIN_STORE_NAME: 'whReconcilList',
	MAIN_STORE_PIVOT : 'pivotList',			 			// Main Pivot Store Name
	DETAIL_GRID_REF_NAME: 'refWHReconcilDetailGrid',				// Main Grid Name 
	DETAIL_STORE_NAME: 'whReconcilDetailGrid',
	/**
	 * CONSTANT END
	 * =========================================================================================================================
	 */
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE START
	 */
	onLoad: function(){
		var me = this;
		var refs = me.getReferences();
		var categoryCombo = me.getStore('categoryCombo');
		var warehouseTypeCombo = me.getStore('warehouseTypeCombo');
		var warehouseListCombo = me.getStore('warehouseListCombo');
		
		categoryCombo.load();
		warehouseTypeCombo.load();
		warehouseListCombo.load();
		
		var searchParm = Ext.create('MOST.model.operation.SearchWHReconciliationParm');
		me.setSearchParm(searchParm); // Settings Model Data Change
		me.getViewModel().setData({theSearch:searchParm});
		
		me.updateViewStyle(me.getView());
		
		searchParm.set("aggregate","qty");
		searchParm.set('progress', 'N');
		
		//for Pivot List (added by Brian 2023/04/10)
		me.getPivotItems();
	},
	
	/**
	 * =========================================================================================================================
	 * INITIALIZE END
	 */
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER START
	 */
	onSearch:function(){
		var me = this;
		var refs = me.getReferences();
		var whReconcilList = me.getStore(me.MAIN_STORE_NAME);
		var store = null;
		
		if(refs.refWhReconcilList.activeTab.title == 'Pivot'){
			
			var topAxis = refs.ctlTopAxis.getStore();
			var leftAxis = refs.ctlLeftAxis.getStore();
			
			if(topAxis.count() == 0 || leftAxis.count() == 0){
				MessageUtil.warning('Warning', 'pivot.axis');
				return false;
			}		
			
			store = me.getStore(me.MAIN_STORE_PIVOT);
		}else if(refs.refWhReconcilList.activeTab.title == 'List'){
			store = me.getStore(me.MAIN_STORE_NAME)
		}
		
		var params = me.getSearchCondition();
		
		store.load({
			params: params,
			callback:function(records,success){
				if(success){
					if (records != null  && records.length <= 0) {
						MessageUtil.noMatchData();
					}else{
						if(refs.refWhReconcilList.activeTab.title == 'Pivot'){
							
							var resultItems = new Ext.util.MixedCollection();
							resultItems.addAll(records);
							
							var pivotGrid = refs.ctlPivotGrid;
							me.setPivotMatrix(pivotGrid);
							pivotGrid.getStore().loadRecords(resultItems.items);
				    	}
					}
					
					if(refs.refWhReconcilList.activeTab.title == 'List'){
						whReconcilList.load({
							params: params,
							callback:function(records,success){
								if(success){
									
								}
							}
						});
					}
				}
			}
		});
		
	},
	
	onMasterBLBookingNoChange: function(ctl){
		var me = this;
		var refs = me.getReferences();
		var mfDocId = '';
		mfDocId = ctl.getValue();

		var blNoCombo = me.getStore('blNoCombo');
		var snNoCombo = me.getStore('snNoCombo');
		blNoCombo.clearFilter();
		snNoCombo.clearFilter();
		
		if(!StringUtil.isNullorEmpty(mfDocId)){
			if(ctl.reference === 'ctlMBlNoCombo'){
				refs.refSnNoCombo.setValue();
				refs.ctlBookingNoCombo.setValue();
				
				blNoCombo.clearFilter();
				mfDocId = ctl.getValue();
				blNoCombo.filterBy(function(rec) {
					return (rec.get('mfDocId') === mfDocId)
				});
			}
			else if(ctl.reference === 'ctlBookingNoCombo'){
				refs.refBlNo.setValue();
				refs.ctlMBlNoCombo.setValue();
				
				snNoCombo.clearFilter();
				mfDocId = ctl.getValue();
				snNoCombo.filterBy(function(rec) {
					return (rec.get('mfDocId') === mfDocId)
				});
			}
		}
	},
	
	onBLSnNoChange: function(ctl){
		var me = this;
		var refs = me.getReferences();
		var cgNo = '';
		cgNo = ctl.getValue();
		
		var blNoCombo = me.getStore('blNoCombo');
		var snNoCombo = me.getStore('snNoCombo');
		blNoCombo.clearFilter();
		snNoCombo.clearFilter();

		if(!StringUtil.isNullorEmpty(cgNo)){
			if(ctl.reference === 'refBlNo'){
				refs.refSnNoCombo.setValue();
				refs.ctlBookingNoCombo.setValue();
			}
			else if(ctl.reference === 'refSnNoCombo'){
				refs.refBlNo.setValue();
				refs.ctlMBlNoCombo.setValue();
			}
		}
	},
	
	onWHGridDblClick: function(){
		var me = this;
		var grid = me.lookupReference('refWHReconcilGrid');
		
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BBK){
			MessageUtil.warning('warning_msg', 'whReconcilValidateForShortOverlanded');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_RCV){
			MessageUtil.warning('warning_msg', 'whReconcilValidateForShortOverlanded');
			return;
		}
		
		if(selection.get('rhdlYn') == 'Y'){
			MessageUtil.warning('warning_msg', 'whReconcilValidateForShortOverlanded');
			return;
		}
		
		me.getView().detailViewAlias = 'app-whreconciliationdetail';
		me.openDetailPopup(selection, 'WH Reconciliation Detail');
	},
	
	onOpenWHReconcilJobMonitoring:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refWHReconcilGrid;
		var title = {type: 'bundle', key: 'whReconcilJobMonitoringTitle'};
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		me.getView().detailViewAlias = 'app-whreconciljobmonitoring';
		me.openDetailPopup(selection, title);
		
	},
	
	onSettlement:function(){
		var me = this;
		var refs = me.getReferences();
		var grid = refs.refWHReconcilGrid;
		var selection = grid.getSelection() == null ? null : grid.getSelection()[0];
		
		if(selection == null) return;
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_BBK
				&& selection.get('projectCargo') == 'Y'){
			MessageUtil.warning('warning_msg', 'whReconcilValidateForSettlement');
			return;
		}
		
		if(selection.get('cgTpCd') == CodeConstants.MT_CGTP_RCV){
			MessageUtil.warning('warning_msg', 'whReconcilValidateForSettlement');
			return;
		}
		
		var whReconcilDetail = me.getStore('whReconcilDetail');
		whReconcilDetail.load({
			params:{
				vslCallId: selection.get('vslCallId'),
				cgNo: selection.get('cgNo'),
				whTpCd: selection.get('whTpCd'),
				searchType: ''
			},
			callback:function(records,success){
				if(success){
					if(records.length > 0){
						var detailList = records[0].get('detailList');
						
						//Confirm msg
						MessageUtil.question('confirmation_msg', 'settlementMsg', null,
								function(button){
									if(button == 'ok'){
										me.settlementProcess(detailList);
									}
								}
							);
						
					}
				}
			}
		});
		
	},
	
	/**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD START
	 */
	getSearchCondition:function(){
		var me = this;
     	var refs = me.getReferences();
     	var store = me.getStore(me.MAIN_STORE_NAME);
		var grid = me.lookupReference(me.MAIN_GRID_REF_NAME);
		var pageNo = store.currentPage;
		var sizePerPage = CommonConstants.PAGE_SIZE;
		var searchParm = me.getViewModel().get('theSearch');

		var params = me.createParam(searchParm);
		
//     	var yardInFrom = Ext.Date.format(refs.ctlYardInFromDt.getValue(), MOST.config.Locale.getShortDate());
//     	var yardInTo = Ext.Date.format(refs.ctlYardInToDt.getValue(), MOST.config.Locale.getShortDate());

     	
		//var yardInFrom = refs.ctlYardInFromDt.getValue();
     	//var yardInTo = refs.ctlYardInToDt.getValue();

		params['cmdtCd'] 		=  searchParm.get('cmdtCd');
		params['cmdtGrpCd'] 	=  searchParm.get('cmdtGrpCd');
		params['pkgNo'] 		=  searchParm.get('pkgNo');

    	params['vslCallId'] 	=  searchParm.get('vslCallId');
    	params['scn'] 			=  searchParm.get('scn');
    	params['shpr'] 			= searchParm.get('shpr');
    	params['cnsne'] 		= searchParm.get('cnsne');
    	params['fwAgent'] 		= searchParm.get('ptnrCd');
    	params['displayOption'] = searchParm.get('displayOption');
    	params['searchType'] 	= 'whrecnlist';
    	params["aggregate"] 	= searchParm.get('aggregate');
    	
    	if(refs.refWhReconcilList.activeTab.title != 'Pivot'){
        	params['pageNo'] 		= pageNo;
    		params['sizePerPage'] 	= sizePerPage;
    	}

		params['sort'] 			= grid.getSortString();

    	return params;
	},
	
	afterSetCodePopupData:function(xtype, targetControl, returnValue, me, parent){
		var me = this;
		var refs = me.getReferences();
		
		var masterBlCombo = me.getStore('masterBlCombo');
		var blNoCombo = me.getStore('blNoCombo');
		var bookingNoCombo = me.getStore('bookingNoCombo');
		var snNoCombo = me.getStore('snNoCombo');
		
		if(targetControl === 'ctlVslCallId'){
			if(returnValue){
				me.getViewModel().setData({theVsl:returnValue.item});
				
				masterBlCombo.load({
					params: {
						vslCallId : refs.ctlVslCallId.getValue()
					}
				});
				
				blNoCombo.load({
					params: {
						vslCallId : refs.ctlVslCallId.getValue()
					}
				});
				
				bookingNoCombo.load({
					params: {
						vslCallId : refs.ctlVslCallId.getValue()
					}
				});
				
				snNoCombo.load({
					params: {
						vslCallId : refs.ctlVslCallId.getValue()
					}
				});
				refs.ctlScn.setValue(returnValue.item.get('scn'));
			}
			else {
				me.getViewModel().setData({theVsl:null});
				refs.ctlScn.setValue('');
				masterBlCombo.removeAll();
				blNoCombo.removeAll();
				bookingNoCombo.removeAll();
				snNoCombo.removeAll();
			}
		}  else if(targetControl === 'ctlScn'){ 
			if(returnValue){
				refs.ctlScn.setValue(returnValue.code);

				if(!StringUtil.isNullorEmpty(returnValue.item.get('vslCallId'))){
					refs.ctlVslCallId.setValue(returnValue.item.get('vslCallId'));
					me.getViewModel().setData({theVslInfo:returnValue.item});
					me.onSearch();
				}else {
					refs.ctlVslCallId.setValue('');
					me.getViewModel().setData({theVslInfo:null});
				}
			} 
		}
	},
	
	settlementProcess:function(detailList){
		var me = this;
		var refs = me.getReferences();
		var whReconcilDetail = me.getStore('whReconcilDetail');
		var itemsArr = new Array();
		
		for(var i=0; i<detailList.length; i++){
			var recordItem = Ext.create('MOST.model.operation.WHReconciliation');
			var record = detailList[i];
			recordItem.set('vslCallId', record.vslCallId);
			recordItem.set('cgNo', record.cgNo);
			recordItem.set('locId', record.locId);
			recordItem.set('whTpCd', record.whTpCd);
			recordItem.set('whLocTp', record.whLocTp);
			
			recordItem.set('rcCoCd', 'ST');
			recordItem.set('remarks', 'Settlement');
			recordItem.set('chgWgt', Number(record.balMt) * (-1));
			recordItem.set('chgMsrmt',  Number(record.balM3) * (-1));
			recordItem.set('chgPkgQty',  Number(record.balQty) * (-1));
			recordItem.set('jobCoCd', record.whTpCd);
			recordItem.set('userId', Token.getUserId())
			
			itemsArr.push(recordItem.data);
		}
		
		if(itemsArr.length > 0){
			var updateParm = Ext.create('MOST.model.foundation.parm.UpdateBizParm');
			updateParm.getProxy().url = MOST.config.Locale.getRestApiDestUrl() + '/v1/whreconciliation/settle';
			updateParm.phantom = true;
			updateParm.set('workingStatus', WorkingStatus.INSERT);
			updateParm.set('userId', MOST.config.Token.getUserId());
			updateParm.set('items', itemsArr)
			
			updateParm.save({
				success: function(record) {
					MessageUtil.saveSuccess();
					me.onSearch();
				}
			});
		}
	},
	
	/**
	 * =========================================================================================================================
	 * GENERAL METHOD END
	 */
	
	/**
	 * =========================================================================================================================
	 * DETAIL SCREEN START
	 */
	
	onWHReconcilDetailLoad:function(){
		var me = this;
		var refs = me.getReferences();
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var whReconcilDetail = me.getStore('whReconcilDetail');
		var whReconcilDetailGrid = me.getStore(me.DETAIL_STORE_NAME);
		var cargoReconilCondCombo = me.getStore('cargoReconilCondCombo');
		
		refs.txtMt.setValue(recvData.get('balMt'));
		refs.txtM3.setValue(recvData.get('balM3'));
		refs.txtQty.setValue(recvData.get('balQty'));
		
		me.getView().center();
		
		whReconcilDetail.load({
			params:{
				vslCallId: recvData.get('vslCallId'),
				cgNo: recvData.get('cgNo'),
				whTpCd: recvData.get('whTpCd'),
				searchType: ''
			},
			callback:function(records,success){
				if(success){
					var detailList = records[0].get('detailList');
					whReconcilDetailGrid.setData(records[0].get('detailList'));
					cargoReconilCondCombo.setData(records[0].get('cargonReconcilCond'));
					
//					refs.txtMt.setValue(detailList[0].wgt);
//					refs.txtM3.setValue(detailList[0].msrmt);
//					refs.txtQty.setValue(detailList[0].pkgQty);
					
					whReconcilDetail.commitChanges(); 
					whReconcilDetailGrid.commitChanges();
					cargoReconilCondCombo.commitChanges();
				}
			}
		});
	},
	
	onWhRecDetailDblClick:function(g, rowIndex, colIndex, e){
		var me = this;
		var refs = me.getReferences();
		
		refs.txtMt.setValue(e.get('wgt'))
		refs.txtM3.setValue(e.get('msrmt'));
		refs.txtQty.setValue(e.get('pkgQty'))
	},
	
	onWhReconcilDetailEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
		var whReconcilDetailGrid = me.getStore(me.DETAIL_STORE_NAME);
		var whReconcilDetail = me.getStore('whReconcilDetail');
		var detailView = me.getDetailBizView();
		var recvData = detailView.items.get(0).recvData;
		var recordItem = Ext.create('MOST.model.operation.WHReconciliation');		
		
		var amdWgt = StringUtil.isNullorEmpty(refs.txtAmdWgt.getValue()) ? 0 : parseFloat(refs.txtAmdWgt.getValue());
		var amdMsrmt = StringUtil.isNullorEmpty(refs.txtAmdMsrmt.getValue()) ? 0 : parseFloat(refs.txtAmdMsrmt.getValue());
		var amdPkgQty = StringUtil.isNullorEmpty(refs.txtAmdPkgQty.getValue()) ? 0 : parseFloat(refs.txtAmdPkgQty.getValue());
	
		var mt = StringUtil.isNullorEmpty(refs.txtMt.getValue()) ? 0 : parseFloat(refs.txtMt.getValue());
		var msrmt = StringUtil.isNullorEmpty(refs.txtM3.getValue()) ? 0 : parseFloat(refs.txtM3.getValue());
		var qty = StringUtil.isNullorEmpty(refs.txtQty.getValue()) ? 0 : parseFloat(refs.txtQty.getValue());
		
		var chgWgt = 0;
		var chgMsrmt = 0;
		var chgPkgQty = 0;
		
		if(context.record.dirty){
			var proxy = context.record.getProxy();
			proxy.url = whReconcilDetail.getProxy().url;
			
			chgWgt = amdWgt;
			chgMsrmt = amdMsrmt;
			chgPkgQty = amdPkgQty;
		
			context.record.set('rcCoCd', 'SO');
			context.record.set('remarks', refs.refRemarks.getValue());
			context.record.set('chgWgt', chgWgt);
			context.record.set('chgMsrmt', chgMsrmt);
			context.record.set('chgPkgQty', chgPkgQty);
			context.record.set('jobCoCd', context.record.get('whTpCd'));
			context.record.set('opeClassCd', recvData.get('opeClassCd'))
			
			context.record.save({
				success:function(){
					me.onWHReconcilDetailLoad();
					me.onSearch();
				},
	            failure: function(batch, options){
	                MessageUtil.error();
	            }
			})
		}
	},
	
	onWhReconcilValidateEdit:function(editor, context){
		var me = this;
		var refs = me.getReferences();
		
		var grid = refs.refWHReconcilDetailGrid;
		var editor = grid.getPlugin('whReconcilDetailEditor');
		
		var isValid = true;
		
		if(StringUtil.isNullorEmpty(refs.txtAmdWgt.getValue()) && StringUtil.isNullorEmpty(refs.txtAmdMsrmt.getValue()) && StringUtil.isNullorEmpty(refs.txtAmdPkgQty.getValue())){
			MessageUtil.warning('warning_msg', 'whReconcilValidateEmptyAmount');
			isValid = false;
			
		}
		
		if(!isValid){
			editor.cancelEdit();
			me.onWHReconcilDetailLoad();
		}
	},
	
	onWhReconcilCancelEdit:function(rowEditing, context){
		var me = this;
	
	},
	
	onGridComboRenderer:function(val, cell, record){
		var me = this;
		var refs = me.getReferences();
		var cargoReconilCondCombo = me.getStore('cargoReconilCondCombo');
	
		
		if(cargoReconilCondCombo != null){
			var indx = -1;
			indx = cargoReconilCondCombo.find('scd', val);
	

			if (indx != -1){
				return cargoReconilCondCombo.getAt(indx).get('scdNm'); 
			}else{
				if(record != undefined){
					return record.get('rcCoCdNm');
				}
				 
			}
		}
	},
	
	onExportExcelPdfWithServer : function(gridNameString,isExcel) {
		var me = this;
		var searchBizParm = me.getSearchCondition();
		
		searchBizParm.classID = 'com.tsb.most.biz.parm.operation.SearchWHReconciliationParm';
		searchBizParm.serviceID = 'MOST.whReconciliation.selectWHRecnList';

		me.exportExcelPdfWithServer(gridNameString,searchBizParm, isExcel);
	},
	
	/**
	 * =========================================================================================================================
	 * DETAIL SCREEN END
	 */
	
	/**
     * Start Pivot Function====================
     */
	
	onDataChangeSearchParam : function(modelInstance, modifiedFieldNames, me){
    	var me = this;
      	var refs = me.getReferences();
      	
      	var store = null;
      	
    	if(refs.refWhReconcilList.activeTab.title == 'Pivot'){
        	var pivotGrid = refs.ctlPivotGrid;
    		if(pivotGrid.getStore()){
    			pivotGrid.getStore().clearFilter();
    			pivotGrid.getStore().removeAll();
    		}
    	}else if(refs.refWhReconcilList.activeTab.title == 'List'){
    		store = me.getStore(me.MAIN_STORE_NAME);
    		store.clearFilter();
    		store.removeAll();
    	}
		
 	},
 	
 	onDropGrid: function(node, data, dropRec, dropPosition) {
        this.onDataChangeSearchParam();
    },
    
    
    getPivotItems : function(){
		var me = this;
		var refs = me.getReferences();
		var columns = GridUtil.getGridColumns("Cargo.Fields.Inventoy");
		var grid = refs.ctlPivotItems;
		
		var store = me.getViewModel().getStore('pivotItems');
		var arrayItems = new Array();
		columns.forEach(function(record, idx){
			
			var item = Ext.create('MOST.model.common.export.StringValueItem');
			item.set('dbField', record.dbField);
			item.set('text', record.text);
			item.set('itemKey', record.itemKey);
			
			arrayItems.push(item);
			
		})
		
		store.loadRecords(arrayItems);
		store.commitChanges();
			
	},
	
    setPivotMatrix: function(pivotGrid){
		var me = this.getView();
		var refs = me.getReferences();
		
		var matrix = pivotGrid.getMatrix();
		
		matrix.topAxis.dimensions.removeAll();
		matrix.leftAxis.dimensions.removeAll();
		var value = refs.ctlCalculate.getValue();
		
		matrix.aggregate.items[0].setAggregator(value);
		
		
		var topAxis = refs.ctlTopAxis.getStore();
		var topAxisDimensions = matrix.topAxis;
		
		topAxis.each(function(record){
			var topAxisElement = Ext.create('Ext.pivot.dimension.Item',{
				header: record.get('text'),
				dataIndex: record.get('dbField'),
				direction: 'ASC',
			});	
		
			topAxisDimensions.addDimension(topAxisElement);
		});
		
		var leftAxis = refs.ctlLeftAxis.getStore();
		var leftAxisDimensions = matrix.leftAxis;
		
		leftAxis.each(function(record){
			var leftAxisElement = Ext.create('Ext.pivot.dimension.Item',{
				header: record.get('text'),
				dataIndex: record.get('dbField'),
				direction: 'ASC'
			});
			
			leftAxisDimensions.addDimension(leftAxisElement);
		});

	}
    
	/**
	 * =========================================================================================================================
	 * PIVOT END
	 */
});