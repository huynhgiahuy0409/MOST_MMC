Ext.define('TSB.gux.terminal.TerminalWindowDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-terminalwindowdraw',
    
    mixins : [
		'TSB.gux.terminal.TerminalRenderer'          
	],
    
	meta: {},
	warehouses : {},
	x: 0,
	y: 0,

    render: function(surface, ctx) {
		var me = this;

		if(me.debugging)
			console.log('drawingWindow');
		
		ctx = me.drawVerticalGrid(ctx);
		ctx = me.drawHorizontalGrid(ctx);
		
        me.warehouses.each(function(record,idx){
			ctx = me.drawWarehouse(ctx, record.data);
			ctx = me.writeWarehouseName(ctx, record.data);
        });
	},

	drawVerticalGrid: function(ctx){
		var me = this;
		var gridWidth = me.meta.baseBerthUnit * (me.meta.distanceUnitScale * me.meta.pixelPerMeter);
		
		for(i = me.x, cnt = 0; i+gridWidth < me.meta.viewWidth; i+=gridWidth, cnt++){
			ctx.beginPath();
			ctx.moveTo(i, me.y);
			ctx.setLineDash([3]);
			
			if(cnt != 0 && cnt%15 === 0){
				ctx.strokeStyle = me.meta.gridVertical600MetersColor;
				ctx.setLineDash([]);
			} else if (cnt != 0 && cnt%5 === 0) {
				ctx.strokeStyle = me.meta.gridVertical100MetersColor;
				ctx.setLineDash([]);
			} else {
				ctx.strokeStyle = me.meta.gridMinScaleColor;
			}
			
			ctx.lineTo(i, me.meta.viewHeight);
			ctx.stroke();
		}
		
		ctx.setLineDash([]);
		
		return ctx;
	},

	drawHorizontalGrid : function(ctx){
		var me = this;
		var gridHeight = me.meta.baseDistanceUnit * (me.meta.distanceUnitScale * me.meta.pixelPerMeter);
		
		for(i = me.y, cnt = 0; i+gridHeight < me.meta.viewHeight; i+=gridHeight, cnt++){
			ctx.beginPath();
			ctx.moveTo(me.x, i);
			ctx.setLineDash([3]);
			
			if (cnt != 0 && cnt%5 === 0) {
				ctx.strokeStyle = me.meta.gridHorizontal100MetersColor;
				ctx.setLineDash([]);
			} else {
				ctx.strokeStyle = me.meta.gridMinScaleColor;
			}
			
			ctx.lineTo(me.meta.viewWidth, i);
			ctx.stroke();
		}
		
		ctx.setLineDash([]);
		
    	return ctx;
	},

	drawWarehouse: function(ctx, rec) {
    	var me = this;
		var pos = me.getWarehousePos(rec);

		if(!me.colorMode || rec.bkColr === null)
			ctx.fillStyle = me.meta.warehouseBaseBackColor;
		else
			ctx.fillStyle = "#" + rec.bkColr.toString(16);

		ctx.fillRect(pos.x, pos.y, pos.width, pos.height);
		ctx.lineWidth = 1;
		ctx.strokeStyle = me.meta.warehouseBaseForeColor;
		ctx.strokeRect(pos.x, pos.y, pos.width, pos.height);

		return ctx;
	},

	writeWarehouseName : function(ctx, rec){
		var me = this;
		var planChk = me.warehouses.planChk
		var pos = me.getWarehousePos(rec);
		var x = pos.x + (pos.width/2);
		var y = pos.y + (pos.height/2);
		var whTitle = "";
		
		ctx.font = me.meta.fontSize * me.meta.baseUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		if(!me.colorMode || rec.foreColr === null)
			ctx.fillStyle = me.meta.fontColor;
		else
			ctx.fillStyle = "#" + rec.foreColr.toString(16);

		if(planChk && planChk == 'Y'){
			whTitle = rec.whId + "(" + Number(Number(rec.occPercentage) + Number(rec.planPercentage)) + "%)";
		} else {
			whTitle = rec.whId + "(" + rec.occPercentage + "%)";
		}
		
		ctx.fillText(whTitle, x, y);

		return ctx;
	},

	getWarehousePos : function(rec){
    	var me = this;
		var x = me.x + (me.meta.baseBerthUnit * ((rec.leftX * me.meta.pixelPerMeter)));
		var y = me.y + (me.meta.baseDistanceUnit * ((rec.topY * me.meta.pixelPerMeter)));
		var width = me.meta.baseBerthUnit * (rec.len * me.meta.pixelPerMeter);
		var height = me.meta.baseDistanceUnit * (rec.wth * me.meta.pixelPerMeter);

		return {x, y, width, height};
	}
});