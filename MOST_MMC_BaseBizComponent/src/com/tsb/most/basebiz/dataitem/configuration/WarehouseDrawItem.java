package com.tsb.most.basebiz.dataitem.configuration;

import java.util.List;

import com.tsb.most.framework.dataitem.DataItem;

public class WarehouseDrawItem extends DataItem {
	private List<Object> cell;
	private List<Object> bay;
	private List<Object> row;
	private List<Object> unused;
	
	public List<Object> getCell() {
		return cell;
	}
	public void setCell(List<Object> cell) {
		this.cell = cell;
	}
	public List<Object> getBay() {
		return bay;
	}
	public void setBay(List<Object> bay) {
		this.bay = bay;
	}
	public List<Object> getRow() {
		return row;
	}
	public void setRow(List<Object> row) {
		this.row = row;
	}
	public List<Object> getUnused() {
		return unused;
	}
	public void setUnused(List<Object> unused) {
		this.unused = unused;
	}
}