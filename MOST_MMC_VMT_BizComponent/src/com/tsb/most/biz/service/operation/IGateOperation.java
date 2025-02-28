package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchGateOperationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGateOperation {
	
	//Cargo
	public DataItemList selectGCGateInItems(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectGCGateOutItems(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectCargoLorryGateIn(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectCargoLorryGateOut(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectCargoGateInCheck(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectCargoGateOutCheck(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectCargoArrivalDelivery(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectGrInfo(SearchGateOperationParm parm) throws BizException;
	public DataItemList selectBlDoInfo(SearchGateOperationParm parm) throws BizException;
	public DataItemList insertCargoGateInItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateCargoGateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateCargoGateInChkInTimeItems(UpdateItemsBizParm parm) throws BizException;
	
	//RORO
	public DataItemList selectROROGateInItems(SearchGateOperationParm parm) throws BizException;
	public DataItemList updateROROGateInItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList selectROROGateOutItems(SearchGateOperationParm parm) throws BizException;
	public DataItemList insertROROGateoutItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateROROGateoutItems(UpdateItemsBizParm parm) throws BizException;
	
	//Liquid
	
}
