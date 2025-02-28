package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IVesselOprSettingDao {
	public DataItemList selectVesselOprSettingList(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectShift(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectEquipmentList(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectEquipment(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectRole(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectOverlappedWithFinitePeriodHHT(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectVORDryBreakBulkForStevAndTrim(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectVORDryBreakBulk(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList insertVesselOprSetting(InsertItemsBizParm items) throws DaoException;
	public DataItemList updateVesselOprSetting(UpdateItemsBizParm items) throws DaoException;
	public DataItemList updateVORDryBreakBulkItemsForStevAndTrim(DataItemList items) throws DaoException;
	public void deleteVORDryBreakBulkItems(DataItemList items) throws DaoException;
	public DataItemList updateVORDryBreakBulkItemsWithShipCrew(DataItemList items) throws DaoException;
	public void updateAtwAtc4Vsl(DataItemList items) throws DaoException;
	public void deleteVesselOprSetting(DeleteItemsBizParm items) throws DaoException;
	public DataItemList selectDelayPenaltyReportList(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList selectPenaltyDescrList(SearchVesselOprSettingParm parm) throws DaoException;
	public DataItemList insertDelayPenaltyReportList(InsertItemsBizParm parm) throws DaoException;
	public DataItemList updateDelayPenaltyReportList(UpdateItemsBizParm parm) throws DaoException;
	public void deleteDelayPenaltyReportList(DeleteItemsBizParm items) throws DaoException;
}