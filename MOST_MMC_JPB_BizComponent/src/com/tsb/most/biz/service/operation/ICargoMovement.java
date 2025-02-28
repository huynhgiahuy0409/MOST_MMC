package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchCargoMovementParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICargoMovement {
	public DataItemList selectCargoMovementList(SearchCargoMovementParm parm) throws BizException;
	public DataItemList selectCargoMovement(SearchCargoMovementParm parm) throws BizException;
	public DataItemList selectPBZB10Movement(SearchCargoMovementParm parm) throws BizException;
	
	public void updateCargoMovementItems(UpdateItemsBizParm parm) throws BizException;
	public void processCargoMovementItem(UpdateItemsBizParm parm) throws BizException;
}