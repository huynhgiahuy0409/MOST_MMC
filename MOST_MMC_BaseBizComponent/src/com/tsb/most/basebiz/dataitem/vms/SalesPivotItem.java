package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class SalesPivotItem extends DataItem {
	
	private static final long serialVersionUID = 6382779351735493547L;
	
	private String vesselCode;
	private String vesselName;
	private String voyageNo;
    private String departmentCode;		//팀구분
	private String departmentName;		//팀구분
	private String workGroupCode;		// W/G구분 
	private String workGroupName;		// W/G구분 
	private String fleetCode;			//사선/용선 구분
	private String fleetName;			//사선/용선 구분
	private String periodTCT;			//Period/TCT
	private String cargoCode;			//화물구분
	private String cargoName;			//화물구분
	private String coacvcspot;         //COA/CVC/SPOT
    private String affiliateCode;       //계역/비계열
    private String affiliateName;       //계역/비계열
    private String month;               //해당월
    
    private float actualFreight;     
    private float actualProfitLoss;
    private float actualQuantity;
    
    private float comparedFreight;     
    private float comparedProfitLoss;
    private float comparedQuantity;
    
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
    public String getVoyageNo() {
        return voyageNo;
    }
    public void setVoyageNo(String voyageNo) {
        this.voyageNo = voyageNo;
    }
    public String getDepartmentCode() {
        return departmentCode;
    }
    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }
    public String getDepartmentName() {
        return departmentName;
    }
    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
    public String getWorkGroupCode() {
        return workGroupCode;
    }
    public void setWorkGroupCode(String workGroupCode) {
        this.workGroupCode = workGroupCode;
    }
    public String getWorkGroupName() {
        return workGroupName;
    }
    public void setWorkGroupName(String workGroupName) {
        this.workGroupName = workGroupName;
    }
    public String getFleetCode() {
        return fleetCode;
    }
    public void setFleetCode(String fleetCode) {
        this.fleetCode = fleetCode;
    }
    public String getFleetName() {
        return fleetName;
    }
    public void setFleetName(String fleetName) {
        this.fleetName = fleetName;
    }
    public String getPeriodTCT() {
        return periodTCT;
    }
    public void setPeriodTCT(String periodTCT) {
        this.periodTCT = periodTCT;
    }
    public String getCargoCode() {
        return cargoCode;
    }
    public void setCargoCode(String cargoCode) {
        this.cargoCode = cargoCode;
    }
    public String getCargoName() {
        return cargoName;
    }
    public void setCargoName(String cargoName) {
        this.cargoName = cargoName;
    }
    public String getCoacvcspot() {
        return coacvcspot;
    }
    public void setCoacvcspot(String coacvcspot) {
        this.coacvcspot = coacvcspot;
    }
    public String getAffiliateCode() {
        return affiliateCode;
    }
    public void setAffiliateCode(String affiliateCode) {
        this.affiliateCode = affiliateCode;
    }
    public String getAffiliateName() {
        return affiliateName;
    }
    public void setAffiliateName(String affiliateName) {
        this.affiliateName = affiliateName;
    }
    public String getMonth() {
        return month;
    }
    public void setMonth(String month) {
        this.month = month;
    }
    public float getActualFreight() {
        return actualFreight;
    }
    public void setActualFreight(float actualFreight) {
        this.actualFreight = actualFreight;
    }
    public float getActualProfitLoss() {
        return actualProfitLoss;
    }
    public void setActualProfitLoss(float actualProfitLoss) {
        this.actualProfitLoss = actualProfitLoss;
    }
    public float getActualQuantity() {
        return actualQuantity;
    }
    public void setActualQuantity(float actualQuantity) {
        this.actualQuantity = actualQuantity;
    }
    public float getComparedFreight() {
        return comparedFreight;
    }
    public void setComparedFreight(float comparedFreight) {
        this.comparedFreight = comparedFreight;
    }
    public float getComparedProfitLoss() {
        return comparedProfitLoss;
    }
    public void setComparedProfitLoss(float comparedProfitLoss) {
        this.comparedProfitLoss = comparedProfitLoss;
    }
    public float getComparedQuantity() {
        return comparedQuantity;
    }
    public void setComparedQuantity(float comparedQuantity) {
        this.comparedQuantity = comparedQuantity;
    }
	
}
