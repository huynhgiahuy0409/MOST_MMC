package com.tsb.most.biz.service.planning;


import java.util.List;

import com.tsb.most.biz.dao.document.IShippingNoteDao;
import com.tsb.most.biz.dao.planning.ICargoSearchDao;
import com.tsb.most.biz.dataitem.planning.CargoSearchItem;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.planning.SearchCargoSearchParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CargoSearch extends MOSTBaseService implements ICargoSearch {
	private ICargoSearchDao cargoSearchDao;
	private IShippingNoteDao shippingNoteDao;
	
    public void setCargoSearchDao(ICargoSearchDao cargoSearchDao) {
		this.cargoSearchDao = cargoSearchDao;
	}

	public void setShippingNoteDao(IShippingNoteDao shippingNoteDao) {
		this.shippingNoteDao = shippingNoteDao;
	}

	public DataItemList selectCargoSearchList(SearchCargoSearchParm parm) throws BizException {
    	return cargoSearchDao.selectCargoSearchList(parm);
    }
    
	public DataItemList selectGrGoComboList(SearchCargoSearchParm parm) throws BizException {
        CargoSearchItem returnItem = new CargoSearchItem();
        DataItemList returnList = new DataItemList();
        
        List list = cargoSearchDao.selectGrGoComboList(parm).getCollection();
        
        if(list != null && list.size() > 0) {
        	SearchShippingNoteParm snParm = new SearchShippingNoteParm();
        	CargoSearchItem cgItem = (CargoSearchItem) list.get(0);

        	returnItem.setGrGoList(list);
        	
        	snParm.setVslCallId(cgItem.getVslCallId());
        	
        	if (!cgItem.getVslCallId().equals("NonCallId")) {
        		returnItem.setSnList(shippingNoteDao.selectShippingNoteComboList(snParm).getCollection());
        	}
        }
        
        returnList.add(returnItem);
        
        return returnList;
    }
}