package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchServiceOrderParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IServiceOrder {

	public DataItemList selectServiceOrderList(SearchServiceOrderParm parm) throws BizException;
    public void updateServiceOrderProcessItems(UpdateItemsBizParm parm) throws BizException;
    public DataItemList selectServiceOrderItem(SearchServiceOrderParm parm) throws BizException;
    public DataItemList selectServiceOrderItems(SearchServiceOrderParm parm) throws BizException;
    public void processServiceOrderItem(UpdateItemsBizParm parm) throws BizException;
    
    public DataItemList insertServiceOrderItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateServiceOrderItem(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteServiceOrderItem(DeleteItemsBizParm parm) throws BizException;
	public DataItemList selectBLItems(SearchServiceOrderParm parm) throws BizException;
	public DataItemList selectShippingNoteItems(SearchServiceOrderParm parm) throws BizException;
	public DataItemList selectBLSNItems(SearchServiceOrderParm parm) throws BizException;
	
}
