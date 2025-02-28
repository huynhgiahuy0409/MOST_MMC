package com.tsb.most.common.constant;

public class BillingConstant {
	
	public static String TRF_CAL_MODE_GENERAL_OPERATION_ITEM = "G";
	public static String TRF_CAL_MODE_SERVICE_ORDER_ITEM  = "S";
	
	public static String TRF_CODE_MODE_STANDARD = "S";
	public static String TRF_CODE_MODE_PACKAGE  = "K";
	public static String TRF_CODE_MODE_PARTNER  = "P";
	
	// Vessel
	public static String TRF_TP_CD_CC = "CC"; // Vessel Berthing (Port Dues)
	public static String TRF_TP_CD_MN = "MN"; // Vessel Draft Service(To check Cargo weight in the vessel)
	public static String TRF_TP_CD_BM = "BM"; // Vessel Mooring Service 
	public static String TRF_TP_CD_LD = "LD"; // Tug Boat Services
	
	//
	public static String TRF_TP_CD_KD = "KD"; // Cargo Checking Service (SSR)
	public static String TRF_TP_CD_SO = "SO"; //Service Order
	public static String TRF_TP_CD_HK = "HK";
	public static String TRF_TP_CD_HL = "HL";
	public static String TRF_TP_CD_HB = "HB";
	public static String TRF_TP_CD_KK = "KK";
	public static String TRF_TP_CD_KI = "KI";
	public static String TRF_TP_CD_BH = "BH";
	public static String TRF_TP_CD_TT = "TT";
	public static String TRF_TP_CD_CG = "CG";
	public static String TRF_TP_CD_CM = "CM";
	public static String TRF_TP_CD_DV = "DV";
	public static String TRF_TP_CD_DB = "DB";
	public static String TRF_TP_CD_NH = "NH";
	public static String TRF_TP_CD_CT = "CT";
	public static String TRF_TP_CD_CN = "CN";
	public static String TRF_TP_CD_KC = "KC";
	public static String TRF_TP_CD_CH = "CH";
	public static String TRF_TP_CD_KH = "KH";
	
	public static String TRF_TP_DC = "DC"; //DOCKAGE CHARGES
	public static String TRF_TP_PD = "PD"; //Port Dues
	
	public static String TRF_TP_HG = "HG"; //Handling Goods at Dry-bulk Terminal
	public static String TRF_TP_HE = "HE"; //Handling Goods at Break-bulk Terminal
	public static String TRF_TP_HQ = "HQ"; //Handling Goods at Liquid-bulk Terminal
	
	public static String TRF_SUB_CODE_NIL = "NIL";
    public static String TRF_SUB_CODE_F01 = "F01";
    public static String TRF_SUB_CODE_J01 = "J01";
    public static String TRF_SUB_CODE_J02 = "J02";
    public static String TRF_SUB_CODE_J03 = "J03";
    public static String TRF_SUB_CODE_J04 = "J04";
    public static String TRF_SUB_CODE_J05 = "J05";
    public static String TRF_SUB_CODE_J06 = "J06";
    public static String TRF_SUB_CODE_J07 = "J07";
                         
    public static String TRF_SUB_CODE_N01 = "N01";
    public static String TRF_SUB_CODE_N02 = "N02";
    public static String TRF_SUB_CODE_N03 = "N03";
    public static String TRF_SUB_CODE_N04 = "N04";
    public static String TRF_SUB_CODE_R01 = "R01";
                         
    public static String TRF_SUB_CODE_S01 = "S01";
    public static String TRF_SUB_CODE_S02 = "S02";
    public static String TRF_SUB_CODE_S03 = "S03";
    public static String TRF_SUB_CODE_S04 = "S04";
    public static String TRF_SUB_CODE_S05 = "S05";
    public static String TRF_SUB_CODE_S06 = "S06";
	
    public static String TRF_UNIT1_TEU = "TEU";
    public static String TRF_UNIT1_MTR = "MTR";
    public static String TRF_UNIT1_RTON = "RTON";
    public static String TRF_UNIT1_M2 = "M2";
    public static String TRF_UNIT1_MT = "MT";
    public static String TRF_UNIT1_M3 = "M3";
    public static String TRF_UNIT1_LOA = "LOA";
    public static String TRF_UNIT1_EACH_RTON = "EACH_RTON";
    
    //unit 2: time
    public static String TRF_UNIT2_SHF = "SHF";
    public static String TRF_UNIT2_SEC = "SEC";
    public static String TRF_UNIT2_MIN = "MIN";
    public static String TRF_UNIT2_HRS = "HRS";
    public static String TRF_UNIT2_DAY = "DAY";
    public static String TRF_UNIT2_WEK = "WEK";
    public static String TRF_UNIT2_MON = "MON";
    public static String TRF_UNIT2_YER = "YER";
    public static String TRF_UNIT2_CDAY = "CDAY";
    public static String TRF_UNIT2_30 = "30";
    
