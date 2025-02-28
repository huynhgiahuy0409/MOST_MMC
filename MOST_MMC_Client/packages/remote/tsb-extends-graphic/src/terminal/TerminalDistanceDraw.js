Ext.define('TSB.gux.terminal.TerminalDistanceDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-terminaldistancedraw',
    
    mixins : [
	          'TSB.gux.terminal.TerminalRenderer'          
	],
    
	meta: {},
	warehouses: {},
	x: 0,
	y: 0,
	
    render: function(surface, ctx) {
		var me = this;

		if(me.debugging)
			console.log('drawingDistance')

		ctx = me.drawBackground(ctx);
		ctx = me.drawHundredMetersMarker(ctx);
		ctx = me.drawBaseUnitMarker(ctx);
	},
	
	drawBackground : function(ctx){
    	var me = this;

		ctx.fillStyle = me.meta.distanceBackgroundColor;
		ctx.fillRect(me.x, me.y, me.meta.distanceWidth, me.meta.distanceHeight);

		ctx.lineWidth = 2;
		ctx.fillStyle = me.meta.lineColor;
		ctx.strokeStyle = me.meta.lineColor;
		ctx.strokeRect(me.x, me.y, me.meta.distanceWidth, me.meta.distanceHeight);

		return ctx;
	},

	drawHundredMetersMarker : function(ctx){
    	var me = this;
		var width = me.meta.baseUnitOrigin * me.meta.distanceScaleWidth;
		var height = me.meta.baseDistanceUnit * (me.meta.pixelPerMeter * 100);
    	ctx = me.setHundredMarkerContextVariables(ctx);

		ctx.beginPath();
		var i = me.y;
		var cnt = 1;
    	while(i < me.meta.viewHeight+height){
    		if(i+height < me.meta.viewHeight){
    			ctx.moveTo(me.meta.distanceWidth, i+height);
    			ctx.lineTo(me.meta.distanceWidth-width, i+height);
				ctx.fillText(cnt*100, me.meta.distanceNumberWidth/2, i+height, me.meta.distanceNumberWidth);
			}
    		i+=height;
    		cnt++;
		}
		ctx.stroke();

		return ctx;
	},

	setHundredMarkerContextVariables : function(ctx){
    	var me = this;
		ctx.lineWidth = 1;
		ctx.fillStyle = me.meta.lineColor;
		ctx.strokeStyle = me.meta.lineColor;
		ctx.font = me.meta.fontSize * me.meta.baseUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		return ctx;
	},

	drawBaseUnitMarker : function(ctx){
		var me = this;
		var width = me.meta.baseUnitOrigin * (me.meta.distanceScaleWidth / 2);
		var height = me.meta.baseDistanceUnit * (me.meta.pixelPerMeter * me.meta.distanceUnitScale);
		ctx.lineWidth = 1;
		ctx.fillStyle = me.meta.lineColor;
		ctx.strokeStyle = me.meta.lineColor;

		ctx.beginPath();
		var i = me.y;
		var cnt = 1;
		while(i < me.meta.viewHeight+height){
			if(cnt%5 > 0){
				ctx.moveTo(me.meta.distanceWidth, i+height);
				ctx.lineTo(me.meta.distanceWidth-width, i+height);
			}
			i+=height;
			cnt++;
		}
		ctx.stroke();

		return ctx;
    }
});