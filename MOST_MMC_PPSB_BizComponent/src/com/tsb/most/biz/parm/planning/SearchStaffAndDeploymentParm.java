/**
* VOperationDeployParm.java
*
* Created on   : 2007-10-08
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-10-08 Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.planning;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
* use VOperationDeployParm Class as parameters to search  
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class SearchStaffAndDeploymentParm extends BaseBizParm {
    
    private String vslCallId;
    private int seq;
    private String workLoc;
    private String purpTpCd;
    private String purpLgvCd;
    private String workYmd;			//dd/mm/yyyy
    private String shftId;
    private String shftIdx;
    private String megaNo;
    private String locDivCd;
    private String roleCd;
    private String empId;
    private String eqTpCd;
    private String capaCd;
    private String scdLgv;			//C : Deploy Equipment Divide Code
    private String scdVal;			//C : Deploy Equipment Divide Code
    private String eqDivCd;
    private String eqFacNo;
    private String etaFrom;
    private String etaTo;
    private String searchType;
    private String subSearchType;
    private String rstrYmd;
    private String groupCd;
    private String rstrType;		// Type : Group[GRP], Staff[STF]
    private String staffType;		// Type : Standard[ST], Extra[EX]
    private String colColor1;		// Deployed color
    private String colColor2;		// Other shift deployed color
    private String rsDivCd;
    private String workMode;
    private String whworkDivCd;
    private String conttDiv;
    private String rptNo;
    private String exportTp;
    private String divCd;
    
    private String useYn;
    private String shftMethCd;
    
    private String tyCd;
    private String gridType;
    
    //added by Tim 19/03/2024
    private String shftGrpCd;
    private String shftGrpNm;
    private String scn;
    
	public String getShftGrpCd() {
		return shftGrpCd;
	}
	public void setShftGrpCd(String shftGrpCd) {
		this.shftGrpCd = shftGrpCd;
	}
	public String getShftGrpNm() {
		return shftGrpNm;
	}
	public void setShftGrpNm(String shftGrpNm) {
		this.shftGrpNm = shftGrpNm;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getWorkLoc() {
		return workLoc;
	}
	public void setWorkLoc(String workLoc) {
		this.workLoc = workLoc;
	}
	public String getPurpTpCd() {
		return purpTpCd;
	}
	public void setPurpTpCd(String purpTpCd) {
		this.purpTpCd = purpTpCd;
	}
	public String getPurpLgvCd() {
		return purpLgvCd;
	}
	public void setPurpLgvCd(String purpLgvCd) {
		this.purpLgvCd = purpLgvCd;
	}
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
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
	public String getMegaNo() {
		return megaNo;
	}
	public void setMegaNo(String megaNo) {
		this.megaNo = megaNo;
	}
	public String getLocDivCd() {
		return locDivCd;
	}
	public void setLocDivCd(String locDivCd) {
		this.locDivCd = locDivCd;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getEqTpCd() {
		return eqTpCd;
	}
	public void setEqTpCd(String eqTpCd) {
		this.eqTpCd = eqTpCd;
	}
	public String getCapaCd() {
		return capaCd;
	}
	public void setCapaCd(String capaCd) {
		this.capaCd = capaCd;
	}
	public String getScdLgv() {
		return scdLgv;
	}
	public void setScdLgv(String scdLgv) {
		this.scdLgv = scdLgv;
	}
	public String getScdVal() {
		return scdVal;
	}
	public void setScdVal(String scdVal) {
		this.scdVal = scdVal;
	}
	public String getEqDivCd() {
		return eqDivCd;
	}
	public void setEqDivCd(String eqDivCd) {
		this.eqDivCd = eqDivCd;
	}
	public String getEqFacNo() {
		return eqFacNo;
	}
	public void setEqFacNo(String eqFacNo) {
		this.eqFacNo = eqFacNo;
	}
	public String getEtaFrom() {
		return etaFrom;
	}
	public void setEtaFrom(String etaFrom) {
		this.etaFrom = etaFrom;
	}
	public String getEtaTo() {
		return etaTo;
	}
	public void setEtaTo(String etaTo) {
		this.etaTo = etaTo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getSubSearchType() {
		return subSearchType;
	}
	public void setSubSearchType(String subSearchType) {
		this.subSearchType = subSearchType;
	}
	public String getRstrYmd() {
		return rstrYmd;
	}
	public void setRstrYmd(String rstrYmd) {
		this.rstrYmd = rstrYmd;
	}
	public String getGroupCd() {
		return groupCd;
	}
	public void setGroupCd(String groupCd) {
		this.groupCd = groupCd;
	}
	public String getRstrType() {
		return rstrType;
	}
	public void setRstrType(String rstrType) {
		this.rstrType = rstrType;
	}
	public String getStaffType() {
		return staffType;
	}
	public void setStaffType(String staffType) {
		this.staffType = staffType;
	}
	public String getColColor1() {
		return colColor1;
	}
	public void setColColor1(String colColor1) {
		this.colColor1 = colColor1;
	}
	public String getColColor2() {
		return colColor2;
	}
	public void setColColor2(String colColor2) {
		this.colColor2 = colColor2;
	}
	public String getRsDivCd() {
		return rsDivCd;
	}
	public void setRsDivCd(String rsDivCd) {
		this.rsDivCd = rsDivCd;
	}
	public String getWorkMode() {
		return workMode;
	}
	public void setWorkMode(String workMode) {
		this.workMode = workMode;
	}
	public String getWhworkDivCd() {
		return whworkDivCd;
	}
	public void setWhworkDivCd(String whworkDivCd) {
		this.whworkDivCd = whworkDivCd;
	}
	public String getConttDiv() {
		return conttDiv;
	}
	public void setConttDiv(String conttDiv) {
		this.conttDiv = conttDiv;
	}
	public String getRptNo() {
		return rptNo;
	}
	public void setRptNo(String rptNo) {
		this.rptNo = rptNo;
	}
	public String getExportTp() {
		return exportTp;
	}
	public void setExportTp(String exportTp) {
		this.exportTp = exportTp;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getShftMethCd() {
		return shftMethCd;
	}
	public void setShftMethCd(String shftMethCd) {
		this.shftMethCd = shftMethCd;
	}
	public String getTyCd() {
		return tyCd;
	}
	public void setTyCd(String tyCd) {
		this.tyCd = tyCd;
	}
	public String getGridType() {
		return gridType;
	}
	public void setGridType(String gridType) {
		this.gridType = gridType;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
}
