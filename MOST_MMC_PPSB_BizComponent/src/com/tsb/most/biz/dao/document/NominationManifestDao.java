package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchNominationManifestParm;
import com.tsb.most.biz.parm.document.SearchValidationCodeParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class NominationManifestDao extends BaseDao implements INominationManifestDao {

	public DataItemList getDgSeq(SearchNominationManifestParm parm) throws DaoException {
        return unifiedDao.getItems("NominationManifestMap.selectDgSeq", parm);
    }
	
	public DataItemList getNominationManifestList(SearchNominationManifestParm parm) throws DaoException {
		return unifiedDao.getItems("NominationManifestMap.selectNominationManifest", parm);
	}
	
	public boolean chkNominationManifest(SearchNominationManifestParm parm) throws DaoException {
		boolean isExists = true;
		DataItemList rtnList = unifiedDao.getItems("NominationManifestMap.chkNominationManifest", parm);
		if (rtnList.size() == 0) isExists = false;
		return isExists;
	}
	
	public void insertNominationManifestItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
		unifiedDao.insertItems(txTraceInfo,"NominationManifestMap.insertNominationManifestItems", items);
	}
	
	public void updateNominationManifestItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
		unifiedDao.updateItems(txTraceInfo,"NominationManifestMap.updateNominationManifestItems", items);
	}
	
	public void insertNominationManifestRoleItems(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException {
		unifiedDao.insertItems(txTraceInfo,"NominationManifestMap.insertNominationManifestRoleItems", items);
	}
	
	public void insertNominationManifestDGItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
		unifiedDao.insertItems(txTraceInfo,"NominationManifestMap.insertNominationManifestDGItems", items);
	}
	
	public void updateNominationManifestDGItems(TxTraceInfo txTraceInfo, DataItemList items) throws DaoException {
		unifiedDao.updateItems(txTraceInfo,"NominationManifestMap.updateNominationManifestDGItems", items);
		unifiedDao.updateItems(txTraceInfo,"NominationManifestMap.updateDGIfItem", items);
	}
	
    public DataItemList getValidationCode(SearchValidationCodeParm parm) throws DaoException{
        return unifiedDao.getItems("NominationManifestMap.selectValidation", parm);
    }
}
