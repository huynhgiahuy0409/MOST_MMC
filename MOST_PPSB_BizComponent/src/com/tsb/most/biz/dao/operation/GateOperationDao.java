package com.tsb.most.biz.dao.operation;


import com.tsb.most.biz.parm.operation.SearchGateOperationParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class GateOperationDao extends BaseDao implements IGateOperationDao {

	@Override
	public DataItemList selectCargoArrivalDelivery(SearchGateOperationParm parm) throws DaoException {
    	try{
    		return unifiedDao.getItems("gateoperation.selectCargoArrivalDelivery", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectCargoLorryGateIn(SearchGateOperationParm parm) throws DaoException {    	
		try{
			return unifiedDao.getItems("gateoperation.selectCargoInfoForGateIn_withoutSDO", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectCargoLorryGateOut(SearchGateOperationParm parm) throws DaoException {    	
		try{
			return unifiedDao.getItems("gateoperation.selectCargoInfoForGateOut_withoutSDO", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectCargoGateInCheck(SearchGateOperationParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("gateoperation.selectCargoGateInCheck", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectJobGateInOut(SearchGateOperationParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("gateoperation.selectJobGateInOut", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectCargoGateOutCheck(SearchGateOperationParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("gateoperation.selectCargoGateOutCheck", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList selectGateTxnNo(SearchGateOperationParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("gateoperation.selectGateTxnNo", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertCargoGateInItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		unifiedDao.insertItems(null,"gateoperation.insertCargoGateInItems", insertItems);		
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertGOJobItems(InsertItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getInsertItems();
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"gateoperation.insertGOJobItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

	@Override
	public DataItemList updateCargoGateInItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "gateoperation.updateCargoGateInItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateCargoGateOutItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "gateoperation.updateCargoGateOutItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
    }

	@Override
	public DataItemList updateGOJobItems(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList insertItems = parm.getUpdateItems();
    		setNewVersion(insertItems);	
    		unifiedDao.updateItems(null,"gateoperation.updateGOJobItems", insertItems);
    		setVersion(insertItems);			
    		return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

	@Override
	public DataItemList selectROROGateInItems(SearchGateOperationParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("gateoperation.selectROROGateInItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateGIROROItems(UpdateItemsBizParm parm) throws DaoException {
		try{
    		DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "gateoperation.updateGIROROItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectGCGateInItems(SearchGateOperationParm parm) throws DaoException {
		try{
    		return unifiedDao.getItems("gateoperation.selectGCGateInItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateCirPrintItem(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updItems = new DataItemList();
    		updItems.add(parm.getUpdateItem());
    		setNewVersion(updItems);	
    		unifiedDao.updateItems(null,"gateoperation.updateCirPrintItem", updItems);
    		setVersion(updItems);			
    		return updItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
        
    }

	@Override
	public DataItemList selectROROGateOutItems(SearchGateOperationParm parm) throws DaoException {
		try{
			return unifiedDao.getItems("gateoperation.selectROROGateOutItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateROROGateoutItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "gateoperation.updateROROGateoutItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateROROArrvDelvItems(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList itemList = parm.getUpdateItems();
			setNewVersion(itemList);
			unifiedDao.updateItems(null, "gateoperation.updateROROArrvDelvItems", itemList);
			setVersion(itemList);
			return itemList;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
