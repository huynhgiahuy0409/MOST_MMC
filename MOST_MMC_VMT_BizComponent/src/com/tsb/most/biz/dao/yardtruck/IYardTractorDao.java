package com.tsb.most.biz.dao.yardtruck;

import com.tsb.most.biz.dataitem.yardtruck.StoppageItem;
import com.tsb.most.biz.parm.yardtruck.SearchEquipmentParm;
import com.tsb.most.biz.parm.yardtruck.SearchStoppageParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IYardTractorDao {
	public DataItemList searchEquipmentYtItems(SearchEquipmentParm parm)throws DaoException;
	public DataItemList searchContainerItems(SearchEquipmentParm parm)throws DaoException;
	public DataItemList searchStopReasonItems(SearchStoppageParm parm)throws DaoException;
	public DataItemList searchStoppageItem(SearchStoppageParm parm)throws DaoException;
	public int insertStoppage(StoppageItem item)throws DaoException;
	public void updateStoppage(StoppageItem item)throws DaoException;
}
