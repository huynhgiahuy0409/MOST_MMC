package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.biz.mts.msgitem.MsgC3itReceive;
import com.tsb.most.biz.mts.msgitem.RstT11Item;
import com.tsb.most.biz.mts.msgitem.RstY11Item;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItem;

public class YTJobItem extends DataItem {

	private static final long serialVersionUID = 279733506483279262L;
	
	private String yardTruckNo = CommonConstants.BLANK;
	private String containerNo = CommonConstants.BLANK;
    private String yardJobCode = CommonConstants.BLANK;
    private String vesselCode = CommonConstants.BLANK;
    private String callYear = CommonConstants.BLANK;
    private String callSequence = CommonConstants.BLANK;
    private String userVoyage = CommonConstants.BLANK;
    private String chassisNo = CommonConstants.BLANK;
    private String gensetNo = CommonConstants.BLANK;
    private String block = CommonConstants.BLANK;
    private String bay = CommonConstants.BLANK;
    private String row = CommonConstants.BLANK;
    private String tier = CommonConstants.BLANK;
    private String apoint = CommonConstants.BLANK;
    private String tEquipmentType = CommonConstants.BLANK;
    private String tEquipmentNo = CommonConstants.BLANK;
    private String cPosition = CommonConstants.BLANK;
    private String cTargetPosition = CommonConstants.BLANK;    //added by Rackhyun Jeong (2016.09.08) - 0054366: [YT] Show broken position
    private String sizeType = CommonConstants.BLANK;
    private String sizeType2 = CommonConstants.BLANK;
    private String ixCode = CommonConstants.BLANK;
    private String dMode = CommonConstants.BLANK;
    private String dMode2 = CommonConstants.BLANK;
    private String cargoType = CommonConstants.BLANK;
    private String weight = CommonConstants.BLANK;
    private String fe = CommonConstants.BLANK;
    private String delv = CommonConstants.BLANK;
    private String wdCheck = CommonConstants.BLANK;
    private String ytStatus = CommonConstants.BLANK;
    private String remark = CommonConstants.BLANK;
    private String codeIndex = CommonConstants.BLANK;
    private String ytNo = CommonConstants.BLANK;
    private String orderTime = CommonConstants.BLANK;
    private String twistLock = CommonConstants.BLANK;
    private String tandemId = CommonConstants.BLANK;
    private String tandemDir = CommonConstants.BLANK;
    private String bayNo = CommonConstants.BLANK;
    private String rowNo = CommonConstants.BLANK;
    private String seq = CommonConstants.BLANK;
    private String queue = CommonConstants.BLANK;

    //added by jaehoon(2016.11.19)
    private String mMode = CommonConstants.BLANK;

    private int tokenArrayIndex = 0;

    private String rtSideInfo = CommonConstants.BLANK;	// added by Chun (2017.01.18) : HMTS UP = TM-002
    
    private String wheeledBlockChk = CommonConstants.BLANK; //added by JH.Tak (2018.05.30) APL N35-YT-002 
    private String area = CommonConstants.BLANK;  //added by JH.Tak (2018.05.31) APL N35-YT-004
    private String exchangeRequestTime = CommonConstants.BLANK;
    private String refYardJobCode = CommonConstants.BLANK;
    private String sealNo1 = CommonConstants.BLANK;
    private String sealNo2 = CommonConstants.BLANK;
    private String sealNo3 = CommonConstants.BLANK;
    private String jobState = CommonConstants.BLANK;
    //added by JH.Tak (2018.06.04) APL N35-YT-006
    private String trailerNo = CommonConstants.BLANK;
    
    private String yardJobCode2 = CommonConstants.BLANK;
    private String cfsBlockChk = CommonConstants.BLANK;
	//added by JH.Tak (2018.07.09) 0074591: [YT] No container information on Swap Container screen
    private String cntrState = CommonConstants.BLANK;
    private String ptnrCd = CommonConstants.BLANK;
    private String socChk = CommonConstants.BLANK;
    private String storageCd = CommonConstants.BLANK;
    
