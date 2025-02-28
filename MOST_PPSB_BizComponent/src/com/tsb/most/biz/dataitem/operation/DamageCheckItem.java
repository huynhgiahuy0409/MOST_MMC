package com.tsb.most.biz.dataitem.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class DamageCheckItem extends DataItem{
	
	private String vslCallId;
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
