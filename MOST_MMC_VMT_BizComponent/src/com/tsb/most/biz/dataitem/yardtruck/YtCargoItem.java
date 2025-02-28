package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.biz.mts.msgitem.RstT11Item;

public class YtCargoItem extends RstT11Item {
	private String status;
	private String prevStatus;
	private String qtyMtM3;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPrevStatus() {
		return prevStatus;
	}

	public void setPrevStatus(String prevStatus) {
		this.prevStatus = prevStatus;
	}

	public String getQtyMtM3() {
		return qtyMtM3;
	}

	public void setQtyMtM3(String qtyMtM3) {
		this.qtyMtM3 = qtyMtM3;
	}
}
