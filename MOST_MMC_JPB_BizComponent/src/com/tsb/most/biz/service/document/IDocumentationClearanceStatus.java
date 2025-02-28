package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchDocumentCleranceParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IDocumentationClearanceStatus{
	public IDataItem getDocumentCleranceLists(SearchDocumentCleranceParm parm) throws BizException;
    public IDataItem getBethPlanList(SearchDocumentCleranceParm parm) throws BizException;
}
