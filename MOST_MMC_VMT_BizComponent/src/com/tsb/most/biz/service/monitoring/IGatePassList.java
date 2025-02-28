package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.CargoGatePassParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IGatePassList {
	public IDataItem selectCargoGatePassList(CargoGatePassParm parm) throws BizException;
}
