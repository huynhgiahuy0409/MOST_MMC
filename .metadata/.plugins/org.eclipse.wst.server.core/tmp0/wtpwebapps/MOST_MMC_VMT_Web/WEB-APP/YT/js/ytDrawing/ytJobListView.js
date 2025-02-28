let ytRenderer = null;
let drawLineWidth = 3;
let minimumDrawingHeight = 350;
let textConfing = {
		heightDivideCount : 3,
		fontSize : 1.8,
		containerMappingItems : [
			{heightIndex : 1, fieldNameAndText : "containerNoText", length : 12, bold : true},
			{heightIndex : 1, fieldNameAndText : "", length : 12, bold : true}, // ?? 컨테이너 번호가 가운데 정렬이 안되서 임시로 넣음. 
			{heightIndex : 2, fieldNameAndText : "yardJobCodeText", length : 8, color : 'black'},
			{heightIndex : 2, fieldNameAndText : "toPosition", length : 16},
			{heightIndex : 3, fieldNameAndText : "statusDesc", length : 15},
			{heightIndex : 3, fieldNameAndText : "cargoTypeDesc", length : 9, color : 'red'}
		]
	};
	
// added by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B5
let gbTimeLineType = "";
let gbYtStatusItem;

function drawingContainerItems(containerInfo) {
	let windowWidth = $(window).width();
	let windowHeight = $(window).height();
	let footerHeight = $('#jobListPageFooter').height();
	
	if (footerHeight <= 0) {
		footerHeight = 111;
	}

	let drawingHeight = ($(window).height() - 100 - footerHeight);
	
	if(drawingHeight < minimumDrawingHeight){
		drawingHeight = minimumDrawingHeight;
	}
	
	// added by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B5
	let ytStatusItem = containerInfo.dataItem;
	if (ytStatusItem == null) {
		if (gbTimeLineType == null || gbTimeLineType.length == 0) {
			gbTimeLineType = CONSTANTS.TIME_LINE.YARD_JOB; // set default value
		}
		
	} else {
		if (ytStatusItem.direction == "Y") { // Yard
			gbTimeLineType = CONSTANTS.TIME_LINE.YARD_JOB;
					
		} else if (ytStatusItem.direction == "Q") { // Quay
			gbTimeLineType = CONSTANTS.TIME_LINE.SHIP_JOB;
			
		} else {
			if (ytStatusItem.targetPos == null) {
				gbTimeLineType = CONSTANTS.TIME_LINE.YARD_JOB; // set default value
			} else {
				gbTimeLineType = CONSTANTS.TIME_LINE.SHIP_JOB; // lane 정보만 들어오는 경우
			}
		}
		gbYtStatusItem = containerInfo.dataItem;
	}

	var containerForeColor = '';
	var containerAfterColor = '';
	var containerMiddleColor = '';
	for (var i =0; i < containerInfo.data.length; i++) {
		var containerItem = containerInfo.data[i];
		
		var backColor;
		if (containerItem.atcJobStatus == '4') { // EXECUTING
			backColor = '#FFF200';
		} else if (containerItem.atcJobStatus == '3') { // EXECUTABLE
			backColor = '#EEAAA3';
		} else {
			backColor = '#92D050';
		}
		
		if (containerItem.yardJobCode == "DF" && containerItem.jobState.substring(0, 1) == "B") {
			if (containerItem.cposition == 'A') {
				containerAfterColor = '#92D050';
			} else if (containerItem.cposition == 'F') {
				containerForeColor = '#92D050';
			} else if (containerItem.cposition == 'M') {
				containerMiddleColor = '#92D050';
			}
			
		} else if (containerItem.yardJobCode == "LO" && containerItem.jobState.substring(0, 1) == "C") {
			if (containerItem.cposition == 'A') {
				containerAfterColor = '#92D050';
			} else if (containerItem.cposition == 'F') {
				containerForeColor = '#92D050';
			} else if (containerItem.cposition == 'M') {
				containerMiddleColor = '#92D050';
			}
			
		} else {
			if (containerItem.cposition == 'A') {
				containerAfterColor = backColor;
			} else if (containerItem.cposition == 'F') {
				containerForeColor = backColor;
			} else if (containerItem.cposition == 'M') {
				containerMiddleColor = backColor;
			}
		}
		
		/*
		 * 2024.01.03 MOST comment:
		 * 
		 * */
		//2024.01.03 MOST added:		
		if (containerItem.codeIndex == 'A') {
			containerAfterColor = '#92D050';
			containerForeColor = '#92D050';
			containerMiddleColor = '#92D050';
		}else{
			containerAfterColor = '#FFC133';
			containerForeColor = '#FFC133';
			containerMiddleColor = '#FFC133';
		}
	}
	
	//if (containerInfo.data[0].atcJobStatus == '4') { // EXECUTING
	//	containerBgColor = '#FFF200';
	//	
	//} else if (containerInfo.data[0].atcJobStatus == '3') { // EXECUTABLE
	//	containerBgColor = '#ED1C24';
	//	
	//} else {
	//	containerBgColor = '#92D050';
	//}

	var divContainer = document.getElementById("AreaContainerField");
	var truckImage = document.getElementById('imgYardTruck');
	var truckMarkImage = document.getElementById('imgYardTruckMark');
	
	let drawingConfig = {
			drawArea : divContainer,
			clientWidth : windowWidth - 20,
			truckImage : truckImage,
			truckMarkImage : truckMarkImage,
			lineWidth : drawLineWidth,
			
			containerFullBgColor : containerForeColor, //'#FFC133',
			containerForeBgColor : containerForeColor,
			containerAfterBgColor : containerAfterColor,
			containerMiddleBgColor : containerMiddleColor,
			
			height : drawingHeight,
			textConfing : textConfing,
			timeLineVisible : true,
			timeLineType : gbTimeLineType,
			shipJobItem : getShipJobItem(),
			yardJobItem : getYardJobItem(),
			containerClick : containerClick,
			etcClick : etcClick,
			doorClick : doorDirectionChange,
			//containerStatusChange : containerStatusChange // deleted by MinSeok.K (2021.07.30) YT Interface
	};
	
	if(ytRenderer != null){
		ytRenderer.clear();
	}
	
	ytRenderer = new TsbYtRenderer(drawingConfig);
//	let ctnItem = containerInfo.data[0];	
//	ctnItem.loadingBeforeAfter = CONSTANTS.LOADING.AFTER;
	
	ytRenderer.containerInfo = containerInfo;
	ytRenderer.draw();
	
	let containerItems = getContainerData(containerInfo);
	
	ytRenderer.setContainerItems(containerItems);
	
	// 트럭 하단에 상태 알림 표시 설정
	if (ytRenderer.containerInfo != null) {
		let jobArrayList = ytRenderer.containerInfo.data;
		
		var jobToYard = []; // 야드로 향하는 경우에만 메세지 표시
		if (jobArrayList != null && jobArrayList.length > 0) {
			for (var i = 0; i < jobArrayList.length; i++) {
				var containerItem = containerInfo.data[i];
				if (containerItem.coneAttached == "Y") {
					continue;
				}
				
				if (containerItem.yardJobCode == "DF") {
					if (containerItem.jobState.substring(0, 1) == "C") {
						jobToYard.push(containerItem);
					}
				} else if (containerItem.yardJobCode == "LO") {
					if (containerItem.jobState.substring(0, 1) == "B") {
						jobToYard.push(containerItem);
					}
				} else if (containerItem.yardJobCode == "YO") {
					if (containerItem.jobState.substring(0, 1) == "B") {
						jobToYard.push(containerItem);
					}
				} else if (containerItem.yardJobCode == "YF") {
					if (containerItem.jobState.substring(0, 1) == "C") {
						jobToYard.push(containerItem);
					}
				} 
			}
		}
		/* // deleted by MinSeok.K (2021.07.30) YT Interface
		if (jobToYard != null && jobToYard.length > 0) {
			// modified by jaeok (2021.02.15) related mail '[HJNC] YT 단말 화면 표시 변경' 2021-02-15'
			//var MSG1 = "RFID 미인식상태. 블록에 진입했다면 도착버튼 눌러주세요.";
			//var MSG2 = "다른 작업 진행중. 노란색으로 바뀔때까지 대기해주세요.";
			//var MSG3 = "CPS를 맞춘 후 준비를 눌러주세요.";
			//var MSG4 = "작업중입니다. 사고 위험이 있으니 절대 움직이지 마세요.";
			var MSG1 = YT010;
			var MSG2 = YT011;
			var MSG3 = YT012;
			var MSG4 = YT013;
			var message = "";
			
			if (jobToYard.length == 1) { // 1개의 작업이 있는 경우
				var tmpContainerItem1 = jobToYard[0];
				
				var atcJobStatus = tmpContainerItem1.atcJobStatus;
				if (atcJobStatus == null || atcJobStatus.length == 0) {
					atcJobStatus = "2"; // set default
				}
				
				if (atcJobStatus == '2') { // ORDERED
					// message = MSG1;
					
				} else if (atcJobStatus == '3') { // EXECUTABLE
					message = MSG2;
					
				} else if (atcJobStatus == '4') { // EXECUTING
					if (tmpContainerItem1.ytYArrivalTime == null || tmpContainerItem1.ytYArrivalTime.length == 0) {
						message = MSG3;
						
					} else {
						message = MSG4;
					}
				}
			} else if (jobToYard.length == 2) { // 2개의 작업이 있는 경우
				var tmpContainerItem1 = jobToYard[0];
				var tmpContainerItem2 = jobToYard[1];
				
				var atcJobStatus1 = tmpContainerItem1.atcJobStatus;
				if (atcJobStatus1 == null || atcJobStatus1.length == 0) {
					atcJobStatus1 = "2"; // set default
				}
				var atcJobStatus2 = tmpContainerItem2.atcJobStatus;
				if (atcJobStatus2 == null || atcJobStatus2.length == 0) {
					atcJobStatus2 = "2"; // set default
				}
					
				if (atcJobStatus1 == '4' || atcJobStatus2 == '4') { // EXECUTING
					if ((tmpContainerItem1.ytYArrivalTime == null || tmpContainerItem1.ytYArrivalTime.length == 0) &&
						(tmpContainerItem2.ytYArrivalTime == null || tmpContainerItem2.ytYArrivalTime.length == 0)) {
						message = MSG3;
						
					} else {
						message = MSG4;
					}
					
				} else if (atcJobStatus1 == '3' || atcJobStatus2 == '3') { // EXECUTABLE
					message = MSG2;
					
				} else if (atcJobStatus1 == '2' && atcJobStatus2 == '2') { // Both are ORDERED
					// message = MSG1;
				} 
			}
			
			fn_msgBoxText(message);
			
			// modified by jaeok (2021.02.15) related mail '[HJNC] YT 단말 화면 표시 변경' 2021-02-15'
			//fn_msgBoxTextSize(25, 500);
			fn_msgBoxTextSize(31, 700);
			
		} else {
			fn_msgBoxText("");	
		}
		*/
	}
}

