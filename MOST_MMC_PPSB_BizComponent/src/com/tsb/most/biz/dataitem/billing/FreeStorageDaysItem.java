/**
* FreeStoragePeriodItem.java
*
* Created on   : 2007-11-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-11-28   Hugh Lim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.billing;

import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author Hugh
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class FreeStorageDaysItem extends DataItem {
	private String ptnrCd;
	private String opeClassCd;
	private String cgTpCd;
	private String cmdtCd;
	private String cmdtCdNm;
	private Date aplyYmd;
	private Date exprYmd;
	private int freeDd;
	private String rmk;
	private String incldSunYn;
	private String por;

	private String no;

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
	public String getOpeClassCd() {
		return opeClassCd;
	}
	public void setOpeClassCd(String opeClassCd) {
		this.opeClassCd = opeClassCd;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String pntrCd) {
		this.ptnrCd = pntrCd;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		if (rmk == null) {
			rmk = "";
		}
		this.rmk = rmk;
	}
	public Date getAplyYmd() {
		return aplyYmd;
	}
	public void setAplyYmd(Date aplyYmd) {
		this.aplyYmd = aplyYmd;
	}
	public Date getExprYmd() {
		return exprYmd;
	}
	public void setExprYmd(Date exprYmd) {
		this.exprYmd = exprYmd;
	}
	public int getFreeDd() {
		return freeDd;
	}
	public void setFreeDd(int freeDd) {
		this.freeDd = freeDd;
	}
	public String getIncldSunYn() {
		return incldSunYn;
	}
	public void setIncldSunYn(String incldSunYn) {
		this.incldSunYn = incldSunYn;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	/**
	 * @return Returns the por.
	 */
	public String getPor() {
		return por;
	}
	/**
	 * @param por The por to set.
	 */
	public void setPor(String por) {
		this.por = por;
	}
	public String getCmdtCdNm() {
		return cmdtCdNm;
	}
	public void setCmdtCdNm(String cmdtCdNm) {
		this.cmdtCdNm = cmdtCdNm;
	}
}
