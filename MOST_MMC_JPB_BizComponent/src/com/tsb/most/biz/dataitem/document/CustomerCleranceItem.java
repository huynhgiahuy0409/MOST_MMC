package com.tsb.most.biz.dataitem.document;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CustomerCleranceItem extends DataItem {
	private String vslCallId;
	private String jobNo;
	private String docStatCd;
	private String jobNoBl1;
	private String docStatCdBl1;
	private String jobNoMf1;
	private String docStatCdMf1;
	private String jobNoCg1;
	private String docStatCdCg1;
	private String blNo;
	private String blNoNm;
	private String status;
	private String dgYn;
	private String dgStatus;
	private String regNo;
	private String regNoMf1;
	private String blRegNo;
	private String cbr;
	private String snNo;
	private String snNoNm;
	private String vslNm;
	private String no;
	private String ieCd;
	private String vslCd;
	private String cnsneCd;
	private String releaseNo;
	private String customsAprvStat;
	private String mfDocId;

	/**
	 * @Paging
	 */
	private String curPage;
	private String rn;
	private String totalPage;
	private List SnList;
	private List BlList;

	public String getCurPage() {
		return curPage;
	}

	public void setCurPage(String curPage) {
		this.curPage = curPage;
	}

	public String getRn() {
		return rn;
	}

	public void setRn(String rn) {
		this.rn = rn;
	}

	public String getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(String totalPage) {
		this.totalPage = totalPage;
	}

	/**
	 * @return Returns the no.
	 */
	public String getNo() {
		return no;
	}

	/**
	 * @param no The no to set.
	 */
	public void setNo(String no) {
		this.no = no;
	}

	/**
	 * @return Returns the statusBk.
	 */
	public String getStatusBk() {
		return statusBk;
	}

	/**
	 * @param statusBk The statusBk to set.
	 */
	public void setStatusBk(String statusBk) {
		this.statusBk = statusBk;
	}

	private String scn;
	private String blCbr;
	private String ie;
	private String mt;
	private String pol;
	private String pod;
	private String statusBk;

	/**
	 * @return Returns the blCbr.
	 */
	public String getBlCbr() {
		return blCbr;
	}

	/**
	 * @param blCbr The blCbr to set.
	 */
	public void setBlCbr(String blCbr) {
		this.blCbr = blCbr;
	}

	/**
	 * @return Returns the createdBy.
	 */
	public String getCreatedBy() {
		return createdBy;
	}

	/**
	 * @param createdBy The createdBy to set.
	 */
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	/**
	 * @return Returns the custDeclNo.
	 */
	public String getCustDeclNo() {
		return custDeclNo;
	}

	/**
	 * @param custDeclNo The custDeclNo to set.
	 */
	public void setCustDeclNo(String custDeclNo) {
		this.custDeclNo = custDeclNo;
	}

	/**
	 * @return Returns the ediTransDate.
	 */
	public String getEdiTransDate() {
		return ediTransDate;
	}

	/**
	 * @param ediTransDate The ediTransDate to set.
	 */
	public void setEdiTransDate(String ediTransDate) {
		this.ediTransDate = ediTransDate;
	}

	/**
	 * @return Returns the ie.
	 */
	public String getIe() {
		return ie;
	}

	/**
	 * @param ie The ie to set.
	 */
	public void setIe(String ie) {
		this.ie = ie;
	}

	/**
	 * @return Returns the mt.
	 */
	public String getMt() {
		return mt;
	}

	/**
	 * @param mt The mt to set.
	 */
	public void setMt(String mt) {
		this.mt = mt;
	}

	/**
	 * @return Returns the pod.
	 */
	public String getPod() {
		return pod;
	}

	/**
	 * @param pod The pod to set.
	 */
	public void setPod(String pod) {
		this.pod = pod;
	}

	/**
	 * @return Returns the pol.
	 */
	public String getPol() {
		return pol;
	}

	/**
	 * @param pol The pol to set.
	 */
	public void setPol(String pol) {
		this.pol = pol;
	}

	/**
	 * @return Returns the scn.
	 */
	public String getScn() {
		return scn;
	}

	/**
	 * @param scn The scn to set.
	 */
	public void setScn(String scn) {
		this.scn = scn;
	}

	/**
	 * @return Returns the vslNm.
	 */
	public String getVslNm() {
		return vslNm;
	}

	/**
	 * @param vslNm The vslNm to set.
	 */
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	private String custDeclNo;
	private String custDeclNoBk;

	/**
	 * @return Returns the custDeclNoBk.
	 */
	public String getCustDeclNoBk() {
		return custDeclNoBk;
	}

	/**
	 * @param custDeclNoBk The custDeclNoBk to set.
	 */
	public void setCustDeclNoBk(String custDeclNoBk) {
		this.custDeclNoBk = custDeclNoBk;
	}

	private String createdBy;
	private String ediTransDate;
	private String modifiedBy;
	private String modifiedDate;

	/**
	 * @return Returns the blRegNo.
	 */
	public String getBlRegNo() {
		return blRegNo;
	}

	/**
	 * @param blRegNo The blRegNo to set.
	 */
	public void setBlRegNo(String blRegNo) {
		this.blRegNo = blRegNo;
	}

	/**
	 * @return Returns the regNo.
	 */
	public String getRegNo() {
		return regNo;
	}

	/**
	 * @param regNo The regNo to set.
	 */
	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}

	/**
	 * @return Returns the regNoMf1.
	 */
	public String getRegNoMf1() {
		return regNoMf1;
	}

	/**
	 * @param regNoMf1 The regNoMf1 to set.
	 */
	public void setRegNoMf1(String regNoMf1) {
		this.regNoMf1 = regNoMf1;
	}

	/**
	 * @return Returns the blNo.
	 */
	public String getBlNo() {
		return blNo;
	}

	/**
	 * @param blNo The blNo to set.
	 */
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}

	/**
	 * @return Returns the dgStatus.
	 */
	public String getDgStatus() {
		return dgStatus;
	}

	/**
	 * @param dgStatus The dgStatus to set.
	 */
	public void setDgStatus(String dgStatus) {
		this.dgStatus = dgStatus;
	}

	/**
	 * @return Returns the dgYn.
	 */
	public String getDgYn() {
		return dgYn;
	}

	/**
	 * @param dgYn The dgYn to set.
	 */
	public void setDgYn(String dgYn) {
		this.dgYn = dgYn;
	}

	/**
	 * @return Returns the docStatCd.
	 */
	public String getDocStatCd() {
		return docStatCd;
	}

	/**
	 * @param docStatCd The docStatCd to set.
	 */
	public void setDocStatCd(String docStatCd) {
		this.docStatCd = docStatCd;
	}

	/**
	 * @return Returns the docStatCdBl1.
	 */
	public String getDocStatCdBl1() {
		return docStatCdBl1;
	}

	/**
	 * @param docStatCdBl1 The docStatCdBl1 to set.
	 */
	public void setDocStatCdBl1(String docStatCdBl1) {
		this.docStatCdBl1 = docStatCdBl1;
	}

	/**
	 * @return Returns the docStatCdCg1.
	 */
	public String getDocStatCdCg1() {
		return docStatCdCg1;
	}

	/**
	 * @param docStatCdCg1 The docStatCdCg1 to set.
	 */
	public void setDocStatCdCg1(String docStatCdCg1) {
		this.docStatCdCg1 = docStatCdCg1;
	}

	/**
	 * @return Returns the docStatCdMf1.
	 */
	public String getDocStatCdMf1() {
		return docStatCdMf1;
	}

	/**
	 * @param docStatCdMf1 The docStatCdMf1 to set.
	 */
	public void setDocStatCdMf1(String docStatCdMf1) {
		this.docStatCdMf1 = docStatCdMf1;
	}

	/**
	 * @return Returns the jobNo.
	 */
	public String getJobNo() {
		return jobNo;
	}

	/**
	 * @param jobNo The jobNo to set.
	 */
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}

	/**
	 * @return Returns the jobNoBl1.
	 */
	public String getJobNoBl1() {
		return jobNoBl1;
	}

	/**
	 * @param jobNoBl1 The jobNoBl1 to set.
	 */
	public void setJobNoBl1(String jobNoBl1) {
		this.jobNoBl1 = jobNoBl1;
	}

	/**
	 * @return Returns the jobNoCg1.
	 */
	public String getJobNoCg1() {
		return jobNoCg1;
	}

	/**
	 * @param jobNoCg1 The jobNoCg1 to set.
	 */
	public void setJobNoCg1(String jobNoCg1) {
		this.jobNoCg1 = jobNoCg1;
	}

	/**
	 * @return Returns the jobNoMf1.
	 */
	public String getJobNoMf1() {
		return jobNoMf1;
	}

	/**
	 * @param jobNoMf1 The jobNoMf1 to set.
	 */
	public void setJobNoMf1(String jobNoMf1) {
		this.jobNoMf1 = jobNoMf1;
	}

	/**
	 * @return Returns the status.
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status The status to set.
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	/**
	 * @return Returns the vslCallId.
	 */
	public String getVslCallId() {
		return vslCallId;
	}

	/**
	 * @param vslCallId The vslCallId to set.
	 */
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	/**
	 * @return Returns the cbr.
	 */
	public String getCbr() {
		return cbr;
	}

	/**
	 * @param cbr The cbr to set.
	 */
	public void setCbr(String cbr) {
		this.cbr = cbr;
	}

	/**
	 * @return Returns the snNo.
	 */
	public String getSnNo() {
		return snNo;
	}

	/**
	 * @param snNo The snNo to set.
	 */
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}

	/**
	 * @return Returns the ieCd.
	 */
	public String getIeCd() {
		return ieCd;
	}

	/**
	 * @param ieCd The ieCd to set.
	 */
	public void setIeCd(String ieCd) {
		this.ieCd = ieCd;
	}

	/**
	 * @return Returns the vslCd.
	 */
	public String getVslCd() {
		return vslCd;
	}

	/**
	 * @param vslCd The vslCd to set.
	 */
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}

	/**
	 * @return Returns the cnsneCd.
	 */
	public String getCnsneCd() {
		return cnsneCd;
	}

	/**
	 * @param cnsneCd The cnsneCd to set.
	 */
	public void setCnsneCd(String cnsneCd) {
		this.cnsneCd = cnsneCd;
	}

	/**
	 * @return Returns the modifiedBy.
	 */
	public String getModifiedBy() {
		return modifiedBy;
	}

	/**
	 * @param modifiedBy The modifiedBy to set.
	 */
	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	/**
	 * @return Returns the modifiedDate.
	 */
	public String getModifiedDate() {
		return modifiedDate;
	}

	/**
	 * @param modifiedDate The modifiedDate to set.
	 */
	public void setModifiedDate(String modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public String getCustomsAprvStat() {
		return customsAprvStat;
	}

	public void setCustomsAprvStat(String customsAprvStat) {
		this.customsAprvStat = customsAprvStat;
	}

	public String getReleaseNo() {
		return releaseNo;
	}

	public void setReleaseNo(String releaseNo) {
		this.releaseNo = releaseNo;
	}

	public List getSnList() {
		return SnList;
	}

	public void setSnList(List snList) {
		SnList = snList;
	}

	public List getBlList() {
		return BlList;
	}

	public void setBlList(List blList) {
		BlList = blList;
	}

	public String getBlNoNm() {
		return blNoNm;
	}

	public void setBlNoNm(String blNoNm) {
		this.blNoNm = blNoNm;
	}

	public String getSnNoNm() {
		return snNoNm;
	}

	public void setSnNoNm(String snNoNm) {
		this.snNoNm = snNoNm;
	}

	public String getMfDocId() {
		return mfDocId;
	}

	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}

}
