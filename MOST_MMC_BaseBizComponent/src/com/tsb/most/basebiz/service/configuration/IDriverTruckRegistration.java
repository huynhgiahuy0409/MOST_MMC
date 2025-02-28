package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.parm.configuration.SearchDriverTruckRegistrationParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDriverTruckRegistration {
	public DataItemList selectDriverRegistrationItems(SearchDriverTruckRegistrationParm parm) throws BizException;
	public DataItemList selectTruckRegistrationItems(SearchDriverTruckRegistrationParm parm) throws BizException;
	public DataItemList selectChassisRegistrationItems(SearchDriverTruckRegistrationParm parm) throws BizException;
	public DataItemList selectDriverDuplicateItems(SearchDriverTruckRegistrationParm parm) throws BizException ;
	public DataItemList selectTruckDuplicateItems(SearchDriverTruckRegistrationParm parm) throws BizException;
	public DataItemList selectChassisDuplicateItems(SearchDriverTruckRegistrationParm parm) throws BizException;
	
	public DataItemList insertDriverRegistrationItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertTruckRegistrationItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertChassisRegistrationItems(InsertItemsBizParm parm) throws BizException;

	public DataItemList updateDriverRegistrationItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateTruckRegistrationItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateChassisRegistrationItems(UpdateItemsBizParm parm) throws BizException;
	
	public void deleteDriverRegistrationItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteTruckRegistrationItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteChassisRegistrationItems(DeleteItemsBizParm parm) throws BizException;
}
