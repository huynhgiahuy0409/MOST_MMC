package com.tsb.most.biz.rest.planning;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tsb.most.biz.dataitem.planning.MegaItem;
import com.tsb.most.biz.parm.planning.SearchMegaParm;
import com.tsb.most.framework.bizparm.base.UpdateBizParm;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.ServiceException;
import com.tsb.most.framework.response.RestResponse;
import com.tsb.most.rest.base.RestBaseController;

@RestController
@RequestMapping("/v1/megaContractor")
public class MegaContractorController extends RestBaseController {

	@GetMapping(value = "/list")
	public RestResponse selectMegaList(SearchMegaParm parm) throws ServiceException, Exception {
		RestResponse response = new RestResponse();
		
		Object result = invokeService("MOST.megaContractor.getMegaContractorList", parm);
		
		response.setData(((DataItemList) result).getCollection());
		
		return response;
	}
	
	@PutMapping(value = "/list/{id}")
	public RestResponse updateMegaForContractor(@PathVariable("id") String id, @RequestBody UpdateBizParm<MegaItem> parm) {
		RestResponse response = new RestResponse();
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();

		updateParm.setUpdateItem(super.getItems(parm).get(0));
		Object result = invokeService("MOST.megaContractor.updateItem", updateParm);

		response.setData(((DataItemList) result).getCollection());

		return response;
	}
	
	
	@RequestMapping(value = "/deny/{id}", method = RequestMethod.PUT)
	@ResponseBody
	public RestResponse updateMegaStatus(@PathVariable("id") String id, @RequestBody UpdateBizParm<MegaItem> parm)
			throws ServiceException, Exception {
		RestResponse res = new RestResponse();
		
		UpdateItemsBizParm updateParm = new UpdateItemsBizParm();

		updateParm.setUpdateItems(super.getItems(parm));

		Object result = invokeService("MOST.megaContractor.denyMegaOperItem", updateParm);

		res.setData(((DataItemList) result).getCollection());

		return res;
	}
	