    //added by JH.Tak (2018.07.17) 0084743: No job appears in ITT In job list
    private String chassisExchangeChk = CommonConstants.BLANK;
    
    //added by JH.Tak (2018.08.02) 0084954: [YT] Add Cargo Type indicator
    private String plugChk = CommonConstants.BLANK;
    // added by JH.Tak (2018.10.19) 0086055: [B2B] Enhancement for Position and YT Release
    private String underTallyMode = CommonConstants.BLANK; 
    // added by JH.Tak (2018.11.01)  0086923: [YT] System should not allow the different parking location for CHASSIS twin discharge operation
    private String twinCntr = CommonConstants.BLANK; 
    // added by JH.Tak (2019.11.06) 0088411: [B2B Message] Enhancement for Lift On Job
    private String equipmentNo = CommonConstants.BLANK;
    private String t_Block = CommonConstants.BLANK;
    private String t_Bay = CommonConstants.BLANK;
    private String t_BayNo = CommonConstants.BLANK;
    private String t_Row = CommonConstants.BLANK;
    private String t_RowNo = CommonConstants.BLANK;
    private String t_Tier = CommonConstants.BLANK;
    private String t_Area = CommonConstants.BLANK;
    
    public String getYardTruckNo() {
		return yardTruckNo;
	}

	public void setYardTruckNo(String yardTruckNo) {
		this.yardTruckNo = yardTruckNo;
	}

	public String getContainerNo() {
		return containerNo;
	}

	public void setContainerNo(String containerNo) {
		this.containerNo = containerNo;
	}

	public String getYardJobCode() {
		return yardJobCode;
	}

	public void setYardJobCode(String yardJobCode) {
		this.yardJobCode = yardJobCode;
	}

	public String getVesselCode() {
		return vesselCode;
	}

	public void setVesselCode(String vesselCode) {
		this.vesselCode = vesselCode;
	}

	public String getCallYear() {
		return callYear;
	}

	public void setCallYear(String callYear) {
		this.callYear = callYear;
	}

	public String getCallSequence() {
		return callSequence;
	}

	public void setCallSequence(String callSequence) {
		this.callSequence = callSequence;
	}

	public String getUserVoyage() {
		return userVoyage;
	}

	public void setUserVoyage(String userVoyage) {
		this.userVoyage = userVoyage;
	}

