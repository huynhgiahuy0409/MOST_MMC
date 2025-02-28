package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.IVesselDelayDao;
import com.tsb.most.biz.dataitem.operation.VesselDelayItem;
import com.tsb.most.biz.parm.operation.SearchVesselDelayParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VesselDelay extends MOSTBaseService implements IVesselDelay {
	private IVesselDelayDao vesselDelayDao;
	private ICodeMasterDao codeMasterDao;
	
	public void setVesselDelayDao(IVesselDelayDao vesselDelayDao) {
		this.vesselDelayDao = vesselDelayDao;
	}
	
    public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
    
    public DataItemList selectVesselDelayComboList(SearchVesselDelayParm parm) throws BizException {
        VesselDelayItem returnItem = new VesselDelayItem();
        
        returnItem.setEquipmenNoList(vesselDelayDao.selectEqNoList(parm).getCollection());
        returnItem.setEquipmenNoList2(vesselDelayDao.selectEqNoList(parm).getCollection());
        
		// Reference RosterConfiguration instead of ShiftGroupDef - by LamLong
		
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
		return vesselDelayDao.insertVesselDelayItems(parm);
	}

	@Override
	public DataItemList updateVesselDelayItems(UpdateItemsBizParm parm) throws BizException {
		return vesselDelayDao.updateVesselDelayItems(parm);
	}
}