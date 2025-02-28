package com.tsb.most.biz.service.operation;

import java.util.ArrayList;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.document.IBLDao;
import com.tsb.most.biz.dao.document.IGoodsReceiptDao;
import com.tsb.most.biz.dao.document.IShippingNoteDao;
import com.tsb.most.biz.dao.operation.IRehandlingOfRORODao;
import com.tsb.most.biz.dataitem.document.BLItem;
import com.tsb.most.biz.dataitem.document.GoodsReceiptItem;
import com.tsb.most.biz.dataitem.document.ShippingNoteItem;
import com.tsb.most.biz.dataitem.operation.CargoJobItem;
import com.tsb.most.biz.dataitem.operation.RehandlingOfROROItem;
import com.tsb.most.biz.parm.document.SearchBLParm;
import com.tsb.most.biz.parm.document.SearchGoodsReceiptParm;
import com.tsb.most.biz.parm.document.SearchShippingNoteParm;
import com.tsb.most.biz.parm.operation.SearchRehandlingOfROROParm;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import org.springframework.beans.BeanUtils;
import org.apache.commons.lang.StringUtils;

public class RehandlingOfRORO implements IRehandlingOfRORO {
	private IRehandlingOfRORODao rehandlingOfRORODao;
	private IShippingNoteDao shippingNoteDao;
	private IGoodsReceiptDao goodsReceiptDao;
	private IBLDao blDao;
	
	public void setGoodsReceiptDao(IGoodsReceiptDao goodsReceiptDao) {
		this.goodsReceiptDao = goodsReceiptDao;
	}
	
	public void setRehandlingOfRORODao(IRehandlingOfRORODao rehandlingOfRORODao) {
		this.rehandlingOfRORODao = rehandlingOfRORODao;
	}

	public void setShippingNoteDao(IShippingNoteDao shippingNoteDao) {
		this.shippingNoteDao = shippingNoteDao;
	}

	public void setBlDao(IBLDao blDao) {
		this.blDao = blDao;
	}

	public DataItemList selectDocumentComboItemList(SearchRehandlingOfROROParm parm) throws BizException {
		RehandlingOfROROItem returnItem = new RehandlingOfROROItem();
		if ("ORIGINAL".equals(parm.getSearchType())) {
			returnItem.setBlItems(rehandlingOfRORODao.selectBlComboBoxItems(parm).getCollection());
			returnItem.setSnItems(rehandlingOfRORODao.selectShipgNoteNoComboBoxItems(parm).getCollection());
		} else {
			returnItem.setNextSnItems(rehandlingOfRORODao.selectShipgNoteNoComboBoxItems(parm).getCollection());
		}

		DataItemList returnItems = new DataItemList();
		returnItems.add(returnItem);
		return returnItems;
	}

	public DataItemList selectOriginalCargoItems(SearchRehandlingOfROROParm parm) throws BizException {
		DataItemList list = rehandlingOfRORODao.selectOriginalCargoItems(parm);
		return list;
	}

	public DataItemList selectRehandlingCargoItems(SearchRehandlingOfROROParm parm) throws BizException {
		DataItemList list = rehandlingOfRORODao.selectRehandlingCargoItems(parm);
		return list;
	}

