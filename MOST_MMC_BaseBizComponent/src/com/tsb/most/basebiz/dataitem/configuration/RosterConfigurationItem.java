/**
* InternalStaffMngItem.java
*
* Created on   : 2007-09-03
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-09-03 Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.configuration;

import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

/**
* use InternalStaffMngItem Class as parameters to CUD 
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class RosterConfigurationItem extends DataItem {

	private String engNm;
	private String empId;
	private String tuserId;
	private String tuserNm;
	private String grdCd;
	private String grdCdNm;
	private String statCd;
	private String statCdNm;
	private String proleCd;
	private String proleCdNm;
	private String roleCd;
	private String roleCdNm;
	private String workLocCd;
	private String workLocCdNm;
	private String conttDiv;
	private String conttDivNm;
	private String unitDiv;
	private String costCentCd;
	private String costCentNm;
	private String shftGroupNm;
	private String shftGroupCd;
	private String useYn;
	private String no;
	private String remark;
	private String chgItemYn;
	private String email;
    private String hiddenEmpId;
	
    //Shift Type
    private String shftTpCd;
    private String shftTpCdNm;
    private String rate;
    private String updDt;
    private String updBy;
    
    //TMT_SHFT_GRP_EMP TABLE
    private String shftGrpCd;
    private String aplyFmYmd;
    private String aplyToYmd;
    private String intvlTpCd;
    private int intvlVal;
    private String shftDivCd;
    
    //Group Definition
    private String shftId;
    private String shftNm;
    private String fmHhmm;
    private String toHhmm;
    private String groupCd;
    private String groupNm;
    private String divCd;
    private String scd;
    private String scdNm;
    private String shftMethCd;
    private String shftIdx;
    private String rmk;
    private String insertType; //shift, group
    private String workingStatus;
	private String version;
    
    //UnavailableLog
    private String rsnCd;
    private String rsnCdNm;
    private String fmYmd;
    private String toYmd;
    private Date fmYmdKey;
    private Date toYmdKey;
    private String days;
    private String removeFmYmd;
    private String removeToYmd;
    private String removeRsnCd;
    private String unavailYmd;
    private String unavailYmdKey;
    
	public String getEngNm() {
		return engNm;
	}
	public void setEngNm(String engNm) {
		this.engNm = engNm;
	}
	public String getEmpId() {
		return empId;
	}
	public void setEmpId(String empId) {
		this.empId = empId;
	}
	public String getTuserId() {
		return tuserId;
	}
	public void setTuserId(String tuserId) {
		this.tuserId = tuserId;
	}
	public String getTuserNm() {
		return tuserNm;
	}
	public void setTuserNm(String tuserNm) {
		this.tuserNm = tuserNm;
	}
	public String getGrdCd() {
		return grdCd;
	}
	public void setGrdCd(String grdCd) {
		this.grdCd = grdCd;
	}
	public String getGrdCdNm() {
		return grdCdNm;
	}
	public void setGrdCdNm(String grdCdNm) {
		this.grdCdNm = grdCdNm;
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
	public String getProleCd() {
		return proleCd;
	}
	public void setProleCd(String proleCd) {
		this.proleCd = proleCd;
	}
	public String getProleCdNm() {
		return proleCdNm;
	}
	public void setProleCdNm(String proleCdNm) {
		this.proleCdNm = proleCdNm;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getRoleCdNm() {
		return roleCdNm;
	}
	public void setRoleCdNm(String roleCdNm) {
		this.roleCdNm = roleCdNm;
	}
	public String getWorkLocCd() {
		return workLocCd;
	}
	public void setWorkLocCd(String workLocCd) {
		this.workLocCd = workLocCd;
	}
	public String getWorkLocCdNm() {
		return workLocCdNm;
	}
	public void setWorkLocCdNm(String workLocCdNm) {
		this.workLocCdNm = workLocCdNm;
	}
	public String getConttDiv() {
		return conttDiv;
	}
	public void setConttDiv(String conttDiv) {
		this.conttDiv = conttDiv;
	}
	public String getConttDivNm() {
		return conttDivNm;
	}
	public void setConttDivNm(String conttDivNm) {
		this.conttDivNm = conttDivNm;
	}
	public String getUnitDiv() {
		return unitDiv;
	}
	public void setUnitDiv(String unitDiv) {
		this.unitDiv = unitDiv;
	}
	public String getCostCentCd() {
		return costCentCd;
	}
	public void setCostCentCd(String costCentCd) {
		this.costCentCd = costCentCd;
	}
	public String getCostCentNm() {
		return costCentNm;
	}
	public void setCostCentNm(String costCentNm) {
		this.costCentNm = costCentNm;
	}
	public String getShftGroupNm() {
		return shftGroupNm;
	}
	public void setShftGroupNm(String shftGroupNm) {
		this.shftGroupNm = shftGroupNm;
	}
	public String getShftGroupCd() {
		return shftGroupCd;
	}
	public void setShftGroupCd(String shftGroupCd) {
		this.shftGroupCd = shftGroupCd;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getChgItemYn() {
		return chgItemYn;
	}
	public void setChgItemYn(String chgItemYn) {
		this.chgItemYn = chgItemYn;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getHiddenEmpId() {
		return hiddenEmpId;
	}
	public void setHiddenEmpId(String hiddenEmpId) {
		this.hiddenEmpId = hiddenEmpId;
	}
	public String getShftTpCd() {
		return shftTpCd;
	}
	public void setShftTpCd(String shftTpCd) {
		this.shftTpCd = shftTpCd;
	}
	public String getShftTpCdNm() {
		return shftTpCdNm;
	}
	public void setShftTpCdNm(String shftTpCdNm) {
		this.shftTpCdNm = shftTpCdNm;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	public String getUpdBy() {
		return updBy;
	}
	public void setUpdBy(String updBy) {
		this.updBy = updBy;
	}
	public String getShftGrpCd() {
		return shftGrpCd;
	}
	public void setShftGrpCd(String shftGrpCd) {
		this.shftGrpCd = shftGrpCd;
	}
	public String getAplyFmYmd() {
		return aplyFmYmd;
	}
	public void setAplyFmYmd(String aplyFmYmd) {
		this.aplyFmYmd = aplyFmYmd;
	}
	public String getAplyToYmd() {
		return aplyToYmd;
	}
	public void setAplyToYmd(String aplyToYmd) {
		this.aplyToYmd = aplyToYmd;
	}
	public String getIntvlTpCd() {
		return intvlTpCd;
	}
	public void setIntvlTpCd(String intvlTpCd) {
		this.intvlTpCd = intvlTpCd;
	}
	public int getIntvlVal() {
		return intvlVal;
	}
	public void setIntvlVal(int intvlVal) {
		this.intvlVal = intvlVal;
	}
	public String getShftDivCd() {
		return shftDivCd;
	}
	public void setShftDivCd(String shftDivCd) {
		this.shftDivCd = shftDivCd;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getFmHhmm() {
		return fmHhmm;
	}
	public void setFmHhmm(String fmHhmm) {
		this.fmHhmm = fmHhmm;
	}
	public String getToHhmm() {
		return toHhmm;
	}
	public void setToHhmm(String toHhmm) {
		this.toHhmm = toHhmm;
	}
	public String getGroupCd() {
		return groupCd;
	}
	public void setGroupCd(String groupCd) {
		this.groupCd = groupCd;
	}
	public String getGroupNm() {
		return groupNm;
	}
	public void setGroupNm(String groupNm) {
		this.groupNm = groupNm;
	}
	public String getDivCd() {
		return divCd;
	}
	public void setDivCd(String divCd) {
		this.divCd = divCd;
	}
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
	public String getShftMethCd() {
		return shftMethCd;
	}
	public void setShftMethCd(String shftMethCd) {
		this.shftMethCd = shftMethCd;
	}
	public String getShftIdx() {
		return shftIdx;
	}
	public void setShftIdx(String shftIdx) {
		this.shftIdx = shftIdx;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getInsertType() {
		return insertType;
	}
	public void setInsertType(String insertType) {
		this.insertType = insertType;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getRsnCd() {
		return rsnCd;
	}
	public void setRsnCd(String rsnCd) {
		this.rsnCd = rsnCd;
	}
	public String getRsnCdNm() {
		return rsnCdNm;
	}
	public void setRsnCdNm(String rsnCdNm) {
		this.rsnCdNm = rsnCdNm;
	}
	public String getFmYmd() {
		return fmYmd;
	}
	public void setFmYmd(String fmYmd) {
		this.fmYmd = fmYmd;
	}
	public String getToYmd() {
		return toYmd;
	}
	public void setToYmd(String toYmd) {
		this.toYmd = toYmd;
	}
	public Date getFmYmdKey() {
		return fmYmdKey;
	}
	public void setFmYmdKey(Date fmYmdKey) {
		this.fmYmdKey = fmYmdKey;
	}
	public Date getToYmdKey() {
		return toYmdKey;
	}
	public void setToYmdKey(Date toYmdKey) {
		this.toYmdKey = toYmdKey;
	}
	public String getDays() {
		return days;
	}
	public void setDays(String days) {
		this.days = days;
	}
	public String getRemoveFmYmd() {
		return removeFmYmd;
	}
	public void setRemoveFmYmd(String removeFmYmd) {
		this.removeFmYmd = removeFmYmd;
	}
	public String getRemoveToYmd() {
		return removeToYmd;
	}
	public void setRemoveToYmd(String removeToYmd) {
		this.removeToYmd = removeToYmd;
	}
	public String getRemoveRsnCd() {
		return removeRsnCd;
	}
	public void setRemoveRsnCd(String removeRsnCd) {
		this.removeRsnCd = removeRsnCd;
	}
	public String getUnavailYmd() {
		return unavailYmd;
	}
	public void setUnavailYmd(String unavailYmd) {
		this.unavailYmd = unavailYmd;
	}
	public String getUnavailYmdKey() {
		return unavailYmdKey;
	}
	public void setUnavailYmdKey(String unavailYmdKey) {
		this.unavailYmdKey = unavailYmdKey;
	}
}
