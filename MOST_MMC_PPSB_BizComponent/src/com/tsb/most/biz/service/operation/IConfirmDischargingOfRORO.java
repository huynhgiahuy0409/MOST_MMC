package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IConfirmDischargingOfRORO {
	public DataItemList selectBlComboItems(SearchConfirmDischargingOfROROParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchConfirmDischargingOfROROParm parm) throws BizException;
	public DataItemList selectUnitItems(SearchConfirmDischargingOfROROParm parm) throws BizException;
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItems(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList selectApronCheckerImportList(SearchConfirmDischargingOfROROParm parm) throws BizException;
	public DataItemList selectUnitItemsHHT(SearchConfirmDischargingOfROROParm parm) throws BizException;
	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItemsHHT(UpdateItemsBizParm parm) throws BizException;
	
}
