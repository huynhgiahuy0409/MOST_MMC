package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.bizparm.BaseBizParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TariffCodeDao extends BaseDao implements ITariffCodeDao {

    public DataItemList selectCostCenter(SearchTariffCodeParm param) throws DaoException{
        return unifiedDao.getItems("tariffCode.selectCostCenter",param);
    }
    
    public DataItemList selectFinancialCode(SearchTariffCodeParm param) throws DaoException{
        return unifiedDao.getItems("tariffCode.selectFinancialCode",param);
    }
    
    public DataItemList selectTariffCode(SearchTariffCodeParm param) throws DaoException{
        return unifiedDao.getItemsPage("tariffCode.selectTariffCode",param);
    }
    
    public DataItem selectTariffCodeDtl(SearchTariffCodeParm param) throws DaoException{
        return (DataItem)unifiedDao.readOne("tariffCode.selectTariffCode",param);
    }
  
    public DataItemList selectTariffConditionPropertyList(SearchTariffCodeParm param) throws DaoException {
        return unifiedDao.getItems("tariffCode.selectTariffConditionPropertyList",param);
    }
    
    public DataItemList checkTariffConditionPropertyList(SearchTariffCodeParm param) throws DaoException{
    	return unifiedDao.getItems("tariffCode.checkTariffConditionPropertyList", param);
    }
    
    public String selectMaxTrfRegNo(SearchTariffCodeParm param) throws DaoException {
    	return (String)unifiedDao.readOne("tariffCode.selectMaxTrfRegNo",param);
    }
    
    public String selectMaxConditionSeq(SearchTariffCodeParm param) throws DaoException {
    	return (String)unifiedDao.readOne("tariffCode.selectMaxConditionSeq",param);
    }
    
    @Override
	public DataItemList selectRefChild(SearchTariffCodeParm param) throws DaoException {
		return unifiedDao.getItems("tariffCode.selectRefChildBeforeDelete", param);
	}

    public DataItemList selectCmdtHeredityMultiSelectPopupList(SearchTariffCodeParm param) throws DaoException {
        return unifiedDao.getItems("tariffCode.selectCmdtHeredityMultiSelectPopupList",param);
    }

    public DataItemList getTariffConditionPropertyList(SearchTariffCodeParm param) throws DaoException {
        return unifiedDao.getItems("tariffCode.selectTariffConditionPropertyList",param);
    }

    public DataItemList getTariffConditionList(SearchTariffCodeParm param) throws DaoException {
        return unifiedDao.getItems("tariffCode.selectTariffConditionList",param);
    }

    public DataItemList insertTariffCode(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"tariffCode.insertTariffCode",insertItems);
	    	setVersion(insertItems);
			
	    	return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList updateTariffCode(UpdateItemsBizParm parm) throws DaoException {
    	try {

        	DataItemList updateItems = parm.getUpdateItems();
    		
        	setNewVersion(updateItems);
            unifiedDao.updateItems(null,"tariffCode.updateTariffCode",updateItems);
            setVersion(updateItems);
            
            return updateItems;
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList deleteTariffCode(DeleteItemsBizParm parm) throws DaoException {
    	try {
        	DataItemList deleteItems = parm.getDeleteItems();
    		
        	setNewVersion(deleteItems);
            unifiedDao.updateItems(null,"tariffCode.deleteTariffCode",deleteItems);
            setVersion(deleteItems);
            
            return deleteItems;
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertTariffConditionProperty(InsertItemsBizParm parm) throws DaoException {
    	try {
    		DataItemList insertItems = parm.getInsertItems();
    		
        	setNewVersion(insertItems);
            unifiedDao.insertItems(null,"tariffCode.insertTariffConditionProperty",insertItems);
            setVersion(insertItems);
            
            return insertItems;
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList updateTariffConditionProperty(UpdateItemsBizParm parm) throws DaoException {
    	try {
    		DataItemList updateItems = parm.getUpdateItems();
    		
        	setNewVersion(updateItems);
            unifiedDao.updateItems(null,"tariffCode.updateTariffConditionProperty",updateItems);
            setVersion(updateItems);
            
            return updateItems;
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList deleteTariffConditionProperty(DeleteItemsBizParm parm) throws DaoException { 
    	try {
    		DataItemList deleteItems = parm.getDeleteItems();
    		
        	setNewVersion(deleteItems);
            unifiedDao.deleteItems(null,"tariffCode.deleteTariffConditionProperty",deleteItems);
            setVersion(deleteItems);
            
            return deleteItems;
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList selectTariffConditionList(SearchTariffCodeParm param) throws DaoException {
        return unifiedDao.getItems("tariffCode.selectTariffConditionList",param);
    }

    public DataItemList insertTariffCondition(InsertItemsBizParm parm) throws DaoException {
    	try {
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.insertItems(null,"tariffCode.insertTariffCondition",insertItems);
	    	setVersion(insertItems);
			
	    	return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList updateTariffCondition(UpdateItemsBizParm parm) throws DaoException {
    	try {
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null,"tariffCode.updateTariffCondition",updateItems);
	    	setVersion(updateItems);
			
	    	return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList deleteTariffCondition(DeleteItemsBizParm parm) throws DaoException {
    	try {

    		DataItemList deleteItems = parm.getDeleteItems();
    		
        	setNewVersion(deleteItems);
            unifiedDao.deleteItems(null,"tariffCode.deleteTariffCondition",deleteItems);
            setVersion(deleteItems);
            
            return deleteItems;
    	} catch (Exception e) {
			throw new DaoException(e);
		}
    }

    public DataItemList selectMaxTrfRegNo() throws DaoException {
        return unifiedDao.getItems("tariffCode.selectMaxTrfRegNo", new BaseBizParm());
    }
}