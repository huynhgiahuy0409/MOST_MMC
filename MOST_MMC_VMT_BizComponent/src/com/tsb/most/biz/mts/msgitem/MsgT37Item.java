package com.tsb.most.biz.mts.msgitem;

import java.util.List;

import com.tsb.most.biz.constants.MTSConstant;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.tx.TxResponseInfo;

public class MsgT37Item extends MTSMessageItem {
	private String yardTruckNo = CommonConstants.BLANK;
	private String staffCd = CommonConstants.BLANK;
	
	public String getYardTruckNo() {
		return yardTruckNo;
	}

	public void setYardTruckNo(String yardTruckNo) {
		this.yardTruckNo = yardTruckNo;
	}
		
	public String getStaffCd() {
		return staffCd;
	}

	public void setStaffCd(String staffCd) {
		this.staffCd = staffCd;
	}

	@Override
	public String toMessage(){
		StringBuffer msgItem = new StringBuffer();
		
		// Contents
		msgItem.append(yardTruckNo).append(MTSConstant.MSG_SEPERATOR)
			   .append(mMode).append(MTSConstant.MSG_SEPERATOR)
			   .append(staffCd);

		return getC3ITMessage(msgItem);
	}

	@Override
	public List getCollection() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Object> getCollection(int arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getCrud() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getSessionId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TxResponseInfo getTxResponseInfo() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setCrud(String arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setSessionId(String arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setTxResponseInfo(TxResponseInfo arg0) {
		// TODO Auto-generated method stub
		
	}
}