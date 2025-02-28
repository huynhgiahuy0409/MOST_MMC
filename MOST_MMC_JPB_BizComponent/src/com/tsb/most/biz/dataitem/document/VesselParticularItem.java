package com.tsb.most.biz.dataitem.document;

import com.tsb.most.framework.dataitem.DataItem;

public class VesselParticularItem extends DataItem{
	private static final long serialVersionUID = 1L;
	
	private String vslNm;
	private String vslCd;
	private String imoNo;
	private String callSign;
	private String vslFlagCd;
	private String vslRegPort;
	private String launchDt;
	private String vslTp;
	private String terminalTp;
	private String loa;
	private String nrt;
	private String grt;
	private String saCorpId;
	private String jctConfirm;
	private String statCd;
	private String statCdNm;
	private String saNm;
	private String insDtm;
	private String confirmDtm;
	private String isscExprDt;
	private String customExprDt;
	private String shipOffNo;
	private String compliantYn;
	private String floatYn;
	private String check;
	private String callYear;
	private String ukc;
	private String sbt;
	private String sdRmp;
	private String rmp;
	private String pumpCapa;
	private String shaCd;
	private String saCorpNm;
	private String confirmDt;
	private String schCnt;
	private String optVer;
	private String no2Yn;
	private String fldMstYn;
	private String autoApproveYn;
	private String reportFrsYn;
	private String dblHullYn;
	private String ballastYn;		
	private String pipeTrnk;
	private String ispsLvl;
	private String mnfld1;
	private String mnfld2;
	private String mnfld3;
	private String mnfld4;
	private String mnfld5;
	private String mnfld6;
	private String mooIst;
	private String noxUnno;
	private String sternThrt;
	private String bowThrt;
	private String swlBrd;					
	private String swlHole;	
	private String prplTp;	
	private String prplNo;
	private String ocimf;		
	private String blackVsl;					
	private String blackCountry;	
	private String rcCnt;
	private String inmarsatNo;
	private String mmsiCd;
	private String bldYear;
	private String domYn;
	private String cntryNm;
	private String flagState;
	private String cntryCd;
	private String rudeTp;
	private String vslTp3Trade;
	private String vslTpNm;
	private String vslRegPortNm;
	private String regDt;
	private String countChk;
	
