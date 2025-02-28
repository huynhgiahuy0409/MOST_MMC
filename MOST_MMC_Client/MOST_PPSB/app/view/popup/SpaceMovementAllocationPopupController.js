Ext.define('MOST.view.popup.SpaceMovementAllocationPopupController', {
	extend: 'MOST.view.foundation.BaseViewController',

    requires: [
    ],

    alias: 'controller.spacemovementallocationpopup',

    /**
     * =========================================================================================================================
     * CONSTANT START
     */
    initLocIdArr: [],
    warehouseBuilder : new WarehouseRendererBuilder({
        selectable: true,
        renderMode: 'plan',
        selectMode: 'normal',
        minZoomRate : 20,
        maxZoomRate : 300,
    }),
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
        me.loadWarehouseComboStore();
        me.initAccumCellObj();
    },

    onResizeWrapper: function(panel, width, height, oldWidth, oldHeight, eOpts){
        var me = this;
        var whView = me.lookupReference('refWarehouseLayoutView');
        whView.setWidth(width);
        whView.setHeight(height);
        me.warehouseBuilder.onFitToScreenWarehouse(true);
    },

    loadWarehouseComboStore: function(){
        var me = this;
        var whComboStore = me.getStore('warehouseList');
        whComboStore.load({
            params : {
                locDivCd : CodeConstants.MT_LOCDIV1_WHO,
                areaId : CodeConstants.VC_TMNL_BBT,
                locUseYn : 'Y'
            },
            callback: function(records, operation, success) {
                if (success) {
                    me.setInitWhLoc().setInitWhGrid().setInitRentedCells();
                }
            }
        });
    },

    setInitWhLoc: function(){
        var me = this;
        var locId = me.getView().recvData.locId;
        
        me.lookupReference('refWarehouse').setValue(locId);
        
        return me;
    },

    setInitWhGrid: function(){
        var me = this;
        var accmCelStore = me.getStore('allocatedWarehouseStore');
        
        accmCelStore.setRecords(me.generateRentalWhCellList(me));
        
        return me;
    },

    generateRentalWhCellList: function(me){
        var accmCelObj = {};
        var recvData = me.getView().recvData;

        me.initLocIdArr = recvData.locIds.split(',');

        Ext.Array.each(me.initLocIdArr, function(locId){
            var whId = locId.substring(0, locId.lastIndexOf('-'));
            
            if(Ext.isEmpty(whId)){
                return;
            } else if(accmCelObj[whId] === undefined){
                accmCelObj[whId] = [];
            }
            
            accmCelObj[whId].push(locId);
        });

        return me.convertRentalObjToArr(accmCelObj);
    },

    convertRentalObjToArr: function(accmCelObj){
        var accmCelArr = [];

        Ext.Object.each(accmCelObj, function(key, value){
            var whId = key;
            var locIdArr = value;
            
            accmCelArr.push({whId : whId, locIdArr: locIdArr});
        });

        return accmCelArr;
    },

    setInitRentedCells: function(){
        var me = this;
        var whId = me.lookupReference('refWarehouse').getValue();
        var locRecord = me.getStore('allocatedWarehouseStore').findRecord('whId', whId);

        me.locIdArr = [];
        
        if(locRecord){
            me.locIdArr = locRecord.get('locIdArr');
        }
        
        me.warehouseBuilder.setLocatedCells(me.locIdArr);

        return me;
    },

    /**
     * INITIALIZE END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * EVENT HANDLER START
     */

    onWarehouseComboSelect : function(combo, newValue){
        var me = this;
        var record = combo.getStore().findRecord('locId', newValue);
        
        me.initFieldInfoData();
        me.initWarehouseView(record);
    },

    initFieldInfoData: function(){
        this.initAccumCellObj();
        this.initSelectedCell();
    },

    initWarehouseView: function(record){
        var me = this;
        var ref = me.lookupReference('refWarehouseLayoutView');
        
        me.warehouseBuilder.build(ref, record);
        me.setInitRentedCells();
    },

    onLayoutViewRender : function(panel) {
        var me = this;
        me.setWarehouseViewOnClickEvent(panel);
    },

    onZoomWarehouse: function(btn){
        var me = this;
        me.warehouseBuilder.onZoomWarehouse(btn.value);
        me.getReferences().refFit.setValue(false);
    },

    onFitToScreenWarehouse: function(tag){
        var me = this;
        me.warehouseBuilder.onFitToScreenWarehouse(tag.value);
    },

    setWarehouseViewOnClickEvent: function(panel){
        var me = this;
        
        panel.body.on('click', function(e) {
            me.warehouseBuilder.onClick(e, function(builder, item){
                var accmCels = me.getInitializedAccumCellObj();

                accmCels.whId = me.lookupReference('refWarehouse').getValue();
                me.setSelectedCell(item);

                if(builder.getSelectMode() === builder.SM_RENT){
                    Ext.Array.each(builder.getLocatedCells(), function(cell){
                        accmCels.cellArr.push(cell);
                        accmCels.locIdArr.push(cell.get('locId').replace(/ /g,'')); // remove locId space
                    });
                    
                    accmCels.locIds = accmCels.locIdArr.join(',');
                }
            });
        });
    },

    onSetLocationClicked: function(btn){
        var me = this;
        
        if(me.warehouseBuilder.getSelectMode() === me.warehouseBuilder.SM_NORMAL){
            me.setBtnSetLocationStyle(btn, true);
            me.warehouseBuilder.changeSelectMode(me.warehouseBuilder.SM_RENT, true);
        } else {
            me.setBtnSetLocationStyle(btn, false);
            me.warehouseBuilder.changeSelectMode(me.warehouseBuilder.SM_NORMAL, false);
        }
    },

    setBtnSetLocationStyle: function(btn, isSetLocation){
        if(isSetLocation){
            btn.btnInnerEl.setStyle('font-style', 'italic');
            btn.btnInnerEl.setStyle('text-decoration', 'underline');
        } else {
            btn.btnInnerEl.setStyle('font-style', 'normal');
            btn.btnInnerEl.setStyle('text-decoration', 'none');
        }
    },

    onSave: function(){
        var me = this;
        var controlName = me.getView().reference;
        var bizController = me.getParentView().getController();
        var alias = me.getView().alias[0].split('.')[me.alias[0].split('.').length-1];
        var returnItem = me.getStore('allocatedWarehouseStore').getData().items;

        if(bizController.afterSetCodePopupData){
            /**
             * @returns {accumulatedCell[]} returnItem Array of accumulated cells
             */
            bizController.afterSetCodePopupData(alias, controlName, returnItem);
        }

        me.onCancel();
    },

    // Recusive search function
    getParent:function(view){
        var me = this;

        if(view.up("panel").getController()){
            return view.up("panel");
        } else {
            return me.getParent(view.up("panel"));
        }
    },

    onTooltipClicked: function(){
        var me = this;

        if(me.hasCellCargo()){
            var cellCargoList =
                me.warehouseBuilder.getCellCargos(me.warehouseBuilder.getSelectedCells()[0]);

            var params = {
                cargoList : cellCargoList,
                title: me.warehouseBuilder.getSelectedCells()[0].get('locId')
            }

            Ext.merge(me.getView().recvData, params);
            me.openCodePopup('app-warehouseviewtooltip', '', params);
        }
    },

    onCancel: function(){
        this.getView().up('window').close();
    },

    onApply: function(){
        var me = this;
        var accmCels = me.getViewModel().getData().accumulatedCells;
        var store = me.getStore('allocatedWarehouseStore');
        var data = store.findRecord('whId', accmCels.whId);

        if(data){
            data.set('locIdArr', accmCels.locIdArr);
            data.set('items', accmCels.cellArr);
            return;
        }

        store.add(me.generateNewRentalRecord(accmCels));
    },

    generateNewRentalRecord: function(accmCels){
        var obj = {
            whId: accmCels.whId,
            locIdArr: accmCels.locIdArr,
            items: accmCels.cellArr
        }

        return obj;
    },

    onDelete: function(){
        var me = this;
        var selection = me.lookupReference('refWhSetLocGrid').getSelection()[0];
        
        if(!selection){
            MessageUtil.warning('Warning', 'spaceMovementPlan_WarnSelDelRec');
            return;
        }

        if(selection.get('locId') === me.lookupReference('refWarehouse').getValue()){
            me.warehouseBuilder.removeAllLocates();
        }

        me.getStore('allocatedWarehouseStore').remove(selection);
    },

    /**
     * EVENT HANDLER END
     * =========================================================================================================================
     */

    /**
     * =========================================================================================================================
     * GENERAL METHOD START
     */

    hasCellCargo : function(){
        var me = this;
        var valid = true;

        if(!me.hasSelectedCell() ||
            me.warehouseBuilder.getCellCargos(me.warehouseBuilder.getSelectedCells()[0]).length === 0){
            MessageUtil.alert('Warning', 'msgSelectOccupiedCell');
            valid = false;
        }

        return valid;
    },

    hasCellRental : function(){
        var me = this;
        var valid = true;
        
        if(!me.hasSelectedCell() || me.warehouseBuilder.getCellRental(me.warehouseBuilder.getSelectedCells()[0]).length === 0){
            MessageUtil.alert('Warning', 'msgSelectRentalCell');
            valid = false;
        }
        
        return valid;
    },

    hasSelectedCell : function(){
        var me = this;
        var valid = true;
        
        if(!(me.warehouseBuilder.getSelectedCells().length > 0)){
            MessageUtil.alert('Warning', 'msgSelectACell');
            valid = false;
        }
        
        return valid;
    },

    setSelectedCell: function(cell){
        this.getViewModel().setData({'selectedCell': cell});
    },

    initAccumCellObj: function(){
        var me = this;

        var initObj = {
            whId: '',
            locIds: '',
            locIdArr: [],
            cellArr : []
        };

        me.getViewModel().setData({'accumulatedCells' : initObj});
    },

    getInitializedAccumCellObj: function(){
        var me = this;
        
        me.initAccumCellObj();
        
        return me.getViewModel().getData().accumulatedCells;
    },

    initSelectedCell: function(){
        var me = this;
        me.getViewModel().setData({'selectedCell' : null});
    },

    onPopupLoad : function(){
        var me = this;
        var store = me.getStore('warehouseTooltipList');
        var cargoList = me.getView().recvData.cargoList;

        if(cargoList && cargoList.length > 0){
            store.add(cargoList);
        }
    }

    /**
     * GENERAL METHOD END
     * =========================================================================================================================
     */
});
