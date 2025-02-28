Ext.define('TSB.gux.warehouse.WarehouseStructureDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-warehousestructuredraw',
    
	mixins : [
          'TSB.gux.warehouse.WarehouseRenderer'          
	],
	
	meta: {},
	cell: {},
	bay: {},
	row: {},
	unused: {},
	cargo : {},
	rental : {},
	spaceMovement : {},
	cellData:{},
	warehouseInfo: {},
	showRelatedCargo: new Boolean(),

	// Constants
	BLOCK_BACK_COLOR : 'BlockBackColor',
	CARGO_PREFIX : 'crg',
	VESSEL_PREFIX : 'vsl',
	CATEGORY_PREFIX : 'cat',

    render: function(surface, ctx) {
		var me = this;
		var pos = me.getPosition(pos);
		ctx = me.initializeContext(ctx);
		
		if(me.isModeOccupied()){
			ctx = me.renderOnModeOccupied(ctx, pos);
		} else {
			ctx = me.renderOnModePlan(ctx, pos);
		}

		if(me.isUnused()){
			me.renderBackBlock(ctx, me.meta.unUsedBlockBackColor, pos);
			ctx.fillStyle = me.meta.unUsedBlockForeColor;
		}

		if(me.showRelatedCargo && me.isRelated() && !me.isModePlan()){
			me.renderForeBlock(ctx, me.meta.hasRelatedInfoForeColor);
		}
		
        if (me.isLocated()){
            me.renderBackBlock(ctx, me.meta.rentedBlockBackColor, pos);
            me.renderForeBlock(ctx, me.meta.rentedBlockForeColor);
        }

        if(me.isSelected()){
            if(me.isRenderSelectBackground()) {
            	if(me.selectMode === me.SM_NORMAL && me.isRenderSelectBackground()) {
                    me.renderBackBlock(ctx, me.meta.selectedBlockBackColor, pos);
                    me.renderBackBlock(ctx, this.getSelectModeColor(true), pos);
            	} else {
                    me.renderBackBlock(ctx, this.getSelectModeColor(true), pos);
            	}
            }
            me.renderForeBlock(ctx, me.meta.selectedBlockForeColor);
            me.renderForeBlock(ctx, this.getSelectModeColor(false));
        }
		
		ctx.strokeRect(pos.x, pos.y, pos.width, pos.height);
		ctx.fillText(me.cellData.data.locNm, pos.x + (me.meta.padLeft * me.meta.baseUnit) , pos.y + (me.meta.padTop *  me.meta.marginHeight * me.meta.baseUnit));
	},

	getPosition : function(pos){
		var me = this;
		if(pos == undefined){
			pos = {x:0, y:0, width:0, height:0};
		}
		pos.x = me.getXPos();
		pos.y = me.getYPos();
		pos.width = me.getWidth();
		pos.height = me.getHeight();

		return pos;
	},

	initializeContext : function(ctx){
		var me = this;
		ctx.lineWidth = 1;
		ctx.strokeStyle = me.meta.lineColor;
		ctx.font = me.meta.fontSize + 'px ' + me.meta.fontType;
		ctx.fillStyle = me.meta.fontColor;
		return ctx;
	},

	isModeOccupied : function(){
		return this.renderMode == 'occupied';
	},

	isModePlan : function() {
		return this.renderMode == 'plan';
	},

	renderOnModeOccupied : function(ctx, pos){
		var me = this;
		if(me.hasCargo()){
			if(me.colorMode === 'vessel'){
				ctx.fillStyle = me.getVesselColor();
			} else if (me.colorMode === 'cargo') {
				ctx.fillStyle = me.getCargoColor();
			} else if (me.colorMode === 'category'){
				ctx.fillStyle = me.getCategoryColor();
			}
			ctx.fillRect(pos.x, pos.y, pos.width, pos.height);
			ctx.lineWidth = 2;
			ctx.strokeStyle = me.meta.hasCargoInfoForeColor;
			ctx.fillStyle = me.meta.hasCargoInfoForeColor;
		}
		if(me.hasRental()){
			ctx.lineWidth = 2;
			ctx.strokeStyle = me.meta.hasRentalForeColor;
			ctx.fillStyle = me.meta.hasRentalForeColor;
		}
		return ctx;
	},

	renderOnModePlan : function(ctx, pos) {
		var me = this;
		if(me.countSpaceMovement() === 1){
			ctx = me.drawSingleSpaceMovementCell(ctx, pos);
		} else if (me.countSpaceMovement() > 1){
			ctx = me.drawManySpaceMovementCell(ctx, pos);
		}

		return ctx;
	},

	drawSingleSpaceMovementCell : function(ctx, pos){
		var me = this;
		ctx = me.renderBackBlock(ctx, me.meta.singlePlanBlockBackColor, pos);
		ctx = me.renderForeBlock(ctx, me.meta.singlePlanBlockForeColor);
		return ctx;
	},

	drawManySpaceMovementCell : function(ctx, pos){
		var me = this;
		ctx = me.renderBackBlock(ctx, me.meta.manyPlanBlockBackColor, pos);
		ctx = me.renderForeBlock(ctx, me.meta.manyPlanBlockForeColor);
		return ctx;
	},
	
	isUnused : function(){
		var me = this;
		var unused = false;
		me.unused.each(function(record, idx){
			if(record.data.locId === me.cellData.data.locId){
				unused = true;
			}
		});
		return unused;
	},

	isSelected : function(){
		var me = this;
		var isselected = false;
		if(me.cellData.select)
			isselected = me.cellData.select;

		return isselected;
	},
	
    isLocated : function(){
        var me = this;
        var islocated = false;
        if(me.cellData.locate)
                islocated = me.cellData.locate;
        return islocated;
    },

	isRelated : function(){
		var me = this;
		var isrelated = false;
		if(me.cellData.related){
			isrelated = true;
		}
		return isrelated;
	},
	
    getSelectModeColor : function(isBackColor){
        var me = this;
        if(me.selectMode === me.SM_NORMAL){
        	return (isBackColor) ? me.meta.selectedBlockBackColor : me.meta.selectedBlockForeColor;
        } else if (me.selectMode === me.SM_RENT){
        	return (isBackColor) ? me.meta.rentedBlockBackColor : me.meta.rentedBlockForeColor;
        }
    },

	hasCargo : function(){
		var me = this;
		var hascargo = false;
		if(me.cargo){
			me.cargo.each(function(record, idx){
				if(record.data.locId === me.cellData.data.locId){
					hascargo = true;
				}
			});
		}
		return hascargo;
	},

	hasRental : function(){
		var me = this;
		var hasrental = false;
		if(me.rental){
			me.rental.each(function(record, idx){
				if(record.data.locId === me.cellData.data.locId){
					hasrental = true;
				}
			});
		}
		return hasrental;
	},

	countSpaceMovement : function(){
		var me = this;
		var count = 0;
		if(me.spaceMovement){
			me.spaceMovement.each(function(record, idx){
				if(record.data.locId === me.cellData.data.locId){
					count++;
				}
			});
		}
		return count;
	},

	getXPos : function(){
		var me = this;
		var x =  me.meta.baseUnit * (me.meta.padLeft + ((parseFloat(me.cellData.data.bayIdx) - 1) * me.meta.cellWidth));
		x+= me.meta.baseUnit * (me.meta.marginWidth * (parseFloat(me.cellData.data.bayIdx) -1));
		return x;
	},

	getYPos : function(){
		var me = this;
		var y = me.meta.baseHUnit * (me.meta.padTop + ((parseFloat(me.cellData.data.rowwIdx) - 1) * me.meta.cellHeight));
		y+= me.meta.baseHUnit * (me.meta.marginHeight * (parseFloat(me.cellData.data.rowwIdx) - 1));
		return y;
	},

	getWidth : function(){
		var me = this;
		return me.meta.baseUnit * me.meta.cellWidth;;
	},

	getHeight : function(){
		var me = this;
		return me.meta.baseHUnit * me.meta.cellHeight;;
	},

	getCargoColor : function(){
		var me = this;
		return (me.isSingleCargo()) ? 
				me.meta[me.generateStoreKey(me.CARGO_PREFIX, 'cgTpCd', me.BLOCK_BACK_COLOR)]
				: me.meta.crgMixed;
	},

	getVesselColor : function(){
		var me = this;
		return (me.isSingleCargo()) ? (me.getCargoItem().get('cgTpCd') === 'BBK') ?
				me.meta[me.VESSEL_PREFIX+'BBK'+me.BLOCK_BACK_COLOR] : me.meta[me.VESSEL_PREFIX + 'Others' + me.BLOCK_BACK_COLOR]
				: me.meta.crgMixed;
	},

	getCategoryColor : function(){
		var me = this;
		return (me.isSingleCargo()) ? 
				me.meta[me.generateStoreKey(me.CATEGORY_PREFIX, 'opeClassNm', me.BLOCK_BACK_COLOR)]
				: me.meta.crgMixed;
	},

	isSingleCargo : function(){
		var me = this;
		var count = 0;
		me.cargo.each(function(record, idx){
			if(record.get('locId') === me.cellData.get('locId')){
				if(count++ > 1)
					return;
			}
		});
		return (count === 1)? true : false;
	},

	getCargoItem : function() {
		var me = this;
		var item;
		me.cargo.each(function(record, idx){
			if(record.get('locId') === me.cellData.get('locId')){
				item = record;
			}
		});
		return item;
	},

	generateStoreKey : function(prefix, field, suffix){
		var me = this;
		return prefix + me.getCargoItem().get(field) + suffix;
	},

	renderBackBlock : function(ctx, color, pos){
		ctx.fillStyle = color;
		ctx.fillRect(pos.x, pos.y, pos.width, pos.height);
		return ctx;
	},

	renderForeBlock : function(ctx, color){
		ctx.lineWidth = 2;
		ctx.strokeStyle = color;
		ctx.fillStyle = color;
		return ctx;
	},

	isRenderSelectBackground : function(){
    	var me = this;
    	return ((!me.hasCargo() && !me.hasRental()) || (me.isModePlan() && me.countSpaceMovement()===0)) && !me.isUnused();
	}
});	