	public String getCountChk() {
		return countChk;
	}
	public void setCountChk(String countChk) {
		this.countChk = countChk;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	private String lstDrydock;
	public String getLaunchDt() {
		return launchDt;
	}
	public String getLstDrydock() {
		return lstDrydock;
	}
	public void setLaunchDt(String launchDt) {
		this.launchDt = launchDt;
	}
	public void setLstDrydock(String lstDrydock) {
		this.lstDrydock = lstDrydock;
	}
	private String lbp;
	private String vslWidth;
	private String vslDepth;
	private String summDrf;
	private String topTier;
	private String antnHgt;
	private String disp;
	private String floatCraneYn;
	private String craneSide;
	private String alongSide;
	private String isscNo;
	private String isscNmAuth;
	private String dwt;
	private String baleCapa;
	private String grainCapa;
	private String engDesc;
	private String endBhp;
	private String speed;
	private String mxTeu;
	private String hatchQty;
	private String mxRowDeck;
	private String mxRowHold;
	private String natCd;
	private String vslOutr;
	private String mapassOfficialNo;
	private String mapassRegPort;
	private String updDtm;
	private String updUserId;
	private String vslDiv;
	private String crewNo;
	private String navEqu;
	private String bunkerCond;
	private String consumSea;
	private String freshwtCond;
	private String apprxDist;
	private String towingSpeed;
	private String cotradCerti;
	private String towingEq;
	private String confirmUserId;
	private String rpmType;
	private String shpCd;
	private String shipLicenseExprDt;
	private String shipLicense; 
	private String corpId;
	private String corpNm;
	private String vesselOwner;	 
	private String hiddenVslCd;
	private String vslSchApChk;
	private String vslTpTrade;
	private String class1;
	private String outr;
	private String engBhp;
	private String endDesc;
	private String insUserId;
	private String remarks;
	private String shippingLineCd;
	private String shippingLineNm;
	private String newOptVer;
	private String sideRamp;
	private String ramp;
	private String pipeTrunk;
	private String bowThrtKw;
	private String sternThrtKw;
	private String peopleDiv;
	private String peopleNm;
	private String peopleCd;
	private String address1;
	private String address2;
	private String address3;
	private String address4;
	private String portCd1;
	private String owPeopleNm;
	private String owAddress1;
	private String owAddress2;
	private String owAddress3;
	private String owAddress4;
	private String owPostCd1;
	private String chPeopleNm;
	private String chPeopleCd;
	private String chAddress1;
	private String chAddress2;
	private String chAddress3;
	private String chAddress4;
	private String chPostCd1;
	private String accPeopleNm;
	private String accPeopleCd;
	private String accAddress1;
	private String accAddress2;
	private String accAddress3;
	private String accAddress4;
	private String accPostCd1;
	private String cd;
	private String cdNm;
	private String certiId;
	private String certiNm;     
	private String certiIssuePlc; 
	private String certiIssueOfficer; 
	private String certiIssueDt; 
	private String certiExprDt;  
	private String stdYn;
	private String fileCd;
	private String fileName;           
	private String filePath; 
	private String status;
	private String eventType;
	private String StatCdCk;
	private String postCd1;
	private String callSeq; 
	private String docId; 
	private String shipOfficialNo;
	private String chkUserExpiry;
	private String chkSchedule;
	private String nextVslCd;
	private String terminalType;
	private String applyUserId;
	private String saChgCd;
	private String applyRsn;
	private String shippingLineChgCd;
	private String applyStat;
	private String shCd;
	
	private String vslTp1Vsl;
	private String vslTp2Term;
	private String complantYn;
	private String cntyCd;
	private String mapassPortCd;
	private String vslCustCd;
	private String saCustCd;

	private String vslMxWidth;
	private String topTiger;
	private String bowDist;
	private String sternDist;
	private String issNo;
	private String mxRowHod;
	private String servTp;
	private String vhfYn;
	private String shipGear;
	private String nswChk;
	private String confConstumYn;
	private String shipEmail;
	private String rewNo;
	private String freshwtcond;
	private String towinSpeed;
	private String comptyOfficer;
	private String tradCerti;
	
	private String count;
	private String vslDesign;
	private String vslTerm;
	private String expiryDate;
	private String telNo;
	private String deckHouseSterm;
	private String deckHouseBow;
	private String craneYn;
	
	public String getCraneYn() {
		return craneYn;
	}
	public void setCraneYn(String craneYn) {
		this.craneYn = craneYn;
	}
	public String getCheck() {
		return check;
	}
	public String getCallYear() {
		return callYear;
	}
	public String getUkc() {
		return ukc;
	}
	public String getSbt() {
		return sbt;
	}
	public String getSdRmp() {
		return sdRmp;
	}
	public String getRmp() {
		return rmp;
	}
	public String getPumpCapa() {
		return pumpCapa;
	}
	public String getShaCd() {
		return shaCd;
	}
	public String getSaCorpNm() {
		return saCorpNm;
	}
	public String getConfirmDt() {
		return confirmDt;
	}
	public String getSchCnt() {
		return schCnt;
	}
	public String getOptVer() {
		return optVer;
	}
	public String getNo2Yn() {
		return no2Yn;
	}
	public String getFldMstYn() {
		return fldMstYn;
	}
	public String getAutoApproveYn() {
		return autoApproveYn;
	}
	public String getReportFrsYn() {
		return reportFrsYn;
	}
	public String getDblHullYn() {
		return dblHullYn;
	}
	public String getBallastYn() {
		return ballastYn;
	}
	public String getPipeTrnk() {
		return pipeTrnk;
	}
	public String getIspsLvl() {
		return ispsLvl;
	}
	public String getMnfld1() {
		return mnfld1;
	}
	public String getMnfld2() {
		return mnfld2;
	}
	public String getMnfld3() {
		return mnfld3;
	}
	public String getMnfld4() {
		return mnfld4;
	}
	public String getMnfld5() {
		return mnfld5;
	}
	public String getMnfld6() {
		return mnfld6;
	}
	public String getMooIst() {
		return mooIst;
	}
	public String getNoxUnno() {
		return noxUnno;
	}
	public String getSternThrt() {
		return sternThrt;
	}
	public String getBowThrt() {
		return bowThrt;
	}
	public String getSwlBrd() {
		return swlBrd;
	}
	public String getSwlHole() {
		return swlHole;
	}
	public String getPrplTp() {
		return prplTp;
	}
	public String getPrplNo() {
		return prplNo;
	}
	public String getOcimf() {
		return ocimf;
	}
	public String getBlackVsl() {
		return blackVsl;
	}
	public String getBlackCountry() {
		return blackCountry;
	}
	public String getRcCnt() {
		return rcCnt;
	}
	public String getInmarsatNo() {
		return inmarsatNo;
	}
	public String getMmsiCd() {
		return mmsiCd;
	}
	public String getBldYear() {
		return bldYear;
	}
	public String getDomYn() {
		return domYn;
	}
	public String getCntryNm() {
		return cntryNm;
	}
	public String getFlagState() {
		return flagState;
	}
	public String getCntryCd() {
		return cntryCd;
	}
	public String getRudeTp() {
		return rudeTp;
	}
	public String getVslTp3Trade() {
		return vslTp3Trade;
	}
	public String getVslTpNm() {
		return vslTpNm;
	}
	public String getVslRegPortNm() {
		return vslRegPortNm;
	}
	public String getLbp() {
		return lbp;
	}
	public String getVslWidth() {
		return vslWidth;
	}
	public String getVslDepth() {
		return vslDepth;
	}
	public String getSummDrf() {
		return summDrf;
	}
	public String getTopTier() {
		return topTier;
	}
	public String getAntnHgt() {
		return antnHgt;
	}
	public String getDisp() {
		return disp;
	}
	public String getFloatCraneYn() {
		return floatCraneYn;
	}
	public String getCraneSide() {
		return craneSide;
	}
	public String getAlongSide() {
		return alongSide;
	}
	public String getIsscNo() {
		return isscNo;
	}
	public String getIsscNmAuth() {
		return isscNmAuth;
	}
	public String getDwt() {
		return dwt;
	}
	public String getBaleCapa() {
		return baleCapa;
	}
	public String getGrainCapa() {
		return grainCapa;
	}
	public String getEngDesc() {
		return engDesc;
	}
	public String getEndBhp() {
		return endBhp;
	}
	public String getSpeed() {
		return speed;
	}
	public String getMxTeu() {
		return mxTeu;
	}
	public String getHatchQty() {
		return hatchQty;
	}
	public String getMxRowDeck() {
		return mxRowDeck;
	}
	public String getMxRowHold() {
		return mxRowHold;
	}
	public String getNatCd() {
		return natCd;
	}
	public String getVslOutr() {
		return vslOutr;
	}
	public String getMapassOfficialNo() {
		return mapassOfficialNo;
	}

	public String getUpdDtm() {
		return updDtm;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public String getVslDiv() {
		return vslDiv;
	}
	public String getCrewNo() {
		return crewNo;
	}
	public String getNavEqu() {
		return navEqu;
	}
	public String getBunkerCond() {
		return bunkerCond;
	}
	public String getConsumSea() {
		return consumSea;
	}
	public String getFreshwtCond() {
		return freshwtCond;
	}
	public String getApprxDist() {
		return apprxDist;
	}
	public String getTowingSpeed() {
		return towingSpeed;
	}
	public String getCotradCerti() {
		return cotradCerti;
	}
	public String getTowingEq() {
		return towingEq;
	}
	public String getConfirmUserId() {
		return confirmUserId;
	}
	public String getRpmType() {
		return rpmType;
	}
	public String getShpCd() {
		return shpCd;
	}
	public String getShipLicenseExprDt() {
		return shipLicenseExprDt;
	}
	public String getShipLicense() {
		return shipLicense;
	}
	public String getCorpId() {
		return corpId;
	}
	public String getCorpNm() {
		return corpNm;
	}
	public String getVesselOwner() {
		return vesselOwner;
	}
	public String getHiddenVslCd() {
		return hiddenVslCd;
	}
	public String getVslSchApChk() {
		return vslSchApChk;
	}
	public String getVslTpTrade() {
		return vslTpTrade;
	}
	public String getClass1() {
		return class1;
	}
	public String getOutr() {
		return outr;
	}
	public String getEngBhp() {
		return engBhp;
	}
	public String getEndDesc() {
		return endDesc;
	}
	public String getInsUserId() {
		return insUserId;
	}
	public String getRemarks() {
		return remarks;
	}
	public String getShippingLineCd() {
		return shippingLineCd;
	}
	public String getShippingLineNm() {
		return shippingLineNm;
	}
	public String getNewOptVer() {
		return newOptVer;
	}
	public String getSideRamp() {
		return sideRamp;
	}
	public String getRamp() {
		return ramp;
	}
	public String getPipeTrunk() {
		return pipeTrunk;
	}
	public String getBowThrtKw() {
		return bowThrtKw;
	}
	public String getSternThrtKw() {
		return sternThrtKw;
	}
	public String getPeopleDiv() {
		return peopleDiv;
	}
	public String getPeopleNm() {
		return peopleNm;
	}
	public String getPeopleCd() {
		return peopleCd;
	}
	public String getAddress1() {
		return address1;
	}
	public String getAddress2() {
		return address2;
	}
	public String getAddress3() {
		return address3;
	}
	public String getAddress4() {
		return address4;
	}
	public String getPortCd1() {
		return portCd1;
	}
	
	public String getCd() {
		return cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public String getCertiId() {
		return certiId;
	}
	public String getCertiNm() {
		return certiNm;
	}
	public String getCertiIssuePlc() {
		return certiIssuePlc;
	}
	public String getCertiIssueOfficer() {
		return certiIssueOfficer;
	}
	public String getCertiIssueDt() {
		return certiIssueDt;
	}
	public String getCertiExprDt() {
		return certiExprDt;
	}
	public String getStdYn() {
		return stdYn;
	}
	public String getFileCd() {
		return fileCd;
	}
	public String getFileName() {
		return fileName;
	}
	public String getFilePath() {
		return filePath;
	}
	public String getStatus() {
		return status;
	}
	public String getEventType() {
		return eventType;
	}
	public String getPostCd1() {
		return postCd1;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public String getDocId() {
		return docId;
	}
	public String getShipOfficialNo() {
		return shipOfficialNo;
	}
	public String getChkUserExpiry() {
		return chkUserExpiry;
	}
	public String getChkSchedule() {
		return chkSchedule;
	}
	public String getNextVslCd() {
		return nextVslCd;
	}
	public String getTerminalType() {
		return terminalType;
	}
	public String getApplyUserId() {
		return applyUserId;
	}
	public String getSaChgCd() {
		return saChgCd;
	}
	public String getApplyRsn() {
		return applyRsn;
	}
	public String getShippingLineChgCd() {
		return shippingLineChgCd;
	}
	public String getApplyStat() {
		return applyStat;
	}
	public String getShCd() {
		return shCd;
	}
	public String getMapassRegPort() {
		return mapassRegPort;
	}
	public String getVslTp1Vsl() {
		return vslTp1Vsl;
	}
	public String getVslTp2Term() {
		return vslTp2Term;
	}
	public String getComplantYn() {
		return complantYn;
	}
	public String getCntyCd() {
		return cntyCd;
	}
	public String getMapassPortCd() {
		return mapassPortCd;
	}
	public String getVslCustCd() {
		return vslCustCd;
	}
	public String getSaCustCd() {
		return saCustCd;
	}
	/*public String getcLASS() {
		return cLASS;
	}*/
	public String getVslMxWidth() {
		return vslMxWidth;
	}
	public String getTopTiger() {
		return topTiger;
	}
	public String getBowDist() {
		return bowDist;
	}
	public String getSternDist() {
		return sternDist;
	}
	public String getIssNo() {
		return issNo;
	}
	public String getMxRowHod() {
		return mxRowHod;
	}
	public String getServTp() {
		return servTp;
	}
	public String getVhfYn() {
		return vhfYn;
	}
	public String getShipGear() {
		return shipGear;
	}
	public String getNswChk() {
		return nswChk;
	}
	public String getConfConstumYn() {
		return confConstumYn;
	}
	public String getShipEmail() {
		return shipEmail;
	}
	public String getRewNo() {
		return rewNo;
	}
	public String getFreshwtcond() {
		return freshwtcond;
	}
	public String getTowinSpeed() {
		return towinSpeed;
	}
	public String getComptyOfficer() {
		return comptyOfficer;
	}
	public String getTradCerti() {
		return tradCerti;
	}
	public String getCount() {
		return count;
	}
	public String getVslDesign() {
		return vslDesign;
	}
	public String getVslTerm() {
		return vslTerm;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public String getTelNo() {
		return telNo;
	}
	public String getDeckHouseSterm() {
		return deckHouseSterm;
	}
	public String getDeckHouseBow() {
		return deckHouseBow;
	}
	public String getValidVslId() {
		return validVslId;
	}
	public String getCrud() {
		return crud;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public void setCheck(String check) {
		this.check = check;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public void setUkc(String ukc) {
		this.ukc = ukc;
	}
	public void setSbt(String sbt) {
		this.sbt = sbt;
	}
	public void setSdRmp(String sdRmp) {
		this.sdRmp = sdRmp;
	}
	public void setRmp(String rmp) {
		this.rmp = rmp;
	}
	public void setPumpCapa(String pumpCapa) {
		this.pumpCapa = pumpCapa;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public void setSaCorpNm(String saCorpNm) {
		this.saCorpNm = saCorpNm;
	}
	public void setConfirmDt(String confirmDt) {
		this.confirmDt = confirmDt;
	}
	public void setSchCnt(String schCnt) {
		this.schCnt = schCnt;
	}
	public void setOptVer(String optVer) {
		this.optVer = optVer;
	}
	public void setNo2Yn(String no2Yn) {
		this.no2Yn = no2Yn;
	}
	public void setFldMstYn(String fldMstYn) {
		this.fldMstYn = fldMstYn;
	}
	public void setAutoApproveYn(String autoApproveYn) {
		this.autoApproveYn = autoApproveYn;
	}
	public void setReportFrsYn(String reportFrsYn) {
		this.reportFrsYn = reportFrsYn;
	}
	public void setDblHullYn(String dblHullYn) {
		this.dblHullYn = dblHullYn;
	}
	public void setBallastYn(String ballastYn) {
		this.ballastYn = ballastYn;
	}
	public void setPipeTrnk(String pipeTrnk) {
		this.pipeTrnk = pipeTrnk;
	}
	public void setIspsLvl(String ispsLvl) {
		this.ispsLvl = ispsLvl;
	}
	public void setMnfld1(String mnfld1) {
		this.mnfld1 = mnfld1;
	}
	public void setMnfld2(String mnfld2) {
		this.mnfld2 = mnfld2;
	}
	public void setMnfld3(String mnfld3) {
		this.mnfld3 = mnfld3;
	}
	public void setMnfld4(String mnfld4) {
		this.mnfld4 = mnfld4;
	}
	public void setMnfld5(String mnfld5) {
		this.mnfld5 = mnfld5;
	}
	public void setMnfld6(String mnfld6) {
		this.mnfld6 = mnfld6;
	}
	public void setMooIst(String mooIst) {
		this.mooIst = mooIst;
	}
	public void setNoxUnno(String noxUnno) {
		this.noxUnno = noxUnno;
	}
	public void setSternThrt(String sternThrt) {
		this.sternThrt = sternThrt;
	}
	public void setBowThrt(String bowThrt) {
		this.bowThrt = bowThrt;
	}
	public void setSwlBrd(String swlBrd) {
		this.swlBrd = swlBrd;
	}
	public void setSwlHole(String swlHole) {
		this.swlHole = swlHole;
	}
	public void setPrplTp(String prplTp) {
		this.prplTp = prplTp;
	}
	public void setPrplNo(String prplNo) {
		this.prplNo = prplNo;
	}
	public void setOcimf(String ocimf) {
		this.ocimf = ocimf;
	}
	public void setBlackVsl(String blackVsl) {
		this.blackVsl = blackVsl;
	}
	public void setBlackCountry(String blackCountry) {
		this.blackCountry = blackCountry;
	}
	public void setRcCnt(String rcCnt) {
		this.rcCnt = rcCnt;
	}
	public void setInmarsatNo(String inmarsatNo) {
		this.inmarsatNo = inmarsatNo;
	}
	public void setMmsiCd(String mmsiCd) {
		this.mmsiCd = mmsiCd;
	}
	public void setBldYear(String bldYear) {
		this.bldYear = bldYear;
	}
	public void setDomYn(String domYn) {
		this.domYn = domYn;
	}
	public void setCntryNm(String cntryNm) {
		this.cntryNm = cntryNm;
	}
	public void setFlagState(String flagState) {
		this.flagState = flagState;
	}
	public void setCntryCd(String cntryCd) {
		this.cntryCd = cntryCd;
	}
	public void setRudeTp(String rudeTp) {
		this.rudeTp = rudeTp;
	}
	public void setVslTp3Trade(String vslTp3Trade) {
		this.vslTp3Trade = vslTp3Trade;
	}
	public void setVslTpNm(String vslTpNm) {
		this.vslTpNm = vslTpNm;
	}
	public void setVslRegPortNm(String vslRegPortNm) {
		this.vslRegPortNm = vslRegPortNm;
	}
	public void setLbp(String lbp) {
		this.lbp = lbp;
	}
	public void setVslWidth(String vslWidth) {
		this.vslWidth = vslWidth;
	}
	public void setVslDepth(String vslDepth) {
		this.vslDepth = vslDepth;
	}
	public void setSummDrf(String summDrf) {
		this.summDrf = summDrf;
	}
	public void setTopTier(String topTier) {
		this.topTier = topTier;
	}
	public void setAntnHgt(String antnHgt) {
		this.antnHgt = antnHgt;
	}
	public void setDisp(String disp) {
		this.disp = disp;
	}
	public void setFloatCraneYn(String floatCraneYn) {
		this.floatCraneYn = floatCraneYn;
	}
	public void setCraneSide(String craneSide) {
		this.craneSide = craneSide;
	}
	public void setAlongSide(String alongSide) {
		this.alongSide = alongSide;
	}
	public void setIsscNo(String isscNo) {
		this.isscNo = isscNo;
	}
	public void setIsscNmAuth(String isscNmAuth) {
		this.isscNmAuth = isscNmAuth;
	}
	public void setDwt(String dwt) {
		this.dwt = dwt;
	}
	public void setBaleCapa(String baleCapa) {
		this.baleCapa = baleCapa;
	}
	public void setGrainCapa(String grainCapa) {
		this.grainCapa = grainCapa;
	}
	public void setEngDesc(String engDesc) {
		this.engDesc = engDesc;
	}
	public void setEndBhp(String endBhp) {
		this.endBhp = endBhp;
	}
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	public void setMxTeu(String mxTeu) {
		this.mxTeu = mxTeu;
	}
	public void setHatchQty(String hatchQty) {
		this.hatchQty = hatchQty;
	}
	public void setMxRowDeck(String mxRowDeck) {
		this.mxRowDeck = mxRowDeck;
	}
	public void setMxRowHold(String mxRowHold) {
		this.mxRowHold = mxRowHold;
	}
	public void setNatCd(String natCd) {
		this.natCd = natCd;
	}
	public void setVslOutr(String vslOutr) {
		this.vslOutr = vslOutr;
	}
	public void setMapassOfficialNo(String mapassOfficialNo) {
		this.mapassOfficialNo = mapassOfficialNo;
	}

	public void setUpdDtm(String updDtm) {
		this.updDtm = updDtm;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public void setVslDiv(String vslDiv) {
		this.vslDiv = vslDiv;
	}
	public void setCrewNo(String crewNo) {
		this.crewNo = crewNo;
	}
	public void setNavEqu(String navEqu) {
		this.navEqu = navEqu;
	}
	public void setBunkerCond(String bunkerCond) {
		this.bunkerCond = bunkerCond;
	}
	public void setConsumSea(String consumSea) {
		this.consumSea = consumSea;
	}
	public void setFreshwtCond(String freshwtCond) {
		this.freshwtCond = freshwtCond;
	}
	public void setApprxDist(String apprxDist) {
		this.apprxDist = apprxDist;
	}
	public void setTowingSpeed(String towingSpeed) {
		this.towingSpeed = towingSpeed;
	}
	public void setCotradCerti(String cotradCerti) {
		this.cotradCerti = cotradCerti;
	}
	public void setTowingEq(String towingEq) {
		this.towingEq = towingEq;
	}
	public void setConfirmUserId(String confirmUserId) {
		this.confirmUserId = confirmUserId;
	}
	public void setRpmType(String rpmType) {
		this.rpmType = rpmType;
	}
	public void setShpCd(String shpCd) {
		this.shpCd = shpCd;
	}
	public void setShipLicenseExprDt(String shipLicenseExprDt) {
		this.shipLicenseExprDt = shipLicenseExprDt;
	}
	public void setShipLicense(String shipLicense) {
		this.shipLicense = shipLicense;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public void setCorpNm(String corpNm) {
		this.corpNm = corpNm;
	}
	public void setVesselOwner(String vesselOwner) {
		this.vesselOwner = vesselOwner;
	}
	public void setHiddenVslCd(String hiddenVslCd) {
		this.hiddenVslCd = hiddenVslCd;
	}
	public void setVslSchApChk(String vslSchApChk) {
		this.vslSchApChk = vslSchApChk;
	}
	public void setVslTpTrade(String vslTpTrade) {
		this.vslTpTrade = vslTpTrade;
	}
	public void setClass1(String class1) {
		this.class1 = class1;
	}
	public void setOutr(String outr) {
		this.outr = outr;
	}
	public void setEngBhp(String engBhp) {
		this.engBhp = engBhp;
	}
	public void setEndDesc(String endDesc) {
		this.endDesc = endDesc;
	}
	public void setInsUserId(String insUserId) {
		this.insUserId = insUserId;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public void setShippingLineCd(String shippingLineCd) {
		this.shippingLineCd = shippingLineCd;
	}
	public void setShippingLineNm(String shippingLineNm) {
		this.shippingLineNm = shippingLineNm;
	}
	public void setNewOptVer(String newOptVer) {
		this.newOptVer = newOptVer;
	}
	public void setSideRamp(String sideRamp) {
		this.sideRamp = sideRamp;
	}
	public void setRamp(String ramp) {
		this.ramp = ramp;
	}
	public void setPipeTrunk(String pipeTrunk) {
		this.pipeTrunk = pipeTrunk;
	}
	public void setBowThrtKw(String bowThrtKw) {
		this.bowThrtKw = bowThrtKw;
	}
	public void setSternThrtKw(String sternThrtKw) {
		this.sternThrtKw = sternThrtKw;
	}
	public void setPeopleDiv(String peopleDiv) {
		this.peopleDiv = peopleDiv;
	}
	public void setPeopleNm(String peopleNm) {
		this.peopleNm = peopleNm;
	}
	public void setPeopleCd(String peopleCd) {
		this.peopleCd = peopleCd;
	}
	public void setAddress1(String address1) {
		this.address1 = address1;
	}
	public void setAddress2(String address2) {
		this.address2 = address2;
	}
	public void setAddress3(String address3) {
		this.address3 = address3;
	}
	public void setAddress4(String address4) {
		this.address4 = address4;
	}
	public void setPortCd1(String portCd1) {
		this.portCd1 = portCd1;
	}
	
	public String getOwPeopleNm() {
		return owPeopleNm;
	}
	public String getOwAddress1() {
		return owAddress1;
	}
	public String getOwAddress2() {
		return owAddress2;
	}
	public String getOwAddress3() {
		return owAddress3;
	}
	public String getOwAddress4() {
		return owAddress4;
	}
	public String getOwPostCd1() {
		return owPostCd1;
	}
	public String getChPeopleNm() {
		return chPeopleNm;
	}
	public String getChPeopleCd() {
		return chPeopleCd;
	}
	public String getChAddress1() {
		return chAddress1;
	}
	public String getChAddress2() {
		return chAddress2;
	}
	public String getChAddress3() {
		return chAddress3;
	}
	public String getChAddress4() {
		return chAddress4;
	}
	public String getChPostCd1() {
		return chPostCd1;
	}
	public String getAccPeopleNm() {
		return accPeopleNm;
	}
	public String getAccPeopleCd() {
		return accPeopleCd;
	}
	public String getAccAddress1() {
		return accAddress1;
	}
	public String getAccAddress2() {
		return accAddress2;
	}
	public String getAccAddress3() {
		return accAddress3;
	}
	public String getAccAddress4() {
		return accAddress4;
	}
	public String getAccPostCd1() {
		return accPostCd1;
	}
	public void setOwPeopleNm(String owPeopleNm) {
		this.owPeopleNm = owPeopleNm;
	}
	public void setOwAddress1(String owAddress1) {
		this.owAddress1 = owAddress1;
	}
	public void setOwAddress2(String owAddress2) {
		this.owAddress2 = owAddress2;
	}
	public void setOwAddress3(String owAddress3) {
		this.owAddress3 = owAddress3;
	}
	public void setOwAddress4(String owAddress4) {
		this.owAddress4 = owAddress4;
	}
	public void setOwPostCd1(String owPostCd1) {
		this.owPostCd1 = owPostCd1;
	}
	public void setChPeopleNm(String chPeopleNm) {
		this.chPeopleNm = chPeopleNm;
	}
	public void setChPeopleCd(String chPeopleCd) {
		this.chPeopleCd = chPeopleCd;
	}
	public void setChAddress1(String chAddress1) {
		this.chAddress1 = chAddress1;
	}
	public void setChAddress2(String chAddress2) {
		this.chAddress2 = chAddress2;
	}
	public void setChAddress3(String chAddress3) {
		this.chAddress3 = chAddress3;
	}
	public void setChAddress4(String chAddress4) {
		this.chAddress4 = chAddress4;
	}
	public void setChPostCd1(String chPostCd1) {
		this.chPostCd1 = chPostCd1;
	}
	public void setAccPeopleNm(String accPeopleNm) {
		this.accPeopleNm = accPeopleNm;
	}
	public void setAccPeopleCd(String accPeopleCd) {
		this.accPeopleCd = accPeopleCd;
	}
	public void setAccAddress1(String accAddress1) {
		this.accAddress1 = accAddress1;
	}
	public void setAccAddress2(String accAddress2) {
		this.accAddress2 = accAddress2;
	}
	public void setAccAddress3(String accAddress3) {
		this.accAddress3 = accAddress3;
	}
	public void setAccAddress4(String accAddress4) {
		this.accAddress4 = accAddress4;
	}
	public void setAccPostCd1(String accPostCd1) {
		this.accPostCd1 = accPostCd1;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public void setCertiId(String certiId) {
		this.certiId = certiId;
	}
	public void setCertiNm(String certiNm) {
		this.certiNm = certiNm;
	}
	public void setCertiIssuePlc(String certiIssuePlc) {
		this.certiIssuePlc = certiIssuePlc;
	}
	public void setCertiIssueOfficer(String certiIssueOfficer) {
		this.certiIssueOfficer = certiIssueOfficer;
	}
	public void setCertiIssueDt(String certiIssueDt) {
		this.certiIssueDt = certiIssueDt;
	}
	public void setCertiExprDt(String certiExprDt) {
		this.certiExprDt = certiExprDt;
	}
	public void setStdYn(String stdYn) {
		this.stdYn = stdYn;
	}
	public void setFileCd(String fileCd) {
		this.fileCd = fileCd;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	public void setPostCd1(String postCd1) {
		this.postCd1 = postCd1;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public void setShipOfficialNo(String shipOfficialNo) {
		this.shipOfficialNo = shipOfficialNo;
	}
	public void setChkUserExpiry(String chkUserExpiry) {
		this.chkUserExpiry = chkUserExpiry;
	}
	public void setChkSchedule(String chkSchedule) {
		this.chkSchedule = chkSchedule;
	}
	public void setNextVslCd(String nextVslCd) {
		this.nextVslCd = nextVslCd;
	}
	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}
	public void setApplyUserId(String applyUserId) {
		this.applyUserId = applyUserId;
	}
	public void setSaChgCd(String saChgCd) {
		this.saChgCd = saChgCd;
	}
	public void setApplyRsn(String applyRsn) {
		this.applyRsn = applyRsn;
	}
	public void setShippingLineChgCd(String shippingLineChgCd) {
		this.shippingLineChgCd = shippingLineChgCd;
	}
	public void setApplyStat(String applyStat) {
		this.applyStat = applyStat;
	}
	public void setShCd(String shCd) {
		this.shCd = shCd;
	}
	public void setMapassRegPort(String mapassRegPort) {
		this.mapassRegPort = mapassRegPort;
	}
	public void setVslTp1Vsl(String vslTp1Vsl) {
		this.vslTp1Vsl = vslTp1Vsl;
	}
	public void setVslTp2Term(String vslTp2Term) {
		this.vslTp2Term = vslTp2Term;
	}
	public void setComplantYn(String complantYn) {
		this.complantYn = complantYn;
	}
	public void setCntyCd(String cntyCd) {
		this.cntyCd = cntyCd;
	}
	public void setMapassPortCd(String mapassPortCd) {
		this.mapassPortCd = mapassPortCd;
	}
	public void setVslCustCd(String vslCustCd) {
		this.vslCustCd = vslCustCd;
	}
	public void setSaCustCd(String saCustCd) {
		this.saCustCd = saCustCd;
	}
	/*public void setLASS(String cLASS) {
		this.cLASS = cLASS;
	}*/
	public void setVslMxWidth(String vslMxWidth) {
		this.vslMxWidth = vslMxWidth;
	}
	public void setTopTiger(String topTiger) {
		this.topTiger = topTiger;
	}
	public void setBowDist(String bowDist) {
		this.bowDist = bowDist;
	}
	public void setSternDist(String sternDist) {
		this.sternDist = sternDist;
	}
	public void setIssNo(String issNo) {
		this.issNo = issNo;
	}
	public void setMxRowHod(String mxRowHod) {
		this.mxRowHod = mxRowHod;
	}
	public void setServTp(String servTp) {
		this.servTp = servTp;
	}
	public void setVhfYn(String vhfYn) {
		this.vhfYn = vhfYn;
	}
	public void setShipGear(String shipGear) {
		this.shipGear = shipGear;
	}
	public void setNswChk(String nswChk) {
		this.nswChk = nswChk;
	}
	public void setConfConstumYn(String confConstumYn) {
		this.confConstumYn = confConstumYn;
	}
	public void setShipEmail(String shipEmail) {
		this.shipEmail = shipEmail;
	}
	public void setRewNo(String rewNo) {
		this.rewNo = rewNo;
	}
	public void setFreshwtcond(String freshwtcond) {
		this.freshwtcond = freshwtcond;
	}
	public void setTowinSpeed(String towinSpeed) {
		this.towinSpeed = towinSpeed;
	}
	public void setComptyOfficer(String comptyOfficer) {
		this.comptyOfficer = comptyOfficer;
	}
	public void setTradCerti(String tradCerti) {
		this.tradCerti = tradCerti;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public void setVslDesign(String vslDesign) {
		this.vslDesign = vslDesign;
	}
	public void setVslTerm(String vslTerm) {
		this.vslTerm = vslTerm;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public void setDeckHouseSterm(String deckHouseSterm) {
		this.deckHouseSterm = deckHouseSterm;
	}
	public void setDeckHouseBow(String deckHouseBow) {
		this.deckHouseBow = deckHouseBow;
	}
	public void setValidVslId(String validVslId) {
		this.validVslId = validVslId;
	}
	public void setCrud(String crud) {
		this.crud = crud;
	}
	
	private String validVslId;
	private String crud;
	
	public String getFloatYn() {
		return floatYn;
	}
	public void setFloatYn(String floatYn) {
		this.floatYn = floatYn;
	}
	public String getVslNm() {
		return vslNm;
	}
	public String getVslCd() {
		return vslCd;
	}
	public String getImoNo() {
		return imoNo;
	}
	public String getCallSign() {
		return callSign;
	}
	public String getVslFlagCd() {
		return vslFlagCd;
	}
	public String getVslRegPort() {
		return vslRegPort;
	}

	public String getVslTp() {
		return vslTp;
	}
	public String getTerminalTp() {
		return terminalTp;
	}
	public String getLoa() {
		return loa;
	}
	public String getNrt() {
		return nrt;
	}
	public String getGrt() {
		return grt;
	}
	public String getSaCorpId() {
		return saCorpId;
	}
	public String getJctConfirm() {
		return jctConfirm;
	}
	public String getSaNm() {
		return saNm;
	}
	public String getInsDtm() {
		return insDtm;
	}
	public String getConfirmDtm() {
		return confirmDtm;
	}
	public String getIsscExprDt() {
		return isscExprDt;
	}
	public String getCustomExprDt() {
		return customExprDt;
	}
	public String getShipOffNo() {
		return shipOffNo;
	}
	public String getCompliantYn() {
		return compliantYn;
	}
	public void setVslNam(String vslNm) {
		this.vslNm = vslNm;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public void setImoNo(String imoNo) {
		this.imoNo = imoNo;
	}
	public void setCallSign(String callSign) {
		this.callSign = callSign;
	}
	public void setVslFlagCd(String vslFlagCd) {
		this.vslFlagCd = vslFlagCd;
	}
	public void setVslRegPort(String vslRegPort) {
		this.vslRegPort = vslRegPort;
	}
	
	public void setVslTp(String vslTp) {
		this.vslTp = vslTp;
	}
	public void setTerminalTp(String terminalTp) {
		this.terminalTp = terminalTp;
	}
	public void setLoa(String loa) {
		this.loa = loa;
	}
	public void setNrt(String nrt) {
		this.nrt = nrt;
	}
	public void setGrt(String grt) {
		this.grt = grt;
	}
	public void setSaCorpId(String saCorpId) {
		this.saCorpId = saCorpId;
	}
	public void setJctConfirm(String jctConfirm) {
		this.jctConfirm = jctConfirm;
	}
	public void setSaNm(String saNm) {
		this.saNm = saNm;
	}
	public void setInsDtm(String insDtm) {
		this.insDtm = insDtm;
	}
	public void setConfirmDtm(String confirmDtm) {
		this.confirmDtm = confirmDtm;
	}
	public void setIsscExprDt(String isscExprDt) {
		this.isscExprDt = isscExprDt;
	}
	public void setCustomExprDt(String customExprDt) {
		this.customExprDt = customExprDt;
	}
	public void setShipOffNo(String shipOffNo) {
		this.shipOffNo = shipOffNo;
	}
	public void setCompliantYn(String compliantYn) {
		this.compliantYn = compliantYn;
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
	public String getStatCdCk() {
		return StatCdCk;
	}
	public void setStatCdCk(String statCdCk) {
		StatCdCk = statCdCk;
	}
	
}
