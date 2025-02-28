package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.biz.dao.operation.IStevedoreTrimmingDao;
import com.tsb.most.biz.dataitem.operation.StevedoreTrimmingItem;
import com.tsb.most.biz.parm.operation.SearchServiceOrderParm;
import com.tsb.most.biz.parm.operation.SearchStevedoreTrimmingParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.response.RestResponse;

public class StevedoreTrimming extends MOSTBaseService implements IStevedoreTrimming {
	private IStevedoreTrimmingDao stevedoreTrimmingDao;

	public void setStevedoreTrimmingDao(IStevedoreTrimmingDao stevedoreTrimmingDao) {
		this.stevedoreTrimmingDao = stevedoreTrimmingDao;
	}

	public DataItemList selectVORDryBreakBulk(SearchStevedoreTrimmingParm parm) throws BizException {
        DataItemList returnItem = new DataItemList();
        
        if ("info".equalsIgnoreCase(parm.getSearchType())) {
            returnItem = stevedoreTrimmingDao.selectVORDryBreakBulk(parm);
        } else if ("infoSheet".equalsIgnoreCase(parm.getSearchType())) {
            returnItem = stevedoreTrimmingDao.selectVORDryBreakBulkForStevAndTrim(parm);
        }

        return returnItem;
    }
	
	public DataItemList selectVORDryBreakBulkCommonCd(SearchStevedoreTrimmingParm parm) throws BizException {
		StevedoreTrimmingItem returnItem = new StevedoreTrimmingItem();
      
        if ("equipment".equalsIgnoreCase(parm.getSearchType())) {
            parm.setEqTpCd("EQ");
            returnItem.setEquipmentCombo(stevedoreTrimmingDao.selectEquipment(parm).getCollection());
            
        } else if ("HHTrole1".equalsIgnoreCase(parm.getSearchType())) {
            parm.setRsDivCd("S");
            returnItem.setRoleDivSCombo(stevedoreTrimmingDao.selectRole(parm).getCollection());
            
        } else if ("HHTrole2".equalsIgnoreCase(parm.getSearchType())) {
            parm.setRsDivCd("S");
            returnItem.setRoleDivSCombo(stevedoreTrimmingDao.selectRole(parm).getCollection());
            
        } else if ("HHTshift".equalsIgnoreCase(parm.getSearchType())) {
        	returnItem.setShiftCombo(stevedoreTrimmingDao.selectShift(parm).getCollection());
        	
        } else if ("HHTfacility".equalsIgnoreCase(parm.getSearchType())) {
            parm.setEqTpCd("FC");
            returnItem.setFacilityCombo(stevedoreTrimmingDao.selectEquipment(parm).getCollection());
            
        } else {
        	// Shift
        	returnItem.setShiftCombo(stevedoreTrimmingDao.selectShift(parm).getCollection());
        	
            // Equipment
            parm.setEqTpCd("EQ");
            returnItem.setEquipmentCombo(stevedoreTrimmingDao.selectEquipment(parm).getCollection());
            returnItem.setEquipmentCombo2(stevedoreTrimmingDao.selectEquipmentList(parm).getCollection()); //Full EQ Combo for BBK
            
            // Role 1
            parm.setRsDivCd("S");
            returnItem.setRoleDivSCombo(stevedoreTrimmingDao.selectRole(parm).getCollection());

            // Facility
            parm.setEqTpCd("FC");
            returnItem.setFacilityCombo(stevedoreTrimmingDao.selectEquipment(parm).getCollection());

            // Role 2
            parm.setRsDivCd("T");
            returnItem.setRoleDivTCombo(stevedoreTrimmingDao.selectRole(parm).getCollection());
        }
        DataItemList itemList = new DataItemList();
		itemList.add(returnItem);
		return itemList;
    }
	
