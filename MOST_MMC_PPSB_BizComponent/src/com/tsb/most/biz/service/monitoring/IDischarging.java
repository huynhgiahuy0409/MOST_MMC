package com.tsb.most.biz.service.monitoring;

import com.tsb.most.biz.parm.monitoring.SearchDischargingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IDischarging {
	public DataItemList selectListOfDischarging(SearchDischargingParm parm) throws BizException;
	public DataItemList selectModeOfOpr(SearchDischargingParm parm) throws BizException;
	public DataItemList selectImportManifestComboList(SearchDischargingParm parm) throws BizException;
	public DataItemList selectImportBLComboList(SearchDischargingParm parm) throws BizException;
	public DataItemList selectNumbPage(SearchDischargingParm parm) throws BizException;
	public DataItemList selectVesselDischargeListReport(SearchDischargingParm parm) throws BizException;
}
