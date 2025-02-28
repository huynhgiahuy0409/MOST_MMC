package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.PartnerInformationParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface IPartnerInformationDao {
    public DataItemList getPartnerList(PartnerInformationParm parm) throws DaoException;
    public DataItemList getPartnerInformationList(PartnerInformationParm parm) throws DaoException;
}
