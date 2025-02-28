package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoHandlingIn {
	public DataItemList selectCargoHandlingInList(SearchCargoHandlingInParm parm) throws BizException;
	public DataItemList selectLocationList(SearchCargoHandlingInParm parm) throws BizException;

	public DataItemList updateCargoHandlingInItems(UpdateItemsBizParm parm) throws BizException;
}