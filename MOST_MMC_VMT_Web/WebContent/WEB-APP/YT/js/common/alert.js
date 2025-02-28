/**
 * Mobile UI Alert ���� ��� �Լ�
 * 
 * ��ü ����
 *  tsbAlert.alert.getInstance().{�Լ���}
 *   
 * @author  Mr Tonny Kim
 * @version 1.0
 * @date    2012-06-12
 */


var tsbAlert = new Object();
var headerString = "Yard Tractor";

tsbAlert.alert=function(){
	this.tsbAlert = null;
};

tsbAlert.alert.getInstance=function(){
	if( this.tsbAlert == null ){
		this.tsbAlert = new tsbAlert.alert();
	}
	return this.tsbAlert;
};

tsbAlert.alert.prototype={
	/**
	 * Alert Confirm
	 */
	Info:function (message, close) {
		$('<div>').simpledialog2({
			width: '350px',
		    mode: 'blank',
		    transition : 'none',
		    headerText: headerString,
		    dialogAllow: true,
		    headerClose: true,
		    callbackClose:close,
		    blankContent : "<div style='padding:15px; word-break:break-all; font-size:25px;' >" + message + "</div>"+"<a id='closeBtn' rel='close' data-role='button' href='#' class='alertPopupBtnStyle'>OK</a>"
		  });
	}
};