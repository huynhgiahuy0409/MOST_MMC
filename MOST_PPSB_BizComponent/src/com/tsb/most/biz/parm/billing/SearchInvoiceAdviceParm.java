/**
* InvoicingAdviceParm.java
*
* Created on   : Dec 5, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 5, 2007   Phan Minh Tuan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author pmtuan
 *
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchInvoiceAdviceParm extends BaseBizParm {
	public String vesselCallingID;
	public String vesselName;
	public String adviceNo;
	public String partnerTypeCode;
	public String partnerCode;
	public String tarrifTypeCode;
	public String operationTypeCode;
	public String commodityCode;
	public String handleAmount;
	public String ackStatusCode;
	public String eta;
	public String etd;
	public String shippingAgent;
	public String loadding;
	public String discharging;
	public String strHlDayYmd;
	private String authority;
	private String ptnrCd;
	private String fromDt;
	private String toDt;

	private String isExisted; /* Y N or NULL */

	// Added by Joseph 11/06/2014
	private String alertYn;
	private String alertTp;

	private String searchType;
	private String advSeq;

	public String getAlertTp() {
		return alertTp;
	}

	public void setAlertTp(String alertTp) {
		this.alertTp = alertTp;
	}

	public String getAlertYn() {
		return alertYn;
	}

	public void setAlertYn(String alertYn) {
		this.alertYn = alertYn;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	String authCd;
	String isAdmin;

	public String getAckStatusCode() {
		return ackStatusCode;
	}

	public void setAckStatusCode(String ackStatusCode) {
		this.ackStatusCode = ackStatusCode;
	}

	public String getAdviceNo() {
		return adviceNo;
	}

	public void setAdviceNo(String adviceNo) {
		this.adviceNo = adviceNo;
	}

	public String getCommodityCode() {
		return commodityCode;
	}

	public void setCommodityCode(String commodityCode) {
		this.commodityCode = commodityCode;
	}

	public String getDischarging() {
		return discharging;
	}

	public void setDischarging(String discharging) {
		this.discharging = discharging;
	}

	public String getEta() {
		return eta;
	}

	public void setEta(String eta) {
		this.eta = eta;
	}

	public String getEtd() {
		return etd;
	}

	public void setEtd(String etd) {
		this.etd = etd;
	}

	public String getHandleAmount() {
		return handleAmount;
	}

	public void setHandleAmount(String handleAmount) {
		this.handleAmount = handleAmount;
	}

	public String getLoadding() {
		return loadding;
	}

	public void setLoadding(String loadding) {
		this.loadding = loadding;
	}

	public String getOperationTypeCode() {
		return operationTypeCode;
	}

	public void setOperationTypeCode(String operationTypeCode) {
		this.operationTypeCode = operationTypeCode;
	}

	public String getPartnerCode() {
		return partnerCode;
	}

	public void setPartnerCode(String partnerCode) {
		this.partnerCode = partnerCode;
	}

	public String getPartnerTypeCode() {
		return partnerTypeCode;
	}

	public void setPartnerTypeCode(String partnerTypeCode) {
		this.partnerTypeCode = partnerTypeCode;
	}

	public String getShippingAgent() {
		return shippingAgent;
	}

	public void setShippingAgent(String shippingAgent) {
		this.shippingAgent = shippingAgent;
	}

	public String getTarrifTypeCode() {
		return tarrifTypeCode;
	}

	public void setTarrifTypeCode(String tarrifTypeCode) {
		this.tarrifTypeCode = tarrifTypeCode;
	}

	public String getVesselCallingID() {
		return vesselCallingID;
	}

	public void setVesselCallingID(String vesselCallingID) {
		this.vesselCallingID = vesselCallingID;
	}

	public String getVesselName() {
		return vesselName;
	}

	public void setVesselName(String vesselName) {
		this.vesselName = vesselName;
	}

	public String getStrHlDayYmd() {
		return strHlDayYmd;
	}

	public void setStrHlDayYmd(String strHlDayYmd) {
		this.strHlDayYmd = strHlDayYmd;
	}

	public String getAuthCd() {
		return authCd;
	}

	public void setAuthCd(String authCd) {
		this.authCd = authCd;
	}

	public String getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(String isAdmin) {
		this.isAdmin = isAdmin;
	}

	public String getIsExisted() {
		return isExisted;
	}

	public void setIsExisted(String isExisted) {
		this.isExisted = isExisted;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getAdvSeq() {
		return advSeq;
	}

	public void setAdvSeq(String advSeq) {
		this.advSeq = advSeq;
	}

	public String getFromDt() {
		return fromDt;
	}

	public void setFromDt(String fromDt) {
		this.fromDt = fromDt;
	}

	public String getToDt() {
		return toDt;
	}

	public void setToDt(String toDt) {
		this.toDt = toDt;
	}
}
