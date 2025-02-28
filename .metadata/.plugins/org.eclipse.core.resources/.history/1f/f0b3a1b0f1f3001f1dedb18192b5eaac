package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dataitem.configuration.WhConfigurationItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.ICargoMovementDao;
import com.tsb.most.biz.dataitem.operation.CargoMovementItem;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchCargoMovementParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;


public class CargoMovement extends MOSTBaseService implements ICargoMovement {
	private ICodeMasterDao codeMasterDao;
	private ICargoMovementDao cargoMovementDao;
	private ICargoMasterDao cargoMasterDao;
	
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	public void setCargoMovementDao(ICargoMovementDao cargoMovementDao) {
		this.cargoMovementDao = cargoMovementDao;
	}
	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}
	
	public DataItemList selectCargoMovementList(SearchCargoMovementParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
    	CargoMovementItem returnItem = new CargoMovementItem();

        if (parm.getSearchType().equals("initComboList")) {
            returnItem.setItems((ArrayList<CargoMovementItem>)cargoMovementDao.selectMVWHComboList(parm).getCollection());
            SearchCodeMasterParm partyCode = new SearchCodeMasterParm();

            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_JOBTP); // event type
            returnItem.setJobTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_CATGTP); // event type
            returnItem.setCargoTypeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
            
            DataItemList returnItems = new DataItemList();
            returnItems.add(returnItem);
            return returnItems;
        
        } else {
        	return cargoMovementDao.selectCargoMovementList(parm);
        }
	}
	
	public DataItemList selectCargoMovement(SearchCargoMovementParm parm) throws BizException {
        CargoMovementItem returnItem = new CargoMovementItem();
        //SearchShiftGroupDefParm shfParm = new SearchShiftGroupDefParm();

        if (parm.getSearchType().equals("IM")) {
            returnItem.setItems((ArrayList<CargoMovementItem>)cargoMovementDao.selectCargoMVLoc(parm).getCollection());

            //shfParm.setUseYn("Y");
            //shfParm.setShftMethCd("Standard");
            //returnItem.setShiftList(shiftGroupDefDao.getShiftGroupDefShiftMegaList(shfParm).getCollection());
        } else if (parm.getSearchType().equals("EX")) {
            returnItem.setItems((ArrayList<CargoMovementItem>)cargoMovementDao.selectCargoMVLoc(parm).getCollection());

            //shfParm.setUseYn("Y");
            //shfParm.setShftMethCd("Standard");
            //returnItem.setShiftList(shiftGroupDefDao.getShiftGroupDefShiftMegaList(shfParm).getCollection());
        }
        
        DataItemList itemList = new DataItemList();
        itemList.add(returnItem);
        return itemList;
    }
	
	public void updateCargoMovementItems(UpdateItemsBizParm parm) throws BizException {
		CargoMovementItem masterItem = (CargoMovementItem) parm.getUpdateItem();
		DataItemList items = new DataItemList();

		items.add(masterItem);

		CargoMovementItem mvItem = null;
		SearchCargoMasterParm mstParm;
		String jobGroupNo = null;

		DataItemList insertItems = new DataItemList();
		DataItemList insertInvLocItems = new DataItemList();
		DataItemList insertMinusInvLocItems = new DataItemList();
		
		
		/*
		 * Start Process:
		 */

		CargoMovementItem item = (CargoMovementItem) items.get(0);
		SearchCargoMovementParm cgMovementParm = new SearchCargoMovementParm();
		
		cgMovementParm.setVslCallId(item.getVslCallId());
		cgMovementParm.setBlNo(item.getBlNo());
		cgMovementParm.setShipgNoteNo(item.getShipgNoteNo());
		cgMovementParm.setLocId(item.getFmLocId());
		
		DataItemList invResult = cargoMovementDao.selectInvLocList(cgMovementParm);
		if(invResult.getCollection() == null || invResult.getCollection().size() == 0) {
			throw new BizException ("rhdl_cg_no_orgInvLoc");
		}
		
		List<CargoMovementItem> invLocList = (ArrayList<CargoMovementItem>)invResult.getCollection();
		
		CargoMovementItem loopItem = (CargoMovementItem)item.clone();
		int pkgQty = loopItem.getPkgQty();
		double msrmt = loopItem.getMsrmt();
		double wgt = loopItem.getWgt();
		
        for (CargoMovementItem cargoMovementItem : invLocList) {
        	boolean flag = false;
        	CargoMovementItem invLocItem = (CargoMovementItem)cargoMovementItem.clone();
        	
        	if(wgt <= invLocItem.getWgt()) {
        		flag = true;
        		
        		loopItem.setCgNo(invLocItem.getCgNo());
        		loopItem.setPkgQty(pkgQty);
        		loopItem.setWgt(wgt);
        		loopItem.setMsrmt(msrmt);
        		loopItem.setFmPkgQty(pkgQty);
        		loopItem.setFmWgt(wgt);
        		loopItem.setFmMsrmt(msrmt);
        	}else {
        		loopItem.setCgNo(invLocItem.getCgNo());
        		loopItem.setPkgQty(invLocItem.getPkgQty());
        		loopItem.setWgt(invLocItem.getWgt());
        		loopItem.setMsrmt(invLocItem.getMsrmt());
        		loopItem.setFmPkgQty(invLocItem.getPkgQty());
        		loopItem.setFmWgt(invLocItem.getWgt());
        		loopItem.setFmMsrmt(invLocItem.getMsrmt());
        		
        		pkgQty -= invLocItem.getPkgQty();
        		wgt -= invLocItem.getWgt();
        		msrmt -= invLocItem.getMsrmt();
        	}
        	
        	for (int j = 0; j < loopItem.getWhItems().size(); j++) {
    			loopItem.getWhItems().get(j).setPkgQty(Integer.toString(loopItem.getPkgQty()));
    			loopItem.getWhItems().get(j).setWgt(loopItem.getWgt());
    			loopItem.getWhItems().get(j).setMsrmt(loopItem.getMsrmt());
    		}
        	
        	mstParm = new SearchCargoMasterParm();
        	mstParm.setCgNo(item.getCgNo());
        	mstParm.setVslCallId(item.getVslCallId());
        	jobGroupNo = cargoMasterDao.selectJobGroupNo(mstParm);
        	item.setJobGroup(jobGroupNo);
        	int gerQty = 0;
        	double gerMt = 0;
        	double gerM3 = 0;
        	
        	int sumQty = 0;
        	double sumMt = 0;
        	double sumM3 = 0;
        	// invLocItem = (CargoMovementItem)item.clone();
        	CargoMovementItem addLocItem = null;
        	CargoMovementItem minusItem = null;
        	// TMT_CG_MST UPDATE, TMT_JOB LO JOB_TYPE IA and IE INSERT
        	// //TMT_CG_MST
        	/***********************************************************
        	 * 1. GENERAL Location
        	 **********************************************************/
        	// //TMT_JOB 1 job, tmt_inv_loc 2 (movment allocation and
        	// deloaton (from))
        	/** *03. Start job *********************************** */
        	mvItem = (CargoMovementItem) loopItem.clone();
        	// IA or IE
        	// jobItem.setJobTpCd("IA"); //IA (w vs w/h ) OR IE (w/h vs
        	// other w/h)
        	mvItem.setJobTpCd("MV");
        	mvItem.setJobPurpCd("WW");
        	mvItem.setStatCd("COM");
        	mvItem.setFnlDelvYn("N");
        	
        	if (mvItem.getFmLoc() != null && mvItem.getToLoc() != null && !mvItem.getFmLoc().equals("")
        			&& !mvItem.getToLoc().equals("")) {
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setFmLocId(jobItem.getFmLoc());
        		jobItem.setToLocId(jobItem.getToLoc());
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("N");
        		jobItem.setJobCoCd("G");
        		jobItem.setRhdlMode(null);
        		jobItem.setSpCaCoCd(null);
        		for (int j = 0; j < mvItem.getWhItems().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getWhItems().get(j);
        			if (CodeConstant.INVLOC_WH_TP_NORMAL.equals(whconfItem.getWhTpCd())) {
        				// allocation
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        		
        	}
        	
        	/***********************************************************
        	 * 2. Damage Location
        	 **********************************************************/
        	if (mvItem.getFmDmgLoc() != null && mvItem.getToDmgLoc() != null && !mvItem.getFmDmgLoc().equals("")
        			&& !mvItem.getToDmgLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setJobCoCd("D");
        		jobItem.setRhdlMode(null);
        		jobItem.setSpCaCoCd(null);
        		jobItem.setFmLocId(jobItem.getFmDmgLoc());
        		jobItem.setToLocId(jobItem.getToDmgLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) { // selection
        			// G,
        			// D, S
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	}
        	
        	/***********************************************************
        	 * 3. Shut out Location
        	 **********************************************************/
        	if (mvItem.getFmShuLoc() != null && mvItem.getToShuLoc() != null && !mvItem.getFmShuLoc().equals("")
        			&& !mvItem.getToShuLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setJobCoCd("S");
        		jobItem.setRhdlMode(null);
        		jobItem.setFmLocId(jobItem.getFmShuLoc());
        		jobItem.setToLocId(jobItem.getToShuLoc());
        		jobItem.setSpCaCoCd(null);
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	}
        	
        	/***********************************************************
        	 * 4. Damage Rehandling return to shipper Location
        	 **********************************************************/
        	if (mvItem.getFmDmgRhdlRLoc() != null && mvItem.getToDmgRhdlRLoc() != null
        			&& !mvItem.getFmDmgRhdlRLoc().equals("") && !mvItem.getToDmgRhdlRLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
        		jobItem.setJobCoCd("S");
        		jobItem.setFmLocId(jobItem.getFmDmgRhdlRLoc());
        		jobItem.setToLocId(jobItem.getToDmgRhdlRLoc());
        		jobItem.setSpCaCoCd(null);
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_RHDLMODE_R.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	}
        	
        	/***********************************************************
        	 * 4-2. Damage Rehandling Change Vessel Location
        	 **********************************************************/
        	if (mvItem.getFmDmgRhdlCLoc() != null && mvItem.getToDmgRhdlCLoc() != null
        			&& !mvItem.getFmDmgRhdlCLoc().equals("") && !mvItem.getToDmgRhdlCLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
        		jobItem.setJobCoCd("D");
        		jobItem.setFmLocId(jobItem.getFmDmgRhdlCLoc());
        		jobItem.setToLocId(jobItem.getToDmgRhdlCLoc());
        		jobItem.setSpCaCoCd(null);
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_RHDLMODE_C.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	}
        	/***********************************************************
        	 * 5. Shut out Rehandling return to shipper Location
        	 **********************************************************/
        	if (mvItem.getFmShuRhdlRLoc() != null && mvItem.getToShuRhdlRLoc() != null
        			&& !mvItem.getFmShuRhdlRLoc().equals("") && !mvItem.getToShuRhdlRLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
        		jobItem.setJobCoCd("S");
        		jobItem.setFmLocId(jobItem.getFmShuRhdlRLoc());
        		jobItem.setToLocId(jobItem.getToShuRhdlRLoc());
        		jobItem.setSpCaCoCd(null);
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_RHDLMODE_R.equals(whconfItem.getRhdlMode())) {// only
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	}
        	
        	/***********************************************************
        	 * 6. Shut out Rhehandling Change to Vessel Location
        	 **********************************************************/
        	if (mvItem.getFmShuRhdlCLoc() != null && mvItem.getToShuRhdlCLoc() != null
        			&& !mvItem.getFmShuRhdlCLoc().equals("") && !mvItem.getToShuRhdlCLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
        		jobItem.setJobCoCd("S");
        		jobItem.setFmLocId(jobItem.getFmShuRhdlCLoc());
        		jobItem.setToLocId(jobItem.getToShuRhdlCLoc());
        		jobItem.setSpCaCoCd(null);
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) { // selection
        			// G,
        			// D, S
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_RHDLMODE_C.equals(whconfItem.getRhdlMode())) {// only
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	}
        	
        	/** ********** specail cargo ********* */
        	/***********************************************************
        	 * 7. Normal specatil cargo SPARE
        	 **********************************************************/
        	if (mvItem.getFmSpSLoc() != null && mvItem.getToSpSLoc() != null && !mvItem.getFmSpSLoc().equals("")
        			&& !mvItem.getToSpSLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(null);
        		jobItem.setJobCoCd("G");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
        		jobItem.setFmLocId(jobItem.getFmSpSLoc());
        		jobItem.setToLocId(jobItem.getToSpSLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) { // selection
        			// G,
        			// D, S
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_NORMAL.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_S.equals(whconfItem.getSpCaCoCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {// only
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 7
        	
        	/***********************************************************
        	 * 8. Damage specatil cargo SPARE
        	 **********************************************************/
        	if (mvItem.getFmSpSDmgLoc() != null && mvItem.getToSpSDmgLoc() != null && !mvItem.getFmSpSDmgLoc().equals("")
        			&& !mvItem.getToSpSDmgLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(null);
        		jobItem.setJobCoCd("D");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
        		jobItem.setFmLocId(jobItem.getFmSpSDmgLoc());
        		jobItem.setToLocId(jobItem.getToSpSDmgLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) { // selection
        			// G,
        			// D, S
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_S.equals(whconfItem.getSpCaCoCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {// only
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 8
        	
        	/***********************************************************
        	 * 9. shout out specatil cargo SPARE
        	 **********************************************************/
        	if (mvItem.getFmSpSShuLoc() != null && mvItem.getToSpSShuLoc() != null && !mvItem.getFmSpSShuLoc().equals("")
        			&& !mvItem.getToSpSShuLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(null);
        		jobItem.setJobCoCd("S");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
        		jobItem.setFmLocId(jobItem.getFmSpSShuLoc());
        		jobItem.setToLocId(jobItem.getToSpSShuLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) { // selection
        			// G,
        			// D, S
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_S.equals(whconfItem.getSpCaCoCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 9
        	
        	/***********************************************************
        	 * 10. Dmg specatil cargo rhdl chage vessel SPARE
        	 **********************************************************/
        	if (mvItem.getFmSpSDmgRhdlCLoc() != null && mvItem.getToSpSDmgRhdlCLoc() != null
        			&& !mvItem.getFmSpSDmgRhdlCLoc().equals("") && !mvItem.getToSpSDmgRhdlCLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
        		jobItem.setJobCoCd("D");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
        		jobItem.setFmLocId(jobItem.getFmSpSDmgRhdlCLoc());
        		jobItem.setToLocId(jobItem.getToSpSDmgRhdlCLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) { // selection
        			// G,
        			// D, S
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_S.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_C.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 10
        	
        	/***********************************************************
        	 * 11. Dmg specatil cargo rhdl Return to shipper SPARE
        	 **********************************************************/
        	if (mvItem.getFmSpSDmgRhdlRLoc() != null && mvItem.getToSpSDmgRhdlRLoc() != null
        			&& !mvItem.getFmSpSDmgRhdlRLoc().equals("") && !mvItem.getToSpSDmgRhdlRLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
        		jobItem.setJobCoCd("D");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
        		jobItem.setFmLocId(jobItem.getFmSpSDmgRhdlRLoc());
        		jobItem.setToLocId(jobItem.getToSpSDmgRhdlRLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_R.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 11
        	
        	/***********************************************************
        	 * 12. shu specatil cargo rhdl Return to shipper SPARE
        	 **********************************************************/
        	if (mvItem.getFmSpSShuRhdlRLoc() != null && mvItem.getToSpSShuRhdlRLoc() != null
        			&& !mvItem.getFmSpSShuRhdlRLoc().equals("") && !mvItem.getToSpSShuRhdlRLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
        		jobItem.setJobCoCd("S");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
        		jobItem.setFmLocId(jobItem.getFmSpSShuRhdlRLoc());
        		jobItem.setToLocId(jobItem.getToSpSShuRhdlRLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_S.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_R.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 12
        	
        	/***********************************************************
        	 * 13. shu specatil cargo rhdl change vessel SPARE
        	 **********************************************************/
        	if (mvItem.getFmSpSShuRhdlCLoc() != null && mvItem.getToSpSShuRhdlCLoc() != null
        			&& !mvItem.getFmSpSShuRhdlCLoc().equals("") && !mvItem.getToSpSShuRhdlCLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
        		jobItem.setJobCoCd("S");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_S);
        		jobItem.setFmLocId(jobItem.getFmSpSShuRhdlCLoc());
        		jobItem.setToLocId(jobItem.getToSpSShuRhdlCLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_S.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_C.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 13
        	
        	/***********************************************************
        	 * 14. Normal specatil cargo OVER
        	 **********************************************************/
        	if (mvItem.getFmSpOLoc() != null && mvItem.getToSpOLoc() != null && !mvItem.getFmSpOLoc().equals("")
        			&& !mvItem.getToSpOLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(null);
        		jobItem.setJobCoCd("G");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_O);
        		jobItem.setFmLocId(jobItem.getFmSpOLoc());
        		jobItem.setToLocId(jobItem.getToSpOLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_NORMAL.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_O.equals(whconfItem.getSpCaCoCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 14
        	
        	/***********************************************************
        	 * 15. Damage specatil cargo OVER
        	 **********************************************************/
        	if (mvItem.getFmSpODmgLoc() != null && mvItem.getToSpODmgLoc() != null && !mvItem.getFmSpODmgLoc().equals("")
        			&& !mvItem.getToSpODmgLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(null);
        		jobItem.setJobCoCd("D");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_O);
        		jobItem.setFmLocId(jobItem.getFmSpODmgLoc());
        		jobItem.setToLocId(jobItem.getToSpODmgLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_O.equals(whconfItem.getSpCaCoCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 15
        	
        	/***********************************************************
        	 * 16. shout out specatil cargo OVER
        	 **********************************************************/
        	if (mvItem.getFmSpOShuLoc() != null && mvItem.getToSpOShuLoc() != null && !mvItem.getFmSpOShuLoc().equals("")
        			&& !mvItem.getToSpOShuLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(null);
        		jobItem.setJobCoCd("S");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_O);
        		jobItem.setFmLocId(jobItem.getFmSpOShuLoc());
        		jobItem.setToLocId(jobItem.getToSpOShuLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_O.equals(whconfItem.getSpCaCoCd())
        					&& (whconfItem.getRhdlMode() == null || "".equals(whconfItem.getRhdlMode()))) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 16
        	
        	/***********************************************************
        	 * 17. Dmg specatil cargo rhdl chage vessel OVER
        	 **********************************************************/
        	if (mvItem.getFmSpODmgRhdlCLoc() != null && mvItem.getToSpODmgRhdlCLoc() != null
        			&& !mvItem.getFmSpODmgRhdlCLoc().equals("") && !mvItem.getToSpODmgRhdlCLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
        		jobItem.setJobCoCd("D");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_O);
        		jobItem.setFmLocId(jobItem.getFmSpODmgRhdlCLoc());
        		jobItem.setToLocId(jobItem.getToSpODmgRhdlCLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_O.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_C.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 17
        	
        	/***********************************************************
        	 * 18. Dmg specatil cargo rhdl Return to shipper OVER
        	 **********************************************************/
        	if (mvItem.getFmSpODmgRhdlRLoc() != null && mvItem.getToSpODmgRhdlRLoc() != null
        			&& !mvItem.getFmSpODmgRhdlRLoc().equals("") && !mvItem.getToSpODmgRhdlRLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("Y");
        		jobItem.setShuYn("N");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
        		jobItem.setJobCoCd("D");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_O);
        		jobItem.setFmLocId(jobItem.getFmSpODmgRhdlRLoc());
        		jobItem.setToLocId(jobItem.getToSpODmgRhdlRLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_DAMAGE.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_O.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_R.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 18
        	
        	/***********************************************************
        	 * 19. shu specatil cargo rhdl Return to shipper OVER
        	 **********************************************************/
        	if (mvItem.getFmSpOShuRhdlRLoc() != null && mvItem.getToSpOShuRhdlRLoc() != null
        			&& !mvItem.getFmSpOShuRhdlRLoc().equals("") && !mvItem.getToSpOShuRhdlRLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_R);
        		jobItem.setJobCoCd("S");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_O);
        		jobItem.setFmLocId(jobItem.getFmSpOShuRhdlRLoc());
        		jobItem.setToLocId(jobItem.getToSpOShuRhdlRLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_O.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_R.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 19
        	
        	/***********************************************************
        	 * 20. shu specatil cargo rhdl change vessel OVER
        	 **********************************************************/
        	if (mvItem.getFmSpOShuRhdlCLoc() != null && mvItem.getToSpOShuRhdlCLoc() != null
        			&& !mvItem.getFmSpOShuRhdlCLoc().equals("") && !mvItem.getToSpOShuRhdlCLoc().equals("")) {
        		
        		CargoMovementItem jobItem = (CargoMovementItem) mvItem.clone();
        		jobItem.setDmgYn("N");
        		jobItem.setShuYn("Y");
        		jobItem.setRhdlMode(CodeConstant.MT_RHDLMODE_C);
        		jobItem.setJobCoCd("S");
        		jobItem.setSpCaCoCd(CodeConstant.MT_SPCACOCD_O);
        		jobItem.setFmLocId(jobItem.getFmSpOShuRhdlCLoc());
        		jobItem.setToLocId(jobItem.getToSpOShuRhdlCLoc());
        		
        		sumQty = 0;
        		sumMt = 0;
        		sumM3 = 0;
        		for (int j = 0; j < mvItem.getCollection().size(); j++) {
        			WhConfigurationItem whconfItem = (WhConfigurationItem) mvItem.getCollection().get(j);
        			if (CodeConstant.INVLOC_WH_TP_SHUTOUT.equals(whconfItem.getWhTpCd()) && CodeConstant.MT_SPCACOCD_O.equals(whconfItem.getSpCaCoCd())
        					&& CodeConstant.MT_RHDLMODE_C.equals(whconfItem.getRhdlMode())) {
        				movementInvLoc(insertInvLocItems, insertMinusInvLocItems, jobItem, whconfItem);
        				
        				sumQty = sumQty + Integer.parseInt(whconfItem.getPkgQty());
        				sumMt = sumMt + (whconfItem.getWgt());
        				sumM3 = sumM3 + (whconfItem.getMsrmt());
        				
        			} // End normal if
        			
        		} // End for
        		jobItem.setPkgQty(sumQty);
        		jobItem.setWgt(sumMt);
        		jobItem.setMsrmt(sumM3);
        		
        		insertItems.add(jobItem);
        	} // end 20
        	/** ********** End Specail cargo **** */
        	
        	/*
        	 * End Process:
        	 */
        	        	
        	if(flag == true) {
        		break;
        	}
        }
        
        if (insertItems.size() > 0) {
        	cargoMovementDao.insertCargoMovementJobItems(insertItems);
        }
        if (insertMinusInvLocItems.size() > 0) {       		
        	cargoMovementDao.insertMinusInvLocItems(insertMinusInvLocItems);
        }
        if (insertInvLocItems.size() > 0) {      		
        	cargoMovementDao.insertInvLocItems(insertInvLocItems);
        }
		
		//cargoMovementDao.updateWeightBridge(items);
	}
    
	private void movementInvLoc(DataItemList insertInvLocItems, DataItemList insertMinusInvLocItems, CargoMovementItem jobItem, WhConfigurationItem whconfItem) {
		CargoMovementItem addLocItem;
		CargoMovementItem minusItem;
		addLocItem = (CargoMovementItem) jobItem.clone();
		// de-allocation
		minusItem = (CargoMovementItem) jobItem.clone();

		addLocItem.setFmLocId(whconfItem.getFmLocId());// FROMLOCATION
		addLocItem.setLocId(whconfItem.getToLocId());// to location
		addLocItem.setToLocId(whconfItem.getToLocId());// to location
		addLocItem.setLocQty(whconfItem.getPkgQty());
		addLocItem.setLocWgt(String.valueOf(whconfItem.getWgt()));
		addLocItem.setLocMsrmt(String.valueOf(whconfItem.getMsrmt()));
		addLocItem.setWhTpCd(whconfItem.getWhTpCd());
		addLocItem.setJobCoCd(whconfItem.getWhTpCd());
		addLocItem.setSpCaCoCd(whconfItem.getSpCaCoCd());
		addLocItem.setLocArea(jobItem.getToLocId());
		insertInvLocItems.add(addLocItem);

		minusItem.setLocId(whconfItem.getFmLocId());// to Location = current
		minusItem.setLocQty(whconfItem.getPkgQty());
		minusItem.setLocWgt(String.valueOf(whconfItem.getWgt()));
		minusItem.setLocMsrmt(String.valueOf(whconfItem.getMsrmt()));
		minusItem.setWhTpCd(whconfItem.getWhTpCd());
		minusItem.setJobCoCd(whconfItem.getWhTpCd());
		minusItem.setSpCaCoCd(whconfItem.getSpCaCoCd());
		minusItem.setLocArea(jobItem.getFmLocId());
		insertMinusInvLocItems.add(minusItem);
	}
}
