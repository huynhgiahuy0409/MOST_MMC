function TsbPolygon(polygonConfig){
	this.id = polygonConfig.id;
	this.x = polygonConfig.x;
	this.y = polygonConfig.y;
	this.lineWidth = polygonConfig.lineWidth;
	this.pathItems = polygonConfig.pathItems;
	this.color = polygonConfig.backgroundColor;
	this.ctx = polygonConfig.ctx;
};

TsbPolygon.prototype={
	// Field
	x : null,
	y : null,
	flag : true,
	region : null,
	
	setPathItems:function(pathItems){
		this.pathItems = pathItems;
	},
	
	// Function
	draw : function(isDot, pathItems){
	    this.ctx.save();
	    this.ctx.lineWidth = this.lineWidth;
	    
	    if(isDot != null){
	    	this.flag = isDot;
	    }
	    
	    if(pathItems){
	    	this.pathItems = pathItems;
	    }
	    
		if(this.flag == true){
			this.ctx.setLineDash([5, 10]);
		} else {
			this.ctx.setLineDash([]);
		}
		
		if(this.pathItems != null){
			let region = new Path2D();
			
			$.each(this.pathItems, function(index, item){
			    if(index == 0){
			    	region.moveTo(item.x, item.y);
			    } else {
			    	region.lineTo(item.x, item.y);
			    }
			});
			
			region.closePath();
			
			this.region = region;
			
			this.ctx.strokeStyle = this.strokeStyle;
			this.ctx.stroke(region);
		}
		
		this.ctx.restore();
	},
	
	reDraw : function(pathItems){
		this.draw(null, pathItems);
	},
	
	drawWithClear : function(){
		this.draw();
	},
	
	clear : function(){
		this.ctx.save();
		
		this.ctx.lineWidth = this.lineWidth;

		if(this.pathItems != null){
			let region = new Path2D();
			
			$.each(this.pathItems, function(index, item){
			    if(index == 0){
			    	region.moveTo(item.x, item.y);
			    } else {
			    	region.lineTo(item.x, item.y);
			    }
			});
			
			region.closePath();
			
			this.region = region;

			this.ctx.strokeStyle = "white";
			this.ctx.stroke(region);
		}
		
		this.ctx.restore();
	},
	
	isPointInside : function(x,y){
		return this.ctx.isPointInPath(this.region, x, y);
	}
};