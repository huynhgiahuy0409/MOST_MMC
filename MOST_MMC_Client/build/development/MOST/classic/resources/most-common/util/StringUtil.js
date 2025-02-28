/**
 * String Utility
 */
var StringUtil = function(){}

// Check Null or Empty
StringUtil.isNullorEmpty = function(value){
	if(value == undefined ||
	   value == null ||
	   (typeof value === 'string' && value.trim() === '')){
		return true;
	}
	
	return false;
}

// Check Null or Emtpy, Equal String
StringUtil.equalString = function(value, equalString){
	if(!StringUtil.isNullorEmpty(value) &&
	   value === equalString){
		return true;
	}
	
	return false;
}

//Check Null or Emtpy, Equal String
StringUtil.notEqualString = function(value, equalString){
	if(!StringUtil.isNullorEmpty(value) &&
	   value !== equalString){
		return true;
	}
	
	return false;
}

// trim
StringUtil.trim = function(value){
	if(value == undefined ||
	   value == null){
		return '';
	} else {
		return value.trim();
	}
}

// First UpperCase
StringUtil.firstUpperCase = function(value){
	if(value == undefined ||
	   value == null){
		return '';
	} else {
		return value.substring(0,1).toUpperCase() + value.substring(1);
	}
}

//UpperCase
StringUtil.toUpperCase = function(value) {
	if(value == undefined || value == null) {
		return '';
	}
	else {
		return value.toUpperCase();
	}
}

// LowerCase
StringUtil.toLowerCase = function(value) {
	if(value == undefined || value == null) {
		return '';
	}
	else {
		return value.toLowerCase();
	}
}