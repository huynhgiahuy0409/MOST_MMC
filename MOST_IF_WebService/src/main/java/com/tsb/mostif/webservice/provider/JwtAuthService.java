
package com.tsb.mostif.webservice.provider;  

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tsb.most.framework.bizparm.IBaseBizParm;
import com.tsb.most.framework.dataitem.IDataItem;
import com.tsb.most.framework.serviceprovider.pojo.ServiceProviderPojo;
import com.tsb.mostif.bizparm.authorization.JwtAuthParm;

@RestController
@Path("/api/v1")
public class JwtAuthService {
	
	@POST
	@Path("/token")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Transactional(propagation = Propagation.REQUIRED)
	public Object getToken(@QueryParam("username") String id, @QueryParam("password") String password) {

		JwtAuthParm parm = new JwtAuthParm();
		Object resultItem = new Object();
		
		parm.setUserId(id);
		parm.setPassword(password);
		
		resultItem = invokeService("MostIF.jwtAuth.getToken", parm);
		return resultItem;
	}
	
	private Object invokeService(String serviceID, IBaseBizParm bizParm) {
		IDataItem result = null;
		Object objReturn = new Object();
		ServiceProviderPojo serviceProviderPojo = new ServiceProviderPojo();
		result = (IDataItem) serviceProviderPojo.execute(serviceID, bizParm);
		objReturn = convertObjectToJson(result);
		return objReturn;
	}
	
	private Object convertObjectToJson(Object obj) {
		ObjectMapper mapper = new ObjectMapper();
		String json = "";
		try {
			json = mapper.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return json;
	}
}