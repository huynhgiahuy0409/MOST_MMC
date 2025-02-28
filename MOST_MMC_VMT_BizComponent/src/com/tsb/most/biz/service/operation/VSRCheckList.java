package com.tsb.most.biz.service.operation;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.common.constant.DAOProcessType;
import com.tsb.most.basebiz.dao.codes.ICodeMasterDao;
import com.tsb.most.basebiz.dao.configuration.IEquipmentConfigurationDao;
import com.tsb.most.basebiz.dao.popup.IPopupServiceDao;
import com.tsb.most.basebiz.dataitem.common.SearchVesselCallListItem;
import com.tsb.most.basebiz.parm.codes.SearchCodeMasterParm;
import com.tsb.most.basebiz.parm.configuration.SearchEquipmentConfigurationParm;
import com.tsb.most.basebiz.parm.popup.SearchPopupServiceParm;
import com.tsb.most.biz.dao.operation.IVOperationDeployDao;
import com.tsb.most.biz.dao.operation.IVSRCheckListDao;
import com.tsb.most.biz.dao.operation.IVesselOprSettingDao;
import com.tsb.most.biz.dataitem.operation.MegaItem;
import com.tsb.most.biz.dataitem.operation.VSRCheckListItem;
import com.tsb.most.biz.parm.operation.SearchStaffAndDeploymentParm;
import com.tsb.most.biz.parm.operation.SearchVSRCheckListParm;
import com.tsb.most.biz.parm.operation.SearchVesselOprSettingParm;
import com.tsb.most.common.constant.OperationConstant;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.UpdateItemsBizParm;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class VSRCheckList extends MOSTBaseService implements IVSRCheckList {
	private ICodeMasterDao codeMasterDao;
	private IVSRCheckListDao vsrCheckListDao;
	private IVOperationDeployDao vOperationDeployDao;
	private IEquipmentConfigurationDao equipmentConfigurationDao;
	private IVesselOprSettingDao vesselOprSettingDao;
	private IPopupServiceDao popupServiceDao;

	public void setvOperationDeployDao(IVOperationDeployDao vOperationDeployDao) {
		this.vOperationDeployDao = vOperationDeployDao;
	}

	public void setVsrCheckListDao(IVSRCheckListDao vsrCheckListDao) {
		this.vsrCheckListDao = vsrCheckListDao;
	}
	
	public void setEquipmentConfigurationDao(IEquipmentConfigurationDao equipmentConfigurationDao) {
		this.equipmentConfigurationDao = equipmentConfigurationDao;
	}

	public void setCodeMasterDao(ICodeMasterDao codeMasterDao) {
		this.codeMasterDao = codeMasterDao;
	}

	public void setVesselOprSettingDao(IVesselOprSettingDao vesselOprSettingDao) {
		this.vesselOprSettingDao = vesselOprSettingDao;
	}

	public void setPopupServiceDao(IPopupServiceDao popupServiceDao) {
		this.popupServiceDao = popupServiceDao;
	}

	/////////////////////////////////////////////////////////////////////////////////
	public DataItemList selectVSRCheckList(SearchVSRCheckListParm parm) throws BizException {
		SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd/mm/yyyy");
		Date convertedStartDate = new Date();
		Date convertedEndDate = new Date();
		if ((!"null".equalsIgnoreCase(parm.getWorkStDt()))
				&& !"".equalsIgnoreCase(parm.getWorkEndDt())
				&& (!"null".equalsIgnoreCase(parm.getWorkEndDt()))
				&& !"".equalsIgnoreCase(parm.getWorkEndDt())) {
			try {
				convertedStartDate = dateFormat1.parse(parm.getWorkStDt().toString());
			} catch (ParseException e) {		
				e.printStackTrace();				
			}
		}
		if ((!"null".equalsIgnoreCase(parm.getWorkStDt()))
				&& !"".equalsIgnoreCase(parm.getWorkEndDt())
				&& (!"null".equalsIgnoreCase(parm.getWorkEndDt()))
				&& !"".equalsIgnoreCase(parm.getWorkEndDt())) {
			try {
				convertedEndDate = dateFormat1.parse(parm.getWorkEndDt().toString());
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		SimpleDateFormat formatter = new SimpleDateFormat("yyyymmdd");
	   
		if ("null".equalsIgnoreCase(parm.getVslCallID())
				|| "".equalsIgnoreCase(parm.getVslCallID())) {
			parm.setWorkStDt(formatter.format(convertedStartDate));
			parm.setWorkEndDt(formatter.format(convertedEndDate));
		} else if ((!"null".equalsIgnoreCase(parm.getWorkStDt()))
				&& !"".equalsIgnoreCase(parm.getWorkEndDt())
				&& (!"null".equalsIgnoreCase(parm.getWorkEndDt()))
				&& !"".equalsIgnoreCase(parm.getWorkEndDt())) {
			parm.setWorkStDt(formatter.format(convertedStartDate));
			parm.setWorkEndDt(formatter.format(convertedEndDate));
		}
		DataItemList itemList = vsrCheckListDao.selectVSRCheckList(parm);
		return itemList;
	}

	public DataItemList selectVSRCheckListDetail(SearchVSRCheckListParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		List returnItems = new ArrayList();
		VSRCheckListItem returnItem = new VSRCheckListItem();
		
		if (parm.getSearchReport() != null && parm.getSearchNonCallId() != null) {
			itemList = vsrCheckListDao.selectVSRCheckListDetail(parm);
		} else {
			ArrayList<VSRCheckListItem> checkVSRList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectVSRCheckListDetail(parm).getCollection();
			parm.setDivCd(CodeConstant.MT_MGDIV_EQ);
			parm.setEqDivCd(CodeConstant.MT_EQTP_FL);
			ArrayList<MegaItem> MegaFList = (ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();
			List refNoCombo = vsrCheckListDao.selectRefNoCombo(parm).getCollection();

			parm.setDivCd("ME");
			ArrayList<MegaItem> MegaMEList = (ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();

			/* parm.setDivCd(CodeConstant.MT_EQCD_TR); */
			parm.setDivCd("TRL");
			ArrayList<MegaItem> MegaTRList = (ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();

			parm.setDivCd("PC");
			ArrayList<MegaItem> MegaPCList = (ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();

			ArrayList<SearchVesselCallListItem> vesselCallList = new ArrayList<SearchVesselCallListItem>();
//			if (parm.getVslCallID() != null
//				&& !"".equals(parm.getVslCallID())) {
//				SearchVesselCallListParm jpvcParm = new SearchVesselCallListParm();
//				jpvcParm.setVslCallId(parm.getVslCallID());
//				vesselCallList = (ArrayList<SearchVesselCallListItem>)searchVesselCallDao.selectSearchVesselCallId(jpvcParm).getCollection();
//			}

			List megaNo = vsrCheckListDao.selectMegaNoList(parm).getCollection();

			parm.setEqTp("PC");
			ArrayList<VSRCheckListItem> pcList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectDeployEQList(parm).getCollection();

			parm.setEqTp(CodeConstant.MT_EQTP_FL);
			List flList = vsrCheckListDao.selectVOperationDeployEQList(parm).getCollection();
			ArrayList<VSRCheckListItem> flEmpList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectEmpIdList(parm).getCollection();

			List payerList = vsrCheckListDao.selectPayerList(parm).getCollection();

			List stvList = new ArrayList();
			if (parm.getVslCallID() != null && !"".equals(parm.getVslCallID())) {
				returnItem.setCheckVSRList(checkVSRList);
				returnItem.setMegaFList(MegaFList);
				returnItem.setMegaMEList(MegaMEList);
				returnItem.setMegaTRList(MegaTRList);
				returnItem.setMegaPCList(MegaPCList);
				returnItem.setSearchJPVCItem(vesselCallList);
				returnItem.setFlEmpList(flEmpList);
			}
		}
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList selectVSRCheckListhht(SearchVSRCheckListParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		itemList = vsrCheckListDao.selectEmpIdList(parm);
		return itemList;
	}
	
	public DataItemList getVSRDetailHHT(SearchVSRCheckListParm parm) throws BizException {
    	DataItemList returnItems = new DataItemList();
    	VSRCheckListItem returnItem = new VSRCheckListItem();
    	SearchStaffAndDeploymentParm parmVO = new SearchStaffAndDeploymentParm();
    	
    	parmVO.setVslCallId(parm.getVslCallID());
    	parmVO.setWorkYmd(parm.getWorkYmd());
    	parmVO.setShftId(parm.getShftId());
    	ArrayList<VSRCheckListItem> megaHHT = (ArrayList<VSRCheckListItem>)vOperationDeployDao.selectForkliftDeployListForVSR(parmVO).getCollection();
    	ArrayList<VSRCheckListItem> checkVSRList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectVSRCheckListDetail(parm).getCollection();
    	ArrayList<VSRCheckListItem> MegaFList = new ArrayList<>();
    	ArrayList<VSRCheckListItem> MegaMEList = new ArrayList<>();
    	ArrayList<VSRCheckListItem> MegaTRList = new ArrayList<>();
    	ArrayList<VSRCheckListItem> MegaPCList = new ArrayList<>();
    	for(VSRCheckListItem item : megaHHT)
    	{
    		if(item.getDivCd().equals(OperationConstant.VSR_DIV_CD_FL))
    		{
    			MegaFList.add(item);
    		}
    		else if(item.getDivCd().equals(OperationConstant.VSR_DIV_CD_ME))
    		{
    			MegaMEList.add(item);
    		}
    		else if(item.getDivCd().equals(OperationConstant.VSR_DIV_CD_TR))
    		{
    			MegaTRList.add(item);
    		}
    		else if(item.getDivCd().equals(OperationConstant.VSR_DIV_CD_PC))
    		{
    			MegaPCList.add(item);
    		}
    	}
			
//		ArrayList<SearchVesselCallItem> jpvcList = new ArrayList();
//		if (parm.getVslCallID() != null
//			&& !"".equals(parm.getVslCallID())) {
//			SearchVesselCallParm jpvcParm = new SearchVesselCallParm();
//			jpvcParm.setVslCallId(parm.getVslCallID());
//			jpvcList = (ArrayList<SearchVesselCallItem>)searchVesselCallDao.selectSearchVesselCallList(jpvcParm).getCollection();
//		}

		DataItemList megaNo = vsrCheckListDao.selectMegaNoList(parm);

		parm.setEqTp("PC");
		ArrayList<VSRCheckListItem> pcList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectVOperationDeployEQList(parm).getCollection();

		parm.setEqTp(CodeConstant.MT_EQTP_FL);
		List flList = vsrCheckListDao.selectVOperationDeployEQList(parm).getCollection();
		ArrayList<VSRCheckListItem> flEmpList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectEmpIdList(parm).getCollection();

		List payerList = vsrCheckListDao.selectPayerList(parm).getCollection();

		List stvList = new ArrayList();
		if (parm.getVslCallID() != null && !"".equals(parm.getVslCallID())) {
			returnItem.setCheckVSRList(checkVSRList);
			returnItem.setMegaFListHHT(MegaFList);
			returnItem.setMegaMEListHHT(MegaMEList);
			returnItem.setMegaTRListHHT(MegaTRList);
			returnItem.setMegaPCListHHT(MegaPCList);
			//returnItem.setSearchJPVCItem(jpvcList);
			returnItem.setFlEmpList(flEmpList);
		}
	
	 	returnItems.add(returnItem);
	 	return returnItems;
      
    }
	
	public DataItemList selectVSRDeployFLNoCombo(SearchVSRCheckListParm parm) throws BizException {
		parm.setEqTp(CodeConstant.MT_EQTP_FL);
		return vsrCheckListDao.selectVOperationDeployEQList(parm);
	}
	
	public DataItemList selectVSRDeployEQNoCombo(SearchVSRCheckListParm parm) throws BizException {
		parm.setEqTp("PC");
		return vsrCheckListDao.selectDeployEQList(parm);
	}
	
	public DataItemList selectVSREmpIdCombo(SearchVSRCheckListParm parm) throws BizException {
		return vsrCheckListDao.selectEmpIdList(parm);
	}
	
	public DataItemList selectVSREquipmentTRListCombo(SearchVSRCheckListParm parm) throws BizException {
		SearchEquipmentConfigurationParm equipParm = new SearchEquipmentConfigurationParm();
		equipParm.setEqTpCd(CodeConstant.MT_EQCD_TR);
		return equipmentConfigurationDao.selectEquipmentList(equipParm);
	}
	
	public DataItemList selectVSREquipmentCapaListCombo(SearchVSRCheckListParm parm) throws BizException {
		SearchEquipmentConfigurationParm equipParm = new SearchEquipmentConfigurationParm();
		return new DataItemList();
		//return equipmentConfigurationDao.selectCapacityComboList(equipParm);
	}
	
	public DataItemList selectWorkingArea(SearchVSRCheckListParm parm) throws BizException {
 		DataItemList itemList = new DataItemList();
 		
 		return itemList;
	}
	
	public DataItemList selectVSRPartnerCodeListCombo(SearchVSRCheckListParm parm) throws BizException {
		SearchPopupServiceParm partnerCodeParm = new SearchPopupServiceParm();
		partnerCodeParm.setReqType("CD");
		partnerCodeParm.setPtnrType(parm.getDivCd());
		return popupServiceDao.selectPartnerCodeList(partnerCodeParm);
	}
	
	public DataItemList selectVSRPopupList(SearchVSRCheckListParm parm) throws BizException {
		DataItemList itemList = new DataItemList();
		VSRCheckListItem returnItem = new VSRCheckListItem();
		Object[] parmObj;
		ArrayList arrService = new ArrayList();

		if (parm.getSearchType().equals("craneList")) {
			if (parm.getSearchReport() != null
					&& parm.getSearchNonCallId() != null) {
				ArrayList<VSRCheckListItem>checkVSRList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectVSRCheckListDetail(parm).getCollection();
				returnItem.setCheckVSRList(checkVSRList);
			} else {
				ArrayList<VSRCheckListItem>checkVSRList = (ArrayList<VSRCheckListItem>)vsrCheckListDao.selectVSRCheckListDetail(parm).getCollection();
				parm.setDivCd("EQ");
				parm.setEqDivCd("FL");
				ArrayList<MegaItem> MegaFList = ( ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();
				List refNoCombo = vsrCheckListDao.selectRefNoCombo(parm).getCollection();

				parm.setDivCd("ME");
				ArrayList<MegaItem> MegaMEList = ( ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();

				parm.setDivCd("TRL");
				ArrayList<MegaItem> MegaTRList = ( ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();

				parm.setDivCd("PC");
				ArrayList<MegaItem> MegaPCList = ( ArrayList<MegaItem>)vsrCheckListDao.selectMegaEQList(parm).getCollection();

				List jpvcList = new ArrayList();
				List megaNo = vsrCheckListDao.selectMegaNoList(parm).getCollection();

				parm.setEqTp("PC");
				List pcList = vsrCheckListDao.selectDeployEQList(parm).getCollection();

				parm.setEqTp("FL");
				List flList = vsrCheckListDao.selectVOperationDeployEQList(parm).getCollection();
				List empId = vsrCheckListDao.selectEmpIdList(parm).getCollection();

				List payerList = vsrCheckListDao.selectPayerList(parm).getCollection();

				List stvList = new ArrayList();
				if (parm.getVslCallID() != null && !"".equals(parm.getVslCallID())) {
					SearchVesselOprSettingParm vorParm = new SearchVesselOprSettingParm();
					
					vorParm.setVslCallId(parm.getVslCallID());
					vorParm.setWorkYmd(parm.getWorkYmd());
					vorParm.setShift(parm.getShftId());
					stvList = vesselOprSettingDao.selectVORDryBreakBulkForStevAndTrim(vorParm).getCollection();
					returnItem.setCheckVSRList(checkVSRList);
					returnItem.setMegaFList(MegaFList);
					returnItem.setMegaMEList(MegaMEList);
					returnItem.setJpvcList(jpvcList);
					returnItem.add(megaNo);
					returnItem.add(pcList);
					returnItem.add(flList);
					returnItem.add(empId);
					returnItem.setMegaTRList(MegaTRList);
					returnItem.setMegaPCList(MegaPCList);
					returnItem.add(payerList);
					returnItem.setStvList(stvList);
					returnItem.add(refNoCombo);
					
				}
			}
			List returnItems = new ArrayList();
			returnItems.add(returnItem);
		} else if (parm.getSearchType().equals("VSRList")) {
			SimpleDateFormat dateFormat1 = new SimpleDateFormat("dd/mm/yyyy");
			Date convertedStartDate = new Date();
			Date convertedEndDate = new Date();
			if ((!"null".equalsIgnoreCase(parm.getWorkStDt()))
					&& !"".equalsIgnoreCase(parm.getWorkEndDt())
					&& (!"null".equalsIgnoreCase(parm.getWorkEndDt()))
					&& !"".equalsIgnoreCase(parm.getWorkEndDt())) {
				try {
					convertedStartDate = dateFormat1.parse(parm.getWorkStDt()
							.toString());
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
					// throw new BizException(e);
				}
			}
			if ((!"null".equalsIgnoreCase(parm.getWorkStDt()))
					&& !"".equalsIgnoreCase(parm.getWorkEndDt())
					&& (!"null".equalsIgnoreCase(parm.getWorkEndDt()))
					&& !"".equalsIgnoreCase(parm.getWorkEndDt())) {
				try {
					convertedEndDate = dateFormat1.parse(parm.getWorkEndDt()
							.toString());
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			SimpleDateFormat formatter = new SimpleDateFormat("yyyymmdd");
			if ("null".equalsIgnoreCase(parm.getVslCallID())
					|| "".equalsIgnoreCase(parm.getVslCallID())) {
				parm.setWorkStDt(formatter.format(convertedStartDate));
				parm.setWorkEndDt(formatter.format(convertedEndDate));
			} else if ((!"null".equalsIgnoreCase(parm.getWorkStDt()))
					&& !"".equalsIgnoreCase(parm.getWorkEndDt())
					&& (!"null".equalsIgnoreCase(parm.getWorkEndDt()))
					&& !"".equalsIgnoreCase(parm.getWorkEndDt())) {
				parm.setWorkStDt(formatter.format(convertedStartDate));
				parm.setWorkEndDt(formatter.format(convertedEndDate));
			}

			List checkVSRList = vsrCheckListDao.selectVSRCheckList(parm).getCollection();
			returnItem.add(checkVSRList);
			itemList.add(returnItem);
			return itemList;
		} else if (parm.getSearchType().equals("shiftList")) {
//			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
//			VesselOperationReportParm parmVOR = new VesselOperationReportParm();
//			List shiftList = vesselOperationReportDao.getShift(parmVOR).getCollection();
//			returnItem.add(shiftList);
		} else if (parm.getSearchType().equals("purpose")) {
			List<Object> MegaFList = (List<Object>)vsrCheckListDao.selectMegaEQList(parm).getCollection();
			returnItem.add(MegaFList);
		} else if (parm.getSearchType().equals("shift")) {

			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
//			VesselOperationReportParm parmVOR = new VesselOperationReportParm();
//			List shiftList = vesselOperationReportDao.getShift(parmVOR).getCollection();
//			returnItem.add(shiftList);

			arrService = new ArrayList();
			partyCode.setLcd("MT");
			partyCode.setMcd("LOCDIV1");

			returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

			arrService = new ArrayList();
			partyCode = new SearchCodeMasterParm();
			partyCode.setLcd("MT");
			partyCode.setMcd("WPCD");

			returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

			ArrayList roleArr = new ArrayList();
			ArrayList arr1 = new ArrayList();
			partyCode = new SearchCodeMasterParm();
			partyCode.setLcd("CM");
			partyCode.setMcd("ROLECD");
			partyCode.setCol3("VSR");
			partyCode.setScdUse("Y");

			roleArr.addAll(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
			returnItem.add(roleArr);

			arrService = new ArrayList();
			partyCode = new SearchCodeMasterParm();
			partyCode.setLcd("MT");
			partyCode.setMcd("EQFCTPCD");

			returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

			arrService = new ArrayList();
			partyCode = new SearchCodeMasterParm();
			partyCode.setLcd("MT");
			partyCode.setMcd("HTC");

			returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

			partyCode.setLcd("MT");
			partyCode.setMcd("CGTPNLQ");
			partyCode.setCol1(null);

			returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

			List checkVSRList = vsrCheckListDao.selectPayerList(parm).getCollection();
			returnItem.add(checkVSRList);

			// MEGA Purpose
			partyCode.setLcd("MT");
			partyCode.setMcd("MGPURP"); // MEGA Purpose
			if ("E".equals(parm.getTxTraceinfo().getUserInfo().getUserType())) {
				partyCode.setSearchType("MGPURPEX");
			}
			partyCode.setScdUse("Y"); // S_CD_USE = 'Y'

			returnItem.add(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());

			parm.setEqTp("FL");
			List driver = vsrCheckListDao.selectEmpIdList(parm).getCollection();
			returnItem.add(driver);

		} else if (parm.getSearchType().equals("HHTPayerList")) {
			List checkVSRList = vsrCheckListDao.selectPayerList(parm).getCollection();
			returnItem.add(checkVSRList);
		} else if (parm.getSearchType().equals("userInfo")) {
//			UserInfoListParm roleCode = new UserInfoListParm();
//			parmObj = new Object[] { roleCode };
//			arrService = this.callWebservice("PartyCodeBean", "getUserInfoList", parmObj);
//			returnItem.add((ArrayList) arrService.clone());
		} else if (parm.getSearchType().equals("megaNo")) {
			List megaNo = vsrCheckListDao.selectMegaNoList(parm).getCollection();
			List refNoCombo = vsrCheckListDao.selectRefNoCombo(parm).getCollection();

			parm.setEqTp("PC");
			List pcList = vsrCheckListDao.selectDeployEQList(parm).getCollection();
			parm.setEqTp("FL");
			List flList = vsrCheckListDao.selectVOperationDeployEQList(parm).getCollection();

			List empId = vsrCheckListDao.selectEmpIdList(parm).getCollection();

			returnItem.add(megaNo);
			returnItem.add(pcList);
			returnItem.add(flList);
			returnItem.add(empId);

			returnItem.add(refNoCombo);
		} else if (parm.getSearchType().equals("EQCapa")) {
			List eqCapa;
			if (parm.getEqTp() != null && "FL".equals(parm.getEqTp())) {
				eqCapa = vsrCheckListDao.selectVOperationDeployEQList(parm).getCollection();
			} else {
				eqCapa = vsrCheckListDao.selectDeployEQList(parm).getCollection();
			}

			List driver = vsrCheckListDao.selectEmpIdList(parm).getCollection();
			returnItem.add(eqCapa);
			returnItem.add(driver);
		} else if (parm.getSearchType().equals("roleCd")) {
			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
			List returnItems = new ArrayList();
			
			partyCode.setLcd("CM");
			partyCode.setMcd("ROLECD");
			partyCode.setSearchType("ROLE");
			partyCode.setScdUse("Y");
			partyCode.setCol3("VSR");
			returnItem.setEmpIdCombo(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
			returnItems.add(returnItem);
		} else if (parm.getSearchType().equals("EmpId")) {
			List returnItems = new ArrayList();
			
			returnItem.setEmpIdList(vsrCheckListDao.selectEmpIdList(parm).getCollection());
			returnItems.add(returnItem);
		} else if (parm.getSearchType().equals("InitEmpId")) {
			List returnItems = new ArrayList();
			
			returnItem.setEmpIdList(vsrCheckListDao.selectEmpIdList(parm).getCollection());
			
			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
			partyCode.setLcd("CM");
			partyCode.setMcd("ROLECD");
			partyCode.setSearchType("ROLE");
			partyCode.setScdLgv("E");
			partyCode.setScdUse("Y");
			returnItem.setEmpIdCombo(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
			
			returnItems.add(returnItem);
		} else if (parm.getSearchType().equals("WPCD_CMB_DATA")) {
			arrService = new ArrayList();
			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
			partyCode = new SearchCodeMasterParm();
			partyCode.setLcd("MT");
			partyCode.setMcd("WPCD");

			returnItem.add((ArrayList) codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
		} else if (parm.getSearchType().equals("WPCD")) {
			List workAreaList = vsrCheckListDao.selectWorkingArea(parm).getCollection();
			returnItem.add(workAreaList);
		} else if (parm.getSearchType().equals("EXISTENCEHHT")) {
			List record = vsrCheckListDao.selectCheckVSRListHHT(parm).getCollection();
			returnItem.add(record);

		} else if (parm.getSearchType().equals("EXISTENCE")) {
			List record = vsrCheckListDao.selectVSRCheckListDetail(parm).getCollection();
			returnItem.add(record);

		} else if (parm.getSearchType().equals("HHT_FLNo")) {
			parm.setEqTp("FL");
			List flList = vsrCheckListDao.selectVOperationDeployEQList(parm).getCollection();
			returnItem.add(flList);
		} else if (parm.getSearchType().equals("HHT_DeployedPCNo")) {
			parm.setEqTp("PC");
			List pcList = vsrCheckListDao.selectDeployEQList(parm).getCollection();
			returnItem.add(pcList);
		} else if (parm.getSearchType().equals("HHT_MegaPurpose")) {
			SearchCodeMasterParm partyCode = new SearchCodeMasterParm();
			partyCode.setLcd("MT");
			partyCode.setMcd("MGPURP"); // MEGA Purpose
			partyCode.setScdUse("Y"); // S_CD_USE = 'Y'

			returnItem.add(codeMasterDao.selectCodeMasterSmallCodeList(partyCode).getCollection());
		} else if (parm.getSearchType().equals("RefNoCombo")) {
			List refNoCombo = vsrCheckListDao.selectRefNoCombo(parm).getCollection();
			returnItem.add(refNoCombo);
		}
		itemList.add(returnItem);
		return itemList;
	}
	
	public DataItemList processVSRListItem(UpdateItemsBizParm parm) throws BizException {

		VSRCheckListItem item = (VSRCheckListItem) parm.getUpdateItem();
		ArrayList lst = item.getCheckVSRList();

		DataItemList insertItems = new DataItemList();
		DataItemList updateShiftingItems = new DataItemList();
		DataItemList deleteItems = new DataItemList();

		if (lst.size() > 0) {
			for (int i = 0; i < lst.size(); i++) {
				VSRCheckListItem itemCol = (VSRCheckListItem) lst.get(i);

				SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
				SimpleDateFormat outputFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm");
				try {
					if (itemCol.getWorkStDt() != null && !itemCol.getWorkStDt().equals("")) {
						Date workStdate = inputFormat.parse(itemCol.getWorkStDt());
						String strWorkStDt = outputFormat.format(workStdate);
						itemCol.setWorkStDt(strWorkStDt);
					}
					if (itemCol.getWorkEndDt() != null && !itemCol.getWorkEndDt().equals("")) {
						Date workEnddate = inputFormat.parse(itemCol.getWorkEndDt());
						String strWorkEndDt = outputFormat.format(workEnddate);
						itemCol.setWorkEndDt(strWorkEndDt);
					}
					if (itemCol.getSetupTime() != null && !itemCol.getSetupTime().equals("")) {
						Date setUpdate = inputFormat.parse(itemCol.getSetupTime());
						String strSetUpDt = outputFormat.format(setUpdate);
						itemCol.setSetupTime(strSetUpDt);
					}
				} catch (Exception ex) {
					System.out.println(ex.getMessage());
				}

				if (itemCol.getWorkingStatus() != null) {
					if (itemCol.getWorkingStatus().equals(DAOProcessType.INSERT)) {
						insertItems.add(itemCol);
					} else if (itemCol.getWorkingStatus().equals(DAOProcessType.UPDATE)) {
						updateShiftingItems.add(itemCol);
					} else if (itemCol.getWorkingStatus().equals(DAOProcessType.DELETE)) {
						deleteItems.add(itemCol);
					}
				}

			}

			if (insertItems.size() > 0) {
				vsrCheckListDao.insertItem(insertItems);
			}

			if (updateShiftingItems.size() > 0) {
				vsrCheckListDao.updateItems(updateShiftingItems);
			}
			VSRCheckListItem itm = null;
			if (deleteItems.size() > 0) {
				boolean inUsed = false;
				for (Iterator it = deleteItems.getCollection().iterator(); it.hasNext();) {
					itm = (VSRCheckListItem) (it.next());
					Integer d = vsrCheckListDao.selectIsItemInUsed(itm);
					if (d.intValue() > 0)
						inUsed = true;
					if (inUsed) {
						// throw new ApplicationException("CT106016");
						item.setMessageCd("CT106016");
					} else {
						vsrCheckListDao.deleteDatagathering(itm);
						vsrCheckListDao.deleteItems(deleteItems);
					}
				}
			}
		}
		
		DataItemList returnItems = new DataItemList();
		returnItems.add(item);
		return returnItems;
	}
	
	public DataItemList updateVSRVerifyItem(UpdateItemsBizParm parm) throws BizException {
		VSRCheckListItem item = (VSRCheckListItem) parm.getUpdateItem();
		DataItemList verifyItems = new DataItemList();
		verifyItems.add(item);
		vsrCheckListDao.updateVerifyStatusItems(verifyItems);
		return verifyItems;
	}
}