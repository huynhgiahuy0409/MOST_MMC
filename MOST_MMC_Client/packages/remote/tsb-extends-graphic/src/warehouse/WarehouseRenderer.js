Ext.define('TSB.gux.warehouse.WarehouseRenderer', {
    /**
     * @memberOf TSB.gux.berth.BerthRenderer
     */
	extend: 'TSB.gux.AbstractRenderer',
	requires: [
		'Ext.draw.sprite.Composite'
	],
	
    config: {
        innerRect: [0, 0, 1, 1],
        resizing: 0,
        isCompleted: false
    },
    
    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
    },

    alias: 'widget.app-warehouserenderer',
    
    scrollX: 0,
    scrollY: 0,

    performLayout: function () {
		if (this.resizing === 1) return;
		this.resizing = 1;

        this.callParent();
        var me = this,
            drawRect = me.getSurface('main').getRect(),
            width = drawRect[2],
            height = drawRect[3],
            insetPadding = me.getInsetPadding(),
            shrinkBox = Ext.apply({}, insetPadding),
            mainRect;

        if (width <= 0 || height <= 0) {
            return;
        }

        width -= shrinkBox.left + shrinkBox.right;
        height -= shrinkBox.top + shrinkBox.bottom;

        mainRect = [0,0,10,10];

        me.setMainRect(mainRect);
        me.getSurface().setRect(mainRect);
        
        me.redraw();
        this.resizing = 0; 
    },

    initializeMetaValue: function() {
    	var me = this;
    	
		//Define meta object
		me.meta = new Object();
		
		Ext.Array.each(me.storeMeta.data.items, function(metaItem){
			me.meta[metaItem.get('key')] = metaItem.get('value');
		});
		
		me.meta.baseHUnit = parseFloat(me.meta.baseUnit.split(',')[1]);
		me.meta.baseUnit = parseFloat(me.meta.baseUnit.split(',')[0]);
		me.meta.baseCellWidth = parseFloat(me.meta.baseCellWidth);
		me.meta.baseCellHeight = parseFloat(me.meta.baseCellHeight);

		me.meta.padLeft = parseFloat(me.meta.padLeft);
		me.meta.padRight = parseFloat(me.meta.padRight);
		me.meta.padTop = parseFloat(me.meta.padTop);
		me.meta.padBottom = parseFloat(me.meta.padBottom);
		me.meta.marginWidth = parseFloat(me.meta.marginWidth);
		me.meta.marginHeight = parseFloat(me.meta.marginHeight);
		me.meta.fontSize = me.meta.baseUnit * parseFloat(me.meta.fontSize);

		me.meta.cellWidth = me.meta.baseCellWidth * (me.warehouseInfo.data.wth / me.warehouseInfo.data.bayQty);
		me.meta.cellHeight = me.meta.baseCellHeight * (me.warehouseInfo.data.len / me.warehouseInfo.data.rowwQty);
		
		me.meta.warehouseWidth = me.meta.baseUnit * (me.meta.padLeft + me.meta.padRight + (me.meta.cellWidth * me.warehouseInfo.data.bayQty) + (me.meta.marginWidth * (me.warehouseInfo.data.bayQty)));
		me.meta.warehouseHeight = me.meta.baseHUnit * (me.meta.padTop + me.meta.padBottom + (me.meta.cellHeight * me.warehouseInfo.data.rowwQty) + (me.meta.marginHeight * (me.warehouseInfo.data.rowwQty)));

		me.meta.viewWidth = me.meta.warehouseWidth;
		me.meta.viewHeight = me.meta.warehouseHeight;

		if(me.meta.baseUnit === 1 && me.meta.baseHUnit === 1){
			me.meta.viewWidthOrigin = me.meta.warehouseWidth;
			me.meta.viewHeightOrigin = me.meta.warehouseHeight;
		} else {
			me.getOriginalDimensions();
		}
	},
	
	getOriginalDimensions : function(){
		var me = this;
		me.meta.baseHUnitOrigin = parseFloat(me.meta.baseUnitOrigin.split(',')[1]);
		me.meta.baseUnitOrigin = parseFloat(me.meta.baseUnitOrigin.split(',')[0]);
		var width = me.meta.baseUnitOrigin * (me.meta.padLeft + me.meta.padRight + (me.meta.cellWidth * me.warehouseInfo.data.bayQty) + (me.meta.marginWidth * (me.warehouseInfo.data.bayQty)));
		var height = me.meta.baseUnitOrigin * (me.meta.padTop + me.meta.padBottom + (me.meta.cellHeight * me.warehouseInfo.data.rowwQty) + (me.meta.marginHeight * (me.warehouseInfo.data.rowwQty)));
		me.meta.viewWidthOrigin = width;
		me.meta.viewHeightOrigin = height;
	},
    
    initializeDrawComponent: function() {
       	var me = this;
		me.resizing = 1;
		me.setSize(me.meta.viewWidth, me.meta.viewHeight);
		me.setMainRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);

		me.getSurface('background').setRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);
		me.getSurface('main').setRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);
		
		me.getSurface('plan').setRect([0, 0, me.meta.viewWidth, me.meta.viewHeight]);
		
		me.resizing = 0;

		//Create Planning Sprite
		var planSurface = me.getSurface('plan');
