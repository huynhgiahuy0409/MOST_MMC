package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchCargoHandlingOutParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoHandlingOutDao extends BaseDao implements ICargoHandlingOutDao {

	public DataItemList selectCargoHandlingOutList(SearchCargoHandlingOutParm parm) throws DaoException {
        return unifiedDao.getItems("cargoHandlingOut.selectCargoHandlingOutList", parm);
    }
	
	public DataItemList selectCargoRhdlHandlingOutList(SearchCargoHandlingOutParm parm) throws DaoException {
        return unifiedDao.getItems("cargoHandlingOut.selectCargoRhdlHandlingOutList", parm);
    }
	
	public DataItemList updateCargoHandlingOutItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "cargoHandlingOut.updateCargoHandlingOutItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public DataItemList insertCargoHOJobItems(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "cargoHandlingOut.insertCargoHOJobItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public DataItemList insertCargoInvLocationItems(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "cargoHandlingOut.insertCargoInvLocationItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList updateCargoMasterStatus(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "cargoHandlingOut.updateCargoMasterStatus", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	public DataItemList insertCargoHOArrvDelvItems(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null, "cargoHandlingOut.insertCargoHOArrvDelvItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
	public DataItemList updateCargoHOArrvDelvItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "cargoHandlingOut.updateCargoHOArrvDelvItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
	
	//Package
	public void insertPackageJobItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"cargoHandlingOut.insertPackageJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }
	
}
