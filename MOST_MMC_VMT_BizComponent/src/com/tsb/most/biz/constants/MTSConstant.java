package com.tsb.most.biz.constants;

public interface MTSConstant {

	public static final char MSG_START = (char) 26; // '->'
	public static final char MSG_END = (char) 27; // '<-'
	public static final char MSG_SEPERATOR = (char) 29; // ' '
	public static final char MSG_SEPERATOR_PLUS = '+';
	public static final char CHAR_DTL_CARET = '^';
	public static final String MSG_CONNECT_SYNC = "#";
	public static final String MSG_CONNECT_ASYNC = "";
	public static final String MSG_PREFIX_ID_MARK = "+";
	public static final String MSG_CLEINTID_MARK = "+";

	public static final int DEFAULT_C3IT_PORT = 6778;
	public static final String DEFAULT_C3IT_ADDR = "localhost"; // locahost

	/**
	 * Message Mode
	 */
	public static final String MSG_MODE_CONNECT = "CN";
	public static final String MSG_MODE_DISCONNECT = "DC";
	public static final String MSG_MODE_DISCONNECT2 = "DC2";
	public static final String MSG_MODE_RECONNECT = "RC";
	public static final String MSG_MODE_ENFORCECONNECT = "EC";
	public static final String MSG_MODE_CHANNEL_CLOSED = "CC";
	public static final String MSG_MODE_BAY = "BY";
	public static final String MSG_MODE_BLOCK = "BK";
	public static final String MSG_MODE_CONTAINER = "RC";
	public static final String MSG_MODE_LOCK = "LK";
	public static final String MSG_MODE_INSPECTION = "DI";
	public static final String MSG_MODE_BOTTOM_TIER = "BT";
	public static final String MSG_MODE_ALL_TIER = "AT";
	public static final String MSG_MODE_YARD_JOBS_ON_BLOCK = "JBK";
	public static final String MSG_MODE_JOB_CREATE = "CR";
	public static final String MSG_MODE_JOB_UPDATE = "UP";
	public static final String MSG_MODE_JOB_CHANGE = "CH";
	public static final String MSG_MODE_JOB_CANCEL = "CL";
	public static final String MSG_MODE_JOB_DELETE = "DE";
	public static final String MSG_MODE_JOB_DONE = "DN";
	public static final String MSG_MODE_JOB_ROLLBACK = "RB";
	public static final String MSG_MODE_JOB_DONE_BY_YT = "DNT";
	public static final String MSG_MODE_JOB_UPDATE_BY_YT = "UPT";
	public static final String MSG_MODE_JOB_UPDATE_BY_YARD_CHECKER = "UPY"; // added by jaeok (2019.06.04) Mantis 90376:
																			// [CUSP:N81-N40-YKC-001] Yard Checker
	public static final String MSG_MODE_JOB_REPOSITIONING = "RP"; // added by DO.Lee
	public static final String MSG_MODE_JOB_REASSIGNMENTEQU = "RA"; // added by DO.Lee
	public static final String MSG_MODE_JOB_PRIORITY_YES = "PY"; // added by DO.Lee (2020.08.25)
	public static final String MSG_MODE_JOB_PRIORITY_NO = "PN"; // added by DO.Lee (2020.08.25)

	public static final String MSG_MODE_VALIDATE_SWAP_CNTR = "VC"; // added by jaeok (2018.05.14) Gap ID: YT-K-004
	public static final String MSG_MODE_VALIDATE_CHANGE_TO_POSITION = "VP";
	public static final String MSG_MODE_SEARCH_SWAP_CNTR = "SC";
	public static final String MSG_MODE_SWAP = "DN";

