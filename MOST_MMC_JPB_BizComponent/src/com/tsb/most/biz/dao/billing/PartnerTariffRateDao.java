package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.PartnerTariffRateItem;
import com.tsb.most.biz.parm.billing.SearchPartnerTariffRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class PartnerTariffRateDao extends BaseDao implements IPartnerTariffRateDao {
    public DataItemList selectPartnerTariffRate(SearchPartnerTariffRateParm param) throws DaoException {
        return unifiedDao.getItems("partnerTariffRate.selectPartnerTariffRate",param);
    }
    
    public DataItemList selectPartnerConditionList(SearchPartnerTariffRateParm param) throws DaoException {
        return unifiedDao.getItems("partnerTariffRate.selectPartnerConditionList",param);
    }
    
    public DataItemList selectPartnerConditionPropertyList(SearchPartnerTariffRateParm param) throws DaoException {
        return unifiedDao.getItems("partnerTariffRate.selectPartnerConditionPropertyList",param);
    }
    
    public DataItemList selectPartnerTariffRateSummary(SearchPartnerTariffRateParm parm) throws DaoException {
        return unifiedDao.getItems("partnerTariffRate.selectPartnerTariffRateSummary",parm);
    }
    
    public DataItemList selectBerthList(SearchPartnerTariffRateParm param) throws DaoException {
    	return unifiedDao.getItems("partnerTariffRate.selectBerthList",param);
    }
    
    public DataItemList selectCurrentPartnerTariffRate(SearchPartnerTariffRateParm parm) throws DaoException{
    	return unifiedDao.getItems("partnerTariffRate.selectCurrentPartnerTariffRate",parm);
    }
    
	public DataItemList selectPrptCDList(SearchPartnerTariffRateParm parm) throws DaoException {
		return unifiedDao.getItems("partnerTariffRate.selectPrptCDList", parm);
	}
    
    public String selectMaxPkgNo(String parm) throws DaoException{
    	return (String) unifiedDao.readOne("partnerTariffRate.selectMaxPkgNo",parm);
    }
    
    public DataItemList insertPartnerTariffRates(InsertItemsBizParm parm) throws DaoException  {
    	try {
  			DataItemList insertItems = parm.getInsertItems();
  			setNewVersion(insertItems);	
  			
  			unifiedDao.insertItems(null,"partnerTariffRate.insertPartnerTariffRate", insertItems);
  			
  			setVersion(insertItems);			
  			
  			return insertItems;
  		}catch(Exception e){
  			throw new DaoException(e);
  		}
    }
    
    public DataItemList insertPartnerConditions(InsertItemsBizParm parm) throws DaoException  {
    	try {
  			DataItemList insertItems = (DataItemList)parm.getInsertItems();
  			setNewVersion(insertItems);	
  			
  			unifiedDao.insertItems(null,"partnerTariffRate.insertPartnerCondition", insertItems);
  			
  			setVersion(insertItems);			
  			
  			return insertItems;
  		}catch(Exception e){
  			throw new DaoException(e);
  		}
    }
    
    public DataItemList insertPartnerConditionProperties(InsertItemsBizParm parm) throws DaoException  {
    	try {
  			DataItemList insertItems = parm.getInsertItems();
  			setNewVersion(insertItems);	
  			
  			unifiedDao.insertItems(null,"partnerTariffRate.insertPartnerConditionProperty", insertItems);
  			
  			setVersion(insertItems);			
  			
  			return insertItems;
  		}catch(Exception e){
  			throw new DaoException(e);
  		}
    }
    
    public DataItemList updatePartnerTariffRates(UpdateItemsBizParm parm) throws DaoException  {
    	try {
  			DataItemList updateItems = parm.getUpdateItems();
  			setNewVersion(updateItems);	
  			
  			unifiedDao.insertItems(null,"partnerTariffRate.updatePartnerTariffRate", updateItems);
  			
  			setVersion(updateItems);			
  			
  			return updateItems;
  		}catch(Exception e){
  			throw new DaoException(e);
  		}

    }
    
    public DataItemList deletePartnerTariffRates(DeleteItemsBizParm parm) throws DaoException  {
        try{
    		DataItemList deleteItems = parm.getDeleteItems();
  			
  			setNewVersion(deleteItems);
  			unifiedDao.deleteItems(null, "partnerTariffRate.deletePartnerTariffRate", deleteItems);
  			setVersion(deleteItems);
  			
  			return deleteItems;
  		
  	  	}catch(Exception ex){
  			throw new DaoException(ex);
  		}
      }
    
    public DataItemList deletePartnerTariffDetailRates(DeleteItemsBizParm parm) throws DaoException  {
    	try{
      		DataItemList deleteItems = parm.getDeleteItems();
    			
    			setNewVersion(deleteItems);
    			unifiedDao.deleteItems(null, "partnerTariffRate.deletePartnerTariffDetailRates", deleteItems);
    			setVersion(deleteItems);
    			
    			return deleteItems;
    		
    	  	}catch(Exception ex){
    			throw new DaoException(ex);
    		}
    }
    
    public void deleteAllPartnerCondition(PartnerTariffRateItem item) throws DaoException {
        unifiedDao.deleteItem(null,"partnerTariffRate.deleteAllPartnerCondition",item);
    }
    
    public void deleteAllPartnerConditionProperty(PartnerTariffRateItem item) throws DaoException {
        unifiedDao.deleteItem(null,"partnerTariffRate.deleteAllPartnerConditionProperty",item);    
        
    }
}
