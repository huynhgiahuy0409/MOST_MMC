/**
* FreeStoragePeriodItem.java
*
* Created on   : 2007-11-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-11-28   Hugh Lim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Hugh
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class GatheredDataItem extends DataItem {
	private String vslCallId;
	private String bbtCheck;
	private String waiverDescr;
	private String payer;
	private String payerName;
	private String prefix;
	private String tariffType;
	private String tariffTypeName;
	private String tariffCode;
	private String subTariffCode;
	private String tariffDesc;
	private String costCentreCode;
	private String unit1;
	private String unit2;
	private String unit3;
	private String aplyRate;
	private String aplyAmt;
	private String aplyAmtUSD;
	private String stdRate;
	private String status;
	private String statusCd;
	private String invoiceNo;
	private String refNo;
	private String adhocyn;
	private String sytmId;
	private String version;
	private String costcenter;
	private String gatherNo;
	private String scrId;
	private String totalAmt;
	private String gstType;
	private String gstValue;
	private String gstAmt;
	private String gstRegNo;
	private String comRegNo;
	private String tmnlNm;
	private String gstPercent;
	private String rowNum;
	private String exchag;
	private String aplyDate;
	private String chk;
	private String refNo3;
	private String no;
	private String remark;
	
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBbtCheck() {
		return bbtCheck;
	}
	public void setBbtCheck(String bbtCheck) {
		this.bbtCheck = bbtCheck;
	}
	public String getWaiverDescr() {
		return waiverDescr;
	}
	public void setWaiverDescr(String waiverDescr) {
		this.waiverDescr = waiverDescr;
	}
	public String getPayer() {
		return payer;
	}
	public void setPayer(String payer) {
		this.payer = payer;
	}
	public String getPayerName() {
		return payerName;
	}
	public void setPayerName(String payerName) {
		this.payerName = payerName;
	}
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public String getTariffType() {
		return tariffType;
	}
	public void setTariffType(String tariffType) {
		this.tariffType = tariffType;
	}
	public String getTariffTypeName() {
		return tariffTypeName;
	}
	public void setTariffTypeName(String tariffTypeName) {
		this.tariffTypeName = tariffTypeName;
	}
	public String getTariffCode() {
		return tariffCode;
	}
	public void setTariffCode(String tariffCode) {
		this.tariffCode = tariffCode;
	}
	public String getSubTariffCode() {
		return subTariffCode;
	}
	public void setSubTariffCode(String subTariffCode) {
		this.subTariffCode = subTariffCode;
	}
	public String getTariffDesc() {
		return tariffDesc;
	}
	public void setTariffDesc(String tariffDesc) {
		this.tariffDesc = tariffDesc;
	}
	public String getCostCentreCode() {
		return costCentreCode;
	}
	public void setCostCentreCode(String costCentreCode) {
		this.costCentreCode = costCentreCode;
	}
	public String getUnit1() {
		return unit1;
	}
	public void setUnit1(String unit1) {
		this.unit1 = unit1;
	}
	public String getUnit2() {
		return unit2;
	}
	public void setUnit2(String unit2) {
		this.unit2 = unit2;
	}
	public String getUnit3() {
		return unit3;
	}
	public void setUnit3(String unit3) {
		this.unit3 = unit3;
	}
	public String getAplyRate() {
		return aplyRate;
	}
	public void setAplyRate(String aplyRate) {
		this.aplyRate = aplyRate;
	}
	public String getAplyAmt() {
		return aplyAmt;
	}
	public void setAplyAmt(String aplyAmt) {
		this.aplyAmt = aplyAmt;
	}
	public String getAplyAmtUSD() {
		return aplyAmtUSD;
	}
	public void setAplyAmtUSD(String aplyAmtUSD) {
		this.aplyAmtUSD = aplyAmtUSD;
	}
	public String getStdRate() {
		return stdRate;
	}
	public void setStdRate(String stdRate) {
		this.stdRate = stdRate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatusCd() {
		return statusCd;
	}
	public void setStatusCd(String statusCd) {
		this.statusCd = statusCd;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getAdhocyn() {
		return adhocyn;
	}
	public void setAdhocyn(String adhocyn) {
		this.adhocyn = adhocyn;
	}
	public String getSytmId() {
		return sytmId;
	}
	public void setSytmId(String sytmId) {
		this.sytmId = sytmId;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getCostcenter() {
		return costcenter;
	}
	public void setCostcenter(String costcenter) {
		this.costcenter = costcenter;
	}
	public String getGatherNo() {
		return gatherNo;
	}
	public void setGatherNo(String gatherNo) {
		this.gatherNo = gatherNo;
	}
	public String getScrId() {
		return scrId;
	}
	public void setScrId(String scrId) {
		this.scrId = scrId;
	}
	public String getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}
	public String getGstType() {
		return gstType;
	}
	public void setGstType(String gstType) {
		this.gstType = gstType;
	}
	public String getGstValue() {
		return gstValue;
	}
	public void setGstValue(String gstValue) {
		this.gstValue = gstValue;
	}
	public String getGstAmt() {
		return gstAmt;
	}
	public void setGstAmt(String gstAmt) {
		this.gstAmt = gstAmt;
	}
	public String getGstRegNo() {
		return gstRegNo;
	}
	public void setGstRegNo(String gstRegNo) {
		this.gstRegNo = gstRegNo;
	}
	public String getComRegNo() {
		return comRegNo;
	}
	public void setComRegNo(String comRegNo) {
		this.comRegNo = comRegNo;
	}
	public String getTmnlNm() {
		return tmnlNm;
	}
	public void setTmnlNm(String tmnlNm) {
		this.tmnlNm = tmnlNm;
	}
	public String getGstPercent() {
		return gstPercent;
	}
	public void setGstPercent(String gstPercent) {
		this.gstPercent = gstPercent;
	}
	public String getRowNum() {
		return rowNum;
	}
	public void setRowNum(String rowNum) {
		this.rowNum = rowNum;
	}
	public String getExchag() {
		return exchag;
	}
	public void setExchag(String exchag) {
		this.exchag = exchag;
	}
	public String getAplyDate() {
		return aplyDate;
	}
	public void setAplyDate(String aplyDate) {
		this.aplyDate = aplyDate;
	}
	public String getChk() {
		return chk;
	}
	public void setChk(String chk) {
		this.chk = chk;
	}
	public String getRefNo3() {
		return refNo3;
	}
	public void setRefNo3(String refNo3) {
		this.refNo3 = refNo3;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
