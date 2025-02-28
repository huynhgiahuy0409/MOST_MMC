
function TsbChassisPositionRenderer(drawingConfig){
	TsbChassisPositionRenderer.prototype.divArea = drawingConfig.drawArea;
	TsbChassisPositionRenderer.prototype.image = drawingConfig.truckImage;
	TsbChassisPositionRenderer.prototype.imageMark = drawingConfig.truckMarkImage;
	TsbChassisPositionRenderer.prototype.lineWidth = drawingConfig.lineWidth;
	
	TsbChassisPositionRenderer.prototype.backgroundColor = drawingConfig.containerFullBgColor;
	
	TsbChassisPositionRenderer.prototype.backgroundColorFore = drawingConfig.containerForeBgColor;
	TsbChassisPositionRenderer.prototype.backgroundColorAfter = drawingConfig.containerAfterBgColor;
	TsbChassisPositionRenderer.prototype.backgroundColorMiddle = drawingConfig.containerMiddleBgColor;
	
	TsbChassisPositionRenderer.prototype.height = drawingConfig.height;
	TsbChassisPositionRenderer.prototype.formFactor = drawingConfig.formFactor;
	TsbChassisPositionRenderer.prototype.textConfing = drawingConfig.textConfing;
	TsbChassisPositionRenderer.prototype.containerClientWidth = drawingConfig.clientWidth;
	
	// Event
	TsbChassisPositionRenderer.prototype.containerClick = drawingConfig.containerClick;
	TsbChassisPositionRenderer.prototype.etcClick = drawingConfig.etcClick;
	TsbChassisPositionRenderer.prototype.doorClick = drawingConfig.doorClick;
	TsbChassisPositionRenderer.prototype.containerStatusChange = drawingConfig.containerStatusChange;
};

