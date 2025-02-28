package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.RehandlingOfROROItem;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfROROParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class RehandlingOfRORODao extends BaseDao implements IRehandlingOfRORODao {
  
	public DataItemList selectBlComboBoxItems(SearchRehandlingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("rehandlingOfRORO.selectBlComboBoxItems", parm);
    }
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchRehandlingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("rehandlingOfRORO.selectShipgNoteNoComboBoxItems", parm);
    }
	
	public DataItemList selectOriginalCargoItems(SearchRehandlingOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("rehandlingOfRORO.selectOriginalCargoItems", parm);
    }
	
	public DataItemList selectRehandlingCargoItems(SearchRehandlingOfROROParm parm) throws DaoException {
        return unifiedDao.getItemsPage("rehandlingOfRORO.selectRehandlingCargoItems", parm);
    }
	
	//DETAIL
	public DataItemList selectStackedUnitItems(SearchRehandlingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("rehandlingOfRORO.selectStackedUnitItems", parm);
    }
	
	public DataItemList selectRehandlingUnitItems(SearchRehandlingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("rehandlingOfRORO.selectRehandlingUnitItems", parm);
    }
	
	public String selectRhdlGroupNo(SearchRehandlingOfROROParm parm) throws DaoException {
		return (String)unifiedDao.readOne("rehandlingOfRORO.selectRhdlGroupNo", parm);
	}
	
	public String selectRhdlNo(SearchRehandlingOfROROParm parm) throws DaoException {
		return (String)unifiedDao.readOne("rehandlingOfRORO.selectRhdlNo", parm);
	}
	
	public String selectDeletingValidationYn(SearchRehandlingOfROROParm parm) throws DaoException {
		return (String)unifiedDao.readOne("rehandlingOfRORO.selectDeletingValidationYn", parm);
	}
	
	public void deleteRehandlingUnitDamageItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"rehandlingOfRORO.deleteRehandlingUnitDamageItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteOriginalDamageUnitItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"rehandlingOfRORO.deleteOriginalDamageUnitItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteRehandlingGoodsReceiptItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"rehandlingOfRORO.deleteRehandlingGoodsReceiptItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteOriginalUnitItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"rehandlingOfRORO.deleteOriginalUnitItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteRehandlingUnitItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"rehandlingOfRORO.deleteRehandlingUnitItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void deleteRehandlingItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"rehandlingOfRORO.deleteRehandlingItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	//Detail
	public void updateOriginalUnitItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"rehandlingOfRORO.updateOriginalUnitItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void insertRehandlingUnitItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"rehandlingOfRORO.insertRehandlingUnitItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void insertRehandlingUnitDamageItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"rehandlingOfRORO.insertRehandlingUnitDamageItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateOriginalDamageUnitItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"rehandlingOfRORO.updateOriginalDamageUnitItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void insertRehandlingGoodsReceiptItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"rehandlingOfRORO.insertRehandlingGoodsReceiptItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void insertRehandlingItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"rehandlingOfRORO.insertRehandlingItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public void updateAmount4ShippingNoteItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"rehandlingOfRORO.updateAmount4ShippingNoteItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectNextVesselInfor(SearchRehandlingOfROROParm parm) throws DaoException {
        return unifiedDao.getItems("rehandlingOfRORO.selectNextVesselInfor", parm);
    }

	@Override
	public DataItemList insertCargoRehandlingItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"rehandlingOfRORO.insertCargoRehandlingItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertJobItems(InsertItemsBizParm item) throws DaoException {
		try{
    		DataItemList insertItems = item.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"rehandlingOfRORO.insertJobItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
    	}catch(Exception e){
    		throw new DaoException(e);
    	}
	}
	
	@Override
	public void insertJobDtlItemsOfRoRo(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.insertItem(null ,"rehandlingOfRORO.insertJobDtlItemsOfRoRo", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateAmount4CargoJobItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.updateItem(null ,"rehandlingOfRORO.updateAmount4JobItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public Integer selectMaxSeq4JobDetail(RehandlingOfROROItem parm) throws DaoException {
		return (Integer)unifiedDao.readOne("rehandlingOfRORO.selectMaxSeq4JobDetail", parm);
	}

	@Override
	public void deleteRehandlingShippingNoteItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"rehandlingOfRORO.deleteRehandlingShippingNoteItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void deleteRehandlingCargoJobItem(DataItem item) throws DaoException {
		try{
			setNewVersion(item);
			unifiedDao.deleteItem(null ,"rehandlingOfRORO.deleteRehandlingCargoJobItem", item);
			setVersion(item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

}
