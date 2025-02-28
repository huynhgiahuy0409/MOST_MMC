package com.tsb.most.common.util.billing;

import java.util.ArrayList;
import java.util.HashMap;

import com.tsb.most.biz.dataitem.billing.TariffCodeGatheredItem;
import com.tsb.most.biz.dataitem.billing.TariffCodeGeneratorItem;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class TariffCodeGeneratorFactory {
	private static TariffCodeGeneratorFactory _instance;
	private TariffCodeGeneratorItem reqItem;
    private HashMap generator;
    
    private String vslCallId;
    private String mode;
    
    private ArrayList<TariffCodeGatheredItem> trfType;
	
    private TariffCodeGeneratorFactory(String vslCallId) {
    	generator = new HashMap();
    	mode = BillingConstant.TRF_CODE_MODE_STANDARD; //default
    	
    	this.vslCallId = vslCallId;
    	
    }
    
    public static TariffCodeGeneratorFactory createInstance(String vslCallId) throws BizException{
        if(_instance == null){
        	_instance = new TariffCodeGeneratorFactory(vslCallId);
        }
        
        _instance.initTariffCodeGenerator(vslCallId);
        
        return _instance;
    }
    
    public static TariffCodeGeneratorFactory getInstance() throws BizException{
    	if(_instance == null) {
    		throw new BizException("TariffCodeGeneratorFactory object is null");
    	}
    	 return _instance;
    }
    
    private void initTariffCodeGenerator(String vslCallId){
    	this.vslCallId = vslCallId;
    	generator.clear();
    	
    }
    
    public void setTariffCodeGeneratorItem(TariffCodeGeneratorItem item) {
    	reqItem = item;
    }
    
    public TariffCodeGenerator getGenerator(String pMode){
    	return (TariffCodeGenerator)generator.get(pMode);
    }
    
    public void setGenerator(String pMode,TariffCodeGenerator reqGen){
    	generator.put(pMode, reqGen);
    }

    public void setTrfType(ArrayList<TariffCodeGatheredItem> typeList) {
    	trfType = typeList;
    	
    }
    
	public ArrayList<TariffCodeGatheredItem> getTrfType() {
		return trfType;
	}
	
	
}