function getContainerData(containerInfo){
	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	let mainJobArrayList = containerInfo.data;
	let existCntrList = [];
	
	// added by jaeok (2021.01.04) Mantis 0112226: YT CMTP 로 화면 표시 변경.
	var isConeAttached = "";
	for (var i = 0; i < mainJobArrayList.length; i++) {
		var containerItem = mainJobArrayList[i];
		if (containerItem.yardJobCode == "DF") { // 양하 작업일 경우
			if (containerItem.coneAttached == "Y") {
				isConeAttached = "Y";
			}
		}
	}
	
	for (var i =0; i<mainJobArrayList.length; i++) {
		
		var containerItem = mainJobArrayList[i];
		
		let yardJobCodeText = '';
		
		if (containerItem.yardJobCode != '') {
			yardJobCodeText = getYardJobCodeText(containerItem.yardJobCode);
		}
		
		// added by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B3
		containerItem.containerNoText = containerItem.containerNo;
		
		var jobState = containerItem.jobState;
		if (jobState.substring(0, 1) == "A" || jobState.substring(0, 1) == "B") { // 오더가 난 상태
			if (containerItem.yardJobCode == "DF") { // 양하 작업일 경우
				containerItem.containerNoText = "";
			}
		} else {
			// nothing to do
		}
		
		containerItem.yardJobCodeText = yardJobCodeText;
		
		// 상차 전/후
		if(containerItem.codeIndex != null && containerItem.codeIndex.length > 0){
			
			containerItem.loadingBeforeAfter = containerItem.codeIndex.substr(0, 1);
			
			if(containerItem.loadingBeforeAfter === CONSTANTS.LOADING.BEFORE) {
				existCntrList.push(containerItem.containerNo);
			}
		}
		
		// 컨테이너 위치
		var position= containerItem.cposition;
		
		if (position=="M") {
			containerItem.chassisPosition = CONSTANTS.CHASSIS_POSITION.MIDDLE;
		} else if (position=="A") {
			containerItem.chassisPosition = CONSTANTS.CHASSIS_POSITION.AFTER;
		} else if (position=="F") {
			containerItem.chassisPosition = CONSTANTS.CHASSIS_POSITION.FRONT;
		}
		
		// Door 위치
		// deleted by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B4
		//containerItem.doorDir = CONSTANTS.DOOR.AFTER;
		
		// Yard Position
		// modified by jaeok (2020.12.22) HJNC-CUSP-Controller v1.4 (1순위 2차분) CTR-206 B3
		//containerItem.toPosition = containerItem.targetPosition;
		containerItem.toPosition = containerItem.targetPosition;
		if (jobState.substring(0, 1) == "A" || jobState.substring(0, 1) == "B") { // 오더가 난 상태
			if (containerItem.yardJobCode == "DF") {
				//containerItem.toPosition += " " + containerItem.sbay + containerItem.sholdDeck;
				containerItem.toPosition = "" + containerItem.queueName + "  " + containerItem.qcLane + "  " +  containerItem.sbay + containerItem.sholdDeck
			}
			
		} else { // 작업이 상차된 상태
			// modified by jaeok (2021.01.04) Mantis 0112226: YT CMTP 로 화면 표시 변경.
			//if (containerItem.yardJobCode == "DF") { // 양하 작업일 경우
			//	if (containerItem.coneAttached == "Y") {
			//		containerItem.toPosition = "CMTP";
			//	}
			//}
			if (isConeAttached == "Y") {
				containerItem.toPosition = "Detachable Cone!";
			} else {
				if (containerItem.yardJobCode == "LO") {
					//containerItem.toPosition += " " + containerItem.sbay + containerItem.sholdDeck;
					containerItem.toPosition = "" + containerItem.queueName + "  " + containerItem.qcLane + "  " +  containerItem.sbay + containerItem.sholdDeck
				}
				
				if (containerItem.toPosition == "FDECK") {
					containerItem.toPosition = "Undetermined";
				}
			}
		}
		
		// Size
		if(containerItem.sizeType2.startsWith("2")){
			containerItem.size = CONSTANTS.CNTR_SIZE.SIZE_20;
		} else {
			containerItem.size = CONSTANTS.CNTR_SIZE.SIZE_40;
		}
		
		if (containerItem.cargoType == "RF" || containerItem.cargoType == "DR") {
			containerItem.cargoTypeDesc = "Reefer"; // modified by MinSeok(2021.08.17) reefer container display wrong cargo type.
			
		} else if (containerItem.cargoType == "AK") {
			containerItem.cargoTypeDesc = "OOG";
			
		} else if (containerItem.sizeType2.substring(2, 3) == "T") {
			containerItem.cargoTypeDesc = "Tank";
			
		} else {
			containerItem.cargoTypeDesc = "";
		}
		
		if (isConeAttached == "Y") {
			// added by jaeok (2021.01.04) Mantis 0112226: YT CMTP 로 화면 표시 변경.
			containerItem.status = "";
			containerItem.statusDesc = "";
		} else {
			var atcStatus = "";
			var atcStatusDesc = "";
			if (containerItem.atcJobStatus == '3') { // EXECUTABLE
				//if (containerItem.ytYArrivalTime.length > 0) {
				//	// 준비
				//	atcStatus = CONSTANTS.STATUS.READY;
				//	atcStatusDesc = CONSTANTS.STATUS_DESC.READY;
				//	
				//} else {
				//	// 도착
				//	atcStatus = CONSTANTS.STATUS.ARRIVAL;
				//	atcStatusDesc = CONSTANTS.STATUS_DESC.ARRIVAL;
				//}
				atcStatus = CONSTANTS.STATUS.READY;
				//atcStatusDesc = CONSTANTS.STATUS_DESC.READY;
				
			} else if (containerItem.atcJobStatus == '4') { // EXECUTING
				//// 준비
				//if (containerItem.ytYArrivalTime.length > 0) {
				//	atcStatus = CONSTANTS.STATUS.READY;
				//	atcStatusDesc = "";
				//} else {
				//	atcStatus = CONSTANTS.STATUS.ARRIVAL;
				//	atcStatusDesc = CONSTANTS.STATUS_DESC.READY;	
				//}
				atcStatus = CONSTANTS.STATUS.READY;
				if (containerItem.ytYArrivalTime.length > 0) {
					atcStatusDesc = "";
				} else {
					//atcStatusDesc = CONSTANTS.STATUS_DESC.READY;
				}
						
			} else {
				// 운행
				atcStatus = CONSTANTS.STATUS.OPERATION;
				//atcStatusDesc = CONSTANTS.STATUS_DESC.OPERATION;
			}

			if (containerItem.yardJobCode == "DF") { // modified by jaeok (2021.01.14) Mantis 0112464: [HJNC] YT 준비 => 준비 취소(도착으로 변경) 관련 내용.
				if (containerItem.jobState.substring(0, 1) == "B") {
					// 상태
					if (containerItem.ytArrivalTime.length > 0) { // added by jaeok (2021.01.11) Mantis 0112149: 양하작업 YT 도착 기능 확인
						containerItem.status = CONSTANTS.STATUS.READY;
						containerItem.statusDesc = "";
						
					} else {
						containerItem.status = CONSTANTS.STATUS.OPERATION;
						containerItem.statusDesc = "";
					}
				} else { 
					containerItem.status = atcStatus;
					containerItem.statusDesc = atcStatusDesc;
				}
			} else if (containerItem.yardJobCode == "LO") { // loading
				if (containerItem.jobState.substring(0, 1) == "C") {
					if (containerItem.ytArrivalTime.length > 0) {
						containerItem.status = CONSTANTS.STATUS.READY;
						containerItem.statusDesc = "";
					} else {
						containerItem.status = CONSTANTS.STATUS.OPERATION;
						containerItem.statusDesc = "";
					}
					
				} else {
					containerItem.status = atcStatus;
					containerItem.statusDesc = atcStatusDesc;
				}
			} else if (containerItem.yardJobCode == "YO") {
				if (containerItem.jobState.substring(0, 1) == "B") {
					containerItem.status = atcStatus;
					containerItem.statusDesc = atcStatusDesc;
					
				} else {
					
				}
			} else if (containerItem.yardJobCode == "YF") {
				if (containerItem.jobState.substring(0, 1) == "C") {
					containerItem.status = atcStatus;
					containerItem.statusDesc = atcStatusDesc;
										
				} else {

				}
			} else {
				// not defined
			}
		}
	}
	
	//Modified by MS.Kim (2022.10.24) 0133809: Lift Off Button
	const $btnLiftOff = document.getElementById('btnLiftOff');
	const $divLiftOff = document.getElementById('divLiftOff');
	if ($btnLiftOff != null && $divLiftOff != null) {
		$btnLiftOff.disabled = true;
		$divLiftOff.style.opacity = "0.7";
	}
/*
	if(existCntrList.length > 0) {
		$btnLiftOff.disabled = true;
		$divLiftOff.style.opacity = "0.7";
	} else {
		$btnLiftOff.disabled = false;
		$divLiftOff.style.opacity = 1;
	}
*/
	
	return mainJobArrayList;
}

