package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IAuditCargoDao;
import com.tsb.most.biz.parm.monitoring.SearchAuditCargoParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class AuditCargo extends MOSTBaseService implements IAuditCargo {
    
    private IAuditCargoDao auditCargoDao;
	
	public void setAuditCargoDao(IAuditCargoDao auditCargoDao) {
		this.auditCargoDao = auditCargoDao;
	}

	public DataItemList selectAuditCargoItems(SearchAuditCargoParm parm) throws BizException {
		return auditCargoDao.selectAuditCargoItems(parm);
	}

	public DataItemList selectScreenNameComboBoxItems(SearchAuditCargoParm parm) throws BizException {
		return auditCargoDao.selectScreenNameComboBoxItems(parm);
	}
	
	public DataItemList selectBlComboBoxItems(SearchAuditCargoParm parm) throws BizException {
		return auditCargoDao.selectBlComboBoxItems(parm);
	}
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchAuditCargoParm parm) throws BizException {
		return auditCargoDao.selectShipgNoteNoComboBoxItems(parm);
	}
}
