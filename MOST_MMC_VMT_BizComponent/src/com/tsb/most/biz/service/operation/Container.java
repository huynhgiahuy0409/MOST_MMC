package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.biz.dao.operation.IContainerProcessDao;
import com.tsb.most.biz.dataitem.operation.ContainerProcessItem;
import com.tsb.most.biz.parm.operation.ContainerProcessParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.exception.BizException;

public class Container extends MOSTBaseService implements IContainer {
	private IContainerProcessDao containerProcessDao;

	public IContainerProcessDao getContainerProcessDao() {
		return containerProcessDao;
	}

	public void setContainerProcessDao(IContainerProcessDao containerProcessDao) {
		this.containerProcessDao = containerProcessDao;
	}

	@Override
	public IDataItem selectContainerProcessList(ContainerProcessParm parm) throws BizException {
		DataItemList dataItemList = new DataItemList();
		// TODO Auto-generated method stub
		if (parm.getSearchType().equals("HHT_CTNR_PROC_TBL")) {
			return containerProcessDao.selectContainerProcessList(parm);
		} else if (parm.getSearchType().equals("comboListTBL")) {
			ContainerProcessItem returnItem = new ContainerProcessItem();
			List equipmentNoList = containerProcessDao.selectEquipmentComboList(parm).getCollection();
			returnItem.setEquipmentNoList(equipmentNoList);

			List returnItems = new ArrayList();
			returnItems.add(returnItem);

			dataItemList = new DataItemList();
			dataItemList.setCollection(returnItems);
			return dataItemList;
		}
		return dataItemList;
	}
	
	@Override
	public DataItemList insertContainerProcessItems(InsertItemsBizParm parm) throws BizException {
		DataItemList items = parm.getInsertItems();
		return containerProcessDao.insertContainerProcessItems(items);
	}
	
	@Override
	public DataItemList updateContainerProcessItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		return containerProcessDao.updateContainerProcessItems(items);
	}
	@Override
	public DataItemList deleteContainerProcessItems(DeleteItemsBizParm parm) throws BizException {
		DataItemList items = parm.getDeleteItems();
		return containerProcessDao.deleteContainerProcessItems(items);
	}
}
