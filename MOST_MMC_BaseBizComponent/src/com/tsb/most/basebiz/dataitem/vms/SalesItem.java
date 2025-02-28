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

public class SalesItem extends DataItem {
	
    /* 매출 현황 DataItem기준. */
	private	String	department;
	private	String	workGroup;
	private	String	charterDivision;
	private	String	cargoTRType;
	private	String	cargotDivision;
	private	String	cargoKinds;
	private	String	lineYn;
	private	String	performanceM;
	private	String	volume;
	private	String	sales;
	private	String	profitNloss;
	private	String	compQuantity;
	private	String	compSales;
	private	String	totalCost;
	private	String	compProfitNloss;
	private	String	bizPlan;
	private	String	bizFrom;
	private	String	bizEnd;
	private	String	stdVesselCont;
	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}
	/**
	 * @param department the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}
	/**
	 * @return the workGroup
	 */
	public String getWorkGroup() {
		return workGroup;
	}
	/**
	 * @param workGroup the workGroup to set
	 */
	public void setWorkGroup(String workGroup) {
		this.workGroup = workGroup;
	}
	/**
	 * @return the charterDivision
	 */
	public String getCharterDivision() {
		return charterDivision;
	}
	/**
	 * @param charterDivision the charterDivision to set
	 */
	public void setCharterDivision(String charterDivision) {
		this.charterDivision = charterDivision;
	}
	/**
	 * @return the cargoTRType
	 */
	public String getCargoTRType() {
		return cargoTRType;
	}
	/**
	 * @param cargoTRType the cargoTRType to set
	 */
	public void setCargoTRType(String cargoTRType) {
		this.cargoTRType = cargoTRType;
	}
	/**
	 * @return the cargotDivision
	 */
	public String getCargotDivision() {
		return cargotDivision;
	}
	/**
	 * @param cargotDivision the cargotDivision to set
	 */
	public void setCargotDivision(String cargotDivision) {
		this.cargotDivision = cargotDivision;
	}
	/**
	 * @return the cargoKinds
	 */
	public String getCargoKinds() {
		return cargoKinds;
	}
	/**
	 * @param cargoKinds the cargoKinds to set
	 */
	public void setCargoKinds(String cargoKinds) {
		this.cargoKinds = cargoKinds;
	}
	/**
	 * @return the lineYn
	 */
	public String getLineYn() {
		return lineYn;
	}
	/**
	 * @param lineYn the lineYn to set
	 */
	public void setLineYn(String lineYn) {
		this.lineYn = lineYn;
	}
	/**
	 * @return the performanceM
	 */
	public String getPerformanceM() {
		return performanceM;
	}
	/**
	 * @param performanceM the performanceM to set
	 */
	public void setPerformanceM(String performanceM) {
		this.performanceM = performanceM;
	}
	/**
	 * @return the volume
	 */
	public String getVolume() {
		return volume;
	}
	/**
	 * @param volume the volume to set
	 */
	public void setVolume(String volume) {
		this.volume = volume;
	}
	/**
	 * @return the sales
	 */
	public String getSales() {
		return sales;
	}
	/**
	 * @param sales the sales to set
	 */
	public void setSales(String sales) {
		this.sales = sales;
	}
	/**
	 * @return the profitNloss
	 */
	public String getProfitNloss() {
		return profitNloss;
	}
	/**
	 * @param profitNloss the profitNloss to set
	 */
	public void setProfitNloss(String profitNloss) {
		this.profitNloss = profitNloss;
	}
	/**
	 * @return the compQuantity
	 */
	public String getCompQuantity() {
		return compQuantity;
	}
	/**
	 * @param compQuantity the compQuantity to set
	 */
	public void setCompQuantity(String compQuantity) {
		this.compQuantity = compQuantity;
	}
	/**
	 * @return the compSales
	 */
	public String getCompSales() {
		return compSales;
	}
	/**
	 * @param compSales the compSales to set
	 */
	public void setCompSales(String compSales) {
		this.compSales = compSales;
	}
	/**
	 * @return the totalCost
	 */
	public String getTotalCost() {
		return totalCost;
	}
	/**
	 * @param totalCost the totalCost to set
	 */
	public void setTotalCost(String totalCost) {
		this.totalCost = totalCost;
	}
	/**
	 * @return the compProfitNloss
	 */
	public String getCompProfitNloss() {
		return compProfitNloss;
	}
	/**
	 * @param compProfitNloss the compProfitNloss to set
	 */
	public void setCompProfitNloss(String compProfitNloss) {
		this.compProfitNloss = compProfitNloss;
	}
	/**
	 * @return the bizPlan
	 */
	public String getBizPlan() {
		return bizPlan;
	}
	/**
	 * @param bizPlan the bizPlan to set
	 */
	public void setBizPlan(String bizPlan) {
		this.bizPlan = bizPlan;
	}
	/**
	 * @return the bizFrom
	 */
	public String getBizFrom() {
		return bizFrom;
	}
	/**
	 * @param bizFrom the bizFrom to set
	 */
	public void setBizFrom(String bizFrom) {
		this.bizFrom = bizFrom;
	}
	/**
	 * @return the bizEnd
	 */
	public String getBizEnd() {
		return bizEnd;
	}
	/**
	 * @param bizEnd the bizEnd to set
	 */
	public void setBizEnd(String bizEnd) {
		this.bizEnd = bizEnd;
	}
	/**
	 * @return the stdVesselCont
	 */
	public String getStdVesselCont() {
		return stdVesselCont;
	}
	/**
	 * @param stdVesselCont the stdVesselCont to set
	 */
	public void setStdVesselCont(String stdVesselCont) {
		this.stdVesselCont = stdVesselCont;
	}
	
}
