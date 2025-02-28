package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchAlertFunctionParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IAlertFunction {
	public DataItemList getAlertFunctionList(SearchAlertFunctionParm parm) throws BizException;
}
