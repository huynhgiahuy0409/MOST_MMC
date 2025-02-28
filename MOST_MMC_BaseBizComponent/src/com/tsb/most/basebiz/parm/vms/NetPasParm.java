package com.tsb.most.basebiz.parm.vms;
//import com.pcs.foundation.bizparm.Parm;
import com.tsb.most.framework.bizparm.BaseBizParm;

public class NetPasParm extends BaseBizParm {
    
	private String[] portNames;
	private String[] portCds;
	private String[] weathers;
	private String[] speeds;
	private String[] portDays;
	private String lat="";
	private String lon="";
	private String nmVessel="";
	private String cdPort="";
	private String routes="";
	private String fromPort="";
	private String toPort="";
	private String startDate = "";
	private String endDate = "";
	
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
	public String getRoutes() {
		return routes;
	}
	public void setRoutes(String routes) {
		this.routes = routes;
	}
	public String[] getPortCds() {
		return portCds;
	}
	public void setPortCds(String[] portCds) {
		this.portCds = portCds;
	}
	public String getCdPort() {
		return cdPort;
	}
	public void setCdPort(String cdPort) {
		this.cdPort = cdPort;
	}
	public String getNmVessel() {
		return nmVessel;
	}
	public void setNmVessel(String nmVessel) {
		this.nmVessel = nmVessel;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLon() {
		return lon;
	}
	public void setLon(String lon) {
		this.lon = lon;
	}
	public String[] getPortNames() {
		return portNames;
	}
	public void setPortNames(String[] portNames) {
		this.portNames = portNames;
	}
	public String[] getWeathers() {
		return weathers;
	}
	public void setWeathers(String[] weathers) {
		this.weathers = weathers;
	}
	public String[] getSpeeds() {
		return speeds;
	}
	public void setSpeeds(String[] speeds) {
		this.speeds = speeds;
	}
	public String[] getPortDays() {
		return portDays;
	}
	public void setPortDays(String[] portDays) {
		this.portDays = portDays;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
  
}