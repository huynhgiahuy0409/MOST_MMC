package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchVORLiquidBulkParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVORLiquidBulk {
	public DataItemList selectBerthAndOperationItems(SearchVORLiquidBulkParm parm) throws BizException;
	public DataItemList selectVORSummaryItems(SearchVORLiquidBulkParm parm) throws BizException;
	public DataItemList selectVORDelaySummaryItems(SearchVORLiquidBulkParm parm) throws BizException;
	public DataItemList selectVORLiquidBulkCgOprType(SearchVORLiquidBulkParm parm) throws BizException;
	
	public DataItemList selectConfirmationSlipDetailItem(SearchVORLiquidBulkParm parm) throws BizException;
	public DataItemList selectVORLiquidBulkDetail(SearchVORLiquidBulkParm parm) throws BizException;
	
	public DataItemList insertVORLiquidCargo(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertVORLiquidDelay(InsertItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList selectVORLiquidBulkCmdtList(SearchVORLiquidBulkParm parm) throws BizException;
	public DataItemList selectOprTimeSetList(SearchVORLiquidBulkParm parm) throws BizException;
	public DataItemList selectDelayCodeList(SearchVORLiquidBulkParm parm) throws BizException;
	public DataItemList selectDelayTimeSumForLiquid(SearchVORLiquidBulkParm parm) throws BizException;
}
