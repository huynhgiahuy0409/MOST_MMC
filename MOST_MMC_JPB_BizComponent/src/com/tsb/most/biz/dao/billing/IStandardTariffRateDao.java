package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.StandardTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchStandardTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IStandardTariffRateDao {
    public DataItemList selectStandardTariffRate(SearchStandardTariffRateParm param) throws DaoException;
    public DataItemList selectBlankStandardTariffRateList(SearchStandardTariffRateParm param) throws DaoException;
    public DataItemList selectBlankConditionList(SearchStandardTariffRateParm param) throws DaoException;
    public DataItemList selectApplyDateList(SearchStandardTariffRateParm param) throws DaoException;
    public DataItemList selectTariffCodeConditionList(SearchStandardTariffRateParm param) throws DaoException;
    public Integer isOverlappedWithFinitePeriod(StandardTariffRateItem item) throws DaoException;
    public Integer isOverlappedWithInfinitePeriod(StandardTariffRateItem item) throws DaoException;
    
    public DataItemList insertStandardConditions(InsertItemsBizParm parm) throws DaoException;
    public DataItemList deleteStandardConditions(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList insertStandardTariffRates(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateStandardTariffRates(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateStandardTariffGstRates(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteStandardTariffRates(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList deleteStandardTariff(DeleteItemsBizParm parm) throws DaoException;
}
