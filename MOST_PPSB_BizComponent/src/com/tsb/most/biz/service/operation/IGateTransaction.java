package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.document.SearchTruckAssignmentParm;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGateTransaction {
	public DataItemList selectArrvDelvIsCheck(SearchCargoArrvDelvParm parm) throws BizException;
	public DataItemList selectGateInData(SearchCargoArrvDelvParm parm) throws BizException;
	public DataItemList selectCargoArrvDelv(SearchCargoArrvDelvParm parm) throws BizException;
	public DataItemList selectAssignmentLorrysGateItems(SearchTruckAssignmentParm parm) throws BizException;
	public DataItemList selectGateOutCheck(SearchCargoArrvDelvParm parm) throws BizException;
	public DataItemList selectGateInCargoItem(SearchCargoArrvDelvParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	
}