	public DataItemList deleteRehandlingItem(DeleteItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getDeleteItems();
		ArrayList<RehandlingOfROROItem> arrItem = (ArrayList<RehandlingOfROROItem>) itemList.getCollection();
		if (arrItem.size() > 0) {
			RehandlingOfROROItem item = (RehandlingOfROROItem) arrItem.get(0);

			// 1.0 Validation: Don't allow to delete if one of units already had next
			// operations : Yard Check or Handling Out
			SearchRehandlingOfROROParm rhdlParm = new SearchRehandlingOfROROParm();
			rhdlParm.setNextVslCallId(item.getNextVslCallId());
			rhdlParm.setShipgNoteNo(item.getShipgNoteNo());
			rhdlParm.setRhdlNo(item.getRhdlNo());

			String isDelete = rehandlingOfRORODao.selectDeletingValidationYn(rhdlParm);
			if ("N".equals(isDelete)) {
				item.setErrorDesc("CT246004");
			} else {
				// 2.0 deleting data from TMT_DAMAGE_CHECK
				if ("C".equals(item.getRhdlModeCd())) {
					rehandlingOfRORODao.deleteRehandlingUnitDamageItem(item);
					rehandlingOfRORODao.deleteOriginalDamageUnitItem(item); 
					// 3.0 delete data from TMT_GR
					rehandlingOfRORODao.deleteRehandlingGoodsReceiptItem(item);
					
					// 4.0 delete data from TMT_JOB
					rehandlingOfRORODao.deleteRehandlingCargoJobItem(item);
					
					// 5.0 delete data from TMT_SHIPG_NOTE
					rehandlingOfRORODao.deleteRehandlingShippingNoteItem(item);
				} else if ("R".equals(item.getRhdlModeCd())) {
					// 3.0 delete rehandle Goods Receipt 
					// rehandlingOfRORODao.deleteRehandlingGoodsReceiptItem(item);
				}

				// 6.0 Reverting original unit to Store
				rehandlingOfRORODao.deleteOriginalUnitItem(item);

				// 7.0 deleting rehandling unit
				rehandlingOfRORODao.deleteRehandlingUnitItem(item);

				// 8.0 delete data from TMT_RHDL_CG
				rehandlingOfRORODao.deleteRehandlingItem(item); 
				
			}
		}

		return itemList;
	}

	// DETAIL
	public DataItemList selectStackedUnitItems(SearchRehandlingOfROROParm parm) throws BizException {
		DataItemList list = rehandlingOfRORODao.selectStackedUnitItems(parm);
		return list;
	}

	public DataItemList selectRehandlingUnitItems(SearchRehandlingOfROROParm parm) throws BizException {
		DataItemList list = rehandlingOfRORODao.selectRehandlingUnitItems(parm);
		return list;
	}

