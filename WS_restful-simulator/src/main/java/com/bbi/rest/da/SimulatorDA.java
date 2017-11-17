package com.bbi.rest.da;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.net.URL;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class SimulatorDA {


	public static void write(JSONArray resourceList, String resource) {
		System.out.println("----------Write---------------");
		ClassLoader classLoader = Thread.currentThread()
				.getContextClassLoader();
		URL path = classLoader.getResource(resource);
		String decoded = java.net.URLDecoder.decode(path.getPath());
		System.out.println("Decoded: " + decoded);
//		FileWriter file;
		
		try {
			File f = new File(path.toURI());
			OutputStream output = new FileOutputStream(f);
			byte[] arr = resourceList.toString().getBytes();
			output.write(arr);
			
//			file = new FileWriter(decoded);
//			file.write(resourceList.toJSONString());
//			System.out.println("----------WriteDone--------------");
//			file.close();
		} catch (IOException | URISyntaxException e) {
			System.out.println(getMsg("Error Path while writing"));
			// e.printStackTrace();
		}

	}

	public static JSONArray readFile(String resource) {
		JSONParser parser = new JSONParser();
		JSONArray resourceList = new JSONArray();
		Object obj = null;
		try {
			System.out.println("path : " + resource);
			String result = "";
			ClassLoader classLoader = Thread.currentThread()
					.getContextClassLoader();
			try {
				result = IOUtils.toString(classLoader
						.getResourceAsStream(resource));
			} catch (IOException e) {
				e.printStackTrace();
			}
			obj = parser.parse(result);
			resourceList = (JSONArray) obj;
			System.out.println("----------Read is Done--------------");
		} catch (ParseException e) {
			System.out
					.println("------------------Error path----------------------");
			System.out.println(getMsg("Error path"));
			// e.printStackTrace();
		}
		return resourceList;
	}

	public static String getMsg(String msg) {
		String output = "Jersey say : " + msg;
		return output;
	}

}
