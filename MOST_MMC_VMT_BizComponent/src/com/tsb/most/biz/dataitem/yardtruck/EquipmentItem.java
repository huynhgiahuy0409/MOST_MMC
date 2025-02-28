package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.framework.dataitem.DataItem;

public class EquipmentItem extends DataItem {
	private static final long serialVersionUID = 1L;

	private String key;
	private String type;
	private String name;
	private String equType;
	private String equType2;
	private String ioType;
	private String yardID;
	private int maxWgt;
	private String inGate;
	private String outGate;
	private int passTier;
	private float wph;
	private String eq_no_if;
	private String remark;
	private String block;
	private String bayIndex;
	private String rowIndex;
	private String cabinpos;
	private String twinlift;
	private String tandem;
	private String gateGrid;
	private String autoCheck;
	private float speed;
	private int twinWeightTolerance;
	private String status;
	private String vesselCode;
	private String callYear;
	private String callSequence;
	private String pool_Name;
	private String tagNo;
	private boolean isExistingGateList;
	private short clearanceBays;
	private float gantrySpeed;
	private float trolleySpeed;
	private float hoistSpeed;
	private float ladenGantrySpeed;
	private float ladenTrolleySpeed;
	private float ladenHoistSpeed;
	private String chassisType;
	private String sapCd;
	private float x;
	private float y;
	private String truckType;
	private String twinLiftChk;

	public void setName(String name){
		this.name = name;
	}
	
	public String getName(){
		return name;
	}
	public void setEquType(String equType){
		this.equType = equType;
	}
	
	public String getEquType(){
		return equType;
	}
	public void setEquType2(String equType2){
		this.equType2 = equType2;
	}
	
	public String getEquType2(){
		return equType2;
	}
	public void setIoType(String ioType){
		this.ioType = ioType;
	}
	
	public String getIoType(){
		return ioType;
	}
	public void setYardID(String yardID){
		this.yardID = yardID;
	}
	
	public String getYardID(){
		return yardID;
	}
	public void setMaxWgt(int maxWgt){
		this.maxWgt = maxWgt;
	}
	
	public int getMaxWgt(){
		return maxWgt;
	}
	public void setInGate(String inGate){
		this.inGate = inGate;
	}
	
	public String getInGate(){
		return inGate;
	}
	public void setOutGate(String outGate){
		this.outGate = outGate;
	}
	
	public String getOutGate(){
		return outGate;
	}
	public void setPassTier(int passTier){
		this.passTier = passTier;
	}
	
	public int getPassTier(){
		return passTier;
	}
	public void setWph(float wph){
		this.wph = wph;
	}
	
	public float getWph(){
		return wph;
	}
	public void setEq_no_if(String eq_no_if){
		this.eq_no_if = eq_no_if;
	}
	
	public String getEq_no_if(){
		return eq_no_if;
	}
	public void setRemark(String remark){
		this.remark = remark;
	}
	
	public String getRemark(){
		return remark;
	}
	public void setBlock(String block){
		this.block = block;
	}
	
	public String getBlock(){
		return block;
	}
	public void setBayIndex(String bayIndex){
		this.bayIndex = bayIndex;
	}
	
	public String getBayIndex(){
		return bayIndex;
	}
	public void setRowIndex(String rowIndex){
		this.rowIndex = rowIndex;
	}
	
	public String getRowIndex(){
		return rowIndex;
	}
	public void setCabinpos(String cabinpos){
		this.cabinpos = cabinpos;
	}
	
	public String getCabinpos(){
		return cabinpos;
	}
	public void setTwinlift(String twinlift){
		this.twinlift = twinlift;
	}
	
	public String getTwinlift(){
		return twinlift;
	}
	public void setTandem(String tandem){
		this.tandem = tandem;
	}
	
	public String getTandem(){
		return tandem;
	}
	public void setGateGrid(String gateGrid){
		this.gateGrid = gateGrid;
	}
	
