package com.tsb.most.biz.mts.msgitem;
/**
* MsgC3itReceive.java
*
* Created on   : 2012-06-11
* Target OS    : Java VM 1.7.0
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2012-06-11 Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/


import java.util.ArrayList;

import com.tsb.most.framework.util.C3ITUtil;

public abstract class MsgC3itReceive {
	
	private String msgHead;
	private String msgReceived;
	
	/**
	 * 이승일(2020. 4. 14.): 수신한 Message String로 부터  Rst-Message Object 값 설정(Setting) 
	 * @param pMsg
	 * @throws Exception
	 */
	public void setMessage(String pMsg) throws Exception{
		if(pMsg != null) {
			msgReceived = pMsg;
			ArrayList<String> tokenLists = C3ITUtil.getMessageTokenizer(pMsg);
			this.setMessageBody(tokenLists);
		}
	}
	
	public void setMessage2(ArrayList<String> tokenLists) throws Exception{
		this.setMessageBody(tokenLists);
	}
	
	protected abstract void setMessageBody(ArrayList<String> tokenLists) throws Exception;

	public String getMsgHead() {
		return msgHead;
	}

	public void setMsgHead(String msgHead) {
		this.msgHead = msgHead;
	}

	public String getMsgReceived() {
		return msgReceived;
	}

	public void setMsgReceived(String msgReceived) {
		this.msgReceived = msgReceived;
	}
}
