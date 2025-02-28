package com.tsb.most.biz.dataitem.document;

import com.tsb.most.framework.dataitem.DataItem;

public class DeliveryOrderOfVehicleItem extends DataItem {
    private String vslCallId;
    private String categoryCd;
    private String categoryNm;
    private String masterBlNo;
    private String blNo;
    private String doNo;
    private String nosOfVin;
    private String vinRemain;
    private String brandCd;
    private String brandNm;
    private String modelCd;
    private String modelNm;
    
    private String subDoNo;
    private String assignedVin;
    private String nosOfBookedDriver;
    private String nosOfBookedTruck;
    private String estArrvTime;
    
    private String shaCd;
    private String shaNm;
    private String fwdCd;
    private String fwdNm;
    private String shprCd;
    private String shprNm;
    private String cnsneCd;
    private String cnsneNm;
    private String remark;
    
    private String tsptCompCd;
    private String tsptCompNm;
    private String driverId;
    private String driverNm;
    private String driverExpLicenseDt;
    private String driverLicenseNo;
    private String truckId;
    private String truckNo;
    
    private String cd;
    private String cdNm;
    
    private String maxSubDoSeq;
    private String sdoSeq;
    
    private String doSeq;
    private String releasedQty;
    private String damNo;
    private String updUserId;
    private String ptnrCd;
    private String tsptr;
    private String vslCd;
    private String callSeq;
    private String callYear;
    
    public String getVslCd() {
        return vslCd;
    }
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    
    public String getCallYear() {
        return callYear;
    }
    public void setCallYear(String callYear) {
        this.callYear = callYear;
    }
    
    public String getCallSeq() {
        return callSeq;
    }
    public void setCallSeq(String callSeq) {
        this.callSeq = callSeq;
    }
    
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    } 
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCategoryCd() {
		return categoryCd;
	}
	public void setCategoryCd(String categoryCd) {
		this.categoryCd = categoryCd;
	}
	public String getCategoryNm() {
		return categoryNm;
	}
	public void setCategoryNm(String categoryNm) {
		this.categoryNm = categoryNm;
	}
	public String getMasterBlNo() {
		return masterBlNo;
	}
	public void setMasterBlNo(String masterBlNo) {
		this.masterBlNo = masterBlNo;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getDoNo() {
		return doNo;
	}
	public void setDoNo(String doNo) {
		this.doNo = doNo;
	}
	public String getNosOfVin() {
		return nosOfVin;
	}
	public void setNosOfVin(String nosOfVin) {
		this.nosOfVin = nosOfVin;
	}
	public String getVinRemain() {
		return vinRemain;
	}
	public void setVinRemain(String vinRemain) {
		this.vinRemain = vinRemain;
	}
	public String getBrandCd() {
		return brandCd;
	}
	public void setBrandCd(String brandCd) {
		this.brandCd = brandCd;
	}
	public String getBrandNm() {
		return brandNm;
	}
	public void setBrandNm(String brandNm) {
		this.brandNm = brandNm;
	}
	public String getModelCd() {
		return modelCd;
	}
	public void setModelCd(String modelCd) {
		this.modelCd = modelCd;
	}
	public String getModelNm() {
		return modelNm;
	}
	public void setModelNm(String modelNm) {
		this.modelNm = modelNm;
	}
	public String getSubDoNo() {
		return subDoNo;
	}
	public void setSubDoNo(String subDoNo) {
		this.subDoNo = subDoNo;
	}
	public String getAssignedVin() {
		return assignedVin;
	}
	public void setAssignedVin(String assignedVin) {
		this.assignedVin = assignedVin;
	}
	public String getNosOfBookedDriver() {
		return nosOfBookedDriver;
	}
	public void setNosOfBookedDriver(String nosOfBookedDriver) {
		this.nosOfBookedDriver = nosOfBookedDriver;
	}
	public String getNosOfBookedTruck() {
		return nosOfBookedTruck;
	}
	public void setNosOfBookedTruck(String nosOfBookedTruck) {
		this.nosOfBookedTruck = nosOfBookedTruck;
	}
	public String getEstArrvTime() {
		return estArrvTime;
	}
	public void setEstArrvTime(String estArrvTime) {
		this.estArrvTime = estArrvTime;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String saNm) {
		this.shaNm = saNm;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	public String getFwdNm() {
		return fwdNm;
	}
	public void setFwdNm(String fwdNm) {
		this.fwdNm = fwdNm;
	}
	public String getShprCd() {
		return shprCd;
	}
	public void setShprCd(String shprCd) {
		this.shprCd = shprCd;
	}
	public String getShprNm() {
		return shprNm;
	}
	public void setShprNm(String shprNm) {
		this.shprNm = shprNm;
	}
	public String getCnsneCd() {
		return cnsneCd;
	}
	public void setCnsneCd(String cnsneCd) {
		this.cnsneCd = cnsneCd;
	}
	public String getCnsneNm() {
		return cnsneNm;
	}
	public void setCnsneNm(String cnsneNm) {
		this.cnsneNm = cnsneNm;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getTsptCompCd() {
		return tsptCompCd;
	}
	public void setTsptCompCd(String tsptCompCd) {
		this.tsptCompCd = tsptCompCd;
	}
	public String getTsptCompNm() {
		return tsptCompNm;
	}
	public void setTsptCompNm(String tsptCompNm) {
		this.tsptCompNm = tsptCompNm;
	}
	public String getDriverId() {
		return driverId;
	}
	public void setDriverId(String driverId) {
		this.driverId = driverId;
	}
	public String getDriverNm() {
		return driverNm;
	}
	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	public String getDriverExpLicenseDt() {
		return driverExpLicenseDt;
	}
	public void setDriverExpLicenseDt(String driverExpLicenseDt) {
		this.driverExpLicenseDt = driverExpLicenseDt;
	}
	public String getTruckId() {
		return truckId;
	}
	public void setTruckId(String truckId) {
		this.truckId = truckId;
	}
	public String getTruckNo() {
		return truckNo;
	}
	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getCdNm() {
		return cdNm;
	}
	public void setCdNm(String cdNm) {
		this.cdNm = cdNm;
	}
	public String getMaxSubDoSeq() {
		return maxSubDoSeq;
	}
	public void setMaxSubDoSeq(String maxSubDoSeq) {
		this.maxSubDoSeq = maxSubDoSeq;
	}
	public String getSdoSeq() {
		return sdoSeq;
	}
	public void setSdoSeq(String sdoSeq) {
		this.sdoSeq = sdoSeq;
	}
	public String getDriverLicenseNo() {
		return driverLicenseNo;
	}
	public void setDriverLicenseNo(String driverLicenseNo) {
		this.driverLicenseNo = driverLicenseNo;
	}
	public String getDoSeq() {
		return doSeq;
	}
	public void setDoSeq(String doSeq) {
		this.doSeq = doSeq;
	}
	public String getReleasedQty() {
		return releasedQty;
	}
	public void setReleasedQty(String releasedQty) {
		this.releasedQty = releasedQty;
	}
	public String getDamNo() {
		return damNo;
	}
	public void setDamNo(String damNo) {
		this.damNo = damNo;
	}
	public String getUpdUserId() {
		return updUserId;
	}
	public void setUpdUserId(String updUserId) {
		this.updUserId = updUserId;
	}

}

