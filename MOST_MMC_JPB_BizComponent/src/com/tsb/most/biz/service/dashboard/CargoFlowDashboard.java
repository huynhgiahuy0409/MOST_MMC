package com.tsb.most.biz.service.dashboard;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.dashboard.ICargoFlowDashboardDao;
import com.tsb.most.biz.dataitem.dashboard.CargoFlowDashboardItem;
import com.tsb.most.biz.parm.dashboard.SearchCargoFlowDashboardParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class CargoFlowDashboard extends MOSTBaseService implements ICargoFlowDashboard {
	private ICargoFlowDashboardDao cargoFlowDashboardDao;

	public void setCargoFlowDashboardDao(ICargoFlowDashboardDao cargoFlowDashboardDao) {
		this.cargoFlowDashboardDao = cargoFlowDashboardDao;
	}

	public DataItemList selectVesselSchedule(SearchCargoFlowDashboardParm parm) throws BizException{
		return cargoFlowDashboardDao.selectVesselSchedule(parm);
	}
	
	public DataItemList selectLoadingCommoditylist_bk(SearchCargoFlowDashboardParm parm) throws BizException{
		DataItemList rtnList = cargoFlowDashboardDao.selectLoadingCommoditylist(parm);
		DataItemList tempList = null;
		
		CargoFlowDashboardItem rtnObj = new CargoFlowDashboardItem();
		
		
		for(int i=0;i<rtnList.size();i++) {
			rtnObj = (CargoFlowDashboardItem)rtnList.get(i);
			parm.setCmmdCd(rtnObj.getCmmdCd());
			
			CargoFlowDashboardItem ptnrCodes = new CargoFlowDashboardItem();
			
			tempList = cargoFlowDashboardDao.selectLoadingCommodityPtnr(parm);
			if(tempList != null && tempList.size() > 0) {
				ptnrCodes = (CargoFlowDashboardItem)tempList.get(0);
			}else {
				ptnrCodes.setPtnrCode("");
				ptnrCodes.setFwdCode("");
				ptnrCodes.setCnsCode("");
			}
			
			tempList = cargoFlowDashboardDao.selectLoadingCommodityTotalAmt(parm);
			if(tempList != null && tempList.size() > 0) {
				CargoFlowDashboardItem totAmt = (CargoFlowDashboardItem)tempList.get(0);
				rtnObj.setCmmdSumTotal("T : "+totAmt.getPkgQty()+"   "+totAmt.getCgWgt()+"   "+totAmt.getCgVol()+"      "+ptnrCodes.getPtnrCode());
			}else {
				rtnObj.setCmmdSumTotal("T :   0     0     0      "+ptnrCodes.getPtnrCode());
			}
			
			parm.setDelveryTpCd(CodeConstant.MT_DELVTP_I);
			tempList = cargoFlowDashboardDao.selectLoadingCommodityAmt(parm);
			if(tempList != null && tempList.size() > 0) {
				CargoFlowDashboardItem inDirecAmt = (CargoFlowDashboardItem)tempList.get(0);
				rtnObj.setCmmdSumIndirect("I : "+inDirecAmt.getPkgQty()+"   "+inDirecAmt.getCgWgt()+"   "+inDirecAmt.getCgVol()+"      "+ptnrCodes.getFwdCode());
			}else {
				rtnObj.setCmmdSumIndirect("I :   0     0     0        "+ptnrCodes.getFwdCode());
			}
			
			parm.setDelveryTpCd(CodeConstant.MT_DELVTP_D);
			tempList = cargoFlowDashboardDao.selectLoadingCommodityAmt(parm);
			if(tempList != null && tempList.size() > 0) {
				CargoFlowDashboardItem directAmpt = (CargoFlowDashboardItem)tempList.get(0);
				rtnObj.setCmmdSumDirect("D : "+directAmpt.getPkgQty()+" "+directAmpt.getCgWgt()+"   "+directAmpt.getCgVol()+"      "+ptnrCodes.getCnsCode());
			}else {
				rtnObj.setCmmdSumDirect("D :   0     0     0       "+ptnrCodes.getCnsCode());
			}
			
			
		}
		
		return rtnList;
	}
	
	public DataItemList selectLoadingCommoditylist(SearchCargoFlowDashboardParm parm) throws BizException{
		//return cargoFlowDashboardDao.selectLoadedSummaryByCmdt(parm);
		return cargoFlowDashboardDao.selectLoadedSummaryByVsl(parm);
	}
	public DataItemList selectDischargingCommoditylist_bk(SearchCargoFlowDashboardParm parm) throws BizException{
		DataItemList rtnList = cargoFlowDashboardDao.selectDischargingCommoditylist(parm);
		DataItemList tempList = null;
		
		CargoFlowDashboardItem rtnObj = new CargoFlowDashboardItem();
		
		
		for(int i=0;i<rtnList.size();i++) {
			rtnObj = (CargoFlowDashboardItem)rtnList.get(i);
			parm.setCmmdCd(rtnObj.getCmmdCd());
			
			CargoFlowDashboardItem ptnrCodes = new CargoFlowDashboardItem();
			
			tempList = cargoFlowDashboardDao.selectDischargingCommodityPtnr(parm);
			if(tempList != null && tempList.size() > 0) {
				ptnrCodes = (CargoFlowDashboardItem)tempList.get(0);
			}else {
				ptnrCodes.setPtnrCode("");
				ptnrCodes.setFwdCode("");
				ptnrCodes.setCnsCode("");
			}
			
			tempList = cargoFlowDashboardDao.selectDischargingCommodityTotalAmt(parm);
			if(tempList != null && tempList.size() > 0) {
				CargoFlowDashboardItem totAmt = (CargoFlowDashboardItem)tempList.get(0);
				rtnObj.setCmmdSumTotal("T : "+totAmt.getPkgQty()+"   "+totAmt.getCgWgt()+"   "+totAmt.getCgVol()+"      "+ptnrCodes.getPtnrCode());
			}else {
				rtnObj.setCmmdSumTotal("T :   0     0     0      "+ptnrCodes.getPtnrCode());
			}
			
			parm.setDelveryTpCd(CodeConstant.MT_DELVTP_I);
			tempList = cargoFlowDashboardDao.selectDischargingCommodityAmt(parm);
			if(tempList != null && tempList.size() > 0) {
				CargoFlowDashboardItem inDirecAmt = (CargoFlowDashboardItem)tempList.get(0);
				rtnObj.setCmmdSumIndirect("I : "+inDirecAmt.getPkgQty()+"   "+inDirecAmt.getCgWgt()+"   "+inDirecAmt.getCgVol()+"      "+ptnrCodes.getFwdCode());
			}else {
				rtnObj.setCmmdSumIndirect("I :   0     0     0        "+ptnrCodes.getFwdCode());
			}
			
			parm.setDelveryTpCd(CodeConstant.MT_DELVTP_D);
			tempList = cargoFlowDashboardDao.selectDischargingCommodityAmt(parm);
			if(tempList != null && tempList.size() > 0) {
				CargoFlowDashboardItem directAmpt = (CargoFlowDashboardItem)tempList.get(0);
				rtnObj.setCmmdSumDirect("D : "+directAmpt.getPkgQty()+" "+directAmpt.getCgWgt()+"   "+directAmpt.getCgVol()+"      "+ptnrCodes.getCnsCode());
			}else {
				rtnObj.setCmmdSumDirect("D :   0     0     0       "+ptnrCodes.getCnsCode());
			}
			
			
		}
		
		return rtnList;
	}
	
	public DataItemList selectDischargingCommoditylist(SearchCargoFlowDashboardParm parm) throws BizException{
		//return cargoFlowDashboardDao.selectDischargedSummaryByCmdt(parm);
		return cargoFlowDashboardDao.selectDischargedSummaryByVsl(parm);
	}
	
	public DataItemList selectDisCargoFlowDashbard_bk(SearchCargoFlowDashboardParm parm) throws BizException{
		DataItemList rtnlist = new DataItemList();
		DataItemList tempList = null;
		CargoFlowDashboardItem tempItem = null;
		
		
		if(parm.getHatchQty() != null && parm.getHatchQty().length() >0) {
			int hQty = Integer.parseInt(parm.getHatchQty());
			
			for(int i=1;i<=hQty;i++) {
				
				float vslTotAmt = 0;
				float vslHandledAmt = 0;
				float vslRemainAmt = 0;
				float vslAmtAvg = 0;
				
				StringBuffer vslAmt = new StringBuffer();
				StringBuffer yardAmt = new StringBuffer();
				StringBuffer gateAmt = new StringBuffer();
				
				parm.setOpClassCd(CodeConstant.MT_CATGTP_I);
				parm.setHatchNo("H"+i);
				
				// Vessel 
				tempList = cargoFlowDashboardDao.selectVesselTotalAmt(parm);
				CargoFlowDashboardItem disItem = (CargoFlowDashboardItem)tempList.get(0);
				
				if(disItem == null) {
					disItem = new CargoFlowDashboardItem();
					rtnlist.add(disItem);
					
					continue;
					
				}else {
					tempList = cargoFlowDashboardDao.selectVesselHandledAmt(parm);
					tempItem = (CargoFlowDashboardItem)tempList.get(0);
					
					if(tempItem != null) {
						vslTotAmt = Float.parseFloat(disItem.getCgWgt());
						vslHandledAmt = Float.parseFloat(tempItem.getCgWgt());
						
						vslRemainAmt = vslTotAmt - vslHandledAmt;
					}
					
					vslAmt.append(vslRemainAmt+"    ( "+vslHandledAmt+"   "+vslTotAmt+" )     "+ 0 );
					vslAmtAvg = (int)((vslHandledAmt/vslTotAmt)*100);
							
					disItem.setVslTotalAmt(vslAmt.toString());
					disItem.setVslAmtPercentage(String.valueOf(vslAmtAvg)+"%");
				}
				
				//Warehouse
				tempList = cargoFlowDashboardDao.selectYardTotalAmt(parm);
				CargoFlowDashboardItem yardItem = (CargoFlowDashboardItem)tempList.get(0);
				
				float yardTotAmt = 0;
				float yardHandledAmt = 0;
				float yardRemainAmt = 0;
				float yardAmtAvg = 0;
				
				if(yardItem == null) {
					yardAmt.append(yardRemainAmt+"    ( "+yardHandledAmt+"   "+yardTotAmt+" )     "+ 0 );
					
					disItem.setYardTotalAmt(yardAmt.toString());
					disItem.setYardAmtPercentage(String.valueOf(yardAmtAvg)+"%");
				}else {
					tempList = cargoFlowDashboardDao.selectYardHandledAmt(parm);
					tempItem = (CargoFlowDashboardItem)tempList.get(0);
					
					if(tempItem != null) {
						yardTotAmt = Float.parseFloat(yardItem.getCgWgt());
						yardHandledAmt = Float.parseFloat(tempItem.getCgWgt());
						
						yardRemainAmt = yardTotAmt - yardHandledAmt;
					}
					
					yardAmt.append(yardRemainAmt+"    ( "+yardHandledAmt+"   "+yardTotAmt+" )     "+ (vslTotAmt - yardTotAmt));
					yardAmtAvg = (int)((yardHandledAmt/yardTotAmt)*100);
							
					disItem.setYardTotalAmt(yardAmt.toString());
					disItem.setYardAmtPercentage(String.valueOf(yardAmtAvg)+"%");
				}
				
				//Gate
				float gateTotAmt = 0;
				float gateHandledAmt = 0;
				float gateRemainAmt = 0;
				float gateAmtAvg = 0;
				
				gateAmt.append(gateRemainAmt+"    ( "+gateHandledAmt+"   "+gateTotAmt+" )     "+ (vslTotAmt - gateTotAmt));
				gateAmtAvg = (int)((gateHandledAmt/gateTotAmt)*100);
				
				disItem.setGateTotalAmt(gateAmt.toString());
				disItem.setGateAmtPercentage(String.valueOf(gateAmtAvg)+"%");
				
				rtnlist.add(disItem);
			}
			
		}
		
		return rtnlist;
	}
	
	public DataItemList selectDisCargoFlowDashbard(SearchCargoFlowDashboardParm parm) throws BizException{
		DataItemList rtnlist = new DataItemList();
		CargoFlowDashboardItem rtnItem = new CargoFlowDashboardItem();
		CargoFlowDashboardItem tempItem = new CargoFlowDashboardItem();
		
		ArrayList<CargoFlowDashboardItem> vslItems = new ArrayList<CargoFlowDashboardItem>();
		ArrayList<CargoFlowDashboardItem> whItems = new ArrayList<CargoFlowDashboardItem>();
		ArrayList<CargoFlowDashboardItem> gateItems = new ArrayList<CargoFlowDashboardItem>();
		
		if(parm.getHatchQty() != null && parm.getHatchQty().length() >0) {
			int hQty = Integer.parseInt(parm.getHatchQty());
			
			for(int i=1;i<=hQty;i++) {
				parm.setHatchNo("H"+i);
				
				// Vessel 
				//DataItemList vslList = cargoFlowDashboardDao.selectVesselDischargedAmt(parm);
				DataItemList vslList = cargoFlowDashboardDao.selectVesselDischargedAmtByVsl(parm);
				if(vslList.size() > 0) {
					for(int j=0;j<vslList.size();j++) {
						tempItem = (CargoFlowDashboardItem)vslList.get(j);
						vslItems.add(tempItem);
					}
				}
				
				// WH 
//				DataItemList whList = cargoFlowDashboardDao.selectWarehouseDischargedAmt(parm);
//				if(whList.size() > 0) {
//					for(int j=0;j<whList.size();j++) {
//						tempItem = (CargoFlowDashboardItem)whList.get(j);
//						whItems.add(tempItem);
//					}				
//				}
				
				// Gate
//				DataItemList gateList = cargoFlowDashboardDao.selectGateDischargedAmt(parm);
//				if(gateList.size() > 0) {
//					for(int j=0;j<gateList.size();j++) {
//						tempItem = (CargoFlowDashboardItem)gateList.get(j);
//						gateItems.add(tempItem);
//					}
//				}
			}
		}
		rtnItem.setVslDischargedItems(vslItems);
		rtnItem.setWhDischargedItems(whItems);
		rtnItem.setGateDischargedItems(gateItems);
		
		rtnlist.add(rtnItem);
		return rtnlist;
	}
	
	
	public DataItemList selectLoadCargoFlowDashbard_bk(SearchCargoFlowDashboardParm parm) throws BizException{
		DataItemList rtnlist = new DataItemList();
		DataItemList tempList = null;
		CargoFlowDashboardItem tempItem = null;
		
		if(parm.getHatchQty() != null && parm.getHatchQty().length() >0) {
			int hQty = Integer.parseInt(parm.getHatchQty());
			
			for(int i=1;i<=hQty;i++) {
				
				float vslTotAmt = 0;
				float vslHandledAmt = 0;
				float vslRemainAmt = 0;
				float vslAmtAvg = 0;
				
				StringBuffer vslAmt = new StringBuffer();
				StringBuffer yardAmt = new StringBuffer();
				StringBuffer gateAmt = new StringBuffer();
				
				parm.setOpClassCd(CodeConstant.MT_CATGTP_E);
				parm.setHatchNo("H"+i);
				
				// Vessel 
				tempList = cargoFlowDashboardDao.selectVesselTotalAmt(parm);
				CargoFlowDashboardItem loadItem = (CargoFlowDashboardItem)tempList.get(0);
				
				if(loadItem == null) {
					loadItem = new CargoFlowDashboardItem();
					rtnlist.add(loadItem);
					continue;
					
				}else {
					tempList = cargoFlowDashboardDao.selectVesselHandledAmt(parm);
					tempItem = (CargoFlowDashboardItem)tempList.get(0);
					
					if(tempItem != null) {
						vslTotAmt = Float.parseFloat(loadItem.getCgWgt());
						vslHandledAmt = Float.parseFloat(tempItem.getCgWgt());
						
						vslRemainAmt = vslTotAmt - vslHandledAmt;
					}
					
					vslAmt.append(vslRemainAmt+"    ( "+vslHandledAmt+"   "+vslTotAmt+" )     "+ 0 );
					vslAmtAvg = (vslHandledAmt/vslTotAmt)*100;
							
					loadItem.setVslTotalAmt(vslAmt.toString());
					loadItem.setVslAmtPercentage(String.valueOf(vslAmtAvg)+"%");
				}
				
				//Warehouse
				tempList = cargoFlowDashboardDao.selectYardTotalAmt(parm);
				CargoFlowDashboardItem yardItem = (CargoFlowDashboardItem)tempList.get(0);
				
				float yardTotAmt = 0;
				float yardHandledAmt = 0;
				float yardRemainAmt = 0;
				float yardAmtAvg = 0;
				
				if(yardItem == null) {
					yardAmt.append(yardRemainAmt+"    ( "+yardHandledAmt+"   "+yardTotAmt+" )     "+ 0 );
					
					loadItem.setYardTotalAmt(yardAmt.toString());
					loadItem.setYardAmtPercentage(String.valueOf(yardAmtAvg)+"%");
				}else {
					tempList = cargoFlowDashboardDao.selectYardHandledAmt(parm);
					tempItem = (CargoFlowDashboardItem)tempList.get(0);
					
					if(tempItem != null) {
						yardTotAmt = Float.parseFloat(yardItem.getCgWgt());
						yardHandledAmt = Float.parseFloat(tempItem.getCgWgt());
						
						yardRemainAmt = yardTotAmt - yardHandledAmt;
					}
					
					yardAmt.append(yardRemainAmt+"    ( "+yardHandledAmt+"   "+yardTotAmt+" )     "+ (vslTotAmt - yardHandledAmt));
					yardAmtAvg = (int)((yardHandledAmt/yardTotAmt)*100);
							
					loadItem.setYardTotalAmt(yardAmt.toString());
					loadItem.setYardAmtPercentage(String.valueOf(yardAmtAvg)+"%");
				}
				
				//Gate
				float gateTotAmt = 0;
				float gateHandledAmt = 0;
				float gateRemainAmt = 0;
				float gateAmtAvg = 0;
				
				gateAmt.append(gateRemainAmt+"    ( "+gateHandledAmt+"   "+gateTotAmt+" )     "+ (vslTotAmt - gateTotAmt));
				gateAmtAvg = (int)((gateHandledAmt/gateTotAmt)*100);
				
				loadItem.setGateTotalAmt(gateAmt.toString());
				loadItem.setGateAmtPercentage(String.valueOf(gateAmtAvg)+"%");
				
				
				rtnlist.add(loadItem);
			}
			
		}
		
		return rtnlist;
	}
	
	public DataItemList selectLoadCargoFlowDashbard(SearchCargoFlowDashboardParm parm) throws BizException{
		DataItemList rtnlist = new DataItemList();
		CargoFlowDashboardItem rtnItem = new CargoFlowDashboardItem();
		CargoFlowDashboardItem tempItem = new CargoFlowDashboardItem();
		
		ArrayList<CargoFlowDashboardItem> vslItems = new ArrayList<CargoFlowDashboardItem>();
		ArrayList<CargoFlowDashboardItem> whItems = new ArrayList<CargoFlowDashboardItem>();
		ArrayList<CargoFlowDashboardItem> gateItems = new ArrayList<CargoFlowDashboardItem>();
		
		if(parm.getHatchQty() != null && parm.getHatchQty().length() >0) {
			int hQty = Integer.parseInt(parm.getHatchQty());
			
			for(int i=1;i<=hQty;i++) {
				parm.setHatchNo("H"+i);
				
				// Vessel 
				//DataItemList vslList = cargoFlowDashboardDao.selectVesselLoadingAmt(parm);
				DataItemList vslList = cargoFlowDashboardDao.selectVesselLoadingAmtByVsl(parm);
				
				if(vslList.size() > 0) {
					for(int j=0;j<vslList.size();j++) {
						tempItem = (CargoFlowDashboardItem)vslList.get(j);
						vslItems.add(tempItem);
					}
				}
				
				// WH 
//				DataItemList whList = cargoFlowDashboardDao.selectWarehouseLoadingAmt(parm);
//				if(whList.size() > 0) {
//					for(int j=0;j<whList.size();j++) {
//						tempItem = (CargoFlowDashboardItem)whList.get(j);
//						whItems.add(tempItem);
//					}				
//				}
				
				// Gate
//				DataItemList gateList = cargoFlowDashboardDao.selectGateLoadingAmt(parm);
//				if(gateList.size() > 0) {
//					for(int j=0;j<gateList.size();j++) {
//						tempItem = (CargoFlowDashboardItem)gateList.get(j);
//						gateItems.add(tempItem);
//					}
//				}
			}
		}
		rtnItem.setVslLoadingItems(vslItems);
		rtnItem.setWhLoadingItems(whItems);
		rtnItem.setGateLoadingItems(gateItems);
		
		rtnlist.add(rtnItem);
		return rtnlist;
	}


}
