package com.tsb.most.biz.parm.monitoring;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchGatePassListParm extends BaseBizParm {
    
    private String cgNo;
    private String cgInOutCd;
    private int seq;
    private String grNo;
    private String locId;
    private String lorryNo;
    private String gatePassNo;
    private String vslCallId;
    private String scn;
    private String shipgNoteNo;
    private String blNo;
    private String searchType;
    private String delvTpNm;
    private int curPage;
    private String pagingSearchType;
    private int pageSize;
    private String shftId;
    private String shftDt;
    private String shftEndDt;

    private String arrvDtFm;
    private String arrvDtTo; 
    private String hhtFlag;  
    private String startDt;
    private String endDt;
    private String issued;
    private String ptnrCode;
    private String userType;
    private String authority;
    
    private String ConfirmBy;
    private String dateTime;
    private String userId;
    public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	private int test1;
    private int test2;

    private String startRow;
    private String endRow; 
    
    
    public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getShftEndDt() {
        return shftEndDt;
    }
    public void setShftEndDt(String shftEndDt) {
        this.shftEndDt = shftEndDt;
    }
    /**
     * @return Returns the delvTpNm.
     */
    public String getDelvTpNm() {
        return delvTpNm;
    }
    /**
     * @param delvTpNm The delvTpNm to set.
     */
    public void setDelvTpNm(String delvTpNm) {
        this.delvTpNm = delvTpNm;
    }
    
    public String getAuthority() {
        return authority;
    }
    public void setAuthority(String authority) {
        this.authority = authority;
    }
    /**
     * @return Returns the ptnrCode.
     */
    public String getPtnrCode() {
        return ptnrCode;
    }
    /**
     * @param ptnrCode The ptnrCode to set.
     */
    public void setPtnrCode(String ptnrCode) {
        this.ptnrCode = ptnrCode;
    }
    /**
     * @return Returns the userType.
     */
    public String getUserType() {
        return userType;
    }
    /**
     * @param userType The userType to set.
     */
    public void setUserType(String userType) {
        this.userType = userType;
    }
    /**
     * @return Returns the arrvDtFm.
     */
    public String getArrvDtFm() {
        return arrvDtFm;
    }
    /**
     * @param arrvDtFm The arrvDtFm to set.
     */
    public void setArrvDtFm(String arrvDtFm) {
        this.arrvDtFm = arrvDtFm;
    }
    /**
     * @return Returns the arrvDtTo.
     */
    public String getArrvDtTo() {
        return arrvDtTo;
    }
    /**
     * @param arrvDtTo The arrvDtTo to set.
     */
    public void setArrvDtTo(String arrvDtTo) {
        this.arrvDtTo = arrvDtTo;
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
     * @return Returns the cgInOutCd.
     */
    public String getCgInOutCd() {
        return cgInOutCd;
    }
    /**
     * @param cgInOutCd The cgInOutCd to set.
     */
    public void setCgInOutCd(String cgInOutCd) {
        this.cgInOutCd = cgInOutCd;
    }
    /**
     * @return Returns the cgNo.
     */
    public String getCgNo() {
        return cgNo;
    }
    /**
     * @param cgNo The cgNo to set.
     */
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
    }
    /**
     * @return Returns the gatePassNo.
     */
    public String getGatePassNo() {
        return gatePassNo;
    }
    /**
     * @param gatePassNo The gatePassNo to set.
     */
    public void setGatePassNo(String gatePassNo) {
        this.gatePassNo = gatePassNo;
    }
    /**
     * @return Returns the grNo.
     */
    public String getGrNo() {
        return grNo;
    }
    /**
     * @param grNo The grNo to set.
     */
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    /**
     * @return Returns the locId.
     */
    public String getLocId() {
        return locId;
    }
    /**
     * @param locId The locId to set.
     */
    public void setLocId(String locId) {
        this.locId = locId;
    }
    /**
     * @return Returns the lorryNo.
     */
    public String getLorryNo() {
        return lorryNo;
    }
    /**
     * @param lorryNo The lorryNo to set.
     */
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    /**
     * @return Returns the searchType.
     */
    public String getSearchType() {
        return searchType;
    }
    /**
     * @param searchType The searchType to set.
     */
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    /**
     * @return Returns the seq.
     */
    public int getSeq() {
        return seq;
    }
    /**
     * @param seq The seq to set.
     */
    public void setSeq(int seq) {
        this.seq = seq;
    }
    /**
     * @return Returns the shipgNoteNo.
     */
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    /**
     * @param shipgNoteNo The shipgNoteNo to set.
     */
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
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
     * @return Returns the hhtFlag.
     */
    public String getHhtFlag() {
        return hhtFlag;
    }
    /**
     * @param hhtFlag The hhtFlag to set.
     */
    public void setHhtFlag(String hhtFlag) {
        this.hhtFlag = hhtFlag;
    }
    /**
     * @return Returns the endDt.
     */
    public String getEndDt() {
        return endDt;
    }
    /**
     * @param endDt The endDt to set.
     */
    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }
    /**
     * @return Returns the startDt.
     */
    public String getStartDt() {
        return startDt;
    }
    /**
     * @param startDt The startDt to set.
     */
    public void setStartDt(String startDt) {
        this.startDt = startDt;
    }
    /**
     * @return Returns the issued.
     */
    public String getIssued() {
        return issued;
    }
    /**
     * @param issued The issued to set.
     */
    public void setIssued(String issued) {
     if(issued.equals("Y")){
  	      this.issued = "Y";
  	  }else if(issued.equals("true")){
  	      this.issued = "Y";
  	  }else{
  	      this.issued = "N";
  	  }
    }
    public int getCurPage() {
        return curPage;
    }
    public void setCurPage(int curPage) {
        this.curPage = curPage;
    }
    public String getPagingSearchType() {
        return pagingSearchType;
    }
    public void setPagingSearchType(String pagingSearchType) {
        this.pagingSearchType = pagingSearchType;
    }
    public int getPageSize() {
        return pageSize;
    }
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    
    public String getShftDt() {
        return shftDt;
    }
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    
    public String getConfirmBy() {
        return ConfirmBy;
    }
    public void setConfirmBy(String confirmBy) {
        ConfirmBy = confirmBy;
    }
    public String getDateTime() {
        return dateTime;
    }
    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    
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
    public String getEndRow() {
        return endRow;
    }
    public void setEndRow(String endRow) {
        this.endRow = endRow;
    }
    public String getStartRow() {
        return startRow;
    }
    public void setStartRow(String startRow) {
        this.startRow = startRow;
    }
}
