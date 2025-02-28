package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class CostCenterDao extends BaseDao implements ICostCenterDao {

    public DataItemList selectCostCenter(SearchCostCenterParm parm) throws DaoException {
        return unifiedDao.getItemsPage("costCenter.selectCostCenter", parm);
    }
    
	public DataItemList isUnitInUsed(SearchCostCenterParm param) throws DaoException {
		return unifiedDao.getItems("costCenter.isUnitInUsed",param);
	}
	
	public String duplicatedCostERP(SearchCostCenterParm param) throws DaoException {
		return (String) unifiedDao.readOne("costCenter.duplicatedCostERP",param);
	}
	
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();
		setNewVersion(insertItems);	
		
		unifiedDao.insertItems(null,"costCenter.insertItems", insertItems);
		
		setVersion(insertItems);			
		
		return insertItems;
    	
    }

    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	DataItemList updateItems = parm.getUpdateItems();
		setNewVersion(updateItems);	
		
		unifiedDao.updateItems(null,"costCenter.updateItems", updateItems);
		
		setVersion(updateItems);			
		
		return updateItems;
		
    	
    }

    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	DataItemList deleteItems = parm.getDeleteItems();
		setNewVersion(deleteItems);
		
		unifiedDao.deleteItems(null,"costCenter.deleteItems", deleteItems);
		setVersion(deleteItems);
		
		return deleteItems;
		
    	
    }

}
