/**
* RstT11Item.java
*
* Created on   : 2014-01-22
* Target OS    : Java VM 1.7.0
* CVS revision : $Revision: 1.1 $
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION
* 2014-01-22     jaeok 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.mts.msgitem;

import java.util.ArrayList;

import com.tsb.most.biz.constants.MTSConstant;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.util.CToken;


public class RstT11Item extends MsgC3itReceive {

	private String mMode = CommonConstants.BLANK;
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
    private String cTargetPosition = CommonConstants.BLANK;   //added by Rackhyun Jeong (2016.09.08) - 0054366: [YT] Show broken position
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

    private int tokenArrayIndex = 0;
    private boolean isSubItem = false;

    private String rtSideInfo = CommonConstants.BLANK;	// added by Chun (2017.01.18) : HMTS UP = TM-002
    
    private String ptnrCd = CommonConstants.BLANK; // added by JH.Tak (2018.11.29) ADD PrivateSztp
    private String twinCntrNo = CommonConstants.BLANK; // added by JH.Tak (2018.12.18) Display twin info
    private String sHoldDeck = CommonConstants.BLANK; // added by YoungOk Kim (2019.02.25) - for GWCT
    private String sSbay = CommonConstants.BLANK;
    private String sSrow = CommonConstants.BLANK;
    private String sStier = CommonConstants.BLANK;
    private String ytNotification = CommonConstants.BLANK; // added by YoungOk Kim (2019.04.25) - Mantis 89478: [Tally] YT로 메시지 전송 기능
    private String qcLane = CommonConstants.BLANK; // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
    private String queueName = CommonConstants.BLANK; // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능 
    private String jobState = CommonConstants.BLANK; // added by BE.Ahn (2019.08.22) Mantis GWCT 0092638 [YT] Lift Off
    private String hatchIndex = CommonConstants.BLANK; // added By BE.Ahn (2019. 11. 28) Mantis 0103575: [YT] 해치 번호 / 덱/홀드 표시
    private String inspectCheck = CommonConstants.BLANK; // added by YoungOk Kim (2020.02.12) - Mantis 105063: [YT] 위험물 및 검역 작업에 색상으로 테두리 표시하여 구분
    private String truckBlockInTime = CommonConstants.BLANK; // 블록 진입 시간
    private String ytYArrivalTime = CommonConstants.BLANK; // 장비 밑 도착 시간
    private String ytArrivalTime = CommonConstants.BLANK; // Quay 도착 시간 // added by jaeok (2021.01.11) Mantis 0112149: 양하작업 YT 도착 기능 확인
    private String doorDir = CommonConstants.BLANK; // added by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B4
    private String coneAttached = CommonConstants.BLANK; // // added by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B3
    private String atcJobStatus = CommonConstants.BLANK;
    
    //RBT. 2024
    private String docNo = CommonConstants.BLANK; //BLSN
    private String berthCd = CommonConstants.BLANK;
    private String whId = CommonConstants.BLANK;
    private String vslNm = CommonConstants.BLANK;
    private String statusDesc = CommonConstants.BLANK;
    
    public String getBerthCd() {
		return berthCd;
	}

	public void setBerthCd(String berthCd) {
		this.berthCd = berthCd;
	}

	public String getWhId() {
		return whId;
	}

	public void setWhId(String whId) {
		this.whId = whId;
	}

    public String getmMode() {
		return mMode;
	}

	public void setmMode(String mMode) {
		this.mMode = mMode;
	}

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

	//< Added by Rackhyun Jeong (2016.09.08) - 0054366: [YT] Show broken position
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

	public String getRtSideInfo() {
		return rtSideInfo;
	}

	public void setRtSideInfo(String rtSideInfo) {
		this.rtSideInfo = rtSideInfo;
	}

	public boolean isSubItem() {
		return isSubItem;
	}

	public void setSubItem(boolean isSubItem) {
		this.isSubItem = isSubItem;
	}

	public ArrayList<String> setList2Message(ArrayList<String> tokenLists) throws Exception {
		// return remained list

		setMessageBody(tokenLists);
		tokenLists.subList(0, tokenArrayIndex).clear();

		return tokenLists;
	}

	
	public String getPtnrCd() {
		return ptnrCd;
	}

	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}

	public String getTwinCntrNo() {
		return twinCntrNo;
	}

	public void setTwinCntrNo(String twinCntrNo) {
		this.twinCntrNo = twinCntrNo;
	}

	public String getSHoldDeck() {
		return sHoldDeck;
	}

	public void setSHoldDeck(String sHoldDeck) {
		this.sHoldDeck = sHoldDeck;
	}

	public String getYtNotification() {
		return ytNotification;
	}

	public void setYtNotification(String ytNotification) {
		this.ytNotification = ytNotification;
	}
	
	public String getQcLane() {
		return qcLane;
	}

	public void setQcLane(String qcLane) {
		this.qcLane = qcLane;
	}

	public String getQueueName() {
		return queueName;
	}

	public void setQueueName(String queueName) {
		this.queueName = queueName;
	}
	
	public String getJobState() {
		return jobState;
	}

	public void setJobState(String jobState) {
		this.jobState = jobState;
	}

	public String getHatchIndex() {
		return hatchIndex;
	}

	public void setHatchIndex(String hatchIndex) {
		this.hatchIndex = hatchIndex;
	}

	public String getInspectCheck() {
		return inspectCheck;
	}

	public void setInspectCheck(String inspectCheck) {
		this.inspectCheck = inspectCheck;
	}

	public String getTruckBlockInTime() {
		return truckBlockInTime;
	}

	public void setTruckBlockInTime(String truckBlockInTime) {
		this.truckBlockInTime = truckBlockInTime;
	}

	public String getYtYArrivalTime() {
		return ytYArrivalTime;
	}

	public void setYtYArrivalTime(String ytYArrivalTime) {
		this.ytYArrivalTime = ytYArrivalTime;
	}

	public String getDoorDir() {
		return doorDir;
	}

	public void setDoorDir(String doorDir) {
		this.doorDir = doorDir;
	}

	public String getConeAttached() {
		return coneAttached;
	}

	public void setConeAttached(String coneAttached) {
		this.coneAttached = coneAttached;
	}
	
	public String getAtcJobStatus() {
		return atcJobStatus;
	}

	public void setAtcJobStatus(String atcJobStatus) {
		this.atcJobStatus = atcJobStatus;
	}

	public String getYtArrivalTime() {
		return ytArrivalTime;
	}

	public void setYtArrivalTime(String ytArrivalTime) {
		this.ytArrivalTime = ytArrivalTime;
	}

	public String getSBay() {
		return sSbay;
	}

	public String getSRow() {
		return sSrow;
	}

	public String getSTier() {
		return sStier;
	}

	public void setSBay(String sSbay) {
		this.sSbay = sSbay;
	}

	public void setSRow(String sSrow) {
		this.sSrow = sSrow;
	}

	public void setSTier(String sStier) {
		this.sStier = sStier;
	}

	@Override
	protected void setMessageBody(ArrayList<String> tokenLists) throws Exception {
		String tempString = CommonConstants.BLANK;
		tokenArrayIndex = 0;

		if (isSubItem() == false) {
		    tokenArrayIndex++; //head
			this.setYardTruckNo(tokenLists.get(tokenArrayIndex++));
			this.setmMode(tokenLists.get(tokenArrayIndex++));
		}

		//RBT. comment this.setContainerNo(tokenLists.get(tokenArrayIndex++));
		this.setVslNm(tokenLists.get(tokenArrayIndex++));		
		this.setYardJobCode(tokenLists.get(tokenArrayIndex++));
		this.setVesselCode(tokenLists.get(tokenArrayIndex++));
		this.setCallYear(tokenLists.get(tokenArrayIndex++));
		this.setCallSequence(tokenLists.get(tokenArrayIndex++));
		this.setUserVoyage(tokenLists.get(tokenArrayIndex++));
		
		//RBT. 2024 added:
		this.setDocNo(tokenLists.get(tokenArrayIndex++));
		this.setBerthCd(tokenLists.get(tokenArrayIndex++));
		this.setWhId(tokenLists.get(tokenArrayIndex++));
		//End RBT add.
		
		this.setChassisNo(tokenLists.get(tokenArrayIndex++));
		this.setGensetNo(tokenLists.get(tokenArrayIndex++));
		this.setBlock(tokenLists.get(tokenArrayIndex++));
		this.setBay(tokenLists.get(tokenArrayIndex++));
		this.setRow(tokenLists.get(tokenArrayIndex++));
		this.setTier(tokenLists.get(tokenArrayIndex++));
		this.setApoint(tokenLists.get(tokenArrayIndex++));
		this.setTEquipmentType(tokenLists.get(tokenArrayIndex++));
		this.setTEquipmentNo(tokenLists.get(tokenArrayIndex++));
		this.setCPosition(tokenLists.get(tokenArrayIndex++));

		tempString = tokenLists.get(tokenArrayIndex++);
		this.setSizeType(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSizeType2(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));

		this.setIXCode(tokenLists.get(tokenArrayIndex++));

		tempString = tokenLists.get(tokenArrayIndex++);
		this.setDMode(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setDMode2(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));

		// modified by Rackhyun Jeong (2016.09.08) - 0054366: [YT] Show broken position
		//this.setCargoType(tokenLists.get(tokenArrayIndex++));
		tempString = tokenLists.get(tokenArrayIndex++);  //POD+FPOD+POR_FDEST
		tempString = tokenLists.get(tokenArrayIndex++);  //CARGO_TYPE+COMMODITY

		this.setCargoType(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		tempString = tokenLists.get(tokenArrayIndex++);  //PTNR_CD+OWNER
		
		this.setPtnrCd(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		//>

		this.setWeight(tokenLists.get(tokenArrayIndex++));
		this.setFE(tokenLists.get(tokenArrayIndex++));
		this.setDelv(tokenLists.get(tokenArrayIndex++));
		this.setWDCheck(tokenLists.get(tokenArrayIndex++));

		//< modified by Rackhyun Jeong (2016.09.08) -  0054366: [YT] Show broken position
		//this.setYTStatus(tokenLists.get(tokenArrayIndex++));
		tempString = tokenLists.get(tokenArrayIndex++);  //reserved
		tempString = tokenLists.get(tokenArrayIndex++);  //CHECK_FIELD
		tempString = tokenLists.get(tokenArrayIndex++);  //SET_TEMP+IMDG+UNNo
		tempString = tokenLists.get(tokenArrayIndex++);  //YTStatus+YTAcceptTime+YTArrivalTime+YTPickDropTime+YTAcceptTime+YTArrivalTime+YTYPickDropTime
		this.setYTStatus(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setYtArrivalTime(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS)); // added by jaeok (2021.01.11) Mantis 0112149: 양하작업 YT 도착 기능 확인
		this.setYtYArrivalTime(CToken.getIndexToken(tempString, 6, MTSConstant.MSG_SEPERATOR_PLUS));
		//>

		this.setRemark(tokenLists.get(tokenArrayIndex++));

		tempString = tokenLists.get(tokenArrayIndex++);
		this.setCodeIndex(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS));
		
		// added by Chun (2017.01.31) : 0056180: [YT] Wrong Yard Job. 
		if (this.getCodeIndex().length() >= 2) {
			String jobStatus = this.getCodeIndex().substring(0, 1);
			if (jobStatus.length() > 0 && jobStatus.equals("B") && this.getYardJobCode().equals("YF")) {
				this.setYardJobCode("YO");
			}
		}
		this.setJobState(CToken.getIndexToken(tempString, 1, MTSConstant.MSG_SEPERATOR_PLUS)); //added by JH.Tak (2018.06.03)
		
		this.setYtNo(CToken.getIndexToken(tempString, 2, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setOrderTime(CToken.getIndexToken(tempString, 3, MTSConstant.MSG_SEPERATOR_PLUS));

		//< modified by Rackhyun Jeong (2016.09.08) - 0054366: [YT] Show broken position
//		this.setTwistLock(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
//
//		this.setTandemId(tokenLists.get(tokenArrayIndex++));
//		this.setTandemDir(tokenLists.get(tokenArrayIndex++));
//		this.setBayNo(tokenLists.get(tokenArrayIndex++));
//		this.setRowNo(tokenLists.get(tokenArrayIndex++));

		this.setTwistLock("");

		this.setTargetPosition(CToken.getIndexToken(tempString, 4, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setTandemId(CToken.getIndexToken(tempString, 5, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setTandemDir(CToken.getIndexToken(tempString, 6, MTSConstant.MSG_SEPERATOR_PLUS));
		//>
		this.setQcLane(CToken.getIndexToken(tempString, 9, MTSConstant.MSG_SEPERATOR_PLUS)); // added by YoungOk Kim (2019.04.25) - Mantis 89570: [Tally] QC Lane을 지정하는 기능
		this.setDoorDir(CToken.getIndexToken(tempString, 10, MTSConstant.MSG_SEPERATOR_PLUS)); // added by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B4
		String rtSideCheck = CToken.getIndexToken(tempString, 14, MTSConstant.MSG_SEPERATOR_PLUS);
		this.setRtSideInfo(rtSideCheck.equals(CommonConstants.Y) ? MTSConstant.RT_SIDE: CommonConstants.BLANK);
		this.setYtNotification(CToken.getIndexToken(tempString, 15, MTSConstant.MSG_SEPERATOR_PLUS)); // added by YoungOk Kim (2019.04.25) - Mantis 89478: [Tally] YT로 메시지 전송 기능
		this.setQueueName(CToken.getIndexToken(tempString, 18, MTSConstant.MSG_SEPERATOR_PLUS)); // added by YoungOk Kim (2019.04.25) - Mantis 89478: [Tally] YT로 메시지 전송 기능
		this.setTwinCntrNo(CToken.getIndexToken(tempString, 39, MTSConstant.MSG_SEPERATOR_PLUS));  // added by JH.Tak (2018.12.18) Display twin info
		this.setSHoldDeck(CToken.getIndexToken(tempString, 40, MTSConstant.MSG_SEPERATOR_PLUS)); // added by YoungOk Kim (2019.02.25) - for GWCT
		
		this.setSBay(CToken.getIndexToken(tempString, 44, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSRow(CToken.getIndexToken(tempString, 45, MTSConstant.MSG_SEPERATOR_PLUS));
		this.setSTier(CToken.getIndexToken(tempString, 46, MTSConstant.MSG_SEPERATOR_PLUS));
		
		this.setHatchIndex(CToken.getIndexToken(tempString, 47, MTSConstant.MSG_SEPERATOR_PLUS)); // added By BE.Ahn (2019. 11. 28) Mantis 0103575: [YT] 해치 번호 / 덱/홀드 표시
		this.setInspectCheck(CToken.getIndexToken(tempString, 50, MTSConstant.MSG_SEPERATOR_PLUS)); // added by YoungOk Kim (2020.02.12) - Mantis 105063: [YT] 위험물 및 검역 작업에 색상으로 테두리 표시하여 구분
		this.setConeAttached(CToken.getIndexToken(tempString, 56, MTSConstant.MSG_SEPERATOR_PLUS)); // added by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B3
		this.setTruckBlockInTime(CToken.getIndexToken(tempString, 59, MTSConstant.MSG_SEPERATOR_PLUS));
		
		this.setAtcJobStatus(CToken.getIndexToken(tempString, 61, MTSConstant.MSG_SEPERATOR_PLUS));
	}

	public String getVslNm() {
		return vslNm;
	}

	public void setVslNm(String vslNm) {
		this.vslNm = vslNm;
	}

	public String getDocNo() {
		return docNo;
	}

	public void setDocNo(String docNo) {
		this.docNo = docNo;
	}

	public String getStatusDesc() {
		return statusDesc;
	}

	public void setStatusDesc(String statusDesc) {
		this.statusDesc = statusDesc;
	}
	
	
	
	
	
	
	
	
	//RBT. 2024 Temporary Add function mapping with container to display:
	public void mappingContainer(String sLdTp) {
		this.setContainerNo(this.getVslNm());
		if ("VI".equals(this.getYardJobCode()) && sLdTp.equals("B")) {
			this.setStatusDesc(this.getBerthCd()); // Go to Vessel
		} else if ("VI".equals(this.getYardJobCode()) && sLdTp.equals("A")) {
			this.setStatusDesc(this.getWhId()); // Go to WH
		} else if ("VO".equals(this.getYardJobCode()) && sLdTp.equals("B")) {
			this.setStatusDesc(this.getWhId()); // Go to WH
		} else if ("VO".equals(this.getYardJobCode()) && sLdTp.equals("A")) {
			this.setStatusDesc(this.getBerthCd()); // Go to Vessel
		} else {
			this.setStatusDesc("Undetemined");
		}
		
		if(this.getStatusDesc() == null || "".equals(this.getStatusDesc())) {
			this.setStatusDesc("Undetemined");
		}

		this.setYardJobCode(this.getYardJobCode() + " - " + this.getDocNo());
		this.setCodeIndex(sLdTp);
	}
}