	public void processVORDryBreakBulkForStevAndTrimCUD(UpdateItemsBizParm parm) throws BizException {
		DataItemList returnItem = parm.getUpdateItems();
        DataItemList items = new DataItemList();
        items.add(returnItem);
        
        DataItemList updateItems = new DataItemList();
        DataItemList deleteItems = new DataItemList();
		DataItemList headItems = new DataItemList();
		
		DeleteItemsBizParm deleteParm = new DeleteItemsBizParm(); 
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm(); 

        DataItemList tempItems = new DataItemList();

        for (int i = 0; i < items.size(); i++) {
            StevedoreTrimmingItem item = (StevedoreTrimmingItem) items.get(i);
            StevedoreTrimmingItem insItem = (StevedoreTrimmingItem)item.clone();
            StevedoreTrimmingItem updateItem = (StevedoreTrimmingItem)item.clone();

            if ("BBK".equalsIgnoreCase(item.getCgTpCd()) 
            		|| "DBK".equalsIgnoreCase(item.getCgTpCd())) {
                updateItem.setRsDivCd("EQ");
                updateItem.setCwDiv(item.getCwDiv());
                headItems.add(updateItem);
            }

            if ("BBK".equalsIgnoreCase(item.getCgTpCd())) {
            	if (item.getSpr() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("MS");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("MS");
                    insItem.setWkerQty(item.getSpr());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getWinch() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("WM");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("WM");
                    insItem.setWkerQty(item.getWinch());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getGeneral() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("GW");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("GW");
                    insItem.setWkerQty(item.getGeneral());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getSupervisor() == 0|| "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("AS");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("AS");
                    insItem.setWkerQty(item.getSupervisor());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getNonworker() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("TW");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("TW");
                    insItem.setWkerQty(item.getNonworker());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }

                // add item for all 0 qty
                if (item.getSpr() == 0 
                		&& item.getWinch() == 0 
                		&& item.getGeneral() == 0 
                		&& item.getSupervisor() == 0
                		&& item.getNonworker() == 0 
                		&& "N".equalsIgnoreCase(item.getCwDiv())) {
                    insItem.setRoleCd("MS");
                    insItem.setWkerQty(0);
                    tempItems.add((StevedoreTrimmingItem) insItem.clone());
                }

            } else if ("DBK".equalsIgnoreCase(item.getCgTpCd())) {
                if (item.getSpr() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("MS");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("MS");
                    insItem.setWkerQty(item.getSpr());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getSignal() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("SM");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("SM");
                    insItem.setWkerQty(item.getSignal());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getDeck() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("DM");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("DM");
                    insItem.setWkerQty(item.getDeck());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getHoper() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("HM");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("HM");
                    insItem.setWkerQty(item.getHoper());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getGeneral() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("GW");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("GW");
                    insItem.setWkerQty(item.getGeneral());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getSupervisor() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("AS");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("AS");
                    insItem.setWkerQty(item.getSupervisor());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }
                if (item.getNonworker() == 0 || "Y".equalsIgnoreCase(item.getCwDiv())) {
                    // Delete it
                    insItem.setRoleCd("TW");
                    deleteItems.add((StevedoreTrimmingItem) insItem.clone());
                } else {
                    // Update it
                    insItem.setRoleCd("TW");
                    insItem.setWkerQty(item.getNonworker());
                    updateItems.add((StevedoreTrimmingItem) insItem.clone());
                }

                // add item for all 0 qty
                if (item.getSpr() == 0
                        && item.getSignal() == 0
                        && item.getDeck() == 0
                        && item.getHoper() == 0
                        && item.getGeneral() == 0
                        && item.getSupervisor() == 0
                        && item.getNonworker() == 0
                        && "N".equalsIgnoreCase(item.getCwDiv())) {
                    insItem.setRoleCd("MS");
                    insItem.setWkerQty(0);
                    tempItems.add((StevedoreTrimmingItem) insItem.clone());
                }
            }
        }
        
        deleteParm.setDeleteItems(deleteItems);
        updateParm.setUpdateItems(updateItems);

        if (updateItems.size() > 0) {
        	stevedoreTrimmingDao.updateVORDryBreakBulkItemsForStevAndTrim(updateParm);
        }

        if (deleteItems.size() > 0) {
        	stevedoreTrimmingDao.deleteVORDryBreakBulkItems(deleteParm);
        }

        if (tempItems.size() > 0) {
        	stevedoreTrimmingDao.updateVORDryBreakBulkItemsForStevAndTrim(updateParm);
        }

        if (headItems.size() > 0) {
        	stevedoreTrimmingDao.updateVORDryBreakBulkItemsWithShipCrew(updateParm);
        }
    }
}