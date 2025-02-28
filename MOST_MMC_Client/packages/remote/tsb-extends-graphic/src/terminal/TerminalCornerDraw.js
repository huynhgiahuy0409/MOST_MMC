Ext.define('TSB.gux.terminal.TerminalCornerDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-terminalcornerdraw',
    
    mixins : [
		'TSB.gux.terminal.TerminalRenderer'          
	],
    
	meta: {},
	x: 0,
	y: 0,

    render: function(surface, ctx){
		var me = this;

		if(me.debugging)
			console.log('drawingCorner')

		ctx = me.initializeCanvasContext(ctx);
		ctx = me.drawCornerBackRect(ctx);
		ctx = me.writeCornerText(ctx);
	},

	initializeCanvasContext : function(ctx){
		var me = this;
		ctx.lineWidth = 1;
		ctx.strokeStyle = me.meta.lineColor;
		ctx.font = (me.meta.baseDistanceUnit * me.meta.fontSize) + 'px ' + me.meta.fontType;
		ctx.fillStyle = me.meta.fontColor;
		return ctx;
	},

	drawCornerBackRect : function(ctx){
    	var me = this;
    	me.fillCornerRect(ctx);
    	return ctx;
	},

	fillCornerRect : function(ctx){
    	var me = this;
    	ctx.fillStyle = me.meta.cornerBackgroundColor;
		ctx.fillRect(me.x, me.y, me.meta.distanceWidth, me.meta.berthHeight);
		ctx = me.initializeCanvasContext(ctx);
		ctx.strokeRect(me.x, me.y, me.meta.distanceWidth, me.meta.berthHeight);
    	return ctx;
	},

	writeCornerText : function(ctx){
		var me = this;
		ctx.fillStyle = me.meta.lineColor;
		ctx.font = me.meta.fontSize * me.meta.baseUnit + 'px ' + me.meta.fontType;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		me.writeGC(ctx);
		me.writeBerth(ctx);
		me.writeDistance(ctx);
		return ctx;
	},

	writeGC : function(ctx){
    	var me = this;
    	var text = "G/C"
		var hLoc = me.x + (me.meta.distanceWidth / 2);
    	var vLoc = me.y + (me.meta.berthHeight / 4);
		ctx.fillText(text, hLoc, vLoc);
	},

	writeBerth : function(ctx){
		var me = this;
		var text = "Berth"
		var hLoc = me.x + (me.meta.distanceWidth / 2);
		var vLoc = me.y + (me.meta.berthHeight / 4)*2;
		ctx.fillText(text, hLoc, vLoc);
	},

	writeDistance : function(ctx){
		var me = this;
		var text = "Distance"
		var hLoc = me.x + (me.meta.distanceWidth / 2);
		var vLoc = me.y + (me.meta.berthHeight / 4)*3;
		ctx.fillText(text, hLoc, vLoc);
	}

	
});