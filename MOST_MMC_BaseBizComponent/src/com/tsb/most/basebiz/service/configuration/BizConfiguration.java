package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.dao.configuration.IBizConfigurationDao;
import com.tsb.most.basebiz.parm.configuration.SearchBizConfigurationParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class BizConfiguration extends MOSTBaseService implements IBizConfiguration {
	private IBizConfigurationDao bizConfigurationDao;

	public void setBizConfigurationDao(IBizConfigurationDao bizConfigurationDao) {
		this.bizConfigurationDao = bizConfigurationDao;
	}

	/*
	 * #################### SERVICE METHODS ####################
	 */
	@Override
	public DataItemList selectBizConfigurationItems(SearchBizConfigurationParm parm) throws BizException {
		return bizConfigurationDao.selectBizConfigurationItems(parm);
	}
	
	@Override
	public DataItemList selectDuplicateCheck(SearchBizConfigurationParm parm) throws BizException {
		return bizConfigurationDao.selectDuplicateCheck(parm);
	}

	@Override
	public DataItemList insertBizConfigurationItems(InsertItemsBizParm parm) throws BizException {
		return bizConfigurationDao.insertBizConfigurationItems(parm);
	}

	@Override
	public DataItemList updateBizConfigurationItems(UpdateItemsBizParm parm) throws BizException {
		return bizConfigurationDao.updateBizConfigurationItems(parm);
	}

}
