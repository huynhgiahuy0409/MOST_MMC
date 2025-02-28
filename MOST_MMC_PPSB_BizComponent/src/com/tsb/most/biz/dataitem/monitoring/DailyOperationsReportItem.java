package com.tsb.most.biz.dataitem.monitoring;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class DailyOperationsReportItem extends DataItem {
	
	private String vslCallId;
	private String vslNm;
	private String voyage;
	private String mfDocId;
	
    private String shipgNoteNo;
    private String blNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String cgTpNm;
    private String delvTpCd;
    private String delvTpNm;
    private String atb;
    
    private String shaCd;
    private String shaNm;
    private String fwdCd;
    private String fwdNm;
    private String cnsneNm;
    private String shprNm;
    private String berthNm;
    private String addr;
    private String remark;
    
    private String docWgt;			//Declared weight /Ton
    private String totalOprWgt;		//Total operations weight /Ton
    private String dailyOprWgt;		//Daily operations weight /Ton
    private String balanceWgt;		//Balance weight (Ton)
    
    private String startDate;
    private String endDate;
    private String rsnCdNm;
    private String vslOpeRmk;
    private String totalHrs;
    
    
    
	public String getBerthNm() {
		return berthNm;
	}
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getVoyage() {
		return voyage;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getCatgNm() {
		return catgNm;
	}
	public void setCatgNm(String catgNm) {
		this.catgNm = catgNm;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getVslOpeRmk() {
		return vslOpeRmk;
	}
	public void setVslOpeRmk(String vslOpeRmk) {
		this.vslOpeRmk = vslOpeRmk;
	}
	public String getTotalHrs() {
		return totalHrs;
	}
	public void setTotalHrs(String totalHrs) {
		this.totalHrs = totalHrs;
	}
	public String getRsnCdNm() {
		return rsnCdNm;
	}
	public void setRsnCdNm(String rsnCdNm) {
		this.rsnCdNm = rsnCdNm;
	}
	public String getDocWgt() {
		return docWgt;
	}
	public void setDocWgt(String docWgt) {
		this.docWgt = docWgt;
	}
	public String getTotalOprWgt() {
		return totalOprWgt;
	}
	public void setTotalOprWgt(String totalOprWgt) {
		this.totalOprWgt = totalOprWgt;
	}
	public String getDailyOprWgt() {
		return dailyOprWgt;
	}
	public void setDailyOprWgt(String dailyOprWgt) {
		this.dailyOprWgt = dailyOprWgt;
	}
	public String getBalanceWgt() {
		return balanceWgt;
	}
	public void setBalanceWgt(String balanceWgt) {
		this.balanceWgt = balanceWgt;
	}
	public String getShprNm() {
		return shprNm;
	}
	public void setShprNm(String shprNm) {
		this.shprNm = shprNm;
	}
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
    
    
}