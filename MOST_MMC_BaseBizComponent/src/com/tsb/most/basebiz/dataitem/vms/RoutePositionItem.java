package com.tsb.most.basebiz.dataitem.vms;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class RoutePositionItem{
    

	@JacksonXmlProperty(localName="bunkerIFO", isAttribute = true)
	private String bunkerIFO;
    
	@JacksonXmlProperty(localName="bunkerMDO", isAttribute = true)
	private String bunkerMDO;
    
	@JacksonXmlProperty(localName="currentFactor", isAttribute = true)
	private String currentFactor;
    
	@JacksonXmlProperty(localName="distanceSailed", isAttribute = true)
    private String distanceSailed;
    
	@JacksonXmlProperty(localName="latitude", isAttribute = true)
	private String latitude;
    
	@JacksonXmlProperty(localName="longitude", isAttribute = true)
    private String longitude;
    
	@JacksonXmlProperty(localName="navigationType", isAttribute = true)
	private String navigationType;	
    
	@JacksonXmlProperty(localName="order", isAttribute = true)
    private String order;	
    
	@JacksonXmlProperty(localName="portName", isAttribute = true)
	private String portName;
    
	@JacksonXmlProperty(localName="positionDate", isAttribute = true)
    private String positionDate;
    
	@JacksonXmlProperty(localName="positionType", isAttribute = true)
	private String positionType;
    
	@JacksonXmlProperty(localName="seaHeight", isAttribute = true)
    private String seaHeight;
    
	@JacksonXmlProperty(localName="shipHead", isAttribute = true)
	private String shipHead;
    
	@JacksonXmlProperty(localName="shipSpeed", isAttribute = true)
    private String shipSpeed;
    
	@JacksonXmlProperty(localName="swellDir", isAttribute = true)
	private String swellDir;
    
	@JacksonXmlProperty(localName="swellHeight", isAttribute = true)
    private String swellHeight;
    
	@JacksonXmlProperty(localName="swellPeriod", isAttribute = true)
	private String swellPeriod;
	
	@JacksonXmlProperty(localName="weatherFactor", isAttribute = true)
    private String weatherFactor;
    
	@JacksonXmlProperty(localName="windDir", isAttribute = true)
	private String windDir;
	
	@JacksonXmlProperty(localName="windSpeed", isAttribute = true)
    private String windSpeed;

	
	
	
	public String getBunkerIFO() {
		return bunkerIFO;
	}

	public void setBunkerIFO(String bunkerIFO) {
		this.bunkerIFO = bunkerIFO;
	}

	public String getBunkerMDO() {
		return bunkerMDO;
	}

	public void setBunkerMDO(String bunkerMDO) {
		this.bunkerMDO = bunkerMDO;
	}

	public String getCurrentFactor() {
		return currentFactor;
	}

	public void setCurrentFactor(String currentFactor) {
		this.currentFactor = currentFactor;
	}

	public String getDistanceSailed() {
		return distanceSailed;
	}

	public void setDistanceSailed(String distanceSailed) {
		this.distanceSailed = distanceSailed;
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

	public String getNavigationType() {
		return navigationType;
	}

	public void setNavigationType(String navigationType) {
		this.navigationType = navigationType;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getPortName() {
		return portName;
	}

	public void setPortName(String portName) {
		this.portName = portName;
	}

	public String getPositionDate() {
		return positionDate;
	}

	public void setPositionDate(String positionDate) {
		this.positionDate = positionDate;
	}

	public String getPositionType() {
		return positionType;
	}

	public void setPositionType(String positionType) {
		this.positionType = positionType;
	}

	public String getSeaHeight() {
		return seaHeight;
	}

	public void setSeaHeight(String seaHeight) {
		this.seaHeight = seaHeight;
	}

	public String getShipHead() {
		return shipHead;
	}

	public void setShipHead(String shipHead) {
		this.shipHead = shipHead;
	}

	public String getShipSpeed() {
		return shipSpeed;
	}

	public void setShipSpeed(String shipSpeed) {
		this.shipSpeed = shipSpeed;
	}

	public String getSwellDir() {
		return swellDir;
	}

	public void setSwellDir(String swellDir) {
		this.swellDir = swellDir;
	}

	public String getSwellHeight() {
		return swellHeight;
	}

	public void setSwellHeight(String swellHeight) {
		this.swellHeight = swellHeight;
	}

	public String getSwellPeriod() {
		return swellPeriod;
	}

	public void setSwellPeriod(String swellPeriod) {
		this.swellPeriod = swellPeriod;
	}

	public String getWeatherFactor() {
		return weatherFactor;
	}

	public void setWeatherFactor(String weatherFactor) {
		this.weatherFactor = weatherFactor;
	}

	public String getWindDir() {
		return windDir;
	}

	public void setWindDir(String windDir) {
		this.windDir = windDir;
	}

	public String getWindSpeed() {
		return windSpeed;
	}

	public void setWindSpeed(String windSpeed) {
		this.windSpeed = windSpeed;
	}
    
    
    
}