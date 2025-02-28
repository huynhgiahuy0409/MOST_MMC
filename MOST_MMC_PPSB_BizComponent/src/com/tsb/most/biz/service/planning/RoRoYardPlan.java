package com.tsb.most.biz.service.planning;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.StringTokenizer;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.biz.dao.operation.IROROMasterDao;
import com.tsb.most.biz.dao.planning.IRoRoYardPlanDao;
import com.tsb.most.biz.dataitem.operation.ConfirmDischargingOfROROItem;
import com.tsb.most.biz.dataitem.operation.ROROMasterItem;
import com.tsb.most.biz.dataitem.planning.RoRoYardPlanItem;
import com.tsb.most.biz.parm.operation.SearchROROMasterParm;
import com.tsb.most.biz.parm.planning.SearchRoRoYardPlanParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RoRoYardPlan extends MOSTBaseService implements IRoRoYardPlan{

	private IRoRoYardPlanDao roroYardPlanDao;
	private IROROMasterDao roroMasterDao;
	private static String ALL = "*";
	
	public void setRoroYardPlanDao(IRoRoYardPlanDao roroYardPlanDao) {
		this.roroYardPlanDao = roroYardPlanDao;
	}
	
    public void setRoroMasterDao(IROROMasterDao roroMasterDao) {
		this.roroMasterDao = roroMasterDao;
	}

	public DataItemList selectRoRoYardPlanCargoList(SearchRoRoYardPlanParm parm) throws BizException {
        DataItemList list = roroYardPlanDao.selectRoRoYardPlanCargoList(parm);
        return list;
    }
    
    public DataItemList selectRoRoYardPlanUnitList(SearchRoRoYardPlanParm parm) throws BizException {
    	DataItemList list = new DataItemList();
    	if(parm.getCatgCd() != null && (parm.getCatgCd().equals("I") || parm.getCatgCd().equals("T"))) {
    		if((parm.getDoNo() != null && !parm.getDoNo().equals("")) ) {
    			if(parm.getUnitNo() != null && !parm.getUnitNo().equals("")) {
        			parm.setUnitNo(makeInValue(parm.getUnitNo()));
        		}
            	list = roroYardPlanDao.selectRoRoYardPlanUnitList(parm);
            	if(list.size() <= 0 && parm.getDelvTpCd() != null && parm.getDelvTpCd().equals("I")) {
            		parm.setSearchType("DS");
            		list = roroYardPlanDao.selectUnitsFromBLList(parm);
            		if(list.size() <= 0) {
            			//Select all units
                		parm.setSearchType("");
                		list = roroYardPlanDao.selectUnitsFromBLListByMode(parm);
                	}
            	}else if(list.size() <= 0 && (parm.getDelvTpCd() == null || parm.getDelvTpCd().equals("")) && parm.getSearchType().equals("WHIP")) {
            		list = roroYardPlanDao.selectUnitsFromBLList(parm);
            	}
        	}else if(parm.getSearchType() != null && !parm.getSearchType().equals("") && parm.getSearchType().equals("WHIP")){
        		//WH CHeck Import
        		if(parm.getUnitNo() != null && !parm.getUnitNo().equals("")) {
        			parm.setUnitNo(makeInValue(parm.getUnitNo()));
        		}
        		list = roroYardPlanDao.selectRoRoYardPlanUnitWHCheckImportList(parm);
        	}else if(parm.getSearchType() != null && !parm.getSearchType().equals("") && parm.getSearchType().equals("HO")){
        		//Confirm Handling Out
        		parm.setUnitNo(makeInValue(parm.getUnitNo()));
        		list = roroYardPlanDao.selectRoRoYardPlanUnitHandlingOutList(parm);
        	} else if(parm.getGrNo() != null && !parm.getGrNo().equals("")) {
        		parm.setCatgCd(CodeConstant.MT_CATGTP_E);
        		list = roroYardPlanDao.selectRoRoYardPlanUnitList(parm);
        	} else {
        		if(parm.getCatgCd() != null && !parm.getCatgCd().equals("") && parm.getCatgCd().equals("T")) {
        			parm.setUnitNo(makeInValue(parm.getUnitNo()));
            		list = roroYardPlanDao.selectRoRoYardPlanUnitList(parm);
        		} else {
        			list = roroYardPlanDao.selectUnitsFromBLList(parm);
            		if(list.size() <= 0 && parm.getDelvTpCd() != null && parm.getDelvTpCd().equals("I")) {
                		parm.setDelvTpCd("");
                		list = roroYardPlanDao.selectUnitsFromBLList(parm);
            		}
        		} 
        	}
    	}else {
    		parm.setUnitNo(makeInValue(parm.getUnitNo()));
    		list = roroYardPlanDao.selectRoRoYardPlanUnitList(parm);
    	}
        return list;
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
    
    
    public DataItemList selectRoRoYardPlanList(SearchRoRoYardPlanParm parm) throws BizException {
    	DataItemList list = roroYardPlanDao.selectRoRoYardPlanList(parm);
        return list;
    }

    public DataItemList updateItems(UpdateItemsBizParm parm) throws BizException {
    	DataItemList itemList = parm.getUpdateItems();
    	
    	//Insert data for RORO Master
    	DataItemList insertMstItems = new DataItemList();
    	InsertItemsBizParm insertMstParm = new InsertItemsBizParm();
    	SearchROROMasterParm mstParm = new SearchROROMasterParm();
    	ROROMasterItem mstItem = new ROROMasterItem();
    	for(RoRoYardPlanItem item : (ArrayList<RoRoYardPlanItem>)itemList.getCollection()) {
    		if(item == null)
				return null;
    		
    		mstParm.setVslCallId(item.getVslCallId());
    		mstParm.setMfDocId(item.getDocNo());
    		mstParm.setCgNo(item.getCgNo());
    		mstParm.setUnitNo(item.getUnitNo());
    		mstParm.setRoroSeq(item.getRoroSeq());
			
    		if(!roroMasterDao.selectIsExistedROROMst(mstParm)) {
				mstItem = buildROROMasterItem(item);
				insertMstItems.add(mstItem);
			}
    	}
    	insertMstParm.setInsertItems(insertMstItems);
    	if(insertMstItems.size()>0) {
    		roroMasterDao.insertROROMasterItems(insertMstParm);
		}
    	
		return roroYardPlanDao.updateYardPlanOfRoRo(parm);
	}
    
    public DataItemList deleteItems(UpdateItemsBizParm parm) throws BizException {
		return roroYardPlanDao.deleteYardPlanOfRoRo(parm);
	}
    
    private ROROMasterItem buildROROMasterItem(RoRoYardPlanItem item) {
    	ROROMasterItem mstItem = new ROROMasterItem();
		
		mstItem.setVslCallId(item.getVslCallId());
		mstItem.setVslCd(item.getVslCd());
		mstItem.setCallYear(item.getCallYear());
		mstItem.setCallSeq(item.getCallSeq());
		mstItem.setMfDocId(item.getDocNo());
		mstItem.setCgNo(item.getCgNo());
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
		mstItem.setStatCd(item.getStatCd());
		mstItem.setUserId(item.getUserId());
		
		return mstItem;
	}

	@Override
	public DataItemList selectRoRoYardPlanUnitWHCheckImportList(SearchRoRoYardPlanParm parm) throws BizException {
		return  roroYardPlanDao.selectRoRoYardPlanUnitWHCheckImportList(parm);
	}
 
}
