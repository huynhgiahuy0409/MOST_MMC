package com.tsb.most.basebiz.dataitem.codes;

import javax.xml.bind.annotation.XmlRootElement;

import com.tsb.most.framework.dataitem.DataItem;

@XmlRootElement(name="data")
public class DangerousGoodsCodeItem extends DataItem {
	private String unno;
	private String unnoClass;
	private String substance;
	private String packingGrp;
	private String pageNo;
	private String psa;
	private String emsNo;
	private String subRiskLabel;
	private String flashPoint;
	private String mfag;
	private String marinePolu;
	private String specReq;
	private String specReqRmk;
	private String remark;
	private String lpk;
	private String fireCode;
	private String premiumCd;
	private String staffCd;
	private String updatedTime;
	private String imdgDiv;
	private String priCode;
	
	public String getUnno() {
		return unno;
	}
	public void setUnno(String unno) {
		this.unno = unno;
	}
	public String getPackingGrp() {
		return packingGrp;
	}
	public void setPackingGrp(String packingGrp) {
		this.packingGrp = packingGrp;
	}
	public String getPageNo() {
		return pageNo;
	}
	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}
	public String getPsa() {
		return psa;
	}
	public void setPsa(String psa) {
		this.psa = psa;
	}
	public String getEmsNo() {
		return emsNo;
	}
	public void setEmsNo(String emsNo) {
		this.emsNo = emsNo;
	}
	public String getSubRiskLabel() {
		return subRiskLabel;
	}
	public void setSubRiskLabel(String subRiskLabel) {
		this.subRiskLabel = subRiskLabel;
	}
	public String getFlashPoint() {
		return flashPoint;
	}
	public void setFlashPoint(String flashPoint) {
		this.flashPoint = flashPoint;
	}
	public String getMfag() {
		return mfag;
	}
	public void setMfag(String mfag) {
		this.mfag = mfag;
	}
	public String getMarinePolu() {
		return marinePolu;
	}
	public void setMarinePolu(String marinePolu) {
		this.marinePolu = marinePolu;
	}
	public String getSpecReq() {
		return specReq;
	}
	public void setSpecReq(String specReq) {
		this.specReq = specReq;
	}
	public String getSpecReqRmk() {
		return specReqRmk;
	}
	public void setSpecReqRmk(String specReqRmk) {
		this.specReqRmk = specReqRmk;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getLpk() {
		return lpk;
	}
	public void setLpk(String lpk) {
		this.lpk = lpk;
	}
	public String getFireCode() {
		return fireCode;
	}
	public void setFireCode(String fireCode) {
		this.fireCode = fireCode;
	}
	public String getPremiumCd() {
		return premiumCd;
	}
	public void setPremiumCd(String premiumCd) {
		this.premiumCd = premiumCd;
	}
	public String getStaffCd() {
		return staffCd;
	}
	public void setStaffCd(String staffCd) {
		this.staffCd = staffCd;
	}
	public String getImdgDiv() {
		return imdgDiv;
	}
	public void setImdgDiv(String imdgDiv) {
		this.imdgDiv = imdgDiv;
	}
	public String getPriCode() {
		return priCode;
	}
	public void setPriCode(String priCode) {
		this.priCode = priCode;
	}
	public String getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(String updatedTime) {
		this.updatedTime = updatedTime;
	}
	public String getUnnoClass() {
		return unnoClass;
	}
	public void setUnnoClass(String unnoClass) {
		this.unnoClass = unnoClass;
	}
	public String getSubstance() {
		return substance;
	}
	public void setSubstance(String substance) {
		this.substance = substance;
	}
}
