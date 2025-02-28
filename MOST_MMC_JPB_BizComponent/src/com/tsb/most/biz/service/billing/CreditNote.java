package com.tsb.most.biz.service.billing;

import java.util.List;

import com.tsb.most.biz.dao.billing.ICreditNoteDao;
import com.tsb.most.biz.dataitem.billing.CreditNoteItem;
import com.tsb.most.biz.parm.billing.SearchCreditNoteParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CreditNote extends MOSTBaseService implements ICreditNote {

	private ICreditNoteDao creditNoteDao;

	public void setCreditNoteDao(ICreditNoteDao creditNoteDao) {
		this.creditNoteDao = creditNoteDao;
	}

	public DataItemList selectCreditNoteList(SearchCreditNoteParm parm) throws BizException {
		return creditNoteDao.selectCreditNoteList(parm);
	}

	public DataItemList selectCreditNoteDetail(SearchCreditNoteParm parm) throws BizException {
		return creditNoteDao.selectCreditNoteDetail(parm);
	}

	public DataItemList insertItems(InsertItemsBizParm insertParm) throws BizException {
		CreditNoteItem creditNoteItem = (CreditNoteItem) insertParm.getInsertItems().get(0);

		String creditNoteNo = generateInvoiceNo();
		creditNoteItem.setCreditNoteNo(creditNoteNo);
		creditNoteItem.setCrnStatCd("CR"); // BillingConstant.DATA_GATHER_STATUS_CREATE
		creditNoteItem.setIvPrfx("CRN"); // BillingConstant.PRIFIX_CREDIT_NOTE

		List<CreditNoteItem> detailList = creditNoteItem.getIvNos();
		InsertItemsBizParm insertDetailParm = new InsertItemsBizParm();

		for (CreditNoteItem detailData : detailList) {
			detailData.setCreditNoteNo(creditNoteNo);
			detailData.setNewVersion(creditNoteItem.getNewVersion());
			insertDetailParm.addInsertItem(detailData);
		}

		creditNoteDao.insertCreditNote(insertParm);
		creditNoteDao.insertCreditNoteDetail(insertDetailParm);

		return insertParm.getInsertItems();
	}

	public String generateInvoiceNo() throws BizException {
		SearchCreditNoteParm parm = new SearchCreditNoteParm();
		parm.setIvPrfx("CRN");

		return creditNoteDao.generateInvoiceNo(parm);
	}

	public DataItemList updateItems(UpdateItemsBizParm updateParm) throws BizException {
		CreditNoteItem creditNoteItem = (CreditNoteItem) updateParm.getUpdateItems().get(0);
		List<CreditNoteItem> detailList = creditNoteItem.getIvNos();
		UpdateItemsBizParm updateDetailParm = new UpdateItemsBizParm();

		for (CreditNoteItem detailData : detailList) {
			detailData.setNewVersion(creditNoteItem.getNewVersion());
			updateDetailParm.addUpdateItem(detailData);
		}

		creditNoteDao.updateCreditNote(updateParm);
		creditNoteDao.updateCreditNoteDetail(updateDetailParm);

		return updateParm.getUpdateItems();
	}
}
