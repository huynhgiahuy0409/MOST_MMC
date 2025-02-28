package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchHangingScaleParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IHangingScaleDao {
	public DataItemList selectHangingScaleItems(SearchHangingScaleParm parm) throws DaoException;
	
	public void updateHangingScaleItems(DataItemList items) throws DaoException;
}