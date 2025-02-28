package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBLParm extends BaseBizParm{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String docId;
	private String jobNo;
	private String inOutType;
	private String blDocId;
	private String mfDocId;
	private String mfJobNo;
	private String blJobNo;
	private String regNo;
	private String jpvcNo;
	private String vslCallId;
	private String scn;
	private String vslCd;
	private String callYear;
	private String callSeq;
	private String blNo;
	private String hblNo;
	private String docStatCd;
	private String userDefNo;
	private String docStatFromDate;
	private String docStatToDate;
	private String nilMfYn;
	private String jpvcAssigned;
	private String cgInOutTp;
	private String cntrNo;
	private String ptnrCd;
	private String catgCd;
    private String orgBlNo;
    private String splitChk;
    private String shaCd;
    private String pkgRmk;
    private String extUserCNSCd;
    private String sdoNo;
    private String doNo;
    
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getNilMfYn() {
	    return nilMfYn;
	}
	public void setNilMfYn(String nilMfYn) {
	    this.nilMfYn = nilMfYn;
	}
	public String getJpvcAssigned() {
	    return jpvcAssigned;
	}
	public void setJpvcAssigned(String jpvcAssigned) {
	    this.jpvcAssigned = jpvcAssigned;
	}
	public String getInOutType() {
	    return inOutType;
	}
	public void setInOutType(String inOutType) {
	    this.inOutType = inOutType;
	}
	public String getBlDocId() {
	    return blDocId;
	}
	public void setBlDocId(String blDocId) {
	    this.blDocId = blDocId;
	}
	public String getMfJobNo() {
	    return mfJobNo;
	}
	public void setMfJobNo(String mfJobNo) {
	    this.mfJobNo = mfJobNo;
	}
	public String getBlJobNo() {
	    return blJobNo;
	}
	public void setBlJobNo(String blJobNo) {
	    this.blJobNo = blJobNo;
	}
	public String getRegNo() {
	    return regNo;
	}
	public void setRegNo(String regNo) {
	    this.regNo = regNo;
	}
	public String getJpvcNo() {
	    return jpvcNo;
	}
	public void setJpvcNo(String jpvcNo) {
	    this.jpvcNo = jpvcNo;
	}
	public String getScn() {
	    return scn;
	}
	public void setScn(String scn) {
	    this.scn = scn;
	}
	public String getVslCd() {
	    return vslCd;
	}
	public void setVslCd(String vslCd) {
	    this.vslCd = vslCd;
	}
	public String getBlNo() {
	    return blNo;
	}
	public void setBlNo(String blNo) {
	    this.blNo = blNo;
	}
	public String getDocStatCd() {
	    return docStatCd;
	}
	public void setDocStatCd(String docStatCd) {
	    this.docStatCd = docStatCd;
	}
	public String getUserDefNo() {
	    return userDefNo;
	}
	public void setUserDefNo(String userDefNo) {
	    this.userDefNo = userDefNo;
	}
	public String getDocStatFromDate() {
	    return docStatFromDate;
	}
	public void setDocStatFromDate(String docStatFromDate) {
	    this.docStatFromDate = docStatFromDate;
	}
	public String getDocStatToDate() {
	    return docStatToDate;
	}
	public void setDocStatToDate(String docStatToDate) {
	    this.docStatToDate = docStatToDate;
	}
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getHblNo() {
		return hblNo;
	}
	public void setHblNo(String hblNo) {
		this.hblNo = hblNo;
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
	public String getCgInOutTp() {
		return cgInOutTp;
	}
	public void setCgInOutTp(String cgInOutTp) {
		this.cgInOutTp = cgInOutTp;
	}
	public String getCntrNo() {
		return cntrNo;
	}
	public void setCntrNo(String cntrNo) {
		this.cntrNo = cntrNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public String getOrgBlNo() {
		return orgBlNo;
	}
	public void setOrgBlNo(String orgBlNo) {
		this.orgBlNo = orgBlNo;
	}
	public String getSplitChk() {
		return splitChk;
	}
	public void setSplitChk(String splitChk) {
		this.splitChk = splitChk;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getPkgRmk() {
		return pkgRmk;
	}
	public void setPkgRmk(String pkgRmk) {
		this.pkgRmk = pkgRmk;
	}
	public String getExtUserCNSCd() {
		return extUserCNSCd;
	}
	public void setExtUserCNSCd(String extUserCNSCd) {
		this.extUserCNSCd = extUserCNSCd;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	
}
