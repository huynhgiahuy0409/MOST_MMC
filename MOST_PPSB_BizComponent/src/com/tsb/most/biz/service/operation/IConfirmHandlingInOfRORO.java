package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmHandlingInOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IConfirmHandlingInOfRORO {
	public DataItemList selectCommonComboItems(SearchConfirmHandlingInOfROROParm parm) throws BizException;
	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingInOfROROParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchConfirmHandlingInOfROROParm parm) throws BizException;
	public DataItemList selectGateInItems(SearchConfirmHandlingInOfROROParm parm) throws BizException;
	public DataItemList selectHandlingInItems(SearchConfirmHandlingInOfROROParm parm) throws BizException;
	
	public DataItemList updateHandlingInUnitItems(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList selectGateInItemsHHT(SearchConfirmHandlingInOfROROParm parm) throws BizException;
	public DataItemList deleteHandlingInUnitItemsHHT(UpdateItemsBizParm parm) throws BizException;
}
