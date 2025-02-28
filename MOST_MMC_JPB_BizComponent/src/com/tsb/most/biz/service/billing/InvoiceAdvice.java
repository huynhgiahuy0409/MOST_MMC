package com.tsb.most.biz.service.billing;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.billing.IInvoiceAdviceDao;
import com.tsb.most.biz.dataitem.billing.InvoiceAdviceDetailItem;
import com.tsb.most.biz.dataitem.billing.InvoiceAdviceItem;
import com.tsb.most.biz.parm.billing.SearchInvoiceAdviceParm;
import com.tsb.most.common.constant.BillingConstant;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class InvoiceAdvice extends MOSTBaseService implements IInvoiceAdvice {
	private IInvoiceAdviceDao invoiceAdviceDao;

	public void setinvoiceAdviceDao(IInvoiceAdviceDao invoiceAdviceDao) {
		this.invoiceAdviceDao = invoiceAdviceDao;
	}

	public DataItemList selectInvoiceAdvice(SearchInvoiceAdviceParm parm) throws BizException {
		return invoiceAdviceDao.selectInvoiceAdvice(parm);
	}

	public DataItemList selectInvoiceAdviceDetail(SearchInvoiceAdviceParm parm) throws BizException {
		DataItemList rtnList = new DataItemList();
		InvoiceAdviceDetailItem returnItem = new InvoiceAdviceDetailItem();
		returnItem.setDetailList(invoiceAdviceDao.selectInvoiceAdviceDetail(parm).getCollection());

		rtnList.add(returnItem);
		return rtnList;
		// return invoiceAdviceDao.selectInvoiceAdviceDetail(parm);
	}

	public DataItemList insertItems(InsertItemsBizParm param) throws BizException {
		DataItemList returnItems = new DataItemList();
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();

		InvoiceAdviceItem objHead = (InvoiceAdviceItem) param.getInsertItems().get(0);
		ArrayList<InvoiceAdviceDetailItem> detailItems = objHead.getItems();

		SearchInvoiceAdviceParm parm = new SearchInvoiceAdviceParm();
		parm.setVesselCallingID(objHead.getVesselCallingID());
		parm.setShippingAgent(objHead.getShippingAgent());

		if (objHead.getSearchType() != null && objHead.getSearchType().equals(BillingConstant.INVOICE_ADVICE_ACK)) {
			DataItemList ackItems = new DataItemList();
			for (int i = 0; i < detailItems.size(); i++) {
				InvoiceAdviceDetailItem ackItem = (InvoiceAdviceDetailItem) detailItems.get(i);
				ackItems.add(ackItem);
			}
			if (ackItems.size() > 0) {
				UpdateItemsBizParm updParm = new UpdateItemsBizParm();
				updParm.setUpdateItems(ackItems);
				invoiceAdviceDao.updateAckItems(updParm);
			} else {
				if (detailItems.size() > 0) {
					throw new BizException("BL01201008", "Something went wrong!");
				}
			}
		} else {
			if ((objHead.getAdviceNo() == null) || ("".equalsIgnoreCase(objHead.getAdviceNo()))) {
				String advNo = invoiceAdviceDao.selectIvAdviceNo(parm);
				objHead.setAdviceNo(advNo);
			}
			parm.setAdviceNo(objHead.getAdviceNo());

			int numAdvSeq = Integer.parseInt(invoiceAdviceDao.selectIvAdviceSeq(parm));
			for (int i = 0; i < detailItems.size(); i++) {
				InvoiceAdviceDetailItem item = (InvoiceAdviceDetailItem) detailItems.get(i);

				if (item.getWorkingStatus() != null && !item.getWorkingStatus().equals(DAOProcessType.QUERY)) {
					if (item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
						item.setAdviceNo(objHead.getAdviceNo());
						item.setVesselCallingID(objHead.getVesselCallingID());
						item.setAdvSeq(String.valueOf(numAdvSeq));
						insertItems.add(item);
						numAdvSeq += 1;
					} else if (item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
						updateItems.add(item);
					} else if (item.getWorkingStatus().equals(DAOProcessType.DELETE)) {
						deleteItems.add(item);
					}
				}
			}

			if (insertItems.size() > 0) {
				InsertItemsBizParm insParm = new InsertItemsBizParm();
				insParm.setInsertItems(insertItems);
				invoiceAdviceDao.insertItems(insParm);

				UpdateItemsBizParm updParm = new UpdateItemsBizParm();
				updParm.setUpdateItems(insertItems);
				invoiceAdviceDao.updateAckItems(updParm);
			}

			if (updateItems.size() > 0) {
				UpdateItemsBizParm updParm = new UpdateItemsBizParm();
				updParm.setUpdateItems(updateItems);
				invoiceAdviceDao.updateItems(updParm);
				invoiceAdviceDao.updateAckItems(updParm);
			}

			if (deleteItems.size() > 0) {
				DeleteItemsBizParm delParm = new DeleteItemsBizParm();
				delParm.setDeleteItems(deleteItems);
				invoiceAdviceDao.deleteItems(delParm);
				invoiceAdviceDao.deleteAckItems(delParm);
			}
		}

		InvoiceAdviceItem returnItem = (InvoiceAdviceItem) objHead.clone();
		returnItems.add(returnItem);
		return returnItems;

	}

	public DataItemList updateItems(UpdateItemsBizParm param) throws BizException {
		DataItemList returnItems = new DataItemList();
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();

		InvoiceAdviceItem objHead = (InvoiceAdviceItem) param.getUpdateItems().get(0);
		ArrayList detailItems = objHead.getItems();

		SearchInvoiceAdviceParm parm = new SearchInvoiceAdviceParm();
		parm.setVesselCallingID(objHead.getVesselCallingID());
		if ((objHead.getAdviceNo() == null) || ("".equalsIgnoreCase(objHead.getAdviceNo()))) {
			String advNo = invoiceAdviceDao.selectIvAdviceNo(parm);
			objHead.setAdviceNo(advNo);
		}
		parm.setAdviceNo(objHead.getAdviceNo());

		int numAdvSeq = Integer.parseInt(invoiceAdviceDao.selectIvAdviceSeq(parm));
		for (int i = 0; i < detailItems.size(); i++) {
			InvoiceAdviceDetailItem item = (InvoiceAdviceDetailItem) detailItems.get(i);

			if (item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
				item.setAdviceNo(objHead.getAdviceNo());
				item.setVesselCallingID(objHead.getVesselCallingID());
				item.setAdvSeq(String.valueOf(numAdvSeq));
				insertItems.add(item);
				numAdvSeq += 1;
			} else if (item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
				updateItems.add(item);
			} else if (item.getWorkingStatus().equals(DAOProcessType.DELETE)) {
				deleteItems.add(item);
			}
		}

		if (insertItems.size() > 0) {
			InsertItemsBizParm insParm = new InsertItemsBizParm();
			insParm.setInsertItems(insertItems);
			invoiceAdviceDao.insertItems(insParm);
		}

		if (updateItems.size() > 0) {
			UpdateItemsBizParm updParm = new UpdateItemsBizParm();
			updParm.setUpdateItems(updateItems);
			invoiceAdviceDao.updateItems(updParm);
		}

		if (deleteItems.size() > 0) {
			DeleteItemsBizParm delParm = new DeleteItemsBizParm();
			delParm.setDeleteItems(deleteItems);
			invoiceAdviceDao.deleteItems(delParm);
		}

		InvoiceAdviceItem returnItem = (InvoiceAdviceItem) objHead.clone();
		returnItems.add(returnItem);
		return returnItems;
		// return invoiceAdviceDao.updateItems(param);
	}

	public DataItemList deleteItems(DeleteItemsBizParm param) throws BizException {
		DataItemList returnItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();

		InvoiceAdviceItem objHead = (InvoiceAdviceItem) param.getDeleteItems().get(0);
		ArrayList detailItems = objHead.getItems();

		for (int i = 0; i < detailItems.size(); i++) {
			InvoiceAdviceDetailItem item = (InvoiceAdviceDetailItem) detailItems.get(i);
			deleteItems.add(item);
		}

		if (deleteItems.size() > 0) {
			DeleteItemsBizParm delParm = new DeleteItemsBizParm();
			delParm.setDeleteItems(deleteItems);
			invoiceAdviceDao.deleteItems(delParm);
		}

		returnItems.add(objHead);
		return returnItems;
		// return invoiceAdviceDao.deleteItems(param);
	}

}
