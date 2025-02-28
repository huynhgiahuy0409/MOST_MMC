package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITheListOfDamageCheckOfGC{
	
	public DataItemList selectGCDamageCheckItems(SearchDamageCheckParm parm) throws BizException;
	public DataItemList deleteGCDmgItem(DeleteItemsBizParm parm) throws BizException;
}
