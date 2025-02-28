package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.parm.planning.SearchRosterConfigurationMonthlyParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IRosterConfigurationMonthly{
	public DataItemList selectShiftVesselOperation(SearchRosterConfigurationMonthlyParm parm) throws BizException;
	public DataItemList selectRosterMonthlyData(SearchRosterConfigurationMonthlyParm parm) throws BizException;
	public DataItemList selectShiftDefList(SearchRosterConfigurationMonthlyParm parm) throws BizException;
	public DataItemList selectShiftGroupDefList(SearchRosterConfigurationMonthlyParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
}
