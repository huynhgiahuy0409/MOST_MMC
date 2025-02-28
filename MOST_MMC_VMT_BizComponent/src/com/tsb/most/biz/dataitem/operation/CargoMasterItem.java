package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoMasterItem extends DataItem {

    private String vslCallId;
    private String cgNo;
    private String mfDocId;
    private String mfDocID;					//TEST
    private String opeClassCd;//catgCd
    private String tsptTpCd;//stat
    private String tsptr;//transport company 
    private String markNo;
    private String statCd;//reserve,loading,discharing
    private String hdlInStDt;
    private String hdlInEndDt;
    private String hdlOutStDt;
    private String hdlOutEndDt;
    private String loadStDt;
    private String loadEndDt;
    private String disStDt;
    private String disEndDt;
    private int pkgQty;
    private String pkgTpCd;
    private double  wgt;
    private String wgtUnit;
    private double  msrmt;//measurement
    private String msrmtUnit;//measurementUnit
    private int repkgQty;
    private double  repkgWgt;
    private double  repkgMsrmt;
    private String repkgTpCd;
    private String loadCnclMode;
    private String dmgYn;
    private String rhdlMode;
    private String delvTpCd;
    private String cgTpCd;
    private String cmdtCd;
    private String tmnlInDt;
    private String tmnlOutDt;
    private String prevLocId;//prevPos
    private String currLocId;//currPos
    private String nxLocId;//nxPos
    private String cgOpeStat;//cg_stat_cd
    private String blNo;
    private String delvOdrNo;
    private String mrgDvidCd;
    private String custClrCd;
    private String clrYmd;
    private String custApprvCd;
    private String apprvYmd;
    private String shipgAgnt;
    private String fwrAgnt;
    private String shpr;
    private String shprNm;
    private String shprAddr;
    private String cnsne;
    private String cnsneNm;
    private String cnsneAddr;
    private String cntryOfOrg;
    private String portOfLoad;
    private String portOfDis;
    private String fdest;
    private String rmk;
    private String shipgNoteNo;
    private String strgNoteNo;
    private int billPkgQty;
    private double  billWgt;
    private double  billMsrmt;
    private String actlDelvTpCd;//'Direct D','indirect i' both b
    private String pvslCallId;
    private String sprYn;
    private String whFnlDelvYn;
    private String vslNm;
    private String estArrvDt;
    
    //add dulpicated field for Cargo searching. ex) BN/SN, CNG/SHP, GR/Items
    private String blSn;
    private String cngShp;
    private String descr;
    
    //add WH info
    private String locId;
    private String locNm;
    
    //add GatePass
    private String gatePassNo;
    
    private String eta; 
    private String etd;
    private String berthLoc;
    
    /**Amout property for Cargo Search**/
    //Gross Amount
    private double grsMt;
    private double grsM3;
    private int	grsQty;
    
    //Direct Gross Amount
    private double dirMt;
    private double dirM3;
    private int	dirQty;
    
    //Indirect Gross Amount
    private double indMt;
    private double indM3;
    private int	indQty;    

    //WH normal Amount
    private double norMt;
    private double norM3;
    private int	norQty;

    //WH Damage Amount
    private double dmgMt;
    private double dmgM3;
    private int	dmgQty;
    
    //WH Shut out Amount
    private double shuMt;
    private double shuM3;
    private int	shuQty;
    
    //Gate Pass Amount
    private double gpMt;
    private double gpM3;
    private int	gpQty;    
    private String arrvDtFm;
    private String arrvDtTo;
    private List snList;
    private List blList;
    private List items;
    private List grGoList;
    
    private List bookingNoList;
    private List masterBlList;
    
    private String shftNm;
    private String shftId;
    private String shftIdx;
    private String fmHhmm;
    private String toHhmm;
    
    private String vslCd;							//TEST
    private String callSeq;							//TEST
    private String callYear;						//TEST
    
    public String getCallYear() {					//TEST
		return callYear;
	}
	public void setCallYear(String callYear) {		//TEST
		this.callYear = callYear;
	}
    
    public String getVslCd() {						//TEST
		return vslCd;	
	}
	public void setVslCd(String vslCd) {			//TEST
		this.vslCd = vslCd;
	}
	
	public String getCallSeq() {					//TEST
		return callSeq;
	}
	public void setCallSeq(String callSeq) {		//TEST
		this.callSeq = callSeq;
	}
    
    
    /**
     * @return Returns the actlDelvTpCd.
     */
    public String getActlDelvTpCd() {
        return actlDelvTpCd;
    }
    /**
     * @param actlDelvTpCd The actlDelvTpCd to set.
     */
    public void setActlDelvTpCd(String actlDelvTpCd) {
        this.actlDelvTpCd = actlDelvTpCd;
    }
    /**
     * @return Returns the apprvYmd.
     */
    public String getApprvYmd() {
        return apprvYmd;
    }
    /**
     * @param apprvYmd The apprvYmd to set.
     */
    public void setApprvYmd(String apprvYmd) {
        this.apprvYmd = apprvYmd;
    }
    /**
     * @return Returns the berthLoc.
     */
    public String getBerthLoc() {
        return berthLoc;
    }
    /**
     * @param berthLoc The berthLoc to set.
     */
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    /**
     * @return Returns the billMsrmt.
     */
    public double getBillMsrmt() {
        return billMsrmt;
    }
    /**
     * @param billMsrmt The billMsrmt to set.
     */
    public void setBillMsrmt(double billMsrmt) {
        this.billMsrmt = billMsrmt;
    }
    /**
     * @return Returns the billPkgQty.
     */
    public int getBillPkgQty() {
        return billPkgQty;
    }
    /**
     * @param billPkgQty The billPkgQty to set.
     */
    public void setBillPkgQty(int billPkgQty) {
        this.billPkgQty = billPkgQty;
    }
    /**
     * @return Returns the billWgt.
     */
    public double getBillWgt() {
        return billWgt;
    }
    /**
     * @param billWgt The billWgt to set.
     */
    public void setBillWgt(double billWgt) {
        this.billWgt = billWgt;
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
     * @return Returns the blSn.
     */
    public String getBlSn() {
        return blSn;
    }
    /**
     * @param blSn The blSn to set.
     */
    public void setBlSn(String blSn) {
        this.blSn = blSn;
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
     * @return Returns the cgOpeStat.
     */
    public String getCgOpeStat() {
        return cgOpeStat;
    }
    /**
     * @param cgOpeStat The cgOpeStat to set.
     */
    public void setCgOpeStat(String cgOpeStat) {
        this.cgOpeStat = cgOpeStat;
    }
    /**
     * @return Returns the cgTpCd.
     */
    public String getCgTpCd() {
        return cgTpCd;
    }
    /**
     * @param cgTpCd The cgTpCd to set.
     */
    public void setCgTpCd(String cgTpCd) {
        this.cgTpCd = cgTpCd;
    }
    /**
     * @return Returns the clrYmd.
     */
    public String getClrYmd() {
        return clrYmd;
    }
    /**
     * @param clrYmd The clrYmd to set.
     */
    public void setClrYmd(String clrYmd) {
        this.clrYmd = clrYmd;
    }
    /**
     * @return Returns the cmdtCd.
     */
    public String getCmdtCd() {
        return cmdtCd;
    }
    /**
     * @param cmdtCd The cmdtCd to set.
     */
    public void setCmdtCd(String cmdtCd) {
        this.cmdtCd = cmdtCd;
    }
    /**
     * @return Returns the cngShp.
     */
    public String getCngShp() {
        return cngShp;
    }
    /**
     * @param cngShp The cngShp to set.
     */
    public void setCngShp(String cngShp) {
        this.cngShp = cngShp;
    }
    /**
     * @return Returns the cnsne.
     */
    public String getCnsne() {
        return cnsne;
    }
    /**
     * @param cnsne The cnsne to set.
     */
    public void setCnsne(String cnsne) {
        this.cnsne = cnsne;
    }
    /**
     * @return Returns the cnsneAddr.
     */
    public String getCnsneAddr() {
        return cnsneAddr;
    }
    /**
     * @param cnsneAddr The cnsneAddr to set.
     */
    public void setCnsneAddr(String cnsneAddr) {
        this.cnsneAddr = cnsneAddr;
    }
    /**
     * @return Returns the cnsneNm.
     */
    public String getCnsneNm() {
        return cnsneNm;
    }
    /**
     * @param cnsneNm The cnsneNm to set.
     */
    public void setCnsneNm(String cnsneNm) {
        this.cnsneNm = cnsneNm;
    }
    /**
     * @return Returns the cntryOfOrg.
     */
    public String getCntryOfOrg() {
        return cntryOfOrg;
    }
    /**
     * @param cntryOfOrg The cntryOfOrg to set.
     */
    public void setCntryOfOrg(String cntryOfOrg) {
        this.cntryOfOrg = cntryOfOrg;
    }
    /**
     * @return Returns the currLocId.
     */
    public String getCurrLocId() {
        return currLocId;
    }
    /**
     * @param currLocId The currLocId to set.
     */
    public void setCurrLocId(String currLocId) {
        this.currLocId = currLocId;
    }
    /**
     * @return Returns the custApprvCd.
     */
    public String getCustApprvCd() {
        return custApprvCd;
    }
    /**
     * @param custApprvCd The custApprvCd to set.
     */
    public void setCustApprvCd(String custApprvCd) {
        this.custApprvCd = custApprvCd;
    }
    /**
     * @return Returns the custClrCd.
     */
    public String getCustClrCd() {
        return custClrCd;
    }
    /**
     * @param custClrCd The custClrCd to set.
     */
    public void setCustClrCd(String custClrCd) {
        this.custClrCd = custClrCd;
    }
    /**
     * @return Returns the delvOdrNo.
     */
    public String getDelvOdrNo() {
        return delvOdrNo;
    }
    /**
     * @param delvOdrNo The delvOdrNo to set.
     */
    public void setDelvOdrNo(String delvOdrNo) {
        this.delvOdrNo = delvOdrNo;
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
     * @return Returns the descr.
     */
    public String getDescr() {
        return descr;
    }
    /**
     * @param descr The descr to set.
     */
    public void setDescr(String descr) {
        this.descr = descr;
    }
    /**
     * @return Returns the disEndDt.
     */
    public String getDisEndDt() {
        return disEndDt;
    }
    /**
     * @param disEndDt The disEndDt to set.
     */
    public void setDisEndDt(String disEndDt) {
        this.disEndDt = disEndDt;
    }
    /**
     * @return Returns the disStDt.
     */
    public String getDisStDt() {
        return disStDt;
    }
    /**
     * @param disStDt The disStDt to set.
     */
    public void setDisStDt(String disStDt) {
        this.disStDt = disStDt;
    }
    /**
     * @return Returns the dmgYn.
     */
    public String getDmgYn() {
        return dmgYn;
    }
    /**
     * @param dmgYn The dmgYn to set.
     */
    public void setDmgYn(String dmgYn) {
        this.dmgYn = dmgYn;
    }
    /**
     * @return Returns the estArrvDt.
     */
    public String getEstArrvDt() {
        return estArrvDt;
    }
    /**
     * @param estArrvDt The estArrvDt to set.
     */
    public void setEstArrvDt(String estArrvDt) {
        this.estArrvDt = estArrvDt;
    }
    /**
     * @return Returns the eta.
     */
    public String getEta() {
        return eta;
    }
    /**
     * @param eta The eta to set.
     */
    public void setEta(String eta) {
        this.eta = eta;
    }
    /**
     * @return Returns the etd.
     */
    public String getEtd() {
        return etd;
    }
    /**
     * @param etd The etd to set.
     */
    public void setEtd(String etd) {
        this.etd = etd;
    }
    /**
     * @return Returns the fdest.
     */
    public String getFdest() {
        return fdest;
    }
    /**
     * @param fdest The fdest to set.
     */
    public void setFdest(String fdest) {
        this.fdest = fdest;
    }
    /**
     * @return Returns the fwrAgnt.
     */
    public String getFwrAgnt() {
        return fwrAgnt;
    }
    /**
     * @param fwrAgnt The fwrAgnt to set.
     */
    public void setFwrAgnt(String fwrAgnt) {
        this.fwrAgnt = fwrAgnt;
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
     * @return Returns the hdlInEndDt.
     */
    public String getHdlInEndDt() {
        return hdlInEndDt;
    }
    /**
     * @param hdlInEndDt The hdlInEndDt to set.
     */
    public void setHdlInEndDt(String hdlInEndDt) {
        this.hdlInEndDt = hdlInEndDt;
    }
    /**
     * @return Returns the hdlInStDt.
     */
    public String getHdlInStDt() {
        return hdlInStDt;
    }
    /**
     * @param hdlInStDt The hdlInStDt to set.
     */
    public void setHdlInStDt(String hdlInStDt) {
        this.hdlInStDt = hdlInStDt;
    }
    /**
     * @return Returns the hdlOutEndDt.
     */
    public String getHdlOutEndDt() {
        return hdlOutEndDt;
    }
    /**
     * @param hdlOutEndDt The hdlOutEndDt to set.
     */
    public void setHdlOutEndDt(String hdlOutEndDt) {
        this.hdlOutEndDt = hdlOutEndDt;
    }
    /**
     * @return Returns the hdlOutStDt.
     */
    public String getHdlOutStDt() {
        return hdlOutStDt;
    }
    /**
     * @param hdlOutStDt The hdlOutStDt to set.
     */
    public void setHdlOutStDt(String hdlOutStDt) {
        this.hdlOutStDt = hdlOutStDt;
    }
    /**
     * @return Returns the loadCnclMode.
     */
    public String getLoadCnclMode() {
        return loadCnclMode;
    }
    /**
     * @param loadCnclMode The loadCnclMode to set.
     */
    public void setLoadCnclMode(String loadCnclMode) {
        this.loadCnclMode = loadCnclMode;
    }
    /**
     * @return Returns the loadEndDt.
     */
    public String getLoadEndDt() {
        return loadEndDt;
    }
    /**
     * @param loadEndDt The loadEndDt to set.
     */
    public void setLoadEndDt(String loadEndDt) {
        this.loadEndDt = loadEndDt;
    }
    /**
     * @return Returns the loadStDt.
     */
    public String getLoadStDt() {
        return loadStDt;
    }
    /**
     * @param loadStDt The loadStDt to set.
     */
    public void setLoadStDt(String loadStDt) {
        this.loadStDt = loadStDt;
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
     * @return Returns the locNm.
     */
    public String getLocNm() {
        return locNm;
    }
    /**
     * @param locNm The locNm to set.
     */
    public void setLocNm(String locNm) {
        this.locNm = locNm;
    }
    /**
     * @return Returns the markNo.
     */
    public String getMarkNo() {
        return markNo;
    }
    /**
     * @param markNo The markNo to set.
     */
    public void setMarkNo(String markNo) {
        this.markNo = markNo;
    }
    /**
     * @return Returns the mrgDvidCd.
     */
    public String getMrgDvidCd() {
        return mrgDvidCd;
    }
    /**
     * @param mrgDvidCd The mrgDvidCd to set.
     */
    public void setMrgDvidCd(String mrgDvidCd) {
        this.mrgDvidCd = mrgDvidCd;
    }
    /**
     * @return Returns the msrmt.
     */
    public double getMsrmt() {
        return msrmt;
    }
    /**
     * @param msrmt The msrmt to set.
     */
    public void setMsrmt(double msrmt) {
        this.msrmt = msrmt;
    }
    /**
     * @return Returns the msrmtUnit.
     */
    public String getMsrmtUnit() {
        return msrmtUnit;
    }
    /**
     * @param msrmtUnit The msrmtUnit to set.
     */
    public void setMsrmtUnit(String msrmtUnit) {
        this.msrmtUnit = msrmtUnit;
    }
    /**
     * @return Returns the nxLocId.
     */
    public String getNxLocId() {
        return nxLocId;
    }
    /**
     * @param nxLocId The nxLocId to set.
     */
    public void setNxLocId(String nxLocId) {
        this.nxLocId = nxLocId;
    }
    /**
     * @return Returns the opeClassCd.
     */
    public String getOpeClassCd() {
        return opeClassCd;
    }
    /**
     * @param opeClassCd The opeClassCd to set.
     */
    public void setOpeClassCd(String opeClassCd) {
        this.opeClassCd = opeClassCd;
    }
    /**
     * @return Returns the pkgQty.
     */
    public int getPkgQty() {
        return pkgQty;
    }
    /**
     * @param pkgQty The pkgQty to set.
     */
    public void setPkgQty(int pkgQty) {
        this.pkgQty = pkgQty;
    }
    /**
     * @return Returns the pkgTpCd.
     */
    public String getPkgTpCd() {
        return pkgTpCd;
    }
    /**
     * @param pkgTpCd The pkgTpCd to set.
     */
    public void setPkgTpCd(String pkgTpCd) {
        this.pkgTpCd = pkgTpCd;
    }
    /**
     * @return Returns the portOfDis.
     */
    public String getPortOfDis() {
        return portOfDis;
    }
    /**
     * @param portOfDis The portOfDis to set.
     */
    public void setPortOfDis(String portOfDis) {
        this.portOfDis = portOfDis;
    }
    /**
     * @return Returns the portOfLoad.
     */
    public String getPortOfLoad() {
        return portOfLoad;
    }
    /**
     * @param portOfLoad The portOfLoad to set.
     */
    public void setPortOfLoad(String portOfLoad) {
        this.portOfLoad = portOfLoad;
    }
    /**
     * @return Returns the prevLocId.
     */
    public String getPrevLocId() {
        return prevLocId;
    }
    /**
     * @param prevLocId The prevLocId to set.
     */
    public void setPrevLocId(String prevLocId) {
        this.prevLocId = prevLocId;
    }
    /**
     * @return Returns the pvslCallId.
     */
    public String getPvslCallId() {
        return pvslCallId;
    }
    /**
     * @param pvslCallId The pvslCallId to set.
     */
    public void setPvslCallId(String pvslCallId) {
        this.pvslCallId = pvslCallId;
    }
    /**
     * @return Returns the repkgMsrmt.
     */
    public double getRepkgMsrmt() {
        return repkgMsrmt;
    }
    /**
     * @param repkgMsrmt The repkgMsrmt to set.
     */
    public void setRepkgMsrmt(double repkgMsrmt) {
        this.repkgMsrmt = repkgMsrmt;
    }
    /**
     * @return Returns the repkgQty.
     */
    public int getRepkgQty() {
        return repkgQty;
    }
    /**
     * @param repkgQty The repkgQty to set.
     */
    public void setRepkgQty(int repkgQty) {
        this.repkgQty = repkgQty;
    }
    /**
     * @return Returns the repkgTpCd.
     */
    public String getRepkgTpCd() {
        return repkgTpCd;
    }
    /**
     * @param repkgTpCd The repkgTpCd to set.
     */
    public void setRepkgTpCd(String repkgTpCd) {
        this.repkgTpCd = repkgTpCd;
    }
    /**
     * @return Returns the repkgWgt.
     */
    public double getRepkgWgt() {
        return repkgWgt;
    }
    /**
     * @param repkgWgt The repkgWgt to set.
     */
    public void setRepkgWgt(double repkgWgt) {
        this.repkgWgt = repkgWgt;
    }
    /**
     * @return Returns the rhdlMode.
     */
    public String getRhdlMode() {
        return rhdlMode;
    }
    /**
     * @param rhdlMode The rhdlMode to set.
     */
    public void setRhdlMode(String rhdlMode) {
        this.rhdlMode = rhdlMode;
    }
    /**
     * @return Returns the rmk.
     */
    public String getRmk() {
        return rmk;
    }
    /**
     * @param rmk The rmk to set.
     */
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    /**
     * @return Returns the shipgAgnt.
     */
    public String getShipgAgnt() {
        return shipgAgnt;
    }
    /**
     * @param shipgAgnt The shipgAgnt to set.
     */
    public void setShipgAgnt(String shipgAgnt) {
        this.shipgAgnt = shipgAgnt;
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
     * @return Returns the shpr.
     */
    public String getShpr() {
        return shpr;
    }
    /**
     * @param shpr The shpr to set.
     */
    public void setShpr(String shpr) {
        this.shpr = shpr;
    }
    /**
     * @return Returns the shprAddr.
     */
    public String getShprAddr() {
        return shprAddr;
    }
    /**
     * @param shprAddr The shprAddr to set.
     */
    public void setShprAddr(String shprAddr) {
        this.shprAddr = shprAddr;
    }
    /**
     * @return Returns the shprNm.
     */
    public String getShprNm() {
        return shprNm;
    }
    /**
     * @param shprNm The shprNm to set.
     */
    public void setShprNm(String shprNm) {
        this.shprNm = shprNm;
    }
    /**
     * @return Returns the sprYn.
     */
    public String getSprYn() {
        return sprYn;
    }
    /**
     * @param sprYn The sprYn to set.
     */
    public void setSprYn(String sprYn) {
        this.sprYn = sprYn;
    }
    /**
     * @return Returns the statCd.
     */
    public String getStatCd() {
        return statCd;
    }
    /**
     * @param statCd The statCd to set.
     */
    public void setStatCd(String statCd) {
        this.statCd = statCd;
    }
    /**
     * @return Returns the strgNoteNo.
     */
    public String getStrgNoteNo() {
        return strgNoteNo;
    }
    /**
     * @param strgNoteNo The strgNoteNo to set.
     */
    public void setStrgNoteNo(String strgNoteNo) {
        this.strgNoteNo = strgNoteNo;
    }
    /**
     * @return Returns the tmnlInDt.
     */
    public String getTmnlInDt() {
        return tmnlInDt;
    }
    /**
     * @param tmnlInDt The tmnlInDt to set.
     */
    public void setTmnlInDt(String tmnlInDt) {
        this.tmnlInDt = tmnlInDt;
    }
    /**
     * @return Returns the tmnlOutDt.
     */
    public String getTmnlOutDt() {
        return tmnlOutDt;
    }
    /**
     * @param tmnlOutDt The tmnlOutDt to set.
     */
    public void setTmnlOutDt(String tmnlOutDt) {
        this.tmnlOutDt = tmnlOutDt;
    }
    /**
     * @return Returns the tsptr.
     */
    public String getTsptr() {
        return tsptr;
    }
    /**
     * @param tsptr The tsptr to set.
     */
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    /**
     * @return Returns the tsptTpCd.
     */
    public String getTsptTpCd() {
        return tsptTpCd;
    }
    /**
     * @param tsptTpCd The tsptTpCd to set.
     */
    public void setTsptTpCd(String tsptTpCd) {
        this.tsptTpCd = tsptTpCd;
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
    /**
     * @return Returns the wgt.
     */
    public double getWgt() {
        return wgt;
    }
    /**
     * @param wgt The wgt to set.
     */
    public void setWgt(double wgt) {
        this.wgt = wgt;
    }
    /**
     * @return Returns the wgtUnit.
     */
    public String getWgtUnit() {
        return wgtUnit;
    }
    /**
     * @param wgtUnit The wgtUnit to set.
     */
    public void setWgtUnit(String wgtUnit) {
        this.wgtUnit = wgtUnit;
    }
    /**
     * @return Returns the whFnlDelvYn.
     */
    public String getWhFnlDelvYn() {
        return whFnlDelvYn;
    }
    /**
     * @param whFnlDelvYn The whFnlDelvYn to set.
     */
    public void setWhFnlDelvYn(String whFnlDelvYn) {
        this.whFnlDelvYn = whFnlDelvYn;
    }
    /**
     * @return Returns the dirM3.
     */
    public double getDirM3() {
        return dirM3;
    }
    /**
     * @param dirM3 The dirM3 to set.
     */
    public void setDirM3(double dirM3) {
        this.dirM3 = dirM3;
    }
    /**
     * @return Returns the dirMt.
     */
    public double getDirMt() {
        return dirMt;
    }
    /**
     * @param dirMt The dirMt to set.
     */
    public void setDirMt(double dirMt) {
        this.dirMt = dirMt;
    }
    /**
     * @return Returns the dirQty.
     */
    public int getDirQty() {
        return dirQty;
    }
    /**
     * @param dirQty The dirQty to set.
     */
    public void setDirQty(int dirQty) {
        this.dirQty = dirQty;
    }
    /**
     * @return Returns the dmgM3.
     */
    public double getDmgM3() {
        return dmgM3;
    }
    /**
     * @param dmgM3 The dmgM3 to set.
     */
    public void setDmgM3(double dmgM3) {
        this.dmgM3 = dmgM3;
    }
    /**
     * @return Returns the dmgMt.
     */
    public double getDmgMt() {
        return dmgMt;
    }
    /**
     * @param dmgMt The dmgMt to set.
     */
    public void setDmgMt(double dmgMt) {
        this.dmgMt = dmgMt;
    }
    /**
     * @return Returns the dmgQty.
     */
    public int getDmgQty() {
        return dmgQty;
    }
    /**
     * @param dmgQty The dmgQty to set.
     */
    public void setDmgQty(int dmgQty) {
        this.dmgQty = dmgQty;
    }
    /**
     * @return Returns the gpM3.
     */
    public double getGpM3() {
        return gpM3;
    }
    /**
     * @param gpM3 The gpM3 to set.
     */
    public void setGpM3(double gpM3) {
        this.gpM3 = gpM3;
    }
    /**
     * @return Returns the gpMt.
     */
    public double getGpMt() {
        return gpMt;
    }
    /**
     * @param gpMt The gpMt to set.
     */
    public void setGpMt(double gpMt) {
        this.gpMt = gpMt;
    }
    /**
     * @return Returns the gpQty.
     */
    public int getGpQty() {
        return gpQty;
    }
    /**
     * @param gpQty The gpQty to set.
     */
    public void setGpQty(int gpQty) {
        this.gpQty = gpQty;
    }
    /**
     * @return Returns the grsM3.
     */
    public double getGrsM3() {
        return grsM3;
    }
    /**
     * @param grsM3 The grsM3 to set.
     */
    public void setGrsM3(double grsM3) {
        this.grsM3 = grsM3;
    }
    /**
     * @return Returns the grsMt.
     */
    public double getGrsMt() {
        return grsMt;
    }
    /**
     * @param grsMt The grsMt to set.
     */
    public void setGrsMt(double grsMt) {
        this.grsMt = grsMt;
    }
    /**
     * @return Returns the grsQty.
     */
    public int getGrsQty() {
        return grsQty;
    }
    /**
     * @param grsQty The grsQty to set.
     */
    public void setGrsQty(int grsQty) {
        this.grsQty = grsQty;
    }
    /**
     * @return Returns the indM3.
     */
    public double getIndM3() {
        return indM3;
    }
    /**
     * @param indM3 The indM3 to set.
     */
    public void setIndM3(double indM3) {
        this.indM3 = indM3;
    }
    /**
     * @return Returns the indMt.
     */
    public double getIndMt() {
        return indMt;
    }
    /**
     * @param indMt The indMt to set.
     */
    public void setIndMt(double indMt) {
        this.indMt = indMt;
    }
    /**
     * @return Returns the indQty.
     */
    public int getIndQty() {
        return indQty;
    }
    /**
     * @param indQty The indQty to set.
     */
    public void setIndQty(int indQty) {
        this.indQty = indQty;
    }
    /**
     * @return Returns the norM3.
     */
    public double getNorM3() {
        return norM3;
    }
    /**
     * @param norM3 The norM3 to set.
     */
    public void setNorM3(double norM3) {
        this.norM3 = norM3;
    }
    /**
     * @return Returns the norMt.
     */
    public double getNorMt() {
        return norMt;
    }
    /**
     * @param norMt The norMt to set.
     */
    public void setNorMt(double norMt) {
        this.norMt = norMt;
    }
    /**
     * @return Returns the norQty.
     */
    public int getNorQty() {
        return norQty;
    }
    /**
     * @param norQty The norQty to set.
     */
    public void setNorQty(int norQty) {
        this.norQty = norQty;
    }
    /**
     * @return Returns the shuM3.
     */
    public double getShuM3() {
        return shuM3;
    }
    /**
     * @param shuM3 The shuM3 to set.
     */
    public void setShuM3(double shuM3) {
        this.shuM3 = shuM3;
    }
    /**
     * @return Returns the shuMt.
     */
    public double getShuMt() {
        return shuMt;
    }
    /**
     * @param shuMt The shuMt to set.
     */
    public void setShuMt(double shuMt) {
        this.shuMt = shuMt;
    }
    /**
     * @return Returns the shuQty.
     */
    public int getShuQty() {
        return shuQty;
    }
    /**
     * @param shuQty The shuQty to set.
     */
    public void setShuQty(int shuQty) {
        this.shuQty = shuQty;
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
	public List getSnList() {
		return snList;
	}
	public void setSnList(List snList) {
		this.snList = snList;
	}
	public List getBlList() {
		return blList;
	}
	public void setBlList(List blList) {
		this.blList = blList;
	}
	public List getItems() {
		return items;
	}
	public void setItems(List items) {
		this.items = items;
	}
	public List getGrGoList() {
		return grGoList;
	}
	public void setGrGoList(List grGoList) {
		this.grGoList = grGoList;
	}
	public List getBookingNoList() {
		return bookingNoList;
	}
	public void setBookingNoList(List bookingNoList) {
		this.bookingNoList = bookingNoList;
	}
	public List getMasterBlList() {
		return masterBlList;
	}
	public void setMasterBlList(List masterBlList) {
		this.masterBlList = masterBlList;
	}
	public String getMfDocID() {
		return mfDocID;
	}
	public void setMfDocID(String mfDocID) {
		this.mfDocID = mfDocID;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getShftIdx() {
		return shftIdx;
	}
	public void setShftIdx(String shftIdx) {
		this.shftIdx = shftIdx;
	}
	public String getFmHhmm() {
		return fmHhmm;
	}
	public void setFmHhmm(String fmHhmm) {
		this.fmHhmm = fmHhmm;
	}
	public String getToHhmm() {
		return toHhmm;
	}
	public void setToHhmm(String toHhmm) {
		this.toHhmm = toHhmm;
	}
	
}
