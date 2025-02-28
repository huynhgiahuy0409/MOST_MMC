package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchMovementListParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class MovementListDao extends BaseDao implements IMovementListDao {
   
    public DataItemList selectCargoMovementList(SearchMovementListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("movementList.selectCargoMovementList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectMVWHComboList(SearchMovementListParm parm) throws DaoException{
    	try{
    		return unifiedDao.getItems("movementList.selectMVWHComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}