package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchVesselParticularParm extends BaseBizParm{
	private String vslNm;
	private String shipOffNo;
	private String imoNo;
	private String sdt;
	private String callSign;
	private String edt;
	private String confCk;
	private String ptnrCode;
	private String peopleDiv;
	private String vslCd;
	private String jct;
	private String status;
	private String agencyCode;
	private String saCorpId;
	
	public String getJct() {
		return jct;
	}
	public String getCallSign() {
		return callSign;
	}
	public void setCallSign(String callSign) {
		this.callSign = callSign;
	}
	public void setJct(String jct) {
		this.jct = jct;
	}
	public String getVslCd() {
		return vslCd;
	}
	public void setVslCd(String vslCd) {
		this.vslCd = vslCd;
	}
	public String getPeopleDiv() {
		return peopleDiv;
	}
	public void setPeopleDiv(String peopleDiv) {
		this.peopleDiv = peopleDiv;
	}
	public String getPtnrCode() {
		return ptnrCode;
	}
	public void setPtnrCode(String ptnrCode) {
		this.ptnrCode = ptnrCode;
	}
	public String getVslNm() {
		return vslNm;
	}
	public String getShipOffNo() {
		return shipOffNo;
	}
	public String getImoNo() {
		return imoNo;
	}
	public String getSdt() {
		return sdt;
	}
	public String getEdt() {
		return edt;
	}
	public String getConfCk() {
		return confCk;
	}
	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}
	public void setShipOffNo(String shipOffNo) {
		this.shipOffNo = shipOffNo;
	}
	public void setImoNo(String imoNo) {
		this.imoNo = imoNo;
	}
	public void setSdt(String sdt) {
		this.sdt = sdt;
	}
	public void setEdt(String edt) {
		this.edt = edt;
	}
	public void setConfCk(String confCk) {
		this.confCk = confCk;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAgencyCode() {
		return agencyCode;
	}
	public void setAgencyCode(String agencyCode) {
		this.agencyCode = agencyCode;
	}
	public String getSaCorpId() {
		return saCorpId;
	}
	public void setSaCorpId(String saCorpId) {
		this.saCorpId = saCorpId;
	}
}
