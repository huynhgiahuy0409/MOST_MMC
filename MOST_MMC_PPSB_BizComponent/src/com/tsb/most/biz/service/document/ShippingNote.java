package com.tsb.most.biz.service.document;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.component.fileupload.IFileUpload;
import com.tsb.most.basebiz.dao.administrator.ICompanyRegisterDao;
import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.fileupload.SearchFileUploadParm;
import com.tsb.most.biz.dao.document.IDGDeclarationDao;
import com.tsb.most.biz.dao.document.IShippingNoteDao;
import com.tsb.most.biz.dataitem.document.DGDeclarationItem;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.dataitem.document.TerminalHoldReleaseControlItem;
import com.tsb.most.biz.parm.document.SearchDGDeclarationParm;
import com.tsb.most.biz.parm.document.SearchManifestParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.data.util.StringUtil;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ShippingNote extends MOSTBaseService implements IShippingNote {
	private IShippingNoteDao shippingNoteDao;
	private ICompanyRegisterDao companyRegisterDao;
	private IFileUpload fileUpload;
	private IDGDeclarationDao dgDeclarationDao;

	public void setShippingNoteDao(IShippingNoteDao shippingNoteDao) {
		this.shippingNoteDao = shippingNoteDao;
	}

	public void setCompanyRegisterDao(ICompanyRegisterDao companyRegisterDao) {
		this.companyRegisterDao = companyRegisterDao;
	}

	public void setFileUpload(IFileUpload fileUpload) {
		this.fileUpload = fileUpload;
	}

	public void setDgDeclarationDao(IDGDeclarationDao dgDeclarationDao) {
		this.dgDeclarationDao = dgDeclarationDao;
	}
	
	public DataItemList selectShippingNoteList(SearchShippingNoteParm parm) throws BizException {
		return shippingNoteDao.selectShippingNoteList(parm);
	}
	
	public DataItemList selectValidationCode(SearchShippingNoteParm parm) throws BizException {
		return shippingNoteDao.selectValidationCode(parm);
	}

	public DataItemList selectShippingNoteDtlList(SearchShippingNoteParm parm) throws BizException {
		DataItemList list = new DataItemList();
		ShippingNoteItem returnItem = new ShippingNoteItem();
		ShippingNoteItem blNoItem = new ShippingNoteItem();
		SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
		String blNo = "";

		if (parm.getSearchFlag().equals("update")) {
			DataItemList listMaster = shippingNoteDao.selectShippingNoteList(parm);
			
			returnItem = (ShippingNoteItem) listMaster.get(0);

			if (parm.getTsptTpCd() == null || parm.getTsptTpCd().equals("") || parm.getTsptTpCd() == "") {
				parm.setTsptTpCd(returnItem.getTsptTpCd());
			}

			ArrayList<ShippingNoteItem> listDetail = new ArrayList<ShippingNoteItem>();
			
			listDetail = (ArrayList<ShippingNoteItem>) shippingNoteDao.selectShippingNoteDtlList(parm).getCollection(); // goodsItemList
			List listSum = shippingNoteDao.selectShippingNoteSumList(parm).getCollection(); // Weight

			if (listSum.size() != 0) {
				ShippingNoteItem itemWgt = (ShippingNoteItem) listSum.get(0);
				
				returnItem.setWgtConveyor(itemWgt.getWgtConveyor());
				returnItem.setWgtLorry(itemWgt.getWgtLorry());
				returnItem.setWgtWegon(itemWgt.getWgtWegon());
			}

			parm.setCatgCd(returnItem.getCatgCd());
			ArrayList<ShippingNoteItem> blNoList = (ArrayList<ShippingNoteItem>) shippingNoteDao.selectBlNoList(parm).getCollection();

			for (int i = 0; i < blNoList.size(); i++) {
				blNoItem = (ShippingNoteItem) blNoList.get(i);

				if (blNo == "") {
					blNo = blNoItem.getBlNo();
				} else {
					blNo = blNo + "," + blNoItem.getBlNo();
				}
			}
			
			returnItem.setGoodsDetailItems(listDetail);
			
			//DG of SN:
			String catgCd = returnItem.getVslCallId() + "|" + returnItem.getShipgNoteNo();
			String pgmId = "PN119";
			String dgSeq = returnItem.getDgSeq();
			
			SearchShippingNoteParm dgParm = new SearchShippingNoteParm();
			
			dgParm.setCallSeq(returnItem.getCallSeq());
			dgParm.setCallYear(returnItem.getCallYear());
			dgParm.setVslCd(returnItem.getVslCd());
			dgParm.setCgNo(returnItem.getShipgNoteNo());
			dgParm.setSeq(dgSeq);
			
			DataItemList DGList = shippingNoteDao.selectDGDeclarationItems(dgParm);

			if (DGList.getCollection() != null && DGList.getCollection().size() > 0) {
				DGDeclarationItem dgItem = (DGDeclarationItem) DGList.getCollection().get(0);
				SearchFileUploadParm fileUploadParm = new SearchFileUploadParm();
				
				fileUploadParm.setCatgCd(catgCd);
				fileUploadParm.setPgmId(pgmId);
				
				DataItemList tempList = this.fileUpload.selectFileList(fileUploadParm);
				
				dgItem.setUploadItems((ArrayList<FileUploadItem>) tempList.getCollection());
				returnItem.setDgItems((ArrayList<DGDeclarationItem>)DGList.getCollection());
			}
		}

		if (parm.getSearchFlag().equals("blNo") || parm.getSearchFlag().equals("create")) {
			List blNoList = shippingNoteDao.selectBlNoList(parm).getCollection();
			List returnList = new ArrayList();
			
			for (int i = 0; i < blNoList.size(); i++) {
				blNoItem = (ShippingNoteItem) blNoList.get(i);

				if (blNo == "") {
					blNo = blNoItem.getBlNo();
				} else {
					blNo = blNo + "," + blNoItem.getBlNo();
				}
			}

			blNoItem.setBlNo(blNo);
			returnList.add(blNoItem);
			returnItem.add(returnList);
		}
		
		if (parm.getSearchFlag().equals("CbrNo")) {
			List cbrList = shippingNoteDao.selectCbrNoList(parm).getCollection();

			if (cbrList.size() > 0) {
				returnItem.setCbrNo("true");
			} else {
				returnItem.setCbrNo("");
			}
		}
		
		if (parm.getSearchFlag().equals("create")) {
			SearchCompanyRegisterParm ptnrParm = new SearchCompanyRegisterParm();
			
			ptnrParm.setPtnrType(CodeConstant.CM_PTNRTP_FWD);
			ptnrParm.setReqType("CD");
			ptnrParm.setPtnrCode(parm.getPtnrCd());
			
			List ptnrList = companyRegisterDao.selectPartnerCode(ptnrParm).getCollection();
			returnItem.add(ptnrList);
		} else if (parm.getSearchFlag().equals("GateIn")) {
			List gateInList = shippingNoteDao.selectGateInList(parm).getCollection();
			returnItem.add(gateInList);
		}

		list.add(returnItem);
		return list;
	}
	
	@Override
	public DataItemList selectRoRoItems(SearchShippingNoteParm parm) throws BizException{
		return shippingNoteDao.selectRoRoItems(parm);
	}
	
	@Override
	public DataItemList selectPackageItems(SearchShippingNoteParm parm) throws BizException{
		return shippingNoteDao.selectPackageItems(parm);
	}
	
	@Override
	public DataItemList selectFileList(SearchFileUploadParm parm) throws BizException{
		return this.fileUpload.selectFileList(parm);
	}
	
	@Override
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		DataItemList cmdtItems = new DataItemList();
		SearchShippingNoteParm snParm = new SearchShippingNoteParm();
		ShippingNoteItem rsItem = new ShippingNoteItem();
		ShippingNoteItem shippingNoteNo = new ShippingNoteItem();
		FileUploadItem fileUploadItem = new FileUploadItem();
		ShippingNoteItem item = (ShippingNoteItem) parm.getInsertItems().get(0);
		
		snParm.setVslCd(item.getVslCd());
		
		if(item.getShipgNoteNo() == null || item.getShipgNoteNo().equals("")) {
			DataItemList shippingNoteNoList = shippingNoteDao.selectShippingNoteNoItems(snParm);
			shippingNoteNo = (ShippingNoteItem) shippingNoteNoList.getCollection().get(0);
			
			item.setShipgNoteNo(shippingNoteNo.getShipgNoteNo());
		}
		
		if (item.getGoodsDetailItems() != null) {
			cmdtItems.setCollection(item.getGoodsDetailItems());
		}		
		
		//file upload function
		ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();
				
		if (fileuploadList != null && fileuploadList.size() > 0) {
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((ShippingNoteItem)parm.getInsertItems().get(0)).getUserId());
						
			fileUploadItem.setItems(fileuploadList);
			fileUploadItem.setUserId(((ShippingNoteItem)parm.getInsertItems().get(0)).getUserId());
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((ShippingNoteItem)parm.getInsertItems().get(0)).getUserId());
					    
			this.fileUpload.applyUploadItems(cudParm);
		}
		
		ArrayList dgs = (ArrayList) item.getDgItems();
		
		if (dgs != null && dgs.size() > 0) {
			DGDeclarationItem itemDG = (DGDeclarationItem) dgs.get(0);
			DataItemList itemsDG = new DataItemList();
			if (item.getDgSeq() != null && !item.getDgSeq().equals("")) {
				itemDG.setCrudDG(DAOProcessType.UPDATE);
				itemDG.setDgSeq(item.getDgSeq());
				itemDG.setSeq(item.getDgSeq());
			} else {
				itemDG.setCrudDG(DAOProcessType.INSERT);
			}

			itemDG.setCgNo(item.getShipgNoteNo());
			itemDG.setUserId(item.getUserId());
			
			/*if (item.getVslCallId().equalsIgnoreCase(CodeConstant.VESSEL_SCHEDULE_STRG)) {
				Calendar calendar = new GregorianCalendar();
				itemDG.setCallSeq(Integer.toString(calendar.get(Calendar.YEAR)));
				itemDG.setVslCd(DAOProcessType.DELETE);
				itemDG.setCallYear("1000");
			}*/
			
			UpdateBizParm<DGDeclarationItem> dgCudParm = new UpdateBizParm<DGDeclarationItem>();
			dgCudParm.setDataItem(itemDG);
			
			String dgSeq = processDGDeclarationItem(dgCudParm);
 			if (!StringUtil.isNull(dgSeq) && itemDG.getCrudDG().equals(DAOProcessType.INSERT)) {
				item.setDgSeq(dgSeq);
			}

			/*ArrayList<FileUploadItem> spFileUploadtems = item.getUploadItems();
			fileUploadItem.setItems(spFileUploadtems);
			fileUploadItem.setUserId(item.getUserId());
			parm.setDataItem(fileUploadItem);
			UpdateBizParm<FileUploadItem> uploadParm = new UpdateBizParm<FileUploadItem>();
			uploadParm.setDataItem(fileUploadItem);
			uploadParm.setUserId(fileUploadItem.getUserId());
			this.fileUpload.applyUploadItems(uploadParm);*/
		}
		
		SearchManifestParm manifestParm = new SearchManifestParm();
		
		manifestParm.setVslCallId(item.getVslCallId());
		manifestParm.setDocId(item.getMfDocId());
		
		DataItemList mnfResult = shippingNoteDao.selectManifestList(manifestParm);
		
		if(mnfResult == null || mnfResult.getCollection().size() == 0) {
			ShippingNoteItem mnfItem = new ShippingNoteItem();
			
			mnfItem.setVslCd(item.getVslCd());
			mnfItem.setCallYear(item.getCallYear());
			mnfItem.setCallSeq(item.getCallSeq());
			mnfItem.setVslCallId(item.getVslCallId());
			mnfItem.setMfDocId(item.getMfDocId());
			mnfItem.setOpClassCd(CodeConstant.VSLSCH_CG_OP_TP_EXPORT);
			mnfItem.setInsUserId(item.getUserId());
			mnfItem.setUpdUserId(item.getUserId());
			mnfItem.setScn(item.getScn());
			
			InsertItemsBizParm insertMnfList = new InsertItemsBizParm();
			
			insertMnfList.addInsertItem(mnfItem);
			shippingNoteDao.insertManifestItem(insertMnfList);
		}
		
		InsertItemsBizParm insertList = new InsertItemsBizParm();
		insertList.addInsertItem(item);
		DataItemList resItemList = shippingNoteDao.insertItems(insertList);

		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		
		for (int i = 0; i < cmdtItems.size(); i++) {
			ShippingNoteItem itemCol = (ShippingNoteItem) cmdtItems.get(i);
			itemCol.setMfDocId(item.getMfDocId());
			
			if (DAOProcessType.INSERT.equals(itemCol.getWorkingStatus())) {
				if (itemCol.getShipgNoteNo().equals("")) {
					itemCol.setShipgNoteNo(item.getShipgNoteNo());
				}
				
				itemCol.setCrud(DAOProcessType.INSERT);
				itemCol.setCgTpCd(item.getCgTpCd());
				
				insertItems.addInsertItem(itemCol);
			} 
		}
		
		if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
			shippingNoteDao.insertShippingNoteDtlItems(insertItems);
		}

		if (item.getVslCallId().equalsIgnoreCase("NonCallId")) {
			SearchShippingNoteParm parmDetail = new SearchShippingNoteParm();
			
			parmDetail.setShipgNoteNo(rsItem.getShipgNoteNo());
		}
		
		if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_RCV) && item.getUnitItems().size() > 0) {
			insertROROData(item);
		}
		
		if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK) && item.getPkgItems() != null) {
			if(item.getPkgItems().size() > 0) {
				insertPkgDetailData(item);
			}
		}
		
		return resItemList;
	}
	
	public void insertROROData(ShippingNoteItem item)throws BizException {
		ArrayList<ShippingNoteItem> unitArr = item.getUnitItems();
		shippingNoteDao.deleteRoRoItems(item);
		
		for(int i=0; i<unitArr.size(); i++) {
			if(unitArr.get(i).getAction() != null && !unitArr.get(i).getAction().equals(DAOProcessType.DELETE)) {
				ShippingNoteItem cudItem = (ShippingNoteItem) item.clone();
				
				cudItem.setUnitNo(unitArr.get(i).getUnitNo());
				cudItem.setBrandCd(unitArr.get(i).getBrandCd());
				cudItem.setModelCd(unitArr.get(i).getModelCd());
				cudItem.setRoroMt(unitArr.get(i).getRoroMt());
				cudItem.setCbm(unitArr.get(i).getCbm());
				cudItem.setNewYn(unitArr.get(i).getNewYn());
				cudItem.setCatgCd(unitArr.get(i).getCatgCd());
				cudItem.setMfDocId(item.getNewMfDocId());
				cudItem.setShipgNoteNo(item.getShipgNoteNo());
				cudItem.setCmdtCd(item.getCmdtCd());
				cudItem.setPkgTpCd(item.getPkgTpCd());
				
				shippingNoteDao.insertRoRoItems(cudItem);
			}
		}
	}
	
	public DataItemList insertPkgDetailData(ShippingNoteItem item)throws BizException {
		DataItemList itemList = new DataItemList();
		ArrayList<ShippingNoteItem> pkgArr = item.getPkgItems();
		shippingNoteDao.deletePackageItems(item);
		
		for(int i=0; i<pkgArr.size(); i++) {
			if(pkgArr.get(i).getAction() != null && !pkgArr.get(i).getAction().equals(DAOProcessType.DELETE)) {
				ShippingNoteItem cudItem = (ShippingNoteItem) pkgArr.get(i).clone();

				cudItem.setScn(item.getScn());
				cudItem.setVslCd(item.getVslCd());
				cudItem.setMfDocId(item.getMfDocId());
				cudItem.setOpClassCd(item.getCatgCd());
				cudItem.setPkgTpCd(item.getPkgTpCd());
				cudItem.setPkgRmk(pkgArr.get(i).getPkgRmk());
				
				shippingNoteDao.insertPackageItems(cudItem);
				itemList.add(cudItem);
			}
		}
		
		return itemList;
	}
	
	/*URS: allow update Key SNNO and MF_DOC_ID. Step update SN as bellow:
	 * 1. Delete SNDetail
	 * 2. Update SN
	 * 3. Insert new Manifest if not exists (TMT_MF)
	 * 4. Delete Manifest if not exists SN
	 * 5. Re-Insert new SNDetail
	 * */
	@Override
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList cmdtItems = new DataItemList();
		FileUploadItem fileUploadItem = new FileUploadItem();
		DeleteItemsBizParm deleteItems = new DeleteItemsBizParm();

		String snNo = "";
		String newSNno = "";
		
		ShippingNoteItem item = (ShippingNoteItem) parm.getUpdateItems().get(0);
		
		snNo = item.getShipgNoteNo();
		newSNno = item.getNewShipgNoteNo();
		
		ShippingNoteItem delSNDetailParm = new ShippingNoteItem();
		
		delSNDetailParm.setShipgNoteNo(item.getShipgNoteNo());
		delSNDetailParm.setVslCallId(item.getVslCallId());
		delSNDetailParm.setSeq(0);
		deleteItems.addDeleteItem(delSNDetailParm);
		
		shippingNoteDao.deleteShippingNoteDtlItems(deleteItems);
		
		boolean insertNewMfNo = false;
		SearchManifestParm manifestParm = new SearchManifestParm();
		
		manifestParm.setVslCallId(item.getVslCallId());
		manifestParm.setDocId(item.getNewMfDocId());
		
		DataItemList mnfResult = shippingNoteDao.selectManifestList(manifestParm);
		
		if(mnfResult == null || mnfResult.getCollection().size() == 0) {
			ShippingNoteItem mnfItem = new ShippingNoteItem();
			
			mnfItem.setVslCd(item.getVslCd());
			mnfItem.setCallYear(item.getCallYear());
			mnfItem.setCallSeq(item.getCallSeq());
			mnfItem.setVslCallId(item.getVslCallId());
			mnfItem.setMfDocId(item.getNewMfDocId());
			mnfItem.setOpClassCd(CodeConstant.VSLSCH_CG_OP_TP_EXPORT);
			mnfItem.setInsUserId(item.getUserId());
			mnfItem.setUpdUserId(item.getUserId());
			
			InsertItemsBizParm insertMnfList = new InsertItemsBizParm();
			insertMnfList.addInsertItem(mnfItem);
			
			shippingNoteDao.insertManifestItem(insertMnfList);
			insertNewMfNo = true;
		}
		
		//Check DG Declareation:
		ArrayList<DGDeclarationItem> dgs = (ArrayList<DGDeclarationItem>) item.getDgItems();
		if (dgs != null && dgs.size() > 0) {
			DGDeclarationItem itemDG = (DGDeclarationItem) dgs.get(0);
			DataItemList itemsDG = new DataItemList();
			
			if(!StringUtil.isNull(item.getDgSeq()) && item.getDgSeq().equals(itemDG.getSeq())) {
			
				itemDG.setCrudDG(DAOProcessType.UPDATE);
				itemDG.setDgSeq(item.getDgSeq());
				itemDG.setSeq(item.getDgSeq());
				
			} else {
				itemDG.setCrudDG(DAOProcessType.INSERT);
				itemDG.setCgNo(item.getNewShipgNoteNo());
				itemDG.setUserId(item.getUserId());
			}
			
			itemsDG.add(itemDG);

			UpdateBizParm<DGDeclarationItem> dgCudParm = new UpdateBizParm<DGDeclarationItem>();
			dgCudParm.setDataItem(itemDG);

			String dgSeq = processDGDeclarationItem(dgCudParm);
			if (!StringUtil.isNull(dgSeq) && itemDG.getCrudDG().equals(DAOProcessType.INSERT)) {
				item.setDgSeq(dgSeq);
			}
			
			/*
			ArrayList<FileUploadItem> spFileUploadtems = item.getUploadItems();
			fileUploadItem.setItems(spFileUploadtems);
			fileUploadItem.setUserId(item.getUserId());
			UpdateBizParm<FileUploadItem> uploadParm = new UpdateBizParm<FileUploadItem>();
			uploadParm.setDataItem(fileUploadItem);
			uploadParm.setUserId(fileUploadItem.getUserId());
			this.fileUpload.applyUploadItems(uploadParm);
			*/
		}

		UpdateItemsBizParm theItems = new UpdateItemsBizParm();
		theItems.addUpdateItem(item);
		DataItemList resItemList = shippingNoteDao.updateItems(theItems);
	
		if(insertNewMfNo && !item.getNewMfDocId().equals(item.getMfDocId())) {
			DeleteItemsBizParm deleteMFParm = new DeleteItemsBizParm();
			DataItemList mfListDel = new DataItemList();
			
			mfListDel.add(item);
			deleteMFParm.setDeleteItems(mfListDel);
			
			shippingNoteDao.deleteManifestItem(deleteMFParm);
		}
		
		if(!snNo.equals(newSNno)) {
			DGDeclarationItem DGItem = new DGDeclarationItem();
			
			DGItem.setCgNo(newSNno);
			DGItem.setSeq(item.getDgSeq());
			
			UpdateItemsBizParm DGItems = new UpdateItemsBizParm();
			
			DGItems.addUpdateItem(DGItem);
			
			dgDeclarationDao.updateNewSnNoItems(DGItems);
		}
		
		/*//file upload function
		ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();
		
		if (fileuploadList != null && fileuploadList.size() > 0) {
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((ShippingNoteItem)parm.getUpdateItems().get(0)).getUserId());
				
			fileUploadItem.setItems(fileuploadList);
			fileUploadItem.setUserId(((ShippingNoteItem)parm.getUpdateItems().get(0)).getUserId());
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((ShippingNoteItem)parm.getUpdateItems().get(0)).getUserId());
			    
			this.fileUpload.applyUploadItems(cudParm);
		}*/
		
		InsertItemsBizParm insertItems = new InsertItemsBizParm();
		
		if (item.getGoodsDetailItems() != null) {
			cmdtItems.setCollection(item.getGoodsDetailItems());
		}
		
		for (int i = 0; i < cmdtItems.size(); i++) {
			ShippingNoteItem itemCol = (ShippingNoteItem) cmdtItems.get(i);
			
			if (itemCol.getShipgNoteNo().equals("") || !itemCol.getShipgNoteNo().equals(item.getNewShipgNoteNo())) {
				itemCol.setShipgNoteNo(item.getNewShipgNoteNo());
			}
			
			itemCol.setMfDocId(item.getNewMfDocId());
			itemCol.setCgTpCd(item.getCgTpCd());
			
			insertItems.addInsertItem(itemCol);
		}

		if (insertItems.getInsertItems() != null && insertItems.getInsertItems().size() > 0) {
			shippingNoteDao.insertShippingNoteDtlItems(insertItems);
		}

		if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_RCV) && item.getUnitItems().size() > 0) {
			insertROROData(item);
		}
		
		if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)) {	
			if(item.getPkgItems() != null) {		
				insertPkgDetailData(item);		
			}
		}
		
		if("AP".equals(item.getStatCd()) && "Y".equals(item.getTmnlHoldFlag())) {
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			DataItemList insertItems1 = new DataItemList();
			
			TerminalHoldReleaseControlItem holdItem = new TerminalHoldReleaseControlItem();
			holdItem.setVslCallId(item.getVslCallId());
			holdItem.setIe("E");
			holdItem.setDocNo(item.getMfDocId());
			holdItem.setCgNo(item.getShipgNoteNo());
			holdItem.setUserId(item.getUserId());
			holdItem.setOpToBeStopped("LD");
			holdItem.setOpToBeStoppedNm("LD");
			holdItem.setScn(item.getScn());
			holdItem.setVslCd(item.getVslCd());
			holdItem.setCallYear(item.getCallYear());
			holdItem.setCallSeq(item.getCallSeq());
			
			
			//In case Barge, generate reason as null
			if("BRGE".equals(item.getVslTp())) {
				holdItem.setVslTp("BRGE");
			}else{
				holdItem.setVslTp("");
				holdItem.setHoldReasonCd("T3");
				holdItem.setHoldReasonDesc("BILLING HOLD");	
			}
			insertItems1.add(holdItem);
			
			insertParm.setInsertItems(insertItems1);	
			shippingNoteDao.insertTerminalHoldItems(insertParm);
		}
				
		return resItemList;
	}
	
	@Override
	public DataItemList updatePackageItems(UpdateItemsBizParm parm) throws BizException {
		ShippingNoteItem item = (ShippingNoteItem) parm.getUpdateItems().get(0);
		DataItemList insertedPkgList = null;
		DataItemList returnList = new DataItemList();
		
		if(item.getCgTpCd().equals(CodeConstant.MT_CGTP_BBK)) {	
			if(item.getPkgItems() != null) {		
				insertedPkgList = insertPkgDetailData(item);		
			}
		}
		
		if(insertedPkgList != null && insertedPkgList.size() > 0) {
			ArrayList<ShippingNoteItem> pkgItems  = (ArrayList<ShippingNoteItem>) insertedPkgList.getCollection();
			item.setPkgItems(pkgItems);
			returnList.add(item);
		}
		
		return returnList;
	}

	@Override
	public DataItemList processFileInfo(UpdateItemsBizParm parm) throws BizException {
		FileUploadItem fileUploadItem = new FileUploadItem();
		ShippingNoteItem item = (ShippingNoteItem) parm.getUpdateItems().get(0);
		// file upload function
		ArrayList<FileUploadItem> fileuploadList = (ArrayList<FileUploadItem>) item.getUploadItems();

		if (fileuploadList != null && fileuploadList.size() > 0) {
			// File Upload CUD
			UpdateBizParm<FileUploadItem> cudParm = new UpdateBizParm<FileUploadItem>();
			cudParm.setUserId(((ShippingNoteItem) parm.getUpdateItems().get(0)).getUserId());

			fileUploadItem.setItems(fileuploadList);
			fileUploadItem.setUserId(((ShippingNoteItem) parm.getUpdateItems().get(0)).getUserId());
			cudParm.setDataItem(fileUploadItem);
			cudParm.setUserId(((ShippingNoteItem) parm.getUpdateItems().get(0)).getUserId());

			this.fileUpload.applyUploadItems(cudParm);
		}
		return new DataItemList();
	}
	
	@Override
	public void deleteItems(DeleteItemsBizParm parm) throws BizException {
		shippingNoteDao.deleteShippingNoteDtlItems(parm);
		shippingNoteDao.deleteItems(parm);
		
		ShippingNoteItem item = (ShippingNoteItem) parm.getDeleteItems().get(0);
		shippingNoteDao.deleteRoRoItems(item);
		shippingNoteDao.deletePackageItems(item);
		
		shippingNoteDao.deleteManifestItem(parm);
	}
	
	private String processDGDeclarationItem(UpdateBizParm<DGDeclarationItem> parm) throws BizException {
		DGDeclarationItem item = (DGDeclarationItem) parm.getDataItem();
		String newDgSeq = "";
		
		if (item.getCrudDG().equals(DAOProcessType.INSERT)) {
			SearchDGDeclarationParm dgParm = new SearchDGDeclarationParm();
			List<DGDeclarationItem> dgNoList = dgDeclarationDao.getDGDeclarationNoList(dgParm).getCollection();
			
			newDgSeq = ((DGDeclarationItem) (dgNoList.get(0))).getSeq();
			item.setSeq(newDgSeq);
			
			InsertItemsBizParm insertParm = new InsertItemsBizParm();
			insertParm.addInsertItem(item);
			dgDeclarationDao.insertDGDeclarationItems(insertParm);
			//dgDeclarationDao.insertDGStatus(insertParm);
			
		} else if (item.getCrudDG().equals(DAOProcessType.UPDATE)) {
			newDgSeq = item.getSeq();
			
			UpdateItemsBizParm updateParm = new UpdateItemsBizParm();
			updateParm.addUpdateItem(item);
			dgDeclarationDao.updateDGDeclarationItems(updateParm);
		}
		
		return newDgSeq;
	}

	@Override
	public void updateShippingNoteAckItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList insItems = new DataItemList();
		ShippingNoteItem item = (ShippingNoteItem) parm.getDataItem();

		ArrayList<ShippingNoteItem> itemList = item.getShippingNoteList();

		for (int i = 0; i < itemList.size(); i++) {
			ShippingNoteItem itemCollection = (ShippingNoteItem) itemList.get(i);
			insItems.add(itemCollection);
		}

		shippingNoteDao.updateShippingNoteAckItems(insItems);
		shippingNoteDao.updateCgTpItems(insItems);
	}
	
	@Override
	public void updConfirmLoadingStt(UpdateItemsBizParm parm) throws BizException {
		shippingNoteDao.updConfirmLoadingStt(parm);
	}
}
