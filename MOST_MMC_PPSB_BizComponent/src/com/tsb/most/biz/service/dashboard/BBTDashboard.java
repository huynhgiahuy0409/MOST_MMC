package com.tsb.most.biz.service.dashboard;

import java.util.ArrayList;

import com.tsb.most.biz.dao.dashboard.IBBTDashboardDao;
import com.tsb.most.biz.dataitem.dashboard.BBTDashboardItem;
import com.tsb.most.biz.parm.dashboard.SearchBBTDashboardParm;
import com.tsb.most.common.util.weather.WeatherForeCastUtil;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.most.interfacer.common.METConstants;
import com.tsb.most.interfacer.common.WeatherParm;
import com.tsb.most.interfacer.weatherforecast.WeatherForecastDetail;
import com.tsb.most.interfacer.weatherforecast.WeatherForecastResult;

public class BBTDashboard extends MOSTBaseService implements IBBTDashboard {
	
	private IBBTDashboardDao bbtDashboardDao;
	
	public void setBbtDashboardDao(IBBTDashboardDao bbtDashboardDao) {
		this.bbtDashboardDao = bbtDashboardDao;
	}

	@Override
	public DataItemList selectVesselCount(SearchBBTDashboardParm parm) throws BizException {
		return bbtDashboardDao.selectVesselCount(parm);
	}

	@Override
	public DataItemList selectWeatherForecast(SearchBBTDashboardParm parm) throws BizException {
		WeatherForeCastUtil instance = WeatherForeCastUtil.getInstance();
		DataItemList rtnList = new DataItemList();
		
		WeatherParm weatherParm = new WeatherParm();
		weatherParm.setExclude(METConstants.EXCLUDE);
		weatherParm.setUnits(METConstants.UNITS);
		weatherParm.setLat(Double.valueOf(AppContextPropertyLoader.properties.getProperty("ow.api.latitude")));
		weatherParm.setLon(Double.valueOf(AppContextPropertyLoader.properties.getProperty("ow.api.longitude")));
		
		WeatherForecastResult result = instance.selectGeneralForecast(weatherParm);
		ArrayList<WeatherForecastDetail>  resultWeather = result.getHourlyWEatherForecastList();
		rtnList.setCollection(resultWeather);
		
		return rtnList;
	}
	
	public DataItemList selectWorkShiftDefinition(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectWorkShiftDefinition(parm);
	}

    public DataItemList selectAccidentsCount(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectAccidentsCount(parm);
	}
    
    public DataItemList selectTerminalOccupancy(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectTerminalOccupancy(parm);
	}
    
    public DataItemList selectBulkSummary(SearchBBTDashboardParm parm) throws BizException{
    	DataItemList rtnList = bbtDashboardDao.selectBulkSummary(parm);
    	
		if(rtnList.size() == 0){
			BBTDashboardItem bbtItem = new BBTDashboardItem();
			bbtItem.initBulkSummary();
			
			rtnList.add(bbtItem);
		}
		
		return rtnList;
	}
    
    public DataItemList selectCargoOperation(SearchBBTDashboardParm parm) throws BizException{
    	DataItemList rtnList = bbtDashboardDao.selectCargoOperation(parm);
    	
		if(rtnList.size() == 0){
			BBTDashboardItem bbtItem = new BBTDashboardItem();
			bbtItem.initCargoOperation();
			
			rtnList.add(bbtItem);
		}
		
		return rtnList;
		
	}
    
    public DataItemList selectBulkHandlingBalanceCompare(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectBulkHandlingBalanceCompare(parm);
	}
    
    public DataItemList selectBreakDryBulkProductivity(SearchBBTDashboardParm parm) throws BizException{
    	DataItemList rtnList = new DataItemList();
    	
    	if(parm.getType().equalsIgnoreCase(SearchBBTDashboardParm.TYPE_BREAK_DRY)){
    		BBTDashboardItem item = new BBTDashboardItem();
    		
			parm.setIsSeparateCrane(false);
			item.setVslBulkProductivity((ArrayList<BBTDashboardItem>) bbtDashboardDao.selectBreakDryBulkProductivity(parm).getCollection());
			parm.setIsSeparateCrane(true);
			item.setCraneBulkProductivity((ArrayList<BBTDashboardItem>) bbtDashboardDao.selectBreakDryBulkProductivity(parm).getCollection());

			rtnList.add(item);

		} else if(parm.getType().equalsIgnoreCase(SearchBBTDashboardParm.TYPE_LIQUID)) {
			rtnList.add(bbtDashboardDao.selectLiquidBulkProductivity(parm));
		}
    	
    	
    	return rtnList;
	}
    
    public DataItemList selectLiquidBulkProductivity(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectLiquidBulkProductivity(parm);
	}
    
    public DataItemList selectLorriesTurnaround(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectLorriesTurnaround(parm);
	}
    
    public DataItemList selectBulkDelay(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectBulkDelay(parm);
	}
    
    public DataItemList selectWhYdHandling(SearchBBTDashboardParm parm) throws BizException{
		return bbtDashboardDao.selectWhYdHandling(parm);
	}
    

}
