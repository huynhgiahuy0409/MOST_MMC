package com.tsb.most.biz.service.document;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.document.IGoodsReceiptDao;
import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.dataitem.document.GoodsReceiptItem;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.biz.dataitem.operation.CargoMasterItem;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.operation.SearchRehandleGCParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.framework.exception.DaoException;

public class GoodsReceipt extends MOSTBaseService implements IGoodsReceipt {
	private IGoodsReceiptDao goodsReceiptDao;
	
	public void setGoodsReceiptDao(IGoodsReceiptDao goodsReceiptDao) {
		this.goodsReceiptDao = goodsReceiptDao;
	}

	public DataItemList selectGoodsReceiptList(SearchGoodsReceiptParm parm) throws BizException {
		return goodsReceiptDao.selectGoodsReceiptList(parm);
    }
	
	public DataItemList selectGoodsReceiptReport(SearchGoodsReceiptParm parm) throws BizException {
		return goodsReceiptDao.selectGoodsReceiptReport(parm);
    }

	public DataItemList selectGoodsReceiptDetail(SearchGoodsReceiptParm parm) throws BizException {
		return goodsReceiptDao.selectGoodsReceiptList(parm);
	}
	
	public DataItemList selectPackageItems(SearchGoodsReceiptParm parm) throws BizException{
		return goodsReceiptDao.selectPackageItems(parm);
	}

	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		DataItemList insetItems = parm.getInsertItems();
		GoodsReceiptItem pkgItem = (GoodsReceiptItem) parm.getInsertItems().get(0);
		ArrayList<GoodsReceiptItem> pkgArr = pkgItem.getPkgItems();
		
		for (GoodsReceiptItem item : (ArrayList<GoodsReceiptItem>) insetItems.getCollection()) {
			if(item == null) {
				return null;
			}
			
			String newGrNo = "";
			SearchGoodsReceiptParm grParm = new SearchGoodsReceiptParm();
			
			if("R".equals(item.getRhdlMode())) {
				DataItemList list = goodsReceiptDao.selectGoodsReceiptNoForReturnToShipper(grParm);
				newGrNo = ((GoodsReceiptItem) (list.get(0))).getGdsRecvNo();
				item.setGdsRecvNo(newGrNo);
				makeInvLocData(item);
			}
			else {
				DataItemList list = goodsReceiptDao.selectGoodsReceiptNo(grParm);
				newGrNo = ((GoodsReceiptItem) (list.get(0))).getGdsRecvNo();
			}
			
			item.setGdsRecvNo(newGrNo);
			
		}
		
		if(pkgArr != null) {
			for(int i=0; i<pkgArr.size(); i++) {
				GoodsReceiptItem cudItem = (GoodsReceiptItem) pkgItem.clone();
				
				cudItem.setMfDocId(pkgItem.getMfDocId());
				cudItem.setShipgNoteNo(pkgItem.getShipgNoteNo());
				cudItem.setGdsRecvNo(pkgItem.getGdsRecvNo());
				cudItem.setPkgNo(pkgItem.getPkgItems().get(i).getPkgNo());
				
				goodsReceiptDao.updatePackageItems(cudItem);
			}
		}
		
