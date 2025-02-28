package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchPartnerTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IPartnerTariffRateDao {
	public DataItemList selectPartnerTariffRate(SearchPartnerTariffRateParm param) throws DaoException;
    public DataItemList selectPartnerConditionList(SearchPartnerTariffRateParm param) throws DaoException;
    public DataItemList selectPartnerConditionPropertyList(SearchPartnerTariffRateParm param) throws DaoException;
    public DataItemList selectPartnerTariffRateSummary(SearchPartnerTariffRateParm parm) throws DaoException;
    public DataItemList selectBerthList(SearchPartnerTariffRateParm param) throws DaoException;
    public DataItemList selectCurrentPartnerTariffRate(SearchPartnerTariffRateParm parm) throws DaoException;
	public DataItemList selectPrptCDList(SearchPartnerTariffRateParm parm) throws DaoException;
    public String selectMaxPkgNo(String parm) throws DaoException;
    	
    public DataItemList insertPartnerTariffRates(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertPartnerConditions(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertPartnerConditionProperties(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updatePartnerTariffRates(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deletePartnerTariffRates(DeleteItemsBizParm parm) throws DaoException;
    public DataItemList deletePartnerTariffDetailRates(DeleteItemsBizParm parm) throws DaoException;
    public void deleteAllPartnerCondition(PartnerTariffRateItem item) throws DaoException;
    public void deleteAllPartnerConditionProperty(PartnerTariffRateItem item) throws DaoException;
    
}