	public static final String MSG_MODE_UPDATE_CHASSIS_TYPE = "UT"; // added by JH.Tak (2018.05.30) APL N35-YT-001
	public static final String MSG_MODE_REQUEST = "RQ"; // added by DO.LEE (2020.05.14)
	public static final String MSG_MODE_ALL = "AL"; // added by DO.LEE (2020.06.4)
	public static final String MSG_MODE_JOB_LIST_ALL = "JA"; // added by DO.LEE (2020.07.21)
	public static final String MSG_MODE_JOB_LIST_FDECK = "FD"; // added by DO.LEE (2020.07.23)
	public static final String MSG_MODE_REMAIN_JOB_LIST = "J1"; // Remained Plan (Order + Plan) added by DO.LEE
																// (2020.09.29)
	public static final String MSG_MODE_SLOT_VALIDATION_CHECK = "CK"; // Control Yard Job Slot Validation Check added by
																		// DO.LEE (2020.10.7)
	public static final String MSG_MODE_POSITION_CHECK = "PC"; // Control Yard Job Position Check added by DO.LEE
																// (2020.10.7)
	public static final String MSG_MODE_MANUAL_POSITION_UPDATE = "MP"; // Control Yard Job Manual Position Update added
																		// by DO.LEE (2020.10.7)
	public static final String MSG_MODE_MANUALL_COMPLETION = "MC"; // Bay Stacking View Manual Position Update added by
																	// DO.Lee (2020.11.4)

	/**
	 * reefer mode
	 */
	public static final String MSG_MODE_REEFER_JOB_LIST = "JL";
	public static final String MSG_MODE_REEFER_MONITORING = "ML";

	/**
	 * TM Job list request
	 */
	public static final String MSG_MODE_GATE_JOB_LIST = "GL";

	/**
	 * Message Result
	 */
	public static final String MSG_RESULT_CODE_OK = "OK";
	public static final String MSG_RESULT_CODE_ERROR = "ER";
	public static final String MSG_RESULT_CODE_RST = "RST";

	/**
	 * BeanId suffix
	 */
	public static final String BEAN_HANDLER_SUFFIX = "MessageHandler";
	public static final String BEAN_MSG_ITEM_SUFFIX = "Item";
	public static final String BEAN_MSG_RST_PREFIX = "Rst";
	/**
	 * Message Head
	 */
	public static final String MSG_HEAD_AK = "AK";
	public static final String TB_DISPATCH_QUEUE_CHANGE_ALERTING = "A95"; // added by dolee (2020.06.15)
	public static final String TB_GP_CHANGE_ALERTING_A86 = "A86"; // added by JS.SIM (20.07.08)
	public static final String TB_GP_CHANGE_ALERTING_PLY51 = "PLY51"; // added by JS.SIM (20.07.09)
	public static final String MSG_HEAD_CONNECTION = "C01";
	public static final String MSG_HEAD_ALERTMESSAGE = "C04";
	public static final String MSG_HEAD_CONFIGURATION_UPDATED = "C05";
	public static final String MSG_HEAD_LOGIN = "C21";
	public static final String MSG_HEAD_STOPPAGE = "C23"; // added by jaeok (2018.03.06) WHL Gap ID: CR-T-002 YT-B1
	public static final String MSG_HEAD_CONFIRM_DAMAGE = "C25";
	public static final String MSG_HEAD_CHANGE_PASSWORD = "C29";
	public static final String MSG_HEAD_PLUG_IN_OUT_CONFIRM = "C27";
	public static final String MSG_HEAD_UPDATE_CURRENT_TEMP = "C28";
	public static final String MSG_HEAD_REEFER_CHECKER_JOB_LIST = "C37";
	public static final String MSG_HEAD_REEFER_CHECKER_FIND_JOB_LIST = "C38";
	public static final String MSG_HEAD_CODE_LIST = "C44";
	public static final String MSG_HEAD_CONFIGURATION = "C45"; // added by jaeok (2018.03.06) WHL Gap ID: CR-T-002 YT-B1
	public static final String MSG_HEAD_BLOCKAREA_CONFIGURATION = "C46"; // added by dolee (2020.05.14)
	public static final String MSG_HEAD_EQUIPMENT_CONFIGURATION = "C47"; // added by dolee (2020.05.28)
	public static final String MSG_HEAD_REQUEST_POSITION_DEFINE = "C80";
	public static final String MSG_HEAD_REEFER_JOB_AND_MONITORING = "C370";
	public static final String MSG_HEAD_LOGIN_LDAP = "C91";
	public static final String MSG_HEAD_CONNECTION_LDAP = "C92";
	public static final String MSG_HEAD_REEFER_BLOCK_LIST = "C100";

