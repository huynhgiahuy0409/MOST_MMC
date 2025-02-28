package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoJobDao {
	public DataItemList selectCargoJobWhLocCombo(SearchCargoJobParm parm) throws DaoException;
	public DataItemList selectCargoJobSnCombo(SearchCargoJobParm parm) throws DaoException;
	public DataItemList selectCargoJobBLCombo(SearchCargoJobParm parm) throws DaoException;
	
	public DataItemList selectCargoJob(SearchCargoJobParm parm) throws DaoException;
	public String selectCargoJobRhdlNos(SearchCargoJobParm parm) throws DaoException;
	public DataItemList selectCargoJobDelete(SearchCargoJobParm parm) throws DaoException;
	public DataItemList selectCargoJobNoRhdle(SearchCargoJobParm parm) throws DaoException;
	
	public void updateRhdlJobAmt(DataItemList items) throws DaoException;
	public void updateCgBalJobAmt(DataItemList items) throws DaoException;
	public void updateJobAmt(DataItemList items) throws DaoException;
	public void updateJobGroup(DataItemList items) throws DaoException;
	public void updateArrvDelvJobAmt(DataItemList items) throws DaoException;
	public void updateInvLocJobAmt(DataItemList items) throws DaoException;
	public void updateCgMstItems(DataItemList items) throws DaoException;
	public void updateCgMstStatus(DataItemList items) throws DaoException;
	public void deleteCargoJobItems(DataItemList items) throws DaoException;
	public void updateFinalDisItems(DataItemList items) throws DaoException;
	public void updateGateInItems(UpdateItemsBizParm items) throws DaoException;
	public void updateGateOutItems(UpdateItemsBizParm items) throws DaoException;
	public DataItemList selectCargoJobForRORO(SearchCargoJobParm parm) throws DaoException;
	public void updateROROMstItems(DataItemList items) throws DaoException;
	public void deleteROROItems(DeleteItemsBizParm  items) throws DaoException;
	public void deleteConsolDeconsolVAJobForImport(DataItemList items) throws DaoException;
	public void deleteConsolDeconsolWAJobForExport(DataItemList items) throws DaoException;
	public void deleteConsolDeconsolWAJobForExportInv(DataItemList items) throws DaoException;
	public void updateStatusForROROItems(DataItemList items) throws DaoException;
}
