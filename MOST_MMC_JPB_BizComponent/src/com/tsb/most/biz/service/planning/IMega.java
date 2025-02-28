package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IMega {
	public DataItemList selectMegaList(SearchMegaParm parm) throws BizException;
	public DataItemList selectMegaPenaltyList(SearchMegaParm parm) throws BizException;
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateRmk4MegaItems(UpdateItemsBizParm parm) throws BizException;
	public DataItemList deleteMegaItems(DeleteItemsBizParm parm) throws BizException;
	public void processMegaDtlEquipment(MegaItem megaItem) throws BizException;
	public DataItemList selectMegaWarehouseSnDoList(SearchMegaParm parm) throws BizException;
	public DataItemList selectMegaEquipmentList(SearchMegaParm parm) throws BizException;
	public DataItemList selectMegaCgDtlList(SearchMegaParm parm) throws BizException;
	public DataItemList selectMegaVesselCallId(SearchMegaParm parm) throws BizException;
	public DataItemList selectValidationCode(SearchMegaParm parm) throws BizException;
	public DataItemList selectConfirmationSlipDryBreakBulk(SearchMegaParm parm) throws BizException;
	public DataItemList selectMegaDetailList(SearchMegaParm parm) throws BizException;
	public DataItemList selectMegaManpowerList(SearchMegaParm parm) throws BizException;
	public DataItemList selectInternalMegaList(SearchMegaParm parm) throws BizException;
	public void updateMegaInternaForkliftlItem(UpdateItemsBizParm parm) throws BizException; 
	
}
