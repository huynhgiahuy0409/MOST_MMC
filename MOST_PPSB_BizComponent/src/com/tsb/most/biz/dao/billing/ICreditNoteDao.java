package com.tsb.most.biz.dao.billing;

import java.util.List;

import com.tsb.most.biz.dataitem.billing.CreditNoteItem;
import com.tsb.most.biz.parm.billing.SearchCreditNoteParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICreditNoteDao {
	public DataItemList selectCreditNoteList(SearchCreditNoteParm parm) throws DaoException;

	public DataItemList selectCreditNoteDetail(SearchCreditNoteParm parm) throws DaoException;

	public String generateInvoiceNo(SearchCreditNoteParm parm) throws DaoException;

	public DataItemList insertCreditNote(InsertItemsBizParm parm) throws DaoException;

	public DataItemList insertCreditNoteDetail(InsertItemsBizParm parm) throws DaoException;

	public DataItemList updateCreditNote(UpdateItemsBizParm parm) throws DaoException;

	public DataItemList updateCreditNoteDetail(UpdateItemsBizParm parm) throws DaoException;

	public List<CreditNoteItem> selectCreditNoteReport(SearchCreditNoteParm parm) throws DaoException;
}
