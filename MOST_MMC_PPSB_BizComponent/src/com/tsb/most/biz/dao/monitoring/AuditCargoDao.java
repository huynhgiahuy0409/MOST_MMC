package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchAuditCargoParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class AuditCargoDao extends BaseDao implements IAuditCargoDao {
    
    public DataItemList selectAuditCargoItems(SearchAuditCargoParm parm) throws DaoException {
		return unifiedDao.getItems("AuditCargoMap.selectAuditCargoItems", parm) ;
	}
	
	public DataItemList selectScreenNameComboBoxItems(SearchAuditCargoParm parm) throws DaoException {
		return unifiedDao.getItems("AuditCargoMap.selectScreenNameComboBoxItems", parm) ;
	}
	
	public DataItemList selectBlComboBoxItems(SearchAuditCargoParm parm) throws DaoException {
		return unifiedDao.getItems("AuditCargoMap.selectBlComboBoxItems", parm) ;
	}
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchAuditCargoParm parm) throws DaoException {
		return unifiedDao.getItems("AuditCargoMap.selectShipgNoteNoComboBoxItems", parm) ;
	}
}
