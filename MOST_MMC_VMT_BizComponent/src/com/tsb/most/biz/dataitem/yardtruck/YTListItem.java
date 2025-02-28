package com.tsb.most.biz.dataitem.yardtruck;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class YTListItem  extends DataItem {
	private String count;
	private ArrayList ytList;
	
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public ArrayList getYtList() {
		return ytList;
	}
	public void setYtList(ArrayList ytList) {
		this.ytList = ytList;
	}
}
