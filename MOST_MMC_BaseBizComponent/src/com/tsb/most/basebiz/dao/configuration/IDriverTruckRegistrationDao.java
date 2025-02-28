package com.tsb.most.basebiz.dao.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchDriverTruckRegistrationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IDriverTruckRegistrationDao {
	public DataItemList getRegisterationItems(SearchDriverTruckRegistrationParm parm) throws DaoException;
	public DataItemList selectDriverRegistrationItems(SearchDriverTruckRegistrationParm parm) throws DaoException;
	public DataItemList selectTruckRegistrationItems(SearchDriverTruckRegistrationParm parm) throws DaoException;
	public DataItemList selectChassisRegistrationItems(SearchDriverTruckRegistrationParm parm) throws DaoException;
	public DataItemList existenceCheck(SearchDriverTruckRegistrationParm parm) throws DaoException;
	public DataItemList selectDriverDuplicateItems(SearchDriverTruckRegistrationParm parm) throws DaoException ;
	public DataItemList selectTruckDuplicateItems(SearchDriverTruckRegistrationParm parm) throws DaoException ;
	public DataItemList selectChassisDuplicateItems(SearchDriverTruckRegistrationParm parm) throws DaoException ;
	public DataItemList insertDriverRegistrationItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertTruckRegistrationItems(InsertItemsBizParm parm) throws DaoException;
	public DataItemList insertChassisRegistrationItems(InsertItemsBizParm parm) throws DaoException;

	public DataItemList updateDriverRegistrationItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateTruckRegistrationItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateChassisRegistrationItems(UpdateItemsBizParm parm) throws DaoException;
	
	public void deleteDriverRegistrationItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteTruckRegistrationItems(DeleteItemsBizParm parm) throws DaoException;
	public void deleteChassisRegistrationItems(DeleteItemsBizParm parm) throws DaoException;
}
