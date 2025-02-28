Ext.define('MOST.view.popup.WarehouseRentalPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

    requires: [
        'MOST.view.common.warehouserenderer.WarehouseRendererBuilder'
    ],

    alias: 'controller.warehouserentalpopup',

    listen: {
        controller: {
            '*': {
                onRedirectWarehouseView: 'onRedirectWarehouseView'
            }
        }
    },

    warehouseBuilder : new WarehouseRendererBuilder({
        selectable : true,
        allowMultiSelect : false,
        showRelatedCargo : true,
        minZoomRate : 20,
        maxZoomRate : 300,
    }),

    // warehouse objects
    relatedCells : null,
    selectedCell : null,

    onRedirectWarehouseView : function(detailItem) {
        var me = this;
        var ref = me.lookupReference('refWarehouseLayoutView');
        ref.removeAll();
        me.getView().recvData = detailItem;
        me.onLoad();
    },

    onLoad: function(){
        var me = this;
        me.loadWarehouseComboStore();

    },

    loadWarehouseComboStore : function(){
        var me = this;
        var store = me.getStore('warehouseList');
        var detailItem = me.getView().recvData;
        var whId = detailItem.locId.split(",");
        store.load({
            params : {
                locDivCd : 'WHO',
                whId: whId[0]
            },
            callback : function(records, operation, success){
                if(records && whId[0] != null && whId[0] != ''){
                    var recvData = me.getView().recvData;
                    var combo = me.getReferences().refWarehouseCombo;
                    combo.clearValue();
                    combo.setValue(records[0]);
                } else {
					var combo = me.getReferences().refWarehouseCombo;
                    combo.clearValue();
				}
            }
        });
    },

    onPopupLoad : function(){
        var me = this;
        var store = me.getStore('warehouseTooltipList');
//        var cargoList = me.getView().recvData.cargoList;
        var cargoList = me.getDetailBizView().items.items[0].recvData.cargoList;

        if(cargoList && cargoList.length > 0){
            store.add(cargoList);
        }
    },

    onLayoutViewRender : function(panel) {
        var me = this;
        panel.body.on('click', function(e) {
            me.warehouseBuilder.onClick(e, function(builder, item){
                if(!item)
                    return;

                me.relatedCells = builder.getRelatedCells();
                me.selectedCell = builder.getSelectedCells()[0];

                if(me.selectedCell){
                    me.setCargoRange();
                }
            });
        });
    },

    setCargoRange : function(){
        var me = this;
        var startingCellField = me.getReferences().refRangeStartCell;
        var endCellField = me.getReferences().refRangeEndCell;
        var startingCell = me.selectedCell;
        var endCell = me.getCargoEndCell();

        startingCellField.setValue(startingCell.get('locId'));
        endCellField.setValue(
            (endCell!==null) ? endCell.get('locId') : ''
        );
    },

    getCargoEndCell : function(){
        var me = this;
        var endCell = null;
        Ext.Array.each(me.relatedCells, function(cell){
            if((!endCell || endCell.get('locId') < cell.get('locId'))
                && me.selectedCell.get('locId') !== cell.get('locId')){
                endCell = cell;
            }
        });
        return endCell;
    },

    onWarehouseColorModeChange : function(btn){
        var me = this;
        me.warehouseBuilder.changeColorMode(btn.value);
    },

    onZoomWarehouse : function(btn){
        var me = this;
        me.warehouseBuilder.onZoomWarehouse(btn.value);
        me.getReferences().refFit.setValue(false);
    },

    onFitToScreenWarehouse : function(tag){
        var me = this;
        me.warehouseBuilder.onFitToScreenWarehouse(tag.value);
    },

    onWarehouseSelect: function(combo, newValue, oldValue){
        var me = this;
        var recvData = me.getView().recvData;
        var ref = me.lookupReference('refWarehouseLayoutView');
        var record = combo.getStore().getAt(combo.getStore().findExact('locId', newValue));
        me.warehouseBuilder.build(ref, record);
        me.warehouseBuilder.setLocatedCells(recvData.WhDtlList, 'cdVal');
        me.getReferences().refFit.setValue(false);
        me.warehouseBuilder.allowMultiSelect = false;
        me.warehouseBuilder.selectMode = me.warehouseBuilder.SM_NORMAL;

    },

    onChangeColorBy : function(btn){
        var me = this;
        me.warehouseBuilder.changeRenderMode(btn.value);
    },
    
    onSetLocationBtnClicked : function(btn){
        var me = this;
        var currentMode = me.warehouseBuilder.selectMode;
        if(currentMode == me.warehouseBuilder.SM_NORMAL){
        	me.setSetLocationBtnStyle(btn, true);
        	me.warehouseBuilder.changeSelectMode(me.warehouseBuilder.SM_RENT, true);
        } else{
        	me.setSetLocationBtnStyle(btn, false);
        	me.warehouseBuilder.changeSelectMode(me.warehouseBuilder.SM_NORMAL, false);
        }
    },
    
    setSetLocationBtnStyle: function(btn, isSetLocation){
        if(isSetLocation){
            btn.btnInnerEl.setStyle('font-style', 'italic');
            btn.btnInnerEl.setStyle('text-decoration', 'underline');
        } else {
            btn.btnInnerEl.setStyle('font-style', 'normal');
            btn.btnInnerEl.setStyle('text-decoration', 'none');
        }
    },
    
    onRentBtnClicked : function(btn){
    	var me = this;
    	var str = me.getReferences().refWarehouseCombo.value + '(' + 
		    	me.warehouseBuilder.getLocatedCells()[0].data.locId + ',' + 
		    	me.warehouseBuilder.getLocatedCells().length + ')';
    	console.log(str);

		var window = me.getView().up('window');
    	window.returnValue = me.getReturnData();
       	window.close();

    },
    
	// Returns the popup result.
	getReturnData:function(){
		var me = this;
		var combo = me.getReferences().refWarehouseCombo;
		var locId = me.getReferences().refWarehouseCombo.value
		var Qty = me.warehouseBuilder.getLocatedCells().length;
		var firstCell = me.warehouseBuilder.getLocatedCells()[0].data.locId.split('-')[1];
		var record = combo.getStore().getAt(combo.getStore().findExact('locId', locId));
    	var WhString = locId + '(' + firstCell + ',' + Qty + ')';
    	
		var returnItem = {
			WhRentString : WhString,
			WhRentList: me.warehouseBuilder.getLocatedCells(),
			WhRentArea: Qty * record.data.areaPBlk
		}
		
		return returnItem;
	},
	
    onTooltipBtnClicked : function(btn){
        var me = this;

        if(me.hasCellCargo()){
            var cellCargoList = me.warehouseBuilder.getCellCargos(me.selectedCell);
            var params = {
                cargoList : cellCargoList
            }
            me.getView().detailViewAlias = 'app-warehouseviewtooltippopup';
            me.openDetailPopup(params, me.selectedCell.get('locId'));
        }
    },

    onRentInfoBtnClicked : function(btn){
        var me = this;
        if(me.hasCellRental()){
            var cellRentalList = me.warehouseBuilder.getCellRental(me.selectedCell);
            var params = {
                rentList : cellRentalList[0]
            }
            me.getView().detailViewAlias = 'app-warehouserental';
            me.openDetailPopup(params, me.selectedCell.get('locId'));
        }
    },

    onDetailClicked : function(btn){
        var me = this;
        var prefix = 'menu';
        var menuId = 'MPCT121';
        var id = prefix + '_' + menuId;
        var mainView = me.getView().findParentByType('app-main');
        var tabs = mainView.lookupReference('ref-maintab');
        var tab = tabs.items.getByKey(id);

        if(me.hasCellCargo()){
            var cargoList = me.warehouseBuilder.getCellCargos(me.selectedCell);

            if(!tab){
                me.loadMenuView('app-cargomanualctl', cargoList[0]);
            } else {
                me.fireEvent('onRedirectCargoManualCtl', cargoList[0]);
                tabs.setActiveTab(tab);
            }
        }
    },

    onDisplayLegend: function(btn){
        var me = this;
        var xtype = 'popup-warehouselegend';
        me.openCodePopup(xtype,me);
    },

    hasSelectedCell : function(){
        var me = this;
        var valid = true;
        if(!me.selectedCell){
            MessageUtil.alert('Warning', 'msgSelectACell');
            valid = false;
        }
        return valid;
    },

    hasCellCargo : function(){
        var me = this;
        var valid = true;

        if(!me.hasSelectedCell() ||
            me.warehouseBuilder.getCellCargos(me.selectedCell).length === 0){
            MessageUtil.alert('Warning', 'msgSelectOccupiedCell');
            valid = false;
        }

        return valid;
    },

    hasCellRental : function(){
        var me = this;
        var valid = true;
        if(!me.hasSelectedCell ||
            me.warehouseBuilder.getCellRental(me.selectedCell).length === 0){
            MessageUtil.alert('Warning', 'msgSelectRentalCell');
            valid = false;
        }
        return valid;
    }

});