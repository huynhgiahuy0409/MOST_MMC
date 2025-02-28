package com.tsb.most.biz.service.document;

import java.util.List;

import com.tsb.most.biz.dao.document.IVesselParticularDao;
import com.tsb.most.biz.dao.document.IVesselScheduleRegisterDao;
import com.tsb.most.biz.dataitem.document.VesselParticularItem;
import com.tsb.most.biz.dataitem.document.VesselScheduleRegisterItem;
import com.tsb.most.biz.parm.document.SearchVesselParticularParm;
import com.tsb.most.biz.parm.document.SearchVesselScheduleRegisterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselScheduleRegister extends MOSTBaseService implements IVesselScheduleRegister {

	private IVesselParticularDao vesselParticularDao;
	private IVesselScheduleRegisterDao vesselScheduleRegisterDao;

	public void setvesselScheduleRegisterDao(IVesselScheduleRegisterDao vesselScheduleRegisterDao) {
		this.vesselScheduleRegisterDao = vesselScheduleRegisterDao;
	}

	public void setVesselParticularDao(IVesselParticularDao vesselParticularDao) {
		this.vesselParticularDao = vesselParticularDao;
	}
	
	public DataItemList selectVesselScheduleList(SearchVesselScheduleRegisterParm parm) throws BizException {
		return vesselScheduleRegisterDao.selectVesselScheduleList(parm);
	}

	public DataItemList selectVesselScheduleDetail(SearchVesselScheduleRegisterParm parm) throws BizException {
		VesselScheduleRegisterItem scheduleItem = (VesselScheduleRegisterItem)vesselScheduleRegisterDao.selectVesselScheduleDetail(parm).get(0);
		SearchVesselParticularParm parParm = new SearchVesselParticularParm();
		DataItemList returnItems = new DataItemList();
		
		parParm.setVslCd(parm.getVslCd());
		
		List particularItems = vesselParticularDao.selectVesselParticularDetailItem(parParm).getCollection();
		
		VesselParticularItem vslPartItem = (VesselParticularItem)particularItems.get(0);
		
		scheduleItem.setVslPartiItem(vslPartItem);
		
		returnItems.add(scheduleItem);
		
		return returnItems;
	}
	
	public DataItemList selectListOfVslSchedule(SearchVesselScheduleRegisterParm parm) throws BizException {
		return vesselScheduleRegisterDao.selectListOfVslSchedule(parm);
	}

	public DataItemList isDuplicateVslCallId(SearchVesselScheduleRegisterParm parm) throws BizException{
		return vesselScheduleRegisterDao.isDuplicateVslCallId(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		generateCallSeq(parm);
		return vesselScheduleRegisterDao.insertItems(parm);
	}

	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		return vesselScheduleRegisterDao.updateItems(parm);
	}
	
	@Override
	public DataItemList updateVslSchlStatus(UpdateItemsBizParm parm) throws BizException {
		return vesselScheduleRegisterDao.updateVslSchlStatus(parm);
	}

	@Override
	public DataItemList deleteItems(UpdateItemsBizParm parm) throws BizException {
		return null;
	}
	
	void generateCallSeq(InsertItemsBizParm parm) throws BizException{
		DataItemList listVsl = parm.getInsertItems();
		
		for(int i = 0; i < listVsl.getCollection().size(); i++) {
			SearchVesselScheduleRegisterParm vslParm = new SearchVesselScheduleRegisterParm();
			String callSeq = "";
			
			vslParm.setVslCd(((VesselScheduleRegisterItem)listVsl.getCollection().get(i)).getVslCd());
			vslParm.setCallYear(((VesselScheduleRegisterItem)listVsl.getCollection().get(i)).getCallYear());
			
			DataItemList callSeqResult = vesselScheduleRegisterDao.selectCallSeq(vslParm);
			
			VesselScheduleRegisterItem callSeqResultItem = (VesselScheduleRegisterItem)callSeqResult.getCollection().get(0);
			
			if(callSeqResultItem == null || callSeqResultItem.getCallSq().equals("")) {
				callSeq = "0001";
			}else {
				int val = Integer.parseInt(callSeqResultItem.getCallSq());
				
				val++;
				callSeq = String.valueOf(val);
				
				if(callSeq.length() == 1){
					callSeq = "000" + callSeq;
				}else if(callSeq.length() == 2){
					callSeq = "00" + callSeq;
				}else if(callSeq.length() == 3){
					callSeq = "0" + callSeq;
				}
			}
			
			((VesselScheduleRegisterItem)listVsl.getCollection().get(i)).setCallSq(callSeq);
		}
	}
}
