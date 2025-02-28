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

import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.tsb.most.basebiz.common.constant.CodeConstant;
import com.tsb.most.basebiz.dao.administrator.ICompanyRegisterDao;
import com.tsb.most.basebiz.dataitem.administrator.CompanyRegisterItem;
import com.tsb.most.basebiz.parm.administrator.SearchCompanyRegisterParm;
import com.tsb.most.biz.dao.document.IGeneralCargoDischargingListDao;
import com.tsb.most.biz.dataitem.document.GeneralCargoDischargingListItem;
import com.tsb.most.biz.parm.document.SearchExcelFileUploadParm;
import com.tsb.most.biz.parm.document.SearchGeneralCargoDischargingListParm;
import com.tsb.most.framework.baseservice.MOSTBaseService;
import com.tsb.most.framework.bizparm.base.InsertItemsBizParm;
import com.tsb.most.framework.config.AppContextPropertyLoader;
import com.tsb.most.framework.dataitem.DataItemList;
import com.tsb.most.framework.exception.BizException;

public class GeneralCargoDischargingList extends MOSTBaseService implements IGeneralCargoDischargingList {
	private static String FORMAT_ROTATION_HEADER = "Rotation #";
	private static String FORMTA_VESSEL_CALL_ID = "Vessel Call ID";
	
	private IGeneralCargoDischargingListDao generalCargoDischargingListDao;
	private ICompanyRegisterDao companyRegisterDao;
	
	public void setGeneralCargoDischargingListDao(IGeneralCargoDischargingListDao generalCargoDischargingListDao) {
		this.generalCargoDischargingListDao = generalCargoDischargingListDao;
	}
	
	public void setCompanyRegisterDao(ICompanyRegisterDao companyRegisterDao) {
		this.companyRegisterDao = companyRegisterDao;
	}

