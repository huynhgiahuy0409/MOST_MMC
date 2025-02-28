package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingInOfROROParm;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ConfirmHandlingInOfRORODao extends BaseDao implements IConfirmHandlingInOfRORODao{
	public DataItemList selectBookingNoComboBoxItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException {
        DataItemList rtnList = null;
        rtnList = unifiedDao.getItems("confirmHandlingInOfRORO.selectBookingNoComboBoxItems", parm);
        return rtnList;
    }
    
    public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException {
        DataItemList rtnList = null;
        rtnList = unifiedDao.getItems("confirmHandlingInOfRORO.selectShipgNoteNoComboBoxItems", parm);
        return rtnList;
    }
	
    public DataItemList selectCargoItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException {
        DataItemList rtnList = null;
        rtnList = unifiedDao.getItemsPage("confirmHandlingInOfRORO.selectCargoItems", parm);
        return rtnList;
    }
	
	public DataItemList selectGateInItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException{
		DataItemList rtnList = null;
        rtnList = unifiedDao.getItems("confirmHandlingInOfRORO.selectGateInItems", parm);
        return rtnList;
	}
	
    public DataItemList selectHandlingInItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException {
        DataItemList rtnList = null;
        rtnList = unifiedDao.getItems("confirmHandlingInOfRORO.selectHandlingInItems", parm);
        return rtnList;
    }

    public DataItemList updateConfirmHandlingInOfRoRo(UpdateItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null ,"confirmHandlingInOfRORO.updateConfirmHandlingInForRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList insertUnitCorrectionOfRoRo(InsertItemsBizParm items) throws DaoException {
    	try{
    		DataItemList itemList = items.getInsertItems();
			setNewVersion(itemList);
			unifiedDao.insertItems(null,"confirmHandlingInOfRORO.insertUnitCorrectionForRoRo", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public String selectJobGroupNo(SearchROROMasterParm parm) throws DaoException {
		try{
        	return (String)unifiedDao.readOne("confirmHandlingInOfRORO.selectJobGroupNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public String selectGateInTimeSeq(SearchConfirmHandlingInOfROROParm parm) throws DaoException {
		 DataItemList list = unifiedDao.getItems("confirmHandlingInOfRORO.selectGateInTimeSeq", parm);
	     return (String)list.getCollection().get(0);
	}

	@Override
	public void updateCgHIAmtItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmHandlingInOfRORO.updateCgHIAmtItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void insertHIJobItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"confirmHandlingInOfRORO.insertHIJobItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectGatepassNo(SearchCargoArrvDelvParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("cargoArrvDelv.selectGatepassNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateHIGPArrvDelvItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmHandlingInOfRORO.updateHIGPArrvDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void insertHIArrvDelvItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"confirmHandlingInOfRORO.insertHIArrvDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateHIArrvDelvItems(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmHandlingInOfRORO.updateHIArrvDelvItems", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void insertHIGeneralGateIn(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.insertItems(null,"confirmHandlingInOfRORO.insertHIGeneralGateIn", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateHIGateInTime(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmHandlingInOfRORO.updateHIGateInTime", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateHIGateInLorry(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmHandlingInOfRORO.updateHIGateInLorry", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public void updateHIOnlyLorry(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmHandlingInOfRORO.updateHIOnlyLorry", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public boolean selectIsCargoAvDvChk(SearchROROMasterParm parm) throws DaoException {
		try{
        	String rtnValue = (String)unifiedDao.readOne("roroMaster.selectIsCargoAvDvChk", parm);
        	
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
	public DataItemList selectROROUnitItems(SearchConfirmHandlingInOfROROParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("confirmHandlingInOfRORO.selectROROUnitItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void insertJobDtlItemsOfRoRo(DataItemList items) throws DaoException {
		try{
			setNewVersion(items);
			unifiedDao.updateItems(null,"confirmHandlingInOfRORO.insertJobDtlItemsOfRoRo", items);
			setVersion(items);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

//	@Override
//	public DataItemList updateGateOperations(UpdateItemsBizParm items) throws DaoException {
//    	try{
//    		DataItemList itemList = items.getUpdateItems();
//			setNewVersion(itemList);
//			unifiedDao.updateItems(null ,"confirmHandlingInOfRORO.generatingGateOutJobWithDriverModeWB", itemList);
//			setVersion(itemList);
//			return itemList;
//		}catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
}
