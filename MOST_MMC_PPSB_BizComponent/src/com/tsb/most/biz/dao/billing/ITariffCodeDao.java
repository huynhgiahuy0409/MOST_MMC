package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ITariffCodeDao {
	public DataItemList selectCostCenter(SearchTariffCodeParm param) throws DaoException;
    public DataItemList selectFinancialCode(SearchTariffCodeParm param) throws DaoException;
    public DataItemList selectTariffCode(SearchTariffCodeParm param) throws DaoException;
    public DataItem selectTariffCodeDtl(SearchTariffCodeParm param) throws DaoException;
    public String selectMaxTrfRegNo(SearchTariffCodeParm param) throws DaoException;
    public String selectMaxConditionSeq(SearchTariffCodeParm param) throws DaoException;
    public DataItemList selectTariffConditionPropertyList(SearchTariffCodeParm param) throws DaoException;
    public DataItemList checkTariffConditionPropertyList(SearchTariffCodeParm param) throws DaoException;
    public DataItemList selectRefChild(SearchTariffCodeParm param) throws DaoException;
	public DataItemList selectCmdtHeredityMultiSelectPopupList(SearchTariffCodeParm param) throws DaoException;
	public DataItemList getTariffConditionPropertyList(SearchTariffCodeParm param) throws DaoException;
    public DataItemList getTariffConditionList(SearchTariffCodeParm param) throws DaoException;
    
    public DataItemList insertTariffCode(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateTariffCode(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteTariffCode(DeleteItemsBizParm parm) throws DaoException;
    
    public DataItemList insertTariffConditionProperty(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateTariffConditionProperty(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteTariffConditionProperty(DeleteItemsBizParm parm) throws DaoException; 

    public DataItemList selectTariffConditionList(SearchTariffCodeParm param) throws DaoException;
    public DataItemList insertTariffCondition(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateTariffCondition(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList deleteTariffCondition(DeleteItemsBizParm parm) throws DaoException;

   
}
