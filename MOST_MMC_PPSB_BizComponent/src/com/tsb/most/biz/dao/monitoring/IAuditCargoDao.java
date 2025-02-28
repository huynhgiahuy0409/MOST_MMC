package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.biz.parm.monitoring.SearchAuditCargoParm;
import com.tsb.most.framework.dataitem.DataItemList;

public interface IAuditCargoDao {
    
    public DataItemList selectAuditCargoItems(SearchAuditCargoParm parm) throws DaoException;
	public DataItemList selectScreenNameComboBoxItems(SearchAuditCargoParm parm) throws DaoException;
	public DataItemList selectBlComboBoxItems(SearchAuditCargoParm parm) throws DaoException;
	public DataItemList selectShipgNoteNoComboBoxItems(SearchAuditCargoParm parm) throws DaoException;
}
