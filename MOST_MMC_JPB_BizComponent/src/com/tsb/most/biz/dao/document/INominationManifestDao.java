package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchNominationManifestParm;
import com.tsb.most.biz.parm.document.SearchValidationCodeParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface INominationManifestDao {
	public DataItemList getNominationManifestList(SearchNominationManifestParm parm) throws DaoException;
	public DataItemList getDgSeq(SearchNominationManifestParm parm) throws DaoException;
	public boolean chkNominationManifest(SearchNominationManifestParm parm) throws DaoException;
	public void insertNominationManifestItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
	public void updateNominationManifestItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
	public void insertNominationManifestRoleItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
	public void insertNominationManifestDGItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
	public void updateNominationManifestDGItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException;
	public DataItemList getValidationCode(SearchValidationCodeParm parm) throws DaoException;
}
