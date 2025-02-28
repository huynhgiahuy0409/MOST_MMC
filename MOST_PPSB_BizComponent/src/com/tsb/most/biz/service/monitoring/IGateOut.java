package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchGateOutParm;
import com.tsb.most.biz.parm.report.SearchCargoInterchangeReceiptParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGateOut {
	public DataItemList selectListOfGateOut(SearchGateOutParm parm) throws BizException;
	public DataItemList selectListOfGateOutBlComboList(SearchGateOutParm parm) throws BizException;
	
	public DataItemList selectCargoInterchangeReceiptReport(SearchCargoInterchangeReceiptParm parm) throws BizException;
}
