/**
* PackageTariffRateParm.java
*
* Created on   : Dec 17, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Dec 17, 2007   An Doan 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.parm.billing;

import com.tsb.most.framework.bizparm.BaseBizParm;

/**
 * @author Thuy An
 *
 *         TODO To change the template for this generated type comment go to
 *         Window - Preferences - Java - Code Style - Code Templates
 */
public class SearchPackageTariffRateParm extends BaseBizParm {

	private String startDtm;
	private String endDtm;
	private String trfTp;
	private String trfCd;
	private String pkgTrfNo;
	// for searching standard rate
	private String subTrfCd;

	private String searchTp;
	private String pkgNm;
	private String ptnrCd;
	private String aplyYmd;
	private String exprYmd;
	private String rmk;

	private String terminalCode;

	public String getTerminalCode() {
		return terminalCode;
	}

	public String getRmk() {
		return rmk;
	}

	public void setRmk(String rmk) {
		this.rmk = rmk;
	}

	public String getExprYmd() {
		return exprYmd;
	}

	public void setExprYmd(String exprYmd) {
		this.exprYmd = exprYmd;
	}

	public String getAplyYmd() {
		return aplyYmd;
	}

	public void setAplyYmd(String aplyYmd) {
		this.aplyYmd = aplyYmd;
	}

	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public String getSubTrfCd() {
		return subTrfCd;
	}

	public void setSubTrfCd(String subTrfCd) {
		this.subTrfCd = subTrfCd;
	}

	public String getSearchTp() {
		return searchTp;
	}

	public void setSearchTp(String searchTp) {
		this.searchTp = searchTp;
	}

	public String getEndDtm() {
		return endDtm;
	}

	public void setEndDtm(String endDtm) {
		this.endDtm = endDtm;
	}

	public String getStartDtm() {
		return startDtm;
	}

	public void setStartDtm(String startDtm) {
		this.startDtm = startDtm;
	}

	public String getTrfCd() {
		return trfCd;
	}

	public void setTrfCd(String trfCd) {
		this.trfCd = trfCd;
	}

	public String getTrfTp() {
		return trfTp;
	}

	public void setTrfTp(String trfTp) {
		this.trfTp = trfTp;
	}

	public String getPkgTrfNo() {
		return pkgTrfNo;
	}

	public void setPkgTrfNo(String pkgTrfNo) {
		this.pkgTrfNo = pkgTrfNo;
	}

	public String getPkgNm() {
		return pkgNm;
	}

	public void setPkgNm(String pkgNm) {
		this.pkgNm = pkgNm;
	}
}
