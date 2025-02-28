package com.tsb.most.biz.dao.operation;

import com.tsb.most.biz.dataitem.operation.VesselScheduleItem;
import com.tsb.most.biz.parm.operation.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselScheduleDao extends BaseDao implements IVesselScheduleDao {

//    public DataItemList selectVesselScheduleList(SearchVesselScheduleParm parm) throws DaoException {
//        DataItemList rtnList = null;
//        
//        if(parm.getSearchType() != null && !"".equals(parm.getSearchType())) {
//            rtnList = unifiedDao.getItemsPage("vesselSchedule.selectVesselScheduleList", parm);
//        } else {
//            rtnList = unifiedDao.getItemsPage("vesselSchedule.selectVesselScheduleReport", parm);
//        }
//        return rtnList;
//    }
	
	@Override
	public DataItemList selectBerthInfo(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselSchedule.selectBerthInfo", parm);
    }
	
	@Override
	public DataItemList updateVesselDetailItem(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		DataItemList items = parm.getUpdateItems();
			setNewVersion(items);
			unifiedDao.updateItems(null,"vesselSchedule.updateVesselDetailItem", items);
			setVersion(items);
			return items;
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public DataItemList selectBerthInfoList(SearchVesselScheduleParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return null;
	}
}
