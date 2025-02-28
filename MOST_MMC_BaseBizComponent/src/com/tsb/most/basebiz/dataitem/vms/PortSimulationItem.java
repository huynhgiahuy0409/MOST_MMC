package com.tsb.most.basebiz.dataitem.vms;
import java.util.ArrayList;
import java.util.List;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class PortSimulationItem extends DataItem{
    
//  port distance use
    private String fromPort;
    private String toPort;
    private String distance;
    
//  port list use
    private String startDate;
    private String endDate;
    private List latLon = new ArrayList();
    private String timeZone;
    private String areaCode;
    
//  port calculation Use
    private String totalDistance;
    private String totalDay;
    private String routes;
    
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
	public String getDistance() {
		return distance;
	}
	public void setDistance(String distance) {
		this.distance = distance;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getTimeZone() {
		return timeZone;
	}
	public void setTimeZone(String timeZone) {
		this.timeZone = timeZone;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getTotalDistance() {
		return totalDistance;
	}
	public void setTotalDistance(String totalDistance) {
		this.totalDistance = totalDistance;
	}
	public String getTotalDay() {
		return totalDay;
	}
	public void setTotalDay(String totalDay) {
		this.totalDay = totalDay;
	}
	public List getLatLon() {
		return latLon;
	}
	public void setLatLon(List latLon) {
		this.latLon = latLon;
	}
	public String getRoutes() {
		return routes;
	}
	public void setRoutes(String routes) {
		this.routes = routes;
	}
    
   
    
}