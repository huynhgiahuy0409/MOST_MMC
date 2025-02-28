/**
* VOperationDeployStaffItem.java
*
* Created on   : 2007-10-09
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-10-09 Mr Tonny Kim 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.operation;

import com.tsb.most.framework.dataitem.DataItem;

/**
* use VOperationDeployStaffItem Class as parameters to CUD 
*
* @author Mr Tonny Kim
* @version 1.0
*
* @see 
*/
public class VOperationDeployStaffItem extends DataItem {

    private String empId;
    private String roleCd;
    private String roleCdNm;
    private String engNm;
    private String scdNm;
    private String scd;
    private String locId;
    private String locNm;
    private String groupCd;
    private String groupNm;
    private String purpTpCd;
    private String depyShftId; //Deploy Shift Id
    private String colColor;
    private String status;
    private String rmk;
    private String hiddenEmpId;
    
    public String getHiddenEmpId() {
        return hiddenEmpId;
    }
    public void setHiddenEmpId(String hiddenEmpId) {
        this.hiddenEmpId = hiddenEmpId;
    }
    /**
     * @return Returns the rmk.
     */
    public String getRmk() {
        return rmk;
    }
    /**
     * @param rmk The rmk to set.
     */
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    /**
     * @return Returns the colColor.
     */
    public String getColColor() {
        return colColor;
    }
    /**
     * @param colColor The colColor to set.
     */
    public void setColColor(String colColor) {
        this.colColor = colColor;
    }
    /**
     * @return Returns the depyShftId.
     */
    public String getDepyShftId() {
        return depyShftId;
    }
    /**
     * @param depyShftId The depyShftId to set.
     */
    public void setDepyShftId(String depyShftId) {
        this.depyShftId = depyShftId;
    }
    /**
     * @return Returns the empId.
     */
    public String getEmpId() {
        return empId;
    }
    /**
     * @param empId The empId to set.
     */
    public void setEmpId(String empId) {
        this.empId = empId;
    }
    /**
     * @return Returns the engNm.
     */
    public String getEngNm() {
        return engNm;
    }
    /**
     * @param engNm The engNm to set.
     */
    public void setEngNm(String engNm) {
        this.engNm = engNm;
    }
    /**
     * @return Returns the groupCd.
     */
    public String getGroupCd() {
        return groupCd;
    }
    /**
     * @param groupCd The groupCd to set.
     */
    public void setGroupCd(String groupCd) {
        this.groupCd = groupCd;
    }
    /**
     * @return Returns the groupNm.
     */
    public String getGroupNm() {
        return groupNm;
    }
    /**
     * @param groupNm The groupNm to set.
     */
    public void setGroupNm(String groupNm) {
        this.groupNm = groupNm;
    }
    /**
     * @return Returns the locId.
     */
    public String getLocId() {
        return locId;
    }
    /**
     * @param locId The locId to set.
     */
    public void setLocId(String locId) {
        this.locId = locId;
    }
    /**
     * @return Returns the locNm.
     */
    public String getLocNm() {
        return locNm;
    }
    /**
     * @param locNm The locNm to set.
     */
    public void setLocNm(String locNm) {
        this.locNm = locNm;
    }
    /**
     * @return Returns the purpTpCd.
     */
    public String getPurpTpCd() {
        return purpTpCd;
    }
    /**
     * @param purpTpCd The purpTpCd to set.
     */
    public void setPurpTpCd(String purpTpCd) {
        this.purpTpCd = purpTpCd;
    }
    /**
     * @return Returns the roleCd.
     */
    public String getRoleCd() {
        return roleCd;
    }
    /**
     * @param roleCd The roleCd to set.
     */
    public void setRoleCd(String roleCd) {
        this.roleCd = roleCd;
    }
    /**
     * @return Returns the roleCdNm.
     */
    public String getRoleCdNm() {
        return roleCdNm;
    }
    /**
     * @param roleCdNm The roleCdNm to set.
     */
    public void setRoleCdNm(String roleCdNm) {
        this.roleCdNm = roleCdNm;
    }
    /**
     * @return Returns the scd.
     */
    public String getScd() {
        return scd;
    }
    /**
     * @param scd The scd to set.
     */
    public void setScd(String scd) {
        this.scd = scd;
    }
    /**
     * @return Returns the scdNm.
     */
    public String getScdNm() {
        return scdNm;
    }
    /**
     * @param scdNm The scdNm to set.
     */
    public void setScdNm(String scdNm) {
        this.scdNm = scdNm;
    }
    /**
     * @return Returns the status.
     */
    public String getStatus() {
        return status;
    }
    /**
     * @param status The status to set.
     */
    public void setStatus(String status) {
        this.status = status;
    }
}
