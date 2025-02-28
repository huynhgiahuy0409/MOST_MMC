package com.tsb.most.biz.mts.msgitem;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.biz.constants.MTSConstant;
import com.tsb.most.biz.dataitem.yardtruck.YtStatusItem;
import com.tsb.most.framework.constants.CommonConstants;

public class RstT37Item extends MsgC3itReceive {
	private String errorCode = CommonConstants.BLANK;
	private String errorNo = CommonConstants.BLANK;
	private String errorDescription = CommonConstants.BLANK;
	
	private String yardTruckNo = CommonConstants.BLANK;
	private String direction = CommonConstants.BLANK;
	private String targetPos = CommonConstants.BLANK;
	private String dischargingCount = CommonConstants.BLANK; // added by jaeok (2021.04.02) Mantis 0114620: YT 단말기 작업 구현(작업 순서)
	private List<String> itemList = null;
	
	private YtStatusItem ytStatusItem = null;
	
	public String getErrorCode() {
		return errorCode;
	}

	public String getErrorNo() {
		return errorNo;
	}

	public String getErrorDescription() {
		return errorDescription;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public void setErrorNo(String errorNo) {
		this.errorNo = errorNo;
	}

	public void setErrorDescription(String errorDescription) {
		this.errorDescription = errorDescription;
	}

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

	public List<String> getItemList() {
		return itemList;
	}

	public void setItemList(List<String> itemList) {
		this.itemList = itemList;
	}

	public YtStatusItem getYtStatusItem() {
		return ytStatusItem;
	}

	public void setYtStatusItem(YtStatusItem ytStatusItem) {
		this.ytStatusItem = ytStatusItem;
	}
	
	public String getDischargingCount() {
		return dischargingCount;
	}

	public void setDischargingCount(String dischargingCount) {
		this.dischargingCount = dischargingCount;
	}

	@Override
	protected void setMessageBody(ArrayList<String> tokenLists) throws Exception {
		try {
			this.errorCode = tokenLists.get(2);
			if (this.errorCode.equals(MTSConstant.MSG_RESULT_CODE_ERROR)) {
				this.errorNo = tokenLists.get(3);
				this.errorDescription = tokenLists.get(4);
				
			} else {
				this.yardTruckNo = tokenLists.get(1);
				this.direction = tokenLists.get(2);
				this.targetPos = tokenLists.get(3);
				
				int itemCount = Integer.parseInt(tokenLists.get(4));
				int idx = 5;
				for (int i = 0; i < itemCount; i++) {
					String item = tokenLists.get(idx);
					idx++;
					
					if (itemList == null) {
						itemList = new ArrayList<String>();
					}
					itemList.add(item);
				}
				
				if (tokenLists.size() > idx) {
					this.dischargingCount = tokenLists.get(idx); // added by jaeok (2021.04.02) Mantis 0114620: YT 단말기 작업 구현(작업 순서)
				}
				
				this.ytStatusItem = new YtStatusItem();
				ytStatusItem.setYtStatusItem(this);
			}
			
		} catch (Exception ex){
			ex.printStackTrace();
		}		
	}
}
