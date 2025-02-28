/**
* DeliveryOrderItem.java
*
* Created on   : Aug 21, 2007
* Target OS    : Java VM 1.4.2 
* CVS revision : $Revision: 1.2 $ 
*
* ------------------------------
* CHANGE REVISION
* ------------------------------
* DATE           AUTHOR      	   REVISION    	
* Aug 21, 2007   Mr Dong-Yeob Lee 1.0    First release.
* -------------------------------
* CLASS DESCRIPTION
* -------------------------------
*
*/
package com.tsb.most.biz.dataitem.document;

import java.util.ArrayList;
import java.util.Date;

import com.tsb.most.basebiz.dataitem.fileupload.FileUploadItem;
import com.tsb.most.framework.dataitem.DataItem;

/**
 * @author USER
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class DeliveryOrderItem extends DataItem {

    /**
     * 
     */
    public DeliveryOrderItem() {
        super();
        // TODO Auto-generated constructor stub
    }

    private String docid;
    private String jobno;
    private String mfdocid;
    private String mfjobno;
    private String vslcd;
    private String callseq;
    private String callyear;
    private String cginouttp;
    private String blno;
    private String hblno;
    private String cnsneodr1;
    private String cnsneodr2;
    private String totcntrcnt;
    private String pkgqty;
    private String pkgtpcd;
    private String fzippkgtpcd;
    private String pkgmark;
    private String wgt;
    private String wgtunit;
    private String vol;
    private String volunit;
    private String pductcd;
    private String gdsrmk;
    private String custgdsrmk;
    private String rmk;
    private String cgtpcd;
    private String pol;
    private String pod;
    private String fnlportcd;
    private String blclasscd;
    private String cgclasscd;
    private String imdgclass;
    private String tfzunno;
    private String tmtunno;
    private String cnntvslcd;
    private String insuserid;
    private String insdtm;
    private String upduserid;
    private String upddtm;
    private String hscddiv;
    private String hscd;
    private String pkgtpnm;
    private String polnm;
    private String podnm;
    private String fnlportnm;
    private String vslCallId;
    private String tsptr;
    private String delvtpnm;
    private String dono;
    private String ackby;
    private String ackdt;
    private String issuedt;
    private String imdg;
    private String nilmarks;
    private String cmdtcd;
    private String domark;
    private String crudFlag;
    private String ptnrcd;
    private String seq;
    private String tspttpcd;
    private String dtspttpcdnm;
    private String dofnlportcd;
    private String dofnlportcdnm;
    private String cmdtcdnm;
    private String dgclass;
    private String shpr;
	private String shprNm;
	private String shprAddr;
	private String shprAddr1;
	private String shprAddr2;
	private String shprAddr3;
	private String shprAddr4;
    private String cnsneecd;
    private String cnsneenm;
    private String cnsneeaddr1;
    private String cnsneeaddr2;
    private String cnsneeaddr3;
    private String cnsneeaddr4;
    private String imdgunno;
    private String jpGroup;
    private String shprTol;
    private String cnsneTol;
    private String tsptCompNm;
    private String cgTpCdNm;
    private String catgCd;
    
    private double wgt1;
    private double wgt2;
    private String wgtDivCd;
    
    private String dmt,dm3,dqty,dlrrymt,dwagonmt,dcnvymt,dpplnmt;
    private String imt,im3,iqty,ilrrymt,iwagonmt,icnvymt;
    private String ptnrAddr1,ptnrAddr2,ptnrAddr3,ptnrAddr4,ptnrNm;
    private String payer,orgCnty,disCnty;
    
    private String itspttpcd;
    private String itspttpcdnm;
    private String btspttpcdnm;
    private String gpYn;
    private String customsAprvDt;
    private String customsAprvStat;
    private String releaseNo;
    private String lorryNo;
    private String arrvDtFm;
    private String arrvDtTo;
    private String driverId;

    private String dgStatCd;
    private String dgYn;
    private String delvTpCd;
    private String delvTpNm;
    
    private String estdt;
    private String estDt;
    
