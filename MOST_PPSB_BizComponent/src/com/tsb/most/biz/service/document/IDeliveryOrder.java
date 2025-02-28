package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchDeliveryOrderParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDeliveryOrder {
	
	public DataItemList selectDeliveryOrder(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList getWhCheckDataForIndirect(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList getApronCheckDataForIndirect(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList selectSubDeliveryOrder(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList selectDeliveryOrderDetail(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList subDoNoDuplicateChk(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList selectCargoMasterList(SearchCargoMasterParm parm) throws BizException;
	public DataItemList selectPackageItems(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList selectDeliveryOrderWgtCheck(SearchDeliveryOrderParm parm) throws BizException;
	public DataItemList selectSubDeliveryOrderReport(SearchDeliveryOrderParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public void deleteItems(DeleteItemsBizParm parm) throws BizException;
	public DataItemList insertSubDeliveryOrderItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateSubDeliveryOrderItems(UpdateItemsBizParm parm) throws BizException;
	public void deleteSubDeliveryOrderItems(DeleteItemsBizParm parm) throws BizException;
}
