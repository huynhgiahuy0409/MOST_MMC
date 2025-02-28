package com.tsb.most.basebiz.parm.administrator;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchCompanyRegisterParm extends BaseBizParm{

	private String companyCode;
	private String oldPtnrCode;
	private String ptnrType;
	private String ptnrCode;
	private String engSnm;

	private String checkMember;
	private String regTimeFrom;
	private String reqType;
	private String accNo;
	private String balRangeFrom;
	private String balRangeTo;

	public String getAccNo() {
		return accNo;
	}

	public void setAccNo(String accNo) {
		this.accNo = accNo;
	}

	private String searchType; //ROLE:staff role

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
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

	public String getPtnrCode() {
		return ptnrCode;
	}

	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}

	public String getEngSnm() {
		return engSnm;
	}

	public void setEngSnm(String engSnm) {
		this.engSnm = engSnm;
	}

	public String getCheckMember() {
		return checkMember;
	}

	public void setCheckMember(String checkMember) {
		this.checkMember = checkMember;
	}

	public String getRegTimeFrom() {
		return regTimeFrom;
	}

	public void setRegTimeFrom(String regTimeFrom) {
		this.regTimeFrom = regTimeFrom;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getReqType() {
		return reqType;
	}

	public void setReqType(String reqType) {
		this.reqType = reqType;
	}

	public String getBalRangeFrom() {
		return balRangeFrom;
	}

	public void setBalRangeFrom(String balRangeFrom) {
		this.balRangeFrom = balRangeFrom;
	}

	public String getBalRangeTo() {
		return balRangeTo;
	}

	public void setBalRangeTo(String balRangeTo) {
		this.balRangeTo = balRangeTo;
	} 
	
}
