package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselOprSettingDao {
	public DataItemList selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectOverlappedWithFinitePeriod(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectVORDryBreakBulkForStevAndTrim(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectIsAllCargoReleased(SearchVesselOprSettingParm parm) throws DaoException;
	
	public DataItemList insertVesselOprSetting(InsertItemsBizParm items) throws DaoException;
	public DataItemList updateVesselOprSetting(UpdateItemsBizParm items) throws DaoException;
	public void updateAtwAtc4Vsl(DataItemList items) throws DaoException;
	public void deleteVesselOprSetting(DeleteItemsBizParm items) throws DaoException;
}