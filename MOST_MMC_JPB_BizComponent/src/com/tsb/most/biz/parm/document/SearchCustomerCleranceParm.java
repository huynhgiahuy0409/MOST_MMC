package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCustomerCleranceParm extends BaseBizParm {
	private String searchType;
	private String vslCallId;
	private String divCd;
	private String ptnrCd;
	private String cd;
	private String cdNm;
	private String tyCd;
	private String etaFrom;
	private String etaTo;
	private String cbr;
	private String blNo;
	private String snNo;
	private String startDate;
	private String endDate;
	private String status;
	private String no;
	private String ie;
	private String ieCd;
	private String vslCd;
	private String cnsneCd;

	private int curPage;
	private String pagingSearchType;
	private int pageSize;

	private int test1;
	private int test2;

	public int getTest1() {
		return test1;
	}

	public void setTest1(int test1) {
		this.test1 = test1;
	}

	public int getTest2() {
		return test2;
	}

	public void setTest2(int test2) {
		this.test2 = test2;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public String getPagingSearchType() {
		return pagingSearchType;
	}

	public void setPagingSearchType(String pagingSearchType) {
		this.pagingSearchType = pagingSearchType;
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

	private String scn;
	private String blCbr;

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

	public String getDivCd() {
		return divCd;
	}

	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}

	public String getVslCallId() {
		return vslCallId;
	}

	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}

	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getTyCd() {
		return tyCd;
	}

	public void setTyCd(String tyCd) {
		this.tyCd = tyCd;
	}

	/**
	 * @return Returns the etaFrom.
	 */
	public String getEtaFrom() {
		return etaFrom;
	}

	/**
	 * @param etaFrom The etaFrom to set.
	 */
	public void setEtaFrom(String etaFrom) {
		this.etaFrom = etaFrom;
	}

	/**
	 * @return Returns the etaTo.
	 */
	public String getEtaTo() {
		return etaTo;
	}

	/**
	 * @param etaTo The etaTo to set.
	 */
	public void setEtaTo(String etaTo) {
		this.etaTo = etaTo;
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
	 * @return Returns the endDate.
	 */
	public String getEndDate() {
		return endDate;
	}

	/**
	 * @param endDate The endDate to set.
	 */
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	/**
	 * @return Returns the startDate.
	 */
	public String getStartDate() {
		return startDate;
	}

	/**
	 * @param startDate The startDate to set.
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
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
}
