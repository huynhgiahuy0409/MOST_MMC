package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IWHCheckImport {
	public DataItemList selectWhCheckImportList(SearchCargoDischargingParm parm) throws BizException;
	public DataItemList selectWhCheckImportHatchList(SearchOperationSettingParm parm) throws BizException;
	public DataItemList selectCargoDischargingOperationSetHatch(SearchOperationSettingParm parm) throws BizException;
	public DataItemList selectLocationList(SearchOperationSettingParm parm) throws BizException;
	
	public DataItemList updateWhCheckImportItems(UpdateItemsBizParm parm) throws BizException;
	
	//RORO
	public DataItemList selectWhCheckImportForROROList(SearchConfirmDischargingOfROROParm parm) throws BizException;
	public DataItemList updateROROItems(UpdateItemsBizParm parm) throws BizException;
}
