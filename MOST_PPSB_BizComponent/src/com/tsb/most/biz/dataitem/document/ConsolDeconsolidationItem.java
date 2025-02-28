package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class ConsolDeconsolidationItem extends DataItem{
	private String scd;
	private String scdNm;
	private String vslCallId;                     
	private String opClassNm;
	private String opClassCd;
	private String mfDocId;
	private String blSnNo;
	private String docStatNm;
	private String docStatCd;
	private String shaCd;
	private String shaNm;
	private String fwdCd;
	private String fwdNm;
	private String cnsne;
	private String cnsneNm;
	private String shpr;
	private String shprNm;
	private String docMt;
	private String docM3;
	private String docQty;
	private String storedMt;
	private String storedM3;
	private String storedQty;
	private String balMt;
	private String balM3;
	private String balQty;
	private String loadedMt;
	private String loadedM3;
	private String loadedQty;
	private String dischargedMt;
	private String dischargedM3;
	private String dischargedQty;
	private String whLoc;
	private String existOpe;
	private String blNo;
	private String snNo;
	private String pod;
	private String pol;
	private String fdest;
	private String tsptTpCd;
	private String delvTpCd;
	private String pkgTpCd;
	private String cmdtCd;
	private String fwrd;
	private String shipgAgncy;
	private String cgTpCd;
	private String jobNo;
	private String cgNo;
	private String vslCd;
	private String callYear;
	private String callSeq;
	private String domesticChk;
	private String tsptComp;
	private String isGetIn;
	private String canGetIn;
	private String toLocId;
	
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
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getOpClassNm() {
		return opClassNm;
	}
	public void setOpClassNm(String opClassNm) {
		this.opClassNm = opClassNm;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getBlSnNo() {
		return blSnNo;
	}
	public void setBlSnNo(String blSnNo) {
		this.blSnNo = blSnNo;
	}
	public String getDocStatNm() {
		return docStatNm;
	}
	public void setDocStatNm(String docStatNm) {
		this.docStatNm = docStatNm;
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
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
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
	public String getDocMt() {
		return docMt;
	}
	public void setDocMt(String docMt) {
		this.docMt = docMt;
	}
	public String getDocM3() {
		return docM3;
	}
	public void setDocM3(String docM3) {
		this.docM3 = docM3;
	}
	public String getDocQty() {
		return docQty;
	}
	public void setDocQty(String docQty) {
		this.docQty = docQty;
	}
	public String getStoredMt() {
		return storedMt;
	}
	public void setStoredMt(String storedMt) {
		this.storedMt = storedMt;
	}
	public String getStoredM3() {
		return storedM3;
	}
	public void setStoredM3(String storedM3) {
		this.storedM3 = storedM3;
	}
	public String getStoredQty() {
		return storedQty;
	}
	public void setStoredQty(String storedQty) {
		this.storedQty = storedQty;
	}
	public String getBalMt() {
		return balMt;
	}
	public void setBalMt(String balMt) {
		this.balMt = balMt;
	}
	public String getBalM3() {
		return balM3;
	}
	public void setBalM3(String balM3) {
		this.balM3 = balM3;
	}
	public String getBalQty() {
		return balQty;
	}
	public void setBalQty(String balQty) {
		this.balQty = balQty;
	}
	public String getLoadedMt() {
		return loadedMt;
	}
	public void setLoadedMt(String loadedMt) {
		this.loadedMt = loadedMt;
	}
	public String getLoadedM3() {
		return loadedM3;
	}
	public void setLoadedM3(String loadedM3) {
		this.loadedM3 = loadedM3;
	}
	public String getLoadedQty() {
		return loadedQty;
	}
	public void setLoadedQty(String loadedQty) {
		this.loadedQty = loadedQty;
	}
	public String getDischargedMt() {
		return dischargedMt;
	}
	public void setDischargedMt(String dischargedMt) {
		this.dischargedMt = dischargedMt;
	}
	public String getDischargedM3() {
		return dischargedM3;
	}
	public void setDischargedM3(String dischargedM3) {
		this.dischargedM3 = dischargedM3;
	}
	public String getDischargedQty() {
		return dischargedQty;
	}
	public void setDischargedQty(String dischargedQty) {
		this.dischargedQty = dischargedQty;
	}
	public String getWhLoc() {
		return whLoc;
	}
	public void setWhLoc(String whLoc) {
		this.whLoc = whLoc;
	}
	public String getExistOpe() {
		return existOpe;
	}
	public void setExistOpe(String existOpe) {
		this.existOpe = existOpe;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getSnNo() {
		return snNo;
	}
	public void setSnNo(String snNo) {
		this.snNo = snNo;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getFdest() {
		return fdest;
	}
	public void setFdest(String fdest) {
		this.fdest = fdest;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getFwrd() {
		return fwrd;
	}
	public void setFwrd(String fwrd) {
		this.fwrd = fwrd;
	}
	public String getShipgAgncy() {
		return shipgAgncy;
	}
	public void setShipgAgncy(String shipgAgncy) {
		this.shipgAgncy = shipgAgncy;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getOpClassCd() {
		return opClassCd;
	}
	public void setOpClassCd(String opClassCd) {
		this.opClassCd = opClassCd;
	}
	public String getDocStatCd() {
		return docStatCd;
	}
	public void setDocStatCd(String docStatCd) {
		this.docStatCd = docStatCd;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getCallYear() {
		return callYear;
	}
	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}
	public String getCallSeq() {
		return callSeq;
	}
	public void setCallSeq(String callSeq) {
		this.callSeq = callSeq;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getTsptComp() {
		return tsptComp;
	}
	public void setTsptComp(String tsptComp) {
		this.tsptComp = tsptComp;
	}
	public String getIsGetIn() {
		return isGetIn;
	}
	public void setIsGetIn(String isGetIn) {
		this.isGetIn = isGetIn;
	}
	public String getCanGetIn() {
		return canGetIn;
	}
	public void setCanGetIn(String canGetIn) {
		this.canGetIn = canGetIn;
	}
	public String getToLocId() {
		return toLocId;
	}
	public void setToLocId(String toLocId) {
		this.toLocId = toLocId;
	}
}