package com.tsb.most.biz.service.document;

import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public interface IGoodsReceipt {
	public DataItemList selectGoodsReceiptList(SearchGoodsReceiptParm parm) throws BizException;
	public DataItemList selectGoodsReceiptDetail(SearchGoodsReceiptParm parm) throws BizException;
	public DataItemList selectPackageItems(SearchGoodsReceiptParm parm) throws BizException;
	public DataItemList selectGoodsReceiptReport(SearchGoodsReceiptParm parm) throws BizException;
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException;
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException;
	public void deleteItems(DeleteItemsBizParm parm) throws BizException;
	
	public DataItemList selectGoodsReceiptForCreating(SearchGoodsReceiptParm parm) throws BizException;
	public DataItemList insertGoodsReceiptOfRORO(InsertItemsBizParm parm) throws BizException;
	public DataItemList selectBalanceGoodsReceiptReturnToShipper(SearchGoodsReceiptParm parm) throws BizException;
	public DataItemList selectWarehouseRtsList(SearchGoodsReceiptParm parm) throws BizException;
	public DataItemList selectRTSRoRoItems(SearchShippingNoteParm parm) throws BizException;
}
