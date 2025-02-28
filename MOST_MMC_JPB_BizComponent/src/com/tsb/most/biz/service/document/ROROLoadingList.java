package com.tsb.most.biz.service.document;

import java.io.File;
import java.io.FileInputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.apache.commons.collections.CollectionUtils;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.administrator.ICompanyRegisterDao;
import com.tsb.most.basebiz.dataitem.administrator.CompanyRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.biz.dao.document.IROROLoadingListDao;
import com.tsb.most.biz.dataitem.document.ROROLoadingListItem;
import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.biz.parm.document.SearchROROLoadingListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class ROROLoadingList extends MOSTBaseService implements IROROLoadingList {
	private static String FORMAT_ROTATION_HEADER = "Rotation #";
	private static String FORMTA_VESSEL_CALL_ID = "Vessel Call ID";
	
	private IROROLoadingListDao rOROLoadingListDao;
	private ICompanyRegisterDao companyRegisterDao;
	
	public void setrOROLoadingListDao(IROROLoadingListDao rOROLoadingListDao) {
		this.rOROLoadingListDao = rOROLoadingListDao;
	}

	public void setCompanyRegisterDao(ICompanyRegisterDao companyRegisterDao) {
		this.companyRegisterDao = companyRegisterDao;
	}

	public DataItemList selectGeneralCargoLoadinglist(SearchExcelFileUploadParm parm)throws BizException{
		String loadDataDir = AppContextPropertyLoader.properties.getProperty("file.excel.path");
		String fileName = String.format("%s%s", loadDataDir, parm.getFileName());
		DataItemList itemList = new DataItemList();
		
		List excelList = new ArrayList();
		
		FileInputStream fileIn = null;
		
		try {
			fileIn = new FileInputStream(fileName);
			XSSFWorkbook myWorkBook = new XSSFWorkbook(fileIn);
			
			Sheet exSheet = myWorkBook.getSheetAt(0);
			
			for (int i = 0; i < exSheet.getPhysicalNumberOfRows(); i++) {
				ROROLoadingListItem dataItem = new ROROLoadingListItem();
				XSSFRow tmpRow = (XSSFRow) exSheet.getRow(i);
				
				if(tmpRow != null) {
					if(tmpRow.getCell(3) == null || tmpRow.getCell(3).toString().length() == 0 
							|| tmpRow.getCell(2) == null || tmpRow.getCell(2).toString().length() == 0) {
						continue;					
					}
					
					if(tmpRow.getCell(0) != null && (tmpRow.getCell(0).toString().equalsIgnoreCase(FORMAT_ROTATION_HEADER) || tmpRow.getCell(0).toString().equalsIgnoreCase(FORMTA_VESSEL_CALL_ID))) {
						continue;
					}
					
					if(tmpRow.getCell(0) == null || tmpRow.getCell(0).toString().length() == 0) {
						dataItem.setVslCallId(CodeConstant.VESSEL_SCHEDULE_STRG);
					} else {
						dataItem.setVslCallId(getExcelSheetValue(tmpRow.getCell(0))); //Vessel Call Id
					}
					
					String opeClassCd = getExcelSheetValue(tmpRow.getCell(1)).equals("EXPORT")  ? CodeConstant.VSLSCH_CG_OP_TP_EXPORT : getExcelSheetValue(tmpRow.getCell(1)) ;		
					
					dataItem.setOpeClassCd(opeClassCd); //Import/Export
					dataItem.setMfDocId(getExcelSheetValue(tmpRow.getCell(2))); // Booking No
					dataItem.setShipgNoteNo(getExcelSheetValue(tmpRow.getCell(3))); // Shipping Note No
					dataItem.setChassisNo(getExcelSheetValue(tmpRow.getCell(4)));//Object VIN Number
					dataItem.setConsignee(getExcelSheetValue(tmpRow.getCell(5)));// Consignee
					dataItem.setShipper(getExcelSheetValue(tmpRow.getCell(6))); // Shipper
					dataItem.setTransporter(getExcelSheetValue(tmpRow.getCell(7))); // Transporter
//					dataItem.setCargoType(getExcelSheetValue(tmpRow.getCell(7))); // Type Of Cargo
					dataItem.setCargoType("RCV"); // Type Of Cargo
					dataItem.setCargoSubType(getExcelSheetValue(tmpRow.getCell(8))); // Commodity Group
					dataItem.setCargoSubTypeCd(getExcelSheetValue(tmpRow.getCell(9))); // Commodity Group Code
					dataItem.setCommodity(getExcelSheetValue(tmpRow.getCell(10))); // Commodity
					dataItem.setCommodityCd(getExcelSheetValue(tmpRow.getCell(11))); // Commodity Code
					dataItem.setPackageType(getExcelSheetValue(tmpRow.getCell(12))); // Package Type
					dataItem.setPackageTypeCd(getExcelSheetValue(tmpRow.getCell(13))); //Package Type Code
					dataItem.setVehicleBrand(getExcelSheetValue(tmpRow.getCell(14))); //Vehicle Brand
					dataItem.setVehicleModel(getExcelSheetValue(tmpRow.getCell(15))); //Vehicle Model
					dataItem.setNewUsed(getExcelSheetValue(tmpRow.getCell(19))); //New/Used
					if (getExcelSheetValue(tmpRow.getCell(21)) != null && !getExcelSheetValue(tmpRow.getCell(21)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(21)).trim().matches("^\\d*$")) {
						dataItem.setQuantity(getExcelSheetValue(tmpRow.getCell(21))); //Quantity
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					if (getExcelSheetValue(tmpRow.getCell(22)) != null && !getExcelSheetValue(tmpRow.getCell(22)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(22)).trim().matches("(^$)|(^[\\d]+$)|(^[\\d]+[.]{1}[\\d]+$)")) {
						dataItem.setDocWgt(getExcelSheetValue(tmpRow.getCell(22))); //MT
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					if (getExcelSheetValue(tmpRow.getCell(23)) != null && !getExcelSheetValue(tmpRow.getCell(23)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(23)).trim().matches("(^$)|(^[\\d]+$)|(^[\\d]+[.]{1}[\\d]+$)")) {
						dataItem.setTotalWeight( String.format("%.3f", Double.parseDouble(getExcelSheetValue(tmpRow.getCell(23))) /* * 0.001 (No need to exchange to tons anymore)*/) ); //Total Weight(MT)
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					if (getExcelSheetValue(tmpRow.getCell(24)) != null && !getExcelSheetValue(tmpRow.getCell(24)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(24)).trim().matches("(^$)|(^[\\d]+$)|(^[\\d]+[.]{1}[\\d]+$)")) {
						dataItem.setTotalVolumn( String.format("%.3f", Double.parseDouble(getExcelSheetValue(tmpRow.getCell(24)))) ); //Total Volumn(CBM)
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					dataItem.setLoadPort(getExcelSheetValue(tmpRow.getCell(25))); //Port of Loading
					dataItem.setDischargePort(getExcelSheetValue(tmpRow.getCell(26))); //Port of Discharging
					dataItem.setCargoDest(getExcelSheetValue(tmpRow.getCell(27))); //Final Destination
					dataItem.setCargoDesc(getExcelSheetValue(tmpRow.getCell(29))); //Cargo Description
					dataItem.setDeliveryMode(getExcelSheetValue(tmpRow.getCell(30)));// Delivery Mode
					dataItem.setDeliveryModeCd(getExcelSheetValue(tmpRow.getCell(31)));// Delivery Mode Cd
					
					if(getExcelSheetValue(tmpRow.getCell(32)) != null 
							&& !getExcelSheetValue(tmpRow.getCell(32)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(32)).trim().matches("^([0-9]*[.])?[0-9]+$")) {
						String arrvDate = "";
						
						LocalDateTime EXCEL_START = LocalDateTime.of(1899, 12, 30, 0, 0);
						Double doubleValue = Double.parseDouble(getExcelSheetValue(tmpRow.getCell(32)));

						long days = doubleValue.longValue();
						long seconds = Math.round((doubleValue - days) * 24 * 60 * 60);
						LocalDateTime converted = EXCEL_START
						            .plusDays(days)
						            .plusSeconds(seconds);
						
						if(getExcelSheetValue(tmpRow.getCell(32)).trim().matches("^\\d*$")) {
							DateTimeFormatter dtFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
							if(converted != null) {
								arrvDate = dtFormatter.format(converted);
							}
						}
			
						if (arrvDate.matches("^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|[1][1-2])\\/\\d{4} (0[0-9]|[12][1-3]):(0[0-9]|[12345][1-9])$")) {
							dataItem.setEstimateArrivalDate(tmpRow.getCell(32).getDateCellValue()); // Estimate Arrival Date
						}
					}
					
					dataItem.setEstimateArrivalDate(tmpRow.getCell(32).getDateCellValue());
					dataItem.setHatchNo(getExcelSheetValue(tmpRow.getCell(33)));
					dataItem.setModeofOp(getExcelSheetValue(tmpRow.getCell(34)));
					dataItem.setModeofOpCd(getExcelSheetValue(tmpRow.getCell(35)));
					
					excelList.add(dataItem);
				} else {
					return creatExceptionItems(500, "", Arrays.asList("NullPointerException"));
				}
			}
			itemList.setCollection(excelList);
			itemList.setTotalRowCount(excelList.size());
		} catch (Exception ex) {
			throw new BizException(ex);
		}finally {
			if (fileIn != null) {
				File file = new File(fileName);
				file.delete();
				
				try {
					fileIn.close();
				} catch (Exception ex) {
					throw new BizException(ex);
				}
			}
		}
	
		return itemList;
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm)throws BizException{
		List<ROROLoadingListItem> insertTotalItems = parm.getInsertItems().getCollection();
		List<ROROLoadingListItem> notExistVslSchItems = new ArrayList<ROROLoadingListItem>();
		SearchROROLoadingListParm searchParm = null;
		InsertItemsBizParm insertItems = null;
		InsertItemsBizParm insertItemsForSN = null;
		InsertItemsBizParm insertItemsForMF = null;
		DataItemList insertMFList = new DataItemList();
		DataItemList insertSNList = new DataItemList();
		DataItemList insertSNDtlList = new DataItemList();
		
		/***********************************************************************************************************************************************************
	     ***** valid 01 :: Check the Vessel Call Id (= Rotation) is existed.
	     ***********************************************************************************************************************************************************/
		
		HashMap<String, ROROLoadingListItem> distnctByVslCallIdList = (HashMap<String, ROROLoadingListItem>) insertTotalItems.stream().collect(Collectors.toMap(ROROLoadingListItem::getVslCallId, Function.identity(), (p, q) -> p)); 
		
		// valid 01
		// for loop => select schedule after rotation reduces.
		validExistedVesselSchedule(searchParm, distnctByVslCallIdList, notExistVslSchItems);
		
		if( !notExistVslSchItems.isEmpty() )  // valid 01 error - return records 
			return creatExceptionItems(412, "notExistVslCallId", notExistVslSchItems);
		
		/***********************************************************************************************************************************************************
	     ***** Before valid 02 / 03 / 04 :: duplicate records of BL_NO (= Cargo Id ) / Check the CNS/FWD is existed.
	     ***********************************************************************************************************************************************************/
		 // valid 02
		// duplicate records of BL_NO
		searchParm = new SearchROROLoadingListParm();
		DataItemList snItemList = rOROLoadingListDao.selectShippingNote(searchParm);
		List<ROROLoadingListItem> snItems = snItemList.getCollection();
		List<ROROLoadingListItem> duplicateSNItems =  new ArrayList<ROROLoadingListItem>();
		
		List<ROROLoadingListItem> brandModelErrorList = new ArrayList<ROROLoadingListItem>();
		
		try {
			Map<String, ConcurrentMap<String, ROROLoadingListItem>> snByVesselCallId = snItems.stream().collect(Collectors.groupingBy( ROROLoadingListItem::getVslCallId, Collectors.toConcurrentMap(ROROLoadingListItem::getShipgNoteNo, Function.identity()) ));
			
			Map<String, List<String>> notExistedPtnrItems = new HashMap<String, List<String>>();
			SearchCompanyRegisterParm partnerCodeSearchParm = new SearchCompanyRegisterParm();
			
			partnerCodeSearchParm.setPtnrType( CodeConstant.CM_PTNRTP_CNS );
			DataItemList CnsAndFwdItemList = companyRegisterDao.selectPartnerCode(partnerCodeSearchParm);
			
			partnerCodeSearchParm.setPtnrType( CodeConstant.CM_PTNRTP_FWD);
			DataItemList FWDItemList = companyRegisterDao.selectPartnerCode(partnerCodeSearchParm);
			
			CnsAndFwdItemList.getCollection().addAll(FWDItemList.getCollection());
					
			Map<String, ConcurrentMap<String, CompanyRegisterItem>> ptnrCdByPtnrType = (Map<String, ConcurrentMap<String, CompanyRegisterItem>>) CnsAndFwdItemList.getCollection().stream().collect(Collectors.groupingBy( CompanyRegisterItem::getPtnrType, Collectors.toConcurrentMap(CompanyRegisterItem::getPtnrCode, Function.identity()) ));
			
			// Commodity herio valid 04
			List<ROROLoadingListItem> badCommodityHeredityItems = new ArrayList<ROROLoadingListItem>();
			DataItemList commodityHeredityItems = rOROLoadingListDao.selectCommodityHeredity(searchParm);
			Map<String, Map<String, Map<String, ROROLoadingListItem>>> cmdtByHeredity = (Map<String, Map<String, Map<String, ROROLoadingListItem>>>) commodityHeredityItems.getCollection().stream().collect(Collectors.groupingBy( ROROLoadingListItem::getCargoTypeCd, Collectors.groupingBy( ROROLoadingListItem::getCargoSubTypeCd, Collectors.toConcurrentMap(ROROLoadingListItem::getCommodityCd, Function.identity()) ) )  );
			
			/***********************************************************************************************************************************************************
		     ***** Do valid :: 
		     ***********************************************************************************************************************************************************/
			
			//4. for loop /  if there's new element of Duplicated BL_No, then insert duplicate list.
			// insert BL, DTL and set the basic data [ getVslCd getCallYear getCallSeq getUserId ]
			for( ROROLoadingListItem insertItem : insertTotalItems ) {
				
				// the duplicateItem is existed , only collecting duplicate Items.
				validDuplicateSN(snByVesselCallId, duplicateSNItems, insertItem);
				
				if(!duplicateSNItems.isEmpty()) {
					continue;
				} else {
					ROROLoadingListItem targetItem = distnctByVslCallIdList.get(insertItem.getVslCallId());
					
					insertItem.setVslCd(targetItem.getVslCd());
					insertItem.setCallYear(targetItem.getCallYear());
					insertItem.setCallSeq(targetItem.getCallSeq());
					insertItem.setShippingAgent(targetItem.getShippingAgent());
					insertItem.setUserId(parm.getUserId());
					
					// insert BL DTL`
					String hatchItems = insertItem.getHatchNo();
					if ( !hatchItems.isEmpty() )  // if hatchNo existed => split.
						for( String eachHatch : hatchItems.trim().split( "," )) {
							ROROLoadingListItem insertDtlItem = (ROROLoadingListItem) insertItem.clone();
							insertDtlItem.setHatchNo( eachHatch.trim() );
							insertSNDtlList.add(insertDtlItem);
						}
				
					// insert SN
					insertSNList.add(insertItem);
					
					// Valid 03
	            	validCnsAndFwd( ptnrCdByPtnrType, notExistedPtnrItems, insertItem );
	            	
	            	// Valid 04
	            	validCommodityHeredity( cmdtByHeredity, badCommodityHeredityItems, insertItem );
	            	
	            	//Validate the model/brand of the vehicle
					validateBrandModel(insertItem, brandModelErrorList);
				}
			}
			
			/***********************************************************************************************************************************************************
		     ***** Check result of valid 02 :: duplicate records of SN_NO (= Cargo Id )
		     ***** Check result of valid 03 :: Check the CNS/FWD is existed. 
		     ***** Check result of valid 04 :: Check the Commodity heredity 
		     ***********************************************************************************************************************************************************/
			if( !duplicateSNItems.isEmpty() )  // valid 02 error - return duplicate records 
				return creatExceptionItems(412, "duplicateSN", duplicateSNItems);
			
			if( !notExistedPtnrItems.isEmpty() ) 
				return creatExceptionItems(412, "notExistedPartner", Arrays.asList(notExistedPtnrItems) );
			
			if( !badCommodityHeredityItems.isEmpty() ) 
				return creatExceptionItems(412, "badCommodityHeredity", badCommodityHeredityItems);
			
			if(!brandModelErrorList.isEmpty()) {
				return creatExceptionItems(412, "brandModelError", brandModelErrorList);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			return creatExceptionItems(412, "dataError", new ArrayList());
		}
		/***********************************************************************************************************************************************************
	     ***** Last Check :: Check the MF is existed.
	     ***********************************************************************************************************************************************************/
		// 1. SELECT TMT_MF for compare
		searchParm = new SearchROROLoadingListParm();
		DataItemList mfItemList = rOROLoadingListDao.selectManifest(searchParm);
		List<ROROLoadingListItem> mfItems = mfItemList.getCollection();
		Map<String, ConcurrentMap<String, ROROLoadingListItem>> blMfByVslCallIdandMf = mfItems.stream().collect(Collectors.groupingBy( ROROLoadingListItem::getVslCallId, Collectors.toConcurrentMap(ROROLoadingListItem::getMfDocId, Function.identity()) ));
		
		List<ROROLoadingListItem> distinctByVslAndMF = insertTotalItems.stream().filter( distinctByKey(item -> Arrays.asList(item.getVslCallId(), item.getMfDocId())) ).collect( Collectors.toList() );
		
		for( ROROLoadingListItem MFItem : distinctByVslAndMF ) {
			boolean isExistedMF = false;
			
			if(blMfByVslCallIdandMf.containsKey(MFItem.getVslCallId())
				&& blMfByVslCallIdandMf.get(MFItem.getVslCallId()).containsKey(MFItem.getMfDocId())
			) {
				isExistedMF = true;
			}
			
			if(!isExistedMF) {
				insertMFList.add(MFItem);
			}
		}
		
		//insert manifest
		
		List<ROROLoadingListItem> roroMFList = insertMFList.getCollection();
		
		List<ROROLoadingListItem> roroMFListAfterPurge = roroMFList.stream().filter( distinctByKey(item -> Arrays.asList(item.getMfDocId(), item.getVslCallId()))).collect(Collectors.toList());
		
		DataItemList insertMF = new DataItemList();
		insertMF.setCollection(roroMFListAfterPurge);
		
		insertItemsForMF = new InsertItemsBizParm();
		insertItemsForMF.setInsertItems(insertMF);
		
		rOROLoadingListDao.insertMFItem(insertItemsForMF);
		
		//insert shipping note
		List<ROROLoadingListItem> roroSNList = insertSNList.getCollection();
		
		Map<String, String> mappedValue = new HashMap();
		
		roroSNList.forEach(e ->{
			if(mappedValue.containsKey(e.getShipgNoteNo())) {

				Integer qty = Integer.valueOf(mappedValue.get(e.getShipgNoteNo()).split("/")[0]);
				Float totalW = Float.valueOf(mappedValue.get(e.getShipgNoteNo()).split("/")[1]);
				Float totalV = Float.valueOf(mappedValue.get(e.getShipgNoteNo()).split("/")[2]);
				
				qty += 1;
				totalW += Float.valueOf(e.getDocWgt());
				totalV += Float.valueOf(e.getTotalVolumn());
				
				mappedValue.put(e.getShipgNoteNo(), qty + "/" + totalW + "/" + totalV);
			} else {
				mappedValue.put(e.getShipgNoteNo(), "1" + "/" + e.getDocWgt() + "/" + e.getTotalVolumn());
			}
		});
		
		List<ROROLoadingListItem> roroSNListAfterPurge = roroSNList.stream().filter( distinctByKey(item -> Arrays.asList(item.getMfDocId(), item.getVslCallId(), item.getShipgNoteNo()))).collect(Collectors.toList());
		
		roroSNListAfterPurge.forEach(item -> {
			if(mappedValue.get(item.getShipgNoteNo()) != null) {
				item.setQuantity(mappedValue.get(item.getShipgNoteNo()).split("/")[0]);
				item.setTotalWeight(mappedValue.get(item.getShipgNoteNo()).split("/")[1]);
				item.setTotalVolumn(mappedValue.get(item.getShipgNoteNo()).split("/")[2]);
			}
		});
		
		DataItemList insertSN = new DataItemList();
		insertSN.setCollection(roroSNListAfterPurge);
		
	    insertItemsForSN = new InsertItemsBizParm();
	    insertItemsForSN.setInsertItems(insertSN);

		rOROLoadingListDao.insertShippingNoteItem(insertItemsForSN);
		
		//insert shipping note detail
		insertItems = new InsertItemsBizParm();
		insertItems.setInsertItems(insertSNDtlList);
		rOROLoadingListDao.insertShippingNoteDtlItem(insertItems);
		
		return insertItems.getInsertItems();
	}
	
	/*--------------------------------------- Validation Method ----------------------------------------------*/
	private void validExistedVesselSchedule(SearchROROLoadingListParm searchParm, HashMap<String, ROROLoadingListItem> distnctByVslCallIdList, List<ROROLoadingListItem> notExistVslSchItems) throws BizException {
		for( Entry<String, ROROLoadingListItem>entry :  distnctByVslCallIdList.entrySet() ) {
			ROROLoadingListItem element = entry.getValue();
			
			searchParm = new SearchROROLoadingListParm();
			searchParm.setVslCallId(element.getVslCallId()); //Rotation
			
			DataItemList vslItemList = rOROLoadingListDao.selectVesselSchedule(searchParm);
			
			if(vslItemList == null || vslItemList.getCollection().size() == 0 ) {
				notExistVslSchItems.add(element);
			} else {
				ROROLoadingListItem tempItem = (ROROLoadingListItem) vslItemList.getCollection().get(0);
				
				element.setVslCd(tempItem.getVslCd());
				element.setCallYear(tempItem.getCallYear());
				element.setCallSeq(tempItem.getCallSeq());
				element.setShippingAgent(tempItem.getShippingAgent());
			}
		}
	}
	
	private void validDuplicateSN(Map<String, ConcurrentMap<String, ROROLoadingListItem>> snByVesselCallId, List<ROROLoadingListItem> duplicateSNItems, ROROLoadingListItem insertItem ) {
		if( insertItem.getShipgNoteNo() != null 
				&& snByVesselCallId.containsKey(insertItem.getVslCallId())
				&& snByVesselCallId.get(insertItem.getVslCallId()).containsKey(insertItem.getShipgNoteNo()) 
			) {
				duplicateSNItems.add(insertItem);
			}
	}
	
	private void validCnsAndFwd(Map<String, ConcurrentMap<String, CompanyRegisterItem>> ptnrCdByPtnrType, Map<String, List<String>> notExistedPtnrItems, ROROLoadingListItem insertItem ) {
		if( !ptnrCdByPtnrType.get( CodeConstant.CM_PTNRTP_CNS ).containsKey(insertItem.getShipper()) ) {
    		if( !notExistedPtnrItems.containsKey( insertItem.getId() ) ) 
    			notExistedPtnrItems.put( insertItem.getId(), Arrays.asList( "shipper" ) );
    		else 
    			notExistedPtnrItems.get( insertItem.getId() ).add( "shipper" );
    	}
    	if( !ptnrCdByPtnrType.get( CodeConstant.CM_PTNRTP_CNS ).containsKey(insertItem.getConsignee()) ) {
    		if( !notExistedPtnrItems.containsKey( insertItem.getId() ) ) 
    			notExistedPtnrItems.put( insertItem.getId(), Arrays.asList( "consignee" ) );
    		else 
    			notExistedPtnrItems.get( insertItem.getId() ).add( "consignee" );
    	}
    	//Transporter instead of Cargo Agent.
		/*
		 * if( !ptnrCdByPtnrType.get( CodeConstant.CM_PTNRTP_CNS
		 * ).containsKey(insertItem.getCargoAgent()) ) { if(
		 * !notExistedPtnrItems.containsKey( insertItem.getId() ) )
		 * notExistedPtnrItems.put( insertItem.getId(), Arrays.asList( "cargoAgent" ) );
		 * else notExistedPtnrItems.get( insertItem.getId() ).add( "cargoAgent" ); }
		 */
	}
	
	private void validCommodityHeredity(Map<String, Map<String, Map<String, ROROLoadingListItem>>> cmdtByHeredity, List badCommodityHeredityItems, ROROLoadingListItem insertItem) {
		if(cmdtByHeredity.containsKey(insertItem.getCargoSubTypeCd())) {
    		if(cmdtByHeredity.get(insertItem.getCargoSubTypeCd()).containsKey(insertItem.getCommodityCd()) ) {
    			// all clear, then can pass away.
    		} else {
    			// if not existed cmdt cd > collect as erroritem
    			badCommodityHeredityItems.add(insertItem);
    		}
    	} else {
    		// if not existed cmdt grp cd > collect as erroritem
    		badCommodityHeredityItems.add(insertItem);
    	}
	}
	
	private void validateBrandModel(ROROLoadingListItem insertItem, List<ROROLoadingListItem> brandModelErrorList) throws BizException {
		try {
			List<String> brandList = rOROLoadingListDao.selectBrand(insertItem).getCollection();
			
			if(!CollectionUtils.isEmpty(brandList)) {
				if(brandList.get(0) != null && brandList.get(0) != "") {
					if(brandList.get(0).matches("^\\d*$") && Integer.valueOf(brandList.get(0)) > 0) {
						List<String> modelList = rOROLoadingListDao.selectModel(insertItem).getCollection();
						if(!CollectionUtils.isEmpty(modelList)) {
							if(modelList.get(0) != null && modelList.get(0) != "") {
								if(modelList.get(0).matches("^\\d*$") && Integer.valueOf(modelList.get(0)) > 0) {
									//Pass		
								} else {
									brandModelErrorList.add(insertItem);
								}
							} else {
								brandModelErrorList.add(insertItem);
							}
						} else {
							brandModelErrorList.add(insertItem);
						}
					} else {
						brandModelErrorList.add(insertItem);
					}
				} else {
					brandModelErrorList.add(insertItem);
				}
			} else {
				brandModelErrorList.add(insertItem);
			}
		} catch (Exception e) {
			throw new BizException(e);
		}
	}
	
	
	/*--------------------------------------- Utility Method ----------------------------------------------*/
	
	private DataItemList creatExceptionItems( int errorCode, String Code, List CollectionItems ) {
		DataItemList exceptionItems = new DataItemList();
		
		exceptionItems.setErrorFlag(errorCode);
		exceptionItems.setErrorDesc(Code);
		exceptionItems.setCollection(CollectionItems);
		
		return exceptionItems;
	}
	
	private String getExcelSheetValue(XSSFCell cellData) {
		String rtnValue = "";
		
		if(cellData == null) {
			return rtnValue;
		}
		switch(cellData.getCellType()) {
			case XSSFCell.CELL_TYPE_FORMULA:
				cellData.setCellType(XSSFCell.CELL_TYPE_STRING);
				rtnValue = cellData.getStringCellValue();
				break;
			case XSSFCell.CELL_TYPE_NUMERIC:
				Double cellValue = cellData.getNumericCellValue();
				if( cellValue == cellValue.intValue() ) {
					// Integer
					rtnValue = Integer.toString( cellValue.intValue() );
				} else {
					// Double					
					rtnValue = Double.toString( cellValue );
				}
				break;
			case XSSFCell.CELL_TYPE_STRING:
				rtnValue = cellData.getStringCellValue();
				break;
			case XSSFCell.CELL_TYPE_BLANK:
				rtnValue = "";
				break;
			case XSSFCell.CELL_TYPE_ERROR:
				rtnValue = cellData.getCellFormula();
				break;
		}
		
		return rtnValue;
	}
	
	private static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
	    Map<Object, Boolean> map = new ConcurrentHashMap<>();
	    
	    return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
	}
}