/**
 * ***********************************************************
 * DRAWING EVENT AREA START
 */

function addEventOfJobListView(){
	$('#btnJobChange').bind('click', btnJobChangeClicked);
}

/**
 * 작업 교체 버튼 클릭시 호출
 * @param e
 * @returns
 */
function btnJobChangeClicked(e) {
	
	if (ytRenderer.containerInfo != null) {
		let jobArrayList = ytRenderer.containerInfo.data;
		
		// EXECUTING 상태일 경우 허용하지 않는다.
		for (var i = 0; i < jobArrayList.length; i++) {
			if (jobArrayList[i].atcJobStatus == '4') { // EXECUTING
				tsbAlert.alert.getInstance().Info(YT014); // 작업이 진행중입니다.
				return;
			}
		}
		
		// added by jaeok (2021.02.16) related mail '[HJNC] Web YT '작업교대' 기능 정리'
		if (jobArrayList != null && jobArrayList.length > 0) {
			tsbAlert.alert.getInstance().Info(YT009); // 작업중. 절대 움직이지 마세요.
			return;
		}
	}
	
	//uiCommon.common.getInstance().blockScreen();
	//$("#areaChangeJobInfos").empty(); // CLEAR SCREEN
	$.mobile.changePage('#selectChangeJobPage','slide','reverse');
}

