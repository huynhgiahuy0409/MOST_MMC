package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchInvoiceAdviceParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class InvoiceAdviceDao extends BaseDao implements IInvoiceAdviceDao {

	public DataItemList selectInvoiceAdvice(SearchInvoiceAdviceParm parm) throws DaoException {
		return unifiedDao.getItemsPage("invoiceAdvice.selectInvoiceAdvice", parm);
	}

	public DataItemList selectInvoiceAdviceDetail(SearchInvoiceAdviceParm parm) throws DaoException {
		return unifiedDao.getItems("invoiceAdvice.selectInvoiceAdviceDetail", parm);
	}

	public String selectIvAdviceNo(SearchInvoiceAdviceParm parm) throws DaoException {
		return (String) unifiedDao.readOne("invoiceAdvice.selectIvAdviceNo", parm);
	}

	public String selectIvAdviceSeq(SearchInvoiceAdviceParm parm) throws DaoException {
		return (String) unifiedDao.readOne("invoiceAdvice.selectIvAdviceSeq", parm);
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		DataItemList insertItems = parm.getInsertItems();

		setNewVersion(insertItems);
		unifiedDao.insertItems(null, "invoiceAdvice.insertItems", insertItems);
		setVersion(insertItems);

		return insertItems;

	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();

		setNewVersion(updateItems);
		unifiedDao.updateItems(null, "invoiceAdvice.updateItems", updateItems);
		setVersion(updateItems);

		return updateItems;

	}

	public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();

		setNewVersion(deleteItems);
		unifiedDao.deleteItems(null, "invoiceAdvice.deleteItems", deleteItems);
		setVersion(deleteItems);

		return deleteItems;
	}
	//Invoice Advice Screen
	public DataItemList updateAckItems(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();

		setNewVersion(updateItems);
		unifiedDao.updateItems(null, "invoiceAdvice.updateAckItems", updateItems);
		setVersion(updateItems);

		return updateItems;
	}
	
	public DataItemList deleteAckItems(DeleteItemsBizParm parm) throws DaoException {
		DataItemList deleteItems = parm.getDeleteItems();

		setNewVersion(deleteItems);
		unifiedDao.deleteItems(null, "invoiceAdvice.deleteAckItems", deleteItems);
		setVersion(deleteItems);

		return deleteItems;
	}
	//Invoice Advice Screen

	@Override
	public DataItemList searchInvoiceAdviceDataItemsForReport(SearchInvoiceAdviceParm searchParm) {
		return unifiedDao.getItems("invoiceAdvice.searchInvoiceAdviceDataItemsForReport", searchParm);
	}

	@Override
	public DataItemList searchInvoiceAdviceItemsForReport(SearchInvoiceAdviceParm searchParm) {
		return unifiedDao.getItems("invoiceAdvice.searchInvoiceAdviceItemsForReport", searchParm);
	}
}
