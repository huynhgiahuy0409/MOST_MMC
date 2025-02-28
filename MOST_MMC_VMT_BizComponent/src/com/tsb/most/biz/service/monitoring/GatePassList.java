package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.dao.monitoring.ICargoGatePassDao;
import com.tsb.most.biz.parm.monitoring.CargoGatePassParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class GatePassList extends MOSTBaseService implements IGatePassList {
	ICargoGatePassDao cargoGatePassDao;
	
	public ICargoGatePassDao getCargoGatePassDao() {
		return cargoGatePassDao;
	}


	public void setCargoGatePassDao(ICargoGatePassDao cargoGatePassDao) {
		this.cargoGatePassDao = cargoGatePassDao;
	}


	@Override
	public IDataItem selectCargoGatePassList(CargoGatePassParm parm) throws BizException {
		// TODO Auto-generated method stub
		return cargoGatePassDao.selectCargoGatePassList(parm);
	}
	
}
