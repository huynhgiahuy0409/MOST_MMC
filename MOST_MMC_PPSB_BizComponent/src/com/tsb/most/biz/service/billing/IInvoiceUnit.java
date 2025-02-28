package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchInvoiceUnitParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public interface IInvoiceUnit {
	public DataItemList selectInvoiceUnit(SearchInvoiceUnitParm param) throws BizException;
	public DataItemList selectInvoiceUnitUsedList(SearchInvoiceUnitParm param) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException;
	
}