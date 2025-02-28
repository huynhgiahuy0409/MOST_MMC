/**
* TheListOfUnitNoCorrectionItem.java
*
* Created on   : 2021-07-26
* Target OS    : Java VM 1.8
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2021-07-26     nd.hiep 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.monitoring;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class TheListOfUnitNoCorrectionItem extends DataItem {

	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String cgTpNm;
    private String correctedUnitNo;
    private String unitYardLoc;
    private String docNo;
    private String cgNo;
	private String cdNm;
    private String cd;
    private String bookingNo;
    private String snNo;
    private String originalMasterBLBKNo;
    private String originalBLSN;
    private String originalUnitNo;
    
    private String dischargedDate;
    private String inDate;
    private String outDate;
    private String gateInDate;
    private String gateOutDate;
    private String statCd;
    private String statNm;
    private String roroSeq;
    
  //Non-Vessel
    private String fwdCd;
    private String fwdNm;
    
    private ArrayList<TheListOfUnitNoCorrectionItem> blItems;
    private ArrayList<TheListOfUnitNoCorrectionItem> snItems;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getMasterBlNo() {
		return masterBlNo;
	}
	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
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
	public String getCorrectedUnitNo() {
		return correctedUnitNo;
	}
	public void setCorrectedUnitNo(String correctedUnitNo) {
		this.correctedUnitNo = correctedUnitNo;
	}
	public String getUnitYardLoc() {
		return unitYardLoc;
	}
	public void setUnitYardLoc(String unitYardLoc) {
		this.unitYardLoc = unitYardLoc;
	}
	public String getDocNo() {
		return docNo;
	}
	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getOriginalMasterBLBKNo() {
		return originalMasterBLBKNo;
	}
	public void setOriginalMasterBLBKNo(String originalMasterBLBKNo) {
		this.originalMasterBLBKNo = originalMasterBLBKNo;
	}
	public String getOriginalBLSN() {
		return originalBLSN;
	}
	public void setOriginalBLSN(String originalBLSN) {
		this.originalBLSN = originalBLSN;
	}
	public String getOriginalUnitNo() {
		return originalUnitNo;
	}
	public void setOriginalUnitNo(String originalUnitNo) {
		this.originalUnitNo = originalUnitNo;
	}
	public String getDischargedDate() {
		return dischargedDate;
	}
	public void setDischargedDate(String dischargedDate) {
		this.dischargedDate = dischargedDate;
	}
	public String getInDate() {
		return inDate;
	}
	public void setInDate(String inDate) {
		this.inDate = inDate;
	}
	public String getOutDate() {
		return outDate;
	}
	public void setOutDate(String outDate) {
		this.outDate = outDate;
	}
	public String getGateInDate() {
		return gateInDate;
	}
	public void setGateInDate(String gateInDate) {
		this.gateInDate = gateInDate;
	}
	public String getGateOutDate() {
		return gateOutDate;
	}
	public void setGateOutDate(String gateOutDate) {
		this.gateOutDate = gateOutDate;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getStatNm() {
		return statNm;
	}
	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
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
	public ArrayList<TheListOfUnitNoCorrectionItem> getBlItems() {
		return blItems;
	}
	public void setBlItems(ArrayList<TheListOfUnitNoCorrectionItem> blItems) {
		this.blItems = blItems;
	}
	public ArrayList<TheListOfUnitNoCorrectionItem> getSnItems() {
		return snItems;
	}
	public void setSnItems(ArrayList<TheListOfUnitNoCorrectionItem> snItems) {
		this.snItems = snItems;
	}
	
}