	/*
	@RequestMapping(value = "/previewpdf", method = RequestMethod.GET)
	@ResponseBody
	public RestResponse previewPdfVslInternal(SearchMegaParm param, HttpServletRequest request,
			HttpServletResponse response) throws ServiceException, Exception {
		RestResponse RestRes = new RestResponse();
		HashMap parmMap = new HashMap();
		DataItem resItem = new DataItem();
		IReportBuilder builder = new ReportBuilder();
		String isCTT = "N";
		List result;

		parmMap.put("IMAGE_PATH", request.getSession().getServletContext()
				.getRealPath("/WEB-INF/reports/" + PcsProperties.getProperty("terminal.code") + ".gif"));
		parmMap.put("PRINTER", param.getUserId());

		if (param.getRptTp().equals("MEGAForContractor")) {

			if (param.getVslCallId().equals("NonCallId")) {
				parmMap.put("title", "Non-JPVC");
				parmMap.put("REPORT_ID", "RCS033");
				param.setSearchReport("true");
				parmMap.put("serviceDate", param.getServiceDate());
			} else {
				parmMap.put("title", "JPVC");
				parmMap.put("REPORT_ID", "RCS032");
				param.setSearchReport("true");
			}

			isCTT = param.getIsCTT();

			if ("Y".equals(isCTT)) {
				RestResponse rtnValue = (RestResponse) execute("mega", "getMegaReport4CTT", param);
				result = rtnValue.getData();

			} else {
				RestResponse rtnValue = (RestResponse) execute("mega", "getMegaReport", param);

				result = rtnValue.getData();
			}
			ArrayList rptDataList = new ArrayList();
			HashMap rptMap = new HashMap();

			MegaItem returnItem = (MegaItem) result.get(0);

			ArrayList stevedoreList = returnItem.getMegaStevedoreList();
			ArrayList tlList = returnItem.getTrList();
			ArrayList flList = returnItem.getFlList();
			ArrayList meList = returnItem.getMcList();
			ArrayList grList = returnItem.getGrList();
			ArrayList companyInfo = returnItem.getCompanyInfo();

			parmMap.put("JPVC", param.getVslCallId());

			for (Iterator it = companyInfo.iterator(); it.hasNext();) {

				MegaItem itm = (MegaItem) it.next();
				parmMap.put("companyName", itm.getEngNm());
				parmMap.put("accNo", itm.getAccountNo());
				parmMap.put("VSL_NM", itm.getVslNm());
				parmMap.put("USER_ID", param.getUserId());
			}

			if (tlList != null && tlList.size() > 0) {
				JRDataSource tlDs = new JRBeanCollectionDataSource(tlList);
				rptMap.put("TL_DS", tlDs);
			}
			if (flList != null && flList.size() > 0) {
				JRDataSource flDs = new JRBeanCollectionDataSource(flList);
				rptMap.put("FL_DS", flDs);
			}
			if (meList != null && meList.size() > 0) {
				JRDataSource meDs = new JRBeanCollectionDataSource(meList);
				rptMap.put("ME_DS", meDs);
			}
			if (grList != null && grList.size() > 0) {
				JRDataSource GrDs = new JRBeanCollectionDataSource(grList);
				rptMap.put("GR_DS", GrDs);
			}
			if (stevedoreList != null && stevedoreList.size() > 0) {
				JRDataSource stDs = new JRBeanCollectionDataSource(stevedoreList);
				rptMap.put("ST_DS", stDs);
			}

			rptDataList.add(rptMap);

			String subRpt1Jrxml = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03201.jrxml");
			String subRpt1Jasper = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03201.jasper");

			File fileReport1 = new File(subRpt1Jasper);
			if (!fileReport1.exists()) {
				JasperCompileManager.compileReportToFile(subRpt1Jrxml, subRpt1Jasper);
			}

			String subRpt2Jrxml = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03202.jrxml");
			String subRpt2Jasper = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03202.jasper");

			File fileReport2 = new File(subRpt2Jasper);
			if (!fileReport2.exists()) {
				JasperCompileManager.compileReportToFile(subRpt2Jrxml, subRpt2Jasper);
			}

			String subRpt3Jrxml = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03203.jrxml");
			String subRpt3Jasper = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03203.jasper");

			File fileReport3 = new File(subRpt3Jasper);
			if (!fileReport3.exists()) {
				JasperCompileManager.compileReportToFile(subRpt3Jrxml, subRpt3Jasper);
			}

			String subRpt4Jasper;
			String subRpt4Jrxml;
			if (param.getVslCallId().equals("NonCallId")) {
				subRpt4Jrxml = request.getSession().getServletContext()
						.getRealPath("/WEB-INF/reports/planning/RCS03206.jrxml");
				subRpt4Jasper = request.getSession().getServletContext()
						.getRealPath("/WEB-INF/reports/planning/RCS03206.jasper");
			} else {
				subRpt4Jrxml = request.getSession().getServletContext()
						.getRealPath("/WEB-INF/reports/planning/RCS03204.jrxml");
				subRpt4Jasper = request.getSession().getServletContext()
						.getRealPath("/WEB-INF/reports/planning/RCS03204.jasper");
			}

			File fileReport4 = new File(subRpt4Jasper);
			if (!fileReport4.exists()) {
				JasperCompileManager.compileReportToFile(subRpt4Jrxml, subRpt4Jasper);
			}

			String subRpt5Jrxml = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03205.jrxml");
			String subRpt5Jasper = request.getSession().getServletContext()
					.getRealPath("/WEB-INF/reports/planning/RCS03205.jasper");

			File fileReport5 = new File(subRpt5Jasper);
			if (!fileReport5.exists()) {
				JasperCompileManager.compileReportToFile(subRpt5Jrxml, subRpt5Jasper);
			}

			JasperReport subRpt1 = (JasperReport) JRLoader.loadObject(fileReport1);
			JasperReport subRpt2 = (JasperReport) JRLoader.loadObject(fileReport2);
			JasperReport subRpt3 = (JasperReport) JRLoader.loadObject(fileReport3);
			JasperReport subRpt4 = (JasperReport) JRLoader.loadObject(fileReport4);
			JasperReport subRpt5 = (JasperReport) JRLoader.loadObject(fileReport5);

			parmMap.put("SUB_RPT1", subRpt1);
			parmMap.put("SUB_RPT2", subRpt2);
			parmMap.put("SUB_RPT3", subRpt3);
			parmMap.put("SUB_RPT4", subRpt4);
			parmMap.put("SUB_RPT5", subRpt5);

			ArrayList resList = new ArrayList();
			resList.add(new HashMap());

			// Make the PDF file based on Filled data
			builder.setParameter(parmMap);
			builder.setDatasource(rptDataList);
			// builder.setJrXml(request.getSession().getServletContext().getResourceAsStream("/WEB-INF/reports/planning/RBP001.jrxml"));
			if (param.getVslCallId().equals("NonCallId")) {
				builder.setJrXml(request.getSession().getServletContext()
						.getResourceAsStream("/WEB-INF/reports/planning/RCS033.jrxml"));
			} else {
				builder.setJrXml(request.getSession().getServletContext()
						.getResourceAsStream("/WEB-INF/reports/planning/RCS032.jrxml"));
			}

		}

		String filePathName = "";

		if (param.getExportTp().equals("") || param.getExportTp().equals("PDF")) {
			filePathName = builder.generate(ReportType.SAVE_PDF);
		} else if (param.getExportTp().equals("EXCEL")) {
			filePathName = builder.generate(ReportType.SAVE_EXCEL);
		}

		String fileName[] = filePathName.split(PcsProperties.getProperty("file.separator"));

		File file = new File(filePathName);
		InputStream in = new FileInputStream(file);
		FileUploadItem fileItem = new FileUploadItem();

		fileItem.setFileName(fileName[fileName.length - 1]);
		fileItem.setContent(IOUtils.toString(in, "ISO-8859-1"));

		resItem.add(fileItem);
		RestRes.setData(resItem.getCollection());

		// Remove temp file
		builder.removePDFfile(in, file);
		return RestRes;
	};
	*/
}
