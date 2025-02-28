package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchTerminalHoldReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ITerminalHoldReleaseControl {
	public DataItemList selectTerminalHoldReleaseList(SearchTerminalHoldReleaseControlParm parm) throws BizException;
	public DataItemList selectTerminalHoldReleaseHist(SearchTerminalHoldReleaseControlParm parm) throws BizException;
	public DataItemList selectOPStoppedByHoldReason(SearchTerminalHoldReleaseControlParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm)throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm)throws BizException;
	
	public DataItemList checkTerminalHold(SearchTerminalHoldReleaseControlParm parm) throws BizException;
}
