package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchUnclosedOperationListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IUnclosedOperationList {
	public DataItemList selectUnclosedOperationList(SearchUnclosedOperationListParm param) throws BizException;
}