TsbChassisPositionRenderer.prototype={
	divArea : null,
	canvas : null,
	ctx : null,
	containerClientWidth : null,
	containerClientHeight : null,
	containerXRatio : null,
	containerYRatio : null,
	containerLineWidth : 2,
	containerOffsetX : null,
	containerOffsetY : null,
	image : null,
	backgroundColor : 'white',
	containerItems : null,
	rectItems : null,
	
	// Drawing
	draw : function(){
		if(TsbChassisPositionRenderer.prototype.canvas == null){
			TsbChassisPositionRenderer.prototype.canvas = document.createElement('canvas');
			
			//RBT. Temp remove click event
			//TsbChassisPositionRenderer.prototype.canvas.addEventListener('click', TsbChassisPositionRenderer.prototype.containerHandleMouseDown, false); // content click
		}
		
		TsbChassisPositionRenderer.prototype.divArea.appendChild(TsbChassisPositionRenderer.prototype.canvas);
		
		TsbChassisPositionRenderer.prototype.containerClientHeight = TsbChassisPositionRenderer.prototype.divArea.clientHeight;
		
		if(TsbChassisPositionRenderer.prototype.height){
			TsbChassisPositionRenderer.prototype.containerClientHeight = TsbChassisPositionRenderer.prototype.height; 
		}
		
		TsbChassisPositionRenderer.prototype.canvas.width = TsbChassisPositionRenderer.prototype.containerClientWidth;
		TsbChassisPositionRenderer.prototype.canvas.height = TsbChassisPositionRenderer.prototype.containerClientHeight;
		
		TsbChassisPositionRenderer.prototype.containerXRatio = TsbChassisPositionRenderer.prototype.containerClientWidth/TsbChassisPositionRenderer.prototype.formFactor;
		TsbChassisPositionRenderer.prototype.containerYRatio = TsbChassisPositionRenderer.prototype.containerClientHeight/TsbChassisPositionRenderer.prototype.formFactor;
		
		TsbChassisPositionRenderer.prototype.ctx = TsbChassisPositionRenderer.prototype.canvas.getContext('2d');
		TsbChassisPositionRenderer.prototype.ctx.fillStyle = TsbChassisPositionRenderer.prototype.backgroundColor;
		
		// Truck Image
		let imgSourceWidth = TsbChassisPositionRenderer.prototype.image.width;
		let imgSourceHeight = TsbChassisPositionRenderer.prototype.image.height;
		let imgDestinationWidth = 500*TsbChassisPositionRenderer.prototype.containerXRatio + 5;
		let imgDestinationHeight = TsbChassisPositionRenderer.prototype.containerClientHeight;
		
		TsbChassisPositionRenderer.prototype.ctx.drawImage(TsbChassisPositionRenderer.prototype.image, 0, 0, imgSourceWidth, imgSourceHeight, 0, 0, imgDestinationWidth, imgDestinationHeight);
		
		TsbChassisPositionRenderer.prototype.containerOffsetX = TsbChassisPositionRenderer.prototype.canvas.offsetLeft;
		TsbChassisPositionRenderer.prototype.containerOffsetY = TsbChassisPositionRenderer.prototype.canvas.offsetTop;
		
		// Truck Mark Image
		if (TsbChassisPositionRenderer.prototype.imageMark){
			let startMarkX = TsbChassisPositionRenderer.prototype.containerXRatio * 48;
			let startMarkY = TsbChassisPositionRenderer.prototype.containerClientHeight*0.35;
			let imgMarkSourceWidth = TsbChassisPositionRenderer.prototype.imageMark.width;
			let imgMarkSourceHeight = TsbChassisPositionRenderer.prototype.imageMark.height;
			let imgMarkDestinationWidth = 25*TsbChassisPositionRenderer.prototype.containerXRatio;
			let imgMarkDestinationHeight = 0.2*TsbChassisPositionRenderer.prototype.containerClientHeight;
		
			TsbChassisPositionRenderer.prototype.ctx.drawImage(TsbChassisPositionRenderer.prototype.imageMark, 0, 0, imgMarkSourceWidth, imgMarkSourceHeight,
						startMarkX, startMarkY, imgMarkDestinationWidth, imgMarkDestinationHeight);
		}
		
		// MessageBox 위치/크기
		var areaDiv = $("#AreaContainerField");
		var areaDivX = areaDiv.offset().left;
		var areaDivY = areaDiv.offset().top;
		
		var mBox_X = areaDivX + (TsbChassisPositionRenderer.prototype.containerXRatio * 220);
		var mBox_Y = areaDivY + (TsbChassisPositionRenderer.prototype.containerClientHeight * 0.63);
				
		var mBox_width = TsbChassisPositionRenderer.prototype.containerXRatio * 165;
		var mBox_height = TsbChassisPositionRenderer.prototype.containerClientHeight * 0.35;
		
		$("#msgBox").css("top", mBox_Y + "px");
		$("#msgBox").css("left", mBox_X + "px");
		$("#msgBox").css("width", mBox_width + "px");
		$("#msgBox").css("height", mBox_height + "px");
	},
	
	clearContainer : function(){
		if(TsbChassisPositionRenderer.prototype.rectItems != null){
			$.each(TsbChassisPositionRenderer.prototype.rectItems, function(index, containerDraw){
				containerDraw.clear();
			});
		}
		
		TsbChassisPositionRenderer.prototype.containerItems = null;
		TsbChassisPositionRenderer.prototype.rectItems = null;
	},
	
	setContainerItems : function(items){
		TsbChassisPositionRenderer.prototype.containerItems = items;
		let intervalWidth = 10;
		let addContainerHeight = 185;
		let fixContainerY = 200;
		let containerWidth = 179*TsbChassisPositionRenderer.prototype.containerXRatio;
		let containerHeight = (100 + addContainerHeight)*TsbChassisPositionRenderer.prototype.containerYRatio;
		let ctx = TsbChassisPositionRenderer.prototype.ctx;
		let containerXRatio = TsbChassisPositionRenderer.prototype.containerXRatio;
		let containerYRatio = TsbChassisPositionRenderer.prototype.containerYRatio;
		
		let x = 120*TsbChassisPositionRenderer.prototype.containerXRatio;
		let y = (fixContainerY - addContainerHeight)*containerYRatio;
		let containerX, containerY; 
		
		$.each(TsbChassisPositionRenderer.prototype.containerItems, function(index, containerItem){
			if(containerItem.size === CONSTANTS.CNTR_SIZE.SIZE_20){
				if(containerItem.chassisPosition === CONSTANTS.CHASSIS_POSITION.AFTER){
					containerX = x + (containerWidth + intervalWidth);
					containerY = (fixContainerY - addContainerHeight)*containerYRatio;
				} else {
					containerX = x;
					containerY = y;
				}
			} else { // 40 Feet
				containerX = x;
				containerY = y;
				containerWidth = 179*TsbChassisPositionRenderer.prototype.containerXRatio*2 + 10;
			}
			
			var backgroundColor = '';
			if (containerItem.cposition == 'A') {
				backgroundColor = TsbChassisPositionRenderer.prototype.backgroundColorAfter;
				
			} else if (containerItem.cposition == 'F') {
				backgroundColor = TsbChassisPositionRenderer.prototype.backgroundColorFore;
				
			} else if (containerItem.cposition == 'M') {
				backgroundColor = TsbChassisPositionRenderer.prototype.backgroundColorMiddle;
			}
			if (backgroundColor == '') {
				backgroundColor = TsbChassisPositionRenderer.prototype.backgroundColor;
			}
			
			let containerConfig = {
					id : containerItem.id,
					x : containerX,
					y : containerY,
					width : containerWidth, 
					height : containerHeight,
					xRatio : containerXRatio,
					yRatio : containerYRatio,
					containerStatusChange : TsbChassisPositionRenderer.prototype.containerStatusChange,
					lineWidth : TsbChassisPositionRenderer.prototype.lineWidth,
					backgroundColor : backgroundColor,
					containerItem : containerItem,
					textConfig : TsbChassisPositionRenderer.prototype.textConfing,
					ctx : TsbChassisPositionRenderer.prototype.ctx
				};
			
			let container = new TsbContainer(containerConfig);
			container.draw();
			
			if(TsbChassisPositionRenderer.prototype.rectItems == null){
				TsbChassisPositionRenderer.prototype.rectItems = new Array();
			}
			
			TsbChassisPositionRenderer.prototype.rectItems.push(container);
		});
	},
	
	/**
	 * Canvas 영역을 클릭하면 이벤트 발생
	 */
	containerHandleMouseDown : function(e){
	    let selectItem = TsbChassisPositionRenderer.prototype.selectRect(e.offsetX,e.offsetY);
	    
	    // 컨테이너 이외의 영역을 클릭 했을때 [MouseEvent]를 넘겨 줌
	    if(selectItem == null){
	    	TsbChassisPositionRenderer.prototype.etcClick(e);
	    }
	},

	selectRect : function(x, y){
		let selectItem = null;
		
		if(TsbChassisPositionRenderer.prototype.rectItems == null) return null;
		
		$.each(TsbChassisPositionRenderer.prototype.rectItems, function(index, item){
		    if(item.isPointInside(x,y)){
		    	item.drawWithClear();
		    	
		    	if(item.isDoorArea){
		    		if(TsbChassisPositionRenderer.prototype.doorClick){
			    		TsbChassisPositionRenderer.prototype.doorClick(item.containerItem);
			    	}
		    		
		    		item.isDoorArea = false;
		    	} else {
		    		if(TsbChassisPositionRenderer.prototype.containerClick){
			    		TsbChassisPositionRenderer.prototype.containerClick(item.containerItem);
			    	}
		    	}
		    	
		    	selectItem = item;
		    }
		});
		
		return selectItem;
	},
	
	getContainerItemToIndex : function(index){
		if(TsbChassisPositionRenderer.prototype.rectItems == null) return null;
		
		if(TsbChassisPositionRenderer.prototype.rectItems.length > index){
			return TsbChassisPositionRenderer.prototype.rectItems[index];
		} else {
			return null;
		}
	},
	
	getContainerItem : function(containerNo){
		if(TsbChassisPositionRenderer.prototype.rectItems == null) return null;
		
		if(TsbChassisPositionRenderer.prototype.rectItems.length > 0){
			let containerItems = TsbChassisPositionRenderer.prototype.rectItems.filter(rectItem => rectItem.containerNo === containerNo);
			
			if(containerItems.length > 0){
				return containerItems[0];
			} else {
				return null;
			}
			
		} else {
			return null;
		}
	}
};