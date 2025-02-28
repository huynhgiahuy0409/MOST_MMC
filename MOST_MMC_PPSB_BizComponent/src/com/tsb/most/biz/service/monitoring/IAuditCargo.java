package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchAuditCargoParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IAuditCargo {
    
    public DataItemList selectAuditCargoItems(SearchAuditCargoParm parm) throws BizException;
	public DataItemList selectScreenNameComboBoxItems(SearchAuditCargoParm parm) throws BizException;
	public DataItemList selectBlComboBoxItems(SearchAuditCargoParm parm) throws BizException;
	public DataItemList selectShipgNoteNoComboBoxItems(SearchAuditCargoParm parm) throws BizException;
}
