package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchForeignExchangeRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IForeignExchangeRateDao {
	public DataItemList selectCurrency(SearchForeignExchangeRateParm parm)throws DaoException;
	public DataItemList selectDupliateData(SearchForeignExchangeRateParm parm)throws DaoException ;
	public DataItemList hasOverlapCurrencyIndex(SearchForeignExchangeRateParm parm) throws DaoException;
	public DataItemList selectCurrencyIndex(SearchForeignExchangeRateParm parm)throws DaoException;
	public DataItemList selectCurrencyMaster(SearchForeignExchangeRateParm parm)throws DaoException;
	public DataItemList getComboCurrency(SearchForeignExchangeRateParm parm) throws DaoException;
	public DataItemList getData(SearchForeignExchangeRateParm parm) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException;
}
