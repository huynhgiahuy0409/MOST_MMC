package com.tsb.most.biz.dataitem.yardtruck;

import java.util.ArrayList;

import com.tsb.most.framework.dataitem.DataItem;

public class YTJobItems extends DataItem {
	private String count;
	private ArrayList<YTJobItem> containerList = new ArrayList<YTJobItem>();
	private String message = "";
	
	public int getCount() {
		//return count;
		return containerList.size();
	}
	public void setCount(String count) {
		this.count = count;
	}
	public ArrayList<YTJobItem> getContainerList() {
		return containerList;
	}
	public void setContainerList(ArrayList<YTJobItem> containerList) {
		this.containerList = containerList;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public void add(YTJobItem ytJobItem) {
		containerList.add(ytJobItem);
	}
}