		if(pkgItem.getCgTpCd().equals(CodeConstant.MT_CGTP_RCV)) {
			insertROROData(pkgItem);
		}
		return goodsReceiptDao.insertGoodsReceiptMultiItems(parm);
	}

	private void insertROROData(GoodsReceiptItem item) throws DaoException {
		ArrayList<ShippingNoteItem> unitArr = item.getUnitItems();
		
		for(int i=0; i<unitArr.size(); i++) {
			if(!"D".equals(unitArr.get(i).getAction())) {
				ShippingNoteItem unitItems = new ShippingNoteItem();
				unitItems.setVslCd(unitArr.get(i).getVslCd());
				unitItems.setCallYear(unitArr.get(i).getCallYear());
				unitItems.setCallSeq(unitArr.get(i).getCallSeq());
				unitItems.setVslCallId(unitArr.get(i).getVslCallId());
				unitItems.setMfDocId(unitArr.get(i).getMfDocId());
				unitItems.setShipgNoteNo(unitArr.get(i).getShipgNoteNo());
				unitItems.setGrNo(item.getGdsRecvNo());
				unitItems.setCgTpCd(item.getCgTpCd());
				unitItems.setUnitNo(unitArr.get(i).getUnitNo());
				unitItems.setBrandCd(unitArr.get(i).getBrandCd());
				unitItems.setModelCd(unitArr.get(i).getModelCd());
				unitItems.setRoroMt(unitArr.get(i).getRoroMt());
				unitItems.setCbm(unitArr.get(i).getCbm());
				unitItems.setNewYn(unitArr.get(i).getNewYn());
				unitItems.setIxCd("X");
				unitItems.setUserId(item.getUserId());
				
				
				//2. Insert
				goodsReceiptDao.insertRoRoItems(unitItems);
			}
		}
	}

	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		GoodsReceiptItem updateItem = (GoodsReceiptItem) parm.getUpdateItems().getCollection().get(0);
		ArrayList<GoodsReceiptItem> pkgArr = updateItem.getPkgItems();

		goodsReceiptDao.deletePackageItems(parm);
		
		if (pkgArr != null) {
			for (int i = 0; i < pkgArr.size(); i++) {
				GoodsReceiptItem cudItem = (GoodsReceiptItem) pkgArr.get(i).clone();
				cudItem.setMfDocId(updateItem.getMfDocId());
				cudItem.setShipgNoteNo(updateItem.getShipgNoteNo());
				cudItem.setGdsRecvNo(updateItem.getGdsRecvNo());
				cudItem.setPkgNo(updateItem.getPkgItems().get(i).getPkgNo());
				goodsReceiptDao.updatePackageItems(cudItem);
			}
		}
		
		return goodsReceiptDao.updateGoodsReceiptItems(parm);
	}

	public void deleteItems(DeleteItemsBizParm parm) throws BizException {
		UpdateItemsBizParm updateList = new UpdateItemsBizParm();
		updateList.addUpdateItem(parm.getDeleteItems());
		goodsReceiptDao.deletePackageItems(updateList);
		
		goodsReceiptDao.deleteGoodsReceiptItems(parm);
	}
	
	public DataItemList selectGoodsReceiptForCreating(SearchGoodsReceiptParm parm) throws BizException {
		DataItemList list = goodsReceiptDao.selectGoodsReceiptForCreating(parm);
		return list;
	}
	
	public DataItemList insertGoodsReceiptOfRORO(InsertItemsBizParm parm) throws BizException {
		DataItemList insertItems = parm.getInsertItems();
		
		for (GoodsReceiptItem item : (ArrayList<GoodsReceiptItem>) insertItems.getCollection()) {
			if(item == null)
				return null;
			
			int qty = item.getGrQty();
			
			for(int i=0; i<qty; i++) {
				GoodsReceiptItem cudItem = (GoodsReceiptItem)item.clone();
				String newGrNo = "";
				SearchGoodsReceiptParm grParm = new SearchGoodsReceiptParm();
				DataItemList list = goodsReceiptDao.selectGoodsReceiptNo(grParm);
				
				newGrNo = ((GoodsReceiptItem) (list.get(0))).getGdsRecvNo();
				cudItem.setGrQty(1);
				cudItem.setGdsRecvNo(newGrNo);
				
				goodsReceiptDao.insertGoodsReceiptItem(cudItem);
			}
		}
		
		return insertItems;
	}
	
	public DataItemList selectBalanceGoodsReceiptReturnToShipper(SearchGoodsReceiptParm parm) throws BizException {
		return goodsReceiptDao.selectBalanceGoodsReceiptReturnToShipper(parm);
	}
	
	public DataItemList selectWarehouseRtsList(SearchGoodsReceiptParm parm) throws BizException {
		return goodsReceiptDao.selectWarehouseRtsList(parm);
	}
	
	private void makeInvLocData(GoodsReceiptItem item) throws BizException{
		
		SearchRehandleGCParm rhdCgParm = new SearchRehandleGCParm();
    	DataItemList insertInvLocList = new DataItemList();
    	DataItemList insertJobList = new DataItemList();
    	DataItemList insertCargoMasterList = new DataItemList();
    	
    	int tolQty, restQty;
    	double tolMt,restMt;
    	double tolM3, restM3;
    	tolQty = restQty = item.getGrQty();
    	tolMt = restMt = item.getGrWgt();
    	tolM3 =  restM3 = item.getGrMsrmt();
    	//Transform locId to correct format.
    	String whRtsLocId = this.transformLocation(item.getRtsLocId());
    	
    	SearchGoodsReceiptParm grParm = new SearchGoodsReceiptParm();
    	grParm.setVslCallId(item.getVslCallId());
    	grParm.setShipgNoteNo(item.getShipgNoteNo());
    	grParm.setWhRtsLocId(whRtsLocId);
    	
    	DataItemList invResult = goodsReceiptDao.selectInvLocList(grParm);
    	String invJobNo = (String)goodsReceiptDao.selectGrIvLocJobNo(grParm).getCollection().get(0);
    	item.setJobNo(invJobNo);
    	List<GoodsReceiptItem> invLocList = (ArrayList<GoodsReceiptItem>)invResult.getCollection();
    	
    	Comparator<GoodsReceiptItem> cmp = (s1, s2) -> Double.compare(s1.getGrQty(), s2.getGrQty());
    	invLocList.sort(cmp);
    	
    	for (GoodsReceiptItem invLocItem : invLocList) {
    		
    		GoodsReceiptItem invLocNItem = (GoodsReceiptItem)invLocItem.clone(); // -
    		GoodsReceiptItem invLocPItem = (GoodsReceiptItem)invLocItem.clone(); // +
			
			if(restQty <= 0 && restMt <= 0 && restM3 <= 0) {
				break; // full amount.
			}
			
			int itemQty = invLocItem.getGrQty();
	    	double itemMt = invLocItem.getGrWgt();
	    	double itemM3 = invLocItem.getGrMsrmt();
	    	
	    	//Min between WH Item and calculate RestQty:
	    	//int minQty = Math.min(itemQty, restQty);
			double minMt = Math.min(itemMt, restMt);
			double minM3 = Math.min(itemM3, restM3);
	    	
			if(restQty > 0) {
				if(restQty == invLocItem.getGrQty()) { // GR Amount = first item in WH:
	    			
	    			invLocNItem.setGrQty(-itemQty);
	    			invLocNItem.setGrWgt(-itemMt);
	    			invLocNItem.setGrMsrmt(-itemM3);
	    			
	    			invLocPItem.setGrQty(itemQty);
	    			invLocPItem.setGrWgt(itemMt);
	    			invLocPItem.setGrMsrmt(itemM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else if (restQty < invLocItem.getGrQty()){
	    			invLocNItem.setGrQty(-restQty);
	    			invLocNItem.setGrWgt(-minMt);
	    			invLocNItem.setGrMsrmt(-minM3);
	    			
	    			invLocPItem.setGrQty(restQty);
	    			invLocPItem.setGrWgt(restMt);
	    			invLocPItem.setGrMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else {
	    			invLocNItem.setGrQty(-itemQty);
	    			invLocNItem.setGrWgt(-itemMt);
	    			invLocNItem.setGrMsrmt(-itemM3);
	    			
	    			invLocPItem.setGrQty(itemQty);
	    			invLocPItem.setGrWgt(minMt);
	    			invLocPItem.setGrMsrmt(minM3);
	    			
	    			restQty -= itemQty;
	    			restMt -= minMt;
	    			restM3 -= minM3;
	    		}
			} else if(restMt > 0) {
				if(restMt == invLocItem.getGrWgt()) { // GR Amount = first item in WH:
	    			
	    			invLocNItem.setGrQty(-itemQty);
	    			invLocNItem.setGrWgt(-itemMt);
	    			invLocNItem.setGrMsrmt(-itemM3);
	    			
	    			invLocPItem.setGrQty(itemQty);
	    			invLocPItem.setGrWgt(itemMt);
	    			invLocPItem.setGrMsrmt(itemM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else if (restMt < invLocItem.getGrWgt()){
	    			invLocNItem.setGrQty(-restQty);
	    			invLocNItem.setGrWgt(-minMt);
	    			invLocNItem.setGrMsrmt(-minM3);
	    			
	    			invLocPItem.setGrQty(restQty);
	    			invLocPItem.setGrWgt(restMt);
	    			invLocPItem.setGrMsrmt(restM3);
	    			
	    			restQty = 0;
	    			restMt = 0;
	    			restM3 = 0;
	    			
	    		}else {
	    			invLocNItem.setGrQty(-itemQty);
	    			invLocNItem.setGrWgt(-itemMt);
	    			invLocNItem.setGrMsrmt(-itemM3);
	    			
	    			invLocPItem.setGrQty(itemQty);
	    			invLocPItem.setGrWgt(minMt);
	    			invLocPItem.setGrMsrmt(minM3);
	    			
	    			restQty -= itemQty;
	    			restMt -= minMt;
	    			restM3 -= minM3;
	    		}
			}
    		
    		invLocNItem.setUserId(invLocItem.getUserId());
    		invLocNItem.setJobNo(invJobNo);
    		invLocNItem.setUserId(item.getUserId());
    		invLocNItem.setVslCd(item.getVslCd());
    		invLocNItem.setCallSeq(item.getCallSeq());
    		invLocNItem.setCallYear(item.getCallYear());
    		
    		invLocPItem.setUserId(invLocItem.getUserId());
    		invLocPItem.setJobNo(invJobNo);
    		invLocPItem.setGdsRecvNo(item.getGdsRecvNo());
    		invLocPItem.setWhTpCd("G");
    		invLocPItem.setUserId(item.getUserId());
    		invLocPItem.setVslCd(item.getVslCd());
    		invLocPItem.setCallSeq(item.getCallSeq());
    		invLocPItem.setCallYear(item.getCallYear());
    		
    		insertInvLocList.add(invLocNItem);
    		insertInvLocList.add(invLocPItem);
		}// end loop.
		
		InsertItemsBizParm insInvLocParm = new InsertItemsBizParm();
		insInvLocParm.setInsertItems(insertInvLocList);
		
		insertJobList = this.createInvJob(item);
		InsertItemsBizParm insJobParm = new InsertItemsBizParm();
		insJobParm.setInsertItems(insertJobList);
		
		insertCargoMasterList = this.createCargoMaster(item);
		InsertItemsBizParm insertCargoMasterParm = new InsertItemsBizParm();
		insertCargoMasterParm.setInsertItems(insertCargoMasterList);
		
		goodsReceiptDao.insertJobItems(insJobParm);
		goodsReceiptDao.insertCargoMasterItems(insertCargoMasterParm);
		goodsReceiptDao.insertCargoInvLocationItems(insInvLocParm);
		
	}
	
	//202207 add Create for TMT_JOB (make GR Return to Shipper):
    private DataItemList createInvJob(GoodsReceiptItem grItem) throws BizException{
    	DataItemList jobItems = new DataItemList();
    	CargoJobItem nxJobItem = new CargoJobItem();  	
		
		//Next CgJob
		nxJobItem.setJobNo(grItem.getJobNo());
		nxJobItem.setVslCallId(grItem.getVslCallId());
		nxJobItem.setCgNo(grItem.getGdsRecvNo());
		nxJobItem.setDelvTpCd("I");
		nxJobItem.setOpeClassCd(grItem.getCatgCd());
		nxJobItem.setJobTpCd("LF");
		nxJobItem.setJobCoCd("G");
		nxJobItem.setJobPurpCd("GW");
		nxJobItem.setTsptTpCd("LR");
		nxJobItem.setPkgTpCd(grItem.getPkgTpCd());
		nxJobItem.setRhdlMode(grItem.getRhdlMode());
		nxJobItem.setRhdlNo(grItem.getRhdlNo());
		
		nxJobItem.setPkgQty(grItem.getGrQty());
		nxJobItem.setWgt(grItem.getGrWgt());
		nxJobItem.setMsrmt(grItem.getGrMsrmt());
		nxJobItem.setToLocId(grItem.getRtsLocId());
		nxJobItem.setStatCd("COM");
		nxJobItem.setUserId(grItem.getUserId());
		nxJobItem.setRepkgTypeCd(grItem.getPkgTpCd());
		nxJobItem.setVslCd(grItem.getVslCd());
		nxJobItem.setCallSeq(grItem.getCallSeq());
		nxJobItem.setCallYear(grItem.getCallYear());
		nxJobItem.setMfDocId(grItem.getMfDocId());
		 
		jobItems.add(nxJobItem);
		return jobItems;
    }
    
    private DataItemList createCargoMaster(GoodsReceiptItem grItem) throws BizException{
    	DataItemList cargoMstItems = new DataItemList();
    	CargoMasterItem cargoMstItem = new CargoMasterItem();  	
		
    	cargoMstItem.setVslCallId(grItem.getVslCallId());
    	cargoMstItem.setVslCd(grItem.getVslCd());
    	cargoMstItem.setCallSeq(grItem.getCallSeq());
    	cargoMstItem.setCallYear(grItem.getCallYear());
    	cargoMstItem.setMfDocId(grItem.getMfDocId());
    	cargoMstItem.setCgNo(grItem.getGdsRecvNo());
    	cargoMstItem.setShipgNoteNo(grItem.getShipgNoteNo());
    	cargoMstItem.setShipgAgnt(grItem.getShipgAgnt());
    	cargoMstItem.setDelvTpCd("I");
    	cargoMstItem.setOpeClassCd(grItem.getCatgCd());
    	cargoMstItem.setTsptTpCd("LR");
		cargoMstItem.setPkgTpCd(grItem.getPkgTpCd());
		cargoMstItem.setRhdlMode(grItem.getRhdlMode());
		
		cargoMstItem.setPkgQty(grItem.getGrQty());
		cargoMstItem.setWgt(grItem.getGrWgt());
		cargoMstItem.setMsrmt(grItem.getGrMsrmt());
		cargoMstItem.setStatCd("ST");
		cargoMstItem.setUserId(grItem.getUserId());
		 
		cargoMstItems.add(cargoMstItem);
		return cargoMstItems;
    }

	@Override
	public DataItemList selectRTSRoRoItems(SearchShippingNoteParm parm) throws BizException {
		return goodsReceiptDao.selectRTSRoRoItems(parm);
	}
	
	public String transformLocation(String location) {
        int indexOpenParenthesis = location.indexOf('(');
        int indexComma = location.indexOf(',');

        if (indexOpenParenthesis != -1 && indexComma != -1) {
            String whId = location.substring(0, indexOpenParenthesis); 
            String locId = location.substring(indexOpenParenthesis + 1, indexComma);
            return whId + "-" + locId;
        }
        return location;
    }
}
