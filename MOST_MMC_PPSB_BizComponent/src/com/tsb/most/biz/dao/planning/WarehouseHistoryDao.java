package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.biz.parm.planning.SearchWarehouseHistoryParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class WarehouseHistoryDao extends BaseDao implements IWarehouseHistoryDao{
	public DataItemList selectCargoJobHistoryList(SearchWarehouseHistoryParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("warehouseHistory.selectCargoJobHistoryList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("warehouseHistory.selectWHRecnList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectWHRecnDocList(SearchWHReconciliationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseHistory.selectWHRecnDocList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	public DataItemList selectWHRecnDtl(SearchWHReconciliationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("warehouseHistory.selectWHRecnDtl", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
}
