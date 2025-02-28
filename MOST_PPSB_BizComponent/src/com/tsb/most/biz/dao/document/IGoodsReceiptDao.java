package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.dataitem.document.GoodsReceiptItem;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IGoodsReceiptDao {
	public DataItemList selectGoodsReceiptList(SearchGoodsReceiptParm parm) throws DaoException;
	public String countGoodsReceiptNo(SearchGoodsReceiptParm parm) throws DaoException;
	public DataItemList selectGoodsReceiptNo(SearchGoodsReceiptParm parm) throws DaoException;
	public DataItemList selectPackageItems(SearchGoodsReceiptParm parm) throws DaoException;
	public DataItemList selectGoodsReceiptReport(SearchGoodsReceiptParm parm) throws DaoException;
	
	public DataItemList insertGoodsReceiptItems(InsertItemsBizParm items) throws DaoException;
	public DataItemList insertGoodsReceiptMultiItems(InsertItemsBizParm items) throws DaoException;
	public DataItemList updateGoodsReceiptItems(UpdateItemsBizParm items) throws DaoException;
	public void deleteGoodsReceiptItems(DeleteItemsBizParm items) throws DaoException;
 	
	public DataItemList selectGoodsReceiptForCreating(SearchGoodsReceiptParm parm) throws DaoException;
	public void insertGoodsReceiptItem(DataItem item) throws DaoException;
	
	public void updatePackageItems(DataItem item) throws DaoException;
	public DataItemList deletePackageItems(UpdateItemsBizParm parm) throws DaoException;
	
	public DataItemList updateGoodsReceiptAmountItems(UpdateItemsBizParm items) throws DaoException;
	public DataItemList getGoodsReceiptList(SearchGoodsReceiptParm parm) throws DaoException;
	public DataItemList selectBalanceGoodsReceiptReturnToShipper(SearchGoodsReceiptParm parm) throws DaoException;
	public DataItemList selectWarehouseRtsList(SearchGoodsReceiptParm parm) throws DaoException;
	public DataItemList selectGoodsReceiptNoForReturnToShipper(SearchGoodsReceiptParm parm) throws DaoException;
	
	public DataItemList selectInvLocList(SearchGoodsReceiptParm parm) throws DaoException;
	public DataItemList selectGrIvLocJobNo(SearchGoodsReceiptParm parm) throws DaoException;
	
	public DataItemList insertCargoInvLocationItems(InsertItemsBizParm items) throws DaoException;
	public DataItemList insertCargoMasterItems(InsertItemsBizParm items) throws DaoException;
	public DataItemList insertJobItems(InsertItemsBizParm parm) throws DaoException;
	public void insertRoRoItems(DataItem item) throws DaoException;
	
	public DataItemList selectRTSRoRoItems(SearchShippingNoteParm parm) throws DaoException;
}
