package com.tsb.most.biz.dao.yardtruck;

import com.tsb.most.biz.dataitem.yardtruck.StoppageItem;
import com.tsb.most.biz.parm.yardtruck.SearchEquipmentParm;
import com.tsb.most.biz.parm.yardtruck.SearchStoppageParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class YardTractorDao extends BaseDao implements IYardTractorDao{
	
	@Override
	public DataItemList searchEquipmentYtItems(SearchEquipmentParm parm)throws DaoException{
    	try{
    		return unifiedDao.getItems("yardTractor.searchEquipmentYtItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList searchContainerItems(SearchEquipmentParm parm)throws DaoException{
		try{
			return unifiedDao.getItems("yardTractor.requestJobs", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList searchStopReasonItems(SearchStoppageParm parm)throws DaoException{
		try{
			return unifiedDao.getItems("yardTractor.searchStopReasonItems", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public DataItemList searchStoppageItem(SearchStoppageParm parm)throws DaoException{
		try{
			return unifiedDao.getItems("yardTractor.searchStoppageItem", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public int insertStoppage(StoppageItem item)throws DaoException{
		try{
			return unifiedDao.insertItem(null, "yardTractor.insertStoppage", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	@Override
	public void updateStoppage(StoppageItem item)throws DaoException{
		try{
			unifiedDao.updateItem("yardTractor.updateStoppage", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

}
