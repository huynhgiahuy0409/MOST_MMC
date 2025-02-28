//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.berth.BerthLegendDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-berthlegenddraw',
    
    mixins : [
	          'TSB.gux.berth.BerthRenderer'          
	],
    
	meta: {},
	x: 0,
	y: 0,
	
    render: function(surface, ctx) {
    	var me = this;

		//Draw Entire Rect
		ctx.strokeStyle = me.meta.timelineForecolor;
		ctx.lineWidth=1;
		ctx.fillStyle = me.meta.berthBackcolor;
		ctx.fillRect( me.x,
				me.y,
				me.meta.timelineWidth,
				me.meta.berthHeight);
		ctx.strokeRect( me.x,
				me.y,
				me.meta.timelineWidth,
				me.meta.berthHeight);
		
		// Legend
		var w = me.meta.timelineWidth * 7 / 10;
		var x = me.x + me.meta.timelineWidth / 2 - w / 2;
		var h = ctx.measureText('W').width * 1.5;
		var y, txt;

		// Define legend items based on site
		var legendItems = me.site === 'JPB' ? [
			{ text: 'LENGTH', color: me.meta.tooltipHeaderForeColor },
			{ text: 'DISPLACEMENT', color: me.meta.tooltipHeaderForeColor },
			{ text: 'BERTH DEPTH', color: me.meta.tooltipHeaderForeColor },
			{ text: 'EQUIPMENTS', color: me.meta.tooltipHeaderForeColor },
			{ text: 'NOT CONFIRM', color: me.meta.vesselBackcolor },
			{ text: 'CONFIRMED', color: me.meta.vesselPlannedBackcolor },
			{ text: 'AT BERTH', color: me.meta.vesselBerthedBackcolor },
			{ text: 'DEPARTED', color: me.meta.vesselDepartedBackcolor },
		] : [
			{ text: 'NOT CONFIRM', color: me.meta.vesselBackcolor },
			{ text: 'CONFIRMED', color: me.meta.vesselPlannedBackcolor },
			{ text: 'AT BERTH', color: me.meta.vesselBerthedBackcolor },
			{ text: 'DEPARTED', color: me.meta.vesselDepartedBackcolor },
		];

		// Draw legend items
		legendItems.forEach(function(item, index) {
			y = me.y + (me.site === 'JPB' ? 20 : 10) + (h + 3) * index;
			ctx.fillStyle = item.color;
			ctx.fillRect(x, y, w, h);
			ctx.font = me.meta.berthNameFontSize * me.meta.baseFixedUnit + 'px ' + me.meta.fontType;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = me.meta.vesselGuideColor;
			ctx.fillText(item.text, x + w / 2, y + h / 2);
		});
    }
});