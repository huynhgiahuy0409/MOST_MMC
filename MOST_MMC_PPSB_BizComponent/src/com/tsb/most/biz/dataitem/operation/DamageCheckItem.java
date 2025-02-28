package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class DamageCheckItem extends DataItem{
	
	private String vslCallId;
	private String scn;
	private String vslCd;
	private String callSeq;
	private String callYear;
	private String seq;
	private String cgNo;
	private String ixCd;
	private String catgCd;
	private String jobNo;
	private String dmgQty;
	private String dmgMt;
	private String dmgM3;
	private String dmgRemark;
	private String dmgPart;
    private String dmgLevel;	
    private String dmgPartNm;
    private String dmgLevelNm;
    private String checkTime;
    private ArrayList<FileUploadItem> uploadItems;
    private ArrayList<DamageCheckItem> items;
    
    private String blNo;
	private String shipgNoteNo;
    private String catgNm;
	private String blSnNo;
	private String checkedDt;
	private String checkedBy;
	private String cgTpCd;
	private String cgTpNm;
	private String shaNm;
	private String shaCd;
	private String fwdCd;
	private String fwdNm;
	
	private String cd;
	private String cdNm;
	private String doGrCd;
	private String doGrNm;
	
	private String mfDocId;
	private String grNo;
	private String sdoNo;
	
	private String blOrSn;
	
	private String lorryNoNm;
	private String lorryNoCd;
	private String searchType;
	private String cmdtGrCd;
	private String cmdtGrpNm;
	private String cmdtCd;
	private String cmdtNm;
	private String eachMt;
	private String eachM3;
	private String docQty;
	private String docMt;
	private String docM3;
	private String actualQty;
	private String actualMt;
	private String pkgQty;
	private String pkgMt;
	
	private String unitNo;
    private String modelCd;
    private String brandCd;
	private String workingStatus;
	private String dmgChkCd;
	private String locCd;
	private String userId;
	private String agentId;
	private String stevedoreId;
	private String pkgNo;
	
	
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getStevedoreId() {
		return stevedoreId;
	}
	public void setStevedoreId(String stevedoreId) {
		this.stevedoreId = stevedoreId;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getDmgChkCd() {
		return dmgChkCd;
	}
	public void setDmgChkCd(String dmgChkCd) {
		this.dmgChkCd = dmgChkCd;
	}
	public String getLocCd() {
		return locCd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getBlOrSn() {
		return blOrSn;
	}
	public void setBlOrSn(String blOrSn) {
		this.blOrSn = blOrSn;
	}
	public String getLorryNoNm() {
		return lorryNoNm;
	}
	public void setLorryNoNm(String lorryNoNm) {
		this.lorryNoNm = lorryNoNm;
	}
	public String getLorryNoCd() {
		return lorryNoCd;
	}
	public void setLorryNoCd(String lorryNoCd) {
		this.lorryNoCd = lorryNoCd;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getCmdtGrCd() {
		return cmdtGrCd;
	}
	public void setCmdtGrCd(String cmdtGrCd) {
		this.cmdtGrCd = cmdtGrCd;
	}
	public String getCmdtGrpNm() {
		return cmdtGrpNm;
	}
	public void setCmdtGrpNm(String cmdtGrpNm) {
		this.cmdtGrpNm = cmdtGrpNm;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getEachMt() {
		return eachMt;
	}
	public void setEachMt(String eachMt) {
		this.eachMt = eachMt;
	}
	public String getEachM3() {
		return eachM3;
	}
	public void setEachM3(String eachM3) {
		this.eachM3 = eachM3;
	}
	public String getDocQty() {
		return docQty;
	}
	public void setDocQty(String docQty) {
		this.docQty = docQty;
	}
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getDocM3() {
		return docM3;
	}
	public void setDocM3(String docM3) {
		this.docM3 = docM3;
	}
	public String getActualQty() {
		return actualQty;
	}
	public void setActualQty(String actualQty) {
		this.actualQty = actualQty;
	}
	public String getActualMt() {
		return actualMt;
	}
	public void setActualMt(String actualMt) {
		this.actualMt = actualMt;
	}
	public String getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(String pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getPkgMt() {
		return pkgMt;
	}
	public void setPkgMt(String pkgMt) {
		this.pkgMt = pkgMt;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getDmgQty() {
		return dmgQty;
	}
	public void setDmgQty(String dmgQty) {
		this.dmgQty = dmgQty;
	}
	public String getDmgMt() {
		return dmgMt;
	}
	public void setDmgMt(String dmgMt) {
		this.dmgMt = dmgMt;
	}
	public String getDmgM3() {
		return dmgM3;
	}
	public void setDmgM3(String dmgM3) {
		this.dmgM3 = dmgM3;
	}
	public String getDmgRemark() {
		return dmgRemark;
	}
	public void setDmgRemark(String dmgRemark) {
		this.dmgRemark = dmgRemark;
	}
	public String getDmgPart() {
		return dmgPart;
	}
	public void setDmgPart(String dmgPart) {
		this.dmgPart = dmgPart;
	}
	public String getDmgLevel() {
		return dmgLevel;
	}
	public void setDmgLevel(String dmgLevel) {
		this.dmgLevel = dmgLevel;
	}
	public String getDmgPartNm() {
		return dmgPartNm;
	}
	public void setDmgPartNm(String dmgPartNm) {
		this.dmgPartNm = dmgPartNm;
	}
	public String getDmgLevelNm() {
		return dmgLevelNm;
	}
	public void setDmgLevelNm(String dmgLevelNm) {
		this.dmgLevelNm = dmgLevelNm;
	}
	public ArrayList<DamageCheckItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<DamageCheckItem> items) {
		this.items = items;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getCatgNm() {
		return catgNm;
	}
	public void setCatgNm(String catgNm) {
		this.catgNm = catgNm;
	}
	public String getBlSnNo() {
		return blSnNo;
	}
	public void setBlSnNo(String blSnNo) {
		this.blSnNo = blSnNo;
	}
	public String getCheckedDt() {
		return checkedDt;
	}
	public void setCheckedDt(String checkedDt) {
		this.checkedDt = checkedDt;
	}
	public String getCheckedBy() {
		return checkedBy;
	}
	public void setCheckedBy(String checkedBy) {
		this.checkedBy = checkedBy;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
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
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public String getDoGrCd() {
		return doGrCd;
	}
	public void setDoGrCd(String doGrCd) {
		this.doGrCd = doGrCd;
	}
	public String getDoGrNm() {
		return doGrNm;
	}
	public void setDoGrNm(String doGrNm) {
		this.doGrNm = doGrNm;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
    
}
