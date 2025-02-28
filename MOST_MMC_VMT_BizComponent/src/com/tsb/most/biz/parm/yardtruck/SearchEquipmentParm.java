package com.tsb.most.biz.parm.yardtruck;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchEquipmentParm extends BaseBizParm {

	private String equipmentType;
	private String area;
	private String bitt;
	private String berth;
	private String facility;
	private String terminalCD;
	private String yardID;
	private String block;
	private String equipmentNo;
	private String equipmentType1;
	private String truckType;
	private String iOType;
	private String zoneID;
	private String zoneDataType;
	private String terminalLayoutID;
	private String zoneCD;
	private String iCChk;
	private String buffer;
	private String yardType;
	private String mappType;
	private String mappCode;
	private String bay;
	private short maxBay;
	private short maxRow;
	private short maxTier;
	private String patternName;
	private String railTrackID;
	private String railTrackName;
	private String berthLaneName;
	private String fender;
	private String useChassisType;
	
	//added by Brian (2023/09/27)
	private String productTyte;

	public void setArea(String area){
		this.area = area;
	}
	
	public String getArea(){
		return area;
	}
	public void setBitt(String bitt){
		this.bitt = bitt;
	}
	
	public String getBitt(){
		return bitt;
	}
	public void setBerth(String berth){
		this.berth = berth;
	}
	
	public String getBerth(){
		return berth;
	}
	public void setFacility(String facility){
		this.facility = facility;
	}
	
	public String getFacility(){
		return facility;
	}
	public void setTerminalCD(String terminalCD){
		this.terminalCD = terminalCD;
	}
	
	public String getTerminalCD(){
		return terminalCD;
	}
	public void setYardID(String yardID){
		this.yardID = yardID;
	}
	
	public String getYardID(){
		return yardID;
	}
	public void setBlock(String block){
		this.block = block;
	}
	
	public String getBlock(){
		return block;
	}
	public void setEquipmentNo(String equipmentNo){
		this.equipmentNo = equipmentNo;
	}
	
	public String getEquipmentNo(){
		return equipmentNo;
	}
	public void setEquipmentType1(String equipmentType1){
		this.equipmentType1 = equipmentType1;
	}
	
	public String getEquipmentType1(){
		return equipmentType1;
	}
	public void setTruckType(String truckType){
		this.truckType = truckType;
	}
	
	public String getTruckType(){
		return truckType;
	}
	public void setIOType(String iOType){
		this.iOType = iOType;
	}
	
	public String getIOType(){
		return iOType;
	}
	public void setZoneID(String zoneID){
		this.zoneID = zoneID;
	}
	
	public String getZoneID(){
		return zoneID;
	}
	public void setZoneDataType(String zoneDataType){
		this.zoneDataType = zoneDataType;
	}
	
	public String getZoneDataType(){
		return zoneDataType;
	}
	public void setTerminalLayoutID(String terminalLayoutID){
		this.terminalLayoutID = terminalLayoutID;
	}
	
	public String getTerminalLayoutID(){
		return terminalLayoutID;
	}
	public void setZoneCD(String zoneCD){
		this.zoneCD = zoneCD;
	}
	
	public String getZoneCD(){
		return zoneCD;
	}
	public void setICChk(String iCChk){
		this.iCChk = iCChk;
	}
	
	public String getICChk(){
		return iCChk;
	}
	public void setBuffer(String buffer){
		this.buffer = buffer;
	}
	
	public String getBuffer(){
		return buffer;
	}
	public void setYardType(String yardType){
		this.yardType = yardType;
	}
	
	public String getYardType(){
		return yardType;
	}
	public void setMappType(String mappType){
		this.mappType = mappType;
	}
	
	public String getMappType(){
		return mappType;
	}
	public void setMappCode(String mappCode){
		this.mappCode = mappCode;
	}
	
	public String getMappCode(){
		return mappCode;
	}
	public void setBay(String bay){
		this.bay = bay;
	}
	
	public String getBay(){
		return bay;
	}
	public void setMaxBay(short maxBay){
		this.maxBay = maxBay;
	}
	
	public short getMaxBay(){
		return maxBay;
	}
	public void setMaxRow(short maxRow){
		this.maxRow = maxRow;
	}
	
	public short getMaxRow(){
		return maxRow;
	}
	public void setMaxTier(short maxTier){
		this.maxTier = maxTier;
	}
	
	public short getMaxTier(){
		return maxTier;
	}
	public void setPatternName(String patternName){
		this.patternName = patternName;
	}
	
	public String getPatternName(){
		return patternName;
	}
	public void setRailTrackID(String railTrackID){
		this.railTrackID = railTrackID;
	}
	
	public String getRailTrackID(){
		return railTrackID;
	}
	public void setRailTrackName(String railTrackName){
		this.railTrackName = railTrackName;
	}
	
	public String getRailTrackName(){
		return railTrackName;
	}
	public void setBerthLaneName(String berthLaneName){
		this.berthLaneName = berthLaneName;
	}
	
	public String getBerthLaneName(){
		return berthLaneName;
	}
	public void setFender(String fender){
		this.fender = fender;
	}
	
	public String getFender(){
		return fender;
	}
	public void setUseChassisType(String useChassisType){
		this.useChassisType = useChassisType;
	}
	
	public String getUseChassisType(){
		return useChassisType;
	}
	
	public String getEquipmentType() {
		return equipmentType;
	}

	public void setEquipmentType(String equipmentType) {
		this.equipmentType = equipmentType;
	}

	public String getProductTyte() {
		return productTyte;
	}

	public void setProductTyte(String productTyte) {
		this.productTyte = productTyte;
	}
	
}
