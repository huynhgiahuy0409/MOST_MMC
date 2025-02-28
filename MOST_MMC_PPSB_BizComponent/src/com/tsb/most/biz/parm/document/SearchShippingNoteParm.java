/**
* ShippingNoteParm.java
*
* Created on   : Aug 1, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Aug 1, 2007   Mr Dong-Yeob Lee 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author dylee
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchShippingNoteParm extends BaseBizParm {
    private String vslCallId;    
    private String scn;    
    private String delvTpCd;   
    private String searchFlag;    
    private String searchType;
    private String shipgNoteNo;
    private String mfDocId;
    private String fwrd;   
    private String divCd;
    private String tsptTpCd;
    private String catgCd;
    private String authority;
    private String ptnrCd;
    private String cbrNo;
    private String statCd;
    private String tyCd;
    
    //for nonJPVC
    private String arrvDtFm;
    private String arrvDtTo;
    private String snTp;
    private String opType;//operation screen type
    
    private String authUsrId;
    private String NewShipgNoteNo;
    
    //Added by Chris 2015-09-24 for 49799
    private String lorryNo;
    private String searchTypeCboSN;
    
    private String rptNo;
    private String userId;
    
    //DG Declaration
    private String vslCd;
    private String callYear;
    private String callSeq;
    private String cgNo;
    private String imdg;
    private String substance;
    private String unno;
    private String seq;
    private String pgmId;
    private String impCd;
    private String expCd;
    
    //Manifest
    private String jobNo;
	private String regNo;
	private String docId;
	private String etaFromDate;
	private String etaToDate;
	private String status;
	private String areaLocation;
	private String inOutType;
	private String shipCallNo;
	private String shpagn;
	
	private String pkgRmk;
	private String lotNo;
	private String vslNm;
	private String grNo;
	
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getSearchFlag() {
		return searchFlag;
	}
	public void setSearchFlag(String searchFlag) {
		this.searchFlag = searchFlag;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getShipgNoteNo() {
		return shipgNoteNo;
	}
	public void setShipgNoteNo(String shipgNoteNo) {
		this.shipgNoteNo = shipgNoteNo;
	}
	public String getMfDocId() {
		return mfDocId;
	}
	public void setMfDocId(String mfDocId) {
		this.mfDocId = mfDocId;
	}
	public String getFwrd() {
		return fwrd;
	}
	public void setFwrd(String fwrd) {
		this.fwrd = fwrd;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getTsptTpCd() {
		return tsptTpCd;
	}
	public void setTsptTpCd(String tsptTpCd) {
		this.tsptTpCd = tsptTpCd;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getCbrNo() {
		return cbrNo;
	}
	public void setCbrNo(String cbrNo) {
		this.cbrNo = cbrNo;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getTyCd() {
		return tyCd;
	}
	public void setTyCd(String tyCd) {
		this.tyCd = tyCd;
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
	public String getSnTp() {
		return snTp;
	}
	public void setSnTp(String snTp) {
		this.snTp = snTp;
	}
	public String getOpType() {
		return opType;
	}
	public void setOpType(String opType) {
		this.opType = opType;
	}
	public String getAuthUsrId() {
		return authUsrId;
	}
	public void setAuthUsrId(String authUsrId) {
		this.authUsrId = authUsrId;
	}
	public String getNewShipgNoteNo() {
		return NewShipgNoteNo;
	}
	public void setNewShipgNoteNo(String newShipgNoteNo) {
		NewShipgNoteNo = newShipgNoteNo;
	}
	public String getLorryNo() {
		return lorryNo;
	}
	public void setLorryNo(String lorryNo) {
		this.lorryNo = lorryNo;
	}
	public String getSearchTypeCboSN() {
		return searchTypeCboSN;
	}
	public void setSearchTypeCboSN(String searchTypeCboSN) {
		this.searchTypeCboSN = searchTypeCboSN;
	}
	public String getRptNo() {
		return rptNo;
	}
	public void setRptNo(String rptNo) {
		this.rptNo = rptNo;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
	public String getCgNo() {
		return cgNo;
	}
	public void setCgNo(String cgNo) {
		this.cgNo = cgNo;
	}
	public String getImdg() {
		return imdg;
	}
	public void setImdg(String imdg) {
		this.imdg = imdg;
	}
	public String getSubstance() {
		return substance;
	}
	public void setSubstance(String substance) {
		this.substance = substance;
	}
	public String getUnno() {
		return unno;
	}
	public void setUnno(String unno) {
		this.unno = unno;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getPgmId() {
		return pgmId;
	}
	public void setPgmId(String pgmId) {
		this.pgmId = pgmId;
	}
	public String getImpCd() {
		return impCd;
	}
	public void setImpCd(String impCd) {
		this.impCd = impCd;
	}
	public String getExpCd() {
		return expCd;
	}
	public void setExpCd(String expCd) {
		this.expCd = expCd;
	}
	public String getJobNo() {
		return jobNo;
	}
	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}
	public String getRegNo() {
		return regNo;
	}
	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public String getEtaFromDate() {
		return etaFromDate;
	}
	public void setEtaFromDate(String etaFromDate) {
		this.etaFromDate = etaFromDate;
	}
	public String getEtaToDate() {
		return etaToDate;
	}
	public void setEtaToDate(String etaToDate) {
		this.etaToDate = etaToDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAreaLocation() {
		return areaLocation;
	}
	public void setAreaLocation(String areaLocation) {
		this.areaLocation = areaLocation;
	}
	public String getInOutType() {
		return inOutType;
	}
	public void setInOutType(String inOutType) {
		this.inOutType = inOutType;
	}
	public String getShipCallNo() {
		return shipCallNo;
	}
	public void setShipCallNo(String shipCallNo) {
		this.shipCallNo = shipCallNo;
	}
	public String getShpagn() {
		return shpagn;
	}
	public void setShpagn(String shpagn) {
		this.shpagn = shpagn;
	}
	public String getPkgRmk() {
		return pkgRmk;
	}
	public void setPkgRmk(String pkgRmk) {
		this.pkgRmk = pkgRmk;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public String getVslNm() {
		return vslNm;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public String getGrNo() {
		return grNo;
	}
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}
}
