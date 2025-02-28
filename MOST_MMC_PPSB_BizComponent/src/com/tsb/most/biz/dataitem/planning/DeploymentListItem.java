/**
* DeploymentListItem.java
*
* Created on   : 2021-11-01
* Target OS    : Java VM 1.8 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           	AUTHOR      	   	REVISION    	
* 2021-11-01  		nd.hiep   			First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*/
package com.tsb.most.biz.dataitem.planning;

import com.tsb.most.framework.dataitem.DataItem;

public class DeploymentListItem extends DataItem {
	private String vslCallId;
    private String staffNo;
    private String staffNm;
    private String departmentCd;
    private String departmentNm;
    private String groupCd;
    private String deploymentDate;
    private String deploymentShiftId;
    private String deploymentShiftNm;
    private String workingArea;
    private String roleCd;
    private String roleNm;
    private String eqTypeCd;
    private String eqTypeNm;
    private String capacity;
    private String scn;
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getStaffNo() {
		return staffNo;
	}
	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}
	public String getStaffNm() {
		return staffNm;
	}
	public void setStaffNm(String staffNm) {
		this.staffNm = staffNm;
	}
	public String getDepartmentCd() {
		return departmentCd;
	}
	public void setDepartmentCd(String departmentCd) {
		this.departmentCd = departmentCd;
	}
	public String getDepartmentNm() {
		return departmentNm;
	}
	public void setDepartmentNm(String departmentNm) {
		this.departmentNm = departmentNm;
	}
	public String getGroupCd() {
		return groupCd;
	}
	public void setGroupCd(String groupCd) {
		this.groupCd = groupCd;
	}
	public String getDeploymentDate() {
		return deploymentDate;
	}
	public void setDeploymentDate(String deploymentDate) {
		this.deploymentDate = deploymentDate;
	}
	public String getDeploymentShiftId() {
		return deploymentShiftId;
	}
	public void setDeploymentShiftId(String deploymentShiftId) {
		this.deploymentShiftId = deploymentShiftId;
	}
	public String getDeploymentShiftNm() {
		return deploymentShiftNm;
	}
	public void setDeploymentShiftNm(String deploymentShiftNm) {
		this.deploymentShiftNm = deploymentShiftNm;
	}
	public String getWorkingArea() {
		return workingArea;
	}
	public void setWorkingArea(String workingArea) {
		this.workingArea = workingArea;
	}
	public String getRoleCd() {
		return roleCd;
	}
	public void setRoleCd(String roleCd) {
		this.roleCd = roleCd;
	}
	public String getRoleNm() {
		return roleNm;
	}
	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}
	public String getEqTypeCd() {
		return eqTypeCd;
	}
	public void setEqTypeCd(String eqTypeCd) {
		this.eqTypeCd = eqTypeCd;
	}
	public String getEqTypeNm() {
		return eqTypeNm;
	}
	public void setEqTypeNm(String eqTypeNm) {
		this.eqTypeNm = eqTypeNm;
	}
	public String getCapacity() {
		return capacity;
	}
	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
    
}
