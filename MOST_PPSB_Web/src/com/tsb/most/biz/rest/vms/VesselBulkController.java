package com.tsb.most.biz.rest.vms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dataitem.vms.VesselItem;
import com.tsb.most.basebiz.parm.vms.VesselParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@Controller
@RequestMapping("/v1/bulk")
public class VesselBulkController extends RestBaseController {
	/** The logger. */
	//private ILogger logger = new LoggingService(getClass());
	
	@RequestMapping(value = "/vessels", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselList(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectVesselList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/vesselgroups", method = RequestMethod.GET)
    @ResponseBody
    public RestResponse selectVesselGroup (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectVesselGroup", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
    }
	
	@RequestMapping(value = "/vesselmaster", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselMaster(VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectVesselMaster", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}	
	
//	@RequestMapping(value = "/eachsignallamps", method = RequestMethod.GET)
//    @ResponseBody
//    public RestResponse selectBulkPlEachSignalLampList (VesselParm parm) throws ServiceException, Exception{
//        return (RestResponse)execute("vesselBulk","selectBulkPlEachSignalLampList", parm);
//    }
	
	@RequestMapping(value = "/marketindexes", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMarketIndex (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectMarketIndex", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/marketstatistics", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectMarketIndexValueDataList (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectMarketIndexValueDataList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/positionstatistics", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPositionDataList (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectPositionDataList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/positionchartstatistics", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPositionChartDataList (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectPositionChartDataList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}

	@RequestMapping(value = "/bondstatistics", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectBondStatistics (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectBondStatistics", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/claimstatistics", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectClaimStatistics (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectClaimStatistics", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/contractstatistics", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectContractStatistics (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectContractStatistics", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/schedules", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselSchedule (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectVesselSchedule", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/consigneecargos", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoByConsignee (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectCargoByConsignee", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/brandcargos", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectCargoByBrand (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectCargoByBrand", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/ports", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectPortList (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectPortList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/vesseloperationlist", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselOperationList (VesselParm parm) throws ServiceException, Exception{
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.vesselBulk.selectVesselOperationList", parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
		
	}
	
	@RequestMapping(value = "/vessellocationmodify/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public void updateVesselLocationModify(@PathVariable("id") String id, @RequestBody VesselItem item) throws ServiceException, Exception{
        
        item.setCrud(DAOProcessType.UPDATE);
        UpdateItemsBizParm param = new UpdateItemsBizParm();
        param.setDataItem(item);
        invokeService("MOST.vesselBulk.updateVesselLocationModify",param);
        
    }
	    
}
