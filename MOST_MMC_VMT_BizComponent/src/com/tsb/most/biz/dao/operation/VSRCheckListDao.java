package com.tsb.most.biz.dao.operation;

import java.util.ArrayList;
import java.util.HashMap;

import com.tsb.most.biz.dataitem.operation.VSRCheckListItem;
import com.tsb.most.biz.parm.operation.SearchVSRCheckListParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VSRCheckListDao extends BaseDao implements IVSRCheckListDao {   

    public DataItemList selectVSRCheckList(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItemsPage("vsrCheckList.selectVSRCheckList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

    public DataItemList selectVSRCheckListDetail(SearchVSRCheckListParm parm) throws DaoException {
    	DataItemList rtnList = new DataItemList();
    	try{
            for (int i = 0; i < 6; i++) {
                if (i == 0) {
                    // manpower list
                    parm.setDivCd("SD");
                } else if (i == 1) {
                    // forlift list
                    parm.setDivCd("FL");
                } else if (i == 2) {
                    // mechanical eq list
                    parm.setDivCd("ME");
                } else if (i == 3) {
                    // port crane list
                    parm.setDivCd("PC");
                } else if (i == 4) {
                    // trailer list
                    parm.setDivCd("TR");
                } else if (i == 5) {
                    // stevedore list
                    parm.setDivCd("ST");
                    parm.setSearchStevedore("true");
                }
                rtnList.getCollection().add(unifiedDao.getItems("vsrCheckList.selectVSRCheckListDetail", parm).getCollection());
            }
            return rtnList;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectMegaEQList(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectMegaEQList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}    	
    }
    
    public DataItemList selectMegaNoList(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectMegaNoList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectDeployEQList(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectDeployEQList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
        
    }
    
    public DataItemList selectVOperationDeployEQList(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectVOperationDeployEQList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}       
    }
    
    public DataItemList selectEmpIdList(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectEmpIdList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}       
    }
    
    public DataItemList selectPayerList(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectPayerList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}       
    }
    
    public DataItemList selectRefNoCombo(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectRefNoCombo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
    
    public DataItemList selectCheckVSRListHHT(SearchVSRCheckListParm parm) throws DaoException {
    	try{
            return unifiedDao.getItems("vsrCheckList.selectCheckVSRList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectWorkingArea(SearchVSRCheckListParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("vsrCheckList.selectWorkingArea", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
        
    }
    
    public Integer selectIsItemInUsed(VSRCheckListItem item) throws DaoException {
    	try{
    		
        	SearchVSRCheckListParm parm = new SearchVSRCheckListParm();
        	parm.setVslCallID(item.getVslCallID());
        	parm.setSeq(item.getSeq());
        	
        	DataItemList listItem = unifiedDao.getItems("vsrCheckList.selectIsItemInUsed",parm);
        	
        	if(listItem.size()>0) {
        		return listItem.size();
        	}
           
        	return 0;
		}catch(Exception e){
			throw new DaoException(e);
		}    	
    }
    
    public void insertItem(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null, "vsrCheckList.insertItem", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public void updateItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null,  "vsrCheckList.updateItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}    	
    }

    public void  deleteDatagathering(DataItem item) throws DaoException {
    	unifiedDao.deleteItem(null, "vsrCheckList.deleteGatherData", item);
    	unifiedDao.deleteItem(null, "vsrCheckList.deleteGatherData2", item);
    	unifiedDao.deleteItem(null, "vsrCheckList.deleteGatherData3", item);
    }
    
    public void deleteItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.deleteItems(null,  "vsrCheckList.deleteItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}    	
    }
    
    public void updateVerifyStatusItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.updateItems(null, "vsrCheckList.updateVerifyStatusItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
    
    //////////////////////////////////////////////////////

}
