package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchVORDryBreakBulkParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.DaoException;

public interface IVORDryBreakBulkDao {
	public DataItemList selectVesselInfomation(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectVORList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectHandlingList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectShiftingList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectBankingList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectShiftedLocList(SearchVORDryBreakBulkParm parm) throws DaoException;
	
	public DataItemList selectDetailOfHandingRpt(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectDailyRosterRpt(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectDRStevedoreList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectDRTrimmingList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectEquipmentsRptFAC(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectHandlingSum(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectHoliday(SearchVORDryBreakBulkParm parm) throws DaoException;
	public IDataItem selectComp(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectRemark(SearchVORDryBreakBulkParm parm) throws DaoException;
	
	public DataItemList isOverlappedWithFinitePeriodHHT(SearchVORDryBreakBulkParm parm) throws DaoException;
	
	public DataItemList updateListVORItems(UpdateItemsBizParm parm) throws DaoException;
	public DataItemList updateListVORVerifyItems(UpdateItemsBizParm parm) throws DaoException;
	
	public DataItemList selectOpeJobList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectHandlingServicePDFReportList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectROROCForm1ReprotList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectROROCForm2ReprotList(SearchVORDryBreakBulkParm parm) throws DaoException;
	public DataItemList selectPortDepartureReport(SearchVORDryBreakBulkParm parm) throws DaoException;
}
