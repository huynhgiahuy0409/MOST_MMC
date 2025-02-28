package com.tsb.most.biz.dao.document;


import com.tsb.most.biz.dataitem.document.VesselParticularItem;
import com.tsb.most.biz.parm.document.SearchVesselParticularParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselParticularDao extends BaseDao implements IVesselParticularDao {
	
	public DataItemList selectVesselParticularList(SearchVesselParticularParm parm) throws DaoException {
		try{
			return unifiedDao.getItemsPage("vesselParticular.selectVesselParticularList", parm);
		}catch(Exception e){
			e.printStackTrace();
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectRequestVesselChangeList(SearchVesselParticularParm parm) throws DaoException {
		return unifiedDao.getItems("vesselParticular.selectRequestVesselChangeList", parm);
	}

	public DataItemList selectShaList(SearchVesselParticularParm parm) throws DaoException {
		return unifiedDao.getItems("vesselParticular.selectShaList", parm);
	}
	
	public DataItemList selectSha(SearchVesselParticularParm parm) throws DaoException {
		return unifiedDao.getItems("vesselParticular.selectSha", parm);
	}

	public DataItemList selectShpList(SearchVesselParticularParm parm) throws DaoException {
		return unifiedDao.getItems("vesselParticular.selectShpList", parm);
	}

	public DataItemList selectVesselParticularDetailItem(SearchVesselParticularParm parm) throws DaoException {
		DataItemList list = new DataItemList();

		VesselParticularItem item = (VesselParticularItem) unifiedDao.readOne("vesselParticular.selectVesselParticularDetailItem", parm);

		list.add(item);
		
		return list;
	}
	
	public DataItemList vslScheduleCheck(SearchVesselParticularParm parm) throws DaoException {
		return unifiedDao.getItems("vesselParticular.vslScheduleCheck", parm);
	}
	
	public DataItemList isCheckValidateForMQ(SearchVesselParticularParm parm) throws DaoException {
		return unifiedDao.getItems("vesselParticular.isCheckValidateForMQ", parm);
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws DaoException {
		try{
    		DataItemList insertItems = parm.getInsertItems();
    		
    		setNewVersion(insertItems);	
    		unifiedDao.insertItems(null,"vesselParticular.insertVesselParticularItem", insertItems);
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
			unifiedDao.updateItemsWithTimeCheck(null, "vesselParticular.updateVesselParticularItem", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
		
	}

	public DataItemList insertVesselParticularPeople(InsertItemsBizParm parm) throws DaoException {
		try{
			DataItemList insertItems = parm.getInsertItems();
			
			setNewVersion(insertItems);
			unifiedDao.insertItems(null, "vesselParticular.insertVesselParticularOPeople", insertItems);
			unifiedDao.insertItems(null, "vesselParticular.insertVesselParticularCPeople", insertItems);
			unifiedDao.insertItems(null, "vesselParticular.insertVesselParticularAPeople", insertItems);
			setVersion(insertItems);
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	public DataItemList updateVesselParticularPeople(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null, "vesselParticular.updateVesselParticularOPeople", updateItems);
			unifiedDao.updateItems(null, "vesselParticular.updateVesselParticularCPeople", updateItems);
			unifiedDao.updateItems(null, "vesselParticular.updateVesselParticularAPeople", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}

	}

	public DataItemList updateVesselParticularItemConfirm(UpdateItemsBizParm parm) throws DaoException {
		try{
			DataItemList updateItems = parm.getUpdateItems();
			
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "vesselParticular.updateVesselParticularConfirm", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList deleteVesselParticularItems(DeleteItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList updateItems = parm.getDeleteItems();
    		
			setNewVersion(updateItems);
			unifiedDao.updateItems(null, "vesselParticular.deleteVesselParticularItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
    	}catch(Exception ex){
			throw new DaoException(ex);
		}
    }

}
