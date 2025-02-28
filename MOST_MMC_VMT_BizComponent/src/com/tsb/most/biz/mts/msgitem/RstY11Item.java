package com.tsb.most.biz.mts.msgitem;

import java.util.ArrayList;

import com.tsb.most.biz.constants.MTSConstant;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.util.CToken;

public class RstY11Item extends MsgC3itReceive {
	private String errorCode = CommonConstants.BLANK;
	private String msgHead = CommonConstants.BLANK;
	private String yardCraneNo = CommonConstants.BLANK;
	private String mMode = CommonConstants.BLANK;
	private String containerNo = CommonConstants.BLANK;
    private String yardJobCode = CommonConstants.BLANK;
    private String vesselCode = CommonConstants.BLANK;
    private String callYear = CommonConstants.BLANK;
    private String callSequence = CommonConstants.BLANK;
    private String userVoyage = CommonConstants.BLANK;
    
    private String toVesselCode = CommonConstants.BLANK;
    private String toCallYear = CommonConstants.BLANK;
    private String toCallSequence = CommonConstants.BLANK;
    private String toUserVoyage = CommonConstants.BLANK;
    
    //[GATE_PASS_NO]
    private String gateHeadNo = CommonConstants.BLANK;
    private String gateHeadSequence = CommonConstants.BLANK;
    private String gatePassDate = CommonConstants.BLANK;
    private String gateTruckType = CommonConstants.BLANK;
    
    private String chassisNo = CommonConstants.BLANK;
    private String gensetNo = CommonConstants.BLANK;
    
    //[SEAL_SPECIFIC]
    private String sealSpecific = CommonConstants.BLANK;
    private String sealNo1 = CommonConstants.BLANK;
    private String sealNo2 = CommonConstants.BLANK;
    private String sealNo3 = CommonConstants.BLANK;
    private String sealCheck = CommonConstants.BLANK;
    private String sealType = CommonConstants.BLANK;
    
    //[IC_BLOCK^IC_BAY^IC_ROW^IC_TIER^IC_TIME(YYYYMMDDHHMMSS)^YARD_TIME(YYYYMMDDHHMMSS)^SC_CHK]
    private String icpNo = CommonConstants.BLANK;
    private String icBlock = CommonConstants.BLANK;
    private String icBay = CommonConstants.BLANK;
    private String icRow = CommonConstants.BLANK;
    private String icTier = CommonConstants.BLANK;
    private String icTime = CommonConstants.BLANK;
    private String yardTime = CommonConstants.BLANK;
    private String scCheck = CommonConstants.BLANK;
    
    private String block = CommonConstants.BLANK;
    private String bay = CommonConstants.BLANK;
    private String row = CommonConstants.BLANK;
    private String tier = CommonConstants.BLANK;
    
    private String toBlock = CommonConstants.BLANK;
    private String toBay = CommonConstants.BLANK;
    private String toRow = CommonConstants.BLANK;
    private String toTier = CommonConstants.BLANK;
    
    private String apoint = CommonConstants.BLANK;
    private String toEquipmentNo = CommonConstants.BLANK;
    private String yardTruckNo = CommonConstants.BLANK;
    private String chassisPosition = CommonConstants.BLANK;
    private String sizeType = CommonConstants.BLANK;
    private String sizeType2 = CommonConstants.BLANK;
    private String ixCode = CommonConstants.BLANK;
    private String dMode = CommonConstants.BLANK;
    private String dMode2 = CommonConstants.BLANK;
    
    private String pod = CommonConstants.BLANK;
    private String fpod = CommonConstants.BLANK;
    private String por = CommonConstants.BLANK;
    private String fdest = CommonConstants.BLANK;
    private String fromDepot = CommonConstants.BLANK;
    private String toDepot = CommonConstants.BLANK;
    
    private String cargoType = CommonConstants.BLANK;
    private String commodity = CommonConstants.BLANK;
    
