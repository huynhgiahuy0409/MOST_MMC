package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchWHReconciliationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class WHReconciliationDao extends BaseDao implements IWHReconciliationDao{

	@Override
	public DataItemList selectWHRecnList(SearchWHReconciliationParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		return unifiedDao.getItems("whReconciliation.selectWHRecnList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectWHRecnDetailList(SearchWHReconciliationParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try{
    		return unifiedDao.getItems("whReconciliation.selectWHRecnDetailList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertJobItems(DataItemList items) throws DaoException {
		// TODO Auto-generated method stub
		try{
			setNewVersion(items);
    		unifiedDao.insertItems(null, "whReconciliation.insertJobItems", items);
    		setVersion(items);
    		return items;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertInvLocItems(DataItemList items) throws DaoException {
		// TODO Auto-generated method stub
		try{
			setNewVersion(items);
			unifiedDao.insertItems("whReconciliation.insertInvLocItems", items);
    		setVersion(items);
    		return items;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

}
