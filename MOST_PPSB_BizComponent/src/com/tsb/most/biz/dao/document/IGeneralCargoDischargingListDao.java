package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchGeneralCargoDischargingListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface IGeneralCargoDischargingListDao {
	public DataItemList selectVesselSchedule(SearchGeneralCargoDischargingListParm parm) throws DaoException;
	public DataItemList selectBLList(SearchGeneralCargoDischargingListParm parm) throws BizException;
	public DataItemList selectMFList(SearchGeneralCargoDischargingListParm parm) throws BizException;
	public DataItemList selectCommodityHeredity(SearchGeneralCargoDischargingListParm parm) throws BizException;
	public DataItemList insertMFItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertBLItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertBLDtlItem(InsertItemsBizParm parm) throws BizException;
	
	public void deleteMFItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteBLItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteBLDtlItems(DeleteItemsBizParm parm) throws BizException;
}
