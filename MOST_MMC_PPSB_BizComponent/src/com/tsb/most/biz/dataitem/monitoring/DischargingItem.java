package com.tsb.most.biz.dataitem.monitoring;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class DischargingItem extends DataItem {
    private String gatePassNo;
    private String shift;
    private String blNo;		//B/L NO
    private String delvOdrNo;	//D/O NO
    private String disEndDt;	//Discharged time
    private String lorryNo;		//Lorry No
    private String hdlOutEndDt;	//Gate Out Time
    private String hatchNo;
    private String fwrAgnt;		//Forwarder
    private String outWgt;		//Weight
    private String wgt;			//Gross Weight
    private String vol;			//Measurement
    private String pkgQty;		//number of Pac, Gross Quantity
    private String pkgTpCd;		//Type of Package
    private String issueDt;		//Issued Date
    private String cnsne;		//importer
    private String cgTpCd;		//Type of Cargo
    private String imdgUnno;	//DG Class, dgCargo
    private String rmk;			//remark
    private String grNo;

    private String delvTpCd;	//dMode, Delv.Mode
    private String actDelvTpCd;	//dMode, Delv.Mode
    private String oprsMode;	//Oprs.Mode : add this column to DB nessary
    private String oprsModeNm;
    private String sumitDt;		//Submitted Date
    private String outMsrmt;	//Actual Measurement
    private String outQty;		//Actual Quantity
    private String descr;		//Description -- Commodity Code
    
    private String tsptTpCd;
    private String tsptTpCdNm;
    private String firstGateInDt;	// First Date whitch Lorry enter Gate
    private String lastGateOutDt;	// Last Date whitch Lorry enter Gate
    private String cumulative;
    private String balance;
    private String actlWgt;		//the weight that is measured when cargo is Gated-out
    private String opeClassCd;		//IM,EX,ST,TS
    
    //common column field.
    private String shftNm;
    private String breakHatchNo;
    private String hatchDrtCd;
    private String gangSeq;
    private String workComp;
    private String dryHatchNo;
    private String eqNo;
    private String fac;
    
    private String crud;
	private String userId;
	private String isDgCargo ; //Y or N
	private String finalGateOut ;
	
    private String dgApprStat;
    private String cgCondition ; //cargo condition
    private String whLocId;
    private String whLocNm;
    private String vslCallId;
    private String statCd ;  
    private String jobPurpCd; //Purpose code V-W or W-V or V-G . . . 
    private String jobPurpNm;
    private String finalOpe;
    
    private String scaleAmt;    
    private String catgCd;
    private String spCaCoCd;
    private String gateOutBy;
     
    private String outWgtDmg;	//damage Measurement
    private String outMsrmtDmg;	//damage Measurement
    private String outQtyDmg;	//damage Quantity
    
    private String outWgtDir;	//direct Measurement
    private String outMsrmtDir;	//direct Measurement
    private String outQtyDir;	//direct Quantity
    private String outWgtIndir;	//indirect Measurement
    private String outMsrmtIndir;	//indirect Measurement
    private String outQtyIndir;	//indirect Quantity
    
    // Gate
    private String gateCd;
    private String gateNm;

    private List shiftList;
    private List hatchNoList;
    private List oprList;
    private List blList;
    private List snList;
    
    private String scd;
    private String scdNm;
    
    private String domesticChk;
    private String vslNm;
    private String pkgNo;
    private String chassisNo;
    private String sdoNo;
    private String fwdNm;
    private String bargeNo;
    private String jobNo;
    private String bargeNm;
    
    
    // Report - Monitoring
    private String cmdtNm;
    private String docMt;
    private String voyage;
    private String mfDocId;
    private String pod;
    private String podNm;
    private String cnsneCd;
    private String cnsneNm;
    private String pkgWgt;
    private String pkgVol;
    private String width;
    private String length;
    private String height;
    private String dimension;
    private String pkgDesc;
    private String pkgRmk;
    private String atb;
    private String atu;
    
    private String manifestWgt;
    private String manifestVol;
    private String manifestPkgQty;
    private String totalWgtHndl;		// Total weight of 3 diretions (Vessel to Apron  + Vessel To Gate + Vessel to Bage)
    private String actualWgt;		
    private String actualVol;
    private String actualPkgQty;
    private String shrLndOvrLnd;
    private String totalWgtRec;
    private String shrLndOvrLndWgtTon;
    private String shrLndOvrLndWgtTon2;
    private String totalWgtTonRec;
    private String receivedWgt;
    
    private String receivedWgtTon; // Total of 2 directions: Vessel To Gate + Vessel to Bage
    private String balanceWgt;
    private String cgTpNm;
    private String unitNo;
    
    public String getOprsModeNm() {
        return oprsModeNm;
    }
    public void setOprsModeNm(String oprsModeNm) {
        this.oprsModeNm = oprsModeNm;
    }
    /**
     * @return Returns the actDelvTpCd.
     */
    public String getActDelvTpCd() {
        return actDelvTpCd;
    }
    /**
     * @param actDelvTpCd The actDelvTpCd to set.
     */
    public void setActDelvTpCd(String actDelvTpCd) {
        this.actDelvTpCd = actDelvTpCd;
    }
    /**
     * @return Returns the outMsrmtDir.
     */
    public String getOutMsrmtDir() {
        return outMsrmtDir;
    }
    /**
     * @param outMsrmtDir The outMsrmtDir to set.
     */
    public void setOutMsrmtDir(String outMsrmtDir) {
        this.outMsrmtDir = outMsrmtDir;
    }
    /**
     * @return Returns the outMsrmtIndir.
     */
    public String getOutMsrmtIndir() {
        return outMsrmtIndir;
    }
    /**
     * @param outMsrmtIndir The outMsrmtIndir to set.
     */
    public void setOutMsrmtIndir(String outMsrmtIndir) {
        this.outMsrmtIndir = outMsrmtIndir;
    }
    /**
     * @return Returns the outQtyDir.
     */
    public String getOutQtyDir() {
        return outQtyDir;
    }
    /**
     * @param outQtyDir The outQtyDir to set.
     */
    public void setOutQtyDir(String outQtyDir) {
        this.outQtyDir = outQtyDir;
    }
    /**
     * @return Returns the outQtyIndir.
     */
    public String getOutQtyIndir() {
        return outQtyIndir;
    }
    /**
     * @param outQtyIndir The outQtyIndir to set.
     */
    public void setOutQtyIndir(String outQtyIndir) {
        this.outQtyIndir = outQtyIndir;
    }
    /**
     * @return Returns the outWgtDir.
     */
    public String getOutWgtDir() {
        return outWgtDir;
    }
    /**
     * @param outWgtDir The outWgtDir to set.
     */
    public void setOutWgtDir(String outWgtDir) {
        this.outWgtDir = outWgtDir;
    }
    /**
     * @return Returns the outWgtIndir.
     */
    public String getOutWgtIndir() {
        return outWgtIndir;
    }
    /**
     * @param outWgtIndir The outWgtIndir to set.
     */
    public void setOutWgtIndir(String outWgtIndir) {
        this.outWgtIndir = outWgtIndir;
    }
    /**
     * @return Returns the outMsrmtDmg.
     */
    public String getOutMsrmtDmg() {
        return outMsrmtDmg;
    }
    /**
     * @param outMsrmtDmg The outMsrmtDmg to set.
     */
    public void setOutMsrmtDmg(String outMsrmtDmg) {
        this.outMsrmtDmg = outMsrmtDmg;
    }
    /**
     * @return Returns the outQtyDmg.
     */
    public String getOutQtyDmg() {
        return outQtyDmg;
    }
    /**
     * @param outQtyDmg The outQtyDmg to set.
     */
    public void setOutQtyDmg(String outQtyDmg) {
        this.outQtyDmg = outQtyDmg;
    }
    /**
     * @return Returns the outWgtDmg.
     */
    public String getOutWgtDmg() {
        return outWgtDmg;
    }
    /**
     * @param outWgtDmg The outWgtDmg to set.
     */
    public void setOutWgtDmg(String outWgtDmg) {
        this.outWgtDmg = outWgtDmg;
    }
    /**
     * @return Returns the gateOutBy.
     */
    public String getGateOutBy() {
        return gateOutBy;
    }
    /**
     * @param gateOutBy The gateOutBy to set.
     */
    public void setGateOutBy(String gateOutBy) {
        this.gateOutBy = gateOutBy;
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
    public String getTsptTpCdNm() {
        return tsptTpCdNm;
    }
    public void setTsptTpCdNm(String tsptTpCdNm) {
        this.tsptTpCdNm = tsptTpCdNm;
    }
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
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
    public String getWgt() {
        return wgt;
    }
    public void setWgt(String wgt) {
        this.wgt = wgt;
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
    public String getHdlOutEndDt() {
        return hdlOutEndDt;
    }
    public void setHdlOutEndDt(String hdlOutEndDt) {
        this.hdlOutEndDt = hdlOutEndDt;
    }    
    public String getImdgUnno() {
        return imdgUnno;
    }
    public void setImdgUnno(String imdgUnno) {
        this.imdgUnno = imdgUnno;
    }
    public String getBlNo() {
        return blNo;
    }
    public void setBlNo(String blNo) {
        this.blNo = blNo;
    }
    public String getDelvOdrNo() {
        return delvOdrNo;
    }
    public void setDelvOdrNo(String delvOdrNo) {
        this.delvOdrNo = delvOdrNo;
    }
    public String getDisEndDt() {
        return disEndDt;
    }
    public void setDisEndDt(String disEndDt) {
        this.disEndDt = disEndDt;
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
    public String getHatchNo() {
        return hatchNo;
    }
    public void setHatchNo(String hatchNo) {
        this.hatchNo = hatchNo;
    }
    public String getIssueDt() {
        return issueDt;
    }
    public void setIssueDt(String issueDt) {
        this.issueDt = issueDt;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getOprsMode() {
        return oprsMode;
    }
    public void setOprsMode(String oprsMode) {
        this.oprsMode = oprsMode;
    }
    public String getOutMsrmt() {
        return outMsrmt;
    }
    public void setOutMsrmt(String outMsrmt) {
        this.outMsrmt = outMsrmt;
    }
    public String getOutQty() {
        return outQty;
    }
    public void setOutQty(String outQty) {
        this.outQty = outQty;
    }
    public String getOutWgt() {
        return outWgt;
    }
    public void setOutWgt(String outWgt) {
        this.outWgt = outWgt;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getShift() {
        return shift;
    }
    public void setShift(String shift) {
        this.shift = shift;
    }
    public String getSumitDt() {
        return sumitDt;
    }
    public void setSumitDt(String sumitDt) {
        this.sumitDt = sumitDt;
    }
    public String getVol() {
        return vol;
    }
    public void setVol(String vol) {
        this.vol = vol;
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
    public String getFirstGateInDt() {
        return firstGateInDt;
    }
    public void setFirstGateInDt(String firstGateInDt) {
        this.firstGateInDt = firstGateInDt;
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
    public String getLastGateOutDt() {
        return lastGateOutDt;
    }
    public void setLastGateOutDt(String lastGateOutDt) {
        this.lastGateOutDt = lastGateOutDt;
    }
    public String getShftNm() {
        return shftNm;
    }
    public void setShftNm(String shftNm) {
        this.shftNm = shftNm;
    }
    public String getWorkComp() {
        return workComp;
    }
    public void setWorkComp(String workComp) {
        this.workComp = workComp;
    }
    public String getBalance() {
        return balance;
    }
    public void setBalance(String balance) {
        this.balance = balance;
    }
    public String getCumulative() {
        return cumulative;
    }
    public void setCumulative(String cumulative) {
        this.cumulative = cumulative;
    }
    public String getOpeClassCd() {
        return opeClassCd;
    }
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    public String getActlWgt() {
        return actlWgt;
    }
    public void setActlWgt(String actlWgt) {
        this.actlWgt = actlWgt;
    }
    
    //-- start ADD 20080922 tnkytn Need for HHT
    public String getCrud() {
        return crud;
    }
    public void setCrud(String workingStatus) {
        this.crud = workingStatus;
    }
	public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    //-- end   ADD 20080922 tnkytn Need for HHT
    public String getIsDgCargo() {
        return isDgCargo;
    }
    public void setIsDgCargo(String isDgCargo) {
        this.isDgCargo = isDgCargo;
    }
    public String getFinalGateOut() {
        return finalGateOut;
    }
    public void setFinalGateOut(String finalGateOut) {
        this.finalGateOut = finalGateOut;
    }
    public String getCgCondition() {
        return cgCondition;
    }
    public void setCgCondition(String cgCondition) {
        this.cgCondition = cgCondition;
    }
    public String getDgApprStat() {
        return dgApprStat;
    }
    public void setDgApprStat(String dgApprStat) {
        this.dgApprStat = dgApprStat;
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
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getStatCd() {
        return statCd;
    }
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    public String getJobPurpCd() {
        return jobPurpCd;
    }
    public void setJobPurpCd(String jobPurpCd) {
        this.jobPurpCd = jobPurpCd;
    }
    
    public String getJobPurpNm() {
        return jobPurpNm;
    }
    public void setJobPurpNm(String jobPurpNm) {
        this.jobPurpNm = jobPurpNm;
    }
    
    public String getFinalOpe() {
        return finalOpe;
    }
    public void setFinalOpe(String finalOpe) {
        this.finalOpe = finalOpe;
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
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
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
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getBargeNo() {
		return bargeNo;
	}
	public void setBargeNo(String bargeNo) {
		this.bargeNo = bargeNo;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getBargeNm() {
		return bargeNm;
	}
	public void setBargeNm(String bargeNm) {
		this.bargeNm = bargeNm;
	}
	public String getPkgWgt() {
		return pkgWgt;
	}
	public void setPkgWgt(String pkgWgt) {
		this.pkgWgt = pkgWgt;
	}
	public String getPkgVol() {
		return pkgVol;
	}
	public void setPkgVol(String pkgVol) {
		this.pkgVol = pkgVol;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getDimension() {
		return dimension;
	}
	public void setDimension(String dimension) {
		this.dimension = dimension;
	}
	public String getPkgDesc() {
		return pkgDesc;
	}
	public void setPkgDesc(String pkgDesc) {
		this.pkgDesc = pkgDesc;
	}
	public String getPkgRmk() {
		return pkgRmk;
	}
	public void setPkgRmk(String pkgRmk) {
		this.pkgRmk = pkgRmk;
	}
	public String getAtb() {
		return atb;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public String getAtu() {
		return atu;
	}
	public void setAtu(String atu) {
		this.atu = atu;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getVoyage() {
		return voyage;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getPodNm() {
		return podNm;
	}
	public void setPodNm(String podNm) {
		this.podNm = podNm;
	}
	public String getCnsneCd() {
		return cnsneCd;
	}
	public void setCnsneCd(String cnsneCd) {
		this.cnsneCd = cnsneCd;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getManifestWgt() {
		return manifestWgt;
	}
	public void setManifestWgt(String manifestWgt) {
		this.manifestWgt = manifestWgt;
	}
	public String getManifestVol() {
		return manifestVol;
	}
	public void setManifestVol(String manifestVol) {
		this.manifestVol = manifestVol;
	}
	public String getManifestPkgQty() {
		return manifestPkgQty;
	}
	public void setManifestPkgQty(String manifestPkgQty) {
		this.manifestPkgQty = manifestPkgQty;
	}
	public String getActualWgt() {
		return actualWgt;
	}
	public void setActualWgt(String actualWgt) {
		this.actualWgt = actualWgt;
	}
	public String getActualVol() {
		return actualVol;
	}
	public void setActualVol(String actualVol) {
		this.actualVol = actualVol;
	}
	public String getActualPkgQty() {
		return actualPkgQty;
	}
	public void setActualPkgQty(String actualPkgQty) {
		this.actualPkgQty = actualPkgQty;
	}
	public String getTotalWgtHndl() {
		return totalWgtHndl;
	}
	public void setTotalWgtHndl(String totalWgtHndl) {
		this.totalWgtHndl = totalWgtHndl;
	}
	public String getReceivedWgtTon() {
		return receivedWgtTon;
	}
	public void setReceivedWgtTon(String receivedWgtTon) {
		this.receivedWgtTon = receivedWgtTon;
	}
	public String getBalanceWgt() {
		return balanceWgt;
	}
	public void setBalanceWgt(String balanceWgt) {
		this.balanceWgt = balanceWgt;
	}
	public String getShrLndOvrLnd() {
		return shrLndOvrLnd;
	}
	public void setShrLndOvrLnd(String shrLndOvrLnd) {
		this.shrLndOvrLnd = shrLndOvrLnd;
	}
	public String getTotalWgtRec() {
		return totalWgtRec;
	}
	public void setTotalWgtRec(String totalWgtRec) {
		this.totalWgtRec = totalWgtRec;
	}
	public String getShrLndOvrLndWgtTon() {
		return shrLndOvrLndWgtTon;
	}
	public void setShrLndOvrLndWgtTon(String shrLndOvrLndWgtTon) {
		this.shrLndOvrLndWgtTon = shrLndOvrLndWgtTon;
	}
	public String getTotalWgtTonRec() {
		return totalWgtTonRec;
	}
	public void setTotalWgtTonRec(String totalWgtTonRec) {
		this.totalWgtTonRec = totalWgtTonRec;
	}
	public String getReceivedWgt() {
		return receivedWgt;
	}
	public void setReceivedWgt(String receivedWgt) {
		this.receivedWgt = receivedWgt;
	}
	public String getShrLndOvrLndWgtTon2() {
		return shrLndOvrLndWgtTon2;
	}
	public void setShrLndOvrLndWgtTon2(String shrLndOvrLndWgtTon2) {
		this.shrLndOvrLndWgtTon2 = shrLndOvrLndWgtTon2;
	}
	public String getCmdtNm() {
		return cmdtNm;
	}
	public void setCmdtNm(String cmdtNm) {
		this.cmdtNm = cmdtNm;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	
}
