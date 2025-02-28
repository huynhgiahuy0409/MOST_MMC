package com.tsb.most.common.util.billing;

import java.util.ArrayList;
import java.util.HashMap;

import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TariffCodeExtractorFactory {
	private static TariffCodeExtractorFactory _instance;
    private HashMap extractor;
    
    private String vslCallId;
    private String mode;
    
    private ArrayList<TariffCodeGatheredItem> trfType;
    
    private TariffCodeExtractorFactory(String mode, String vslCallId) {
    	extractor = new HashMap();
    	this.mode = mode; //default
    	
    	this.vslCallId = vslCallId;
    	
    }
    
    public static TariffCodeExtractorFactory createInstance(String mode, String vslCallId) throws BizException{
        if(_instance == null){
        	_instance = new TariffCodeExtractorFactory(mode, vslCallId);
        }
        
        _instance.initTariffCodeExtractor(vslCallId);
        
        return _instance;
    }
    
    public static TariffCodeExtractorFactory getInstance() throws BizException{
    	if(_instance == null) {
    		throw new BizException("TariffCodeExtractorFactory object is null");
    	}
    	 return _instance;
    }
    
    private void initTariffCodeExtractor(String vslCallId){
    	this.vslCallId = vslCallId;
    	extractor.clear();
    	
    }
    
    public AbstractTariffCodeExtractor getGenerator(String trfType){
    	return (AbstractTariffCodeExtractor) extractor.get(trfType);
    }

	public void setExtractor(String trfType,AbstractTariffCodeExtractor reqExt) {
		extractor.put(trfType, reqExt);
	}

	public void setTrfType(ArrayList<TariffCodeGatheredItem> trfType) {
    	this.trfType = trfType;
    	
    }
    
	public ArrayList<TariffCodeGatheredItem> getTrfType() {
		return trfType;
	}
    
}