//  for printing 
    private String vslNm,inbVoyage,sa,saAddr1,berthLoc,whLoc;
    private String scdNm;
    
    private String driverNm;
    private String licsNo;
    private String licsExprYmd;
    
    private String arrvSaId;
    private String outbVoyage;
    private String scn;
    private String flagCd;
    private String deprSaId;
    private String eta;
    private String arrvSaNm;
    private Date estArrvDt;
    private String validDate;
    		
    private String eachWgt;
    private String eachVol;
  	private String cmdtGroupCd;
    private String cmdtGroupCdNm;
    private String mt;
    private String m3; 
    private String qty;
    
    private String domesticChk;
    private String wgtChk;
    private String projectCargo;
    private String additionalChk;
    
    private String sdono;
    private String sdoMark;
    private String cnsne;
    
    private String pkgNo;
    private String pkgDesc;
    private String pkgMt;
    private String pkgM3;
    private String width;
    private String height;
    private String length;
    private String markNo;
    
    private String shaCd;
    private String shaNm;
    private String shaAddr;
    private String paymentTpNm;
    private String lotNo;
    private double balWgt;
    private String lorryRegValidDate;
    private String chassisRegValidDate;
    private String chassisNo;
    
    private String balMt,balM3,balQty;
    
    private ArrayList<DeliveryOrderItem> pkgItems;
    private ArrayList<BLItem> unitItems;
    private ArrayList<FileUploadItem> uploadItems;
    
    private String sdormk;
    private String sdoWgtChk;
    private String sdoAdditionalChk;
    
    private String doDMt;
    private String doDM3;
    private String doDQty;
    private String doIMt;
    private String doIM3;
    private String doIQty;
    private String doDLrMt;
    private String doDLrM3;
    private String doDLrQty;
    private String doDVslMt;
    private String doDVslM3;
    private String doDVslQty;
    private String doILrMt;
    private String doILrM3;
    private String doILrQty;
    private String doIVslMt;
    private String doIVslM3;
    private String doIVslQty;
    private String delivered;
    private String dmtChk;
    private String imtChk;
    private String isVA;
    
    
    public String getIcnvymt() {
		return icnvymt;
	}
	public void setIcnvymt(String icnvymt) {
		this.icnvymt = icnvymt;
	}
	public String getMt() {
		return mt;
	}
	public void setMt(String mt) {
		this.mt = mt;
	}
	public String getM3() {
		return m3;
	}
	public void setM3(String m3) {
		this.m3 = m3;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getEta() {
		return eta;
	}
	public void setEta(String eta) {
		this.eta = eta;
	}
	public String getOutbVoyage() {
		return outbVoyage;
	}
	public void setOutbVoyage(String outbVoyage) {
		this.outbVoyage = outbVoyage;
	}
	public String getArrvSaId() {
		return arrvSaId;
	}
	public void setArrvSaId(String arrvSaId) {
		this.arrvSaId = arrvSaId;
	}
	public String getScn() {
		return scn;
	}
	public void setScn(String scn) {
		this.scn = scn;
	}
	public String getFlagCd() {
		return flagCd;
	}
	public void setFlagCd(String flagCd) {
		this.flagCd = flagCd;
	}
	public String getDeprSaId() {
		return deprSaId;
	}
	public void setDeprSaId(String deprSaId) {
		this.deprSaId = deprSaId;
	}
	public String getBtspttpcdnm() {
        return btspttpcdnm;
    }
    public void setBtspttpcdnm(String btspttpcdnm) {
        this.btspttpcdnm = btspttpcdnm;
    }
    public String getCustomsAprvDt() {
        return customsAprvDt;
    }
    public void setCustomsAprvDt(String customsAprvDt) {
        this.customsAprvDt = customsAprvDt;
    }
    public String getCustomsAprvStat() {
        return customsAprvStat;
    }
    public void setCustomsAprvStat(String customsAprvStat) {
        this.customsAprvStat = customsAprvStat;
    }
    public String getReleaseNo() {
        return releaseNo;
    }
    public void setReleaseNo(String releaseNo) {
        this.releaseNo = releaseNo;
    }
    public String getJpGroup() {
        return jpGroup;
    }
    public void setJpGroup(String jpGroup) {
        this.jpGroup = jpGroup;
    }
    /**
     * @return Returns the dtspttpcdnm.
     */
    public String getDtspttpcdnm() {
        return dtspttpcdnm;
    }
    /**
     * @param dtspttpcdnm The dtspttpcdnm to set.
     */
    public void setDtspttpcdnm(String dtspttpcdnm) {
        this.dtspttpcdnm = dtspttpcdnm;
    }
    /**
     * @return Returns the itspttpcdnm.
     */
    public String getItspttpcdnm() {
        return itspttpcdnm;
    }
    /**
     * @param itspttpcdnm The itspttpcdnm to set.
     */
    public void setItspttpcdnm(String itspttpcdnm) {
        this.itspttpcdnm = itspttpcdnm;
    }
    public String getDpplnmt() {
        return dpplnmt;
    }
    public void setDpplnmt(String dpplnmt) {
        this.dpplnmt = dpplnmt;
    }

/**
 * @return Returns the berthLoc.
 */
public String getBerthLoc() {
    return berthLoc;
}
/**
 * @param berthLoc The berthLoc to set.
 */
public void setBerthLoc(String berthLoc) {
    this.berthLoc = berthLoc;
}
/**
 * @return Returns the inbVoyage.
 */
public String getInbVoyage() {
    return inbVoyage;
}
/**
 * @param inbVoyage The inbVoyage to set.
 */
public void setInbVoyage(String inbVoyage) {
    this.inbVoyage = inbVoyage;
}
/**
 * @return Returns the vslNm.
 */
public String getVslNm() {
    return vslNm;
}
/**
 * @param vslNm The vslNm to set.
 */
public void setVslNm(String vslNm) {
    this.vslNm = vslNm;
}
/**
 * @return Returns the whLoc.
 */
public String getWhLoc() {
    return whLoc;
}
/**
 * @param whLoc The whLoc to set.
 */
public void setWhLoc(String whLoc) {
    this.whLoc = whLoc;
}
    /**
     * @return Returns the saAddr1.
     */
    public String getSaAddr1() {
        return saAddr1;
    }
    /**
     * @param saAddr1 The saAddr1 to set.
     */
    public void setSaAddr1(String saAddr1) {
        this.saAddr1 = saAddr1;
    }
    /**
     * @return Returns the sa.
     */
    public String getSa() {
        return sa;
    }
    /**
     * @param sa The sa to set.
     */
    public void setSa(String sa) {
        this.sa = sa;
    }
  
    /**
     * @return Returns the fzippkgtpcd.
     */
    public String getFzippkgtpcd() {
        return fzippkgtpcd;
    }
    /**
     * @param fzippkgtpcd The fzippkgtpcd to set.
     */
    public void setFzippkgtpcd(String fzippkgtpcd) {
        this.fzippkgtpcd = fzippkgtpcd;
    }
    public String getEstdt() {
        return estdt;
    }
    public void setEstdt(String estdt) {
        this.estdt = estdt;
    }
    public String getWgtDivCd() {
        return wgtDivCd;
    }
    public void setWgtDivCd(String wgtDivCd) {
        this.wgtDivCd = wgtDivCd;
    }
    public double getWgt1() {
        return wgt1;
    }
    public void setWgt1(double wgt1) {
        this.wgt1 = wgt1;
    }
    public double getWgt2() {
        return wgt2;
    }
    public void setWgt2(double wgt2) {
        this.wgt2 = wgt2;
    }
    public String getCgTpCdNm() {
        return cgTpCdNm;
    }
    public void setCgTpCdNm(String cgTpCdNm) {
        this.cgTpCdNm = cgTpCdNm;
    }
    public String getImdgunno() {
        return imdgunno;
    }
    public void setImdgunno(String imdgunno) {
        this.imdgunno = imdgunno;
    }
    public String getCnsneeaddr1() {
        return cnsneeaddr1;
    }
    public void setCnsneeaddr1(String cnsneeaddr1) {
        this.cnsneeaddr1 = cnsneeaddr1;
    }
    public String getCnsneeaddr2() {
        return cnsneeaddr2;
    }
    public void setCnsneeaddr2(String cnsneeaddr2) {
        this.cnsneeaddr2 = cnsneeaddr2;
    }
    public String getCnsneeaddr3() {
        return cnsneeaddr3;
    }
    public void setCnsneeaddr3(String cnsneeaddr3) {
        this.cnsneeaddr3 = cnsneeaddr3;
    }
    public String getCnsneeaddr4() {
        return cnsneeaddr4;
    }
    public void setCnsneeaddr4(String cnsneeaddr4) {
        this.cnsneeaddr4 = cnsneeaddr4;
    }
    public String getCnsneecd() {
        return cnsneecd;
    }
    public void setCnsneecd(String cnsneecd) {
        this.cnsneecd = cnsneecd;
    }
    public String getCnsneenm() {
        return cnsneenm;
    }
    public void setCnsneenm(String cnsneenm) {
        this.cnsneenm = cnsneenm;
    }
    public String getShpr() {
		return shpr;
	}
	public void setShpr(String shpr) {
		this.shpr = shpr;
	}
	public String getShprNm() {
		return shprNm;
	}
	public void setShprNm(String shprNm) {
		this.shprNm = shprNm;
	}
	public String getShprAddr() {
		return shprAddr;
	}
	public void setShprAddr(String shprAddr) {
		this.shprAddr = shprAddr;
	}
	public String getShprAddr1() {
		return shprAddr1;
	}
	public void setShprAddr1(String shprAddr1) {
		this.shprAddr1 = shprAddr1;
	}
	public String getShprAddr2() {
		return shprAddr2;
	}
	public void setShprAddr2(String shprAddr2) {
		this.shprAddr2 = shprAddr2;
	}
	public String getShprAddr3() {
		return shprAddr3;
	}
	public void setShprAddr3(String shprAddr3) {
		this.shprAddr3 = shprAddr3;
	}
	public String getShprAddr4() {
		return shprAddr4;
	}
	public void setShprAddr4(String shprAddr4) {
		this.shprAddr4 = shprAddr4;
	}
	public void setScdNm(String scdNm) {
		this.scdNm = scdNm;
	}
	public String getDgclass() {
        return dgclass;
    }
    public void setDgclass(String dgclass) {
        this.dgclass = dgclass;
    }
    public String getCmdtcdnm() {
        return cmdtcdnm;
    }
    public void setCmdtcdnm(String cmdtcdnm) {
        this.cmdtcdnm = cmdtcdnm;
    }
    public String getDofnlportcd() {
        return dofnlportcd;
    }
    public void setDofnlportcd(String dofnlportcd) {
        this.dofnlportcd = dofnlportcd;
    }
    public String getTspttpcd() {
        return tspttpcd;
    }
    public void setTspttpcd(String tspttpcd) {
        this.tspttpcd = tspttpcd;
    }
    public String getRolecd() {
        return rolecd;
    }
    public void setRolecd(String rolecd) {
        this.rolecd = rolecd;
    }
    private String rolecd;
    
    public String getBlclasscd() {
        return blclasscd;
    }
    public void setBlclasscd(String blclasscd) {
        this.blclasscd = blclasscd;
    }
    public String getBlno() {
        return blno;
    }
    public void setBlno(String blno) {
        this.blno = blno;
    }
    public String getCallseq() {
        return callseq;
    }
    public void setCallseq(String callseq) {
        this.callseq = callseq;
    }
    public String getCallyear() {
        return callyear;
    }
    public void setCallyear(String callyear) {
        this.callyear = callyear;
    }
    public String getCgclasscd() {
        return cgclasscd;
    }
    public void setCgclasscd(String cgclasscd) {
        this.cgclasscd = cgclasscd;
    }
    public String getCginouttp() {
        return cginouttp;
    }
    public void setCginouttp(String cginouttp) {
        this.cginouttp = cginouttp;
    }
    public String getCgtpcd() {
        return cgtpcd;
    }
    public void setCgtpcd(String cgtpcd) {
        this.cgtpcd = cgtpcd;
    }
    public String getCnntvslcd() {
        return cnntvslcd;
    }
    public void setCnntvslcd(String cnntvslcd) {
        this.cnntvslcd = cnntvslcd;
    }
    public String getCnsneodr1() {
        return cnsneodr1;
    }
    public void setCnsneodr1(String cnsneodr1) {
        this.cnsneodr1 = cnsneodr1;
    }
    public String getCnsneodr2() {
        return cnsneodr2;
    }
    public void setCnsneodr2(String cnsneodr2) {
        this.cnsneodr2 = cnsneodr2;
    }
    public String getCustgdsrmk() {
        return custgdsrmk;
    }
    public void setCustgdsrmk(String custgdsrmk) {
        this.custgdsrmk = custgdsrmk;
    }
    public String getDelvtpcd() {
        return delvTpCd;
    }
    public String getDocid() {
        return docid;
    }
    public void setDocid(String docid) {
        this.docid = docid;
    }
    public String getFnlportcd() {
        return fnlportcd;
    }
    public void setFnlportcd(String fnlportcd) {
        this.fnlportcd = fnlportcd;
    }
    public String getFnlportnm() {
        return fnlportnm;
    }
    public void setFnlportnm(String fnlportnm) {
        this.fnlportnm = fnlportnm;
    }
    public String getGdsrmk() {
        return gdsrmk;
    }
    public void setGdsrmk(String gdsrmk) {
        this.gdsrmk = gdsrmk;
    }
    public String getHblno() {
        return hblno;
    }
    public void setHblno(String hblno) {
        this.hblno = hblno;
    }
    public String getHscd() {
        return hscd;
    }
    public void setHscd(String hscd) {
        this.hscd = hscd;
    }
    public String getHscddiv() {
        return hscddiv;
    }
    public void setHscddiv(String hscddiv) {
        this.hscddiv = hscddiv;
    }
    public String getImdgclass() {
        return imdgclass;
    }
    public void setImdgclass(String imdgclass) {
        this.imdgclass = imdgclass;
    }
    public String getInsdtm() {
        return insdtm;
    }
    public void setInsdtm(String insdtm) {
        this.insdtm = insdtm;
    }
    public String getInsuserid() {
        return insuserid;
    }
    public void setInsuserid(String insuserid) {
        this.insuserid = insuserid;
    }
    public String getJobno() {
        return jobno;
    }
    public void setJobno(String jobno) {
        this.jobno = jobno;
    }
    public String getMfdocid() {
        return mfdocid;
    }
    public void setMfdocid(String mfdocid) {
        this.mfdocid = mfdocid;
    }
    public String getMfjobno() {
        return mfjobno;
    }
    public void setMfjobno(String mfjobno) {
        this.mfjobno = mfjobno;
    }
    public String getPductcd() {
        return pductcd;
    }
    public void setPductcd(String pductcd) {
        this.pductcd = pductcd;
    }
    public String getPkgmark() {
        return pkgmark;
    }
    public void setPkgmark(String pkgmark) {
        this.pkgmark = pkgmark;
    }
    public String getPkgqty() {
        return pkgqty;
    }
    public void setPkgqty(String pkgqty) {
        this.pkgqty = pkgqty;
    }
    public String getPkgtpcd() {
        return pkgtpcd;
    }
    public void setPkgtpcd(String pkgtpcd) {
        this.pkgtpcd = pkgtpcd;
    }
    public String getPkgtpnm() {
        return pkgtpnm;
    }
    public void setPkgtpnm(String pkgtpnm) {
        this.pkgtpnm = pkgtpnm;
    }
    public String getPod() {
        return pod;
    }
    public void setPod(String pod) {
        this.pod = pod;
    }
    public String getPodnm() {
        return podnm;
    }
    public void setPodnm(String podnm) {
        this.podnm = podnm;
    }
    public String getPol() {
        return pol;
    }
    public void setPol(String pol) {
        this.pol = pol;
    }
    public String getPolnm() {
        return polnm;
    }
    public void setPolnm(String polnm) {
        this.polnm = polnm;
    }
    public String getRmk() {
        return rmk;
    }
    public void setRmk(String rmk) {
        this.rmk = rmk;
    }
    public String getTotcntrcnt() {
        return totcntrcnt;
    }
    public void setTotcntrcnt(String totcntrcnt) {
        this.totcntrcnt = totcntrcnt;
    }
    public String getTsptr() {
        return tsptr;
    }
    public void setTsptr(String tsptr) {
        this.tsptr = tsptr;
    }
    
    public String getUpddtm() {
        return upddtm;
    }
    public void setUpddtm(String upddtm) {
        this.upddtm = upddtm;
    }
    public String getUpduserid() {
        return upduserid;
    }
    public void setUpduserid(String upduserid) {
        this.upduserid = upduserid;
    }
    public String getVol() {
        return vol;
    }
    public void setVol(String vol) {
        this.vol = vol;
    }
    public String getVolunit() {
        return volunit;
    }
    public void setVolunit(String volunit) {
        this.volunit = volunit;
    }
   
    public String getVslCallId() {
        return vslCallId;
    }
    public void setVslCallId(String vslCallId) {
        this.vslCallId = vslCallId;
    }
    public String getVslcd() {
        return vslcd;
    }
    public void setVslcd(String vslcd) {
        this.vslcd = vslcd;
    }
    public String getWgt() {
        return wgt;
    }
    public void setWgt(String wgt) {
        this.wgt = wgt;
    }
    public String getWgtunit() {
        return wgtunit;
    }
    public void setWgtunit(String wgtunit) {
        this.wgtunit = wgtunit;
    }
    public String getAckby() {
        return ackby;
    }
    public void setAckby(String ackby) {
        this.ackby = ackby;
    }
    public String getAckdt() {
        return ackdt;
    }
    public void setAckdt(String ackdt) {
        this.ackdt = ackdt;
    }
    public String getCmdtcd() {
        return cmdtcd;
    }
    public void setCmdtcd(String cmdtcd) {
        this.cmdtcd = cmdtcd;
    }
    public String getDomark() {
        return domark;
    }
    public void setDomark(String domark) {
        this.domark = domark;
    }
    public String getDono() {
        return dono;
    }
    public void setDono(String dono) {
        this.dono = dono;
    }
    public String getImdg() {
        return imdg;
    }
    public void setImdg(String imdg) {
        this.imdg = imdg;
    }
    public String getIssuedt() {
        return issuedt;
    }
    public void setIssuedt(String issuedt) {
        this.issuedt = issuedt;
    }
    public String getNilmarks() {
        return nilmarks;
    }
    public void setNilmarks(String nilmarks) {
        this.nilmarks = nilmarks;
    }
    public String getDelvtpnm() {
        return delvtpnm;
    }
    public void setDelvtpnm(String delvtpnm) {
        this.delvtpnm = delvtpnm;
    }
    public String getCrudFlag() {
        return crudFlag;
    }
    public void setCrudFlag(String crudFlag) {
        this.crudFlag = crudFlag;
    }
  
    public String getPtnrcd() {
        return ptnrcd;
    }
    public void setPtnrcd(String ptnrcd) {
        this.ptnrcd = ptnrcd;
    }
    public String getSeq() {
        return seq;
    }
    public void setSeq(String seq) {
        this.seq = seq;
    }
    public String getTfzunno() {
        return tfzunno;
    }
    public void setTfzunno(String tfzunno) {
        this.tfzunno = tfzunno;
    }
    public String getTmtunno() {
        return tmtunno;
    }
    public void setTmtunno(String tmtunno) {
        this.tmtunno = tmtunno;
    }
    public String getTsptCompNm() {
        return tsptCompNm;
    }
    public void setTsptCompNm(String tsptCompNm) {
        this.tsptCompNm = tsptCompNm;
    }
    public String getDcnvymt() {
        return dcnvymt;
    }
    public void setDcnvymt(String cnvyMt) {
        dcnvymt = cnvyMt;
    }
    public String getDlrrymt() {
        return dlrrymt;
    }
    public void setDlrrymt(String lrryMt) {
        dlrrymt = lrryMt;
    }
    public String getDm3() {
        return dm3;
    }
    public void setDm3(String m3) {
        dm3 = m3;
    }
    public String getDmt() {
        return dmt;
    }
    public void setDmt(String mt) {
        dmt = mt;
    }
    public String getDqty() {
        return dqty;
    }
    public void setDqty(String qty) {
        dqty = qty;
    }
    public String getDwagonmt() {
        return dwagonmt;
    }
    public void setDwagonmt(String wagonMt) {
        dwagonmt = wagonMt;
    }
    public String getIlrrymt() {
        return ilrrymt;
    }
    public void setIlrrymt(String lrryMt) {
        ilrrymt = lrryMt;
    }
    public String getIm3() {
        return im3;
    }
    public void setIm3(String m3) {
        this.im3 = m3;
    }
    public String getImt() {
        return imt;
    }
    public void setImt(String mt) {
        imt = mt;
    }
    public String getIqty() {
        return iqty;
    }
    public void setIqty(String qty) {
        iqty = qty;
    }
    public String getIwagonmt() {
        return iwagonmt;
    }
    public void setIwagonmt(String wagonMt) {
        iwagonmt = wagonMt;
    }
    public String getItspttpcd() {
        return itspttpcd;
    }
    public void setItspttpcd(String itspttpcd) {
        this.itspttpcd = itspttpcd;
    }
    public String getPtnrAddr1() {
        return ptnrAddr1;
    }
    public void setPtnrAddr1(String ptnrAddr) {
        this.ptnrAddr1 = ptnrAddr;
    }
    public String getPtnrAddr2() {
        return ptnrAddr2;
    }
    public void setPtnrAddr2(String ptnrAddr2) {
        this.ptnrAddr2 = ptnrAddr2;
    }
    public String getPtnrAddr3() {
        return ptnrAddr3;
    }
    public void setPtnrAddr3(String ptnrAddr3) {
        this.ptnrAddr3 = ptnrAddr3;
    }
    public String getPtnrAddr4() {
        return ptnrAddr4;
    }
    public void setPtnrAddr4(String ptnrAddr4) {
        this.ptnrAddr4 = ptnrAddr4;
    }
    public String getPayer() {
        return payer;
    }
    public void setPayer(String payer) {
        this.payer = payer;
    }
    public String getOrgCnty() {
        return orgCnty;
    }
    public void setOrgCnty(String orgCnty) {
        this.orgCnty = orgCnty;
    }
    public String getDisCnty() {
        return disCnty;
    }
    public void setDisCnty(String disCnty) {
        this.disCnty = disCnty;
    }
    public String getPtnrNm() {
        return ptnrNm;
    }
    public void setPtnrNm(String ptnrNm) {
        this.ptnrNm = ptnrNm;
    }
    public String getGpYn() {
        return gpYn;
    }
    public void setGpYn(String gpYn) {
        this.gpYn = gpYn;
    }
	public String getDgStatCd() {
	    return dgStatCd;
	}
	public void setDgStatCd(String dgStatCd) {
	    this.dgStatCd = dgStatCd;
	}
    /**
     * @return Returns the dgYn.
     */
    public String getDgYn() {
        return dgYn;
    }
    /**
     * @param dgYn The dgYn to set.
     */
    public void setDgYn(String dgYn) {
        this.dgYn = dgYn;
    }
    /**
     * @return Returns the delvTpCd.
     */
    public String getDelvTpCd() {
        return delvTpCd;
    }
    /**
     * @param delvTpCd The delvTpCd to set.
     */
    public void setDelvTpCd(String delvTpCd) {
        this.delvTpCd = delvTpCd;
    }
    /**
     * @return Returns the delvTpNm.
     */
    public String getDelvTpNm() {
        return delvTpNm;
    }
    /**
     * @param delvTpNm The delvTpNm to set.
     */
    public void setDelvTpNm(String delvTpNm) {
        this.delvTpNm = delvTpNm;
    }
    public String getCnsneTol() {
        return cnsneTol;
    }
    public void setCnsneTol(String cnsneTol) {
        this.cnsneTol = cnsneTol;
    }
    public String getShprTol() {
        return shprTol;
    }
    public void setShprTol(String shprTol) {
        this.shprTol = shprTol;
    }
    public String getLorryNo() {
        return lorryNo;
    }
    public void setLorryNo(String lorryNo) {
        this.lorryNo = lorryNo;
    }
    public String getArrvDtFm() {
        return arrvDtFm;
    }
    public void setArrvDtFm(String arrvDtFm) {
        this.arrvDtFm = arrvDtFm;
    }
    public String getArrvDtTo() {
        return arrvDtTo;
    }
    public void setArrvDtTo(String arrvDtTo) {
        this.arrvDtTo = arrvDtTo;
    }
    public String getDriverId() {
        return driverId;
    }
    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }
    public String getDriverNm() {
        return driverNm;
    }
    public void setDriverNm(String driverNm) {
        this.driverNm = driverNm;
    }
    public String getLicsExprYmd() {
        return licsExprYmd;
    }
    public void setLicsExprYmd(String licsExprYmd) {
        this.licsExprYmd = licsExprYmd;
    }
    public String getLicsNo() {
        return licsNo;
    }
    public void setLicsNo(String licsNo) {
        this.licsNo = licsNo;
    }
	public String getEstDt() {
		return estDt;
	}
	public void setEstDt(String estDt) {
		this.estDt = estDt;
	}
	public String getArrvSaNm() {
		return arrvSaNm;
	}
	public void setArrvSaNm(String arrvSaNm) {
		this.arrvSaNm = arrvSaNm;
	}
	public Date getEstArrvDt() {
		return estArrvDt;
	}
	public void setEstArrvDt(Date estArrvDt) {
		this.estArrvDt = estArrvDt;
	}
	public String getScdNm() {
		return blno;
	}
	public String getEachWgt() {
		return eachWgt;
	}
	public void setEachWgt(String eachWgt) {
		this.eachWgt = eachWgt;
	}
	public String getEachVol() {
		return eachVol;
	}
	public void setEachVol(String eachVol) {
		this.eachVol = eachVol;
	}
	public String getCmdtGroupCd() {
		return cmdtGroupCd;
	}
	public void setCmdtGroupCd(String cmdtGroupCd) {
		this.cmdtGroupCd = cmdtGroupCd;
	}
	public String getCmdtGroupCdNm() {
		return cmdtGroupCdNm;
	}
	public void setCmdtGroupCdNm(String cmdtGroupCdNm) {
		this.cmdtGroupCdNm = cmdtGroupCdNm;
	}
	public String getDofnlportcdnm() {
		return dofnlportcdnm;
	}
	public void setDofnlportcdnm(String dofnlportcdnm) {
		this.dofnlportcdnm = dofnlportcdnm;
	}
	public String getCatgCd() {
		return catgCd;
	}
	public void setCatgCd(String catgCd) {
		this.catgCd = catgCd;
	}
	public String getDomesticChk() {
		return domesticChk;
	}
	public void setDomesticChk(String domesticChk) {
		this.domesticChk = domesticChk;
	}
	public String getWgtChk() {
		return wgtChk;
	}
	public void setWgtChk(String wgtChk) {
		this.wgtChk = wgtChk;
	}
	public String getSdono() {
		return sdono;
	}
	public void setSdono(String sdono) {
		this.sdono = sdono;
	}
	public String getSdoMark() {
		return sdoMark;
	}
	public void setSdoMark(String sdoMark) {
		this.sdoMark = sdoMark;
	}
	public String getCnsne() {
		return cnsne;
	}
	public void setCnsne(String cnsne) {
		this.cnsne = cnsne;
	}
	public String getProjectCargo() {
		return projectCargo;
	}
	public void setProjectCargo(String projectCargo) {
		this.projectCargo = projectCargo;
	}
	public String getAdditionalChk() {
		return additionalChk;
	}
	public void setAdditionalChk(String additionalChk) {
		this.additionalChk = additionalChk;
	}
	public String getPkgNo() {
		return pkgNo;
	}
	public void setPkgNo(String pkgNo) {
		this.pkgNo = pkgNo;
	}
	public String getPkgDesc() {
		return pkgDesc;
	}
	public void setPkgDesc(String pkgDesc) {
		this.pkgDesc = pkgDesc;
	}
	public String getPkgMt() {
		return pkgMt;
	}
	public void setPkgMt(String pkgMt) {
		this.pkgMt = pkgMt;
	}
	public String getPkgM3() {
		return pkgM3;
	}
	public void setPkgM3(String pkgM3) {
		this.pkgM3 = pkgM3;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getLength() {
		return length;
	}
	public void setLength(String length) {
		this.length = length;
	}
	public ArrayList<DeliveryOrderItem> getPkgItems() {
		return pkgItems;
	}
	public void setPkgItems(ArrayList<DeliveryOrderItem> pkgItems) {
		this.pkgItems = pkgItems;
	}
	public String getMarkNo() {
		return markNo;
	}
	public void setMarkNo(String markNo) {
		this.markNo = markNo;
	}
	public ArrayList<FileUploadItem> getUploadItems() {
		return uploadItems;
	}
	public void setUploadItems(ArrayList<FileUploadItem> uploadItems) {
		this.uploadItems = uploadItems;
	}
	public String getValidDate() {
		return validDate;
	}
	public void setValidDate(String validDate) {
		this.validDate = validDate;
	}
	public String getShaCd() {
		return shaCd;
	}
	public void setShaCd(String shaCd) {
		this.shaCd = shaCd;
	}
	public String getShaNm() {
		return shaNm;
	}
	public void setShaNm(String shaNm) {
		this.shaNm = shaNm;
	}
	public String getShaAddr() {
		return shaAddr;
	}
	public void setShaAddr(String shaAddr) {
		this.shaAddr = shaAddr;
	}
	public String getPaymentTpNm() {
		return paymentTpNm;
	}
	public void setPaymentTpNm(String paymentTpNm) {
		this.paymentTpNm = paymentTpNm;
	}
	public String getLotNo() {
		return lotNo;
	}
	public void setLotNo(String lotNo) {
		this.lotNo = lotNo;
	}
	public double getBalWgt() {
		return balWgt;
	}
	public void setBalWgt(double balWgt) {
		this.balWgt = balWgt;
	}
	public String getLorryRegValidDate() {
		return lorryRegValidDate;
	}
	public void setLorryRegValidDate(String lorryRegValidDate) {
		this.lorryRegValidDate = lorryRegValidDate;
	}
	public String getChassisRegValidDate() {
		return chassisRegValidDate;
	}
	public void setChassisRegValidDate(String chassisRegValidDate) {
		this.chassisRegValidDate = chassisRegValidDate;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}
	public String getBalMt() {
		return balMt;
	}
	public void setBalMt(String balMt) {
		this.balMt = balMt;
	}
	public String getBalM3() {
		return balM3;
	}
	public void setBalM3(String balM3) {
		this.balM3 = balM3;
	}
	public String getBalQty() {
		return balQty;
	}
	public void setBalQty(String balQty) {
		this.balQty = balQty;
	}
	public String getSdormk() {
		return sdormk;
	}
	public void setSdormk(String sdormk) {
		this.sdormk = sdormk;
	}
	public String getSdoWgtChk() {
		return sdoWgtChk;
	}
	public void setSdoWgtChk(String sdoWgtChk) {
		this.sdoWgtChk = sdoWgtChk;
	}
	public String getSdoAdditionalChk() {
		return sdoAdditionalChk;
	}
	public void setSdoAdditionalChk(String sdoAdditionalChk) {
		this.sdoAdditionalChk = sdoAdditionalChk;
	}
	public String getDoDMt() {
		return doDMt;
	}
	public void setDoDMt(String doDMt) {
		this.doDMt = doDMt;
	}
	public String getDoDM3() {
		return doDM3;
	}
	public void setDoDM3(String doDM3) {
		this.doDM3 = doDM3;
	}
	public String getDoDQty() {
		return doDQty;
	}
	public void setDoDQty(String doDQty) {
		this.doDQty = doDQty;
	}
	public String getDoIMt() {
		return doIMt;
	}
	public void setDoIMt(String doIMt) {
		this.doIMt = doIMt;
	}
	public String getDoIM3() {
		return doIM3;
	}
	public void setDoIM3(String doIM3) {
		this.doIM3 = doIM3;
	}
	public String getDoIQty() {
		return doIQty;
	}
	public void setDoIQty(String doIQty) {
		this.doIQty = doIQty;
	}
	public String getDoDLrMt() {
		return doDLrMt;
	}
	public void setDoDLrMt(String doDLrMt) {
		this.doDLrMt = doDLrMt;
	}
	public String getDoDLrM3() {
		return doDLrM3;
	}
	public void setDoDLrM3(String doDLrM3) {
		this.doDLrM3 = doDLrM3;
	}
	public String getDoDLrQty() {
		return doDLrQty;
	}
	public void setDoDLrQty(String doDLrQty) {
		this.doDLrQty = doDLrQty;
	}
	public String getDoDVslMt() {
		return doDVslMt;
	}
	public void setDoDVslMt(String doDVslMt) {
		this.doDVslMt = doDVslMt;
	}
	public String getDoDVslM3() {
		return doDVslM3;
	}
	public void setDoDVslM3(String doDVslM3) {
		this.doDVslM3 = doDVslM3;
	}
	public String getDoDVslQty() {
		return doDVslQty;
	}
	public void setDoDVslQty(String doDVslQty) {
		this.doDVslQty = doDVslQty;
	}
	public String getDoILrMt() {
		return doILrMt;
	}
	public void setDoILrMt(String doILrMt) {
		this.doILrMt = doILrMt;
	}
	public String getDoILrM3() {
		return doILrM3;
	}
	public void setDoILrM3(String doILrM3) {
		this.doILrM3 = doILrM3;
	}
	public String getDoILrQty() {
		return doILrQty;
	}
	public void setDoILrQty(String doILrQty) {
		this.doILrQty = doILrQty;
	}
	public String getDoIVslMt() {
		return doIVslMt;
	}
	public void setDoIVslMt(String doIVslMt) {
		this.doIVslMt = doIVslMt;
	}
	public String getDoIVslM3() {
		return doIVslM3;
	}
	public void setDoIVslM3(String doIVslM3) {
		this.doIVslM3 = doIVslM3;
	}
	public String getDoIVslQty() {
		return doIVslQty;
	}
	public void setDoIVslQty(String doIVslQty) {
		this.doIVslQty = doIVslQty;
	}
	public String getDelivered() {
		return delivered;
	}
	public void setDelivered(String delivered) {
		this.delivered = delivered;
	}
	public ArrayList<BLItem> getUnitItems() {
		return unitItems;
	}
	public void setUnitItems(ArrayList<BLItem> unitItems) {
		this.unitItems = unitItems;
	}
	public String getDmtChk() {
		return dmtChk;
	}
	public void setDmtChk(String dmtChk) {
		this.dmtChk = dmtChk;
	}
	public String getImtChk() {
		return imtChk;
	}
	public void setImtChk(String imtChk) {
		this.imtChk = imtChk;
	}
	public String getIsVA() {
		return isVA;
	}
	public void setIsVA(String isVA) {
		this.isVA = isVA;
	}
}
