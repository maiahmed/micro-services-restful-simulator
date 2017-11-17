package com.bbi.rest.service;

import java.util.ArrayList;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.json.simple.JSONObject;

import com.bbi.rest.bussLogic.PATCH;
import com.bbi.rest.bussLogic.Simulator;

@Path("/{resource}")
public class SimulatorServiceImpl {

	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<JSONObject> getAll(@PathParam("resource") String resource) {
		return Simulator.getAll(resource);
	}

	@GET
	@Path("/filters-{subResource: .+}")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<JSONObject> getAllFilteredRecords(
			@PathParam("resource") String resource,
			@PathParam("subResource") String subResource) {
		return Simulator.getAllFilteredRecords(resource, subResource);
	}
	

	@GET
	@Path("/{idName}={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getObjectByID(@PathParam("id") String id,
			@PathParam("idName") String idName,
			@PathParam("resource") String resource) {
		return Simulator.getObjectByID(id, idName, resource);
	}
	
	@GET
	@Path("/{idName}={id}/filters-{subResource: .+}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject getFilteredRecords(@PathParam("id") String id,
			@PathParam("subResource") String subResource,
			@PathParam("idName") String idName,@PathParam("resource") String resource) {
		return Simulator.getFilteredRecords(id, subResource, idName, resource);
	}


	@POST
	@Path("/{idName}")
	@Produces(MediaType.APPLICATION_JSON)
	public void createObjectByID(JSONObject jsonlist,
			@PathParam("idName") String idName,
			@PathParam("resource") String resource) {
		Simulator.createObjectByID(jsonlist, idName, resource);
	}
	
	@PATCH
	@Path("/{idName}")
	@Produces(MediaType.APPLICATION_JSON)
	
	public JSONObject updateMultipleFieldsByFilters(JSONObject jsonlist,
			@PathParam("idName") String idName,
			@PathParam("resource") String resource) {
		return Simulator.updateMultipleFieldsByFilters(jsonlist, idName,
				resource);
	}

	@PATCH
	@Path("/{idName}={id}/filters-{subResource: .+}")
	@Produces(MediaType.APPLICATION_JSON)
	public JSONObject updateMultipleFieldsByID(@PathParam("id") String id,
			@PathParam("subResource") String subResource,
			@PathParam("idName") String idName,
			@PathParam("resource") String resource) {
		return Simulator.updateMultipleFieldsByID(id, subResource, idName,
				resource);
	}

	@DELETE
	@Path("/{idName}={id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteObjectByID(@PathParam("id") String id,
			@PathParam("idName") String idName,
			@PathParam("resource") String resource) {
		Simulator.deleteObjectByID(id, idName, resource);

	}

}
