package com.tsb.mostif.webservice.provider;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.framework.data.util.StringUtil;
import com.tsb.mostif.bizparm.annualholiday.AnnualHolidayDetailParm;
import com.tsb.mostif.bizparm.annualholiday.AnnualHolidayParm;
import com.tsb.mostif.bizparm.authgrp.AuthorityGroupDetailParm;
import com.tsb.mostif.bizparm.authgrp.AuthorityGroupParm;
import com.tsb.mostif.bizparm.berthlocationcode.BerthLocationCodeDetailParm;
import com.tsb.mostif.bizparm.berthlocationcode.BerthLocationCodeParm;
import com.tsb.mostif.bizparm.codemaster.CodeMasterDetailParm;
import com.tsb.mostif.bizparm.codemaster.CodeMasterParm;
import com.tsb.mostif.bizparm.common.CommonParm;
import com.tsb.mostif.bizparm.company.CompanyDetailParm;
import com.tsb.mostif.bizparm.company.CompanyParm;
import com.tsb.mostif.bizparm.countrycode.CountryCodeDetailParm;
import com.tsb.mostif.bizparm.countrycode.CountryCodeParm;
import com.tsb.mostif.bizparm.dangerouscode.DangerousCodeDetailParm;
import com.tsb.mostif.bizparm.dangerouscode.DangerousCodeParm;
import com.tsb.mostif.bizparm.dgapproval.DGApprovalDetailParm;
import com.tsb.mostif.bizparm.dgapproval.DGApprovalParm;
import com.tsb.mostif.bizparm.holidaycode.HolidayCodeDetailParm;
import com.tsb.mostif.bizparm.holidaycode.HolidayCodeParm;
import com.tsb.mostif.bizparm.hscode.HsCodeDetailParm;
import com.tsb.mostif.bizparm.hscode.HsCodeParm;
import com.tsb.mostif.bizparm.unlocationcode.UNLocationCodeDetailParm;
import com.tsb.mostif.bizparm.unlocationcode.UNLocationCodeParm;
import com.tsb.mostif.bizparm.updateberthingdetail.UpdateBerthingDetailDetailParm;
import com.tsb.mostif.bizparm.updateberthingdetail.UpdateBerthingDetailParm;
import com.tsb.mostif.bizparm.userpassword.UserPasswordDetailParm;
import com.tsb.mostif.bizparm.userpassword.UserPasswordParm;
import com.tsb.mostif.bizparm.userregistration.UserRegistrationDetailParm;
import com.tsb.mostif.bizparm.userregistration.UserRegistrationParm;
import com.tsb.mostif.bizparm.vesselparticular.VesselParticularDetailParm;
import com.tsb.mostif.bizparm.vesselparticular.VesselParticularParm;
import com.tsb.mostif.bizparm.vesselschedule.VesselScheduleDetailParm;
import com.tsb.mostif.bizparm.vesselschedule.VesselScheduleParm;
import com.tsb.mostif.common.util.AnchUtils;
import com.tsb.mostif.common.util.BdswUtils;
import com.tsb.mostif.common.util.BwctUtils;
import com.tsb.mostif.common.util.CaltUtils;
import com.tsb.mostif.common.util.EssoUtils;
import com.tsb.mostif.common.util.FeryUtils;
import com.tsb.mostif.common.util.PbctUtils;
import com.tsb.mostif.common.util.PrwfUtils;
import com.tsb.mostif.common.util.ShelUtils;
import com.tsb.mostif.common.util.SwprUtils;
import com.tsb.mostif.common.util.Utils;
import com.tsb.mostif.common.util.VotpUtils;
import com.tsb.mostif.constants.WebServiceConstants;
import com.tsb.mostif.dataitem.common.CommonResultItem;
import com.tsb.mostif.dto.CompanyDto;

@RestController
@Path("/api/v1")
public class MostWebService {
	
	@POST
	@Path("/code-master")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processCodeMaster(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_CODE_MASTER;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "CodeMaster";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);

		CommonResultItem resultItem = utils.validateRequest(parm, new CodeMasterParm());
		
		if (resultItem != null) {
			return resultItem;
		} 
		
		CodeMasterParm dataParm = (CodeMasterParm) utils.convertJsonToObject(parm.getRequest(), CodeMasterParm.class);
		CodeMasterDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";		

		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processCodeMaster", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processCodeMaster", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processCodeMaster";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
	