    private String partnerCode = CommonConstants.BLANK;
    private String owner = CommonConstants.BLANK;
    private String consignee = CommonConstants.BLANK;
    private String forwarder = CommonConstants.BLANK;
    private String weight = CommonConstants.BLANK;
    private String fullEmpty = CommonConstants.BLANK;
    private String deliveryCode = CommonConstants.BLANK;
    private String wdCheck = CommonConstants.BLANK;
    private String containerState = CommonConstants.BLANK;
    
    private String groupNo = CommonConstants.BLANK;
    private String orderNo = CommonConstants.BLANK;
    private String queueName = CommonConstants.BLANK;
    private String planTime = CommonConstants.BLANK;
    private String storageCode = CommonConstants.BLANK;
    private String tagNo = CommonConstants.BLANK;	
    private String tagNo2 = CommonConstants.BLANK;
    private String groupCode = CommonConstants.BLANK;
    private String jobOrderNo = CommonConstants.BLANK;
    private String doorDir = CommonConstants.BLANK;
    private String shiftSeq = CommonConstants.BLANK;
    private String xLayInspection = CommonConstants.BLANK;
    private String wheelDeckCheck = CommonConstants.BLANK;
    private String damageCondition = CommonConstants.BLANK;
    private String containerCondition = CommonConstants.BLANK;
    
    private String shipBay = CommonConstants.BLANK;
    private String shipRow = CommonConstants.BLANK;
    private String shipTier = CommonConstants.BLANK;
    
    private String checkField = CommonConstants.BLANK;
    private String reeferCheck = CommonConstants.BLANK;
    private String damageCheck = CommonConstants.BLANK;
    private String overDimensitionCheck = CommonConstants.BLANK;
    private String rehandleCode = CommonConstants.BLANK;
    private String handleInstruction = CommonConstants.BLANK;
    private String dumyCheck = CommonConstants.BLANK;
    private String priority = CommonConstants.BLANK;
    private String unplugInstruction = CommonConstants.BLANK;
    private String yardHandleInstruction = CommonConstants.BLANK;
    private String fDeckCheck = CommonConstants.BLANK;
    private String emptyCheck = CommonConstants.BLANK;
    private String domesticChkeck = CommonConstants.BLANK;
    private String eGearChkeck = CommonConstants.BLANK;
    private String acceptCheck = CommonConstants.BLANK;
    
    private String inLane = CommonConstants.BLANK;
    private String outLane = CommonConstants.BLANK;
    
    private String setTemp = CommonConstants.BLANK;
    private String imdg = CommonConstants.BLANK;
    private String unno = CommonConstants.BLANK;
    private String fireCode = CommonConstants.BLANK;
    private String overHeight = CommonConstants.BLANK;
    private String overFore = CommonConstants.BLANK;
    private String overAft = CommonConstants.BLANK;
    private String overPort = CommonConstants.BLANK;
    private String overStbd = CommonConstants.BLANK;
    
    private String bookNo = CommonConstants.BLANK;
    private String shipBaySequence = CommonConstants.BLANK;
    private String shipHatchSequence = CommonConstants.BLANK;
    private String refContainerNo = CommonConstants.BLANK;
    private String refYardJobCode = CommonConstants.BLANK;
    private String jobState = CommonConstants.BLANK;
    private String yardEquipmentNo = CommonConstants.BLANK;
    private String preKey = CommonConstants.BLANK;
    private String isActivate = CommonConstants.BLANK;
    private String isYardTruckArrival = CommonConstants.BLANK;
    private String twinContainerNo = CommonConstants.BLANK;
    private String isYardTwin = CommonConstants.BLANK;
    private String orderTime = CommonConstants.BLANK;
    private String dispatchEquipmentTime = CommonConstants.BLANK;
    //added by JH.Tak (2018.06.04) APL N35-YT-006
    private boolean isSubItem = false;
    private String remark = CommonConstants.BLANK;
    private String bayNo =  CommonConstants.BLANK;
    private String rowNo =  CommonConstants.BLANK;
    private String wheeledBlockChk = CommonConstants.BLANK;
    //added by JH.Tak (2018.07.09) add ExchangeJobTime
    private String exchangeRequestTime = CommonConstants.BLANK;
    private String socChk = CommonConstants.BLANK;
    //added by JH.Tak (2018.07.17) 0084743: No job appears in ITT In job list
    private String chassisExchangeChk =  CommonConstants.BLANK;
	private int tokenArrayIndex = 0;
	private String plugChk = CommonConstants.BLANK; // added by JH.Tak (2018.12.20) 0087993: [YT PDA] Remarshalling/ITT Operation Enhancement
	
	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getMsgHead() {
		return msgHead;
	}

