package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoArrvDelvDao extends BaseDao implements ICargoArrvDelvDao {

	public DataItemList selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoArrvDelv.selectGatepassNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectArrvDelvIsCheck(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return  unifiedDao.getItems("cargoArrvDelv.selectArrvDelvIsCheck", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectGateInData(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoArrvDelv.selectGateInData", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
     }
	
	public DataItemList selectCargoArrvDelv(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoArrvDelv.selectCargoArrvDelv", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList selectGateOutCheck(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return  unifiedDao.getItems("cargoArrvDelv.selectGateOutCheck", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList selectGateTxnNo(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoArrvDelv.selectGateTxnNo", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	public DataItemList selectJobGateInOut(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoArrvDelv.selectJobGateInOut", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    }
	
	public DataItemList selectGateInCargoItem(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("cargoArrvDelv.selectGateInCargoItem", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
        
     }
	
	public DataItemList checkMultiCargoTxn(SearchCargoArrvDelvParm parm) throws DaoException {
    	try{
    		return  unifiedDao.getItems("cargoArrvDelv.checkMultiCargoTxn", parm);
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
    	
    }
	///////////////////////////////////////////////////////
	
	public DataItemList insertGateIntems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		unifiedDao.insertItems(null,"cargoArrvDelv.insertGateIntems", insertItems);		
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateGateInItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "cargoArrvDelv.updateGateInItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateGateOutItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "cargoArrvDelv.updateGateOutItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertGOJobItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"cargoArrvDelv.insertGOJobItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList updateGOJobItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getUpdateItems();
    		setNewVersion(insertItems);	
    		unifiedDao.updateItems(null,"cargoArrvDelv.updateGOJobItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
	
	public DataItemList updateCirPrintItem(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updItems = new DataItemList();
    		updItems.add(parm.getUpdateItem());
    		setNewVersion(updItems);	
    		unifiedDao.updateItems(null,"cargoArrvDelv.updateCirPrintItem", updItems);
    		setVersion(updItems);			
    		return updItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }
}
