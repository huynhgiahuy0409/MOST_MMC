/**
* 
* COPYRIGHT (PLUS) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
* 
* FILE NAME : com.pcs.dataitem.common.SystemCodeItem.java 
* CREATE ON : 2015. 3. 27
* CLASS DESCRIPTION :
* 
*  
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION     
* --------------------------------------------------------------------------
* 2015. 3. 27     simonkang             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.codes;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * The Class SystemCodeItem.
 */
public class GeneralCodeItem extends DataItem{

	private static final long serialVersionUID = -4711766207668131877L;
	
	private String lcd;
	private String lcdNm;
	private String mcd;
	private String mcdNm;
	private String mcdDesc;
	private String useYn;
	private String version;
	private String updatedTime;
	private String updatedBy;
	private String userId;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getLcd() {
		return lcd;
	}
	public void setLcd(String lcd) {
		this.lcd = lcd;
	}
	public String getLcdNm() {
		return lcdNm;
	}
	public void setLcdNm(String lcdNm) {
		this.lcdNm = lcdNm;
	}
	public String getMcd() {
		return mcd;
	}
	public void setMcd(String mcd) {
		this.mcd = mcd;
	}
	public String getMcdNm() {
		return mcdNm;
	}
	public void setMcdNm(String mcdNm) {
		this.mcdNm = mcdNm;
	}
	public String getMcdDesc() {
		return mcdDesc;
	}
	public void setMcdDesc(String mcdDesc) {
		this.mcdDesc = mcdDesc;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(String updatedTime) {
		this.updatedTime = updatedTime;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	
}
