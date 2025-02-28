package com.tsb.most.biz.dao.document;

import com.tsb.most.biz.parm.document.SearchVesselScheduleRegisterParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselScheduleRegisterDao extends BaseDao implements IVesselScheduleRegisterDao{

	public DataItemList selectVesselScheduleList(SearchVesselScheduleRegisterParm parm) throws DaoException {
		return unifiedDao.getItemsPage("vesselScheduleRegister.selectVesselScheduleList", parm);
	}

	public DataItemList selectVesselScheduleDetail(SearchVesselScheduleRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("vesselScheduleRegister.selectVesselScheduleDetail", parm);
	}

	public DataItemList selectListOfVslSchedule(SearchVesselScheduleRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("vesselScheduleRegister.getListOfVesselSchedule", parm);
	}

	public DataItemList isDuplicateVslCallId(SearchVesselScheduleRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("vesselScheduleRegister.isDuplicateVslCallId", parm);
	}

	public DataItemList selectCallSeq(SearchVesselScheduleRegisterParm parm) throws DaoException {
		return unifiedDao.getItems("vesselScheduleRegister.selectCallSeq", parm);
	}

	public DataItemList selectMaxDocSNO(SearchVesselScheduleRegisterParm parm) throws DaoException{
		return unifiedDao.getItems("vesselScheduleRegister.getMaxDocNo", parm);
	}

	public DataItemList insertVesselPort(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "vesselParticular.insertVslSchPort", insertItems);
			setVersion(insertItems);
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
	public DataItemList insertDocSno(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "VesselParticular.insertVslSchPort", insertItems);
			setVersion(insertItems);
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
	
	public DataItemList insertVesselSchedule(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "VesselParticular.insertVslSchPort", insertItems);
			setVersion(insertItems);
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
		
	}
	
	public DataItemList updateVesselScheduleDetail(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "vesselScheduleRegister.updateVesselScheduleItem", updateItems);
			setVersion(updateItems);
			
			return updateItems;
			
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList updateVesselPort(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItemsWithTimeCheck(null, "vesselScheduleRegister.updateVSLastPortOfCall", updateItems);
			setVersion(updateItems);
			
			return updateItems;
			
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList updateVslSchlStatus(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "vesselScheduleRegister.updateVesselScheduleStatus", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList deleteVesselPort(DeleteItemsBizParm parm) throws DaoException {
		try{
			DataItemList deleteItems = parm.getDeleteItems();
			
			setNewVersion(deleteItems);
			unifiedDao.deleteItems(null, "VesselParticular.deletePortOfCall", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException{
		try{
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "vesselScheduleRegister.insertVesselSchedule", insertItems);
			setVersion(insertItems);
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws DaoException{
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "vesselScheduleRegister.updateVesselScheduleItem", updateItems);
			setVersion(updateItems);
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList deleteItems(UpdateItemsBizParm parm) throws DaoException{
		return null;
	}

	
}
