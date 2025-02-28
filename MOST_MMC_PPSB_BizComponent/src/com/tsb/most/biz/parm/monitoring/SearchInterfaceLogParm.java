/**
*
Z* CONFIDENTIAL AND PROPRIETARY SOURCE CODE OF TOTAL SOFT BANK 
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

package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchInterfaceLogParm extends BaseBizParm {
	private static final long serialVersionUID = 1L;
	private String fromDate;
	private String toDate;
	private String status;
	private String msgType;
	private String transType;
	private String request;
	private String response;
	private String sysType;
	
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMsgType() {
		return msgType;
	}
	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}
	public String getTransType() {
		return transType;
	}
	public void setTransType(String transType) {
		this.transType = transType;
	}
	public String getRequest() {
		return request;
	}
	public void setRequest(String request) {
		this.request = request;
	}
	public String getResponse() {
		return response;
	}
	public void setResponse(String response) {
		this.response = response;
	}
	public String getSysType() {
		return sysType;
	}
	public void setSysType(String sysType) {
		this.sysType = sysType;
	}
	
}