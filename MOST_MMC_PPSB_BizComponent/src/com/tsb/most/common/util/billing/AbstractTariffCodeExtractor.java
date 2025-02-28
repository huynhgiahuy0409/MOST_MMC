package com.tsb.most.common.util.billing;

import com.tsb.most.biz.dao.billing.ITariffCodeGeneratorDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public abstract class AbstractTariffCodeExtractor {

	// target date list
	protected DataItemList targetDataList;
	protected String mode = ""; // S: Standard , P : package
	protected String trfType = ""; // Tariff code Type (= Extractor Type)
	
	public AbstractTariffCodeExtractor(String mode, String trfType) {
		this.mode = mode;
		this.trfType = trfType;
		
	}
	
	public AbstractTariffCodeExtractor(String mode, String trfType,DataItemList dataList) {
		this.mode = mode;
		this.trfType = trfType;
		this.targetDataList = dataList;
	}

	public DataItemList getTargetDataList() {
		return targetDataList;
	}

	public void setTargetDataList(DataItemList targetDataList) {
		this.targetDataList = targetDataList;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	public String getTrfType() {
		return trfType;
	}

	public void setTrfType(String trfType) {
		this.trfType = trfType;
	}

	public abstract DataItemList performExtractTask(ITariffCodeGeneratorDao oTrfGenDao) throws BizException;
	
	
}
