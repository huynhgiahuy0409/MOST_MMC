/**
*
* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
* LTD
*
* Copyright (C) 1988-2012 TOTAL SOFT BANK LTD. All Rights
* Reserved. Use of this source code is subject to the terms of 
* the applicable license agreement.
*
* The copyright notice(s) in this source code does not indicate 
* the actual or intended publication of this source code.
*
* Created on   : 2016. 11. 3.
* CVS revision : $Revision: 1.1 $ 
*
* ====================================
* CHANGE REVISION
* ====================================
* DATE           AUTHOR           REVISION
* 2016. 11. 3.   Anna 1.0    First release.
* ====================================
* CLASS DESCRIPTION
* ====================================
*/
package com.tsb.most.biz.dataitem.monitoring;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tsb.most.framework.dataitem.DataItem;

public class InterfaceLogItem extends DataItem {
	private static final long serialVersionUID = 1L;
	
	protected String transactionId;
	protected String msgId;
	protected String msgType; 
	protected String detailType; 
	protected String transType;
	protected String createTime; 
	protected String applyStatus; 
	protected String applyDate; 
	protected String errMsg; 
	protected String retry;
	protected String errDetailMsg;
	protected String requestMsg;
	protected String responseMsg;
	protected String remark;
	
	
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getMsgId() {
		return msgId;
	}
	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}
	public String getMsgType() {
		return msgType;
	}
	public String getTransType() {
		return transType;
	}
	public String getDetailType() {
		return detailType;
	}
	public void setDetailType(String detailType) {
		this.detailType = detailType;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public void setTransType(String transType) {
		this.transType = transType;
	}
	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getApplyStatus() {
		return applyStatus;
	}
	public void setApplyStatus(String applyStatus) {
		this.applyStatus = applyStatus;
	}
	public String getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}
	public String getErrMsg() {
		return errMsg;
	}
	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}
	public String getRetry() {
		return retry;
	}
	public void setRetry(String retry) {
		this.retry = retry;
	}
	public String getErrDetailMsg() {
		return errDetailMsg;
	}
	public void setErrDetailMsg(String errDetailMsg) {
		this.errDetailMsg = errDetailMsg;
	}
	public String getRequestMsg() {
		
		return (requestMsg==null?null:beautify(requestMsg));
	}
	public void setRequestMsg(String requestMsg) {
		this.requestMsg = requestMsg;
	}
	public String getResponseMsg() {
		return (responseMsg==null?null:beautify(responseMsg));
	}
	public void setResponseMsg(String responseMsg) {
		this.responseMsg = responseMsg;
	}
	private String beautify(String json) {
	    ObjectMapper mapper = new ObjectMapper();
	    Object obj;
		try {
			obj = mapper.readValue(json, Object.class);
			return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
		} catch (Exception e) {
			return json;
		}

	}
}
