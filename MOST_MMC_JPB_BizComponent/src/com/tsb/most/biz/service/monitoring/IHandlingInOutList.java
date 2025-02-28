package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.operation.SearchCargoHandlingInParm;
import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.biz.parm.operation.SearchCargoJobParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IHandlingInOutList {
	public DataItemList selectCargoHIList(SearchCargoHandlingInParm parm) throws BizException;
	public DataItemList selectCargoHOList(SearchCargoHandlingOutParm parm) throws BizException;
	public DataItemList selectWHComboList(SearchCargoMasterParm parm) throws BizException;
	public DataItemList selectWhSnBlComboList(SearchCargoJobParm parm)  throws BizException;
}
