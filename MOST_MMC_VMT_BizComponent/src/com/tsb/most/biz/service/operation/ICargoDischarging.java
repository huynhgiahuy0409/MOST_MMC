package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoDischargingParm;
import com.tsb.most.biz.parm.operation.SearchHangingScaleParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoDischarging {
	public DataItemList selectCargoDischargingList(SearchCargoDischargingParm parm) throws BizException;
	public DataItemList selectCargoDischargingHatchList(SearchOperationSettingParm parm) throws BizException;
	public DataItemList selectOperationSetHatch(SearchOperationSettingParm parm) throws BizException;
	public DataItemList selectCargoDischargingOfBarge(SearchCargoDischargingParm parm) throws BizException;
	
	public DataItemList updateCargoDischarging(UpdateItemsBizParm parm) throws BizException;
	
	//Hanging scale
	public DataItemList selectHangingScaleItems(SearchHangingScaleParm parm) throws BizException;

}