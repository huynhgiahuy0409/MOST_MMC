package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.component.common.ISearchVesselCallDao;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dataitem.common.SearchVesselCallListItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.common.SearchVesselCallListParm;
import com.tsb.most.biz.dao.operation.IShiftingDoubleBankingDao;
import com.tsb.most.biz.dao.operation.IVesselScheduleDao;
import com.tsb.most.biz.dataitem.operation.ShiftingDoubleBankingItem;
import com.tsb.most.biz.parm.operation.SearchShiftingDoubleBankingParm;
import com.tsb.most.biz.parm.operation.SearchVesselScheduleParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ShiftingDoubleBanking extends MOSTBaseService implements IShiftingDoubleBanking {
	private IShiftingDoubleBankingDao shiftingDoubleBankingDao;
	private ICodeMasterDao codeMasterDao;
	private ISearchVesselCallDao searchVesselCallDao;
	private IVesselScheduleDao vesselScheduleDao;

	public void setVesselScheduleDao(IVesselScheduleDao vesselScheduleDao) {
		this.vesselScheduleDao = vesselScheduleDao;
	}

	public void setSearchVesselCallDao(ISearchVesselCallDao searchVesselCallDao) {
		this.searchVesselCallDao = searchVesselCallDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setShiftingDoubleBankingDao(IShiftingDoubleBankingDao shiftingDoubleBankingDao) {
		this.shiftingDoubleBankingDao = shiftingDoubleBankingDao;
	}

	public DataItemList selectSftDblBankingList(SearchShiftingDoubleBankingParm parm) throws BizException {
        ShiftingDoubleBankingItem returnItem = new ShiftingDoubleBankingItem();
        if (parm.getSearchType().indexOf("HHT_IF") > -1) {
            if (parm.getSearchType().equals("HHT_IF_DB")) {
                // Double Banking
                List doubleBankingList = shiftingDoubleBankingDao.selectDoubleBankingList(parm).getCollection();
                returnItem.add(doubleBankingList); // [0]
            } else if (parm.getSearchType().equals("HHT_IF_STS")) {
                // Shipt to Ship Operatoion
                List stsOperationList = shiftingDoubleBankingDao.selectStsOperationList(parm).getCollection();
                returnItem.add(stsOperationList); // [1]
            } else if (parm.getSearchType().equals("HHT_IF_STS_DOC")) {
                // Shipt to Ship Operatoion DocAmountByOPRMode
                List amountByOPRModeList = shiftingDoubleBankingDao.selectDocAmountByOPRMode(parm).getCollection();
                returnItem.add(amountByOPRModeList); // [2]
            } else if (parm.getSearchType().equals("HHT_IF_VS")) {
                // Vessel Shifting
                List vslShftList = shiftingDoubleBankingDao.selectVesselShiftingList(parm).getCollection();
                returnItem.add(vslShftList); // [3]
            } else if (parm.getSearchType().equals("HHT_IF_VS_CW")) {
                // Vessel Shifting Current Wharf
                String vslSftYN = shiftingDoubleBankingDao.checkVslShifting(parm);
                parm.setVslShiftingYN(vslSftYN);

                List vslCurrWharftList = shiftingDoubleBankingDao.selectVesselCurrWharf(parm).getCollection();
                returnItem.add(vslCurrWharftList); // [4]
            } else if (parm.getSearchType().equals("HHT_IF_CS")) {
                // Cargo Shifting
                List crgShftList = shiftingDoubleBankingDao.selectCargoShiftingList(parm).getCollection();
                returnItem.add(crgShftList);
            } else if (parm.getSearchType().equals("HHT_IF_STS_CMDT")) {
                // Commodity
                List commodityList = shiftingDoubleBankingDao.selectCommodity(parm).getCollection();
                returnItem.add(commodityList);
            } else if (parm.getSearchType().equals("HHT_IF_STS_CMDT_FROM_CS")) {
                // Commodity
                List commodityList = shiftingDoubleBankingDao.selectCommodityWithinConfirmationSlip(parm).getCollection();
                returnItem.add(commodityList);
            } else if (parm.getSearchType().equals("HHT_IF_STS_CGTP")) {
                // Cargo type from Confirmation Slip 1
                List commodityList = shiftingDoubleBankingDao.selectCargoType(parm).getCollection();
                returnItem.add(commodityList);
            }

        } else if (parm.getSearchType().indexOf("HHT_CB") > -1) {
            SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
            ArrayList arrService = new ArrayList();
            Object[] parmObj;

            if (parm.getSearchType().equals("HHT_CB_BT")) {
                // Banking Type
                partyCode.setLcd("MT");
                partyCode.setMcd("DBLBNKDIV");
                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [0]
            } else if (parm.getSearchType().equals("HHT_CB_OM")) {
                // OPR Mode Combo
                partyCode.setLcd("MT");
                partyCode.setMcd("STSOPTP");

                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [1]

            } else if (parm.getSearchType().equals("HHT_CB_HTC")) {
                // Hatch Combo
                partyCode.setLcd("MT");
                partyCode.setMcd("HTC");
                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [2]
            } else if (parm.getSearchType().equals("HHT_CB_AF")) {
                // AP/FP Combo
                partyCode.setLcd("MT");
                partyCode.setMcd("HCHDRT");
                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [3]
            } else if (parm.getSearchType().equals("HHT_CB_ST")) {
                // Shifting Type Combo
                partyCode.setLcd("MT");
                partyCode.setMcd("VSLSHFTTP");
                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [4]
            } else if (parm.getSearchType().equals("HHT_CB_SC")) {
                // Stevedore / Ship's Crew Combo
                partyCode.setLcd("MT");
                partyCode.setMcd("STCRTP");
                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [5]

            } else if (parm.getSearchType().equals("HHT_CB_NW")) {
                List list = vesselScheduleDao.selectBerthInfoList(new SearchVesselScheduleParm()).getCollection();
                returnItem.add(list);
            } else if (parm.getSearchType().equals("HHT_CB_SP")) {
                // Shifting Position
                partyCode.setLcd("MT");
                partyCode.setMcd("SHFPST");
                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [7]
            } else if (parm.getSearchType().equals("HHT_CB_RS")) {
                // Reason
                partyCode.setLcd("MT");
                partyCode.setMcd("SFTRSN");
                returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [8]
            }

        }
        else if (parm.getSearchType().equals("info")) {
            // Double Banking
        	SearchVesselCallListParm vslInfoParm = new SearchVesselCallListParm();
        	vslInfoParm.setVslCallId(parm.getVslCallId());
        	vslInfoParm.setVslTp(parm.getVslTp());
        	vslInfoParm.setMode("textfield");
        	
        	ArrayList<SearchVesselCallListItem> vslInfo = (ArrayList<SearchVesselCallListItem>) searchVesselCallDao.selectSearchVesselCallList(vslInfoParm).getCollection();
        	returnItem.setVslInfo(vslInfo);
        	
        	ArrayList<ShiftingDoubleBankingItem> doubleBankingList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectDoubleBankingList(parm).getCollection();
        	returnItem.setDoubleBankingList(doubleBankingList);

            // Ship to Ship Operation
        	ArrayList<ShiftingDoubleBankingItem> stsOperationList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectStsOperationList(parm).getCollection();
        	returnItem.setStsOperationList(stsOperationList);

            // Vessel Shifting
        	ArrayList<ShiftingDoubleBankingItem> vslShftList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectVesselShiftingList(parm).getCollection();
        	returnItem.setVslShftList(vslShftList);

            // Vessel Shifting Current Wharf
            String vslSftYN = shiftingDoubleBankingDao.checkVslShifting(parm);
            parm.setVslShiftingYN(vslSftYN);

            ArrayList<ShiftingDoubleBankingItem> vslCurrWharftList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectVesselCurrWharf(parm).getCollection();
            returnItem.setVslCurrWharftList(vslCurrWharftList);

            // Cargo Shifting
            ArrayList<ShiftingDoubleBankingItem> crgShftList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectCargoShiftingList(parm).getCollection();
            returnItem.setCrgShftList(crgShftList);
            
//            ArrayList<ShiftingDoubleBankingItem> amountByOPRModeList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectDocAmountByOPRMode(parm).getCollection();
//            returnItem.setAmountByOPRModeList(amountByOPRModeList); // [0]
         // Vessel Shifting Berth List
//            ArrayList<ShiftingDoubleBankingItem> BerthList = (ArrayList<ShiftingDoubleBankingItem>)vesselScheduleDao.selectBerthInfoList(new SearchVesselScheduleParm()).getCollection();
//            returnItem.setVslShiftingBerthList(BerthList);
        } else if (parm.getSearchType().equals("stsInfo")) {
            // Ship to Ship Operation DocAmountByOPRMode
            ArrayList<ShiftingDoubleBankingItem> amountByOPRModeList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectDocAmountByOPRMode(parm).getCollection();
            returnItem.setAmountByOPRModeList(amountByOPRModeList); // [0]
            // Commodity
            ArrayList<ShiftingDoubleBankingItem> commodityList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectCommodity(parm).getCollection();
            returnItem.setCommodityList(commodityList); // [1]
            // Cargo Type
            ArrayList<ShiftingDoubleBankingItem> cargoList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectCargoType(parm).getCollection();
            returnItem.setCargoList(cargoList); // [2]
            
            // Confirmation slip 
            ArrayList<ShiftingDoubleBankingItem> cnfSlipList = (ArrayList<ShiftingDoubleBankingItem>)shiftingDoubleBankingDao.selectConfSlpInformation(parm).getCollection();
            returnItem.setConfirmationSlipInfo(cnfSlipList); // [3]
        } else if (parm.getSearchType().equals("combo")) {
            SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
            ArrayList arrService = new ArrayList();
            Object[] parmObj;

            // Banking Type
            partyCode.setLcd("MT");
            partyCode.setMcd("DBLBNKDIV");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [0]

            // OPR Mode Combo
            partyCode.setLcd("MT");
            partyCode.setMcd("STSOPTP");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [1]

            // Hatch Combo
            partyCode.setLcd("MT");
            partyCode.setMcd("HTC");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [2]

            // AP/FP Combo
            partyCode.setLcd("MT");
            partyCode.setMcd("HCHDRT");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [3]

            // Shifting Type Combo
            partyCode.setLcd("MT");
            partyCode.setMcd("VSLSHFTTP");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [4]

            // Stevedore / Ship's Crew Combo
            partyCode.setLcd("MT");
            partyCode.setMcd("STCRTP");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [5]

            SearchVesselScheduleParm vsParm = new SearchVesselScheduleParm();
            List list = vesselScheduleDao.selectBerthInfoList(vsParm).getCollection();
            returnItem.add(list);

            // Shifting Position
            partyCode.setLcd("MT");
            partyCode.setMcd("SHFPST");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [7]
            
            // Reason
            partyCode.setLcd("MT");
            partyCode.setMcd("SFTRSN");
            returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection()); // [8]
        } else if (parm.getSearchType().equals("docAmountByOPRMode")) {
            List doubleBankingList = shiftingDoubleBankingDao.selectDocAmountByOPRMode(parm).getCollection();
            returnItem.add(doubleBankingList);
        } else if (parm.getSearchType().equals("dbInfo")) {
            List doubleBankingList = shiftingDoubleBankingDao.selectDoubleBankingList(parm).getCollection();
            returnItem.add(doubleBankingList); // [0]
        } else if (parm.getSearchType().equals("vsInfo")) {
            List vslShftList = shiftingDoubleBankingDao.selectVesselShiftingList(parm).getCollection();
            returnItem.add(vslShftList); // [0]
            String vslSftYN = shiftingDoubleBankingDao.checkVslShifting(parm);
            parm.setVslShiftingYN(vslSftYN);

            List vslCurrWharftList = shiftingDoubleBankingDao.selectVesselCurrWharf(parm).getCollection();
            returnItem.add(vslCurrWharftList); // [1]
        } else if (parm.getSearchType().equals("sftAtxInfo")) {
            List vslShftAtxList = shiftingDoubleBankingDao.selectShftAtx(parm).getCollection();
            returnItem.add(vslShftAtxList); // [0]
        }

        DataItemList returnList = new DataItemList();
        returnList.add(returnItem);
        
        return returnList;
    }
	
    
	public DataItemList insertVesselShiftingItems(InsertItemsBizParm parm) throws BizException {
		
		DataItemList insertItems = new DataItemList();
		insertItems = parm.getInsertItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) insertItems.get(0);	
		
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());		
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtaDt(item.getAtaDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());
		return shiftingDoubleBankingDao.insertVesselShiftingItems(parm);
	}

	public DataItemList updateVesselShiftingItems(UpdateItemsBizParm parm) throws BizException {
		
		DataItemList updateItems = new DataItemList();
		updateItems = parm.getUpdateItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) updateItems.get(0);
			
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());

		return shiftingDoubleBankingDao.updateVesselShiftingItems(parm);
	}

	public DataItemList deleteVesselShiftingItems(DeleteItemsBizParm parm) throws BizException {
		return shiftingDoubleBankingDao.deleteVesselShiftingItems(parm);
	}

	public DataItemList insertCargoShiftingItems(InsertItemsBizParm parm) throws BizException {
		DataItemList insertItems = new DataItemList();
		insertItems = parm.getInsertItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) insertItems.get(0);
		
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());
		return shiftingDoubleBankingDao.insertCargoShiftingItems(parm);

	}

	public DataItemList updateCargoShiftingItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList updateItems = new DataItemList();
		updateItems = parm.getUpdateItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) updateItems.get(0);
		
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());
		return shiftingDoubleBankingDao.updateCargoShiftingItems(parm);
	
	}

	public DataItemList deleteCargoShiftingItems(DeleteItemsBizParm parm) throws BizException {
		return shiftingDoubleBankingDao.deleteCargoShiftingItems(parm);		 
	}

	public DataItemList insertDoubleBankingItems(InsertItemsBizParm parm) throws BizException {
		
		DataItemList insertItems = new DataItemList();
		insertItems = parm.getInsertItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) insertItems.get(0);	
		
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());		
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		
		item.setShip3Atb(item.getShip3AtbNoSecond());
		item.setShip3Atw(item.getShip3AtwNoSecond());
		item.setShip3Atc(item.getShip3AtcNoSecond());
		item.setShip3Atu(item.getShip3AtuNoSecond());
		
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		ShiftingDoubleBankingItem itemCol = (ShiftingDoubleBankingItem) parm.getInsertItems().get(0);
		 if ("VL".equalsIgnoreCase(itemCol.getDblBnkDivCd())
                 || "BT".equalsIgnoreCase(itemCol.getDblBnkDivCd())) {
			 updateParm.setUpdateItems(parm.getInsertItems());
			 shiftingDoubleBankingDao.update2ndVesselInfoItems(updateParm);
         } else if ("TR".equalsIgnoreCase(itemCol.getDblBnkDivCd())) {
        	 updateParm.setUpdateItems(parm.getInsertItems());
        	 shiftingDoubleBankingDao.update3ndVesselInfoItems(updateParm);
         }
		 
		return shiftingDoubleBankingDao.insertDoubleBankingItems(parm);
	}

	public DataItemList updateDoubleBankingItems(UpdateItemsBizParm parm) throws BizException {
		
		DataItemList updateItems = new DataItemList();
		updateItems = parm.getUpdateItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) updateItems.get(0);
			
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		
		item.setShip3Atb(item.getShip3AtbNoSecond());
		item.setShip3Atw(item.getShip3AtwNoSecond());
		item.setShip3Atc(item.getShip3AtcNoSecond());
		item.setShip3Atu(item.getShip3AtuNoSecond());
		
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());
		ShiftingDoubleBankingItem itemCol = (ShiftingDoubleBankingItem) parm.getUpdateItems().get(0);
		 if ("VL".equalsIgnoreCase(itemCol.getDblBnkDivCd())
                || "BT".equalsIgnoreCase(itemCol.getDblBnkDivCd())) {
			 shiftingDoubleBankingDao.update2ndVesselInfoItems(parm);
        } else if ("TR".equalsIgnoreCase(itemCol.getDblBnkDivCd())) {
       	 shiftingDoubleBankingDao.update3ndVesselInfoItems(parm);
        }
		
		return shiftingDoubleBankingDao.updateDoubleBankingItems(parm);
	}

	public DataItemList deleteDoubleBankingItems(DeleteItemsBizParm parm) throws BizException {
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
		 ShiftingDoubleBankingItem itemCol = (ShiftingDoubleBankingItem) parm.getDeleteItems().get(0);
		 if ("VL".equalsIgnoreCase(itemCol.getDblBnkDivCd())
                 || "BT".equalsIgnoreCase(itemCol.getDblBnkDivCd())
                 || "TR".equalsIgnoreCase(itemCol.getDblBnkDivCd())) {
			 updateParm.setUpdateItems(parm.getDeleteItems());
			 shiftingDoubleBankingDao.updateVesselInfoRollBackItems(updateParm);
         }
		
		ShiftingDoubleBankingItem dbItem = (ShiftingDoubleBankingItem) parm.getDeleteItems().get(0);
        if (dbItem.getAtu() != null && !"".equals(dbItem.getAtu())) {
        	updateParm.setUpdateItems(parm.getDeleteItems());
        	shiftingDoubleBankingDao.updateVsAtu(updateParm);
        }
		
		return shiftingDoubleBankingDao.deleteDoubleBankingItems(parm);
	}

	public DataItemList insertShipToShipItems(InsertItemsBizParm parm) throws BizException {
		
		DataItemList insertItems = new DataItemList();
		insertItems = parm.getInsertItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) insertItems.get(0);	
		
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());		
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());
		return shiftingDoubleBankingDao.insertShipToShipItems(parm);
	}

	public DataItemList updateShipToShipItems(UpdateItemsBizParm parm) throws BizException {
		
		DataItemList updateItems = new DataItemList();
		updateItems = parm.getUpdateItems();
		ShiftingDoubleBankingItem item = (ShiftingDoubleBankingItem) updateItems.get(0);
			
		item.setStDt(item.getStDtNoSecond());
		item.setEndDt(item.getEndDtNoSecond());
		item.setShip1Atb(item.getShip1AtbNoSecond());
		item.setShip1Atw(item.getShip1AtwNoSecond());
		item.setShip1Atc(item.getShip1AtcNoSecond());
		item.setShip1Atu(item.getShip1AtuNoSecond());
		item.setShip2Atb(item.getShip2AtbNoSecond());
		item.setShip2Atw(item.getShip2AtwNoSecond());
		item.setShip2Atc(item.getShip2AtcNoSecond());
		item.setShip2Atu(item.getShip2AtuNoSecond());
		item.setPrevAtb(item.getPrevAtbNoSecond());
		item.setPrevAtu(item.getPrevAtuNoSecond());
		item.setAtuDt(item.getAtuDtNoSecond());
		item.setAtbDt(item.getAtbDtNoSecond());
		item.setAtw(item.getAtwNoSecond());
		item.setAtc(item.getAtcNoSecond());

		return shiftingDoubleBankingDao.updateShipToShipItems(parm);
	}

	public DataItemList deleteShipToShipItems(DeleteItemsBizParm parm) throws BizException {
		return shiftingDoubleBankingDao.deleteShipToShipItems(parm);
	}
}