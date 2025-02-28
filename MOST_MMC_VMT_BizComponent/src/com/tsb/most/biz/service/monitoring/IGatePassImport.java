package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.GatePassImportParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IGatePassImport {
	public IDataItem selectGatePassImport(GatePassImportParm parm) throws BizException; 
}
