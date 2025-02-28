package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchInvoiceParm extends BaseBizParm {
    private String checkRole;
   
    private String atb;
    private String atc;
    private String atu;
    private String atw;
    private String loa;
    private String grt;
    private String vslNm;
    private String invoiceDate;
    private String jpvc;
    private String status;
    private String invoiceType;
    private String searchType;
    private String partnerCode;
    private String fromDate;
    private String toDate;
    private String curr;
    private String rateForeign;
    private String amountForeign;
    private String prUserId;
    private String prDt;
    private String searchInvoiceContractDetail;
    private String alertYn;
    private String erpStatCd;
    private int curPage;
    private String pagingSearchType;
    private int pageSize;

    private String cgNo;
    private String startRow;
    private String endRow; 
    private String reportID;
    private String rptNo;
    private String rptTp;
    private String ivNo;
    private String isJpvc;
    private String exportTp;
    private String userId;
    private String gatherNo;
    private String vslCallId;
    private String vwUserId;
    private String tariffCode;
    private String subTrfCd;
    private String crcyCd;
    
    //for create invoice search
    private String payer;
    private String paymentTp;
    private String invoiceNo;
    private String isPrfx;
    private String ivPrfx;
    
    private String isJPVC;
    private String isWhRental;
    private String trfTp;
    private String fromGatherDate;
    private String toGatherDate;
    private String billTpCd;
    
    private String scn;

    public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getCgNo() {
        return cgNo;
    }
    public void setCgNo(String cgNo) {
        this.cgNo = cgNo;
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

    public String getErpStatCd() {
        return erpStatCd;
    }
    public void setErpStatCd(String erpStatCd) {
        this.erpStatCd = erpStatCd;
    }
    public String getAlertYn() {
        return alertYn;
    }
    public void setAlertYn(String alertYn) {
        this.alertYn = alertYn;
    }
    /**
     * @return Returns the searchInvoiceContractDetail.
     */
    public String getSearchInvoiceContractDetail() {
        return searchInvoiceContractDetail;
    }
    /**
     * @param searchInvoiceContractDetail The searchInvoiceContractDetail to set.
     */
    public void setSearchInvoiceContractDetail(
            String searchInvoiceContractDetail) {
        this.searchInvoiceContractDetail = searchInvoiceContractDetail;
    }
    public String getAmountForeign() {
        return amountForeign;
    }
    public void setAmountForeign(String amountForeign) {
        this.amountForeign = amountForeign;
    }
    public String getCurr() {
        return curr;
    }
    public void setCurr(String curr) {
        this.curr = curr;
    }
    
    /**
     * @return Returns the isWhRental.
     */
    public String getIsWhRental() {
        return isWhRental;
    }
    /**
     * @param isWhRental The isWhRental to set.
     */
    public void setIsWhRental(String isWhRental) {
        this.isWhRental = isWhRental;
    }
    
    public String getAtc() {
        return atc;
    }
    public void setAtc(String atc) {
        this.atc = atc;
    }
    public String getAtu() {
        return atu;
    }
    public void setAtu(String atu) {
        this.atu = atu;
    }
    public String getAtw() {
        return atw;
    }
    public void setAtw(String atw) {
        this.atw = atw;
    }
    public String getGrt() {
        return grt;
    }
    public void setGrt(String grt) {
        this.grt = grt;
    }
    public String getLoa() {
        return loa;
    }
    public void setLoa(String loa) {
        this.loa = loa;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    /**
     * @return Returns the crcyCd.
     */
    public String getCrcyCd() {
        return crcyCd;
    }
    /**
     * @param crcyCd The crcyCd to set.
     */
    public void setCrcyCd(String crcyCd) {
        this.crcyCd = crcyCd;
    }
    /**
     * @return Returns the subTrfCd.
     */
    public String getSubTrfCd() {
        return subTrfCd;
    }
    /**
     * @param subTrfCd The subTrfCd to set.
     */
    public void setSubTrfCd(String subTrfCd) {
        this.subTrfCd = subTrfCd;
    }
    public String getFromDate() {
        return fromDate;
    }
    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }
    public String getToDate() {
        return toDate;
    }
    public void setToDate(String toDate) {
        this.toDate = toDate;
    }
    public String getAtb() {
        return atb;
    }
    public void setAtb(String atb) {
        this.atb = atb;
    }
    public String getInvoiceDate() {
        return invoiceDate;
    }
    public void setInvoiceDate(String invoiceDate) {
        this.invoiceDate = invoiceDate;
    }
    public String getInvoiceType() {
        return invoiceType;
    }
    public void setInvoiceType(String invoiceType) {
        this.invoiceType = invoiceType;
    }
    public String getJpvc() {
        return jpvc;
    }
    public void setJpvc(String jpvc) {
        this.jpvc = jpvc;
    }
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    public String getPartnerCode() {
        return partnerCode;
    }
    public void setPartnerCode(String partnerCode) {
        this.partnerCode = partnerCode;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    
    public String getPaymentTp() {
        return paymentTp;
    }
    public void setPaymentTp(String paymentTp) {
        this.paymentTp = paymentTp;
    }
    public String getInvoiceNo() {
        return invoiceNo;
    }
    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }
    public String getIsPrfx() {
        return isPrfx;
    }
    public void setIsPrfx(String isPrfx) {
        this.isPrfx = isPrfx;
    }
    public String getIvPrfx() {
        return ivPrfx;
    }
    public void setIvPrfx(String ivPrfx) {
        this.ivPrfx = ivPrfx;
    }
    public String getTariffCode() {
        return tariffCode;
    }
    public void setTariffCode(String tariffCode) {
        this.tariffCode = tariffCode;
    }

    public String getIsJPVC() {
        return isJPVC;
    }
    public void setIsJPVC(String isJPVC) {
        this.isJPVC = isJPVC;
    }
    public String getVwUserId() {
        return vwUserId;
    }
    public void setVwUserId(String vwUserId) {
        this.vwUserId = vwUserId;
    }
    /**
     * @return Returns the trfTp.
     */
    public String getTrfTp() {
        return trfTp;
    }
    /**
     * @param trfTp The trfTp to set.
     */
    public void setTrfTp(String trfTp) {
        this.trfTp = trfTp;
    }
    public String getRateForeign() {
        return rateForeign;
    }
    public void setRateForeign(String rateForeign) {
        this.rateForeign = rateForeign;
    }
    /**
     * @return Returns the fromGatherDate.
     */
    public String getFromGatherDate() {
        return fromGatherDate;
    }
    /**
     * @param fromGatherDate The fromGatherDate to set.
     */
    public void setFromGatherDate(String fromGatherDate) {
        this.fromGatherDate = fromGatherDate;
    }
    /**
     * @return Returns the toGatherDate.
     */
    public String getToGatherDate() {
        return toGatherDate;
    }
    /**
     * @param toGatherDate The toGatherDate to set.
     */
    public void setToGatherDate(String toGatherDate) {
        this.toGatherDate = toGatherDate;
    }
   
    /**
     * @return Returns the prDt.
     */
    public String getPrDt() {
        return prDt;
    }
    /**
     * @param prDt The prDt to set.
     */
    public void setPrDt(String prDt) {
        this.prDt = prDt;
    }
    /**
     * @return Returns the prUserId.
     */
    public String getPrUserId() {
        return prUserId;
    }
    /**
     * @param prUserId The prUserId to set.
     */
    public void setPrUserId(String prUserId) {
        this.prUserId = prUserId;
    }
    public String getCheckRole() {
        return checkRole;
    }
    public void setCheckRole(String checkRole) {
        this.checkRole = checkRole;
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
    public String getReportID() {
        return reportID;
    }
    public void setReportID(String reportID) {
        this.reportID = reportID;
    }
	public String getRptNo() {
		return rptNo;
	}
	public void setRptNo(String rptNo) {
		this.rptNo = rptNo;
	}
	public String getRptTp() {
		return rptTp;
	}
	public void setRptTp(String rptTp) {
		this.rptTp = rptTp;
	}
	public String getIvNo() {
		return ivNo;
	}
	public void setIvNo(String ivNo) {
		this.ivNo = ivNo;
	}
	public String getIsJpvc() {
		return isJpvc;
	}
	public void setIsJpvc(String isJpvc) {
		this.isJpvc = isJpvc;
	}
	public String getExportTp() {
		return exportTp;
	}
	public void setExportTp(String exportTp) {
		this.exportTp = exportTp;
	}
    public String getGatherNo() {
        return gatherNo;
    }
    public void setGatherNo(String gatherNo) {
        this.gatherNo = gatherNo;
    }
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getBillTpCd() {
		return billTpCd;
	}
	public void setBillTpCd(String billTpCd) {
		this.billTpCd = billTpCd;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
