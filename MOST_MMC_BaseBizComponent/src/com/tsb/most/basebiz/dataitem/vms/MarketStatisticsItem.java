package com.tsb.most.basebiz.dataitem.vms;

//import com.pcs.foundation.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItem;

public class MarketStatisticsItem extends DataItem {

	private static final long serialVersionUID = 1L;
	//MARKET INDEX - refer to VesselBulk.xml
	private	String marketIndexDisplay;
	private	String marketIndexValue;
	
	//MARKET INDEX VALUE DATE - refer to VesselBulk.xml
	private String levelIndex;
	private String todate;
	private String frequency;
	private float indexValue;
	
	public String getMarketIndexDisplay() {
		return marketIndexDisplay;
	}
	public void setMarketIndexDisplay(String marketIndexDisplay) {
		this.marketIndexDisplay = marketIndexDisplay;
	}
	public String getMarketIndexValue() {
		return marketIndexValue;
	}
	public void setMarketIndexValue(String marketIndexValue) {
		this.marketIndexValue = marketIndexValue;
	}
	public String getLevelIndex() {
		return levelIndex;
	}
	public void setLevelIndex(String levelIndex) {
		this.levelIndex = levelIndex;
	}
	public String getTodate() {
		return todate;
	}
	public void setTodate(String todate) {
		this.todate = todate;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public float getIndexValue() {
		return indexValue;
	}
	public void setIndexValue(float indexValue) {
		this.indexValue = indexValue;
	}
}
