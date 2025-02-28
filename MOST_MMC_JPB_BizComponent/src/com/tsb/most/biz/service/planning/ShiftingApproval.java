package com.tsb.most.biz.service.planning;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.combobox.IComboboxServiceDao;
import com.tsb.most.basebiz.dataitem.combobox.ComboBoxServiceItem;
import com.tsb.most.basebiz.parm.combobox.SearchComboBoxServiceParm;
import com.tsb.most.biz.dao.planning.IShiftRequestDao;
import com.tsb.most.biz.dataitem.planning.ShiftRequestItem;
import com.tsb.most.biz.parm.planning.SearchShiftRequestParm;
import com.tsb.most.common.constant.ComboboxConstant;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ShiftingApproval extends MOSTBaseService implements IShiftingApproval {
	private IShiftRequestDao shiftRequestDao;
	private IComboboxServiceDao comboboxServiceDao;

	public void setShiftRequestDao(IShiftRequestDao shiftRequestDao) {
		this.shiftRequestDao = shiftRequestDao;
	}

	public void setComboboxServiceDao(IComboboxServiceDao comboboxServiceDao) {
		this.comboboxServiceDao = comboboxServiceDao;
	}

	@Override
	public DataItemList getShiftRequestList(SearchShiftRequestParm parm) throws BizException {
		return shiftRequestDao.getShiftRequestList(parm);
	}

	@Override
	public DataItemList getCodeMasterList(SearchShiftRequestParm parm) throws BizException {
		DataItemList returnItems = new DataItemList();
		List<ComboBoxServiceItem> positionList = new ArrayList<ComboBoxServiceItem>();
		List<ComboBoxServiceItem> reasonList = new ArrayList<ComboBoxServiceItem>();
		ShiftRequestItem requestItem = new ShiftRequestItem();
		SearchComboBoxServiceParm serviceParm = new SearchComboBoxServiceParm();

		serviceParm.setLcd("MT");
		serviceParm.setScdUse("Y");

		serviceParm.setMcd(ComboboxConstant.COMBO_SHIFT_POSITON);
		positionList = comboboxServiceDao.selectComboBoxCodeMaster(serviceParm).getCollection();
		requestItem.setPostionList(positionList);

		serviceParm.setMcd(ComboboxConstant.COMBO_SHIFT_REASON);
		reasonList = comboboxServiceDao.selectComboBoxCodeMaster(serviceParm).getCollection();
		requestItem.setReasonList(reasonList);
		returnItems.add(requestItem);
		return returnItems;
	}

	@Override
	public DataItemList processShiftRequestCUD(InsertItemsBizParm parm) throws BizException {
		DataItemList returnItems = new DataItemList();
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();

		ShiftRequestItem shiftRequestItem = (ShiftRequestItem) parm.getInsertItems().get(0);
		ArrayList<ShiftRequestItem> shiftRequestList = shiftRequestItem.getShiftReqList();

		for (int i = 0; i < shiftRequestList.size(); i++) {
			ShiftRequestItem item = (ShiftRequestItem) shiftRequestList.get(i);

			if (item.getCrud() != null && item.getCrud().equals(DAOProcessType.QUERY)) {
				if (item.getWorkingStatus().equals(DAOProcessType.INSERT)) {
					insertItems.add(item);
				} else if (item.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
					updateItems.add(item);
				} else if (item.getWorkingStatus().equals(DAOProcessType.DELETE)) {
					deleteItems.add(item);
				}
			}
		}

		if (insertItems.size() > 0) {
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.setInsertItem(insertItems);
			shiftRequestDao.insertItems(insertParm);
		}
		if (updateItems.size() > 0) {
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			updateParm.setUpdateItems(updateItems);
			shiftRequestDao.updateItems(updateParm);
		}
		if (deleteItems.size() > 0) {
			DeleteItemsBizParm deleteParm = new DeleteItemsBizParm();
			deleteParm.setDeleteItems(deleteItems);
			shiftRequestDao.deleteItems(deleteParm);
		}

		ShiftRequestItem returnItem = (ShiftRequestItem) shiftRequestItem.clone();
		returnItems.add(returnItem);
		return returnItems;
	}

	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataItemList deleteItems(DeleteItemsBizParm parm) throws BizException {
		// TODO Auto-generated method stub
		return null;
	}

}
