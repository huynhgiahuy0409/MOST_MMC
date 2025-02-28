package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchDimensionCheckParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDimensionCheck {
	public DataItemList selectBlSnNo(SearchDimensionCheckParm parm) throws BizException;
	public DataItemList selectDoGrNo(SearchDimensionCheckParm parm) throws BizException;
	public DataItemList selectDimensionCheck(SearchDimensionCheckParm parm)throws BizException;
	
	public DataItemList insertDimensionCheck(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateDimensionCheck(UpdateItemsBizParm parm) throws BizException;
}
