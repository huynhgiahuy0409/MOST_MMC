package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchDamageCheckParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDamageCheck {
	public DataItemList selectDamageCheck(SearchDamageCheckParm parm)throws BizException;
	public DataItemList selectBlSnNo(SearchDamageCheckParm parm) throws BizException;
	public DataItemList selectDoGrNo(SearchDamageCheckParm parm) throws BizException;
	
	public DataItemList insertDamageCheck(InsertItemsBizParm parm)throws BizException;
	public DataItemList updateDamageCheck(UpdateItemsBizParm parm) throws BizException;
	
}
