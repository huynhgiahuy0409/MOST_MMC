package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchDeploymentListParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDeploymentList {
	public DataItemList selectDeploymentItems(SearchDeploymentListParm parm) throws BizException;
}
