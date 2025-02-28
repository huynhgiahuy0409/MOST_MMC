package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchROROCargoInYardParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IROROCargoInYard{
	public DataItemList selectRoRoCargoInYardItems(SearchROROCargoInYardParm parm) throws BizException;
}
