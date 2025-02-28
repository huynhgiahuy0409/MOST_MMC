package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoLoadingDao {
	public DataItemList selectCargoLoadingList(SearchCargoLoadingParm parm) throws DaoException;
	public DataItemList selectWAJobList(SearchCargoLoadingParm parm) throws DaoException;
	public String selectGateInTimeSeq(SearchCargoLoadingParm parm) throws DaoException;
	public DataItemList selectCargoRhdLoadingList(SearchCargoLoadingParm parm) throws DaoException;
	public DataItemList selectPiplineGrNo(SearchCargoLoadingParm parm) throws DaoException;
	
	public void insertCargoLoadingItems(DataItemList items) throws DaoException;
	public void updateCgLdAmtItems(DataItemList items) throws DaoException;
	public void updateCgLdStateItems(DataItemList items) throws DaoException;
	public void updateCgLdCancelItems(DataItemList items) throws DaoException;
	public void updateCgLoadedRePackItems(DataItemList items) throws DaoException;
	public void updateCgLoadedDamageItems(DataItemList items) throws DaoException;
	public void insertJobItems(DataItemList items) throws DaoException;
	public void updateNextJobNoForWAJob(DataItemList items) throws DaoException;
	public void updateCargoMasterStatus(DataItemList items) throws DaoException;
	public void updateCargoMasterInfo(DataItemList items) throws DaoException;
	public void insertBalItems(DataItemList items) throws DaoException;
	public void insertRhdlItems(DataItemList items) throws DaoException;
	public void insertArrvDelvItems(DataItemList items) throws DaoException;
	public void updateArrvDelvItems(DataItemList items) throws DaoException;
	public void updateGPArrvDelvItems(DataItemList items) throws DaoException;
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException;
	public void insertAllocationItems(DataItemList items) throws DaoException;
	public void insertLDGeneralGateInItems(DataItemList items) throws DaoException;
	public void updateLDGateInTimeItems(DataItemList items) throws DaoException;
	public void updateLDGateInLorryItems(DataItemList items) throws DaoException;
	public void updateLDGateInOnlyLorryItems(DataItemList items) throws DaoException;
	
	public void insertPackageJobItems(DataItemList items) throws DaoException;

	public DataItemList getCargoRhdlLoadingList(SearchCargoLoadingParm parm) throws DaoException;
	public DataItemList getCargoRhdlDtlLoading(SearchCargoLoadingParm parm) throws DaoException;
	public void updateStatus(DataItemList items) throws DaoException;
	public void upAndDelMstItems(DataItemList items) throws DaoException;
}