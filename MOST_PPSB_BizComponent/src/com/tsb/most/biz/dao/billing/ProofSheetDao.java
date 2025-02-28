package com.tsb.most.biz.dao.billing;

import com.tsb.most.biz.dataitem.billing.ProofSheetItem;
import com.tsb.most.biz.parm.billing.SearchProofSheetParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ProofSheetDao extends BaseDao implements IProofSheetDao{

	public DataItemList selectCostCenterCombo(SearchProofSheetParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("proofsheet.selectCostCenterCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectProofSheetList(SearchProofSheetParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("proofsheet.selectProofSheetList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectExchangeData(SearchProofSheetParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("proofsheet.selectExchangeData", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectCostCenterData(SearchProofSheetParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("proofsheet.selectCostCenterData", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectPartnerRates(SearchProofSheetParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("proofsheet.selectPartnerRates", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectSsrList(ProofSheetItem item) throws DaoException {
    	try{
    		return unifiedDao.getItems("proofsheet.selectSsrList", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectComboBoxIvPrefix(SearchProofSheetParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("proofsheet.selectComboBoxIvPrefix", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList updateStatusDataGathering(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "proofsheet.updateStatusDataGathering", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList updateGatheredData(UpdateItemsBizParm parm) throws DaoException{
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "proofsheet.updateGatheredData", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList updateSsrStatus(UpdateItemsBizParm parm) throws DaoException{
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "proofsheet.updateSsrStatus", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList updateSsrDetail(UpdateItemsBizParm parm) throws DaoException{
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "proofsheet.updateSsrDetail", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList updateServiceOrderPayer(UpdateItemsBizParm parm) throws DaoException{
    	try{
    		DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "proofsheet.updateServiceOrderPayer", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
}