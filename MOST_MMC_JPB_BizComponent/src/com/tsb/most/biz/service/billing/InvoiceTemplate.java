package com.tsb.most.biz.service.billing;

import java.util.ArrayList;

import com.tsb.most.biz.dao.billing.IInvoiceTemplateDao;
import com.tsb.most.biz.dataitem.billing.InvoiceTemplateItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceTemplateParm;
import com.tsb.most.biz.parm.billing.SearchTariffCodeParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ApplicationException;
import com.tsb.most.framework.exception.BizException;

public class InvoiceTemplate extends MOSTBaseService implements IInvoiceTemplate{
	private IInvoiceTemplateDao invoiceTemplateDao;
	
	public void setInvoiceTemplateDao(IInvoiceTemplateDao invoiceTemplateDao) {
		this.invoiceTemplateDao = invoiceTemplateDao;
	}

	public DataItemList selectTariffTemplate(SearchInvoiceTemplateParm param) throws BizException {
		return invoiceTemplateDao.selectTariffTemplate(param);
	}
	
	public DataItemList selectInvoiceTemplateList(SearchInvoiceTemplateParm param) throws BizException {
		return invoiceTemplateDao.selectAllInvoiceTemplate(param);
	}
	
	public DataItemList selectTariffCode(SearchTariffCodeParm param) throws BizException {
		DataItemList returnItemList = new DataItemList();

		if (param.getSearchTp().equals("TRF_DATA") || param.getSearchTp().equals("INV_TPL")) {
			returnItemList = invoiceTemplateDao.selectTariffCode(param);
		} else if (param.getSearchTp().equals("TEMPLATE_CHANGED_MOD")) {
			SearchInvoiceTemplateParm tmpParm = new SearchInvoiceTemplateParm();
			tmpParm.setTemplateCd(param.getTemplateCd());
			returnItemList = invoiceTemplateDao.selectTariffTemplate(tmpParm);
		}

		return returnItemList;
	}
	
	public DataItemList insertItems(InsertItemsBizParm param) throws BizException {
		InvoiceTemplateItem item = (InvoiceTemplateItem) param.getInsertItems().get(0);

		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
	    insertItems.add(item);
		if (param.getTxTraceinfo().getUserInfo() != null) {
			item.setUserId(param.getTxTraceinfo().getUserInfo().getUserId());
		}


		boolean existed = false;
		for (int i = 0; i < insertItems.size(); i++) {
			InvoiceTemplateItem itm = (InvoiceTemplateItem) insertItems.get(i);
			Integer d = invoiceTemplateDao.isItemExist(itm);
			if (d.intValue() > 0)
				existed = true;
		}
		if (existed)
			throw new ApplicationException("BL002001");

		if (insertItems.size() > 0) {
			insertItms.addInsertItem(insertItems);
			invoiceTemplateDao.insertTemplates(insertItms);
		}
		
		 return param.getInsertItems();
	}

	public DataItemList updateItems(UpdateItemsBizParm param) throws BizException {
		InvoiceTemplateItem item = (InvoiceTemplateItem) param.getUpdateItems().get(0);

		DataItemList updateItems = new DataItemList();
		InsertItemsBizParm insertItms = new InsertItemsBizParm();
	    UpdateItemsBizParm updateItms = new UpdateItemsBizParm();
	    DeleteItemsBizParm deleteItms = new DeleteItemsBizParm();

		if (param.getTxTraceinfo().getUserInfo() != null) {
			item.setUserId(param.getTxTraceinfo().getUserInfo().getUserId());
		}
		updateItems.add(item);

		
		if (updateItems.size() > 0) {
			updateItms.addUpdateItem(updateItems);
			deleteItms.addDeleteItem(updateItems);
			invoiceTemplateDao.updateTemplates(updateItms);

			ArrayList updateItemsList = (ArrayList) updateItems.getCollection();

			for (int i = 0; i < updateItemsList.size(); i++) {
				InvoiceTemplateItem invoiceTemplate = (InvoiceTemplateItem) updateItemsList.get(i);

				ArrayList tariffArray = (ArrayList) invoiceTemplate.getItems();

				DataItemList updateTariffCollec = new DataItemList();
				if (tariffArray != null && tariffArray.isEmpty() == false) {
					for (int j = 0; j < tariffArray.size(); j++) {
						InvoiceTemplateItem updateTariff = (InvoiceTemplateItem) tariffArray.get(j);
						if (updateTariff.getSelectedFlag() != null && !updateTariff.getSelectedFlag().equals("D")) {
							updateTariffCollec.add(updateTariff);
						}
					}
					insertItms.addInsertItem(updateTariffCollec);
					invoiceTemplateDao.deleteTariffByTemplateCodes(deleteItms);
					invoiceTemplateDao.insertTariffTypes(insertItms);
				}
			}
		}
		
		 return param.getUpdateItems();
	}
	
	public DataItemList deleteItems(DeleteItemsBizParm param) throws BizException {
		InvoiceTemplateItem item = (InvoiceTemplateItem) param.getDeleteItems().get(0);

		DataItemList deleteItems = new DataItemList();
	    DeleteItemsBizParm deleteItms = new DeleteItemsBizParm();

		deleteItems.add(item);
		if (deleteItems.size() > 0) {
			deleteItms.addDeleteItem(deleteItems);
			invoiceTemplateDao.deleteTariffByTemplateCodes(deleteItms);
			invoiceTemplateDao.deleteTemplates(deleteItms);
			
		}
		
		 return param.getDeleteItems();
	}
	
	
}