	public String getChassisNo() {
		return chassisNo;
	}

	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}

	public String getGensetNo() {
		return gensetNo;
	}

	public void setGensetNo(String gensetNo) {
		this.gensetNo = gensetNo;
	}

	public String getBlock() {
		return block;
	}

	public void setBlock(String block) {
		this.block = block;
	}

	public String getBay() {
		return bay;
	}

	public void setBay(String bay) {
		this.bay = bay;
	}

	public String getRow() {
		return row;
	}

	public void setRow(String row) {
		this.row = row;
	}

	public String getTier() {
		return tier;
	}

	public void setTier(String tier) {
		this.tier = tier;
	}

	public String getApoint() {
		return apoint;
	}

	public void setApoint(String apoint) {
		this.apoint = apoint;
	}

	public String getTEquipmentType() {
		return tEquipmentType;
	}

	public void setTEquipmentType(String tEquipmentType) {
		this.tEquipmentType = tEquipmentType;
	}

	public String getTEquipmentNo() {
		return tEquipmentNo;
	}

	public void setTEquipmentNo(String tEquipmentNo) {
		this.tEquipmentNo = tEquipmentNo;
	}

	public String getCPosition() {
		return cPosition;
	}

	public void setCPosition(String cPosition) {
		this.cPosition = cPosition;
	}

	//< added by Rackhyun Jeong (2016.09.08) - 0054366: [YT] Show broken position
	public String getTargetPosition() {
		return cTargetPosition;
	}

	public void setTargetPosition(String cTargetPosition) {
		this.cTargetPosition = cTargetPosition;
	}
	//>

	public String getSizeType() {
		return sizeType;
	}

	public void setSizeType(String sizeType) {
		this.sizeType = sizeType;
	}

	public String getSizeType2() {
		return sizeType2;
	}

	public void setSizeType2(String sizeType2) {
		this.sizeType2 = sizeType2;
	}

	public String getIXCode() {
		return ixCode;
	}

	public void setIXCode(String iXCode) {
		this.ixCode = iXCode;
	}

	public String getDMode() {
		return dMode;
	}

	public void setDMode(String dMode) {
		this.dMode = dMode;
	}

	public String getDMode2() {
		return dMode2;
	}

	public void setDMode2(String dMode2) {
		this.dMode2 = dMode2;
	}

	public String getCargoType() {
		return cargoType;
	}

	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getFE() {
		return fe;
	}

	public void setFE(String fE) {
		this.fe = fE;
	}

	public String getDelv() {
		return delv;
	}

	public void setDelv(String delv) {
		this.delv = delv;
	}

	public String getWDCheck() {
		return wdCheck;
	}

	public void setWDCheck(String wDCheck) {
		this.wdCheck = wDCheck;
	}

	public String getYTStatus() {
		return ytStatus;
	}

	public void setYTStatus(String yTStatus) {
		this.ytStatus = yTStatus;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCodeIndex() {
		return codeIndex;
	}

	public void setCodeIndex(String codeIndex) {
		this.codeIndex = codeIndex;
	}

	public String getYtNo() {
		return ytNo;
	}

	public void setYtNo(String ytNo) {
		this.ytNo = ytNo;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public String getTwistLock() {
		return twistLock;
	}

	public void setTwistLock(String twistLock) {
		this.twistLock = twistLock;
	}

	public String getTandemId() {
		return tandemId;
	}

	public void setTandemId(String tandemId) {
		this.tandemId = tandemId;
	}

	public String getTandemDir() {
		return tandemDir;
	}

	public void setTandemDir(String tandemDir) {
		this.tandemDir = tandemDir;
	}

	public String getBayNo() {
		return bayNo;
	}

	public void setBayNo(String bayNo) {
		this.bayNo = bayNo;
	}

	public String getRowNo() {
		return rowNo;
	}

	public void setRowNo(String rowNo) {
		this.rowNo = rowNo;
	}

    public String getmMode() {
        return mMode;
    }

    public void setmMode(String mMode) {
        this.mMode = mMode;
    }

	public String getRtSideInfo() {
		return rtSideInfo;
	}

	public void setRtSideInfo(String rtSideInfo) {
		this.rtSideInfo = rtSideInfo;
	}
	
	public String getSeq() {
		return seq;
	}

	public void setSeq(String seq) {
		this.seq = seq;
	}
	
	public String getQueue() {
		return queue;
	}

	public void setQueue(String queue) {
		this.queue = queue;
	}

	public String getWheeledBlockChk() {
		return wheeledBlockChk;
	}

	public void setWheeledBlockChk(String wheeledBlockChk) {
		this.wheeledBlockChk = wheeledBlockChk;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}
	
	public String getExchangeRequestTime() {
		return exchangeRequestTime;
	}

	public void setExchangeRequestTime(String exchangeRequestTime) {
		this.exchangeRequestTime = exchangeRequestTime;
	}

	public String getRefYardJobCode() {
		return refYardJobCode;
	}

	public void setRefYardJobCode(String refYardJobCode) {
		this.refYardJobCode = refYardJobCode;
	}

	public String getSealNo1() {
		return sealNo1;
	}

	public void setSealNo1(String sealNo1) {
		this.sealNo1 = sealNo1;
	}

	public String getSealNo2() {
		return sealNo2;
	}

	public void setSealNo2(String sealNo2) {
		this.sealNo2 = sealNo2;
	}

	public String getSealNo3() {
		return sealNo3;
	}

	public void setSealNo3(String sealNo3) {
		this.sealNo3 = sealNo3;
	}

	public String getJobState() {
		return jobState;
	}

	public void setJobState(String jobState) {
		this.jobState = jobState;
	}

	public String getTrailerNo() {
		return trailerNo;
	}

	public void setTrailerNo(String trailerNo) {
		this.trailerNo = trailerNo;
	}

	
	public String getYardJobCode2() {
		return yardJobCode2;
	}

	public void setYardJobCode2(String yardJobCode2) {
		this.yardJobCode2 = yardJobCode2;
	}

	public String getCfsBlockChk() {
		return cfsBlockChk;
	}

	public void setCfsBlockChk(String cfsBlockChk) {
		this.cfsBlockChk = cfsBlockChk;
	}

	public String getCntrState() {
		return cntrState;
	}

	public void setCntrState(String cntrState) {
		this.cntrState = cntrState;
	}
	
	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public String getSocChk() {
		return socChk;
	}

	public void setSocChk(String socChk) {
		this.socChk = socChk;
	}

	public String getStorageCd() {
		return storageCd;
	}

	public void setStorageCd(String storageCd) {
		this.storageCd = storageCd;
	}

	public String getChassisExchangeChk() {
		return chassisExchangeChk;
	}

	public void setChassisExchangeChk(String chassisExchangeChk) {
		this.chassisExchangeChk = chassisExchangeChk;
	}

	public String getPlugChk() {
		return plugChk;
	}

	public void setPlugChk(String plugChk) {
		this.plugChk = plugChk;
	}

	public String getUnderTallyMode() {
		return underTallyMode;
	}

	public void setUnderTallyMode(String underTallyMode) {
		this.underTallyMode = underTallyMode;
	}

	public String getTwinCntr() {
		return twinCntr;
	}

	public void setTwinCntr(String twinCntr) {
		this.twinCntr = twinCntr;
	}

	public String getEquipmentNo() {
		return equipmentNo;
	}

	public void setEquipmentNo(String equipmentNo) {
		this.equipmentNo = equipmentNo;
	}

	public String getT_Block() {
		return t_Block;
	}

	public void setT_Block(String t_Block) {
		this.t_Block = t_Block;
	}

	public String getT_Bay() {
		return t_Bay;
	}

	public void setT_Bay(String t_Bay) {
		this.t_Bay = t_Bay;
	}

	public String getT_BayNo() {
		return t_BayNo;
	}

	public void setT_BayNo(String t_BayNo) {
		this.t_BayNo = t_BayNo;
	}

	public String getT_Row() {
		return t_Row;
	}

	public void setT_Row(String t_Row) {
		this.t_Row = t_Row;
	}

	public String getT_RowNo() {
		return t_RowNo;
	}

	public void setT_RowNo(String t_RowNo) {
		this.t_RowNo = t_RowNo;
	}

	public String getT_Tier() {
		return t_Tier;
	}

	public void setT_Tier(String t_Tier) {
		this.t_Tier = t_Tier;
	}

	public String getT_Area() {
		return t_Area;
	}

	public void setT_Area(String t_Area) {
		this.t_Area = t_Area;
	}

	public void setYTJobItem(MsgC3itReceive msgObject) {

		if (msgObject instanceof RstT11Item) {
			RstT11Item rstT11Item = (RstT11Item)msgObject;

			this.setYardTruckNo(rstT11Item.getYardTruckNo());
			this.setContainerNo(rstT11Item.getContainerNo());
			this.setYardJobCode(rstT11Item.getYardJobCode());
			this.setVesselCode(rstT11Item.getVesselCode());
			this.setCallYear(rstT11Item.getCallYear());
			this.setCallSequence(rstT11Item.getCallSequence());
			this.setUserVoyage(rstT11Item.getUserVoyage());
			this.setChassisNo(rstT11Item.getChassisNo());
			this.setGensetNo(rstT11Item.getGensetNo());
			this.setBlock(rstT11Item.getBlock());
			this.setBay(rstT11Item.getBay());
			this.setRow(rstT11Item.getRow());
			this.setTier(rstT11Item.getTier());
			this.setApoint(rstT11Item.getApoint());
			this.setTEquipmentType(rstT11Item.getTEquipmentType());
			this.setTEquipmentNo(rstT11Item.getTEquipmentNo());
			this.setCPosition(rstT11Item.getCPosition());
			this.setSizeType(rstT11Item.getSizeType());
			this.setSizeType2(rstT11Item.getSizeType2());
			this.setIXCode(rstT11Item.getIXCode());
			this.setDMode(rstT11Item.getDMode());
			this.setDMode2(rstT11Item.getDMode2());
			this.setCargoType(rstT11Item.getCargoType());
			this.setWeight(rstT11Item.getWeight());
			this.setFE(rstT11Item.getFE());
			this.setDelv(rstT11Item.getDelv());
			this.setWDCheck(rstT11Item.getWDCheck());
			this.setYTStatus(rstT11Item.getYTStatus());
			this.setRemark(rstT11Item.getRemark());
			this.setCodeIndex(rstT11Item.getCodeIndex());
			this.setYtNo(rstT11Item.getYtNo());
			this.setOrderTime(rstT11Item.getOrderTime());
			this.setTwistLock(rstT11Item.getTwistLock());
			this.setTandemId(rstT11Item.getTandemId());
			this.setTandemDir(rstT11Item.getTandemDir());
			this.setBayNo(rstT11Item.getBayNo());
			this.setRowNo(rstT11Item.getRowNo());
			this.setTargetPosition(rstT11Item.getTargetPosition());    //added by Rackhyun Jeong (2016.09.08) - 0054366: [YT] Show broken position
			this.setRtSideInfo(rstT11Item.getRtSideInfo());
			
			// added by jaeok (2018.02.05) WHL Gap ID: CR-T-002 YT-B1
//			this.setSeq(rstT11Item.getJobBaySeq().equals("0") ? "" : rstT11Item.getJobBaySeq());
//			this.setQueue(rstT11Item.getQueue());
//			
//			this.setmMode(rstT11Item.getmMode());
//			this.setWheeledBlockChk(rstT11Item.getWheeledBlockChk()); //added by JH.Tak (2018.05.30) APL N35-YT-002
//			
//			//added by JH.Tak (2018.05.31) APL N35-YT-004
//			this.setBay(rstT11Item.getBay());
//			this.setRow(rstT11Item.getRow());
//			this.setArea(rstT11Item.getArea());
//			this.setExchangeRequestTime(rstT11Item.getExchangeRequestTime()); //ExchangeRequest Time
//			this.setRefYardJobCode(rstT11Item.getRefYardJobCode()); //Ref Yard Job CD
//			this.setSealNo1(rstT11Item.getSealNo1()); //Seal No1
//			this.setSealNo2(rstT11Item.getSealNo2()); //Seal No2
//			this.setSealNo3(rstT11Item.getSealNo3()); //Seal No3
//			this.setJobState(rstT11Item.getJobState());
//			//added by JH.Tak (2018.07.02)
//			this.setYardJobCode2(rstT11Item.getJobCode2());
//			this.setCfsBlockChk(rstT11Item.getCfsBlockChk());
//			//added by JH.Tak (2018.07.09) 0074591: [YT] No container information on Swap Container screen
//			this.setCntrState(rstT11Item.getCntrState());
//			this.setPtnrCd(rstT11Item.getPtnrCd());
//			this.setStorageCd(rstT11Item.getStorageCd());
//			this.setSocChk(rstT11Item.getSocChk());
//			//added by JH.Tak (2018.08.02) 0084954: [YT] Add Cargo Type indicator
//			this.setPlugChk(rstT11Item.getPlugChk());
//			this.setUnderTallyMode(rstT11Item.getUnderTallyMode()); // added by JH.Tak (2018.10.19) 0086055: [B2B] Enhancement for Position and YT Release
//			this.setTwinCntr(rstT11Item.getTwinCntr()); // added by JH.Tak (2018.11.01)  0086923: [YT] System should not allow the different parking location for CHASSIS twin discharge operation
//			// added by JH.Tak (2019.11.05) 0088411: [B2B Message] Enhancement for Lift On Job
//			this.setT_Block(rstT11Item.getT_Block());
//			this.setT_Bay(rstT11Item.getT_Bay());
//			this.setT_Row(rstT11Item.getT_Row());
//			this.setT_Tier(rstT11Item.getT_Tier());
//			this.setT_Area(rstT11Item.getT_Area());
		} else if (msgObject instanceof RstY11Item) {
			RstY11Item rstY11Item = (RstY11Item)msgObject;

			this.setYardTruckNo(rstY11Item.getYardTruckNo());
			this.setContainerNo(rstY11Item.getContainerNo());
			this.setYardJobCode(rstY11Item.getYardJobCode());
			this.setVesselCode(rstY11Item.getVesselCode());
			this.setCallYear(rstY11Item.getCallYear());
			this.setCallSequence(rstY11Item.getCallSequence());
			this.setUserVoyage(rstY11Item.getUserVoyage());
			this.setChassisNo(rstY11Item.getChassisNo());
			this.setGensetNo(rstY11Item.getGensetNo());
			this.setBlock(rstY11Item.getBlock());
			this.setBay(rstY11Item.getBay());
			this.setBayNo(rstY11Item.getBayNo());
			this.setRow(rstY11Item.getRow());
			this.setRowNo(rstY11Item.getRowNo());
			this.setTier(rstY11Item.getTier());
			this.setApoint(rstY11Item.getApoint());
			this.setSizeType(rstY11Item.getSizeType());
			this.setSizeType2(rstY11Item.getSizeType2());
			this.setDMode(rstY11Item.getDMode());
			this.setDMode2(rstY11Item.getDMode2());
			this.setCargoType(rstY11Item.getCargoType());
			this.setWeight(rstY11Item.getWeight());
			this.setFE(rstY11Item.getFullEmpty());
			this.setRemark(rstY11Item.getRemark());
			this.setOrderTime(rstY11Item.getOrderTime());
			this.setmMode(rstY11Item.getmMode());
			this.setTrailerNo(rstY11Item.getGateHeadNo());
			this.setBay(rstY11Item.getBay());
			this.setRow(rstY11Item.getRow());
			this.setRefYardJobCode(rstY11Item.getRefYardJobCode()); //Ref Yard Job CD
			this.setSealNo1(rstY11Item.getSealNo1()); //Seal No1
			this.setSealNo2(rstY11Item.getSealNo2()); //Seal No2
			this.setSealNo3(rstY11Item.getSealNo3()); //Seal No3
			this.setJobState(rstY11Item.getJobState());
			this.setWheeledBlockChk(rstY11Item.getWheeledBlockChk());
			this.setExchangeRequestTime(rstY11Item.getExchangeRequestTime());//added by JH.Tak (2018.07.09) add ExchangeJobTime
			//added by JH.Tak (2018.07.10)
			this.setPtnrCd(rstY11Item.getPartnerCode());
			this.setStorageCd(rstY11Item.getStorageCode());
			this.setCntrState(rstY11Item.getContainerState());
			//added by JH.Tak (2018.07.17) 0084743: No job appears in ITT In job list
			this.setChassisExchangeChk(rstY11Item.getChassisExchangeChk());
			// added by JH.Tak (2018.12.20) 0087993: [YT PDA] Remarshalling/ITT Operation Enhancement
			this.setPlugChk(rstY11Item.getPlugChk());
			// added by JH.Tak (2019.11.05) 0088411: [B2B Message] Enhancement for Lift On Job
			this.setT_Block(rstY11Item.getToBlock());
			this.setT_Bay(rstY11Item.getToBay());
			this.setT_Row(rstY11Item.getToRow());
			this.setT_Tier(rstY11Item.getToTier());
		} else {
			// nothing to do
		}
	}
}
