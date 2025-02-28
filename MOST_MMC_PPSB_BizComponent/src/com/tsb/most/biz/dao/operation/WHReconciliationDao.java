package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.operation.SearchWHReconciliationPivotParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class WHReconciliationDao extends BaseDao implements IWHReconciliationDao {

    public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("whReconciliation.selectWHRecnList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectWHRecnListPivot(SearchWHReconciliationPivotParm parm) throws DaoException{
    	try{
    		return unifiedDao.getItems("whReconciliation.selectWHRecnListPivot", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList getWHRecnDtl(SearchWHReconciliationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whReconciliation.selectWHRecnDtl", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList getWHRecnDocList(SearchWHReconciliationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("whReconciliation.selectWHRecnDocList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	public DataItemList insertJobItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"whReconciliation.insertJobItems", insertItems);	
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList insertInvLocItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"whReconciliation.insertInvLocItems", insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}


}