/**
 * 컨테이너를 클릭해서 작업 상태가 변경 되면 호출 됨.
 * 이전 상태 : containerItem.prevStatus
 * 현재 상태 : containerItem.status
 * 
 * <작업 상태 변경 메시지>
 * 도착 : T30 + AR
 * 준비 : T30 + YA
 * 준비 취소 변경(도착): T30 + YAC
 * @param containerItem
 * @returns
 */
function containerStatusChange(containerItem) {
	// added by jaeok (2021.01.04) Mantis 0112226: YT CMTP 로 화면 표시 변경.
	if (ytRenderer.containerInfo != null) {
		let jobArrayList = ytRenderer.containerInfo.data;
		for (var i = 0; i < jobArrayList.length; i++) {
			var tmpContainerItem = jobArrayList[i];
			if (containerItem.yardJobCode == "DF") { // 양하 작업일 경우
				if (tmpContainerItem.coneAttached == "Y") {
					return;
				}
			}
		}
	}
	
	if (ytRenderer.containerInfo != null) {
		let jobArrayList = ytRenderer.containerInfo.data;
		if (jobArrayList != null && jobArrayList.length > 1) {
			var tmpContainerItem1 = jobArrayList[0];
			var tmpContainerItem2 = jobArrayList[1];
			
			if (tmpContainerItem1.atcJobStatus == '3' &&
				tmpContainerItem2.atcJobStatus == '3') { // both are EXECUTABLE
				
				if (containerItem.cposition == 'A') {
					tsbAlert.alert.getInstance().Info(YT015); // 앞 작업을 선택하세요."
					return;
				}
			}
			
			if (tmpContainerItem1.atcJobStatus == '4' ||
				tmpContainerItem2.atcJobStatus == '4') { // 둘중 하나라도 EXECUTABLE일 경우
				
				if (containerItem.atcJobStatus == '4') {
					// ok
				} else {
					tsbAlert.alert.getInstance().Info(YT016); // "프로세싱 중인 작업을 선택하세요."
					return;
				}
			}
		}
	}
	
	// 작업 가능한 상태가 아닐 경우 터치 막음.
	var atcJobStatus = containerItem.atcJobStatus;
	if (atcJobStatus == null || atcJobStatus.length == 0) {
		atcJobStatus = "2"; // set default
	}
	if (atcJobStatus == '2' || atcJobStatus == '3' || atcJobStatus == '4') {
		// ok
	} else {
		tsbAlert.alert.getInstance().Info(YT017 + " (AtcJobStatus = " + atcJobStatus + ")"); // 작업을 할 수 없는 상태입니다.
		return;
	}
	
	// added by jaeok (2021.01.11) Mantis 0112149: 양하작업 YT 도착 기능 확인
	// 양하작업이 컨테이너를 받으러 가기 위해 Quay에 도착했으면 더이상 처리하지 않는다. 
	if (containerItem.yardJobCode == "DF") {
	    if (containerItem.jobState.substring(0, 1) == "B") {
	    	//if (containerItem.ytArrivalTime != null && containerItem.ytArrivalTime.length > 0) {
	    	//	return;
	    	//}
			tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT018);//" 컨테이너가 상차되지 않았습니다.");
			return;
			
	    } else {
		    if (containerItem.block != null && containerItem.block.length > 0) {
		    	// ok
		    } else {
				tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT019);//" 도착위치가 블록이 아닙니다.");
		    	return;
		    }

			if (containerItem.atcJobStatus == '4') {
				if (containerItem.ytYArrivalTime.length > 0) {
					tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT020);//" 준비중입니다.");
					return;
				} else {
					
				}
			} else if (containerItem.atcJobStatus == '3') { // EXECUTABLE
				//tsbAlert.alert.getInstance().Info("준비를 할 수 없는 상태입니다.");
				//return;
			}
	    }

	} else if (containerItem.yardJobCode == "LO") {
		if (containerItem.jobState.substring(0, 1) == "B") {
			if (containerItem.block != null && containerItem.block.length > 0) {
		    	// ok
		    } else {
				tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT019);//" 도착위치가 블록이 아닙니다.");
		    	return;
		    }

			if (containerItem.atcJobStatus == '4') { // EXECUTING
				if (containerItem.ytYArrivalTime.length > 0) {
					tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT020);//" 준비중입니다.");
					return;
				} else {
					
				}
			} else if (containerItem.atcJobStatus == '3') { // EXECUTABLE
				//tsbAlert.alert.getInstance().Info("준비를 할 수 없는 상태입니다.");
				//return;
			}
			
		} else if (containerItem.jobState.substring(0, 1) == "C") {
			//if (containerItem.ytArrivalTime != null && containerItem.ytArrivalTime.length > 0) {
	    	//	return;
	    	//}
			tsbAlert.alert.getInstance().Info(containerItem.containerNo + YT018);//" 컨테이너가 상차되지 않았습니다.");
			return;
		}
		
	} else if (containerItem.yardJobCode == "YO") {
		if (containerItem.jobState.substring(0, 1) == "B") {
			if (containerItem.block != null && containerItem.block.length > 0) {
		    	// ok
		    } else {
				tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT019);//" 도착위치가 블록이 아닙니다.");
		    	return;
		    }

			if (containerItem.atcJobStatus == '4') { // EXECUTING
				if (containerItem.ytYArrivalTime.length > 0) {
					tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT020);//" 준비중입니다.");
					return;
					
				} else {
					
				}
			} else if (containerItem.atcJobStatus == '3') { // EXECUTABLE
				//tsbAlert.alert.getInstance().Info("준비를 할 수 없는 상태입니다.");
				//return;
			}
		} else {
			tsbAlert.alert.getInstance().Info(containerItem.containerNo + YT018);//" 컨테이너가 상차되지 않았습니다.");
			return;
		}
	} else if (containerItem.yardJobCode == "YF") {
	    if (containerItem.jobState.substring(0, 1) == "C") {
		    if (containerItem.block != null && containerItem.block.length > 0) {
		    	// ok
		    } else {
				tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT019);//" 도착위치가 블록이 아닙니다.");
		    	return;
		    }

			if (containerItem.atcJobStatus == '4') {
				if (containerItem.ytYArrivalTime.length > 0) {
					tsbAlert.alert.getInstance().Info(containerItem.containerNo + " " + YT020);//" 준비중입니다.");
					return;
					
				} else {
					
				}
			} else if (containerItem.atcJobStatus == '3') { // EXECUTABLE
				//tsbAlert.alert.getInstance().Info("준비를 할 수 없는 상태입니다.");
				//return;
			}
	    } else {
			tsbAlert.alert.getInstance().Info(containerItem.containerNo + YT018);//" 컨테이너가 상차되지 않았습니다.");
			return;
		}
	}

	if (uiCommon.common.getInstance().isBlocked() == false) {
		uiCommon.common.getInstance().blockScreen();
	}

	var url = '/yt/containerStatus';
	
	var params = {
			containerItem : containerItem
		};
	
	ajaxPost(url, params, function(data) {
		// 컨테이너 두개 있을 경우 하나의 데이터로만 업데이트 가능하도록 수정 필요
		//getYTJobList();
	});	
}

