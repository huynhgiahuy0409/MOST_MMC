package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.operation.IConfirmHandlingInOfRORODao;
import com.tsb.most.biz.dao.operation.IROROMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoHandlingInItem;
import com.tsb.most.biz.dataitem.operation.ConfirmHandlingInOfROROItem;
import com.tsb.most.biz.dataitem.operation.ROROMasterItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchConfirmHandlingInOfROROParm;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ConfirmHandlingInOfRORO implements IConfirmHandlingInOfRORO {
	private IConfirmHandlingInOfRORODao confirmHandlingInOfRORODao;
	private IROROMasterDao roroMasterDao;
	private static String ALL = "*";
	
	public void setConfirmHandlingInOfRORODao(IConfirmHandlingInOfRORODao confirmHandlingInOfRORODao) {
		this.confirmHandlingInOfRORODao = confirmHandlingInOfRORODao;
	}
	
	public void setRoroMasterDao(IROROMasterDao roroMasterDao) {
		this.roroMasterDao = roroMasterDao;
	}

	public DataItemList selectCommonComboItems(SearchConfirmHandlingInOfROROParm parm) throws BizException{
		ConfirmHandlingInOfROROItem returnItem = new ConfirmHandlingInOfROROItem();
		
//		SearchCodeMasterListParm partyCode = new SearchCodeMasterListParm();
//		//Cargo Type
//		partyCode.setLcd("MT");
//        partyCode.setMcd("CGTP");
//        partyCode.setCol1("RR");
//        partyCode.setScdUse("Y");
//        returnItem.setCargoTypeItems(commonCodeDao.getCodeMasterList(partyCode).getCollection());
         
  		DataItemList returnItems = new DataItemList();
        returnItems.add(returnItem);
        return returnItems;      
	}
	
	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmHandlingInOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingInOfRORODao.selectShipgNoteNoComboBoxItems(parm);
        return list;
	}

	public DataItemList selectCargoItems(SearchConfirmHandlingInOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingInOfRORODao.selectCargoItems(parm);
        return list;
	}
	
	public DataItemList selectGateInItems(SearchConfirmHandlingInOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingInOfRORODao.selectGateInItems(parm);
        return list;
	}
	
	public DataItemList selectHandlingInItems(SearchConfirmHandlingInOfROROParm parm) throws BizException{
		DataItemList list = confirmHandlingInOfRORODao.selectHandlingInItems(parm);
        return list;
	}
	
	public DataItemList updateHandlingInUnitItems(UpdateItemsBizParm parm) throws BizException {
		ConfirmHandlingInOfROROItem returnItem = new ConfirmHandlingInOfROROItem();
		DataItemList items = parm.getUpdateItems();

		ConfirmHandlingInOfROROItem roroHIJobItem = null;
		ConfirmHandlingInOfROROItem roroHIArrvDelvItem = null;
		ConfirmHandlingInOfROROItem shuItem = null;
		String jobGroupNo = null;
		SearchROROMasterParm mstParm;
		
		DataItemList insertItems = new DataItemList();
		DataItemList updateItems = new DataItemList();
		DataItemList updateRoRoMstAmtItems = new DataItemList();
		DataItemList insertHIJobItems = new DataItemList();
		DataItemList updateHIArrvDelvItems = new DataItemList();
		DataItemList insertHIArrvDelvItems = new DataItemList();
		DataItemList updateHIGPArrvDelvItems = new DataItemList();
		DataItemList insertGateInItems = new DataItemList();
		DataItemList updateGateInItems = new DataItemList();
		DataItemList updateGateInLorryItems = new DataItemList();
		DataItemList updateGateInOnlyLorryItems = new DataItemList();
		ConfirmHandlingInOfROROItem item = (ConfirmHandlingInOfROROItem) items.get(0);

		mstParm = new SearchROROMasterParm();
		mstParm.setCgNo(item.getGrNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setLorryNo(item.getLorryId());
		mstParm.setCgInOutCd("I");
		
		SearchConfirmHandlingInOfROROParm hiParm = new SearchConfirmHandlingInOfROROParm();
		hiParm.setShipgNoteNo(item.getShipgNoteNo());
		hiParm.setVslCallId(item.getVslCallId());
		hiParm.setGrNo(item.getGrNo());

		jobGroupNo = confirmHandlingInOfRORODao.selectJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);
		// 1) insert arrvDelv HoTime = null, Hi time =not null

		item.setStatCd(CodeConstant.MT_CGSTATUS_ST);

		roroHIJobItem = (ConfirmHandlingInOfROROItem) item.clone();
		roroHIJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LF);
		roroHIJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GW);
		roroHIJobItem.setStatCd(CodeConstant.MT_JOBSTATCD_COM);

		roroHIJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
		roroHIJobItem.setLorryId(item.getLorryId());
		roroHIJobItem.setCgInOutCd("I");
		if (item.getDriverId() != null  && !item.getDriverId().equals("")) {// set mode of operation
			roroHIJobItem.setTsptTpCd("OH");
        }
		insertHIJobItems.add(roroHIJobItem);
		
		if(item.getUnitNo() != null && !item.getUnitNo().equals("")) {
        	item.setUnitNo(makeInValue(item.getUnitNo()));
        }
		updateItems.add(item);
		ConfirmHandlingInOfROROItem gateInItem = (ConfirmHandlingInOfROROItem) roroHIJobItem.clone();
		String gateInSeq = confirmHandlingInOfRORODao.selectGateInTimeSeq(hiParm);
		if (gateInSeq != null) {
			gateInItem.setSeq(gateInSeq);
			if (gateInItem.getLorryFlag()) {
				updateGateInLorryItems.add(gateInItem);
			} else {
				updateGateInItems.add(gateInItem);
			}
		} else {
			if (gateInItem.getLorryFlag() && (gateInItem.getSeq() != null && gateInItem.getSeq() != "")) {
				updateGateInOnlyLorryItems.add(gateInItem);
			} else {
				if (gateInItem.getSeq() == null || gateInItem.getSeq() == "") {
					insertGateInItems.add(gateInItem);
				}
			}
		} // first lorry
		if (item.getGatePassYn()){
			roroHIArrvDelvItem = (ConfirmHandlingInOfROROItem) item.clone();
			roroHIArrvDelvItem.setCgInOutCd("O");
			roroHIArrvDelvItem.setGatePassIssueDt(item.getHdlInEndDt());
			roroHIArrvDelvItem.setMsrmt(item.getDmgM3());
			roroHIArrvDelvItem.setWgt(item.getDmgMt());
			roroHIArrvDelvItem.setPkgQty(item.getDmgQty());
			roroHIArrvDelvItem.setDmgYn("Y");
			roroHIArrvDelvItem.setJobCoCd("D");
			roroHIArrvDelvItem.setJobPurpCd(CodeConstant.MT_JOBPURP_GG);
			mstParm.setCgInOutCd("O");
			if (confirmHandlingInOfRORODao.selectIsCargoAvDvChk(mstParm)) {
				updateHIGPArrvDelvItems.add(roroHIArrvDelvItem);
			} else {
				insertHIArrvDelvItems.add(roroHIArrvDelvItem);
			}
		}
