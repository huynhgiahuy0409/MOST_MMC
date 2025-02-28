package com.tsb.most.biz.service.planning;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.planning.IBerthPlanDao;
import com.tsb.most.biz.dataitem.planning.BerthPlanItem;
import com.tsb.most.biz.parm.planning.SearchBerthPlanParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class BerthPlan extends MOSTBaseService implements IBerthPlan{
	private IBerthPlanDao berthPlanDao;

	public void setBerthPlanDao(IBerthPlanDao berthPlanDao){
    	this.berthPlanDao = berthPlanDao;
    }	
	
	public DataItemList selectDrawBittList(SearchBerthPlanParm parm) throws BizException {
		return berthPlanDao.selectDrawBittList(parm);
	}
    
    @Override
	public DataItemList selectBerthInfoList(SearchBerthPlanParm parm) throws BizException{
        return berthPlanDao.selectBerthInfoList(parm);
	}
    
    @Override
	public DataItemList selectBerthPlanList(SearchBerthPlanParm parm) throws BizException{
		return berthPlanDao.selectBerthPlanList(parm);
	}

    @Override
    public DataItemList selectShftPlanList(SearchBerthPlanParm parm) throws BizException{
    	return berthPlanDao.selectShftPlanList(parm);
    }
    
    @Override
    public DataItemList insertItems(InsertItemsBizParm parm) throws Exception{
    	return berthPlanDao.insertItems(parm);
    }
    
    @Override
    public DataItemList updateItems(UpdateItemsBizParm parm) throws Exception{
    	for (int i = 0; i < parm.getUpdateItems().size(); i++) {
            BerthPlanItem item = (BerthPlanItem) parm.getUpdateItems().get(i);
            
            if (item.getCrud() != null && !item.getCrud().equals(DAOProcessType.INITIAL)) {
            	item.setPlanYn("Y");
            }
        }

       return berthPlanDao.updateItems(parm);
    } 
    
	@Override
	public DataItemList selectBusinessHistoryList(SearchBerthPlanParm parm) throws BizException {
		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
		SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");

		try {
			if (parm.getFromDt() != null && !parm.getFromDt().equals("")) {
				Date workFromdate = inputFormat.parse(parm.getFromDt());
				String strWorkFromDt = outputFormat.format(workFromdate);

				parm.setFromDt(strWorkFromDt);
			}
			if (parm.getToDt() != null && !parm.getToDt().equals("")) {
				Date workTodate = inputFormat.parse(parm.getToDt());
				String strWorkToDt = outputFormat.format(workTodate);

				parm.setToDt(strWorkToDt);
			}
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
		}

		return berthPlanDao.selectBusinessHistoryList(parm);
	}
    
	@Override
	public DataItemList selectVesselInformation(SearchBerthPlanParm parm) throws BizException {
		return berthPlanDao.selectVesselInformation(parm);
	}

	@Override
	public DataItemList selectPartnerInformationList(SearchBerthPlanParm parm) throws BizException {
		return berthPlanDao.selectPartnerInformationList(parm);
	}
    
    public DataItemList selectBerthMaintenanceList(SearchBerthPlanParm parm) throws BizException{
		return berthPlanDao.selectBerthMaintenanceList(parm);
	}

	@Override
	public DataItemList selectVesselShiftingList(SearchBerthPlanParm parm) throws BizException {
		return berthPlanDao.selectVesselShiftingList(parm);
	}
}
