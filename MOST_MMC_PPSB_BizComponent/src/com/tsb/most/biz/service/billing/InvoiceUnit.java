package com.tsb.most.biz.service.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.biz.dao.billing.IInvoiceUnitDao;
import com.tsb.most.biz.dataitem.billing.InvoiceUnitItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceUnitParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class InvoiceUnit extends MOSTBaseService implements IInvoiceUnit{
	private IInvoiceUnitDao invoiceUnitDao;
	
	public void setInvoiceUnitDao(IInvoiceUnitDao invoiceUnitDao) {
		this.invoiceUnitDao = invoiceUnitDao;
	}

	public DataItemList selectInvoiceUnit(SearchInvoiceUnitParm param) throws BizException {
		return invoiceUnitDao.selectInvoiceUnit(param);
	}
	
	public DataItemList selectInvoiceUnitUsedList(SearchInvoiceUnitParm param) throws BizException{
		
		List d = invoiceUnitDao.isItemInUsed(param).getCollection();
		DataItemList arrIvUnit = new DataItemList();
		InvoiceUnitItem item = new InvoiceUnitItem();
		if(d.size() > 0) {
			item.setMessageError("BL002002");
			arrIvUnit.add(item);
		}
		
		return arrIvUnit;
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		return invoiceUnitDao.insertItems(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return invoiceUnitDao.updateItems(parm);
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		return invoiceUnitDao.deleteItems(parm);
	}
	
}
