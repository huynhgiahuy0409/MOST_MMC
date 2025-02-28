package com.tsb.most.biz.service.yardtruck;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Hashtable;
import java.util.List;

import com.tsb.most.biz.dao.yardtruck.IYardTractorDao;
import com.tsb.most.biz.dataitem.yardtruck.StoppageItem;
import com.tsb.most.biz.dataitem.yardtruck.YtCargoItem;
import com.tsb.most.biz.parm.yardtruck.SearchEquipmentParm;
import com.tsb.most.biz.parm.yardtruck.SearchStoppageParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.data.util.StringUtil;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class YardTractor extends MOSTBaseService implements IYardTractor{
	private final static String LOADING_AFTER = "A";
	private final static String LOADING_BEFORE = "B";
	private final static String STATUS_DESC_UNDETEMINED = "Undetemined";
	
	//Test:
	private final static String STATUS_STOPPAGE = "STOPPAGE";
	private final static String STATUS_RESUME = "RESUME";
	private final static String STATUS_CONNECT = "CONNECT";
	private final static String STATUS_DISCONNECT = "DISCONNECT";
	private final static String STATUS_ONWOKRING = "ON_WOKRING";
	private final static String STATUS_IDLE = "IDLE";
	
	private IYardTractorDao yardTractorDao;
	private Hashtable<String, String> deviceStatusList;
	
	public YardTractor() {
		deviceStatusList = new Hashtable<String, String>();
	}
	
	public void setYardTractorDao(IYardTractorDao yardTractorDao) {
		this.yardTractorDao = yardTractorDao;
	}

	@Override
	public DataItemList searchEquipmentYtItems(SearchEquipmentParm parm) throws BizException{
		DataItemList itemList = yardTractorDao.searchEquipmentYtItems(parm);
		return itemList;
	}
	
	@Override
	public DataItemList searchContainerItems(SearchEquipmentParm parm) throws BizException{
		DataItemList dlResult = yardTractorDao.searchContainerItems(parm);
		List<YtCargoItem> lstResult = (ArrayList<YtCargoItem>)dlResult.getCollection();
		if(lstResult == null || lstResult.size() == 0) {
			return dlResult;
		}
		
		YtCargoItem item = lstResult.get(0);
		
		if ("VI".equals(item.getYardJobCode())) {
			item.setStatusDesc(StringUtil.isNull(item.getWhId()) ? STATUS_DESC_UNDETEMINED : item.getWhId()); // Go to WH
		} else if ("VO".equals(item.getYardJobCode())) {
			item.setStatusDesc(item.getBerthCd()); // Go to Vessel
		}
		
		//Map to Container:
		item.setCodeIndex(LOADING_AFTER);
		item.setYardJobCode(item.getYardJobCode() + " - " + item.getDocNo());
		item.setContainerNo(item.getVslNm());
		
		return dlResult;
		//List<RstT11Item> temp = rstList.getCollection();
	}
	
	
	/**
	 * SELECT LIST OF REASON CODE 
	 * */
	@Override
	public DataItemList searchStopReasonItems(SearchStoppageParm parm) throws BizException{
		DataItemList dlResult = yardTractorDao.searchStopReasonItems(parm);
		
		return dlResult;
	}
	
	
	/**
	 * SELECT STOPPAGE ITEM OF YT
	 * */
	@Override
	public DataItemList searchStoppageItem(SearchStoppageParm parm) throws BizException{
		DataItemList dlResult = yardTractorDao.searchStoppageItem(parm);
		
		return dlResult;
	}
	
	
	/**
	 * INSERT STOPPAGE FOR YT
	 * */
	@Override
	public DataItemList processSetStoppage(SearchStoppageParm parm) throws BizException{

		StoppageItem item = new StoppageItem();
		item.setsEquNo(parm.getEquNo());
		item.setsStaffCD(parm.getUserId());
		item.setsStoppageCD(parm.getStoppageCd());
		item.setsWorkTranTime(getCurrentDateTime());
		
		int iIns = yardTractorDao.insertStoppage(item);
		
		if(iIns > 0) {
			return this.searchStoppageItem(parm);
		}else {
			return null;
		}
	}
	
	private static SimpleDateFormat frm = new SimpleDateFormat("yyyyMMddHHmmss");
    public static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    
	private String getCurrentDateTime() {
        Calendar cal = Calendar.getInstance();
        java.util.Date toDay = new java.util.Date();
        cal.setTime(toDay);
        return frm.format(cal.getTime());
    }
	
	/**
	 * UPDATE TO RESUME THE STOPPAGE FOR YT
	 * */
	@Override
	public DataItemList processResumeStoppage(SearchStoppageParm parm) throws BizException{
		
		StoppageItem item = new StoppageItem();
		item.setsEquNo(parm.getEquNo());
		item.setStaffCd(parm.getUserId());
		item.setsStoppageCD(parm.getStoppageCd());
		
		yardTractorDao.updateStoppage(item);
		return new DataItemList();
	}
}
