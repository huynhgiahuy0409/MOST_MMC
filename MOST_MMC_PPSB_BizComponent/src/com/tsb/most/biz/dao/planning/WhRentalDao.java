package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchWhRentalParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;


public class WhRentalDao extends BaseDao implements IWhRentalDao{
	
	@Override
    public DataItemList getWhRentalList(SearchWhRentalParm parm) throws DaoException {
        return unifiedDao.getItems("WhRentalMap.selectWhRentalList", parm);
    }
	
	@Override
    public DataItemList getChkDupliRentNo(SearchWhRentalParm parm) throws DaoException {
        return unifiedDao.getItems("WhRentalMap.selectChkDupliRentNo", parm);
    }
	
	@Override
    public DataItemList getWhRentalDtlList(SearchWhRentalParm parm) throws DaoException {
        return unifiedDao.getItems("WhRentalMap.selectWhRentalDtlList", parm);
    }
	
	@Override
    public DataItemList getRefNo(SearchWhRentalParm parm) throws DaoException {
        return unifiedDao.getItems("WhRentalMap.getRefNo", parm);
    }
	
	@Override
    public DataItemList getMaxRefNo(SearchWhRentalParm parm) throws DaoException {
        return unifiedDao.getItems("WhRentalMap.getMaxRefNo", parm);
    }    
  
	@Override
    public void insertWhRentalItems(DataItemList items) throws DaoException {
        unifiedDao.insertItems("WhRentalMap.insertWhRentalItems", items);
    }
   
	@Override
    public void updateWhRentalItems(DataItemList items) throws DaoException {
        unifiedDao.updateItems("WhRentalMap.updateWhRentalItems", items);
    }
	
	@Override
    public void deleteWhRentalItems(DataItemList items) throws DaoException {
        unifiedDao.deleteItems("WhRentalMap.deleteWhRentalItems", items);
    }

	@Override
    public void insertRentalDtlItems(DataItemList items) throws DaoException {
        unifiedDao.insertItems("WhRentalMap.insertRentalDtlItems", items);
    }
    
	@Override
    public void deleteRentalDtlItems(DataItemList items) throws DaoException {
        unifiedDao.deleteItems("WhRentalMap.deleteRentalDtlItems", items);
    }
}
