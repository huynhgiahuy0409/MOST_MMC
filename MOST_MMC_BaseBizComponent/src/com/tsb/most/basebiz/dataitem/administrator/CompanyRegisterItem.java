package com.tsb.most.basebiz.dataitem.administrator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class CompanyRegisterItem extends DataItem {
	//private static final long serialVersionUID = 1L;
	
	private String companyCode;
	private String engSnm;
	private String ptnrTp;
	private String addr;
	private String telNo;
	private String faxNo;
	private String holdChk;
	private String accountHold;
	
	private byte[] ptnrImage;
	private String validCode;
	private String oldPtnrCode;
	private String ptnrType;
	private String customRefFwd;
	private String customSFWD;
	private String customEFWD;
	private String customEdate;
	private String customSdate;
	private String customRef;
	private String customRefSha;
	private String agencyCode;
	private String taxCd;
	
	private String engLnm;
	private String regNo;
	private String representative;
	private String zipCd;
	private String custCd;
	private String email;
	private String remark;
	private String financeGrp;
	private String companyStatus;
	private String profileStatus;
	private String ptnrCode;
	private String paymentType;
	private String accNo;
	private String ptnrLevel;
	private String fcontactDate;
	private String tcontactDate;
	private String shpNm;
	private String shpCode;
	private String checkItem;
	private String cntUser;
	//s-MGR-008 PLUS – Company Register List and Detail screen
	private String tmnl;
	private String suspendChk;
	private String rentalChk;
	private String paymentTerm;
	private String tin;
	private String sstNo;
	private Double bal;
	private Double creditLimit;
	private String gstRegDt;
	private String gstApplyDt;
	private String gstExpiredDt;
	private String updDt;
	private String rmk;
	private String agencyType;
	private String gstRefId;
	private String gstCommId;
	private String gstStatCd;
	private String depositLimit;
	
	public String getAgencyType() {
		return agencyType;
	}
	public void setAgencyType(String agencyType) {
		this.agencyType = agencyType;
	}
	public String getRmk() {
		return rmk;
	}
	public void setRmk(String rmk) {
		this.rmk = rmk;
	}
	public String getUpdDt() {
		return updDt;
	}
	public void setUpdDt(String updDt) {
		this.updDt = updDt;
	}
	public String getGstRegDt() {
		return gstRegDt;
	}
	public void setGstRegDt(String gstRegDt) {
		this.gstRegDt = gstRegDt;
	}
	public String getGstApplyDt() {
		return gstApplyDt;
	}
	public void setGstApplyDt(String gstApplyDt) {
		this.gstApplyDt = gstApplyDt;
	}
	public String getGstExpiredDt() {
		return gstExpiredDt;
	}
	public void setGstExpiredDt(String gstExpiredDt) {
		this.gstExpiredDt = gstExpiredDt;
	}
	public Double getBal() {
		return bal;
	}
	public void setBal(Double bal) {
		this.bal = bal;
	}
	public Double getCreditLimit() {
		return creditLimit;
	}
	public void setCreditLimit(Double creditLimit) {
		this.creditLimit = creditLimit;
	}
	public String getTin() {
		return tin;
	}
	public void setTin(String tin) {
		this.tin = tin;
	}
	public String getSstNo() {
		return sstNo;
	}
	public void setSstNo(String sstNo) {
		this.sstNo = sstNo;
	}
	public String getTmnl() {
		return tmnl;
	}
	public void setTmnl(String tmnl) {
		this.tmnl = tmnl;
	}
	public String getSuspendChk() {
		return suspendChk;
	}
	public void setSuspendChk(String suspendChk) {
		this.suspendChk = suspendChk;
	}
	public String getRentalChk() {
		return rentalChk;
	}
	public void setRentalChk(String rentalChk) {
		this.rentalChk = rentalChk;
	}
	//e-MGR-008 PLUS – Company Register List and Detail screen

	private List<CompanyRegisterItem> shpList;
	private List<CompanyRegisterItem> accNoList;
	
	public String getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}
	public String getEngSnm() {
		return engSnm;
	}
	public void setEngSnm(String engSnm) {
		this.engSnm = engSnm;
	}
	public String getPtnrTp() {
		return ptnrTp;
	}
	public void setPtnrTp(String ptnrTp) {
		this.ptnrTp = ptnrTp;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getFaxNo() {
		return faxNo;
	}
	public void setFaxNo(String faxNo) {
		this.faxNo = faxNo;
	}
	public String getHoldChk() {
		return holdChk;
	}
	public void setHoldChk(String holdChk) {
		this.holdChk = holdChk;
	}
	public String getAccountHold() {
		return accountHold;
	}
	public void setAccountHold(String accountHold) {
		this.accountHold = accountHold;
	}
	public byte[] getPtnrImage() {
		return ptnrImage;
	}
	public void setPtnrImage(byte[] ptnrImage) {
		this.ptnrImage = ptnrImage;
	}
	public List<CompanyRegisterItem> getShpList() {
		return shpList;
	}
	public void setShpList(List<CompanyRegisterItem> shpList) {
		this.shpList = shpList;
	}
	public String getValidCode() {
		return validCode;
	}
	public void setValidCode(String validCode) {
		this.validCode = validCode;
	}
	public String getOldPtnrCode() {
		return oldPtnrCode;
	}
	public void setOldPtnrCode(String oldPtnrCode) {
		this.oldPtnrCode = oldPtnrCode;
	}
	public String getPtnrType() {
		return ptnrType;
	}
	public void setPtnrType(String ptnrType) {
		this.ptnrType = ptnrType;
	}
	public String getCustomRefFwd() {
		return customRefFwd;
	}
	public void setCustomRefFwd(String customRefFwd) {
		this.customRefFwd = customRefFwd;
	}
	public String getCustomSFWD() {
		return customSFWD;
	}
	public void setCustomSFWD(String customSFWD) {
		this.customSFWD = customSFWD;
	}
	public String getCustomEFWD() {
		return customEFWD;
	}
	public void setCustomEFWD(String customEFWD) {
		this.customEFWD = customEFWD;
	}
	public String getCustomEdate() {
		return customEdate;
	}
	public void setCustomEdate(String customEdate) {
		this.customEdate = customEdate;
	}
	public String getCustomSdate() {
		return customSdate;
	}
	public void setCustomSdate(String customSdate) {
		this.customSdate = customSdate;
	}
	public String getCustomRef() {
		return customRef;
	}
	public void setCustomRef(String customRef) {
		this.customRef = customRef;
	}
	public String getCustomRefSha() {
		return customRefSha;
	}
	public void setCustomRefSha(String customRefSha) {
		this.customRefSha = customRefSha;
	}
	public String getAgencyCode() {
		return agencyCode;
	}
	public void setAgencyCode(String agencyCode) {
		this.agencyCode = agencyCode;
	}
	public String getTaxCd() {
		return taxCd;
	}
	public void setTaxCd(String taxCd) {
		this.taxCd = taxCd;
	}
	public String getEngLnm() {
		return engLnm;
	}
	public void setEngLnm(String engLnm) {
		this.engLnm = engLnm;
	}
	public String getRegNo() {
		return regNo;
	}
	public void setRegNo(String regNo) {
		this.regNo = regNo;
	}
	public String getRepresentative() {
		return representative;
	}
	public void setRepresentative(String representative) {
		this.representative = representative;
	}
	public String getZipCd() {
		return zipCd;
	}
	public void setZipCd(String zipCd) {
		this.zipCd = zipCd;
	}
	public String getCustCd() {
		return custCd;
	}
	public void setCustCd(String custCd) {
		this.custCd = custCd;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getFinanceGrp() {
		return financeGrp;
	}
	public void setFinanceGrp(String financeGrp) {
		this.financeGrp = financeGrp;
	}
	public String getCompanyStatus() {
		return companyStatus;
	}
	public void setCompanyStatus(String companyStatus) {
		this.companyStatus = companyStatus;
	}
	public String getProfileStatus() {
		return profileStatus;
	}
	public void setProfileStatus(String profileStatus) {
		this.profileStatus = profileStatus;
	}
	public String getPtnrCode() {
		return ptnrCode;
	}
	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}
	public String getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}
	public String getAccNo() {
		return accNo;
	}
	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}
	public String getPtnrLevel() {
		return ptnrLevel;
	}
	public void setPtnrLevel(String ptnrLevel) {
		this.ptnrLevel = ptnrLevel;
	}
	public String getFcontactDate() {
		return fcontactDate;
	}
	public void setFcontactDate(String fcontactDate) {
		this.fcontactDate = fcontactDate;
	}
	public String getTcontactDate() {
		return tcontactDate;
	}
	public void setTcontactDate(String tcontactDate) {
		this.tcontactDate = tcontactDate;
	}
	public String getShpNm() {
		return shpNm;
	}
	public void setShpNm(String shpNm) {
		this.shpNm = shpNm;
	}
	public String getShpCode() {
		return shpCode;
	}
	public void setShpCode(String shpCode) {
		this.shpCode = shpCode;
	}
	public String getCheckItem() {
		return checkItem;
	}
	public void setCheckItem(String checkItem) {
		this.checkItem = checkItem;
	}
	public String getCntUser() {
		return cntUser;
	}
	public void setCntUser(String cntUser) {
		this.cntUser = cntUser;
	}
	public List<CompanyRegisterItem> getAccNoList() {
		return accNoList;
	}
	public void setAccNoList(List<CompanyRegisterItem> accNoList) {
		this.accNoList = accNoList;
	}
	public String getPaymentTerm() {
		return paymentTerm;
	}
	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}
	public String getGstRefId() {
		return gstRefId;
	}
	public void setGstRefId(String gstRefId) {
		this.gstRefId = gstRefId;
	}
	public String getGstCommId() {
		return gstCommId;
	}
	public void setGstCommId(String gstCommId) {
		this.gstCommId = gstCommId;
	}
	public String getGstStatCd() {
		return gstStatCd;
	}
	public void setGstStatCd(String gstStatCd) {
		this.gstStatCd = gstStatCd;
	}
	public String getDepositLimit() {
		return depositLimit;
	}
	public void setDepositLimit(String depositLimit) {
		this.depositLimit = depositLimit;
	}
	
}