package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.dataitem.planning.VesselScheduleItem;
//import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.planning.SearchVesselScheduleParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class VesselScheduleDao extends BaseDao implements IVesselScheduleDao {

    public DataItemList selectVesselScheduleList(SearchVesselScheduleParm parm) throws DaoException {
        DataItemList rtnList = null;
        if(parm.getSearchType() != null && !"".equals(parm.getSearchType()))
        {
            rtnList = unifiedDao.getItemsPage("vesselScheduleInternal.selectVesselScheduleList", parm);
        }
        else
        {
            rtnList = unifiedDao.getItemsPage("vesselScheduleInternal.selectVesselScheduleReport", parm);
        }
        return rtnList;
    } 
    
    public DataItemList selectVesselScheduleDetail(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectVesselScheduleDetail", parm);
    }
    
    public DataItemList getBerthInfoList(SearchVesselScheduleParm parm) throws DaoException {
        return unifiedDao.getItems("vesselScheduleInternal.selectBerthInfo", parm);
    }
    public void updateVesselDetailItem(UpdateItemsBizParm parm) throws DaoException {
    	try{
    		VesselScheduleItem item = (VesselScheduleItem)parm.getUpdateItem();
			setNewVersion(item);
			unifiedDao.updateItem(null,"vesselScheduleInternal.updateItems_VesselDetail", item);
		}catch(Exception e){
			throw new DaoException(e);
		}
	}

	@Override
	public String countVesselSchedule(SearchVesselScheduleParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DataItemList selectBerthInfoList(SearchVesselScheduleParm parm) throws DaoException {
		// TODO Auto-generated method stub
		return null;
	}
}
