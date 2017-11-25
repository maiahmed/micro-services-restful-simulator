package com.bbi.rest.bussLogic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.bbi.rest.da.SimulatorDA;

public class Simulator {
	private static int objetcIndex;

	// / name=dscs&type&id
	public static ArrayList<String> fillFilteredList(String subResource) {
		ArrayList<String> filtersList = new ArrayList<String>();
		int indexOfDelim = 0;
		int begOfCond = -1;
		String cond = "";
		while (indexOfDelim != -1) {
			indexOfDelim = subResource.indexOf("&", indexOfDelim + 1);
			if (indexOfDelim == -1) {
				cond = subResource.substring(begOfCond + 1);
			} else
				cond = subResource.substring(begOfCond + 1, indexOfDelim);
			filtersList.add(cond);
			System.out.println("filter:  " + cond);
			begOfCond = indexOfDelim;
			System.out.println("------------------------------");
		}

		return filtersList;

	}

	public static JSONObject chkID(String id, String resource) {
		if (!numberOrNot(id)) {
			System.out
					.println("Not applicable, id should be a number, please try again.");
			return null;
		} else {
			Boolean chk = false;
			JSONArray resourceList = SimulatorDA.readFile(resource);
			JSONObject obj = new JSONObject();
			for (int i = 0; i < resourceList.size(); i++) {
				obj = (JSONObject) resourceList.get(i);
				if (obj.get("ID").toString().equals(id)) {
					System.out
							.println("------------------exist---------------");
					chk = true;
					objetcIndex = i;
					break;
				}
			}
			if (chk) {
				return obj;
			} else {
				return null;
			}
		}
	}

	public static JSONObject filters(ArrayList<String> filtersList,
			JSONObject obj) {
		JSONObject out = new JSONObject();
		for (int i = 0; i < filtersList.size(); i++) {

			if (obj.get(filtersList.get(i)) == null)
				out.put(filtersList.get(i).toString(),
						"xxxxxxx InCorrect Key please check url xxxxxxxx");
			else
				out.put(filtersList.get(i).toString(),
						obj.get(filtersList.get(i)));
		}

		return out;

	}

	public static Set<String> checkValidationOfPost(JSONObject obj) {

		Set<String> keys = obj.keySet();
		System.out.println("-------------------Keys---------");

		System.out.println(keys);
		return keys;
	}

	public static ArrayList<Map> fillFilteredListWithUpdatedValues(
			String subResource, String resource) {
		ArrayList<Map> filteredList = new ArrayList<Map>();
		int indexOfDelim = 0;
		int begOfCond = -1;
		String cond = "";
		while (indexOfDelim != -1) {
			Map map = new Map();
			indexOfDelim = subResource.indexOf("&", indexOfDelim + 1);
			if (indexOfDelim == -1) {
				cond = subResource.substring(begOfCond + 1);

			} else
				cond = subResource.substring(begOfCond + 1, indexOfDelim);
			String key = cond.substring(0, cond.indexOf("="));
			String value = cond.substring(cond.indexOf("=") + 1);
			if (key.equals("ID")) {
				System.out.println("Hat2bdaty el id");
				if (chkID(value, resource) != null) {
					System.out
							.println("can't make update to this id because it's already exist");
					filteredList = null;
					break;
				}
			}
			System.out.println(key + " " + value);
			map.setKey(key);
			map.setValue(value);
			filteredList.add(map);
			// System.out.println("filter:  " + cond);
			begOfCond = indexOfDelim;
			System.out.println("------------------------------");
		}

		return filteredList;

	}

	public static int getObjectIndex() {
		return objetcIndex;

	}

