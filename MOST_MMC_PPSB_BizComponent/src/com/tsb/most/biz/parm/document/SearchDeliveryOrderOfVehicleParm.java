package com.tsb.most.biz.parm.document;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchDeliveryOrderOfVehicleParm extends BaseBizParm {
    private String vslCallId;
    private String masterBlNo;
    private String blNo;
    private String doNo;
    private String tsptComp;
    private String nosOfVin;
    private String truckNo;
    private String driverNm;
    private String subDoNo;
    private String fwdCd;
    private String ptnrCd;
    private String ptnrTp;
    private String doSeq;
    private String estArrvTime;
    private String tsptr;
    private String driverId;
    private String tsptCompCd;
    
    public String getTsptCompCd() {
        return tsptCompCd;
    }
    public void setTsptCompCd(String tsptCompCd) {
        this.tsptCompCd = tsptCompCd;
    } 
    public String getDriverId() {
        return driverId;
    }
    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }
    
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
	public String getNosOfVin() {
		return nosOfVin;
	}
	public void setNosOfVin(String nosOfVin) {
		this.nosOfVin = nosOfVin;
	}
	public String getEstArrvTime() {
		return estArrvTime;
	}
	public void setEstArrvTime(String estArrvTime) {
		this.estArrvTime = estArrvTime;
	}
    
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
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
	public String getTsptComp() {
		return tsptComp;
	}
	public void setTsptComp(String tsptComp) {
		this.tsptComp = tsptComp;
	}
	public String getTruckNo() {
		return truckNo;
	}
	public void setTruckNo(String truckNo) {
		this.truckNo = truckNo;
	}
	public String getDriverNm() {
		return driverNm;
	}
	public void setDriverNm(String driverNm) {
		this.driverNm = driverNm;
	}
	public String getSubDoNo() {
		return subDoNo;
	}
	public void setSubDoNo(String subDoNo) {
		this.subDoNo = subDoNo;
	}
	public String getFwdCd() {
		return fwdCd;
	}
	public void setFwdCd(String fwdCd) {
		this.fwdCd = fwdCd;
	}
	
	public String getDoSeq() {
		return doSeq;
	}
	public void setDoSeq(String doSeq) {
		this.doSeq = doSeq;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getPtnrTp() {
		return ptnrTp;
	}
	public void setPtnrTp(String ptnrTp) {
		this.ptnrTp = ptnrTp;
	}

}
