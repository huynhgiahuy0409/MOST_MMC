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
import java.util.Date;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class VesselItem extends DataItem {
	
	private String vesselGroupCode;
	private String vesselGroupName;
	private String buildYear;
	private String flag;
	private String flagName;
	private float dwt;
	private float grt;
	private String loa;
	private String width;
	private String draft;
	private String voyageNo;
	private String imoNo;
	private String callSign;
	private String vesselKind;
	private String vesselType;
	private String vesselTypeName;
	private String latitude;
	private String longitude;
	private String heading;
	private String speed;
	private String speedLaden;
	private String speedBallast;
	private float speedContract;
	private String vesselStatus;
	
    private String vesselStatusName;
	private String teamCode;
	private String teamName;
	private String operatorId;
	private String operatorName;
	
	//For Car
	private String routeCode;
	private String continentName;
	
	//For Bulk
	private double initialUnit;
	private double lastUnit;
	private double initialSalesAmount;
	private double lastSalesAmount;
	private double initialProfitLoss;
	private double lastProfiltLoss;
	private double profitLossGap;
	private String signal;
	private String distance;
	private Date arrivalTime;
	private Date departureTime;
	private Date eta;
	private Date etb;
	private Date etd;
	
	private String progress;
	
	// Bulk SignalLamp List
	private String signalLampOne;
	private String signalLampTwo;
	private String signalLampThree;
	
	// Continent Car Vessel List
	private String regionCode;
	private String regionName;
	private String regionCount;
	
	// Continent Car Vessel Detail List
	private String vesselCode;
	private String vesselName;
	
	// continent Car Vessel Schedule List
	private String vesselArrivalPortName;
	private Date vesselArrivalTime;
	private Date vesselBerthTime;
	private Date vesselDepartureTime;
	private float vesselSeaday;
	private float vesselPortday;
	
	//Vessel Master Info.
	private String fleet;
	private String status;	
	private float colCons;
	private float qtyCbIni;	
    private float revenueCbIni;
    private float plCbIni;
    private float qtyCbCur;
    private float revenueCbCur;
    private float plCbCur;
    private float contractSpeed;
    private float contractCons;
    
    //Vessel Operation List
    private String cargoCode;
    private String cargoName;
    private int qty;
    private String companyName;
    private String hire;
    private String netHire;
    private String initialPl;
    private String progressPl;
    private String initialCb;
    private String progressCb;
    private String vsColor;
    private String portLdg;
    private String portLdgName;
    private String ataDtmPo;
    private String atbDtmPo;
    private String atdDtmPo;
    private String ataDtmLl;
    private String atbDtmLl;
    private String atdDtmLl;
    private String ataDtmDd;
    private String atbDtmDd;
    private String atdDtmDd;
    private String portDischarging;
    private String portDischargingName;
    private String deptCode;
    private String rmkCb;
    private String vesselSizeCode;
    private String vesselSizeName;
    private String salesId;
    private String picName;
       
    //Vessel Detail Information
    private String statusName;
    private String speedCal;
    private String tag;
    
    private float speedPerf;
    private int vesselDelayDay;
    private String speedStatus;

    private String statusTag;
    private String portCode;
    private String portName;
    private String cargoQuantity;
    private Date statusTagTime;
    
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
	public String getBuildYear() {
		return buildYear;
	}
	public void setBuildYear(String buildYear) {
		this.buildYear = buildYear;
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
	public String getVoyageNo() {
		return voyageNo;
	}
	public void setVoyageNo(String voyageNo) {
		this.voyageNo = voyageNo;
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
	public String getVesselType() {
		return vesselType;
	}
	public void setVesselType(String vesselType) {
		this.vesselType = vesselType;
	}
	public String getVesselTypeName() {
		return vesselTypeName;
	}
	public void setVesselTypeName(String vesselTypeName) {
		this.vesselTypeName = vesselTypeName;
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
	public String getSpeedLaden() {
		return speedLaden;
	}
	public void setSpeedLaden(String speedLaden) {
		this.speedLaden = speedLaden;
	}
	public String getSpeedBallast() {
		return speedBallast;
	}
	public void setSpeedBallast(String speedBallast) {
		this.speedBallast = speedBallast;
	}
	public String getVesselStatus() {
		return vesselStatus;
	}
	public void setVesselStatus(String vesselStatus) {
		this.vesselStatus = vesselStatus;
	}
	public String getVesselStatusName() {
		return vesselStatusName;
	}
	public void setVesselStatusName(String vesselStatusName) {
		this.vesselStatusName = vesselStatusName;
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
	public String getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}
	public String getOperatorName() {
		return operatorName;
	}
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	public String getRouteCode() {
		return routeCode;
	}
	public void setRouteCode(String routeCode) {
		this.routeCode = routeCode;
	}
	public String getContinentName() {
		return continentName;
	}
	public void setContinentName(String continentName) {
		this.continentName = continentName;
	}
	public double getInitialUnit() {
		return initialUnit;
	}
	public void setInitialUnit(double initialUnit) {
		this.initialUnit = initialUnit;
	}
	public double getLastUnit() {
		return lastUnit;
	}
	public void setLastUnit(double lastUnit) {
		this.lastUnit = lastUnit;
	}
	public double getInitialSalesAmount() {
		return initialSalesAmount;
	}
	public void setInitialSalesAmount(double initialSalesAmount) {
		this.initialSalesAmount = initialSalesAmount;
	}
	public double getLastSalesAmount() {
		return lastSalesAmount;
	}
	public void setLastSalesAmount(double lastSalesAmount) {
		this.lastSalesAmount = lastSalesAmount;
	}
	public double getInitialProfitLoss() {
		return initialProfitLoss;
	}
	public void setInitialProfitLoss(double initialProfitLoss) {
		this.initialProfitLoss = initialProfitLoss;
	}
	public double getLastProfiltLoss() {
		return lastProfiltLoss;
	}
	public void setLastProfiltLoss(double lastProfiltLoss) {
		this.lastProfiltLoss = lastProfiltLoss;
	}
	public double getProfitLossGap() {
		return profitLossGap;
	}
	public void setProfitLossGap(double profitLossGap) {
		this.profitLossGap = profitLossGap;
	}
	public String getSignal() {
		return signal;
	}
	public void setSignal(String signal) {
		this.signal = signal;
	}
	public String getDistance() {
		return distance;
	}
	public void setDistance(String distance) {
		this.distance = distance;
	}
	public Date getArrivalTime() {
		return arrivalTime;
	}
	public void setArrivalTime(Date arrivalTime) {
		this.arrivalTime = arrivalTime;
	}
	public Date getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(Date departureTime) {
		this.departureTime = departureTime;
	}
	public String getProgress() {
		return progress;
	}
	public void setProgress(String progress) {
		this.progress = progress;
	}
	public String getSignalLampOne() {
		return signalLampOne;
	}
	public void setSignalLampOne(String signalLampOne) {
		this.signalLampOne = signalLampOne;
	}
	public String getSignalLampTwo() {
		return signalLampTwo;
	}
	public void setSignalLampTwo(String signalLampTwo) {
		this.signalLampTwo = signalLampTwo;
	}
	public String getSignalLampThree() {
		return signalLampThree;
	}
	public void setSignalLampThree(String signalLampThree) {
		this.signalLampThree = signalLampThree;
	}
	public String getRegionCode() {
		return regionCode;
	}
	public void setRegionCode(String regionCode) {
		this.regionCode = regionCode;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getRegionCount() {
		return regionCount;
	}
	public void setRegionCount(String regionCount) {
		this.regionCount = regionCount;
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
	public String getVesselArrivalPortName() {
		return vesselArrivalPortName;
	}
	public void setVesselArrivalPortName(String vesselArrivalPortName) {
		this.vesselArrivalPortName = vesselArrivalPortName;
	}
	public String getFleet() {
		return fleet;
	}
	public void setFleet(String fleet) {
		this.fleet = fleet;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public float getColCons() {
		return colCons;
	}
	public void setColCons(float colCons) {
		this.colCons = colCons;
	}
	public float getQtyCbIni() {
		return qtyCbIni;
	}
	public void setQtyCbIni(float qtyCbIni) {
		this.qtyCbIni = qtyCbIni;
	}
	public float getRevenueCbIni() {
		return revenueCbIni;
	}
	public void setRevenueCbIni(float revenueCbIni) {
		this.revenueCbIni = revenueCbIni;
	}
	public float getPlCbIni() {
		return plCbIni;
	}
	public void setPlCbIni(float plCbIni) {
		this.plCbIni = plCbIni;
	}
	public float getQtyCbCur() {
		return qtyCbCur;
	}
	public void setQtyCbCur(float qtyCbCur) {
		this.qtyCbCur = qtyCbCur;
	}
	public float getRevenueCbCur() {
		return revenueCbCur;
	}
	public void setRevenueCbCur(float revenueCbCur) {
		this.revenueCbCur = revenueCbCur;
	}
	public float getPlCbCur() {
		return plCbCur;
	}
	public void setPlCbCur(float plCbCur) {
		this.plCbCur = plCbCur;
	}
	public float getContractSpeed() {
		return contractSpeed;
	}
	public void setContractSpeed(float contractSpeed) {
		this.contractSpeed = contractSpeed;
	}
	public float getContractCons() {
		return contractCons;
	}
	public void setContractCons(float contractCons) {
		this.contractCons = contractCons;
	}
    public Date getVesselArrivalTime() {
        return vesselArrivalTime;
    }
    public void setVesselArrivalTime(Date vesselArrivalTime) {
        this.vesselArrivalTime = vesselArrivalTime;
    }
    public Date getVesselBerthTime() {
        return vesselBerthTime;
    }
    public void setVesselBerthTime(Date vesselBerthTime) {
        this.vesselBerthTime = vesselBerthTime;
    }
    public Date getVesselDepartureTime() {
        return vesselDepartureTime;
    }
    public void setVesselDepartureTime(Date vesselDepartureTime) {
        this.vesselDepartureTime = vesselDepartureTime;
    }
    public float getVesselSeaday() {
        return vesselSeaday;
    }
    public void setVesselSeaday(float vesselSeaday) {
        this.vesselSeaday = vesselSeaday;
    }
    public float getVesselPortday() {
        return vesselPortday;
    }
    public void setVesselPortday(float vesselPortday) {
        this.vesselPortday = vesselPortday;
    }
    public String getCargoCode() {
        return cargoCode;
    }
    public void setCargoCode(String cargoCode) {
        this.cargoCode = cargoCode;
    }
    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getHire() {
        return hire;
    }
    public void setHire(String hire) {
        this.hire = hire;
    }
    public String getNetHire() {
        return netHire;
    }
    public void setNetHire(String netHire) {
        this.netHire = netHire;
    }
    public String getInitialPl() {
        return initialPl;
    }
    public void setInitialPl(String initialPl) {
        this.initialPl = initialPl;
    }
    public String getProgressPl() {
        return progressPl;
    }
    public void setProgressPl(String progressPl) {
        this.progressPl = progressPl;
    }
    public String getInitialCb() {
        return initialCb;
    }
    public void setInitialCb(String initialCb) {
        this.initialCb = initialCb;
    }
    public String getProgressCb() {
        return progressCb;
    }
    public void setProgressCb(String progressCb) {
        this.progressCb = progressCb;
    }
    public String getPortLdg() {
        return portLdg;
    }
    public void setPortLdg(String portLdg) {
        this.portLdg = portLdg;
    }
    public String getAtaDtmPo() {
        return ataDtmPo;
    }
    public void setAtaDtmPo(String ataDtmPo) {
        this.ataDtmPo = ataDtmPo;
    }
    public String getAtbDtmPo() {
        return atbDtmPo;
    }
    public void setAtbDtmPo(String atbDtmPo) {
        this.atbDtmPo = atbDtmPo;
    }
    public String getAtdDtmPo() {
        return atdDtmPo;
    }
    public void setAtdDtmPo(String atdDtmPo) {
        this.atdDtmPo = atdDtmPo;
    }
    public String getPortDischarging() {
        return portDischarging;
    }
    public void setPortDischarging(String portDischarging) {
        this.portDischarging = portDischarging;
    }
    public String getPortDischargingName() {
        return portDischargingName;
    }
    public void setPortDischargingName(String portDischargingName) {
        this.portDischargingName = portDischargingName;
    }
    public String getDeptCode() {
        return deptCode;
    }
    public void setDeptCode(String deptCode) {
        this.deptCode = deptCode;
    }
    public String getRmkCb() {
        return rmkCb;
    }
    public void setRmkCb(String rmkCb) {
        this.rmkCb = rmkCb;
    }
    public String getVesselSizeCode() {
        return vesselSizeCode;
    }
    public void setVesselSizeCode(String vesselSizeCode) {
        this.vesselSizeCode = vesselSizeCode;
    }
    public String getVesselSizeName() {
        return vesselSizeName;
    }
    public void setVesselSizeName(String vesselSizeName) {
        this.vesselSizeName = vesselSizeName;
    }
    public String getSalesId() {
        return salesId;
    }
    public void setSalesId(String salesId) {
        this.salesId = salesId;
    }
    public String getPicName() {
        return picName;
    }
    public void setPicName(String picName) {
        this.picName = picName;
    }
    public String getCargoName() {
        return cargoName;
    }
    public void setCargoName(String cargoName) {
        this.cargoName = cargoName;
    }
    public String getVsColor() {
        return vsColor;
    }
    public void setVsColor(String vsColor) {
        this.vsColor = vsColor;
    }
    public String getPortLdgName() {
        return portLdgName;
    }
    public void setPortLdgName(String portLdgName) {
        this.portLdgName = portLdgName;
    }
    public String getAtaDtmLl() {
        return ataDtmLl;
    }
    public void setAtaDtmLl(String ataDtmLl) {
        this.ataDtmLl = ataDtmLl;
    }
    public String getAtbDtmLl() {
        return atbDtmLl;
    }
    public void setAtbDtmLl(String atbDtmLl) {
        this.atbDtmLl = atbDtmLl;
    }
    public String getAtdDtmLl() {
        return atdDtmLl;
    }
    public void setAtdDtmLl(String atdDtmLl) {
        this.atdDtmLl = atdDtmLl;
    }
    public String getAtaDtmDd() {
        return ataDtmDd;
    }
    public void setAtaDtmDd(String ataDtmDd) {
        this.ataDtmDd = ataDtmDd;
    }
    public String getAtbDtmDd() {
        return atbDtmDd;
    }
    public void setAtbDtmDd(String atbDtmDd) {
        this.atbDtmDd = atbDtmDd;
    }
    public String getAtdDtmDd() {
        return atdDtmDd;
    }
    public void setAtdDtmDd(String atdDtmDd) {
        this.atdDtmDd = atdDtmDd;
    }
   
    public int getQty() {
        return qty;
    }
    public void setQty(int qty) {
        this.qty = qty;
    }
    public String getStatusName() {
        return statusName;
    }
    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }
    public String getSpeedCal() {
        return speedCal;
    }
    public void setSpeedCal(String speedCal) {
        this.speedCal = speedCal;
    }
    public String getTag() {
        return tag;
    }
    public void setTag(String tag) {
        this.tag = tag;
    }
   
    public String getSpeedStatus() {
        return speedStatus;
    }
    public void setSpeedStatus(String speedStatus) {
        this.speedStatus = speedStatus;
    }
    public float getSpeedContract() {
        return speedContract;
    }
    public void setSpeedContract(float speedContract) {
        this.speedContract = speedContract;
    }
    public float getSpeedPerf() {
        return speedPerf;
    }
    public void setSpeedPerf(float speedPerf) {
        this.speedPerf = speedPerf;
    }
    public int getVesselDelayDay() {
        return vesselDelayDay;
    }
    public void setVesselDelayDay(int vesselDelayDay) {
        this.vesselDelayDay = vesselDelayDay;
    }
    public Date getEta() {
        return eta;
    }
    public void setEta(Date eta) {
        this.eta = eta;
    }
    public Date getEtb() {
        return etb;
    }
    public void setEtb(Date etb) {
        this.etb = etb;
    }
    public Date getEtd() {
        return etd;
    }
    public void setEtd(Date etd) {
        this.etd = etd;
    }
    public String getStatusTag() {
        return statusTag;
    }
    public void setStatusTag(String statusTag) {
        this.statusTag = statusTag;
    }
    public String getPortCode() {
        return portCode;
    }
    public void setPortCode(String portCode) {
        this.portCode = portCode;
    }
    public String getPortName() {
        return portName;
    }
    public void setPortName(String portName) {
        this.portName = portName;
    }
    public String getCargoQuantity() {
        return cargoQuantity;
    }
    public void setCargoQuantity(String cargoQuantity) {
        this.cargoQuantity = cargoQuantity;
    }
    public Date getStatusTagTime() {
        return statusTagTime;
    }
    public void setStatusTagTime(Date statusTagTime) {
        this.statusTagTime = statusTagTime;
    }
    public float getDwt() {
        return dwt;
    }
    public void setDwt(float dwt) {
        this.dwt = dwt;
    }
    public float getGrt() {
        return grt;
    }
    public void setGrt(float grt) {
        this.grt = grt;
    }
	
}
