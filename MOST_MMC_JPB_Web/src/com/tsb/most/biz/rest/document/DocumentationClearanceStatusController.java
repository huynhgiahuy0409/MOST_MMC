package com.tsb.most.biz.rest.document;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tsb.most.biz.parm.document.SearchDocumentCleranceParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;
	
@Controller
@RequestMapping("/v1/document")
public class DocumentationClearanceStatusController extends RestBaseController {
	
	@RequestMapping(value = "/DocumentationClearanceStatus", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectDocumentCleranceLists(SearchDocumentCleranceParm parm) throws ServiceException, Exception {
//		parm.setSearchType("List");
		
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.documentationClearanceStatus.getDocumentCleranceLists",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}

	@RequestMapping(value = "/VesselBerthingList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse selectVesselBerthingList(SearchDocumentCleranceParm parm) throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		Object result = invokeService("MOST.documentationClearanceStatus.getBethPlanList",parm);
		
		res.setData(((DataItemList)result).getCollection());
		res.setLimit(((DataItemList)result).getTotalRowCount());
		
		return res;
	}
	
	/* @RequestMapping(value = "/generatepdfVesselBerthingList", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse generatePdf(SearchDocumentCleranceParm parm, HttpServletRequest request, HttpServletResponse response)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();

		HashMap parmMap = new HashMap();
		String sReportId = " ";
		parmMap.put("REPORT_ID", "RCS037");
		parmMap.put("IMAGE_PATH",
				request.getSession().getServletContext().getRealPath("/WEB-INF/reports/" + PcsProperties.getProperty("terminal.code") + ".gif"));
		if (!("".equalsIgnoreCase(parm.getUserId()))) {
			parmMap.put("PRINTER", parm.getUserId());
		} else {
			parmMap.put("PRINTER", "EMPTY");
		}
		RestResponse result = new RestResponse();
		Object resFromService = invokeService("MOST.document.getBethPlanList",parm);
		
		result.setData(((DataItemList)resFromService).getCollection());
		ArrayList resList = new ArrayList();
		List vbList = result.getData();
		int no = 0;
		for (Iterator it = vbList.iterator(); it.hasNext();) {
			DocumentCleranceItem itm = (DocumentCleranceItem) it.next();
			HashMap vbMap = new HashMap();
			no++;
			vbMap.put("no", Integer.toString(no));
			vbMap.put("vslCallId", itm.getVslCallId());
			vbMap.put("vslNm", itm.getVslNm());
			vbMap.put("saId", itm.getSaId());
			vbMap.put("submitDt", itm.getSubmitDt());
			vbMap.put("etaFinal", itm.getEtaFinal());
			vbMap.put("eta", itm.getEta());
			vbMap.put("amendDt", itm.getAmendDt());
			
			vbMap.put("vslType", itm.getVslType());
			vbMap.put("cgTypeDisplay", itm.getCgTypeDisplay());
			vbMap.put("opeType", itm.getOpeType());
			//vdrMap.put("stowage", itm.getStowage());
			vbMap.put("confmDate1", itm.getConfmDate1());
			vbMap.put("confmDate2", itm.getConfmDate2());
			vbMap.put("tempReady", itm.getTempReady());
			vbMap.put("cgReady", itm.getCgReady());
			vbMap.put("tankReady", itm.getTankReady());
			vbMap.put("snDate", itm.getSnDate());
			vbMap.put("grDate", itm.getGrDate());
			vbMap.put("fnDate", itm.getFnDate());
			vbMap.put("doDate", itm.getDoDate());
			vbMap.put("lorryAsg", itm.getLorryAsg());
			vbMap.put("mgDate", itm.getMgDate());
			vbMap.put("complete", itm.getComplete());
			resList.add(vbMap);
		}
		IReportBuilder builder = new ReportBuilder();

		builder.setJrXml(request.getSession().getServletContext().getResourceAsStream("/WEB-INF/reports/document/RCS037.jrxml"));
	
		builder.setDatasource(resList);
		builder.setParameter(parmMap);

		DataItem resItem = new DataItem();
		//String filePathName = builder.generate(ReportType.SAVE_PDF);
		String filePathName = "";
		
		if(parm.getRptTp() != null && parm.getRptTp().equals("EXCEL")) {
			filePathName = builder.generate(ReportType.SAVE_EXCEL);
		}else {
			filePathName = builder.generate(ReportType.SAVE_PDF);
		}
		
		String fileName[] = filePathName.split(PcsProperties.getProperty("file.separator"));

		File file = new File(filePathName);

		InputStream in = new FileInputStream(file);
		FileUploadItem fileItem = new FileUploadItem();

		fileItem.setFileName(fileName[fileName.length - 1]);
		fileItem.setContent(IOUtils.toString(in, "ISO-8859-1"));

		resItem.add(fileItem);
		res.setData(resItem.getCollection());

		// Remove temp file
		builder.removePDFfile(in, file);

		return res;
	} */
}
