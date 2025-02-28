package com.tsb.most.basebiz.service.configuration;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.configuration.IServiceOrderSettingDao;
import com.tsb.most.basebiz.dao.configuration.ServiceOrderSettingDao;
import com.tsb.most.basebiz.dataitem.configuration.ServiceOrderSettingItem;
import com.tsb.most.basebiz.parm.configuration.SearchServiceOrderSettingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ServiceOrderSetting extends MOSTBaseService implements IServiceOrderSetting {

    private IServiceOrderSettingDao serviceOrderSettingDao;

    public void setServiceOrderSettingDao(IServiceOrderSettingDao serviceOrderSettingDao) {
		this.serviceOrderSettingDao = serviceOrderSettingDao;
	}

	@Override
    public DataItemList selectServiceOrderSettingList(SearchServiceOrderSettingParm parm) throws BizException {
        return serviceOrderSettingDao.selectServiceOrderSettingList(parm);
    }

    @Override
    public DataItemList selectServiceOrderSettingDetailItem(SearchServiceOrderSettingParm parm) throws BizException {
        return serviceOrderSettingDao.selectServiceOrderSettingDetail(parm);
    }
    
	@Override
	public DataItemList selectExtendCategoryCd(SearchServiceOrderSettingParm parm) throws BizException {
        return serviceOrderSettingDao.selectExtendCategoryCd(parm);
	}

    @Override
    public void processServiceOrderSettingItem(UpdateItemsBizParm parm) throws BizException {
        ServiceOrderSettingItem item = (ServiceOrderSettingItem) parm.getDataItem();

        if(DAOProcessType.INSERT.equals((item.getCrud()))){
            serviceOrderSettingDao.insertServiceOrderSettingDetail(parm.getTxTraceinfo(), item);

        } else if(DAOProcessType.UPDATE.equals((item.getCrud()))){
            serviceOrderSettingDao.updateServiceOrderSettingDetail(parm.getTxTraceinfo(), item);

        } else if(DAOProcessType.DELETE.equals((item.getCrud()))){
            serviceOrderSettingDao.deleteServiceOrderSettingDetail(parm.getTxTraceinfo(), item);
        }
    }

    public void setServiceOrderSettingDao(ServiceOrderSettingDao serviceOrderSettingDao) {
        this.serviceOrderSettingDao = serviceOrderSettingDao;
    }

	@Override
	public DataItemList insertServiceOrderConfigurationDetail(InsertItemsBizParm parm) throws BizException {
		return serviceOrderSettingDao.insertServiceOrderConfigurationDetail(parm);
	}

	@Override
	public DataItemList updateServiceOrderConfigurationDetail(UpdateItemsBizParm parm) throws BizException {
		return serviceOrderSettingDao.updateServiceOrderConfigurationDetail(parm);
	}

	@Override
	public DataItemList deleteServiceOrderConfigurationDetail(DeleteItemsBizParm parm) throws BizException {
		return serviceOrderSettingDao.deleteServiceOrderConfigurationDetail(parm);
	}
}
