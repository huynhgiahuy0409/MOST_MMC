Ext.define('MOST.view.common.warehouserenderer.WarehouseRendererBuilder', {
	extend: 'Ext.container.Container',
	
	alternateClassName: ['WarehouseRendererBuilder'],

	requires : [
		'MOST.view.common.warehouserenderer.WarehouseRendererCommonModel'
	],

	// Constants
	CM_CARGO : 'cargo',
	CM_VESSEL : 'vessel',
	CM_CATEGORY : 'category',
	RM_OCCUPIED : 'occupied',
	RM_PLANNED : 'planned',
	SM_NORMAL : 'normal',
	SM_RENT : 'rent',
	BASE_UNIT : 'baseUnit',
	BASE_UNIT_ORIGIN : 'baseUnitOrigin',

    // Global Variables
	whId: '',

	/**
	 * @private
	 * <p>
	 *     This member is used for checking whether this <b>WarehouseRendererBuilder</b> object has
	 *     finished with its building process.
	 * </p>
	 * <p>
	 *     This will automatically set to <b>true</b> if the building process is finished.
	 *     When initializing, this value will be set to <b>false</b>
	 * </p>
	 * <p>
	 *     Highly recommend using <b>this.getIsBuilding()</b> method to get this state if needed.
	 * </p>
	 */
	isBuildingCompleted: false,

	viewReference : {},
	targetWarehouseData : {},
	viewModel : {},
    metaStore : {},
    cellInfomation : {},
    bayInformation : {},
    rowInformation : {},
	unUsedInformation : {},
	cargoInformation : {},
	rentalInformation : {},
	spaceMovementInformation : {},
	searchCondition: {},
	
	// Configuration Variables
	selectable : true,
	allowMultiSelect : false,
	showRelatedCargo : false,
	renderMode : '',
	colorMode : '',
	selectMode : '',
	minZoomRate : 0,
	maxZoomRate : 0,
	allocationMode : false,

	warehouseComponent : {},

	constructor : function(config){
		var me = this;
		me.selectable = (config.selectable) ? config.selectable : true;
		me.allowMultiSelect = (config.allowMultiSelect) ? config.allowMultiSelect : false;
		me.showRelatedCargo = (config.showRelatedCargo) ? config.showRelatedCargo : false;
		me.fitOnLoad = (config.fitOnLoad) ? config.fitOnLoad : false;
		me.renderMode = (config.renderMode) ? config.renderMode : me.RM_OCCUPIED;
		me.colorMode = (config.colorMode) ? config.colorMode : me.CM_CARGO;
		me.selectMode = (config.selectMode) ? config.selectMode : me.SM_NORMAL;
		me.minZoomRate = (config.minZoomRate) ? config.minZoomRate : 20;
		me.maxZoomRate = (config.maxZoomRate) ? config.maxZoomRate : 200;
	},
	
	veiwPlanInfo : function(viewReference, refs, recvData){
		var me = this, searchType;
		me.setViewModel();
		
		var viewPlanInfoStore = me.viewModel.getStore('WhViewList');
		var cgNo = '';
		searchType = 'viewPlanInfo';
		
		if(recvData.data.shipgNoteNo == null || recvData.data.shipgNoteNo == ''){
			cgNo = recvData.data.cgNo;
		}
		
		viewPlanInfoStore.load({
			params: {
				searchType: searchType,
				whTpCd: recvData.data.whTpCd,
				whId: '',
				bayQty: 0,
				rowQty: 0,
				vslCallId: recvData.data.vslCallId,
				cgNo: cgNo,
				grNo: recvData.data.cgNo,
				spCaCoCd: recvData.data.spCaCoCd,
				blSn: recvData.data.blSn,
				catgCd: recvData.data.catgCd,
				cgTpCd: recvData.data.cgTpCd,
				rehandleCheck: recvData.data.rehandleCheck
			},
			callback: function(records, operation, success) {
				if(records && records.length > 0 && records[0].data.whLocId2){
					refs.refWarehouse.setValue(records[0].data.whLocId2);
					if(refs.refWarehouse.selection){
						me.build(viewReference, refs.refWarehouse.selection, recvData);
					}
				}
			}
		});
	},	
	
	// Should be called only once on data change
	/**
	 * @param {Object} viewReference - Container reference
	 * @param {Model} targetWarehouseData - Selected wareohouse model
	 */
    build: function(viewReference, targetWarehouseData, searchCondition){
		var me = this;
		me.isBuildingCompleted = false;
		me.setReference(viewReference);
		me.setTargetWarehouseData(targetWarehouseData);
		me.setSearchCondition(searchCondition);
		me.setViewModel();

		if(me.viewReference == null || me.viewReference == ''){
			console.log('No Reference Given');
			return;
		} else if(targetWarehouseData == null){
			console.log('No Warehouse Data Given');
			return;
		}

		me.getWarehouseInformationStores();
		me.drawInitiate();
	},

	getWarehouseInformationStores : function(){
		var me = this;
		me.metaStore = me.viewModel.getStore('meta');
		me.cellInfomation = me.viewModel.getStore('cellInfomation');
		me.bayInformation = me.viewModel.getStore('bayInformation');
		me.rowInformation = me.viewModel.getStore('rowInformation');
		me.unUsedInformation = me.viewModel.getStore('unUsedInformation');
		me.cargoInformation = me.viewModel.getStore('cargoInformation');
		me.rentalInformation = me.viewModel.getStore('rentalInformation');
		me.spaceMovementInformation = me.viewModel.getStore('spaceMovementInformation');
	},
	
	drawInitiate : function(){
		var me = this;
		me.loadMetaStore();
	},

	loadMetaStore : function(){
		var me = this;
		me.metaStore.load({
			callback: function(records, operation, success) {
				if (success) {
			    	me.loadBayRowInformation();
				}
			}
		});
	},

	loadBayRowInformation : function(){
		var me = this, searchType, bayRowDesignInfoStore;

		if(!me.targetWarehouseData.dirty){
			searchType = 'viewInfo';
			bayRowDesignInfoStore = me.viewModel.getStore('WhViewList');
		} else {
			searchType = 'chkBayRow';
			bayRowDesignInfoStore = me.viewModel.getStore('bayRowDesignInfo');
		}

		var opMode = false;
		if (me.searchCondition && me.searchCondition.$className === 'MOST.model.operation.CargoHandlingOut') {
			opMode = true;
		} else if (me.searchCondition && me.searchCondition.$className === 'MOST.model.operation.WHCheckExport' && me.searchCondition.data.cgTpCd != null) {
			opMode = true;
		}
		
		bayRowDesignInfoStore.load({
			params: {
				searchType: searchType,
				whId: me.targetWarehouseData.data.locId,
				bayQty: me.targetWarehouseData.data.bayQty,
				rowQty: me.targetWarehouseData.data.rowwQty,
				vslCallId: opMode ? me.searchCondition.data.vslCallId : '',
				whTpCd: opMode ? me.searchCondition.data.whTpCd : '',
				spCaCoCd: opMode ? me.searchCondition.data.spCaCoCd : '',
				blSn: opMode ? me.searchCondition.data.blSn : '',
				catgCd: opMode ? me.searchCondition.data.catgCd : '',
				cgTpCd: opMode ? me.searchCondition.data.cgTpCd : '',
				rehandleCheck: opMode ? me.searchCondition.data.rehandleCheck : '',
				cgNo: (function(searchCondition, opMode){
					var cgNo = '';
					if(searchCondition){
						if (searchCondition.data.spCaCoCd != 'S' && opMode){
							cgNo = searchCondition.data.cgNo
						}
					}
					return cgNo;
				})(me.searchCondition, opMode)
			},
			callback: function(records, operation, success) {
				if (success) {
					me.insertWarehouseComponent(records[0].data);
				}
			}
		});
	},
	
	insertWarehouseComponent: function(bayRowDesignItem){
		var me = this;
		me.setWarehouseInformation(bayRowDesignItem);
		me.addWarehouseRendererComponentToView();
	},

	setWarehouseInformation : function(bayRowDesignItem){
		var me = this;
		me.cellInfomation.setData(bayRowDesignItem.cell);
		me.bayInformation.setData(bayRowDesignItem.bay);
		me.rowInformation.setData(bayRowDesignItem.row);
		me.unUsedInformation.setData(bayRowDesignItem.unused).commitChanges();
		me.cargoInformation.setData(bayRowDesignItem.cargo);
		me.rentalInformation.setData(bayRowDesignItem.rental);
		me.spaceMovementInformation.setData(bayRowDesignItem.spacemovement);
	},

    addWarehouseRendererComponentToView : function(){
		var me = this;
		me.viewReference.removeAll(true);

        me.warehouseComponent = me.viewReference.add({
    		xtype: 'app-warehouserenderer',
			reference: 'refWarehouseViewRenderer',
			renderMode : me.renderMode,
			colorMode : me.colorMode,
			selectMode : me.selectMode,
    		layout: {
    			type: 'absolute'
    		},
    		x: 0,
    		y: 0,
    		width: 1,
        	height: 1
        });

		me.warehouseComponent = me.setRenererComponentConfiguration(me.warehouseComponent);
		me.isBuildingCompleted = true;
	},

	setRenererComponentConfiguration : function(warehouseComponent){
		var me = this;
        warehouseComponent.storeMeta = me.metaStore;
        warehouseComponent.storeCell = me.cellInfomation;
        warehouseComponent.storeBay = me.bayInformation;
        warehouseComponent.storeRow = me.rowInformation;
		warehouseComponent.storeUnused = me.unUsedInformation;
		warehouseComponent.storeCargo = me.cargoInformation;
		warehouseComponent.storeRental = me.rentalInformation;
		warehouseComponent.storeSpaceMovement = me.spaceMovementInformation;
		warehouseComponent.selectedItem = me.targetWarehouseData;
		warehouseComponent.showRelatedCargo = me.showRelatedCargo;
        return warehouseComponent;
	},


	// Event Methods
	/**
	 * This callback type is called `onClickCallback` and is displayed as a global symbol.
	 * @callback onClickCallback
	 * @param {WarehouseRendererBuilder} [builder = this] builder
	 * @param {cell} selectedItem
	 * @param {event} [event = receivedEvent] event
	 */

	/**
	 * @param {event} event
	 * @param {onClickCallback} callback
	 */
	onClick : function(event, callback){
		var me = this;
		var selectedItem = me.getClickedCell(me.warehouseComponent, event);

		if(me.selectable && selectedItem && me.selectMode === me.SM_NORMAL)
			me.setSelect(selectedItem, (selectedItem.select) ? !selectedItem.select : true);

		if(me.selectable && selectedItem && me.selectMode === me.SM_RENT)
			me.setLocated(selectedItem, (selectedItem.locate) ? !selectedItem.locate : true);

		if(me.showRelatedCargo && selectedItem)
			me.setRelatedCells(selectedItem);

		if(!selectedItem || (selectedItem.select !== undefined && selectedItem.select == false))
			selectedItem = null;

		if(me.getIsCompleted()){
			me.warehouseComponent.redraw();
	
			callback(me, selectedItem, event);
		}
	},

	/**
	 * @param {Model} item
	 * @param {boolean} isSelected
	 */
	setSelect : function(item, isSelected){
		var me = this;
		if(!me.allowMultiSelect)
			me.removeAllSelects();

		item.select = isSelected;
	},

	/**
	 * @param {Model} item
	 * @param {boolean} isLocated
	 */
	setLocated : function(item, isLocated){
		var me = this;

		if(!me.allowMultiSelect)
			me.removeAllLocates();

		item.locate = isLocated;
	},

	/**
	 * @returns {Array} Array of selected cells.
	 */
	getSelectedCells : function(){
		var me = this;
		var cells = me.cellInfomation.data.items;
		var retCells = new Array();

		Ext.Array.each(cells,function(cell){
			if(cell.select){
				retCells.push(cell);
			}
		});

		return retCells;
	},

	/**
	 * From input array of located cell list, it updates current cells with locate status to be true.
	 * @param {WarehouseDrawItem[] | String[]} locatedCellList Array of located cells
	 * @param {String} [fieldNm = 'locId'] field key value where locId is stored.
	 */
	setLocatedCells : function(locatedCellList, fieldNm){
		var me = this;

		if(Ext.isEmpty(fieldNm)){ fieldNm = 'locId'; }
		var whId = me.getLocatedWhId(locatedCellList, fieldNm);

		var timer = setInterval (function() {
			if(me.whId === whId && me.warehouseComponent && me.getIsBuildingCompleted()){
				var cells = me.cellInfomation;

				Ext.Array.each(locatedCellList,function(locCell){
					cells.each(function(cell){
						if(typeof locCell === "string"  && locCell === cell.get('locId')){
							cell.locate = true;
						} else if (typeof locCell === "object" && locCell.get(fieldNm) === cell.get('locId')){
							cell.locate = true;
						}
					});
				});
				me.warehouseComponent.redraw();
				clearInterval(timer);
			}
		}, 100);
	},

	/**
	 * @private
	 */
	getLocatedWhId: function(locatedCellList, fieldNm){
		var locId = "";

		Ext.Array.each(locatedCellList, function(locCell){
			if(typeof locCell === "string"){
				locId = locCell;
			} else if (typeof locCell === "object"){
				locId = locCell.get(fieldNm);
			}
			return;
		});

		return locId.substring(0, locId.lastIndexOf('-'));
	},

	/**
	 * @returns {Array} Array of allocated cells.
	 */
	getLocatedCells : function(){
		var me = this;
		var cells = me.cellInfomation.data.items;
		var retCells = new Array();

		Ext.Array.each(cells,function(cell){
			if(cell.locate){
				retCells.push(cell);
			}
		});

		return retCells;
	},

	setAllocationMode: function(isAllocation){
		var me = this;
		me.allocationMode = isAllocation;
	},

	/**
	 * @returns {Array} Array of selected cell's related cells
	 */
	getRelatedCells : function(){
		var me = this;
		var relatedCells = new Array();
		me.cellInfomation.each(function(cell){
			if(cell.related){
				relatedCells.push(cell);
			}
		});
		return relatedCells;
	},

	/**
	 * @param {String|Model} cell - Cell's locId or cell model itself
	 * @returns {Array} Array of cell's cargo model list
	 */
	getCellCargos : function(cell){

		if(cell === '' || cell === undefined){
			return null;
		}

		var me = this;
		var cargoList = new Array();
		var locId = (cell instanceof Object)? cell.get('locId') : cell;

		me.cargoInformation.each(function(cargo){
			if(cargo.get('locId') === locId){
				cargoList.push(cargo);
			}
		});
		return cargoList;
	},

	/**
	 * @param {String|Model} cell - Cell's locId or cell model itself
	 * @returns {Array} Array of cell's rental model list
	 */
	getCellRental : function(cell){

		if(cell === '' || cell === undefined){
			return null;
		}

		var me = this;
		var rentalList = new Array();
		var locId = (cell instanceof Object)? cell.get('locId') : cell;

		me.rentalInformation.each(function(rental){
			if(rental.get('locId') === locId){
				rentalList.push(rental);
			}
		});
		return rentalList;
	},

	/**
	 * @param {String|Model} cell - Cell's locId or cell model itself
	 * @returns {Array} Array of cell's space movement model list
	 */
	getCellSpaceMovement : function(cell){

		if(cell === '' || cell === undefined){
			return null;
		}

		var me = this;
		var spaceMovementList = new Array();
		var locId = (cell instanceof Object)? cell.get('locId') : cell;

		me.spaceMovementInformation.each(function(spcMv){
			if(spcMv.get('locId') === locId){
				spaceMovementList.push(spcMv);
			}
		});
		return spaceMovementList;
	},

	/**
	 * @param {String} mode - Use this.CM_CARGO | this.CM_VESSEL | this.CM_CATEGORY
	 */
	changeColorMode : function(mode){
		var me = this;
		me.colorMode = me.warehouseComponent.colorMode = mode;
		me.warehouseComponent.redraw();
	},

	/**
	 * @param {string} mode - Use **this.RM_PLANNED** | **this.RM_OCCUPIED**
	 */
	changeRenderMode : function(mode){
		var me = this;
		me.renderMode = me.warehouseComponent.renderMode = mode;
		me.warehouseComponent.redraw();
	},

	/**
	 * This changes selecting mode. Provided modes are **"Normal"** or **"Rent"**<br/>
	 * **Note** : this removes all selected items.
	 * @param {string} mode - Use **this.SM_NORMAL** | **this.SM_RENT**
	 * @param {boolean} isMultiSelect - **true** if multiselect
	 */
	changeSelectMode : function(mode, isMultiSelect){
		var me = this;
		me.selectMode = me.warehouseComponent.selectMode = mode;
		me.allowMultiSelect = isMultiSelect ? true : false;
		me.removeAllSelects();
		me.warehouseComponent.redraw();
	},

	removeAllSelects : function(){
		var me = this;
		var cells = me.cellInfomation.data.items;
		Ext.Array.each(cells, function(cell){
			if(cell.select)
				cell.select = false;
		});
	},

	/**
	 * This function removes all locate condition and renders as its original colorset
	 * of its own.
	 */
	removeAllLocates : function(){
		var me = this;
		var cells = me.cellInfomation.data.items;
		Ext.Array.each(cells, function(cell){
			if(cell.locate)
				cell.locate = false;
		});
		me.warehouseComponent.redraw();
	},

	/**
	 * @param {...number} rate
	 */
	onZoomWarehouse : function(rate){
		var me = this;
		var store = me.metaStore;
		var currBaseUnit, currBaseHUnit, orgBaseUnit;
		
		var arrayBaseUnit = store.getAt(store.findExact('key',me.BASE_UNIT)).data.value.split(',');
		var arrayBaseUnitOrign = store.getAt(store.findExact('key',me.BASE_UNIT_ORIGIN)).data.value.split(',');
		
		if(rate === 100) {
			store.getAt(store.findExact('key', me.BASE_UNIT)).set('value', [arrayBaseUnitOrign[0].toString(), arrayBaseUnitOrign[1].toString()]);
		} else {
			currBaseUnit = parseFloat(arrayBaseUnit[0]);
			currBaseHUnit = parseFloat(arrayBaseUnit[1]);
			orgBaseUnit = parseFloat(arrayBaseUnitOrign[0]);
			orgBaseHUnit = parseFloat(arrayBaseUnitOrign[1]);
			
			currBaseUnit = Math.round((currBaseUnit + (orgBaseUnit * (rate / 100)))*100) / 100;
			currBaseHUnit = Math.round((currBaseHUnit + (orgBaseHUnit * (rate / 100)))*100) / 100;

			if(!me.hasReachedMinZoomRate(currBaseUnit, currBaseHUnit) && !me.hasReachedMaxZoomRate(currBaseUnit, currBaseHUnit))
				store.getAt(store.findExact('key', me.BASE_UNIT)).set('value', [currBaseUnit.toString(), currBaseHUnit.toString()]);
		}
		me.warehouseComponent.redraw();
	},

	/**
	 * @private
	 */
	hasReachedMinZoomRate : function(currWidth, currHeight){
		var me = this;
		var hasReached = false;
		if(currWidth*100 < me.minZoomRate || currHeight*100 < me.minZoomRate)
			hasReached = true;

		return hasReached;
	},

	/**
	 * @private
	 */
	hasReachedMaxZoomRate : function(currWidth, currHeight){
		var me = this;
		var hasReached = false;
		if(currWidth*100 > me.maxZoomRate || currHeight*100 > me.maxZoomRate)
			hasReached = true;

		return hasReached;
	},

	/**
	 * @param isFit : {boolean}
	 */
	onFitToScreenWarehouse : function(isFit){
		var me = this;
		var store = me.metaStore;

		if(!me.warehouseComponent || !me.getIsCompleted()){
			return;
		}

		if(isFit){
			var fitSize = null;
			var view = me.warehouseComponent;
			if(view){
				fitSize = view.getBaseYardUnit([me.viewReference.getWidth(), me.viewReference.getHeight()]);
			}
			if(fitSize){
				store.getAt(store.findExact('key', me.BASE_UNIT)).set('value', fitSize);
			}
		} else {
			store.getAt(store.findExact('key', me.BASE_UNIT)).set('value', store.getAt(store.findExact('key',me.BASE_UNIT_ORIGIN)).data.value);
		}
		me.warehouseComponent.redraw();
	},

	/**
	 * @private
	 */
	setReference : function(viewReference) {
		this.viewReference = viewReference;
	},

	/**
	 * @private
	 */
	setTargetWarehouseData : function(targetWarehouseData) {
		this.whId = targetWarehouseData.get('locId');
		this.targetWarehouseData = targetWarehouseData;
	},
	/**
	 * @private
	 */
	setSearchCondition : function(searchCondition) {
		this.searchCondition = searchCondition;
	},
	/**
	 * @private
	 */
	setViewModel : function(){
		this.viewModel = MOST.app.getModel('MOST.view.common.warehouserenderer.WarehouseRendererCommonModel').create();
	},

	// General Methods
	getClickedCell : function(component, event){

		if(!component.getSurface){
			return;
		}

		var surface = component.getSurface();
		var xy = surface.getEventXY(event);
		var	x = xy[0];
		var	y = xy[1];
		var items = component.getSelectedCellIndexes(x, y);
		if(items.length > 0){
			return items[0];
		} else {
			return null;
		}
	},

	setRelatedCells : function(selectedItem){
		var me = this;
		me.removeAllRelates(me.warehouseComponent);
		if(selectedItem.select || !me.selectable){
			me.setRelatedCellsCondition(me.warehouseComponent, selectedItem);
		}
	},

	setRelatedCellsCondition : function(component, selectedItem){
		var me = this;
		var vesselCallIds = me.getSelectedCellCargoVesselCallId(selectedItem, component.storeCargo);
		var cellGroup = me.getRelatedCellNamesFromCargoViaVesselCallId(component.storeCargo, vesselCallIds);

		if(cellGroup.length > 1){
			component.storeCell.each(function(cell){
				Ext.Array.each(cellGroup, function(cellId){
					if(cellId === cell.get('locId')){
						cell.related = true;
					}
				});
			});
		}
	},

	removeAllRelates : function(component){
		component.storeCell.each(function(cell){
			if(cell.related){
				cell.related = false;
			}
		})
	},

	getSelectedCellCargoVesselCallId : function(selectedItem, cargo){
		var vesselCallIds = new Array();
		cargo.each(function(cargo){
			if(selectedItem.get('locId') === cargo.get('locId')){
				vesselCallIds.push(cargo.get('vslCallId'));
			}
		});
		return vesselCallIds;
	},

	getRelatedCellNamesFromCargoViaVesselCallId : function(cargo, vesselCallIds){
		var cellGroup = new Array();
		if(vesselCallIds != null){
			cargo.each(function(cargo){
				if(vesselCallIds.includes(cargo.get('vslCallId'))){
					cellGroup.push(cargo.get('locId'));
				}
			});
		}
		return cellGroup;
	},

	getColorMode: function(){
		return this.colorMode;
	},

	getSelectMode: function(){
		return this.selectMode;
	},

	getIsCompleted:function(){
		var me = this;

		if(me.warehouseComponent){
			return me.warehouseComponent.isCompleted;
		}else{
			return false;
		}
	},

	getIsBuildingCompleted: function(){
		return this.isBuildingCompleted;
	}


})