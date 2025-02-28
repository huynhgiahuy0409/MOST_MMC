package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchForeignExchangeRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IForeignExchangeRate {
	public DataItemList selectCurrencyMaster(SearchForeignExchangeRateParm parm) throws BizException;
	public DataItemList selectDupliateData(SearchForeignExchangeRateParm parm) throws BizException;
	public DataItemList selectCurrencyIndex(SearchForeignExchangeRateParm parm) throws BizException;
	public DataItemList selectCurrencyList(SearchForeignExchangeRateParm parm) throws BizException;
	public DataItemList hasOverlapCurrencyIndex(SearchForeignExchangeRateParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException; 
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
}