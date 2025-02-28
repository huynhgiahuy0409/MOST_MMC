function TsbRect(rectConfig){
	this.id = rectConfig.id;
	this.x = rectConfig.x;
	this.y = rectConfig.y;
	this.lineWidth = rectConfig.lineWidth;
	this.width = rectConfig.width;
	this.height = rectConfig.height;
	this.color = rectConfig.backgroundColor;
	this.ctx = rectConfig.ctx;
};

TsbRect.prototype={
	// Field
	flag : true,
	
	// Function
	draw : function(isDot){
	    this.ctx.save();
	    this.ctx.lineWidth = this.lineWidth;
	    
	    if(isDot != null){
	    	this.flag = isDot;
	    }
	    
		if(this.flag == true){
			this.ctx.setLineDash([5, 10]);
		} else {
			this.ctx.setLineDash([]);
		}
		
		this.ctx.fillStyle = this.color;

		this.region = new Path2D();
		
		this.region.moveTo(this.x, this.y);
		this.region.lineTo(this.x + this.width, this.y);
		this.region.lineTo(this.x + this.width, this.y + this.height);
		this.region.lineTo(this.x, this.y + this.height);
		this.region.closePath();
		
		this.ctx.fill(this.region);
		this.ctx.stroke(this.region);
		
		this.ctx.restore();
	},
	
	//Added by MS.Kim (2022.10.24) 0133809: Lift Off Button
	pointer : function(isDot){
		var centerX = this.x + this.width/2;
      	var centerY = this.y + this.height/2;
      	var radius = 50;
      	this.ctx.beginPath();
      	this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	    this.ctx.fillStyle = 'green';
    	this.ctx.fill();
		this.ctx.restore();
	},

	drawWithClear : function(){
		this.ctx.clearRect(this.x-this.lineWidth, this.y-this.lineWidth, this.width+this.lineWidth*2, this.height+this.lineWidth*2);
		
		this.draw();
	},
	
	clear : function(){
		this.ctx.save();
		this.ctx.lineWidth = this.lineWidth;
		
		this.ctx.clearRect(this.x-this.lineWidth, this.y-this.lineWidth, this.width+this.lineWidth*2, this.height+this.lineWidth*2);
		this.ctx.restore();
	},
	
	setLineDash : function(isDot){
		if(isDot == true){
			this.ctx.setLineDash([5, 10]);
		} else {
			this.ctx.setLineDash([]);
		}
	},
	
	isPointInside : function(x,y){
		return this.ctx.isPointInPath(this.region, x, y);
	}
};