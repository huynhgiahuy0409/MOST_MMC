Ext.define('TSB.gux.terminal.TerminalRenderer', {
    /**
     * @memberOf TSB.gux.terminal.TerminalRenderer
     */
    extend: 'TSB.gux.AbstractRenderer',
	requires: [
		'Ext.draw.sprite.Composite',
        'Ext.scroll.Scroller'
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

    alias : 'widget.app-terminalrenderer',

    colorMode : false,

    scrollX: 0,
    scrollY: 0,

    debugging : true,

    performLayout : function(){
        if (this.resizing === 1) 
            return;

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

    redraw : function(record, change){
        var me = this;
        var rect = me.getMainRect();

        if(!rect) 
            return;

        if(me.debugging)
            console.log('DrawInitialized');

        me.initializeTerminalDraw();
        me.drawTerminalObjects();

        me.isCompleted = true;

        if(me.debugging)
            console.log('DrawFinished');
    },

    initializeTerminalDraw : function(){
        var me = this;
        
        me.removeAll(true);
        me.initializeMetaValues();
        me.initializeDrawObjects();
    },

    initializeMetaValues : function(){
        var me = this;
        
        me.meta = new Object();
		me.loadMetaValues();
        me.parseIntMetaValues();
        me.generateMetaValues();
    },

    loadMetaValues : function(){
        var me = this;
        
        Ext.Array.each(me.storeMeta.data.items, function(metaItem){
            me.meta[metaItem.get('key')] = metaItem.get('value');
        });
    },

    parseIntMetaValues : function(){
        var me = this;
        // base units
        me.meta.baseUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseUnit')).data.value);
        me.meta.baseBerthUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseBerthUnit')).data.value);
        me.meta.baseDistanceUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseDistanceUnit')).data.value);
        me.meta.baseUnitOrigin = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseUnitOrigin')).data.value);
        me.meta.berthLengthMeasurementScale = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthLengthMeasurementScale')).data.value);
        me.meta.distanceUnitScale = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','distanceUnitScale')).data.value);
        me.meta.pixelPerMeter = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','pixelPerMeter')).data.value);
     
        //body Color
        me.meta.planForecolor = me.storeMeta.getAt(me.storeMeta.findExact('key','planForecolor')).data.value;
		me.meta.planBackcolor = me.storeMeta.getAt(me.storeMeta.findExact('key','planBackcolor')).data.value;
		
        // tooltip
        me.meta.lineColor = me.storeMeta.getAt(me.storeMeta.findExact('key','lineColor')).data.value;
		me.meta.tooltipHeaderBackColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipHeaderBackColor')).data.value;
		me.meta.tooltipBodyBackColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipBodyBackColor')).data.value;
		me.meta.tooltipHeaderForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipHeaderForeColor')).data.value;
		me.meta.tooltipBodyForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipBodyForeColor')).data.value;
		me.meta.tooltipOccufiedForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipOccufiedForeColor')).data.value;
		me.meta.tooltipLocNmForeColor = me.storeMeta.getAt(me.storeMeta.findExact('key','tooltipLocNmForeColor')).data.value;
        
        // dom units
        me.meta.fontSize = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','fontSize')).data.value);
        me.meta.padTop = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padTop')).data.value);
        me.meta.padLeft = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padLeft')).data.value);
        me.meta.padRight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padRight')).data.value);
        me.meta.padBottom = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','padBottom')).data.value);
        me.meta.marginWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginWidth')).data.value);
        me.meta.marginHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','marginHeight')).data.value);
        // draw elements units
        
        // berth
        me.meta.terminalLocNmHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','terminalLocNmHeight')).data.value);
        me.meta.wharfLocNmHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','wharfLocNmHeight')).data.value);
        me.meta.berthLengthUnitNumberHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthLengthUnitNumberHeight')).data.value);
        me.meta.berthLengthUnitMarkerHeight = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthLengthUnitMarkerHeight')).data.value);
        me.meta.berthMarkerWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','berthMarkerWidth')).data.value);
        
        // distance
        me.meta.distanceNumberWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','distanceNumberWidth')).data.value);
        me.meta.distanceScaleWidth = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','distanceScaleWidth')).data.value);
        me.meta.baseFixedUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseFixedUnit')).data.value);	//Pixel per meter
		me.meta.timelineArea = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','timelineArea')).data.value);
		me.meta.timelineWidth = me.meta.timelineArea * me.meta.baseFixedUnit;
		
		//Font Type
		me.meta.fontType = me.storeMeta.getAt(me.storeMeta.findExact('key','fontType')).data.value;
    },

    generateMetaValues : function(){
        var me = this;
        
        me.calculateBerthMeasurements();
        me.calculateDistanceMeasurements();
        me.meta.windowWidth = me.meta.berthWidth;
        me.meta.windowHeight = me.meta.distanceHeight;
        me.meta.viewWidth = me.meta.distanceWidth + me.meta.berthWidth;
        me.meta.viewHeight = me.meta.berthHeight + me.meta.distanceHeight;
    },

    calculateBerthMeasurements : function(){
        var me = this;
        
        me.meta.berthHeight = me.meta.baseUnitOrigin * (me.meta.terminalLocNmHeight + me.meta.wharfLocNmHeight + me.meta.berthLengthUnitNumberHeight + me.meta.berthLengthUnitMarkerHeight);
        me.meta.berthActualWidth = 0;
        me.storeBerth.each(function(record,idx){
            if(record.data.berthTp === 'WRF') {
                me.meta.berthActualWidth += parseFloat(record.data.length);
            }
        });
        me.meta.berthWidth = me.meta.baseBerthUnit * (me.meta.berthActualWidth * me.meta.pixelPerMeter);
    },

    calculateDistanceMeasurements : function(){
        var me = this;
        
        me.meta.distanceWidth = me.meta.baseUnitOrigin * (me.meta.distanceNumberWidth + me.meta.distanceScaleWidth);
        me.meta.distanceActualHeight = 0;
        me.storeWarehouse.each(function(record, idx){
            var lowestPoint = record.data.topY + record.data.wth;
            
            if(me.meta.distanceActualHeight < lowestPoint)
                me.meta.distanceActualHeight = lowestPoint + 50;
        });
        
        if(me.meta.distanceActualHeight < 900){
            me.meta.distanceActualHeight = 900;
        }
        
        me.meta.distanceHeight = me.meta.baseDistanceUnit * (me.meta.distanceActualHeight * me.meta.pixelPerMeter);
    },

    initializeDrawObjects : function(){
        var me = this;
        
        me.setSize(me.meta.viewWidth,me.meta.viewHeight);
        me.setMainRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);
		me.getSurface('background').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);
		me.getSurface('main').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);  // window
		me.getSurface('mask').setRect([me.scrollX,0,me.meta.distanceWidth,me.meta.viewHeight]); // distance
		me.getSurface('blink').setRect([0,me.scrollY,me.meta.viewWidth,me.meta.berthHeight]);   // berth
        me.getSurface('legend').setRect([me.scrollX,me.scrollY,me.meta.distanceWidth, me.meta.berthHeight]); // corner
        me.getSurface('plan').setRect([0,0,me.meta.viewWidth,me.meta.viewHeight]);  // sprites
        me.resizing = 0;
        
        var planSurface = me.getSurface('plan');
        
        me.bodySprite = planSurface.add({
			type: 'rect',
	        strokeStyle: me.meta.planForecolor,
	        fillStyle: me.meta.planBackcolor,
	        fillOpacity: 0.5,	//1: Solid
	    	hidden: true,
	    	customId: 'id-warehouse-body'
	    });
        
        me.addPlanTooltipSprites(planSurface);
    },

    drawTerminalObjects : function(){
        var me = this;

        me.drawTerminalWindow();
        me.drawTerminalBerths();
        me.drawTerminalDistance();
        me.drawTerminalCorner();
        me.renderAllTerminalFrames();
    },

    drawTerminalBerths : function(){
        var me = this;
        var config = {
            meta: me.meta,
            berths: me.storeBerth,
            x : me.meta.distanceWidth,
            y : 0
        };
        
        me.getSurface('blink').add(Ext.create('widget.app-terminalstructuredraw', config));
    },

    drawTerminalDistance : function(){
        var me = this;
        var config = {
            meta: me.meta,
            warehouses: me.storeWarehouse,
            x : 0,
            y : me.meta.berthHeight
        };
        
        me.getSurface('mask').add(Ext.create('widget.app-terminaldistancedraw', config));
    },

    drawTerminalWindow : function(){
        var me = this;
        var config = {
            meta : me.meta,
            berths : me.storeBerth,
            warehouses : me.storeWarehouse,
            x : me.meta.distanceWidth,
            y : me.meta.berthHeight,
            colorMode : me.colorMode
        };
        
        me.getSurface('main').add(Ext.create('widget.app-terminalwindowdraw', config));
    },

    drawTerminalCorner : function(){
        var me = this;
        var config = {
            meta : me.meta,
            x : 0,
            y : 0
        };
        
        me.getSurface('legend').add(Ext.create('widget.app-terminalcornerdraw', config));
    },

    renderAllTerminalFrames : function(){
        var me = this;
        
        me.getSurface('blink').renderFrame();
        me.getSurface('mask').renderFrame();
        me.getSurface('main').renderFrame();
        me.getSurface('legend').renderFrame();
    },

    getSelectedWarehouse: function(x, y) {
        var me = this;
        var indexes = new Array();

        me.storeWarehouse.each(function(record,idx){
            var positionX = me.meta.distanceWidth + (me.meta.baseBerthUnit * (me.meta.pixelPerMeter * record.get('leftX')));
            var positionY = me.meta.berthHeight + (me.meta.baseDistanceUnit * (me.meta.pixelPerMeter * record.get('topY')));
            var width = me.meta.baseBerthUnit * (me.meta.pixelPerMeter * record.get('len'));
            var height = me.meta.baseDistanceUnit * (me.meta.pixelPerMeter * record.get('wth'));

            if(	x >= positionX && x <= (positionX + width) && y >= positionY && y <= (positionY + height)) {
                indexes.push(record);
            }
        });

        return indexes;
    },

    getWindowsWidth: function(width) {
        var me = this;
        var scrollbarOffset = 15;
        
        me.initializeMetaValues();
        
        var baseUnit = (width - me.meta.distanceWidth - scrollbarOffset) / me.meta.berthWidth * me.meta.baseBerthUnit;
        
        return baseUnit;
    },

    getWindowsHeight : function(height) {
        var me = this;
        var scrollbarOffset = 15;

        me.meta.baseDistanceUnit = parseFloat(me.storeMeta.getAt(me.storeMeta.findExact('key','baseDistanceUnit')).data.value);
        
        var baseUnit = (height - me.meta.berthHeight - scrollbarOffset) / me.meta.distanceHeight * me.meta.baseDistanceUnit;
        
        return baseUnit;
    },

    onScroll: function (x, y) {
        var me = this;
        var berthSurface = me.getSurface('blink');
        var distanceSurface = me.getSurface('mask');
        var cornerSurface = me.getSurface('legend');

        berthSurface.setRect([0,y,me.meta.viewWidth,me.meta.berthHeight]);
        berthSurface.renderFrame();

        distanceSurface.setRect([x,0,me.meta.distanceWidth,me.meta.viewHeight]);
        distanceSurface.renderFrame();

        cornerSurface.setRect([x,y,me.meta.distanceWidth,me.meta.berthHeight]);
        cornerSurface.renderFrame();

        me.scrollX = x;
		me.scrollY = y;
	},

	addPlanTooltipSprites : function(planSurface){
		var me = this;

		me.bodyTooltipSprite = planSurface.add({
			type: 'rect',
			strokeStyle: me.meta.lineColor,
			lineWidth : 0.5,
	        fillStyle: me.meta.tooltipBodyBackColor,
	        fillOpacity: 1,	//1: Solid
	    	hidden: true,
	    	customId: 'id-warehouse-bodyTooltip',
		});
		
		me.bodyTooltipHeaderSprite = planSurface.add({
			type: 'rect',
			strokeStyle: me.meta.lineColor,
			lineWidth : 0.5,
	        fillStyle: me.meta.tooltipHeaderBackColor,
	        fillOpacity: 1,	//1: Solid
	    	hidden: true,
	    	customId: 'id-warehouse-bodyTooltip',
		});
		
		me.bodyTooltipLocNmSprite = planSurface.add({
			type: 'text',
	        font: me.meta.fontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.tooltipHeaderForeColor,
			textAlign: 'center',
			textBaseline: 'top',
	    	hidden: true,
	    	customId: 'id-warehouse-bodyTooltip',
		});
		
		me.bodyTooltipLocIdSprite = planSurface.add({
			type: 'text',
	        font: me.meta.fontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.tooltipLocNmForeColor,
			textAlign: 'left',
			textBaseline: 'top',
	    	hidden: true,
	    	customId: 'id-warehouse-bodyTooltip',
		});
		
		me.bodyTooltipOccupiedSprite = planSurface.add({
			type: 'text',
	        font: me.meta.fontSize + 'px ' + me.meta.fontType,
			fillStyle: me.meta.tooltipOccufiedForeColor,
			textAlign: 'left',
			textBaseline: 'top',
	    	hidden: true,
	    	customId: 'id-warehouse-bodyTooltip',
	    });
	},

	selectWarehouseOccupied: function(rec) {
		var me = this;
		var planSurface = me.getSurface('plan');
		var pos = me.getWarehousePos(rec);
		
		me.renderWarehouseOccupiedSprites(pos, rec);
		me.lastEventPos = pos;
		
		planSurface.renderFrame();
	},

	renderWarehouseOccupiedSprites : function(pos, rec, opts, div){
		var me = this;
		var windowWidth = me.getSize().width;
		var windowHeight = me.getSize().height;
		var tooltipWidth = 150;
		var tooltipHeight = 100;
		var planWidth = pos[0]+pos[2];
		var planHeight = pos[1];
		var tooltipTextOffsetTop = (tooltipHeight/5 - me.meta.fontSize)/2
		var tooltipTextOffsetLeft = 5;
		var tooltipMarginLeft = 8;
		var scrollbarWidth = 15;
		var tooltipCurrPos = {
			x :	windowWidth-planWidth-scrollbarWidth-me.meta.timelineWidth,
			y : windowHeight - planHeight - me.meta.berthHeight
		}
		var tooltipXPos;
		var tooltipYPos;

		tooltipXPos = pos[0] + me.meta.timelineWidth + pos[2] + tooltipMarginLeft;
		
		if(tooltipHeight > tooltipCurrPos.y){
			tooltipYPos = windowHeight - 100;
		} else {
			tooltipYPos = pos[1] + me.meta.berthHeight;
		}

		me.bodySprite.setAttributes({
			x: pos[0] + me.meta.timelineWidth,
			y: pos[1] + me.meta.berthHeight,
			width: pos[2],
			height: pos[3],
			hidden: false
		}); 
		
		me.bodyTooltipSprite.setAttributes({
			x: tooltipXPos,
			y: tooltipYPos,
			width: tooltipWidth,
			height: tooltipHeight,
			hidden: false
		});

		me.bodyTooltipHeaderSprite.setAttributes({
			x: tooltipXPos,
			y: tooltipYPos,
			width: tooltipWidth,
			height: tooltipHeight/5,
			hidden: false
		});

		me.bodyTooltipLocNmSprite.setAttributes({
			x: tooltipXPos + tooltipWidth/2,
			y: tooltipYPos + tooltipTextOffsetTop,
			hidden: false,
			text : rec.at(0).data.locNm
		});

		me.bodyTooltipLocIdSprite.setAttributes({
			x: tooltipXPos + tooltipTextOffsetLeft,
			y: me.bodyTooltipLocNmSprite.attr.y + tooltipHeight/5,
			hidden: false,
			text : 'Location : ' + rec.at(0).data.locId
		});

		if(rec.at(0).data.planChk == 'Y'){
			me.bodyTooltipOccupiedSprite.setAttributes({
				x: tooltipXPos + tooltipTextOffsetLeft,
				y: me.bodyTooltipLocIdSprite.attr.y + tooltipHeight/5,
				hidden: false,
				text: 'Total : ' + (Number(rec.at(0).data.occPercentage) + Number(rec.at(0).data.planPercentage)) +'%'
			});
		} else {
			me.bodyTooltipOccupiedSprite.setAttributes({
				x: tooltipXPos + tooltipTextOffsetLeft,
				y: me.bodyTooltipLocIdSprite.attr.y + tooltipHeight/5,
				hidden: false,
				text: 'Occupied : ' + rec.at(0).data.occPercentage+'%'
			});			
		}
	},
	
	getWarehousePos: function(rec) {
		var me = this;
		var x, y, w, h;

		me.storeWarehouse.each(function(record,idx){
			if(record.data.locId == rec.at(0).data.locId) {
				x = rec.at(0).data.leftX * me.meta.baseBerthUnit;
				y = rec.at(0).data.topY * me.meta.baseDistanceUnit;
				h = rec.at(0).data.len * me.meta.baseBerthUnit;
				w = rec.at(0).data.wth * me.meta.baseDistanceUnit;
			}
		});

		return [x, y, h, w];
	},
	
	hideTooltipSprites: function() {
		var me = this;
		var surface = me.getSurface('plan');
		
		for(var i = 0; i < surface.getItems().length; i++){
			surface.getItems()[i].setAttributes({
				hidden: true
			});
		}
		
		surface.renderFrame();
	}
});