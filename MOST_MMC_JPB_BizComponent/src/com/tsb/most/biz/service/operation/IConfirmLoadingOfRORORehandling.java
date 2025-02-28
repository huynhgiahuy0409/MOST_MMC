package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IConfirmLoadingOfRORORehandling {
	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	
	public DataItemList updateLoadingOfRORORehandlingItems(UpdateItemsBizParm parm) throws BizException;
}
