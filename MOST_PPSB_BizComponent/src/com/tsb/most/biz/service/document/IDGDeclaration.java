package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDGDeclaration{
	public DataItemList getDGDeclarationItems(SearchDGDeclarationParm parm) throws BizException;
}
