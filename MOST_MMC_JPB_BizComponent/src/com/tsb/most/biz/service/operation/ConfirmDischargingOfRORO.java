package com.tsb.most.biz.service.operation;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;
import java.util.UUID;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.biz.dao.operation.IConfirmDischargingOfRORODao;
import com.tsb.most.biz.dao.operation.IROROMasterDao;
import com.tsb.most.biz.dataitem.operation.CargoArrvDelvItem;
import com.tsb.most.biz.dataitem.operation.CargoDischargingItem;
import com.tsb.most.biz.dataitem.operation.ConfirmDischargingOfROROItem;
import com.tsb.most.biz.dataitem.operation.ROROMasterItem;
import com.tsb.most.biz.dataitem.planning.RoRoYardPlanItem;
import com.tsb.most.biz.parm.operation.SearchCargoArrvDelvParm;
import com.tsb.most.biz.parm.operation.SearchCargoMasterParm;
import com.tsb.most.biz.parm.operation.SearchConfirmDischargingOfROROParm;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ConfirmDischargingOfRORO implements IConfirmDischargingOfRORO{
	private IConfirmDischargingOfRORODao confirmDischargingOfRORODao;
	private IROROMasterDao roroMasterDao;
	private static String ALL = "*";

	public void setConfirmDischargingOfRORODao(IConfirmDischargingOfRORODao confirmDischargingOfRORODao) {
		this.confirmDischargingOfRORODao = confirmDischargingOfRORODao;
	}

	public void setRoroMasterDao(IROROMasterDao roroMasterDao) {
		this.roroMasterDao = roroMasterDao;
	}

	public DataItemList selectBlComboItems(SearchConfirmDischargingOfROROParm parm) throws BizException{
		DataItemList list = confirmDischargingOfRORODao.selectBlComboItems(parm);
        return list;
	}
	
	public DataItemList selectCargoItems(SearchConfirmDischargingOfROROParm parm) throws BizException{
		DataItemList list = confirmDischargingOfRORODao.selectCargoItems(parm);
        return list;
	}
	
	public DataItemList selectUnitItems(SearchConfirmDischargingOfROROParm parm) throws BizException{
		DataItemList list = confirmDischargingOfRORODao.selectUnitItems(parm);
        return list;
	}
	
	public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
		DataItemList response = new DataItemList();
		DataItemList masterItem = parm.getUpdateItems();

		ConfirmDischargingOfROROItem mstItem = null;
		ConfirmDischargingOfROROItem jobItem = null;
		ConfirmDischargingOfROROItem delvItem = null;
		ConfirmDischargingOfROROItem balItem = null;
		ConfirmDischargingOfROROItem invLocItem = null;

        DataItemList insertItems = new DataItemList();
        DataItemList updateItems = new DataItemList();
        DataItemList deleteItems = new DataItemList();

        DataItemList insertJobItems = new DataItemList();
        DataItemList insertDelvItems = new DataItemList();
        DataItemList updateDelvItems = new DataItemList();

        DataItemList updateDischaringFinalItems = new DataItemList();

        String jobGroupNo = null;
		for(int i = 0; i < masterItem.size(); i++) {
			ConfirmDischargingOfROROItem item = (ConfirmDischargingOfROROItem) masterItem.get(i);
			String uuid = UUID.randomUUID().toString();
            item.setNewVersion(uuid);
    		SearchCargoMasterParm mstParm = new SearchCargoMasterParm();
            mstParm.setVslCallId(item.getVslCallId());
            mstParm.setCgNo(item.getBlNo());
            if (i == 0) {
                jobGroupNo = roroMasterDao.selectJobGroupNo(mstParm);

            }
            item.setJobGroup(jobGroupNo);
            /**
             * ***DIRECT Cargo TMT_JOB, TMT_RORO_MST, TMT_CG_ARRV_DELV***
             */
            if (item.getOpDelvTpCd().equals("D")) {
                mstParm.setLorryNo(item.getLorryId());
                mstParm.setCgInOutCd("O");
                // LoadQty
                item.setPkgQty(item.getLoadQty());
                item.setWgt(item.getLoadMt());
                item.setMsrmt(item.getLoadM3());
                item.setStatCd("OD");
                if(item.getDunitNo() != null && !item.getDunitNo().equals("")) {
                	item.setUnitNo(makeInValue(item.getDunitNo()));
                }
                
                if (item.getFnlOpeYn().equals("Y") || item.getFnlOpeYn().equals("true")) {
                    item.setDisEndDt(item.getEndDt());
                    item.setDisEndDtStr(item.getEndDtStr());
                    updateDischaringFinalItems.add(item);
                }
             // TMT_JOB
                jobItem = (ConfirmDischargingOfROROItem) item.clone();// Direct
                jobItem.setPkgQty(item.getLoadQty());
                jobItem.setWgt(item.getLoadMt());
                jobItem.setMsrmt(item.getLoadM3());
                jobItem.setLorryId(item.getLorryId());
//                        jobItem.setShftId(item.getShftId());
                jobItem.setJobTpCd("DS");
                jobItem.setDelvTpCd("D");
                jobItem.setStatCd("COM");
                if (item.getFnlOpeYn().equals("Y") && item.getEndDt() != null) {// if finalOpe
                	jobItem.setFnlOpeYn("Y");
                }
                if (item.getDriverId() != null  && !item.getDriverId().equals("")) {// set mode of operation
                	jobItem.setTsptTpCd("OH");
                }

                jobItem.setUnitNo("");
                jobItem.setJobCoCd("G");
                insertJobItems.add(jobItem);
                
                delvItem = (ConfirmDischargingOfROROItem) item.clone();
                delvItem.setJobCoCd("G");
                delvItem.setJobTpCd("DS");
                delvItem.setDelvTpCd("D");
                delvItem.setCgInOutCd("O");
                if (roroMasterDao.selectIsCargoAvDvChk(mstParm)) {
                    if (jobItem.getFnlDelvYn() != null  
                    		&& (jobItem.getFnlDelvYn().equals("Y") || jobItem.getFnlDelvYn().equals("true") ) ) {
                        delvItem.setFnlYn("Y");
                        updateDelvItems.add(delvItem);
                    } else {
                        updateDelvItems.add(delvItem);
                    }
                } else {
                    if (jobItem.getFnlDelvYn() != null && jobItem.getFnlDelvYn().equals("Y")) {
                        delvItem.setFnlYn("Y");
                        insertDelvItems.add(delvItem);
                    } else {
                        insertDelvItems.add(delvItem);
                    }
                }
            }else if (item.getOpDelvTpCd().equals("I")){

                mstItem = (ConfirmDischargingOfROROItem) item.clone();
                mstItem.setPkgQty(item.getWhQty());
                mstItem.setWgt(item.getWhWgt());
                mstItem.setMsrmt(item.getWhM3()); 
                if(item.getIunitNo() != null && !item.getIunitNo().equals("")) {
                	item.setUnitNo(makeInValue(item.getIunitNo()));
                }
                
                if (confirmDischargingOfRORODao.selectIsROROMst(mstParm)) {
                    updateItems.add(mstItem);
                    if (item.getFnlOpeYn().equals("Y") || item.getFnlOpeYn().equals("true")) {// if finalOpe true  discharging
                        item.setDisEndDt(item.getEndDt());
                        item.setDisEndDtStr(item.getEndDtStr());
                        updateDischaringFinalItems.add(item);
                    }
                }else {
                    insertItems.add(mstItem);
                    if (item.getFnlOpeYn().equals("Y")
                            || item.getFnlOpeYn().equals("true")) {
                        item.setDisEndDt(item.getEndDt());
                        item.setDisEndDtStr(item.getEndDtStr());
                        updateDischaringFinalItems.add(item);
                    }
                }
                
            	delvItem = (ConfirmDischargingOfROROItem) item.clone();
            	if (!(item.getDmgWgt() == 0 && item.getDmgM3() == 0 && item.getDmgQty() == 0)) {
                    item.setDmgYn("Y");
                } else {
                    item.setDmgYn("N");
                }
            	if (item.getFnlOpeYn().equals("Y") || item.getFnlOpeYn().equals("true")) {// if finalOpe true  discharging
                    item.setDisEndDt(item.getEndDt());
                    item.setDisEndDtStr(item.getEndDtStr());
                    updateDischaringFinalItems.add(item);
                }
            	ConfirmDischargingOfROROItem jobGeneralItem = (ConfirmDischargingOfROROItem) item.clone();
            	jobGeneralItem.setPkgQty(item.getWhQty());
                jobGeneralItem.setWgt(item.getWhWgt());
                jobGeneralItem.setMsrmt(item.getWhM3());
                jobGeneralItem.setJobTpCd("DS");
                jobGeneralItem.setStatCd("COM");
                jobGeneralItem.setDelvTpCd("I");
                jobGeneralItem.setDmgYn("N");
                jobGeneralItem.setJobCoCd("G");

                jobGeneralItem.setUnitNo("");
                if(jobGeneralItem.getStevedoreId() != null && !jobGeneralItem.getStevedoreId().equals("")) {
                	jobGeneralItem.setTsptTpCd("OH");
                }
//              jobGeneralItem.setShftId(item.getShftId());
                insertJobItems.add(jobGeneralItem);
            }
            
		}
		if (insertItems.size() > 0) {
	        DataItemList insertROROItems = new DataItemList();
			List<String> unitNoList = new ArrayList<String>();
			if(mstItem.getIunitNo() != null && mstItem.getIunitNo() != null) {
				unitNoList = Arrays.asList(mstItem.getIunitNo().split("\\s*,\\s*"));

				for(int j=0; j < unitNoList.size(); j++) {
					ConfirmDischargingOfROROItem rrItem = (ConfirmDischargingOfROROItem) mstItem.clone();
					rrItem.setUnitNo(unitNoList.get(j));
					insertROROItems.add(rrItem);
				}
			}
			if(insertROROItems.size() > 0) {
				confirmDischargingOfRORODao.insertConfirmDischargingOfRoRo(insertROROItems);
			}
        }
		if (insertJobItems.size() > 0) {
			confirmDischargingOfRORODao.insertJobItems(insertJobItems);
        	response.add(insertJobItems);
        }
		if (updateDelvItems.size() > 0) {
            for (int i = 0; i < updateDelvItems.size(); i++) {
            	ConfirmDischargingOfROROItem item = (ConfirmDischargingOfROROItem) updateDelvItems.get(i);

                // Get gate pass numer
                SearchCargoArrvDelvParm gpParm = new SearchCargoArrvDelvParm();
                gpParm.setVslCallId(item.getVslCallId());
                List gpList = confirmDischargingOfRORODao.selectGatepassNo(gpParm).getCollection();
                if (gpList != null && gpList.size() > 0) {
                    CargoArrvDelvItem gpItem = (CargoArrvDelvItem) gpList.get(0);
                    item.setGatePassNo(gpItem.getGatePassNo());
                    response.add(gpList);
                }
                // Update processing
                DataItemList tmpArrvDelvItems = new DataItemList();
                tmpArrvDelvItems.add(item);
                confirmDischargingOfRORODao.updateDelvItems(tmpArrvDelvItems);
            }
        }
//		 if (updateDischaringFinalItems.size() > 0) {
//			 confirmDischargingOfRORODao.updateDischaringFinals(updateDischaringFinalItems);
//         }
		if (updateItems.size() > 0) {
			confirmDischargingOfRORODao.updateConfirmDischargingOfRoRo(parm);
        }
		
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

	private ROROMasterItem buildROROMasterItem(ConfirmDischargingOfROROItem item) {
    	ROROMasterItem mstItem = new ROROMasterItem();
		
		mstItem.setVslCallId(item.getVslCallId());
		mstItem.setVslCd(item.getVslCd());
		mstItem.setCallYear(item.getCallYear());
		mstItem.setCallSeq(item.getCallSeq());
		mstItem.setMfDocId(item.getMasterBlNo());
		mstItem.setCgNo(item.getBlNo());
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
		//mstItem.setStatCd(item.getStatCd());
		mstItem.setUserId(item.getUserId());
		
		return mstItem;
	}
	
	public DataItemList deleteItems(UpdateItemsBizParm parm) throws BizException {
		return confirmDischargingOfRORODao.updateConfirmDischargingOfRoRo(parm);
	}
	
	public DataItemList selectApronCheckerImportList(SearchConfirmDischargingOfROROParm parm) throws BizException{
        return confirmDischargingOfRORODao.selectApronCheckerImportList(parm);
	}
	
	public DataItemList selectUnitItemsHHT(SearchConfirmDischargingOfROROParm parm) throws BizException{
        return confirmDischargingOfRORODao.selectUnitItemsHHT(parm);
	}
	
	public DataItemList updateItemsHHT(UpdateItemsBizParm parm) throws BizException {
		DataItemList itemList = parm.getUpdateItems();
		DataItemList insertItems = new DataItemList();
		InsertItemsBizParm insertParm = new InsertItemsBizParm();
		
		//For UNIT No. Correction/ RORO Master
		InsertItemsBizParm insertMstParm = new InsertItemsBizParm();
		DataItemList insertMstItems = new DataItemList();
		ROROMasterItem mstItem = new ROROMasterItem();
		SearchROROMasterParm mstParm = new SearchROROMasterParm();
		
		for(ConfirmDischargingOfROROItem item : (ArrayList<ConfirmDischargingOfROROItem>)itemList.getCollection()) {
			if(item == null)
				return null;
			if("Y".equals(item.getCorrectionUnitNoYN())) {
				insertItems.add(item);
				
			}
			
			mstParm.setVslCallId(item.getVslCallId());
			mstParm.setMfDocId(item.getMasterBlNo());
			mstParm.setCgNo(item.getBlNo());
			mstParm.setUnitNo(item.getUnitNo());
			mstParm.setRoroSeq(item.getRoroSeq());
			if(!roroMasterDao.selectIsExistedROROMst(mstParm)) {
				mstItem = buildROROMasterItem(item);
				insertMstItems.add(mstItem);
			}
		}
		
		
		//RORO MASTER
		insertMstParm.setInsertItems(insertMstItems);
    	if(insertMstItems.size()>0) {
    		roroMasterDao.insertROROMasterItems(insertMstParm);
		}
    	
    	//UNIT CORRECTION
		insertParm.setInsertItems(insertItems);
		if(insertItems.size()>0) {
			confirmDischargingOfRORODao.insertUnitCorrectionOfRoRo(insertParm);
		}
		
		return confirmDischargingOfRORODao.updateConfirmDischargingOfRoRoHHT(parm);
	}
	
	public DataItemList deleteItemsHHT(UpdateItemsBizParm parm) throws BizException {
		return confirmDischargingOfRORODao.updateConfirmDischargingOfRoRoHHT(parm);
	}
}
