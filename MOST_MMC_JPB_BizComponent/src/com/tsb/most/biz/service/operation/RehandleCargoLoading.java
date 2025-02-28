package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.configuration.IWhConfigurationDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.configuration.SearchWhConfigurationParm;
import com.tsb.most.biz.dao.operation.ICargoLoadingDao;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoLoadingItem;
import com.tsb.most.biz.dataitem.operation.CargoMasterItem;
import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RehandleCargoLoading extends MOSTBaseService implements IRehandleCargoLoading {
	private ICargoLoadingDao cargoLoadingDao;
	private IWhConfigurationDao whConfigurationDao;
	private ICargoMasterDao cargoMasterDao;
	
	public void setCargoLoadingDao(ICargoLoadingDao cargoLoadingDao) {
		this.cargoLoadingDao = cargoLoadingDao;
	}

	public void setWhConfigurationDao(IWhConfigurationDao whConfigurationDao) {
		this.whConfigurationDao = whConfigurationDao;
	}
	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}
	/////////////////////////////////////////
	
	public DataItemList selectCargoRhdLoadingList(SearchCargoLoadingParm parm) throws BizException {
		return cargoLoadingDao.selectCargoRhdLoadingList(parm);
	}
	
	public DataItemList updateCargoRhdlLoadingItem(UpdateItemsBizParm parm) throws BizException {
		DataItemList masterItem = parm.getUpdateItems();
		
		CargoLoadingItem jobItem = null;
        CargoLoadingItem jobAvItem = null;
        CargoLoadingItem invJobItem = null;
        CargoLoadingItem jobMstDmgItem = null;
        CargoMasterItem mstItem = null;

        String jobGroupNo = null;

        boolean isBbk = false;
        boolean isDbk = false;

        
        SearchCargoMasterParm mstParm;
		SearchWhConfigurationParm whParm;
		List listConfirmation = null;

		DataItemList insertItems = new DataItemList();// 1
		DataItemList updateCgMstAmtItems = new DataItemList();// AMT
		
		// //2
		DataItemList updateCgLdCancelItems = new DataItemList();// Loading
		// Cancel
		DataItemList updateCgLoadedRePackItems = new DataItemList();// Loading
		// Repack
		DataItemList updateCgLoadedDamageItems = new DataItemList();// Loading
		// Damage
		DataItemList updateCgMstStatItems = new DataItemList();
		DataItemList updateCgMstDmgItems = new DataItemList();// StatDMG//5

		DataItemList insertBalItems = new DataItemList();// BAL
		DataItemList updatetBalItems = new DataItemList();// BAL
		// update
		DataItemList insertJobItems = new DataItemList();
		DataItemList updateJobItems = new DataItemList();

		DataItemList insertRhdlItems = new DataItemList();// TMT_RHDL_CG

		DataItemList insertArrvDelvItems = new DataItemList();// Direct
		DataItemList updateArrvDelvItems = new DataItemList();// Dirert

		DataItemList insertGateInItems = new DataItemList();// add
		DataItemList updateGateInItems = new DataItemList();// add
		DataItemList updateGateInLorryItems = new DataItemList();// add
		DataItemList updateGateInOnlyLorryItems = new DataItemList();// add

		DataItemList updateGPArrvDelvItems = new DataItemList();// Arrv_devl
		// gataoutDt;
		DataItemList updateLoadingSNItems = new DataItemList();// Sn
		DataItemList insertInvLocItems = new DataItemList();// INV_LOC
		// -de-allocation
		DataItemList insertAllocationItems = new DataItemList();// INV_LOC
		
		ArrayList<CargoLoadingItem> listChildItems = new ArrayList();
		CargoLoadingItem item = (CargoLoadingItem) masterItem.get(0);
		String uuid = UUID.randomUUID().toString();
		item.setNewVersion(uuid);
		
		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(item.getCgNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setLorryNo(item.getLorryId());
		mstParm.setCgInOutCd("I");
		
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
				} else {// mutil Cell
					mutiAutoLoc(listConfirmation, item, "G");
				}
			}
			// //// Damage case inv_loc
			listConfirmation = whConfigurationDao.selectDmgInvLocs(whParm).getCollection();

			if (item.getLocDmgCount() != 0 && listConfirmation.size() > 0 && "true".equals(item.getAutoDmgLocFlag())) {
				if (item.getLocDmgCount() == 1) {// One Cell
					oneAutoLoc(listConfirmation, item, "D");
				} else {// mutil Cell//More one cell locationAMt =
					// Load and dmg and shut Amt - Location??
					mutiAutoLoc(listConfirmation, item, "D");
				}
			}
			// /// spare case inv_loc
			listConfirmation = whConfigurationDao.selectSprInvLocs(whParm).getCollection();

			if (item.getLocSprCount() != 0 && listConfirmation.size() > 0 && "true".equals(item.getAutoSprLocFlag())) {
				if (item.getLocSprCount() == 1) {// One Cell
					oneAutoLoc(listConfirmation, item, "S");
				} else {// mutil Cell//More one cell locationAMt =
					// Load and dmg and shut Amt - Location??
					mutiAutoLoc(listConfirmation, item, "S");
				}
			}

		}else {
			ArrayList<WhConfigurationItem> listCollection = new ArrayList();

            // amount setting
            int sumQty = 0;
            double sumMt = 0d;
            double sumM3 = 0d;

            // location seting
            int countWh = 0;
            String whName = null;
            String firstName = null;
            String minName = null;
            String whPreName = null;
            
            if(item.getWhConfigurationItems()!= null){
            	WhConfigurationItem whItem = item.getWhConfigurationItems().get(0);
            	String sourceSpCoCd = "";
                String targetSpCoCd = "";
                
                if (item.getSpCaCoCd() != null  && item.getSpCaCoCd() != "") {
                    sourceSpCoCd = item.getSpCaCoCd();
                }
                
                if (whItem.getSpCaCoCd() != null  && whItem.getSpCaCoCd() != "") {
                	targetSpCoCd = whItem.getSpCaCoCd();
                }
                if(item.getRhdlNo().equals(whItem.getRhdlNo())) {
                	listCollection.add(whItem);
                	sumQty += Integer.parseInt(whItem.getPkgQty());
                	sumMt += whItem.getWgt();
                	sumM3 += whItem.getMsrmt();
                	
                	if(countWh == 0) {
                		firstName= whItem.getLocId();
                		whName = firstName.substring(0, firstName.lastIndexOf("-"));
                		minName = firstName.substring(firstName.lastIndexOf("-") + 1);
                	}
                	
                	whPreName = whName + "(" + minName + ","  + ++countWh + ")";
                }
            }
            
            if(listCollection.size() > 0) {
            	item.setLoadQty(sumQty);
            	item.setLoadM3(sumM3);
            	item.setLoadMt(sumMt);
            	item.setToLocId(whPreName);
            	item.setLocId(whPreName);
            	
//            	rhhandleLoadingReload(item);
            	listChildItems.add(item);
            }
            item.setItems(listChildItems);
		}
		
		jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);
		if (cargoMasterDao.selectIsCargoMst(mstParm)) {
            item.setStat(CodeConstant.MT_JOBTP_LD);
            updateCgMstStatItems.add(item);// stat, job, date
            if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)  && !(item.getLoadMt() == 0 && item.getLoadQty() == 0)) {
                updateCgMstAmtItems.add(item);// TMT_CG_MST ,amt
            } else if (((item.getCgTpCd().equals("DBK") || item.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN) || item.getCgTpCd().equals("DBE")) && item.getLoadMt() > 0)) {
                updateCgMstAmtItems.add(item);// TMT_CG_MST ,amt
            }
        } else { // not exist is insert
        	item.setStat(CodeConstant.MT_JOBTP_LD);// statCd
            insertItems.add(item);
        }
		
		
		if ((item.getRePkgTpCd() != null && !item.getRePkgTpCd().equals("")) || item.getChkLoadDmgYn() == true) {
            // / Re-Package Amt Exist - Mst update last
            if (item.getRePkgTpCd() != null && !item.getRePkgTpCd().equals("")) {
                CargoLoadingItem repkgItem = (CargoLoadingItem) item.clone();
                updateCgLoadedRePackItems.add(repkgItem);
            }
            // / Loaded Damge Amt Exist - Mst Update last
            if (item.getChkLoadDmgYn()) {
                CargoLoadingItem loadedDmgItem = (CargoLoadingItem) item.clone();
                updateCgLoadedDamageItems.add(loadedDmgItem);
            }
        }
		
		for (int ichild = 0; ichild < item.getItems().size(); ichild++) {
            CargoLoadingItem cgItem = (CargoLoadingItem) item.getItems().get(ichild);

            cgItem.setJobGroup(jobGroupNo);
            /*
             * Rehandling loading 1.JOB WA : LD ==> original Gr,
             * Shipingnote, vsl_call, add rhdlNo AV : LD ==> next
             * Gr, Next Shipping note, next vslCallId add rhdlNo 2.
             * TMT_inv Case of WA ; minus invlocation 3. TMT_CG_MST
             * loading time
             */
            // ////1. TMT_JOB
            if ((cgItem.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && !(cgItem.getLoadMt() == 0 && cgItem.getLoadQty() == 0))) {
                // WA
                jobItem = (CargoLoadingItem) cgItem.clone();
                jobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_WA);
                jobItem.setJobTpCd(CodeConstant.MT_JOBTP_LD);
                jobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
                jobItem.setToLocId(cgItem.getLocId());
                jobItem.setLoadMt(cgItem.getLoadMt());
                jobItem.setLoadM3(cgItem.getLoadM3());
                jobItem.setLoadQty(cgItem.getLoadQty());
                jobItem.setGrNo(cgItem.getGrNo());
                jobItem.setCgNo(cgItem.getOrgCgNo());
                jobItem.setCatgCd(cgItem.getOrgOpeClassCd());
                jobItem.setVslCallId(cgItem.getOrgVslCallId());
                
                jobItem.setWhConfigurationItems(cgItem.getWhConfigurationItems());
                
                if (cgItem.getGrNo() != null) {
                    jobItem.setShipgNoteNo(cgItem.getOrgBlSn());
                }
                insertJobItems.add(jobItem);

                // AV
                jobAvItem = (CargoLoadingItem) cgItem.clone();
                jobAvItem.setJobPurpCd(CodeConstant.MT_JOBPURP_AV);
                jobAvItem.setJobTpCd(CodeConstant.MT_JOBTP_LD);
                jobAvItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
                jobAvItem.setLoadMt(cgItem.getLoadMt());
                jobAvItem.setLoadM3(cgItem.getLoadM3());
                jobAvItem.setLoadQty(cgItem.getLoadQty());
                jobAvItem.setGrNo(cgItem.getCgNo());
                jobAvItem.setCgNo(cgItem.getCgNo());
                jobAvItem.setVslCallId(cgItem.getVslCallId());
                jobAvItem.setShipgNoteNo(cgItem.getShipgNoteNo());
                insertJobItems.add(jobAvItem);
            } else if ((cgItem.getCgTpCd().equals("DBK") || cgItem.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN) || cgItem.getCgTpCd().equals("DBE")) 
            		&& cgItem.getLoadMt() > 0) {
                // WA
                jobItem = (CargoLoadingItem) cgItem.clone();
                jobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_WA);
                jobItem.setJobTpCd(CodeConstant.MT_JOBTP_LD);
                jobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
                jobItem.setToLocId(cgItem.getLocId());
                jobItem.setLoadMt(cgItem.getLoadMt());
                jobItem.setLoadM3(cgItem.getLoadM3());
                jobItem.setLoadQty(cgItem.getLoadQty());
                jobItem.setGrNo(cgItem.getGrNo());
                jobItem.setCgNo(cgItem.getOrgCgNo());
                jobItem.setCatgCd(cgItem.getOrgOpeClassCd());
                jobItem.setVslCallId(cgItem.getOrgVslCallId());
                
                jobItem.setWhConfigurationItems(cgItem.getWhConfigurationItems());
                
                if (cgItem.getGrNo() != null) {
                    jobItem.setShipgNoteNo(cgItem.getOrgBlSn());
                }
                insertJobItems.add(jobItem);

                // AV
                jobAvItem = (CargoLoadingItem) cgItem.clone();
                jobAvItem.setJobPurpCd(CodeConstant.MT_JOBPURP_AV);
                jobAvItem.setJobTpCd(CodeConstant.MT_JOBTP_LD);
                jobAvItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
                jobAvItem.setLoadMt(cgItem.getLoadMt());
                jobAvItem.setLoadM3(cgItem.getLoadM3());
                jobAvItem.setLoadQty(cgItem.getLoadQty());
                jobAvItem.setGrNo(cgItem.getCgNo());
                jobAvItem.setCgNo(cgItem.getCgNo());
                jobAvItem.setVslCallId(cgItem.getVslCallId());
                jobAvItem.setShipgNoteNo(cgItem.getShipgNoteNo());
                insertJobItems.add(jobAvItem);
            }
            // ///////////////////end JOB
            // Inventory location
            if(jobItem != null) {
            	if (jobItem.getWhConfigurationItems().size() > 0) {
                    ArrayList invLocItems = (ArrayList) jobItem.getWhConfigurationItems();
                    CargoLoadingItem cargoInvLocItem;
                    if (invLocItems.size() > 0) {
                        // WA:LD
                        for (int j = 0; j < invLocItems.size(); j++) {
                            cargoInvLocItem = (CargoLoadingItem) jobItem.clone();
                            WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems.get(j);
                            String sourceSpCoCd = "";
                            String targetSpCoCd = "";

                            if (cargoInvLocItem.getSpCaCoCd() != null
                                    && cargoInvLocItem.getSpCaCoCd() != "") {
                                sourceSpCoCd = cargoInvLocItem.getSpCaCoCd();
                            }

                            if (whconfItem.getSpCaCoCd() != null
                                    && whconfItem.getSpCaCoCd() != "") {
                                targetSpCoCd = whconfItem.getSpCaCoCd();
                            }

                            if (jobItem.getRhdlNo().equals(whconfItem.getRhdlNo())) {
                                cargoInvLocItem.setLocArea(jobItem.getLocId());
                                cargoInvLocItem.setLocId(whconfItem.getLocId());
                                cargoInvLocItem.setLocQty(Integer.parseInt(whconfItem.getPkgQty()));
                                cargoInvLocItem.setLocWgt(whconfItem.getWgt());
                                cargoInvLocItem.setLocMsrmt(whconfItem.getMsrmt());
                                cargoInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
                                cargoInvLocItem.setSpCaCoCd(whconfItem.getSpCaCoCd());
                                insertInvLocItems.add(cargoInvLocItem);
                            }
                        }
                    }
                    // WA/LD
                }
            }
            
            if (insertJobItems.size() > 0) {
                if (insertItems != null && insertItems.size() > 0) {
                	cargoLoadingDao.insertCargoLoadingItems(insertItems);
                }
                if (updateCgMstAmtItems.size() > 0) {
                	cargoLoadingDao.updateCgLdAmtItems(updateCgMstAmtItems);
                }
                if (updateCgMstStatItems.size() > 0) {
                    // job, date
                	cargoLoadingDao.updateCgLdStateItems(updateCgMstStatItems);
                }
                if (updateCgLoadedRePackItems.size() > 0) { // Loading RePack
                	cargoLoadingDao.updateCgLoadedRePackItems(updateCgLoadedRePackItems);
                }
                if (updateCgLoadedDamageItems.size() > 0) { // Loading Damage
                	cargoLoadingDao.updateCgLoadedDamageItems(updateCgLoadedDamageItems);
                }
                if (insertJobItems.size() > 0) {
                	cargoLoadingDao.insertJobItems(insertJobItems);
                }
                if (insertInvLocItems.size() > 0) { // INV_LOC
                	cargoLoadingDao.insertCargoInvLocationItems(insertInvLocItems); // minus Amt
                }
                if (insertJobItems.size() > 0) {
                	cargoLoadingDao.updateCargoMasterStatus(insertJobItems);
                	cargoLoadingDao.updateCargoMasterInfo(insertJobItems);// updateStaus
                }
            } 
        }
      return masterItem;
	}
	
	private void oneAutoLoc(List listConfirmation, CargoLoadingItem item,
			String flag) {

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
		if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)) {
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);
				}// end for
				item.setLocId(whGPreName);

			} else if (item.getLoadM3() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setLocId(whGPreName);
			} else if (item.getLoadQty() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					whGPreName = whName + "(" + minName + "," + ++countG + ")";
					if (item.getLoadQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setLocId(whGPreName);
			}

			// Spare Case
			if (item.getSprMt() > 0 && flag.equals("S")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			} else if (item.getSprM3() > 0 && flag.equals("S")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			} else if (item.getSprQty() > 0 && flag.equals("S")) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			}

			// Dmg Case
			if (item.getWhDmgMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
					}

					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			} else if (item.getWhDmgM3() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgM3() == item.getM3()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			} else if (item.getWhDmgQty() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgQty() == item.getQty()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
					}
					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			}

			if (flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals("S")) {
				item.setSprItems(autoitemList);
			} else if (flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				item.setWhDmgItems(autoitemList);
			}
		} else {// DBK
			WhConfigurationItem autowhconfItem;

			// Normal Case
			if (item.getLoadMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whGPreName = whName + "(" + minName + "," + ++countG + ")";

					if (item.getLoadMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getLoadMt());
						autowhconfItem.setMsrmt(item.getLoadM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getLoadQty()));
					}

					autoitemList.add(autowhconfItem);
				}// end for
				item.setLocId(whGPreName);
			}

			// Spare Case
			if (item.getSprMt() > 0 && flag.equals("S")) {

				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}

					whSPreName = whName + "(" + minName + "," + ++countS + ")";

					if (item.getSprMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getSprMt());
						autowhconfItem.setMsrmt(item.getSprM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getSprQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
					}

					autoitemList.add(autowhconfItem);

				}// end for
				item.setSprLocId(whSPreName);
			}
			// Damage Case
			if (item.getWhDmgMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				for (int j = 0; j < listConfirmation.size(); j++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					whDPreName = whName + "(" + minName + "," + ++countD + ")";

					if (item.getWhDmgMt() == item.getMt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);

					} else {
						autowhconfItem = new WhConfigurationItem();
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();
						autowhconfItem.setWgt(item.getWhDmgMt());
						autowhconfItem.setMsrmt(item.getWhDmgM3());
						autowhconfItem.setPkgQty(String.valueOf(item
								.getWhDmgQty()));
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
					}

					autoitemList.add(autowhconfItem);

				}// end for
				item.setWhDmgLocId(whDPreName);
			}
			if (flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals("S")) {
				item.setSprItems(autoitemList);
			} else if (flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				item.setWhDmgItems(autoitemList);
			}

		}
	}
	
	private void mutiAutoLoc(List listConfirmation, CargoLoadingItem item,
			String flag) {
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

		if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)) {
			WhConfigurationItem autowhconfItem = new WhConfigurationItem();
			if (item.getLoadMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {

							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			} else if (item.getLoadM3() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;

				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumM3 <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					// }//EMN FOR
					if (0 != whconfItem.getMsrmt()
							&& whconfItem.getMsrmt() != whconfItem
									.getDumpMsrmt()) {
						// whGPreName = whName + "(" + minName + "," + ++countG
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumM3 > autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							// sumM3 = interSumM3;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumM3 == autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumM3 = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumM3 = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			} else if (item.getLoadQty() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getLoadQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumQty <= 0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					if (!"0".equals(whconfItem.getPkgQty())
							&& !whconfItem.getPkgQty().equals(
									whconfItem.getDumpPkgQty())) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumQty > Integer.parseInt(autowhconfItem
								.getPkgQty())) {

							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumQty == Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumQty = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumQty = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			}
			if (item.getSprMt() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whSPreName = whName + "(" + minName + "," + ++countS
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							// double interSumMt = 0;
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);

			} else if (item.getSprM3() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumM3 <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (0 != whconfItem.getMsrmt()
							&& whconfItem.getMsrmt() != whconfItem
									.getDumpMsrmt()) {
						// whSPreName = whName + "(" + minName + "," + ++countS
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumM3 > autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumM3 == autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumM3 = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumM3 = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);
			} else if (item.getSprQty() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumQty <= 0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (!"0".equals(whconfItem.getPkgQty())
							&& !whconfItem.getPkgQty().equals(
									whconfItem.getDumpPkgQty())) {
						// whSPreName = whName + "(" + minName + "," + ++countS
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumQty > autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumQty == Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumQty = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumQty = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_NORMAL);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);
			}
			if (item.getWhDmgMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size() || sumMT < 0; j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());

							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);

			} else if (item.getWhDmgM3() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumM3 <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (0 != whconfItem.getMsrmt()
							&& whconfItem.getMsrmt() != whconfItem
									.getDumpMsrmt()) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumM3 > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumM3 == autowhconfItem.getMsrmt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumM3 = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);
			} else if (item.getWhDmgQty() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumQty <= 0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (!"0".equals(whconfItem.getPkgQty())
							&& !whconfItem.getPkgQty().equals(
									whconfItem.getDumpPkgQty())) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumQty > Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumQty == Integer.parseInt(autowhconfItem
								.getPkgQty())) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumQty = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumQty = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);
			}
			if (flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals("S")) {
				item.setSprItems(autoitemList);
			} else if (flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				item.setWhDmgItems(autoitemList);
			}
		} else {// DBK
			WhConfigurationItem autowhconfItem = new WhConfigurationItem();

			if (item.getLoadMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				double sumMT = item.getLoadMt();// Summary AMT
				double sumM3 = item.getLoadM3();// Summary AMT
				int sumQty = item.getQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}

					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whGPreName = whName + "(" + minName + "," + ++countG
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whGPreName = whName + "(" + minName + ","
									+ ++countG + ")";
						}
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setLocId(whGPreName);
			}
			if (item.getSprMt() > 0 && flag.equals("S")) {
				double sumMT = item.getSprMt();// Summary AMT
				double sumM3 = item.getSprM3();// Summary AMT
				int sumQty = item.getSprQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id

						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);

					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whSPreName = whName + "(" + minName + ","
									+ ++countS + ")";

						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_SHUTOUT);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setSprLocId(whSPreName);

			}
			if (item.getWhDmgMt() > 0 && flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				double sumMT = item.getWhDmgMt();// Summary AMT
				double sumM3 = item.getWhDmgM3();// Summary AMT
				int sumQty = item.getWhDmgQty();// Summary AMT

				double locMt = 0;
				double locM3 = 0;
				int locQty = 0;
				for (int j = 0; j < listConfirmation.size(); j++) {
					if (sumMT <= 0.0) {
						break;
					}
					WhConfigurationItem whconfItem = (WhConfigurationItem) listConfirmation
							.get(j);
					if (j == 0) {
						firstName = whconfItem.getLocId();// inv_loc.loc_id
						whName = firstName.substring(0,
								firstName.lastIndexOf("-"));
						minName = firstName.substring(firstName
								.lastIndexOf("-") + 1);
					}
					if (0 != whconfItem.getWgt()
							&& whconfItem.getWgt() != whconfItem.getDumpWgt()) {
						// whDPreName = whName + "(" + minName + "," + ++countD
						// + ")";
						autowhconfItem = (WhConfigurationItem) whconfItem
								.clone();

						if (sumMT > autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = ((sumMT * 1000) - (autowhconfItem.getWgt() * 1000)) / 1000d;
							sumM3 = ((sumM3 * 1000) - (autowhconfItem
									.getMsrmt() * 1000)) / 1000d;
							sumQty = sumQty
									- Integer.parseInt(autowhconfItem
											.getPkgQty());

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else if (sumMT == autowhconfItem.getWgt()) {
							whconfItem.setDumpWgt(autowhconfItem.getWgt());
							whconfItem.setDumpMsrmt(autowhconfItem.getMsrmt());
							whconfItem
									.setDumpPkgQty(autowhconfItem.getPkgQty());
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						} else {
							locMt = ((autowhconfItem.getWgt() * 1000) - (sumMT * 1000)) / 1000d;
							locM3 = ((autowhconfItem.getMsrmt() * 1000) - (sumM3 * 1000)) / 1000d;
							locQty = Integer.parseInt(autowhconfItem
									.getPkgQty()) - sumQty;

							whconfItem.setDumpWgt(locMt);
							whconfItem.setDumpMsrmt(locM3);
							whconfItem.setDumpPkgQty(String.valueOf(locQty));

							autowhconfItem.setWgt(sumMT);
							autowhconfItem.setMsrmt(sumM3);
							autowhconfItem.setPkgQty(String.valueOf(sumQty));
							sumMT = 0;

							whDPreName = whName + "(" + minName + ","
									+ ++countD + ")";
						}
						autowhconfItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
						autoitemList.add(autowhconfItem);
					}
				}// end for
				item.setWhDmgLocId(whDPreName);
			}
			if (flag.equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
				item.setWhConfigurationItems(autoitemList);
			} else if (flag.equals(CodeConstant.INVLOC_WH_TP_SHUTOUT)) {
				item.setSprItems(autoitemList);
			} else if (flag.equals(CodeConstant.INVLOC_WH_TP_DAMAGE)) {
				item.setWhDmgItems(autoitemList);
			}
		}
	}
	
	private void spareCargoCase(DataItemList insertJobItems, DataItemList insertInvLocItems, DataItemList insertAllocationItems, CargoLoadingItem item) {
		boolean isBbk;
		boolean isDbk;
		isBbk = false;
		isDbk = false;
		if (item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)
				&& !(item.getSprMt() == 0 && item.getSprQty() == 0)
				&& item.getSprLocId() != null && !item.getSprLocId().equals("")) {
			isBbk = true;
		}
		if ((item.getCgTpCd().equals(CodeConstant.MT_CGTP_DBN) || item.getCgTpCd().equals("DBE") || item
				.getCgTpCd().equals("DBK"))
				&& item.getSprMt() > 0
				&& item.getSprLocId() != null && !item.getSprLocId().equals("")) {
			isDbk = true;
		}
		if (isBbk || isDbk) {// Change Condition
			CargoLoadingItem sprJobItem = (CargoLoadingItem) item.clone();
			sprJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_WW);
			sprJobItem.setJobTpCd(CodeConstant.MT_JOBTP_RC);
			sprJobItem.setRcCoCd(CodeConstant.MT_RCCOCD_CC);// -inventory GD : + inventory
			sprJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
			sprJobItem.setDmgYn("N");
			sprJobItem.setShuYn("N");
			sprJobItem.setRhdlYn("N");
			sprJobItem.setToLocId(item.getSprLocId());
			sprJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
			sprJobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
			sprJobItem.setLoadMt(item.getSprMt());
			sprJobItem.setLoadM3(item.getSprM3());
			sprJobItem.setLoadQty(item.getSprQty());
			// insertJobItems.add(sprJobItem);

			DataItemList jobItems = new DataItemList();
			HashMap sprMap = new HashMap();
			for (int cnt = 0; cnt < sprJobItem.getSprItems().size(); cnt++) {
				WhConfigurationItem hsitem = (WhConfigurationItem) sprJobItem
						.getSprItems().get(cnt);

				sprMap.put(hsitem.getCgNo(), hsitem);
			}

			Set set = sprMap.keySet();
			Object[] hmKeys = set.toArray();
			for (int j = 0; j < hmKeys.length; j++) {
				ArrayList invLocItems = (ArrayList) sprJobItem.getSprItems();
				CargoLoadingItem newJobItem = (CargoLoadingItem) sprJobItem
						.clone();
				newJobItem.setSprItems(new ArrayList());
				ArrayList list = new ArrayList();
				double msrmtSum = 0;
				double wgtSum = 0;
				int pkgSum = 0;
				for (int count = 0; count < invLocItems.size(); count++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems
							.get(count);
					if ((hmKeys[j]).equals(whconfItem.getCgNo())) {
						msrmtSum = +whconfItem.getMsrmt();
						wgtSum = +whconfItem.getWgt();
						pkgSum = +Integer.parseInt(whconfItem.getPkgQty());
						list.add(whconfItem);
						newJobItem.setLoadMt(wgtSum);
						newJobItem.setLoadM3(msrmtSum);
						newJobItem.setLoadQty(pkgSum);
						newJobItem.setCgNo(whconfItem.getCgNo());
						newJobItem.setGrNo(whconfItem.getCgNo());
					}
				}
				if (list.size() > 0) {
					newJobItem.setSprItems(list);
					jobItems.add(newJobItem);
				}

			}

			for (int dCount = 0; dCount < jobItems.size(); dCount++) {
				CargoLoadingItem sprItem = (CargoLoadingItem) jobItems
						.get(dCount);

				insertJobItems.add(sprItem);

				ArrayList invLocItems = (ArrayList) sprItem.getSprItems();
				CargoLoadingItem cargoInvLocItem;
				if (invLocItems.size() > 0) {
					// WV:LD
					for (int j = 0; j < invLocItems.size(); j++) {
						cargoInvLocItem = (CargoLoadingItem) sprItem.clone();
						WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems
								.get(j);
						if (whconfItem.getWhTpCd().equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
							cargoInvLocItem.setLocArea(sprItem.getSprLocId());
							cargoInvLocItem.setLocId(whconfItem.getLocId());
							cargoInvLocItem.setLocQty(Integer
									.parseInt(whconfItem.getPkgQty()));
							cargoInvLocItem.setLocWgt(whconfItem.getWgt());
							cargoInvLocItem.setLocMsrmt(whconfItem.getMsrmt());
							cargoInvLocItem.setWhTpCd(whconfItem.getWhTpCd());
							cargoInvLocItem.setDmgYn("N");
							cargoInvLocItem.setShuYn("N");
							cargoInvLocItem.setRhdlYn("N");
							insertInvLocItems.add(cargoInvLocItem);
						}// end if

					}// end for
				}// END IF
			}// end DataItems For loop
		}

		if (isBbk || isDbk) {// Change Condition --> Normal To Dmage --
			CargoLoadingItem sprJobItem = (CargoLoadingItem) item.clone();
			sprJobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_WW);
			sprJobItem.setJobTpCd(CodeConstant.MT_JOBTP_RC);
			sprJobItem.setRcCoCd(CodeConstant.MT_RCCOCD_GD);// -inventory GD : + inventory
			sprJobItem.setStat(CodeConstant.MT_JOBSTATCD_COM);
			sprJobItem.setDmgYn("Y");
			sprJobItem.setShuYn("N");
			sprJobItem.setRhdlYn("N");
			sprJobItem.setToLocId(item.getSprLocId());
			sprJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
			sprJobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
			sprJobItem.setLoadMt(item.getSprMt());
			sprJobItem.setLoadM3(item.getSprM3());
			sprJobItem.setLoadQty(item.getSprQty());

			DataItemList jobItems = new DataItemList();
			HashMap sprMap = new HashMap();
			for (int cnt = 0; cnt < sprJobItem.getSprItems().size(); cnt++) {
				WhConfigurationItem hsitem = (WhConfigurationItem) sprJobItem
						.getSprItems().get(cnt);

				sprMap.put(hsitem.getCgNo(), hsitem);
			}

			Set set = sprMap.keySet();
			Object[] hmKeys = set.toArray();
			for (int j = 0; j < hmKeys.length; j++) {
				ArrayList invLocItems = (ArrayList) sprJobItem.getSprItems();
				CargoLoadingItem newJobItem = (CargoLoadingItem) sprJobItem
						.clone();
				newJobItem.setSprItems(new ArrayList());
				ArrayList list = new ArrayList();
				double msrmtSum = 0;
				double wgtSum = 0;
				int pkgSum = 0;
				for (int count = 0; count < invLocItems.size(); count++) {
					WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems
							.get(count);
					if ((hmKeys[j]).equals(whconfItem.getCgNo())) {
						msrmtSum = +whconfItem.getMsrmt();
						wgtSum = +whconfItem.getWgt();
						pkgSum = +Integer.parseInt(whconfItem.getPkgQty());
						list.add(whconfItem);
						newJobItem.setLoadMt(wgtSum);
						newJobItem.setLoadM3(msrmtSum);
						newJobItem.setLoadQty(pkgSum);
						newJobItem.setCgNo(whconfItem.getCgNo());
						newJobItem.setGrNo(whconfItem.getCgNo());
					}
				}
				if (list.size() > 0) {
					newJobItem.setSprItems(list);
					jobItems.add(newJobItem);
				}
			}

			for (int dCount = 0; dCount < jobItems.size(); dCount++) {
				CargoLoadingItem sprItem = (CargoLoadingItem) jobItems
						.get(dCount);

				insertJobItems.add(sprItem);

				ArrayList invLocItems = (ArrayList) sprItem.getSprItems();
				CargoLoadingItem cargoInvLocItem;
				if (invLocItems.size() > 0) {
					// WV:LD
					for (int j = 0; j < invLocItems.size(); j++) {
						cargoInvLocItem = (CargoLoadingItem) sprItem.clone();
						WhConfigurationItem whconfItem = (WhConfigurationItem) invLocItems
								.get(j);
						if (whconfItem.getWhTpCd().equals(CodeConstant.INVLOC_WH_TP_NORMAL)) {
							cargoInvLocItem.setLocArea(sprItem.getSprLocId());
							cargoInvLocItem.setLocId(whconfItem.getLocId());
							cargoInvLocItem.setLocQty(Integer
									.parseInt(whconfItem.getPkgQty()));
							cargoInvLocItem.setLocWgt(whconfItem.getWgt());
							cargoInvLocItem.setLocMsrmt(whconfItem.getMsrmt());
							cargoInvLocItem.setWhTpCd(CodeConstant.INVLOC_WH_TP_DAMAGE);
							cargoInvLocItem.setDmgYn("Y");
							cargoInvLocItem.setShuYn("N");
							cargoInvLocItem.setRhdlYn("N");
							insertAllocationItems.add(cargoInvLocItem);
						}// end if

					}// end for
				}// END IF
			}// end DataItems For loop
		}
	}
	
}