/**
 * Door 영역을 클릭 했을 때 발생
 * 컨테이너 문 위치 : containerItem.doorDir
 * @param containerItem
 * @returns
 */
function doorDirectionChange(containerItem) {	
	var url = '/yt/changeDoorDirection';
	
	var params = {
		yardTruckNo : getSessionItem('yardTruckNo'),
		containerItem : containerItem
	};
	
	ajaxPost(url, params, function(data){
		getYTJobList();
	});	
}

/**
 * 컨테이너 영역을 클릭 했을 때 발생
 * 컨테이너 번호 : containerItem.containerNo
 * @param containerItem
 * @returns
 */
function containerClick(containerItem){
	
}

/**
 * 컨테이너 이외의 영역을 클릭 했을 때 발생
 * @param e
 * @returns
 */
function etcClick(e){
	
}
/**
 * DRAWING EVENT AREA END
 * ***********************************************************
 */

/**
 * Ship Job Item를 만들어 준다.
 * @returns
 */
function getShipJobItem() {
	let _drawTextItems = [];
	let _widthDivideCount = 0;
	let _lane = "";
	let _lanePostfix = "";
	let _dischargingCount = ""; // added by jaeok (2021.04.02) Mantis 0114620: YT 단말기 작업 구현(작업 순서)
	
	if (gbYtStatusItem == null || gbYtStatusItem.ytQuayStatusItemList == null) {
		_widthDivideCount = 0;
		
		if (gbYtStatusItem == null) {
			_lane = "";
		} else {
			_lane = gbYtStatusItem.targetPos;
		}
		
		//_drawTextItems = [
		//	{ytNo : "", isArrive : false, positonX : 1, isMyPos : false}
		//];
		
	} else {
		_widthDivideCount = gbYtStatusItem.ytQuayStatusItemList.length;
		_lane = gbYtStatusItem.targetPos;
		
		for (let i = 0; i < _widthDivideCount; i++) {
			let ytQuayStatusItem = gbYtStatusItem.ytQuayStatusItemList[i];
			let sequenceDesc = "";
			if (ytQuayStatusItem.operationBaySeq1.length > 0 && ytQuayStatusItem.operationBaySeq2.length > 0) {
				sequenceDesc = ytQuayStatusItem.operationBaySeq1 + "/" + ytQuayStatusItem.operationBaySeq2;
			} else if (ytQuayStatusItem.operationBaySeq1.length > 0) {
				sequenceDesc = ytQuayStatusItem.operationBaySeq1;
			} else if (ytQuayStatusItem.operationBaySeq2.length > 0) {
				sequenceDesc = ytQuayStatusItem.operationBaySeq2;
			}
			
			// added by jaeok (2021.03.04) Mantis 0113794: YT 단말기 작업 구현
			let holdDeck = "";
			if (ytQuayStatusItem.holdDeck1.length > 0 && ytQuayStatusItem.holdDeck2.length > 0) {
				holdDeck = ytQuayStatusItem.holdDeck1 + "/" + ytQuayStatusItem.holdDeck2;
			} else if (ytQuayStatusItem.holdDeck1.length > 0) {
				holdDeck = ytQuayStatusItem.holdDeck1;
			} else if (ytQuayStatusItem.holdDeck2.length > 0) {
				holdDeck = ytQuayStatusItem.holdDeck2;
			}
			
			var ytNo = ytQuayStatusItem.ytNo;
			if (ytNo.startsWith("YT") == true) {
				ytNo = ytNo.substr(2, 3);
			}
			
			let item = {
				ytNo : ytNo,
				holdDeck : holdDeck, // added by jaeok (2021.03.04) Mantis 0113794: YT 단말기 작업 구현
				isArrive : ytQuayStatusItem.isArrived == "Y" ? true : false,
				positonX : i + 1,
				isMyPos : ytQuayStatusItem.isMyJob == "Y" ? true : false
			}

			_drawTextItems.push(item);
		}
		//_drawTextItems = [
		//	{ytNo : "YT102(19)", isArrive : false, positonX : 2},
		//	{ytNo : "YT103(17)", isArrive : true, positonX : 4},
		//	{ytNo : "YT502(21)", isArrive : false, positonX : 6, isMyPos : true},
		//	{ytNo : "YT501(31)", isArrive : true, positonX : 8}
		//];
		
		// added by jaeok (2021.04.02) Mantis 0114620: YT 단말기 작업 구현(작업 순서)
		if (gbYtStatusItem.dischargingCount == null || gbYtStatusItem.dischargingCount == "") {
			// nothing to do
		} else { 
			_dischargingCount = WRD_CTTA_DISPLAY_JOB_CODE_DS + '(' + gbYtStatusItem.dischargingCount + ")"; // 양하 LBAP-029
		}
	}
	
	if (_lane.length > 0) {
		_lanePostfix = CONSTANTS.POSTFIX.LANE;
	}
	
	let shipJobItem = {
		widthDivideCount : _widthDivideCount + 1,
		fontSize : 1.0,
		laneName : _lane,
		lanePostfix : _lanePostfix,
		dischargingCount : _dischargingCount, // added by jaeok (2021.04.02) Mantis 0114620: YT 단말기 작업 구현(작업 순서)
		arriveText : WRD_CTTA_DISPLAY_JOB_CODE_DS,
		notArriveText : LBYT_022,
		drawTextItems : _drawTextItems
	};
	
	return shipJobItem;
}

