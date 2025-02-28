package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.parm.billing.SearchProformaInvoiceParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ProformaInvoiceDao extends BaseDao implements IProformaInvoiceDao{
	
    public DataItemList selectProformaInvoice(SearchProformaInvoiceParm parm) throws DaoException {
		try{
	    	return unifiedDao.getItemsPage("proformaInvoice.selectProformaInvoice", parm);	
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
    public DataItemList selectTrfInfoForProformaIv(SearchProformaInvoiceParm parm) throws DaoException {
		try{
	    	return unifiedDao.getItems("proformaInvoice.selectTrfInfoForProformaIv", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
    public DataItemList selectGatheringDataForProformaIv(SearchProformaInvoiceParm parm) throws DaoException {
		try{
	    	return unifiedDao.getItems("proformaInvoice.selectGatheringDataForProformaIv", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public String selectInvoiceNo(SearchProformaInvoiceParm parm) throws DaoException {
    	try{
    		return (String)unifiedDao.readOne("proformaInvoice.selectInvoiceNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public boolean selectIsExistedPorthandlingInvoiced(SearchProformaInvoiceParm parm) throws DaoException {
    	try{
    		String res = (String)unifiedDao.readOne("proformaInvoice.selectIsExistedPorthandlingInvoiced", parm);
    		if(res != null && res.equals("0")){
                return false;
            }else{
                return true;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
    public DataItemList selectTrfInfoForCreditAdditionalIv(SearchProformaInvoiceParm parm) throws DaoException {
		try{
	    	return unifiedDao.getItems("proformaInvoice.selectTrfInfoForCreditAdditionalIv", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
    public DataItemList selectReceiptReport(SearchProformaInvoiceParm parm) throws DaoException {
		try{
	    	return unifiedDao.getItems("proformaInvoice.selectReceiptReport", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public int insertInvoiceItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			return unifiedDao.insertItem(null,"proformaInvoice.insertProformaInvoice", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public int insertInvoiceDataItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			return unifiedDao.insertItem(null,"proformaInvoice.insertProformaInvoiceData", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public int insertInvoiceDataDetailItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			return unifiedDao.insertItem(null,"proformaInvoice.insertProformaInvoiceDataDetail", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateInvoiceNoToProformaIvData(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			unifiedDao.updateItem("proformaInvoice.updateInvoiceNoToProformaIvData", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateInvoiceItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			unifiedDao.updateItem("proformaInvoice.updateProformaforCreditAdditional", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateBillWgtCargoMaster(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			unifiedDao.updateItem("proformaInvoice.updateBillWgtCargoMaster", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public void updateRefIvNo(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			unifiedDao.updateItem("proformaInvoice.updateRefIvNo", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	public void updateOriginalHandlingGoodsIvData(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			unifiedDao.updateItem("proformaInvoice.updateOriginalHandlingGoodsIvData", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public DataItemList updateInvoiceDataStatus(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"proformaInvoice.updateInvoiceDataStatus", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateInvoiceStatus(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);	
    		unifiedDao.updateItems(null,"proformaInvoice.updateInvoiceStatus", updateItems);
    		setVersion(updateItems);			
    		return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateInvoiceDataItem(DataItem item) throws DaoException {
    	try{
			setNewVersion(item);
			setVersion(item);
			unifiedDao.updateItem("proformaInvoice.updateProformaInvoiceData", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	// MMC - Settlement
	@Override
	public DataItemList updateSettleStorageAmt(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "proformaInvoice.updateSettleStorageAmt", updateItems);
			setVersion(updateItems);
			return updateItems;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList updateApplyFreeDays(UpdateItemsBizParm parm) throws DaoException {
		DataItemList updateItems = parm.getUpdateItems();

		setNewVersion(updateItems);
		unifiedDao.updateItems(null, "proformaInvoice.updateApplyFreeDays", updateItems);
		setVersion(updateItems);

		return updateItems;
	}
}
