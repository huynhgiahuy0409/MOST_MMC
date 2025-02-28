package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchTheListOfYardPlanOfRoRoParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITheListOfYardPlanOfRoRo {
	public DataItemList selectTheListOfYardPlanOfROROItems(SearchTheListOfYardPlanOfRoRoParm parm) throws BizException;
}
