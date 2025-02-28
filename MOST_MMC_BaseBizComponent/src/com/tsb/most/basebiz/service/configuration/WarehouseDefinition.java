package com.tsb.most.basebiz.service.configuration;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.configuration.IWarehouseDefinitionDao;
import com.tsb.most.basebiz.dataitem.configuration.WarehouseDefinitionItem;
import com.tsb.most.basebiz.dataitem.configuration.WarehouseDrawItem;
import com.tsb.most.basebiz.parm.configuration.SearchWarehouseDefinitionParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.tx.TxTraceInfo;

public class WarehouseDefinition extends MOSTBaseService implements IWarehouseDefinition {
	private IWarehouseDefinitionDao warehouseDefinitionDao;

	public void setWarehouseDefinitionDao(IWarehouseDefinitionDao warehouseDefinitionDao) {
		this.warehouseDefinitionDao = warehouseDefinitionDao;
	}

	public DataItemList selectWarehouseDefinitionList(SearchWarehouseDefinitionParm parm) throws BizException {
		 return warehouseDefinitionDao.selectWarehouseDefinitionList(parm);
	}

	public DataItemList selectChkDupliLocId(SearchWarehouseDefinitionParm parm) throws BizException {
		return warehouseDefinitionDao.selectChkDupliLocId(parm);
		
	}

	public DataItemList selectOverlap(SearchWarehouseDefinitionParm parm) throws BizException {
		return warehouseDefinitionDao.selectOverlap(parm);
	}
	
	public DataItemList selectSulphurConfigurationList(SearchWarehouseDefinitionParm parm) throws BizException {
		return warehouseDefinitionDao.selectSulphurConfigurationList(parm);
	}

	public DataItemList updateSulphurItems(UpdateItemsBizParm parm) throws BizException {
		return warehouseDefinitionDao.updateSulphurItems(parm);
	}
	

