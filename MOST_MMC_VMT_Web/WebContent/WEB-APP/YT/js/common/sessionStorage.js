/**
 * Gets session item
 * @param key
 */
function getSessionItem(key){
	return sessionStorage.getItem(key);
}

/**
 * Sets session item
 * @param data
 * @param key
 */
function setSessionItem(key, data){
	sessionStorage.setItem(key, data);	
}

/**
 * Remove session storage by key
 */
function removeSessionItem(key){
	sessionStorage.removeItem(key);
}

/**
 * Clear session storage
 */
function clearSession(){
	sessionStorage.clear();
}
