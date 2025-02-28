
var localCacheInfo = {};

var CacheService = {
	
	/**
	 * CacheServiceConstants/PopupServiceConstants
	 */
	constants: {
		
	},
	
		
	/**
	 * @Public
	 * 
	 * @Parameter type: 코드 타입
	 * @Parameter code: 코드
	 * 
	 * 코드를 값으로 변환한다.
	 * 
	 * 예) CacheService.getConvertValue("In/Out", "I") returns "In"
	 */
	getConvertValue: function (type, code) {
		
		var codeMap = localCacheInfo[type] || {};
		
		return codeMap[code];
	},
	
	
	/**
	 * @Public
	 * 
	 * @Parameter type: 코드 타입
	 * 
	 * 서버에서 코드를 불러와서 localCacheInfo에 넣고 localCache 처럼 사용한다.
	 */
	loadGeneralCodesToCache: function () {
//		var parm = {
//			parmClass: "com.tsb.web.webip.bizparm.sizetypecode.SearchSizeTypeCodeBizParm",
//			value: {}
//		};
//		
//		
//		wsConnection.send("c3it.container.searchContainerSztp", parm, popupService_resultHandler);
	},
	
	
	/**
	 * @Public
	 * 
	 * @Parameter type: 코드 타입
	 * 
	 * 특정 코드 타입의 코드 목록을 반환
	 */
	getCodeList: function (type) {
		
		var list = [];
		
		var codeMap = localCacheInfo[type] || {};
		
		for (var key in codeMap) {
			var codeItem = {
				key		: key,
				value	: codeMap[key]
			};
			
			list.push( codeItem );
		}
		
		return list;
	}

};


/**
 * @ResultHandler
 * 
 * 서버에서 반환된 코드 집합을 localCacheInfo에 할당
 */
function popupService_resultHandler (codeMaps) {

	var codeMap = new Map();
	codeMaps.collection.forEach(
		function (code) {
			codeMap.set(code.isoType, code.isoType);
		}
	);
	
	codeMap.forEach(
		function (code, key, obj) {
			var itemMap = {};
			codeMaps.collection.forEach(
					function (item) {
						if(code == item.isoType){
							itemMap[item.sztpId] = item.privateCode;
						}
					}
			);
			localCacheInfo[code] = itemMap;
		}
	);
	cacheLoadFlag = true;
}