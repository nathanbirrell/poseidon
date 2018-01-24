export default function () {
  return [{
    "id": 4,
    "name": "The Bluff, 13th Beach",
    "description": "Steep, barrelling lefts/rights when the banks are right. Often peaky, breaking on sandy reef bottom. Long stretch of beach, can get crowded. Find it opposite the shipping beacon.",
    "season": "Winter",
    "latitude": "-38.287879",
    "longitude": "144.476408",
    "image": "https://i.ytimg.com/vi/VdKmXq5dFJs/maxresdefault.jpg",
    "region_id": 2,
    "wave_model_lat": "-38.608",
    "wave_model_lon": "144.501",
    "weighting_swell": "0.4",
    "weighting_wind": "0.4",
    "weighting_tide": "0.2",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "1.2",
          "min": "0.29",
          "max": "2.01",
          "mixed_min": "0.42",
          "mixed_max": "1.88",
          "optimal_min": "0.5",
          "optimal_max": "1.8",
          "in_3_hours": "1.14"
        },
        "direction": {
          "type": "direction",
          "optimal": "225.0",
          "min": "191.9",
          "max": "258.1",
          "mixed_min": "197.0",
          "mixed_max": "253.0",
          "optimal_min": "200.0",
          "optimal_max": "250.0",
          "in_3_hours": 240
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "15.0",
          "min": "-4.8",
          "max": "34.8",
          "mixed_min": "-1.8",
          "mixed_max": "31.8",
          "optimal_min": "0.0",
          "optimal_max": "30.0",
          "in_3_hours": "19.4"
        },
        "direction": {
          "type": "direction",
          "optimal": "325.0",
          "min": "278.7",
          "max": "371.3",
          "mixed_min": "285.9",
          "mixed_max": "364.1",
          "optimal_min": "290.0",
          "optimal_max": "360.0",
          "in_3_hours": 162
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": null,
          "min": null,
          "max": null,
          "mixed_min": null,
          "mixed_max": null,
          "optimal_min": "0.0",
          "optimal_max": "0.0",
          "in_3_hours": "0.79"
        }
      }
    },
    "next_tide": {
      "id": 1539,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 4,
      "created_at": "2018-01-17T11:40:38.624+11:00",
      "updated_at": "2018-01-17T11:40:38.624+11:00",
      "date_time": "2018-01-24T11:23:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1538,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 4,
      "created_at": "2018-01-17T11:40:38.617+11:00",
      "updated_at": "2018-01-17T11:40:38.617+11:00",
      "date_time": "2018-01-24T05:31:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1539,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 4,
      "created_at": "2018-01-17T11:40:38.624+11:00",
      "updated_at": "2018-01-17T11:40:38.624+11:00",
      "date_time": "2018-01-24T11:23:00.000+11:00"
    },
    "region": {
      "id": 2,
      "name": "Surf Coast",
      "description": "West of Melbourne, along the Great Ocean Rd.",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.477+11:00",
      "updated_at": "2017-11-29T08:11:59.477+11:00"
    },
    "works_on_all_tides?": true,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "66.0",
    "url": "http://localhost:5000/spots/4.json",
    "current_swell": {
      "id": 2810,
      "size": "1.140999996662141",
      "period": "14.289999961853",
      "direction": 240,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "95.68",
      "direction_rating": "85.6",
      "size_rating": "99.992331355258560193723887469369372237347",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 9404,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "16.3",
      "direction": 163,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "99.69955555555555555518",
      "rating": "19.94"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.320+11:00",
      "height": "0.44",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": 100,
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:31:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:23:00.000+11:00"
      }
    },
    "features": [{
      "id": 3,
      "key": "WAVE_DIRECTION",
      "value": "LEFT_AND_RIGHT",
      "friendly_name": "Lefts and rights",
      "icon": "chevrons-up"
    }, {
      "id": 5,
      "key": "BREAK_TYPE",
      "value": "BEACH",
      "friendly_name": "Beachie",
      "icon": null
    }, {
      "id": 6,
      "key": "BREAK_FLOOR",
      "value": "SAND",
      "friendly_name": "Sand",
      "icon": null
    }, {
      "id": 8,
      "key": "SWELL_EXPOSURE",
      "value": "HIGH",
      "friendly_name": "Swell magnet",
      "icon": "target"
    }, {
      "id": 10,
      "key": "WIND_EXPOSURE",
      "value": "HIGH",
      "friendly_name": null,
      "icon": null
    }, {
      "id": 13,
      "key": "CROWDS",
      "value": "LOW",
      "friendly_name": "Usually uncrowded",
      "icon": null
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }]
  }, {
    "id": 5,
    "name": "Woolamai",
    "description": "Exposed beach break on Phillip Island.",
    "season": "All year",
    "latitude": "-38.543488",
    "longitude": "145.336881",
    "image": "",
    "region_id": 3,
    "wave_model_lat": "-39.196",
    "wave_model_lon": "145.096",
    "weighting_swell": "0.5",
    "weighting_wind": "0.5",
    "weighting_tide": "0.1",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "1.5",
          "min": "0.18",
          "max": "2.82",
          "mixed_min": "0.38",
          "mixed_max": "2.62",
          "optimal_min": "0.5",
          "optimal_max": "2.5",
          "in_3_hours": "1.3"
        },
        "direction": {
          "type": "direction",
          "optimal": "245.0",
          "min": "225.2",
          "max": "264.8",
          "mixed_min": "228.2",
          "mixed_max": "261.8",
          "optimal_min": "230.0",
          "optimal_max": "260.0",
          "in_3_hours": 240
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "7.5",
          "min": "-2.4",
          "max": "17.4",
          "mixed_min": "-0.9",
          "mixed_max": "15.9",
          "optimal_min": "0.0",
          "optimal_max": "15.0",
          "in_3_hours": "22.2"
        },
        "direction": {
          "type": "direction",
          "optimal": "30.0",
          "min": "-9.7",
          "max": "69.7",
          "mixed_min": "-3.5",
          "mixed_max": "63.5",
          "optimal_min": "0.0",
          "optimal_max": "60.0",
          "in_3_hours": 171
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": null,
          "min": null,
          "max": null,
          "mixed_min": null,
          "mixed_max": null,
          "optimal_min": "0.0",
          "optimal_max": "0.0",
          "in_3_hours": "0.78"
        }
      }
    },
    "next_tide": {
      "id": 1578,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 5,
      "created_at": "2018-01-17T11:40:43.278+11:00",
      "updated_at": "2018-01-17T11:40:43.278+11:00",
      "date_time": "2018-01-24T11:24:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1577,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 5,
      "created_at": "2018-01-17T11:40:43.273+11:00",
      "updated_at": "2018-01-17T11:40:43.273+11:00",
      "date_time": "2018-01-24T05:32:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1578,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 5,
      "created_at": "2018-01-17T11:40:43.278+11:00",
      "updated_at": "2018-01-17T11:40:43.278+11:00",
      "date_time": "2018-01-24T11:24:00.000+11:00"
    },
    "region": {
      "id": 3,
      "name": "Phillip Island",
      "description": "East of Melbourne",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.480+11:00",
      "updated_at": "2017-11-29T08:11:59.480+11:00"
    },
    "works_on_all_tides?": true,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "60.0",
    "url": "http://localhost:5000/spots/5.json",
    "current_swell": {
      "id": 2871,
      "size": "1.303999996185304",
      "period": "14.289999961853",
      "direction": 240,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "97.74",
      "direction_rating": "95.55555555555555555",
      "size_rating": "98.46335994018556613792377710336",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 9570,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "18.5",
      "direction": 162,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "13.955555555555555555555555569",
      "rating": "2.79"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.402+11:00",
      "height": "0.44",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": 100,
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:32:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:24:00.000+11:00"
      }
    },
    "features": [{
      "id": 3,
      "key": "WAVE_DIRECTION",
      "value": "LEFT_AND_RIGHT",
      "friendly_name": "Lefts and rights",
      "icon": "chevrons-up"
    }, {
      "id": 5,
      "key": "BREAK_TYPE",
      "value": "BEACH",
      "friendly_name": "Beachie",
      "icon": null
    }, {
      "id": 6,
      "key": "BREAK_FLOOR",
      "value": "SAND",
      "friendly_name": "Sand",
      "icon": null
    }, {
      "id": 8,
      "key": "SWELL_EXPOSURE",
      "value": "HIGH",
      "friendly_name": "Swell magnet",
      "icon": "target"
    }, {
      "id": 10,
      "key": "WIND_EXPOSURE",
      "value": "HIGH",
      "friendly_name": null,
      "icon": null
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 15,
      "key": "IS_TOILET",
      "value": null,
      "friendly_name": "Toilet",
      "icon": null
    }]
  }, {
    "id": 8,
    "name": "Gunnamatta",
    "description": "A range of left and right beach breaks, very consistent and exposed.",
    "season": "Summer",
    "latitude": "-38.447245",
    "longitude": "144.855312",
    "image": "",
    "region_id": 1,
    "wave_model_lat": "-38.608",
    "wave_model_lon": "144.501",
    "weighting_swell": "0.5",
    "weighting_wind": "0.5",
    "weighting_tide": "0.0",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "1.2",
          "min": "-0.12",
          "max": "2.52",
          "mixed_min": "0.08",
          "mixed_max": "2.32",
          "optimal_min": "0.2",
          "optimal_max": "2.2",
          "in_3_hours": "1.3"
        },
        "direction": {
          "type": "direction",
          "optimal": "235.0",
          "min": "201.9",
          "max": "268.1",
          "mixed_min": "207.0",
          "mixed_max": "263.0",
          "optimal_min": "210.0",
          "optimal_max": "260.0",
          "in_3_hours": 240
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "10.0",
          "min": "-3.2",
          "max": "23.2",
          "mixed_min": "-1.2",
          "mixed_max": "21.2",
          "optimal_min": "0.0",
          "optimal_max": "20.0",
          "in_3_hours": "22.8"
        },
        "direction": {
          "type": "direction",
          "optimal": "397.5",
          "min": "341.3",
          "max": "453.7",
          "mixed_min": "350.0",
          "mixed_max": "445.0",
          "optimal_min": "355.0",
          "optimal_max": "440.0",
          "in_3_hours": 168
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": null,
          "min": null,
          "max": null,
          "mixed_min": null,
          "mixed_max": null,
          "optimal_min": "0.0",
          "optimal_max": "0.0",
          "in_3_hours": "0.78"
        }
      }
    },
    "next_tide": {
      "id": 1695,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 8,
      "created_at": "2018-01-17T11:41:03.400+11:00",
      "updated_at": "2018-01-17T11:41:03.400+11:00",
      "date_time": "2018-01-24T11:24:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1694,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 8,
      "created_at": "2018-01-17T11:41:03.395+11:00",
      "updated_at": "2018-01-17T11:41:03.395+11:00",
      "date_time": "2018-01-24T05:32:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1695,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 8,
      "created_at": "2018-01-17T11:41:03.400+11:00",
      "updated_at": "2018-01-17T11:41:03.400+11:00",
      "date_time": "2018-01-24T11:24:00.000+11:00"
    },
    "region": {
      "id": 1,
      "name": "Mornington Peninsula",
      "description": "East of Melbourne.",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.473+11:00",
      "updated_at": "2017-11-29T08:11:59.473+11:00"
    },
    "works_on_all_tides?": true,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "56.0",
    "url": "http://localhost:5000/spots/8.json",
    "current_swell": {
      "id": 3054,
      "size": "1.303999996185304",
      "period": "14.289999961853",
      "direction": 240,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "99.26",
      "direction_rating": "98.4",
      "size_rating": "99.56736003173827013792377710336",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 10068,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "19.1",
      "direction": 162,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "66.876",
      "rating": "13.38"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.549+11:00",
      "height": "0.44",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": 100,
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:32:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:24:00.000+11:00"
      }
    },
    "features": [{
      "id": 3,
      "key": "WAVE_DIRECTION",
      "value": "LEFT_AND_RIGHT",
      "friendly_name": "Lefts and rights",
      "icon": "chevrons-up"
    }, {
      "id": 5,
      "key": "BREAK_TYPE",
      "value": "BEACH",
      "friendly_name": "Beachie",
      "icon": null
    }, {
      "id": 8,
      "key": "SWELL_EXPOSURE",
      "value": "HIGH",
      "friendly_name": "Swell magnet",
      "icon": "target"
    }, {
      "id": 10,
      "key": "WIND_EXPOSURE",
      "value": "HIGH",
      "friendly_name": null,
      "icon": null
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 15,
      "key": "IS_TOILET",
      "value": null,
      "friendly_name": "Toilet",
      "icon": null
    }, {
      "id": 17,
      "key": "HANDLES_BIG_SWELL",
      "value": null,
      "friendly_name": "Handles big swells",
      "icon": "alert-triangle"
    }]
  }, {
    "id": 1,
    "name": "Portsea Back Beach",
    "description": "Portsea Back Beach in Mornington Peninsula is an exposed beach break that has very consistent waves and works all around the year. Very bank-dependent and can get busy when the banks are working. The best wind direction is from the northeast. Groundswells are more common than windswells and the optimum swell angle is from the southwest. The beach break provides left and right handers. Best around mid tide. It very rarely gets crowded here. Watch out for rips, locals and sharks.",
    "season": "All year",
    "latitude": "-38.340116",
    "longitude": "144.698524",
    "image": "http://www.surf-forecast.com/system/images/2960/large/Portsea-Back-Beach.jpg",
    "region_id": 1,
    "wave_model_lat": "-38.608",
    "wave_model_lon": "144.501",
    "weighting_swell": "0.4",
    "weighting_wind": "0.4",
    "weighting_tide": "0.2",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "1.0",
          "min": "0.21",
          "max": "1.79",
          "mixed_min": "0.33",
          "mixed_max": "1.67",
          "optimal_min": "0.4",
          "optimal_max": "1.6",
          "in_3_hours": "1.3"
        },
        "direction": {
          "type": "direction",
          "optimal": "225.0",
          "min": "172.1",
          "max": "277.9",
          "mixed_min": "180.3",
          "mixed_max": "269.7",
          "optimal_min": "185.0",
          "optimal_max": "265.0",
          "in_3_hours": 240
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "7.5",
          "min": "-2.4",
          "max": "17.4",
          "mixed_min": "-0.9",
          "mixed_max": "15.9",
          "optimal_min": "0.0",
          "optimal_max": "15.0",
          "in_3_hours": "22.8"
        },
        "direction": {
          "type": "direction",
          "optimal": "402.5",
          "min": "339.7",
          "max": "465.3",
          "mixed_min": "349.4",
          "mixed_max": "455.6",
          "optimal_min": "355.0",
          "optimal_max": "450.0",
          "in_3_hours": 168
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": "0.9",
          "min": "-0.3",
          "max": "2.1",
          "mixed_min": "-0.1",
          "mixed_max": "1.9",
          "optimal_min": "0.0",
          "optimal_max": "1.8",
          "in_3_hours": "0.78"
        }
      }
    },
    "next_tide": {
      "id": 1422,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 1,
      "created_at": "2018-01-17T11:40:20.279+11:00",
      "updated_at": "2018-01-17T11:40:20.279+11:00",
      "date_time": "2018-01-24T11:24:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1421,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 1,
      "created_at": "2018-01-17T11:40:20.272+11:00",
      "updated_at": "2018-01-17T11:40:20.272+11:00",
      "date_time": "2018-01-24T05:32:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1422,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 1,
      "created_at": "2018-01-17T11:40:20.279+11:00",
      "updated_at": "2018-01-17T11:40:20.279+11:00",
      "date_time": "2018-01-24T11:24:00.000+11:00"
    },
    "region": {
      "id": 1,
      "name": "Mornington Peninsula",
      "description": "East of Melbourne.",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.473+11:00",
      "updated_at": "2017-11-29T08:11:59.473+11:00"
    },
    "works_on_all_tides?": false,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "55.0",
    "url": "http://localhost:5000/spots/1.json",
    "current_swell": {
      "id": 2627,
      "size": "1.303999996185304",
      "period": "14.289999961853",
      "direction": 240,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "92.15",
      "direction_rating": "94.375",
      "size_rating": "89.731555813269729938419454714505767285824",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 8906,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "19.1",
      "direction": 162,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "4.31288888888888888888888890384",
      "rating": "0.86"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.148+11:00",
      "height": "0.44",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": "89.5506172840316",
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:32:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:24:00.000+11:00"
      }
    },
    "features": [{
      "id": 3,
      "key": "WAVE_DIRECTION",
      "value": "LEFT_AND_RIGHT",
      "friendly_name": "Lefts and rights",
      "icon": "chevrons-up"
    }, {
      "id": 5,
      "key": "BREAK_TYPE",
      "value": "BEACH",
      "friendly_name": "Beachie",
      "icon": null
    }, {
      "id": 6,
      "key": "BREAK_FLOOR",
      "value": "SAND",
      "friendly_name": "Sand",
      "icon": null
    }, {
      "id": 8,
      "key": "SWELL_EXPOSURE",
      "value": "HIGH",
      "friendly_name": "Swell magnet",
      "icon": "target"
    }, {
      "id": 13,
      "key": "CROWDS",
      "value": "LOW",
      "friendly_name": "Usually uncrowded",
      "icon": null
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 3,
      "key": "WAVE_DIRECTION",
      "value": "LEFT_AND_RIGHT",
      "friendly_name": "Lefts and rights",
      "icon": "chevrons-up"
    }, {
      "id": 5,
      "key": "BREAK_TYPE",
      "value": "BEACH",
      "friendly_name": "Beachie",
      "icon": null
    }, {
      "id": 6,
      "key": "BREAK_FLOOR",
      "value": "SAND",
      "friendly_name": "Sand",
      "icon": null
    }, {
      "id": 8,
      "key": "SWELL_EXPOSURE",
      "value": "HIGH",
      "friendly_name": "Swell magnet",
      "icon": "target"
    }, {
      "id": 13,
      "key": "CROWDS",
      "value": "LOW",
      "friendly_name": "Usually uncrowded",
      "icon": null
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 15,
      "key": "IS_TOILET",
      "value": null,
      "friendly_name": "Toilet",
      "icon": null
    }]
  }, {
    "id": 7,
    "name": "Lorne Point",
    "description": "Right-hand sandy point break that works best with big swells, popular longboarding spot otherwise.",
    "season": "Winter",
    "latitude": "-38.542989",
    "longitude": "143.980516",
    "image": "",
    "region_id": 2,
    "wave_model_lat": "-38.540586",
    "wave_model_lon": "144.01446",
    "weighting_swell": "0.5",
    "weighting_wind": "0.5",
    "weighting_tide": "0.2",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "2.3",
          "min": "1.26",
          "max": "3.24",
          "mixed_min": "1.41",
          "mixed_max": "3.09",
          "optimal_min": "1.5",
          "optimal_max": "3.0",
          "in_3_hours": "1.49"
        },
        "direction": {
          "type": "direction",
          "optimal": "170.0",
          "min": "130.3",
          "max": "209.7",
          "mixed_min": "136.5",
          "mixed_max": "203.5",
          "optimal_min": "140.0",
          "optimal_max": "200.0",
          "in_3_hours": 233
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "15.0",
          "min": "-4.8",
          "max": "34.8",
          "mixed_min": "-1.8",
          "mixed_max": "31.8",
          "optimal_min": "0.0",
          "optimal_max": "30.0",
          "in_3_hours": "20.0"
        },
        "direction": {
          "type": "direction",
          "optimal": "325.0",
          "min": "278.7",
          "max": "371.3",
          "mixed_min": "285.9",
          "mixed_max": "364.1",
          "optimal_min": "290.0",
          "optimal_max": "360.0",
          "in_3_hours": 166
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": "0.4",
          "min": "0.1",
          "max": "0.7",
          "mixed_min": "0.2",
          "mixed_max": "0.6",
          "optimal_min": "0.2",
          "optimal_max": "0.6",
          "in_3_hours": "0.84"
        }
      }
    },
    "next_tide": {
      "id": 1656,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 7,
      "created_at": "2018-01-17T11:40:53.058+11:00",
      "updated_at": "2018-01-17T11:40:53.058+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1655,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 7,
      "created_at": "2018-01-17T11:40:53.054+11:00",
      "updated_at": "2018-01-17T11:40:53.054+11:00",
      "date_time": "2018-01-24T05:20:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1656,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 7,
      "created_at": "2018-01-17T11:40:53.058+11:00",
      "updated_at": "2018-01-17T11:40:53.058+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "region": {
      "id": 2,
      "name": "Surf Coast",
      "description": "West of Melbourne, along the Great Ocean Rd.",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.477+11:00",
      "updated_at": "2017-11-29T08:11:59.477+11:00"
    },
    "works_on_all_tides?": false,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "53.0",
    "url": "http://localhost:5000/spots/7.json",
    "current_swell": {
      "id": 2993,
      "size": "1.490000009536745",
      "period": "14.289999961853",
      "direction": 233,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "45.36",
      "direction_rating": 0,
      "size_rating": "58.926223253102564197535646986105500577225",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 9902,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "15.2",
      "direction": 164,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "99.99288888888888888888",
      "rating": "20.0"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.502+11:00",
      "height": "0.42",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": "99.6",
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:20:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:12:00.000+11:00"
      }
    },
    "features": [{
      "id": 2,
      "key": "WAVE_DIRECTION",
      "value": "RIGHT",
      "friendly_name": "Right hander",
      "icon": "chevron-right"
    }, {
      "id": 4,
      "key": "BREAK_TYPE",
      "value": "POINT",
      "friendly_name": "Point break",
      "icon": null
    }, {
      "id": 6,
      "key": "BREAK_FLOOR",
      "value": "SAND",
      "friendly_name": "Sand",
      "icon": null
    }, {
      "id": 9,
      "key": "SWELL_EXPOSURE",
      "value": "LOW",
      "friendly_name": null,
      "icon": null
    }, {
      "id": 11,
      "key": "WIND_EXPOSURE",
      "value": "LOW",
      "friendly_name": "Protected from prevailing winds",
      "icon": "sheild"
    }, {
      "id": 12,
      "key": "CROWDS",
      "value": "HIGH",
      "friendly_name": "Gets crowded",
      "icon": "users"
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 15,
      "key": "IS_TOILET",
      "value": null,
      "friendly_name": "Toilet",
      "icon": null
    }, {
      "id": 16,
      "key": "IS_BEGINNER_FRIENDLY",
      "value": null,
      "friendly_name": "Beginner friendly",
      "icon": "heart"
    }, {
      "id": 17,
      "key": "HANDLES_BIG_SWELL",
      "value": null,
      "friendly_name": "Handles big swells",
      "icon": "alert-triangle"
    }, {
      "id": 18,
      "key": "IS_CAMPING",
      "value": null,
      "friendly_name": "Camping nearby",
      "icon": "compass"
    }]
  }, {
    "id": 3,
    "name": "Winkipop",
    "description": "Very long (400-500m), winding righ-hand reef/point break wave. Breaks over rocky reef with two sections: Uppers (top section) and Lowers. Best when the swell is straight. Often gets crowded when it's on. Strong currents on big days and shallow on low low tides.",
    "season": "May-July",
    "latitude": "-38.367531",
    "longitude": "144.27944",
    "image": "https://i.ytimg.com/vi/VdKmXq5dFJs/maxresdefault.jpg",
    "region_id": 2,
    "wave_model_lat": "-38.608",
    "wave_model_lon": "144.501",
    "weighting_swell": "0.4",
    "weighting_wind": "0.4",
    "weighting_tide": "0.2",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "2.4",
          "min": "0.83",
          "max": "3.87",
          "mixed_min": "1.06",
          "mixed_max": "3.64",
          "optimal_min": "1.2",
          "optimal_max": "3.5",
          "in_3_hours": "1.14"
        },
        "direction": {
          "type": "direction",
          "optimal": "225.0",
          "min": "191.9",
          "max": "258.1",
          "mixed_min": "197.0",
          "mixed_max": "253.0",
          "optimal_min": "200.0",
          "optimal_max": "250.0",
          "in_3_hours": 240
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "15.0",
          "min": "-4.8",
          "max": "34.8",
          "mixed_min": "-1.8",
          "mixed_max": "31.8",
          "optimal_min": "0.0",
          "optimal_max": "30.0",
          "in_3_hours": "20.0"
        },
        "direction": {
          "type": "direction",
          "optimal": "325.0",
          "min": "278.7",
          "max": "371.3",
          "mixed_min": "285.9",
          "mixed_max": "364.1",
          "optimal_min": "290.0",
          "optimal_max": "360.0",
          "in_3_hours": 166
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": "0.7",
          "min": "0.0",
          "max": "1.4",
          "mixed_min": "0.1",
          "mixed_max": "1.3",
          "optimal_min": "0.2",
          "optimal_max": "1.2",
          "in_3_hours": "0.84"
        }
      }
    },
    "next_tide": {
      "id": 1500,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 3,
      "created_at": "2018-01-17T11:40:33.903+11:00",
      "updated_at": "2018-01-17T11:40:33.903+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1499,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 3,
      "created_at": "2018-01-17T11:40:33.897+11:00",
      "updated_at": "2018-01-17T11:40:33.897+11:00",
      "date_time": "2018-01-24T05:20:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1500,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 3,
      "created_at": "2018-01-17T11:40:33.903+11:00",
      "updated_at": "2018-01-17T11:40:33.903+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "region": {
      "id": 2,
      "name": "Surf Coast",
      "description": "West of Melbourne, along the Great Ocean Rd.",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.477+11:00",
      "updated_at": "2017-11-29T08:11:59.477+11:00"
    },
    "works_on_all_tides?": false,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "53.0",
    "url": "http://localhost:5000/spots/3.json",
    "current_swell": {
      "id": 2749,
      "size": "1.140999996662141",
      "period": "14.289999961853",
      "direction": 240,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "69.15",
      "direction_rating": "85.6",
      "size_rating": "55.790366485566939186652470203684426867947977380429152955366",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 9238,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "15.2",
      "direction": 164,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "99.99288888888888888888",
      "rating": "20.0"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.287+11:00",
      "height": "0.42",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": "87.456",
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:20:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:12:00.000+11:00"
      }
    },
    "features": [{
      "id": 2,
      "key": "WAVE_DIRECTION",
      "value": "RIGHT",
      "friendly_name": "Right hander",
      "icon": "chevron-right"
    }, {
      "id": 4,
      "key": "BREAK_TYPE",
      "value": "POINT",
      "friendly_name": "Point break",
      "icon": null
    }, {
      "id": 7,
      "key": "BREAK_FLOOR",
      "value": "REEF",
      "friendly_name": "Reef",
      "icon": null
    }, {
      "id": 8,
      "key": "SWELL_EXPOSURE",
      "value": "HIGH",
      "friendly_name": "Swell magnet",
      "icon": "target"
    }, {
      "id": 12,
      "key": "CROWDS",
      "value": "HIGH",
      "friendly_name": "Gets crowded",
      "icon": "users"
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 15,
      "key": "IS_TOILET",
      "value": null,
      "friendly_name": "Toilet",
      "icon": null
    }, {
      "id": 17,
      "key": "HANDLES_BIG_SWELL",
      "value": null,
      "friendly_name": "Handles big swells",
      "icon": "alert-triangle"
    }, {
      "id": 19,
      "key": "IS_LOCALISED",
      "value": null,
      "friendly_name": "Angry locals",
      "icon": "thumbs-down"
    }]
  }, {
    "id": 2,
    "name": "Bells Beach",
    "description": "Australia's most famous surf break and home of the Bells Beach Easter classic. The Southern Ocean's southwesterly swells refract around the Otways, clean up and reach the limestone reef creating one of the world's best point breaks. The point section under the cliffs is Rincon, then rolls through into The Bowl which holds big swells. Careful of getting caught inside on big days.",
    "season": "May-July",
    "latitude": "-38.367745",
    "longitude": "144.279932",
    "image": "https://www.surfcoast.vic.gov.au/files/assets/public/tourism/images/bellsbeachlandscape.jpg",
    "region_id": 2,
    "wave_model_lat": "-38.608",
    "wave_model_lon": "144.501",
    "weighting_swell": "0.4",
    "weighting_wind": "0.4",
    "weighting_tide": "0.2",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "2.4",
          "min": "0.83",
          "max": "3.87",
          "mixed_min": "1.06",
          "mixed_max": "3.64",
          "optimal_min": "1.2",
          "optimal_max": "3.5",
          "in_3_hours": "1.14"
        },
        "direction": {
          "type": "direction",
          "optimal": "225.0",
          "min": "191.9",
          "max": "258.1",
          "mixed_min": "197.0",
          "mixed_max": "253.0",
          "optimal_min": "200.0",
          "optimal_max": "250.0",
          "in_3_hours": 240
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "15.0",
          "min": "-4.8",
          "max": "34.8",
          "mixed_min": "-1.8",
          "mixed_max": "31.8",
          "optimal_min": "0.0",
          "optimal_max": "30.0",
          "in_3_hours": "20.0"
        },
        "direction": {
          "type": "direction",
          "optimal": "325.0",
          "min": "278.7",
          "max": "371.3",
          "mixed_min": "285.9",
          "mixed_max": "364.1",
          "optimal_min": "290.0",
          "optimal_max": "360.0",
          "in_3_hours": 166
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": "0.7",
          "min": "0.0",
          "max": "1.4",
          "mixed_min": "0.1",
          "mixed_max": "1.3",
          "optimal_min": "0.2",
          "optimal_max": "1.2",
          "in_3_hours": "0.84"
        }
      }
    },
    "next_tide": {
      "id": 1461,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 2,
      "created_at": "2018-01-17T11:40:25.498+11:00",
      "updated_at": "2018-01-17T11:40:25.498+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1460,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 2,
      "created_at": "2018-01-17T11:40:25.493+11:00",
      "updated_at": "2018-01-17T11:40:25.493+11:00",
      "date_time": "2018-01-24T05:20:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1461,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 2,
      "created_at": "2018-01-17T11:40:25.498+11:00",
      "updated_at": "2018-01-17T11:40:25.498+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "region": {
      "id": 2,
      "name": "Surf Coast",
      "description": "West of Melbourne, along the Great Ocean Rd.",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.477+11:00",
      "updated_at": "2017-11-29T08:11:59.477+11:00"
    },
    "works_on_all_tides?": false,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "53.0",
    "url": "http://localhost:5000/spots/2.json",
    "current_swell": {
      "id": 2688,
      "size": "1.140999996662141",
      "period": "14.289999961853",
      "direction": 240,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "69.15",
      "direction_rating": "85.6",
      "size_rating": "55.790366485566939186652470203684426867947977380429152955366",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 9072,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "15.2",
      "direction": 164,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "99.99288888888888888888",
      "rating": "20.0"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.206+11:00",
      "height": "0.42",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": "87.456",
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:20:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:12:00.000+11:00"
      }
    },
    "features": [{
      "id": 2,
      "key": "WAVE_DIRECTION",
      "value": "RIGHT",
      "friendly_name": "Right hander",
      "icon": "chevron-right"
    }, {
      "id": 4,
      "key": "BREAK_TYPE",
      "value": "POINT",
      "friendly_name": "Point break",
      "icon": null
    }, {
      "id": 7,
      "key": "BREAK_FLOOR",
      "value": "REEF",
      "friendly_name": "Reef",
      "icon": null
    }, {
      "id": 8,
      "key": "SWELL_EXPOSURE",
      "value": "HIGH",
      "friendly_name": "Swell magnet",
      "icon": "target"
    }, {
      "id": 12,
      "key": "CROWDS",
      "value": "HIGH",
      "friendly_name": "Gets crowded",
      "icon": "users"
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 15,
      "key": "IS_TOILET",
      "value": null,
      "friendly_name": "Toilet",
      "icon": null
    }]
  }, {
    "id": 6,
    "name": "Torquay Point",
    "description": "Right-hand, consistent point break. Popular longboarding spot but can get heavy on big days.",
    "season": "Winter",
    "latitude": "-38.34448",
    "longitude": "144.319491",
    "image": "",
    "region_id": 2,
    "wave_model_lat": "-38.608",
    "wave_model_lon": "144.501",
    "weighting_swell": "0.5",
    "weighting_wind": "0.5",
    "weighting_tide": "0.0",
    "optimals": {
      "swell": {
        "size": {
          "type": "linear",
          "optimal": "2.0",
          "min": "0.02",
          "max": "3.98",
          "mixed_min": "0.32",
          "mixed_max": "3.68",
          "optimal_min": "0.5",
          "optimal_max": "3.5",
          "in_3_hours": "0.98"
        },
        "direction": {
          "type": "direction",
          "optimal": "230.0",
          "min": "203.5",
          "max": "256.5",
          "mixed_min": "207.6",
          "mixed_max": "252.4",
          "optimal_min": "210.0",
          "optimal_max": "250.0",
          "in_3_hours": 240
        }
      },
      "wind": {
        "speed": {
          "type": "linear",
          "optimal": "15.0",
          "min": "-4.8",
          "max": "34.8",
          "mixed_min": "-1.8",
          "mixed_max": "31.8",
          "optimal_min": "0.0",
          "optimal_max": "30.0",
          "in_3_hours": "20.0"
        },
        "direction": {
          "type": "direction",
          "optimal": "325.0",
          "min": "278.7",
          "max": "371.3",
          "mixed_min": "285.9",
          "mixed_max": "364.1",
          "optimal_min": "290.0",
          "optimal_max": "360.0",
          "in_3_hours": 166
        }
      },
      "tide": {
        "height": {
          "type": "linear",
          "optimal": null,
          "min": null,
          "max": null,
          "mixed_min": null,
          "mixed_max": null,
          "optimal_min": "0.0",
          "optimal_max": "0.0",
          "in_3_hours": "0.84"
        }
      }
    },
    "next_tide": {
      "id": 1617,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 6,
      "created_at": "2018-01-17T11:40:48.032+11:00",
      "updated_at": "2018-01-17T11:40:48.032+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "next_high_tide": {
      "id": 1616,
      "tide_type": "high",
      "height": "1.57",
      "spot_id": 6,
      "created_at": "2018-01-17T11:40:48.014+11:00",
      "updated_at": "2018-01-17T11:40:48.014+11:00",
      "date_time": "2018-01-24T05:20:00.000+11:00"
    },
    "next_low_tide": {
      "id": 1617,
      "tide_type": "low",
      "height": "0.4",
      "spot_id": 6,
      "created_at": "2018-01-17T11:40:48.032+11:00",
      "updated_at": "2018-01-17T11:40:48.032+11:00",
      "date_time": "2018-01-24T11:12:00.000+11:00"
    },
    "region": {
      "id": 2,
      "name": "Surf Coast",
      "description": "West of Melbourne, along the Great Ocean Rd.",
      "country": "Australia",
      "state": "Victoria",
      "created_at": "2017-11-29T08:11:59.477+11:00",
      "updated_at": "2017-11-29T08:11:59.477+11:00"
    },
    "works_on_all_tides?": true,
    "current_model_date_time": "2018-01-24T11:00:00.000+11:00",
    "current_potential": "53.0",
    "url": "http://localhost:5000/spots/6.json",
    "current_swell": {
      "id": 2932,
      "size": "0.977999997138978",
      "period": "14.289999961853",
      "direction": 240,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "rating": "85.86",
      "direction_rating": "90.0",
      "size_rating": "81.431395451592373756703166497830114665367126894181011803448",
      "period_rating": 100.0
    },
    "current_wind": {
      "id": 9736,
      "date_time": "2018-01-24T11:00:00.000+11:00",
      "speed": "15.2",
      "direction": 164,
      "direction_text": "SSE",
      "direction_description": "Onshore",
      "direction_rating": 0,
      "speed_rating": "99.99288888888888888888",
      "rating": "20.0"
    },
    "current_tide_snapshot": {
      "date_time": "2018-01-24T10:40:12.470+11:00",
      "height": "0.42",
      "state": "OUTGOING",
      "shift_rate": "slow",
      "rating": 100,
      "tide_before": {
        "tide_type": "high",
        "height": "1.57",
        "date_time": "2018-01-24T05:20:00.000+11:00"
      },
      "tide_after": {
        "tide_type": "low",
        "height": "0.4",
        "date_time": "2018-01-24T11:12:00.000+11:00"
      }
    },
    "features": [{
      "id": 2,
      "key": "WAVE_DIRECTION",
      "value": "RIGHT",
      "friendly_name": "Right hander",
      "icon": "chevron-right"
    }, {
      "id": 6,
      "key": "BREAK_FLOOR",
      "value": "SAND",
      "friendly_name": "Sand",
      "icon": null
    }, {
      "id": 9,
      "key": "SWELL_EXPOSURE",
      "value": "LOW",
      "friendly_name": null,
      "icon": null
    }, {
      "id": 11,
      "key": "WIND_EXPOSURE",
      "value": "LOW",
      "friendly_name": "Protected from prevailing winds",
      "icon": "sheild"
    }, {
      "id": 12,
      "key": "CROWDS",
      "value": "HIGH",
      "friendly_name": "Gets crowded",
      "icon": "users"
    }, {
      "id": 14,
      "key": "IS_PARKING",
      "value": null,
      "friendly_name": "Carpark",
      "icon": null
    }, {
      "id": 15,
      "key": "IS_TOILET",
      "value": null,
      "friendly_name": "Toilet",
      "icon": null
    }, {
      "id": 16,
      "key": "IS_BEGINNER_FRIENDLY",
      "value": null,
      "friendly_name": "Beginner friendly",
      "icon": "heart"
    }, {
      "id": 17,
      "key": "HANDLES_BIG_SWELL",
      "value": null,
      "friendly_name": "Handles big swells",
      "icon": "alert-triangle"
    }]
  }];
}