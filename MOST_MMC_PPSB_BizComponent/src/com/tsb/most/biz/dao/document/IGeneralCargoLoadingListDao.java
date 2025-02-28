package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchGeneralCargoLoadingListParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public interface IGeneralCargoLoadingListDao {
	public DataItemList selectVesselSchedule(SearchGeneralCargoLoadingListParm parm) throws DaoException;
	public DataItemList selectManifest(SearchGeneralCargoLoadingListParm parm) throws DaoException;
	public DataItemList selectShippingNote(SearchGeneralCargoLoadingListParm parm) throws DaoException;
	public DataItemList selectCommodityHeredity(SearchGeneralCargoLoadingListParm parm) throws BizException;
	public DataItemList insertMFItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertShippingNoteItem(InsertItemsBizParm parm) throws BizException;
	public DataItemList insertShippingNoteDtlItem(InsertItemsBizParm parm) throws BizException;
	
	public void deleteMFItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteShippingNoteItems(DeleteItemsBizParm parm) throws BizException;
	public void deleteShippingNoteDtlItems(DeleteItemsBizParm parm) throws BizException;
	
}
