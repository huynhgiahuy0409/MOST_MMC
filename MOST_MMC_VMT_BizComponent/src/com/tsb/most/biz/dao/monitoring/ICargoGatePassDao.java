package com.tsb.most.biz.dao.monitoring;


import com.tsb.most.biz.parm.monitoring.CargoGatePassParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public interface ICargoGatePassDao {
    public DataItemList selectCargoGatePassList(CargoGatePassParm parm) throws DaoException;
   
}
