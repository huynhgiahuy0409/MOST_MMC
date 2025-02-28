package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoMovementParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoMovementDao {
	public DataItemList selectCargoMovementList(SearchCargoMovementParm parm) throws DaoException;
	public DataItemList selectMVWHComboList(SearchCargoMovementParm parm) throws DaoException;
	public DataItemList selectCargoMVLoc(SearchCargoMovementParm parm) throws DaoException;
	public DataItemList selectInvLocList(SearchCargoMovementParm parm) throws DaoException;
	
	public void insertCargoMovementJobItems(DataItemList items) throws DaoException;
	public void insertMinusInvLocItems(DataItemList items) throws DaoException;
	public void insertInvLocItems(DataItemList items) throws DaoException;
	public void updateWeightBridge(DataItemList items) throws DaoException;
}