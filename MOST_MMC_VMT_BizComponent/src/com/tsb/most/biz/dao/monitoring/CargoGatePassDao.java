package com.tsb.most.biz.dao.monitoring;

import com.tsb.most.biz.parm.monitoring.CargoGatePassParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class CargoGatePassDao extends BaseDao implements ICargoGatePassDao {

    public DataItemList selectCargoGatePassList(CargoGatePassParm parm) throws DaoException {
        return unifiedDao.getItems("cargoGatePass.selectCargoGatePass", parm);
    }
    
}
