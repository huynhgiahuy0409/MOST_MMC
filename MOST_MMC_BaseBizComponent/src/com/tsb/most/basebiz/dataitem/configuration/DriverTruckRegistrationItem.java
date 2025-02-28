/**
* RegisterationLorryDriverParm.java
*
* Created on   : 2008-01-15
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.1 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2008-01-15   Miss Nam-Sook Chang  1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.basebiz.dataitem.configuration;

import java.util.Date;

import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author cnsook
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class DriverTruckRegistrationItem extends DataItem {
    private String ptnrCd;
    private String ptnrNm;
    private int seq;
    private String divCd;
    private String lorryId;//Truck
    private String lorryNo;//Truck
    private String driverId;
    private String driverNm;
    private String licsNo;
    private Date licsExprYmd;
    private String nat;
    private String tareWgt;//Truck
    private Date meaDt;//Truck
    private int no;
    private String userId;
    
    private String cntryCd;//Truck
    private String rfIdNo;//Truck
    private String remark;
    private String useYn;
    private String category;
    
    private String convertStrLicsExprYmd;
    private String convertStrMeaDt;
    
    private String plateNo;
    private String allowWgt;
    private Date measureDt;
    private String vldYn;
    
    private String verifyYn;
    private String towedWgt;
    
    public String getConvertStrMeaDt() {
		return convertStrMeaDt;
	}
	public void setConvertStrMeaDt(String convertStrMeaDt) {
		this.convertStrMeaDt = convertStrMeaDt;
	}
	public String getConvertStrLicsExprYmd() {
		return convertStrLicsExprYmd;
	}
	public void setConvertStrLicsExprYmd(String convertStrLicsExprYmd) {
		this.convertStrLicsExprYmd = convertStrLicsExprYmd;
	}
	public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public int getNo() {
        return no;
    }
    public void setNo(int no) {
        this.no = no;
    }
    public String getDivCd() {
        return divCd;
    }
    public void setDivCd(String divCd) {
        this.divCd = divCd;
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
    
	public Date getLicsExprYmd() {
		return licsExprYmd;
	}
	public void setLicsExprYmd(Date licsExprYmd) {
		this.licsExprYmd = licsExprYmd;
	}
	public String getLicsNo() {
        return licsNo;
    }
    public void setLicsNo(String licsNo) {
        this.licsNo = licsNo;
    }
    public String getLorryId() {
        return lorryId;
    }
    public void setLorryId(String lorryId) {
        this.lorryId = lorryId;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getNat() {
        return nat;
    }
    public void setNat(String nat) {
        this.nat = nat;
    }
    public String getPtnrCd() {
        return ptnrCd;
    }
    public void setPtnrCd(String ptnrCd) {
        this.ptnrCd = ptnrCd;
    }
    public int getSeq() {
        return seq;
    }
    public void setSeq(int seq) {
        this.seq = seq;
    }
    public Date getMeaDt() {
		return meaDt;
	}
	public void setMeaDt(Date meaDt) {
		this.meaDt = meaDt;
	}
	public String getTareWgt() {
		return tareWgt;
	}
	public void setTareWgt(String tareWgt) {
		this.tareWgt = tareWgt;
	}
	public String getCntryCd() {
		return cntryCd;
	}
	public void setCntryCd(String cntryCd) {
		this.cntryCd = cntryCd;
	}
	public String getRfIdNo() {
		return rfIdNo;
	}
	public void setRfIdNo(String rfIdNo) {
		this.rfIdNo = rfIdNo;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getPtnrNm() {
		return ptnrNm;
	}
	public void setPtnrNm(String ptnrNm) {
		this.ptnrNm = ptnrNm;
	}
	public String getPlateNo() {
		return plateNo;
	}
	public void setPlateNo(String plateNo) {
		this.plateNo = plateNo;
	}
	public String getAllowWgt() {
		return allowWgt;
	}
	public void setAllowWgt(String allowWgt) {
		this.allowWgt = allowWgt;
	}
	public Date getMeasureDt() {
		return measureDt;
	}
	public void setMeasureDt(Date measureDt) {
		this.measureDt = measureDt;
	}
	public String getVldYn() {
		return vldYn;
	}
	public void setVldYn(String vldYn) {
		this.vldYn = vldYn;
	}
	public String getVerifyYn() {
		return verifyYn;
	}
	public void setVerifyYn(String verifyYn) {
		this.verifyYn = verifyYn;
	}
	public String getTowedWgt() {
		return towedWgt;
	}
	public void setTowedWgt(String towedWgt) {
		this.towedWgt = towedWgt;
	}
}
