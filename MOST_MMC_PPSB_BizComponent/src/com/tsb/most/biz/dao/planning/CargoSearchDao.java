package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchCargoSearchParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoSearchDao extends BaseDao implements ICargoSearchDao {

	@Override
	public DataItemList selectCargoSearchList(SearchCargoSearchParm parm) throws DaoException {
		try{
			return unifiedDao.getItemsPage("cargoSearch.selectCargoSearchList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
	
	public DataItemList selectGrGoComboList(SearchCargoSearchParm parm) throws DaoException{
    	try{
    		return unifiedDao.getItems("cargoSearch.selectGrGoComboList", parm);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}
}
