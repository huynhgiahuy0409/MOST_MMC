package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.parm.configuration.SearchDriverTruckRegistrationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class DriverTruckRegistrationDao extends BaseDao implements IDriverTruckRegistrationDao {

	public DataItemList getRegisterationItems(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			DataItemList rtnList = new DataItemList();
			for (int i = 0; i < 2; i++) {
				if (i == 0) {
					parm.setDivCd(CodeConstant.MT_LORRYDIVCD_LR);
					DataItemList lorryList = unifiedDao.getItems("driverTruckRegistration.selectRegisterationItems", parm);
					rtnList.add(lorryList.getCollection());
				} else if (i == 1) {
					parm.setDivCd(CodeConstant.MT_CGSTATUS_DV);
					DataItemList driverList = unifiedDao.getItems("driverTruckRegistration.selectRegisterationItems", parm);
					rtnList.add(driverList.getCollection());
				}
			}

			return rtnList;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList selectDriverRegistrationItems(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			return unifiedDao.getItemsPage("driverTruckRegistration.selectDriverRegistrationItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectDriverDuplicateItems(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("driverTruckRegistration.selectDriverDuplicateItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectTruckDuplicateItems(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("driverTruckRegistration.selectTruckDuplicateItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList selectTruckRegistrationItems(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			return unifiedDao.getItemsPage("driverTruckRegistration.selectTruckRegistrationItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList selectChassisRegistrationItems(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			return unifiedDao.getItemsPage("driverTruckRegistration.selectChassisRegistrationItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectChassisDuplicateItems(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("driverTruckRegistration.selectChassisDuplicateItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	public void deleteRegisterationItems(TxTraceInfo txTraceInfo, DataItemList item) throws DaoException {
		try {
			setNewVersion(item);
			unifiedDao.deleteItemsWithTimeCheck(txTraceInfo, "driverTruckRegistration.deleteRegisterationItems", item);
			setVersion(item);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void updateRegisterationItems(TxTraceInfo txTraceInfo, DataItemList item) throws DaoException {
		try {
			setNewVersion(item);
			unifiedDao.updateItemsWithTimeCheck(txTraceInfo, "driverTruckRegistration.updateRegisterationItems", item);
			setVersion(item);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList existenceCheck(SearchDriverTruckRegistrationParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("driverTruckRegistration.selectRegisterationItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertDriverRegistrationItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.insertDriverRegistrationItems", insertItems);
			setVersion(insertItems);
			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertTruckRegistrationItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.insertTruckRegistrationItems", insertItems);
			setVersion(insertItems);
			
			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList insertChassisRegistrationItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.insertChassisRegistrationItems", insertItems);
			setVersion(insertItems);
			
			return insertItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateDriverRegistrationItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.updateDriverRegistrationItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateTruckRegistrationItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.updateTruckRegistrationItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList updateChassisRegistrationItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.updateChassisRegistrationItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteDriverRegistrationItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.deleteDriverRegistrationItems", deleteItems);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteTruckRegistrationItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.deleteTruckRegistrationItems", deleteItems);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	@Override
	public void deleteChassisRegistrationItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			unifiedDao.updateItemsWithTimeCheck(null, "driverTruckRegistration.deleteChassisRegistrationItems", deleteItems);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
}
