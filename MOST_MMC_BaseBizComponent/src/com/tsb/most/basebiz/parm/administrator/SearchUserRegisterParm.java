/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.parm.admin.UserParam.java
* CREATE ON : 2015. 4. 14.
* CLASS DESCRIPTION :
*
* 
* CHANGE REVISION
* --------------------------------------------------------------------------
* DATE            AUTHOR                       REVISION    
* --------------------------------------------------------------------------
* 2015. 4. 14.     Alex.Min             First release.
* --------------------------------------------------------------------------
*
*/
package com.tsb.most.basebiz.parm.administrator;
import com.tsb.most.framework.bizparm.BaseBizParm;
/**
 * @date : 2015. 4. 14. 오전 11:37:36
 * @version :
 * @author : Alex.Min
 */
public class SearchUserRegisterParm extends BaseBizParm {
	
	private String regUserId;
	private String userName;
	private String userLevel;
	private String partnerCondition;
	private String partnerType;
	private String partnerCode;
	private String groupId;
	
	private String userId;
	private String idNo;
	private String userType;
	private String useYn;
	private String ptnrType;
	private String ptnrCd;
	private String activeTime;
	private String registrySystem;
	private String status;
	private String regYn; //registered member or new member
	private String regUserNm;
	private String regUserType;
	private String regUserLevel;
	private String frmDt;
	private String toDt;
	private String pwd;
	private String sysCd;
	
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserLevel() {
		return userLevel;
	}
	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}
	public String getPartnerCondition() {
		return partnerCondition;
	}
	public void setPartnerCondition(String partnerCondition) {
		this.partnerCondition = partnerCondition;
	}
	public String getPartnerType() {
		return partnerType;
	}
	public void setPartnerType(String partnerType) {
		this.partnerType = partnerType;
	}
	public String getPartnerCode() {
		return partnerCode;
	}
	public void setPartnerCode(String partnerCode) {
		this.partnerCode = partnerCode;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getIdNo() {
		return idNo;
	}
	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getPtnrType() {
		return ptnrType;
	}
	public void setPtnrType(String ptnrType) {
		this.ptnrType = ptnrType;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getActiveTime() {
		return activeTime;
	}
	public void setActiveTime(String activeTime) {
		this.activeTime = activeTime;
	}
	public String getRegistrySystem() {
		return registrySystem;
	}
	public void setRegistrySystem(String registrySystem) {
		this.registrySystem = registrySystem;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRegYn() {
		return regYn;
	}
	public void setRegYn(String regYn) {
		this.regYn = regYn;
	}
	public String getRegUserNm() {
		return regUserNm;
	}
	public void setRegUserNm(String regUserNm) {
		this.regUserNm = regUserNm;
	}
	public String getRegUserType() {
		return regUserType;
	}
	public void setRegUserType(String regUserType) {
		this.regUserType = regUserType;
	}
	public String getRegUserLevel() {
		return regUserLevel;
	}
	public void setRegUserLevel(String regUserLevel) {
		this.regUserLevel = regUserLevel;
	}
	public String getFrmDt() {
		return frmDt;
	}
	public void setFrmDt(String frmDt) {
		this.frmDt = frmDt;
	}
	public String getToDt() {
		return toDt;
	}
	public void setToDt(String toDt) {
		this.toDt = toDt;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	public String getSysCd() {
		return sysCd;
	}
	public void setSysCd(String sysCd) {
		this.sysCd = sysCd;
	}
	
}
