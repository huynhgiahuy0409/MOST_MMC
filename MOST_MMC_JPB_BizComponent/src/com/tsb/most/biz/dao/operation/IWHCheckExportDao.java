package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchWHCheckExportParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IWHCheckExportDao {
	
	public DataItemList selectCargoWarehouseCheckExportItems(SearchWHCheckExportParm parm) throws DaoException;
	public DataItemList checkAmoutLocation(SearchWHCheckExportParm parm) throws DaoException;
	public DataItemList selectInvLocList(SearchWHCheckExportParm parm) throws DaoException;
	
	public void updateCgWarehouseCheckStateItems(DataItemList parm) throws DaoException;
	public void insertJobItems(DataItemList parm) throws DaoException;
	public void insertShutOutJobItems(DataItemList parm) throws DaoException;
	public void updateCargoMasterStatus(DataItemList parm) throws DaoException;
	public void updateCargoMasterInfo(DataItemList parm) throws DaoException;
	public void insertCargoInvLocationItems(DataItemList parm) throws DaoException;
	public void insertShutOutInvLocationItems(DataItemList parm) throws DaoException;
	
	public void insertPackageJobItems(DataItemList items) throws DaoException;
	public DataItemList selectWHExportForROROItems(SearchWHCheckExportParm parm)throws DaoException;
	public boolean selectIsROROMst(SearchCargoMasterParm parm)throws DaoException;
	public DataItemList updateCgWarehouseCheckofRORO(UpdateItemsBizParm items) throws DaoException;
	public DataItemList selectUnitNoOfGR(SearchWHCheckExportParm parm) throws DaoException;
}
