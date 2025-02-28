package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchRehandleOperationGCParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IRehandleOperationGCDao {
	public DataItemList selectCargoRhdlOperation(SearchRehandleOperationGCParm parm) throws DaoException;

}