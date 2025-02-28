package com.tsb.most.biz.dataitem.monitoring;

import java.math.BigDecimal;

import com.tsb.most.framework.dataitem.DataItem;

public class GatePassImportItem extends DataItem {
    private String gatePassNo;
    private String shpr;
    private String shprNm;
    private String shprAddr;
    private String cnsne;
    private String cnsneNm;
    private String cnsneAddr;
    private String fwrAgnt;
    private String portOfLoad;
    private String portOfDis;
    private String tsptTpCd;
    private String commodity;
    private String cgTpCd;		//Type of Cargo
    private String pkgTpCd;		//Type of Package
    private String imdg;	//DG Class, dgCargo
    private String unno;	//DG Class, dgCargo
    private String statCd;		//delivery Status
    private String outQty;		//number of Pac, TMT_CG_ARRV_DELV.PKG_QTY's total count.
    private BigDecimal wgt;			//Gross Weight
    private BigDecimal wgtUnit;			//Gross Weight
    private BigDecimal msrmt;		//Measurement
    private BigDecimal msrmtUnit;		//Measurement
    private String pkgQty;		//Gross Quantity
    private String cargoMarking;
    private String nilMarks;

    private BigDecimal dlWgt;			//Gross Weight
    private BigDecimal dlMsrmt;		//Measurement
    private String dlPkgQty;		//Gross Quantity

    //Gate Pass for Import
    private String lorryNo;
    private String tsptr;		// Transporter code	- Added by tnkytn
    private String transporter;	// Transporter name
    private String rmk;
    private String grossTot;
    private String cumulTot;
    private String currBal;
    private String amountLorry;
    private String nosGpIssue;
    private String blNo;
    private String grNo;
    private String doNo;
	private String berthLoc;
	private String eta;
	private String sn;
	private String vslCallId ;
	private String vslCd;
	private String vslName ;	
	private String storageLoc;
	private String shipgAgnt;
	private String shipgAgntNm;
    private String remained;
    /* Gate Pass Slip information*/
    private String hatchNo ;
    private String wharf;
    private String whLoc;
    private String noTrips;
    private String custAppr;
    private String releaseNo; 
    private String packingNo;
    private String finalDest;
    private String dgApproval;
    private String cgDelivery;
    private String cgNo;
    private String spCaCoCd;
    private String actDelvTpCd;
    
    // Accumulative delivered amount
    private String totDelvMt;
    private String totDelvM3;
    private String totDelvQty;
    
    // Actual amount (amount which is actually loaded/discharged/... or amount after reconciliation)
    private String actMt;
    private String actM3;
    private String actQty;
    
    private String catgCd;
    private String delvTpCd;
    
    private String updUserId;
    private String updDt;
    
    private String balMt;
    private String balM3;
    private String balQty;
    
    private String loadInDt;
    private String disInDt;
    
    private String gateInDt;
    private String gateOutDt;
    private String expDt;
    
    private String invoiceNo;
    
