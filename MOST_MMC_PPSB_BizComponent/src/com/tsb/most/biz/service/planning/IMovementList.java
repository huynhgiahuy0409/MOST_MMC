package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchMovementListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IMovementList {
	public DataItemList selectCargoMovementList(SearchMovementListParm parm) throws BizException;
}
