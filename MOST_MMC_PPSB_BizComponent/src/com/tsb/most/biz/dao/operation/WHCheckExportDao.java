package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchWHCheckExportParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class WHCheckExportDao extends BaseDao implements IWHCheckExportDao {

	public DataItemList selectCargoWarehouseCheckExportItems(SearchWHCheckExportParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("whCheckExport.selectCargoWarehouseCheckExportItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public DataItemList checkAmoutLocation(SearchWHCheckExportParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("whCheckExport.checkAmoutLocation", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	public void updateCgWarehouseCheckStateItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"whCheckExport.updateCgWarehouseCheckStateItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void insertJobItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"whCheckExport.insertJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateCargoMasterStatus(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"whCheckExport.updateCargoMasterStatus", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updateCargoMasterInfo(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"whCheckExport.updateCargoMasterInfo", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void insertCargoInvLocationItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"whCheckExport.insertCargoInvLocationItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	//Package
	public void insertPackageJobItems(DataItemList items) throws DaoException {
    	try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"whCheckExport.insertPackageJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
    	
    }

	@Override
	public DataItemList selectWHExportForROROItems(SearchWHCheckExportParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("whCheckExport.selectWHExportForROROItems", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public boolean selectIsROROMst(SearchCargoMasterParm parm) throws DaoException {
		try{
    		String rtnValue = (String)unifiedDao.readOne("whCheckExport.selectIsROROMst", parm);
            
            if(rtnValue != null && rtnValue.equals("1")){
                return true;
            }else{
                return false;
            }
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateCgWarehouseCheckofRORO(UpdateItemsBizParm parm) throws DaoException {
		try{
    		DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"whCheckExport.updateCgWarehouseCheckofRORO", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectUnitNoOfGR(SearchWHCheckExportParm parm) throws DaoException {
		try {
			return unifiedDao.getItems("whCheckExport.selectUnitNoOfGR", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

}