    /**
     * @return Returns the dlMsrmt.
     */
    public BigDecimal getDlMsrmt() {
        return dlMsrmt;
    }
    /**
     * @param dlMsrmt The dlMsrmt to set.
     */
    public void setDlMsrmt(BigDecimal dlMsrmt) {
        this.dlMsrmt = dlMsrmt;
    }
    /**
     * @return Returns the dlPkgQty.
     */
    public String getDlPkgQty() {
        return dlPkgQty;
    }
    /**
     * @param dlPkgQty The dlPkgQty to set.
     */
    public void setDlPkgQty(String dlPkgQty) {
        this.dlPkgQty = dlPkgQty;
    }
    /**
     * @return Returns the dlWgt.
     */
    public BigDecimal getDlWgt() {
        return dlWgt;
    }
    /**
     * @param dlWgt The dlWgt to set.
     */
    public void setDlWgt(BigDecimal dlWgt) {
        this.dlWgt = dlWgt;
    }
    /**
     * @return Returns the spCaCoCd.
     */
    public String getSpCaCoCd() {
        return spCaCoCd;
    }
    /**
     * @param spCaCoCd The spCaCoCd to set.
     */
    public void setSpCaCoCd(String spCaCoCd) {
        this.spCaCoCd = spCaCoCd;
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
    public String getRemained() {
        return remained;
    }
    public void setRemained(String remained) {
        this.remained = remained;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getCommodity() {
        return commodity;
    }
    public void setCommodity(String commodity) {
        this.commodity = commodity;
    }
    public String getAmountLorry() {
        return amountLorry;
    }
    public void setAmountLorry(String amountLorry) {
        this.amountLorry = amountLorry;
    }
    public String getCargoMarking() {
        return cargoMarking;
    }
    public void setCargoMarking(String cargoMarking) {
        this.cargoMarking = cargoMarking;
    }
    public String getCgTpCd() {
        return cgTpCd;
    }
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
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
    public String getCumulTot() {
        return cumulTot;
    }
    public void setCumulTot(String cumulTot) {
        this.cumulTot = cumulTot;
    }
    public String getCurrBal() {
        return currBal;
    }
    public void setCurrBal(String currBal) {
        this.currBal = currBal;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    public String getGatePassNo() {
        return gatePassNo;
    }
    public void setGatePassNo(String gatePassNo) {
        this.gatePassNo = gatePassNo;
    }
    public String getGrossTot() {
        return grossTot;
    }
    public void setGrossTot(String grossTot) {
        this.grossTot = grossTot;
    }
    public String getImdg() {
        return imdg;
    }
    public void setImdg(String imdg) {
        this.imdg = imdg;
    }
    public String getUnno() {
        return unno;
    }
    public void setUnno(String unno) {
        this.unno = unno;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public BigDecimal getMsrmt() {
        return msrmt;
    }
    public void setMsrmt(BigDecimal msrmt) {
        this.msrmt = msrmt;
    }
    public String getNilMarks() {
        return nilMarks;
    }
    public void setNilMarks(String nilMarks) {
        this.nilMarks = nilMarks;
    }
    public String getNosGpIssue() {
        return nosGpIssue;
    }
    public void setNosGpIssue(String nosGpIssue) {
        this.nosGpIssue = nosGpIssue;
    }
    public String getOutQty() {
        return outQty;
    }
    public void setOutQty(String outQty) {
        this.outQty = outQty;
    }
    public String getPkgQty() {
        return pkgQty;
    }
    public void setPkgQty(String pkgQty) {
        this.pkgQty = pkgQty;
    }
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    public String getPortOfDis() {
        return portOfDis;
    }
    public void setPortOfDis(String portOfDis) {
        this.portOfDis = portOfDis;
    }
    public String getPortOfLoad() {
        return portOfLoad;
    }
    public void setPortOfLoad(String portOfLoad) {
        this.portOfLoad = portOfLoad;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getShpr() {
		return shpr;
	}
	public void setShpr(String shpr) {
		this.shpr = shpr;
	}
	public String getShprAddr() {
        return shprAddr;
    }
    public void setShprAddr(String shprAddr) {
        this.shprAddr = shprAddr;
    }
    public String getShprNm() {
        return shprNm;
    }
    public void setShprNm(String shprNm) {
        this.shprNm = shprNm;
    }
    public String getStatCd() {
        return statCd;
    }
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    public String getTransporter() {
        return transporter;
    }
    public void setTransporter(String transporter) {
        this.transporter = transporter;
    }
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    public BigDecimal getWgt() {
        return wgt;
    }
    public void setWgt(BigDecimal wgt) {
        this.wgt = wgt;
    }
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    public String getCnsneAddr() {
        return cnsneAddr;
    }
    public void setCnsneAddr(String cnsneAddr) {
        this.cnsneAddr = cnsneAddr;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
    }
    public String getEta() {
        return eta;
    }
    public void setEta(String eta) {
        this.eta = eta;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    public String getSn() {
        return sn;
    }
    public void setSn(String sn) {
        this.sn = sn;
    }
    public String getStorageLoc() {
        return storageLoc;
    }
    public void setStorageLoc(String storageLoc) {
        this.storageLoc = storageLoc;
    }
    public String getVslCd() {
        return vslCd;
    }
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    public String getVslName() {
        return vslName;
    }
    public void setVslName(String vslName) {
        this.vslName = vslName;
    }

    public String getShipgAgnt() {
        return shipgAgnt;
    }
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
    }
    public String getShipgAgntNm() {
        return shipgAgntNm;
    }
    public void setShipgAgntNm(String shipgAgntNm) {
        this.shipgAgntNm = shipgAgntNm;
    }
    public String getCustAppr() {
        return custAppr;
    }
    public void setCustAppr(String custAppr) {
        this.custAppr = custAppr;
    }
    public String getReleaseNo() {
        return this.releaseNo;
    }
    public void setReleaseNo(String releaseNo) {
        this.releaseNo = releaseNo;
    }
    public String getFinalDest() {
        return finalDest;
    }
    public void setFinalDest(String finalDest) {
        this.finalDest = finalDest;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getNoTrips() {
        return noTrips;
    }
    public void setNoTrips(String noTrips) {
        this.noTrips = noTrips;
    }
    public String getPackingNo() {
        return packingNo;
    }
    public void setPackingNo(String packingNo) {
        this.packingNo = packingNo;
    }
    public String getWharf() {
        return wharf;
    }
    public void setWharf(String wharf) {
        this.wharf = wharf;
    }
    public String getWhLoc() {
        return whLoc;
    }
    public void setWhLoc(String whLoc) {
        this.whLoc = whLoc;
    }
    public String getDgApproval() {
        return dgApproval;
    }
    public void setDgApproval(String dgApproval) {
        this.dgApproval = dgApproval;
    }
    public String getCgDelivery() {
        return cgDelivery;
    }
    public void setCgDelivery(String cgDelivery) {
        this.cgDelivery = cgDelivery;
    }
    /**
     * @return Returns the totDelvM3.
     */
    public String getTotDelvM3() {
        return totDelvM3;
    }
    /**
     * @param totDelvM3 The totDelvM3 to set.
     */
    public void setTotDelvM3(String totDelvM3) {
        this.totDelvM3 = totDelvM3;
    }
    /**
     * @return Returns the totDelvMt.
     */
    public String getTotDelvMt() {
        return totDelvMt;
    }
    /**
     * @param totDelvMt The totDelvMt to set.
     */
    public void setTotDelvMt(String totDelvMt) {
        this.totDelvMt = totDelvMt;
    }
    /**
     * @return Returns the totDelvQty.
     */
    public String getTotDelvQty() {
        return totDelvQty;
    }
    /**
     * @param totDelvQty The totDelvQty to set.
     */
    public void setTotDelvQty(String totDelvQty) {
        this.totDelvQty = totDelvQty;
    }
    /**
     * @return Returns the actM3.
     */
    public String getActM3() {
        return actM3;
    }
    /**
     * @param actM3 The actM3 to set.
     */
    public void setActM3(String actM3) {
        this.actM3 = actM3;
    }
    /**
     * @return Returns the actMt.
     */
    public String getActMt() {
        return actMt;
    }
    /**
     * @param actMt The actMt to set.
     */
    public void setActMt(String actMt) {
        this.actMt = actMt;
    }
    /**
     * @return Returns the actQty.
     */
    public String getActQty() {
        return actQty;
    }
    /**
     * @param actQty The actQty to set.
     */
    public void setActQty(String actQty) {
        this.actQty = actQty;
    }
    /**
     * @return Returns the catgCd.
     */
    public String getCatgCd() {
        return catgCd;
    }
    /**
     * @param catgCd The catgCd to set.
     */
    public void setCatgCd(String catgCd) {
        this.catgCd = catgCd;
    }
    /**
     * @return Returns the delvTpCd.
     */
    public String getDelvTpCd() {
        return delvTpCd;
    }
    /**
     * @param delvTpCd The delvTpCd to set.
     */
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    /**
     * @return Returns the updDt.
     */
    public String getUpdDt() {
        return updDt;
    }
    /**
     * @param updDt The updDt to set.
     */
    public void setUpdDt(String updDt) {
        this.updDt = updDt;
    }
    /**
     * @return Returns the updUserId.
     */
    public String getUpdUserId() {
        return updUserId;
    }
    /**
     * @param updUserId The updUserId to set.
     */
    public void setUpdUserId(String updUserId) {
        this.updUserId = updUserId;
    }
    /**
     * @return Returns the balM3.
     */
    public String getBalM3() {
        return balM3;
    }
    /**
     * @param balM3 The balM3 to set.
     */
    public void setBalM3(String balM3) {
        this.balM3 = balM3;
    }
    /**
     * @return Returns the balMt.
     */
    public String getBalMt() {
        return balMt;
    }
    /**
     * @param balMt The balMt to set.
     */
    public void setBalMt(String balMt) {
        this.balMt = balMt;
    }
    /**
     * @return Returns the balQty.
     */
    public String getBalQty() {
        return balQty;
    }
    /**
     * @param balQty The balQty to set.
     */
    public void setBalQty(String balQty) {
        this.balQty = balQty;
    }
    
    public String getActDelvTpCd() {
        return actDelvTpCd;
    }
    
    public void setActDelvTpCd(String actDelvTpCd) {
        this.actDelvTpCd = actDelvTpCd;
    }
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getLoadInDt() {
		return loadInDt;
	}
	public void setLoadInDt(String loadInDt) {
		this.loadInDt = loadInDt;
	}
	public String getDisInDt() {
		return disInDt;
	}
	public void setDisInDt(String disInDt) {
		this.disInDt = disInDt;
	}
	public String getGateInDt() {
		return gateInDt;
	}
	public void setGateInDt(String gateInDt) {
		this.gateInDt = gateInDt;
	}
	public String getGateOutDt() {
		return gateOutDt;
	}
	public void setGateOutDt(String gateOutDt) {
		this.gateOutDt = gateOutDt;
	}
	public BigDecimal getWgtUnit() {
		return wgtUnit;
	}
	public void setWgtUnit(BigDecimal wgtUnit) {
		this.wgtUnit = wgtUnit;
	}
	public BigDecimal getMsrmtUnit() {
		return msrmtUnit;
	}
	public void setMsrmtUnit(BigDecimal msrmtUnit) {
		this.msrmtUnit = msrmtUnit;
	}
	public String getExpDt() {
		return expDt;
	}
	public void setExpDt(String expDt) {
		this.expDt = expDt;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
}
