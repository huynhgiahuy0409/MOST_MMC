package com.tsb.most.biz.service.yardtruck;

import com.tsb.most.biz.parm.yardtruck.SearchEquipmentParm;
import com.tsb.most.biz.parm.yardtruck.SearchStoppageParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IYardTractor {
	public DataItemList searchEquipmentYtItems(SearchEquipmentParm parm) throws BizException;
	public DataItemList searchContainerItems(SearchEquipmentParm parm) throws BizException;
	public DataItemList searchStopReasonItems(SearchStoppageParm parm) throws BizException;
	public DataItemList searchStoppageItem(SearchStoppageParm parm) throws BizException;
	public DataItemList processSetStoppage(SearchStoppageParm parm) throws BizException;
	public DataItemList processResumeStoppage(SearchStoppageParm parm) throws BizException;
}
