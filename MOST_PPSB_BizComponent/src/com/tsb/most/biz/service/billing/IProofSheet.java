package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchProofSheetParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IProofSheet {
	public DataItemList selectCostCenterCombo(SearchProofSheetParm parm) throws BizException;
	
	public DataItemList selectProofSheetList(SearchProofSheetParm parm) throws BizException;
    public DataItemList selectExchangeData(SearchProofSheetParm parm) throws BizException;
    public DataItemList selectCostCenterData(SearchProofSheetParm parm) throws BizException;
    public DataItemList selectPartnerRates(SearchProofSheetParm parm) throws BizException;
    public DataItemList selectComboBoxIvPrefix(SearchProofSheetParm parm) throws BizException;
	public DataItemList updateStatusDataGathering(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateGatheredData(UpdateItemsBizParm parm) throws BizException;
}
