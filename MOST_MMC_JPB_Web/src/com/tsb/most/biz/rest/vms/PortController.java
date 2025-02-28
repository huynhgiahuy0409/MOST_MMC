package com.tsb.most.biz.rest.vms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.parm.vms.NetPasParm;
import com.tsb.most.basebiz.parm.vms.PortParm;
import com.tsb.most.framework.dataitem.DataItemList;
//import com.pcs.foundation.exception.ServiceException;
//import com.pcs.rest.base.controller.RestBaseController;
//import com.plus.foundation.common.RestResponse;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/port")
public class PortController extends RestBaseController {
    
    // Port List
    @RequestMapping(value = "/portlist", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectPortList(PortParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.port.selectPortList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
    }
    
    // Vessel Schedule Of Port
    @RequestMapping(value = "/vesselScheduleofport", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectVesselScheduleOfPort(PortParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.port.selectVesselScheduleOfPort", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
    }
    
    // Vessel Schedule Of Port
    @RequestMapping(value = "/vesselScheduleofportsum", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectVesselScheduleOfPortSum(PortParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.port.selectVesselScheduleOfPortSum", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
    }
    
    
    // NetPas Port Simulation
    @RequestMapping(value = "/netpas", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectNetPasService(NetPasParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.port.selectNetPasSimulation", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
    }
    
    @RequestMapping(value = "/netpasport", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectNetpasPort(NetPasParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.port.selectNetpasPort", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
    }
    
}   
 