	public static ArrayList<JSONObject> getAll(String resource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);
		JSONObject obj = new JSONObject();
		ArrayList<JSONObject> outList = new ArrayList<JSONObject>();
		for (int i = 0; i < resourceList.size(); i++) {
			obj = (JSONObject) resourceList.get(i);
			outList.add(obj);
		}
		if(outList==null)	throw new WebApplicationException(Response.Status.NOT_FOUND);
	    return outList;
	}

	public static ArrayList<JSONObject> getAllFilteredRecords(String resource,
			String subResource) {
		if (subResource == null) {
			System.out.println("please edit url with filtration or remove it");
			throw new WebApplicationException(Response.Status.BAD_REQUEST);
		} else {
			JSONArray resourceList = SimulatorDA.readFile(resource);
			JSONObject obj = new JSONObject();
			ArrayList<String> filtersList = new ArrayList<String>();

			ArrayList<JSONObject> outList = new ArrayList<JSONObject>();
			filtersList = fillFilteredList(subResource);
			for (int i = 0; i < resourceList.size(); i++) {
				// obj = (JSONObject) resourceList.get(i);
				obj = filters(filtersList, (JSONObject) resourceList.get(i));
				outList.add(obj);
			}

			return outList;
		}
	}

	public static JSONObject getObjectByID(String id, String resource) {
		System.out.println("id: " + id + " ," + " ,resource: " + resource);
		if (!numberOrNot(id)) {
			System.out.println("Not applicable, id should be a number, please try again.");
			return null;

		} else {
			JSONObject requiredObj = chkID(id, resource);
			System.out.println("el obj aho : " + requiredObj);

			if (requiredObj == null) {
				System.out.println("---Not Found---");
				
			return null;	
			} else{
				Response.ok(requiredObj).status(200).build(); // 201 is the response code
				return requiredObj;
			}
		}
	}

	public static JSONObject getFilteredRecords(String id, String subResource,
			String resource) {
		if (subResource == null) {
			System.out.println("please edit url with filtration or remove it");
			throw new WebApplicationException(Response.Status.BAD_REQUEST);
		} else {
			System.out.println("id, " + id + " ,subRes: " + subResource
					+ " ,Resource: " + resource);
			ArrayList<String> filtersList = new ArrayList<String>();
			if (!numberOrNot(id)) {
				System.out.println("Not applicable, id should be a number, please try again.");
				throw new WebApplicationException(Response.Status.BAD_REQUEST);

			} else {
				filtersList = fillFilteredList(subResource);
				JSONObject obj = getObjectByID(id, resource);
				if (obj == null) {
					System.out.println("---Not Found---");
					throw new WebApplicationException(Response.Status.NOT_FOUND);
				} else {
					JSONObject out = filters(filtersList, obj);

					if (out == null) {
						System.out.println("---Not Found---");
						throw new WebApplicationException(Response.Status.NOT_FOUND);
					} else
						return out;
				}
			}
		}
	}

	public static boolean numberOrNot(String input) {
		try {
			Integer.parseInt(input);
		} catch (NumberFormatException ex) {
			return false;
		}
		return true;
	}

	public static JSONObject createObjectByID(JSONObject jsonlist,
			String resource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);

		System.out.println("-----------------arr----------------");
		String id = jsonlist.get("ID").toString();
		System.out.println(jsonlist.get("ID"));
