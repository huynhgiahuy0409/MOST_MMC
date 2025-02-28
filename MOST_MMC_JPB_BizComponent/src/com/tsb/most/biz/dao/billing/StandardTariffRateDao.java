package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.StandardTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchStandardTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.DaoException;

public class StandardTariffRateDao extends BaseDao implements  IStandardTariffRateDao {

	public DataItemList selectStandardTariffRate(SearchStandardTariffRateParm param) throws DaoException {
        return unifiedDao.getItemsPage("standardTariffRate.selectStandardTariffRate",param);
    }
    public DataItemList selectBlankStandardTariffRate(SearchStandardTariffRateParm param) throws DaoException {
        return unifiedDao.getItems("standardTariffRate.selectBlankStandardTariffRate",param);
    }
    public DataItemList selectApplyDateList(SearchStandardTariffRateParm param) throws DaoException {
        return unifiedDao.getItems("standardTariffRate.selectApplyDateList",param);
    }
    public DataItemList selectTariffCodeConditionList(SearchStandardTariffRateParm param) throws DaoException {
        return unifiedDao.getItems("standardTariffRate.selectTariffCodeConditionList",param);
    }
    public DataItemList selectBlankConditionList(SearchStandardTariffRateParm param) throws DaoException {
        return unifiedDao.getItems("standardTariffRate.selectBlankConditionList",param);
    }
	public DataItemList selectBlankStandardTariffRateList(SearchStandardTariffRateParm param) throws DaoException {
		return unifiedDao.getItems("standardTariffRate.selectBlankStandardTariffRateList",param);
	}

	
    public Integer isOverlappedWithFinitePeriod(StandardTariffRateItem item) throws DaoException  {
       	//TODO
    	//Need to change return type and parm
    	SearchStandardTariffRateParm parm = new SearchStandardTariffRateParm();
    	parm.setTrfCd(item.getTrfCd());
    	parm.setSubTrfCd(item.getSubTrfCd());
    	parm.setAplyYmd(item.getAplyYmd());
    	parm.setExprYmd(item.getExprYmd());
    	IDataItem result = unifiedDao.getItems("standardTariffRate.isOverlappedWithFinitePeriod", parm);
    	
    	if(result != null) {
    		StandardTariffRateItem resultItem = (StandardTariffRateItem)result.getCollection().get(0);
    		return resultItem.getCount();
    	} else {
    		return 0;
    	}
    }
    public Integer isOverlappedWithInfinitePeriod(StandardTariffRateItem item) throws DaoException  {
       	//TODO
    	//Need to change return type and parm
    	SearchStandardTariffRateParm parm = new SearchStandardTariffRateParm();
    	parm.setTrfCd(item.getTrfCd());
    	parm.setSubTrfCd(item.getSubTrfCd());
    	parm.setAplyYmd(item.getAplyYmd());
    	parm.setExprYmd(item.getExprYmd());
    	
    	StandardTariffRateItem result = (StandardTariffRateItem)unifiedDao.readOne("standardTariffRate.isOverlappedWithInfinitePeriod", parm);
    	
    	return result.getCount();
    }
    
    public DataItemList insertStandardConditions(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"standardTariffRate.insertStandardCondition", insertItems);
			
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList deleteStandardConditions(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"standardTariffRate.deleteStandardCondition", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList insertStandardTariffRates(InsertItemsBizParm parm) throws DaoException {
  		try {
  			DataItemList insertItems = parm.getInsertItems();
  			setNewVersion(insertItems);	
  			
  			unifiedDao.insertItems(null,"standardTariffRate.insertStandardTariffRate", insertItems);
  			
  			setVersion(insertItems);			
  			
  			return insertItems;
  		}catch(Exception e){
  			throw new DaoException(e);
  		}
  	}

    
    public DataItemList updateStandardTariffRates(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"standardTariffRate.updateStandardTariffRates", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

    public DataItemList updateStandardTariffGstRates(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"standardTariffRate.updateStandardTariffGstRates", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList deleteStandardTariffRates(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"standardTariffRate.deleteStandardTariffRate", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public DataItemList deleteStandardTariff(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.deleteItems(null,"standardTariffRate.deleteStandardTariffRate", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
   
}
