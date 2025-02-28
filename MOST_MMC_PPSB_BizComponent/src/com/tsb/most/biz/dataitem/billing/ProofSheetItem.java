package com.tsb.most.biz.dataitem.billing;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class ProofSheetItem extends DataItem{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String vslCallId;
    private String chk;
    private String payer;
    private String payerName;
    private String prefix;
    private String tariffType;
    private String tariffTypeName;
    private String tariffCode;
    private String subTariffCode;
    private String tariffDesc;
    private String costCentreCode;
    private double unit1;
    private double unit2;
    private double unit3;
    private double aplyRate;
    private double aplyAmt;
    private double stdRate;
    private double ptnrRate;
    private String status;
    private String statusCd;
    private String invoiceNo;
    private String refNo;
    private String refNo3;
    private String bbtCheck;
    private String waiverDescr;
    private String no;
    private String costcenter;
    private String gatherNo;
    private double aplyAmtUSD;
    private String scrId;
    private String exchag;
    private String aplyDate;
    private String crcyCd;
    private String adhocyn;
    private String sytmId;
    private String rowNum;
    
    private String totalAmount;
    
    private String tmnlNm; //Terminal Name
    private String comRegNo; // For Terminal
    private String gstRegNo;
    
    private String searchTp;
    private String tariffTypeCd;
    private String cargoNo;
    private String workDate;
    private String costCenterCd;
    private String rptSearch;
    private String adhoc;
    private String startRow;
    private String endRow;
    private String currency;
    private String itChk;
    private String mode;
    private String scd;
    private String scdNm;
    
    private String totalAmt;
	private String version;
	private String gstType;
	private String gstValue;
	private String gstAmt;
	private String gstPercent;
	private String cgNo;
	private String userRefNo;
    
    private String isUpdateRefNo;
    private String trfRegNo;
    private String aplyDt;
    private String exprDt;
    private String scn;
	
    private ArrayList<ProofSheetItem> items;
    private ArrayList<DataGatheringItem> bbtChkItems;
    private ArrayList<DataGatheringItem> remarkItem;
    
    public String getItChk() {
		return itChk;
	}
	public void setItChk(String itChk) {
		this.itChk = itChk;
	}
	public ArrayList<ProofSheetItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<ProofSheetItem> items) {
		this.items = items;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
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
	public String getAdhoc() {
		return adhoc;
	}
	public void setAdhoc(String adhoc) {
		this.adhoc = adhoc;
	}
	public String getCostCenterCd() {
		return costCenterCd;
	}
	public String getRptSearch() {
		return rptSearch;
	}
	public void setRptSearch(String rptSearch) {
		this.rptSearch = rptSearch;
	}
	public void setCostCenterCd(String costCenterCd) {
		this.costCenterCd = costCenterCd;
	}
	public String getWorkDate() {
		return workDate;
	}
	public void setWorkDate(String workDate) {
		this.workDate = workDate;
	}
	public String getCargoNo() {
		return cargoNo;
	}
	public void setCargoNo(String cargoNo) {
		this.cargoNo = cargoNo;
	}
	public String getTariffTypeCd() {
		return tariffTypeCd;
	}
	public void setTariffTypeCd(String tariffTypeCd) {
		this.tariffTypeCd = tariffTypeCd;
	}
	public String getSearchTp() {
		return searchTp;
	}
	public void setSearchTp(String searchTp) {
		this.searchTp = searchTp;
	}
	
    /**
     * @return Returns the isUpdateRefNo.
     */
    public String getIsUpdateRefNo() {
        return isUpdateRefNo;
    }
    /**
     * @param isUpdateRefNo The isUpdateRefNo to set.
     */
    public void setIsUpdateRefNo(String isUpdateRefNo) {
        this.isUpdateRefNo = isUpdateRefNo;
    }
    /**
     * @return Returns the sytmId.
     */
    public String getSytmId() {
        return sytmId;
    }
    /**
     * @param sytmId The sytmId to set.
     */
    public void setSytmId(String sytmId) {
        this.sytmId = sytmId;
    }
    
    /**
     * @return Returns the statusCd.
     */
    public String getStatusCd() {
        return statusCd;
    }
    /**
     * @param statusCd The statusCd to set.
     */
    public void setStatusCd(String statusCd) {
        this.statusCd = statusCd;
    }
    public String getChk() {
        return chk;
    }
    public void setChk(String chk) {
        this.chk = chk;
    }
    public String getCrcyCd() {
        return crcyCd;
    }
    public void setCrcyCd(String crcyCd) {
        this.crcyCd = crcyCd;
    }
    public String getAplyDate() {
        return aplyDate;
    }
    public void setAplyDate(String aplyDate) {
        this.aplyDate = aplyDate;
    }
    public String getExchag() {
        return exchag;
    }
    public void setExchag(String exchag) {
        this.exchag = exchag;
    }
    
    public String getNo() {
        return no;
    }
    public void setNo(String no) {
        this.no = no;
    }
    public String getTariffTypeName() {
        return tariffTypeName;
    }
    public void setTariffTypeName(String tariffTypeName) {
        this.tariffTypeName = tariffTypeName;
    }
    public String getPayerName() {
        return payerName;
    }
    public void setPayerName(String payerName) {
        this.payerName = payerName;
    }
    public String getCostCentreCode() {
        return costCentreCode;
    }
    public void setCostCentreCode(String costCentreCode) {
        this.costCentreCode = costCentreCode;
    }
    
    public String getBbtCheck() {
        return bbtCheck;
    }
    public void setBbtCheck(String bbtCheck) {
        this.bbtCheck = bbtCheck;
    }
    public String getWaiverDescr() {
        return waiverDescr;
    }
    public void setWaiverDescr(String waiverDescr) {
        this.waiverDescr = waiverDescr;
    }
    public String getInvoiceNo() {
        return invoiceNo;
    }
    public void setInvoiceNo(String invoiceNo) {
        this.invoiceNo = invoiceNo;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    public String getPrefix() {
        return prefix;
    }
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }
    public String getRefNo() {
        return refNo;
    }
    public void setRefNo(String refNo) {
        this.refNo = refNo;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getTariffCode() {
        return tariffCode;
    }
    public void setTariffCode(String tariffCode) {
        this.tariffCode = tariffCode;
    }
    public String getTariffDesc() {
        return tariffDesc;
    }
    public void setTariffDesc(String tariffDesc) {
        this.tariffDesc = tariffDesc;
    }
    public String getTariffType() {
        return tariffType;
    }
    public void setTariffType(String tariffType) {
        this.tariffType = tariffType;
    }

    public double getAplyAmt() {
        return aplyAmt;
    }
    public void setAplyAmt(double aplyAmt) {
        this.aplyAmt = aplyAmt;
    }
    public double getAplyRate() {
        return aplyRate;
    }
    public void setAplyRate(double aplyRate) {
        this.aplyRate = aplyRate;
    }
    public double getStdRate() {
        return stdRate;
    }
    public void setStdRate(double stdRate) {
        this.stdRate = stdRate;
    }
    public double getPtnrRate() {
		return ptnrRate;
	}
	public void setPtnrRate(double ptnrRate) {
		this.ptnrRate = ptnrRate;
	}
	public String getSubTariffCode() {
        return subTariffCode;
    }
    public void setSubTariffCode(String subTariffCode) {
        this.subTariffCode = subTariffCode;
    }
    public String getCostcenter() {
        return costcenter;
    }
    public void setCostcenter(String costcenter) {
        this.costcenter = costcenter;
    }
    public String getGatherNo() {
        return gatherNo;
    }
    public void setGatherNo(String gatherNo) {
        this.gatherNo = gatherNo;
    }
    public double getAplyAmtUSD() {
        return aplyAmtUSD;
    }
    public void setAplyAmtUSD(double aplyAmtUSD) {
        this.aplyAmtUSD = aplyAmtUSD;
    }
    public double getUnit1() {
        return unit1;
    }
    public void setUnit1(double unit1) {
        this.unit1 = unit1;
    }
    public double getUnit2() {
        return unit2;
    }
    public void setUnit2(double unit2) {
        this.unit2 = unit2;
    }
    public double getUnit3() {
        return unit3;
    }
    public void setUnit3(double unit3) {
        this.unit3 = unit3;
    }
    public String getScrId() {
        return scrId;
    }
    public void setScrId(String scrId) {
        this.scrId = scrId;
    }
    public String getRefNo3() {
        return refNo3;
    }
    public void setRefNo3(String refNo3) {
        this.refNo3 = refNo3;
    }    
    public String getAdhocyn() {
        return adhocyn;
    }
    public void setAdhocyn(String adhocyn) {
        this.adhocyn = adhocyn;
    }
    public String getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }
    public String getComRegNo() {
        return comRegNo;
    }
    public void setComRegNo(String comRegNo) {
        this.comRegNo = comRegNo;
    }
    public String getGstRegNo() {
        return gstRegNo;
    }
    public void setGstRegNo(String gstRegNo) {
        this.gstRegNo = gstRegNo;
    }
    public String getTmnlNm() {
        return tmnlNm;
    }
    public void setTmnlNm(String tmnlNm) {
        this.tmnlNm = tmnlNm;
    }
    public String getRowNum() {
        return rowNum;
    }
    public void setRowNum(String rowNum) {
        this.rowNum = rowNum;
    }
	public ArrayList<DataGatheringItem> getBbtChkItems() {
		return bbtChkItems;
	}
	public void setBbtChkItems(ArrayList<DataGatheringItem> bbtChkItems) {
		this.bbtChkItems = bbtChkItems;
	}
	public ArrayList<DataGatheringItem> getRemarkItem() {
		return remarkItem;
	}
	public void setRemarkItem(ArrayList<DataGatheringItem> remarkItem) {
		this.remarkItem = remarkItem;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getScd() {
		return scd;
	}
	public void setScd(String scd) {
		this.scd = scd;
	}
	public String getScdNm() {
		return scdNm;
	}
	public void setScdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public String getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(String totalAmt) {
		this.totalAmt = totalAmt;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getGstType() {
		return gstType;
	}
	public void setGstType(String gstType) {
		this.gstType = gstType;
	}
	public String getGstValue() {
		return gstValue;
	}
	public void setGstValue(String gstValue) {
		this.gstValue = gstValue;
	}
	public String getGstAmt() {
		return gstAmt;
	}
	public void setGstAmt(String gstAmt) {
		this.gstAmt = gstAmt;
	}
	public String getGstPercent() {
		return gstPercent;
	}
	public void setGstPercent(String gstPercent) {
		this.gstPercent = gstPercent;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getUserRefNo() {
		return userRefNo;
	}
	public void setUserRefNo(String userRefNo) {
		this.userRefNo = userRefNo;
	}
	public String getTrfRegNo() {
		return trfRegNo;
	}
	public void setTrfRegNo(String trfRegNo) {
		this.trfRegNo = trfRegNo;
	}
	public String getAplyDt() {
		return aplyDt;
	}
	public void setAplyDt(String aplyDt) {
		this.aplyDt = aplyDt;
	}
	public String getExprDt() {
		return exprDt;
	}
	public void setExprDt(String exprDt) {
		this.exprDt = exprDt;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
}