//		JSONObject firstObj = (JSONObject) resourceList.get(0);
		if (!numberOrNot(id)) {
			System.out
					.println("Not applicable, id should be a number, please try again.");
			throw new WebApplicationException(Response.Status.BAD_REQUEST);
		} else {
			System.out.println("--------ana ---------- "
					+ getObjectByID(id, resource));
//			Set<String> set1 = checkValidationOfPost(firstObj);
//			Set<String> set2 = checkValidationOfPost(jsonlist);
//			if (set2.containsAll(set1)) {
				JSONObject chkid = chkID(id, resource);

				if (chkid == null) {
					System.out.println("=====ana hna=======");
					resourceList.add(jsonlist);
					SimulatorDA.write(resourceList, resource);
					Response.ok(jsonlist).status(200).build(); // 201 is the response code
					return jsonlist;
				} else {
					System.out.println("Not applicable, id already exist");
					throw new WebApplicationException(Response.Status.NOT_FOUND);
				}
			
				
		}

	}

	public static void deleteObjectByID(String id, String resource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);
		JSONObject chkid = chkID(id, resource);
		if (chkid != null) {
			System.out
					.println("------------------i get it i will delete it-------");
			System.out.println("Bef: " + resourceList.size());
			resourceList.remove(chkid);
			System.out.println("Aft: " + resourceList.size());
			SimulatorDA.write(resourceList, resource);
			 throw new WebApplicationException(Response.Status.OK);
		} else {
			System.out.println("---Not Found ---");
			throw new WebApplicationException(Response.Status.NOT_FOUND);

		}

	}

	public static JSONObject updateMultipleFieldsByID(String id,
			String subResource, String resource) {
		// JSONObject out = new JSONObject();
		JSONArray resourceList = SimulatorDA.readFile(resource);
		ArrayList<Map> filtersList = new ArrayList<Map>();
		filtersList = fillFilteredListWithUpdatedValues(subResource, resource);
		if (filtersList == null) {
			System.out.println("Can't update with this ID");
			throw new WebApplicationException(Response.Status.BAD_REQUEST);

		} else {
			JSONObject obj = getObjectByID(id, resource);
			resourceList.remove(obj);

			if (obj == null) {
				System.out.println("---Not Found---");
				throw new WebApplicationException(Response.Status.NOT_FOUND);

			} else {
				for (int i = 0; i < filtersList.size(); i++) {
					System.out.println("key: "
							+ filtersList.get(i).getKey().toString()
							+ " ,val: " + filtersList.get(i).getValue());
					obj.put(filtersList.get(i).getKey().toString(), filtersList
							.get(i).getValue());
				}

				// JSONObject out = filters(filtersList, obj);
				if (obj == null) {
					System.out.println("---Not Found---");
					throw new WebApplicationException(Response.Status.NOT_FOUND);
				} else {
					System.out.println(obj.get("name") + " , ind: "
							+ getObjectIndex());
					resourceList.remove(obj);
					resourceList.add(obj);
					SimulatorDA.write(resourceList, resource);
					return obj;
				}
			}
		}
	}

	public static JSONObject updateMultipleFieldsByFilters(JSONObject jsonlist,
			String resource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);

		System.out.println("-----------------arr----------------");
		String id = jsonlist.get("ID").toString();
		if (!numberOrNot(id)) {
			System.out
					.println("Not applicable to update, id should be a number, please try again.");
			throw new WebApplicationException(Response.Status.BAD_REQUEST);

		} else {
			System.out.println(jsonlist.get("ID"));
			JSONObject firstObj = (JSONObject) resourceList.get(0);
			JSONObject updatedOne = (JSONObject) resourceList
					.get(getObjectIndex());
			Set<String> set1 = checkValidationOfPost(firstObj);
			Set<String> set2 = checkValidationOfPost(jsonlist);
			if (set2.containsAll(set1)) {
				JSONObject chkid = chkID(id, resource);

				if (chkid == null) { // / not found
					System.out.println("Not applicable,,, id does not exist");
					throw new WebApplicationException(Response.Status.NOT_FOUND);

				} else { // exist so i will update it
					resourceList.remove(updatedOne);
					resourceList.add(jsonlist);
					SimulatorDA.write(resourceList, resource);
					// personObject= null;
				}
			} else {
				System.out
						.println("two objects dosn't have the same structure");
				throw new WebApplicationException(Response.Status.FORBIDDEN);

			}
			return jsonlist;
		}
	}

	public static ArrayList<JSONObject> getAllFilteredRecordsWithConditions(
			String resource, String subResourceFilter, String subResourceCond) {
		// filters-id/conditions-name=Mai&type=no

		ArrayList<String> filtersList = new ArrayList<String>();
		filtersList = fillFilteredList(subResourceFilter);
		ArrayList<Map> condList = fillFilteredListWithUpdatedValues(
				subResourceCond, resource);
		JSONArray resourceList = SimulatorDA.readFile(resource);
		JSONObject obj;
		ArrayList<JSONObject> outList = new ArrayList<JSONObject>();

		for (int i = 0; i < resourceList.size(); i++) {
			obj = (JSONObject) resourceList.get(i);
			boolean chkCond = true;
			for (int j = 0; j < condList.size(); j++) {
				if (!obj.get(condList.get(j).getKey()).equals(
						condList.get(j).getValue())) {
					chkCond = false;
					break;
				}
			}
			if (chkCond == true) {
				JSONObject out;
				if (subResourceFilter.isEmpty()) { // get all
					out = (JSONObject) resourceList.get(i);
				} else {
					out = filters(filtersList, (JSONObject) resourceList.get(i));
				}
				outList.add(out);
			}
		}
		if(outList==null)throw new WebApplicationException(Response.Status.NOT_FOUND);
		return outList;
	}
}
