package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoHandlingOut {
	public DataItemList selectCargoHandlingOutList(SearchCargoHandlingOutParm parm) throws BizException;

	public DataItemList updateCargoHandlingOutItem(UpdateItemsBizParm parm) throws BizException;
}