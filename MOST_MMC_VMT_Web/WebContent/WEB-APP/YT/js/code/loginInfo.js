/**
 * HTML5 Session Storage 사용을 위한 자바스크립트 객체
 * 로그인 정보를 담고 있다.
 * 
 * 객체 사용법
 *  tsbLogin.info.getInstance().{함수명}
 *   
 * @author  Mr Tonny Kim
 * @version 1.0
 * @date    2012-06-11
 */

var tsbLogin = new Object();

tsbLogin.info=function(){
	this.tsblogin = null;
};

tsbLogin.info.getInstance=function(){
	if( this.tsbLogin == null ){
		this.tsbLogin = new tsbLogin.info();
	}
	
	return this.tsbLogin;
};

tsbLogin.info.prototype={
	/**
	 * Whether login is success
	 */
	isLogin:function(){
		if(sessionStorage.loginInfo){
			return true;
		} else {
			return false;
		}
	},
	
	/**
	 * Gets session item
	 * @param key
	 */
	getSessionItem:function(key){
		var result = sessionStorage.getItem(key);
		if(result == null || result == undefined || result == 'null' || result == 'undefined') {
			result = "";
		}
		return result ;
	},
	
	/**
	 * Sets session item
	 * @param data
	 * @param key
	 */
	setSessionItem:function(key, data){
		sessionStorage.setItem(key, data);	
	},
	
	/**
	 * Clear session storage
	 */
	clearSession:function(){
		sessionStorage.clear();
	}
};