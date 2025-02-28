package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class BLItem extends DataItem{
	private String vslCd;
	private String callSeq;
	private String callYear;
	private String vslCallId;
	private String vslNm;
	private String mfDocId;
	private String blNo;
	private String cgInOutTp;
	private String dMt;
	private String dM3;
	private String dQty;
	private String dLorryMt;
	private String dWagonMt;
	private String dConveYorMt;
	private String dPipeLineMt;
	private String iMt;
	private String iM3;
	private String iQty;
	private String iLorryMt;
	private String iWagonMt;
	private String iTsptTpCd;
	private String issueDt;
	private String cgTpCd;
	private String cmdtCd;
	private String tsptr;
	private String delvTpCd;
	private String tsptTpCd;
	private String fDest;
	private String nilMarkYn;
	private String wgt1;
	private String wgt2;
	private String estArrvDt;
	private String catgCd;
	private String dgSeq;
	private ArrayList<DGDeclarationItem> dgItems;
	private String pkgQty;
	private String pkgTpCd;
	private String fwrd;
	private String wgt;
	private String wgtUnit;
	private String vol;
	private String volUnit;
	private String gdsRmk;
	private String pol;
	private String polNm;
	private String pod;
	private String podNm;
	private String fnlPortCd;
	private String fnlPortNm;
	private String opClassCd;
	private String imdgClass;
	private String unno;
	private String imdgunno;
	private String substance;
	private String ackDt;
	private String ackBy;
	private String customsAprvDt;
	private String customsAprvStat;
	private String custDeclNo;
	private String cnsne;
	private String cnsneNm;
	private String cnsneAddr;
	private String cnsneAddr2;
	private String cnsneAddr3;
	private String cnsneAddr4;
	private String shpr;
	private String shprNm;
	private String shprAddr;
	private String shprAddr2;
	private String shprAddr3;
	private String shprAddr4;
	private String hsCode;
	private String pgkTpCdFz;
	private String nominateDt;
	private String ptnrCd;
	
	private String fwdNm;
	private String fwdCd;
	private String shaCd;
	private String shaNm;
	
	//For RORO
	private String unitNo;
	private String brandCd;
	private String brandNm;
	private String modelCd;
	private String modelNm;
	private String roroMt;
	private String cbm;
	private String newYn;
	private String ixCd;
	private String action;
	private String roroSeq;
	private ArrayList<BLItem> unitItems;
	
	private String blDtlSeq;
	private String cgWidth;
	private String cgHeight;
	private String cgLength;
	private String msrmt;
	private String hatchNo;
	private String pkgNo;
	private String cmdtGrpCd;
	private String cmdtGrpNm;
	private String cmdtCdNm;
	private String eachWgt;
	private String eachVol;
	private String voyage;
	private String docStatCd;
	private String docStatNm;
	private String parentId;
	private String parentCgTp;
	private String freighTon;
	private String notifyNm;
	private String notifyCd;
	private String notifyAddr;
	private String notifyAddr2;
	private String notifyAddr3;
	private String notifyAddr4;
	private String pkgTpNm;
	private String oldBlNo;
	private String hblNo;
	private String oldMfDocId;
	private String hsNm;
	private String insUserId;
	private String insDate;
	private String updUserId;
	private String updDate;
	private String cgTpNm;
	private String opClassNm;
	private String delvTpNm;
	private String pkgMark;
	private ArrayList<BLItem> blDetailItems;
	
	private String shipCallNo;
	private String vslName;
	private String shippingAgent;
	private String status;
	private String statusNm;
	private String cancelReg;
	private String submissionDate;
	
	private String cgInoutTp;
	private String mfRefNo;
	private String mfRmk; 
	private String insDtm; 
	private String updDtm; 
	
	private String inbVoy;
	private String outbVoy;
	private String vslTp;
	private String vslTpNm;
	private String container;
	private String cgOpTpNm;
	private String vslFlagCd;
	private String vslFlagNm;
	private String saCorpId;
	private String saCorpNm;
	private String lastPortCd;
	private String lastPortNm;
	private String nextPortCd;
	private String nextPortNm;
	private String berthLoc;
	private String berthLocNm;
	private String freezoneYn;
	private String eta;
	private String etd;
	private Date atb;
	private Date atd;
	private Date ata;
	private String terminalType;
	private String submitStat;
	private String docStatApprove;
	private String locCd;
	private String locNm;
	private String shippingAgentNm;
	private String cntrCount;
	private String blCount;
	
	private String nilMfYN;
	private String reqType;
	private String docApprvTpCd;
	private String rtnStatus;
	
	//container info
	private String cntrNo;
	private String size;
	private String type;
	private String cntrTypeNm;
	private String sealNo;
	private String seq;
	private String fzOprCd;
	private String fzLocCd;
	private String confirmTpCd;
	
	private String sCd; 
	private String sCdNm;
	
	private String projectCargo;
	private String domesticChk;
	
	private String pkgDesc;
	private String pkgMt;
	private String pkgM3;
	private String width;
	private String height;
	private String length;
	private String opeClassCd;
	
	private String wgtChk;
	private String markNo;
	
    private ArrayList<FileUploadItem> uploadItems;
    private ArrayList<BLItem> pkgItems;
    
	private String consignee;
	private String shipper;
	private String cargoAgent;
	private String cargoType;
	private String cargoTypeCd;
	private String cargoSubType;
	private String cargoSubTypeCd;
	private String commodity;
	private String commodityCd;
	private String mark;
	private String packageNumber;
	private String quantity;
	private String eachWeight;
	private String eachVolumn;
	private String totalWeight;
	private String totalVolumn;
	private String loadPort;
	private String dischargePort;
	private String dgNo;
	private String cargoDest;
	private String cargoDesc;
	private String parentCargoType;
	private String deliveryMode;
	private String deliveryModeCd;
	private Date estimateArrivalDate;
	private String transporter;
	private String modeofOp;
	private String modeofOpCd;
    
	private String orgBlNo;
	private String orgWgt;
	private String orgVol;
	private String orgPkgQty;
	private String splitCgWgt;
	private String splitCgVol;
	private String splitPkgQty;
	private String changeSplit;
	private String bondedWhYn;
	private String additionalChk;
	private String lotNo;
	private String tmnlHoldFlag;
	
	private String pkgRmk;
	
	private String disWgt;
	private String disVol;
	private String disPkgQty;
	private String doNo;
	private String sdoNo;
	private String arrvSaId;
	private String scn;
	
	public String getArrvSaId() {
		return arrvSaId;
	}
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}
	public String getPkgMark() {
		return pkgMark;
	}
	public void setPkgMark(String pkgMark) {
		this.pkgMark = pkgMark;
	}
	public String getOpClassNm() {
		return opClassNm;
	}
	public void setOpClassNm(String opClassNm) {
		this.opClassNm = opClassNm;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getUpdDate() {
		return updDate;
	}
	public void setUpdDate(String updDate) {
		this.updDate = updDate;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getInsUserId() {
		return insUserId;
	}
	public void setInsUserId(String insUserId) {
		this.insUserId = insUserId;
	}
	public String getInsDate() {
		return insDate;
	}
	public void setInsDate(String insDate) {
		this.insDate = insDate;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public String getHsNm() {
		return hsNm;
	}
	public void setHsNm(String hsNm) {
		this.hsNm = hsNm;
	}
	public String getOldMfDocId() {
		return oldMfDocId;
	}
	public void setOldMfDocId(String oldMfDocId) {
		this.oldMfDocId = oldMfDocId;
	}
	public String getHblNo() {
		return hblNo;
	}
	public void setHblNo(String hblNo) {
		this.hblNo = hblNo;
	}
	public String getOldBlNo() {
		return oldBlNo;
	}
	public void setOldBlNo(String oldBlNo) {
		this.oldBlNo = oldBlNo;
	}
	public String getPkgTpNm() {
		return pkgTpNm;
	}
	public void setPkgTpNm(String pkgTpNm) {
		this.pkgTpNm = pkgTpNm;
	}
	public String getCmdtGrpNm() {
		return cmdtGrpNm;
	}
	public void setCmdtGrpNm(String cmdtGrpNm) {
		this.cmdtGrpNm = cmdtGrpNm;
	}
	public String getCmdtCdNm() {
		return cmdtCdNm;
	}
	public void setCmdtCdNm(String cmdtCdNm) {
		this.cmdtCdNm = cmdtCdNm;
	}
	public String getNotifyNm() {
		return notifyNm;
	}
	public void setNotifyNm(String notifyNm) {
		this.notifyNm = notifyNm;
	}
	public String getNotifyCd() {
		return notifyCd;
	}
	public void setNotifyCd(String notifyCd) {
		this.notifyCd = notifyCd;
	}
	public String getNotifyAddr() {
		return notifyAddr;
	}
	public void setNotifyAddr(String notifyAddr) {
		this.notifyAddr = notifyAddr;
	}
	public String getNotifyAddr2() {
		return notifyAddr2;
	}
	public void setNotifyAddr2(String notifyAddr2) {
		this.notifyAddr2 = notifyAddr2;
	}
	public String getNotifyAddr3() {
		return notifyAddr3;
	}
	public void setNotifyAddr3(String notifyAddr3) {
		this.notifyAddr3 = notifyAddr3;
	}
	public String getNotifyAddr4() {
		return notifyAddr4;
	}
	public void setNotifyAddr4(String notifyAddr4) {
		this.notifyAddr4 = notifyAddr4;
	}
	public String getFreighTon() {
		return freighTon;
	}
	public void setFreighTon(String freighTon) {
		this.freighTon = freighTon;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getParentCgTp() {
		return parentCgTp;
	}
	public void setParentCgTp(String parentCgTp) {
		this.parentCgTp = parentCgTp;
	}
	public String getDocStatCd() {
		return docStatCd;
	}
	public void setDocStatCd(String docStatCd) {
		this.docStatCd = docStatCd;
	}
	public String getDocStatNm() {
		return docStatNm;
	}
	public void setDocStatNm(String docStatNm) {
		this.docStatNm = docStatNm;
	}
	public String getVoyage() {
		return voyage;
	}
	public void setVoyage(String voyage) {
		this.voyage = voyage;
	}
	public String getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(String eachWgt) {
		this.eachWgt = eachWgt;
	}
	public String getEachVol() {
		return eachVol;
	}
	public void setEachVol(String eachVol) {
		this.eachVol = eachVol;
	}
	public String getCmdtGrpCd() {
		return cmdtGrpCd;
	}
	public void setCmdtGrpCd(String cmdtGrpCd) {
		this.cmdtGrpCd = cmdtGrpCd;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getCgInOutTp() {
		return cgInOutTp;
	}
	public void setCgInOutTp(String cgInOutTp) {
		this.cgInOutTp = cgInOutTp;
	}
	public String getdMt() {
		return dMt;
	}
	public void setdMt(String dMt) {
		this.dMt = dMt;
	}
	public String getdM3() {
		return dM3;
	}
	public void setdM3(String dM3) {
		this.dM3 = dM3;
	}
	public String getdQty() {
		return dQty;
	}
	public void setdQty(String dQty) {
		this.dQty = dQty;
	}
	public String getdLorryMt() {
		return dLorryMt;
	}
	public void setdLorryMt(String dLorryMt) {
		this.dLorryMt = dLorryMt;
	}
	public String getdWagonMt() {
		return dWagonMt;
	}
	public void setdWagonMt(String dWagonMt) {
		this.dWagonMt = dWagonMt;
	}
	public String getdConveYorMt() {
		return dConveYorMt;
	}
	public void setdConveYorMt(String dConveYorMt) {
		this.dConveYorMt = dConveYorMt;
	}
	public String getdPipeLineMt() {
		return dPipeLineMt;
	}
	public void setdPipeLineMt(String dPipeLineMt) {
		this.dPipeLineMt = dPipeLineMt;
	}
	public String getiMt() {
		return iMt;
	}
	public void setiMt(String iMt) {
		this.iMt = iMt;
	}
	public String getiM3() {
		return iM3;
	}
	public void setiM3(String iM3) {
		this.iM3 = iM3;
	}
	public String getiQty() {
		return iQty;
	}
	public void setiQty(String iQty) {
		this.iQty = iQty;
	}
	public String getiLorryMt() {
		return iLorryMt;
	}
	public void setiLorryMt(String iLorryMt) {
		this.iLorryMt = iLorryMt;
	}
	public String getiWagonMt() {
		return iWagonMt;
	}
	public void setiWagonMt(String iWagonMt) {
		this.iWagonMt = iWagonMt;
	}
	public String getiTsptTpCd() {
		return iTsptTpCd;
	}
	public void setiTsptTpCd(String iTsptTpCd) {
		this.iTsptTpCd = iTsptTpCd;
	}
	public String getIssueDt() {
		return issueDt;
	}
	public void setIssueDt(String issueDt) {
		this.issueDt = issueDt;
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
	public String getTsptr() {
		return tsptr;
	}
	public void setTsptr(String tsptr) {
		this.tsptr = tsptr;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getfDest() {
		return fDest;
	}
	public void setfDest(String fDest) {
		this.fDest = fDest;
	}
	public String getNilMarkYn() {
		return nilMarkYn;
	}
	public void setNilMarkYn(String nilMarkYn) {
		this.nilMarkYn = nilMarkYn;
	}
	public String getWgt1() {
		return wgt1;
	}
	public void setWgt1(String wgt1) {
		this.wgt1 = wgt1;
	}
	public String getWgt2() {
		return wgt2;
	}
	public void setWgt2(String wgt2) {
		this.wgt2 = wgt2;
	}
	public String getEstArrvDt() {
		return estArrvDt;
	}
	public void setEstArrvDt(String estArrvDt) {
		this.estArrvDt = estArrvDt;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getDgSeq() {
		return dgSeq;
	}
	public void setDgSeq(String dgSeq) {
		this.dgSeq = dgSeq;
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
	public String getFwrd() {
		return fwrd;
	}
	public void setFwrd(String fwrd) {
		this.fwrd = fwrd;
	}
	public String getWgt() {
		return wgt;
	}
	public void setWgt(String wgt) {
		this.wgt = wgt;
	}
	public String getWgtUnit() {
		return wgtUnit;
	}
	public void setWgtUnit(String wgtUnit) {
		this.wgtUnit = wgtUnit;
	}
	public String getVol() {
		return vol;
	}
	public void setVol(String vol) {
		this.vol = vol;
	}
	public String getVolUnit() {
		return volUnit;
	}
	public void setVolUnit(String volUnit) {
		this.volUnit = volUnit;
	}
	public String getGdsRmk() {
		return gdsRmk;
	}
	public void setGdsRmk(String gdsRmk) {
		this.gdsRmk = gdsRmk;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getPolNm() {
		return polNm;
	}
	public void setPolNm(String polNm) {
		this.polNm = polNm;
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
	public String getFnlPortCd() {
		return fnlPortCd;
	}
	public void setFnlPortCd(String fnlPortCd) {
		this.fnlPortCd = fnlPortCd;
	}
	public String getFnlPortNm() {
		return fnlPortNm;
	}
	public void setFnlPortNm(String fnlPortNm) {
		this.fnlPortNm = fnlPortNm;
	}
	public String getOpClassCd() {
		return opClassCd;
	}
	public void setOpClassCd(String opClassCd) {
		this.opClassCd = opClassCd;
	}
	public String getImdgClass() {
		return imdgClass;
	}
	public void setImdgClass(String imdgClass) {
		this.imdgClass = imdgClass;
	}
	public String getSubstance() {
		return substance;
	}
	public void setSubstance(String substance) {
		this.substance = substance;
	}
	public String getAckDt() {
		return ackDt;
	}
	public void setAckDt(String ackDt) {
		this.ackDt = ackDt;
	}
	public String getAckBy() {
		return ackBy;
	}
	public void setAckBy(String ackBy) {
		this.ackBy = ackBy;
	}
	public String getCustomsAprvDt() {
		return customsAprvDt;
	}
	public void setCustomsAprvDt(String customsAprvDt) {
		this.customsAprvDt = customsAprvDt;
	}
	public String getCustomsAprvStat() {
		return customsAprvStat;
	}
	public void setCustomsAprvStat(String customsAprvStat) {
		this.customsAprvStat = customsAprvStat;
	}
	public String getCustDeclNo() {
		return custDeclNo;
	}
	public void setCustDeclNo(String custDeclNo) {
		this.custDeclNo = custDeclNo;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getCnsneAddr() {
		return cnsneAddr;
	}
	public void setCnsneAddr(String cnsneAddr) {
		this.cnsneAddr = cnsneAddr;
	}
	public String getCnsneAddr2() {
		return cnsneAddr2;
	}
	public void setCnsneAddr2(String cnsneAddr2) {
		this.cnsneAddr2 = cnsneAddr2;
	}
	public String getCnsneAddr3() {
		return cnsneAddr3;
	}
	public void setCnsneAddr3(String cnsneAddr3) {
		this.cnsneAddr3 = cnsneAddr3;
	}
	public String getCnsneAddr4() {
		return cnsneAddr4;
	}
	public void setCnsneAddr4(String cnsneAddr4) {
		this.cnsneAddr4 = cnsneAddr4;
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
	public String getShprAddr2() {
		return shprAddr2;
	}
	public void setShprAddr2(String shprAddr2) {
		this.shprAddr2 = shprAddr2;
	}
	public String getShprAddr3() {
		return shprAddr3;
	}
	public void setShprAddr3(String shprAddr3) {
		this.shprAddr3 = shprAddr3;
	}
	public String getShprAddr4() {
		return shprAddr4;
	}
	public void setShprAddr4(String shprAddr4) {
		this.shprAddr4 = shprAddr4;
	}
	public String getHsCode() {
		return hsCode;
	}
	public void setHsCode(String hsCode) {
		this.hsCode = hsCode;
	}
	public String getPgkTpCdFz() {
		return pgkTpCdFz;
	}
	public void setPgkTpCdFz(String pgkTpCdFz) {
		this.pgkTpCdFz = pgkTpCdFz;
	}
	public String getNominateDt() {
		return nominateDt;
	}
	public void setNominateDt(String nominateDt) {
		this.nominateDt = nominateDt;
	}
	public String getUnno() {
		return unno;
	}
	public void setUnno(String unno) {
		this.unno = unno;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getBrandNm() {
		return brandNm;
	}
	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getModelNm() {
		return modelNm;
	}
	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}
	public String getRoroMt() {
		return roroMt;
	}
	public void setRoroMt(String roroMt) {
		this.roroMt = roroMt;
	}
	public String getCbm() {
		return cbm;
	}
	public void setCbm(String cbm) {
		this.cbm = cbm;
	}
	public String getNewYn() {
		return newYn;
	}
	public void setNewYn(String newYn) {
		this.newYn = newYn;
	}
	public String getIxCd() {
		return ixCd;
	}
	public void setIxCd(String ixCd) {
		this.ixCd = ixCd;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public ArrayList<BLItem> getUnitItems() {
		return unitItems;
	}
	public void setUnitItems(ArrayList<BLItem> unitItems) {
		this.unitItems = unitItems;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getRoroSeq() {
		return roroSeq;
	}
	public void setRoroSeq(String roroSeq) {
		this.roroSeq = roroSeq;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getBlDtlSeq() {
		return blDtlSeq;
	}
	public void setBlDtlSeq(String blDtlSeq) {
		this.blDtlSeq = blDtlSeq;
	}
	public String getCgWidth() {
		return cgWidth;
	}
	public void setCgWidth(String cgWidth) {
		this.cgWidth = cgWidth;
	}
	public String getCgHeight() {
		return cgHeight;
	}
	public void setCgHeight(String cgHeight) {
		this.cgHeight = cgHeight;
	}
	public String getCgLength() {
		return cgLength;
	}
	public void setCgLength(String cgLength) {
		this.cgLength = cgLength;
	}
	public String getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(String msrmt) {
		this.msrmt = msrmt;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public ArrayList<BLItem> getBlDetailItems() {
		return blDetailItems;
	}
	public void setBlDetailItems(ArrayList<BLItem> blDetailItems) {
		this.blDetailItems = blDetailItems;
	}
	public String getImdgunno() {
		return imdgunno;
	}
	public void setImdgunno(String imdgunno) {
		this.imdgunno = imdgunno;
	}
	public String getShipCallNo() {
		return shipCallNo;
	}
	public void setShipCallNo(String shipCallNo) {
		this.shipCallNo = shipCallNo;
	}
	public String getVslName() {
		return vslName;
	}
	public void setVslName(String vslName) {
		this.vslName = vslName;
	}
	public String getShippingAgent() {
		return shippingAgent;
	}
	public void setShippingAgent(String shippingAgent) {
		this.shippingAgent = shippingAgent;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatusNm() {
		return statusNm;
	}
	public void setStatusNm(String statusNm) {
		this.statusNm = statusNm;
	}
	public String getCancelReg() {
		return cancelReg;
	}
	public void setCancelReg(String cancelReg) {
		this.cancelReg = cancelReg;
	}
	public String getSubmissionDate() {
		return submissionDate;
	}
	public void setSubmissionDate(String submissionDate) {
		this.submissionDate = submissionDate;
	}
	public String getCgInoutTp() {
		return cgInoutTp;
	}
	public void setCgInoutTp(String cgInoutTp) {
		this.cgInoutTp = cgInoutTp;
	}
	public String getMfRefNo() {
		return mfRefNo;
	}
	public void setMfRefNo(String mfRefNo) {
		this.mfRefNo = mfRefNo;
	}
	public String getMfRmk() {
		return mfRmk;
	}
	public void setMfRmk(String mfRmk) {
		this.mfRmk = mfRmk;
	}
	public String getInsDtm() {
		return insDtm;
	}
	public void setInsDtm(String insDtm) {
		this.insDtm = insDtm;
	}
	public String getUpdDtm() {
		return updDtm;
	}
	public void setUpdDtm(String updDtm) {
		this.updDtm = updDtm;
	}
	public String getInbVoy() {
		return inbVoy;
	}
	public void setInbVoy(String inbVoy) {
		this.inbVoy = inbVoy;
	}
	public String getOutbVoy() {
		return outbVoy;
	}
	public void setOutbVoy(String outbVoy) {
		this.outbVoy = outbVoy;
	}
	public String getVslTp() {
		return vslTp;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public String getVslTpNm() {
		return vslTpNm;
	}
	public void setVslTpNm(String vslTpNm) {
		this.vslTpNm = vslTpNm;
	}
	public String getContainer() {
		return container;
	}
	public void setContainer(String container) {
		this.container = container;
	}
	public String getCgOpTpNm() {
		return cgOpTpNm;
	}
	public void setCgOpTpNm(String cgOpTpNm) {
		this.cgOpTpNm = cgOpTpNm;
	}
	public String getVslFlagCd() {
		return vslFlagCd;
	}
	public void setVslFlagCd(String vslFlagCd) {
		this.vslFlagCd = vslFlagCd;
	}
	public String getVslFlagNm() {
		return vslFlagNm;
	}
	public void setVslFlagNm(String vslFlagNm) {
		this.vslFlagNm = vslFlagNm;
	}
	public String getSaCorpId() {
		return saCorpId;
	}
	public void setSaCorpId(String saCorpId) {
		this.saCorpId = saCorpId;
	}
	public String getSaCorpNm() {
		return saCorpNm;
	}
	public void setSaCorpNm(String saCorpNm) {
		this.saCorpNm = saCorpNm;
	}
	public String getLastPortCd() {
		return lastPortCd;
	}
	public void setLastPortCd(String lastPortCd) {
		this.lastPortCd = lastPortCd;
	}
	public String getLastPortNm() {
		return lastPortNm;
	}
	public void setLastPortNm(String lastPortNm) {
		this.lastPortNm = lastPortNm;
	}
	public String getNextPortCd() {
		return nextPortCd;
	}
	public void setNextPortCd(String nextPortCd) {
		this.nextPortCd = nextPortCd;
	}
	public String getNextPortNm() {
		return nextPortNm;
	}
	public void setNextPortNm(String nextPortNm) {
		this.nextPortNm = nextPortNm;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public String getBerthLocNm() {
		return berthLocNm;
	}
	public void setBerthLocNm(String berthLocNm) {
		this.berthLocNm = berthLocNm;
	}
	public String getFreezoneYn() {
		return freezoneYn;
	}
	public void setFreezoneYn(String freezoneYn) {
		this.freezoneYn = freezoneYn;
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
	public Date getAtb() {
		return atb;
	}
	public void setAtb(Date atb) {
		this.atb = atb;
	}
	public Date getAtd() {
		return atd;
	}
	public void setAtd(Date atd) {
		this.atd = atd;
	}
	public Date getAta() {
		return ata;
	}
	public void setAta(Date ata) {
		this.ata = ata;
	}
	public String getTerminalType() {
		return terminalType;
	}
	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}
	public String getSubmitStat() {
		return submitStat;
	}
	public void setSubmitStat(String submitStat) {
		this.submitStat = submitStat;
	}
	public String getDocStatApprove() {
		return docStatApprove;
	}
	public void setDocStatApprove(String docStatApprove) {
		this.docStatApprove = docStatApprove;
	}
	public String getLocCd() {
		return locCd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	public String getLocNm() {
		return locNm;
	}
	public void setLocNm(String locNm) {
		this.locNm = locNm;
	}
	public String getShippingAgentNm() {
		return shippingAgentNm;
	}
	public void setShippingAgentNm(String shippingAgentNm) {
		this.shippingAgentNm = shippingAgentNm;
	}
	public String getCntrCount() {
		return cntrCount;
	}
	public void setCntrCount(String cntrCount) {
		this.cntrCount = cntrCount;
	}
	public String getBlCount() {
		return blCount;
	}
	public void setBlCount(String blCount) {
		this.blCount = blCount;
	}
	public String getNilMfYN() {
		return nilMfYN;
	}
	public void setNilMfYN(String nilMfYN) {
		this.nilMfYN = nilMfYN;
	}
	public String getReqType() {
		return reqType;
	}
	public void setReqType(String reqType) {
		this.reqType = reqType;
	}
	public String getDocApprvTpCd() {
		return docApprvTpCd;
	}
	public void setDocApprvTpCd(String docApprvTpCd) {
		this.docApprvTpCd = docApprvTpCd;
	}
	public String getRtnStatus() {
		return rtnStatus;
	}
	public void setRtnStatus(String rtnStatus) {
		this.rtnStatus = rtnStatus;
	}
	public String getCntrNo() {
		return cntrNo;
	}
	public void setCntrNo(String cntrNo) {
		this.cntrNo = cntrNo;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getCntrTypeNm() {
		return cntrTypeNm;
	}
	public void setCntrTypeNm(String cntrTypeNm) {
		this.cntrTypeNm = cntrTypeNm;
	}
	public String getSealNo() {
		return sealNo;
	}
	public void setSealNo(String sealNo) {
		this.sealNo = sealNo;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getFzOprCd() {
		return fzOprCd;
	}
	public void setFzOprCd(String fzOprCd) {
		this.fzOprCd = fzOprCd;
	}
	public String getFzLocCd() {
		return fzLocCd;
	}
	public void setFzLocCd(String fzLocCd) {
		this.fzLocCd = fzLocCd;
	}
	public String getConfirmTpCd() {
		return confirmTpCd;
	}
	public void setConfirmTpCd(String confirmTpCd) {
		this.confirmTpCd = confirmTpCd;
	}
	public String getsCd() {
		return sCd;
	}
	public void setsCd(String sCd) {
		this.sCd = sCd;
	}
	public String getsCdNm() {
		return sCdNm;
	}
	public void setsCdNm(String sCdNm) {
		this.sCdNm = sCdNm;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getProjectCargo() {
		return projectCargo;
	}
	public void setProjectCargo(String projectCargo) {
		this.projectCargo = projectCargo;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public String getPkgDesc() {
		return pkgDesc;
	}
	public void setPkgDesc(String pkgDesc) {
		this.pkgDesc = pkgDesc;
	}
	public String getPkgMt() {
		return pkgMt;
	}
	public void setPkgMt(String pkgMt) {
		this.pkgMt = pkgMt;
	}
	public String getPkgM3() {
		return pkgM3;
	}
	public void setPkgM3(String pkgM3) {
		this.pkgM3 = pkgM3;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public ArrayList<BLItem> getPkgItems() {
		return pkgItems;
	}
	public void setPkgItems(ArrayList<BLItem> pkgItems) {
		this.pkgItems = pkgItems;
	}
	public String getWgtChk() {
		return wgtChk;
	}
	public void setWgtChk(String wgtChk) {
		this.wgtChk = wgtChk;
	}
	public String getMarkNo() {
		return markNo;
	}
	public void setMarkNo(String markNo) {
		this.markNo = markNo;
	}
	public String getConsignee() {
		return consignee;
	}
	public void setConsignee(String consignee) {
		this.consignee = consignee;
	}
	public String getShipper() {
		return shipper;
	}
	public void setShipper(String shipper) {
		this.shipper = shipper;
	}
	public String getCargoAgent() {
		return cargoAgent;
	}
	public void setCargoAgent(String cargoAgent) {
		this.cargoAgent = cargoAgent;
	}
	public String getCargoType() {
		return cargoType;
	}
	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}
	public String getCargoTypeCd() {
		return cargoTypeCd;
	}
	public void setCargoTypeCd(String cargoTypeCd) {
		this.cargoTypeCd = cargoTypeCd;
	}
	public String getCargoSubType() {
		return cargoSubType;
	}
	public void setCargoSubType(String cargoSubType) {
		this.cargoSubType = cargoSubType;
	}
	public String getCargoSubTypeCd() {
		return cargoSubTypeCd;
	}
	public void setCargoSubTypeCd(String cargoSubTypeCd) {
		this.cargoSubTypeCd = cargoSubTypeCd;
	}
	public String getCommodity() {
		return commodity;
	}
	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}
	public String getCommodityCd() {
		return commodityCd;
	}
	public void setCommodityCd(String commodityCd) {
		this.commodityCd = commodityCd;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getPackageNumber() {
		return packageNumber;
	}
	public void setPackageNumber(String packageNumber) {
		this.packageNumber = packageNumber;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getEachWeight() {
		return eachWeight;
	}
	public void setEachWeight(String eachWeight) {
		this.eachWeight = eachWeight;
	}
	public String getEachVolumn() {
		return eachVolumn;
	}
	public void setEachVolumn(String eachVolumn) {
		this.eachVolumn = eachVolumn;
	}
	public String getTotalWeight() {
		return totalWeight;
	}
	public void setTotalWeight(String totalWeight) {
		this.totalWeight = totalWeight;
	}
	public String getTotalVolumn() {
		return totalVolumn;
	}
	public void setTotalVolumn(String totalVolumn) {
		this.totalVolumn = totalVolumn;
	}
	public String getLoadPort() {
		return loadPort;
	}
	public void setLoadPort(String loadPort) {
		this.loadPort = loadPort;
	}
	public String getDischargePort() {
		return dischargePort;
	}
	public void setDischargePort(String dischargePort) {
		this.dischargePort = dischargePort;
	}
	public String getDgNo() {
		return dgNo;
	}
	public void setDgNo(String dgNo) {
		this.dgNo = dgNo;
	}
	public String getCargoDest() {
		return cargoDest;
	}
	public void setCargoDest(String cargoDest) {
		this.cargoDest = cargoDest;
	}
	public String getCargoDesc() {
		return cargoDesc;
	}
	public void setCargoDesc(String cargoDesc) {
		this.cargoDesc = cargoDesc;
	}
	public String getParentCargoType() {
		return parentCargoType;
	}
	public void setParentCargoType(String parentCargoType) {
		this.parentCargoType = parentCargoType;
	}
	public String getDeliveryMode() {
		return deliveryMode;
	}
	public void setDeliveryMode(String deliveryMode) {
		this.deliveryMode = deliveryMode;
	}
	public String getDeliveryModeCd() {
		return deliveryModeCd;
	}
	public void setDeliveryModeCd(String deliveryModeCd) {
		this.deliveryModeCd = deliveryModeCd;
	}
	public Date getEstimateArrivalDate() {
		return estimateArrivalDate;
	}
	public void setEstimateArrivalDate(Date estimateArrivalDate) {
		this.estimateArrivalDate = estimateArrivalDate;
	}
	public String getTransporter() {
		return transporter;
	}
	public void setTransporter(String transporter) {
		this.transporter = transporter;
	}
	public String getModeofOp() {
		return modeofOp;
	}
	public void setModeofOp(String modeofOp) {
		this.modeofOp = modeofOp;
	}
	public String getModeofOpCd() {
		return modeofOpCd;
	}
	public void setModeofOpCd(String modeofOpCd) {
		this.modeofOpCd = modeofOpCd;
	}
	public String getOrgBlNo() {
		return orgBlNo;
	}
	public void setOrgBlNo(String orgBlNo) {
		this.orgBlNo = orgBlNo;
	}
	public String getOrgWgt() {
		return orgWgt;
	}
	public void setOrgWgt(String orgWgt) {
		this.orgWgt = orgWgt;
	}
	public String getOrgVol() {
		return orgVol;
	}
	public void setOrgVol(String orgVol) {
		this.orgVol = orgVol;
	}
	public String getOrgPkgQty() {
		return orgPkgQty;
	}
	public void setOrgPkgQty(String orgPkgQty) {
		this.orgPkgQty = orgPkgQty;
	}
	public String getSplitCgWgt() {
		return splitCgWgt;
	}
	public void setSplitCgWgt(String splitCgWgt) {
		this.splitCgWgt = splitCgWgt;
	}
	public String getSplitCgVol() {
		return splitCgVol;
	}
	public void setSplitCgVol(String splitCgVol) {
		this.splitCgVol = splitCgVol;
	}
	public String getSplitPkgQty() {
		return splitPkgQty;
	}
	public void setSplitPkgQty(String splitPkgQty) {
		this.splitPkgQty = splitPkgQty;
	}
	public String getChangeSplit() {
		return changeSplit;
	}
	public void setChangeSplit(String changeSplit) {
		this.changeSplit = changeSplit;
	}
	public String getBondedWhYn() {
		return bondedWhYn;
	}
	public void setBondedWhYn(String bondedWhYn) {
		this.bondedWhYn = bondedWhYn;
	}
	public String getAdditionalChk() {
		return additionalChk;
	}
	public void setAdditionalChk(String additionalChk) {
		this.additionalChk = additionalChk;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getPkgRmk() {
		return pkgRmk;
	}
	public void setPkgRmk(String pkgRmk) {
		this.pkgRmk = pkgRmk;
	}
	public String getTmnlHoldFlag() {
		return tmnlHoldFlag;
	}
	public void setTmnlHoldFlag(String tmnlHoldFlag) {
		this.tmnlHoldFlag = tmnlHoldFlag;
	}
	public String getDisWgt() {
		return disWgt;
	}
	public void setDisWgt(String disWgt) {
		this.disWgt = disWgt;
	}
	public String getDisVol() {
		return disVol;
	}
	public void setDisVol(String disVol) {
		this.disVol = disVol;
	}
	public String getDisPkgQty() {
		return disPkgQty;
	}
	public void setDisPkgQty(String disPkgQty) {
		this.disPkgQty = disPkgQty;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getSdoNo() {
		return sdoNo;
	}
	public void setSdoNo(String sdoNo) {
		this.sdoNo = sdoNo;
	}
	public ArrayList<DGDeclarationItem> getDgItems() {
		return dgItems;
	}
	public void setDgItems(ArrayList<DGDeclarationItem> dgItems) {
		this.dgItems = dgItems;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	
}
