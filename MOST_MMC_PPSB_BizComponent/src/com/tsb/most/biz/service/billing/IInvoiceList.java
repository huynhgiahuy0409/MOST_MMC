package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchInvoiceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IInvoiceList {
	//Invoice List
	public DataItemList selectInvoiceItemList(SearchInvoiceParm parm) throws BizException;
	public DataItemList updateXmsInvoiceStatus(UpdateItemsBizParm parm) throws BizException;

	//Invoice Detail
	public DataItemList selectInvoiceDetailItem(SearchInvoiceParm parm) throws BizException;
	public void updateInvoiceDetailItem(UpdateItemsBizParm parm)throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
	
	public void transferInvoiceItems(UpdateItemsBizParm parm)throws BizException;
}
