package com.tsb.most.biz.service.monitoring;


import com.tsb.most.biz.parm.monitoring.SearchLoadingParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface ILoading {
	public DataItemList selectListOfLoading(SearchLoadingParm parm) throws BizException;
	public DataItemList selectLoadingComboList(SearchLoadingParm parm) throws BizException;
	public DataItemList selectShippingNoteComboItems(SearchLoadingParm parm) throws BizException;
	public DataItemList selectBookingComboItems(SearchLoadingParm parm) throws BizException;
	public DataItemList selectListOfLoadingForHHT(SearchLoadingParm parm) throws BizException;
	public DataItemList selectVesselLoadListReport(SearchLoadingParm parm) throws BizException;
}
