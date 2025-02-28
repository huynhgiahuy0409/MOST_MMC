package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class TheListOfDamageCheckOfGCItem extends DataItem {
	private String vslCallId;
	private String scn;
	private String bookingNo;
	private String masterBlNo;
	private String blNo;
	private String snNo;
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
	private String lorryNo;
	private int dmgQty;
	private double dmgMt;
	private double dmgM3;

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
	private String cdNum;
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

	private int snDocLength;
	private int snDocWidth;
	private int snDocHeight;
	private int blDocLength;
	private int blDocWidth;
	private int blDocHeight;
	private int actLength;
	private int actWidth;
	private int actHeight;

	private List<Object> roroDataCheckItemDtlList = new ArrayList<Object>();
	private List<Object> roroDataCheckItemInvList = new ArrayList<Object>();
	private ArrayList<TheListOfDamageCheckOfGCItem> items;

	// HHT
	private String mfDocId;
	private String chkLoc;
	private String dmgCount;
	private String cmdtGrpCd;
	private String cmdtGrpNm;
	private String cmdtCd;
	private String cmdtNm;
	private String pkgTpCd;
	private String pkgNo;
	private String pkgTpNm;
	private String marksNo;
	private String descGoods;
	private String cnsne;
	private String cnsneNm;
	private String fileCount;
	private String createBy;
	private String createDt;
	private String updateBy;
	private String updateDt;
	private String seq;
	private String workingStatus;
	private String dmgDesc;
	private String dmgDescNm;
	private String dmgRemark;
	private String docWgt;
	private String docMsrmt;
	private String docQty;
	private String eachWgt;
	private String eachVol;
	private String regNo;
	private String jobNo;

	// Migrate from DimensionCheckGCItem - ADP
	private String grNo;
	private String docLength;
	private String docWidth;
	private String docHeight;
	private String checkTime;
	private String dimensionRemark;
	private String blSnNo;
	private String doGrCd;
	private String doGrNm;
	private String searchType;
	private String cmdtGrCd;
	private String cmdtGrNm;
	private String eachMt;
	private String eachM3;
	private String docMt;
	private String docM3;
	private String sdoNo;
	private String stevedoreId;
	private String agentId;
	private TheListOfDamageCheckOfGCItem vinItem;
	
	
	public String getStevedoreId() {
		return stevedoreId;
	}

	public void setStevedoreId(String stevedoreId) {
		this.stevedoreId = stevedoreId;
	}

	public String getAgentId() {
		return agentId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
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

	// Migrate from DamageCheckGCItem - ADP
    private ArrayList<FileUploadItem> uploadItems;
   
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}

	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}

	public String getGrNo() {
		return grNo;
	}

	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}

	public String getDocLength() {
		return docLength;
	}

	public void setDocLength(String docLength) {
		this.docLength = docLength;
	}

	public String getDocWidth() {
		return docWidth;
	}

	public void setDocWidth(String docWidth) {
		this.docWidth = docWidth;
	}

	public String getDocHeight() {
		return docHeight;
	}

	public void setDocHeight(String docHeight) {
		this.docHeight = docHeight;
	}

	public String getCheckTime() {
		return checkTime;
	}

	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}

	public String getDimensionRemark() {
		return dimensionRemark;
	}

	public void setDimensionRemark(String dimensionRemark) {
		this.dimensionRemark = dimensionRemark;
	}

	public String getBlSnNo() {
		return blSnNo;
	}

	public void setBlSnNo(String blSnNo) {
		this.blSnNo = blSnNo;
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

	public String getCmdtGrNm() {
		return cmdtGrNm;
	}

	public void setCmdtGrNm(String cmdtGrNm) {
		this.cmdtGrNm = cmdtGrNm;
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

	public String getSdoNo() {
		return sdoNo;
	}

	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}

	public TheListOfDamageCheckOfGCItem getVinItem() {
		return vinItem;
	}

	public void setVinItem(TheListOfDamageCheckOfGCItem vinItem) {
		this.vinItem = vinItem;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getBookingNo() {
		return bookingNo;
	}

	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
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

	public String getStatNm() {
		return statNm;
	}

	public void setStatNm(String statNm) {
		this.statNm = statNm;
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

	public String getInvDesc() {
		return invDesc;
	}

	public void setInvDesc(String invDesc) {
		this.invDesc = invDesc;
	}

	public String getInvCnt() {
		return invCnt;
	}

	public void setInvCnt(String invCnt) {
		this.invCnt = invCnt;
	}

	public String getCdNum() {
		return cdNum;
	}

	public void setCdNum(String cdNum) {
		this.cdNum = cdNum;
	}

	public String getYardLoc() {
		return yardLoc;
	}

	public void setYardLoc(String yardLoc) {
		this.yardLoc = yardLoc;
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

	public String getHhtFlags() {
		return hhtFlags;
	}

	public void setHhtFlags(String hhtFlags) {
		this.hhtFlags = hhtFlags;
	}

	public int getDmgDetailCount() {
		return dmgDetailCount;
	}

	public void setDmgDetailCount(int dmgDetailCount) {
		this.dmgDetailCount = dmgDetailCount;
	}

	public int getInvDetailCount() {
		return invDetailCount;
	}

	public void setInvDetailCount(int invDetailCount) {
		this.invDetailCount = invDetailCount;
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

	public ArrayList<TheListOfDamageCheckOfGCItem> getItems() {
		return items;
	}

	public void setItems(ArrayList<TheListOfDamageCheckOfGCItem> items) {
		this.items = items;
	}

	public String getSnNo() {
		return snNo;
	}

	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}

	public String getLorryNo() {
		return lorryNo;
	}

	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}

	public int getDmgQty() {
		return dmgQty;
	}

	public void setDmgQty(int dmgQty) {
		this.dmgQty = dmgQty;
	}

	public double getDmgMt() {
		return dmgMt;
	}

	public void setDmgMt(double dmgMt) {
		this.dmgMt = dmgMt;
	}

	public double getDmgM3() {
		return dmgM3;
	}

	public void setDmgM3(double dmgM3) {
		this.dmgM3 = dmgM3;
	}

	public int getSnDocLength() {
		return snDocLength;
	}

	public void setSnDocLength(int snDocLength) {
		this.snDocLength = snDocLength;
	}

	public int getSnDocWidth() {
		return snDocWidth;
	}

	public void setSnDocWidth(int snDocWidth) {
		this.snDocWidth = snDocWidth;
	}

	public int getSnDocHeight() {
		return snDocHeight;
	}

	public void setSnDocHeight(int snDocHeight) {
		this.snDocHeight = snDocHeight;
	}

	public int getBlDocLength() {
		return blDocLength;
	}

	public void setBlDocLength(int blDocLength) {
		this.blDocLength = blDocLength;
	}

	public int getBlDocWidth() {
		return blDocWidth;
	}

	public void setBlDocWidth(int blDocWidth) {
		this.blDocWidth = blDocWidth;
	}

	public int getBlDocHeight() {
		return blDocHeight;
	}

	public void setBlDocHeight(int blDocHeight) {
		this.blDocHeight = blDocHeight;
	}

	public int getActLength() {
		return actLength;
	}

	public void setActLength(int actLength) {
		this.actLength = actLength;
	}

	public int getActWidth() {
		return actWidth;
	}

	public void setActWidth(int actWidth) {
		this.actWidth = actWidth;
	}

	public int getActHeight() {
		return actHeight;
	}

	public void setActHeight(int actHeight) {
		this.actHeight = actHeight;
	}

	public String getMfDocId() {
		return mfDocId;
	}

	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}

	public String getChkLoc() {
		return chkLoc;
	}

	public void setChkLoc(String chkLoc) {
		this.chkLoc = chkLoc;
	}

	public String getDmgCount() {
		return dmgCount;
	}

	public void setDmgCount(String dmgCount) {
		this.dmgCount = dmgCount;
	}

	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}

	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
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

	public String getPkgTpCd() {
		return pkgTpCd;
	}

	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}

	public String getPkgTpNm() {
		return pkgTpNm;
	}

	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}

	public String getMarksNo() {
		return marksNo;
	}

	public void setMarksNo(String marksNo) {
		this.marksNo = marksNo;
	}

	public String getDescGoods() {
		return descGoods;
	}

	public void setDescGoods(String descGoods) {
		this.descGoods = descGoods;
	}

	public String getCnsne() {
		return cnsne;
	}

	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}

	public String getCnsneNm() {
		return cnsneNm;
	}

	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}

	public String getFileCount() {
		return fileCount;
	}

	public void setFileCount(String fileCount) {
		this.fileCount = fileCount;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public String getCreateDt() {
		return createDt;
	}

	public void setCreateDt(String createDt) {
		this.createDt = createDt;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public String getUpdateDt() {
		return updateDt;
	}

	public void setUpdateDt(String updateDt) {
		this.updateDt = updateDt;
	}

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}

	public String getDmgDesc() {
		return dmgDesc;
	}

	public void setDmgDesc(String dmgDesc) {
		this.dmgDesc = dmgDesc;
	}

	public String getDocWgt() {
		return docWgt;
	}

	public void setDocWgt(String docWgt) {
		this.docWgt = docWgt;
	}

	public String getDocMsrmt() {
		return docMsrmt;
	}

	public void setDocMsrmt(String docMsrmt) {
		this.docMsrmt = docMsrmt;
	}

	public String getDocQty() {
		return docQty;
	}

	public void setDocQty(String docQty) {
		this.docQty = docQty;
	}

	public String getEachWgt() {
		return eachWgt;
	}

	public void setEachWgt(String eachWgt) {
		this.eachWgt = eachWgt;
	}

	public String getEachVol() {
		return eachVol;
	}

	public void setEachVol(String eachVol) {
		this.eachVol = eachVol;
	}

	public String getRegNo() {
		return regNo;
	}

	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	public String getJobNo() {
		return jobNo;
	}

	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}

	public String getDmgRemark() {
		return dmgRemark;
	}

	public void setDmgRemark(String dmgRemark) {
		this.dmgRemark = dmgRemark;
	}

	public String getDmgDescNm() {
		return dmgDescNm;
	}

	public void setDmgDescNm(String dmgDescNm) {
		this.dmgDescNm = dmgDescNm;
	}

}
