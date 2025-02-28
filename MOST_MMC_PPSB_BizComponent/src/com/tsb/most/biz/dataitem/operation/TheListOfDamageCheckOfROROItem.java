package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class TheListOfDamageCheckOfROROItem extends DataItem {
	private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String catgCd;
    private String catgNm;
    private String cgTpCd;
    private String cgTpNm;
    private String brandCd;
    private String brandNm;
    private String modelCd;
    private String modelNm;
    private String unitNo;
    private String statNm;
    private String cdNm;
    private String cd;
    private String roroSeq;
    private String loginId;
    
    private String checkedDt;
    private String checkedBy;
    private String shaCd;
    private String shaNm;
    private String fwdCd;
    private String fwdNm;
    private String docNo;
    private String cgNo;
    private String locCd;
    private String dmgPart;
    private String dmgLevel;
    private String remark;
    private String dmgChkCd;
    private String ixCd;
    private String invCd;
    private String invNm;
    private String invDesc;
    private String invCnt;
	/* private String cdNum; */
    private String yardLoc;
    private String inDate;
    private String dmgPartNm;
    private String dmgLevelNm;
    private String locNm;
    private String ixNm;
    private String hhtFlags;
    
    private int dmgDetailCount;
    private int invDetailCount;
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String workingStatus;
    
    private List<Object> roroDataCheckItemDtlList = new ArrayList<Object>();
    private List<Object> roroDataCheckItemInvList = new ArrayList<Object>();
    private ArrayList<TheListOfDamageCheckOfROROItem> items;
    private ArrayList<FileUploadItem> uploadItems;
    
    
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
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
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
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
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
	public String getLocCd() {
		return locCd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
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
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getDmgChkCd() {
		return dmgChkCd;
	}
	public void setDmgChkCd(String dmgChkCd) {
		this.dmgChkCd = dmgChkCd;
	}
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}
	public String getInvCd() {
		return invCd;
	}
	public void setInvCd(String invCd) {
		this.invCd = invCd;
	}
	public String getInvNm() {
		return invNm;
	}
	public void setInvNm(String invNm) {
		this.invNm = invNm;
	}
	public String getInvCnt() {
		return invCnt;
	}
	public void setInvCnt(String invCnt) {
		this.invCnt = invCnt;
	}

	/*
	 * public String getCdNum() { return cdNum; } public void setCdNum(String cdNum)
	 * { this.cdNum = cdNum; }
	 */
	public String getYardLoc() {
		return yardLoc;
	}
	public void setYardLoc(String yardLoc) {
		this.yardLoc = yardLoc;
	}
	public String getStatNm() {
		return statNm;
	}
	public void setStatNm(String statNm) {
		this.statNm = statNm;
	}
	public String getInDate() {
		return inDate;
	}
	public void setInDate(String inDate) {
		this.inDate = inDate;
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
	public String getLocNm() {
		return locNm;
	}
	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}
	public String getIxNm() {
		return ixNm;
	}
	public void setIxNm(String ixNm) {
		this.ixNm = ixNm;
	}
	public int getDmgDetailCount() {
		return dmgDetailCount;
	}
	public void setDmgDetailCount(int dmgDetailCount) {
		this.dmgDetailCount = dmgDetailCount;
	}
	public String getCRUD() {
        return crud;
    }
    public void setCRUD(String workingStatus) {
        this.crud = workingStatus;
    }
	public List<Object> getRoroDataCheckItemDtlList() {
		return roroDataCheckItemDtlList;
	}
	public void setRoroDataCheckItemDtlList(List<Object> roroDataCheckItemDtlList) {
		this.roroDataCheckItemDtlList = roroDataCheckItemDtlList;
	}
	public List<Object> getRoroDataCheckItemInvList() {
		return roroDataCheckItemInvList;
	}
	public void setRoroDataCheckItemInvList(List<Object> roroDataCheckItemInvList) {
		this.roroDataCheckItemInvList = roroDataCheckItemInvList;
	}
	public String getHhtFlags() {
		return hhtFlags;
	}
	public void setHhtFlags(String hhtFlags) {
		this.hhtFlags = hhtFlags;
	}
	public String getInvDesc() {
		return invDesc;
	}
	public void setInvDesc(String invDesc) {
		this.invDesc = invDesc;
	}
	public int getInvDetailCount() {
		return invDetailCount;
	}
	public void setInvDetailCount(int invDetailCount) {
		this.invDetailCount = invDetailCount;
	}
	public ArrayList<TheListOfDamageCheckOfROROItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<TheListOfDamageCheckOfROROItem> items) {
		this.items = items;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	
}
