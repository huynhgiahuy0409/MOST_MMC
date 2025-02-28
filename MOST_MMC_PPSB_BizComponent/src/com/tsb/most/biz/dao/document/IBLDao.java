package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IBLDao {
	public DataItemList selectBLList(SearchBLParm parm) throws DaoException;
	public DataItemList checkBLOperation(SearchBLParm parm) throws DaoException;
	public DataItemList selectBLListForMf(SearchBLParm parm) throws DaoException;
	public DataItemList selectContainerList(SearchBLParm parm) throws DaoException;
	public DataItemList checkZB55(SearchBLParm parm) throws DaoException;
	public DataItemList checkBLNo(SearchBLParm parm) throws DaoException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException;
	public void deleteBlItems(DeleteItemsBizParm items) throws DaoException;
	
	//remove function
	public DataItemList selectNewBLJobNo(SearchBLParm parm) throws DaoException;
	public DataItemList selectMfBLList(SearchBLParm parm) throws DaoException;

	//RORO
	public DataItemList selectRoRoItems(SearchBLParm parm) throws DaoException;
	public void insertRoRoItems(DataItem item) throws DaoException;
	public void deleteRoRoItems(DataItem item) throws DaoException;
	
	//package
	public DataItemList selectPackageItems(SearchBLParm parm) throws DaoException;
	public DataItemList selectSplitPackageItems(SearchBLParm parm) throws DaoException;
	public void insertPackageItems(DataItem item) throws DaoException;
	public void updatePackageItems(DataItem item) throws DaoException;
	public void updateSplitPackageItems(DataItem item) throws DaoException;
    public void deletePackageItems(DataItem item) throws DaoException;
	
	public void insertBlCargoDetailItems(DataItem item) throws DaoException;
	public void deleteBlCargoDetailItems(DataItem item) throws DaoException;
	public void insertManifestItems(DataItem item) throws DaoException;
	public void deleteManifest(DataItem item) throws DaoException;
	public DataItemList selectBlCargoDetail(SearchBLParm parm) throws DaoException;
	public DataItemList checkManifest(SearchBLParm parm) throws DaoException;
	public void updateManifest(DataItem item) throws DaoException;
	public DataItemList checkNilManifest(SearchBLParm parm) throws DaoException;
	public DataItemList checkDO(SearchBLParm parm) throws DaoException;
	public DataItemList checkTruck(SearchBLParm parm) throws DaoException;
	public DataItemList checkOperation(SearchBLParm parm) throws DaoException;
	public DataItemList checkGateIn(SearchBLParm parm) throws DaoException;
	public DataItemList selectSplitWgtChk(SearchBLParm parm) throws DaoException;
	public DataItemList selectSplitWgt(SearchBLParm parm) throws DaoException;
	public DataItemList selectOriginalWgt(SearchBLParm parm) throws DaoException;
	public DataItemList selectOriginalDOWgt(SearchBLParm parm) throws DaoException;
	public DataItemList selectSplitExistChk(SearchBLParm parm) throws DaoException;
	public DataItemList selectSubDoWeightList(SearchBLParm parm) throws DaoException;
	public DataItemList updateOriginalBlStatus(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateBlStatus(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateOriginalBlWgt(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateDoWgt(UpdateItemsBizParm parm) throws DaoException;
	
}
