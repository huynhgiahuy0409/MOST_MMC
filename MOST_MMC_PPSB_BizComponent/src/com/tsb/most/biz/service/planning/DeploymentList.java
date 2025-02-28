package com.tsb.most.biz.service.planning;

import com.tsb.most.biz.dao.planning.IDeploymentListDao;
import com.tsb.most.biz.parm.planning.SearchDeploymentListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class DeploymentList extends MOSTBaseService implements IDeploymentList{

	private IDeploymentListDao deploymentListDao;
	
	public void setDeploymentListDao(IDeploymentListDao deploymentListDao) {
		this.deploymentListDao = deploymentListDao;
	}

	@Override
    public DataItemList selectDeploymentItems(SearchDeploymentListParm parm) throws BizException {
        DataItemList list = deploymentListDao.selectDeploymentItems(parm);
        return list;
    }
  
}
