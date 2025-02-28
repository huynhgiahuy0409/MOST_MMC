L.ShipMarker = L.Marker.extend({
    options: {
    	vesselCode: '',	      // vslId
    	vesselName: '',		  // vslName
    	vesselStatus: '',
    	heading: 0,
    	callSign : '',
    	routeCode: '',
    	latitude: '',
    	longitude: '',
    	serviceLaneCode: '',
    	vslId: '',
    	vslName: '',
    	fleetCode: '',
    	mmsiId: '',
    	imoNo: '' 	
    }, 
	
    statics: {
        TRANSFORM_ORIGIN: L.DomUtil.testProp(
            ['transformOrigin', 'WebkitTransformOrigin', 'OTransformOrigin', 'MozTransformOrigin', 'msTransformOrigin'])
    },

    _initIcon: function() {
        L.Marker.prototype._initIcon.call(this);

        this._icon.style[L.ShipMarker.TRANSFORM_ORIGIN] = this._getTransformOrigin();
    },

    _getTransformOrigin: function() {
        var iconAnchor = this.options.icon.options.iconAnchor;

        if (!iconAnchor) {
            return '50% 50%';
        }

        return iconAnchor[0] + 'px ' + iconAnchor[1] + 'px';
    },

    _setPos: function (pos) {
        L.Marker.prototype._setPos.call(this, pos);

        if (L.DomUtil.TRANSFORM) {
            // use the CSS transform rule if available
            this._icon.style[L.DomUtil.TRANSFORM] += ' rotate(' + this.options.heading + 'deg)';
        } else if(L.Browser.ie) {
            // fallback for IE6, IE7, IE8
            var rad = this.options.heading * (Math.PI / 180),
                costheta = Math.cos(rad),
                sintheta = Math.sin(rad);
            this._icon.style.filter += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\', M11=' +
                costheta + ', M12=' + (-sintheta) + ', M21=' + sintheta + ', M22=' + costheta + ')';
        }
    },
  
	getVesselCode: function() {
		return this.options.vesselCode;
	},
	
	setVesselCode: function (vesselCode) {
		this.options.vesselCode = vesselCode;
	},

	getVesselName: function() {
		return this.options.vesselName;
	},
	
	setVesselName: function (vesselName) {
		this.options.vesselName = vesselName;
	},
	
	getVesselStatus: function() {
		return this.options.vesselStatus;
	},
	
	setVesselStatus: function (vesselStatus) {
		this.options.vesselStatus = vesselStatus;
	},

	getHeading: function () {
		return this.options.heading;
	},
	
    setHeading: function (heading) {
        this.options.heading = heading;
    },
    
    getCallSign: function () {
		return this.options.callSign;
	},
	
	setCallSign: function (callSign) {
        this.options.callSign = callSign;
    },
    getRouteCode: function () {
		return this.options.routeCode;
	},
	setRouteCode: function (routeCode) {
        this.options.routeCode = routeCode;
    },
	
	getLatitude: function () {
		return this.options.latitude;
	},
	setLatitude: function (latitude) {
        this.options.latitude = latitude;
    },
    
    getLongitude: function () {
		return this.options.longitude;
	},
	setLongitude: function (longitude) {
        this.options.longitude = longitude;
    },
    
	getSvcLaneCd: function() {
		return this.options.serviceLaneCode;
	},
	
	setSvcLaneCd: function (serviceLaneCode) {
		this.options.serviceLaneCode = serviceLaneCode;
	},
	
	getVslId: function() {
		return this.options.vslId;
	},
	
	setVslId: function (vslId) {
		this.options.vslId = vslId;
	},

	getVslName: function() {
		return this.options.vslName;
	},
	
	setVslName: function (vslName) {
		this.options.vslName = vslName;
	},
	
	getFleetCode: function() {
		return this.options.fleetCode;
	},
	
	setFleetCode: function (fleetCode) {
		this.options.fleetCode = fleetCode;
	},
	
	getMmsiId: function() {
		return this.options.mmsiId;
	},
	
	setMmsiId: function (mmsiId) {
		this.options.mmsiId = mmsiId;
	},	
	
	getImoNo: function() {
		return this.options.imoNo;
	},
	
	setImoNo: function (imoNo) {
		this.options.imoNo = imoNo;
	}
});

L.shipMarker = function (pos, options) {
    return new L.ShipMarker(pos, options);
};
