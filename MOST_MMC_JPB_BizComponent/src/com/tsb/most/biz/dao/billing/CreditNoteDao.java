package com.tsb.most.biz.dao.billing;

import java.util.List;

import com.tsb.most.biz.dataitem.billing.CreditNoteItem;
import com.tsb.most.biz.parm.billing.SearchCreditNoteParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CreditNoteDao extends BaseDao implements ICreditNoteDao {
	@Override
	public DataItemList selectCreditNoteList(SearchCreditNoteParm parm) throws DaoException {
		return unifiedDao.getItems("creditNote.selectCreditNoteList", parm);
	};

	@Override
	public DataItemList selectCreditNoteDetail(SearchCreditNoteParm parm) throws DaoException {
		return unifiedDao.getItems("creditNote.selectCreditNoteDetail", parm);
	};

	@Override
	public String generateInvoiceNo(SearchCreditNoteParm parm) throws DaoException {
		return (String) unifiedDao.readOne("creditNote.generateInvoiceNo", parm);
	};

	@Override
	public DataItemList insertCreditNote(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();

			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "creditNote.insertCreditNote", insertItems);
			setVersion(insertItems);

			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	};

	@Override
	public DataItemList insertCreditNoteDetail(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();

			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "creditNote.insertCreditNoteDetail", insertItems);
			setVersion(insertItems);

			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	};

	@Override
	public DataItemList updateCreditNote(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();

			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "creditNote.updateCreditNote", updateItems);
			setVersion(updateItems);

			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	};

	@Override
	public DataItemList updateCreditNoteDetail(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();

			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "creditNote.updateCreditNoteDetail", updateItems);
			setVersion(updateItems);

			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	};

	@Override
	public List<CreditNoteItem> selectCreditNoteReport(SearchCreditNoteParm parm) throws DaoException {
		return null;
	};
}
