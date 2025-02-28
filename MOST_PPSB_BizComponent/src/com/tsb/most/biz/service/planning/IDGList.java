package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dataitem.planning.DGListItem;
import com.tsb.most.biz.parm.planning.SearchDGListParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDGList {
	public DataItemList getDGList(SearchDGListParm parm) throws BizException;
	public DataItemList getDGDetail(SearchDGListParm parm) throws BizException;
	public DataItemList getSubstanceItems(SearchDGListParm parm) throws BizException;
	
	public DataItemList processDGDetail(UpdateItemsBizParm  parm) throws BizException;
}
