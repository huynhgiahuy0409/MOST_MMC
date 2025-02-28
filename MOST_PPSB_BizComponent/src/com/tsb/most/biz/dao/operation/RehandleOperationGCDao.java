package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchRehandleOperationGCParm;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class RehandleOperationGCDao extends BaseDao implements IRehandleOperationGCDao {

	public DataItemList selectCargoRhdlOperation(SearchRehandleOperationGCParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("rehandleOperationGC.selectCargoRhdlOperation", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
}
