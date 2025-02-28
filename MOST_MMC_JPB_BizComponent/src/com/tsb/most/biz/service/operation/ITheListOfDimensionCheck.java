package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITheListOfDimensionCheck{
	
	public DataItemList selectGCDimensionCheckItems(SearchDimensionCheckParm parm) throws BizException;
	public DataItemList selectGCDimensionDtlDmgItems(SearchDimensionCheckParm parm) throws BizException;
	public DataItemList deleteGCDimensionItem(DeleteItemsBizParm parm) throws BizException;
}
