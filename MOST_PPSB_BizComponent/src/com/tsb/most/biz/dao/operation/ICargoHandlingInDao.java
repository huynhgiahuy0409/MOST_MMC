package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoHandlingInDao {
	public DataItemList selectCargoHandlingInList(SearchCargoHandlingInParm parm) throws DaoException;
	public DataItemList selectLocationList(SearchCargoHandlingInParm parm) throws DaoException;
	public String selectGateInTimeSeq(SearchCargoHandlingInParm parm) throws DaoException;
	
	public void insertCargoHandlingInItems(DataItemList items) throws DaoException;
	public void updateCgHIAmtItems(DataItemList items) throws DaoException;
	public void insertHIJobItems(DataItemList items) throws DaoException;
	public void insertBalItems(DataItemList items) throws DaoException;
	public void insertRhdlItems(DataItemList items) throws DaoException;
	public void updateHIGPArrvDelvItems(DataItemList items) throws DaoException;
	public void updateCargoHandlingInItems(DataItemList items) throws DaoException;
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException;
	public void updateCargoMasterStatus(DataItemList items) throws DaoException;
	public void updateCargoMasterInfo(DataItemList items) throws DaoException;
	public void insertHIArrvDelvItems(DataItemList items) throws DaoException;
	public void updateHIArrvDelvItems(DataItemList items) throws DaoException;
	public void insertHIGeneralGateIn(DataItemList items) throws DaoException;
	public void updateHIGateInTime(DataItemList items) throws DaoException;
	public void updateHIGateInLorry(DataItemList items) throws DaoException;
	public void updateHIOnlyLorry(DataItemList items) throws DaoException;
	
	public void insertPackageJobItems(DataItemList items) throws DaoException;
}