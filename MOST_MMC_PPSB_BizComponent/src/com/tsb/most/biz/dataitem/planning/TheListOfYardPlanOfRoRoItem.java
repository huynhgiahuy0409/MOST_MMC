/**
* RoRoYardPlanItem.java
*
* Created on   : 2020-06-07
* Target OS    : Java VM 1.8 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           	AUTHOR      	   	REVISION    	
* 2020-06-07  		nd.hiep   			First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class TheListOfYardPlanOfRoRoItem extends DataItem {
	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String cgTpNm;
    private String delvTpCd;
    private String delvTpNm;
    private String doNo;
    private String sdoNo;
    private String nosOfUnit;
    private String remainUnit;
    private String brandCd;
    private String brandNm;
    private String modelCd;
    private String modelNm;
    private String unitNo;
    private String yardLoc;
    private String cdNm;
    private String cd;
    private String roroSeq;
    private String inDate;
    private String outDate;
    private String loginId;
    private String statCd;
    private String jobPurpCd;
    private String ioMode;
    private String ioSeq;
    private String statNm;
    private String plannedQty;
    private String yardId;
    private String plannedBy;
    private String plannedDtm;
    
    private String shaCd;
    private String shaNm;
    private String fwdCd;
    private String fwdNm;

    private String docNo;
    private String cgNo;
    
    private ArrayList<TheListOfYardPlanOfRoRoItem> cargoItems;
    private ArrayList<TheListOfYardPlanOfRoRoItem> unitItems;
    private ArrayList<TheListOfYardPlanOfRoRoItem> plannedItems;
    private ArrayList<TheListOfYardPlanOfRoRoItem> blItems;
    private ArrayList<TheListOfYardPlanOfRoRoItem> snItems;
    
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
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getNosOfUnit() {
		return nosOfUnit;
	}
	public void setNosOfUnit(String nosOfUnit) {
		this.nosOfUnit = nosOfUnit;
	}
	public String getRemainUnit() {
		return remainUnit;
	}
	public void setRemainUnit(String remainUnit) {
		this.remainUnit = remainUnit;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getBrandNm() {
		return brandNm;
	}
	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getModelNm() {
		return modelNm;
	}
	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getYardLoc() {
		return yardLoc;
	}
	public void setYardLoc(String yardLoc) {
		this.yardLoc = yardLoc;
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
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
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
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getIoMode() {
		return ioMode;
	}
	public void setIoMode(String ioMode) {
		this.ioMode = ioMode;
	}
	public String getIoSeq() {
		return ioSeq;
	}
	public void setIoSeq(String ioSeq) {
		this.ioSeq = ioSeq;
	}
	public String getStatNm() {
		return statNm;
	}
	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}

	public String getPlannedQty() {
		return plannedQty;
	}
	public void setPlannedQty(String plannedQty) {
		this.plannedQty = plannedQty;
	}
	public String getYardId() {
		return yardId;
	}
	public void setYardId(String yardId) {
		this.yardId = yardId;
	}
	public String getPlannedBy() {
		return plannedBy;
	}
	public void setPlannedBy(String plannedBy) {
		this.plannedBy = plannedBy;
	}
	public String getPlannedDtm() {
		return plannedDtm;
	}
	public void setPlannedDtm(String plannedDtm) {
		this.plannedDtm = plannedDtm;
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
	public ArrayList<TheListOfYardPlanOfRoRoItem> getCargoItems() {
		return cargoItems;
	}
	public void setCargoItems(ArrayList<TheListOfYardPlanOfRoRoItem> cargoItems) {
		this.cargoItems = cargoItems;
	}
	public ArrayList<TheListOfYardPlanOfRoRoItem> getUnitItems() {
		return unitItems;
	}
	public void setUnitItems(ArrayList<TheListOfYardPlanOfRoRoItem> unitItems) {
		this.unitItems = unitItems;
	}
	public ArrayList<TheListOfYardPlanOfRoRoItem> getPlannedItems() {
		return plannedItems;
	}
	public void setPlannedItems(ArrayList<TheListOfYardPlanOfRoRoItem> plannedItems) {
		this.plannedItems = plannedItems;
	}
	public ArrayList<TheListOfYardPlanOfRoRoItem> getBlItems() {
		return blItems;
	}
	public void setBlItems(ArrayList<TheListOfYardPlanOfRoRoItem> blItems) {
		this.blItems = blItems;
	}
	public ArrayList<TheListOfYardPlanOfRoRoItem> getSnItems() {
		return snItems;
	}
	public void setSnItems(ArrayList<TheListOfYardPlanOfRoRoItem> snItems) {
		this.snItems = snItems;
	}
 
}
