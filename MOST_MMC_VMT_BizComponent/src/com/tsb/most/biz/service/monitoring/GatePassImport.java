package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.IGatePassImportDao;
import com.tsb.most.biz.parm.monitoring.GatePassImportParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class GatePassImport extends MOSTBaseService implements IGatePassImport{
	private IGatePassImportDao gatePassImportDao;

	public IGatePassImportDao getGatePassImportDao() {
		return gatePassImportDao;
	}

	public void setGatePassImportDao(IGatePassImportDao gatePassImportDao) {
		this.gatePassImportDao = gatePassImportDao;
	}

	@Override
	public IDataItem selectGatePassImport(GatePassImportParm parm) throws BizException {
		// TODO Auto-generated method stub
		return this.gatePassImportDao.selectGatePassImport(parm);
	}
	
}
