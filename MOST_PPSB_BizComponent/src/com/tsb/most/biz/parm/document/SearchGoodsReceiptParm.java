/**
 * GoodsReceiptParm.java
 *
 * Created on   : 2007-08-09
 * Target OS    : Java VM 1.4.2 
 * CVS revision : $Revision: 1.1 $ 
 *
 * ------------------------------
 * CHANGE REVISION
 * ------------------------------
 * DATE           AUTHOR      	   REVISION    	
 * 2007-08-09     Mr Sunny Kim 1.0    First release.
 * -------------------------------
 * CLASS DESCRIPTION
 * -------------------------------
 *
 */
package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchGoodsReceiptParm extends BaseBizParm {

    private String vslCallId;

    private String shipgNoteNo;

    private String delvTpCd;

    private String vslCd;

    private String vslNm;

    private String eta;

    private String etd;

    private String shipgAgnt;

    private String berthLoc;

    private String gdsRecvNo;

    private String tsptTpCd;

    private String searchType;

    private String ptnrCd;

    private String authority;

    private String arrvDtFm;

    private String arrvDtTo;

    private String fwrd;

    private String pageId;

    private String opType;// Operation Screen Type

    private String hhtFlag;//

    private String gateInOut;// In : I, Out : O

    private String statCd;

    private String authUsrId;

    // For paging
    private int curPage;

    private String pagingSearchType;

    private int pageSize;

    //added by William (2015/07/21 - HHT) Mantis issue 49799
    private String lorryNo;
    private String driverId;
    
    private String startRow;
    private String endRow; 
    
    //added by Brian (to check for report No)
    private String rptNo;
    private String generateType;
    private String userId;
    private String balanceQty;
    private String balanceMT;
    private String printType;
    private String mfDocId;
    private String isReturnToShipper;
    private String rhdlNo;
    
    private String grNo;
    private String whRtsLocId;
    
    public String getIsReturnToShipper() {
		return isReturnToShipper;
	}

	public void setIsReturnToShipper(String isReturnToShipper) {
		this.isReturnToShipper = isReturnToShipper;
	}

	public String getRhdlNo() {
		return rhdlNo;
	}

	public void setRhdlNo(String rhdlNo) {
		this.rhdlNo = rhdlNo;
	}

	public String getPrintType() {
		return printType;
	}

	public void setPrintType(String printType) {
		this.printType = printType;
	}

	public String getUserId() {
		return userId;
	}

	public String getBalanceQty() {
		return balanceQty;
	}

	public String getBalanceMT() {
		return balanceMT;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setBalanceQty(String balanceQty) {
		this.balanceQty = balanceQty;
	}

	public void setBalanceMT(String balanceMT) {
		this.balanceMT = balanceMT;
	}

	/**
     * @return Returns the authUsrId.
     */
    public String getAuthUsrId() {
        return authUsrId;
    }

    /**
     * @param authUsrId
     *            The authUsrId to set.
     */
    public void setAuthUsrId(String authUsrId) {
        this.authUsrId = authUsrId;
    }

    /**
     * @return Returns the statCd.
     */
    public String getStatCd() {
        return statCd;
    }

    /**
     * @param statCd
     *            The statCd to set.
     */
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }

    public String getArrvDtTo() {
        return arrvDtTo;
    }

    public void setArrvDtTo(String arrvDtTo) {
        this.arrvDtTo = arrvDtTo;
    }

    public String getArrvDtFm() {
        return arrvDtFm;
    }

    public void setArrvDtFm(String arrvDtFm) {
        this.arrvDtFm = arrvDtFm;
    }

    public String getFwrd() {
        return fwrd;
    }

    public void setFwrd(String fwrd) {
        this.fwrd = fwrd;
    }

    public String getPtnrCd() {
        return ptnrCd;
    }

    public void setPtnrCd(String fwrd) {
        this.ptnrCd = fwrd;
    }

    public String getSearchType() {
        return searchType;
    }

    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }

    public String getTsptTpCd() {
        return tsptTpCd;
    }

    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }

    /**
     * Function set a vslCallId value
     * 
     * @param vslCallId.
     * @return void.
     */
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }

    /**
     * Return a vslCallId Value
     * 
     * @param void.
     * @return String.
     */
    public String getVslCallId() {
        return vslCallId;
    }

    /**
     * Function set a shipgNoteNo value
     * 
     * @param shipgNoteNo.
     * @return void.
     */
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }

    /**
     * Return a shipgNoteNo Value
     * 
     * @param void.
     * @return String.
     */
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }

    /**
     * Function set a delvTpCd value
     * 
     * @param delvTpCd.
     * @return void.
     */
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }

    /**
     * Return a delvTpCd Value
     * 
     * @param void.
     * @return String.
     */
    public String getDelvTpCd() {
        return delvTpCd;
    }

    /**
     * Function set a vslCd value
     * 
     * @param vslCd.
     * @return void.
     */
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }

    /**
     * Return a vslCd Value
     * 
     * @param void.
     * @return String.
     */
    public String getVslCd() {
        return vslCd;
    }

    /**
     * Function set a vslNm value
     * 
     * @param vslNm.
     * @return void.
     */
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }

    /**
     * Return a vslNm Value
     * 
     * @param void.
     * @return String.
     */
    public String getVslNm() {
        return vslNm;
    }

    /**
     * Function set a eta value
     * 
     * @param eta.
     * @return void.
     */
    public void setEta(String eta) {
        this.eta = eta;
    }

    /**
     * Return a eta Value
     * 
     * @param void.
     * @return String.
     */
    public String getEta() {
        return eta;
    }

    /**
     * Function set a etb value
     * 
     * @param etb.
     * @return void.
     */
    public void setEtd(String etd) {
        this.etd = etd;
    }

    /**
     * Return a etb Value
     * 
     * @param void.
     * @return String.
     */
    public String getEtd() {
        return etd;
    }

    /**
     * Function set a shipgAgnt value
     * 
     * @param shipgAgnt.
     * @return void.
     */
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }

    /**
     * Return a shipgAgnt Value
     * 
     * @param void.
     * @return String.
     */
    public String getShipgAgnt() {
        return shipgAgnt;
    }

    /**
     * Function set a berthLoc value
     * 
     * @param berthLoc.
     * @return void.
     */
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }

    /**
     * Return a berthLoc Value
     * 
     * @param void.
     * @return String.
     */
    public String getBerthLoc() {
        return berthLoc;
    }

    public String getGdsRecvNo() {
        return gdsRecvNo;
    }

    public void setGdsRecvNo(String gdsRecvNo) {
        this.gdsRecvNo = gdsRecvNo;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    /**
     * @return Returns the opType.
     */
    public String getOpType() {
        return opType;
    }

    /**
     * @param opType
     *            The opType to set.
     */
    public void setOpType(String opType) {
        this.opType = opType;
    }

    /**
     * @return Returns the hhtFlag.
     */
    public String getHhtFlag() {
        return hhtFlag;
    }

    /**
     * @param hhtFlag
     *            The hhtFlag to set.
     */
    public void setHhtFlag(String hhtFlag) {
        this.hhtFlag = hhtFlag;
    }

    /**
     * @return Returns the gateInOut.
     */
    public String getGateInOut() {
        return gateInOut;
    }

    /**
     * @param gateInOut
     *            The gateInOut to set.
     */
    public void setGateInOut(String gateInOut) {
        this.gateInOut = gateInOut;
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

    public String getPageId() {
        return pageId;
    }

    public void setPageId(String pageId) {
        this.pageId = pageId;
    }

    public String getLorryNo() {
        return lorryNo;
    }

    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
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

	public String getRptNo() {
		return rptNo;
	}

	public void setRptNo(String rptNo) {
		this.rptNo = rptNo;
	}

	public String getGenerateType() {
		return generateType;
	}

	public void setGenerateType(String generateType) {
		this.generateType = generateType;
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

	public String getWhRtsLocId() {
		return whRtsLocId;
	}

	public void setWhRtsLocId(String whRtsLocId) {
		this.whRtsLocId = whRtsLocId;
	}
    
}
