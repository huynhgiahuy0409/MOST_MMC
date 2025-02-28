function TsbContainer(containerConfig){
	this.id = containerConfig.id;
	this.x = containerConfig.x;
	this.y = containerConfig.y;
	this.lineWidth = containerConfig.lineWidth;
	this.polygonXRatio = containerConfig.xRatio;
	this.polygonYRatio = containerConfig.yRatio;
	this.doorWidth = 20*this.polygonXRatio;
	this.doorHeight = 30*this.polygonYRatio;
	this.containerWidth = containerConfig.width;
	this.containerHeight = containerConfig.height;
	this.divideY5 = containerConfig.height / 5;
	this.color = containerConfig.backgroundColor;
	this.containerItem = containerConfig.containerItem;
	this.textConfing = containerConfig.textConfig;
	this.containerNo = this.containerItem.containerNo; // Key 값으로 사용, containerNo로 조회시 사용
	this.selectedContainerNo = "unselected";	//Added by MS.Kim (2022.10.24) 0133809: Lift Off Button
	
	// Door Path Items
	this.setPathItems(this.x, this.y);
	this.ctx = containerConfig.ctx;
	
	// Event
	this.emptyColor = "white";
	this.containerStatusChange = containerConfig.containerStatusChange;
};

TsbContainer.prototype={
	// Field
	x : null,
	y : null,
	flag : false,
	frontPathItems : null,
	afterPathItems : null,
	isDoorClick : false,
	containerItem : null,
	
	// Function
	draw : function(){
		let backgroundColor = this.color;
		
		// F/E 관련 없이 설정된 값으로 적용
		//if(this.containerItem.fe === CONSTANTS.FE.EMPTY){
		//	backgroundColor = this.emptyColor;
		//}
		
		if(this.containerItem.loadingBeforeAfter === CONSTANTS.LOADING.BEFORE){
			this.flag = true;
		}
		
		// Rectangle Draw
		let rectConfig = {
				id : this.id + "rect",
				x : this.x,
				y : this.y,
				lineWidth : this.lineWidth,
				width : this.containerWidth,
				height : this.containerHeight,
				backgroundColor : backgroundColor,
				ctx : this.ctx
			};
		
		this.containerRect = new TsbRect(rectConfig);
	    this.containerRect.draw(this.flag);
	    
		// Door Draw
		var pathItems = this.getPathItems(this.containerItem.doorDir);
		
		let polygonConfig = {
				id : this.id + 'door',
				pathItems : pathItems,
				backgroundColor : backgroundColor,
				x : this.x,
				y : this.y,
				lineWidth : this.lineWidth,
				ctx : this.ctx
			};
		
	    this.containerDoor = new TsbPolygon(polygonConfig);
	    this.containerDoor.draw(this.flag);
	    
	    // Container Information
	    this.drawContainerInformation();
		
		//Added by MS.Kim (2022.10.24) 0133809: Lift Off Button
		if (this.selectedContainerNo == this.containerItem.containerNo) {
			this.containerRect.pointer();
		}
	},
	
	/**
	 * 컨테이너 정보 Text를 그려 줌.
	 */
	drawContainerInformation : function(){
		let ratio = this.polygonXRatio;
		
		if(this.polygonYRatio < this.polygonXRatio){
			ratio = this.polygonYRatio; 
		}

		let fontSize = 10*this.polygonXRatio;
		let fontStyle = "Arial";
		
		if(this.textConfing.fontStyle){
			fontStyle = this.textConfing.fontStyle;
		}
		
		let x = 0;
		let startX = this.x + this.doorWidth;
		let y = 0, nextX = 0, addWidth = 0, sumLength = 0;
		let currentHeightIndex = -1;
		
		for(var i=0; i<this.textConfing.containerMappingItems.length; i++){
			let textItem = this.textConfing.containerMappingItems[i];
			
			this.ctx.save();
			
			if(textItem.color){
				this.ctx.fillStyle = textItem.color;
			} else {
				this.ctx.fillStyle = "black";
			}
			
			this.ctx.font = fontSize * this.textConfing.fontSize + "px " + fontStyle;
			let text = "";
			
			if(this.containerItem[textItem.fieldNameAndText] != null){
				text = this.containerItem[textItem.fieldNameAndText];
			} else {
				text = textItem.fieldNameAndText;
			}
			
			if(currentHeightIndex != textItem.heightIndex){
				currentHeightIndex = textItem.heightIndex;
				
				// Y위치가 바뀌었을때 시작 X위치를 계산하기 위함
				let filterItems = this.textConfing.containerMappingItems.filter(item => item.heightIndex == currentHeightIndex);
				
				if(filterItems.length >= 2){
					sumLength = filterItems.reduce((a, b) => a.length + b.length);
				} else {
					sumLength = -1;
				}
				
				if(sumLength > 0){
					addWidth = this.containerWidth/2 - (sumLength + 1)*fontSize/2.8;
				}
				x = startX + addWidth + 10;
				//x = addWidth + 500;
				nextX = 0;
			} else {
				x += nextX;
			}
			
			// modified by jaeok (2021.03.10) Mantis 0113798: YT 단말기
			//y = this.y + this.divideY5*textItem.heightIndex;
			let divide = this.containerHeight / this.textConfing.heightDivideCount;
			y = this.y + (divide * textItem.heightIndex) - (this.containerHeight / 10);
			
			this.ctx.fillText(text, x, y);
			
			if(textItem.bold == true){
				this.ctx.strokeText(text, x, y);
			}
			
			nextX = (textItem.length) * fontSize /2;
			
			this.ctx.restore();
		};
	},
	
	setPathItems : function(x, y){
		var polygonX = x;
		var polygonY = y;
		
		this.frontPathItems = [
				{x:polygonX, y:polygonY},
				{x : polygonX + this.doorWidth, y : polygonY + this.doorHeight},
				{x : polygonX + this.doorWidth, y : polygonY + this.containerHeight - this.doorHeight},
				{x : polygonX, y : polygonY + this.containerHeight}
			];
		
		this.afterPathItems = [
			{x:polygonX + this.containerWidth, y:polygonY},
			{x : polygonX + this.containerWidth - this.doorWidth, y : polygonY + this.doorHeight},
			{x : polygonX + this.containerWidth - this.doorWidth, y : polygonY + this.containerHeight - this.doorHeight},
			{x : polygonX + this.containerWidth, y : polygonY + this.containerHeight}
		];
	},
	
	getPathItems : function(doorPosition){
		if(doorPosition === CONSTANTS.DOOR.FRONT){
			return this.frontPathItems;
		} else {
			return this.afterPathItems;
		}
	},

	/**
	 * 컨테이너를 다시 클릭하는 경우 호출
	 * isManual : 마우스로 클릭 했는지, 수동으로 컨테이너 정보를 바꾸고 호출 했는지 알기 위함
	 * 			  마우스로 클릭 해서 호출 된 경우 '운행'인 경우 '도착'으로 바꾸기 위함
	 * 			  '도착'인 경우 '준비'로 바꿈
	 * 			  '준비'인 경우 '도착'으로 바꿈
	 */
	drawWithClear : function(isManual){
		if(this.isDoorClick){
			this.containerRect.drawWithClear();
			
			// deleted by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B4
			//if(this.containerItem.doorDir === CONSTANTS.DOOR.FRONT){
			//	this.containerItem.doorDir = CONSTANTS.DOOR.AFTER;
			//} else {
			//	this.containerItem.doorDir = CONSTANTS.DOOR.FRONT;
			//}
			
			var pathItems = this.getPathItems(this.containerItem.doorDir);
			this.containerDoor.reDraw(pathItems);
			
		} else {
			//Added by MS.Kim (2022.10.24) 0133809: Lift Off Button Start--
			const $btnLiftOff = document.getElementById('btnLiftOff');
			const $divLiftOff = document.getElementById('divLiftOff');
			for (var i=0; i<ytRenderer.chassisPositionRenderer.rectItems.length; i++) {
				if (ytRenderer.chassisPositionRenderer.rectItems[i].containerNo != this.containerItem.containerNo
					&& ytRenderer.chassisPositionRenderer.rectItems[i].selectedContainerNo != "unselected") {
					ytRenderer.chassisPositionRenderer.rectItems[i].selectedContainerNo = "unselected";
					ytRenderer.chassisPositionRenderer.setContainerItems(ytRenderer.chassisPositionRenderer.containerItems);
				}
			}
			
			if(this.containerItem.loadingBeforeAfter === CONSTANTS.LOADING.AFTER
				&& this.selectedContainerNo != this.containerItem.containerNo) {
				this.selectedContainerNo = this.containerItem.containerNo;
				$divLiftOff.style.opacity = 1;
				$btnLiftOff.disabled = false;
			} else {
				this.selectedContainerNo = "unselected";
				$divLiftOff.style.opacity = 0.7;
				$btnLiftOff.disabled = true;
			}
			this.containerRect.drawWithClear();
			this.containerDoor.drawWithClear();
			this.draw();
			//Added by MS.Kim (2022.10.24) 0133809: Lift Off Button --End
			
			if(isManual != true){
				//this.containerItem.prevStatus = this.containerItem.status;
				
				//if(this.containerItem.status === CONSTANTS.STATUS.OPERATION){
				//	this.containerItem.status = CONSTANTS.STATUS.ARRIVAL;
				//	this.containerItem.statusDesc = CONSTANTS.STATUS_DESC.ARRIVAL;
				//} else if (this.containerItem.status === CONSTANTS.STATUS.ARRIVAL){
				//	this.containerItem.status = CONSTANTS.STATUS.READY;
				//	this.containerItem.statusDesc = CONSTANTS.STATUS_DESC.READY;
				//} else if (this.containerItem.status === CONSTANTS.STATUS.READY){
				//	this.containerItem.status = CONSTANTS.STATUS.ARRIVAL;
				//	this.containerItem.statusDesc = CONSTANTS.STATUS_DESC.ARRIVAL;
				//}
				
				if(this.containerStatusChange){
					this.containerStatusChange(this.containerItem);
				}
			}
		}
		
	    // Container Information
	    this.drawContainerInformation();
		
		this.isDoorClick = false;
	},
	
	/**
	 * 컨테이너를 지워 준다.
	 */
	clear : function(){
		this.containerRect.clear();
	},
	
	isPointInside : function(x,y) {
		this.isDoorClick = false;

		var DoorIn = false;
		if(this.containerRect.isPointInside(x, y)) {	// Steve (2021.02.02)
			var xx = x - this.containerRect.x;			// 컨테이너 내부 xx좌표
			if(this.containerItem.doorDir == CONSTANTS.DOOR.FRONT) {	// 왼쪽?
				if(this.containerItem.size == '20') {	// 20ft
					var doorWidth = this.containerRect.width / 4; // 25%
					if(xx < doorWidth) {	// Door를 클릭한것으로 봄 (25%)
						DoorIn = true;
					}
				} else {	// 40ft
					var doorWidth = this.containerRect.width / 5; // 20%
					if(xx < doorWidth) {	// Door를 클릭한것으로 봄 (20%)
						DoorIn = true;
					}
				}
			} else {
				if(this.containerItem.size == '20') {	// 20ft
					var cntrWidth = this.containerRect.width - (this.containerRect.width / 4); // 25%
					if(cntrWidth < xx) {	// Door를 클릭한것으로 봄 (25%)
						DoorIn = true;
					}
				} else {	// 40ft
					var cntrWidth = this.containerRect.width - (this.containerRect.width / 5); // 20%
					if(cntrWidth < xx) {	// Door를 클릭한것으로 봄 (20%)
						DoorIn = true;
					}
				}
			}
			if(DoorIn) {
				this.isDoorClick = true;
				this.isDoorArea = true; // <doorClick> Event 호출시에 사용
			}
			return true;
		} else {
			return false;
		}
		
		/*
		if (this.containerDoor.isPointInside(x, y)) {
			this.isDoorClick = true;
			this.isDoorArea = true; // <doorClick> Event 호출시에 사용
			return true;
		} else {
			return this.containerRect.isPointInside(x, y);
		}
		*/
	},
	
	/**
	 * *********************************************************
	 * Field Start
	 */
	setFe : function(fe){
		this.containerItem.fe = fe;
		let backgroundColor = this.color;
		
		if(fe === CONSTANTS.FE.EMPTY){
			backgroundColor = this.emptyColor;
		}
		
		this.containerRect.color = backgroundColor;
	},
	
	setLoading : function(loadingBeforeAfter){
		this.containerItem.loadingBeforeAfter = loadingBeforeAfter;
		
		if(this.containerItem.loadingBeforeAfter === CONSTANTS.LOADING.BEFORE){
			this.flag = true;
		} else {
			this.flag = false;
		}
		
		this.containerRect.flag = this.flag;
		this.containerDoor.flag = this.flag;
	}
	/**
	 * Field End
	 * *********************************************************
	 */
};