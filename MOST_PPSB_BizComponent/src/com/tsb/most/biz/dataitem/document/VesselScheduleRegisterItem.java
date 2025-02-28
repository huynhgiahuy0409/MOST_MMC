package com.tsb.most.biz.dataitem.document;

import com.tsb.most.framework.dataitem.DataItem;

public class VesselScheduleRegisterItem extends DataItem{

	private String vslCd;
	private String vslNm;
	private String summitStat;
	private String vslCallId;
	private String inbVoy;
	private String outbVoy;
	private String portCd;
	private String purpCallDesc;
	private String shipOffNo;
	private String imoNo;
	private float loa;
	private String berthTp;
	private String vslTp;
	private String berthPlan;
	private String advDtTm;
	private String eta;
	private String yot;
	private String yct;
	private String etb;
	private String etw;
	private String etc;
	private String etu;
	private String etd;
	private String rtb;
	private String ata;
	private String atw;
	private String pilotRqArv;
	private String pilotOnBrdArv;
	private String atb;
	private String atc;
	private String atu;
	private String pilotRqDep;
	private String pilotOnBrdDep;
	private String agencyCd;
	private String shpLineCd;
	private String insUserLogInAgency;
	private String deprSaId;
	private String bargeAftPort;
	private String bargeAftSTBD;
	private String bargeForwPort;
	private String bargeForwSTBD;
	private String layupLightDisp;
	private String layupExpInitDt;
	private String layupPurp;
	private String layupAntiPeriod;
	private String layupForeDrf;
	private String layupAFTDrf;
	private String layupLoadForeDrf;
	private String layupLoadDisp;
	private String layupLoadAtfDrf;
	private String layupAntpRpdFmDt;
	private String layupAntpRpdToDt;
	private String exCntMpts;
	private String imCntMpts;
	private String tsCntMpts;
	private String imCntJcts;
	private String exCntJcts;
	private String tsCntJcts;
	private String engNm;
	private String idNo;
	private String engNmTel;
	private String arrvDt;
	private String lastPort;
	private String mapassLstPort;
	private String nextPort;
	private String mapassNxtPort;
	private String loadCg;
	private String dischCg;
	private String loadCgQty;
	private String dischCgQty;
	private String shiftCgQty;
	private String submitRemark;
	private String oldEta;
	private String oldEtd;
	private String oldAta;
	private String oldAtd;
	private String oldYct;
	private String contNm;
	private String contNo;
	private String etaFixYn;
	private String topTier;
	private String berthAlongSide;
	private String cargoTpMpts;
	private String noCrane;
	private String noFirearm;
	private String bunkerQty;
	private String frsWRQty;
	private String specIntr;
	private String mapprvYn;
	private String mapprvAgent;
	private String saNm;
	private String saAddr;
	private String saTel;
	private String saFax;
	private String refvslCallId;
	private String refvslCallIdBak;
	private String berthWd;
	private String clsYn;
	private String arrvSaId;
	private String rqFreshWt;
	private String rqChangdelling;
	private String rqQtyBkr;
	private String berthLoc;
	private String berthDtm;
	private String berthNm;
	private String ibSrvLane;
	private String obSrvLane;
	private String highestPoint;
	private String clrYyMm;
	private String insDtm;
	private String opeTp;
	private String cargoTp;
	private String cargoOpTp;
	private String loadCargoQty;
	private String dischCargoQty;
	private String grt;
	private String dwt;
	private String drfArrv;
	private String drfDeptr;
	private String deptTp;
	private String vcDiv;
	private String stowwYn;
	private String armsYn;
	private String dgImCnt;
	private String dgExCnt;
	private String etaNova;
	private String dgGdYn;
	private String dgArr;
	private String dgDep;
	private String advImmgYn;
	private String vsRemark;
	private String btr;
	private String shipLv;
	private String callSign;
	private String scn;
	private String atd;
	private String callSq;
	private String callYear;
	private String loaSum;
	private String purpCall;
	private String saCorpId;
	private String engSnm;
	private String chkAtd;
	private String locCd;
	private String statCd;
	private String statCdNm;
	private String docApprvStat;
	private String ispsLv;
	private String insUsrId;
	private String updDtm;
	private String updUsrId;
	private String crud;
	private String zb55RegNo;
	private String zb55Status;
	private String ptnrCd;
	private String rmk;
	private String copyStt;
	private String apprvDt;
	private String refVslCallId;
	private String domesticChk;
	private String vslDraft1;
	private String vslDraft2;
	private String arrvAfterDrf;
	private String arrvFwdDrf;
	private String deptAfterDrf;
	private String deptFwdDrf;
	private float startPos;
	private float endPos;
	private float pstSta;
	private String barterTrade;
	
	
	public String getBarterTrade() {
		return barterTrade;
	}
	public void setBarterTrade(String barterTrade) {
		this.barterTrade = barterTrade;
	}
	public String getApprvDt() {
		return apprvDt;
	}
	public void setApprvDt(String apprvDt) {
		this.apprvDt = apprvDt;
	}
	public String getCopyStt() {
		return copyStt;
	}
	public void setCopyStt(String copyStt) {
		this.copyStt = copyStt;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getZb55Status() {
		return zb55Status;
	}
	public void setZb55Status(String zb55Status) {
		this.zb55Status = zb55Status;
	}
	public String getZb55RegNo() {
		return zb55RegNo;
	}
	public void setZb55RegNo(String zb55RegNo) {
		this.zb55RegNo = zb55RegNo;
	}
	public String getCrud() {
		return crud;
	}
	public void setCrud(String crud) {
		this.crud = crud;
	}
	private VesselParticularItem vslPartiItem;
	public float getLoa() {
		return loa;
	}
	public void setLoa(float loa) {
		this.loa = loa;
	}
	public VesselParticularItem getVslPartiItem() {
		return vslPartiItem;
	}
	public void setVslPartiItem(VesselParticularItem vslPartiItem) {
		this.vslPartiItem = vslPartiItem;
	}
	public String getBerthTp() {
		return berthTp;
	}
	public String getBargeAftPort() {
		return bargeAftPort;
	}
	public String getBargeAftSTBD() {
		return bargeAftSTBD;
	}
	public String getBargeForwPort() {
		return bargeForwPort;
	}
	public String getBargeForwSTBD() {
		return bargeForwSTBD;
	}
	public String getLayupLightDisp() {
		return layupLightDisp;
	}
	public String getLayupExpInitDt() {
		return layupExpInitDt;
	}
	public String getLayupPurp() {
		return layupPurp;
	}
	public String getLayupAntiPeriod() {
		return layupAntiPeriod;
	}
	public String getLayupForeDrf() {
		return layupForeDrf;
	}
	public String getLayupAFTDrf() {
		return layupAFTDrf;
	}
	public String getLayupLoadForeDrf() {
		return layupLoadForeDrf;
	}
	public String getLayupLoadDisp() {
		return layupLoadDisp;
	}
	public String getLayupLoadAtfDrf() {
		return layupLoadAtfDrf;
	}
	public String getLayupAntpRpdFmDt() {
		return layupAntpRpdFmDt;
	}
	public String getLayupAntpRpdToDt() {
		return layupAntpRpdToDt;
	}
	public String getExCntMpts() {
		return exCntMpts;
	}
	public String getImCntMpts() {
		return imCntMpts;
	}
	public String getTsCntMpts() {
		return tsCntMpts;
	}
	public String getImCntJcts() {
		return imCntJcts;
	}
	public String getExCntJcts() {
		return exCntJcts;
	}
	public String getTsCntJcts() {
		return tsCntJcts;
	}
	public String getEngNm() {
		return engNm;
	}
	public String getIdNo() {
		return idNo;
	}
	public String getEngNmTel() {
		return engNmTel;
	}
	public String getArrvDt() {
		return arrvDt;
	}
	public String getLastPort() {
		return lastPort;
	}
	public String getMapassLstPort() {
		return mapassLstPort;
	}
	public String getNextPort() {
		return nextPort;
	}
	public String getMapassNxtPort() {
		return mapassNxtPort;
	}
	public String getLoadCg() {
		return loadCg;
	}
	public String getDischCg() {
		return dischCg;
	}
	public String getLoadCgQty() {
		return loadCgQty;
	}
	public String getDischCgQty() {
		return dischCgQty;
	}
	public String getShiftCgQty() {
		return shiftCgQty;
	}
	public String getSubmitRemark() {
		return submitRemark;
	}
	public String getOldEta() {
		return oldEta;
	}
	public String getOldEtd() {
		return oldEtd;
	}
	public String getOldAta() {
		return oldAta;
	}
	public String getOldAtd() {
		return oldAtd;
	}
	public String getOldYct() {
		return oldYct;
	}
	public String getContNm() {
		return contNm;
	}
	public String getContNo() {
		return contNo;
	}
	public String getEtaFixYn() {
		return etaFixYn;
	}
	public String getTopTier() {
		return topTier;
	}
	public String getBerthAlongSide() {
		return berthAlongSide;
	}
	public String getCargoTpMpts() {
		return cargoTpMpts;
	}
	public String getNoCrane() {
		return noCrane;
	}
	public String getNoFirearm() {
		return noFirearm;
	}
	public String getBunkerQty() {
		return bunkerQty;
	}
	public String getFrsWRQty() {
		return frsWRQty;
	}
	public String getSpecIntr() {
		return specIntr;
	}
	public String getMapprvYn() {
		return mapprvYn;
	}
	public String getMapprvAgent() {
		return mapprvAgent;
	}
	public String getSaNm() {
		return saNm;
	}
	public String getSaAddr() {
		return saAddr;
	}
	public String getSaTel() {
		return saTel;
	}
	public String getSaFax() {
		return saFax;
	}
	public String getRefvslCallId() {
		return refvslCallId;
	}
	public String getRefvslCallIdBak() {
		return refvslCallIdBak;
	}
	public String getBerthWd() {
		return berthWd;
	}
	public String getClsYn() {
		return clsYn;
	}
	public String getBerthDtm() {
		return berthDtm;
	}
	public String getIbSrvLane() {
		return ibSrvLane;
	}
	public String getObSrvLane() {
		return obSrvLane;
	}
	public String getHighestPoint() {
		return highestPoint;
	}
	public String getClrYyMm() {
		return clrYyMm;
	}
	public String getInsDtm() {
		return insDtm;
	}
	public String getCargoOpTp() {
		return cargoOpTp;
	}
	public String getDeptTp() {
		return deptTp;
	}
	public String getVcDiv() {
		return vcDiv;
	}
	public String getStowwYn() {
		return stowwYn;
	}
	public String getArmsYn() {
		return armsYn;
	}
	public String getDgImCnt() {
		return dgImCnt;
	}
	public String getDgExCnt() {
		return dgExCnt;
	}
	public String getEtaNova() {
		return etaNova;
	}
	public String getDgGdYn() {
		return dgGdYn;
	}
	public String getDgArr() {
		return dgArr;
	}
	public String getDgDep() {
		return dgDep;
	}
	public String getAdvImmgYn() {
		return advImmgYn;
	}
	public String getVsRemark() {
		return vsRemark;
	}
	public String getBtr() {
		return btr;
	}
	public String getIspsLv() {
		return ispsLv;
	}
	public String getInsUsrId() {
		return insUsrId;
	}
	public String getUpdDtm() {
		return updDtm;
	}
	public String getUpdUsrId() {
		return updUsrId;
	}
	public void setBerthTp(String berthTp) {
		this.berthTp = berthTp;
	}
	public void setBargeAftPort(String bargeAftPort) {
		this.bargeAftPort = bargeAftPort;
	}
	public void setBargeAftSTBD(String bargeAftSTBD) {
		this.bargeAftSTBD = bargeAftSTBD;
	}
	public void setBargeForwPort(String bargeForwPort) {
		this.bargeForwPort = bargeForwPort;
	}
	public void setBargeForwSTBD(String bargeForwSTBD) {
		this.bargeForwSTBD = bargeForwSTBD;
	}
	public void setLayupLightDisp(String layupLightDisp) {
		this.layupLightDisp = layupLightDisp;
	}
	public void setLayupExpInitDt(String layupExpInitDt) {
		this.layupExpInitDt = layupExpInitDt;
	}
	public void setLayupPurp(String layupPurp) {
		this.layupPurp = layupPurp;
	}
	public void setLayupAntiPeriod(String layupAntiPeriod) {
		this.layupAntiPeriod = layupAntiPeriod;
	}
	public void setLayupForeDrf(String layupForeDrf) {
		this.layupForeDrf = layupForeDrf;
	}
	public void setLayupAFTDrf(String layupAFTDrf) {
		this.layupAFTDrf = layupAFTDrf;
	}
	public void setLayupLoadForeDrf(String layupLoadForeDrf) {
		this.layupLoadForeDrf = layupLoadForeDrf;
	}
	public void setLayupLoadDisp(String layupLoadDisp) {
		this.layupLoadDisp = layupLoadDisp;
	}
	public void setLayupLoadAtfDrf(String layupLoadAtfDrf) {
		this.layupLoadAtfDrf = layupLoadAtfDrf;
	}
	public void setLayupAntpRpdFmDt(String layupAntpRpdFmDt) {
		this.layupAntpRpdFmDt = layupAntpRpdFmDt;
	}
	public void setLayupAntpRpdToDt(String layupAntpRpdToDt) {
		this.layupAntpRpdToDt = layupAntpRpdToDt;
	}
	public void setExCntMpts(String exCntMpts) {
		this.exCntMpts = exCntMpts;
	}
	public void setImCntMpts(String imCntMpts) {
		this.imCntMpts = imCntMpts;
	}
	public void setTsCntMpts(String tsCntMpts) {
		this.tsCntMpts = tsCntMpts;
	}
	public void setImCntJcts(String imCntJcts) {
		this.imCntJcts = imCntJcts;
	}
	public void setExCntJcts(String exCntJcts) {
		this.exCntJcts = exCntJcts;
	}
	public void setTsCntJcts(String tsCntJcts) {
		this.tsCntJcts = tsCntJcts;
	}
	public void setEngNm(String engNm) {
		this.engNm = engNm;
	}
	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}
	public void setEngNmTel(String engNmTel) {
		this.engNmTel = engNmTel;
	}
	public void setArrvDt(String arrvDt) {
		this.arrvDt = arrvDt;
	}
	public void setLastPort(String lastPort) {
		this.lastPort = lastPort;
	}
	public void setMapassLstPort(String mapassLstPort) {
		this.mapassLstPort = mapassLstPort;
	}
	public void setNextPort(String nextPort) {
		this.nextPort = nextPort;
	}
	public void setMapassNxtPort(String mapassNxtPort) {
		this.mapassNxtPort = mapassNxtPort;
	}
	public void setLoadCg(String loadCg) {
		this.loadCg = loadCg;
	}
	public void setDischCg(String dischCg) {
		this.dischCg = dischCg;
	}
	public void setLoadCgQty(String loadCgQty) {
		this.loadCgQty = loadCgQty;
	}
	public void setDischCgQty(String dischCgQty) {
		this.dischCgQty = dischCgQty;
	}
	public void setShiftCgQty(String shiftCgQty) {
		this.shiftCgQty = shiftCgQty;
	}
	public void setSubmitRemark(String submitRemark) {
		this.submitRemark = submitRemark;
	}
	public void setOldEta(String oldEta) {
		this.oldEta = oldEta;
	}
	public void setOldEtd(String oldEtd) {
		this.oldEtd = oldEtd;
	}
	public void setOldAta(String oldAta) {
		this.oldAta = oldAta;
	}
	public void setOldAtd(String oldAtd) {
		this.oldAtd = oldAtd;
	}
	public void setOldYct(String oldYct) {
		this.oldYct = oldYct;
	}
	public void setContNm(String contNm) {
		this.contNm = contNm;
	}
	public void setContNo(String contNo) {
		this.contNo = contNo;
	}
	public void setEtaFixYn(String etaFixYn) {
		this.etaFixYn = etaFixYn;
	}
	public void setTopTier(String topTier) {
		this.topTier = topTier;
	}
	public void setBerthAlongSide(String berthAlongSide) {
		this.berthAlongSide = berthAlongSide;
	}
	public void setCargoTpMpts(String cargoTpMpts) {
		this.cargoTpMpts = cargoTpMpts;
	}
	public void setNoCrane(String noCrane) {
		this.noCrane = noCrane;
	}
	public void setNoFirearm(String noFirearm) {
		this.noFirearm = noFirearm;
	}
	public void setBunkerQty(String bunkerQty) {
		this.bunkerQty = bunkerQty;
	}
	public void setFrsWRQty(String frsWRQty) {
		this.frsWRQty = frsWRQty;
	}
	public void setSpecIntr(String specIntr) {
		this.specIntr = specIntr;
	}
	public void setMapprvYn(String mapprvYn) {
		this.mapprvYn = mapprvYn;
	}
	public void setMapprvAgent(String mapprvAgent) {
		this.mapprvAgent = mapprvAgent;
	}
	public void setSaNm(String saNm) {
		this.saNm = saNm;
	}
	public void setSaAddr(String saAddr) {
		this.saAddr = saAddr;
	}
	public void setSaTel(String saTel) {
		this.saTel = saTel;
	}
	public void setSaFax(String saFax) {
		this.saFax = saFax;
	}
	public void setRefvslCallId(String refvslCallId) {
		this.refvslCallId = refvslCallId;
	}
	public void setBerthWd(String berthWd) {
		this.berthWd = berthWd;
	}
	public void setClsYn(String clsYn) {
		this.clsYn = clsYn;
	}
	public void setBerthDtm(String berthDtm) {
		this.berthDtm = berthDtm;
	}
	public void setIbSrvLane(String ibSrvLane) {
		this.ibSrvLane = ibSrvLane;
	}
	public void setObSrvLane(String obSrvLane) {
		this.obSrvLane = obSrvLane;
	}
	public void setHighestPoint(String highestPoint) {
		this.highestPoint = highestPoint;
	}
	public void setClrYyMm(String clrYyMm) {
		this.clrYyMm = clrYyMm;
	}
	public void setInsDtm(String insDtm) {
		this.insDtm = insDtm;
	}
	public void setCargoOpTp(String cargoOpTp) {
		this.cargoOpTp = cargoOpTp;
	}
	public void setDeptTp(String deptTp) {
		this.deptTp = deptTp;
	}
	public void setVcDiv(String vcDiv) {
		this.vcDiv = vcDiv;
	}
	public void setStowwYn(String stowwYn) {
		this.stowwYn = stowwYn;
	}
	public void setArmsYn(String armsYn) {
		this.armsYn = armsYn;
	}
	public void setDgImCnt(String dgImCnt) {
		this.dgImCnt = dgImCnt;
	}
	public void setDgExCnt(String dgExCnt) {
		this.dgExCnt = dgExCnt;
	}
	public void setEtaNova(String etaNova) {
		this.etaNova = etaNova;
	}
	public void setDgGdYn(String dgGdYn) {
		this.dgGdYn = dgGdYn;
	}
	public void setDgArr(String dgArr) {
		this.dgArr = dgArr;
	}
	public void setDgDep(String dgDep) {
		this.dgDep = dgDep;
	}
	public void setAdvImmgYn(String advImmgYn) {
		this.advImmgYn = advImmgYn;
	}
	public void setVsRemark(String vsRemark) {
		this.vsRemark = vsRemark;
	}
	public void setBtr(String btr) {
		this.btr = btr;
	}
	public void setIspsLv(String ispsLv) {
		this.ispsLv = ispsLv;
	}
	public void setInsUsrId(String insUsrId) {
		this.insUsrId = insUsrId;
	}
	public void setUpdDtm(String updDtm) {
		this.updDtm = updDtm;
	}
	public void setUpdUsrId(String updUsrId) {
		this.updUsrId = updUsrId;
	}
	public String getVslCd() {
		return vslCd;
	}
	public String getVslNm() {
		return vslNm;
	}
	public String getSummitStat() {
		return summitStat;
	}
	public String getvslCallId() {
		return vslCallId;
	}
	public String getInbVoy() {
		return inbVoy;
	}
	public String getOutbVoy() {
		return outbVoy;
	}
	public String getPortCd() {
		return portCd;
	}
	public String getPurpCallDesc() {
		return purpCallDesc;
	}
	public String getShipOffNo() {
		return shipOffNo;
	}
	public String getImoNo() {
		return imoNo;
	}
	public String getVslTp() {
		return vslTp;
	}
	public String getBerthPlan() {
		return berthPlan;
	}
	public String getAdvDtTm() {
		return advDtTm;
	}
	public String getEta() {
		return eta;
	}
	public String getYot() {
		return yot;
	}
	public String getYct() {
		return yct;
	}
	public String getEtb() {
		return etb;
	}
	public String getEtw() {
		return etw;
	}
	public String getEtc() {
		return etc;
	}
	public String getEtu() {
		return etu;
	}
	public String getEtd() {
		return etd;
	}
	public String getRtb() {
		return rtb;
	}
	public String getAta() {
		return ata;
	}
	public String getPilotRqArv() {
		return pilotRqArv;
	}
	public String getPilotOnBrdArv() {
		return pilotOnBrdArv;
	}
	public String getAtb() {
		return atb;
	}
	public String getAtc() {
		return atc;
	}
	public String getAtu() {
		return atu;
	}
	public String getPilotRqDep() {
		return pilotRqDep;
	}
	public String getPilotOnBrdDep() {
		return pilotOnBrdDep;
	}
	public String getAgencyCd() {
		return agencyCd;
	}
	public String getShpLineCd() {
		return shpLineCd;
	}
	public String getInsUserLogInAgency() {
		return insUserLogInAgency;
	}
	public String getDeprSaId() {
		return deprSaId;
	}
	public String getArrvSaId() {
		return arrvSaId;
	}
	public String getRqFreshWt() {
		return rqFreshWt;
	}
	public String getRqChangdelling() {
		return rqChangdelling;
	}
	public String getRqQtyBkr() {
		return rqQtyBkr;
	}
	public String getBerthLoc() {
		return berthLoc;
	}
	public String getBerthNm() {
		return berthNm;
	}
	public String getOpeTp() {
		return opeTp;
	}
	public String getCargoTp() {
		return cargoTp;
	}
	public String getLoadCargoQty() {
		return loadCargoQty;
	}
	public String getDischCargoQty() {
		return dischCargoQty;
	}
	public String getGrt() {
		return grt;
	}
	public String getDwt() {
		return dwt;
	}
	public String getDrfArrv() {
		return drfArrv;
	}
	public String getDrfDeptr() {
		return drfDeptr;
	}
	public String getShipLv() {
		return shipLv;
	}
	public String getCallSign() {
		return callSign;
	}
	public String getScn() {
		return scn;
	}
	public String getAtd() {
		return atd;
	}
	public String getCallSq() {
		return callSq;
	}
	public String getCallYear() {
		return callYear;
	}
	public String getLoaSum() {
		return loaSum;
	}
	public String getPurpCall() {
		return purpCall;
	}
	public String getSaCorpId() {
		return saCorpId;
	}
	public String getEngSnm() {
		return engSnm;
	}
	public String getChkAtd() {
		return chkAtd;
	}
	public String getLocCd() {
		return locCd;
	}
	public String getDocApprvStat() {
		return docApprvStat;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public void setSummitStat(String summitStat) {
		this.summitStat = summitStat;
	}
	public void setvslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public void setInbVoy(String inbVoy) {
		this.inbVoy = inbVoy;
	}
	public void setOutbVoy(String outbVoy) {
		this.outbVoy = outbVoy;
	}
	public void setPortCd(String portCd) {
		this.portCd = portCd;
	}
	public void setPurpCallDesc(String purpCallDesc) {
		this.purpCallDesc = purpCallDesc;
	}
	public void setShipOffNo(String shipOffNo) {
		this.shipOffNo = shipOffNo;
	}
	public void setImoNo(String imoNo) {
		this.imoNo = imoNo;
	}
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public void setBerthPlan(String berthPlan) {
		this.berthPlan = berthPlan;
	}
	public void setAdvDtTm(String advDtTm) {
		this.advDtTm = advDtTm;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public void setYot(String yot) {
		this.yot = yot;
	}
	public void setYct(String yct) {
		this.yct = yct;
	}
	public void setEtb(String etb) {
		this.etb = etb;
	}
	public void setEtw(String etw) {
		this.etw = etw;
	}
	public void setEtc(String etc) {
		this.etc = etc;
	}
	public void setEtu(String etu) {
		this.etu = etu;
	}
	public void setEtd(String etd) {
		this.etd = etd;
	}
	public void setRtb(String rtb) {
		this.rtb = rtb;
	}
	public void setAta(String ata) {
		this.ata = ata;
	}
	public void setPilotRqArv(String pilotRqArv) {
		this.pilotRqArv = pilotRqArv;
	}
	public void setPilotOnBrdArv(String pilotOnBrdArv) {
		this.pilotOnBrdArv = pilotOnBrdArv;
	}
	public void setAtb(String atb) {
		this.atb = atb;
	}
	public void setAtc(String atc) {
		this.atc = atc;
	}
	public void setAtu(String atu) {
		this.atu = atu;
	}
	public void setPilotRqDep(String pilotRqDep) {
		this.pilotRqDep = pilotRqDep;
	}
	public void setPilotOnBrdDep(String pilotOnBrdDep) {
		this.pilotOnBrdDep = pilotOnBrdDep;
	}
	public void setAgencyCd(String agencyCd) {
		this.agencyCd = agencyCd;
	}
	public void setShpLineCd(String shpLineCd) {
		this.shpLineCd = shpLineCd;
	}
	public void setInsUserLogInAgency(String insUserLogInAgency) {
		this.insUserLogInAgency = insUserLogInAgency;
	}
	public void setDeprSaId(String deprSaId) {
		this.deprSaId = deprSaId;
	}
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}
	public void setRqFreshWt(String rqFreshWt) {
		this.rqFreshWt = rqFreshWt;
	}
	public void setRqChangdelling(String rqChangdelling) {
		this.rqChangdelling = rqChangdelling;
	}
	public void setRqQtyBkr(String rqQtyBkr) {
		this.rqQtyBkr = rqQtyBkr;
	}
	public void setBerthLoc(String berthLoc) {
		this.berthLoc = berthLoc;
	}
	public void setBerthNm(String berthNm) {
		this.berthNm = berthNm;
	}
	public void setOpeTp(String opeTp) {
		this.opeTp = opeTp;
	}
	public void setCargoTp(String cargoTp) {
		this.cargoTp = cargoTp;
	}
	public void setLoadCargoQty(String loadCargoQty) {
		this.loadCargoQty = loadCargoQty;
	}
	public void setDischCargoQty(String dischCargoQty) {
		this.dischCargoQty = dischCargoQty;
	}
	public void setGrt(String grt) {
		this.grt = grt;
	}
	public void setDwt(String dwt) {
		this.dwt = dwt;
	}
	public void setDrfArrv(String drfArrv) {
		this.drfArrv = drfArrv;
	}
	public void setDrfDeptr(String drfDeptr) {
		this.drfDeptr = drfDeptr;
	}
	public void setShipLv(String shipLv) {
		this.shipLv = shipLv;
	}
	public void setCallSign(String callSign) {
		this.callSign = callSign;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public void setAtd(String atd) {
		this.atd = atd;
	}
	public void setCallSq(String callSq) {
		this.callSq = callSq;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public void setLoaSum(String loaSum) {
		this.loaSum = loaSum;
	}
	public void setPurpCall(String purpCall) {
		this.purpCall = purpCall;
	}
	public void setSaCorpId(String saCorpId) {
		this.saCorpId = saCorpId;
	}
	public void setEngSnm(String engSnm) {
		this.engSnm = engSnm;
	}
	public void setChkAtd(String chkAtd) {
		this.chkAtd = chkAtd;
	}
	public void setLocCd(String locCd) {
		this.locCd = locCd;
	}
	public void setDocApprvStat(String docApprvStat) {
		this.docApprvStat = docApprvStat;
	}
	public String getRefVslCallId() {
		return refVslCallId;
	}
	public void setRefVslCallId(String refVslCallId) {
		this.refVslCallId = refVslCallId;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getStatCdNm() {
		return statCdNm;
	}
	public void setStatCdNm(String statCdNm) {
		this.statCdNm = statCdNm;
	}
	public String getVslDraft1() {
		return vslDraft1;
	}
	public void setVslDraft1(String vslDraft1) {
		this.vslDraft1 = vslDraft1;
	}
	public String getVslDraft2() {
		return vslDraft2;
	}
	public void setVslDraft2(String vslDraft2) {
		this.vslDraft2 = vslDraft2;
	}
	public String getArrvAfterDrf() {
		return arrvAfterDrf;
	}
	public void setArrvAfterDrf(String arrvAfterDrf) {
		this.arrvAfterDrf = arrvAfterDrf;
	}
	public String getArrvFwdDrf() {
		return arrvFwdDrf;
	}
	public void setArrvFwdDrf(String arrvFwdDrf) {
		this.arrvFwdDrf = arrvFwdDrf;
	}
	public String getDeptAfterDrf() {
		return deptAfterDrf;
	}
	public void setDeptAfterDrf(String deptAfterDrf) {
		this.deptAfterDrf = deptAfterDrf;
	}
	public String getDeptFwdDrf() {
		return deptFwdDrf;
	}
	public void setDeptFwdDrf(String deptFwdDrf) {
		this.deptFwdDrf = deptFwdDrf;
	}
	public float getStartPos() {
		return startPos;
	}
	public void setStartPos(float startPos) {
		this.startPos = startPos;
	}
	public float getEndPos() {
		return endPos;
	}
	public void setEndPos(float endPos) {
		this.endPos = endPos;
	}
	public float getPstSta() {
		return pstSta;
	}
	public void setPstSta(float pstSta) {
		this.pstSta = pstSta;
	}
	public String getAtw() {
		return atw;
	}
	public void setAtw(String atw) {
		this.atw = atw;
	}
}
