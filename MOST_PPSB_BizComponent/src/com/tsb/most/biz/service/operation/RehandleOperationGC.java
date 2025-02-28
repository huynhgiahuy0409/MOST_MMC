package com.tsb.most.biz.service.operation;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IRehandleOperationGCDao;
import com.tsb.most.biz.dao.operation.IRehandlingOfGCDao;
import com.tsb.most.biz.dataitem.operation.RehandlingOfGCItem;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchRehandleOperationGCParm;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RehandleOperationGC extends MOSTBaseService implements IRehandleOperationGC {
	private ICodeMasterDao codeMasterDao;
	private IRehandleOperationGCDao rehandleOperationGCDao;
	private IRehandlingOfGCDao rehandlingOfGCDao;
	private ICargoMasterDao cargoMasterDao;
	
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}

	public void setRehandleOperationGCDao(IRehandleOperationGCDao rehandleOperationGCDao) {
		this.rehandleOperationGCDao = rehandleOperationGCDao;
	}
	
	public void setRehandlingOfGCDao(IRehandlingOfGCDao rehandlingOfGCDao) {
		this.rehandlingOfGCDao = rehandlingOfGCDao;
	}

	///////////////////////////////////////////////////////////////////////
	public DataItemList selectCargoRhdlOperation(SearchRehandleOperationGCParm parm) throws BizException {
		return rehandleOperationGCDao.selectCargoRhdlOperation(parm);
    }
	
	public DataItemList selectCargoRehandlingComboList(SearchRehandlingOfGCParm parm) throws BizException {
        RehandlingOfGCItem returnItem = new RehandlingOfGCItem();
        DataItemList returnItems = new DataItemList();
        if (parm.getSearchType().equals("initComboList")) {
            SearchCodeMasterParm partyCode = new SearchCodeMasterParm();

            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_CATGTP); // event type
            if ("RHDL".equals(parm.getScreanNm())) {
                partyCode.setCol1("G");
            }
            returnItem.setCategoryList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

            partyCode = new SearchCodeMasterParm();
            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_RHDLMODE); // event type
            if (parm.getCol3() != null && parm.getCol3() != "") {
                partyCode.setCol3(parm.getCol3());
            }

            returnItem.setRehandlingModeList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

            partyCode = new SearchCodeMasterParm();
            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_CGCOCD); // event type
            returnItem.setCargoConditionList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

            partyCode = new SearchCodeMasterParm();
            partyCode.setLcd(CodeConstant.LCD_MOST);
            partyCode.setMcd(CodeConstant.MCD_MT_SPCACOCD); // event type
            returnItem.setSpecialCgList(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

            returnItems.add(returnItem);
        }
        
        return returnItems;
    }
	
	public DataItemList selectCargoRehandlingSnBlComboList(SearchRehandlingOfGCParm parm) throws BizException {
        RehandlingOfGCItem returnItem = new RehandlingOfGCItem();
        SearchCargoMasterParm mstParm = new SearchCargoMasterParm();

        DataItemList returnItems = new DataItemList();
        if ("S".equals(parm.getOpeClassCd())) {
        	mstParm.setOpType("cgRh");
        	mstParm.setVslCallId("STRG");
            mstParm.setArrvDtFm(parm.getArrvDtFm());
            mstParm.setArrvDtTo(parm.getArrvDtTo());
        } else {
        	mstParm.setVslCallId(parm.getVslCallId());
        	mstParm.setArrvDtFm(parm.getArrvDtFm());
            mstParm.setArrvDtTo(parm.getArrvDtTo());;
        }
        if (parm.getSearchType().equals("sn/bl")) {
            returnItem.setSnList(cargoMasterDao.selectShippingNoteComboList(mstParm).getCollection());
            returnItem.setBlList(cargoMasterDao.selectBLComboList(mstParm).getCollection());
            returnItem.setBlSnList(rehandlingOfGCDao.selectCargoRhdlBlSnCombo(parm).getCollection());
            
            
            returnItems.add(returnItem);
        } else if (parm.getSearchType().equals("storage/sn/bl")) {
        	return rehandlingOfGCDao.selectCargoRhdlStorageSnCombo(parm);
        } else if (parm.getSearchType().equals("rhdlop/sn/bl")) {
        	return rehandlingOfGCDao.selectCargoRhdlOpBlSnCombo(parm);
        } else if (parm.getSearchType().equals("nxSn")) {
        	return cargoMasterDao.selectShippingNoteComboList(mstParm);
        }

        return returnItems;
    }
}
