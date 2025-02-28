Ext.define('MOST.view.common.DateTimeLocalField', {
	extend: 'Ext.Container',
	alias: 'widget.datetimelocalfield',
	requires: [
		'MOST.view.common.DateTimeFieldController'
	],
	controller: 'datetimefield',
	config:{
		label: null,
		labelWidth: null,
		labelAlign: 'left',
		labelTextAlign: 'right',
		placeholder: null,
		required: 'false',
		inputType: 'datetime-local',
		clearable: false,
		editable: true,
		disabled: false,
	},
	format: '', //MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), // d/m/Y H:i,

	margin: 0,
	padding: 0,
	
	items:[{
		xtype: 'textfield',
		height: 43,
		reference: 'refDateTimeField',
		//flex: 1,
		label: this.label,
		placeholder: this.placeholder,
		labelWidth: this.labelWidth,
		labelAlign: this.labelAlign,
		labelTextAlign: this.labelTextAlign,
		//textAlign: 'right',
		inputType: this.inputType,
		required: false,
		clearable: this.clearable,
		editable: this.editable,
		disabled: this.disabled,
	}],
	
	getValue: function(){
		var refs = this.getReferences();
		var dateString = refs.refDateTimeField.getValue();
		if(dateString === "-- T:" || dateString === "-- " || !dateString){ //In case user didnt input
			return null;
		}
		if(!this.format){// not config format
			try{
				if (refs.refDateTimeField.getInputType() === 'datetime-local') {
					return Ext.Date.format(new Date(dateString), 'Y-m-d H:i');
				} else if (refs.refDateTimeField.getInputType() === 'date') {
					return Ext.Date.format(new Date(dateString), 'Y-m-d');
				}
			} catch(err) {
				return null;
			}
		}else if(this.format === MOST.config.Locale.getDefaultDateFormatWithNoSeconds()){
			//if config format: d/m/Y H:i (example: 20/10/2020 15:20)
			try {
				var sYear    = Ext.util.Format.substr(dateString, 0, 4);
				var sMonth   = Ext.util.Format.substr(dateString, 5, 2);
				var sDay     = Ext.util.Format.substr(dateString, 8, 2);
				var sTime    = Ext.util.Format.substr(dateString, 11, 5);
				if (refs.refDateTimeField.getInputType() === 'datetime-local') {
				    return (sDay + '/' + sMonth + '/' + sYear + ' ' + sTime).trim();// d/m/Y H:i
				} else if (refs.refDateTimeField.getInputType() === 'date') {
				    return (sDay + '/' + sMonth + '/' + sYear).trim();// d/m/Y
				}
			} catch (error) {
				return null;
			}
		}
	},
	
	getDate: function(){
		var refs = this.getReferences();
		var dateString = refs.refDateTimeField.getValue();
		if(!dateString){
			return null;
		}
		try{
			return Ext.Date.format(new Date(dateString), MOST.config.Locale.getShortDate());
		} catch(err) {
			return '';
		}
	},
	
	setValue: function(value){		//value : date object , date string (as yyyy-mm-dd hh:mm, yyyy-mm-dd)
		var refs = this.getReferences();
		var fullYears, months, days, hours, minutes;
		refs.refDateTimeField.reset();
		
		if(!value){
			refs.refDateTimeField.reset();
		}else if(value instanceof Date){
			var strDateTime = Ext.Date.format(value, 'YmdHi');
			fullYears 	= Ext.util.Format.substr(strDateTime, 0, 4);
			months 		= Ext.util.Format.substr(strDateTime, 4, 2);
			days 		= Ext.util.Format.substr(strDateTime, 6, 2);
			hours 		= Ext.util.Format.substr(strDateTime, 8, 2);
			minutes 	= Ext.util.Format.substr(strDateTime, 10, 2);
			
			if (refs.refDateTimeField.getInputType() === 'datetime-local') {
				refs.refDateTimeField.setValue(fullYears + '-' + months + '-' + days + 'T'+ hours + ':' + minutes);
			} else if (refs.refDateTimeField.getInputType() === 'date') {
				refs.refDateTimeField.setValue(fullYears + '-' + months + '-' + days);
			}
		} else {
			if(!value.trim()){
				refs.refDateTimeField.reset();
				return;
			}
			if(!this.format){
				try{
					fullYears 	= Ext.util.Format.substr(value, 0, 4);
					months 		= Ext.util.Format.substr(value, 5, 2);
					days 		= Ext.util.Format.substr(value, 8, 2);
					hours 		= Ext.util.Format.substr(value, 11, 2);
					minutes 	= Ext.util.Format.substr(value, 14, 2);
					refs.refDateTimeField.setValue(fullYears + '-' + months + '-' + days + 'T'+ hours + ':' + minutes);
					
					if (refs.refDateTimeField.getInputType() === 'datetime-local') {
						refs.refDateTimeField.setValue(fullYears + '-' + months + '-' + days + 'T'+ hours + ':' + minutes);
					} else if (refs.refDateTimeField.getInputType() === 'date') {
						refs.refDateTimeField.setValue(fullYears + '-' + months + '-' + days);
					}				
				} catch(err) {
					console.log('Wrong Date time format.');
					console.log(err);
				}
			}else if(this.format === MOST.config.Locale.getDefaultDateFormatWithNoSeconds()){
				try {
					days 		= Ext.util.Format.substr(value, 0, 2);
					months 		= Ext.util.Format.substr(value, 3, 2);
					fullYears 	= Ext.util.Format.substr(value, 6, 4);
					
					if (refs.refDateTimeField.getInputType() === 'datetime-local') {
						hours 		= Ext.util.Format.substr(value, 11, 2);
						minutes 	= Ext.util.Format.substr(value, 14, 2);
						refs.refDateTimeField.setValue(fullYears + '-' + months + '-' + days + 'T'+ hours + ':' + minutes);
					} else if (refs.refDateTimeField.getInputType() === 'date') {
						refs.refDateTimeField.setValue(fullYears + '-' + months + '-' + days);
					}				
				} catch(err) {
					console.log('Wrong Date time format.');
					console.log(err);
				}
			}
		}
	},
	
	setInputType: function(value){
		var refs = this.getReferences();
		refs.refDateTimeField.setInputType(value);
	},
	
	setRequired: function(value){
		var refs = this.getReferences();
		refs.refDateTimeField.setRequired(value);
	},
	
	setLabel: function (value){
		var refs = this.getReferences();
		refs.refDateTimeField.setLabel(value);
	},
	
	setPlaceholder: function(value){
		var refs = this.getReferences();
		refs.refDateTimeField.setPlaceholder(value);		
	},	
	
	setLabelWidth: function (value){
		var refs = this.getReferences();
		refs.refDateTimeField.setLabelWidth(value);
	},
	
	setDisabled: function (value){
		var refs = this.getReferences();
		refs.refDateTimeField.setDisabled(value);
//		if(value){
//			refs.refDateTimeField.setRequired(!value);
//		}
	},
	
	setReadOnly: function(value){
		var refs = this.getReferences();
		refs.refDateTimeField.ReadOnly(value);
	},
	
	setEditable: function(value){
		var refs = this.getReferences();
		refs.refDateTimeField.setEditable(value);
	},
	
	setClearable: function(value){
		var refs = this.getReferences();
		refs.refDateTimeField.setClearable(value);
	},
	
	setFormat: function(){
		var refs = this.getReferences();
		refs.refDateTimeField.ReadOnly(value);
	},
	
	setLabelTextAlign: function(value){
		var refs = this.getReferences();
		refs.refDateTimeField.setLabelTextAlign(value);
	},
	
	reset: function() {
		var refs = this.getReferences();
		refs.refDateTimeField.reset();
	}
});