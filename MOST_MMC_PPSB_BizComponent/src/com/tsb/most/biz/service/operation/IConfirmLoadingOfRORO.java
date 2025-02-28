package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IConfirmLoadingOfRORO {
	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectInDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException;
	
	public DataItemList updateConfirmYardAndLoadingCheckForRoRo(UpdateItemsBizParm parm) throws BizException;
	
	public DataItemList selectCargoItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectInDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList selectDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException;
	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteItemsHHT(UpdateItemsBizParm parm) throws BizException;
	
}
