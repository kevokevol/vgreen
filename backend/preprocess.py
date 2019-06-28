import heapq
import random

def get_renewable_output(db_con):
    row = db_con.getProduction(9999)
    row = int(row[0])/1000000 # GWh
    return row

def get_total_power(db_con):
    row = db_con.getTotalConsumption()
    row = int(row[0])/1000 # MWh
    return row

def euclidean(coord1, coord2):
    return abs((coord1[0]-coord2[0])**2 - (coord1[1]-coord2[1])**2)

def push_const_size_heap(heap, size, el):
    if len(heap) < size:
        heapq.heappush(heap, el)
    else:
        heapq.heappushpop(heap, el)

def get_each_emission(db_con):
    dc_rows = db_con.getTable("datacenters")
    state_pc = {}
    total_emission = 0
    processed_data = []
    for row in dc_rows:
        dc_row = list(row[:5])
        if row[5] is not None:
            heap = []
            dc_consumption = row[4]
            dc_state = row[5]
            if dc_state not in state_pc:
                state_pc[dc_state] = db_con.getTableInState("powercenters", dc_state)
            power_centers = state_pc[dc_state]

            dc_coords = row[2:4]
            for power_center in power_centers:
                if power_center[4] > 0:
                    pc_coords = power_center[2:4]
                    dist = euclidean(dc_coords, pc_coords)
                    push_const_size_heap(heap, 3, (-dist, power_center))
            
            total_nearby_power = sum([pc[1][4] for pc in heap])

            # if dc_state == "HI":
            #     print(heap)

            avg_emission = 0
            for pc in heap:
                emission_per_kwh = pc[1][5]/pc[1][4]
                kwh_drawn = dc_consumption * pc[1][4]/total_nearby_power
                emission_contrib = emission_per_kwh * kwh_drawn
                avg_emission += emission_contrib
            total_emission += avg_emission
            dc_row.append(avg_emission/(dc_consumption/1000)) # MWh
        else:
            random_emission = random.random() * 0.9 + 0.6
            dc_row.append(random_emission)
        processed_data.append(dc_row)
    return total_emission, processed_data




from sqlconnector import DB_Connector
con = DB_Connector("root", "ca$hm0ney", "roketto-dan.c0k9vwwy6vyu.us-west-1.rds.amazonaws.com", "roketto_dan")
get_each_emission(con)