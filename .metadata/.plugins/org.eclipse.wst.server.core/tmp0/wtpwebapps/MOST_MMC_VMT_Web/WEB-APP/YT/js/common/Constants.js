var CONSTANTS = {};
var AUTH = {};

CONSTANTS.CNTR_SIZE = {
		SIZE_20 : 20,
		SIZE_40 : 40,
	};

CONSTANTS.DOOR = {
		FRONT : 'F',
		AFTER : 'A',
	};

CONSTANTS.JOBCODE = {
		LOADING : 'LD',
		DISCHARGING : 'DS'
	};

CONSTANTS.FE = {
		EMPTY : 'E',
		FULL : 'F'
	};

CONSTANTS.CHASSIS_POSITION = {
		FORE : 'Fore',
		AFTER : 'After',
		MIDDLE : 'Middle'
	};

CONSTANTS.STATUS_DESC = {
		//OPERATION : "운행",
		OPERATION : "Push Arr.",
		ARRIVAL : "Arrival",
		
		//READY : "준비",
		READY : "Ready Button",
		
		READY_COMPLETE : "Ready"
	};


CONSTANTS.STATUS = {
		OPERATION : "O",
		ARRIVAL : "A",
		READY : "R"
	};

CONSTANTS.TIME_LINE = {
		YARD_JOB : 'Y',
		SHIP_JOB : 'S'
	};

CONSTANTS.LOADING = {
		BEFORE : 'B',
		AFTER : 'C'
	};

CONSTANTS.DIRECTION = {
		RIGHT : 'R',
		LEFT : 'L'
	};
	
CONSTANTS.POSTFIX = {
		LANE : "LANE",
		BLOCK : "BLOCK"
	};

//added by Brian (for Authentication,2023/10/17)
AUTH.TOKEN_TYPE = {
		TOKEN_TYPE_NONTOKEN : 'Nontoken',
		TOKEN_TYPE_BEARER : 'Bearer',
		TOKEN_TYPE_BASIC : 'Basic'
	};