	public static final String MSG_HEAD_QUAY_JOB_ORDER = "Q11"; // add by dolee(2020.07.31) Quay job order
	public static final String MSG_HEAD_QUAY_JOB_ORDER_REQUEST = "Q21"; // add by dolee(2020.07.24) Quay job order
																		// request

	public static final String MSG_HEAD_GATE_JOB_ORDER_REQUEST = "G21"; // add by dolee(2020.07.3) Gate job order
																		// request
	public static final String MSG_HEAD_GATE_CHECKER_JOB_CONFIRM = "G71";
	public static final String MSG_HEAD_GATE_CHECKER_JOB_LIST_HEAD = "G72";

	public static final String MSG_HEAD_REQUEST_JOB_LIST = "M22"; // add by dolee(2020.06.26) Job list request

	public static final String MSG_HEAD_POOL_QUEUE = "T10"; // added by jaeok (2018.03.07) WHL Gap ID: CR-T-002 YT-B1
	public static final String MSG_HEAD_YT_JOB = "T11";
	public static final String MSG_HEAD_YT_JOB_CHANGE = "T13";
	public static final String MSG_HEAD_YT_JOB_LIFTOFF = "T21";
	public static final String MSG_HEAD_YT_JOBS_LIST = "T22";
	public static final String MSG_HEAD_YT_SNATCHING_JOB = "T25";
	public static final String MSG_HEAD_YT_JOB_ARRIVAL = "T30";
	public static final String MSG_HEAD_YT_SWAP_JOB = "T32"; // added by jaeok (2021.02.16) related mail '[HJNC] Web YT '작업교대' 기능 정리'
	public static final String MSG_HEAD_YT_STATUS = "T37";
	public static final String MSG_HEAD_YT_LIST = "T24";
	public static final String MSG_HEAD_VALIDATE_SWAP = "T60"; // added by jaeok (2018.05.14) Gap ID: YT-K-004
	public static final String MSG_HEAD_SWAP = "T61";
	public static final String MSG_HEAD_SEARCH_SWAP = "T62";
	public static final String MSG_HEAD_YARD_JOB_CONTROL = "Y21"; // added by jaeok (2018.05.09) Gap ID: YT-K-002
	public static final String MSG_HEAD_YARD_MULTIPLE_JOB_CONTROL = "Y210"; // added by JH.Tak (2019.10.28) 0088411:
																			// [B2B Message] Enhancement for Lift On Job

	public static final String MSG_HEAD_YARD_JOB = "Y11";
	public static final String MSG_HEAD_CHANGE_EQUIPMENT = "Y13";
	public static final String MSG_HEAD_REQUEST_CONTAINER_DETAIL = "Y23";
	public static final String MSG_HEAD_REQUEST_YARD_LOCK = "Y24";
	public static final String MSG_HEAD_ROW_LOCK = "Y41";
	public static final String MSG_HEAD_REQUEST_ROW_LOCK = "Y43";

	public static final String MSG_HEAD_CHANGE_QUAYJOB = "Q03";

	public static final String MSG_HEAD_CONNECTION_STATE_CHECK = "CK8";
	public static final String MSG_HEAD_BROADCAST_PREFIX = "B";

	public static final String MSG_MODE_ENABLE_CONFIRM_AT_YT = "ECY"; // added by jaeok (2018.05.24) Gap ID: YT-K-002

	public static final String MSG_HEAD_CHASSIS_UPDATE = "T41"; // added by JH.Tak (2018.05.30) APL N35-YT-001
	public static final String MSG_HEAD_YT_YARD_JOBS_LIST = "Y22";

	public static final String MSG_HEAD_REALLOCATION_REQUEST = "Y30"; // added by DO.Lee (2020.08.19)
	public static final String MSG_HEAD_BAY_CONTAINER_REQUEST = "Y34"; // added by DO.Lee (2020.08.19)
	public static final String MSG_HEAD_YARD_JOB_PRIORITY = "Y37"; // added by DO.Lee (2020.08.25)
	public static final String MSG_HEAD_SLOT_VALIDATION_CHECK = "C34"; // added by DO.Lee (2020.10.7)

	/**
	 * Vessel Job Type
	 */
	public static final String VSLJOB_DISCHARGING = "GD";
	public static final String VSLJOB_LOADING = "GL";
	public static final String TWO_TIME_SHIFTING_LOADING = "SL";
	public static final String TWO_TIME_SHIFTING_DISCHARGING = "SD";
	public static final String ONE_TIME_SHIFTING = "SS";

