package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.LorryListParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface ILorryList {
	public IDataItem selectLorryList(LorryListParm parm) throws BizException;
}