	public DataItemList checkBayRowDesign(SearchWarehouseDefinitionParm parm) throws BizException {
		String alpabat[] = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
		WarehouseDrawItem returnItem = new WarehouseDrawItem();
		DataItemList itemList = new DataItemList();
		
		int bayQty = 0;
		int rowQty = 0;
		String whIdStr = parm.getWhId();
		
		if (parm.getBayQty() != null && !parm.getBayQty().equals("") && parm.getRowQty() != null
				&& !parm.getRowQty().equals("")) {
			bayQty = Integer.parseInt(parm.getBayQty());
			rowQty = Integer.parseInt(parm.getRowQty());
		}
		
		if (!"".equals(whIdStr) && bayQty > 0 && rowQty > 0) {
			parm.setLocDivCd(CodeConstant.MT_LOCDIV1_WHO);
			parm.setLocId(whIdStr);
			List list2 = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
			
			WarehouseDefinitionItem rstItem = (WarehouseDefinitionItem) (list2.get(0));
			WarehouseDefinitionItem whItem = new WarehouseDefinitionItem();
			DataItemList insertItems = new DataItemList();

			DataItemList deleteItems = new DataItemList();
			WarehouseDefinitionItem deleteWhItem = new WarehouseDefinitionItem();
			deleteWhItem.setLocId(whIdStr);
			deleteItems.add(deleteWhItem);

			String rowStr = "";
			
			for (int i = 1; i <= bayQty; i++) {
				whItem = new WarehouseDefinitionItem();
				whItem.setLocTpCd(parm.getLocTpCd());
				whItem.setLocId(parm.getLocId() + "-" + i);
				whItem.setLocNm(parm.getLocId() + "-" + i);
				whItem.setLocDivCd("BAY");
				whItem.setAreaId(rstItem.getAreaId());
				whItem.setWhId(rstItem.getWhId());
				whItem.setLeftX("" + (Double.parseDouble(rstItem.getLen()) / bayQty) * (i - 1));
				whItem.setTopY("0");
				whItem.setLen("" + (Double.parseDouble(rstItem.getLen()) / bayQty));
				whItem.setWth("0");
				whItem.setBayId("" + i);
				whItem.setBayIdx("" + i);
				whItem.setUserId(TxTraceInfo.staticUserId);
				whItem.setCrud("C");
				insertItems.add(whItem);
			}

			for (int j = 0; j < rowQty; j++) {
				whItem = new WarehouseDefinitionItem();
				whItem.setLocTpCd(parm.getLocTpCd());
				rowStr = alpabat[j % alpabat.length];
				whItem.setLocId(parm.getLocId() + "-" + rowStr);
				whItem.setLocNm(parm.getLocId() + "-" + rowStr);
				whItem.setLocDivCd("ROW");
				whItem.setAreaId(rstItem.getAreaId());
				whItem.setWhId(rstItem.getWhId());
				whItem.setLeftX("0");
				whItem.setTopY("" + (Double.parseDouble(rstItem.getWth()) / rowQty) * j);
				whItem.setLen("0");
				whItem.setWth("" + (Double.parseDouble(rstItem.getWth()) / rowQty));
				whItem.setRowwId(rowStr);
				whItem.setRowwIdx("" + (j + 1));
				whItem.setUserId(TxTraceInfo.staticUserId);
				whItem.setCrud("C");
				insertItems.add(whItem);
			}

			for (int k = 1; k <= bayQty; k++) {
				for (int l = 0; l < rowQty; l++) {
					rowStr = alpabat[l % alpabat.length];
					whItem = new WarehouseDefinitionItem();
					whItem.setLocTpCd(parm.getLocTpCd());
					whItem.setLocId(parm.getLocId() + "-" + rowStr + k);
					whItem.setLocNm(parm.getLocId() + "-" + rowStr + k);
					whItem.setLocDivCd("CEL");
					whItem.setLocTpCd(rstItem.getLocTpCd());
					whItem.setLocUseYn("Y");
					whItem.setAreaId(rstItem.getAreaId());
					whItem.setWhId(rstItem.getWhId());
					whItem.setLeftX("" + (Double.parseDouble(rstItem.getLen()) / bayQty) * (k - 1));
					whItem.setTopY("" + (Double.parseDouble(rstItem.getWth()) / rowQty) * l);
					whItem.setLen("" + (Double.parseDouble(rstItem.getLen()) / bayQty));
					whItem.setWth("" + (Double.parseDouble(rstItem.getWth()) / rowQty));
					whItem.setTotDims("" + (Double.parseDouble(rstItem.getLen()) / bayQty) * (Double.parseDouble(rstItem.getWth()) / rowQty));
					whItem.setBayId("" + k);
					whItem.setBayIdx("" + k);
					whItem.setRowwId(rowStr);
					whItem.setRowwIdx("" + (l + 1));
					whItem.setUserId(TxTraceInfo.staticUserId);
					whItem.setCrud("C");
					insertItems.add(whItem);
				}
			}

			int affectRow = 0;
			
			if (insertItems.size() > 0) {
				InsertItemsBizParm insertParm = new InsertItemsBizParm();
				insertParm.setInsertItems(insertItems);

				warehouseDefinitionDao.deleteWhRowBayCellItems(parm.getTxTraceinfo(), deleteItems);
				warehouseDefinitionDao.insertwarehouseDefinitionItems(insertParm);
			}
		}

		parm.setLocId("");
		parm.setLocDivCd("CEL");
		List listCell = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
		
		parm.setLocDivCd("BAY");
		List listBay = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
		
		parm.setLocDivCd("ROW");
		List listRow = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
		
		parm.setLocDivCd("CEL");
		parm.setLocUseYn("N");
		List listUnused = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();

		returnItem.setCell(listCell);
		returnItem.setBay(listBay);
		returnItem.setRow(listRow);
		returnItem.setUnused(listUnused);
		
		itemList.add(returnItem);
		return itemList;
	}

