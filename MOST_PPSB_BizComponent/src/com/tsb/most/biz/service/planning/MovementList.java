package com.tsb.most.biz.service.planning;

import java.util.ArrayList;

import com.tsb.most.biz.dao.planning.IMovementListDao;
import com.tsb.most.biz.dataitem.planning.MovementListItem;
import com.tsb.most.biz.parm.planning.SearchMovementListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class MovementList extends MOSTBaseService implements IMovementList {
	private IMovementListDao movementListDao;
	
    public void setMovementListDao(IMovementListDao movementListDao) {
		this.movementListDao = movementListDao;
	}

	public DataItemList selectCargoMovementList(SearchMovementListParm parm) throws BizException {
        MovementListItem returnItem = new MovementListItem();

        if (parm.getSearchType().equals("initComboList")) {
        	DataItemList returnItems = new DataItemList();

        	returnItem.setItems((ArrayList<MovementListItem>)movementListDao.selectMVWHComboList(parm).getCollection());

            returnItems.add(returnItem);
            
            return returnItems;
        } else {
        	return movementListDao.selectCargoMovementList(parm);
        }
    }
}