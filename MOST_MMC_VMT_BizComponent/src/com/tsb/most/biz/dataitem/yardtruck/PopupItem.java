package com.tsb.most.biz.dataitem.yardtruck;

import com.tsb.most.framework.dataitem.DataItem;

public class PopupItem extends DataItem {
	private static final long serialVersionUID = 7981847957529964727L;
	
	private String key = null;
	private String code = null;
	private String codeName = null;
	private String codeInfo = null;
	
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public String getCodeInfo() {
		return codeInfo;
	}
	public void setCodeInfo(String codeInfo) {
		this.codeInfo = codeInfo;
	}
	
}
