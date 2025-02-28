package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IHandlingInOutListDao {
	public DataItemList selectCargoHIList(SearchCargoHandlingInParm parm) throws DaoException;
	public DataItemList selectCargoHOList(SearchCargoHandlingOutParm parm) throws DaoException;

}
