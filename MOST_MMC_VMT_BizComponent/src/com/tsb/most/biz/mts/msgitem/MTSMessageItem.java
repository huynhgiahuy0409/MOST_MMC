package com.tsb.most.biz.mts.msgitem;

import com.tsb.most.biz.constants.MTSConstant;

public abstract class MTSMessageItem implements IMTSMessageItem {
	
	private String recvMessage;
	protected String head;
	protected String mMode;
	protected String prefixId;
	protected String clientId;
	
	public abstract String toMessage();

	public MTSMessageItem() {
		recvMessage = "";
		head = "";
		mMode = "";
		setPrefixId(String.valueOf(System.currentTimeMillis()));
	}

	public String getHead() {
		return head;
	}

	public void setHead(String head) {
		this.head = head;
	}

	public String getRecvMessage() {
		return recvMessage;
	}

	public void setRecvMessage(String recvMessage) {
		this.recvMessage = recvMessage;
	}

	public String getmMode() {
		return mMode;
	}

	public void setmMode(String mMode) {
		this.mMode = mMode;
	}
	
	public String getPrefixId() {
		return prefixId;
	}

	public void setPrefixId(String prefixId) {
		this.prefixId = prefixId;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}
	
	protected String handledNull(String value){
		if(value == null || value.equals("null") || value.equals("")){
			return "";
		}else{
			return value;
		}
	}
	
	protected String getC3ITMessage(StringBuffer sbMessage) {
		StringBuffer sbFullMessage = new StringBuffer();
		
		// set full message
		return sbFullMessage.append(getHeadItem()).append(sbMessage).append(getTailItem()).toString();
	}
	
	private String getHeadItem() {
		StringBuffer sbHead = new StringBuffer();
		
		// PrefixID 갱신
		setPrefixId("" + System.currentTimeMillis());
		
		// Head
		sbHead.append(MTSConstant.MSG_START)
			  .append(MTSConstant.MSG_CONNECT_SYNC)
			  .append(MTSConstant.MSG_PREFIX_ID_MARK)
			  .append(getPrefixId()).append(MTSConstant.MSG_SEPERATOR)
			  .append(head).append(MTSConstant.MSG_SEPERATOR);
		
		return sbHead.toString();
	}
	
	private String getTailItem() {
		StringBuffer sbTail = new StringBuffer();
		
		// Tail
		sbTail.append(MTSConstant.MSG_END );
		
		return sbTail.toString();
	}

	// added by jaehoon(2014.05.13)
	public String getKey() {
		return "";
	}

	public void setKey(String key) {
	}

//	public TxResponseInfo getTxResponseInfo() {
//		return null;
//	}
//
//	public void setTxResponseInfo(TxResponseInfo rxResponseInfo) {
//	}

	public int getWorkingStatus() {
		return 0;
	}

	public void setWorkingStatus(int crud) {
	}

	public Object clone() {
		try {
			return super.clone();
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
	
	public void setStaffCd(String staffCd) {
	}
	

}