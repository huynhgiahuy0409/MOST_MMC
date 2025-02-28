package com.tsb.most.biz.service.operation;

import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoJobDao {
	public void upAndDelMstItems(DataItemList items) throws DaoException;
}