function getYardJobItem() {
	let _drawTextItems = [];
	let _widthDivideCount = 0;
	let _blockName = "";
	let _blockNamePostfix = "";
	
	if (gbYtStatusItem == null || gbYtStatusItem.ytYardStatusItemList == null) {
		_widthDivideCount = 0;
		_blockName = "";
		_drawTextItems = [
				{position : 1, count : "", bay : "", isUpTriangle : false, isDownTriangle : false, isUpMyPos : false, isDownMyPos : true}
			];
	} else {
		_widthDivideCount = gbYtStatusItem.ytYardStatusItemList.length;
		_blockName = gbYtStatusItem.targetPos;
		
		for (let i = 0; i < _widthDivideCount; i++) {
			let ytYardStatusItem = gbYtStatusItem.ytYardStatusItemList[i];
			
			let item = {
				position : i + 1, 
				count : ytYardStatusItem.jobCount, 
				bay : ytYardStatusItem.bayNo,
				
				//isUpTriangle : ytYardStatusItem.isLiftOff == "Y" ? true : false,
				//isDownTriangle : ytYardStatusItem.isLiftOn == "Y" ? true : false,
				isUpTriangle : ytYardStatusItem.isLiftOff == false,
				isDownTriangle : ytYardStatusItem.isLiftOn == false,
				
				isUpMyPos :  ytYardStatusItem.isMyJob == "Y" ? true : false
			};
			_drawTextItems.push(item);
		}
		
		//_drawTextItems = [
		//		{position : 1, count : "2", bay : "11", isUpTriangle : true, isDownTriangle : false, isUpMyPos : true},
		//		{position : 2, count : "4", bay : "23", isUpTriangle : true, isDownTriangle : true, isUpMyPos : true},
		//		{position : 3, count : "3", bay : "41", isUpTriangle : false, isDownTriangle : true, isDownMyPos : true}
		//	];
	}
	if (_blockName.length > 0) {
		_blockNamePostfix = CONSTANTS.POSTFIX.BLOCK;
	}
	
	let yardJobItem = {
		widthDivideCount : _widthDivideCount + 1,
		blockName : _blockName,
		blockNamePostfix : _blockNamePostfix,
		fontSize : 1.5,
		drawTextItems : _drawTextItems
	};
	
	return yardJobItem;
}


