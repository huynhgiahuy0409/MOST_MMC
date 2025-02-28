package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.dao.configuration.IDriverTruckRegistrationDao;
import com.tsb.most.basebiz.parm.configuration.SearchDriverTruckRegistrationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DriverTruckRegistration extends MOSTBaseService implements IDriverTruckRegistration {
	private IDriverTruckRegistrationDao driverTruckRegistrationDao;

	public void setRegisterationLorryDriverDao(IDriverTruckRegistrationDao driverTruckRegistrationDao) {
		this.driverTruckRegistrationDao = driverTruckRegistrationDao;
	}

	public void setDriverTruckRegistrationDao(IDriverTruckRegistrationDao driverTruckRegistrationDao) {
		this.driverTruckRegistrationDao = driverTruckRegistrationDao;
	}

	/*
	 * #################### SERVICE METHODS ####################
	 */
	@Override
	public DataItemList selectDriverRegistrationItems(SearchDriverTruckRegistrationParm parm) throws BizException {
		return driverTruckRegistrationDao.selectDriverRegistrationItems(parm);
	}
	
	public DataItemList selectDriverDuplicateItems(SearchDriverTruckRegistrationParm parm) throws BizException {
		return driverTruckRegistrationDao.selectDriverDuplicateItems(parm);
	}
	
	@Override
	public DataItemList selectTruckRegistrationItems(SearchDriverTruckRegistrationParm parm) throws BizException {
		return driverTruckRegistrationDao.selectTruckRegistrationItems(parm);
	}

	public DataItemList selectTruckDuplicateItems(SearchDriverTruckRegistrationParm parm) throws BizException {
		return driverTruckRegistrationDao.selectTruckDuplicateItems(parm);
	}
	
	public DataItemList selectChassisRegistrationItems(SearchDriverTruckRegistrationParm parm) throws BizException {
		return driverTruckRegistrationDao.selectChassisRegistrationItems(parm);
	}
	
	public DataItemList selectChassisDuplicateItems(SearchDriverTruckRegistrationParm parm) throws BizException {
		return driverTruckRegistrationDao.selectChassisDuplicateItems(parm);
	}
	
	@Override
	public DataItemList insertDriverRegistrationItems(InsertItemsBizParm parm) throws BizException {
		return driverTruckRegistrationDao.insertDriverRegistrationItems(parm);
	}

	@Override
	public DataItemList insertTruckRegistrationItems(InsertItemsBizParm parm) throws BizException {
		return driverTruckRegistrationDao.insertTruckRegistrationItems(parm);
	}
	
	@Override
	public DataItemList insertChassisRegistrationItems(InsertItemsBizParm parm) throws BizException {
		return driverTruckRegistrationDao.insertChassisRegistrationItems(parm);
	}

	@Override
	public DataItemList updateDriverRegistrationItems(UpdateItemsBizParm parm) throws BizException {
		return driverTruckRegistrationDao.updateDriverRegistrationItems(parm);
	}

	@Override
	public DataItemList updateTruckRegistrationItems(UpdateItemsBizParm parm) throws BizException {
		return driverTruckRegistrationDao.updateTruckRegistrationItems(parm);
	}
	
	@Override
	public DataItemList updateChassisRegistrationItems(UpdateItemsBizParm parm) throws BizException {
		return driverTruckRegistrationDao.updateChassisRegistrationItems(parm);
	}

	@Override
	public void deleteDriverRegistrationItems(DeleteItemsBizParm parm) throws BizException {
		driverTruckRegistrationDao.deleteDriverRegistrationItems(parm);
	}

	@Override
	public void deleteTruckRegistrationItems(DeleteItemsBizParm parm) throws BizException {
		driverTruckRegistrationDao.deleteTruckRegistrationItems(parm);
	}
	
	@Override
	public void deleteChassisRegistrationItems(DeleteItemsBizParm parm) throws BizException {
		driverTruckRegistrationDao.deleteChassisRegistrationItems(parm);
	}
}
