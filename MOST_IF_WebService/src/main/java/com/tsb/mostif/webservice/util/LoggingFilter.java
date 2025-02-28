package com.tsb.mostif.webservice.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;

import org.glassfish.jersey.message.internal.ReaderWriter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tsb.most.framework.log.CommonLogUtil;

public class LoggingFilter implements ContainerRequestFilter, ContainerResponseFilter {

	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		StringBuilder sb = new StringBuilder();
//		sb.append("User: ").append(requestContext.getSecurityContext().getUserPrincipal() == null ? "unknown"
//				: requestContext.getSecurityContext().getUserPrincipal());
		sb.append(" - PATH: ").append(requestContext.getUriInfo().getPath() + "\n");
		sb.append(" - HEADER: ").append(requestContext.getHeaders() + "\n");
		sb.append(" - URI: ").append(requestContext.getUriInfo().getRequestUri().toString() + "\n");
		sb.append(" - ENTITY: ").append(getEntityBody(requestContext) + "\n");
		CommonLogUtil.out("HTTP REQUEST : START ===========================================================");
		CommonLogUtil.out(sb.toString());
		CommonLogUtil.out("HTTP REQUEST : END ===========================================================");
	}

	private String getEntityBody(ContainerRequestContext requestContext) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		InputStream in = requestContext.getEntityStream();

		final StringBuilder b = new StringBuilder();
		try {
			ReaderWriter.writeTo(in, out);

			byte[] requestEntity = out.toByteArray();
			if (requestEntity.length == 0) {
				b.append("").append("\n");
			} else {
				b.append(new String(requestEntity)).append("\n");
			}
			requestContext.setEntityStream(new ByteArrayInputStream(requestEntity));

		} catch (IOException ex) {
			// Handle logging error
		}
		return b.toString();
	}

	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)throws IOException {
		
		StringBuilder sb = new StringBuilder();
	
		sb.append(" - HEADER: ").append(responseContext.getHeaders() + "\n");
		sb.append(" - ENTITY: ");
		try {
			ObjectMapper map = new ObjectMapper();
			sb.append(map.writeValueAsString(responseContext.getEntity()));
		} catch (JsonProcessingException e) {
			sb.append("ERROR----------JsonProcessingException ----------");
			e.printStackTrace();
		}
		CommonLogUtil.out("HTTP RESPONSE : START ===========================================================");
		CommonLogUtil.out(sb.toString());
		CommonLogUtil.out("HTTP RESPONSE : END ===========================================================");
	}
	 
}