    //unit 3: others
    public static String TRF_UNIT3_UNT = "UNT";
    public static String TRF_UNIT3_CAS = "CAS";
    public static String TRF_UNIT3_HED = "HED";
    public static String TRF_UNIT3_OVH = "OVH";
    public static String TRF_UNIT3_VHC = "VHC";
    public static String TRF_UNIT3_PSN = "PSN";
    
    /*Billing Tariff Status */
    public static String DATA_GATHER_STATUS_GATHERD	 = "GT";
    public static String DATA_GATHER_STATUS_VERIFIED = "VF";
    public static String DATA_GATHER_STATUS_REJECTED = "RJ";
    public static String DATA_GATHER_STATUS_SUMMITED = "ST";
    public static String DATA_GATHER_STATUS_INVOICED = "IV";
    public static String DATA_GATHER_STATUS_PAID_COMPETE = "PC";
    public static String DATA_GATHER_STATUS_SATTLED = "SM";
    
    
    /* Billing Payment Type */
    public static String PAYTMENT_TYPE_CREDIT = "C";
    public static String PAYTMENT_TYPE_CASH = "M";
    
    public static String PAYTMENT_MODE_PRE_PAID = "PFI";
    public static String PAYTMENT_MODE_POST_PAID = "INV";
    
	public static String TARIFF_GENERATION_MODE_PROFOMA = "PF";
	public static String TARIFF_GENERATION_MODE_DATAGATHERING = "DG";
	
	
    /* Operator Indicator 
    EQ : Equal
    NE : !Equal
    IN : IN
    NI : NOT IN
    */
    public static String OP_EQUAL 		= "EQ";
    public static String OP_NOT_EQUAL 	= "NE";
    public static String OP_INCLUDE 	= "IN";
    public static String OP_NOT_INCLUDE = "NI";
    public static String OP_BLANK 		= "0";
    public static String OP_MORE_THAN 	= "MT";
    public static String OP_LESS_THAN 	= "LT";
    public static String OP_MORE_THAN_OR_EQUAL 	= "ME";
    public static String OP_LESS_THAN_OR_EQUAL 	= "LE";
    		
    //property code
    public static final String TRF_TP_PRPT_C1 = "C1";     //Cargo Class
    public static final String TRF_TP_PRPT_C10 = "C10";     //DG Class
    public static final String TRF_TP_PRPT_C11 = "C11";     //Mode of OPR
    public static final String TRF_TP_PRPT_C12 = "C12";     //Damaged
    public static final String TRF_TP_PRPT_C13 = "C13";     //Operation Type
    public static final String TRF_TP_PRPT_C14 = "C14";     //Vehicles
    public static final String TRF_TP_PRPT_C2 = "C2";     //Rehandle
    public static final String TRF_TP_PRPT_C3 = "C3";     //Devivery
    public static final String TRF_TP_PRPT_C4 = "C4";     //Cargo Trade Type
    public static final String TRF_TP_PRPT_C5 = "C5";     //Shifting Type
    public static final String TRF_TP_PRPT_C6 = "C6";     //W/H Type
    public static final String TRF_TP_PRPT_C7 = "C7";     //Cargo Type
    public static final String TRF_TP_PRPT_C8 = "C8";     //Commodity
    public static final String TRF_TP_PRPT_C9 = "C9";     //Package Type
    public static final String TRF_TP_PRPT_E1 = "E1";     //Equipment Type
    public static final String TRF_TP_PRPT_E2 = "E2";     //Capacity
    public static final String TRF_TP_PRPT_E3 = "E3";     //Working Area
    public static final String TRF_TP_PRPT_E4 = "E4";     //Working Time
    public static final String TRF_TP_PRPT_O1 = "O1";     //Stevedore Role
    public static final String TRF_TP_PRPT_O2 = "O2";     //Penalty on Late Manifest
    public static final String TRF_TP_PRPT_O3 = "O3";     //Delay Day(s) on Submission of Manifest
    public static final String TRF_TP_PRPT_O4 = "O4";     //Penalty Type for Stevedore
    public static final String TRF_TP_PRPT_O5 = "O5";     //Cargo Storage Days
    public static final String TRF_TP_PRPT_O6 = "O6";     //Cargo Storage Days
    public static final String TRF_TP_PRPT_O7 = "O7";     //Accumulative tonnage for one year
    public static final String TRF_TP_PRPT_O8 = "O8";     //Penalty on Late Submitsion Vessel Schedule
    public static final String TRF_TP_PRPT_T1 = "T1";     //Tariff Code
    public static final String TRF_TP_PRPT_V1 = "V1";     //LOA
    public static final String TRF_TP_PRPT_V10 = "V10";     //GRT
    public static final String TRF_TP_PRPT_V11 = "V11";     //Tug Service Type
    public static final String TRF_TP_PRPT_V13 = "V13";     //Operation Type
    public static final String TRF_TP_PRPT_V14 = "V14";     //PONR
    public static final String TRF_TP_PRPT_V16 = "V16";     //DWT
    public static final String TRF_TP_PRPT_V17 = "V17";     //Horse Power
    public static final String TRF_TP_PRPT_V18 = "V18";     //Period within Day
    public static final String TRF_TP_PRPT_V19 = "V19";     //No. of Gang
    public static final String TRF_TP_PRPT_V2 = "V2";     //Purpose of Call
    public static final String TRF_TP_PRPT_V20 = "V20";     //Service Time
    public static final String TRF_TP_PRPT_V21 = "V21";     //Chargeable
    public static final String TRF_TP_PRPT_V22 = "V22";     //Premium
    public static final String TRF_TP_PRPT_V23 = "V23";     //Location From
    public static final String TRF_TP_PRPT_V24 = "V24";     //Location To
    public static final String TRF_TP_PRPT_V25 = "V25";     //Detention
    public static final String TRF_TP_PRPT_V26 = "V26";     //Cancellation
    public static final String TRF_TP_PRPT_V3 = "V3";     //Vessel Type
    public static final String TRF_TP_PRPT_V31 = "V31";     //Additional Request
    public static final String TRF_TP_PRPT_V32 = "V32";     //Day-Shift Or Night-Shift
    public static final String TRF_TP_PRPT_V33 = "V33";     //Draft
    public static final String TRF_TP_PRPT_V34 = "V34";     //Special Request
    public static final String TRF_TP_PRPT_V35 = "V35";     //Propulsion
    public static final String TRF_TP_PRPT_V36 = "V36";     //Shift Distance
    public static final String TRF_TP_PRPT_V38 = "V38";     //Tug
    public static final String TRF_TP_PRPT_V39 = "V39";     //Escort Tug
    public static final String TRF_TP_PRPT_V4 = "V4";     //Trade Type
    public static final String TRF_TP_PRPT_V40 = "V40";   //Pilot
    public static final String TRF_TP_PRPT_V5 = "V5";     //Dockage Type
    public static final String TRF_TP_PRPT_V6 = "V6";     //Arrival Time(s) in a month
    public static final String TRF_TP_PRPT_V7 = "V7";     //Operated at Private Jetty
    public static final String TRF_TP_PRPT_V8 = "V8";     //Age
    public static final String TRF_TP_PRPT_V9 = "V9";     //Fresh Water Service
    