//		me.bodySprite = planSurface.add({
//			type: 'rect',
//	        strokeStyle: me.meta.unUsedBackColor,
//	        fillStyle: me.meta.unUsedBackColor,
//	        fillOpacity: 0.5,	//1: Solid
//	    	hidden: true,
//	    	customId: 'id-warehousecell-body'
//	    });
    },
    
    redraw: function () {
        var me = this,
            rect = me.getMainRect();
        
        if(!rect) {
            return;
        }
        
	    me.meta = me.storeMeta;
	    me.cell = me.storeCell;
	    me.bay = me.storeBay;
	    me.row = me.storeRow;
		me.unused = me.storeUnused;
		me.cargo = me.storeCargo;
		me.rental = me.storeRental;
		me.spaceMovement = me.storeSpaceMovement;
		me.warehouseInfo = me.selectedItem;
	    
        me.initializeMetaValue();
    	me.removeAll(true);
    	me.initializeDrawComponent();
    
		var warehouseSurface = me.getSurface('main');
		
		me.cell.each(function(record, idx){
			if(record.data.locId){
				config =  {
						meta: me.meta,       
						cell: me.cell,       
						bay: me.bay,       
						row: me.row,       
						unused: me.unused,
						cargo: me.cargo,
						rental: me.rental,
						spaceMovement: me.spaceMovement,  
						cellData: record,       
						warehouseInfo: me.selectedItem,
						renderMode: me.renderMode,
						colorMode : me.colorMode,
						selectMode: me.selectMode
				};
				warehouseSurface.add(Ext.create('widget.app-warehousestructuredraw', config));
			}
		});

		warehouseSurface.renderFrame();
		me.isCompleted = true;
    },
    
	getBaseYardUnit: function(size) {
		var me = this;
		var scrollbarOffset = 15;
		
		var baseWidthUnit = (size[0] - scrollbarOffset) / (me.meta.viewWidthOrigin);
		var baseHeightUnit = (size[1] - scrollbarOffset) / (me.meta.viewHeightOrigin);
		return [baseWidthUnit, baseHeightUnit];
	},
    
	getSelectedCellIndexes: function(x, y) {
		var me = this;
		var indexes = new Array();
		
		var width = me.meta.baseUnit * me.meta.cellWidth;
		var height = me.meta.baseHUnit * me.meta.cellHeight;
		var positionX=0, positionY=0;
		me.storeCell.each(function(record,idx){
			positionX = me.meta.baseUnit * (me.meta.padLeft + ((parseFloat(record.data.bayIdx) - 1) * me.meta.cellWidth));
			positionX+= me.meta.baseUnit * (me.meta.marginWidth * (parseFloat(record.data.bayIdx) -1)); 
			
			positionY = me.meta.baseHUnit * (me.meta.padTop + ((parseFloat(record.data.rowwIdx) - 1) * me.meta.cellHeight));
			positionY+= me.meta.baseHUnit * (me.meta.marginHeight * (parseFloat(record.data.rowwIdx) - 1));
			
			if(	x >= positionX && x <= (positionX + width) && 
				y >= positionY && y <= (positionY + height)) {
				indexes.push(record);
			}
		});
		
		return indexes;
	},
	

	getCellPos: function(rec) {
		var me = this;
		var x, y, w, h;
		
		var w = me.meta.baseUnit * me.meta.cellWidth;
		var h = me.meta.baseHUnit * me.meta.cellHeight;
		x = me.meta.baseUnit * (me.meta.padLeft + ((parseFloat(rec.bayIdx) - 1) * me.meta.cellWidth));
		x+= me.meta.baseUnit * (me.meta.marginWidth * (parseFloat(rec.bayIdx) -1)); 
		
		y = me.meta.baseHUnit * (me.meta.padTop + ((parseFloat(rec.rowwIdx) - 1) * me.meta.cellHeight));
		y+= me.meta.baseHUnit * (me.meta.marginHeight * (parseFloat(rec.rowwIdx) - 1));
		
		return [x, y, w, h];
	},	
	
	selectWarehouseCell: function(rec) {
		var me = this;
		var pos = me.getCellPos(rec.data);
		
		me.renderWarehousePlanSprites(pos, rec)
	},
	
	renderWarehousePlanSprites: function(planInfo, rec, opts, div) {
		var me = this;
		var planSurface = me.getSurface('plan');
		var leftPos = me.meta.berthDirection === 'RTL' ? planInfo[1] : planInfo[0];
		var rightPos = me.meta.berthDirection === 'RTL' ? planInfo[0] : planInfo[1];
		var startPos = me.meta.berthDirection === 'RTL' ? rightPos : leftPos;

		console.log('left = ' + leftPos + ',right=' + rightPos+ ',startPos=' + startPos + ', Loc Id = ' + rec.data.locId);
		var bExists = false;

		me.unused.each(function(record, idx){
			if(record.data.locId === rec.data.locId){
				record.set('locUseYn','Y');
				me.unused.remove(record);
				bExists = true;
			}
		});
		
		if(!bExists){
			rec.set('locUseYn','N');
			me.unused.insert(0, rec);
		}
	},

	onScroll: function (x, y) {
		var me = this;
		me.scrollX = x;
		me.scrollY = y;
	}

});