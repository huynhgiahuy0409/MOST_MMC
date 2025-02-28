package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmHandlingOutOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IConfirmHandlingOutOfRORORehandling {
	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectHandlingOutComboItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	public DataItemList selectUnitItems(SearchConfirmHandlingOutOfROROParm parm) throws BizException;
	
	public DataItemList updateHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteHandlingOutUnitItems(UpdateItemsBizParm parm) throws BizException;
}
