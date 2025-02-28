package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.PartnerInformationParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class PartnerInformationDao extends BaseDao implements IPartnerInformationDao {
  
    public DataItemList getPartnerList(PartnerInformationParm parm) throws DaoException {
        //return unifiedDao.getItems("BerthPlanMap.selectPartner", parm);
        return null;
    }
    
    public DataItemList getPartnerInformationList(PartnerInformationParm parm) throws DaoException {
        //return unifiedDao.getItems("BerthPlanMap.selectPartnerInformation", parm);
        return null;
    }
}
