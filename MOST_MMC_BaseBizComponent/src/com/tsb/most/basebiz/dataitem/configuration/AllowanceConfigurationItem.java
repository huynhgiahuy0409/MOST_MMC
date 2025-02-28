/**
* CommodityCodeItem.java
*
* Created on   : 2008-03-28
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	          REVISION    	
* 2008-03-28   Miss Nam-Sook Chang 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.configuration;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dataitem.common.CodeMasterListItem;
import com.tsb.most.framework.dataitem.DataItem;

public class AllowanceConfigurationItem extends DataItem {
	private static final long serialVersionUID = -4497643460907609982L;

	private String appType;
	private String seq;
	private String allowance;
	private String allowanceCd;
	private String stMonth;
	private String edMonth;
	private String amount;
	private String role1;
	private String roleCd1;
	private String grade1;
	private String gradeCd1;
	private String role2;
	private String roleCd2;
	private String grade2;
	private String gradeCd2;
	private String staffId;
	private String staffNm;
	private String no;
	private String empIdHidden;
	private String amount2;

	private List<AllowanceConfigurationItem> allowanceRateList;
	private List<AllowanceConfigurationItem> multiSkillList;
	private List<AllowanceConfigurationItem> incentiveList;
	private List<AllowanceConfigurationItem> fuelList;
	private List<AllowanceConfigurationItem> tonnageList;
	private List<AllowanceConfigurationItem> dayoffList;
	private List<AllowanceConfigurationItem> bonusRmList;
	private List<CodeMasterListItem> allowanceType;
	private List<CodeMasterListItem> roleList;
	private List<CodeMasterListItem> gradeList;

	public String getEmpIdHidden() {
		return empIdHidden;
	}

	public void setEmpIdHidden(String empIdHidden) {
		this.empIdHidden = empIdHidden;
	}

	public String getRoleNm() {
		return roleNm;
	}

	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}

	private String amount1;
	private String roleNm;

	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}

	public String getStaffNm() {
		return staffNm;
	}

	public void setStaffNm(String staffNm) {
		this.staffNm = staffNm;
	}

	public String getAllowanceCd() {
		return allowanceCd;
	}

	public void setAllowanceCd(String allowanceCd) {
		this.allowanceCd = allowanceCd;
	}

	public String getGradeCd1() {
		return gradeCd1;
	}

	public void setGradeCd1(String gradeCd1) {
		this.gradeCd1 = gradeCd1;
	}

	public String getGradeCd2() {
		return gradeCd2;
	}

	public void setGradeCd2(String gradeCd2) {
		this.gradeCd2 = gradeCd2;
	}

	public String getRoleCd1() {
		return roleCd1;
	}

	public void setRoleCd1(String roleCd1) {
		this.roleCd1 = roleCd1;
	}

	public String getRoleCd2() {
		return roleCd2;
	}

	public void setRoleCd2(String roleCd2) {
		this.roleCd2 = roleCd2;
	}

	public String getAllowance() {
		return allowance;
	}

	public void setAllowance(String allowance) {
		this.allowance = allowance;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getAppType() {
		return appType;
	}

	public void setAppType(String appType) {
		this.appType = appType;
	}

	public String getEdMonth() {
		return edMonth;
	}

	public void setEdMonth(String edMonth) {
		this.edMonth = edMonth;
	}

	public String getGrade1() {
		return grade1;
	}

	public void setGrade1(String grade1) {
		this.grade1 = grade1;
	}

	public String getGrade2() {
		return grade2;
	}

	public void setGrade2(String grade2) {
		this.grade2 = grade2;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getRole1() {
		return role1;
	}

	public void setRole1(String role1) {
		this.role1 = role1;
	}

	public String getRole2() {
		return role2;
	}

	public void setRole2(String role2) {
		this.role2 = role2;
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getStMonth() {
		return stMonth;
	}

	public void setStMonth(String stMonth) {
		this.stMonth = stMonth;
	}

	public String getAmount1() {
		return amount1;
	}

	public void setAmount1(String amount1) {
		this.amount1 = amount1;
	}

	public String getAmount2() {
		return amount2;
	}

	public void setAmount2(String amount2) {
		this.amount2 = amount2;
	}

	public List<AllowanceConfigurationItem> getAllowanceRateList() {
		return allowanceRateList;
	}

	public void setAllowanceRateList(List<AllowanceConfigurationItem> allowanceRateList) {
		this.allowanceRateList = allowanceRateList;
	}

	public List<AllowanceConfigurationItem> getMultiSkillList() {
		return multiSkillList;
	}

	public void setMultiSkillList(List<AllowanceConfigurationItem> multiSkillList) {
		this.multiSkillList = multiSkillList;
	}

	public List<AllowanceConfigurationItem> getIncentiveList() {
		return incentiveList;
	}

	public void setIncentiveList(List<AllowanceConfigurationItem> incentiveList) {
		this.incentiveList = incentiveList;
	}

	public List<AllowanceConfigurationItem> getFuelList() {
		return fuelList;
	}

	public void setFuelList(List<AllowanceConfigurationItem> fuelList) {
		this.fuelList = fuelList;
	}

	public List<AllowanceConfigurationItem> getTonnageList() {
		return tonnageList;
	}

	public void setTonnageList(List<AllowanceConfigurationItem> tonnageList) {
		this.tonnageList = tonnageList;
	}

	public List<AllowanceConfigurationItem> getDayoffList() {
		return dayoffList;
	}

	public void setDayoffList(List<AllowanceConfigurationItem> dayoffList) {
		this.dayoffList = dayoffList;
	}

	public List<AllowanceConfigurationItem> getBonusRmList() {
		return bonusRmList;
	}

	public void setBonusRmList(List<AllowanceConfigurationItem> bonusRmList) {
		this.bonusRmList = bonusRmList;
	}

	public List<CodeMasterListItem> getAllowanceType() {
		return allowanceType;
	}

	public void setAllowanceType(List<CodeMasterListItem> allowanceType) {
		this.allowanceType = allowanceType;
	}

	public List<CodeMasterListItem> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<CodeMasterListItem> roleList) {
		this.roleList = roleList;
	}

	public List<CodeMasterListItem> getGradeList() {
		return gradeList;
	}

	public void setGradeList(List<CodeMasterListItem> gradeList) {
		this.gradeList = gradeList;
	}

}
