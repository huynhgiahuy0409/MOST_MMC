package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.operation.IConfirmLoadingOfRORODao;
import com.tsb.most.biz.dao.operation.IROROMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoLoadingItem;
import com.tsb.most.biz.dataitem.operation.ConfirmDischargingOfROROItem;
import com.tsb.most.biz.dataitem.operation.ConfirmLoadingOfROROItem;
import com.tsb.most.biz.dataitem.operation.ROROMasterItem;
import com.tsb.most.biz.parm.operation.SearchCargoLoadingParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmLoadingOfROROParm;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ConfirmLoadingOfRORO implements IConfirmLoadingOfRORO {
	private IConfirmLoadingOfRORODao confirmLoadingOfRORODao;
	private IROROMasterDao roroMasterDao;
	private static String ALL = "*";

	public void setConfirmLoadingOfRORODao(IConfirmLoadingOfRORODao confirmLoadingOfRORODao) {
		this.confirmLoadingOfRORODao = confirmLoadingOfRORODao;
	}

	public void setRoroMasterDao(IROROMasterDao roroMasterDao) {
		this.roroMasterDao = roroMasterDao;
	}
	//////////////////////////////////////////////////////////

	public DataItemList selectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException {
		ConfirmLoadingOfROROItem returnItem = new ConfirmLoadingOfROROItem();
		// Direct
		returnItem.setDirectUnitItems(confirmLoadingOfRORODao.selectDirectUnitItems(parm).getCollection());

		// Indirect
		returnItem.setIndirectUnitItems(confirmLoadingOfRORODao.selectInDirectUnitItems(parm).getCollection());

		DataItemList returnItems = new DataItemList();
		returnItems.add(returnItem);
		return returnItems;
	}

	public DataItemList selectShipgNoteNoComboBoxItems(SearchConfirmLoadingOfROROParm parm) throws BizException {
		return confirmLoadingOfRORODao.selectShipgNoteNoComboBoxItems(parm);
	}

	public DataItemList selectCargoItems(SearchConfirmLoadingOfROROParm parm) throws BizException {
		DataItemList list = confirmLoadingOfRORODao.selectCargoItems(parm);
		if(list.size() > 0 ) {
			List<String> unitList = new ArrayList<String>();
			List<String> vgUnit = new ArrayList<String>();
			ConfirmLoadingOfROROItem items = (ConfirmLoadingOfROROItem) list.get(0);
			if(items.getUnitNo() != null && !items.getUnitNo().equals("")){
				unitList = Arrays.asList(items.getUnitNo().split("\\s*,\\s*"));
				if(items.getVgUnitNo() != null && !items.getVgUnitNo().equals("")) {
					vgUnit = Arrays.asList(items.getVgUnitNo().split("\\s*,\\s*"));
	
					List<String> tempListUnit = new ArrayList<String>();
					for(int i=0; i < unitList.size(); i++) {
						if(!vgUnit.contains(unitList.get(i))) {
							tempListUnit.add(unitList.get(i));
						}
					}
					String unitNos = String.join(",", tempListUnit);
					items.setUnitNo(unitNos);
				}
			}
		}
        return list;
	}

	public DataItemList selectInDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException {
		return confirmLoadingOfRORODao.selectInDirectUnitItems(parm);
	}

	public DataItemList selectDirectUnitItems(SearchConfirmLoadingOfROROParm parm) throws BizException {
		return confirmLoadingOfRORODao.selectDirectUnitItems(parm);
	}

	@Override
	public DataItemList updateConfirmYardAndLoadingCheckForRoRo(UpdateItemsBizParm parm) throws BizException {
		DataItemList returnItem = new DataItemList();

		DataItemList items = parm.getUpdateItems();

		ConfirmLoadingOfROROItem jobItem = null;
		ConfirmLoadingOfROROItem waJobItem = null;
		String jobGroupNo = null;

		SearchCargoMasterParm mstParm;
		DataItemList insertItems = new DataItemList();
		DataItemList updateRRMstAmtItems = new DataItemList();
		DataItemList updateRRMstStatItems = new DataItemList();

		DataItemList insertJobItems = new DataItemList();
		DataItemList updateGateInItems = new DataItemList();

		ConfirmLoadingOfROROItem item = (ConfirmLoadingOfROROItem) items.get(0);
		String uuid = UUID.randomUUID().toString();
		item.setNewVersion(uuid);

		mstParm = new SearchCargoMasterParm();
		mstParm.setCgNo(item.getShipgNoteNo());
		mstParm.setVslCallId(item.getVslCallId());
		mstParm.setLorryNo(item.getLorryNo());
		mstParm.setCgInOutCd("I");
		jobGroupNo = roroMasterDao.selectJobGroupNo(mstParm);
		item.setJobGroup(jobGroupNo);
		item.setCgNo(item.getShipgNoteNo());

		/* C3 : DIRECT INSERT JOB AND INV_LOC NORMAL */
		if (item.getDelvTpCd().equals(CodeConstant.MT_DELVTP_D)) {
			SearchCargoLoadingParm loadingParm = new SearchCargoLoadingParm();
			loadingParm.setCgNo(item.getGrNo());
			loadingParm.setVslCallId(item.getVslCallId());
			loadingParm.setLorryNo(item.getLorryNo());
			loadingParm.setGateTxnNo(item.getGateTxnNo());

			/* C3.2.1 insert Job Item */
			jobItem = (ConfirmLoadingOfROROItem) item.clone();
			jobItem.setCgNo(item.getGrNo());
			jobItem.setJobTpCd(CodeConstant.MT_JOBTP_LD);
			jobItem.setStatCd(CodeConstant.MT_JOBSTATCD_COM);
			if (jobItem.getDriverId() != null && !jobItem.getDriverId().equals("")) {
				jobItem.setTsptTpCd("OH");
			}
			jobItem.setDmgYn("N");
			jobItem.setShuYn("N");
			jobItem.setToLocId(item.getLocId());
			jobItem.setMfDocId(item.getMfDocId());
			jobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
			insertJobItems.add(jobItem);

			// TMT_CG_ARRV_DELV
			jobItem.setCgInOutCd("I");
			String gateInSeq = confirmLoadingOfRORODao.selectGateInTimeSeq(loadingParm);
			if (gateInSeq != null) {// exists ArrvDelv
				jobItem.setSeq(gateInSeq);
				updateGateInItems.add(jobItem);
			}
		} else {
			double compMt = 0;
			double compM3 = 0;
			int compQty = 0;
			boolean flagMt = false;
			boolean flagM3 = false;
			boolean flagQty = false;
			boolean flagWV = false;

			if (item.getLoadMt() > 0) {
				compMt = item.getLoadMt();
				flagMt = true;
				flagM3 = false;
				flagQty = false;
			} else if (item.getLoadM3() > 0) {
				compM3 = item.getLoadM3();
				flagMt = false;
				flagM3 = true;
				flagQty = false;
			} else if (item.getLoadQty() > 0) {
				compQty = item.getLoadQty();
				flagMt = false;
				flagM3 = false;
				flagQty = true;
			} else {
				flagMt = false;
				flagM3 = false;
				flagQty = false;
			}

			if (flagMt) {
				if (compMt > 0) {
					flagWV = true;
				} else {
					flagWV = false;
				}
			} else if (flagM3) {
				if (compM3 > 0) {
					flagWV = true;
				} else {
					flagWV = false;
				}
			} else if (flagQty) {
				if (compQty > 0) {
					flagWV = true;
				} else {
					flagWV = false;
				}
			} else {
				flagWV = false;
			}
			if (!(item.getLoadMt() == 0 && item.getLoadQty() == 0)) {
				// Insert Job Items For Normal
				if (flagWV) {
					jobItem = (ConfirmLoadingOfROROItem) item.clone();
					jobItem.setCgNo(item.getGrNo());
					jobItem.setJobPurpCd(CodeConstant.MT_JOBPURP_AV);
					jobItem.setJobTpCd(CodeConstant.MT_JOBTP_LD);
					jobItem.setStatCd(CodeConstant.MT_JOBSTATCD_COM);

					if (jobItem.getStevedoreId() != null && !jobItem.getStevedoreId().equals("")) {
						jobItem.setTsptTpCd("OH");
					}
					jobItem.setDmgYn("N");
					jobItem.setShuYn("N");
					jobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
					jobItem.setLoadMt(item.getLoadMt());
					jobItem.setLoadM3(item.getLoadM3());
					jobItem.setLoadQty(item.getLoadQty());
					jobItem.setMfDocId(item.getMfDocId());
					insertJobItems.add(jobItem);

				} else {
					waJobItem = (ConfirmLoadingOfROROItem) item.clone();
					waJobItem.setCgNo(item.getGrNo());
					waJobItem.setJobPurpCd("WA");
					waJobItem.setJobTpCd(CodeConstant.MT_JOBTP_LD);
					waJobItem.setStatCd(CodeConstant.MT_JOBSTATCD_COM);
					if (waJobItem.getStevedoreId() != null && !waJobItem.getStevedoreId().equals("")) {
						waJobItem.setTsptTpCd("OH");
					}
					waJobItem.setDmgYn("N");
					waJobItem.setShuYn("N");
					waJobItem.setToLocId(item.getLocId());
					waJobItem.setJobCoCd(CodeConstant.INVLOC_WH_TP_NORMAL);
					waJobItem.setLoadMt(item.getLoadMt());
					waJobItem.setLoadM3(item.getLoadM3());
					waJobItem.setLoadQty(item.getLoadQty());
					waJobItem.setMfDocId(item.getMfDocId());
					insertJobItems.add(waJobItem);
				}
				/* C4.2 Normal Case for DBK */
			} // TMT_JOB AND INV_LOC insert Nomarl AMT End
		}
		if (item.getUnitNo() != null && !item.getUnitNo().equals("")) {
			item.setUnitNo(makeInValue(item.getUnitNo()));
		}
		/* C1 : Direct TMT_RORO_MST insert/update */
		if (item.getDelvTpCd().equals(CodeConstant.MT_DELVTP_D)) {
			if (confirmLoadingOfRORODao.selectIsROROMst(mstParm)) {
				item.setStatCd(CodeConstant.MT_JOBTP_LD);
				updateRRMstStatItems.add(item);
				if (!(item.getLoadMt() == 0 && item.getLoadQty() == 0)) {
					updateRRMstAmtItems.add(item);
					updateRRMstAmtItems.add(item);
				}
			} else {
				item.setStatCd(CodeConstant.MT_JOBTP_LD);
				insertItems.add(item);
			}
			/* C2 : InDirect TMT_RORO_MST update */
		} else {// TMT_RORO_MST, TMT_JOB in all shipging
			if (confirmLoadingOfRORODao.selectIsROROMst(mstParm)) {
				item.setStatCd(CodeConstant.MT_JOBTP_LD);
				updateRRMstStatItems.add(item);
			}
		}

		if (insertItems.size() > 0) {
//			confirmLoadingOfRORODao.insertCargoLoadingItems(insertItems);
		}
		if (updateRRMstStatItems.size() > 0) {
			UpdateItemsBizParm updBizParm = new UpdateItemsBizParm();
			updBizParm.addUpdateItem(updateRRMstStatItems);

			confirmLoadingOfRORODao.updateConfirmYardAndLoadingCheckForRoRo(updBizParm);
		}
		if (insertJobItems.size() > 0) {
			confirmLoadingOfRORODao.insertJobItems(insertJobItems);
			confirmLoadingOfRORODao.updateNextJobNoForWAJob(insertJobItems);

			returnItem.add(insertJobItems);

		}

		return returnItem;
	}

	private String makeInValue(String value) {
		if (value == null || value.length() == 0) {
			return value;
		} else if (value.equals(ALL)) {
			return null;
		}
		StringTokenizer st = new StringTokenizer(value, ",");
		StringBuffer sql = new StringBuffer();
		sql.append("(");
		while (st.hasMoreElements()) {
			sql.append("'");
			sql.append(st.nextElement().toString().trim());
			sql.append("'");
			if (st.hasMoreElements()) {
				sql.append(",");
			}
		}
		sql.append(")");

		return sql.toString();
	}

	private ROROMasterItem buildROROMasterItem(ConfirmLoadingOfROROItem item) {
		ROROMasterItem mstItem = new ROROMasterItem();

		mstItem.setVslCallId(item.getVslCallId());
		mstItem.setVslCd(item.getVslCd());
		mstItem.setCallYear(item.getCallYear());
		mstItem.setCallSeq(item.getCallSeq());
		mstItem.setMfDocId(item.getBookingNo());
		mstItem.setCgNo(item.getShipgNoteNo());
		mstItem.setIxCd(item.getIxCd());

		mstItem.setUnitNo(item.getUnitNo());
		mstItem.setRoroSeq(item.getRoroSeq());
		mstItem.setBrandCd(item.getBrandCd());
		mstItem.setModelCd(item.getModelCd());
		mstItem.setDocWgt(item.getDocWgt());
		mstItem.setCbm(item.getCbm());
		mstItem.setNewYn(item.getNewYn());
		mstItem.setCatgCd(item.getCatgCd());
		mstItem.setCgTpCd(item.getCgTpCd());
		// mstItem.setStatCd(item.getStatCd());
		mstItem.setUserId(item.getUserId());

		return mstItem;
	}

	///////////////////////////////////////////////////////////////////////////////////
	public DataItemList selectCargoItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException {
		return confirmLoadingOfRORODao.selectCargoItemsHHT(parm);
	}

	public DataItemList selectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException {
		ConfirmLoadingOfROROItem returnItem = new ConfirmLoadingOfROROItem();

		// Indirect
		returnItem.setIndirectUnitItems(confirmLoadingOfRORODao.selectInDirectUnitItemsHHT(parm).getCollection());

		// Direct
		if (parm.getSearchType() != null && parm.getSearchType().equals("ConfirmLoadingCheckHHT")) {
			parm.setStatCd("RS");
		}
		returnItem.setDirectUnitItems(confirmLoadingOfRORODao.selectDirectUnitItemsHHT(parm).getCollection());

		DataItemList returnItems = new DataItemList();
		returnItems.add(returnItem);
		return returnItems;
	}

	public DataItemList selectInDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException {
		return confirmLoadingOfRORODao.selectInDirectUnitItemsHHT(parm);
	}

	public DataItemList selectDirectUnitItemsHHT(SearchConfirmLoadingOfROROParm parm) throws BizException {
		return confirmLoadingOfRORODao.selectDirectUnitItemsHHT(parm);
	}

	public DataItemList deleteItemsHHT(UpdateItemsBizParm parm) throws BizException {
		return confirmLoadingOfRORODao.updateConfirmYardAndLoadingCheckForRoRo(parm);
	}

	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();

		// RORO Master
		DataItemList insertMstItems = new DataItemList();
		InsertItemsBizParm insertMstParm = new InsertItemsBizParm();
		SearchROROMasterParm mstParm = new SearchROROMasterParm();
		ROROMasterItem mstItem = new ROROMasterItem();
		for (ConfirmLoadingOfROROItem item : (ArrayList<ConfirmLoadingOfROROItem>) itemList.getCollection()) {
			if (item == null)
				return null;
			mstParm.setVslCallId(item.getVslCallId());
			mstParm.setMfDocId(item.getBookingNo());
			mstParm.setCgNo(item.getShipgNoteNo());
			mstParm.setUnitNo(item.getUnitNo());
			mstParm.setRoroSeq(item.getRoroSeq());
			if (!roroMasterDao.selectIsExistedROROMst(mstParm)) {
				mstItem = buildROROMasterItem(item);
				insertMstItems.add(mstItem);
			}
		}
		insertMstParm.setInsertItems(insertMstItems);
		if (insertMstItems.size() > 0) {
			roroMasterDao.insertROROMasterItems(insertMstParm);
		}

		return confirmLoadingOfRORODao.updateConfirmYardAndLoadingCheckForRoRo(parm);
	}
}
