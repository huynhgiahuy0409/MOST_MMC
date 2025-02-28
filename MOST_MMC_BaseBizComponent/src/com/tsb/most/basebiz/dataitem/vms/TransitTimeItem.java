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
package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class TransitTimeItem extends DataItem {
    private static final long serialVersionUID = 6879313538039745171L;
    
    private String vesselCode;
	private String vesselName;
	private String voyageNo;
	private String loa;
	private String width;
	private String draft;
	private String speedLaden;
	private String buildYear;
	private String speedBallast;
	private String dwt;
	private String grt;
	private String flag;
	private String flagName;
	private String imoNo;
	private String callSign;
	private String vesselKind;
	private String vesselStatus;
	private String routeCode;
	private String teamCode;
	private String teamName;
	private String latitude;
	private String longitude;
	private String heading;
	private String speed;
	private String continent;
	private String customerCode;
	private String customerName;
	private String pod;
	private String podName;
	private String pol;
	private String polName;
	private String pvy;
	private String pvyName;
	private String unit;
	private String onBoard;
	private String eta;
	private String transitTime;
	private String contractedtTime;
    private float diff ;
    private int quantity ;
    
    
	public String getVoyageNo() {
		return voyageNo;
	}
	public void setVoyageNo(String voyageNo) {
		this.voyageNo = voyageNo;
	}
	public String getLoa() {
		return loa;
	}
	public void setLoa(String loa) {
		this.loa = loa;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getDraft() {
		return draft;
	}
	public void setDraft(String draft) {
		this.draft = draft;
	}
	public String getSpeedLaden() {
		return speedLaden;
	}
	public void setSpeedLaden(String speedLaden) {
		this.speedLaden = speedLaden;
	}
	public String getBuildYear() {
		return buildYear;
	}
	public void setBuildYear(String buildYear) {
		this.buildYear = buildYear;
	}
	public String getSpeedBallast() {
		return speedBallast;
	}
	public void setSpeedBallast(String speedBallast) {
		this.speedBallast = speedBallast;
	}
	public String getDwt() {
		return dwt;
	}
	public void setDwt(String dwt) {
		this.dwt = dwt;
	}
	public String getGrt() {
		return grt;
	}
	public void setGrt(String grt) {
		this.grt = grt;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getFlagName() {
		return flagName;
	}
	public void setFlagName(String flagName) {
		this.flagName = flagName;
	}
	public String getImoNo() {
		return imoNo;
	}
	public void setImoNo(String imoNo) {
		this.imoNo = imoNo;
	}
	public String getCallSign() {
		return callSign;
	}
	public void setCallSign(String callSign) {
		this.callSign = callSign;
	}
	public String getVesselKind() {
		return vesselKind;
	}
	public void setVesselKind(String vesselKind) {
		this.vesselKind = vesselKind;
	}
	public String getVesselStatus() {
		return vesselStatus;
	}
	public void setVesselStatus(String vesselStatus) {
		this.vesselStatus = vesselStatus;
	}
	public String getRouteCode() {
		return routeCode;
	}
	public void setRouteCode(String routeCode) {
		this.routeCode = routeCode;
	}
	public String getTeamCode() {
		return teamCode;
	}
	public void setTeamCode(String teamCode) {
		this.teamCode = teamCode;
	}
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getHeading() {
		return heading;
	}
	public void setHeading(String heading) {
		this.heading = heading;
	}
	public String getSpeed() {
		return speed;
	}
	public void setSpeed(String speed) {
		this.speed = speed;
	}
	public String getContinent() {
		return continent;
	}
	public void setContinent(String continent) {
		this.continent = continent;
	}
	public String getCustomerCode() {
		return customerCode;
	}
	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getPod() {
		return pod;
	}
	public void setPod(String pod) {
		this.pod = pod;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getPvy() {
		return pvy;
	}
	public void setPvy(String pvy) {
		this.pvy = pvy;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getOnBoard() {
		return onBoard;
	}
	public void setOnBoard(String onBoard) {
		this.onBoard = onBoard;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getTransitTime() {
		return transitTime;
	}
	public void setTransitTime(String transitTime) {
		this.transitTime = transitTime;
	}
	public String getContractedtTime() {
		return contractedtTime;
	}
	public void setContractedtTime(String contractedtTime) {
		this.contractedtTime = contractedtTime;
	}
	public float getDiff() {
		return diff;
	}
	public void setDiff(float diff) {
		this.diff = diff;
	}
	public String getVesselCode() {
		return vesselCode;
	}
	public void setVesselCode(String vesselCode) {
		this.vesselCode = vesselCode;
	}
	public String getVesselName() {
		return vesselName;
	}
	public void setVesselName(String vesselName) {
		this.vesselName = vesselName;
	}
    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public String getPodName() {
        return podName;
    }
    public void setPodName(String podName) {
        this.podName = podName;
    }
    public String getPolName() {
        return polName;
    }
    public void setPolName(String polName) {
        this.polName = polName;
    }
    public String getPvyName() {
        return pvyName;
    }
    public void setPvyName(String pvyName) {
        this.pvyName = pvyName;
    }


}
