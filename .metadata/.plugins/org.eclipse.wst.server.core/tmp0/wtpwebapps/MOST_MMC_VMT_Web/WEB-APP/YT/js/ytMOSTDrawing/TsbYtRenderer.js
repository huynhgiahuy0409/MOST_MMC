
function TsbYtRenderer(drawingConfig){
	this.drawingConfig = drawingConfig;
	this.drawingConfig.formFactor = 500;
};

TsbYtRenderer.prototype={
	
	// Container, Yard Job, Ship Job Drawing
	draw : function(){
		let bottomHeight = 0;
		
		if(this.drawingConfig.timeLineVisible == true){
			bottomHeight = 150;
		}
		
		let height = this.drawingConfig.height;
		this.drawingConfig.height = height - bottomHeight;
		
		this.chassisPositionRenderer = new TsbChassisPositionRenderer(this.drawingConfig);
		this.chassisPositionRenderer.draw();

		// Yard Job // deleted by MinSeok.K (2021.07.30) YT Interface
		//this.drawingConfig.height = bottomHeight;
		//this.yardJobRenderer = new TsbYardJobRenderer(this.drawingConfig);
		//this.yardJobRenderer.draw();
		
		// Ship Job // deleted by MinSeok.K (2021.07.30) YT Interface
		//this.drawingConfig.height = bottomHeight;
		//this.shipJobRenderer = new TsbShipJobRenderer(this.drawingConfig);
		//this.shipJobRenderer.draw();
		
		if(this.drawingConfig.timeLineVisible == true){
			if(this.drawingConfig.timeLineType == CONSTANTS.TIME_LINE.YARD_JOB){
				//this.shipJobRenderer.remove(); 
			} else { 
				//this.yardJobRenderer.remove();
			}
		} else {
			//this.shipJobRenderer.remove();
			//this.yardJobRenderer.remove();
		}
	},
	
	setTimeLine : function(timeLineType, jobItem){
		this.drawingConfig.timeLineType = timeLineType;
		
		if(timeLineType == CONSTANTS.TIME_LINE.YARD_JOB){
			if(jobItem){
				this.drawingConfig.shipJobItem = jobItem;
			}
			
			//this.shipJobRenderer.remove();
			//this.yardJobRenderer.reDraw(jobItem);
		} else {
			if(jobItem){
				this.drawingConfig.yardJobItem = jobItem;
			}
			
			//this.yardJobRenderer.remove();
			//this.shipJobRenderer.reDraw(jobItem);
		}
	},
	
	// 하위 div를 지워 준다.
	clear : function(){
		this.clearContainer();
		
		while ( this.drawingConfig.drawArea.hasChildNodes() ) {
			this.drawingConfig.drawArea.removeChild( this.drawingConfig.drawArea.firstChild ); 
		}
	},
	
	// 컨테이너만 지운다
	clearContainer : function(){
		if(this.chassisPositionRenderer){
			this.chassisPositionRenderer.clearContainer();
		}
	},
	
	// 하단에 있는 YardJob, ShipJob을 지운다.
	clearJob : function(){
		if(this.yardJobRenderer){
			this.yardJobRenderer.clear();
		}
		
		if(this.shipJobRenderer){
			this.shipJobRenderer.clear();
		}
	},
	
	// 컨테이너를 세팅한다.
	setContainerItems : function(items){
		if(this.chassisPositionRenderer){
			this.chassisPositionRenderer.setContainerItems(items);
		}
	},

	// index에 의해서 ContainerItem을 가져 옴
	getContainerItemToIndex : function(index){
		if(this.chassisPositionRenderer){
			return this.chassisPositionRenderer.getContainerItemToIndex(index);
		} else {
			return;
		}
	},
	
	// container No 에 의해서 ContainerItem을 가져 옴
	getContainerItem : function(containerNo){
		if(this.chassisPositionRenderer){
			return this.chassisPositionRenderer.getContainerItem(containerNo);
		} else {
			return;
		}
	}
};