package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGatePassImportParm;
import com.tsb.most.biz.parm.monitoring.SearchGatePassListParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGatePassList {
	public DataItemList selectCargoGatePassList(SearchGatePassListParm parm) throws BizException;
	public DataItemList selectCargoMasterComboList(SearchCargoMasterParm parm) throws BizException;
	
	public DataItemList selectGatePassImportList(SearchGatePassImportParm parm) throws BizException;
}