    public static final String TRF_TP_PRPT_S1 = "S1";     //Service Order Category 1
    public static final String TRF_TP_PRPT_S2 = "S2";     //Service Order Category 2
    public static final String TRF_TP_PRPT_S3 = "S2";     //Service Order Category 3
	
    /* Billing Screen ID */
    public static final String DATAGATHERING_SCR_ID = "OPE";  //Data Gathering 3
    
    //MMC
    public static String TRF_TP_CD_HG = "HG"; //Handling Goods at Dry-bulk Terminal
    public static String TRF_TP_CD_OS = "OS"; //Cargo Over Storage
    public static String TRF_TP_CD_ST = "ST"; //Stevedorage Charges
    public static String TRF_TP_CD_DP = "DP"; //Document Processing Charge
    /* Only Distinguish Sub BL / Shipping Note (Not Category) */
    public static String IMPORT 	= "I";
    public static String CHANGE_DIRECT_TO_INDIRECT = "CDI";
    public static String INVOICE_ADVICE_ACK = "ACK";
    
    //Dockage Type
    public static String MT_DKGTP_DB = "DB";	//Double
    public static String MT_DKGTP_DD = "DD";	//D/Double Banking
    public static String MT_DKGTP_DK = "DK";	//Double Banking
    public static String MT_DKGTP_FD = "FD";	//1st Dockage
    public static String MT_DKGTP_FDK = "FDK";	//1st Dockage of Double Banking
    public static String MT_DKGTP_LC = "LC";	//Loading cancel
    public static String MT_DKGTP_LCD = "LCD";	//Loading cancel of Double Banking
    public static String MT_DKGTP_NR = "NR"; 	//Normal Dockage
    public static String MT_DKGTP_SD = "SD";	//2nd Dockage
    public static String MT_DKGTP_SDK = "SDK";	//2nd Dockage of Double Banking
    public static String MT_DKGTP_TD = "TD";	//3rd Dockage
    public static String MT_DKGTP_TDK = "TDK";	//3rd Dockage of Double Banking
    
    //VSL TYPE
    public static String MT_VSLTP_BBK = "BBK";
    public static String MT_VSLTP_BT = "BT";
    public static String MT_VSLTP_CTR = "CTR";
    public static String MT_VSLTP_DBE = "DBE";
    public static String MT_VSLTP_DBN = "DBN";
    public static String MT_VSLTP_IR = "IR";
    public static String MT_VSLTP_LQE = "LQE";
    public static String MT_VSLTP_LQN = "LQN";
    public static String MT_VSLTP_OIMR = "OIMR";
    public static String MT_VSLTP_PS = "PS";
    public static String MT_VSLTP_RR = "RR";
}
