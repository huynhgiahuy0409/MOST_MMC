package com.tsb.most.biz.dao.planning;

import com.tsb.most.biz.parm.planning.SearchDeploymentListParm;
import com.tsb.most.framework.dao.BaseDao;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.DaoException;

public class DeploymentListDao extends BaseDao implements IDeploymentListDao {
    public DataItemList selectDeploymentItems(SearchDeploymentListParm parm) throws DaoException {
        return unifiedDao.getItemsPage("deploymentList.selectDeploymentItems", parm);
    }
}
