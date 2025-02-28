package com.tsb.most.common.util.report;

import java.awt.Color;
import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDPageContentStream.AppendMode;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotation;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationSquareCircle;
import org.apache.pdfbox.util.Matrix;

import com.tsb.most.framework.config.AppContextPropertyLoader;

public class PDFBuilder {
	
	/**
	 * @param cs - PDPageContentStream
	 * @param x
	 * @param y
	 * @param title
	 * @throws IOException
	 */
	public static void text(PDPageContentStream cs, float x, float y, String title) throws IOException{
		cs.beginText();
		cs.newLineAtOffset(x, y);
		cs.showText(title);
		cs.endText();
	}
	
	/**
	 * @param doc
	 * @param fileName
	 * @throws IOException
	 */
	public static void save(PDDocument doc, String fileName) throws IOException{
		if(doc != null){
	        String reportPath = AppContextPropertyLoader.properties.getProperty("report.path") + fileName;
	        File folder = new File(reportPath);
	        if(!folder.exists()){
	        	folder.mkdirs();
	        }
	        doc.save(fileName);
		}
	}

	/**
	 * @param font
	 * @param fontSize
	 * @param contents
	 * @return
	 */
	public static float[] dim(PDFont font, float fontSize, String contents){
	   float[] dimen = new float[2];
    	
    	try {
			float titleWidth = font.getStringWidth(contents) / 1000 * fontSize;
			float titleHeight = font.getFontDescriptor().getFontBoundingBox().getHeight() / 1000 * fontSize;
			dimen[0] = titleWidth;
			dimen[1] = titleHeight;
		} catch (IOException e) {
			dimen[0] = 0;
			dimen[1] = 0;
			return dimen;
		}
    	return dimen;
    }	
	
	public static void drawOval(PDPage page, float x, float y, float height, float width) throws IOException {
		List<PDAnnotation> annotations = page.getAnnotations();
		PDAnnotationSquareCircle circle = new PDAnnotationSquareCircle(PDAnnotationSquareCircle.SUB_TYPE_CIRCLE);
		PDRectangle position = new PDRectangle();
		position.setLowerLeftX(x);
		position.setLowerLeftY(y);
		position.setUpperRightX(height);
		position.setUpperRightY(width);
		circle.setRectangle(position);

		annotations.add(circle);
	}
	
	public static void drawCircle(PDPageContentStream contentStream, float cx, float cy, float r, Color color, String strokeType) throws IOException {
	    final float k = 0.552284749831f;
	    contentStream.setStrokingColor(color);
	    contentStream.moveTo(cx - r, cy);
	    contentStream.curveTo(cx - r, cy + k * r, cx - k * r, cy + r, cx, cy + r);
	    contentStream.curveTo(cx + k * r, cy + r, cx + r, cy + k * r, cx + r, cy);
	    contentStream.curveTo(cx + r, cy - k * r, cx + k * r, cy - r, cx, cy - r);
	    contentStream.curveTo(cx - k * r, cy - r, cx - r, cy - k * r, cx - r, cy);
	    if(strokeType.equals("stroke")){
	    	contentStream.stroke();
	    }else{
	    	contentStream.fill();
	    }
	}	
	
	public static String format(int length, float value){
		DecimalFormat formatter = new DecimalFormat("###,###");
		return String.valueOf(String.format("%" + length + "s", formatter.format(value)));
	}

	public static String format(int length, String value){
		return String.valueOf(String.format("%" + length + "s", value));
	}
	public static String format(float value){
		DecimalFormat formatter = new DecimalFormat("###,###");
		String formatValue = String.valueOf(formatter.format(value));
		
		return String.valueOf(String.format("%" + formatValue.length() + "s", formatValue));
	}
	
	
	public static float drawTable(PDPageContentStream contentStream, float x, float y, float[] cellWidth, String[] cellTitle, int rowCount, float cellHeight, float fontSize, boolean title) throws Exception {
		float xPosition = x;
		float yPosition = y;
		PDFont font = PDType1Font.HELVETICA;
		if(rowCount>1){
			if(title){
				rowCount += 2;
			}else{
				rowCount += 1;
			}
		}else{
			rowCount += 1;
		}

		for(int j = 0; j <rowCount; j++){
	        for(int i = 0; i < cellWidth.length; i++) {
	        	if(i>0){
	        		xPosition += cellWidth[i-1];
	        		drawLine(contentStream, xPosition, yPosition, cellWidth[i], cellHeight);
	        	}else{
	        		drawLine(contentStream, xPosition, yPosition, cellWidth[i], cellHeight);
	        	}
	        	
		        if(j == 0){
		        	contentStream.setNonStrokingColor(Color.BLACK);
		        	float[] dimen = PDFBuilder.dim(font, fontSize, PDFBuilder.format(cellTitle[i].length(), cellTitle[i]));
		        	PDFBuilder.text(contentStream, xPosition + (cellWidth[i]/2) - dimen[0]/2, yPosition+ (cellHeight/2) - dimen[1]/2, PDFBuilder.format(cellTitle[i].length(), cellTitle[i]));
		        }
	        }
	        yPosition -= cellHeight;

	        //Draw Title
	        xPosition = x;
		}
		
		return yPosition;
	}	

	public static float drawSummaryTable(PDPageContentStream contentStream, float x, float y, float[] cellWidth, int rowCount, float cellHeight) throws Exception {
		float xPosition = x;
		float yPosition = y;
		
		for(int j = 0; j <rowCount; j++){
			for(int i = 0; i < cellWidth.length; i++) {
				drawLine(contentStream, xPosition, yPosition, cellWidth[i], cellHeight);
				xPosition += cellWidth[i];
			}
			yPosition -= cellHeight;
			xPosition = x;
		}
		
		return yPosition;
	}	
	
	public static void drawLine(PDPageContentStream contentStream, float xStart, float yStart, float xEnd, float yEnd) throws IOException {
		contentStream.moveTo(xStart,yStart);
		contentStream.lineTo(xEnd,yEnd);
		contentStream.stroke();
	}
	
	public static void drawRect(PDPageContentStream contentStream, float xStart, float yStart, float xEnd, float yEnd, String type) throws IOException {
		contentStream.addRect(xStart, yStart, xEnd, yEnd);
		if(type.equals("fill")) {
			contentStream.fillAndStroke();
		}else {
			contentStream.stroke();
		}
	}
	
	public static void addPage(PDDocument doc, PDPage page, PDPageContentStream contentStream, String paperSize, float pageWidth) throws IOException {
		if(contentStream != null){
			contentStream.close();
		}
        if(paperSize.equals("A4")){
        	page = new PDPage(PDRectangle.A4);
        }else{
        	page = new PDPage(PDRectangle.A3);
        }
        page.setRotation(90);
        doc.addPage(page);
        
		contentStream = new PDPageContentStream(doc, page, AppendMode.OVERWRITE, true, true);
		contentStream.transform(new Matrix(0, 1, -1, 0, pageWidth,   0));
	}
	
	public static void setBackColor(PDPageContentStream contentStream, Color color) throws IOException {
		contentStream.setNonStrokingColor(color);
	}
	
	public static void setForeColor(PDPageContentStream contentStream, Color color) throws IOException {
		contentStream.setNonStrokingColor(color);
	}
	
	public static void setLineColor(PDPageContentStream contentStream, Color color) throws IOException {
		contentStream.setStrokingColor(color);
	}
	
}