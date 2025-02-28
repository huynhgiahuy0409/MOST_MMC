package com.tsb.most.biz.dao.document;
import com.tsb.most.biz.dataitem.document.TerminalHoldReleaseControlItem;
import com.tsb.most.biz.parm.document.SearchTerminalHoldReleaseControlParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class TerminalHoldReleaseControlDao extends BaseDao implements ITerminalHoldReleaseControlDao {
    
    public DataItemList selectTerminalHoldReleaseList(SearchTerminalHoldReleaseControlParm parm)  throws DaoException {
    	try{
    		return unifiedDao.getItems("terminalHoldReleaseControl.selectTerminalHoldReleaseList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectTerminalHoldReleaseHist(SearchTerminalHoldReleaseControlParm parm)  throws DaoException {
    	try{
    		return unifiedDao.getItems("terminalHoldReleaseControl.selectTerminalHoldReleaseHist", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectOPStoppedByHoldReason(SearchTerminalHoldReleaseControlParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("terminalHoldReleaseControl.selectOPStoppedByHoldReason", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		DataItemList insertItemList = new DataItemList();
    		
    		TerminalHoldReleaseControlItem item = (TerminalHoldReleaseControlItem)insertItems.getCollection().get(0);
    		if(item.getVinNo() != null && !item.getVinNo().equals("")) {
    			 String[] vinList = item.getVinNo().split(",");
    			 if (vinList != null && vinList.length >0) {
    				
		            for (int i=0; i < vinList.length ; i++) {
		            	TerminalHoldReleaseControlItem it = (TerminalHoldReleaseControlItem)item.clone();
		            	it.setVinNo(vinList[i]);
		            	insertItemList.add(it);
		            }
		        }
    		}
    		
    		if(insertItemList.size() > 0) {
    			insertItems = insertItemList;
    		}
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"terminalHoldReleaseControl.insertTerminalHoldItem", insertItems);
    		setVersion(insertItems);			
    		
    		return insertItems;
    		
		}catch(Exception e){
			throw new DaoException(e);
		}
    }  
    
    public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "terminalHoldReleaseControl.updateTerminalHoldItem", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    public DataItemList deleteItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItemsWithTimeCheck(null, "terminalHoldReleaseControl.deleteTerminalHoldItem", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }
    
    @Override
	public DataItemList checkTerminalHold(SearchTerminalHoldReleaseControlParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("terminalHoldReleaseControl.checkTerminalHold", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
