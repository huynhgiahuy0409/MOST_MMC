package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IOperationSettingDao {
	public DataItemList selectOperationSetShftDtList(SearchOperationSettingParm parm) throws DaoException;
	public DataItemList selectOperationSetShftList(SearchOperationSettingParm parm) throws DaoException;
	public DataItemList selectOpHatchList(SearchOperationSettingParm parm) throws DaoException;
	public DataItemList selectOperationSetHatch(SearchOperationSettingParm parm) throws DaoException;
	public DataItemList selectLocationList(SearchOperationSettingParm parm) throws DaoException;
	public DataItemList getOpHatchList(SearchOperationSettingParm parm) throws DaoException;
	public DataItemList getOperationSetHatch(SearchOperationSettingParm parm) throws DaoException;
}