	public String getGateGrid(){
		return gateGrid;
	}
	public void setAutoCheck(String autoCheck){
		this.autoCheck = autoCheck;
	}
	
	public String getAutoCheck(){
		return autoCheck;
	}
	public void setSpeed(float speed){
		this.speed = speed;
	}
	
	public float getSpeed(){
		return speed;
	}
	public void setStatus(String status){
		this.status = status;
	}
	
	public String getStatus(){
		return status;
	}
	public void setVesselCode(String vesselCode){
		this.vesselCode = vesselCode;
	}
	
	public String getVesselCode(){
		return vesselCode;
	}
	public void setCallYear(String callYear){
		this.callYear = callYear;
	}
	
	public String getCallYear(){
		return callYear;
	}
	public void setCallSequence(String callSequence){
		this.callSequence = callSequence;
	}
	
	public String getCallSequence(){
		return callSequence;
	}
	public void setPool_Name(String pool_Name){
		this.pool_Name = pool_Name;
	}
	
	public String getPool_Name(){
		return pool_Name;
	}
	public void setTagNo(String tagNo){
		this.tagNo = tagNo;
	}
	
	public String getTagNo(){
		return tagNo;
	}
	public void setIsExistingGateList(boolean isExistingGateList){
		this.isExistingGateList = isExistingGateList;
	}
	
	public boolean getIsExistingGateList(){
		return isExistingGateList;
	}
	public void setClearanceBays(short clearanceBays){
		this.clearanceBays = clearanceBays;
	}
	
	public short getClearanceBays(){
		return clearanceBays;
	}
	public void setGantrySpeed(float gantrySpeed){
		this.gantrySpeed = gantrySpeed;
	}
	
	public float getGantrySpeed(){
		return gantrySpeed;
	}
	public void setTrolleySpeed(float trolleySpeed){
		this.trolleySpeed = trolleySpeed;
	}
	
	public float getTrolleySpeed(){
		return trolleySpeed;
	}
	public void setHoistSpeed(float hoistSpeed){
		this.hoistSpeed = hoistSpeed;
	}
	
	public float getHoistSpeed(){
		return hoistSpeed;
	}
	public void setLadenGantrySpeed(float ladenGantrySpeed){
		this.ladenGantrySpeed = ladenGantrySpeed;
	}
	
	public float getLadenGantrySpeed(){
		return ladenGantrySpeed;
	}
	public void setLadenTrolleySpeed(float ladenTrolleySpeed){
		this.ladenTrolleySpeed = ladenTrolleySpeed;
	}
	
	public float getLadenTrolleySpeed(){
		return ladenTrolleySpeed;
	}
	public void setLadenHoistSpeed(float ladenHoistSpeed){
		this.ladenHoistSpeed = ladenHoistSpeed;
	}
	
	public float getLadenHoistSpeed(){
		return ladenHoistSpeed;
	}
	public void setChassisType(String chassisType){
		this.chassisType = chassisType;
	}
	
	public String getChassisType(){
		return chassisType;
	}
	public void setSapCd(String sapCd){
		this.sapCd = sapCd;
	}
	
	public String getSapCd(){
		return sapCd;
	}
	public void setX(float x){
		this.x = x;
	}
	
	public float getX(){
		return x;
	}
	public void setY(float y){
		this.y = y;
	}
	
	public float getY(){
		return y;
	}
	public void setTruckType(String truckType){
		this.truckType = truckType;
	}
	
	public String getTruckType(){
		return truckType;
	}
	
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getTwinWeightTolerance() {
		return twinWeightTolerance;
	}

	public void setTwinWeightTolerance(int twinWeightTolerance) {
		this.twinWeightTolerance = twinWeightTolerance;
	}

	public String getTwinLiftChk() {
		return twinLiftChk;
	}

	public void setTwinLiftChk(String twinLiftChk) {
		this.twinLiftChk = twinLiftChk;
	}
}
