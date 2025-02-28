package com.tsb.most.biz.service.billing;

import com.tsb.most.biz.parm.billing.SearchInvoiceTemplateParm;
import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IInvoiceTemplate {
	public DataItemList selectInvoiceTemplateList(SearchInvoiceTemplateParm param) throws BizException;
	public DataItemList selectTariffTemplate(SearchInvoiceTemplateParm param) throws BizException;
	public DataItemList selectTariffCode(SearchTariffCodeParm param) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm param) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm param) throws BizException;
	public DataItemList deleteItems(DeleteItemsBizParm param) throws BizException;
}
