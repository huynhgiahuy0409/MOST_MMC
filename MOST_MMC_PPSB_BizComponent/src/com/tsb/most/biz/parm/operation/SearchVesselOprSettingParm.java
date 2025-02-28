/**
* SearchEquipmentSettingParm.java
*
* Created on   : 2022-03-07
* Target OS    : Java VM 1.8 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2022-03-07     nd.hiep 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.operation;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchVesselOprSettingParm extends BaseBizParm {
	
	private String vslCallId;
	private String scn;
    private String workYmd;
    private String shift;
    private String cgTpCd;
    private String vslCd;
    private String vslNm;
    private String inbVoy;
    private String outbVoy;
    private String shipgAgnt;
    private String eta;
    private String etd;
    private String berthLoc;
    private String storageLoc;
    private String scnNo;
    private String searchType;
    private String insertType;
    private String eqTpCd;
    private String rsDivCd;
    private String shftNm;
    private String workComp;
    private String useYN;
    private String strDate;
    private String endDate;
    private String vslShiftingSeq;
    private String shftId;
    private String hatchDrtCd;
    private String workStDt;
    private String workEndDt;
    private String hatchNo;
    private String eqFacNo;
    private String previewType;
    private String reportId;
    private String seq;
  
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getShift() {
		return shift;
	}
	public void setShift(String shift) {
		this.shift = shift;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getInbVoy() {
		return inbVoy;
	}
	public void setInbVoy(String inbVoy) {
		this.inbVoy = inbVoy;
	}
	public String getOutbVoy() {
		return outbVoy;
	}
	public void setOutbVoy(String outbVoy) {
		this.outbVoy = outbVoy;
	}
	public String getShipgAgnt() {
		return shipgAgnt;
	}
	public void setShipgAgnt(String shipgAgnt) {
		this.shipgAgnt = shipgAgnt;
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
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getStorageLoc() {
		return storageLoc;
	}
	public void setStorageLoc(String storageLoc) {
		this.storageLoc = storageLoc;
	}
	public String getScnNo() {
		return scnNo;
	}
	public void setScnNo(String scnNo) {
		this.scnNo = scnNo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getInsertType() {
		return insertType;
	}
	public void setInsertType(String insertType) {
		this.insertType = insertType;
	}
	public String getEqTpCd() {
		return eqTpCd;
	}
	public void setEqTpCd(String eqTpCd) {
		this.eqTpCd = eqTpCd;
	}
	public String getRsDivCd() {
		return rsDivCd;
	}
	public void setRsDivCd(String rsDivCd) {
		this.rsDivCd = rsDivCd;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getWorkComp() {
		return workComp;
	}
	public void setWorkComp(String workComp) {
		this.workComp = workComp;
	}
	public String getUseYN() {
		return useYN;
	}
	public void setUseYN(String useYN) {
		this.useYN = useYN;
	}
	public String getStrDate() {
		return strDate;
	}
	public void setStrDate(String strDate) {
		this.strDate = strDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getVslShiftingSeq() {
		return vslShiftingSeq;
	}
	public void setVslShiftingSeq(String vslShiftingSeq) {
		this.vslShiftingSeq = vslShiftingSeq;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getHatchDrtCd() {
		return hatchDrtCd;
	}
	public void setHatchDrtCd(String hatchDrtCd) {
		this.hatchDrtCd = hatchDrtCd;
	}
	public String getWorkStDt() {
		return workStDt;
	}
	public void setWorkStDt(String workStDt) {
		this.workStDt = workStDt;
	}
	public String getWorkEndDt() {
		return workEndDt;
	}
	public void setWorkEndDt(String workEndDt) {
		this.workEndDt = workEndDt;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getEqFacNo() {
		return eqFacNo;
	}
	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}
	public String getPreviewType() {
		return previewType;
	}
	public void setPreviewType(String previewType) {
		this.previewType = previewType;
	}
	public String getReportId() {
		return reportId;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
