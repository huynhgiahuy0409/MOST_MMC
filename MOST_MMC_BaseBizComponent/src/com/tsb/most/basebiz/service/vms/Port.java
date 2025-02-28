package com.tsb.most.basebiz.service.vms;

import java.math.BigDecimal;
import java.rmi.RemoteException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.basebiz.dao.vms.IPortDao;
import com.tsb.most.basebiz.dataitem.vms.PortSimulationItem;
import com.tsb.most.basebiz.dataitem.vms.UserZoneItem;
import com.tsb.most.basebiz.parm.vms.NetPasParm;
import com.tsb.most.basebiz.parm.vms.PortParm;
import com.tsb.most.basebiz.parm.vms.UserZoneParm;
import com.tsb.most.common.util.NetPasUtil;
//import com.tsb.most.biz.service.vms.VmsBaseService;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.DeleteItemsBizParm;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;
import com.tsb.seafuture.npsystem.webservice.GetDistReturn;
import com.tsb.seafuture.npsystem.webservice.NPDistanceVersion3Proxy;
import com.tsb.seafuture.npsystem.webservice.Section;
import com.tsb.seafuture.npsystem.webservice.WayPoint;

public class Port extends MOSTBaseService implements IPort {
    private IPortDao portDao;

    public IPortDao getPortDao() {
        return portDao;
    }

    public void setPortDao(IPortDao portDao) {
        this.portDao = portDao;
    }

    @Override
    public DataItemList selectPortList(PortParm parm) throws BizException {
    	return portDao.selectPortList(parm);
    }
    
    @Override
    public DataItemList selectVesselScheduleOfPort(PortParm parm) throws BizException {
    	return portDao.selectVesselScheduleOfPort(parm);
    }
    
    @Override
    public DataItemList selectVesselScheduleOfPortSum(PortParm parm) throws BizException {
    	return portDao.selectVesselScheduleOfPortSum(parm);
    }    
    
    @Override
    public DataItemList selectUserZoneList(UserZoneParm parm) throws BizException {
    	return portDao.selectUserZoneList(parm);
    }    
 
	@Override
	public DataItemList insertUserZone(InsertItemsBizParm parm)throws BizException{
		UserZoneItem item = (UserZoneItem)parm.getDataItem();
		

		//zoneCode MAX + 1
		UserZoneParm userZoneParm = new UserZoneParm();
		UserZoneItem cntItem = (UserZoneItem) portDao.selectCdZoneCnt(userZoneParm);
		
		item.setZoneCode(cntItem.getZoneCode());
		portDao.insertUserZone(parm.getTxTraceinfo(),item);
		portDao.insertGisZone(parm.getTxTraceinfo(),item);
		
		return null;
	}
	
	@Override
    public DataItemList selectNetpasPort(NetPasParm parm) throws BizException {
		return portDao.selectNetpasPort(parm);
    }    	
	
