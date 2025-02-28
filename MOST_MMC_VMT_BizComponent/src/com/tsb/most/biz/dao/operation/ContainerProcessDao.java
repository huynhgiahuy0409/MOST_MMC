package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.parm.operation.ContainerProcessParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class ContainerProcessDao extends BaseDao implements IContainerProcessDao {

	@Override
	public DataItemList selectContainerProcessList(ContainerProcessParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try {
			return unifiedDao.getItems("containerProcess.selectContainerProcessList", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectEquipmentComboList(ContainerProcessParm parm) throws DaoException {
		// TODO Auto-generated method stub
		try {
			return unifiedDao.getItems("containerProcess.selectEquipmentComboList", parm);
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

//    public List getContainerProcessList(ContainerProcessParm parm) throws DaoException {
//        return unifiedDao.selectItems("ContainerProcessMap.selectContainerProcessList", parm);
//    }
//    
//    public List getEuipmentNoList(ContainerProcessParm parm) throws DaoException {
//        return unifiedDao.selectItems("ContainerProcessMap.selectEquipmentNoList", parm);
//    }
//    
	@Override
	public DataItemList insertContainerProcessItems(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.insertItems(null, "containerProcess.insertContainerProcessItems", items);
			unifiedDao.updateItems("containerProcess.updateActualTime", items);
			setVersion(items);
			return items;
		} catch (Exception e) {
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList updateContainerProcessItems(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.updateItemsWithTimeCheck(null, "containerProcess.updateContainerProcessItems", items);
			unifiedDao.updateItemsWithTimeCheck(null, "containerProcess.updateActualTime", items);
			setVersion(items);
			return items;
		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	}
	
	@Override
	public DataItemList deleteContainerProcessItems(DataItemList items) throws DaoException {
		try {
			setNewVersion(items);
			unifiedDao.deleteItems(null, "containerProcess.deleteContainerProcessItems", items);
			setVersion(items);
			return items;
		} catch (Exception ex) {
			throw new DaoException(ex);
		}
	}
}
