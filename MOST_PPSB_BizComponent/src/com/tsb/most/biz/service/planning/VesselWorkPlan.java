package com.tsb.most.biz.service.planning;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.planning.IVesselWorkPlanDao;
import com.tsb.most.biz.dataitem.planning.VesselWorkPlanItem;
import com.tsb.most.biz.parm.planning.SearchVesselWorkPlanParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselWorkPlan extends MOSTBaseService implements IWorkPlan{
	private IVesselWorkPlanDao workPlanDao;

	public void setWorkPlanDao(IVesselWorkPlanDao workPlanDao) {
		this.workPlanDao = workPlanDao;
	}

	@Override
	public DataItemList selectVesselWorkPLanList(SearchVesselWorkPlanParm parm) throws BizException{
        return workPlanDao.selectVesselWorkPLanList(parm);
	}
    
    @Override
    public DataItemList insertItems(InsertItemsBizParm parm) throws Exception{
    	InsertItemsBizParm insertVslBLItems = new InsertItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
		DataItemList returnList = parm.getInsertItems();
		
		deleteItems.addDeleteItem(returnList);
		
		workPlanDao.deleteAllItems(deleteItems);
		
		if(returnList.size() > 0) {
			for(int i=0; i< returnList.size(); i++) {
				VesselWorkPlanItem item = (VesselWorkPlanItem)returnList.get(i);
				DataItemList checkExistVslBaplie = workPlanDao.selectVslBaplieItem(item);
				
				if((checkExistVslBaplie == null || checkExistVslBaplie.size() == 0) && item.getCatgCd().equals("I")) {
					insertVslBLItems.addInsertItem(item);
					workPlanDao.insertHatchPlan(insertVslBLItems);
				}
			}
		}
		
    	return workPlanDao.insertItems(parm);
    }
    
    @Override
    public DataItemList updateItems(UpdateItemsBizParm parm) throws Exception{
    	DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();
    	InsertItemsBizParm insertItems = new InsertItemsBizParm();
    	InsertItemsBizParm insertVslBLItems = new InsertItemsBizParm();
    	DataItemList returnList = new DataItemList();
    	
		deleteItems.addDeleteItem(parm.getUpdateItems());
		
		workPlanDao.deleteAllItems(deleteItems);
		
		if(parm.getUpdateItems().size() > 0) {
	    	for (int i = 0; i < parm.getUpdateItems().size(); i++) {
	    		VesselWorkPlanItem item = (VesselWorkPlanItem) parm.getUpdateItems().get(i);
	    		DataItemList checkExistVslBaplie = workPlanDao.selectVslBaplieItem(item);
	    		
				if(checkExistVslBaplie == null || checkExistVslBaplie.size() == 0) {
					if(!item.getCatgCd().equals(CodeConstant.MT_CATGTP_E) && item.getHatchNo() != null && !item.getHatchNo().equals("")) {
						insertVslBLItems.addInsertItem(item);
						workPlanDao.insertHatchPlan(insertVslBLItems);
					}
				}
				
				if(item.getCraneNo() != null && !item.getCraneNo().equals("") && item.getVslSeq() != null && !item.getVslSeq().equals("")) {
					String seq = workPlanDao.createNextSeq();
					
					item.setSeq(seq);
					
					returnList.add(item);
				}
	        }
		}
		
		insertItems.addInsertItem(returnList);
		
		return workPlanDao.insertItems(insertItems);
    }
}
