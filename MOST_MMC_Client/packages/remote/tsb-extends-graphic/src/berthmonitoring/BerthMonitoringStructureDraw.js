//see below to understand canvas
//http://www.w3schools.com/tags/ref_canvas.asp
Ext.define('TSB.gux.berthmonitoring.BerthMonitoringStructureDraw', {
    extend: 'Ext.draw.sprite.Line',
    
    alias: 'widget.app-berthmonitoringstructuredraw',
    
	mixins : [
	          'TSB.gux.berthmonitoring.BerthMonitoringRenderer'          
	],
    
	meta: {},
	berths: {},
	bitts: {},
	plans: {},
	x: 0,
	y: 0,
	terminalLength: 0,
	len: 0,
	
    render: function(surface, ctx) {
    	var me = this;
    		
		//Draw Berths
		var terminalX = 0;
		var berthX = me.meta.stBerthX- 10;
		var berthPos = 0;
		var dirOffset = me.meta.berthDirection === 'RTL' ? -1 : 1;
		var  preRecord;
		var berthLengthOffset = 0;
		var contLength = 0;
		var terminalLength

		let prev = [me.meta.stBerthX,me.meta.stBerthY];
		me.berths.each(function(record,idx){
			if(record.data.drawable === 1) {
				
				var xPos = 0;
				var ypos = 0;
				if(record.data.xPos != ''){
					xPos = parseFloat(record.data.xPos);
				}
				if(record.data.yPos != ''){
					yPos = parseFloat(record.data.yPos);
				}
				
				var rotate = parseFloat(record.data.rotate);
				var berthLength = parseFloat(record.data.cfgLength);
				var length = parseFloat(record.data.length);
				

				if(idx == 0 && xPos > 0 && yPos > 0){
					prev = [xPos,yPos];
				}else{
					if(xPos > 0 && yPos > 0){
						prev = [xPos,yPos];
					}
				}				

				const angle = Math.PI * rotate / 180;
			    const next = [prev[0] + berthLength * Math.sin(angle), prev[1] - berthLength * Math.cos(angle)];

				ctx.beginPath();
			    ctx.moveTo(...prev);
			    ctx.strokeStyle = record.data.color;
				ctx.lineWidth = me.meta.berthHeight;
				//line to next
				ctx.lineTo(...next);
				ctx.stroke();

				//Berth Name
				ctx.font = 'bold ' + me.meta.berthHeight/3  + 'px ' + me.meta.fontType; //me.meta.berthNameFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
				ctx.textAlign = 'center';
				ctx.textBaseline = 'top';
				ctx.fillStyle = 'red';	
				ctx.fillText(record.data.berthCd, (prev[0] + next[0])/2, (prev[1] + next[1] ) / 2 - me.meta.berthHeight/3);

			    if(record.data.berthSide == 'T' || record.data.berthSide == 'B'){
					record.data.xPos = record.data.vslPst;
					record.data.yPos = prev[1];
				}else if(record.data.berthSide == 'R' || record.data.berthSide == 'L'){
					record.data.xPos = prev[0];
					record.data.yPos = record.data.vslPst;
				}
			    
			    //Draw Bitts
				var isBittExisted = false;
				me.bitts.each(function(bittRecord,idx){
					if(record.data.berthCd === bittRecord.data.berthCd) {
						isBittExisted = true;
						
						var x = prev[0]  ;
						var y = prev[1] + 15 ;

						var xPos;
						if(bittRecord.data.xPos > me.len && me.len > 0){
							xPos = bittRecord.data.xPos - me.len;
						}else{
							xPos = bittRecord.data.xPos;
						}

						const nextBitt = [x + xPos * Math.sin(angle), y - xPos * Math.cos(angle)];
						
						ctx.beginPath();
						ctx.arc(nextBitt[0], nextBitt[1], 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);
						ctx.fillStyle = me.meta.bittColor;
						ctx.fill();
						
						//Bitt Name
						ctx.font = me.meta.bittFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'bottom';
						ctx.fillStyle = me.meta.bittNameColor;	
						ctx.fillText(bittRecord.data.bittCd, nextBitt[0], nextBitt[1] - 4);
						
						//Bitt Meter
						ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillStyle = me.meta.meterNameColor;	
						ctx.fillText(parseInt(bittRecord.data.xPos), nextBitt[0], nextBitt[1] - 15);
						
					}
				});
				
				//Draw Meter if Bitt is not existed
				if(!isBittExisted) {
					for(var i=0; i<parseInt(record.data.length / me.meta.berthMeterGuideOffset); i++) {
						var x = prev[0];
						var posX = berthPos + (i + 1) * me.meta.berthMeterGuideOffset;
						var y = prev[1] + 15;

						const nextBitt = [x  + (i + 1) * me.meta.berthMeterGuideOffset * Math.sin(angle), y - (i + 1) * me.meta.berthMeterGuideOffset * Math.cos(angle)];
						
						//Meter Circle
						ctx.beginPath();
						ctx.arc(nextBitt[0], nextBitt[1] , 2 * me.meta.baseBerthUnit, 0, 2*Math.PI);
						ctx.fillStyle = me.meta.bittColor;
						ctx.fill();
						
						//Meter Name
						ctx.font = me.meta.meterFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillStyle = me.meta.meterNameColor;	
						ctx.fillText(parseInt(posX), nextBitt[0], nextBitt[1] -10);
					}
					
				}

				//Draw the line for the vessel when config Berth
				if(record.data.cfgBerth == 'Y'){
					if(record.data.xPos != ''){
						xPos = parseFloat(record.data.xPos);
					}
					if(record.data.yPos != ''){
						yPos = parseFloat(record.data.yPos);
					}
					
					let prev1 = [50,10];
					if(record.data.berthSide == 'L'){
						prev1 = [xPos - 40,yPos];
					}else if(record.data.berthSide == 'T'){
						prev1 = [xPos,yPos - 40];
					}else if(record.data.berthSide == 'R'){
						prev1 = [xPos + 40,yPos];
					}else if(record.data.berthSide == 'B'){
						prev1 = [xPos,yPos + 40];
					}
			
					const next1 = [prev1[0] + berthLength * Math.sin(angle), prev1[1] - berthLength * Math.cos(angle)];
						
					ctx.beginPath();
					ctx.moveTo(...prev1);
					ctx.strokeStyle = record.data.color;
					ctx.lineWidth = 1;
					ctx.lineTo(...next1);
					ctx.stroke();
				}
			    
				prev = next;
				
				berthX += length * dirOffset;
				berthPos += parseFloat(record.data.length);
				preRecord = record;

				me.len = me.len + parseFloat(record.data.cfgLength);
				
			}
		});

		//parameter value is No
		me.processPlans(ctx);
    },

	processPlans: function(ctx){
		var me = this; 
		
		me.plans.each(function(record,idx){
			me.terminalLength = 0;
			me.berths.each(function(rec,i){				
				
				if(rec.data.berthCd == record.data.berthCd && rec.data.drawable === 1){
					var pos = me.getBerthPlanPos(record.data);
					//Draw Vessel
					me.drawVessel(ctx, pos, record.data, rec.data);
				}
				me.terminalLength = me.terminalLength + parseFloat(rec.data.length);
			});
			
		});
	},
    
    drawVessel: function(ctx, pos, rec, berth) {
		var me = this; 

		var roundColor = '';
		var borderColor = '';

		if(rec.opeStat == 'I'){
			roundColor = me.meta.imOpeColor;
		}else if(rec.opeStat == 'E'){
			roundColor = me.meta.exOpeColor;
		}else if(rec.opeStat == 'B'){
			roundColor = me.meta.bothOpeColor;
		}else{
			roundColor = me.meta.nonOpeColor;
		}
		
		if(rec.vslStat == 'NWK'){
			borderColor = me.meta.nonWrkStat;
		}else{
			borderColor = me.meta.onWrkStat;
		}

		var xPos = 0;
		var ypos = 0;
		if(berth.xPos != ''){
			xPos = parseFloat(berth.xPos);
		}
		if(berth.yPos != ''){
			yPos = parseFloat(berth.yPos);
		}
		
		var rotate = parseFloat(berth.rotate);
		
		var berthLength = parseFloat(berth.length);	
		var cfgLength = parseFloat(berth.cfgLength);
		var pos = cfgLength / berthLength;

		var pstVsl = parseFloat(rec.startPos);
		var pendVsl = parseFloat(rec.endPos);

		if(me.terminalLength > 0){
			pstVsl = pstVsl - me.terminalLength;
			pendVsl = pendVsl - me.terminalLength;
		}
		var vslLength = (pendVsl - pstVsl) * pos;
		const angle = Math.PI * rotate / 180;

		if(berth.cfgBerth == 'N'){ //draw berthing vessel
			if(berth.berthSide == 'L'){
				xPos = xPos - 40;
				yPos = pstVsl * pos + yPos;
			}else if(berth.berthSide == 'T'){
				if(rotate < 90 || rotate >= 270){
					yPos = yPos - 60;	
				}else{
					yPos = yPos - 55;
				}					
				xPos = pstVsl * pos + xPos;
				
			}else if(berth.berthSide == 'R'){
				if(rotate < 90 || rotate >= 270){
					yPos = yPos - pstVsl * pos ;
					xPos = xPos + 40;
				}else{
					yPos = yPos + pstVsl * pos ;
					xPos = xPos + 50;
				}					
			}else if(berth.berthSide == 'B'){
				
				if(rotate < 180){
					yPos = yPos + 40 - ( pstVsl * pos) * Math.cos(angle) ;
					xPos = pstVsl * pos + xPos;
				}else{
					xPos = xPos - pstVsl * pos ;
					yPos = yPos + 50 - ( pstVsl * pos) * Math.cos(angle) ;
				}					
			}
			
			const prev = [xPos,yPos];
			
			const next = [prev[0] + vslLength * Math.sin(angle), prev[1] - vslLength * Math.cos(angle)];

			ctx.save();	
			ctx.translate(prev[0], prev[1]);
			ctx.rotate( Math.PI * (rotate + 90) / 180);
			ctx.beginPath(); 
			//Viền
			ctx.lineWidth = 5;
		    ctx.fillStyle = roundColor;
			ctx.strokeStyle = borderColor;
			var radius , radius1, quaWidth, quaWidth1;
			vslLength = vslLength - vslLength / 10;
			
			if(rec.berthAlongside == 'S'){
				//Right to left(starboard)
				quaWidth = vslLength / 10;
				quaWidth1 = 0;
				radius = 13;
				radius1 = 5;
				me.roundRect(ctx, -vslLength - 15, -20, vslLength, 25, quaWidth, quaWidth1, radius, radius1, true)
			}else if(rec.berthAlongside == 'P'){
				//Left to right(Portside)
				quaWidth1 = -vslLength / 10;
				quaWidth = 0;
				radius = 5;
				radius1 = 13;
				me.roundRect(ctx, -vslLength, -20, vslLength, 25, quaWidth, quaWidth1, radius, radius1, true)
			}else if(rec.berthAlongside == 'T'){
				//Top
				quaWidth = vslLength / 10;
				quaWidth1 = 0;
				radius = 5;
				radius1 = 13;
				me.roundRectBT(ctx, -35, -vslLength, 20, vslLength, quaWidth, quaWidth1, radius, radius1, true)
			}else if(rec.berthAlongside == 'B'){
				//Bottom
				quaWidth = vslLength / 10;
				quaWidth1 = 0;
				radius = 5;
				radius1 = 13;
				me.roundRectBT(ctx, -35, -vslLength, 20, vslLength, quaWidth, quaWidth1, radius, radius1, true)
				//roundRect: function(ctx, x, y, width, height, quaWidth, quaWidth1, radius, radius1, fill, stroke) {
			}			
						
			ctx.stroke();
			ctx.restore();	

			ctx.save();	
			var rectX, rectY;
			ctx.translate(prev[0], prev[1]);
			if(rotate < 180){
				ctx.rotate( Math.PI * (rotate + 270 ) / 180);
				rectX = 0;
				rectY = -5;
			}else{
				ctx.rotate( Math.PI * (rotate + 90 ) / 180);
				rectX = -vslLength;
				rectY = -20;
			}

			ctx.beginPath(); 
			ctx.font='bold ' + me.meta.vesselFontSize * me.meta.baseBerthUnit + 'px ' + me.meta.fontType
			ctx.textAlign="center"; 
			ctx.textBaseline = "middle";
			ctx.fillStyle = "#000000";
			var rectHeight = 25;
			var rectWidth = vslLength;

			if(rec.berthAlongside == 'S'){
				ctx.fillText(rec.jpvcNo,rectX+(rectWidth/2) + 15,rectY+(rectHeight/2));
			}else if(rec.berthAlongside == 'P'){
				ctx.fillText(rec.jpvcNo,rectX+(rectWidth/2),rectY+(rectHeight/2));
			}else if(rec.berthAlongside == 'T'){
				//Top
			}else if(rec.berthAlongside == 'B'){
				//Bottom
				ctx.rotate(-Math.PI/2);
				ctx.fillText(rec.jpvcNo,rectX+(rectWidth/2) - rectWidth,rectY+(rectHeight/2) + 20);
			}
			
			ctx.restore();	

			if(Math.round(prev[0]) == Math.round(next[0])){
				if(rotate == 180){
					rec.startPos = next[0] - 25;
					rec.endPos = prev[0];
				}else{
					rec.startPos = prev[0];
					rec.endPos = next[0] + 25;
				}
			}else{
				rec.startPos = prev[0];
				rec.endPos = next[0]
			}			
					
			// if(Math.floor(prev[0]) == Math.floor(next[0])){
			// 	if(rec.berthAlongside == 'S'){
			// 		rec.startPos = next[0] - 20;
			// 		rec.endPos = prev[0];
			// 	}else{
			// 		rec.startPos = prev[0];
			// 		rec.endPos = next[0] + 20;
			// 	}
			// }else{
			// 	rec.startPos = prev[0];
			// 	rec.endPos = next[0]
			// }

			if(Math.round(prev[1]) == Math.round(next[1])){
				if(rotate == 90){
					rec.startH = prev[1];
					rec.endH = next[1] + 25;
				}
			}else{
				if(prev[1] < next[1]){
					rec.startH = prev[1];
					rec.endH = next[1];
				}else{
					rec.startH = next[1];
					rec.endH = prev[1];
				}				
			}	
			
			
			rec.berthSide = berth.berthSide;
			rec.rotate = rotate;
		}		
		
	},

	roundRect: function(ctx, x, y, width, height, quaWidth, quaWidth1, radius, radius1, fill, stroke) {
		if (typeof stroke == "undefined" ) {
			stroke = true;
		}
		if (typeof radius === "undefined") {
			radius = 5;
		}
		
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width + quaWidth, y, x + width + quaWidth, y + radius);
		ctx.lineTo(x + width + quaWidth, y + height - radius);
		ctx.quadraticCurveTo(x + width + quaWidth, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius1 , y + height);
		ctx.quadraticCurveTo(x  + quaWidth1, y + height, x + quaWidth1, y + height - radius1);
		ctx.lineTo(x  + quaWidth1, y + radius1);
		ctx.quadraticCurveTo(x  + quaWidth1, y, x + radius1, y);
		ctx.closePath();
		if (stroke) {
			ctx.stroke();
		}
		if (fill) {
			ctx.fill();
		}        
	},
	
	roundRectBT: function(ctx, x, y, width, height, quaWidth, quaWidth1, radius, radius1, fill, stroke) {
		if (typeof stroke == "undefined" ) {
			stroke = true;
		}
		if (typeof radius === "undefined") {
			radius = 5;
		}
		
		ctx.beginPath();
		ctx.moveTo(x + width +1, radius);
		ctx.lineTo(x + width, y );
		ctx.quadraticCurveTo(x - width + radius1 + radius1, y - 31, x - width + radius1 , y - 1);
		ctx.lineTo(x - width + radius1, y + height + radius);
		ctx.quadraticCurveTo(x + width + quaWidth1, y, x + width + quaWidth1, y + radius1);
		
		ctx.closePath();
		if (stroke) {
			ctx.stroke();
		}
		if (fill) {
			ctx.fill();
		}        
	}
});