package com.tsb.most.biz.dataitem.operation;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CargoManualCtlItem extends DataItem {

    private String vslCallId;
    private String cgNo;
    private String opeClassCd;
    private String tsptTpCd;
    private String tsptr;
    private String markNo;
    private String statCd;
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
    private double  msrmt;
    private String msrmtUnit;
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
    private String prevLocId;
    private String currLocId;
    private String nxLocId;
    private String cgOpeStat;
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
    private String actlDelvTpCd;
    private String pvslCallId;
    private String sprYn;
    private String whFnlDelvYn;
    private String vslNm;
    private String estArrvDt;
    private String blSn;
    private String cngShp;
    private String descr;
    private String locId;
    private String locNm;
    private String gatePassNo;
    private String eta; 
    private String etd;
    private String berthLoc;
    private double grsMt;
    private double grsM3;
    private int	grsQty;
    private double dirMt;
    private double dirM3;
    private int	dirQty;
    private double indMt;
    private double indM3;
    private int	indQty;    
    private double norMt;
    private double norM3;
    private int	norQty;
    private double dmgMt;
    private double dmgM3;
    private int	dmgQty;
    private double shuMt;
    private double shuM3;
    private int	shuQty;
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
    private String wbTransactionNo;
    private String secondWgt;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getTsptr() {
		return tsptr;
	}
	public void setTsptr(String tsptr) {
		this.tsptr = tsptr;
	}
	public String getMarkNo() {
		return markNo;
	}
	public void setMarkNo(String markNo) {
		this.markNo = markNo;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getHdlInStDt() {
		return hdlInStDt;
	}
	public void setHdlInStDt(String hdlInStDt) {
		this.hdlInStDt = hdlInStDt;
	}
	public String getHdlInEndDt() {
		return hdlInEndDt;
	}
	public void setHdlInEndDt(String hdlInEndDt) {
		this.hdlInEndDt = hdlInEndDt;
	}
	public String getHdlOutStDt() {
		return hdlOutStDt;
	}
	public void setHdlOutStDt(String hdlOutStDt) {
		this.hdlOutStDt = hdlOutStDt;
	}
	public String getHdlOutEndDt() {
		return hdlOutEndDt;
	}
	public void setHdlOutEndDt(String hdlOutEndDt) {
		this.hdlOutEndDt = hdlOutEndDt;
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
	public String getDisStDt() {
		return disStDt;
	}
	public void setDisStDt(String disStDt) {
		this.disStDt = disStDt;
	}
	public String getDisEndDt() {
		return disEndDt;
	}
	public void setDisEndDt(String disEndDt) {
		this.disEndDt = disEndDt;
	}
	public int getPkgQty() {
		return pkgQty;
	}
	public void setPkgQty(int pkgQty) {
		this.pkgQty = pkgQty;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public String getWgtUnit() {
		return wgtUnit;
	}
	public void setWgtUnit(String wgtUnit) {
		this.wgtUnit = wgtUnit;
	}
	public double getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}
	public String getMsrmtUnit() {
		return msrmtUnit;
	}
	public void setMsrmtUnit(String msrmtUnit) {
		this.msrmtUnit = msrmtUnit;
	}
	public int getRepkgQty() {
		return repkgQty;
	}
	public void setRepkgQty(int repkgQty) {
		this.repkgQty = repkgQty;
	}
	public double getRepkgWgt() {
		return repkgWgt;
	}
	public void setRepkgWgt(double repkgWgt) {
		this.repkgWgt = repkgWgt;
	}
	public double getRepkgMsrmt() {
		return repkgMsrmt;
	}
	public void setRepkgMsrmt(double repkgMsrmt) {
		this.repkgMsrmt = repkgMsrmt;
	}
	public String getRepkgTpCd() {
		return repkgTpCd;
	}
	public void setRepkgTpCd(String repkgTpCd) {
		this.repkgTpCd = repkgTpCd;
	}
	public String getLoadCnclMode() {
		return loadCnclMode;
	}
	public void setLoadCnclMode(String loadCnclMode) {
		this.loadCnclMode = loadCnclMode;
	}
	public String getDmgYn() {
		return dmgYn;
	}
	public void setDmgYn(String dmgYn) {
		this.dmgYn = dmgYn;
	}
	public String getRhdlMode() {
		return rhdlMode;
	}
	public void setRhdlMode(String rhdlMode) {
		this.rhdlMode = rhdlMode;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getTmnlInDt() {
		return tmnlInDt;
	}
	public void setTmnlInDt(String tmnlInDt) {
		this.tmnlInDt = tmnlInDt;
	}
	public String getTmnlOutDt() {
		return tmnlOutDt;
	}
	public void setTmnlOutDt(String tmnlOutDt) {
		this.tmnlOutDt = tmnlOutDt;
	}
	public String getPrevLocId() {
		return prevLocId;
	}
	public void setPrevLocId(String prevLocId) {
		this.prevLocId = prevLocId;
	}
	public String getCurrLocId() {
		return currLocId;
	}
	public void setCurrLocId(String currLocId) {
		this.currLocId = currLocId;
	}
	public String getNxLocId() {
		return nxLocId;
	}
	public void setNxLocId(String nxLocId) {
		this.nxLocId = nxLocId;
	}
	public String getCgOpeStat() {
		return cgOpeStat;
	}
	public void setCgOpeStat(String cgOpeStat) {
		this.cgOpeStat = cgOpeStat;
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
	public String getMrgDvidCd() {
		return mrgDvidCd;
	}
	public void setMrgDvidCd(String mrgDvidCd) {
		this.mrgDvidCd = mrgDvidCd;
	}
	public String getCustClrCd() {
		return custClrCd;
	}
	public void setCustClrCd(String custClrCd) {
		this.custClrCd = custClrCd;
	}
	public String getClrYmd() {
		return clrYmd;
	}
	public void setClrYmd(String clrYmd) {
		this.clrYmd = clrYmd;
	}
	public String getCustApprvCd() {
		return custApprvCd;
	}
	public void setCustApprvCd(String custApprvCd) {
		this.custApprvCd = custApprvCd;
	}
	public String getApprvYmd() {
		return apprvYmd;
	}
	public void setApprvYmd(String apprvYmd) {
		this.apprvYmd = apprvYmd;
	}
	public String getShipgAgnt() {
		return shipgAgnt;
	}
	public void setShipgAgnt(String shipgAgnt) {
		this.shipgAgnt = shipgAgnt;
	}
	public String getFwrAgnt() {
		return fwrAgnt;
	}
	public void setFwrAgnt(String fwrAgnt) {
		this.fwrAgnt = fwrAgnt;
	}
	public String getShpr() {
		return shpr;
	}
	public void setShpr(String shpr) {
		this.shpr = shpr;
	}
	public String getShprNm() {
		return shprNm;
	}
	public void setShprNm(String shprNm) {
		this.shprNm = shprNm;
	}
	public String getShprAddr() {
		return shprAddr;
	}
	public void setShprAddr(String shprAddr) {
		this.shprAddr = shprAddr;
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
	public String getCnsneAddr() {
		return cnsneAddr;
	}
	public void setCnsneAddr(String cnsneAddr) {
		this.cnsneAddr = cnsneAddr;
	}
	public String getCntryOfOrg() {
		return cntryOfOrg;
	}
	public void setCntryOfOrg(String cntryOfOrg) {
		this.cntryOfOrg = cntryOfOrg;
	}
	public String getPortOfLoad() {
		return portOfLoad;
	}
	public void setPortOfLoad(String portOfLoad) {
		this.portOfLoad = portOfLoad;
	}
	public String getPortOfDis() {
		return portOfDis;
	}
	public void setPortOfDis(String portOfDis) {
		this.portOfDis = portOfDis;
	}
	public String getFdest() {
		return fdest;
	}
	public void setFdest(String fdest) {
		this.fdest = fdest;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getStrgNoteNo() {
		return strgNoteNo;
	}
	public void setStrgNoteNo(String strgNoteNo) {
		this.strgNoteNo = strgNoteNo;
	}
	public int getBillPkgQty() {
		return billPkgQty;
	}
	public void setBillPkgQty(int billPkgQty) {
		this.billPkgQty = billPkgQty;
	}
	public double getBillWgt() {
		return billWgt;
	}
	public void setBillWgt(double billWgt) {
		this.billWgt = billWgt;
	}
	public double getBillMsrmt() {
		return billMsrmt;
	}
	public void setBillMsrmt(double billMsrmt) {
		this.billMsrmt = billMsrmt;
	}
	public String getActlDelvTpCd() {
		return actlDelvTpCd;
	}
	public void setActlDelvTpCd(String actlDelvTpCd) {
		this.actlDelvTpCd = actlDelvTpCd;
	}
	public String getPvslCallId() {
		return pvslCallId;
	}
	public void setPvslCallId(String pvslCallId) {
		this.pvslCallId = pvslCallId;
	}
	public String getSprYn() {
		return sprYn;
	}
	public void setSprYn(String sprYn) {
		this.sprYn = sprYn;
	}
	public String getWhFnlDelvYn() {
		return whFnlDelvYn;
	}
	public void setWhFnlDelvYn(String whFnlDelvYn) {
		this.whFnlDelvYn = whFnlDelvYn;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getEstArrvDt() {
		return estArrvDt;
	}
	public void setEstArrvDt(String estArrvDt) {
		this.estArrvDt = estArrvDt;
	}
	public String getBlSn() {
		return blSn;
	}
	public void setBlSn(String blSn) {
		this.blSn = blSn;
	}
	public String getCngShp() {
		return cngShp;
	}
	public void setCngShp(String cngShp) {
		this.cngShp = cngShp;
	}
	public String getDescr() {
		return descr;
	}
	public void setDescr(String descr) {
		this.descr = descr;
	}
	public String getLocId() {
		return locId;
	}
	public void setLocId(String locId) {
		this.locId = locId;
	}
	public String getLocNm() {
		return locNm;
	}
	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}
	public String getGatePassNo() {
		return gatePassNo;
	}
	public void setGatePassNo(String gatePassNo) {
		this.gatePassNo = gatePassNo;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getEtd() {
		return etd;
	}
	public void setEtd(String etd) {
		this.etd = etd;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public double getGrsMt() {
		return grsMt;
	}
	public void setGrsMt(double grsMt) {
		this.grsMt = grsMt;
	}
	public double getGrsM3() {
		return grsM3;
	}
	public void setGrsM3(double grsM3) {
		this.grsM3 = grsM3;
	}
	public int getGrsQty() {
		return grsQty;
	}
	public void setGrsQty(int grsQty) {
		this.grsQty = grsQty;
	}
	public double getDirMt() {
		return dirMt;
	}
	public void setDirMt(double dirMt) {
		this.dirMt = dirMt;
	}
	public double getDirM3() {
		return dirM3;
	}
	public void setDirM3(double dirM3) {
		this.dirM3 = dirM3;
	}
	public int getDirQty() {
		return dirQty;
	}
	public void setDirQty(int dirQty) {
		this.dirQty = dirQty;
	}
	public double getIndMt() {
		return indMt;
	}
	public void setIndMt(double indMt) {
		this.indMt = indMt;
	}
	public double getIndM3() {
		return indM3;
	}
	public void setIndM3(double indM3) {
		this.indM3 = indM3;
	}
	public int getIndQty() {
		return indQty;
	}
	public void setIndQty(int indQty) {
		this.indQty = indQty;
	}
	public double getNorMt() {
		return norMt;
	}
	public void setNorMt(double norMt) {
		this.norMt = norMt;
	}
	public double getNorM3() {
		return norM3;
	}
	public void setNorM3(double norM3) {
		this.norM3 = norM3;
	}
	public int getNorQty() {
		return norQty;
	}
	public void setNorQty(int norQty) {
		this.norQty = norQty;
	}
	public double getDmgMt() {
		return dmgMt;
	}
	public void setDmgMt(double dmgMt) {
		this.dmgMt = dmgMt;
	}
	public double getDmgM3() {
		return dmgM3;
	}
	public void setDmgM3(double dmgM3) {
		this.dmgM3 = dmgM3;
	}
	public int getDmgQty() {
		return dmgQty;
	}
	public void setDmgQty(int dmgQty) {
		this.dmgQty = dmgQty;
	}
	public double getShuMt() {
		return shuMt;
	}
	public void setShuMt(double shuMt) {
		this.shuMt = shuMt;
	}
	public double getShuM3() {
		return shuM3;
	}
	public void setShuM3(double shuM3) {
		this.shuM3 = shuM3;
	}
	public int getShuQty() {
		return shuQty;
	}
	public void setShuQty(int shuQty) {
		this.shuQty = shuQty;
	}
	public double getGpMt() {
		return gpMt;
	}
	public void setGpMt(double gpMt) {
		this.gpMt = gpMt;
	}
	public double getGpM3() {
		return gpM3;
	}
	public void setGpM3(double gpM3) {
		this.gpM3 = gpM3;
	}
	public int getGpQty() {
		return gpQty;
	}
	public void setGpQty(int gpQty) {
		this.gpQty = gpQty;
	}
	public String getArrvDtFm() {
		return arrvDtFm;
	}
	public void setArrvDtFm(String arrvDtFm) {
		this.arrvDtFm = arrvDtFm;
	}
	public String getArrvDtTo() {
		return arrvDtTo;
	}
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
	public String getWbTransactionNo() {
		return wbTransactionNo;
	}
	public void setWbTransactionNo(String wbTransactionNo) {
		this.wbTransactionNo = wbTransactionNo;
	}
	public String getSecondWgt() {
		return secondWgt;
	}
	public void setSecondWgt(String secondWgt) {
		this.secondWgt = secondWgt;
	}

}
