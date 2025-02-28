package com.tsb.most.biz.rest.vms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.dataitem.vms.PriorityItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/cars")
public class VesselCarController extends RestBaseController {
	/** The logger. */
	//private ILogger logger = new LoggingService(getClass());
	
	@RequestMapping(value = "/vessels", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectCarVesselList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/continentcarvesselschedule", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectContinentCarVesselScheduleList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectContinentCarVesselScheduleList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
    }
	
	@RequestMapping(value = "/transitsvessel", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectTransitTimeVesselList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectTransitTimeVesselList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}	
	
	@RequestMapping(value = "/shippers", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectShipperList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectShipperList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/statistics/annualamount", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCustomerAnnualAmount(VesselParm parm) throws ServiceException, Exception{
		String[] val = parm.getCustomerCode().split(",");
		parm.setCustList(val);		
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectCustomerAnnualAmount", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/statistics/monthlyamountperport", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCustomerMonthlyAmountPerPort(VesselParm parm) throws ServiceException, Exception{
		String[] val = parm.getCustomerCode().split(",");
		parm.setCustList(val);
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectCustomerMonthlyAmountPerPort", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/priority", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPriorityList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectPriorityList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/chartbasesummary", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectChartBaseSummary(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectChartBaseSummary", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	    
	@RequestMapping(value = "/fuelconsumption", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectConsumptionSummary(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectConsumptionSummary", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	@RequestMapping(value = "/ports", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPortList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselCar.selectPortList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
    @RequestMapping(value = "/priority", method = RequestMethod.POST)
	@ResponseBody
	public void insertPriority(@RequestBody PriorityItem item) throws ServiceException, Exception{		
//		item.setCrud(DAOProcessType.INSERT);
//		InsertItemsBizParm param = new InsertItemsBizParm();
//		param.setDataItem(item);		
//		
//		
//		execute("vesselCar","insertPriority",param);		
	}
    
    @RequestMapping(value = "/priority/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public void updatePriority(@PathVariable("id") String id, @RequestBody PriorityItem item) throws ServiceException, Exception{		
//		item.setCrud(DAOProcessType.UPDATE);
//		UpdateItemsBizParm param = new UpdateItemsBizParm();
//		param.setDataItem(item);
//		execute("vesselCar","updatePriority",param);
	}
    
    @RequestMapping(value = "/priority/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public void deletePriority(@PathVariable("id") String id, @RequestBody PriorityItem item) throws ServiceException, Exception{		
//		item.setCrud(DAOProcessType.DELETE);		
//		DeleteItemsBizParm param = new DeleteItemsBizParm();
//		param.setDataItem(item);
//		execute("vesselCar","deletePriority",param);
	}	
    
}