	public void setMsgHead(String msgHead) {
		this.msgHead = msgHead;
	}

	public String getYardCraneNo() {
		return yardCraneNo;
	}

	public void setYardCraneNo(String yardCraneNo) {
		this.yardCraneNo = yardCraneNo;
	}

	public String getmMode() {
		return mMode;
	}

	public void setmMode(String mMode) {
		this.mMode = mMode;
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

	public String getToVesselCode() {
		return toVesselCode;
	}

	public void setToVesselCode(String toVesselCode) {
		this.toVesselCode = toVesselCode;
	}

	public String getToCallYear() {
		return toCallYear;
	}

	public void setToCallYear(String toCallYear) {
		this.toCallYear = toCallYear;
	}

	public String getToCallSequence() {
		return toCallSequence;
	}

	public void setToCallSequence(String toCallSequence) {
		this.toCallSequence = toCallSequence;
	}

	public String getToUserVoyage() {
		return toUserVoyage;
	}

	public void setToUserVoyage(String toUserVoyage) {
		this.toUserVoyage = toUserVoyage;
	}

	public String getGateHeadNo() {
		return gateHeadNo;
	}

	public void setGateHeadNo(String gateHeadNo) {
		this.gateHeadNo = gateHeadNo;
	}

	public String getGateHeadSequence() {
		return gateHeadSequence;
	}

	public void setGateHeadSequence(String gateHeadSequence) {
		this.gateHeadSequence = gateHeadSequence;
	}

	public String getGatePassDate() {
		return gatePassDate;
	}

	public void setGatePassDate(String gatePassDate) {
		this.gatePassDate = gatePassDate;
	}

	public String getGateTruckType() {
		return gateTruckType;
	}

	public void setGateTruckType(String gateTruckType) {
		this.gateTruckType = gateTruckType;
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

	public String getSealSpecific() {
		return sealSpecific;
	}

	public void setSealSpecific(String sealSpecific) {
		this.sealSpecific = sealSpecific;
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

	public String getSealCheck() {
		return sealCheck;
	}

	public void setSealCheck(String sealCheck) {
		this.sealCheck = sealCheck;
	}

	public String getSealType() {
		return sealType;
	}

	public void setSealType(String sealType) {
		this.sealType = sealType;
	}

	public String getIcpNo() {
		return icpNo;
	}

	public void setIcpNo(String icpNo) {
		this.icpNo = icpNo;
	}

	public String getIcBlock() {
		return icBlock;
	}

	public void setIcBlock(String icBlock) {
		this.icBlock = icBlock;
	}

	public String getIcBay() {
		return icBay;
	}

	public void setIcBay(String icBay) {
		this.icBay = icBay;
	}

	public String getIcRow() {
		return icRow;
	}

	public void setIcRow(String icRow) {
		this.icRow = icRow;
	}

	public String getIcTier() {
		return icTier;
	}

	public void setIcTier(String icTier) {
		this.icTier = icTier;
	}

	public String getIcTime() {
		return icTime;
	}

	public void setIcTime(String icTime) {
		this.icTime = icTime;
	}

	public String getYardTime() {
		return yardTime;
	}

	public void setYardTime(String yardTime) {
		this.yardTime = yardTime;
	}

	public String getScCheck() {
		return scCheck;
	}

	public void setScCheck(String scCheck) {
		this.scCheck = scCheck;
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

	public String getToBlock() {
		return toBlock;
	}

	public void setToBlock(String toBlock) {
		this.toBlock = toBlock;
	}

	public String getToBay() {
		return toBay;
	}

	public void setToBay(String toBay) {
		this.toBay = toBay;
	}

	public String getToRow() {
		return toRow;
	}

	public void setToRow(String toRow) {
		this.toRow = toRow;
	}

	public String getToTier() {
		return toTier;
	}

	public void setToTier(String toTier) {
		this.toTier = toTier;
	}

	public String getApoint() {
		return apoint;
	}

	public void setApoint(String apoint) {
		this.apoint = apoint;
	}

	public String getToEquipmentNo() {
		return toEquipmentNo;
	}

	public void setToEquipmentNo(String toEquipmentNo) {
		this.toEquipmentNo = toEquipmentNo;
	}

	public String getYardTruckNo() {
		return yardTruckNo;
	}

	public void setYardTruckNo(String yardTruckNo) {
		this.yardTruckNo = yardTruckNo;
	}

	public String getChassisPosition() {
		return chassisPosition;
	}

	public void setChassisPosition(String chassisPosition) {
		this.chassisPosition = chassisPosition;
	}

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

	public String getIxCode() {
		return ixCode;
	}

	public void setIxCode(String ixCode) {
		this.ixCode = ixCode;
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

	public String getPod() {
		return pod;
	}

	public void setPod(String pod) {
		this.pod = pod;
	}

	public String getFpod() {
		return fpod;
	}

	public void setFpod(String fpod) {
		this.fpod = fpod;
	}

	public String getPor() {
		return por;
	}

	public void setPor(String por) {
		this.por = por;
	}

	public String getFdest() {
		return fdest;
	}

	public void setFdest(String fdest) {
		this.fdest = fdest;
	}

	public String getFromDepot() {
		return fromDepot;
	}

	public void setFromDepot(String fromDepot) {
		this.fromDepot = fromDepot;
	}

	public String getToDepot() {
		return toDepot;
	}

	public void setToDepot(String toDepot) {
		this.toDepot = toDepot;
	}

	public String getCargoType() {
		return cargoType;
	}

	public void setCargoType(String cargoType) {
		this.cargoType = cargoType;
	}

	public String getCommodity() {
		return commodity;
	}

	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}

	public String getPartnerCode() {
		return partnerCode;
	}

	public void setPartnerCode(String partnerCode) {
		this.partnerCode = partnerCode;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getConsignee() {
		return consignee;
	}

	public void setConsignee(String consignee) {
		this.consignee = consignee;
	}

	public String getForwarder() {
		return forwarder;
	}

	public void setForwarder(String forwarder) {
		this.forwarder = forwarder;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}

	public String getFullEmpty() {
		return fullEmpty;
	}

	public void setFullEmpty(String fullEmpty) {
		this.fullEmpty = fullEmpty;
	}

	public String getDeliveryCode() {
		return deliveryCode;
	}

	public void setDeliveryCode(String deliveryCode) {
		this.deliveryCode = deliveryCode;
	}

	public String getWdCheck() {
		return wdCheck;
	}

	public void setWdCheck(String wdCheck) {
		this.wdCheck = wdCheck;
	}

	public String getContainerState() {
		return containerState;
	}

	public void setContainerState(String containerState) {
		this.containerState = containerState;
	}

	public String getGroupNo() {
		return groupNo;
	}

	public void setGroupNo(String groupNo) {
		this.groupNo = groupNo;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getDoorDir() {
		return doorDir;
	}

	public void setDoorDir(String doorDir) {
		this.doorDir = doorDir;
	}

	public String getShiftSeq() {
		return shiftSeq;
	}

	public void setShiftSeq(String shiftSeq) {
		this.shiftSeq = shiftSeq;
	}

	public String getxLayInspection() {
		return xLayInspection;
	}

	public void setxLayInspection(String xLayInspection) {
		this.xLayInspection = xLayInspection;
	}

	public String getQueueName() {
		return queueName;
	}

	public void setQueueName(String queueName) {
		this.queueName = queueName;
	}

	public String getPlanTime() {
		return planTime;
	}

	public void setPlanTime(String planTime) {
		this.planTime = planTime;
	}

	public String getStorageCode() {
		return storageCode;
	}

	public void setStorageCode(String storageCode) {
		this.storageCode = storageCode;
	}

	public String getTagNo() {
		return tagNo;
	}

	public void setTagNo(String tagNo) {
		this.tagNo = tagNo;
	}

	public String getTagNo2() {
		return tagNo2;
	}

	public void setTagNo2(String tagNo2) {
		this.tagNo2 = tagNo2;
	}

	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	public String getJobOrderNo() {
		return jobOrderNo;
	}

	public void setJobOrderNo(String jobOrderNo) {
		this.jobOrderNo = jobOrderNo;
	}

	public String getWheelDeckCheck() {
		return wheelDeckCheck;
	}

	public void setWheelDeckCheck(String wheelDeckCheck) {
		this.wheelDeckCheck = wheelDeckCheck;
	}

	public String getDamageCondition() {
		return damageCondition;
	}

	public void setDamageCondition(String damageCondition) {
		this.damageCondition = damageCondition;
	}

	public String getContainerCondition() {
		return containerCondition;
	}

	public void setContainerCondition(String containerCondition) {
		this.containerCondition = containerCondition;
	}

	public String getShipBay() {
		return shipBay;
	}

	public void setShipBay(String shipBay) {
		this.shipBay = shipBay;
	}

	public String getShipRow() {
		return shipRow;
	}

	public void setShipRow(String shipRow) {
		this.shipRow = shipRow;
	}

	public String getShipTier() {
		return shipTier;
	}

	public void setShipTier(String shipTier) {
		this.shipTier = shipTier;
	}

	public String getCheckField() {
		return checkField;
	}

	public void setCheckField(String checkField) {
		this.checkField = checkField;
	}

	public String getReeferCheck() {
		return reeferCheck;
	}

	public void setReeferCheck(String reeferCheck) {
		this.reeferCheck = reeferCheck;
	}

	public String getDamageCheck() {
		return damageCheck;
	}

	public void setDamageCheck(String damageCheck) {
		this.damageCheck = damageCheck;
	}

	public String getOverDimensitionCheck() {
		return overDimensitionCheck;
	}

	public void setOverDimensitionCheck(String overDimensitionCheck) {
		this.overDimensitionCheck = overDimensitionCheck;
	}

	public String getRehandleCode() {
		return rehandleCode;
	}

	public void setRehandleCode(String rehandleCode) {
		this.rehandleCode = rehandleCode;
	}

	public String getHandleInstruction() {
		return handleInstruction;
	}

	public void setHandleInstruction(String handleInstruction) {
		this.handleInstruction = handleInstruction;
	}

	public String getDumyCheck() {
		return dumyCheck;
	}

	public void setDumyCheck(String dumyCheck) {
		this.dumyCheck = dumyCheck;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getUnplugInstruction() {
		return unplugInstruction;
	}

	public void setUnplugInstruction(String unplugInstruction) {
		this.unplugInstruction = unplugInstruction;
	}

	public String getYardHandleInstruction() {
		return yardHandleInstruction;
	}

	public void setYardHandleInstruction(String yardHandleInstruction) {
		this.yardHandleInstruction = yardHandleInstruction;
	}

	public String getfDeckCheck() {
		return fDeckCheck;
	}

	public void setfDeckCheck(String fDeckCheck) {
		this.fDeckCheck = fDeckCheck;
	}

	public String getEmptyCheck() {
		return emptyCheck;
	}

	public void setEmptyCheck(String emptyCheck) {
		this.emptyCheck = emptyCheck;
	}

	public String getDomesticChkeck() {
		return domesticChkeck;
	}

	public void setDomesticChkeck(String domesticChkeck) {
		this.domesticChkeck = domesticChkeck;
	}

	public String geteGearChkeck() {
		return eGearChkeck;
	}

	public void seteGearChkeck(String eGearChkeck) {
		this.eGearChkeck = eGearChkeck;
	}

	public String getAcceptCheck() {
		return acceptCheck;
	}

	public void setAcceptCheck(String acceptCheck) {
		this.acceptCheck = acceptCheck;
	}

	public String getInLane() {
		return inLane;
	}

	public void setInLane(String inLane) {
		this.inLane = inLane;
	}

	public String getOutLane() {
		return outLane;
	}

	public void setOutLane(String outLane) {
		this.outLane = outLane;
	}

	public String getSetTemp() {
		return setTemp;
	}

	public void setSetTemp(String setTemp) {
		this.setTemp = setTemp;
	}

	public String getImdg() {
		return imdg;
	}

	public void setImdg(String imdg) {
		this.imdg = imdg;
	}

	public String getUnno() {
		return unno;
	}

	public void setUnno(String unno) {
		this.unno = unno;
	}

	public String getFireCode() {
		return fireCode;
	}

	public void setFireCode(String fireCode) {
		this.fireCode = fireCode;
	}

	public String getOverHeight() {
		return overHeight;
	}

	public void setOverHeight(String overHeight) {
		this.overHeight = overHeight;
	}

	public String getOverFore() {
		return overFore;
	}

	public void setOverFore(String overFore) {
		this.overFore = overFore;
	}

	public String getOverAft() {
		return overAft;
	}

	public void setOverAft(String overAft) {
		this.overAft = overAft;
	}

	public String getOverPort() {
		return overPort;
	}

	public void setOverPort(String overPort) {
		this.overPort = overPort;
	}

	public String getOverStbd() {
		return overStbd;
	}

	public void setOverStbd(String overStbd) {
		this.overStbd = overStbd;
	}

	public String getBookNo() {
		return bookNo;
	}

	public void setBookNo(String bookNo) {
		this.bookNo = bookNo;
	}

	public String getShipBaySequence() {
		return shipBaySequence;
	}

	public void setShipBaySequence(String shipBaySequence) {
		this.shipBaySequence = shipBaySequence;
	}

	public String getShipHatchSequence() {
		return shipHatchSequence;
	}

	public void setShipHatchSequence(String shipHatchSequence) {
		this.shipHatchSequence = shipHatchSequence;
	}

	public String getRefContainerNo() {
		return refContainerNo;
	}

	public void setRefContainerNo(String refContainerNo) {
		this.refContainerNo = refContainerNo;
	}

	public String getRefYardJobCode() {
		return refYardJobCode;
	}

	public void setRefYardJobCode(String refYardJobCode) {
		this.refYardJobCode = refYardJobCode;
	}

	public String getJobState() {
		return jobState;
	}

	public void setJobState(String jobState) {
		this.jobState = jobState;
	}

	public String getYardEquipmentNo() {
		return yardEquipmentNo;
	}

	public void setYardEquipmentNo(String yardEquipmentNo) {
		this.yardEquipmentNo = yardEquipmentNo;
	}

	public String getPreKey() {
		return preKey;
	}

	public void setPreKey(String preKey) {
		this.preKey = preKey;
	}

	public String getIsActivate() {
		return isActivate;
	}

	public void setIsActivate(String isActivate) {
		this.isActivate = isActivate;
	}

	public String getIsYardTruckArrival() {
		return isYardTruckArrival;
	}

	public void setIsYardTruckArrival(String isYardTruckArrival) {
		this.isYardTruckArrival = isYardTruckArrival;
	}

	public String getTwinContainerNo() {
		return twinContainerNo;
	}

	public void setTwinContainerNo(String twinContainerNo) {
		this.twinContainerNo = twinContainerNo;
	}

	public String getIsYardTwin() {
		return isYardTwin;
	}

	public void setIsYardTwin(String isYardTwin) {
		this.isYardTwin = isYardTwin;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public String getDispatchEquipmentTime() {
		return dispatchEquipmentTime;
	}

	public void setDispatchEquipmentTime(String dispatchEquipmentTime) {
		this.dispatchEquipmentTime = dispatchEquipmentTime;
	}
    
    public boolean isSubItem() {
		return isSubItem;
	}

	public void setSubItem(boolean isSubItem) {
		this.isSubItem = isSubItem;
	}
	
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public String getWheeledBlockChk() {
		return wheeledBlockChk;
	}

	public void setWheeledBlockChk(String wheeledBlockChk) {
		this.wheeledBlockChk = wheeledBlockChk;
	}

	public String getExchangeRequestTime() {
		return exchangeRequestTime;
	}

	public void setExchangeRequestTime(String exchangeRequestTime) {
		this.exchangeRequestTime = exchangeRequestTime;
	}
	
	public String getSocChk() {
		return socChk;
	}

	public void setSocChk(String socChk) {
		this.socChk = socChk;
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

	@Override
	public void setMessageBody(ArrayList<String> tokenLists) throws Exception {
		String tempString = CommonConstants.BLANK;
		tokenArrayIndex = 0;
		if(isSubItem() == false) {
			this.setMsgHead(tokenLists.get(tokenArrayIndex++));
			tokenLists.get(tokenArrayIndex++); // equipment no
			this.setmMode(tokenLists.get(tokenArrayIndex++));
		}
		
		this.setContainerNo(tokenLists.get(tokenArrayIndex++));
		this.setYardJobCode(tokenLists.get(tokenArrayIndex++));
		this.setVesselCode(tokenLists.get(tokenArrayIndex++));
		this.setCallYear(tokenLists.get(tokenArrayIndex++));
		this.setCallSequence(tokenLists.get(tokenArrayIndex++));
		this.setUserVoyage(tokenLists.get(tokenArrayIndex++));
		this.setToVesselCode(tokenLists.get(tokenArrayIndex++));
		this.setToCallYear(tokenLists.get(tokenArrayIndex++));
		this.setToCallSequence(tokenLists.get(tokenArrayIndex++));
		this.setToUserVoyage(tokenLists.get(tokenArrayIndex++));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setGateHeadNo(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setGateHeadSequence(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setGatePassDate(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setGateTruckType(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setChassisNo(tokenLists.get(tokenArrayIndex++));
		this.setGensetNo(tokenLists.get(tokenArrayIndex++));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setSealSpecific(tempString);
		this.setSealNo1(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSealNo2(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSealNo3(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSealCheck(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSealType(CToken.getIndexToken(tempString, 5, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setIcpNo(tempString);
		this.setIcBlock(CToken.getIndexToken(tempString, 1, MTSConstant.CHAR_DTL_CARET));
		this.setIcBay(CToken.getIndexToken(tempString, 2, MTSConstant.CHAR_DTL_CARET));
		this.setIcRow(CToken.getIndexToken(tempString, 3, MTSConstant.CHAR_DTL_CARET));
		this.setIcTier(CToken.getIndexToken(tempString, 4, MTSConstant.CHAR_DTL_CARET));
		this.setIcTime(CToken.getIndexToken(tempString, 5, MTSConstant.CHAR_DTL_CARET));
		this.setYardTime(CToken.getIndexToken(tempString, 6, MTSConstant.CHAR_DTL_CARET));
		this.setScCheck(CToken.getIndexToken(tempString, 7, MTSConstant.CHAR_DTL_CARET));
		
		this.setBlock(tokenLists.get(tokenArrayIndex++));
		this.setBay(tokenLists.get(tokenArrayIndex++));
		this.setRow(tokenLists.get(tokenArrayIndex++));
		this.setTier(tokenLists.get(tokenArrayIndex++));
		this.setToBlock(tokenLists.get(tokenArrayIndex++));
		this.setToBay(tokenLists.get(tokenArrayIndex++));
		this.setToRow(tokenLists.get(tokenArrayIndex++));
		this.setToTier(tokenLists.get(tokenArrayIndex++));
		this.setApoint(tokenLists.get(tokenArrayIndex++));
		this.setToEquipmentNo(tokenLists.get(tokenArrayIndex++));
		this.setYardTruckNo(tokenLists.get(tokenArrayIndex++));
		this.setChassisPosition(tokenLists.get(tokenArrayIndex++));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setSizeType(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSizeType2(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		
		this.setIxCode(tokenLists.get(tokenArrayIndex++));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setDMode(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDMode2(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setPod(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setFpod(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setPor(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setFdest(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setFromDepot(CToken.getIndexToken(tempString, 5, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setToDepot(CToken.getIndexToken(tempString, 6, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setCargoType(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setCommodity(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setPartnerCode(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOwner(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setConsignee(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setForwarder(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		
		this.setWeight(tokenLists.get(tokenArrayIndex++));
		this.setFullEmpty(tokenLists.get(tokenArrayIndex++));
		this.setDeliveryCode(tokenLists.get(tokenArrayIndex++));
		this.setContainerState(tokenLists.get(tokenArrayIndex++));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setGroupNo(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOrderNo(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setQueueName(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setPlanTime(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setStorageCode(CToken.getIndexToken(tempString, 5, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setTagNo(CToken.getIndexToken(tempString, 6, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setTagNo2(CToken.getIndexToken(tempString, 7, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setShiftSeq(CToken.getIndexToken(tempString, 11, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setxLayInspection(CToken.getIndexToken(tempString, 12, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDoorDir(CToken.getIndexToken(tempString, 18, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setGroupCode(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setJobOrderNo(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setWheelDeckCheck(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDamageCondition(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setShipBay(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setShipRow(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setShipTier(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setReeferCheck(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDamageCheck(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOverDimensitionCheck(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setRehandleCode(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setHandleInstruction(CToken.getIndexToken(tempString, 5, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDumyCheck(CToken.getIndexToken(tempString, 6, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setPriority(CToken.getIndexToken(tempString, 7, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setUnplugInstruction(CToken.getIndexToken(tempString, 8, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setYardHandleInstruction(CToken.getIndexToken(tempString, 9, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setfDeckCheck(CToken.getIndexToken(tempString, 10, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setEmptyCheck(CToken.getIndexToken(tempString, 11, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDomesticChkeck(CToken.getIndexToken(tempString, 12, MTSConstant.MSG_SEPERATOR_PLUS));
		this.seteGearChkeck(CToken.getIndexToken(tempString, 13, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setAcceptCheck(CToken.getIndexToken(tempString, 14, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setInLane(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOutLane(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setCheckField(tempString);
		this.setSetTemp(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setImdg(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setUnno(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setFireCode(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOverFore(CToken.getIndexToken(tempString, 5, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOverAft(CToken.getIndexToken(tempString, 6, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOverStbd(CToken.getIndexToken(tempString, 7, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOverPort(CToken.getIndexToken(tempString, 8, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setBookNo(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setShipBaySequence(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setShipHatchSequence(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setRefContainerNo(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setRefYardJobCode(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setJobState(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setYardEquipmentNo(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setPreKey(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setIsActivate(CToken.getIndexToken(tempString, 5, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setIsYardTruckArrival(CToken.getIndexToken(tempString, 6, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setTwinContainerNo(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setIsYardTwin(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		
		tempString = tokenLists.get(tokenArrayIndex++);
		this.setOrderTime(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDispatchEquipmentTime(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		//added by JH.Tak (2018.06.05) APL N35-YT-006
		this.setBayNo(CToken.getIndexToken(tempString, 7, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setRowNo(CToken.getIndexToken(tempString, 8, MTSConstant.MSG_SEPERATOR_PLUS));
		//added by JH.Tak (2018.06.08) APL N35-YT-006
		this.setWheeledBlockChk(CToken.getIndexToken(tempString, 9, MTSConstant.MSG_SEPERATOR_PLUS));
		//added by JH.Tak (2018.07.09) add ExchangeJobTime
		this.setExchangeRequestTime(CToken.getIndexToken(tempString, 10, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSocChk(CToken.getIndexToken(tempString, 11, MTSConstant.MSG_SEPERATOR_PLUS));//added by JH.Tak (2018.07.10) 0074591: [YT] No container information on Swap Container screen
		this.setChassisExchangeChk(CToken.getIndexToken(tempString, 12, MTSConstant.MSG_SEPERATOR_PLUS)); //added by JH.Tak (2018.07.17) 0084743: No job appears in ITT In job list
		this.setPlugChk(CToken.getIndexToken(tempString, 14, MTSConstant.MSG_SEPERATOR_PLUS)); // added by JH.Tak (2018.12.20) 0087993: [YT PDA] Remarshalling/ITT Operation Enhancement
	}
	
	//added by JH.Tak (2018.06.05) APL N35-YT-006
	public ArrayList<String> setList2Message(ArrayList<String> tokenLists) throws Exception {
		// return remained list

		setMessageBody(tokenLists);
		tokenLists.subList(0, tokenArrayIndex).clear();

		return tokenLists;
	}
}