	/**
	 * Vessel Working Status
	 */
	public static final String VESSEL_WORKING = "W";
	public static final String VESSEL_ARRIVING = "A";
	public static final String VESSEL_BERTHING = "B";

	/**
	 * Quay Job Type
	 */
	public static final String QUAY_JOBCODE_DISCHARGING = "DS";
	public static final String QUAY_JOBCODE_LODING = "LD";

	/**
	 * Yard Job Type
	 */
	public static final String YARDJOB_GATE_IN = "GF";
	public static final String YARDJOB_GATE_OUT = "GO";
	public static final String YARDJOB_VESSEL_IN = "DF";
	public static final String YARDJOB_VESSEL_OUT = "LO";
	public static final String YARDJOB_RAIL_IN = "RF";
	public static final String YARDJOB_RAIL_OUT = "RO";
	public static final String YARDJOB_YARD_IN = "YF";
	public static final String YARDJOB_YARD_OUT = "YO";
	public static final String YARDJOB_YARD_SHIFT = "YY";
	public static final String YARD_JOB_CODE_LO = "LO";
	public static final String YARD_JOB_CODE_DF = "DF";

	public class CntrState {
		public static final String RESERVED = "R";
		public static final String BOOKING = "B";
		public static final String STACKING = "Y";
		public static final String IN_PROGRESS_INCOMING = "O";
		public static final String IN_PROGRESS_OUTGOING = "G";
		public static final String UNDER_SHIFTING = "Z";
		public static final String DELIVERED = "D";

	}

	/**
	 * Reefer Plugging Mode
	 */
	public static final String PLUG_MODE_GI = "GI";
	public static final String PLUG_MODE_GO = "GO";
	public static final String PLUG_MODE_VI = "VI";
	public static final String PLUG_MODE_VO = "VO";
	public static final String PLUG_MODE_RI = "RI";
	public static final String PLUG_MODE_RO = "RO";
	public static final String PLUG_MODE_YI = "YI";
	public static final String PLUG_MODE_YO = "YO";

	/**
	 * Container FE
	 */
	public static final String CNTR_FE_EMPTY = "E";
	public static final String CNTR_FE_FULL = "F";

	/**
	 * Slot Status
	 */
	public static final String SLOT_STATUS_JOB = "J";
	public static final String SLOT_STATUS_STACKING = "S";
	public static final String SLOT_STATUS_FREE = "F";

	/**
	 * Equ Type
	 */
	public static final String EQU_TYPE_SC = "SC";
	public static final String EQU_TYPE_TC = "TC";
	public static final String EQU_TYPE_RS = "RS";
	public static final String EQU_TYPE_FL = "FL";
	public static final String EQU_TYPE_YT = "YT";
	public static final String EQU_TYPE_RT = "RT";
	public static final String EQU_TYPE_GC = "GC";
	public static final String EQU_TYPE_GT = "GT";

	// POS+REL+EQU+GF+GO+DF+LO+RF+RO+YF+YO+YY+TC+SC+RS+FL
	public static final String LOCK_WORK_FLAG = "Y+Y+N+Y+Y+Y+Y+Y+Y+Y+N+N+Y+Y+N+Y";

	/**
	 * chassis position
	 */
	public static final String YT_CHASSIS_POSITION_AFTER = "A";
	public static final String YT_CHASSIS_POSITION_FRONT = "F";
	public static final String YT_CHASSIS_POSITION_MIDDLE = "M";

	public static final String RT_SIDE = "Outside";

	public static final String ALL = "ALL";

	/*
	 * Container Direction
	 */
	public static final String CONTAINER_DIRECTION_BAY = "B"; // sending container information per bay (2020-09-24
																// DO.Lee)
	public static final String CONTAINER_DIRECTION_ROW = "R"; // sending container information per row (2020-09-24
																// DO.Lee)

	/*
	 * Delivery Code
	 */
	public static final String DELV_TRANSHIPMENT = "T"; // 본선 작업 SD/SL 판별하기 위해 사용 (2020-10-27 DO.Lee)
}
