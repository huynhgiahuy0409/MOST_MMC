/**
*
* COPYRIGHT (ACT) 1988-2015 TOTAL SOFT BANK LTD ALL RIGHT RESERVED
*
* FILE NAME : com.pcs.dataitem.admin.UserItem.java
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
package com.tsb.most.basebiz.dataitem.administrator;
import java.util.ArrayList;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;
/**
 * @date : 2015. 4. 14. 오전 11:18:56
 * @version :
 * @author : Alex.Min
 */
public class UserRegisterItem extends DataItem {
	
	private String userId;
	private String engNm;
	private String telNo;
	private String emailAddr;
	private String useYn;
	private String userType;
	private String userLevel;
	private String idNo;
	private String lastLogin;
	private String lastLoginTime;
	private String designation;
	private String updDt;
	private String faxNo;
	private String addr;
	private String extNo;
	private String password;
	private String ptnrCd;
	private String ptnrType;
	private String vcsAp;
	private String fzipsAp;
	private String mssAp;
	private String jctsAp;
	private String mptsAp;
	private String spjAp;
	private String sptcatosAp;
	private String attachFile;
	private String userTypeNm;
	private String userLevelNm;
	private String ptnrNm;
	private String ptnrTypes;
	private String workingStatus;
	private String exprDt;
	private String regUserId;
	private String regUserNm;
	private String regUserType;
	private String regUserLevel;
	private String grdCd;
	private String deptCd;
    private String deptNm;
	private String jobTitle;
	private String mptsApDt;
	private String mptsApBy;
	private String mobileNo;
	private String attachmentFile;
	private String remark;
	private String rmk;
	private String isChangPwd;
	private String updBy;
    private String sysCd;
	private String sysOwnerAp;
	private String prcPgm;
    private String sysOwner;
    private String insUserId;
    private String updUserId;
    private String insDt;
    private String check;
    private String authGrp;
    private String authGrpNm;
    private String authCd;
    private String grpOrd;
	private String staffCd;
	private String partnerType;
	private String partnerTypeName;
	private String partnerCode;
	private String alliance;
	private String allianceCode;
	private String groupId;
	private String shpCd;
	private String shpNm;
	private byte[] userImage;
	
