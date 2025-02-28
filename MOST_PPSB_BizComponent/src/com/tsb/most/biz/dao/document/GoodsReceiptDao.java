package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class GoodsReceiptDao extends BaseDao implements IGoodsReceiptDao {

    public DataItemList selectGoodsReceiptList(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("goodsReceipt.selectGoodsReceiptList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
   	public DataItemList selectGoodsReceiptReport(SearchGoodsReceiptParm parm) throws DaoException {
       	try{
       		return unifiedDao.getItems("goodsReceipt.selectGoodsReceiptReport", parm);
   		}catch(Exception e){
   			throw new DaoException(e);
   		}
       }
    
	public DataItemList selectPackageItems(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectPackageItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertGoodsReceiptItems(InsertItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null,"goodsReceipt.insertGoodsReceiptItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertGoodsReceiptMultiItems(InsertItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getInsertItems();
    		setNewVersion(itemList);
    		unifiedDao.insertItems(null,"goodsReceipt.insertGoodsReceiptMultiItems", itemList);
    		setVersion(itemList);
    		return itemList;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public void insertGoodsReceiptItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			unifiedDao.insertItem(null,"goodsReceipt.insertGoodsReceiptItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList updateGoodsReceiptItems(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"goodsReceipt.updateGoodsReceiptItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
	public void updatePackageItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"goodsReceipt.updatePackageItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
    
    public void deleteGoodsReceiptItems(DeleteItemsBizParm items) throws DaoException{
    	try{
    		DataItemList  itemList = items.getDeleteItems();
			setNewVersion(itemList);
			unifiedDao.deleteItems(null, "goodsReceipt.deleteGoodsReceiptItems", itemList);
			unifiedDao.deleteItems(null, "goodsReceipt.deleteROROItems", itemList);
			setVersion(itemList);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
    public DataItemList deletePackageItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
    		
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "goodsReceipt.deletePackageItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }

    public String countGoodsReceiptNo(SearchGoodsReceiptParm parm) throws DaoException {
    	return null;
    }

    public DataItemList selectGoodsReceiptNo(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectGoodsReceiptNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectGoodsReceiptForCreating(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectGoodsReceiptForCreating", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    @Override
    public DataItemList updateGoodsReceiptAmountItems(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
    		setNewVersion(itemList);
    		unifiedDao.updateItems(null ,"goodsReceipt.updateGoodsReceiptAmountItems", itemList);
    		setVersion(itemList);
    		return itemList;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
    
    public DataItemList getGoodsReceiptList(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.getGoodsReceiptList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
    
    public DataItemList selectBalanceGoodsReceiptReturnToShipper(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectBalanceGoodsReceiptReturnToShipper", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}    	
    }
    
    public DataItemList selectWarehouseRtsList(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectWarehouseRtsList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}    	
    }
    
    public DataItemList selectGoodsReceiptNoForReturnToShipper(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectGoodsReceiptNoForReturnToShipper", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectInvLocList(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectInvLocList", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    	
    }
    
    public DataItemList selectGrIvLocJobNo(SearchGoodsReceiptParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("goodsReceipt.selectGrIvLocJobNo", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    	
    }
    
    @Override
	public DataItemList insertCargoInvLocationItems(InsertItemsBizParm items) throws DaoException {
		try{
    		DataItemList itemList = items.getInsertItems();
    		setNewVersion(itemList);
    		unifiedDao.insertItems(null,"goodsReceipt.insertCargoInvLocationItems", itemList);
    		setVersion(itemList);
    		return itemList;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
	}
	
	@Override
	public DataItemList insertCargoMasterItems(InsertItemsBizParm items) throws DaoException {
		try{
    		DataItemList itemList = items.getInsertItems();
    		setNewVersion(itemList);
    		unifiedDao.insertItems(null,"goodsReceipt.insertCargoMasterItems", itemList);
    		setVersion(itemList);
    		return itemList;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
	}
	
	@Override
    public DataItemList insertJobItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"goodsReceipt.insertJobItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }


	@Override
	public void insertRoRoItems(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"shippingNote.insertRoRoMSTItems", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectRTSRoRoItems(SearchShippingNoteParm parm) throws DaoException{
		return unifiedDao.getItems("goodsReceipt.selectRTSRoRoItems", parm);
	}
}
