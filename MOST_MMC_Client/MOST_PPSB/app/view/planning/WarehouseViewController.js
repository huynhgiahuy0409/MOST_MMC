Ext.define('MOST.view.planning.WarehouseViewController', {
    extend: 'MOST.view.foundation.BaseViewController',

    requires: [
        'MOST.view.common.warehouserenderer.WarehouseRendererBuilder'
    ],

    alias: 'controller.warehouseview',

    listen: {
        controller: {
            '*': {
                onRedirectWarehouseView: 'onRedirectWarehouseView'
            }
        }
    },
    /**
	 * =========================================================================================================================
	 * CONSTANT START
	 */
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
        me.loadWarehouseComboStore();
    },

    loadWarehouseComboStore : function(){
        var me = this;
        var store = me.getStore('warehouseList');
        store.load({
            params : {
                locDivCd : 'WHO',
            },
            callback : function(){
                if(me.getView().recvData){
                    var recvData = me.getView().recvData;
                    var combo = me.getReferences().refWarehouseCombo;
                    combo.clearValue();
                    combo.setSelection(recvData);
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
   

    onRedirectWarehouseView : function(detailItem) {
        var me = this;
        var ref = me.lookupReference('refWarehouseLayoutView');
        ref.removeAll();
        me.getView().recvData = detailItem;
        me.onLoad();
    },

    onPopupLoad : function(){
        var me = this;
        var store = me.getStore('warehouseTooltipList');
        var cargoList = me.getView().recvData.cargoList;

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

    onWarehouseSelect: function(combo, record){
        var me = this;
        var ref = me.lookupReference('refWarehouseLayoutView');

        me.warehouseBuilder.build(ref, record);
        me.getReferences().refFit.setValue(false);
    },

    onChangeColorBy : function(btn){
        var me = this;
        me.warehouseBuilder.changeRenderMode(btn.value);
    },

    onTooltipBtnClicked : function(btn){
        var me = this;

        if(me.hasCellCargo()){
            var cellCargoList = me.warehouseBuilder.getCellCargos(me.selectedCell);
            var params = {
                cargoList : cellCargoList
            }
            me.getView().detailViewAlias = 'app-warehouseviewtooltip';
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

    /**
	 * =========================================================================================================================
	 * EVENT HANDLER END
	 */
	
    /**
	 * GENERAL METHOD START
	 * =========================================================================================================================
	 */


    /**
	 * GENERAL METHOD END
	 * =========================================================================================================================
	 */

});