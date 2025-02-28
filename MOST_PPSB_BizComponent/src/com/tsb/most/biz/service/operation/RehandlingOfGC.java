package com.tsb.most.biz.service.operation;

import java.util.UUID;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.biz.dao.operation.ICargoMasterDao;
import com.tsb.most.biz.dao.operation.IRehandlingOfGCDao;
import com.tsb.most.biz.dataitem.operation.RehandlingOfGCItem;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfGCParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RehandlingOfGC extends MOSTBaseService implements IRehandlingOfGC {
	private ICodeMasterDao codeMasterDao;
	private IRehandlingOfGCDao rehandlingOfGCDao;
	private ICargoMasterDao cargoMasterDao;
	
	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}
	public void setRehandlingOfGCDao(IRehandlingOfGCDao rehandlingOfGCDao) {
		this.rehandlingOfGCDao = rehandlingOfGCDao;
	}
	public void setCargoMasterDao(ICargoMasterDao cargoMasterDao) {
		this.cargoMasterDao = cargoMasterDao;
	}
	
	///////////////////////////////////////////////////////////////////////
	public DataItemList selectCargoRehandlingList(SearchRehandlingOfGCParm parm) throws BizException {
		return rehandlingOfGCDao.selectCargoRehandlingList(parm);
	}
	
	public DataItemList selectCargoRehandlingPopupList(SearchRehandlingOfGCParm parm) throws BizException {
        return rehandlingOfGCDao.selectCargoRehandlingPopupList(parm);
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
	
	public DataItemList selectRhdlShippingNoteComboList(SearchRehandlingOfGCParm parm) throws BizException {
    	return rehandlingOfGCDao.selectRhdlShippingNoteComboList(parm);
    }
	
	public DataItemList selectRhdlGrNoComboList(SearchRehandlingOfGCParm parm) throws BizException {
    	return rehandlingOfGCDao.selectRhdlGrNoComboList(parm);
    }
	
	public DataItemList updateCargoRehandlingItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList masterItem = parm.getUpdateItems();
    	InsertItemsBizParm insertItems = new InsertItemsBizParm();
		UpdateItemsBizParm updateItems = new UpdateItemsBizParm();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();

        SearchRehandlingOfGCParm chkParm = null;
        String rhdlGroupNo = null;
        for (int i = 0; i < masterItem.size(); i++) {
            RehandlingOfGCItem item = (RehandlingOfGCItem) masterItem.get(i);
            String uuid = UUID.randomUUID().toString();
            item.setNewVersion(uuid);
            if (i == 0) {
                chkParm = new SearchRehandlingOfGCParm();
                chkParm.setVslCallId(item.getVslCallId());
                chkParm.setOrgRefNo(item.getOrgRefNo());
                rhdlGroupNo = rehandlingOfGCDao.selectCargoRhdlGroupNo(chkParm);
            }
            if(item.getItems().get(0).getWorkingStatus() != null && item.getItems().get(0).getWorkingStatus().equals(DAOProcessType.DELETE)) {
            	for (int j = 0; j < item.getItems().size(); j++) {
            		RehandlingOfGCItem ditem = (RehandlingOfGCItem) item.getItems().get(j);
            		deleteItems.addDeleteItem(ditem);
            	}
            }else {
                insertItems.addInsertItem(item);
            }
            item.setRhdlGroupNo(rhdlGroupNo);
        }
        if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
        	rehandlingOfGCDao.insertCargoRehandlingItems(insertItems);
        }
        if (deleteItems.getDeleteItems() != null && deleteItems.getDeleteItems().size() > 0) {
        	rehandlingOfGCDao.deleteCargoRehandlingItems(deleteItems);
        }
        return masterItem;
    }
}
