package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IConfirmHandlingOutOfRORO {
	public DataItemList selectBlComboItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectHandlingOutComboItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectDoItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectHandlingOutUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	
	public DataItemList updateHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList selectDoItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectHandlingOutUnitItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList updateHandlingOutUnitItemsHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteHandlingOutUnitItemsHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList selectHandlingOutComboItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectDriverWithoutTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectTruckComboBoxItemsHHT(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
}