	public DataItemList selectWhViewList(SearchWarehouseDefinitionParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		WarehouseDefinitionItem returnItem = new WarehouseDefinitionItem();

		if (parm.getSearchType().equals("viewPlanInfo")) {
			return warehouseDefinitionDao.selectInvLocCargos(parm);
		} else if (parm.getSearchType().equals("planInfo")) {
			List listPlan = warehouseDefinitionDao.selectSpcPlanList(parm).getCollection();
			returnItem.add(listPlan);
		} else if (parm.getSearchType().equals("planInfoHHT")) {
			return warehouseDefinitionDao.selectSpcPlanList(parm);
		} else if (parm.getSearchType().equals("occupiedInfo")) {

			if (parm.getHhtCgNo() != null) {
				if (parm.getHhtCgNo().equalsIgnoreCase("true")) {
					String[] stringSplit = parm.getCgNo().split(",");
					List arrayList = new ArrayList();

					for (int i = 0; i < stringSplit.length; i++) {
						arrayList.add(stringSplit[i].trim());
					}

					parm.setCgNoList(arrayList);
				}
			}

			List listOccupied = warehouseDefinitionDao.selectInvLocCargos(parm).getCollection();
			returnItem.add(listOccupied);
		} else if (parm.getSearchType().equals("occupiedInfoHHT")) {
			if (parm.getHhtCgNo() != null) {
				if (parm.getHhtCgNo().equalsIgnoreCase("true")) {
					String[] stringSplit = parm.getCgNo().split(",");
					List arrayList = new ArrayList();

					for (int i = 0; i < stringSplit.length; i++) {
						arrayList.add(stringSplit[i].trim());
					}

					parm.setCgNoList(arrayList);
				}
			}
			return warehouseDefinitionDao.selectInvLocCargos(parm);
		} else if (parm.getSearchType().equals("HHT")) {
			List list = warehouseDefinitionDao.selectRentalList(parm).getCollection(); // Rental Infos
																				// WhConfigurationMap.selectRentalList
			returnItem.add(list);
		} else {
			List listConfirmation = warehouseDefinitionDao.selectChkDataAtCellBayRow(parm).getCollection();
			
			if (listConfirmation.size() == 0) {
				return checkBayRowDesign(parm);
			} else {
				parm.setLocDivCd("CEL");
				List list1 = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
				
				parm.setLocDivCd("BAY");
				List list2 = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
				
				parm.setLocDivCd("ROW");
				List list3 = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
				
				parm.setLocDivCd("CEL");
				parm.setLocUseYn("N");
				List list4 = warehouseDefinitionDao.selectWarehouseDefinitionList(parm).getCollection();
				
				List list5 = warehouseDefinitionDao.selectInvLocCargos(parm).getCollection();
				List list6 = null;
				
				if (list5 != null) {
					if (list5.size() > 0) {
						for (int i = 0; i < list5.size(); i++) {
							parm.setLocRange(((WarehouseDefinitionItem) (list5.get(i))).getLocId());

							if (list6 == null)
								list6 = warehouseDefinitionDao.selectWhCargoInfos(parm).getCollection();
							else
								list6.add(warehouseDefinitionDao.selectWhCargoInfos(parm));
						}
					} else {
						list6 = list5;
					}
				}
				List list7 = warehouseDefinitionDao.selectRentalList(parm).getCollection(); 
																						
				List list8 = warehouseDefinitionDao.selectSpcPlanList(parm).getCollection();
																						
				returnItem.setCell(list1);
				returnItem.setBay(list2);
				returnItem.setRow(list3);
				returnItem.setUnused(list4);
				returnItem.setCargo(list5);
				returnItem.setRental(list7);
				returnItem.setSpacemovement(list8);
			}
		}
		itemList.add(returnItem);
		return itemList;
	}

	public DataItemList selectHHTWhViewList(SearchWarehouseDefinitionParm parm) throws BizException {
		return warehouseDefinitionDao.selectInvLocCargos(parm);
	}
	
	public DataItemList selectAreaInfoList(SearchWarehouseDefinitionParm parm) throws BizException {
		return warehouseDefinitionDao.selectAreaInfoList(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException{
		return warehouseDefinitionDao.insertwarehouseDefinitionItems(parm);
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException{
		return warehouseDefinitionDao.updatewarehouseDefinitionItems(parm);
	}

	public void updateUnusedCells(UpdateItemsBizParm parm) throws BizException {
		DataItemList items = parm.getUpdateItems();
		warehouseDefinitionDao.updateUnusedCells(items);
	}
	
	public void deleteItems(DeleteItemsBizParm parm) throws BizException{
		warehouseDefinitionDao.deletewarehouseDefinitionItems(parm);
	}
}
