package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchHangingScaleParm;
import com.tsb.most.biz.parm.operation.SearchOperationSettingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoLoading {
	public DataItemList selectCargoLoadingList(SearchCargoLoadingParm parm) throws BizException;
	public DataItemList selectCargoLoadingHatchList(SearchOperationSettingParm parm) throws BizException;
	public DataItemList selectCargoLoadingOperationSetHatch(SearchOperationSettingParm parm) throws BizException;
	public DataItemList selectHangingScaleItems(SearchHangingScaleParm parm) throws BizException;
	public DataItemList selectPiplineGrNo(SearchCargoLoadingParm parm) throws BizException;
	
	public DataItemList updateCargoLoadingItems(UpdateItemsBizParm parm) throws BizException;
}