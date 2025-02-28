
function showAll() 
{
	// 루프, 스토리지 내용 확인
	for ( var i = 0; i < localStorage.length ; i++ ) 
	{
//		var k = localStorage.key(i);
//		entries.options[entries.options.length] = new Option(k + ":" + localStorage[k], k);
	}
}

// 스토리지에 저장
function localStorageAdd(key, value) 
{
	localStorage[key] = value;
}

// 스토리지로부터 값을 삭제
function remove(key)
{
	delete localStorage[key];
}

function localStorageGet(key) 
{
	return localStorage[key];
}

/*---- localStorage for (객체)용  */
function setLocalStorageObj(key, data){
	if(key !== undefined && key.length > 0 && data !== undefined) {
		window.localStorage.setItem(key, JSON.stringify(data));	
	}
}

function getLocalStorageObj(key){
	if(key !== undefined && key.length > 0) {
		var sValue = window.localStorage.getItem(key);
		if(sValue != null && sValue.length > 0) {
			return JSON.parse(sValue);
		}
	}
	return null;
}

function removeLocalStorageObj(key){
	window.localStorage.removeItem(key);
}

/*---- localStorage for 일반용  */
function setLocalStorage(key, data){
	if(key !== undefined && key.length > 0 && data !== undefined) {
		window.localStorage.setItem(key, data);	
	}
}

function getLocalStorage(key){
	if(key !== undefined && key.length > 0) {
		return window.localStorage.getItem(key);
	}
	return null;
}

function removeLocalStorage(key){
	window.localStorage.removeItem(key);
}