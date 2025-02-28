package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.RORODischargingListItem;
import com.tsb.most.biz.parm.document.SearchRORODischargingListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface IRORODischargingListDao {
	public DataItemList selectVesselSchedule(SearchRORODischargingListParm parm) throws DaoException;
	public DataItemList selectBLList(SearchRORODischargingListParm parm) throws BizException;
	public DataItemList selectMFList(SearchRORODischargingListParm parm) throws BizException;
	public DataItemList selectCommodityHeredity(SearchRORODischargingListParm parm) throws BizException;
	public DataItemList insertMFItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertBLItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertBLDtlItem(InsertItemsBizParm parm) throws BizException;
	
	public void deleteMFItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteBLItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteBLDtlItems(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList selectBrand(RORODischargingListItem parm) throws BizException;
	public DataItemList selectModel(RORODischargingListItem parm) throws BizException;
}