/**
 * ***********************************************************
 * Job Change AREA Start
 */
function searchJobChangeList(ytNo) {
	var url = '/yt/searchChangeJob';
	
	var params = {
			mMode 			: 'JP',
			yardTruckNo   	: getSessionItem('yardTruckNo'),
			changeYardTruckNo : ytNo
		};
	
	ajaxPost(url, params, function(data){
		searchJobChangeListReceive(data.response);
	});	
}

function searchJobChangeListReceive(e){
	uiCommon.common.getInstance().unBlockScreen();
	var ytInfoList = e.data;
	var count = ytInfoList.length;
	if (count == 0) {
		return;
	}
	
	var containerDivName = 'areaChangeJobInfos';
	var divField = document.getElementById(containerDivName);
	
	var ytNo = ytInfoList[0];
	var ytData = ytInfoList[1];
	if (ytNo.length == 0) {
		return;
	}
	
	if (ytNo != getSessionItem('yardTruckNo')) {
		var objectId = 'rowDivJobList' + ytNo;

		// Row part
		var rowDiv = document.createElement("div");
		rowDiv.id = objectId;
		rowDiv.className = "ui-grid-solo ui-responsive";
		document.getElementById(containerDivName).appendChild(rowDiv);   
		
		// 1개의 row안에 들어갈 버튼 
		var maDiv = document.createElement("button");
        maDiv.id = 'id_jc_de_la_div'+"0";

	    var innerText = ytNo + " - " + ytData;
        maDiv.appendChild(document.createTextNode(innerText));
        maDiv.setAttribute('class','tempTypeStyle');
        maDiv.setAttribute('data-to_yt', ytNo);
        maDiv.onclick = doSnatchingJob;
        document.getElementById(objectId).appendChild(maDiv);
    }
}

