package com.tsb.most.basebiz.dataitem.vms;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class RouteItem{
    
	@JacksonXmlProperty(localName="arrivalDate", isAttribute = true)
    private String arrivalDate;	
	
	@JacksonXmlProperty(localName="averageSpeed", isAttribute = true)
    private String averageSpeed;
	
	@JacksonXmlProperty(localName="charterPartySpeed", isAttribute = true)
    private String charterPartySpeed;
	
	@JacksonXmlProperty(localName="code", isAttribute = true)
    private String code;	
	
	@JacksonXmlProperty(localName="dailyIFO", isAttribute = true)
    private String dailyIFO;
	
	@JacksonXmlProperty(localName="dailyMDO", isAttribute = true)
    private String dailyMDO;
	
	@JacksonXmlProperty(localName="deparmenetCode", isAttribute = true)
    private String deparmenetCode;	
	
	@JacksonXmlProperty(localName="departmentName", isAttribute = true)
    private String departmentName;	
	
	@JacksonXmlProperty(localName="departureDate", isAttribute = true)
    private String departureDate;
	
	@JacksonXmlProperty(localName="distanceSailed", isAttribute = true)	
    private String distanceSailed;
	
	@JacksonXmlProperty(localName="fromPort", isAttribute = true)	
    private String fromPort;
	
	@JacksonXmlProperty(localName="toPort", isAttribute = true)
    private String toPort;
	
	@JacksonXmlProperty(localName="performanceSpeed", isAttribute = true)
    private String performanceSpeed;
	
	@JacksonXmlProperty(localName="shipCode", isAttribute = true)	
    private String shipCode;
	
	@JacksonXmlProperty(localName="shipName", isAttribute = true)	
    private String shipName;
	
	@JacksonXmlProperty(localName="totalDistance", isAttribute = true)	
    private String totalDistance;
    
	@JacksonXmlProperty(localName="Positions")	
    private RoutePositionGroup positionGroup;

	public String getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(String arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getAverageSpeed() {
		return averageSpeed;
	}

	public void setAverageSpeed(String averageSpeed) {
		this.averageSpeed = averageSpeed;
	}

	public String getCharterPartySpeed() {
		return charterPartySpeed;
	}

	public void setCharterPartySpeed(String charterPartySpeed) {
		this.charterPartySpeed = charterPartySpeed;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDailyIFO() {
		return dailyIFO;
	}

	public void setDailyIFO(String dailyIFO) {
		this.dailyIFO = dailyIFO;
	}

	public String getDailyMDO() {
		return dailyMDO;
	}

	public void setDailyMDO(String dailyMDO) {
		this.dailyMDO = dailyMDO;
	}

	public String getDeparmenetCode() {
		return deparmenetCode;
	}

	public void setDeparmenetCode(String deparmenetCode) {
		this.deparmenetCode = deparmenetCode;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public String getDistanceSailed() {
		return distanceSailed;
	}

	public void setDistanceSailed(String distanceSailed) {
		this.distanceSailed = distanceSailed;
	}

	public String getFromPort() {
		return fromPort;
	}

	public void setFromPort(String fromPort) {
		this.fromPort = fromPort;
	}

	public String getToPort() {
		return toPort;
	}

	public void setToPort(String toPort) {
		this.toPort = toPort;
	}

	public String getPerformanceSpeed() {
		return performanceSpeed;
	}

	public void setPerformanceSpeed(String performanceSpeed) {
		this.performanceSpeed = performanceSpeed;
	}

	public String getShipCode() {
		return shipCode;
	}

	public void setShipCode(String shipCode) {
		this.shipCode = shipCode;
	}

	public String getShipName() {
		return shipName;
	}

	public void setShipName(String shipName) {
		this.shipName = shipName;
	}

	public String getTotalDistance() {
		return totalDistance;
	}

	public void setTotalDistance(String totalDistance) {
		this.totalDistance = totalDistance;
	}

	public RoutePositionGroup getPositionGroup() {
		return positionGroup;
	}

	public void setPositionGroup(RoutePositionGroup positionGroup) {
		this.positionGroup = positionGroup;
	}

   
    
    
}