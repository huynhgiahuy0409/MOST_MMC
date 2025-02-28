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
package com.tsb.most.basebiz.parm.vms;
import java.util.ArrayList;
import java.util.List;

//import com.pcs.foundation.bizparm.Parm;
import com.tsb.most.framework.bizparm.BaseBizParm;

public class VesselParm extends BaseBizParm {
	
    /* 척수 현황 DataItem기준. */
    private String vesselCd;
    private String vesselName;
    private String imoNm;
    private String callSign;
    private String divVslknd;
    private String saleEvalWgCd;
    private String saleEvalWgName;
    private String fleetCd;
    private String voyageNo;
    private String latitude;
    private String longitude;
    private String heading;
    private String angle;
    private String speed;
    private String uptDt;
    private String status;
    private String divCbStep;
    private String ppli;
    private String amtSmFrt;
    private String amtSmPl;
    private String deptCd;
    private String deptNm;
    private String damDang;
    
	private String routeCode;
	private String vesselKind;
	
	private String category;
	private String marketIndex;
	
	private String vesselGroupCode;
	private String vesselGroupName;
	
	private String priorityId;
	private String vsequence;
	
	/* Continent Car Vessel DataItem */
	private String regionCode;
	
	/* Continent Car Vessel Schedule DataItem */
	private String vesselCode;
	
	private String customerAlias;
	private String customerCode;
	private String year;
	private String month;
	
	/*customerCode arrayList*/
	private List<String> customerCodes = new ArrayList<String>();
	
	private String[] custList;
	private String[] portCodes;
	
	
    public String getVesselCode() {
        return vesselCode;
    }

    public void setVesselCode(String vesselCode) {
        this.vesselCode = vesselCode;
    }


    public String getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(String regionCode) {
        this.regionCode = regionCode;
    }

    public String getVesselKind() {
        return vesselKind;
    }

    public void setVesselKind(String vesselKind) {
        this.vesselKind = vesselKind;
    }

    public String getRouteCode() {
		return routeCode;
	}
	
	public void setRouteCode(String routeCode) {
		this.routeCode = routeCode;
	}
	
	public String getVesselCd() {
		return vesselCd;
	}
	
	public void setVesselCd(String vesselCd) {
		this.vesselCd = vesselCd;
	}
	
	public String getVesselName() {
		return vesselName;
	}
	
	public void setVesselName(String vesselName) {
		this.vesselName = vesselName;
	}
	
	public String getImoNm() {
		return imoNm;
	}
	
	public void setImoNm(String imoNm) {
		this.imoNm = imoNm;
	}
	
	public String getCallSign() {
		return callSign;
	}
	
	public void setCallSign(String callSign) {
		this.callSign = callSign;
	}
	
	public String getDivVslknd() {
		return divVslknd;
	}
	public void setDivVslknd(String divVslknd) {
		this.divVslknd = divVslknd;
	}
	public String getSaleEvalWgCd() {
		return saleEvalWgCd;
	}
	
	public void setSaleEvalWgCd(String saleEvalWgCd) {
		this.saleEvalWgCd = saleEvalWgCd;
	}
	
	public String getSaleEvalWgName() {
		return saleEvalWgName;
	}
	
	public void setSaleEvalWgName(String saleEvalWgName) {
		this.saleEvalWgName = saleEvalWgName;
	}
	
	public String getFleetCd() {
		return fleetCd;
	}
	
	public void setFleetCd(String fleetCd) {
		this.fleetCd = fleetCd;
	}
	/**
	 * @return the angle
	 */
	public String getAngle() {
		return angle;
	}
	/**
	 * @param angle the angle to set
	 */
	public void setAngle(String angle) {
		this.angle = angle;
	}
	/**
	 * @return the speed
	 */
	public String getSpeed() {
		return speed;
	}
	/**
	 * @param speed the speed to set
	 */
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	/**
	 * @return the uptDt
	 */
	public String getUptDt() {
		return uptDt;
	}
	/**
	 * @param uptDt the uptDt to set
	 */
	public void setUptDt(String uptDt) {
		this.uptDt = uptDt;
	}
	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}
	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}
	/**
	 * @return the divCbStep
	 */
	public String getDivCbStep() {
		return divCbStep;
	}
	/**
	 * @param divCbStep the divCbStep to set
	 */
	public void setDivCbStep(String divCbStep) {
		this.divCbStep = divCbStep;
	}
	/**
	 * @return the ppli
	 */
	public String getPpli() {
		return ppli;
	}
	/**
	 * @param ppli the ppli to set
	 */
	public void setPpli(String ppli) {
		this.ppli = ppli;
	}
	/**
	 * @return the amtSmFrt
	 */
	public String getAmtSmFrt() {
		return amtSmFrt;
	}
	/**
	 * @param amtSmFrt the amtSmFrt to set
	 */
	public void setAmtSmFrt(String amtSmFrt) {
		this.amtSmFrt = amtSmFrt;
	}
	/**
	 * @return the amtSmPl
	 */
	public String getAmtSmPl() {
		return amtSmPl;
	}
	/**
	 * @param amtSmPl the amtSmPl to set
	 */
	public void setAmtSmPl(String amtSmPl) {
		this.amtSmPl = amtSmPl;
	}
	/**
	 * @return the deptCd
	 */
	public String getDeptCd() {
		return deptCd;
	}
	/**
	 * @param teamCd the teamCd to set
	 */
	public void setDeptCd(String deptCd) {
		this.deptCd = deptCd;
	}
	/**
	 * @return the deptNm
	 */
	public String getDeptNm() {
		return deptNm;
	}
	/**
	 * @param teamNm the deptNm to set
	 */
	public void setDeptNm(String deptNm) {
		this.deptNm = deptNm;
	}
	/**
	 * @return the damDang
	 */
	public String getDamDang() {
		return damDang;
	}
	/**
	 * @param damDang the damDang to set
	 */
	public void setDamDang(String damDang) {
		this.damDang = damDang;
	}

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getMarketIndex() {
		return marketIndex;
	}

	public void setMarketIndex(String marketIndex) {
		this.marketIndex = marketIndex;
	}

	public String getVesselGroupCode() {
		return vesselGroupCode;
	}

	public void setVesselGroupCode(String vesselGroupCode) {
		this.vesselGroupCode = vesselGroupCode;
	}

	public String getVesselGroupName() {
		return vesselGroupName;
	}

	public void setVesselGroupName(String vesselGroupName) {
		this.vesselGroupName = vesselGroupName;
	}

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getVoyageNo() {
        return voyageNo;
    }

    public void setVoyageNo(String voyageNo) {
        this.voyageNo = voyageNo;
    }

	public String getPriorityId() {
		return priorityId;
	}

	public void setPriorityId(String priorityId) {
		this.priorityId = priorityId;
	}

	public String getVsequence() {
		return vsequence;
	}

	public void setVsequence(String vsequence) {
		this.vsequence = vsequence;
	}

	public List<String> getCustomerCodes() {
		return customerCodes;
	}

	public void setCustomerCodes(List<String> customerCodes) {
		this.customerCodes = customerCodes;
	}

	public String[] getCustList() {
		return custList;
	}

	public void setCustList(String[] custList) {
		this.custList = custList;
	}

    public String getCustomerAlias() {
        return customerAlias;
    }

    public void setCustomerAlias(String customerAlias) {
        this.customerAlias = customerAlias;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String[] getPortCodes() {
        return portCodes;
    }

    public void setPortCodes(String[] portCodes) {
        this.portCodes = portCodes;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    
    
}
