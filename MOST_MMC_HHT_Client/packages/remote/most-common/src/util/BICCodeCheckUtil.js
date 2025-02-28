Ext.define('MOST.util.BICCodeCheckUtil', {
	singleton: true,
	alternateClassName: 'BICCodeCheckUtil',	

	 
	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
	
	checkContainerDigit: function(containerNo){
		var cntrNo = containerNo; //only uppercase
		var checkNums = new Array(); //check length
		
		
		if(cntrNo.length != 11)
		{
			return false;
		}
		var checkNum = cntrNo.charAt(cntrNo.length-1); //Last character is number.
		
		// Set "checkNums" array with valid values
		if(47 < checkNum.charCodeAt(0) && checkNum.charCodeAt(0) < 58)
		{
			for(var i = 0; i < cntrNo.length-1; i++)
			{
				var bicode = cntrNo.slice(i,i+1).charCodeAt(0);
				if(i < 4)
				{							
					if(bicode == 65)
					{
						checkNums[i] = 10;
					}
					else if(65 < bicode && bicode< 76)
					{
						checkNums[i] = bicode - 54; 
					}	
					else if(75 < bicode && bicode < 86)
					{
						checkNums[i] = bicode - 53;
					}
					else if(85 < bicode && bicode < 91)
					{
						checkNums[i] = bicode - 52;
					}
				}
				else
				{
					var num = parseInt(cntrNo.slice(i,i+1));
					if(47 < bicode && bicode < 58)
					{
						checkNums[i] = num;
					}
					else 
					{
						return false;
					}
				}
			}
		}
		
		if(checkNums.length == 10)
		{
			var result = 0;
			for(var idx = 0; idx < checkNums.length; idx++)
			{
				result += checkNums[idx] * (Math.pow(2, idx));
			}
			
			var checkResult = result%11;
			checkResult = checkResult == 10? 0 : checkResult;
			if(checkResult == parseInt(checkNum))
			{
				return true;
			}
		}
		return false;
	}

	 
});