function doSnatchingJob(e) {
	var to_yt = e.currentTarget.getAttribute('data-to_yt');
	
	var url = '/yt/snachingJob';
	
	var params = {
			mMode 			: 'ST',
			yt_no			: getSessionItem('yardTruckNo'),
			to_yt			: to_yt
		};
	
	ajaxPost(url, params, function(data) {
		$.mobile.changePage('#jobListPage','slide','reverse'); // Job List 페이지로 전환
		getYTJobList();
	});	
}

function extractChangeJobInfoList(allList) {
	
	var resultList = [];
	var allListCount = allList.length;
	
	for(var i =0; i<allListCount; i++) {
		
		if(allList[i].type == "YT") {
			resultList.push(allList[i]);
		}
	}
	
	return resultList;
}

/* 메시지박스: 텍스트 내용 변경 */
function fn_msgBoxText(pMsg) {
	$("#msgBox").show();
	$("#msgBoxTxt").text(pMsg);
}

/* 메시지박스: 텍스트 내용 변경(Html) : '안녕 <b>하세요</b> */
function fn_msgBoxHtml(pMsg) {
	$("#msgBoxTxt").html(pMsg);
}

/* 메시지박스: 텍스트 크기 변경 */
function fn_msgBoxTextSize(psize, pBold) {
	$("#msgBoxTxt").css("font-size", psize + "px");
	if(pBold !== undefined) {	// 굵기 조절: 기본(500)
		$("#msgBoxTxt").css("font-weight", pBold);
	}
}

/* 메시지박스: 텍스트 색상 변경 - RGP (Ex = #737373) */
function fn_msgBoxTextColor(pColor) {
	$("#msgBoxTxt").css("color", pColor);
}

/* 메시지박스: 배경색 변경 RGP (기본: #FFFFFF)  */
function fn_msgBoxBackColor(pColor) {
	$("#msgBox").css("background-color", pColor);
}

/**
 * Job Change AREA END
 * ***********************************************************
 */