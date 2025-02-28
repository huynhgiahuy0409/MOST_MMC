package com.tsb.most.basebiz.dataitem.configuration;

import com.tsb.most.framework.dataitem.DataItem;

public class BizConfigurationItem extends DataItem{

	private static final long serialVersionUID = -4711766207668131877L;
	
	private String code;
	private String description;
	private String value;
	private String category;
    private String useYn;
    private String updTime;
    
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getUpdTime() {
		return updTime;
	}
	public void setUpdTime(String updTime) {
		this.updTime = updTime;
	}
}
