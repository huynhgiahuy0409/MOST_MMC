package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchForeignExchangeRateParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ForeignExchangeRateDao extends BaseDao implements IForeignExchangeRateDao {
    
    public DataItemList selectCurrency(SearchForeignExchangeRateParm parm)throws DaoException {
    	try{
    		return  unifiedDao.getItemsPage("foreignExchangeRate.selectCurrency", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
        
    }
    public DataItemList selectDupliateData(SearchForeignExchangeRateParm parm)throws DaoException {
    	try{
    		return  unifiedDao.getItems("foreignExchangeRate.selectDupliateData", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
        
    }
    public DataItemList hasOverlapCurrencyIndex(SearchForeignExchangeRateParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("foreignExchangeRate.hasOverlapCurrencyIndex", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
        
    }
    public DataItemList selectCurrencyIndex(SearchForeignExchangeRateParm parm)throws DaoException {
    	try{
    		return unifiedDao.getItems("foreignExchangeRate.selectCurrencyIndex", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCurrencyMaster(SearchForeignExchangeRateParm parm)throws DaoException {
    	try{
    		return unifiedDao.getItems("foreignExchangeRate.selectCurrencyMaster", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

    public DataItemList getComboCurrency(SearchForeignExchangeRateParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("foreignExchangeRate.selectCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList getData(SearchForeignExchangeRateParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("foreignExchangeRate.selectData", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"foreignExchangeRate.insertItems", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }  
    
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "foreignExchangeRate.updateItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "foreignExchangeRate.deleteItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }

}
