package com.tsb.most.common.util.weather;

import java.util.ArrayList;
import java.util.HashMap;

import com.tsb.most.framework.exception.BizException;
import com.tsb.most.interfacer.common.InterfaceResult;
import com.tsb.most.interfacer.common.WeatherParm;
import com.tsb.most.interfacer.mmd.WeatherForecastService;
import com.tsb.most.interfacer.weatherforecast.WeatherForecastDetail;
import com.tsb.most.interfacer.weatherforecast.WeatherForecastResult;

public class WeatherForeCastUtil {

	private final int HOURS_INTERVAL = 3;
	private final int DATA_LIMIT = 5;
	
	private static WeatherForeCastUtil _instance = null;
	
	public static WeatherForeCastUtil getInstance() {
		if(_instance == null) {
			_instance = new WeatherForeCastUtil();
		}
		return _instance;
	}
	
	public WeatherForecastResult selectGeneralForecast(WeatherParm parm) throws BizException{
		WeatherForecastService weatherForecastService = WeatherForecastService.getInstance();
		WeatherForecastResult weatherResult= null;
		
		InterfaceResult response = weatherForecastService.process(parm);

		if(response.getResult() instanceof WeatherForecastResult) {
			WeatherForecastResult weatherForecastResult = (WeatherForecastResult)response.getResult();
			weatherResult = this.setWeatherForecastByThreeHours(weatherForecastResult);
		}
		
		return weatherResult;
	}
	
	private WeatherForecastResult setWeatherForecastByThreeHours(WeatherForecastResult result){
		double currentMillis = 0;
		int count = 1;
		
		
		ArrayList<WeatherForecastDetail> detailListIntervalOfThreeHours = new ArrayList<WeatherForecastDetail>();

		currentMillis = result.getCurrentWeatherForecastDetail().getDateInMillis();
		if(result.getCurrentWeatherForecastDetail().getRain() == null){
			result.getCurrentWeatherForecastDetail().setRain(this.getEmptySnowRain());
		}
		if(result.getCurrentWeatherForecastDetail().getSnow() == null){
			result.getCurrentWeatherForecastDetail().setSnow(this.getEmptySnowRain());
		}

		for(WeatherForecastDetail detail : result.getHourlyWEatherForecastList()){
			if(detail.getDateInMillis() > currentMillis){
				if(count % HOURS_INTERVAL == 0 && detailListIntervalOfThreeHours.size() <= DATA_LIMIT){
					if(detail.getRain() == null){
						detail.setRain(this.getEmptySnowRain());
					}
					if(detail.getSnow() == null){
						detail.setSnow(this.getEmptySnowRain());
					}
					detailListIntervalOfThreeHours.add(detail);
				}
				count++;
			}
		}

		result.setHourlyWEatherForecastList(detailListIntervalOfThreeHours);
		return result;
	}

	private HashMap<String, Double> getEmptySnowRain(){
		HashMap<String, Double> noRainSnow = new HashMap<String, Double>();
		noRainSnow.put("1h", 0.00);
		return noRainSnow;
	}
}
