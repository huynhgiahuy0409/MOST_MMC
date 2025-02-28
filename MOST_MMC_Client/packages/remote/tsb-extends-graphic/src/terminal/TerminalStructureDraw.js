Ext.define('TSB.gux.terminal.TerminalStructureDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-terminalstructuredraw',
    
	mixins : [
	          'TSB.gux.terminal.TerminalRenderer'          
	],
    
	meta: {},
	berths: {},
	x: 0,
	y: 0,

    render: function(surface, ctx) {
        var me = this;

        if(me.debugging)
            console.log('drawingBerths')

        ctx = me.drawBackground(ctx);
        ctx = me.writeTerminalName(ctx);
        ctx = me.drawBerthElem(ctx);
        ctx = me.drawHundredUnit(ctx);
    },

    writeTerminalName : function(ctx){
        var me = this;
        var x = me.x + (me.meta.berthWidth / 2);
        var y = me.y + me.meta.terminalLocNmHeight/2;
        var text = me.berths.first().get("terminalCd");
        ctx.fillStyle = me.meta.terminalFontColor;
        ctx.font = me.meta.fontSize * me.meta.baseUnit + 'px ' + me.meta.fontType;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);

        return ctx;
    },

    drawBackground : function(ctx) {
        var me = this;
        ctx.fillStyle = me.meta.berthBackgroundColor;
        ctx.fillRect(me.x, me.y, me.meta.berthWidth, me.meta.berthHeight);

        ctx.lineWidth = 1;
        ctx.fillStyle = me.meta.lineColor;
        ctx.strokeStyle = me.meta.lineColor;
        ctx.strokeRect(me.x, me.y, me.meta.berthWidth, me.meta.berthHeight);
        return ctx;
    },

    drawBerthElem : function(ctx) {
        var me = this;
        ctx.strokeStyle = me.meta.berthLineColor;
        ctx.fillStyle = me.meta.berthLineColor;
        ctx.font = me.meta.fontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        var pos = {
            startPos : me.x,
            endPos : 0
        }

        ctx.beginPath();
        ctx.setLineDash([2]);
        me.berths.each(function(record, idx){
            if(record.data.berthTp == 'WRF') {
                pos.endPos = pos.startPos + (parseFloat(record.data.length) * me.meta.pixelPerMeter);
                ctx = me.drawBerthDistanceLine(ctx, pos);
                ctx = me.writeBerthName(ctx, record.data.berthCd, pos);
                pos.startPos = pos.endPos;
            }
        });
        ctx.stroke();
        ctx.setLineDash([]);

        return ctx;
    },

    drawBerthDistanceLine : function(ctx, pos){
        var me = this;
        ctx.moveTo(pos.endPos, me.y + me.meta.terminalLocNmHeight);
        ctx.lineTo(pos.endPos, me.y + me.meta.terminalLocNmHeight + me.meta.wharfLocNmHeight);

        return ctx;
    },

    writeBerthName : function(ctx, text, pos){
        var me = this;
        var x = (pos.startPos + pos.endPos)/2;
        var y = (me.y + me.meta.terminalLocNmHeight) + (me.meta.wharfLocNmHeight/2);
        ctx.fillText(text, x, y, x + pos.endPos);

        return ctx;
    },

    drawHundredUnit : function(ctx) {
        var me = this;
        var width = me.meta.baseBerthUnit * (me.meta.berthLengthMeasurementScale * me.meta.pixelPerMeter);
        ctx.font = me.meta.fontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        var cnt = 0;
        ctx.beginPath();
        for(i = me.x; i < me.meta.berthWidth + width; i+=width){
            ctx = me.drawHundredMarker(ctx, i);
            ctx = me.writeHundredText(ctx, i, cnt);
            cnt++;
        }
        ctx.fill();

        return ctx;
    },

    drawHundredMarker : function(ctx, x) {
        var me = this;
        var y = me.meta.baseUnitOrigin * (me.meta.berthHeight - me.meta.berthLengthUnitNumberHeight/2);
        ctx.fillStyle = me.meta.markerColor;
        ctx.arc(x, y, 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);

        return ctx;
    },

    writeHundredText : function(ctx, x, cnt){
        var me = this;
        var y = me.meta.baseUnitOrigin * (me.y
            + me.meta.terminalLocNmHeight
            + me.meta.wharfLocNmHeight
            + me.meta.berthLengthUnitMarkerHeight
        );
        ctx.fillText(cnt*me.meta.berthLengthMeasurementScale, x, y);

        return ctx;
    }
});