package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRehandleCargoLoading {
	public DataItemList selectCargoRhdLoadingList(SearchCargoLoadingParm parm) throws BizException;

	public DataItemList updateCargoRhdlLoadingItem(UpdateItemsBizParm parm) throws BizException;
}