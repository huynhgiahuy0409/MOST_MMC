package com.tsb.most.biz.service.operation;

import com.tsb.most.biz.parm.operation.SearchVSRCheckListParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IVSRCheckList{
	public DataItemList selectVSRCheckList(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSRCheckListDetail(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSRCheckListhht(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSRDeployFLNoCombo(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSRDeployEQNoCombo(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSREmpIdCombo(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSREquipmentTRListCombo(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSREquipmentCapaListCombo(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectWorkingArea(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSRPopupList(SearchVSRCheckListParm parm) throws BizException;
	public DataItemList selectVSRPartnerCodeListCombo(SearchVSRCheckListParm parm) throws BizException;
	
	public DataItemList processVSRListItem(UpdateItemsBizParm parm) throws BizException;
	public DataItemList updateVSRVerifyItem(UpdateItemsBizParm parm) throws BizException;	
	public DataItemList getVSRDetailHHT(SearchVSRCheckListParm parm) throws BizException;

}