    @Override
    public DataItemList selectNetPasSimulation(NetPasParm parm) throws BizException, RemoteException, ParseException {

    	NPDistanceVersion3Proxy proxy = new NPDistanceVersion3Proxy();
    	DataItemList portSimulationItems = new DataItemList();
    	
    	//-->> Simulation Test data (Screen condition)
//		String[] portNamesTest = {"Busan","Los Angeles","Miami"};    	
//    	parm.setPortNames(portNamesTest);
//
//		String[] portCdsTest = {"KRPUS","USLAX","USMIA"};    	
//    	parm.setPortCds(portCdsTest);
//    	parm.setStartDate("2017-09-23 01");
//		String[] testWeathers = {"100","100","100"};    	
//    	parm.setWeathers(testWeathers);
//		String[] testspeeds = {"0","15","15"};    	
//    	parm.setSpeeds(testspeeds);
//		String[] testportDays = {"0","0","0"};    	
//    	parm.setPortDays(testportDays);
    	
    	//-->> Simulation을 위한 경유 항구 이름을 String[]로 멀티로 처리
    	String portNames[] = new String[parm.getPortNames().length];    	
		
    	//-->> 항구에 따른 위도 경도를처리
		for(int i=0 ; i< parm.getPortNames().length;i++){
			if(i==0 && !parm.getLat().equals("")){
				String sLat="";
				String sLon="";
				
				if(Double.parseDouble(parm.getLat())>0){
					sLat = Math.abs(Double.parseDouble(parm.getLat()))+"N";
				}else{
					sLat = Math.abs(Double.parseDouble(parm.getLat()))+"S";
				}
				
				if(Double.parseDouble(parm.getLon())>0){
					sLon = Math.abs(Double.parseDouble(parm.getLon()))+"E";
				}else{
					sLon = Math.abs(Double.parseDouble(parm.getLon()))+"W";
				}
				
				portNames[i] = sLat + " " + sLon;
			}else{
				portNames[i] = parm.getPortNames()[i];
			}
		}  		
			
//		try {

			// Request Distance ==>> getDistance(PINCODE, ACCCODE, portName, "000")
			String pinCode = "";//PcsProperties.getProperty("PINCODE");
			String accCode = "";//PcsProperties.getProperty("ACCCODE");
			//-->> com.seafuture.npsystem.webservice.version3
			GetDistReturn ret = proxy.getDistance(pinCode, accCode, portNames , "000");
			
			// Return Status
//			System.out.println("RET CODE = " + ret.getRetCode());
//			System.out.println("RET MSG  = " + ret.getRetMessage());
//			System.out.println("DAYLIMIT = " + ret.getDayLimit());
//			System.out.println("DAYUSED  = " + ret.getTodayUsed());
			// Distance Information
//			System.out.println("TOTALDIST = " + ret.getTotalDistance());
			
			Section[] section = ret.getSections();
			Date sDate2 = null;
			double totalDistance = 0;
			long totalDay = 0;
			
			for (int i = 0; i < section.length; i++) {
				//-->> 해당 HashMap -->> DataItem으로 대체
				//-->> PortSimulationItem
				PortSimulationItem portSimulationItem = new PortSimulationItem();

				//-->> PortSimulationItem set data
				portSimulationItem.setFromPort(section[i].getFromPort());
				portSimulationItem.setToPort(section[i].getToPort());
				portSimulationItem.setDistance(Double.toString(section[i].getDistance()));
			
				//------------------------------------------------------->>>>>>>
				
				//totalDistance = 0;
				totalDistance = totalDistance + section[i].getDistance(); 
				
				parm.setFromPort(section[i].getFromPort());
				parm.setToPort(section[i].getToPort());
				
				DateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH");
				Date firstDate = sf.parse(parm.getStartDate());
				

				String speed = "0";
				String weather ="100";
				String days = "0";		
				
				//-->> TEST Values
				if(parm.getSpeeds().length >0){
					speed = parm.getSpeeds()[(i+1)];
					weather = parm.getWeathers()[(i+1)];
					days = parm.getPortDays()[(i+1)];
				}
				
				//시간은 거리 / 속도
				//Double eDate = section[i].getDistance() / (1.15077945 * Double.parseDouble(speed));
				Double eDate = section[i].getDistance() / (Double.parseDouble(speed));
				//Double eDate = section[i].getDistance() / (Double.parseDouble((parm.getSpeeds()[(i+1)])));
				
				//날씨 가중치 100% = 1, 90% = 0.9
				eDate = (Double.parseDouble(weather) / 100) * eDate;
				
				Date eDate2 = null;
				long timeZone1 = 0;
				long timeZone2 = 0;
				long resultZone = 0; 
				
				
				if(parm.getPortCds().length > 0){
					if(!parm.getPortCds()[i+1].equals("undefined")){
						parm.setCdPort(parm.getPortCds()[i+1]);
						
						//Time Zone 1
						NetPasParm tZone1Parm = new NetPasParm();
						tZone1Parm.setCdPort(parm.getPortCds()[i+1]);
						PortSimulationItem tZone1item = (PortSimulationItem) portDao.selectTimeZone(tZone1Parm);
						timeZone1 = Long.parseLong(tZone1item.getTimeZone());
						
						//Time Zone 2
						if(parm.getPortCds().length > (i+2)){
							parm.setCdPort(parm.getPortCds()[i+2]);
							
							NetPasParm tZone2Parm = new NetPasParm();
							tZone2Parm.setCdPort(parm.getPortCds()[i+2]);
							PortSimulationItem tZone2item = (PortSimulationItem) portDao.selectTimeZone(tZone2Parm);
							timeZone2 = Long.parseLong(tZone2item.getTimeZone());
							
							resultZone = timeZone2 - timeZone1;
						
						}else{
							resultZone = timeZone1;
						}
					}
				}
				
				
				if(i==0){
					//처음은 출발 시작일
					eDate2 = NetPasUtil.addHour(firstDate, eDate.longValue());
				}else{
					//나머지는 계산된 시작일
					eDate2 = NetPasUtil.addHour(sDate2, eDate.longValue());
				}
				if(parm.getPortCds().length > 0){
					if(!parm.getPortCds()[i+1].equals("undefined")  && parm.getPortCds().length > 0){
						eDate2 = NetPasUtil.addHour(eDate2, resultZone);
						//eDate2 = addHour(eDate2, timeZone2);
					}
				}
				//정박일수 일을 더한다
				long tmpDay = (long)Math.round((double)Double.parseDouble(days) * 24);
				Date sDate = NetPasUtil.addHour(eDate2, tmpDay);
				
				if(parm.getPortCds().length > 0){
					if(!parm.getPortCds()[i+1].equals("undefined")  && parm.getPortCds().length > 0){
						//sDate = addHour(sDate, timeZone1);
					}
				}
				sDate2 = sDate;
				
				String endDate = sf.format(eDate2);
				String startDate = sf.format(sDate);
				
				//-->> PortSimulationItem set data
				portSimulationItem.setEndDate(endDate);
				portSimulationItem.setStartDate(startDate);
				
				
				List latLonList = new ArrayList();				
				WayPoint[] wpList = section[i].getWaypoints();
				String routes = "";
				
				for (int j = 0; j < wpList.length; j++) {
					BigDecimal tmpLat = new BigDecimal( wpList[j].getLat() ).setScale( 10 , BigDecimal.ROUND_HALF_UP ); //소숫점이하 10자리로[2014.09.17 kmj]
					BigDecimal tmpLon = new BigDecimal( wpList[j].getLon() ).setScale( 10 , BigDecimal.ROUND_HALF_UP ); //소숫점이하 10자리로[2014.09.17 kmj] 
							
					latLonList.add(tmpLat + "," + tmpLon);
					routes = routes + tmpLat + "," + tmpLon + "|";
				}
				parm.setRoutes(routes);
				//처음 시작일과 마지막 도착일의 시간차이(총 걸린 시간)
				if(i==section.length-1){
					totalDay = NetPasUtil.dateDiff("h",firstDate, eDate2);
				}
				
				//-->> PortSimulationItem set data
				portSimulationItem.setLatLon(latLonList);
				portSimulationItem.setTotalDistance(Double.toString(totalDistance));
				portSimulationItem.setTotalDay(Long.toString(totalDay));
				portSimulationItem.setRoutes(routes);

				//Route Infromation Insert
				portDao.insertNetpasInfo(parm.getTxTraceinfo(),portSimulationItem);
				
				//-->> 마지막 처리 Items
				portSimulationItems.add(portSimulationItem);
			}
			
			return portSimulationItems;
			
    }
    
	@Override
	public DataItemList updateUserZone(UpdateItemsBizParm parm)throws BizException{
		UserZoneItem item = (UserZoneItem)parm.getDataItem();
		portDao.updateUserZone(parm.getTxTraceinfo(),item);
		
		return null;
	}
	
	@Override
	public DataItemList deleteUserZone(DeleteItemsBizParm parm)throws BizException{
		UserZoneItem item = (UserZoneItem)parm.getDataItem();
		portDao.deleteUserZone(parm.getTxTraceinfo(),item);
		portDao.deleteGisZone(parm.getTxTraceinfo(),item);
		
		return null;
	}	
	
}
