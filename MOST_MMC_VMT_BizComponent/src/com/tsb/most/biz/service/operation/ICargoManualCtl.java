package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoExportParm;
import com.tsb.most.biz.parm.operation.SearchCargoGatePassParm;
import com.tsb.most.biz.parm.operation.SearchCargoGeneralParm;
import com.tsb.most.biz.parm.operation.SearchCargoImportParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.biz.parm.operation.SearchTruckAssignmentParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoManualCtl {
	public DataItemList selectCargoGeneralList(SearchCargoGeneralParm parm) throws BizException;
	public DataItemList selectCargoExportList(SearchCargoExportParm parm) throws BizException;
	public DataItemList selectCargoImportList(SearchCargoImportParm parm) throws BizException;
	public DataItemList selectCargoGatePassList(SearchCargoGatePassParm parm) throws BizException;
	
	public DataItemList selectSnBlComboList(SearchCargoMasterParm parm) throws BizException;
	public DataItemList selectGrGoComboList(SearchCargoMasterParm parm) throws BizException;
	public DataItemList selectGpGoComboList(SearchCargoMasterParm parm) throws BizException;
	public DataItemList selectCargoGeneralComboList(SearchCargoGeneralParm parm) throws BizException;
	public DataItemList selectOperationSetShftDtList(SearchOperationSettingParm parm) throws BizException;
	public DataItemList selectOperationSetShftList(SearchOperationSettingParm parm) throws BizException;
	
	public DataItemList updatingYardTruckWHCheckImport(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updatingYardTruckIndirectLoading(UpdateItemsBizParm parm) throws BizException;
	
	/******TABLET***********************/
	public DataItemList selectQrInformation(SearchTruckAssignmentParm parm) throws BizException;
	
	/******RORO***********************/
	public DataItemList selectCargoExportROROList(SearchCargoExportParm parm) throws BizException;
	public DataItemList selectCargoImportROROList(SearchCargoImportParm parm) throws BizException;
	
	/**** RBT. TEST. Activate Operation ***/
	public DataItemList processActivateOperation(UpdateItemsBizParm parm) throws BizException;
	
}