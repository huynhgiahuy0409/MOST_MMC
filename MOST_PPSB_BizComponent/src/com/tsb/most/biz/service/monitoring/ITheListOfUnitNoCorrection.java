package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchTheListOfUnitNoCorrectionParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITheListOfUnitNoCorrection {
	public DataItemList selectCorrectionUnitNoItems(SearchTheListOfUnitNoCorrectionParm parm) throws BizException;
}
