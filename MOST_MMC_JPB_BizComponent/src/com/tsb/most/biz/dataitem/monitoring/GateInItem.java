package com.tsb.most.biz.dataitem.monitoring;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class GateInItem extends DataItem {
    private String shftId;
    private String shipgNoteNo;
    private String grNo;		//GR NO
    private String tsptTpCd;	//oMode
    private String delvTpCd;	//dMode
    private String statCd;		//dlvStatus
    private String lorryNo;		//Lorry No
    private String hdlInEndDt;	//gateInTime
    private String loadStDt;	//Loaded Start Date
    private String loadEndDt;	//Loaded End Date
    private String hdlOutEndDt;	//gateOutTime
    private String firstGateInDt;	// First Date whitch Lorry enter Gate
    private String lastGateOutDt;	// Last Date whitch Lorry enter Gate
    private String totInWgt;	//grossWeight, Actual Weight
    private String totInMsrmt;	//measurement, Actual Measurement
    private String totInPkgQty;	//number of Pac
    private String rmk;			//remark(Apron checker)
    private String rmkGr;		//remark(Warehouse checker)
    private String sumitDt;		//Submitted Date
    private String cnsne;		//importer
    private String fwrAgnt;		//Forwarding Agent
    private String imdgUnno;	//DG Class, dgCargo
    private String cumulative;
    
    private String wgt;			//Gross Weight
    private String msrmt;		//measurement
    private String pkgQty;		//Total Qunatity
    private String actPkgQty;	//ActualTotal Qunatity
    private String numPac;		//Number of Package
    private String pkgTpCd;		//Type of Package
    private String shpr;		//exporter
    
    private String hatchNo;
    private String descr;
    private String cgTpCd;	//Type of Cargo
    private String qty;
    private String pacType;
    private String balance;
    
    private String balQty ;
    private String balM3 ;
    private String balMt ;
    
    private String cgCondition ; //cargo condition
    
    private String shftNm;
    private String breakHatchNo;
    private String hatchDrtCd;
    private String gangSeq;
    private String workComp;
    private String dryHatchNo;
    private String eqNo;
    private String fac;
    
    private String whLocId;
    private String whLocNm;
    private String shuYn;
    private String dmgYn;
    private String rhdlYn;
    private String finalYn;
    private String dgYn;
    private String dgApprStat;
    private String oprsModeNm;
        
    private String jobPurpCd;
    private String jobPurpNm;
    

    private String countIndex ;
    
	private String userId;
	private String vslCallId ;
	private String isDgCargo ; //Y or N
	
	private String scaleAmt;
	private String shftDt;

	//Add Damage Amount
	private String rePkgTpCd;
	private String dmgWgt;
	private String dmgMsrmt;
	private String dmgQty;
	
	//Add Packing amout
	private String rePkgWgt;
	private String rePkgMsrmt;
	private String rePkgQty;	
	private String gateInBy;
	
	// Gate
	private String gateCd;
	private String gateNm;
    
    private String blNo;
    private String doNo;
	private String delvOdrNo;
	
	private String scd;
	private String scdNm;
	private String whLoc;
	private List shiftList;
    private List hatchNoList;
    private List oprList;
    private List blList;
    private List snList;
    
    private String mfDocId;
    private String chassisNo;
    private String sdoNo;
    private String lotNo;
    private String bookingNo;
    private String cnsneNm;
    private String shprNm;
    
    public String getJobPurpNm() {
		return jobPurpNm;
	}
	public void setJobPurpNm(String jobPurpNm) {
		this.jobPurpNm = jobPurpNm;
	}
	public String getJobPurpCd() {
		return jobPurpCd;
	}
	public void setJobPurpCd(String jobPurpCd) {
		this.jobPurpCd = jobPurpCd;
	}
	public String getOprsModeNm() {
        return oprsModeNm;
    }
    public void setOprsModeNm(String oprsModeNm) {
        this.oprsModeNm = oprsModeNm;
    }
	
    /**
     * @return Returns the gateInBy.
     */
    public String getGateInBy() {
        return gateInBy;
    }
    /**
     * @param gateInBy The gateInBy to set.
     */
    public void setGateInBy(String gateInBy) {
        this.gateInBy = gateInBy;
    }
    /**
     * @return Returns the shftDt.
     */
    public String getShftDt() {
        return shftDt;
    }
    /**
     * @param shftDt The shftDt to set.
     */
    public void setShftDt(String shftDt) {
        this.shftDt = shftDt;
    }
    /**
     * @return Returns the scaleAmt.
     */
    public String getScaleAmt() {
        return scaleAmt;
    }
    /**
     * @param scaleAmt The scaleAmt to set.
     */
    public void setScaleAmt(String scaleAmt) {
        this.scaleAmt = scaleAmt;
    }
    public String getMsrmt() {
        return msrmt;
    }
    public void setMsrmt(String msrmt) {
        this.msrmt = msrmt;
    }
    public String getNumPac() {
        return numPac;
    }
    public void setNumPac(String numPac) {
        this.numPac = numPac;
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
    public String getShpr() {
        return shpr;
    }
    public void setShpr(String shpr) {
        this.shpr = shpr;
    }
    public String getWgt() {
        return wgt;
    }
    public void setWgt(String wgt) {
        this.wgt = wgt;
    }
    public String getBalance() {
        return balance;
    }
    public void setBalance(String balance) {
        this.balance = balance;
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
    public String getCumulative() {
        return cumulative;
    }
    public void setCumulative(String cumulative) {
        this.cumulative = cumulative;
    }
    public String getDelvTpCd() {
        return delvTpCd;
    }
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    public String getDescr() {
        return descr;
    }
    public void setDescr(String descr) {
        this.descr = descr;
    }
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
    }
    public String getGrNo() {
        return grNo;
    }
    public void setGrNo(String grNo) {
        this.grNo = grNo;
    }
    public String getHdlInEndDt() {
        return hdlInEndDt;
    }
    public void setHdlInEndDt(String hdlInEndDt) {
        this.hdlInEndDt = hdlInEndDt;
    }
    public String getHdlOutEndDt() {
        return hdlOutEndDt;
    }
    public void setHdlOutEndDt(String hdlOutEndDt) {
        this.hdlOutEndDt = hdlOutEndDt;
    }
    public String getFirstGateInDt() {
        return firstGateInDt;
    }
    public void setFirstGateInDt(String firstGateInDt) {
        this.firstGateInDt = firstGateInDt;
    }
    public String getLastGateOutDt() {
        return lastGateOutDt;
    }
    public void setLastGateOutDt(String lastGateOutDt) {
        this.lastGateOutDt = lastGateOutDt;
    }
    public String getImdgUnno() {
        return imdgUnno;
    }
    public void setImdgUnno(String imdgUnno) {
        this.imdgUnno = imdgUnno;
    }
    public String getLoadStDt() {
        return loadStDt;
    }
    public void setLoadStDt(String loadStDt) {
        this.loadStDt = loadStDt;
    }
    public String getLoadEndDt() {
        return loadEndDt;
    }
    public void setLoadEndDt(String loadEndDt) {
        this.loadEndDt = loadEndDt;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getPacType() {
        return pacType;
    }
    public void setPacType(String pacType) {
        this.pacType = pacType;
    }
    public String getQty() {
        return qty;
    }
    public void setQty(String qty) {
        this.qty = qty;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getShftId() {
        return shftId;
    }
    public void setShftId(String shftId) {
        this.shftId = shftId;
    }
    public String getShipgNoteNo() {
        return shipgNoteNo;
    }
    public void setShipgNoteNo(String shipgNoteNo) {
        this.shipgNoteNo = shipgNoteNo;
    }
    public String getStatCd() {
        return statCd;
    }
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    public String getSumitDt() {
        return sumitDt;
    }
    public void setSumitDt(String sumitDt) {
        this.sumitDt = sumitDt;
    }
    public String getTotInMsrmt() {
        return totInMsrmt;
    }
    public void setTotInMsrmt(String totInMsrmt) {
        this.totInMsrmt = totInMsrmt;
    }
    public String getTotInPkgQty() {
        return totInPkgQty;
    }
    public void setTotInPkgQty(String totInPkgQty) {
        this.totInPkgQty = totInPkgQty;
    }
    public String getTotInWgt() {
        return totInWgt;
    }
    public void setTotInWgt(String totInWgt) {
        this.totInWgt = totInWgt;
    }
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
    }
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getDgApprStat() {
        return dgApprStat;
    }
    public void setDgApprStat(String dgApprStat) {
        this.dgApprStat = dgApprStat;
    }
    public String getBreakHatchNo() {
        return breakHatchNo;
    }
    public void setBreakHatchNo(String breakHatchNo) {
        this.breakHatchNo = breakHatchNo;
    }
    public String getDryHatchNo() {
        return dryHatchNo;
    }
    public void setDryHatchNo(String dryHatchNo) {
        this.dryHatchNo = dryHatchNo;
    }
    public String getEqNo() {
        return eqNo;
    }
    public void setEqNo(String eqNo) {
        this.eqNo = eqNo;
    }
    public String getFac() {
        return fac;
    }
    public void setFac(String fac) {
        this.fac = fac;
    }
    public String getGangSeq() {
        return gangSeq;
    }
    public void setGangSeq(String gangSeq) {
        this.gangSeq = gangSeq;
    }
    public String getHatchDrtCd() {
        return hatchDrtCd;
    }
    public void setHatchDrtCd(String hatchDrtCd) {
        this.hatchDrtCd = hatchDrtCd;
    }
    public String getWorkComp() {
        return workComp;
    }
    public void setWorkComp(String workComp) {
        this.workComp = workComp;
    }
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    public String getWhLocId() {
        return whLocId;
    }
    public void setWhLocId(String whLocId) {
        this.whLocId = whLocId;
    }
    public String getWhLocNm() {
        return whLocNm;
    }
    public void setWhLocNm(String whLocNm) {
        this.whLocNm = whLocNm;
    }
    public String getRmkGr() {
        return rmkGr;
    }
    public void setRmkGr(String rmkGr) {
        this.rmkGr = rmkGr;
    }
    public String getActPkgQty() {
        return actPkgQty;
    }
    public void setActPkgQty(String actPkgQty) {
        this.actPkgQty = actPkgQty;
    }
    public String getCountIndex() {
        return countIndex;
    }
    public void setCountIndex(String countIndex) {
        this.countIndex = countIndex;
    }
	public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    //-- end   ADD 20080922 tnkytn Need for HHT
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getIsDgCargo() {
        return isDgCargo;
    }
    public void setIsDgCargo(String isDgCargo) {
        this.isDgCargo = isDgCargo;
    }
    public String getCgCondition() {
        return cgCondition;
    }
    public void setCgCondition(String cgCondition) {
        this.cgCondition = cgCondition;
    }
    
    public String getShuYn() {
        return shuYn;
    }
    public void setShuYn(String shuYn) {
        this.shuYn = shuYn;
    }
    
    public String getDmgYn() {
        return dmgYn;
    }
    public void setDmgYn(String dmgYn) {
        this.dmgYn = dmgYn;
    }
    
    public String getRhdlYn() {
        return rhdlYn;
    }
    public void setRhdlYn(String rhdlYn) {
        this.rhdlYn = rhdlYn;
    }
    
    
    public String getDgYn() {
        return dgYn;
    }
    public void setDgYn(String dgYn) {
        this.dgYn = dgYn;
    }
    
    public String getFinalYn() {
        return finalYn;
    }
    public void setFinalYn(String finalYn) {
        this.finalYn = finalYn;
    }
    public String getBalM3() {
        return balM3;
    }
    public void setBalM3(String balM3) {
        this.balM3 = balM3;
    }
    public String getBalMt() {
        return balMt;
    }
    public void setBalMt(String balMt) {
        this.balMt = balMt;
    }
    public String getBalQty() {
        return balQty;
    }
    public void setBalQty(String balQty) {
        this.balQty = balQty;
    }
    /**
     * @return Returns the crud.
     */
    public String getCrud() {
        return crud;
    }
    /**
     * @param crud The crud to set.
     */
    public void setCrud(String crud) {
        this.crud = crud;
    }
    /**
     * @return Returns the dmgMsrmt.
     */
    public String getDmgMsrmt() {
        return dmgMsrmt;
    }
    /**
     * @param dmgMsrmt The dmgMsrmt to set.
     */
    public void setDmgMsrmt(String dmgMsrmt) {
        this.dmgMsrmt = dmgMsrmt;
    }
    /**
     * @return Returns the dmgQty.
     */
    public String getDmgQty() {
        return dmgQty;
    }
    /**
     * @param dmgQty The dmgQty to set.
     */
    public void setDmgQty(String dmgQty) {
        this.dmgQty = dmgQty;
    }
    /**
     * @return Returns the dmgWgt.
     */
    public String getDmgWgt() {
        return dmgWgt;
    }
    /**
     * @param dmgWgt The dmgWgt to set.
     */
    public void setDmgWgt(String dmgWgt) {
        this.dmgWgt = dmgWgt;
    }
    /**
     * @return Returns the rePkgTpCd.
     */
    public String getRePkgTpCd() {
        return rePkgTpCd;
    }
    /**
     * @param rePkgTpCd The rePkgTpCd to set.
     */
    public void setRePkgTpCd(String rePkgTpCd) {
        this.rePkgTpCd = rePkgTpCd;
    }
    /**
     * @return Returns the rePkgMsrmt.
     */
    public String getRePkgMsrmt() {
        return rePkgMsrmt;
    }
    /**
     * @param rePkgMsrmt The rePkgMsrmt to set.
     */
    public void setRePkgMsrmt(String rePkgMsrmt) {
        this.rePkgMsrmt = rePkgMsrmt;
    }
    /**
     * @return Returns the rePkgQty.
     */
    public String getRePkgQty() {
        return rePkgQty;
    }
    /**
     * @param rePkgQty The rePkgQty to set.
     */
    public void setRePkgQty(String rePkgQty) {
        this.rePkgQty = rePkgQty;
    }
    /**
     * @return Returns the rePkgWgt.
     */
    public String getRePkgWgt() {
        return rePkgWgt;
    }
    /**
     * @param rePkgWgt The rePkgWgt to set.
     */
    public void setRePkgWgt(String rePkgWgt) {
        this.rePkgWgt = rePkgWgt;
    }
    /**
     * @return Returns the gateCd.
     */
    public String getGateCd() {
        return gateCd;
    }
    /**
     * @param gateCd The gateCd to set.
     */
    public void setGateCd(String gateCd) {
        this.gateCd = gateCd;
    }
    /**
     * @return Returns the gateNm.
     */
    public String getGateNm() {
        return gateNm;
    }
    /**
     * @param gateNm The gateNm to set.
     */
    public void setGateNm(String gateNm) {
        this.gateNm = gateNm;
    }
    public String getDelvOdrNo() {
        return delvOdrNo;
    }
    public void setDelvOdrNo(String delvOdrNo) {
        this.delvOdrNo = delvOdrNo;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getDoNo() {
        return doNo;
    }
    public void setDoNo(String doNo) {
        this.doNo = doNo;
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
	public String getWhLoc() {
		return whLoc;
	}
	public void setWhLoc(String whLoc) {
		this.whLoc = whLoc;
	}
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
	public List getHatchNoList() {
		return hatchNoList;
	}
	public void setHatchNoList(List hatchNoList) {
		this.hatchNoList = hatchNoList;
	}
	public List getOprList() {
		return oprList;
	}
	public void setOprList(List oprList) {
		this.oprList = oprList;
	}
	public List getBlList() {
		return blList;
	}
	public void setBlList(List blList) {
		this.blList = blList;
	}
	public List getSnList() {
		return snList;
	}
	public void setSnList(List snList) {
		this.snList = snList;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getBookingNo() {
		return bookingNo;
	}
	public void setBookingNo(String bookingNo) {
		this.bookingNo = bookingNo;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getShprNm() {
		return shprNm;
	}
	public void setShprNm(String shprNm) {
		this.shprNm = shprNm;
	}
    
}
