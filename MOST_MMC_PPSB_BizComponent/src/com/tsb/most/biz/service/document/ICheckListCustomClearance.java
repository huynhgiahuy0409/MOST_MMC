package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchCheckListCustomClearanceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICheckListCustomClearance {
	public DataItemList selectCustomClearanceList(SearchCheckListCustomClearanceParm parm) throws BizException;
}
