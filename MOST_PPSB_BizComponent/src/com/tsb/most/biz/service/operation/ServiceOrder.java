package com.tsb.most.biz.service.operation;


import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.operation.IServiceOrderDao;
import com.tsb.most.biz.dataitem.operation.ServiceOrderItem;
import com.tsb.most.biz.parm.operation.SearchServiceOrderParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.constants.CommonConstants;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ServiceOrder extends MOSTBaseService implements IServiceOrder {

    private IServiceOrderDao serviceOrderDao;

    public void setServiceOrderDao(IServiceOrderDao serviceOrderDao) {
        this.serviceOrderDao = serviceOrderDao;
    }
    
    @Override
    public DataItemList selectServiceOrderList(SearchServiceOrderParm parm) throws BizException {
        return serviceOrderDao.selectServiceOrderList(parm);
    }

    @Override
    public void updateServiceOrderProcessItems(UpdateItemsBizParm parm) throws BizException {
        ServiceOrderItem procItem = (ServiceOrderItem)parm.getDataItem();

        for(ServiceOrderItem item : procItem.getProcessItemList()){
            serviceOrderDao.updateServiceOrderItem(parm.getTxTraceinfo(), item);
        }
    }

    @Override
    public DataItemList selectServiceOrderItem(SearchServiceOrderParm parm) throws BizException {
    	return serviceOrderDao.selectServiceOrderItem(parm);
    }

    @Override
    public DataItemList selectServiceOrderItems(SearchServiceOrderParm parm) throws BizException {
        DataItemList returnItem = new DataItemList();
        
        if (parm.getSearchType().equals("orderList")) {
            returnItem = serviceOrderDao.selectServiceOrderList(parm);
        } else if (parm.getSearchType().equals("bunkeringList")) {
            returnItem = serviceOrderDao.getRoadBunkeringList(parm);
        }

        return returnItem;
    }

    @Override
    public void processServiceOrderItem(UpdateItemsBizParm parm) throws BizException {

        ServiceOrderItem item = (ServiceOrderItem)parm.getDataItem();

        if (item.getCrud().equals(DAOProcessType.INSERT)) {
            List list = serviceOrderDao.getServiceOrderNo(new SearchServiceOrderParm()).getCollection();
            ServiceOrderItem odrNoItem = (ServiceOrderItem)list.get(0);
            item.setOdrNo(odrNoItem.getOdrNo());
            serviceOrderDao.insertServiceOrderItem(parm.getTxTraceinfo(), item);

        } else if (item.getCrud().equals(DAOProcessType.UPDATE)) {
            serviceOrderDao.updateServiceOrderItem(parm.getTxTraceinfo(), item);

        } else if (item.getCrud().equals(DAOProcessType.DELETE)) {
            serviceOrderDao.deleteServiceOrderItem(parm.getTxTraceinfo(), item);
        }
    }

	@Override
	public DataItemList insertServiceOrderItem(InsertItemsBizParm parm) throws BizException {
		 List list = serviceOrderDao.getServiceOrderNo(new SearchServiceOrderParm()).getCollection();
         ServiceOrderItem odrNoItem = (ServiceOrderItem)list.get(0);         
         DataItemList insertItems = parm.getInsertItems();
         ServiceOrderItem  item = (ServiceOrderItem) insertItems.get(0);
         
         item.setOdrNo(odrNoItem.getOdrNo());
         
         if(item.getCategory3() != null) {
	         if(item.getCategory3().equals("SSTC014")) {
	        	 item.setOpeClassCd(CodeConstant.VSLSCH_CG_OP_TP_IMPORT);
	         }else if(item.getCategory3().equals("SSTC012")) {
	        	 item.setOpeClassCd(CodeConstant.VSLSCH_CG_OP_TP_EXPORT);
	         }
         }
         
         if(item.getShftId() != null && !item.getShftId().equals("")) {
        	 item.setShftChk(CommonConstants.Y);
         }
         
         item.setStatCd(CodeConstant.MT_ODRSTAT_SU);	 
         serviceOrderDao.insertServiceOrderItem(parm);
         
         return insertItems;
	}
	
	@Override
	public DataItemList updateServiceOrderItem(UpdateItemsBizParm parm) throws BizException {
		return  serviceOrderDao.updateServiceOrderItem(parm);
	}
	
	@Override
	public DataItemList deleteServiceOrderItem(DeleteItemsBizParm parm) throws BizException {
		return serviceOrderDao.deleteServiceOrderItem(parm);
	}

	@Override
	public DataItemList selectBLItems(SearchServiceOrderParm parm) throws BizException {
		return serviceOrderDao.selectBLItems(parm);
	}

	@Override
	public DataItemList selectShippingNoteItems(SearchServiceOrderParm parm) throws BizException {
		return serviceOrderDao.selectShippingNoteItems(parm);
	}

	@Override
	public DataItemList selectBLSNItems(SearchServiceOrderParm parm) throws BizException {
		return serviceOrderDao.selectBLSNItems(parm);
	}
}