	public DataItemList insertRehandlingOfROROItems(InsertItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getInsertItems();
		ArrayList<RehandlingOfROROItem> arrItem = (ArrayList<RehandlingOfROROItem>) itemList.getCollection();

		int rhdlQty = 0;
		Double rhdlMt = 0.0;
		Double rhdlM3 = 0.0;

		if (arrItem.size() > 0) {
			RehandlingOfROROItem item = (RehandlingOfROROItem) arrItem.get(0);
			SearchRehandlingOfROROParm rhdlParm = new SearchRehandlingOfROROParm();
			rhdlParm.setVslCallId(item.getVslCallId());
			rhdlParm.setCargoNo(item.getCargoNo());

			String rhdlGroupNo = rehandlingOfRORODao.selectRhdlGroupNo(rhdlParm);
			String rhdlNo = rehandlingOfRORODao.selectRhdlNo(rhdlParm);
			item.setRhdlNo(rhdlNo);
			String unitNos = makeUnitNo(arrItem);

			if ("C".equals(item.getRhdlModeCd())) {
				DataItemList insertSnItems = new DataItemList();
				InsertItemsBizParm insertSnParm = new InsertItemsBizParm();
				ShippingNoteItem snItem = buildShippingNote(item);
				insertSnItems.add(snItem);
				insertSnParm.setInsertItems(insertSnItems);
				ShippingNoteItem savedSnItem = (ShippingNoteItem) shippingNoteDao.insertItems(insertSnParm)
						.getCollection().get(0);

				GoodsReceiptItem grItem = this.buildGR(savedSnItem);
				DataItemList insertGrItems = new DataItemList();
				InsertItemsBizParm insertGrParm = new InsertItemsBizParm();
				insertGrItems.add(grItem);
				insertGrParm.setInsertItems(insertGrItems);
				GoodsReceiptItem savedGrItem = (GoodsReceiptItem) goodsReceiptDao.insertGoodsReceiptItems(insertGrParm).getCollection().get(0);
				
				item.setGrNo(grItem.getGdsRecvNo());
				item.setShipgNoteNo(grItem.getShipgNoteNo());
				item.setVslCd(grItem.getVslCd());
				item.setCallSeq(grItem.getCallSeq());
				item.setCallYear(grItem.getCallYear());
				
				CargoJobItem jobItem = this.buildJobItems(item);
				jobItem.setUnitNos(unitNos);
				DataItemList insertJobList = new DataItemList();
				insertJobList.add(jobItem);
				InsertItemsBizParm insJobParm = new InsertItemsBizParm();
				insJobParm.setInsertItems(insertJobList);
				CargoJobItem savedCargoJob =  (CargoJobItem) rehandlingOfRORODao.insertJobItems(insJobParm).getCollection().get(0);
				
				item.setJobNo(savedCargoJob.getJobNo());
				Integer maxSeq4JobDetail = rehandlingOfRORODao.selectMaxSeq4JobDetail(item);
				for (int i = 0; i < arrItem.size(); i++) {
					RehandlingOfROROItem cudItem = (RehandlingOfROROItem) arrItem.get(i);
					
					cudItem.setVslCd(savedCargoJob.getVslCd());
					cudItem.setCallSeq(savedSnItem.getCallSeq());
					cudItem.setCallYear(savedSnItem.getCallYear());
					
					cudItem.setRhdlGroupNo(rhdlGroupNo);
					cudItem.setRhdlNo(rhdlNo); 
					cudItem.setGrNo(savedGrItem.getGdsRecvNo());
					cudItem.setShipgNoteNo(savedGrItem.getShipgNoteNo());
					
					cudItem.setShipgNoteNo(savedGrItem.getShipgNoteNo());
					cudItem.setJobNo(savedCargoJob.getJobNo()); 
					cudItem.setJobTpCd("LF");
					cudItem.setJobPurpCd("GW");
					cudItem.setPkgQty("1");
					
					cudItem.setSeq(String.valueOf((maxSeq4JobDetail + i)));
					
					rhdlQty = rhdlQty + 1;
					if (cudItem.getUnitM3() != null && !"".equals(cudItem.getUnitM3())) {
						rhdlM3 = rhdlM3 + Double.valueOf(cudItem.getUnitM3());
					}

					if (cudItem.getUnitMt() != null && !"".equals(cudItem.getUnitMt())) {
						rhdlMt = rhdlMt + Double.valueOf(cudItem.getUnitMt());
					}
					// 1.0 Insert unit no to SHIPG_NOTE_DTL
					if (item.getRhdlModeCd().equalsIgnoreCase("C")) {
						ArrayList<ShippingNoteItem> snDtlItems = new ArrayList<>();
						if (savedSnItem != null) {
							ShippingNoteItem snDtlItem = (ShippingNoteItem) savedSnItem.clone();
							snDtlItem.setRoroSeq(cudItem.getRoroSeq());
							snDtlItem.setUnitNo(cudItem.getUnitNo());
							snDtlItem.setRoroMt(cudItem.getUnitMt());
							snDtlItem.setCbm(cudItem.getUnitM3());
							snDtlItem.setBrandCd(cudItem.getBrandCd());
							snDtlItem.setModelCd(cudItem.getModelCd());
							snDtlItem.setNewYn(cudItem.getNewYn());
							snDtlItem.setWorkingStatus(DAOProcessType.INSERT);
							snDtlItems.add(snDtlItem);
							savedSnItem.setUnitItems(snDtlItems);
						}

						ArrayList<ShippingNoteItem> unitArr = savedSnItem.getUnitItems();
						for (int j = 0; j < unitArr.size(); j++) {
							ShippingNoteItem rrItem = (ShippingNoteItem) unitArr.get(j);
							shippingNoteDao.insertRoRoItems(rrItem);
						}
					}

					// 2.0 Update original unit no
					rehandlingOfRORODao.updateOriginalUnitItem(cudItem);

					// 3.0 insert rehandling unit no
					rehandlingOfRORODao.insertRehandlingUnitItem(cudItem);
					rehandlingOfRORODao.insertJobDtlItemsOfRoRo(cudItem);
					/*
					 * //5.0 Creating a clone data of damage in case of change vessel
					 * if("C".equals(cudItem.getRhdlModeCd())){
					 * rehandlingOfRORODao.insertRehandlingUnitDamageItem(cudItem);
					 * rehandlingOfRORODao.updateOriginalDamageUnitItem(cudItem); }
					 * 
					 * //6.0 generating GR in case of Return to shipper
					 * if("R".equals(cudItem.getRhdlModeCd())){
					 * rehandlingOfRORODao.insertRehandlingGoodsReceiptItem(cudItem); }
					 */
				}

				// 7.0 Insert data into TMT_RHDL_CG
				item.setRhdlM3(String.valueOf(rhdlM3));
				item.setRhdlMt(String.valueOf(rhdlMt));
				item.setRhdlQty(String.valueOf(rhdlQty));
				
				rehandlingOfRORODao.insertRehandlingItem(item);

				// 8.0 Update amount of next SN in case of change vessel
				rehandlingOfRORODao.updateAmount4ShippingNoteItem(item); 
				rehandlingOfRORODao.updateAmount4CargoJobItem(item);				
			} else {
				for (int i = 0; i < arrItem.size(); i++) {
					InsertItemsBizParm insertRhdlParm = new InsertItemsBizParm();
					DataItemList insertRhdlItems = new DataItemList();
					RehandlingOfROROItem cudItem = (RehandlingOfROROItem) arrItem.get(i);

					cudItem.setRhdlGroupNo(rhdlGroupNo);
					cudItem.setRhdlNo(rhdlNo);
					cudItem.setRhdlModeCd(cudItem.getRhdlModeCd());
					cudItem.setBlNo(cudItem.getBlNo());
					cudItem.setDocNo(cudItem.getDocNo());
					cudItem.setIxCd(cudItem.getCatgCd());
					cudItem.setNextVslCallId(cudItem.getNextVslCallId());
					cudItem.setNextRefNo(cudItem.getNextRefNo());
					cudItem.setBookingNo(cudItem.getBookingNo());
					cudItem.setShipgNoteNo(item.getShipgNoteNo());
					cudItem.setOrgRefNo(cudItem.getCargoNo());
					cudItem.setRhdlPkgQty(1);
					cudItem.setRhdlMsrmt(Double.parseDouble(cudItem.getUnitM3()));
					cudItem.setRhdlWgt(Double.parseDouble(cudItem.getUnitMt()));

					// 2.0 Update original unit no
					cudItem.setOpeClassCd(CodeConstant.MT_CATGTP_S);
					rehandlingOfRORODao.updateOriginalUnitItem(cudItem);
					cudItem.setRhdlM3(String.valueOf(item.getRhdlMsrmt()));
					cudItem.setRhdlMt(String.valueOf(item.getRhdlWgt()));
					cudItem.setRhdlQty(String.valueOf(item.getRhdlPkgQty()));
					cudItem.setShipgNoteNo(String.valueOf(item.getNextRefNo()));
					cudItem.setRhdlNo(rhdlNo);
					insertRhdlItems.add(cudItem);
					insertRhdlParm.setInsertItems(insertRhdlItems);

					rehandlingOfRORODao.insertCargoRehandlingItems(insertRhdlParm);
				}
			}
		}

		return itemList;
	}

