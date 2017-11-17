package com.bbi.rest.bussLogic;

import java.util.ArrayList;
import java.util.Set;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.bbi.rest.da.SimulatorDA;

public class Simulator {
	private static int objetcIndex;

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

	public static JSONObject chkID(String id, String idName,String resource) {
		Boolean chk = false;
		JSONArray resourceList = SimulatorDA.readFile(resource);
		JSONObject obj = new JSONObject();
		for (int i = 0; i < resourceList.size(); i++) {
			obj = (JSONObject) resourceList.get(i);
			if (obj.get(idName).toString().equals(id)) {
				System.out.println("------------------exist---------------");
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

	public static JSONObject filters(ArrayList<String> filtersList, JSONObject obj) {
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
	
	public static ArrayList<Map> fillFilteredListWithUpdatedValues(String subResource) {
		ArrayList<Map> filteredList = new ArrayList<Map>();
		Map map = new Map();
		int indexOfDelim = 0;
		int begOfCond = -1;
		String cond = "";
		while (indexOfDelim != -1) {
			indexOfDelim = subResource.indexOf("&", indexOfDelim + 1);
			if (indexOfDelim == -1) {
				cond = subResource.substring(begOfCond + 1);

			} else
				cond = subResource.substring(begOfCond + 1, indexOfDelim);
			String key = cond.substring(0, cond.indexOf("="));
			String value = cond.substring(cond.indexOf("="));
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
		JSONArray resourceList =SimulatorDA.readFile(resource);
		JSONObject obj = new JSONObject();
		ArrayList<JSONObject> outList = new ArrayList<JSONObject>();
		for (int i = 0; i < resourceList.size(); i++) {
			obj = (JSONObject) resourceList.get(i);
			outList.add(obj);
		}
		return outList;
	}

	public static ArrayList<JSONObject> getAllFilteredRecords(String resource,
			String subResource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);
		JSONObject obj = new JSONObject();
		ArrayList<String> filtersList = new ArrayList<String>();

		ArrayList<JSONObject> outList = new ArrayList<JSONObject>();
		filtersList = fillFilteredList(subResource);
		for (int i = 0; i < resourceList.size(); i++) {
			// obj = (JSONObject) resourceList.get(i);
			obj = filters(filtersList,
					(JSONObject) resourceList.get(i));
			outList.add(obj);
		}

		return outList;
	}

	public static JSONObject getObjectByID(String id, String idName, String resource) {
		System.out.println("id: "+id+" ,"+idName+" ,resource: "+ resource);
		JSONObject requiredObj = chkID(id, idName, resource
				);
		System.out.println("el obj aho : " + requiredObj);
		if (requiredObj == null) {
			System.out.println("---Not Found---");
			return null;
		} else
			return requiredObj;
	}

	public static JSONObject getFilteredRecords(String id, String subResource,
			String idName, String resource) {
		System.out.println("id, "+ id+" ,subRes: "+subResource +" ,idName: "+idName+" ,Resource: "+resource );
		ArrayList<String> filtersList = new ArrayList<String>();
		filtersList = fillFilteredList(subResource);
		JSONObject obj = getObjectByID(id, idName, resource);
		if (obj == null) {
			System.out.println("---Not Found---");
			return null;
		} else {
			JSONObject out = filters(filtersList, obj);

			if (out == null) {
				System.out.println("---Not Found---");
				return null;
			} else
				return out;
		}
	}

	public static void createObjectByID(JSONObject jsonlist, String idName,
			String resource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);

		System.out.println("-----------------arr----------------");
		String id = jsonlist.get(idName).toString();
		System.out.println(jsonlist.get(idName));
		JSONObject firstObj = (JSONObject) resourceList.get(0);

		System.out.println("--------ana ---------- "
				+ getObjectByID(id, idName, resource));
		Set<String> set1 = checkValidationOfPost(firstObj);
		Set<String> set2 = checkValidationOfPost(jsonlist);
		if (set2.containsAll(set1)) {
			JSONObject chkid = chkID(id, idName, resource
					);

			if (chkid == null) {
				System.out.println("=====ana hna=======");
				resourceList.add(jsonlist);
				SimulatorDA.write(resourceList, resource);
			} else {
				System.out.println("Not applicable, id already exist");
				// personObject= null;
			}
		} else {
			System.out.println("two objects dosn't have the same structure");
		}

	}

	public static void deleteObjectByID(String id, String idName, String resource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);
		JSONObject chkid = chkID(id, idName, resource);
		if (chkid != null) {
			System.out
					.println("------------------i get it i will delete it-------");
			System.out.println("Bef: " + resourceList.size());
			resourceList.remove(chkid);
			System.out.println("Aft: " + resourceList.size());
			SimulatorDA.write(resourceList, resource);
		} else {
			System.out.println("---Not Found ---");

		}

	}

	public static JSONObject updateMultipleFieldsByID(String id, String subResource,
			String idName, String resource) {
		// JSONObject out = new JSONObject();
		JSONArray resourceList = SimulatorDA.readFile(resource);
		ArrayList<Map> filtersList = new ArrayList<Map>();
		filtersList = fillFilteredListWithUpdatedValues(subResource);
		JSONObject obj = getObjectByID(id, idName, resource);
		if (obj == null) {
			System.out.println("---Not Found---");
			return null;
		} else {
			for (int i = 0; i < filtersList.size(); i++) {
				System.out.println("key: "
						+ filtersList.get(i).getKey().toString() + " ,val: "
						+ filtersList.get(i).getValue());
				obj.put(filtersList.get(i).getKey().toString(), filtersList
						.get(i).getValue());
			}

			// JSONObject out = filters(filtersList, obj);
			if (obj == null) {
				System.out.println("---Not Found---");
				return null;
			} else {
				System.out.println(obj.get("name") + " , ind: " + objetcIndex);
				resourceList.set(objetcIndex, obj);
				SimulatorDA.write(resourceList, resource);
				return obj;
			}
		}
	}

	public static JSONObject updateMultipleFieldsByFilters(JSONObject jsonlist,
			String idName, String resource) {
		JSONArray resourceList = SimulatorDA.readFile(resource);

		System.out.println("-----------------arr----------------");
		String id = jsonlist.get(idName).toString();
		System.out.println(jsonlist.get(idName));
		JSONObject firstObj = (JSONObject) resourceList.get(0);

		Set<String> set1 = checkValidationOfPost(firstObj);
		Set<String> set2 = checkValidationOfPost(jsonlist);
		if (set2.containsAll(set1)) {
			JSONObject chkid = chkID(id, idName, resource
					);

			if (chkid == null) {
				resourceList.add(jsonlist);
				SimulatorDA.write(resourceList, resource);
			} else {
				System.out.println("Not applicable, id already exist");
				// personObject= null;
			}
		} else {
			System.out.println("two objects dosn't have the same structure");
		}
		return jsonlist;
	}

}
