package com.tsb.most.biz.service.document;

import java.io.File;
import java.io.FileInputStream;
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
import com.tsb.most.biz.dao.document.IRORODischargingListDao;
import com.tsb.most.biz.dataitem.document.RORODischargingListItem;
import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.biz.parm.document.SearchRORODischargingListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class RORODischargingList extends MOSTBaseService implements IRORODischargingList {
	private static String FORMAT_ROTATION_HEADER = "Rotation #";
	private static String FORMTA_VESSEL_CALL_ID = "Vessel Call ID";
	
	private IRORODischargingListDao rORODischargingListDao;
	private ICompanyRegisterDao companyRegisterDao;
	
	public void setrORODischargingListDao(IRORODischargingListDao rORODischargingListDao) {
		this.rORODischargingListDao = rORODischargingListDao;
	}

	public void setCompanyRegisterDao(ICompanyRegisterDao companyRegisterDao) {
		this.companyRegisterDao = companyRegisterDao;
	}

	public DataItemList selectRORODischarginglist(SearchExcelFileUploadParm parm) throws BizException {
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
				RORODischargingListItem dataItem = new RORODischargingListItem();
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
					}else {
						dataItem.setVslCallId(getExcelSheetValue(tmpRow.getCell(0))); //Vessel Call ID
					}
					
					String opeClassCd = getExcelSheetValue(tmpRow.getCell(1)).equals("IMPORT")  ? CodeConstant.VSLSCH_CG_OP_TP_IMPORT : getExcelSheetValue(tmpRow.getCell(1)) ;
					
					dataItem.setOpeClassCd(opeClassCd); //Import/Export
					dataItem.setMfDocId(getExcelSheetValue(tmpRow.getCell(2))); // Master Bill of Lading
					dataItem.setBlNo(getExcelSheetValue(tmpRow.getCell(3))); // Bill of Lading
					dataItem.setChassisNo(getExcelSheetValue(tmpRow.getCell(4)));//Object VIN Number
					dataItem.setConsignee(getExcelSheetValue(tmpRow.getCell(5)));// Consignee
					dataItem.setShipper(getExcelSheetValue(tmpRow.getCell(6))); // Shipper
					dataItem.setCargoAgent(getExcelSheetValue(tmpRow.getCell(7))); // Shipping Agent
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
					dataItem.setHatchNo(getExcelSheetValue(tmpRow.getCell(32)));
					dataItem.setModeofOp(getExcelSheetValue(tmpRow.getCell(33)));
					dataItem.setModeofOpCd(getExcelSheetValue(tmpRow.getCell(34)));
					
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
	
	public DataItemList selectBLList(SearchRORODischargingListParm parm) throws BizException {
		return rORODischargingListDao.selectBLList(parm);
	}
	
	public DataItemList selectMFList(SearchRORODischargingListParm parm) throws BizException {
		return rORODischargingListDao.selectMFList(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		List<RORODischargingListItem> insertTotalItems = parm.getInsertItems().getCollection();
		List<RORODischargingListItem> notExistVslSchItems = new ArrayList<RORODischargingListItem>();
		SearchRORODischargingListParm searchParm = null;
		InsertItemsBizParm insertItems = null;
		InsertItemsBizParm insertItemsForBL = null;
		InsertItemsBizParm insertItemsForMF = null;
		DataItemList insertMFList = new DataItemList();
	    DataItemList insertBLList = new DataItemList();
	    DataItemList insertBLDtlList = new DataItemList();
	    
	    /***********************************************************************************************************************************************************
	     ***** valid 01 :: Check the Vessel Call Id (= Rotation) is existed.
	     ***********************************************************************************************************************************************************/
		
	    // if use collection
 		HashMap<String, RORODischargingListItem> distnctByVslCallIdList =  (HashMap<String, RORODischargingListItem>) insertTotalItems.stream().collect(Collectors.toMap(RORODischargingListItem::getVslCallId, Function.identity(), (p, q) -> p));

		validExistedVesselSchedule(searchParm, distnctByVslCallIdList, notExistVslSchItems);
		
		if( !notExistVslSchItems.isEmpty() )  // valid 01 error - return records 
			return creatExceptionItems(412, "notExistVslCallId", notExistVslSchItems);	// throw new BizException("412",  "notExistVslCallId",  notExistVslSchItems.toArray()  );
		
		/***********************************************************************************************************************************************************
	     ***** Before valid 02 / 03 / 04 :: duplicate records of BL_NO (= Cargo Id ) / Check the CNS/FWD is existed.
	     ***********************************************************************************************************************************************************/
		
		// 3. SELECT TMT_BL for compare
		searchParm = new SearchRORODischargingListParm();
		DataItemList blItemList = rORODischargingListDao.selectBLList(searchParm);
		List<RORODischargingListItem> blItems = blItemList.getCollection();
		List<RORODischargingListItem> duplicateBLItems = new ArrayList<RORODischargingListItem>();
		
		List<RORODischargingListItem> brandModelErrorList = new ArrayList<RORODischargingListItem>();
		
		try {
			Map<String, ConcurrentMap<String, RORODischargingListItem>> blByVesselCallId = blItems.stream().collect(Collectors.groupingBy( RORODischargingListItem::getVslCallId, Collectors.toConcurrentMap(RORODischargingListItem::getBlNo, Function.identity()) ));
		
			Map<String, List<String>> notExistedPtnrItems = new HashMap<String, List<String>>();
			SearchCompanyRegisterParm partnerCodeSearchParm = new SearchCompanyRegisterParm();

			partnerCodeSearchParm.setPtnrType( CodeConstant.CM_PTNRTP_CNS );
			DataItemList CnsAndFwdItemList = companyRegisterDao.selectPartnerCode(partnerCodeSearchParm);
			
			partnerCodeSearchParm.setPtnrType( CodeConstant.CM_PTNRTP_FWD );
			DataItemList FWDItemList = companyRegisterDao.selectPartnerCode(partnerCodeSearchParm);
			
			CnsAndFwdItemList.getCollection().addAll(FWDItemList.getCollection());
					
			Map<String, ConcurrentMap<String, CompanyRegisterItem>> ptnrCdByPtnrType = (Map<String, ConcurrentMap<String, CompanyRegisterItem>>) CnsAndFwdItemList.getCollection().stream().collect(Collectors.groupingBy( CompanyRegisterItem::getPtnrType, Collectors.toConcurrentMap(CompanyRegisterItem::getPtnrCode, Function.identity()) ));
			
			// Commodity herio valid 04
			List<RORODischargingListItem> badCommodityHeredityItems = new ArrayList<RORODischargingListItem>();
			DataItemList commodityHeredityItems = rORODischargingListDao.selectCommodityHeredity(searchParm);
			Map<String, Map<String, Map<String, RORODischargingListItem>>> cmdtByHeredity = (Map<String, Map<String, Map<String, RORODischargingListItem>>>) commodityHeredityItems.getCollection().stream().collect(Collectors.groupingBy( RORODischargingListItem::getCargoTypeCd, Collectors.groupingBy( RORODischargingListItem::getCargoSubTypeCd, Collectors.toConcurrentMap(RORODischargingListItem::getCommodityCd, Function.identity()) ) )  );
			
			/***********************************************************************************************************************************************************
		     ***** Do valid :: 
		     ***********************************************************************************************************************************************************/
			
			// 4. for loop /  if there's new element of Duplicated BL_No, then insert duplicate list.
			// insert BL, DTL and set the basic data [ getVslCd getCallYear getCallSeq getUserId ]
			for( RORODischargingListItem insertItem  : insertTotalItems ) {
				// the duplicateItem is existed , only collecting duplicate Items.
				validDuplicateBL(blByVesselCallId, duplicateBLItems, insertItem);
				
				if(!duplicateBLItems.isEmpty()) {
					continue;
				} else {
					
					RORODischargingListItem targetItem = distnctByVslCallIdList.get(insertItem.getVslCallId());
					
					insertItem.setVslCd(targetItem.getVslCd());
					insertItem.setCallYear(targetItem.getCallYear());
					insertItem.setCallSeq(targetItem.getCallSeq());
					insertItem.setShippingAgent(targetItem.getShippingAgent());
					insertItem.setUserId(parm.getUserId());
					
					// insert BL DTL`
					String hatchItems = insertItem.getHatchNo();
					if (!hatchItems.isEmpty()) {  // if hatchNo existed => split.
						for( String eachHatch : hatchItems.trim().split( "," )) {
							RORODischargingListItem insertDtlItem = (RORODischargingListItem) insertItem.clone();
							insertDtlItem.setHatchNo( eachHatch.trim() );
							insertBLDtlList.add(insertDtlItem);
						}
					}
	            	
	            	insertBLList.add(insertItem);
	            	
	            	// Valid 03
	            	validCnsAndFwd( ptnrCdByPtnrType, notExistedPtnrItems, insertItem );
	            	
	            	// Valid 04
	            	validCommodityHeredity( cmdtByHeredity, badCommodityHeredityItems, insertItem );
	            	
	            	//Validate the model/brand of the vehicle
					validateBrandModel(insertItem, brandModelErrorList);
				}
			}
			
			/***********************************************************************************************************************************************************
			 ***** Check result of valid 02 :: duplicate records of BL_NO (= Cargo Id )
			 ***** Check result of valid 03 :: Check the CNS/FWD is existed. 
			 ***** Check result of valid 04 :: Check the Commodity heredity 
			 ***********************************************************************************************************************************************************/
			
			if( !duplicateBLItems.isEmpty() )  // valid 02 error - return duplicate records 
				return creatExceptionItems(412, "duplicateBL", duplicateBLItems);	// throw new BizException("412",  "duplicateBlNo",  duplicateBLItems.toArray()  );
			
			if( !notExistedPtnrItems.isEmpty() ) 
				return creatExceptionItems(412, "notExistedPartner", Arrays.asList(notExistedPtnrItems) );
			
			if( !badCommodityHeredityItems.isEmpty() ) 
				return creatExceptionItems(412, "badCommodityHeredity", badCommodityHeredityItems);
			
			if(!brandModelErrorList.isEmpty()) {
				return creatExceptionItems(412, "brandModelError", brandModelErrorList);
			}
		} catch (Exception e) {
			return creatExceptionItems(412, "dataError", new ArrayList());
		}
		/***********************************************************************************************************************************************************
	     ***** Last Check :: Check the MF is existed.
	     ***********************************************************************************************************************************************************/
		
		// 1. SELECT TMT_MF for compare
		searchParm = new SearchRORODischargingListParm();
		DataItemList mfItemList = rORODischargingListDao.selectMFList(searchParm);
		List<RORODischargingListItem> mfItems = mfItemList.getCollection();
		Map<String, ConcurrentMap<String, RORODischargingListItem>> blMfByVslCallIdandMf = mfItems.stream().collect(Collectors.groupingBy( RORODischargingListItem::getVslCallId, Collectors.toConcurrentMap(RORODischargingListItem::getMfDocId, Function.identity()) ));
		List<RORODischargingListItem> distinctByVslAndMF = insertTotalItems.stream().filter( distinctByKey(item -> Arrays.asList(item.getVslCallId(), item.getMfDocId())) ).collect( Collectors.toList() );
		
		// 2. for loop &  if there's new element of TMT_MF , then insert list 
		for( RORODischargingListItem MFItem  :  distinctByVslAndMF ) {
			boolean isExistedMF = false;
			
			if(blMfByVslCallIdandMf.containsKey(MFItem.getVslCallId()) && blMfByVslCallIdandMf.get(MFItem.getVslCallId()).containsKey(MFItem.getMfDocId())) {
				isExistedMF = true;
			}
			
			if(!isExistedMF) {
				insertMFList.add(MFItem);
			}
		}
		
	    //insert manifest
		List<RORODischargingListItem> roroMFList = insertMFList.getCollection();
		
		List<RORODischargingListItem> roroMFListAfterPurge = roroMFList.stream().filter( distinctByKey(item -> Arrays.asList(item.getMfDocId(), item.getVslCallId()))).collect(Collectors.toList());
		
		DataItemList insertMF = new DataItemList();
		insertMF.setCollection(roroMFListAfterPurge);
		insertItemsForMF = new InsertItemsBizParm();
	    insertItemsForMF.setInsertItems(insertMF);
	    rORODischargingListDao.insertMFItem(insertItemsForMF);
	    
	    //insert BL
		List<RORODischargingListItem> roroBLList = insertBLList.getCollection();
		
		
		Map<String, String> mappedValue = new HashMap();
		
		roroBLList.forEach(e ->{
			if(mappedValue.containsKey(e.getBlNo())) {

				Integer qty = Integer.valueOf(mappedValue.get(e.getBlNo()).split("/")[0]);
				Float totalW = Float.valueOf(mappedValue.get(e.getBlNo()).split("/")[1]);
				Float totalV = Float.valueOf(mappedValue.get(e.getBlNo()).split("/")[2]);
				
				qty += 1;
				totalW += Float.valueOf(e.getDocWgt());
				totalV += Float.valueOf(e.getTotalVolumn());
				
				mappedValue.put(e.getBlNo(), qty + "/" + totalW + "/" + totalV);
			} else {
				mappedValue.put(e.getBlNo(), "1" + "/" + e.getDocWgt() + "/" + e.getTotalVolumn());
			}
		});
		
		List<RORODischargingListItem> roroBLListAfterPurge = roroBLList.stream().filter( distinctByKey(item -> Arrays.asList(item.getMfDocId(), item.getBlNo(), item.getVslCallId()))).collect(Collectors.toList());
		
		roroBLListAfterPurge.forEach(item -> {
			if(mappedValue.get(item.getBlNo()) != null) {
				item.setQuantity(mappedValue.get(item.getBlNo()).split("/")[0]);
				item.setTotalWeight(mappedValue.get(item.getBlNo()).split("/")[1]);
				item.setTotalVolumn(mappedValue.get(item.getBlNo()).split("/")[2]);
			}
		});
		
		DataItemList insertBL = new DataItemList();
		insertBL.setCollection(roroBLListAfterPurge);
	    insertItemsForBL = new InsertItemsBizParm();
	    insertItemsForBL.setInsertItems(insertBL);
	    rORODischargingListDao.insertBLItem(insertItemsForBL);
	    
	    //insert BL detail
	    insertItems = new InsertItemsBizParm();
	    insertItems.setInsertItems(insertBLDtlList);
	    rORODischargingListDao.insertBLDtlItem(insertItems);
	    
	    return insertItems.getInsertItems();
	}
	
	/*--------------------------------------- Validation Method ----------------------------------------------*/
	
	private void validExistedVesselSchedule(SearchRORODischargingListParm searchParm, HashMap<String, RORODischargingListItem> distnctByVslCallIdList, List<RORODischargingListItem> notExistVslSchItems) throws BizException {
		// for loop => select schedule after rotation reduces.
		for( Entry<String, RORODischargingListItem> entry :  distnctByVslCallIdList.entrySet() ) {
			RORODischargingListItem element = entry.getValue();
			
			searchParm = new SearchRORODischargingListParm();
			
			searchParm.setVslCallId(element.getVslCallId()); //Rotation
			
			DataItemList vslItemList = rORODischargingListDao.selectVesselSchedule(searchParm);
			
			if(vslItemList == null || vslItemList.getCollection().size() == 0 ) {
				notExistVslSchItems.add(element);
			} else {
				RORODischargingListItem tempItem = (RORODischargingListItem) vslItemList.getCollection().get(0);
				
				element.setVslCd(tempItem.getVslCd());
				element.setCallYear(tempItem.getCallYear());
				element.setCallSeq(tempItem.getCallSeq());
				element.setShippingAgent(tempItem.getShippingAgent());
			}
		}
	}
	
	private void validDuplicateBL(Map<String, ConcurrentMap<String, RORODischargingListItem>> blByVesselCallId, List<RORODischargingListItem> duplicateBLItems, RORODischargingListItem insertItem ) {
		if( insertItem.getBlNo() != null 
				&& blByVesselCallId.containsKey(insertItem.getVslCallId())
				&& blByVesselCallId.get(insertItem.getVslCallId()).containsKey(insertItem.getBlNo()) 
			) {
				duplicateBLItems.add(insertItem);
			}
	}
	
	private void validateBrandModel(RORODischargingListItem insertItem, List<RORODischargingListItem> brandModelErrorList) throws BizException {
		
		try {
			List<String> brandList = rORODischargingListDao.selectBrand(insertItem).getCollection();
			
			if(!CollectionUtils.isEmpty(brandList)) {
				if(brandList.get(0) != null && brandList.get(0) != "") {
					if(brandList.get(0).matches("^\\d*$") && Integer.valueOf(brandList.get(0)) > 0) {
						List<String> modelList = rORODischargingListDao.selectModel(insertItem).getCollection();
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
	
	private void validCnsAndFwd(Map<String, ConcurrentMap<String, CompanyRegisterItem>> ptnrCdByPtnrType, Map<String, List<String>> notExistedPtnrItems, RORODischargingListItem insertItem ) {
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
    	
		if( !ptnrCdByPtnrType.get( CodeConstant.CM_PTNRTP_FWD ).containsKey(insertItem.getCargoAgent()) 
				&& !ptnrCdByPtnrType.get( CodeConstant.CM_PTNRTP_CNS ).containsKey(insertItem.getCargoAgent())) {
			if( !notExistedPtnrItems.containsKey( insertItem.getId() ) ) 
				notExistedPtnrItems.put( insertItem.getId(), Arrays.asList( "cargoAgent" ) );
    		else 
    			notExistedPtnrItems.get( insertItem.getId() ).add( "cargoAgent" );
		}
	}
	
	private void validCommodityHeredity(Map<String, Map<String, Map<String, RORODischargingListItem>>> cmdtByHeredity, List badCommodityHeredityItems, RORODischargingListItem insertItem) {
		if(cmdtByHeredity.containsKey(insertItem.getCargoSubTypeCd())) {	
			// all clear, then can pass away.
		} else {
    		// if not existed cmdt grp cd > collect as erroritem
    		badCommodityHeredityItems.add(insertItem);
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
