package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchCostCenterParm;
import com.tsb.most.biz.parm.billing.SearchSSRListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ISSRList {
	public DataItemList selectSSRList(SearchSSRListParm parm) throws BizException;
	public DataItemList selectInvoicedSSR(SearchSSRListParm parm) throws BizException;
	public DataItemList selectVesselInfo(SearchSSRListParm parm) throws BizException;
	public DataItemList selectCostCenter(SearchCostCenterParm parm) throws BizException;
	public DataItemList selectSsrPayer(SearchSSRListParm parm) throws BizException;
	public DataItemList selectSSRDetailList(SearchSSRListParm parm) throws BizException;
	public DataItemList selectSSRValidation(SearchSSRListParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteInvoiceUnit(DeleteItemsBizParm parm) throws BizException;
	public DataItemList updateDetailItems(UpdateItemsBizParm param) throws BizException;
	public DataItemList insertInvoiceItems(InsertItemsBizParm parm) throws BizException ;
}
