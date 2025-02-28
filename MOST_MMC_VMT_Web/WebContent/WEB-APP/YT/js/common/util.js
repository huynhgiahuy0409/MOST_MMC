function transTempType(temp, tempType) {
	
	temp = $.trim(temp);
	if(temp=='') return '';
	
	var result = '';
	if (tempType=="F")
	{
		// C to F 
		result = ((9/5) * temp) + 32;
		return cuttingDecimalPoint(result, '1');
	}
	else if (tempType=="C")
	{
		// F to C
		result = (5 / 9) * (temp -32);
		return cuttingDecimalPoint(result, '1');
		
	} else {
		return result;
	}
}


// cutting decimal dot
function cuttingDecimalPoint(numValue, decimalPlace) {
	var num = '';
	var numValue = numValue.toString();
	
	if(numValue.indexOf('.') != -1) {
		var numFloat = parseFloat(numValue);
		var splitedNum = numFloat.toFixed(1);
		var numArray = splitedNum.split('.');
		if(numArray[1]!=null && numArray[1]==0) {
			num = parseInt(splitedNum);
		} else {
			num = splitedNum;
		}
		/*
		num = (numValue=numValue.toString()).substring(0, numValue.indexOf('.')+(decimalPlace+1));
		num = numValue.toString().match(/^.*\.\d{2}/) || numValue;
		*/
		return num;
	} else {
		return numValue;
	}
}



function createStaffCode(userId, PageCode) {
	
	var userIdLength = userId.length;
	var blankLength = 10 - userIdLength;
	if(blankLength > 0) {
		for(var i =0; i<blankLength; i++) {
			userId += " ";
		}
	}
	
	return userId+PageCode;
}


function checkPersentageValue(inputValue) {
	var trensferValue = Number($.trim(inputValue));
	if(trensferValue != undefined && trensferValue != null) {
		if(trensferValue >= 0 && trensferValue<=100) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function getFunctionName(inputFunction) {
	var ret = inputFunction.toString();
	ret = ret.substr('function '.length);
	ret = ret.substr(0, ret.indexOf('('));
	return ret.replace(/(^\s*)|(\s*$)/gi, "");
}

function getElapsedTime( inputTime )
{
	if(inputTime != null) {
		// current time
		var now = new Date().getTime();

		// calculation the different of time
		var milisec_diff = now - inputTime;

		var secondDiff= Math.floor(milisec_diff/1000); // in seconds
		return secondDiff;
	}
}