	private String makeUnitNo(ArrayList<RehandlingOfROROItem> arrItem) {
		StringBuilder unitNos = new StringBuilder();
		for(int i = 0; i < arrItem.size(); i++) {
		    unitNos.append(arrItem.get(i).getUnitNo()).append(",");
		}
		if (unitNos.length() > 0) {
		    unitNos.setLength(unitNos.length() - 1);
		}
		return unitNos.toString();
	}

	public DataItemList updateRehandlingOfROROItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
		ArrayList<RehandlingOfROROItem> arrItem = (ArrayList<RehandlingOfROROItem>) itemList.getCollection();
		int rhdlQty = 0;
		Double rhdlMt = 0.0;
		Double rhdlM3 = 0.0;

		if (arrItem.size() > 0) {
			RehandlingOfROROItem item = (RehandlingOfROROItem) arrItem.get(0);
			// 1.0 Validation: Don't allow to delete if one of units already had next
			// operations : Yard Check or Handling Out
			SearchRehandlingOfROROParm rhdlParm = new SearchRehandlingOfROROParm();
			rhdlParm.setNextVslCallId(item.getNextVslCallId());
			rhdlParm.setShipgNoteNo(item.getShipgNoteNo());
			rhdlParm.setRhdlNo(item.getRhdlNo());

			String isDelete = rehandlingOfRORODao.selectDeletingValidationYn(rhdlParm);
			if ("N".equals(isDelete)) {
				item.setErrorDesc("CT246004");
			} else {
				for (int i = 0; i < arrItem.size(); i++) {
					RehandlingOfROROItem cudItem = (RehandlingOfROROItem) arrItem.get(i);
					if ("D".equals(cudItem.getAction())) {
						// 1.0 deleting data from TCV_DAMAGE_CHECK
						if ("C".equals(cudItem.getRhdlModeCd())) {
							// rehandlingOfRORODao.deleteRehandlingUnitDamageItem(cudItem);
							// rehandlingOfRORODao.deleteOriginalDamageUnitItem(cudItem);
						}

						// 2.0 delete rehandle Goods Receipt
						if ("R".equals(cudItem.getRhdlModeCd())) {
							// rehandlingOfRORODao.deleteRehandlingWeighBridgeItem(cudItem);
							rehandlingOfRORODao.deleteRehandlingGoodsReceiptItem(cudItem);
						}

						// 3.0 Reverting original unit to Store
						rehandlingOfRORODao.deleteOriginalUnitItem(cudItem);

						// 4.0 deleting rehandling unit
						rehandlingOfRORODao.deleteRehandlingUnitItem(cudItem);
					} else if ("C".equals(cudItem.getAction())) {
						// 1.0 Update original unit no
						rehandlingOfRORODao.updateOriginalUnitItem(cudItem);

						// 2.0 insert rehandling unit no
						rehandlingOfRORODao.insertRehandlingUnitItem(cudItem);

						// 3.0 Creating a clone data of damage in case of change vessel
						if ("C".equals(cudItem.getRhdlModeCd())) {
							// rehandlingOfRORODao.insertRehandlingUnitDamageItem(cudItem);
							// rehandlingOfRORODao.updateOriginalDamageUnitItem(cudItem);
						}

						// 4.0 generating GR in case of Return to shipper
						if ("R".equals(cudItem.getRhdlModeCd())) {
							rehandlingOfRORODao.insertRehandlingGoodsReceiptItem(cudItem);
						}

						rhdlQty = rhdlQty + 1;
						if (cudItem.getUnitM3() != null && !"".equals(cudItem.getUnitM3())) {
							rhdlM3 = rhdlM3 + Double.valueOf(cudItem.getUnitM3());
						}

						if (cudItem.getUnitMt() != null && !"".equals(cudItem.getUnitMt())) {
							rhdlMt = rhdlMt + Double.valueOf(cudItem.getUnitMt());
						}
					} else {
						rhdlQty = rhdlQty + 1;
						if (cudItem.getUnitM3() != null && !"".equals(cudItem.getUnitM3())) {
							rhdlM3 = rhdlM3 + Double.valueOf(cudItem.getUnitM3());
						}

						if (cudItem.getUnitMt() != null && !"".equals(cudItem.getUnitMt())) {
							rhdlMt = rhdlMt + Double.valueOf(cudItem.getUnitMt());
						}
					}
				}
			}
		}
		return itemList;
	}

	private ShippingNoteItem buildShippingNote(RehandlingOfROROItem rehandleItem) throws BizException {
		ShippingNoteItem snItem = null;
		String opeClassCd = rehandleItem.getCatgCd();
		if (opeClassCd.equalsIgnoreCase(CodeConstant.MT_CATGTP_T)
				|| opeClassCd.equalsIgnoreCase(CodeConstant.MT_CATGTP_I)) {
			rehandleItem.setOpeClassCd(CodeConstant.MT_CATGTP_T);
			SearchBLParm blParm = new SearchBLParm();
			blParm.setVslCallId(rehandleItem.getVslCallId());
			blParm.setBlNo(rehandleItem.getCargoNo());
			blParm.setMfDocId(rehandleItem.getDocNo());
			BLItem blItem = (BLItem) blDao.selectBLList(blParm).getCollection().get(0);
			ArrayList<BLItem> blDetail = (ArrayList<BLItem>) blDao.selectBlCargoDetail(blParm).getCollection();
			blItem.setBlDetailItems(blDetail);

			SearchRehandlingOfROROParm rhParm = new SearchRehandlingOfROROParm();
			rhParm.setNextVslCallId(rehandleItem.getNextVslCallId());
			RehandlingOfROROItem nextVesselInfor = (RehandlingOfROROItem) rehandlingOfRORODao
					.selectNextVesselInfor(rhParm).getCollection().get(0);

			snItem = new ShippingNoteItem();
			BeanUtils.copyProperties(blItem, snItem);
			snItem.setVslCallId(rehandleItem.getNextVslCallId());
			snItem.setVslCd(nextVesselInfor.getVslCd());
			snItem.setCallYear(nextVesselInfor.getCallYear());
			snItem.setCallSeq(nextVesselInfor.getCallSeq());

			snItem.setMfDocId(blItem.getMfDocId());
			snItem.setShipgNoteNo(rehandleItem.getCargoNo());
			snItem.setPortOfDis(blItem.getFnlPortCd());
			snItem.setPortOfLoad(blItem.getPod());
			snItem.setPtnrCd(rehandleItem.getShipgAgentCd());
			snItem.setFwrd(blItem.getFwrd());
			snItem.setShpr(blItem.getShpr());
			snItem.setShprNm(blItem.getShprNm());
			snItem.setCnsne(blItem.getCnsne());
			snItem.setCnsneNm(blItem.getCnsneNm());

			snItem.setPkgTpCd(blItem.getPkgTpCd());
			snItem.setPkgNumber(blItem.getPkgNo());
			snItem.setCmdtGroupCd(blItem.getCmdtGrpCd());

			snItem.setCatgCd("T");
			snItem.setStatCd("AP");
			snItem.setTsptTpCd("LR");
			snItem.setDelvTpCd("I");
			snItem.setRhdlNo(rehandleItem.getRhdlNo());

			snItem.setCgWgt(rehandleItem.getRhdlWgt());
			snItem.setCgMsrmt(rehandleItem.getRhdlMsrmt());
			snItem.setPkgQty(rehandleItem.getRhdlPkgQty());
			snItem.setStaffCd(rehandleItem.getStaffCd());

			snItem.setEachWgt(Double.valueOf(StringUtils.isBlank(blItem.getEachWgt()) ? "0" : blItem.getEachWgt()));
			snItem.setEachMsrmt(Double.valueOf(StringUtils.isBlank(blItem.getEachVol()) ? "0" : blItem.getEachVol()));
			snItem.setCgLen(Double.valueOf(StringUtils.isBlank(blItem.getCgLength()) ? "0" : blItem.getCgLength()));
			snItem.setCgWth(Double.valueOf(StringUtils.isBlank(blItem.getCgWidth()) ? "0" : blItem.getCgWidth()));
			snItem.setCgHgt(Double.valueOf(StringUtils.isBlank(blItem.getCgHeight()) ? "0" : blItem.getCgHeight()));

			snItem.setUserId(rehandleItem.getUserId());
			return snItem;
		} else if (opeClassCd.equalsIgnoreCase(CodeConstant.MT_CATGTP_E)
				|| opeClassCd.equalsIgnoreCase(CodeConstant.MT_CATGTP_R)
				|| opeClassCd.equalsIgnoreCase(CodeConstant.MT_CATGTP_S)) {
			rehandleItem.setCatgCd(CodeConstant.MT_CATGTP_E);
			SearchShippingNoteParm parm = new SearchShippingNoteParm();
			parm.setVslCallId(rehandleItem.getVslCallId());
			parm.setShipgNoteNo(rehandleItem.getCargoNo());
			ShippingNoteItem orgSn = (ShippingNoteItem) shippingNoteDao.selectShippingNoteList(parm).getCollection()
					.get(0);

			SearchRehandlingOfROROParm rhParm = new SearchRehandlingOfROROParm();
			rhParm.setNextVslCallId(rehandleItem.getNextVslCallId());
			RehandlingOfROROItem nextVesselInfor = (RehandlingOfROROItem) rehandlingOfRORODao
					.selectNextVesselInfor(rhParm).getCollection().get(0);

			snItem = (ShippingNoteItem) orgSn.clone();
			snItem.setVslCallId(rehandleItem.getNextVslCallId());
			snItem.setVslCd(nextVesselInfor.getVslCd());
			snItem.setCallYear(nextVesselInfor.getCallYear());
			snItem.setCallSeq(nextVesselInfor.getCallSeq());
			snItem.setCatgCd("E");
			snItem.setTsptTpCd("LR");
			snItem.setDelvTpCd("I");
			snItem.setRhdlNo(rehandleItem.getRhdlNo());
			snItem.setUserId(rehandleItem.getUserId());
			return snItem;
		}
		return snItem;
	}

	private GoodsReceiptItem buildGR(ShippingNoteItem snItem) throws BizException {
		GoodsReceiptItem grItem = new GoodsReceiptItem();
		DataItemList list = goodsReceiptDao.selectGoodsReceiptNo(new SearchGoodsReceiptParm());
		String newGrNo = ((GoodsReceiptItem) (list.get(0))).getGdsRecvNo();

		grItem.setVslCallId(snItem.getVslCallId());
		grItem.setVslCd(snItem.getVslCd());
		grItem.setCallYear(snItem.getCallYear());
		grItem.setCallSeq(snItem.getCallSeq());
		grItem.setMfDocId(snItem.getMfDocId());
		grItem.setGdsRecvNo(newGrNo);
		grItem.setGrTsptTpCd(snItem.getTsptTpCd());
		grItem.setPkgTpCd(snItem.getPkgTpCd());
		grItem.setCmdtCd(snItem.getCmdtCd());
		grItem.setUserId(snItem.getUserId());
		grItem.setCmdtCd(snItem.getCmdtCd());
		grItem.setRhdlMode("C"); // Change Vessel
		grItem.setRhdlNo(snItem.getRhdlNo()); // Tobe Assign
		grItem.setSpCargoChk("N");
		grItem.setAdCargoChk("N");

		grItem.setGrMsrmt(snItem.getCgMsrmt());
		grItem.setGrWgt(snItem.getCgWgt());
		grItem.setGrQty(snItem.getPkgQty());
		grItem.setShipgNoteNo(snItem.getShipgNoteNo());

		return grItem;
	}
	
	private CargoJobItem buildJobItems(RehandlingOfROROItem rehandleItem) throws BizException{
    	CargoJobItem nxJobItem = new CargoJobItem();  	
    	SearchRehandlingOfROROParm rhParm = new SearchRehandlingOfROROParm();
		rhParm.setNextVslCallId(rehandleItem.getNextVslCallId());
		RehandlingOfROROItem nextVesselInfor = (RehandlingOfROROItem) rehandlingOfRORODao
				.selectNextVesselInfor(rhParm).getCollection().get(0);
		//Next CgJob
		
		nxJobItem.setVslCallId(rehandleItem.getNextVslCallId());
		nxJobItem.setVslCd(nextVesselInfor.getVslCd());
		nxJobItem.setCallSeq(nextVesselInfor.getCallSeq());
		nxJobItem.setCallYear(nextVesselInfor.getCallYear());
		nxJobItem.setJobNo(rehandleItem.getJobNo());
		nxJobItem.setShipgNoteNo(rehandleItem.getNextRefNo());
		nxJobItem.setCgNo(rehandleItem.getGrNo());
		nxJobItem.setDelvTpCd("I");
		nxJobItem.setOpeClassCd(rehandleItem.getOpeClassCd()); //Fix 20230103 "R"
		nxJobItem.setJobTpCd("LF");
		nxJobItem.setJobCoCd("G");
		nxJobItem.setJobPurpCd("GW");
		nxJobItem.setTsptTpCd("LR");
		nxJobItem.setPkgTpCd(rehandleItem.getCatgCd());
		nxJobItem.setRhdlMode(rehandleItem.getRhdlModeCd());
		nxJobItem.setRhdlNo(rehandleItem.getRhdlNo());
		nxJobItem.setBlNo(rehandleItem.getBlNo()); //original BLNO
		
		nxJobItem.setPkgQty(rehandleItem.getRhdlPkgQty());
		nxJobItem.setWgt(rehandleItem.getRhdlWgt());
		nxJobItem.setMsrmt(rehandleItem.getRhdlMsrmt());
		nxJobItem.setToLocId(rehandleItem.getLocId());
		nxJobItem.setStatCd("COM");
		nxJobItem.setFnlOpeYn("Y");
		nxJobItem.setUserId(rehandleItem.getUserId());
		nxJobItem.setMfDocId(rehandleItem.getDocNo());
		nxJobItem.setChassisNo(rehandleItem.getUnitNo());
		
		return nxJobItem;
    }
}