	private ArrayList<UserRegisterItem> ptnrSysList;
	private ArrayList<UserRegisterItem> ptnrUserList;
	private ArrayList<UserRegisterItem> userAuthList;
	private ArrayList<FileUploadItem> uploadItemsList;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getEngNm() {
		return engNm;
	}
	public void setEngNm(String engNm) {
		this.engNm = engNm;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getEmailAddr() {
		return emailAddr;
	}
	public void setEmailAddr(String emailAddr) {
		this.emailAddr = emailAddr;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getUserLevel() {
		return userLevel;
	}
	public void setUserLevel(String userLevel) {
		this.userLevel = userLevel;
	}
	public String getIdNo() {
		return idNo;
	}
	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}
	public String getLastLogin() {
		return lastLogin;
	}
	public void setLastLogin(String lastLogin) {
		this.lastLogin = lastLogin;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	public String getFaxNo() {
		return faxNo;
	}
	public void setFaxNo(String faxNo) {
		this.faxNo = faxNo;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getExtNo() {
		return extNo;
	}
	public void setExtNo(String extNo) {
		this.extNo = extNo;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getPtnrType() {
		return ptnrType;
	}
	public void setPtnrType(String ptnrType) {
		this.ptnrType = ptnrType;
	}
	public String getVcsAp() {
		return vcsAp;
	}
	public void setVcsAp(String vcsAp) {
		this.vcsAp = vcsAp;
	}
	public String getFzipsAp() {
		return fzipsAp;
	}
	public void setFzipsAp(String fzipsAp) {
		this.fzipsAp = fzipsAp;
	}
	public String getMssAp() {
		return mssAp;
	}
	public void setMssAp(String mssAp) {
		this.mssAp = mssAp;
	}
	public String getJctsAp() {
		return jctsAp;
	}
	public void setJctsAp(String jctsAp) {
		this.jctsAp = jctsAp;
	}
	public String getMptsAp() {
		return mptsAp;
	}
	public void setMptsAp(String mptsAp) {
		this.mptsAp = mptsAp;
	}
	public String getSptcatosAp() {
		return sptcatosAp;
	}
	public void setSptcatosAp(String sptcatosAp) {
		this.sptcatosAp = sptcatosAp;
	}
	public String getAttachFile() {
		return attachFile;
	}
	public void setAttachFile(String attachFile) {
		this.attachFile = attachFile;
	}
	public String getUserTypeNm() {
		return userTypeNm;
	}
	public void setUserTypeNm(String userTypeNm) {
		this.userTypeNm = userTypeNm;
	}
	public String getUserLevelNm() {
		return userLevelNm;
	}
	public void setUserLevelNm(String userLevelNm) {
		this.userLevelNm = userLevelNm;
	}
	public String getPtnrNm() {
		return ptnrNm;
	}
	public void setPtnrNm(String ptnrNm) {
		this.ptnrNm = ptnrNm;
	}
	public String getPtnrTypes() {
		return ptnrTypes;
	}
	public void setPtnrTypes(String ptnrTypes) {
		this.ptnrTypes = ptnrTypes;
	}
	public String getLastLoginTime() {
		return lastLoginTime;
	}
	public void setLastLoginTime(String lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public ArrayList<UserRegisterItem> getPtnrSysList() {
		return ptnrSysList;
	}
	public void setPtnrSysList(ArrayList<UserRegisterItem> ptnrSysList) {
		this.ptnrSysList = ptnrSysList;
	}
	public ArrayList<UserRegisterItem> getPtnrUserList() {
		return ptnrUserList;
	}
	public void setPtnrUserList(ArrayList<UserRegisterItem> ptnrUserList) {
		this.ptnrUserList = ptnrUserList;
	}
	public ArrayList<UserRegisterItem> getUserAuthList() {
		return userAuthList;
	}
	public void setUserAuthList(ArrayList<UserRegisterItem> userAuthList) {
		this.userAuthList = userAuthList;
	}
	public String getExprDt() {
		return exprDt;
	}
	public void setExprDt(String exprDt) {
		this.exprDt = exprDt;
	}
	public String getRegUserId() {
		return regUserId;
	}
	public void setRegUserId(String regUserId) {
		this.regUserId = regUserId;
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
	public String getGrdCd() {
		return grdCd;
	}
	public void setGrdCd(String grdCd) {
		this.grdCd = grdCd;
	}
	public String getDeptCd() {
		return deptCd;
	}
	public void setDeptCd(String deptCd) {
		this.deptCd = deptCd;
	}
	public String getDeptNm() {
		return deptNm;
	}
	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getMptsApDt() {
		return mptsApDt;
	}
	public void setMptsApDt(String mptsApDt) {
		this.mptsApDt = mptsApDt;
	}
	public String getMptsApBy() {
		return mptsApBy;
	}
	public void setMptsApBy(String mptsApBy) {
		this.mptsApBy = mptsApBy;
	}
	public String getSpjAp() {
		return spjAp;
	}
	public void setSpjAp(String spjAp) {
		this.spjAp = spjAp;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getAttachmentFile() {
		return attachmentFile;
	}
	public void setAttachmentFile(String attachmentFile) {
		this.attachmentFile = attachmentFile;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public ArrayList<FileUploadItem> getUploadItemsList() {
		return uploadItemsList;
	}
	public void setUploadItemsList(ArrayList<FileUploadItem> uploadItemsList) {
		this.uploadItemsList = uploadItemsList;
	}
	public String getIsChangPwd() {
		return isChangPwd;
	}
	public void setIsChangPwd(String isChangPwd) {
		this.isChangPwd = isChangPwd;
	}
	public String getUpdBy() {
		return updBy;
	}
	public void setUpdBy(String updBy) {
		this.updBy = updBy;
	}
	public String getSysCd() {
		return sysCd;
	}
	public void setSysCd(String sysCd) {
		this.sysCd = sysCd;
	}
	public String getSysOwnerAp() {
		return sysOwnerAp;
	}
	public void setSysOwnerAp(String sysOwnerAp) {
		this.sysOwnerAp = sysOwnerAp;
	}
	public String getPrcPgm() {
		return prcPgm;
	}
	public void setPrcPgm(String prcPgm) {
		this.prcPgm = prcPgm;
	}
	public String getSysOwner() {
		return sysOwner;
	}
	public void setSysOwner(String sysOwner) {
		this.sysOwner = sysOwner;
	}
	public String getInsUserId() {
		return insUserId;
	}
	public void setInsUserId(String insUserId) {
		this.insUserId = insUserId;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}
	public String getInsDt() {
		return insDt;
	}
	public void setInsDt(String insDt) {
		this.insDt = insDt;
	}
	public String getCheck() {
		return check;
	}
	public void setCheck(String check) {
		this.check = check;
	}
	public String getAuthGrp() {
		return authGrp;
	}
	public void setAuthGrp(String authGrp) {
		this.authGrp = authGrp;
	}
	public String getAuthGrpNm() {
		return authGrpNm;
	}
	public void setAuthGrpNm(String authGrpNm) {
		this.authGrpNm = authGrpNm;
	}
	public String getAuthCd() {
		return authCd;
	}
	public void setAuthCd(String authCd) {
		this.authCd = authCd;
	}
	public String getGrpOrd() {
		return grpOrd;
	}
	public void setGrpOrd(String grpOrd) {
		this.grpOrd = grpOrd;
	}
	public String getStaffCd() {
		return staffCd;
	}
	public void setStaffCd(String staffCd) {
		this.staffCd = staffCd;
	}
	public String getPartnerType() {
		return partnerType;
	}
	public void setPartnerType(String partnerType) {
		this.partnerType = partnerType;
	}
	public String getPartnerTypeName() {
		return partnerTypeName;
	}
	public void setPartnerTypeName(String partnerTypeName) {
		this.partnerTypeName = partnerTypeName;
	}
	public String getPartnerCode() {
		return partnerCode;
	}
	public void setPartnerCode(String partnerCode) {
		this.partnerCode = partnerCode;
	}
	public String getAlliance() {
		return alliance;
	}
	public void setAlliance(String alliance) {
		this.alliance = alliance;
	}
	public String getAllianceCode() {
		return allianceCode;
	}
	public void setAllianceCode(String allianceCode) {
		this.allianceCode = allianceCode;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getShpCd() {
		return shpCd;
	}
	public void setShpCd(String shpCd) {
		this.shpCd = shpCd;
	}
	public String getShpNm() {
		return shpNm;
	}
	public void setShpNm(String shpNm) {
		this.shpNm = shpNm;
	}
	public byte[] getUserImage() {
		return userImage;
	}
	public void setUserImage(byte[] userImage) {
		this.userImage = userImage;
	}
}