		return result;
	}
	
	@POST
	@Path("/vessel-particular")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processVesselParticular(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String objName 		= ".processVesselParticular";
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_VESSEL_PARTICULAR;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "VesselParticular";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		VesselParticularParm dataParm = (VesselParticularParm) utils.convertJsonToObject(parm.getRequest(), VesselParticularParm.class);
		VesselParticularDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processVesselParticular", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processVesselParticular", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processVesselParticular";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/vessel-schedule")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processVesselSchedule(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_VESSEL_SCHEDULE;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "VesselSchedule";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		VesselScheduleParm dataParm = (VesselScheduleParm) utils.convertJsonToObject(parm.getRequest(), VesselScheduleParm.class);
		VesselScheduleDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";		
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processVesselSchedule", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processVesselSchedule", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processVesselSchedule";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/cargo")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processCargo(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm = new CommonParm();
		Utils utils = new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_CARGO;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "Cargo";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		result = utils.invokeService("MostIf.cargo.processCargo", parm);
		return result;
		
	}
	
	@POST
	@Path("/document-status")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processDocumentStatus(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_DOCUMENT_STATUS;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "DocumentStatus";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		result = utils.invokeService("MostIf.docStat.processDocStat", parm);
		return result;
		
	}
	
	@POST
	@Path("/import-container")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processImportContainer(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_IMPORT_CONTAINER;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "ImportContainer";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		result = utils.invokeService("MostIf.impCntr.processImpCntr", parm);
		return result;
		
	}
	
	@POST
	@Path("/cargo-outturn")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processCargoOutturn(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_CARGO_OUTTURN;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "CargoOutturn";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		result = utils.invokeService("MostIf.cargoOutturn.processCargoOutturn", parm);
		return result;
		
	}
	
	@POST
	@Path("/voy-stat")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processVoyStat(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_FZ_APPROVAL_VESSEL_SCHEDULE;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "VoyStat";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		result = utils.invokeService("MostIf.voyStat.processVoyStat", parm);
		return result;
		
	}
	
	@POST
	@Path("/user-registration")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processUserRegistration(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_USER_REGISTRATION;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "UserReg";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		UserRegistrationParm dataParm = (UserRegistrationParm) utils.convertJsonToObject(parm.getRequest(), UserRegistrationParm.class);
		UserRegistrationDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processUserRegistration", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processUserRegistration", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processUserRegistration";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/company-registration")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processCompanyRegistration(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		
		
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_COMPANY_REGISTRATION;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "CompanyReg";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		CompanyParm dataParm = (CompanyParm) utils.convertJsonToObject(parm.getRequest(), CompanyParm.class);
		CompanyDetailParm dtlDataParm = dataParm.getCompanyDtlParm();
		
		
		List<CompanyDto> companyDtos = utils.mapToCompanyRegistrationItem(dtlDataParm);
		for (CompanyDto dto : companyDtos) {
			String tmnl = dto.getTerminalLocation() != null ? dto.getTerminalLocation().toUpperCase() : "";
			
			switch (tmnl) {
				case WebServiceConstants.TMNL_BWCT: 
					utils = new BwctUtils();
			        result = utils.invokeService("MostIf.bwct.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_ANCH: 
			    	utils = new AnchUtils();
			        result = utils.invokeService("MostIf.anch.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_BDSW: 
			    	utils = new BdswUtils();
			        result = utils.invokeService("MostIf.bdsw.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_CALT: 
			    	utils = new CaltUtils();
			        result = utils.invokeService("MostIf.calt.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_ESSO: 
			    	utils = new EssoUtils();
			        result = utils.invokeService("MostIf.esso.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_FERY: 
			    	utils = new FeryUtils();
			        result = utils.invokeService("MostIf.fery.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_PBCT: 
			    	utils = new PbctUtils();
			        result = utils.invokeService("MostIf.pbct.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_PRWF: 
			    	utils = new PrwfUtils();
			        result = utils.invokeService("MostIf.prwf.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_SHEL: 
			    	utils = new ShelUtils();
			        result = utils.invokeService("MostIf.shel.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_SWPR: 
			    	utils = new SwprUtils();
			        result = utils.invokeService("MostIf.swpr.processCompanyRegistration", parm);
			        break;
			    case WebServiceConstants.TMNL_VOTP: 
			    	utils = new VotpUtils();
			        result = utils.invokeService("MostIf.votp.processCompanyRegistration", parm);
			        break;
				default:				
					List<CommonResultItem> resultList = new ArrayList<>();
					Utils util = new Utils();
					String baseServiceId = "MostIf.%s.processCompanyRegistration";
					
					WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
						String terminal 	= map.getKey();
						Utils terminalUtil 	= map.getValue();
						
						CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
						        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
						resultList.add(resItem);
					});
					
					CommonResultItem failedResultItem = resultList
															.stream()
															.filter(res -> 
																res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
																res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
															.findFirst()
															.orElse(new CommonResultItem());
					
					if (!StringUtil.isNull(failedResultItem.getMsgId())) {
						failedResultItem.setMsgId(dtlDataParm.getMsgId());
						result = utils.convertObjectToJson(failedResultItem);
					} else {
						result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
					}
					break;
			}
		}
		
		
		
		return result;
		
	}
	
	@POST
	@Path("/bl")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processBlInformation(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_BL;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "Bl";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		result = utils.invokeService("MostIf.mostBl.processBlInformation", parm);
		return result;
		
	}
	
	@POST
	@Path("/auth-grp")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processAuthorityGroup(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_AUTHORITY_GROUP;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "AuthGrp";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		AuthorityGroupParm dataParm = (AuthorityGroupParm) utils.convertJsonToObject(parm.getRequest(), AuthorityGroupParm.class);
		AuthorityGroupDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processAuthorityGroup", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processAuthorityGroup", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processAuthorityGroup";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/country-cd")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processCountryCode(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_COUNTRY_CODE;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "CountryCd";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		CountryCodeParm dataParm = (CountryCodeParm) utils.convertJsonToObject(parm.getRequest(), CountryCodeParm.class);
		CountryCodeDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT:
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processCountryCode", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processCountryCode", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processCountryCode";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/un-location-cd")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processUNLocationCode(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_UN_LOCATION_CODE;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "LocationCd";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		UNLocationCodeParm dataParm = (UNLocationCodeParm) utils.convertJsonToObject(parm.getRequest(), UNLocationCodeParm.class);
		UNLocationCodeDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
				
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processUNLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processUNLocationCode", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processUNLocationCode";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/dangerous-cd")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processDangerousCode(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_DANGEROUS_CODE;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "DangerousCd";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);

		DangerousCodeParm dataParm = (DangerousCodeParm) utils.convertJsonToObject(parm.getRequest(), DangerousCodeParm.class);
		DangerousCodeDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processDangerousCode", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processDangerousCode", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processDangerousCode";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/berth-loc-cd")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processBerthLocationCode(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_BERTH_LOCATION_CODE;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "BerthLocCd";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		BerthLocationCodeParm dataParm = (BerthLocationCodeParm) utils.convertJsonToObject(parm.getRequest(), BerthLocationCodeParm.class);
		BerthLocationCodeDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";

		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processBerthLocationCode", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processBerthLocationCode", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processBerthLocationCode";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/update-berth-dtl")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processUpdateBerthingDetail(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm	 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_UPDATE_BERTHING_DETAIL;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "UpdBerthDtl";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);
		
		UpdateBerthingDetailParm dataParm = (UpdateBerthingDetailParm) utils.convertJsonToObject(parm.getRequest(), UpdateBerthingDetailParm.class);
		UpdateBerthingDetailDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT:
		    	utils = new CaltUtils(); 
		        result = utils.invokeService("MostIf.calt.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processUpdateBerthingDetail", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processUpdateBerthingDetail", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processUpdateBerthingDetail";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/hs-cd")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processHSCode(String request) {

		System.out.println("Request Message: " + request);

		Object result		= new Object();
		CommonParm parm 	= new CommonParm();
		Utils utils 		= new Utils();
		
		String msgType 		= WebServiceConstants.MESSAGE_TYPE_HS_CODE;
		String fromSite		= WebServiceConstants.PLUS;
		String toSite		= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd		= WebServiceConstants.STAFF_CD_MOST_IF + "HSCode";
		String tmnlCd 		= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);

		HsCodeParm dataParm = (HsCodeParm) utils.convertJsonToObject(parm.getRequest(), HsCodeParm.class);
		HsCodeDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processHsCode", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processHsCode", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processHsCode";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		
		return result;
		
	}
	
	@POST
	@Path("/dg-approval")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processDGApproval(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_DG_APPROVAL;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "DGApproval";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);

		
		DGApprovalParm dataParm = (DGApprovalParm) utils.convertJsonToObject(parm.getRequest(), DGApprovalParm.class);
		DGApprovalDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processDGApproval", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processDGApproval", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processDGApproval";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		 
		return result;
		
	}
	
	@POST
	@Path("/holiday-cd")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processHolidayCode(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_HLDAY_CODE;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "HlidayCode";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);

		
		HolidayCodeParm dataParm = (HolidayCodeParm) utils.convertJsonToObject(parm.getRequest(), HolidayCodeParm.class);
		HolidayCodeDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processHolidayCode", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processHolidayCode", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processHolidayCode";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		 
		return result;
		
	}
	
	@POST
	@Path("/annual-holiday")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processAnnualHoliday(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_ANNUAL_HLDAY;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "HlidayCode";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);

		
		AnnualHolidayParm dataParm = (AnnualHolidayParm) utils.convertJsonToObject(parm.getRequest(), AnnualHolidayParm.class);
		AnnualHolidayDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processAnnualHoliday", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processAnnualHoliday", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processAnnualHoliday";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		 
		return result;
		
	}
	
	@POST
	@Path("/user-passwd")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object processUserPassword(String request) {

		System.out.println("Request Message: " + request);

		Object result	= new Object();
		CommonParm parm = new CommonParm();
		Utils utils 	= new Utils();
		
		String msgType 	= WebServiceConstants.MESSAGE_TYPE_USER_PASSWD;
		String fromSite	= WebServiceConstants.PLUS;
		String toSite	= WebServiceConstants.MOST;
		String transferType = WebServiceConstants.IF_TYPE_SERVER;
		String staffCd	= WebServiceConstants.STAFF_CD_MOST_IF + "UserPasswd";
		String tmnlCd 	= WebServiceConstants.TERMINAL_CODE;
		
		parm.setRequest(request);
		parm.setMsgType(msgType);
		parm.setFromSite(fromSite);
		parm.setToSite(toSite);
		parm.setTransferType(transferType);
		parm.setStaffCd(staffCd);
		parm.setTmnlCd(tmnlCd);

		
		UserPasswordParm dataParm = (UserPasswordParm) utils.convertJsonToObject(parm.getRequest(), UserPasswordParm.class);
		UserPasswordDetailParm dtlDataParm = dataParm.getCmDtlParm();
		
		String tmnl = dtlDataParm.getTerminalLocation() != null ? dtlDataParm.getTerminalLocation().toUpperCase() : "";
		
		switch (tmnl) {
			case WebServiceConstants.TMNL_BWCT: 
				utils = new BwctUtils();
		        result = utils.invokeService("MostIf.bwct.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_ANCH: 
		    	utils = new AnchUtils();
		        result = utils.invokeService("MostIf.anch.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_BDSW: 
		    	utils = new BdswUtils();
		        result = utils.invokeService("MostIf.bdsw.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_CALT: 
		    	utils = new CaltUtils();
		        result = utils.invokeService("MostIf.calt.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_ESSO: 
		    	utils = new EssoUtils();
		        result = utils.invokeService("MostIf.esso.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_FERY: 
		    	utils = new FeryUtils();
		        result = utils.invokeService("MostIf.fery.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_PBCT: 
		    	utils = new PbctUtils();
		        result = utils.invokeService("MostIf.pbct.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_PRWF: 
		    	utils = new PrwfUtils();
		        result = utils.invokeService("MostIf.prwf.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_SHEL: 
		    	utils = new ShelUtils();
		        result = utils.invokeService("MostIf.shel.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_SWPR: 
		    	utils = new SwprUtils();
		        result = utils.invokeService("MostIf.swpr.processUserPassword", parm);
		        break;
		    case WebServiceConstants.TMNL_VOTP: 
		    	utils = new VotpUtils();
		        result = utils.invokeService("MostIf.votp.processUserPassword", parm);
		        break;
			default:				
				List<CommonResultItem> resultList = new ArrayList<>();
				Utils util = new Utils();
				String baseServiceId = "MostIf.%s.processUserPassword";
				
				WebServiceConstants.TERMINAL_UTILS_MAP.entrySet().forEach(map -> {
					String terminal 	= map.getKey();
					Utils terminalUtil 	= map.getValue();
					
					CommonResultItem resItem =  (CommonResultItem) util.convertJsonToObject(
					        (String) terminalUtil.invokeService(String.format(baseServiceId, terminal), parm), CommonResultItem.class);
					resultList.add(resItem);
				});
				
				CommonResultItem failedResultItem = resultList
														.stream()
														.filter(res -> 
															res.getStatus().equalsIgnoreCase(WebServiceConstants.FAIL_RESPONSE_MESSAGE) ||
															res.getStatus().equalsIgnoreCase(WebServiceConstants.ERROR_RESPONSE_MESSAGE))
														.findFirst()
														.orElse(new CommonResultItem());
				
				if (!StringUtil.isNull(failedResultItem.getMsgId())) {
					failedResultItem.setMsgId(dtlDataParm.getMsgId());
					result = utils.convertObjectToJson(failedResultItem);
				} else {
					result = utils.convertObjectToJson(utils.createSuccessCommonResultWithMsgId(dtlDataParm.getMsgId()));
				}
				break;
		}
		 
		return result;
		
	}
}

