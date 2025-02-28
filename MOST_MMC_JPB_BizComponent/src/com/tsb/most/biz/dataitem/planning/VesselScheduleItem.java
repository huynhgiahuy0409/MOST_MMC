/**
* VesselScheduleItem.java
*
* Created on   : 2007-07-03
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.4 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* 2007-07-03   Mr Luis Lee	1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.planning;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

public class VesselScheduleItem extends DataItem{

    private String vslCd;          
    private String callYear;       
    private String callSeq;        
    private String jpvcNo;         
    private String shipCallNo;    
    private String inbVoy;         
    private String outbVoy;        
    private String berthTp;        
    private String berthLoc;       
    private String berthDtm;       
    private String purpCall;       
    private String purpCallCd;       
    private String cgOpTp;        
    private String ispsLevel;      
    private String summitStat;     
    private String summitStatName;
    private String deptTp;         
    private String vcDiv;          
    private String stowwYn;        
    private String armsYn;         
    private String dgGoodYn;      
    private String dgStatus;
    private String advImmgYn;     
    private String vsRmk;
    private String drfArrv;        
    private String drfDeptr;       
    private String inbServLane;   
    private String outbServLane;  
    private String highestPoint;   
    private String yot;             
    private String yct;             
    private String clrYymm;        
    private String insDtm;         
    private String insUserId;     
    private String updDtm;         
    private String updUserId;     
    private String arrvSaId;   
    private String arrvSaNm; 
    private String depSaId;   
    private String depSaNm; 
    private String accNo; 
    private String deprSaId;      
    private String loaSum;         
    private String bargeAftPort;  
    private String bargeAftStbd;  
    private String bargeForwPort; 
    private String bargeForwStbd; 
    private String bargeTugVsl1;  
    private String bargeTugVsl2;  
    private String bargeTugVsl3;  
    private String layupLightDisp;
    private String layupExpectInitDt;
    private String layupPurp;      
    private String layupAnticipReriod;
    private String layupForeDrf;  
    private String layupAftDrf;   
    private String layupLoadForeDrf;
    private String layupLoadDisp; 
    private String layupLoadAftDrf;
    private String vslOperator;    
    private String pilotOnboard;   
    private String pilotDisembark;
    private String pilotBookDateTime;
    private String etaFixYn;      
    private String zb55Status;     
    private String zb55RegNo;     
    private String berthAlongside; 
    private String approveUserId; 
    private String approveDtm;     
    private String berthDiv;       
    private String flatJpvc;       
    private String loadCargo;      
    private String dischCargo;     
    private String loadCargoQty;  
    private String dischCargoQty; 
    private String shiftCargoQty; 
    private String submitRmk;      
    private String inmarsatNo;     
    private String mmsiCd;         
    private String vslNm;          
    private String bldYear;        
    private String shipOfficialNo;
    private String vslTp1Vsl;     
    private String vslTp2Term;    
    private String vslTp3Trade;   
    private String domYn;          
    private String callSign;       
    private String vslFlagCd;     
    private String cntryCd;        
    private String vslTp;
    private String vslTpNm;
    private String vslRegPort;    
    private String regDt;          
    private String vslCustCd;     
    private String saCustCd;      
    private String imoNo;          
    private String vclass;           
    private String lstDrydock;     
    private String loa;             
    private String lbp;             
    private String vslWidth;       
    private String vslMxWidth;    
    private String vslDepth;       
    private String summDrf;        
    private String topTier;        
    private String antnHgt;        
    private String bowDist;        
    private String sternDist;      
    private String disp;            
    private String floatCraneYn;  
    private String craneSide;      
    private String alongSide;      
    private String isscNo;
    private String isscNmAuth;    
    private String nrt;             
    private String grt;             
    private String dwt;             
    private String baleCapa;       
    private String grainCapa;      
    private String engDesc;        
    private String engBhp;         
    private String speed;           
    private String mxTeu;          
    private String hatchQty;       
    private String mxRowDeck;     
    private String mxRowHold;     
    private String statCd;  
    private String natCd;          
    private String servTp;         
    private String vhfYn;          
    private String vslOutr;        
    private String mapassOfficialNo;
    private String mapassRegPort; 
    private String confConstumYn; 
    private String shipEmail;      
    private String launchDt;       
    private String outr;            
    private String vslDiv;         
    private String saCorpId;      
    private String crewNo;         
    private String navEqu;         
    private String bunkerCond;     
    private String consumSea;      
    private String freshwtCond;    
    private String apprxDist;      
    private String towingSpeed;    
    private String comptyOfficer;  
    private String tradCerti;      
    private String towingEq;       
    private String confirmUserId; 
    private String confirmDtm;     
    private String shipGear;       
    private String rpmType;        
    private String remarks;         
    private String terminalType;   
    private String vslTpTrade;    
    private String shippingLineCd;
    private String confirm;
    private String status;
    private String wharfMarkFrom;
    private String wharfMarkTo;
    private String vslOwner;
    private String confirmationSlip;
    private String ispsYn;
    private String dbYn;
    private String csYn;

    private String mptsStatus;
    private String dgDeclaration;
    private String mptsStatusNm;
    private String balance;
    private String mt;
    private String shipper;
    private String consignee;
    private String operationType;
    private String opeHr;
    private String packingList;
    private String accnt;
    private String nextPort;
    private String lastPort;
    private String vslSchDate;
    private String cargoTp;
    private String vslColor;
    private String berthPlanYn;
    private String atbPilot;
    private String atbMooring;
    private String atbTug;
    private String atuPilot;
    private String atuMooring;
    private String atuTug;

    private String maxCrc;
    private String saLoginId;
    private String motherVslCallId;
    private String dbVslCallId;
    private String stowagePlan;
    private String schStatus;
    private String berthAprvUserId;
    private String amendedBy;
    private String ldStatus;
    private String comodityCode;
    private String curPage;
    private String rn;
    private String totalPage;
    
    private String invoiceStatus;
    private String csStatus;
    private String ogaStatus;
    private String ogaQuarantine;
    private String ogaApprovalBy;
    private String configDoc;
    private String cgTpCdDoc;
    private String bbtLoc;
    
    private Date eta;
    private Date etd;
    private Date etw;
    private Date etu;
    private Date etb;
    private Date etc;
    private Date ata;
    private Date atd;
    private Date atb;
    private Date curAtb;             
    private Date btr;
    private Date isscExprDt;
    private Date ogaStatusDate;
    private String ogaStatusDateRpt;
    private Date amendDate;
    private Date sumitDt;
    private String etaDayMonth;
    private String etaHour;
    private String isFileUpload;
    private String isCs1;
    private String isIvAdv;
    private String commodityNm;
    private String berthLabel;
    private String wharvesRemark;
    private String maturityTime;
    private String dischargeMt;
    private String loadingMt;
    private String berthLabelNm;
    private String no;
    private String vslCallId;
    private String cgTpCd;
    private String seq;
    private String workYmd;
    private String shftNm;
    private String shftId;
    private Date atu;
    private Date atw;
    private Date atc;
    private String lastCallPort;
    private String hoseOnDt;		//HOSE_ON_DT	DATE
    private String hoseOffDt;		//HOSE_OFF_DT	DATE
    private String totFlxLdQty;
    private String totFlxDsQty;
    private String totArmLdQty;
    private String totArmDsQty;
    private String estPductInhr;
    private String estHrForOpe;
    private String tkOpr;
    private String tkOpr2;
    private String tkOpr3;
    private String tkOpr4;
    private String jobTpCd;
    private String blNo;

    private String loadPlanMt;
    private String disPlanMt;
    private String loadActualMt;
    private String disActualMt;

    private String loadPlanMtG;
    private String disPlanMtG;
    private String loadActualMtG;
    private String disActualMtG;

    private String loadPlanMtS;
    private String disPlanMtS;
    private String loadActualMtS;
    private String disActualMtS;

    private String loadPlanMtT;
    private String disPlanMtT;
    private String loadActualMtT;
    private String disActualMtT;

    private String loadTotMt;
    private String disTotMt;
    
    private String tkNo;
    
    //DELAY Info
    private String delayCode;		//DLY_CD
    private String hatchNo;			//HATCH_NO
    private String eqNo;			//EQ_NO
    private String startTime;		//ST_DT
    private String endTime;			//END_DT
    private String accDelay;		//ACPT_DLY_YN
    private String remark;			//RMK
    private String delayDesc;
    private String timeHourly;
    private String timeHourMin;
    private String totalHRS;
    
    //CARGO Info
    private String shpr;			//SHPR
    private String cnsne;			//CNSNE
    private String hoseTpCd;		//HOSE_TP_CD
    private String tonHdlAmt;		//TON_HDL_AMT	NUMBER
    private String pumpRate;		//PUMP_RATE		NUMBER
    private String stDt;			//ST_DT			DATE
    private String endDt;			//END_DT		DATE
    private String jobCmplYn;		//JOB_CMPL_YN
    private String hoseCmplYn;		//HOSE_CMPL_YN
    private String cmdtCd;			//CMDT_CD
    private String flxTotLine;		//LOAD_HOSE_QTY + DSCH_HOSE_QTY
    private String armTotLine;		//LOAD_ARM_QTY + DSCH_ARM_QTY
    private String pol;				//POL
    private String fdest;			//POD
//    private String fDest;
    //Line Qty of Hose for updating 
    private String loadHoseQty;		//LOAD_HOSE_QTY
    private String dschHoseQty;		//DSCH_HOSE_QTY
    private String loadArmQty;		//LOAD_ARM_QTY
    private String dschArmQty;		//DSCH_ARM_QTY

    private String insertType;
    
    private String userId;
    private String genOprYn;
    private String stsOprYn;
    private String tlsOprYn;
    
    private String opeTp;
    private String fender;
    
    private String shprCnsne;
    private String pkgTpCd;
    private String lineNo;
    
    private String seqOrder;
    private String a;
    private String b;
    private String c;
    private String d;
    private String f;
    private String i;
    private String k;
    private String l;
    private String o;
    private String p;
    private String seqCS2;
    private String disPlanMtSts;
    private String loadPlanMTSts;
    private String disPlanMtTls;
    private String loadPlanMtTls;
    private String loadPlanMt_h;
    private String disPlanMt_h;
    private String loadPlanMtSts_h;
    private String disPlanMtSts_h;
    private String loadPlanMtTls_h;
    private String disPlanMtTls_h;
    
    private String vslShiftingSeq;
 	private String vslShiftingYN;
    private String wgtBbkDbk;
    private String wgtLq;
    
    private VesselScheduleItem vesselScheduleListDetail;
    
    private ArrayList<VesselScheduleItem> items;
    private ArrayList<VesselScheduleItem> berthAndOperationInfo;
    private ArrayList<VesselScheduleItem> vorSummary;
    private ArrayList<VesselScheduleItem> cargoSummary;
    private ArrayList<VesselScheduleItem> delaySummary;
    private ArrayList<VesselScheduleItem> vorDelaySummary;
    private ArrayList<VesselScheduleItem> amountCargoSummary;
    private ArrayList<VesselScheduleItem> vorLiquidBulk;
    private ArrayList<FileUploadItem> uploadItems;
    
    private List cmdtList;
    private List lineList;
    private List shiftList;
    private List confirmationSlipList;
    private List confirmationSlipOperationType;
    private List vesselInformation;
    private List berthInfo;
    
    private String searchType;
    private String balLoadMt;
    private String balDisMt;
    
    private String domesticChk;
    
    // ConfirmationSlip Header
 	private String opeTpCd;
 	private String shreTk;
 	private String fileCatgCd;
 	private String forwarder;
 	
 	// ConfirmationSlip Detail
 	private String cgTpNm;
 	private String cmdtCdNm;
 	private String workHatchNo;
 	private String clnCd;
 	private String topCgCd;
 	private String topCln;
 	private String tmnlOpr;
 	private String unno;
 	private String imdg;
 	private String dgTol;
 	private String dgSeq;
 	private String dgChk;
    
 	private String cgOptTpCd;	// Cargo Operation
	private String cgOptTpNm;	// Cargo Operation Name
	private String opeTpNm;		// Operation Type Name
	
	private String priorityYn;
	private String mthrVslCallId;
	private String opeType;
	
	private Date tempRedyDt;
	private Date docRedyDt;
	private Date cgRedyDt;
	private Date ultgRedyDt;
	private Date tkRedyDt;  
	
	private String workingStatus;
	
	private int crc;
	private long nofLines;
	private long workDd;
	private double wgt;
	private double msrmt;
	private double qty;
	private String ptnrCd;
    private String ptnrTpCd;
    
    private String cmdtGrCd;
    private String delvTpCd;
    private String delvTpNm;
    private String isValidated;
    private String scd;
    private String scdNm;
    private String stevedore;
    private String readinessAta;
    private String vslDlRsn;
    private String scn;
    private String eqTpCd;
    private String hatchSeq;
    private String cgWgt;
    
    public String getCgWgt() {
		return cgWgt;
	}
	public void setCgWgt(String cgWgt) {
		this.cgWgt = cgWgt;
	}
	public String getHatchSeq() {
		return hatchSeq;
	}
	public void setHatchSeq(String hatchSeq) {
		this.hatchSeq = hatchSeq;
	}
	public String getEqTpCd() {
		return eqTpCd;
	}
	public void setEqTpCd(String eqTpCd) {
		this.eqTpCd = eqTpCd;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getReadinessAta() {
		return readinessAta;
	}
	public void setReadinessAta(String readinessAta) {
		this.readinessAta = readinessAta;
	}
	public String getVslDlRsn() {
		return vslDlRsn;
	}
	public void setVslDlRsn(String vslDlRsn) {
		this.vslDlRsn = vslDlRsn;
	}
	public String getConfigDoc() {
        return configDoc;
    }
    public String getCgTpCdDoc() {
        return cgTpCdDoc;
    }
    public void setCgTpCdDoc(String cgTpCdDoc) {
        this.cgTpCdDoc = cgTpCdDoc;
    }
    public String getBbtLoc() {
        return bbtLoc;
    }
    public void setBbtLoc(String bbtLoc) {
        this.bbtLoc = bbtLoc;
    }
    public void setConfigDoc(String configDoc) {
        this.configDoc = configDoc;
    }
    public String getInvoiceStatus() {
        return invoiceStatus;
    }
    public void setInvoiceStatus(String invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }
    public String getComodityCode() {
        return comodityCode;
    }
    public void setComodityCode(String comodityCode) {
        this.comodityCode = comodityCode;
    }
    public String getIssNo() {
        return issNo;
    }
    public void setIssNo(String issNo) {
        this.issNo = issNo;
    }
    private String issNo;

    
    public String getAccNo() {
        return accNo;
    }
    public void setAccNo(String accNo) {
        this.accNo = accNo;
    }
    public String getArrvSaNm() {
        return arrvSaNm;
    }
    public void setArrvSaNm(String arrvSaNm) {
        this.arrvSaNm = arrvSaNm;
    }
    public String getAmendedBy() {
        return amendedBy;
    }
    public void setAmendedBy(String amendedBy) {
        this.amendedBy = amendedBy;
    }
    public String getBerthAprvUserId() {
        return berthAprvUserId;
    }
    public void setBerthAprvUserId(String berthAprvUserId) {
        this.berthAprvUserId = berthAprvUserId;
    }
    public String getSchStatus() {
        return schStatus;
    }
    public void setSchStatus(String schStatus) {
        this.schStatus = schStatus;
    }
    public String getStowagePlan() {
        return stowagePlan;
    }
    public void setStowagePlan(String stowagePlan) {
        this.stowagePlan = stowagePlan;
    }
    public String getDbVslCallId() {
        return dbVslCallId;
    }
    public void setDbVslCallId(String dbVslCallId) {
        this.dbVslCallId = dbVslCallId;
    }
    public String getMotherVslCallId() {
        return motherVslCallId;
    }
    public void setMotherVslCallId(String motherVslCallId) {
        this.motherVslCallId = motherVslCallId;
    }

    public String getSaLoginId() {
        return saLoginId;
    }
    public void setSaLoginId(String saLoginId) {
        this.saLoginId = saLoginId;
    }
    public String getMaxCrc() {
        return maxCrc;
    }
    public void setMaxCrc(String maxCrc) {
        this.maxCrc = maxCrc;
    }
    public String getPurpCallCd() {
        return purpCallCd;
    }
    public void setPurpCallCd(String purpCallCd) {
        this.purpCallCd = purpCallCd;
    }
    public String getAtbMooring() {
        return atbMooring;
    }
    public void setAtbMooring(String atbMooring) {
        this.atbMooring = atbMooring;
    }
    public String getAtbPilot() {
        return atbPilot;
    }
    public void setAtbPilot(String atbPilot) {
        this.atbPilot = atbPilot;
    }
    public String getAtbTug() {
        return atbTug;
    }
    public void setAtbTug(String atbTug) {
        this.atbTug = atbTug;
    }
    public String getAtuMooring() {
        return atuMooring;
    }
    public void setAtuMooring(String atuMooring) {
        this.atuMooring = atuMooring;
    }
    public String getAtuPilot() {
        return atuPilot;
    }
    public void setAtuPilot(String atuPilot) {
        this.atuPilot = atuPilot;
    }
    public String getAtuTug() {
        return atuTug;
    }
    public void setAtuTug(String atuTug) {
        this.atuTug = atuTug;
    }
    public String getBerthPlanYn() {
        return berthPlanYn;
    }
    public void setBerthPlanYn(String berthPlanYn) {
        this.berthPlanYn = berthPlanYn;
    }
    public String getVslColor() {
        return vslColor;
    }
    public void setVslColor(String vslColor) {
        this.vslColor = vslColor;
    }
    public String getCargoTp() {
        return cargoTp;
    }
    public void setCargoTp(String cargoTp) {
        this.cargoTp = cargoTp;
    }
    public String getVslSchDate() {
        return vslSchDate;
    }
    public void setVslSchDate(String vslSchDate) {
        this.vslSchDate = vslSchDate;
    }
    public String getLastPort() {
        return lastPort;
    }
    public void setLastPort(String lastPort) {
        this.lastPort = lastPort;
    }
    public String getNextPort() {
        return nextPort;
    }
    public void setNextPort(String nextPort) {
        this.nextPort = nextPort;
    }
    public String getAccnt() {
        return accnt;
    }
    public void setAccnt(String accnt) {
        this.accnt = accnt;
    }
    public String getPackingList() {
        return packingList;
    }
    public void setPackingList(String packingList) {
        this.packingList = packingList;
    }
    public String getOpeHr() {
        return opeHr;
    }
    public void setOpeHr(String opeHr) {
        this.opeHr = opeHr;
    }
    public String getOperationType() {
        return operationType;
    }
    public void setOperationType(String operationType) {
        this.operationType = operationType;
    }
    public String getConsignee() {
        return consignee;
    }
    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }
    public String getShipper() {
        return shipper;
    }
    public void setShipper(String shipper) {
        this.shipper = shipper;
    }
    public String getMt() {
        return mt;
    }
    public void setMt(String mt) {
        this.mt = mt;
    }
    public String getBalance() {
        return balance;
    }
    public void setBalance(String balance) {
        this.balance = balance;
    }
    public String getMptsStatusNm() {
        return mptsStatusNm;
    }
    public void setMptsStatusNm(String mptsStatusNm) {
        this.mptsStatusNm = mptsStatusNm;
    }
    public String getDgDeclaration() {
        return dgDeclaration;
    }
    public void setDgDeclaration(String dgDeclaration) {
        this.dgDeclaration = dgDeclaration;
    }
    public String getMptsStatus() {
        return mptsStatus;
    }
    public void setMptsStatus(String mptsStatus) {
        this.mptsStatus = mptsStatus;
    }
    public String getCsYn() {
        return csYn;
    }
    public void setCsYn(String csYn) {
        this.csYn = csYn;
    }
    public String getDbYn() {
        return dbYn;
    }
    public void setDbYn(String dbYn) {
        this.dbYn = dbYn;
    }
    public String getIspsYn() {
        return ispsYn;
    }
    public void setIspsYn(String ispsYn) {
        this.ispsYn = ispsYn;
    }
    public String getDgStatus() {
        return dgStatus;
    }
    public void setDgStatus(String dgStatus) {
        this.dgStatus = dgStatus;
    }
    public String getConfirmationSlip() {
        return confirmationSlip;
    }
    public void setConfirmationSlip(String confirmationSlip) {
        this.confirmationSlip = confirmationSlip;
    }

    //Report
    private String countIndex ;
    
    public String getAdvImmgYn() {
        return advImmgYn;
    }
    public void setAdvImmgYn(String advImmgYn) {
        this.advImmgYn = advImmgYn;
    }
    public String getAlongSide() {
        return alongSide;
    }
    public void setAlongSide(String alongSide) {
        this.alongSide = alongSide;
    }
    public String getAntnHgt() {
        return antnHgt;
    }
    public void setAntnHgt(String antnHgt) {
        this.antnHgt = antnHgt;
    }
    public String getApproveDtm() {
        return approveDtm;
    }
    public void setApproveDtm(String approveDtm) {
        this.approveDtm = approveDtm;
    }
    public String getApproveUserId() {
        return approveUserId;
    }
    public void setApproveUserId(String approveUserId) {
        this.approveUserId = approveUserId;
    }
    public String getApprxDist() {
        return apprxDist;
    }
    public void setApprxDist(String apprxDist) {
        this.apprxDist = apprxDist;
    }
    public String getArmsYn() {
        return armsYn;
    }
    public void setArmsYn(String armsYn) {
        this.armsYn = armsYn;
    }
    public String getArrvSaId() {
        return arrvSaId;
    }
    public void setArrvSaId(String arrvSaId) {
        this.arrvSaId = arrvSaId;
    }
    public String getBaleCapa() {
        return baleCapa;
    }
    public void setBaleCapa(String baleCapa) {
        this.baleCapa = baleCapa;
    }
    public String getBargeAftPort() {
        return bargeAftPort;
    }
    public void setBargeAftPort(String bargeAftPort) {
        this.bargeAftPort = bargeAftPort;
    }
    public String getBargeAftStbd() {
        return bargeAftStbd;
    }
    public void setBargeAftStbd(String bargeAftStbd) {
        this.bargeAftStbd = bargeAftStbd;
    }
    public String getBargeForwPort() {
        return bargeForwPort;
    }
    public void setBargeForwPort(String bargeForwPort) {
        this.bargeForwPort = bargeForwPort;
    }
    public String getBargeForwStbd() {
        return bargeForwStbd;
    }
    public void setBargeForwStbd(String bargeForwStbd) {
        this.bargeForwStbd = bargeForwStbd;
    }
    public String getBargeTugVsl1() {
        return bargeTugVsl1;
    }
    public void setBargeTugVsl1(String bargeTugVsl1) {
        this.bargeTugVsl1 = bargeTugVsl1;
    }
    public String getBargeTugVsl2() {
        return bargeTugVsl2;
    }
    public void setBargeTugVsl2(String bargeTugVsl2) {
        this.bargeTugVsl2 = bargeTugVsl2;
    }
    public String getBargeTugVsl3() {
        return bargeTugVsl3;
    }
    public void setBargeTugVsl3(String bargeTugVsl3) {
        this.bargeTugVsl3 = bargeTugVsl3;
    }
    public String getBerthAlongside() {
        return berthAlongside;
    }
    public void setBerthAlongside(String berthAlongside) {
        this.berthAlongside = berthAlongside;
    }
    public String getBerthDiv() {
        return berthDiv;
    }
    public void setBerthDiv(String berthDiv) {
        this.berthDiv = berthDiv;
    }
    public String getBerthDtm() {
        return berthDtm;
    }
    public void setBerthDtm(String berthDtm) {
        this.berthDtm = berthDtm;
    }
    public String getBerthLoc() {
        return berthLoc;
    }
    public void setBerthLoc(String berthLoc) {
        this.berthLoc = berthLoc;
    }
    public String getBerthTp() {
        return berthTp;
    }
    public void setBerthTp(String berthTp) {
        this.berthTp = berthTp;
    }
    public String getBldYear() {
        return bldYear;
    }
    public void setBldYear(String bldYear) {
        this.bldYear = bldYear;
    }
    public String getBowDist() {
        return bowDist;
    }
    public void setBowDist(String bowDist) {
        this.bowDist = bowDist;
    }
    public String getBunkerCond() {
        return bunkerCond;
    }
    public void setBunkerCond(String bunkerCond) {
        this.bunkerCond = bunkerCond;
    }
    public String getCallSeq() {
        return callSeq;
    }
    public void setCallSeq(String callSeq) {
        this.callSeq = callSeq;
    }
    public String getCallSign() {
        return callSign;
    }
    public void setCallSign(String callSign) {
        this.callSign = callSign;
    }
    public String getCallYear() {
        return callYear;
    }
    public void setCallYear(String callYear) {
        this.callYear = callYear;
    }
    public String getCgOpTp() {
        return cgOpTp;
    }
    public void setCgOpTp(String cgOpTp) {
        this.cgOpTp = cgOpTp;
    }
    public String getClrYymm() {
        return clrYymm;
    }
    public void setClrYymm(String clrYymm) {
        this.clrYymm = clrYymm;
    }
    public String getCntryCd() {
        return cntryCd;
    }
    public void setCntryCd(String cntryCd) {
        this.cntryCd = cntryCd;
    }
    public String getComptyOfficer() {
        return comptyOfficer;
    }
    public void setComptyOfficer(String comptyOfficer) {
        this.comptyOfficer = comptyOfficer;
    }
    public String getConfConstumYn() {
        return confConstumYn;
    }
    public void setConfConstumYn(String confConstumYn) {
        this.confConstumYn = confConstumYn;
    }
    public String getConfirmDtm() {
        return confirmDtm;
    }
    public void setConfirmDtm(String confirmDtm) {
        this.confirmDtm = confirmDtm;
    }
    public String getConfirmUserId() {
        return confirmUserId;
    }
    public void setConfirmUserId(String confirmUserId) {
        this.confirmUserId = confirmUserId;
    }
    public String getConsumSea() {
        return consumSea;
    }
    public void setConsumSea(String consumSea) {
        this.consumSea = consumSea;
    }
    public String getCraneSide() {
        return craneSide;
    }
    public void setCraneSide(String craneSide) {
        this.craneSide = craneSide;
    }
    public String getCrewNo() {
        return crewNo;
    }
    public void setCrewNo(String crewNo) {
        this.crewNo = crewNo;
    }
    public String getDeprSaId() {
        return deprSaId;
    }
    public void setDeprSaId(String deprSaId) {
        this.deprSaId = deprSaId;
    }
    public String getDeptTp() {
        return deptTp;
    }
    public void setDeptTp(String deptTp) {
        this.deptTp = deptTp;
    }
    public String getDgGoodYn() {
        return dgGoodYn;
    }
    public void setDgGoodYn(String dgGoodYn) {
        this.dgGoodYn = dgGoodYn;
    }
    public String getDischCargo() {
        return dischCargo;
    }
    public void setDischCargo(String dischCargo) {
        this.dischCargo = dischCargo;
    }
    public String getDischCargoQty() {
        return dischCargoQty;
    }
    public void setDischCargoQty(String dischCargoQty) {
        this.dischCargoQty = dischCargoQty;
    }
    public String getDisp() {
        return disp;
    }
    public void setDisp(String disp) {
        this.disp = disp;
    }
    public String getDomYn() {
        return domYn;
    }
    public void setDomYn(String domYn) {
        this.domYn = domYn;
    }
    public String getDrfArrv() {
        return drfArrv;
    }
    public void setDrfArrv(String drfArrv) {
        this.drfArrv = drfArrv;
    }
    public String getDrfDeptr() {
        return drfDeptr;
    }
    public void setDrfDeptr(String drfDeptr) {
        this.drfDeptr = drfDeptr;
    }
    public String getDwt() {
        return dwt;
    }
    public void setDwt(String dwt) {
        this.dwt = dwt;
    }
    public String getEngBhp() {
        return engBhp;
    }
    public void setEngBhp(String engBhp) {
        this.engBhp = engBhp;
    }
    public String getEngDesc() {
        return engDesc;
    }
    public void setEngDesc(String engDesc) {
        this.engDesc = engDesc;
    }
    public String getEtaFixYn() {
        return etaFixYn;
    }
    public void setEtaFixYn(String etaFixYn) {
        this.etaFixYn = etaFixYn;
    }
    public String getFlatJpvc() {
        return flatJpvc;
    }
    public void setFlatJpvc(String flatJpvc) {
        this.flatJpvc = flatJpvc;
    }
    public String getFloatCraneYn() {
        return floatCraneYn;
    }
    public void setFloatCraneYn(String floatCraneYn) {
        this.floatCraneYn = floatCraneYn;
    }
    public String getFreshwtCond() {
        return freshwtCond;
    }
    public void setFreshwtCond(String freshwtCond) {
        this.freshwtCond = freshwtCond;
    }
    public String getGrainCapa() {
        return grainCapa;
    }
    public void setGrainCapa(String grainCapa) {
        this.grainCapa = grainCapa;
    }
    public String getGrt() {
        return grt;
    }
    public void setGrt(String grt) {
        this.grt = grt;
    }
    public String getHatchQty() {
        return hatchQty;
    }
    public void setHatchQty(String hatchQty) {
        this.hatchQty = hatchQty;
    }
    public String getHighestPoint() {
        return highestPoint;
    }
    public void setHighestPoint(String highestPoint) {
        this.highestPoint = highestPoint;
    }
    public String getImoNo() {
        return imoNo;
    }
    public void setImoNo(String imoNo) {
        this.imoNo = imoNo;
    }
    public String getInbServLane() {
        return inbServLane;
    }
    public void setInbServLane(String inbServLane) {
        this.inbServLane = inbServLane;
    }
    public String getInbVoy() {
        return inbVoy;
    }
    public void setInbVoy(String inbVoy) {
        this.inbVoy = inbVoy;
    }
    public String getInmarsatNo() {
        return inmarsatNo;
    }
    public void setInmarsatNo(String inmarsatNo) {
        this.inmarsatNo = inmarsatNo;
    }
    public String getInsDtm() {
        return insDtm;
    }
    public void setInsDtm(String insDtm) {
        this.insDtm = insDtm;
    }
    public String getInsUserId() {
        return insUserId;
    }
    public void setInsUserId(String insUserId) {
        this.insUserId = insUserId;
    }
    public String getIspsLevel() {
        return ispsLevel;
    }
    public void setIspsLevel(String ispsLevel) {
        this.ispsLevel = ispsLevel;
    }
    public String getIsscNmAuth() {
        return isscNmAuth;
    }
    public void setIsscNmAuth(String isscNmAuth) {
        this.isscNmAuth = isscNmAuth;
    }
    public String getIsscNo() {
        return isscNo;
    }
    public void setIsscNo(String isscNo) {
        this.isscNo = isscNo;
    }
    public String getJpvcNo() {
        return jpvcNo;
    }
    public void setJpvcNo(String jpvcNo) {
        this.jpvcNo = jpvcNo;
    }
    public String getLaunchDt() {
        return launchDt;
    }
    public void setLaunchDt(String launchDt) {
        this.launchDt = launchDt;
    }
    public String getLayupAftDrf() {
        return layupAftDrf;
    }
    public void setLayupAftDrf(String layupAftDrf) {
        this.layupAftDrf = layupAftDrf;
    }
    public String getLayupAnticipReriod() {
        return layupAnticipReriod;
    }
    public void setLayupAnticipReriod(String layupAnticipReriod) {
        this.layupAnticipReriod = layupAnticipReriod;
    }
    public String getLayupExpectInitDt() {
        return layupExpectInitDt;
    }
    public void setLayupExpectInitDt(String layupExpectInitDt) {
        this.layupExpectInitDt = layupExpectInitDt;
    }
    public String getLayupForeDrf() {
        return layupForeDrf;
    }
    public void setLayupForeDrf(String layupForeDrf) {
        this.layupForeDrf = layupForeDrf;
    }
    public String getLayupLightDisp() {
        return layupLightDisp;
    }
    public void setLayupLightDisp(String layupLightDisp) {
        this.layupLightDisp = layupLightDisp;
    }
    public String getLayupLoadAftDrf() {
        return layupLoadAftDrf;
    }
    public void setLayupLoadAftDrf(String layupLoadAftDrf) {
        this.layupLoadAftDrf = layupLoadAftDrf;
    }
    public String getLayupLoadDisp() {
        return layupLoadDisp;
    }
    public void setLayupLoadDisp(String layupLoadDisp) {
        this.layupLoadDisp = layupLoadDisp;
    }
    public String getLayupLoadForeDrf() {
        return layupLoadForeDrf;
    }
    public void setLayupLoadForeDrf(String layupLoadForeDrf) {
        this.layupLoadForeDrf = layupLoadForeDrf;
    }
    public String getLayupPurp() {
        return layupPurp;
    }
    public void setLayupPurp(String layupPurp) {
        this.layupPurp = layupPurp;
    }
    public String getLbp() {
        return lbp;
    }
    public void setLbp(String lbp) {
        this.lbp = lbp;
    }
    public String getLoa() {
        return loa;
    }
    public void setLoa(String loa) {
        this.loa = loa;
    }
    public String getLoadCargo() {
        return loadCargo;
    }
    public void setLoadCargo(String loadCargo) {
        this.loadCargo = loadCargo;
    }
    public String getLoadCargoQty() {
        return loadCargoQty;
    }
    public void setLoadCargoQty(String loadCargoQty) {
        this.loadCargoQty = loadCargoQty;
    }
    public String getLoaSum() {
        return loaSum;
    }
    public void setLoaSum(String loaSum) {
        this.loaSum = loaSum;
    }
    public String getLstDrydock() {
        return lstDrydock;
    }
    public void setLstDrydock(String lstDrydock) {
        this.lstDrydock = lstDrydock;
    }
    public String getMapassOfficialNo() {
        return mapassOfficialNo;
    }
    public void setMapassOfficialNo(String mapassOfficialNo) {
        this.mapassOfficialNo = mapassOfficialNo;
    }
    public String getMapassRegPort() {
        return mapassRegPort;
    }
    public void setMapassRegPort(String mapassRegPort) {
        this.mapassRegPort = mapassRegPort;
    }
    public String getMmsiCd() {
        return mmsiCd;
    }
    public void setMmsiCd(String mmsiCd) {
        this.mmsiCd = mmsiCd;
    }
    public String getMxRowDeck() {
        return mxRowDeck;
    }
    public void setMxRowDeck(String mxRowDeck) {
        this.mxRowDeck = mxRowDeck;
    }
    public String getMxRowHold() {
        return mxRowHold;
    }
    public void setMxRowHold(String mxRowHold) {
        this.mxRowHold = mxRowHold;
    }
    public String getMxTeu() {
        return mxTeu;
    }
    public void setMxTeu(String mxTeu) {
        this.mxTeu = mxTeu;
    }
    public String getNatCd() {
        return natCd;
    }
    public void setNatCd(String natCd) {
        this.natCd = natCd;
    }
    public String getNavEqu() {
        return navEqu;
    }
    public void setNavEqu(String navEqu) {
        this.navEqu = navEqu;
    }
    public String getNrt() {
        return nrt;
    }
    public void setNrt(String nrt) {
        this.nrt = nrt;
    }
    public String getOutbServLane() {
        return outbServLane;
    }
    public void setOutbServLane(String outbServLane) {
        this.outbServLane = outbServLane;
    }
    public String getOutbVoy() {
        return outbVoy;
    }
    public void setOutbVoy(String outbVoy) {
        this.outbVoy = outbVoy;
    }
    public String getOutr() {
        return outr;
    }
    public void setOutr(String outr) {
        this.outr = outr;
    }
    public String getPilotDisembark() {
        return pilotDisembark;
    }
    public void setPilotDisembark(String pilotDisembark) {
        this.pilotDisembark = pilotDisembark;
    }
    public String getPilotOnboard() {
        return pilotOnboard;
    }
    public void setPilotOnboard(String pilotOnboard) {
        this.pilotOnboard = pilotOnboard;
    }
    public String getPurpCall() {
        return purpCall;
    }
    public void setPurpCall(String purpCall) {
        this.purpCall = purpCall;
    }
    public String getRegDt() {
        return regDt;
    }
    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }
    public String getRemarks() {
        return remarks;
    }
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    public String getRpmType() {
        return rpmType;
    }
    public void setRpmType(String rpmType) {
        this.rpmType = rpmType;
    }
    public String getSaCorpId() {
        return saCorpId;
    }
    public void setSaCorpId(String saCorpId) {
        this.saCorpId = saCorpId;
    }
    public String getSaCustCd() {
        return saCustCd;
    }
    public void setSaCustCd(String saCustCd) {
        this.saCustCd = saCustCd;
    }
    public String getServTp() {
        return servTp;
    }
    public void setServTp(String servTp) {
        this.servTp = servTp;
    }
    public String getShiftCargoQty() {
        return shiftCargoQty;
    }
    public void setShiftCargoQty(String shiftCargoQty) {
        this.shiftCargoQty = shiftCargoQty;
    }
    public String getShipCallNo() {
        return shipCallNo;
    }
    public void setShipCallNo(String shipCallNo) {
        this.shipCallNo = shipCallNo;
    }
    public String getShipEmail() {
        return shipEmail;
    }
    public void setShipEmail(String shipEmail) {
        this.shipEmail = shipEmail;
    }
    public String getShipGear() {
        return shipGear;
    }
    public void setShipGear(String shipGear) {
        this.shipGear = shipGear;
    }
    public String getShipOfficialNo() {
        return shipOfficialNo;
    }
    public void setShipOfficialNo(String shipOfficialNo) {
        this.shipOfficialNo = shipOfficialNo;
    }
    public String getShippingLineCd() {
        return shippingLineCd;
    }
    public void setShippingLineCd(String shippingLineCd) {
        this.shippingLineCd = shippingLineCd;
    }
    public String getSpeed() {
        return speed;
    }
    public void setSpeed(String speed) {
        this.speed = speed;
    }
    public String getSternDist() {
        return sternDist;
    }
    public void setSternDist(String sternDist) {
        this.sternDist = sternDist;
    }
    public String getStowwYn() {
        return stowwYn;
    }
    public void setStowwYn(String stowwYn) {
        this.stowwYn = stowwYn;
    }
    public String getSubmitRmk() {
        return submitRmk;
    }
    public void setSubmitRmk(String submitRmk) {
        this.submitRmk = submitRmk;
    }
    public String getSummDrf() {
        return summDrf;
    }
    public void setSummDrf(String summDrf) {
        this.summDrf = summDrf;
    }
    public String getSummitStat() {
        return summitStat;
    }
    public void setSummitStat(String summitStat) {
        this.summitStat = summitStat;
    }
    public String getTerminalType() {
        return terminalType;
    }
    public void setTerminalType(String terminalType) {
        this.terminalType = terminalType;
    }
    public String getTopTier() {
        return topTier;
    }
    public void setTopTier(String topTier) {
        this.topTier = topTier;
    }
    public String getTowingEq() {
        return towingEq;
    }
    public void setTowingEq(String towingEq) {
        this.towingEq = towingEq;
    }
    public String getTowingSpeed() {
        return towingSpeed;
    }
    public void setTowingSpeed(String towingSpeed) {
        this.towingSpeed = towingSpeed;
    }
    public String getTradCerti() {
        return tradCerti;
    }
    public void setTradCerti(String tradCerti) {
        this.tradCerti = tradCerti;
    }
    public String getUpdDtm() {
        return updDtm;
    }
    public void setUpdDtm(String updDtm) {
        this.updDtm = updDtm;
    }
    public String getUpdUserId() {
        return updUserId;
    }
    public void setUpdUserId(String updUserId) {
        this.updUserId = updUserId;
    }
    public String getVcDiv() {
        return vcDiv;
    }
    public void setVcDiv(String vcDiv) {
        this.vcDiv = vcDiv;
    }
    public String getVclass() {
        return vclass;
    }
    public void setVclass(String vclass) {
        this.vclass = vclass;
    }
    public String getVhfYn() {
        return vhfYn;
    }
    public void setVhfYn(String vhfYn) {
        this.vhfYn = vhfYn;
    }
    public String getVslCd() {
        return vslCd;
    }
    public void setVslCd(String vslCd) {
        this.vslCd = vslCd;
    }
    public String getVslCustCd() {
        return vslCustCd;
    }
    public void setVslCustCd(String vslCustCd) {
        this.vslCustCd = vslCustCd;
    }
    public String getVslDepth() {
        return vslDepth;
    }
    public void setVslDepth(String vslDepth) {
        this.vslDepth = vslDepth;
    }
    public String getVslDiv() {
        return vslDiv;
    }
    public void setVslDiv(String vslDiv) {
        this.vslDiv = vslDiv;
    }
    public String getVslFlagCd() {
        return vslFlagCd;
    }
    public void setVslFlagCd(String vslFlagCd) {
        this.vslFlagCd = vslFlagCd;
    }
    public String getVslMxWidth() {
        return vslMxWidth;
    }
    public void setVslMxWidth(String vslMxWidth) {
        this.vslMxWidth = vslMxWidth;
    }
    public String getVslNm() {
        return vslNm;
    }
    public void setVslNm(String vslNm) {
        this.vslNm = vslNm;
    }
    public String getVslOperator() {
        return vslOperator;
    }
    public void setVslOperator(String vslOperator) {
        this.vslOperator = vslOperator;
    }
    public String getVslOutr() {
        return vslOutr;
    }
    public void setVslOutr(String vslOutr) {
        this.vslOutr = vslOutr;
    }
    public String getVslRegPort() {
        return vslRegPort;
    }
    public void setVslRegPort(String vslRegPort) {
        this.vslRegPort = vslRegPort;
    }
    public String getVslTp() {
        return vslTp;
    }
    public void setVslTp(String vslTp) {
        this.vslTp = vslTp;
    }
    public String getVslTpNm() {
        return vslTpNm;
    }
    public void setVslTpNm(String vslTpNm) {
        this.vslTpNm = vslTpNm;
    }    
    public String getVslTp1Vsl() {
        return vslTp1Vsl;
    }
    public void setVslTp1Vsl(String vslTp1Vsl) {
        this.vslTp1Vsl = vslTp1Vsl;
    }
    public String getVslTp2Term() {
        return vslTp2Term;
    }
    public void setVslTp2Term(String vslTp2Term) {
        this.vslTp2Term = vslTp2Term;
    }
    public String getVslTp3Trade() {
        return vslTp3Trade;
    }
    public void setVslTp3Trade(String vslTp3Trade) {
        this.vslTp3Trade = vslTp3Trade;
    }
    public String getVslTpTrade() {
        return vslTpTrade;
    }
    public void setVslTpTrade(String vslTpTrade) {
        this.vslTpTrade = vslTpTrade;
    }
    public String getVslWidth() {
        return vslWidth;
    }
    public void setVslWidth(String vslWidth) {
        this.vslWidth = vslWidth;
    }
    public String getVsRmk() {
        return vsRmk;
    }
    public void setVsRmk(String vsRmk) {
        this.vsRmk = vsRmk;
    }
    public String getYct() {
        return yct;
    }
    public void setYct(String yct) {
        this.yct = yct;
    }
    public String getYot() {
        return yot;
    }
    public void setYot(String yot) {
        this.yot = yot;
    }
    public String getZb55RegNo() {
        return zb55RegNo;
    }
    public void setZb55RegNo(String zb55RegNo) {
        this.zb55RegNo = zb55RegNo;
    }
    public String getZb55Status() {
        return zb55Status;
    }
    public void setZb55Status(String zb55Status) {
        this.zb55Status = zb55Status;
    }
    public String getConfirm() {
        return confirm;
    }
    public void setConfirm(String confirm) {
        this.confirm = confirm;
    }
    
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }    

    public String getWharfMarkFrom() {
        return wharfMarkFrom;
    }
    public void setWharfMarkFrom(String wharfMarkFrom) {
        this.wharfMarkFrom = wharfMarkFrom;
    }
    
    public String getWharfMarkTo() {
        return wharfMarkTo;
    }
    public void setWharfMarkTo(String wharfMarkTo) {
        this.wharfMarkTo = wharfMarkTo;
    }    
    
    
    public String getVslOwner() {
        return vslOwner;
    }
    public void setVslOwner(String vslOwner) {
        this.vslOwner = vslOwner;
    }
    public String getCountIndex() {
        return countIndex;
    }
    public void setCountIndex(String countIndex) {
        this.countIndex = countIndex;
    }
    
    public String getSummitStatName() {
        return summitStatName;
    }
    public void setSummitStatName(String summitStatName) {
        this.summitStatName = summitStatName;
    }
    public String getLdStatus() {
        return ldStatus;
    }
    public void setLdStatus(String ldStatus) {
        this.ldStatus = ldStatus;
    }
    public String getCurPage() {
        return curPage;
    }
    public void setCurPage(String curPage) {
        this.curPage = curPage;
    }
    public String getRn() {
        return rn;
    }
    public void setRn(String rn) {
        this.rn = rn;
    }
    public String getTotalPage() {
        return totalPage;
    }
    public void setTotalPage(String totalPage) {
        this.totalPage = totalPage;
    }
    
    public String getForwarder() {
        return forwarder;
    }
    public void setForwarder(String forwarder) {
        this.forwarder = forwarder;
    }
    public String getDepSaId() {
        return depSaId;
    }
    public void setDepSaId(String depSaId) {
        this.depSaId = depSaId;
    }
    public String getDepSaNm() {
        return depSaNm;
    }
    public void setDepSaNm(String depSaNm) {
        this.depSaNm = depSaNm;
    }
    public String getOgaQuarantine() {
        return ogaQuarantine;
    }
    public void setOgaQuarantine(String ogaQuarantine) {
        this.ogaQuarantine = ogaQuarantine;
    }
    public String getOgaStatus() {
        return ogaStatus;
    }
    public void setOgaStatus(String ogaStatus) {
        this.ogaStatus = ogaStatus;
    }
    public String getOgaApprovalBy() {
        return ogaApprovalBy;
    }
    public void setOgaApprovalBy(String ogaApprovalBy) {
        this.ogaApprovalBy = ogaApprovalBy;
    }
	public Date getEtd() {
		return etd;
	}
	public void setEtd(Date etd) {
		this.etd = etd;
	}
	public Date getEtu() {
		return etu;
	}
	public void setEtu(Date etu) {
		this.etu = etu;
	}
	public Date getEtb() {
		return etb;
	}
	public void setEtb(Date etb) {
		this.etb = etb;
	}
	public Date getEtc() {
		return etc;
	}
	public void setEtc(Date etc) {
		this.etc = etc;
	}
	public Date getCurAtb() {
		return curAtb;
	}
	public void setCurAtb(Date curAtb) {
		this.curAtb = curAtb;
	}
	public Date getBtr() {
		return btr;
	}
	public void setBtr(Date btr) {
		this.btr = btr;
	}
	public Date getIsscExprDt() {
		return isscExprDt;
	}
	public void setIsscExprDt(Date isscExprDt) {
		this.isscExprDt = isscExprDt;
	}
	public Date getOgaStatusDate() {
		return ogaStatusDate;
	}
	public void setOgaStatusDate(Date ogaStatusDate) {
		this.ogaStatusDate = ogaStatusDate;
	}
	public Date getAmendDate() {
		return amendDate;
	}
	public void setAmendDate(Date amendDate) {
		this.amendDate = amendDate;
	}
	public Date getSumitDt() {
		return sumitDt;
	}
	public void setSumitDt(Date sumitDt) {
		this.sumitDt = sumitDt;
	}
	public String getCsStatus() {
		return csStatus;
	}
	public void setCsStatus(String csStatus) {
		this.csStatus = csStatus;
	}
	public String getOgaStatusDateRpt() {
		return ogaStatusDateRpt;
	}
	public void setOgaStatusDateRpt(String ogaStatusDateRpt) {
		this.ogaStatusDateRpt = ogaStatusDateRpt;
	}
	public String getEtaDayMonth() {
		return etaDayMonth;
	}
	public void setEtaDayMonth(String etaDayMonth) {
		this.etaDayMonth = etaDayMonth;
	}
	public String getEtaHour() {
		return etaHour;
	}
	public void setEtaHour(String etaHour) {
		this.etaHour = etaHour;
	}
	public String getIsFileUpload() {
		return isFileUpload;
	}
	public void setIsFileUpload(String isFileUpload) {
		this.isFileUpload = isFileUpload;
	}
	public String getIsCs1() {
		return isCs1;
	}
	public void setIsCs1(String isCs1) {
		this.isCs1 = isCs1;
	}
	public String getIsIvAdv() {
		return isIvAdv;
	}
	public void setIsIvAdv(String isIvAdv) {
		this.isIvAdv = isIvAdv;
	}
	public String getCommodityNm() {
		return commodityNm;
	}
	public void setCommodityNm(String commodityNm) {
		this.commodityNm = commodityNm;
	}
	public String getBerthLabel() {
		return berthLabel;
	}
	public void setBerthLabel(String berthLabel) {
		this.berthLabel = berthLabel;
	}
	public String getWharvesRemark() {
		return wharvesRemark;
	}
	public void setWharvesRemark(String wharvesRemark) {
		this.wharvesRemark = wharvesRemark;
	}
	public String getMaturityTime() {
		return maturityTime;
	}
	public void setMaturityTime(String maturityTime) {
		this.maturityTime = maturityTime;
	}
	public String getDischargeMt() {
		return dischargeMt;
	}
	public void setDischargeMt(String dischargeMt) {
		this.dischargeMt = dischargeMt;
	}
	public String getLoadingMt() {
		return loadingMt;
	}
	public void setLoadingMt(String loadingMt) {
		this.loadingMt = loadingMt;
	}
	public String getPilotBookDateTime() {
		return pilotBookDateTime;
	}
	public void setPilotBookDateTime(String pilotBookDateTime) {
		this.pilotBookDateTime = pilotBookDateTime;
	}
	public String getBerthLabelNm() {
		return berthLabelNm;
	}
	public void setBerthLabelNm(String berthLabelNm) {
		this.berthLabelNm = berthLabelNm;
	}
	public String getNo() {
		return no;
	}
	public void setNo(String no) {
		this.no = no;
	}
	public String getVslCallId() {
		return vslCallId;
	}
	public void setVslCallId(String vslCallId) {
		this.vslCallId = vslCallId;
	}
	public String getCgTpCd() {
		return cgTpCd;
	}
	public void setCgTpCd(String cgTpCd) {
		this.cgTpCd = cgTpCd;
	}
	public String getSeq() {
		return seq;
	}
	public void setSeq(String seq) {
		this.seq = seq;
	}
	public String getWorkYmd() {
		return workYmd;
	}
	public void setWorkYmd(String workYmd) {
		this.workYmd = workYmd;
	}
	public String getShftNm() {
		return shftNm;
	}
	public void setShftNm(String shftNm) {
		this.shftNm = shftNm;
	}
	public String getShftId() {
		return shftId;
	}
	public void setShftId(String shftId) {
		this.shftId = shftId;
	}
	public String getLastCallPort() {
		return lastCallPort;
	}
	public void setLastCallPort(String lastCallPort) {
		this.lastCallPort = lastCallPort;
	}
	public String getHoseOnDt() {
		return hoseOnDt;
	}
	public void setHoseOnDt(String hoseOnDt) {
		this.hoseOnDt = hoseOnDt;
	}
	public String getHoseOffDt() {
		return hoseOffDt;
	}
	public void setHoseOffDt(String hoseOffDt) {
		this.hoseOffDt = hoseOffDt;
	}
	public String getTotFlxLdQty() {
		return totFlxLdQty;
	}
	public void setTotFlxLdQty(String totFlxLdQty) {
		this.totFlxLdQty = totFlxLdQty;
	}
	public String getTotFlxDsQty() {
		return totFlxDsQty;
	}
	public void setTotFlxDsQty(String totFlxDsQty) {
		this.totFlxDsQty = totFlxDsQty;
	}
	public String getTotArmLdQty() {
		return totArmLdQty;
	}
	public void setTotArmLdQty(String totArmLdQty) {
		this.totArmLdQty = totArmLdQty;
	}
	public String getTotArmDsQty() {
		return totArmDsQty;
	}
	public void setTotArmDsQty(String totArmDsQty) {
		this.totArmDsQty = totArmDsQty;
	}
	public String getEstPductInhr() {
		return estPductInhr;
	}
	public void setEstPductInhr(String estPductInhr) {
		this.estPductInhr = estPductInhr;
	}
	public String getEstHrForOpe() {
		return estHrForOpe;
	}
	public void setEstHrForOpe(String estHrForOpe) {
		this.estHrForOpe = estHrForOpe;
	}
	public String getTkOpr() {
		return tkOpr;
	}
	public void setTkOpr(String tkOpr) {
		this.tkOpr = tkOpr;
	}
	public String getTkOpr2() {
		return tkOpr2;
	}
	public void setTkOpr2(String tkOpr2) {
		this.tkOpr2 = tkOpr2;
	}
	public String getTkOpr3() {
		return tkOpr3;
	}
	public void setTkOpr3(String tkOpr3) {
		this.tkOpr3 = tkOpr3;
	}
	public String getTkOpr4() {
		return tkOpr4;
	}
	public void setTkOpr4(String tkOpr4) {
		this.tkOpr4 = tkOpr4;
	}
	public String getJobTpCd() {
		return jobTpCd;
	}
	public void setJobTpCd(String jobTpCd) {
		this.jobTpCd = jobTpCd;
	}
	public String getBlNo() {
		return blNo;
	}
	public void setBlNo(String blNo) {
		this.blNo = blNo;
	}
	public String getLoadPlanMt() {
		return loadPlanMt;
	}
	public void setLoadPlanMt(String loadPlanMt) {
		this.loadPlanMt = loadPlanMt;
	}
	public String getDisPlanMt() {
		return disPlanMt;
	}
	public void setDisPlanMt(String disPlanMt) {
		this.disPlanMt = disPlanMt;
	}
	public String getLoadActualMt() {
		return loadActualMt;
	}
	public void setLoadActualMt(String loadActualMt) {
		this.loadActualMt = loadActualMt;
	}
	public String getDisActualMt() {
		return disActualMt;
	}
	public void setDisActualMt(String disActualMt) {
		this.disActualMt = disActualMt;
	}
	public String getLoadPlanMtG() {
		return loadPlanMtG;
	}
	public void setLoadPlanMtG(String loadPlanMtG) {
		this.loadPlanMtG = loadPlanMtG;
	}
	public String getDisPlanMtG() {
		return disPlanMtG;
	}
	public void setDisPlanMtG(String disPlanMtG) {
		this.disPlanMtG = disPlanMtG;
	}
	public String getLoadActualMtG() {
		return loadActualMtG;
	}
	public void setLoadActualMtG(String loadActualMtG) {
		this.loadActualMtG = loadActualMtG;
	}
	public String getDisActualMtG() {
		return disActualMtG;
	}
	public void setDisActualMtG(String disActualMtG) {
		this.disActualMtG = disActualMtG;
	}
	public String getLoadPlanMtS() {
		return loadPlanMtS;
	}
	public void setLoadPlanMtS(String loadPlanMtS) {
		this.loadPlanMtS = loadPlanMtS;
	}
	public String getDisPlanMtS() {
		return disPlanMtS;
	}
	public void setDisPlanMtS(String disPlanMtS) {
		this.disPlanMtS = disPlanMtS;
	}
	public String getLoadActualMtS() {
		return loadActualMtS;
	}
	public void setLoadActualMtS(String loadActualMtS) {
		this.loadActualMtS = loadActualMtS;
	}
	public String getDisActualMtS() {
		return disActualMtS;
	}
	public void setDisActualMtS(String disActualMtS) {
		this.disActualMtS = disActualMtS;
	}
	public String getLoadPlanMtT() {
		return loadPlanMtT;
	}
	public void setLoadPlanMtT(String loadPlanMtT) {
		this.loadPlanMtT = loadPlanMtT;
	}
	public String getDisPlanMtT() {
		return disPlanMtT;
	}
	public void setDisPlanMtT(String disPlanMtT) {
		this.disPlanMtT = disPlanMtT;
	}
	public String getLoadActualMtT() {
		return loadActualMtT;
	}
	public void setLoadActualMtT(String loadActualMtT) {
		this.loadActualMtT = loadActualMtT;
	}
	public String getDisActualMtT() {
		return disActualMtT;
	}
	public void setDisActualMtT(String disActualMtT) {
		this.disActualMtT = disActualMtT;
	}
	public String getLoadTotMt() {
		return loadTotMt;
	}
	public void setLoadTotMt(String loadTotMt) {
		this.loadTotMt = loadTotMt;
	}
	public String getDisTotMt() {
		return disTotMt;
	}
	public void setDisTotMt(String disTotMt) {
		this.disTotMt = disTotMt;
	}
	public String getTkNo() {
		return tkNo;
	}
	public void setTkNo(String tkNo) {
		this.tkNo = tkNo;
	}
	public String getDelayCode() {
		return delayCode;
	}
	public void setDelayCode(String delayCode) {
		this.delayCode = delayCode;
	}
	public String getHatchNo() {
		return hatchNo;
	}
	public void setHatchNo(String hatchNo) {
		this.hatchNo = hatchNo;
	}
	public String getEqNo() {
		return eqNo;
	}
	public void setEqNo(String eqNo) {
		this.eqNo = eqNo;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	public String getAccDelay() {
		return accDelay;
	}
	public void setAccDelay(String accDelay) {
		this.accDelay = accDelay;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getDelayDesc() {
		return delayDesc;
	}
	public void setDelayDesc(String delayDesc) {
		this.delayDesc = delayDesc;
	}
	public String getTimeHourly() {
		return timeHourly;
	}
	public void setTimeHourly(String timeHourly) {
		this.timeHourly = timeHourly;
	}
	public String getTimeHourMin() {
		return timeHourMin;
	}
	public void setTimeHourMin(String timeHourMin) {
		this.timeHourMin = timeHourMin;
	}
	public String getTotalHRS() {
		return totalHRS;
	}
	public void setTotalHRS(String totalHRS) {
		this.totalHRS = totalHRS;
	}
	public String getShpr() {
		return shpr;
	}
	public void setShpr(String shpr) {
		this.shpr = shpr;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getHoseTpCd() {
		return hoseTpCd;
	}
	public void setHoseTpCd(String hoseTpCd) {
		this.hoseTpCd = hoseTpCd;
	}
	public String getTonHdlAmt() {
		return tonHdlAmt;
	}
	public void setTonHdlAmt(String tonHdlAmt) {
		this.tonHdlAmt = tonHdlAmt;
	}
	public String getPumpRate() {
		return pumpRate;
	}
	public void setPumpRate(String pumpRate) {
		this.pumpRate = pumpRate;
	}
	public String getStDt() {
		return stDt;
	}
	public void setStDt(String stDt) {
		this.stDt = stDt;
	}
	public String getEndDt() {
		return endDt;
	}
	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}
	public String getJobCmplYn() {
		return jobCmplYn;
	}
	public void setJobCmplYn(String jobCmplYn) {
		this.jobCmplYn = jobCmplYn;
	}
	public String getHoseCmplYn() {
		return hoseCmplYn;
	}
	public void setHoseCmplYn(String hoseCmplYn) {
		this.hoseCmplYn = hoseCmplYn;
	}
	public String getCmdtCd() {
		return cmdtCd;
	}
	public void setCmdtCd(String cmdtCd) {
		this.cmdtCd = cmdtCd;
	}
	public String getFlxTotLine() {
		return flxTotLine;
	}
	public void setFlxTotLine(String flxTotLine) {
		this.flxTotLine = flxTotLine;
	}
	public String getArmTotLine() {
		return armTotLine;
	}
	public void setArmTotLine(String armTotLine) {
		this.armTotLine = armTotLine;
	}
	public String getPol() {
		return pol;
	}
	public void setPol(String pol) {
		this.pol = pol;
	}
	public String getFdest() {
		return fdest;
	}
	public void setFdest(String fdest) {
		this.fdest = fdest;
	}
	public String getLoadHoseQty() {
		return loadHoseQty;
	}
	public void setLoadHoseQty(String loadHoseQty) {
		this.loadHoseQty = loadHoseQty;
	}
	public String getDschHoseQty() {
		return dschHoseQty;
	}
	public void setDschHoseQty(String dschHoseQty) {
		this.dschHoseQty = dschHoseQty;
	}
	public String getLoadArmQty() {
		return loadArmQty;
	}
	public void setLoadArmQty(String loadArmQty) {
		this.loadArmQty = loadArmQty;
	}
	public String getDschArmQty() {
		return dschArmQty;
	}
	public void setDschArmQty(String dschArmQty) {
		this.dschArmQty = dschArmQty;
	}
	public String getInsertType() {
		return insertType;
	}
	public void setInsertType(String insertType) {
		this.insertType = insertType;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getGenOprYn() {
		return genOprYn;
	}
	public void setGenOprYn(String genOprYn) {
		this.genOprYn = genOprYn;
	}
	public String getStsOprYn() {
		return stsOprYn;
	}
	public void setStsOprYn(String stsOprYn) {
		this.stsOprYn = stsOprYn;
	}
	public String getTlsOprYn() {
		return tlsOprYn;
	}
	public void setTlsOprYn(String tlsOprYn) {
		this.tlsOprYn = tlsOprYn;
	}
	public String getOpeTp() {
		return opeTp;
	}
	public void setOpeTp(String opeTp) {
		this.opeTp = opeTp;
	}
	public String getFender() {
		return fender;
	}
	public void setFender(String fender) {
		this.fender = fender;
	}
	public String getShprCnsne() {
		return shprCnsne;
	}
	public void setShprCnsne(String shprCnsne) {
		this.shprCnsne = shprCnsne;
	}
	public String getPkgTpCd() {
		return pkgTpCd;
	}
	public void setPkgTpCd(String pkgTpCd) {
		this.pkgTpCd = pkgTpCd;
	}
	public String getLineNo() {
		return lineNo;
	}
	public void setLineNo(String lineNo) {
		this.lineNo = lineNo;
	}
	public String getSeqOrder() {
		return seqOrder;
	}
	public void setSeqOrder(String seqOrder) {
		this.seqOrder = seqOrder;
	}
	public String getA() {
		return a;
	}
	public void setA(String a) {
		this.a = a;
	}
	public String getB() {
		return b;
	}
	public void setB(String b) {
		this.b = b;
	}
	public String getC() {
		return c;
	}
	public void setC(String c) {
		this.c = c;
	}
	public String getD() {
		return d;
	}
	public void setD(String d) {
		this.d = d;
	}
	public String getF() {
		return f;
	}
	public void setF(String f) {
		this.f = f;
	}
	public String getI() {
		return i;
	}
	public void setI(String i) {
		this.i = i;
	}
	public String getK() {
		return k;
	}
	public void setK(String k) {
		this.k = k;
	}
	public String getL() {
		return l;
	}
	public void setL(String l) {
		this.l = l;
	}
	public String getO() {
		return o;
	}
	public void setO(String o) {
		this.o = o;
	}
	public String getP() {
		return p;
	}
	public void setP(String p) {
		this.p = p;
	}
	public String getSeqCS2() {
		return seqCS2;
	}
	public void setSeqCS2(String seqCS2) {
		this.seqCS2 = seqCS2;
	}
	public String getDisPlanMtSts() {
		return disPlanMtSts;
	}
	public void setDisPlanMtSts(String disPlanMtSts) {
		this.disPlanMtSts = disPlanMtSts;
	}
	public String getLoadPlanMTSts() {
		return loadPlanMTSts;
	}
	public void setLoadPlanMTSts(String loadPlanMTSts) {
		this.loadPlanMTSts = loadPlanMTSts;
	}
	public String getDisPlanMtTls() {
		return disPlanMtTls;
	}
	public void setDisPlanMtTls(String disPlanMtTls) {
		this.disPlanMtTls = disPlanMtTls;
	}
	public String getLoadPlanMtTls() {
		return loadPlanMtTls;
	}
	public void setLoadPlanMtTls(String loadPlanMtTls) {
		this.loadPlanMtTls = loadPlanMtTls;
	}
	public String getLoadPlanMt_h() {
		return loadPlanMt_h;
	}
	public void setLoadPlanMt_h(String loadPlanMt_h) {
		this.loadPlanMt_h = loadPlanMt_h;
	}
	public String getDisPlanMt_h() {
		return disPlanMt_h;
	}
	public void setDisPlanMt_h(String disPlanMt_h) {
		this.disPlanMt_h = disPlanMt_h;
	}
	public String getLoadPlanMtSts_h() {
		return loadPlanMtSts_h;
	}
	public void setLoadPlanMtSts_h(String loadPlanMtSts_h) {
		this.loadPlanMtSts_h = loadPlanMtSts_h;
	}
	public String getDisPlanMtSts_h() {
		return disPlanMtSts_h;
	}
	public void setDisPlanMtSts_h(String disPlanMtSts_h) {
		this.disPlanMtSts_h = disPlanMtSts_h;
	}
	public String getLoadPlanMtTls_h() {
		return loadPlanMtTls_h;
	}
	public void setLoadPlanMtTls_h(String loadPlanMtTls_h) {
		this.loadPlanMtTls_h = loadPlanMtTls_h;
	}
	public String getDisPlanMtTls_h() {
		return disPlanMtTls_h;
	}
	public void setDisPlanMtTls_h(String disPlanMtTls_h) {
		this.disPlanMtTls_h = disPlanMtTls_h;
	}
	public String getVslShiftingSeq() {
		return vslShiftingSeq;
	}
	public void setVslShiftingSeq(String vslShiftingSeq) {
		this.vslShiftingSeq = vslShiftingSeq;
	}
	public String getVslShiftingYN() {
		return vslShiftingYN;
	}
	public void setVslShiftingYN(String vslShiftingYN) {
		this.vslShiftingYN = vslShiftingYN;
	}
	public String getWgtBbkDbk() {
		return wgtBbkDbk;
	}
	public void setWgtBbkDbk(String wgtBbkDbk) {
		this.wgtBbkDbk = wgtBbkDbk;
	}
	public String getWgtLq() {
		return wgtLq;
	}
	public void setWgtLq(String wgtLq) {
		this.wgtLq = wgtLq;
	}
	public VesselScheduleItem getVesselScheduleListDetail() {
		return vesselScheduleListDetail;
	}
	public void setVesselScheduleListDetail(VesselScheduleItem vesselScheduleListDetail) {
		this.vesselScheduleListDetail = vesselScheduleListDetail;
	}
	public ArrayList<VesselScheduleItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<VesselScheduleItem> items) {
		this.items = items;
	}
	public ArrayList<VesselScheduleItem> getBerthAndOperationInfo() {
		return berthAndOperationInfo;
	}
	public void setBerthAndOperationInfo(ArrayList<VesselScheduleItem> berthAndOperationInfo) {
		this.berthAndOperationInfo = berthAndOperationInfo;
	}
	public ArrayList<VesselScheduleItem> getVorSummary() {
		return vorSummary;
	}
	public void setVorSummary(ArrayList<VesselScheduleItem> vorSummary) {
		this.vorSummary = vorSummary;
	}
	public ArrayList<VesselScheduleItem> getCargoSummary() {
		return cargoSummary;
	}
	public void setCargoSummary(ArrayList<VesselScheduleItem> cargoSummary) {
		this.cargoSummary = cargoSummary;
	}
	public ArrayList<VesselScheduleItem> getDelaySummary() {
		return delaySummary;
	}
	public void setDelaySummary(ArrayList<VesselScheduleItem> delaySummary) {
		this.delaySummary = delaySummary;
	}
	public ArrayList<VesselScheduleItem> getVorDelaySummary() {
		return vorDelaySummary;
	}
	public void setVorDelaySummary(ArrayList<VesselScheduleItem> vorDelaySummary) {
		this.vorDelaySummary = vorDelaySummary;
	}
	public ArrayList<VesselScheduleItem> getAmountCargoSummary() {
		return amountCargoSummary;
	}
	public void setAmountCargoSummary(ArrayList<VesselScheduleItem> amountCargoSummary) {
		this.amountCargoSummary = amountCargoSummary;
	}
	public ArrayList<VesselScheduleItem> getVorLiquidBulk() {
		return vorLiquidBulk;
	}
	public void setVorLiquidBulk(ArrayList<VesselScheduleItem> vorLiquidBulk) {
		this.vorLiquidBulk = vorLiquidBulk;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public List getCmdtList() {
		return cmdtList;
	}
	public void setCmdtList(List cmdtList) {
		this.cmdtList = cmdtList;
	}
	public List getLineList() {
		return lineList;
	}
	public void setLineList(List lineList) {
		this.lineList = lineList;
	}
	public List getShiftList() {
		return shiftList;
	}
	public void setShiftList(List shiftList) {
		this.shiftList = shiftList;
	}
	public List getConfirmationSlipList() {
		return confirmationSlipList;
	}
	public void setConfirmationSlipList(List confirmationSlipList) {
		this.confirmationSlipList = confirmationSlipList;
	}
	public List getConfirmationSlipOperationType() {
		return confirmationSlipOperationType;
	}
	public void setConfirmationSlipOperationType(List confirmationSlipOperationType) {
		this.confirmationSlipOperationType = confirmationSlipOperationType;
	}
	public List getVesselInformation() {
		return vesselInformation;
	}
	public void setVesselInformation(List vesselInformation) {
		this.vesselInformation = vesselInformation;
	}
	public List getBerthInfo() {
		return berthInfo;
	}
	public void setBerthInfo(List berthInfo) {
		this.berthInfo = berthInfo;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getWorkingStatus() {
		return workingStatus;
	}
	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}
	public String getBalLoadMt() {
		return balLoadMt;
	}
	public void setBalLoadMt(String balLoadMt) {
		this.balLoadMt = balLoadMt;
	}
	public String getBalDisMt() {
		return balDisMt;
	}
	public void setBalDisMt(String balDisMt) {
		this.balDisMt = balDisMt;
	}
	public String getStatCd() {
		return statCd;
	}
	public void setStatCd(String statCd) {
		this.statCd = statCd;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getOpeTpCd() {
		return opeTpCd;
	}
	public void setOpeTpCd(String opeTpCd) {
		this.opeTpCd = opeTpCd;
	}
	public String getShreTk() {
		return shreTk;
	}
	public void setShreTk(String shreTk) {
		this.shreTk = shreTk;
	}
	public String getFileCatgCd() {
		return fileCatgCd;
	}
	public void setFileCatgCd(String fileCatgCd) {
		this.fileCatgCd = fileCatgCd;
	}
	public String getCgTpNm() {
		return cgTpNm;
	}
	public void setCgTpNm(String cgTpNm) {
		this.cgTpNm = cgTpNm;
	}
	public String getCmdtCdNm() {
		return cmdtCdNm;
	}
	public void setCmdtCdNm(String cmdtCdNm) {
		this.cmdtCdNm = cmdtCdNm;
	}
	public String getWorkHatchNo() {
		return workHatchNo;
	}
	public void setWorkHatchNo(String workHatchNo) {
		this.workHatchNo = workHatchNo;
	}
	public String getClnCd() {
		return clnCd;
	}
	public void setClnCd(String clnCd) {
		this.clnCd = clnCd;
	}
	public String getTopCgCd() {
		return topCgCd;
	}
	public void setTopCgCd(String topCgCd) {
		this.topCgCd = topCgCd;
	}
	public String getTopCln() {
		return topCln;
	}
	public void setTopCln(String topCln) {
		this.topCln = topCln;
	}
	public String getTmnlOpr() {
		return tmnlOpr;
	}
	public void setTmnlOpr(String tmnlOpr) {
		this.tmnlOpr = tmnlOpr;
	}
	public String getUnno() {
		return unno;
	}
	public void setUnno(String unno) {
		this.unno = unno;
	}
	public String getImdg() {
		return imdg;
	}
	public void setImdg(String imdg) {
		this.imdg = imdg;
	}
	public String getDgTol() {
		return dgTol;
	}
	public void setDgTol(String dgTol) {
		this.dgTol = dgTol;
	}
	public String getDgSeq() {
		return dgSeq;
	}
	public void setDgSeq(String dgSeq) {
		this.dgSeq = dgSeq;
	}
	public String getDgChk() {
		return dgChk;
	}
	public void setDgChk(String dgChk) {
		this.dgChk = dgChk;
	}
	public String getCgOptTpCd() {
		return cgOptTpCd;
	}
	public void setCgOptTpCd(String cgOptTpCd) {
		this.cgOptTpCd = cgOptTpCd;
	}
	public String getCgOptTpNm() {
		return cgOptTpNm;
	}
	public void setCgOptTpNm(String cgOptTpNm) {
		this.cgOptTpNm = cgOptTpNm;
	}
	public String getOpeTpNm() {
		return opeTpNm;
	}
	public void setOpeTpNm(String opeTpNm) {
		this.opeTpNm = opeTpNm;
	}
	public String getPriorityYn() {
		return priorityYn;
	}
	public void setPriorityYn(String priorityYn) {
		this.priorityYn = priorityYn;
	}
	public String getMthrVslCallId() {
		return mthrVslCallId;
	}
	public void setMthrVslCallId(String mthrVslCallId) {
		this.mthrVslCallId = mthrVslCallId;
	}
	public String getOpeType() {
		return opeType;
	}
	public void setOpeType(String opeType) {
		this.opeType = opeType;
	}
	public Date getTempRedyDt() {
		return tempRedyDt;
	}
	public void setTempRedyDt(Date tempRedyDt) {
		this.tempRedyDt = tempRedyDt;
	}
	public Date getDocRedyDt() {
		return docRedyDt;
	}
	public void setDocRedyDt(Date docRedyDt) {
		this.docRedyDt = docRedyDt;
	}
	public Date getCgRedyDt() {
		return cgRedyDt;
	}
	public void setCgRedyDt(Date cgRedyDt) {
		this.cgRedyDt = cgRedyDt;
	}
	public Date getUltgRedyDt() {
		return ultgRedyDt;
	}
	public void setUltgRedyDt(Date ultgRedyDt) {
		this.ultgRedyDt = ultgRedyDt;
	}
	public Date getTkRedyDt() {
		return tkRedyDt;
	}
	public void setTkRedyDt(Date tkRedyDt) {
		this.tkRedyDt = tkRedyDt;
	}
	public int getCrc() {
		return crc;
	}
	public void setCrc(int crc) {
		this.crc = crc;
	}
	public long getNofLines() {
		return nofLines;
	}
	public void setNofLines(long nofLines) {
		this.nofLines = nofLines;
	}
	public long getWorkDd() {
		return workDd;
	}
	public void setWorkDd(long workDd) {
		this.workDd = workDd;
	}
	public double getWgt() {
		return wgt;
	}
	public void setWgt(double wgt) {
		this.wgt = wgt;
	}
	public double getMsrmt() {
		return msrmt;
	}
	public void setMsrmt(double msrmt) {
		this.msrmt = msrmt;
	}
	public double getQty() {
		return qty;
	}
	public void setQty(double qty) {
		this.qty = qty;
	}
	public String getPtnrCd() {
		return ptnrCd;
	}
	public void setPtnrCd(String ptnrCd) {
		this.ptnrCd = ptnrCd;
	}
	public String getPtnrTpCd() {
		return ptnrTpCd;
	}
	public void setPtnrTpCd(String ptnrTpCd) {
		this.ptnrTpCd = ptnrTpCd;
	}
	public Date getEta() {
		return eta;
	}
	public void setEta(Date eta) {
		this.eta = eta;
	}
	public Date getEtw() {
		return etw;
	}
	public void setEtw(Date etw) {
		this.etw = etw;
	}
	public Date getAta() {
		return ata;
	}
	public void setAta(Date ata) {
		this.ata = ata;
	}
	public Date getAtb() {
		return atb;
	}
	public void setAtb(Date atb) {
		this.atb = atb;
	}
	public Date getAtd() {
		return atd;
	}
	public void setAtd(Date atd) {
		this.atd = atd;
	}
	public Date getAtu() {
		return atu;
	}
	public void setAtu(Date atu) {
		this.atu = atu;
	}
	public Date getAtw() {
		return atw;
	}
	public void setAtw(Date atw) {
		this.atw = atw;
	}
	public Date getAtc() {
		return atc;
	}
	public void setAtc(Date atc) {
		this.atc = atc;
	}
	public String getCmdtGrCd() {
		return cmdtGrCd;
	}
	public void setCmdtGrCd(String cmdtGrCd) {
		this.cmdtGrCd = cmdtGrCd;
	}
	public String getDelvTpCd() {
		return delvTpCd;
	}
	public void setDelvTpCd(String delvTpCd) {
		this.delvTpCd = delvTpCd;
	}
	public String getDelvTpNm() {
		return delvTpNm;
	}
	public void setDelvTpNm(String delvTpNm) {
		this.delvTpNm = delvTpNm;
	}
	public String getIsValidated() {
		return isValidated;
	}
	public void setIsValidated(String isValidated) {
		this.isValidated = isValidated;
	}
	public String getScd() {
		return scd;
	}
	public void setScd(String scd) {
		this.scd = scd;
	}
	public String getScdNm() {
		return scdNm;
	}
	public void setScdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public String getStevedore() {
		return stevedore;
	}
	public void setStevedore(String stevedore) {
		this.stevedore = stevedore;
	}
}
