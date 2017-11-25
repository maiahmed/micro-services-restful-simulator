package com.bbi.rest.service;

import java.util.ArrayList;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.simple.JSONObject;

import com.bbi.rest.bussLogic.PATCH;
import com.bbi.rest.bussLogic.Simulator;

@Path("/{resource}")
public class SimulatorServiceImpl {
     
	
	// http://localhost:8080/WS_restful-simulator/rest/campaigns.json/
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<JSONObject> getAll(@PathParam("resource") String resource) {
		return Simulator.getAll(resource);
	}
	
	//http://localhost:8080/WS_restful-simulator/rest/campaigns.json/filters-name&type
	
	@GET
	@Path("/filters-{subResource: .+}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<JSONObject> getAllFilteredRecords(
			@PathParam("resource") String resource,
			@PathParam("subResource") String subResource) {
		return Simulator.getAllFilteredRecords(resource, subResource);
	}
	
	
	
	//http://localhost:8080/WS_restful-simulator/rest/campaigns.json/filters-id/conditions-name=Mai&type=no
	
	@GET
	@Path("/filters-{subResourceFilter: .*}/conditions-{subResourceCond: .+}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<JSONObject> getAllFilteredRecordsWithConditions(
			@PathParam("resource") String resource,
			@PathParam("subResourceFilter") String subResourceFilter,
			@PathParam("subResourceCond") String subResourceCond) {
		ArrayList<JSONObject> obj = Simulator.getAllFilteredRecordsWithConditions(resource, subResourceFilter,subResourceCond);
		
			return Simulator.getAllFilteredRecordsWithConditions(resource, subResourceFilter,subResourceCond);
	}
	
	
	
	//http://localhost:8080/WS_restful-simulator/rest/campaigns.json/campaign_id=30
	
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getObjectByID(@PathParam("id") String id,
			@PathParam("resource") String resource) {
		JSONObject obj = Simulator.getObjectByID(id, resource);
		if(obj==null || id.equals(null))
			throw new WebApplicationException(Response.Status.NOT_FOUND);
		Response.ok(obj).status(200).build(); // 201 is the response code
		return obj;
	}
	
	//http://localhost:8080/WS_restful-simulator/rest/campaigns.json/campaign_id=30/filters-name&type
	
	@GET
	@Path("/{id}/filters-{subResource: .+}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getFilteredRecords(@PathParam("id") String id,
			@PathParam("subResource") String subResource,
			@PathParam("resource") String resource) {
		return Simulator.getFilteredRecords(id, subResource, resource);
	}

	
	//http://localhost:8080/WS_restful-simulator/rest/campaigns.json/campaign_id
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject createObjectByID(JSONObject jsonlist,
			@PathParam("resource") String resource) {
		JSONObject obj = Simulator.createObjectByID(jsonlist, resource);
		Response.ok(obj).status(200).build(); // 200 is the response code

		return obj;
	}
	
	//http://localhost:8080/WS_restful-simulator/rest/campaigns.json/campaign_id
	@PATCH
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	
	public JSONObject updateMultipleFieldsByFilters(JSONObject jsonlist,
			
			@PathParam("resource") String resource) {
		JSONObject obj = Simulator.updateMultipleFieldsByFilters(jsonlist,
				resource);
		Response.ok(obj).status(200).build(); // 201 is the response code
		return obj;
	}

	// http://localhost:8080/WS_restful-simulator/rest/campaigns.json/campaign_id=300/filters-name=pppp
	@PATCH
	@Path("/{id}/filters-{subResource: .+}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject updateMultipleFieldsByID(@PathParam("id") String id,
			@PathParam("subResource") String subResource,
			
			@PathParam("resource") String resource) {
		return Simulator.updateMultipleFieldsByID(id, subResource,
				resource);
	}
	
	// http://localhost:8080/WS_restful-simulator/rest/campaigns.json/campaign_id=300/
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteObjectByID(@PathParam("id") String id,
			@PathParam("resource") String resource) {
		
		Simulator.deleteObjectByID(id, resource);
		

	}

}