	public DataItemList selectGeneralCargoDischarginglist(SearchExcelFileUploadParm parm) throws BizException {
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
				GeneralCargoDischargingListItem dataItem = new GeneralCargoDischargingListItem();
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
					dataItem.setConsignee(getExcelSheetValue(tmpRow.getCell(4)));// Consignee
					dataItem.setShipper(getExcelSheetValue(tmpRow.getCell(5))); // Shipper
					dataItem.setCargoAgent(getExcelSheetValue(tmpRow.getCell(6))); // Shipping Agent
					dataItem.setCargoType(getExcelSheetValue(tmpRow.getCell(7))); // Type Of Cargo
					dataItem.setCargoTypeCd(getExcelSheetValue(tmpRow.getCell(8))); // Type Of Cargo Cd
					dataItem.setCargoSubType(getExcelSheetValue(tmpRow.getCell(9))); // Commodity Group
					dataItem.setCargoSubTypeCd(getExcelSheetValue(tmpRow.getCell(10))); // Cargo Subtype Cd
					dataItem.setCommodity(getExcelSheetValue(tmpRow.getCell(11))); // Commodity
					dataItem.setCommodityCd(getExcelSheetValue(tmpRow.getCell(12))); // Commodity
					dataItem.setPackageType(getExcelSheetValue(tmpRow.getCell(13)));// Package Type
					dataItem.setPackageTypeCd(getExcelSheetValue(tmpRow.getCell(14))); // Package Type Cd
					dataItem.setMark(getExcelSheetValue(tmpRow.getCell(15))); // Mark and Numbers
					dataItem.setPackageNumber(getExcelSheetValue(tmpRow.getCell(16))); // Package number
					if (getExcelSheetValue(tmpRow.getCell(17)) != null && !getExcelSheetValue(tmpRow.getCell(17)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(17)).trim().matches("^\\d*$")) {
						dataItem.setQuantity(getExcelSheetValue(tmpRow.getCell(17))); //Quantity
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					dataItem.setLength(getExcelSheetValue(tmpRow.getCell(18))); //Length(Cm)
					dataItem.setWidth(getExcelSheetValue(tmpRow.getCell(19))); //Width(Cm)
					dataItem.setHeight(getExcelSheetValue(tmpRow.getCell(20))); //Height(Cm)
					if (getExcelSheetValue(tmpRow.getCell(21)) != null && !getExcelSheetValue(tmpRow.getCell(21)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(21)).trim().matches("(^$)|(^[\\d]+$)|(^[\\d]+[.]{1}[\\d]+$)")) {
						dataItem.setEachWeight( String.format("%.3f", Double.parseDouble(getExcelSheetValue(tmpRow.getCell(21))))); //Each Weight (KG)
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					if (getExcelSheetValue(tmpRow.getCell(22)) != null && !getExcelSheetValue(tmpRow.getCell(22)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(22)).trim().matches("(^$)|(^[\\d]+$)|(^[\\d]+[.]{1}[\\d]+$)")) {
						dataItem.setEachVolumn( String.format("%.3f", Double.parseDouble(getExcelSheetValue(tmpRow.getCell(22))))); //Each Volume(m3)	
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					if (getExcelSheetValue(tmpRow.getCell(23)) != null && !getExcelSheetValue(tmpRow.getCell(23)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(23)).trim().matches("(^$)|(^[\\d]+$)|(^[\\d]+[.]{1}[\\d]+$)")) {
						dataItem.setTotalWeight( String.format("%.3f", Double.parseDouble(getExcelSheetValue(tmpRow.getCell(23))) /* * 0.001 (No need to exchange to tons anymore)*/) ); //Total Weight(KG)
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					if (getExcelSheetValue(tmpRow.getCell(24)) != null && !getExcelSheetValue(tmpRow.getCell(24)).trim().isEmpty()
							&& getExcelSheetValue(tmpRow.getCell(24)).trim().matches("(^$)|(^[\\d]+$)|(^[\\d]+[.]{1}[\\d]+$)")) {
						dataItem.setTotalVolumn( String.format("%.3f", Double.parseDouble(getExcelSheetValue(tmpRow.getCell(24)))) ); //Total Volume(m3)
					} else {
						return creatExceptionItems(500, "", Arrays.asList("NumberFormatException"));
					}
					
					dataItem.setLoadPort(getExcelSheetValue(tmpRow.getCell(25))); //Port of Loading
					dataItem.setDischargePort(getExcelSheetValue(tmpRow.getCell(26))); //Port of Discharging
					dataItem.setCargoDest(getExcelSheetValue(tmpRow.getCell(27))); //Final Destination
					dataItem.setDgNo(getExcelSheetValue(tmpRow.getCell(28)));  //Hazards / IMO class
					dataItem.setCargoDesc(getExcelSheetValue(tmpRow.getCell(29))); //Cargo Description
					dataItem.setParentId(getExcelSheetValue(tmpRow.getCell(30)));	//Parent ID
					dataItem.setParentCargoType(getExcelSheetValue(tmpRow.getCell(31)));	//Parent cargo type
					dataItem.setDeliveryMode(getExcelSheetValue(tmpRow.getCell(32)));// Delivery Mode
					dataItem.setDeliveryModeCd(getExcelSheetValue(tmpRow.getCell(33)));// Delivery Mode
					dataItem.setHatchNo(getExcelSheetValue(tmpRow.getCell(34))); // Hatch No
					dataItem.setModeofOp(getExcelSheetValue(tmpRow.getCell(35)));
					dataItem.setModeofOpCd(getExcelSheetValue(tmpRow.getCell(36)));
					
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
	
	public DataItemList selectBLList(SearchGeneralCargoDischargingListParm parm) throws BizException {
		return generalCargoDischargingListDao.selectBLList(parm);
	}
	
	public DataItemList selectMFList(SearchGeneralCargoDischargingListParm parm) throws BizException {
		return generalCargoDischargingListDao.selectMFList(parm);
	}
	
	public DataItemList insertItems(InsertItemsBizParm parm) throws BizException {
		List<GeneralCargoDischargingListItem> insertTotalItems = parm.getInsertItems().getCollection();
		List<GeneralCargoDischargingListItem> notExistVslSchItems = new ArrayList<GeneralCargoDischargingListItem>();
		SearchGeneralCargoDischargingListParm searchParm = null;
		InsertItemsBizParm insertItems = null;
		DataItemList insertMFList = new DataItemList();
	    DataItemList insertBLList = new DataItemList();
	    DataItemList insertBLDtlList = new DataItemList();
	    
	    /***********************************************************************************************************************************************************
	     ***** valid 01 :: Check the Vessel Call Id (= Rotation) is existed.
	     ***********************************************************************************************************************************************************/
		
	    // if use collection
 		HashMap<String, GeneralCargoDischargingListItem> distnctByVslCallIdList =  (HashMap<String, GeneralCargoDischargingListItem>) insertTotalItems.stream().collect(Collectors.toMap(GeneralCargoDischargingListItem::getVslCallId, Function.identity(), (p, q) -> p));

		validExistedVesselSchedule(searchParm, distnctByVslCallIdList, notExistVslSchItems);
		
		if( !notExistVslSchItems.isEmpty() )  // valid 01 error - return records 
			return creatExceptionItems(412, "notExistVslCallId", notExistVslSchItems);	// throw new BizException("412",  "notExistVslCallId",  notExistVslSchItems.toArray()  );
		
		/***********************************************************************************************************************************************************
	     ***** Before valid 02 / 03 / 04 :: duplicate records of BL_NO (= Cargo Id ) / Check the CNS/FWD is existed.
	     ***********************************************************************************************************************************************************/
		
		// 3. SELECT TMT_BL for compare
		searchParm = new SearchGeneralCargoDischargingListParm();
		DataItemList blItemList = generalCargoDischargingListDao.selectBLList(searchParm);
		List<GeneralCargoDischargingListItem> blItems = blItemList.getCollection();
		List<GeneralCargoDischargingListItem> duplicateBLItems = new ArrayList<GeneralCargoDischargingListItem>();
		
		try {
			Map<String, ConcurrentMap<String, GeneralCargoDischargingListItem>> blByVesselCallId = blItems.stream().collect(Collectors.groupingBy( GeneralCargoDischargingListItem::getVslCallId, Collectors.toConcurrentMap(GeneralCargoDischargingListItem::getBlNo, Function.identity()) ));
		
			Map<String, List<String>> notExistedPtnrItems = new HashMap<String, List<String>>();
			SearchCompanyRegisterParm partnerCodeSearchParm = new SearchCompanyRegisterParm();

			partnerCodeSearchParm.setPtnrType( CodeConstant.CM_PTNRTP_CNS );
			DataItemList CnsAndFwdItemList = companyRegisterDao.selectPartnerCode(partnerCodeSearchParm);
			
			partnerCodeSearchParm.setPtnrType( CodeConstant.CM_PTNRTP_FWD );
			DataItemList FWDItemList = companyRegisterDao.selectPartnerCode(partnerCodeSearchParm);
			
			CnsAndFwdItemList.getCollection().addAll(FWDItemList.getCollection());
					
			Map<String, ConcurrentMap<String, CompanyRegisterItem>> ptnrCdByPtnrType = (Map<String, ConcurrentMap<String, CompanyRegisterItem>>) CnsAndFwdItemList.getCollection().stream().collect(Collectors.groupingBy( CompanyRegisterItem::getPtnrType, Collectors.toConcurrentMap(CompanyRegisterItem::getPtnrCode, Function.identity()) ));
			
			// Commodity herio valid 04
			List<GeneralCargoDischargingListItem> badCommodityHeredityItems = new ArrayList<GeneralCargoDischargingListItem>();
			DataItemList commodityHeredityItems = generalCargoDischargingListDao.selectCommodityHeredity(searchParm);
			Map<String, Map<String, Map<String, GeneralCargoDischargingListItem>>> cmdtByHeredity = (Map<String, Map<String, Map<String, GeneralCargoDischargingListItem>>>) commodityHeredityItems.getCollection().stream().collect(Collectors.groupingBy( GeneralCargoDischargingListItem::getCargoTypeCd, Collectors.groupingBy( GeneralCargoDischargingListItem::getCargoSubTypeCd, Collectors.toConcurrentMap(GeneralCargoDischargingListItem::getCommodityCd, Function.identity()) ) )  );
			
			/***********************************************************************************************************************************************************
		     ***** Do valid :: 
		     ***********************************************************************************************************************************************************/
			
			// 4. for loop /  if there's new element of Duplicated BL_No, then insert duplicate list.
			// insert BL, DTL and set the basic data [ getVslCd getCallYear getCallSeq getUserId ]
			for( GeneralCargoDischargingListItem insertItem  : insertTotalItems ) {
				// the duplicateItem is existed , only collecting duplicate Items.
				validDuplicateBL(blByVesselCallId, duplicateBLItems, insertItem);
				
				if(!duplicateBLItems.isEmpty()) {
					continue;
				} else {
					GeneralCargoDischargingListItem targetItem = distnctByVslCallIdList.get(insertItem.getVslCallId());
					
					insertItem.setVslCd(targetItem.getVslCd());
					insertItem.setCallYear(targetItem.getCallYear());
					insertItem.setCallSeq(targetItem.getCallSeq());
					insertItem.setShippingAgent(targetItem.getShippingAgent());
					insertItem.setUserId(parm.getUserId());
					
					// insert BL DTL`
					String hatchItems = insertItem.getHatchNo();
					if (!hatchItems.isEmpty()) {  // if hatchNo existed => split.
						for( String eachHatch : hatchItems.trim().split( "," )) {
							GeneralCargoDischargingListItem insertDtlItem = (GeneralCargoDischargingListItem) insertItem.clone();
							insertDtlItem.setHatchNo( eachHatch.trim() );
							insertBLDtlList.add(insertDtlItem);
						}
					}
	            	
	            	insertBLList.add(insertItem);
	            	
	            	// Valid 03
	            	validCnsAndFwd( ptnrCdByPtnrType, notExistedPtnrItems, insertItem );
	            	
	            	// Valid 04
	            	validCommodityHeredity( cmdtByHeredity, badCommodityHeredityItems, insertItem );
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
		} catch (Exception e) {
			return creatExceptionItems(412, "dataError", new ArrayList());
		}
		/***********************************************************************************************************************************************************
	     ***** Last Check :: Check the MF is existed.
	     ***********************************************************************************************************************************************************/
		
		// 1. SELECT TMT_MF for compare
		searchParm = new SearchGeneralCargoDischargingListParm();
		DataItemList mfItemList = generalCargoDischargingListDao.selectMFList(searchParm);
		List<GeneralCargoDischargingListItem> mfItems = mfItemList.getCollection();
		Map<String, ConcurrentMap<String, GeneralCargoDischargingListItem>> blMfByVslCallIdandMf = mfItems.stream().collect(Collectors.groupingBy( GeneralCargoDischargingListItem::getVslCallId, Collectors.toConcurrentMap(GeneralCargoDischargingListItem::getMfDocId, Function.identity()) ));
		List<GeneralCargoDischargingListItem> distinctByVslAndMF = insertTotalItems.stream().filter( distinctByKey(item -> Arrays.asList(item.getVslCallId(), item.getMfDocId())) ).collect( Collectors.toList() );
		
		// 2. for loop &  if there's new element of TMT_MF , then insert list 
		for( GeneralCargoDischargingListItem MFItem  :  distinctByVslAndMF ) {
			boolean isExistedMF = false;
			
			if(blMfByVslCallIdandMf.containsKey(MFItem.getVslCallId()) && blMfByVslCallIdandMf.get(MFItem.getVslCallId()).containsKey(MFItem.getMfDocId())) {
				isExistedMF = true;
			}
			
			if(!isExistedMF) {
				insertMFList.add(MFItem);
			}
		}
		
	    //insert manifest
	    insertItems = new InsertItemsBizParm();
	    insertItems.setInsertItems(insertMFList);
	    generalCargoDischargingListDao.insertMFItem(insertItems);
	    
	    //insert BL
	    insertItems = new InsertItemsBizParm();
	    insertItems.setInsertItems(insertBLList);
	    generalCargoDischargingListDao.insertBLItem(insertItems);
	    
	    //insert BL detail
	    insertItems = new InsertItemsBizParm();
	    insertItems.setInsertItems(insertBLDtlList);
	    generalCargoDischargingListDao.insertBLDtlItem(insertItems);
	    
	    return insertItems.getInsertItems();
	}
	
	/*--------------------------------------- Validation Method ----------------------------------------------*/
	
	private void validExistedVesselSchedule(SearchGeneralCargoDischargingListParm searchParm, HashMap<String, GeneralCargoDischargingListItem> distnctByVslCallIdList, List<GeneralCargoDischargingListItem> notExistVslSchItems) throws BizException {
		// for loop => select schedule after rotation reduces.
		for( Entry<String, GeneralCargoDischargingListItem> entry :  distnctByVslCallIdList.entrySet() ) {
			GeneralCargoDischargingListItem element = entry.getValue();
			
			searchParm = new SearchGeneralCargoDischargingListParm();
			
			searchParm.setVslCallId(element.getVslCallId()); //Rotation
			
			DataItemList vslItemList = generalCargoDischargingListDao.selectVesselSchedule(searchParm);
			
			if(vslItemList == null || vslItemList.getCollection().size() == 0 ) {
				notExistVslSchItems.add(element);
			} else {
				GeneralCargoDischargingListItem tempItem = (GeneralCargoDischargingListItem) vslItemList.getCollection().get(0);
				
				element.setVslCd(tempItem.getVslCd());
				element.setCallYear(tempItem.getCallYear());
				element.setCallSeq(tempItem.getCallSeq());
				element.setShippingAgent(tempItem.getShippingAgent());
			}
		}
	}
	
	private void validDuplicateBL(Map<String, ConcurrentMap<String, GeneralCargoDischargingListItem>> blByVesselCallId, List<GeneralCargoDischargingListItem> duplicateBLItems, GeneralCargoDischargingListItem insertItem ) {
		if( insertItem.getBlNo() != null 
				&& blByVesselCallId.containsKey(insertItem.getVslCallId())
				&& blByVesselCallId.get(insertItem.getVslCallId()).containsKey(insertItem.getBlNo()) 
			) {
				duplicateBLItems.add(insertItem);
			}
	}
	
	private void validCnsAndFwd(Map<String, ConcurrentMap<String, CompanyRegisterItem>> ptnrCdByPtnrType, Map<String, List<String>> notExistedPtnrItems, GeneralCargoDischargingListItem insertItem ) {
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
    	
		if( !ptnrCdByPtnrType.get( CodeConstant.CM_PTNRTP_CNS ).containsKey(insertItem.getCargoAgent()) && !ptnrCdByPtnrType.get( CodeConstant.CM_PTNRTP_FWD ).containsKey(insertItem.getCargoAgent())) {
			if( !notExistedPtnrItems.containsKey( insertItem.getId() ) ) 
				notExistedPtnrItems.put( insertItem.getId(), Arrays.asList( "cargoAgent" ) );
    		else 
    			notExistedPtnrItems.get( insertItem.getId() ).add( "cargoAgent" );
		}
	}
	
	private void validCommodityHeredity(Map<String, Map<String, Map<String, GeneralCargoDischargingListItem>>> cmdtByHeredity, List badCommodityHeredityItems, GeneralCargoDischargingListItem insertItem) {
		if(cmdtByHeredity.containsKey(insertItem.getCargoSubTypeCd())) {
    		if(cmdtByHeredity.get(insertItem.getCargoSubTypeCd()).containsKey(insertItem.getCommodityCd()) ) {
    			if(cmdtByHeredity.get(insertItem.getCargoSubTypeCd()).get(insertItem.getCommodityCd()).containsKey(insertItem.getPackageTypeCd() ) ) {
        			// all clear, then can pass away.
        		} else {
        			// if not existed pkgtp > collect as erroritem
        			badCommodityHeredityItems.add(insertItem);
        		}
    		} else {
    			// if not existed cmdt cd > collect as erroritem
    			badCommodityHeredityItems.add(insertItem);
    		}
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
