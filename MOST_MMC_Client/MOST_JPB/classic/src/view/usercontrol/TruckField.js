Ext.define('MOST.view.usercontrol.TruckField', {
	extend: 'Ext.Container',
	alias: 'widget.truckfield',
	padding: '0,0,0,0',
	
	requires: [
	],

	controller: 'truckfield',
	
	viewModel: {
		type: 'truckfield'
	},
	
	layout:'hbox',
	
	config:{
		allowBlank : true,
		editableControl : true,
		visibleName : false,
		parent : null,
		params : null,
		ptnrCd : '',
		vslCallId : '',
		shipgNoteNo : '',
		grNo: '',
		subDoNo: '',
		blNo : '',
		lorryNo : '',
		isMultiCargo: '',
		searchDivCd: '',
		isAutoLoad: '',
		notWeightYn: '',
		searchType: '',
		cgTpCd: '',
		searchDelvTp: '',
		isOpeChk: '',
	},
	
	updateEditableControl : function(value){
		var me = this;
		var fieldButton = this.lookupReference("ctlOpenPopupButton");
		var fieldControl = this.lookupReference("ctlField");
		
		if(fieldControl && fieldButton){
			fieldControl.setEditable(value);
			fieldButton.setDisabled(!value);			
		}
	},
	
	initComponent: function() {
		var me = this;
		
		Ext.apply(me, {
			defaults:{
				labelAlign: 'right'
			},
			items:[
				{
		            xtype: 'textfield',
		            flex:1,
		            margin: '0 5 0 0',
		            reference:'ctlField',
		            labelWidth: 30,
		            maxLength:20,
					enforceMaxLength: true,
					fieldStyle : 'text-transform: uppercase',
					editable: false,
		            listeners: {
			        	beforeRender: 'onRenderField',
			        	focusleave: 'onFieldFocusleave',
						focus: 'onFocus',
						change: function(){
							var me = this;
							me.setValue(this.getValue().toUpperCase());
						}
					}
		        },{
					xtype: 'button',
					reference:'ctlOpenPopupButton',
					iconCls: 'x-fa fa-search',
					fieldStyle : 'text-transform: uppercase',
					listeners:{
						click: 'openCodePopup'
					}
				}
			],
			
			getValue:function(){
				return me.lookupReference("ctlField").getValue();
		 	},
		 	
		 	setValue:function(codeValue){
		 		me.lookupReference("ctlField").setValue(codeValue);
		 	},
		 	
			getPtnrCd: function(){
		 		return this.ptnrCd;
		 	},
		 	
		 	setPtnrCd: function(codeValue){
		 		this.ptnrCd = codeValue;
		 	},
		 	
		 	getVslCallId: function(){
		 		return this.vslCallId;
		 	},
		 	
		 	setVslCallId: function(codeValue){
		 		this.vslCallId = codeValue;
		 	},
		 	
		 	getShipgNoteNo: function(){
		 		return this.shipgNoteNo;
		 	},
		 	
		 	setShipgNoteNo: function(codeValue){
		 		this.shipgNoteNo = codeValue;
		 	},
		 	
		 	getGrNo: function(){
		 		return this.grNo;
		 	},
		 	
		 	setGrNo: function(codeValue){
		 		this.grNo = codeValue;
		 	},
		 	
		 	getBlNo: function(){
		 		return this.blNo;
		 	},
		 	
		 	setBlNo: function(codeValue){
		 		this.blNo = codeValue;
		 	},
		 	
		 	getSubDoNo: function(){
		 		return this.subDoNo;
		 	},
		 	
		 	setSubDoNo: function(codeValue){
		 		this.subDoNo = codeValue;
		 	},
		 	
		 	getLorryNo: function(){
		 		return this.lorryNo;
		 	},
		 	
		 	setLorryNo: function(codeValue){
		 		this.lorryNo = codeValue;
		 	},
		 	
		 	getIsMultiCargo: function(){
		 		return this.isMultiCargo;
		 	},
		 	
		 	setIsMultiCargo: function(codeValue){
		 		this.isMultiCargo = codeValue;
		 	},
		 	
		 	getSearchDivCd: function(){
		 		return this.searchDivCd;
		 	},
		 	
		 	setSearchDivCd: function(codeValue){
		 		this.searchDivCd = codeValue;
		 	},
		 	
		 	getIsAutoLoad: function(){
		 		return this.isAutoLoad;
		 	},
		 	
		 	setIsAutoLoad: function(codeValue){
		 		this.isAutoLoad = codeValue;
		 	},
		 	getWeightCheckYn: function(){
		 		return this.weightCheckYn;
		 	},
		 	
		 	setWeightCheckYn: function(codeValue){
		 		this.weightCheckYn = codeValue;
		 	},
		 	getSearchType: function(){
		 		return this.searchType;
		 	},
		 	
		 	setSearchType: function(codeValue){
		 		this.searchType = codeValue;
		 	},
		 	getCgTpCd: function(){
		 		return this.cgTpCd;
		 	},
		 	
		 	setCgTpCd: function(codeValue){
		 		this.cgTpCd = codeValue;
		 	},
		 	getSearchDelvTp: function(){
		 		return this.searchDelvTp;
		 	},
		 	
		 	setSearchDelvTp: function(codeValue){
		 		this.searchDelvTp = codeValue;
		 	},
		 	getIsOpeChk: function(){
		 		return this.isOpeChk;
		 	},
		 	
		 	setIsOpeChk: function(codeValue){
		 		this.isOpeChk = codeValue;
		 	},
		});
		
		me.callParent();
	}

});