package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchShiftGroupDefParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ShiftGroupDefDao extends BaseDao implements IShiftGroupDefDao {

    public DataItemList selectShiftDef(SearchShiftGroupDefParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("shiftGroupDef.selectShiftDef", parm);
    	}catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectGroupDef(SearchShiftGroupDefParm parm) throws DaoException {
    	try {
        	return unifiedDao.getItems("shiftGroupDef.selectGroupDef", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
    public DataItemList selectShiftGroupDefShiftMegaList(SearchShiftGroupDefParm parm) throws DaoException {
    	try {
    		return unifiedDao.getItems("shiftGroupDef.selectShiftGroupDefShiftMega", parm);
	    }catch(Exception e){
			throw new DaoException(e);
		}
    }
    
//    public void insertShiftItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//        	unifiedDao.insertItems(txTraceInfo, "shiftGroupDef.insertShiftItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void insertGroupItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//        	unifiedDao.insertItems(txTraceInfo, "shiftGroupDef.insertGroupItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void updateStandardShift(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//        	unifiedDao.updateItems(txTraceInfo, "shiftGroupDef.updateStandardShift", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void updateShiftItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//        	unifiedDao.updateItems(txTraceInfo, "shiftGroupDef.updateShiftItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void updateGroupItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//        	unifiedDao.updateItems(txTraceInfo, "shiftGroupDef.updateGroupItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void deleteShiftItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//        	unifiedDao.updateItems(txTraceInfo, "shiftGroupDef.deleteShiftItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void deleteGroupItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//        	unifiedDao.updateItems(txTraceInfo, "shiftGroupDef.deleteGroupItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void deleteStffGroupItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//    		unifiedDao.updateItems(txTraceInfo, "shiftGroupDef.deleteStffGroupItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }
//    
//    public void deleteRstrGroupItems(TxTraceInfo txTraceInfo, DataItemCollection items) throws DaoException {
//    	try {
//    		unifiedDao.updateItems(txTraceInfo, "shiftGroupDef.deleteRstrGroupItems", items);
//	    }catch(Exception e){
//			throw new DaoException(e);
//		}
//    }

	@Override
	public DataItemList insertShiftItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
	
			unifiedDao.insertItems(null,"shiftGroupDef.insertShiftItems", insertItems);
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateShiftItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"shiftGroupDef.updateShiftItems", updateItems);
			setVersion(updateItems);
			
			return updateItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteShiftItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.updateItems(null,"shiftGroupDef.deleteShiftItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList insertGroupItems(InsertItemsBizParm parm) throws DaoException {
		try {
			DataItemList insertItems = parm.getInsertItems();
			setNewVersion(insertItems);	
			
			unifiedDao.insertItems(null,"shiftGroupDef.insertGroupItems", insertItems);
			setVersion(insertItems);			
			
			return insertItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateGroupItems(UpdateItemsBizParm parm) throws DaoException {
		try {
			DataItemList updateItems = parm.getUpdateItems();
			setNewVersion(updateItems);
			
			unifiedDao.updateItems(null,"shiftGroupDef.updateGroupItems", updateItems);
			
			setVersion(updateItems);
			
			return updateItems;	
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteGroupItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			
			unifiedDao.updateItems(null,"shiftGroupDef.deleteGroupItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList deleteStffGroupItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.updateItems(null,"shiftGroupDef.deleteStffGroupItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList deleteRstrGroupItems(DeleteItemsBizParm parm) throws DaoException {
		try {
			DataItemList deleteItems = parm.getDeleteItems();
			setNewVersion(deleteItems);
			unifiedDao.updateItems(null,"shiftGroupDef.deleteRstrGroupItems", deleteItems);
			setVersion(deleteItems);
			
			return deleteItems;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
