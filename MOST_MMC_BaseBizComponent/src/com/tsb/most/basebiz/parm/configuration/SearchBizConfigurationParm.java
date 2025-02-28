package com.tsb.most.basebiz.parm.configuration;

import com.tsb.most.framework.bizparm.BaseBizParm;

public class SearchBizConfigurationParm extends BaseBizParm {
	private static final long serialVersionUID = -4711766207668131877L;
	
	private String code;
	private String description;
	private String searchType;
	
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
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
}
