/**
 * Control Utility

var ControlUtil = function(){}

// Check if the value exists in the combo box
ControlUtil.validationQueryMatch=function(combo, displayFieldName){
	if(!StringUtil.isNullorEmpty(combo.rawValue)){
		var index = combo.getStore().findBy(function(record, id){
						if(record.get(displayFieldName) === combo.rawValue){
							return true;
						}
					});
		
		if(index < 0){
			combo.setValue(null);
		}
	}
}
 */
Ext.define('MOST.util.ControlUtil', {
	singleton: true,
	alternateClassName: 'ControlUtil',	

	 
	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	
	// Set To ComboBox with LocalCache
	validationQueryMatch : function(combo, displayFieldName){
		if(!StringUtil.isNullorEmpty(combo.rawValue)){
			var index = combo.getStore().findBy(function(record, id){
							if(record.get(displayFieldName) === combo.rawValue){
								return true;
							}
						});
			
			if(index < 0){
				return false;
			}
		}
	},
	
	validateInputCombobox: function(control) {
		if(control.rawValue == null || control.rawValue == '') return;
		
		if(ControlUtil.validationQueryMatch(control, control.displayField) == false){
			MessageUtil.error('fail_msg', 'combobox_error' , null);
			control.setValue(null);
			control.validate();
		}
	},
	
	formatTCode: function(value, param) {
	    if(CONSTANTS.SYSTEM_CODE == 'KMDC'){
			
			if(param == '' || param == null){ 
				return '';
			}
			if(value == '' || value == null){ 
				return '';
			}	
			if(param == CodeConstants.STOCK_NO){
				const userKeyRegExp = /^[A-Z]{3}\-[0-9]{1}[A-Z]{1}\-[0-9]{4}?$/;
				const userKeyRegExp2 = /^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{4}?$/;
				
				var valid = userKeyRegExp.test(value);
				var valid2 = userKeyRegExp2.test(value);
				if(valid || valid2){
					var charVal = value.replaceAll('-','');
					var result = charVal.substring(0, 3) + '-' + charVal.substring(3, 5) + '-' + charVal.substring(5, 9);
					return result;
				}else{
					return '';
				}
			}
			else if(param == CodeConstants.WORK_NO){
				const userKeyRegExp = /^[A-Z]{2}\-[0-9]{2}\-[0-9]{4}?$/;
				const userKeyRegExp2 = /^[A-Z]{2}[0-9]{2}[0-9]{4}?$/;	
				
				var valid = userKeyRegExp.test(value);	
				var valid2 = userKeyRegExp2.test(value);
				if(valid || valid2){
					var charVal = value.replaceAll('-','');
					var result = charVal.substring(0, 2) + '-' + charVal.substring(2, 4) + '-' + charVal.substring(4, 8);
					return result;
				}else{
					return '';
				}
			}
			else if(param == CodeConstants.CVP_NO){
				const userKeyRegExp = /^[A-Z]{2}\-[0-9]{2}\-[0-9]{4}\-[0-9]{3}?$/;
				const userKeyRegExp2 = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{3}?$/;
				
				var valid = userKeyRegExp.test(value);
				var valid2 = userKeyRegExp2.test(value);
				if(valid || valid2){
					var charVal = value.replaceAll('-','');
					var result = charVal.substring(0, 2) + '-' + charVal.substring(2, 4) + '-' + charVal.substring(4, 8) + '-' + charVal.substring(8, 11);
					return result;
				}else{
					return '';
				}
			}
			else if(param == CodeConstants.CNTR_NO){	
				const userKeyRegExp = /^[A-Z]{4}[0-9]{7}?$/;
				
				var valid = userKeyRegExp.test(value);	
				if(valid){
					return value;
				}else{
					return '';
				}
			}
			return '';

	    }else{ //CSPADT
		
			if(param == '' || param == null){ 
				return '';
			}
			if(value == '' || value == null){ 
				return '';
			}	
			if(param == CodeConstants.STOCK_NO){
				const userKeyRegExp = /^[A-Z]{3}\-[0-9]{1}[A-Z]{1}\-[0-9]{4}?$/;
				const userKeyRegExp2 = /^[A-Z]{3}[0-9]{8}?$/;
				
				var valid = userKeyRegExp.test(value);
				var valid2 = userKeyRegExp2.test(value);
				if(valid || valid2){
					return value;
				}else{
					return '';
				}
			}
			else if(param == CodeConstants.WORK_NO){
				const userKeyRegExp = /^[A-Z]{2}\-[0-9]{2}\-[0-9]{4}?$/;
				const userKeyRegExp2 = /^[A-Z]{2}[0-9]{12}?$/;	
				
				var valid = userKeyRegExp.test(value);	
				var valid2 = userKeyRegExp2.test(value);
				if(valid || valid2){
					return value;
				}else{
					return '';
				}
			}
			else if(param == CodeConstants.CVP_NO){
				const userKeyRegExp = /^[A-Z]{2}\-[0-9]{2}\-[0-9]{4}\-[0-9]{3}?$/;
				const userKeyRegExp2 = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{3}?$/;
				
				var valid = userKeyRegExp.test(value);
				var valid2 = userKeyRegExp2.test(value);
				if(valid || valid2){
					var charVal = value.replaceAll('-','');
					var result = charVal.substring(0, 2) + '-' + charVal.substring(2, 4) + '-' + charVal.substring(4, 8) + '-' + charVal.substring(8, 11);
					return result;
				}else{
					return '';
				}
			}
			else if(param == CodeConstants.CNTR_NO){	
				const userKeyRegExp = /^[A-Z]{4}[0-9]{7}?$/;
				
				var valid = userKeyRegExp.test(value);	
				if(valid){
					return value;
				}else{
					return '';
				}
			}
			return '';
	    }
	}

	
	 
});