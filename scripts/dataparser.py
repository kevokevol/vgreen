import xlrd
import json
import googlemaps
from datetime import datetime


def convert_excel_to_json(path_to_excel):
	workbook = xlrd.open_workbook(path_to_excel, on_demand = True)
	worksheet = workbook.sheet_by_index(0)

	print(worksheet.cell(0, 0).value)

	plants = []
	for row in range(2, worksheet.nrows):
		try:
			plant_dict = {
				"code": int(worksheet.cell(row, 0).value),
				"name": str(worksheet.cell(row, 1).value),
				"state": str(worksheet.cell(row, 2).value),
				"generation": str(worksheet.cell(row, 8).value),
				"total_fuel_consumption": int(worksheet.cell(row, 10).value),
				"fuel_consumption_per_kwh": int(worksheet.cell(row, 11).value),
				"carbon_emission": str(worksheet.cell(row, 15).value)
			}
		except ValueError as e:
			break
		plants.append(plant_dict)

	# print(json.dumps(plants, indent=4, sort_keys=True))

	return plants


def save_to_file(plants, path_to_output):
	print(json.dumps(plants, indent=4, sort_keys=True))
	with open(path_to_output, 'w') as outfile:  
	    json.dump(plants, outfile)


def add_power_plant_locations(power_plants, api_key):
	gmaps = googlemaps.Client(key=api_key)
	plants_and_locations = []

	for index, plant in enumerate(power_plants):
		# print(json.dumps(gmaps.geocode(plant["name"] + ", " + plant["state"]), indent=4, sort_keys=True))
		try:
			location = gmaps.geocode(plant["name"] + ", " + plant["state"])[0]["geometry"]["location"]
			print(location)
			plant.update(location)
			plants_and_locations.append(plant)
		except IndexError as e:
			pass


	# Geocoding an address
	# geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')
	print("Number of plants with locations {}".format(len(plants_and_locations)))
	return plants_and_locations


if __name__ == "__main__":
	plants = convert_excel_to_json("data/emissions2017.xlsx")
	plants_and_locations = add_power_plant_locations(plants, "AIzaSyBjlvKLxlKPB05QKCmp4NRhV5nSvd9TJ-s")
	save_to_file(plants_and_locations, "data/power_plants.json")
