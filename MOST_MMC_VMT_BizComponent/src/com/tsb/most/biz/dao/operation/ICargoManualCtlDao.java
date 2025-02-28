package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoExportParm;
import com.tsb.most.biz.parm.operation.SearchCargoGatePassParm;
import com.tsb.most.biz.parm.operation.SearchCargoGeneralParm;
import com.tsb.most.biz.parm.operation.SearchCargoImportParm;
import com.tsb.most.biz.parm.operation.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoManualCtlDao {
	//General Tab
	public DataItemList selectCargoGeneralList(SearchCargoGeneralParm parm) throws DaoException;
	public DataItemList selectCargoGeneralTotal(SearchCargoGeneralParm parm) throws DaoException;
	public DataItemList selectCargoGeneralRemain(SearchCargoGeneralParm parm) throws DaoException;
	
	//Export Tab
	public DataItemList selectCargoExportList(SearchCargoExportParm parm) throws DaoException;
	public DataItemList updatingYardTruckIndirectLoading(UpdateItemsBizParm parm) throws DaoException;
	
	//Import Tab
	public DataItemList selectCargoImportList(SearchCargoImportParm parm) throws DaoException;
	public DataItemList updatingYardTruckWHCheckImport(UpdateItemsBizParm parm) throws DaoException;
	
	//GatePass Tab
	public DataItemList selectCargoGatePassList(SearchCargoGatePassParm parm) throws DaoException;
	public DataItemList selectBLComboList(SearchCargoGatePassParm parm) throws DaoException;
	
	//Tablet
	public DataItemList selectQrInformation(SearchTruckAssignmentParm parm) throws DaoException;
	public DataItemList selectCargoExportForROROList(SearchCargoExportParm parm)throws DaoException;
	public DataItemList selectCargoImporForROROtList(SearchCargoImportParm parm)throws DaoException;
}