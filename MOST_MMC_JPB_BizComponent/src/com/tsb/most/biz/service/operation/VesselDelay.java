package com.tsb.most.biz.service.operation;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.IVesselDelayDao;
import com.tsb.most.biz.dao.operation.IVesselDelayPenaltyReportDao;
import com.tsb.most.biz.dao.planning.IShiftGroupDefDao;
import com.tsb.most.biz.dataitem.operation.VesselDelayItem;
import com.tsb.most.biz.dataitem.operation.VesselDelayPenaltyReportItem;
import com.tsb.most.biz.parm.operation.SearchVesselDelayParm;
import com.tsb.most.biz.parm.operation.SearchVesselDelayPenaltyReportParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItem;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class VesselDelay extends MOSTBaseService implements IVesselDelay {
	private IVesselDelayDao vesselDelayDao;
	private IShiftGroupDefDao shiftGroupDefDao;
	private ICodeMasterDao codeMasterDao;
	private IVesselDelayPenaltyReportDao vesselDelayPenaltyReportDao;
	
	public void setVesselDelayDao(IVesselDelayDao vesselDelayDao) {
		this.vesselDelayDao = vesselDelayDao;
	}

	public void setShiftGroupDefDao(IShiftGroupDefDao shiftGroupDefDao) {
		this.shiftGroupDefDao = shiftGroupDefDao;
	}
	
    public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setVesselDelayPenaltyReportDao(IVesselDelayPenaltyReportDao vesselDelayPenaltyReportDao) {
		this.vesselDelayPenaltyReportDao = vesselDelayPenaltyReportDao;
	}

	public DataItemList selectVesselDelayComboList(SearchVesselDelayParm parm) throws BizException {
        VesselDelayItem returnItem = new VesselDelayItem();
        
        returnItem.setEquipmenNoList(vesselDelayDao.selectEqNoList(parm).getCollection());
        returnItem.setEquipmenNoList2(vesselDelayDao.selectEqNoList(parm).getCollection());
        
        // shift
//        SearchShiftGroupDefParm shfParm = new SearchShiftGroupDefParm();
//        shfParm.setUseYn("Y");
//        shfParm.setShftMethCd("Standard");
//        returnItem.setShiftList(shiftGroupDefDao.selectShiftGroupDefShiftMegaList(shfParm).getCollection());
//
//        // hatch
//        SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
//        partyCode.setLcd(CodeConstant.LCD_MOST);
//        partyCode.setMcd(CodeConstant.MCD_MT_HTC);
//        returnItem.setHatchNoList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
        
        //HHT.Tablet:
        returnItem.setHatchNoList2(vesselDelayDao.selectHatchNoList(parm).getCollection());
        
        DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
		
		return returnItems;
    }

	public DataItemList selectVesselDelayList(SearchVesselDelayParm parm) throws BizException {
        VesselDelayItem returnItem = new VesselDelayItem();

        if (parm.getSearchType().equals("DelayRecordList")) {
            DataItemList result = vesselDelayDao.selectVesselDelayList(parm);   		
    		return result;
            
        } else if (parm.getSearchType().equals("HHT_DelayRecordList")) {
            List DelayRecordList = vesselDelayDao.selectVesselDelayList(parm).getCollection();
            returnItem.add(DelayRecordList);
        } else if (parm.getSearchType().equals("acceptedDelayCode")) {
            return vesselDelayDao.selectAcceptedDelayCode(parm);
            
        } else if (parm.getSearchType().equals("HHT_COMBOBOX")) {
            List eqList = vesselDelayDao.selectEqNoList(parm).getCollection();
            returnItem.add(eqList);
        } 
        
        DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        
        return returnItems;
    }			
	
    public DataItemList selectDelayCodeList(SearchCodeMasterParm parm) throws BizException {
    	return vesselDelayDao.selectDelayCodeList(parm);
    }

	@Override
	public DataItemList updateVerifiedVesselDelayItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList updateItems = new DataItemList();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		VesselDelayItem item = (VesselDelayItem)parm.getUpdateItems().get(0);
		ArrayList<VesselDelayItem> arr = item.getItems();
		if ((arr != null) && (arr.size() >0)){
			 for (int i = 0; i< arr.size(); i++) {
				 updateItems.add(arr.get(i));
			 }
			 updateParm.setUpdateItems(updateItems);
			return vesselDelayDao.updateVerifiedVesselDelayItems(updateParm);
		}else {
			return updateItems;
		}
	}

	@Override
	public DataItemList deleteVesselDelayItems(DeleteItemsBizParm parm) throws BizException {
		return vesselDelayDao.deleteVesselDelayItems(parm);
	}

	@Override
	public DataItemList insertVesselDelayItems(InsertItemsBizParm parm) throws BizException {
		VesselDelayItem vesselDelayItem = (VesselDelayItem)parm.getInsertItems().get(0);
		
		SearchVesselDelayPenaltyReportParm vesselDelayPenaltyReportParm = new SearchVesselDelayPenaltyReportParm();
		DataItemList specificDelayCodes = vesselDelayPenaltyReportDao.selectSpecificDelayCodes(vesselDelayPenaltyReportParm);
		VesselDelayPenaltyReportItem vesselDelayPenaltyReportItem = (VesselDelayPenaltyReportItem)specificDelayCodes.getCollection().get(0);
		 
	    String parameterValue = vesselDelayPenaltyReportItem.getParameterValue();
	    parameterValue = parameterValue.replace("[", "").replace("]", "");
	    String[] delayCodes = parameterValue.split(",");
		
	    boolean isDelayCode = false;
	    for (String code : delayCodes) {
	        if (code.trim().equals(vesselDelayItem.getRsnCd())) {
	            isDelayCode = true;
	            break;
	        }
	    }
		
	    if(isDelayCode) {
	    	VesselDelayPenaltyReportItem insertPenaltyReportItem = new VesselDelayPenaltyReportItem();

	    	insertPenaltyReportItem.setVslCallId(vesselDelayItem.getVslCallId());
	    	insertPenaltyReportItem.setScn(vesselDelayItem.getScn());
	    	insertPenaltyReportItem.setHatchNo(vesselDelayItem.getHatchNo());
	    	insertPenaltyReportItem.setContrator(vesselDelayItem.getContractor());
	    	insertPenaltyReportItem.setRsnCd(vesselDelayItem.getRsnCd());

	    	insertPenaltyReportItem.setShftId(vesselDelayItem.getShftId() != null ? vesselDelayItem.getShftId() : "");
	    	insertPenaltyReportItem.setUserId(vesselDelayItem.getUserId());
	    	insertPenaltyReportItem.setUpdateTime(vesselDelayItem.getUpdateTime());
	    	
	    	if(vesselDelayItem.getStDt() == null || vesselDelayItem.getStDt().equals("")) {
	    		LocalDate currentDate = LocalDate.now();
	    		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
	    		String dateString = currentDate.format(formatter);
		    	insertPenaltyReportItem.setPntyDt(dateString);
	    	}else {
		    	insertPenaltyReportItem.setPntyDt(vesselDelayItem.getStDt());
	    	}
	    	
	    	UpdateBizParm<VesselDelayPenaltyReportItem> updateBizParm = new UpdateBizParm<>();
	    	updateBizParm.setItem(insertPenaltyReportItem);
	    	
	    	InsertItemsBizParm insertParm = new InsertItemsBizParm();
	    	insertParm.setInsertItems(super.getItems(updateBizParm));

	    	DataItemList result = vesselDelayPenaltyReportDao.insertVesselDelayItems(insertParm);
	    }
		
		return vesselDelayDao.insertVesselDelayItems(parm);
	}

	@Override
	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws BizException {
		return vesselDelayDao.updateVesselDelayItems(parm);
	}
}