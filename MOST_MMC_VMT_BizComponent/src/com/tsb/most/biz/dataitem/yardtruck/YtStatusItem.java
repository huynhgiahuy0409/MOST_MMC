package com.tsb.most.biz.dataitem.yardtruck;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.biz.mts.msgitem.MsgC3itReceive;
import com.tsb.most.biz.mts.msgitem.RstT37Item;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.util.CToken;

public class YtStatusItem extends DataItem {
	private static final long serialVersionUID = -4291435429948521594L;

	private String yardTruckNo = CommonConstants.BLANK;
	private String direction = CommonConstants.BLANK;
	private String targetPos = CommonConstants.BLANK;
	
	private List<YtYardStatusItem> ytYardStatusItemList = null;
	private List<YtQuayStatusItem> ytQuayStatusItemList = null;
	
	private String wtChannel = CommonConstants.BLANK;
	private String staffName = CommonConstants.BLANK;
	private String dischargingCount = CommonConstants.BLANK; // added by jaeok (2021.04.02) Mantis 0114620: YT 단말기 작업 구현(작업 순서)
	
	public String getYardTruckNo() {
		return yardTruckNo;
	}

	public String getDirection() {
		return direction;
	}

	public void setYardTruckNo(String yardTruckNo) {
		this.yardTruckNo = yardTruckNo;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}
	
	public String getTargetPos() {
		return targetPos;
	}

	public void setTargetPos(String targetPos) {
		this.targetPos = targetPos;
	}
	
	public List<YtYardStatusItem> getYtYardStatusItemList() {
		return ytYardStatusItemList;
	}

	public List<YtQuayStatusItem> getYtQuayStatusItemList() {
		return ytQuayStatusItemList;
	}

	public void setYtYardStatusItemList(List<YtYardStatusItem> ytYardStatusItemList) {
		this.ytYardStatusItemList = ytYardStatusItemList;
	}

	public void setYtQuayStatusItemList(List<YtQuayStatusItem> ytQuayStatusItemList) {
		this.ytQuayStatusItemList = ytQuayStatusItemList;
	}
	
	public String getWtChannel() {
		return wtChannel;
	}

	public void setWtChannel(String wtChannel) {
		this.wtChannel = wtChannel;
	}
	
	public String getStaffName() {
		return staffName;
	}

	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	
	public String getDischargingCount() {
		return dischargingCount;
	}

	public void setDischargingCount(String dischargingCount) {
		this.dischargingCount = dischargingCount;
	}

	public void setYtStatusItem(MsgC3itReceive msgObject) {
		if (msgObject instanceof RstT37Item) {
			RstT37Item rstT37Item = (RstT37Item) msgObject;
			setYardTruckNo(rstT37Item.getYardTruckNo());
			setDirection(rstT37Item.getDirection());
			setTargetPos(rstT37Item.getTargetPos());
			setDischargingCount(rstT37Item.getDischargingCount()); // added by jaeok (2021.04.02) Mantis 0114620: YT 단말기 작업 구현(작업 순서)
			
			if (getDirection().equals("Y") == true) { // to Yard
				if (ytYardStatusItemList == null) {
					ytYardStatusItemList = new ArrayList<YtYardStatusItem>();
				}
				
				// BayNo + JobCount + isLiftOn(Y/N) + isLiftOff(Y/N) + isMyJob(Y/N)
				int itemCount = rstT37Item.getItemList() == null ? 0 : rstT37Item.getItemList().size();
				for (int i = 0; i < itemCount; i++) {
					String item = rstT37Item.getItemList().get(i);
					CToken token = new CToken(item, CToken.DTM_PLUS);
					
					YtYardStatusItem ytYardStatusItem = new YtYardStatusItem();
					ytYardStatusItem.setBayNo(token.getToken());
					ytYardStatusItem.setJobCount(token.getToken());
					ytYardStatusItem.setIsLiftOn(token.getToken());
					ytYardStatusItem.setIsLiftOff(token.getToken());
					ytYardStatusItem.setIsMyJob(token.getToken());
					
					ytYardStatusItemList.add(ytYardStatusItem);
				}
				
			} else if (getDirection().equals("Q") == true) { // to Quay side
				if (ytQuayStatusItemList == null) {
					ytQuayStatusItemList = new ArrayList<YtQuayStatusItem>();
				}
				int itemCount = rstT37Item.getItemList() == null ? 0 : rstT37Item.getItemList().size();
				for (int i = 0; i < itemCount; i++) {
					String item = rstT37Item.getItemList().get(i);
					CToken token = new CToken(item, CToken.DTM_PLUS);
					
					// YtNo + isArrived(Y/N) + Seq1 + Seq2 + isMyJob(Y/N)
					YtQuayStatusItem ytQuayStatusItem = new YtQuayStatusItem();
					ytQuayStatusItem.setYtNo(token.getToken());
					ytQuayStatusItem.setIsArrived(token.getToken());
					ytQuayStatusItem.setOperationBaySeq1(token.getToken());
					ytQuayStatusItem.setOperationBaySeq2(token.getToken());
					ytQuayStatusItem.setIsMyJob(token.getToken());
					ytQuayStatusItem.setHoldDeck1(token.getToken());
					ytQuayStatusItem.setHoldDeck2(token.getToken());
					
					ytQuayStatusItemList.add(ytQuayStatusItem);
				}
			}
		}
	}
}
