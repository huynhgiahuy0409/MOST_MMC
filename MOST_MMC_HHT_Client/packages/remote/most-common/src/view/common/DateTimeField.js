/**
 * Created by ROBERT on 7/16/2020.
 */
Ext.define('MOST.view.common.DateTimeField', {
	extend: 'Ext.Container',
	alias: 'widget.datetimefield',
	requires: [
		'MOST.view.common.DateTimeFieldController'
	],
	
	controller: 'datetimefield',
	requires: [
	],
	
	config:{
		//Default:
		width: '100%',
		label: 'Date',
		labelWidth: 70,
		labelAlign: 'left',
//		margin: '10 0 0 0',
		margin: 0,
		required: 'false',
	},
	format: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(), // d/m/Y H:i,
		
	layout:{
		type: 'hbox',
		align: 'stretch',
	},

//	initialize: function(){
//	},
	
	margin: 0,
	padding: 0,
	
	items:[{
		xtype: 'textfield',
		label: this.label,
		labelWidth: this.labelWidth,
		labelAlign: this.labelAlign,
//		margin: this.margin,
		//padding: 0,
		flex: 2,
		reference: 'txtDate',
		inputType: 'date',
		dateFormat: MOST.config.Locale.getDefaultDateFormatWithNoSeconds(),
		required: false,
		listeners:{
			change: 'onChangeDate'
		}
	},{
		xtype: 'textfield',
		inputType: 'time',
//		margin: this.margin,
//		padding: 0,
		label: '',
		flex: 1,
		reference: 'txtTime',
		required: false,
	}],
	
	getValue: function(){
		var refs = this.getReferences();
		var dateString = refs.txtDate.getValue();
		var timeString = (refs.txtTime.getValue()==null?'':refs.txtTime.getValue());
		if(dateString == null || dateString  == ''){
			return null;
		}
		var sYear = dateString.substring(0,4);
		var sMonth = dateString.substring(5,7);
		var sDay = dateString.substring(8,10);
		return (sDay + '/' + sMonth + '/' + sYear + ' ' + timeString).trim();// dd/mm/YYYY hh:mm
	},
	getDate: function(){
		var refs = this.getReferences();
		var dateString = refs.txtDate.getValue();
		if(dateString == null || dateString  == ''){
			return null;
		}
		var sYear = dateString.substring(0,4);
		var sMonth = dateString.substring(5,7);
		var sDay = dateString.substring(8,10);
		return (sDay + '/' + sMonth + '/' + sYear).trim();// dd/mm/YYYY hh:mm
	}
	,
	setValue: function(value){//dd/mm/YYYY hh:mm
		if(value instanceof Date){
			var value = Ext.Date.format(value, this.format);
		}
		var refs = this.getReferences();
		refs.txtDate.reset();
		refs.txtTime.reset();
		//'d/m/Y H:i'
		if(this.format === MOST.config.Locale.getDefaultDateFormatWithNoSeconds()) {
			if(value == null || value == ''){
				return;
			}else if(value.trim() == ''){
				return;
			}
			try {
				var refs = this.getReferences();
				var day = value.substring(0,2)
				var month = value.substring(3,5);
				var year = value.substring(6,10);
				var hhmm = value.substring(11,16);
				refs.txtDate.setValue((year+'-'+month+'-'+day)); //Y-m-d
				if(hhmm){
					refs.txtTime.setValue(hhmm);//hh:mm	
				}
			}
			catch(err) {
				console.log(err);
			}
		}
		
	},
	setRequired: function(value){
		var refs = this.getReferences();
		refs.txtDate.setRequired(value);
		refs.txtTime.setRequired(value);
	},
	setLabel: function (value){
		var refs = this.getReferences();
		refs.txtDate.setLabel(value);
	},
	setLabelWidth: function (value){
		var refs = this.getReferences();
		refs.txtDate.setLabelWidth(value);
	},
	setDisableTime: function (value){
		var refs = this.getReferences();
		refs.txtTime.setRequired(!value);
		refs.txtTime.setHidden(value);
	},
	setDisabled: function (value){
		var refs = this.getReferences();
		refs.txtTime.setDisabled(value);
		refs.txtDate.setDisabled(value);
		if(value){
			refs.txtTime.setRequired(!value);
			refs.txtDate.setRequired(!value);
		}
	},
	setReadOnly: function(value){
		var refs = this.getReferences();
		refs.txtDate.ReadOnly(value);
		refs.txtTime.ReadOnly(value);
	},
	
	reset: function() {
		var refs = this.getReferences();
		refs.txtDate.reset();
		refs.txtTime.reset();		
	},


	
});