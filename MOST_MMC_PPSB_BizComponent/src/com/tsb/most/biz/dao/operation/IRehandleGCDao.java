package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchRehandleGCParm;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;
import com.tsb.most.framework.tx.TxTraceInfo;

public interface IRehandleGCDao {
    public DataItemList selectCargoRehandlingComboList(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectCommodityGroupList(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectCommodtiyCodeList(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectCargoRehandlingList(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList validateDelete(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectCargoRhdlOperation(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList getNumbPage(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectCargoRhdlOperationNonJPVC(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList getCargoRhdlBlSnCombo(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList getCargoRhdlOpBlSnCombo(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList getCargoRhdlStorageSnCombo(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectCargoRehandlingPopupList(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectCargoRehandlingDetailList(SearchRehandleGCParm parm) throws DaoException;
    
    public DataItemList selectRhdlShippingNoteComboList(SearchRehandleGCParm parm) throws DaoException;
    public DataItemList selectRhdlGrNoComboList(SearchRehandleGCParm parm) throws DaoException;
    
    public boolean getCargoRhdlGroupsYn(SearchRehandleGCParm parm) throws DaoException;
    public String getCargoRhdlGroupNo(SearchRehandleGCParm parm) throws DaoException;
	public DataItemList selectCargoRhdLoadingList(SearchRehandleGCParm parm)throws DaoException;
	public DataItemList selectInvLocList(SearchRehandleGCParm parm)throws DaoException;
	public DataItemList selectRhdlLinkJobNo(SearchRehandleGCParm parm)throws DaoException;
	public DataItemList selectRhdlNo(SearchRehandleGCParm parm)throws DaoException;
	public DataItemList selectRstGr(SearchGoodsReceiptParm parm)throws DaoException;
	
	public DataItemList insertCargoRehandlingItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertCargoInvLocationItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertCargoMstItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList insertJobItems(InsertItemsBizParm parm) throws DaoException;
    public DataItemList updateAmtCargoMstItems(UpdateItemsBizParm parm) throws DaoException;
    
    public DataItemList updateCargoRehandlingDetailItemsForUpdate(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateCargoRehandlingRTSItemsForUpdate(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateCargoRehandlingChgVslItemsForUpdate(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateGrForUpdate(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateShpgNoteItemsForUpdate(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateShpgNoteAmtItemsForUpdate(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateInvItemsForUpdateOrgVsl(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateInvItemsForUpdateNxVsl(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateCgMstItemsForUpdate(UpdateItemsBizParm parm) throws DaoException;
    public DataItemList updateJobItemsForUpdate(UpdateItemsBizParm parm) throws DaoException;
    
	public void updateCargoRehandlingItems(TxTraceInfo txTraceInfo,DataItemList items) throws DaoException;
    public void deleteCargoRehandlingItems(DeleteItemsBizParm parm) throws DaoException;
    public void deleteCargoRehandlingDetailItems(DeleteItemsBizParm parm) throws DaoException;
    public void deleteCargoRehandlingInvLocItems(DeleteItemsBizParm parm) throws DaoException;
    public void deleteCargoMstItems(DeleteItemsBizParm parm) throws DaoException;
    
    
}
