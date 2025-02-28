package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchCreditNoteParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ICreditNote {
	public DataItemList selectCreditNoteList(SearchCreditNoteParm parm) throws BizException;

	public DataItemList selectCreditNoteDetail(SearchCreditNoteParm parm) throws BizException;

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;

	public DataItemList updateItems(UpdateItemsBizParm updateParm) throws BizException;

	public String generateInvoiceNo() throws BizException;
}
