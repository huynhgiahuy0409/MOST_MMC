package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

import com.tsb.most.basebiz.dao.configuration.IWhConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.biz.dao.operation.ICargoArrvDelvDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IWHCheckExportDao;
import com.tsb.most.biz.dataitem.operation.PackageJobItem;
import com.tsb.most.biz.dataitem.operation.WHCheckExportItem;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchWHCheckExportParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class WHCheckExport implements IWHCheckExport {
	private IWHCheckExportDao whCheckExportDao;
	private ICargoMasterDao cargoMasterDao;
	private ICargoArrvDelvDao cargoArrvDelvDao;
	private IWhConfigurationDao whConfigurationDao;
	private static String ALL = "*";

	public void setWhCheckExportDao(IWHCheckExportDao whCheckExportDao) {
		this.whCheckExportDao = whCheckExportDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	public void setCargoArrvDelvDao(ICargoArrvDelvDao cargoArrvDelvDao) {
		this.cargoArrvDelvDao = cargoArrvDelvDao;
	}

	public void setWhConfigurationDao(IWhConfigurationDao whConfigurationDao) {
		this.whConfigurationDao = whConfigurationDao;
	}
	////////////////////////////////////////////////////////////////////////
	
	@Override
	public DataItemList selectCargoWarehouseCheckExportItems(SearchWHCheckExportParm parm) throws BizException {
		return whCheckExportDao.selectCargoWarehouseCheckExportItems(parm);
	}
	
	@Override
	public DataItemList checkAmoutLocation(SearchWHCheckExportParm parm) throws BizException {
		return whCheckExportDao.checkAmoutLocation(parm);
	}

	@Override
	public DataItemList updateCargoWarehouseCheckExportItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList response = new DataItemList();
		
		WHCheckExportItem returnItem = new WHCheckExportItem();
		WHCheckExportItem masterItem = (WHCheckExportItem) parm.getUpdateItem();

		DataItemList items = new DataItemList();
		items.add(masterItem);

		WHCheckExportItem waJobItem = null;
		String jobGroupNo = null;

		boolean isBbk = false;
		boolean isDbk = false;

		SearchCargoMasterParm mstParm;
		SearchWhConfigurationParm whParm;
		List listConfirmation = null;

		DataItemList insertItems = new DataItemList();// 1
		DataItemList updateCgMstAmtItems = new DataItemList();// AMT
		DataItemList updateCgMstStatItems = new DataItemList();// ?????

		DataItemList insertJobItems = new DataItemList();

		DataItemList updateLoadingSNItems = new DataItemList();// Sn
		DataItemList insertInvLocItems = new DataItemList();// INV_LOC

		// -
		// allocation

		/*
		 * ==============================================START
		 * =============================================
		 */

		// insertItems.add(item);
		// Gr unit ONE TIME. Direct , indirect
		// (1) InGateCheck -- PortSafty Gate_OT_DT null?? ?? -
		// (Port SaftyCheck)

		// (2) appronChekcer (A) opDelvTpCd = Direct,
		// indirect(TMT_JOB 'GW', 'LF')

		WHCheckExportItem item = (WHCheckExportItem) items.get(0);
		String uuid = UUID.randomUUID().toString();
		item.setNewVersion(uuid);

		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(item.getCgNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setLorryNo(item.getLorryNo());
		mstParm.setCgInOutCd("I");
		// ///////////////////////////////////////////////////////////////////////////////////////////////////////
		
		//ADP: autoDeAllocation:
		if (item.getAutoLocFlag() != null && item.getAutoLocFlag().equals("true")) {

			whParm = new SearchWhConfigurationParm();
			whParm.setCgNo(item.getCgNo());
			whParm.setVslCallId(item.getVslCallId());
			whParm.setShipgNoteNo(item.getShipgNoteNo());

			// ////normal case inv_loc
			listConfirmation = whConfigurationDao.selectInvLocs(whParm).getCollection();

			if (item.getLocCount() != 0 && listConfirmation.size() > 0 && "true".equals(item.getAutoNorLocFlag())) {
				if (item.getLocCount() == 1) {// One Cell
					oneAutoLoc(listConfirmation, item, "G");
				}
			}
		}

		jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);

		if (item.getLoadCnclMode() != null || item.getLoadCnclMode() != "") {
			// item.setLoadCnclMode()
			if (item.getDmgQty() > 0) {
				item.setDmgYn("Y");
			} else {
				item.setDmgYn("N");
			}
		}

		/* C1 : Direct TMT_CG_MST insert/update */
		if (item.getOpDelvTpCd().equals("D")) {
			/* C1.1 : Update TMT_CG_MST */
			if (cargoMasterDao.selectIsCargoMst(mstParm)) {
				item.setStat("LD");
				if (item.getFnlOpeYn().equals("Y")) {
					updateLoadingSNItems.add(item);// endItem
				}
				updateCgMstStatItems.add(item);// stat, job, date
				if (item.getCgTpCd().equals("BBK") && !(item.getLoadMt() == 0 && item.getLoadQty() == 0)) {
					updateCgMstAmtItems.add(item);// TMT_CG_MST
				} else if (((item.getCgTpCd().equals("DBK") || item.getCgTpCd().equals("DBN")
						|| item.getCgTpCd().equals("DBE")) && item.getLoadMt() > 0)) {
					updateCgMstAmtItems.add(item);// TMT_CG_MST
				}
			} else { /* C1.2 : Insert TMT_CG_MST */
				item.setStat("LD");// statCd
				if (item.getFnlOpeYn().equals("Y")) {
					updateLoadingSNItems.add(item);// Only endItem
				}
				insertItems.add(item);
			}
			/* C2 : InDirect TMT_CG_MST update */
		} else {// TMT_MST, TMT_JOB, TMT_INV_LOC gr in all shipging
			if (cargoMasterDao.selectIsCargoMst(mstParm)) {// exist is
				// update
				item.setStat("LD");
				updateCgMstStatItems.add(item);// stat, job,
				// Loadingdate
			}

		}

		/* C4.1 Normal Case For BBK */
		if ((item.getCgTpCd().equals("BBK") && !(item.getLoadMt() == 0 && item.getLoadQty() == 0))) {

			// Insert Job Items For Normal
			/*waJobItem = (WHCheckExportItem) item.clone();
			waJobItem.setJobPurpCd("WA");
			waJobItem.setJobTpCd("LD");
			waJobItem.setStat("COM");
			waJobItem.setDmgYn("N");
			waJobItem.setShuYn("N");
			waJobItem.setToLocId(item.getLocId());
			waJobItem.setJobCoCd("G");
			waJobItem.setLoadMt(item.getLoadMt());
			waJobItem.setLoadM3(item.getLoadM3());
			waJobItem.setLoadQty(item.getLoadQty());*/
			

			// CASE of WA:LD inventory location - de-Allocation
			// -------Start WA/LD
			ArrayList<WhConfigurationItem> invLocItems = (ArrayList<WhConfigurationItem>) item.getWhConfigurationItems();
			WHCheckExportItem cargoInvLocItem;
			if (invLocItems.size() > 0) {
				for (int j = 0; j < invLocItems.size(); j++) {
					//Job:
					waJobItem = (WHCheckExportItem) item.clone();
					waJobItem.setJobPurpCd("WA");
					waJobItem.setJobTpCd("LD");
					waJobItem.setStat("COM");
					waJobItem.setDmgYn("N");
					waJobItem.setShuYn("N");
					waJobItem.setToLocId(item.getLocId());
					waJobItem.setJobCoCd("G");
					
					cargoInvLocItem = (WHCheckExportItem) waJobItem.clone();
					WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
					if (whconfItem.getWhTpCd() == null || whconfItem.getWhTpCd() == ""
							|| whconfItem.getWhTpCd().equals("G") && !whconfItem.getWhTpCd().equals("S")
									&& !whconfItem.getWhTpCd().equals("D")) {
						cargoInvLocItem.setCgNo(whconfItem.getCgNo());
						cargoInvLocItem.setLocArea(waJobItem.getLocId());
						cargoInvLocItem.setLocId(whconfItem.getLocId());
						cargoInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
						cargoInvLocItem.setLocWgt(whconfItem.getWgt());
						cargoInvLocItem.setLocMsrmt(whconfItem.getMsrmt());
						cargoInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
						cargoInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());   //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
						if (cargoInvLocItem.getWhTpCd() == null || cargoInvLocItem.getWhTpCd().equals("")) {
							cargoInvLocItem.setWhTpCd("G");
						}
						cargoInvLocItem.setDmgYn("N");
						cargoInvLocItem.setShuYn("N");
						cargoInvLocItem.setRhdlYn("N");
						
						waJobItem.setCgNo(cargoInvLocItem.getCgNo());//real CargoNo
						waJobItem.setLoadMt(cargoInvLocItem.getLocWgt());
						waJobItem.setLoadM3(cargoInvLocItem.getLocMsrmt());
						waJobItem.setLoadQty(cargoInvLocItem.getLocQty());
						
						insertInvLocItems.add(cargoInvLocItem);
						insertJobItems.add(waJobItem);
					}
				}
			}
			
		} else if ((item.getCgTpCd().equals("DBK") || item.getCgTpCd().equals("DBN")/* C4.2 Normal Case for DBK */
				|| item.getCgTpCd().equals("DBE")) && item.getLoadMt() > 0) {

			/* C4.2 Normal Case for DBK */
			/* C4.2.1 WA Insert Job Item (Normal Case) */
			/*waJobItem = (WHCheckExportItem) item.clone();
			waJobItem.setJobPurpCd("WA");
			waJobItem.setJobTpCd("LD");
			waJobItem.setStat("COM");
			waJobItem.setDmgYn("N");
			waJobItem.setShuYn("N");
			waJobItem.setToLocId(item.getLocId());
			waJobItem.setJobCoCd("G");
			waJobItem.setLoadMt(item.getLoadMt());
			waJobItem.setLoadM3(item.getLoadM3());
			waJobItem.setLoadQty(item.getLoadQty());*/
			

			// CASE of WA:LD inventory location - de-Allocation
			// -------Start WA/LD
			/* C4.2.3 Insert invLocItems Normal Case */
			// 202010 commented: ArrayList invLocItems = (ArrayList)
			// waJobItem.getCollection();
			ArrayList<WhConfigurationItem> invLocItems = (ArrayList<WhConfigurationItem>) item.getWhConfigurationItems();
			WHCheckExportItem cargoInvLocItem;
			if (invLocItems.size() > 0) {
				for (int j = 0; j < invLocItems.size(); j++) {
					waJobItem = (WHCheckExportItem) item.clone();
					waJobItem.setJobPurpCd("WA");
					waJobItem.setJobTpCd("LD");
					waJobItem.setStat("COM");
					waJobItem.setDmgYn("N");
					waJobItem.setShuYn("N");
					waJobItem.setToLocId(item.getLocId());
					waJobItem.setJobCoCd("G");
					waJobItem.setLoadMt(item.getLoadMt());
					waJobItem.setLoadM3(item.getLoadM3());
					waJobItem.setLoadQty(item.getLoadQty());
					
					cargoInvLocItem = (WHCheckExportItem) waJobItem.clone();
					WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
					
					if (whconfItem.getWhTpCd() == null || whconfItem.getWhTpCd() == ""
							|| whconfItem.getWhTpCd().equals("G") && !whconfItem.getWhTpCd().equals("S")
									&& !whconfItem.getWhTpCd().equals("D")) {
						cargoInvLocItem.setLocArea(waJobItem.getLocId());
						cargoInvLocItem.setLocId(whconfItem.getLocId());
						cargoInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
						cargoInvLocItem.setLocWgt(whconfItem.getWgt());
						cargoInvLocItem.setLocMsrmt(whconfItem.getMsrmt());
						cargoInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
						cargoInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());   //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
						if (cargoInvLocItem.getWhTpCd() == null || cargoInvLocItem.getWhTpCd().equals("")) {
							cargoInvLocItem.setWhTpCd("G");
						}
						cargoInvLocItem.setDmgYn("N");
						cargoInvLocItem.setShuYn("N");
						cargoInvLocItem.setRhdlYn("N");
						
						waJobItem.setCgNo(cargoInvLocItem.getCgNo());//real CargoNo
						waJobItem.setLoadMt(cargoInvLocItem.getLocWgt());
						waJobItem.setLoadM3(cargoInvLocItem.getLocMsrmt());
						waJobItem.setLoadQty(cargoInvLocItem.getLocQty());
						
						insertInvLocItems.add(cargoInvLocItem);
						insertJobItems.add(waJobItem);
					}
				}
			}
			// //////////////////////////////////////////////////-------End
			// WA/LD Normal
		} //Liquid
		 else if (item.getCgTpCd().equals("LQD") && item.getLoadM3() > 0) {

				/* C4.2 Normal Case for LQD */
				/* C4.2.1 WA Insert Job Item (Normal Case) */
				waJobItem = (WHCheckExportItem) item.clone();
				waJobItem.setJobPurpCd("WA");
				waJobItem.setJobTpCd("LD");
				waJobItem.setStat("COM");
				waJobItem.setDmgYn("N");
				waJobItem.setShuYn("N");
				waJobItem.setToLocId(item.getLocId());
				waJobItem.setJobCoCd("G");
				waJobItem.setLoadMt(item.getLoadMt());
				waJobItem.setLoadM3(item.getLoadM3());
				waJobItem.setLoadQty(item.getLoadQty());
				insertJobItems.add(waJobItem);

				// CASE of WA:LD inventory location - de-Allocation
				// -------Start WA/LD
				/* C4.2.3 Insert invLocItems Normal Case */
				// 202010 commented: ArrayList invLocItems = (ArrayList)
				// waJobItem.getCollection();
				ArrayList<WhConfigurationItem> invLocItems = (ArrayList<WhConfigurationItem>) waJobItem
						.getWhConfigurationItems();
				WHCheckExportItem cargoInvLocItem;
				if (invLocItems.size() > 0) {
					for (int j = 0; j < invLocItems.size(); j++) {
						cargoInvLocItem = (WHCheckExportItem) waJobItem.clone();
						WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
						if (whconfItem.getWhTpCd() == null || whconfItem.getWhTpCd() == ""
								|| whconfItem.getWhTpCd().equals("G") && !whconfItem.getWhTpCd().equals("S")
										&& !whconfItem.getWhTpCd().equals("D")) {
							cargoInvLocItem.setLocArea(waJobItem.getLocId());
							cargoInvLocItem.setLocId(whconfItem.getLocId());
							cargoInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
							cargoInvLocItem.setLocWgt(whconfItem.getWgt());
							cargoInvLocItem.setLocMsrmt(whconfItem.getMsrmt());
							cargoInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
							cargoInvLocItem.setWhLocTpCd(whconfItem.getLocTpCd());   //LOC_TP_CD in TMT_LOC_DEF and WH_LOC_TP in TMT_INV_LOC
							if (cargoInvLocItem.getWhTpCd() == null || cargoInvLocItem.getWhTpCd().equals("")) {
								cargoInvLocItem.setWhTpCd("G");
							}
							cargoInvLocItem.setDmgYn("N");
							cargoInvLocItem.setShuYn("N");
							cargoInvLocItem.setRhdlYn("N");
							insertInvLocItems.add(cargoInvLocItem);
						}
					}
				}
				// //////////////////////////////////////////////////-------End
				// WA/LD Normal
			} 
		/*
		 * 4. whDmg case - job(5) WV:LD whDmgMt - inv location De-allocation
		 */
		/* C4.3 Insert Job Damage Item, Warehouse Damage Item */
		isBbk = false;
		isDbk = false;
		if (item.getCgTpCd().equals("BBK") && !(item.getWhDmgMt() == 0 && item.getWhDmgQty() == 0)
				&& item.getWhDmgLocId() != null && !item.getWhDmgLocId().equals("")) {
			isBbk = true;
		}
		if ((item.getCgTpCd().equals("DBN") || item.getCgTpCd().equals("DBE") || item.getCgTpCd().equals("DBK"))
				&& item.getWhDmgMt() > 0 && item.getWhDmgLocId() != null && !item.getWhDmgLocId().equals("")) {
			isDbk = true;
		}
	

		if (item.getDmgRhdlMode() == null) {
			item.setDmgRhdlMode("");
		}

		if (updateCgMstStatItems.size() > 0) {
			// date
			whCheckExportDao.updateCgWarehouseCheckStateItems(updateCgMstStatItems);
		}

		if (insertJobItems.size() > 0) {//!!!!!!!!!!!! 
			whCheckExportDao.insertJobItems(insertJobItems);
			whCheckExportDao.updateCargoMasterStatus(insertJobItems); // call PRC_CG_MST_UPDATE_STAT
			whCheckExportDao.updateCargoMasterInfo(insertJobItems); // call PRC_CG_MST_UPDEL_AMT
		}
		
		if (insertInvLocItems.size() > 0) { // INV_LOC
			whCheckExportDao.insertCargoInvLocationItems(insertInvLocItems); // minus Amt *
		}
		
		//Package Items
		insertPakageJobItems(insertJobItems);
				
		response.add(insertJobItems);
		return response;
	}
	
	
	/*Private Method*/
	private void oneAutoLoc(List listConfirmation, WHCheckExportItem item, String flag) {

		ArrayList autoitemList = new ArrayList();
		String whName = null;
		String firstName = null;
		String minName = null;
		String whGPreName = null;
		String whDPreName = null;
		String whSPreName = null;
		int countG = 0;
		int countS = 0;
		int countD = 0;
		if (listConfirmation.size() < 0) {
			return;
		}
		if (item.getCgTpCd().equals("BBK")) {
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);
				} // end for
				item.setLocId(whGPreName);

			} else if (item.getLoadM3() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				} // end for
				item.setLocId(whGPreName);
			} else if (item.getLoadQty() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				} // end for
				item.setLocId(whGPreName);
			}
		} else {// DBK
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals("G")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0, firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName.lastIndexOf("-") + 1);
					}
					whGPreName = whName + "(" + minName + "," + ++countG + ")";

					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item.getLoadQty()));
					}

					autoitemList.add(autowhconfItem);
				} // end for
				item.setLocId(whGPreName);
			}

			if (flag.equals("G")) {
				item.setWhConfigurationItems(autoitemList);
			}
		}
	}
	
	private void insertPakageJobItems(DataItemList insertJobItems) throws BizException  {
		//Package Items
		DataItemList insertPkgItems = new DataItemList();
    	WHCheckExportItem item = (WHCheckExportItem)insertJobItems.get(0);
        ArrayList pkgLists = (ArrayList) item.getPackageItems();
        if (pkgLists.size() > 0) {
        	  for (int j = 0; j < pkgLists.size(); j++) {
                  PackageJobItem pkgItem = (PackageJobItem) pkgLists.get(j);
                  pkgItem.setJobNo(item.getJobNo());
                  pkgItem.setJobTpCd(item.getJobTpCd());
                  pkgItem.setJobPurpCd(item.getJobPurpCd());
                  pkgItem.setOpeClassCd(item.getCatgCd());
                  pkgItem.setVslCd(item.getVslCd());
                  pkgItem.setCallSeq(item.getCallSeq());
                  pkgItem.setCallYear(item.getCallYear());
                  pkgItem.setPkgTpCd(item.getPkgTpCd());
                  pkgItem.setUserId(item.getUserId());
                  
                  insertPkgItems.add(pkgItem);
        	  }
        	  
        	  if(insertPkgItems.size() > 0) {
        		  whCheckExportDao.insertPackageJobItems(insertPkgItems);
        	  }
        }
	}

	@Override
	public DataItemList selectWHExportForROROItems(SearchWHCheckExportParm parm) throws BizException {
		return whCheckExportDao.selectWHExportForROROItems(parm);
	}

	@Override
	public DataItemList updateCheckExporForROROtItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList response = new DataItemList();
		
		WHCheckExportItem returnItem = new WHCheckExportItem();
		WHCheckExportItem masterItem = (WHCheckExportItem) parm.getUpdateItem();

		DataItemList items = new DataItemList();
		items.add(masterItem);

		WHCheckExportItem waJobItem = null;
		String jobGroupNo = null;
		SearchCargoMasterParm mstParm;
		SearchWhConfigurationParm whParm;
		List listConfirmation = null;

		DataItemList insertItems = new DataItemList();// 1
		DataItemList updateCgMstAmtItems = new DataItemList();// AMT
		DataItemList updateCgMstStatItems = new DataItemList();

		DataItemList insertJobItems = new DataItemList();
		// insertItems.add(item);
		// Gr unit ONE TIME. Direct , indirect
		// (1) InGateCheck -- PortSafty Gate_OT_DT null?? ?? -
		// (Port SaftyCheck)

		// (2) appronChekcer (A) opDelvTpCd = Direct,
		// indirect(TMT_JOB 'GW', 'LF')

		WHCheckExportItem item = (WHCheckExportItem) items.get(0);
		String uuid = UUID.randomUUID().toString();
		item.setNewVersion(uuid);

		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(item.getGrNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setCgInOutCd("I");
		
		
		jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);
		item.setStat("LD");
		
		if (!(item.getLoadMt() == 0 && item.getLoadQty() == 0)) {
			item.setCgNo(item.getGrNo());
			// Insert Job Items For Normal
			waJobItem = (WHCheckExportItem) item.clone();
			waJobItem.setJobPurpCd("WA");
			waJobItem.setJobTpCd("LD");
			waJobItem.setStat("COM");
			waJobItem.setDmgYn("N");
			waJobItem.setShuYn("N");
			waJobItem.setToLocId(item.getLocId());
			waJobItem.setJobCoCd("G");
			waJobItem.setLoadMt(item.getLoadMt());
			waJobItem.setLoadM3(item.getLoadM3());
			waJobItem.setLoadQty(item.getLoadQty());
			if (item.getDriverId() != null  && !item.getDriverId().equals("")) {// set mode of operation
				waJobItem.setTsptTpCd("OH");
            }
			insertJobItems.add(waJobItem);
		} 
		
		if(item.getUnitNo() != null && !item.getUnitNo().equals("")) {
			item.setUnitNo(makeInValue(item.getUnitNo()));
        }
		/* C1 : Direct TMT_RORO_MST insert/update */
		if (item.getOpDelvTpCd().equals("D")) {
			if (whCheckExportDao.selectIsROROMst(mstParm)) {
				updateCgMstStatItems.add(item);// stat, job, date
				if (!(item.getLoadMt() == 0 &&  item.getLoadMt() > 0)) {
					updateCgMstAmtItems.add(item);
				}
			} else {
				insertItems.add(item);
			}
		} else {// TMT_MST, TMT_JOB
			if (whCheckExportDao.selectIsROROMst(mstParm)) {
				updateCgMstStatItems.add(item);// stat, job,
			}

		}
		
		if (updateCgMstStatItems.size() > 0) {
			UpdateItemsBizParm updBizParm = new UpdateItemsBizParm();
	        updBizParm.addUpdateItem(updateCgMstStatItems);
			// date
			whCheckExportDao.updateCgWarehouseCheckofRORO(updBizParm);
		}

		if (insertJobItems.size() > 0) {
			whCheckExportDao.insertJobItems(insertJobItems);
		}
		
		//Package Items
		insertPakageJobItems(insertJobItems);
				
		response.add(insertJobItems);
		return response;
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
}
