package com.tsb.most.basebiz.dataitem.validation;

import com.tsb.most.framework.dataitem.DataItem;

public class ValidationCodeItem extends DataItem {   
	private String isValidated;
	private String ref1;
	
	
	public String getRef1() {
		return ref1;
	}

	public void setRef1(String ref1) {
		this.ref1 = ref1;
	}

	public String getIsValidated() {
		return isValidated;
	}

	public void setIsValidated(String isValidated) {
		this.isValidated = isValidated;
	}
	
	
}