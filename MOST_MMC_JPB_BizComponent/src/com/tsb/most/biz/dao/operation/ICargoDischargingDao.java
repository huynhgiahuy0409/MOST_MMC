package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoDischargingDao {
	public DataItemList selectCargoDischargingList(SearchCargoDischargingParm parm) throws DaoException;
	public DataItemList selectCargoDischargingOfBarge(SearchCargoDischargingParm parm) throws DaoException;
	
	public void insertCargoDischargingItems(DataItemList items) throws DaoException;
	public void updateCargoDischargingItems(DataItemList items) throws DaoException;
	public void updateDischaringAmts(DataItemList items) throws DaoException;
	public void insertJobItems(DataItemList items) throws DaoException;
	public void updateCargoMasterStatus(DataItemList items) throws DaoException;
	public void updateCargoMasterInfo(DataItemList items) throws DaoException;
	public void insertDelvItems(DataItemList items) throws DaoException;
	public void updateDelvItems(DataItemList items) throws DaoException;
	public void insertBalItems(DataItemList items) throws DaoException;
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException;
	public void updateDischaringFinals(DataItemList items) throws DaoException;
	public void updateNextPurpCd(DataItemList items) throws DaoException;
	
	public void insertPackageJobItems(DataItemList items) throws DaoException;
}