//		if (insertItems.size() > 0) {
//			confirmHandlingInOfRORODao.insertCargoHandlingInItems(insertItems);
//		}

//		if (updateRoRoMstAmtItems.size() > 0) {
//			confirmHandlingInOfRORODao.updateCgHIAmtItems(updateRoRoMstAmtItems);
//		}

		if (insertHIJobItems.size() > 0) {
			confirmHandlingInOfRORODao.insertHIJobItems(insertHIJobItems);
			insertDetailJobItems(insertHIJobItems);
		}
		if (updateHIGPArrvDelvItems.size() > 0) {
			for (int i = 0; i < updateHIGPArrvDelvItems.size(); i++) {
				ConfirmHandlingInOfROROItem arrvDelvItem = (ConfirmHandlingInOfROROItem) updateHIGPArrvDelvItems.get(i);

				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(arrvDelvItem.getVslCallId());
				List gpList = confirmHandlingInOfRORODao.selectGatepassNo(gpParm).getCollection();
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					arrvDelvItem.setGatePassNo(gpItem.getGatePassNo());
					returnItem.add(gpList);
				}

				// Update processing
				DataItemList tmpArrvDelvItems = new DataItemList();
				tmpArrvDelvItems.add(arrvDelvItem);
				confirmHandlingInOfRORODao.updateHIGPArrvDelvItems(tmpArrvDelvItems);
			}
		}
		
		if (insertHIArrvDelvItems.size() > 0) {
			for (int i = 0; i < insertHIArrvDelvItems.size(); i++) {
				CargoHandlingInItem arrvDelvItem = (CargoHandlingInItem) insertHIArrvDelvItems.get(i);

				SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
				gpParm.setVslCallId(arrvDelvItem.getVslCallId());
				List gpList = confirmHandlingInOfRORODao.selectGatepassNo(gpParm).getCollection();
				if (gpList != null && gpList.size() > 0) {
					CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
					arrvDelvItem.setGatePassNo(gpItem.getGatePassNo());
					returnItem.add(gpList);
				}
				// Insert processing
				DataItemList tmpArrvDelvItems = new DataItemList();
				tmpArrvDelvItems.add(arrvDelvItem);
				confirmHandlingInOfRORODao.insertHIArrvDelvItems(tmpArrvDelvItems);
			}
		}
		if (updateHIArrvDelvItems.size() > 0) {
			confirmHandlingInOfRORODao.updateHIArrvDelvItems(updateHIArrvDelvItems);
		}
		if (insertGateInItems.size() > 0) { // TMT_ARRV_DELV
			confirmHandlingInOfRORODao.insertHIGeneralGateIn(insertGateInItems);
		}

		if (updateGateInItems.size() > 0) { // TMT_ARRV_DELV
//			confirmHandlingInOfRORODao.updateHIGateInTime(updateGateInItems);
		}
		if (updateGateInLorryItems.size() > 0) { // TMT_ARRV_DELV
			confirmHandlingInOfRORODao.updateHIGateInLorry(updateGateInLorryItems);
		}

		if (updateGateInOnlyLorryItems.size() > 0) {
			confirmHandlingInOfRORODao.updateHIOnlyLorry(updateGateInOnlyLorryItems);
		}
		return confirmHandlingInOfRORODao.updateConfirmHandlingInOfRoRo(parm);
	}
	
	private String makeInValue(String value) {
		if(value == null ||  value.length() == 0){
			return value;
		}
		else if(value.equals(ALL)){
			return null;
		}
		StringTokenizer st = new StringTokenizer(value,",");
		StringBuffer sql = new StringBuffer();
		sql.append("(");
		while (st.hasMoreElements()) {
			sql.append("'");
			sql.append(st.nextElement().toString().trim());
			sql.append("'");
			if(st.hasMoreElements()){
				sql.append(",");
			}
		}
		sql.append(")");
	  
		return sql.toString();
	}

	private ROROMasterItem buildROROMasterItem(ConfirmHandlingInOfROROItem item) {
    	ROROMasterItem mstItem = new ROROMasterItem();
		
		mstItem.setVslCallId(item.getVslCallId());
		mstItem.setVslCd(item.getVslCd());
		mstItem.setCallYear(item.getCallYear());
		mstItem.setCallSeq(item.getCallSeq());
		mstItem.setMfDocId(item.getBookingNo());
		mstItem.setCgNo(item.getShipgNoteNo());
		mstItem.setIxCd(item.getIxCd());
		
		mstItem.setUnitNo(item.getUnitNo());
		mstItem.setRoroSeq(item.getRoroSeq());
		mstItem.setBrandCd(item.getBrandCd());
		mstItem.setModelCd(item.getModelCd());
		mstItem.setDocWgt(item.getDocWgt());
		mstItem.setCbm(item.getCbm());
		mstItem.setNewYn(item.getNewYn());
		mstItem.setCatgCd(item.getCatgCd());
		mstItem.setCgTpCd(item.getCgTpCd());
		//mstItem.setStatCd(item.getStatCd());
		mstItem.setUserId(item.getUserId());
		
		return mstItem;
	}
	
	public DataItemList selectGateInItemsHHT(SearchConfirmHandlingInOfROROParm parm) throws BizException{
		DataItemList list = new DataItemList();
		if(parm.getSearchType() != null && parm.getSearchType().equals("ListHI")) {
			list = confirmHandlingInOfRORODao.selectHandlingInItems(parm);
		} else {
			list = confirmHandlingInOfRORODao.selectGateInItems(parm);
		}
        return list;
	}
	
	public DataItemList deleteHandlingInUnitItemsHHT(UpdateItemsBizParm parm) throws BizException {
		return confirmHandlingInOfRORODao.updateConfirmHandlingInOfRoRo(parm);
	}
	
	public void insertDetailJobItems(DataItemList insertHIJobItems) throws BizException {
		ConfirmHandlingInOfROROItem item = (ConfirmHandlingInOfROROItem) insertHIJobItems.get(0);

		String unitNo = makeInValue(item.getUnitNo());
		SearchConfirmHandlingInOfROROParm searchParm = new SearchConfirmHandlingInOfROROParm();
		searchParm.setVslCallId(item.getVslCallId());
		searchParm.setBookingNo(item.getBookingNo());
		searchParm.setShipgNoteNo(item.getShipgNoteNo());
		searchParm.setGrNo(item.getGrNo());
		searchParm.setUnitNo(unitNo);

		List<ConfirmHandlingInOfROROItem> ROROUnitlist = confirmHandlingInOfRORODao.selectROROUnitItems(searchParm).getCollection();
		if (ROROUnitlist == null || ROROUnitlist.isEmpty()) {
			return;
		}

		DataItemList insertDtlJobItems = new DataItemList();
		for (ConfirmHandlingInOfROROItem roroItem : ROROUnitlist) {
			ConfirmHandlingInOfROROItem detailItem = (ConfirmHandlingInOfROROItem) item.clone();
			detailItem.setRoroSeq(roroItem.getRoroSeq());
			detailItem.setUnitNo(roroItem.getUnitNo());
			detailItem.setCbm(roroItem.getCbm());
			detailItem.setDocWgt(roroItem.getDocWgt());
			insertDtlJobItems.add(detailItem);
		}
		if (insertDtlJobItems.size() > 0) {
			confirmHandlingInOfRORODao.insertJobDtlItemsOfRoRo(insertDtlJobItems);
		}
	}
}
