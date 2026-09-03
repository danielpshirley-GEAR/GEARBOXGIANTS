#!/usr/bin/env python3
"""
Complete Location SEO Rebuild & Opportunity Engine for Gearbox Giants
Builds 38+ bespoke, search-optimised UK location pages + updates locations.html + updates sitemap.xml.
"""

import os
import json
import re

BASE_DIR = "/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants"

# Master Dataset of Locations with Deep Local Facts and Engineering Insights
LOCATION_CONFIGS = [
    # --- GREATER LONDON (12 LOCATIONS) ---
    {
        "id": "london",
        "slug": "location-london.html",
        "name": "West London",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "W1, W2, W3, W4, W5, W6, W7, W8, W10, W11, W12, W14, UB1, UB2, UB3, UB4, UB5, UB6, UB7, UB8, UB9, UB10, HA0, HA1, HA2, HA3, HA4, HA5, HA6, HA7, HA8, HA9, TW7, TW8",
        "lat": "51.5150",
        "lng": "-0.2800",
        "hero_headline": "WEST LONDON GEARBOX SPECIALISTS",
        "hero_sub": "Dealer-Grade Transmission Diagnostics, Precision Rebuilds & Free Recovery Across All West London Boroughs.",
        "meta_title": "West London Gearbox Specialists | Transmission Repair & Rebuilds",
        "meta_desc": "West London specialist gearbox repair. Fast diagnosis, mechatronic repairs, manual & automatic rebuilds with free vehicle recovery across Ealing, Uxbridge, Harrow, Hounslow & Wembley.",
        "transit_logistics": "Operates rapid flatbed collection across the A40 Western Avenue, M4 corridor, North Circular (A406), and Heathrow cargo logistics belt. Fully ULEZ-compliant recovery fleet operating 7 days a week.",
        "vehicle_demographics": "Heavy concentration of executive automatics (BMW ZF 8HP, Mercedes 9G-Tronic), high-density urban hybrid e-CVTs (Toyota/Lexus), and stop-start commuter dual-clutch units (VAG DQ200/DQ381 DSG) vulnerable to mechatronic pressure drops in West London congestion.",
        "dealer_comparison": "Main dealerships along the Great West Road and Western Avenue typically quote high sums for complete replacement units with long lead times. Gearbox Giants reconditions your existing unit with upgraded OEM components at substantial savings.",
        "sub_areas": ["Ealing & Acton", "Harrow & Wealdstone", "Uxbridge & Hillingdon", "Hounslow & Chiswick", "Wembley & Brent", "Ruislip & Northwood"]
    },
    {
        "id": "east-london",
        "slug": "location-east-london.html",
        "name": "East London",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "E1, E2, E3, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18, E20, IG1, IG11, RM8, RM9, RM10",
        "lat": "51.5362",
        "lng": "0.0354",
        "hero_headline": "EAST LONDON GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Gearbox Repair, Mechatronic Diagnostics & Dedicated Free Vehicle Collection Across East London & Docklands.",
        "meta_title": "East London Gearbox Specialists | Expert Transmission Rebuilds",
        "meta_desc": "Specialist gearbox repair & reconditioning in East London. Dealership-grade rebuilds for DSG, automatic & manual transmissions across Stratford, Canary Wharf, Ilford, Barking & Hackney.",
        "transit_logistics": "Direct transporter dispatch via the A12, A13 Thames Gateway, Blackwall Tunnel approaches, and Lea Valley arterial routes. Fast vehicle recovery across Tower Hamlets, Newham, Waltham Forest, Redbridge, and Barking & Dagenham.",
        "vehicle_demographics": "High commercial fleet volume (Ford Transit Custom 6-speed manual/6F55 automatics, Vauxhall Vivaro), intensive private-hire vehicle transmissions (Toyota Prius e-CVT, Hyundai/Kia DCT), and high-mileage urban delivery vans experiencing synchromesh and clutch pack wear.",
        "dealer_comparison": "East London franchised dealers frequently charge upwards of £180/hr in diagnostic labour alone. Our specialist engineers test solenoids, hydraulic valve bodies, and gear trains on dynamometer test rigs, delivering OEM-spec rebuilds up to 60% cheaper.",
        "sub_areas": ["Stratford & Olympic Park", "Canary Wharf & Isle of Dogs", "Ilford & Redbridge", "Barking & Dagenham", "Hackney & Shoreditch", "Walthamstow & Leyton"]
    },
    {
        "id": "south-london",
        "slug": "location-south-london.html",
        "name": "South London",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "SE1, SE5, SE10, SE15, SE16, SE19, SE21, SE22, SE23, SE24, SE25, SE26, SW2, SW4, SW8, SW9, SW11, SW12, SW16, SW17, SW19, CR0, CR2, CR4, CR7, BR1, BR2, BR3",
        "lat": "51.4500",
        "lng": "-0.0900",
        "hero_headline": "SOUTH LONDON GEARBOX SPECIALISTS",
        "hero_sub": "Precision Gearbox Rebuilds, Dual-Clutch Repairs & Free Doorstep Collection Across All South London Boroughs.",
        "meta_title": "South London Gearbox Specialists | Automatic & Manual Repairs",
        "meta_desc": "South London gearbox repair and reconditioning. Specialist diagnostics and rebuilds across Croydon, Bromley, Wandsworth, Greenwich, Lambeth, Lewisham & Southwark with full 12-month warranty.",
        "transit_logistics": "Comprehensive recovery coverage spanning the South Circular (A205), A3 corridor, A23 Purley Way, and A2 Dover Road artery, navigating ULEZ and Low Emission Zones seamlessly.",
        "vehicle_demographics": "Extensive mix of family SUVs (Land Rover Discovery Sport / Evoque ZF 9HP, Audi Q5 S-Tronic), commuter hatchbacks (Ford Fiesta Powershift, VW Polo DSG), and high-torque diesel commercials suffering from dual-mass flywheel judder and torque converter shudder.",
        "dealer_comparison": "South London main agents frequently enforce 3–5 week dealership booking queues with £5,000+ unit replacement quotes. We provide fast flatbed collection, teardown inspection within 24 hours, and rebuilds backed by our 12-month / 12,000-mile warranty.",
        "sub_areas": ["Croydon & Purley", "Bromley & Beckenham", "Wandsworth & Clapham", "Greenwich & Blackheath", "Wimbledon & Merton", "Dulwich & Southwark"]
    },
    {
        "id": "north-london",
        "slug": "location-north-london.html",
        "name": "North London",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "N1, N2, N3, N4, N6, N7, N8, N10, N11, N12, N13, N14, N19, N20, N21, N22, NW1, NW2, NW3, NW4, NW5, NW7, NW9, NW10, NW11, EN1, EN2, EN3, EN4, EN5",
        "lat": "51.6000",
        "lng": "-0.1200",
        "hero_headline": "NORTH LONDON GEARBOX SPECIALISTS",
        "hero_sub": "Dealership-Grade Transmission Engineering, DSG Mechatronic Repairs & Free Doorstep Recovery Across North London.",
        "meta_title": "North London Gearbox Specialists | Transmission Repair & Rebuilds",
        "meta_desc": "North London gearbox specialists. Precision repairs and reconditioning across Barnet, Enfield, Islington, Finchley, Camden, Haringey & Tottenham with free recovery & 12-month warranty.",
        "transit_logistics": "Strategic transporter positioning along the M1 / A1 Apex Corner corridor, A406 North Circular artery, and A10 Great Cambridge Road for rapid breakdown recovery.",
        "vehicle_demographics": "High density of premium performance vehicles (BMW M-Sport, Mercedes-AMG, Audi RS dual-clutch / S-Tronic), prestige German family estates, and commercial courier vans facing constant stop-start transmission thermal cycling.",
        "dealer_comparison": "North London franchised dealerships routinely charge £200+/hour in diagnostic labour. We rebuild transmissions to strict OEM tolerances with upgraded high-load bearings, steel-reinforced mechatronic valve housings, and dynamic bench testing.",
        "sub_areas": ["Barnet & Whetstone", "Enfield & Southgate", "Finchley & Golders Green", "Islington & Highbury", "Haringey & Wood Green", "Camden & Hampstead"]
    },
    {
        "id": "croydon",
        "slug": "location-croydon.html",
        "name": "Croydon",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "CR0, CR2, CR4, CR7, CR8, CR9",
        "lat": "51.3762",
        "lng": "-0.0982",
        "hero_headline": "CROYDON GEARBOX SPECIALISTS",
        "hero_sub": "Fast Diagnostic Testing, Complete Transmission Reconditioning & Free Doorstep Collection in Croydon.",
        "meta_title": "Croydon Gearbox Specialists | Expert Gearbox Repair & Reconditioning",
        "meta_desc": "Expert gearbox repairs in Croydon. Manual, automatic & DSG transmission rebuilds with free recovery across Purley Way, Addiscombe, Thornton Heath, Purley & South Croydon.",
        "transit_logistics": "Rapid dispatch via the A23 / Purley Way commercial corridor, connecting Croydon, Coulsdon, and South London to our specialist transmission engineering partner facility.",
        "vehicle_demographics": "Heavy commercial van concentration along industrial estates, high commuter vehicle volumes (Vauxhall Astra/Corsa, Ford Focus, Nissan Qashqai CVT), and hybrid urban fleets.",
        "dealer_comparison": "Avoid the delays of Purley Way main dealers. Our team performs full teardowns, ultrasonic component cleaning, high-wear gear replacement, and delivers your vehicle back cleaned with a 12-month warranty.",
        "sub_areas": ["Central Croydon & Addiscombe", "Purley & Kenley", "Thornton Heath & Norbury", "South Croydon & Selsdon", "Coulsdon & Purley Way"]
    },
    {
        "id": "watford",
        "slug": "location-watford.html",
        "name": "Watford",
        "region_group": "london",
        "region_label": "Greater London / Herts",
        "postcodes": "WD17, WD18, WD19, WD24, WD25",
        "lat": "51.6565",
        "lng": "-0.3903",
        "hero_headline": "WATFORD GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Transmission Rebuilds, DSG & Automatic Repairs with Free Collection Across Watford & SW Herts.",
        "meta_title": "Watford Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Professional gearbox repair & reconditioning in Watford. Precision transmission rebuilds across Watford, Rickmansworth, Bushey, Garston & Croxley Green with free vehicle recovery.",
        "transit_logistics": "Seamless access via M1 Junctions 5/6, M25 Junctions 19/20, and the A41 North Western Avenue for rapid breakdown collection across Watford and Three Rivers.",
        "vehicle_demographics": "Commuter saloons, family MPVs, and commercial distribution vans operating along the M1/M25 interchange. Common issues include DSG clutch pack judder and bearing whine on 6-speed manuals.",
        "dealer_comparison": "Local main dealers along the A41 charge premium replacement rates. We repair the specific root cause—replacing damaged synchronizers, torque converters, or mechatronic solenoids at a fraction of the cost.",
        "sub_areas": ["Watford Town Centre", "Garston & Leavesden", "Bushey & Oxhey", "Rickmansworth & Croxley", "Radlett & Aldenham"]
    },
    {
        "id": "harrow",
        "slug": "location-harrow.html",
        "name": "Harrow",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "HA1, HA2, HA3, HA5, HA7, HA8",
        "lat": "51.5806",
        "lng": "-0.3420",
        "hero_headline": "HARROW GEARBOX SPECIALISTS",
        "hero_sub": "Dealership-Grade Gearbox Repairs, Mechatronic Diagnostics & Free Doorstep Collection Across Harrow.",
        "meta_title": "Harrow Gearbox Specialists | Transmission Repair & Rebuild Services",
        "meta_desc": "Harrow's trusted gearbox specialist. Manual, automatic and DSG transmission repairs across Harrow on the Hill, Wealdstone, Pinner, Stanmore, Edgware & Rayners Lane.",
        "transit_logistics": "Fast response recovery via the A404, A4140, and A409 connecting all Harrow districts directly to our state-of-the-art rebuild facility.",
        "vehicle_demographics": "High proportion of residential commuter vehicles (VW Golf, Audi A3/A4, BMW 1/3 Series, Mercedes A/C-Class) suffering from stop-start dual-clutch mechatronic failure and torque converter lockup shudder.",
        "dealer_comparison": "Don't pay dealership prices in West London. We provide transparent upfront quotes, complete unit rebuilds with brand-new OEM bearings, and complimentary door-to-door transport.",
        "sub_areas": ["Harrow on the Hill", "Pinner & Hatch End", "Stanmore & Belmont", "Wealdstone & Greenhill", "Rayners Lane & South Harrow"]
    },
    {
        "id": "enfield",
        "slug": "location-enfield.html",
        "name": "Enfield",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "EN1, EN2, EN3, EN4, EN5",
        "lat": "51.6538",
        "lng": "-0.0799",
        "hero_headline": "ENFIELD GEARBOX SPECIALISTS",
        "hero_sub": "Precision Gearbox Rebuilds, Commercial Van Transmissions & Free Recovery in Enfield & North London.",
        "meta_title": "Enfield Gearbox Specialists | Manual & Automatic Transmission Repair",
        "meta_desc": "Enfield gearbox specialist providing expert transmission repairs across Enfield Town, Edmonton, Southgate, Ponders End & Waltham Cross with free vehicle collection & 12-month warranty.",
        "transit_logistics": "Direct arterial collection via the A10 Great Cambridge Road and M25 Junction 25, servicing residential and industrial trade corridors.",
        "vehicle_demographics": "Major corridor for commercial trade vehicles (Ford Transit, Mercedes Sprinter, Vauxhall Movano) and daily commuter cars experiencing heavy gear wear and clutch slippage.",
        "dealer_comparison": "Save up to 60% compared to franchised dealer replacement units. We test, re-machine, and rebuild your transmission with heavy-duty uprated components engineered for lasting durability.",
        "sub_areas": ["Enfield Town & Chase", "Edmonton & Silver Street", "Southgate & Oakwood", "Ponders End & Brimsdown", "Hadley Wood & Cockfosters"]
    },
    {
        "id": "romford",
        "slug": "location-romford.html",
        "name": "Romford",
        "region_group": "london",
        "region_label": "Greater London / Essex",
        "postcodes": "RM1, RM2, RM3, RM5, RM6, RM7",
        "lat": "51.5760",
        "lng": "0.1800",
        "hero_headline": "ROMFORD GEARBOX SPECIALISTS",
        "hero_sub": "Expert Transmission Repair, DSG Mechatronics & Free Vehicle Recovery Across Romford & Havering.",
        "meta_title": "Romford Gearbox Specialists | Expert Transmission Reconditioning",
        "meta_desc": "Specialist gearbox repair in Romford & Havering. Manual, automatic, DSG & Powershift gearbox reconditioning with free vehicle collection across Romford, Hornchurch, Gidea Park & Upminster.",
        "transit_logistics": "Operates along the A12 Eastern Avenue, A127 Southend Arterial Road, and M25 Junction 28 for prompt collection and delivery.",
        "vehicle_demographics": "High density of Ford Powershift dual-clutch models (Focus, Kuga, Mondeo), VAG DSG automatics, and light commercial vehicles operating throughout East London and Essex.",
        "dealer_comparison": "Instead of paying main dealer prices for an entirely new gearbox assembly, our specialist rebuilds replace only worn planetary gears, friction plates, and valve solenoids with full warranty protection.",
        "sub_areas": ["Romford Central & Market", "Gidea Park & Harold Wood", "Hornchurch & Elm Park", "Upminster & Cranham", "Collier Row & Havering-atte-Bower"]
    },
    {
        "id": "bromley",
        "slug": "location-bromley.html",
        "name": "Bromley",
        "region_group": "london",
        "region_label": "Greater London / Kent",
        "postcodes": "BR1, BR2, BR3, BR4, BR5, BR6, BR7",
        "lat": "51.4039",
        "lng": "0.0198",
        "hero_headline": "BROMLEY GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Gearbox Repair, Mechatronic Calibration & Free Doorstep Recovery Across Bromley & Orpington.",
        "meta_title": "Bromley Gearbox Specialists | Transmission Repair & Rebuilds",
        "meta_desc": "Specialist transmission repair in Bromley. Expert automatic, manual & DSG gearbox reconditioning across Bromley, Beckenham, Orpington, Chislehurst & West Wickham with free recovery.",
        "transit_logistics": "Servicing the A21 Masons Hill / Hastings Road artery, A232, and A222 corridor connecting Bromley Borough and North Kent.",
        "vehicle_demographics": "Executive family vehicles, prestige SUVs, and commuter hatchbacks facing hilly suburban terrain and stop-start town driving that accelerates clutch wear and automatic transmission fluid degradation.",
        "dealer_comparison": "Our expert engineers diagnose shifting faults down to the specific mechanical or electronic component, avoiding unnecessary full-unit replacements and saving you thousands.",
        "sub_areas": ["Bromley Town & Bickley", "Beckenham & Eden Park", "Orpington & Petts Wood", "Chislehurst & Elmstead", "West Wickham & Hayes"]
    },
    {
        "id": "uxbridge",
        "slug": "location-uxbridge.html",
        "name": "Uxbridge",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "UB8, UB9, UB10, UB11",
        "lat": "51.5448",
        "lng": "-0.4760",
        "hero_headline": "UXBRIDGE GEARBOX SPECIALISTS",
        "hero_sub": "Complete Transmission Diagnostics, Precision Reconditioning & Free Recovery in Uxbridge & Hillingdon.",
        "meta_title": "Uxbridge Gearbox Specialists | Automatic & Manual Transmission Rebuilds",
        "meta_desc": "Expert gearbox repair in Uxbridge & Hillingdon Borough. Specialist dual-clutch DSG, automatic & manual rebuilds with free doorstep recovery and 12-month / 12,000-mile warranty.",
        "transit_logistics": "Immediate dispatch along the M40 / A40 Western Avenue, M25 Junction 16, and A4020 for rapid customer collection across West London and South Bucks.",
        "vehicle_demographics": "Fleet vehicles serving Stockley Park business district, Heathrow logistics transit vans, and residential commuter cars.",
        "dealer_comparison": "Why pay main dealer surcharges? We use state-of-the-art diagnostic tools, OEM replacement components, and test every completed transmission before handover.",
        "sub_areas": ["Uxbridge Central & Moor", "Ickenham & Hillingdon", "Cowley & Yiewsley", "Harefield & Denham", "Stockley Park & Hayes End"]
    },
    {
        "id": "richmond",
        "slug": "location-richmond.html",
        "name": "Richmond",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "TW9, TW10, SW13, SW14, SW15",
        "lat": "51.4613",
        "lng": "-0.3037",
        "hero_headline": "RICHMOND GEARBOX SPECIALISTS",
        "hero_sub": "Prestige Transmission Repairs, DSG Calibration & Free Insured Vehicle Recovery Across Richmond Upon Thames.",
        "meta_title": "Richmond Gearbox Specialists | Luxury & Automatic Transmission Repair",
        "meta_desc": "Specialist gearbox rebuilds in Richmond, Twickenham, Barnes, Kew & Teddington. Automatic, DSG & manual transmission reconditioning with free insured collection.",
        "transit_logistics": "Operates across the A316 Chertsey Road, A205 South Circular, and A307 with specialized covered transporters suitable for luxury and performance marques.",
        "vehicle_demographics": "High density of luxury German and British marques (Porsche, BMW, Mercedes-Benz, Land Rover, Jaguar) requiring precision ZF 8HP, PDK, and 9G-Tronic transmission maintenance.",
        "dealer_comparison": "Local prestige dealers in Surrey and West London charge high four-figure sums for standard gearbox replacements. We remanufacture units with precision valve body rebuilds and upgraded friction materials at half the dealer cost.",
        "sub_areas": ["Richmond Hill & Green", "Twickenham & St Margarets", "Barnes & Mortlake", "Kew & Sheen", "Teddington & Hampton"]
    },
    {
        "id": "barnet",
        "slug": "location-barnet.html",
        "name": "Barnet",
        "region_group": "london",
        "region_label": "Greater London",
        "postcodes": "EN4, EN5, N2, N3, N12, N20, NW4, NW7, NW9, NW11",
        "lat": "51.6500",
        "lng": "-0.2000",
        "hero_headline": "BARNET GEARBOX SPECIALISTS",
        "hero_sub": "North London's Specialist Gearbox Service. Precision Rebuilds & Free Recovery Across Barnet & Finchley.",
        "meta_title": "Barnet Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Specialist gearbox repair in Barnet. Expert transmission diagnostics & reconditioning across High Barnet, Chipping Barnet, Finchley, Whetstone & Hendon with free collection.",
        "transit_logistics": "Direct access via the A1 Barnet Bypass, A41 Watford Way, and M25 Junction 23 for prompt vehicle collection.",
        "vehicle_demographics": "High concentration of German executive saloons, family SUVs (Audi Q7, BMW X5), and commuter cars navigating hilly suburban North London routes.",
        "dealer_comparison": "Our transmission engineers diagnose electronic and mechanical shifting faults, saving you thousands compared to main dealer crate replacements.",
        "sub_areas": ["High Barnet & Arkley", "Chipping Barnet & Hadley", "Whetstone & Totteridge", "Finchley & Golders Green", "Hendon & Mill Hill"]
    },

    # --- BERKSHIRE & SURREY (8 LOCATIONS) ---
    {
        "id": "reading",
        "slug": "location-reading.html",
        "name": "Reading",
        "region_group": "berkshire",
        "region_label": "Berkshire & Thames Valley",
        "postcodes": "RG1, RG2, RG4, RG5, RG6, RG30, RG31",
        "lat": "51.4543",
        "lng": "-0.9781",
        "hero_headline": "READING GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Gearbox Repair & Free Recovery Across Reading & Thames Valley. Dealership-Grade Rebuilds & Free Recovery in Reading.",
        "meta_title": "Reading Gearbox Specialists | Expert Transmission Repairs & Rebuilds",
        "meta_desc": "Reading's leading gearbox specialist. Expert manual, automatic & DSG transmission reconditioning across Reading, Caversham, Tilehurst, Earley & Woodley with free recovery & 12-month warranty.",
        "transit_logistics": "Rapid recovery along the M4 corridor (Junctions 10, 11, 12), A33 relief road, and A4 Bath Road covering the entire Thames Valley region.",
        "vehicle_demographics": "Major tech corridor fleet vehicles, commuter saloons (Audi A4/A6 S-Tronic, BMW 3/5 Series ZF 8HP), and light commercial delivery fleets.",
        "dealer_comparison": "Rose Kiln Lane dealerships typically require weeks for replacement units. We recondition and rebuild your gearbox with full 12-month / 12,000-mile warranty protection.",
        "sub_areas": ["Central Reading & Caversham", "Tilehurst & Calcot", "Earley & Woodley", "Whitley & Green Park", "Winnersh & Sonning"]
    },
    {
        "id": "slough",
        "slug": "location-slough.html",
        "name": "Slough",
        "region_group": "berkshire",
        "region_label": "Berkshire & Thames Valley",
        "postcodes": "SL1, SL2, SL3",
        "lat": "51.5105",
        "lng": "-0.5950",
        "hero_headline": "SLOUGH GEARBOX SPECIALISTS",
        "hero_sub": "Fast Diagnostic Scans, Transmission Rebuilds & Free Recovery Across Slough Trading Estate & Berkshire.",
        "meta_title": "Slough Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Specialist gearbox repair in Slough. Comprehensive automatic, manual & DSG gearbox reconditioning across Slough, Langley, Burnham & Cippenham with free collection & delivery.",
        "transit_logistics": "Direct access via M4 Junctions 6/7, M25 Junction 15, and the A4 Bath Road for swift transporter response.",
        "vehicle_demographics": "Intensive commercial trade vehicles from Slough Trading Estate, private hire fleets, and high-mileage M4 commuter cars.",
        "dealer_comparison": "Save 50–60% compared to franchised main dealers on the Farnham Road. We replace worn synchronizers, valve body solenoids, and clutches with genuine OEM components.",
        "sub_areas": ["Slough Central & Chalvey", "Langley & Colnbrook", "Burnham & Cippenham", "Farnham Royal & Stoke Poges", "Slough Trading Estate"]
    },
    {
        "id": "bracknell",
        "slug": "location-bracknell.html",
        "name": "Bracknell",
        "region_group": "berkshire",
        "region_label": "Berkshire & Thames Valley",
        "postcodes": "RG12, RG42",
        "lat": "51.4160",
        "lng": "-0.7490",
        "hero_headline": "BRACKNELL GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Transmission Rebuilds, DSG Repairs & Free Recovery in Bracknell & Wokingham.",
        "meta_title": "Bracknell Gearbox Specialists | Transmission Repair & Rebuilds",
        "meta_desc": "Expert gearbox repairs in Bracknell. Manual, automatic, DSG & CVT transmission reconditioning across Bracknell, Warfield, Binfield, Winkfield & Wokingham with free recovery.",
        "transit_logistics": "Operates across the A329(M), A322, and M4 Junction 10 corridors connecting Bracknell Forest and East Berkshire.",
        "vehicle_demographics": "High proportion of modern automatic crossovers (Nissan Qashqai CVT, Kia Sportage DCT, Ford Kuga Powershift) and corporate fleet saloons.",
        "dealer_comparison": "Our engineers rebuild transmissions to precise manufacturer specifications, replacing all high-wear seals, needle bearings, and clutch packs with warranty protection.",
        "sub_areas": ["Bracknell Town Centre", "Warfield & Newell Green", "Binfield & Farley Wood", "Crown Wood & Hanworth", "Winkfield & Ascot Borders"]
    },
    {
        "id": "guildford",
        "slug": "location-guildford.html",
        "name": "Guildford",
        "region_group": "berkshire",
        "region_label": "Surrey",
        "postcodes": "GU1, GU2, GU3, GU4, GU5",
        "lat": "51.2362",
        "lng": "-0.5704",
        "hero_headline": "GUILDFORD GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Transmission Repair & Free Recovery Across Guildford & Surrey Hills. Expert Rebuilds & Free Recovery Across Guildford & Surrey Hills.",
        "meta_title": "Guildford Gearbox Specialists | Automatic & Manual Transmission Rebuilds",
        "meta_desc": "Guildford's premier gearbox repair specialists. Automatic, DSG, CVT and manual gearbox reconditioning across Guildford, Godalming, Cranleigh & Shalford with free vehicle recovery.",
        "transit_logistics": "Direct recovery coverage via the A3 London-Portsmouth trunk road, A31 Hog's Back, and A281 corridor.",
        "vehicle_demographics": "Prestige SUVs, 4x4 transfer cases (Land Rover, BMW xDrive, Audi Quattro), and executive commuter cars driven on hilly Surrey terrain.",
        "dealer_comparison": "Avoid the high labour rates of Moorfield Road main dealers. We provide component-level remanufacturing, valve body re-machining, and rigorous testing backed by a 12-month warranty.",
        "sub_areas": ["Guildford Town & Burpham", "Onslow Village & Park Barn", "Merrow & Boxgrove", "Godalming & Farncombe", "Cranleigh & Bramley"]
    },
    {
        "id": "woking",
        "slug": "location-woking.html",
        "name": "Woking",
        "region_group": "berkshire",
        "region_label": "Surrey",
        "postcodes": "GU21, GU22, GU23, GU24",
        "lat": "51.3190",
        "lng": "-0.5589",
        "hero_headline": "WOKING GEARBOX SPECIALISTS",
        "hero_sub": "Precision Gearbox Repair, DSG Mechatronic Rebuilds & Free Doorstep Collection in Woking.",
        "meta_title": "Woking Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Specialist gearbox repairs in Woking. Expert transmission diagnostics, mechatronics & rebuilds across Woking, Knaphill, Horsell, West Byfleet & Chobham with free recovery.",
        "transit_logistics": "Rapid dispatch via the A320, A324, and M25 Junction 11 serving Northwest Surrey and M3 borders.",
        "vehicle_demographics": "High percentage of modern dual-clutch (VAG DSG, Mercedes 7G-DCT) and premium automatics operated by London commuters.",
        "dealer_comparison": "We strip, ultrasonically clean, and rebuild your gearbox with OEM-grade bearings and upgraded clutch friction plates at up to 60% below main dealer estimates.",
        "sub_areas": ["Woking Town Centre", "Horsell & Goldsworth Park", "Knaphill & St Johns", "West Byfleet & Sheerwater", "Brookwood & Chobham"]
    },
    {
        "id": "camberley",
        "slug": "location-camberley.html",
        "name": "Camberley",
        "region_group": "berkshire",
        "region_label": "Surrey / Hants Borders",
        "postcodes": "GU15, GU16, GU17",
        "lat": "51.3360",
        "lng": "-0.7420",
        "hero_headline": "CAMBERLEY GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Gearbox Repair, Mechatronic Diagnostics & Free Recovery in Camberley, Frimley & Blackwater.",
        "meta_title": "Camberley Gearbox Specialists | Transmission Repair & Rebuilds",
        "meta_desc": "Specialist gearbox repair in Camberley & Surrey Heath. Manual, automatic and DSG gearbox rebuilds across Camberley, Frimley, Blackwater, Yateley & Bagshot with free collection.",
        "transit_logistics": "Strategic transport connection situated on the M3 Junction 4 and A30 London Road connecting Surrey, Hampshire, and Berkshire.",
        "vehicle_demographics": "Commuter SUVs, light commercial delivery vehicles, and family saloons experiencing motorway-mileage transmission wear and torque converter slip.",
        "dealer_comparison": "Our specialist transmission engineers focus purely on transmission engineering, ensuring faster diagnosis and significantly lower repair costs than general franchised dealers.",
        "sub_areas": ["Camberley Town Centre", "Frimley & Frimley Green", "Blackwater & Hawley", "Bagshot & Lightwater", "Yateley & Sandhurst"]
    },
    {
        "id": "farnborough",
        "slug": "location-farnborough.html",
        "name": "Farnborough",
        "region_group": "berkshire",
        "region_label": "Hampshire",
        "postcodes": "GU14",
        "lat": "51.2917",
        "lng": "-0.7539",
        "hero_headline": "FARNBOROUGH GEARBOX SPECIALISTS",
        "hero_sub": "Dealership-Grade Gearbox Reconditioning & Free Doorstep Recovery Across Farnborough & North Hampshire.",
        "meta_title": "Farnborough Gearbox Specialists | Expert Transmission Rebuilds",
        "meta_desc": "Specialist gearbox repairs in Farnborough. Manual, automatic and dual-clutch transmission rebuilds across Farnborough, Cove, Southwood & Fleet with free vehicle collection.",
        "transit_logistics": "Operates along the M3 Junction 4A, A325, and A331 Blackwater Valley relief road for rapid breakdown collection.",
        "vehicle_demographics": "Aerospace and tech business fleet vehicles, family SUVs, and commuter cars suffering from automatic transmission judder and manual bearing noise.",
        "dealer_comparison": "We rebuild your original transmission with upgraded, precision-machined internal components rather than imposing costly full-unit replacement fees.",
        "sub_areas": ["Farnborough Town & Queensmead", "Cove & West Heath", "Southwood & Business Park", "Fleet & Church Crookham", "Farnborough Green"]
    },
    {
        "id": "aldershot",
        "slug": "location-aldershot.html",
        "name": "Aldershot",
        "region_group": "berkshire",
        "region_label": "Hampshire",
        "postcodes": "GU11, GU12",
        "lat": "51.2484",
        "lng": "-0.7644",
        "hero_headline": "ALDERSHOT GEARBOX SPECIALISTS",
        "hero_sub": "Specialist Gearbox Repair, Clutch Rebuilds & Free Recovery Across Aldershot & Rushmoor.",
        "meta_title": "Aldershot Gearbox Specialists | Manual & Automatic Transmission Repair",
        "meta_desc": "Expert gearbox repairs in Aldershot. Manual, automatic & DSG transmission rebuilds across Aldershot, Ash, Tongham, Badshot Lea & Farnham with free collection & 12-month warranty.",
        "transit_logistics": "Fast connection via the A331 Blackwater Valley route, A323, and A31 Hog's Back for swift vehicle collection.",
        "vehicle_demographics": "Trade vehicles, family hatchbacks, and 4x4 transmissions requiring differential and gearbox overhauls.",
        "dealer_comparison": "Our certified technicians pinpoint exact mechanical and electronic faults, delivering dealership-quality rebuilds at up to 60% less cost.",
        "sub_areas": ["Aldershot Town Centre", "North Town & Wellington", "Ash & Ash Vale", "Tongham & Badshot Lea", "Farnham Borders"]
    },
    {
        "id": "berkshire",
        "slug": "location-berkshire.html",
        "name": "Berkshire",
        "region_group": "berkshire",
        "region_label": "Berkshire & Thames Valley",
        "postcodes": "RG1, RG2, RG4, RG12, RG42, SL1, SL4, SL6",
        "lat": "51.4500",
        "lng": "-0.9700",
        "hero_headline": "BERKSHIRE GEARBOX SPECIALISTS",
        "hero_sub": "County-Wide Transmission Rebuild Coverage. Free Flatbed Recovery Across Reading, Slough, Bracknell, Maidenhead & Windsor.",
        "meta_title": "Berkshire Gearbox Specialists | County-Wide Transmission Rebuilds",
        "meta_desc": "Berkshire's specialist gearbox network. Dealership-grade automatic, DSG and manual gearbox repairs across Reading, Slough, Bracknell, Maidenhead, Newbury & Wokingham with free recovery.",
        "transit_logistics": "Complete coverage of the M4 artery (Junctions 5 to 14), A329(M), and A4 Bath Road corridor with rapid response recovery transporters.",
        "vehicle_demographics": "Thames Valley technology fleet vehicles, executive commuters, and commercial logistics distribution vans.",
        "dealer_comparison": "Save up to 60% on main dealer prices across Berkshire with our 12-month / 12,000-mile warranty.",
        "sub_areas": ["Reading Area", "Slough & Windsor", "Bracknell Forest", "Maidenhead & Cookham", "Wokingham & Winnersh", "Newbury & West Berkshire"]
    },

    # --- HAMPSHIRE & SUSSEX (7 LOCATIONS) ---
    {
        "id": "southampton",
        "slug": "location-southampton.html",
        "name": "Southampton",
        "region_group": "south",
        "region_label": "Hampshire & South Coast",
        "postcodes": "SO14, SO15, SO16, SO17, SO18, SO19, SO30, SO31, SO40, SO45",
        "lat": "50.9097",
        "lng": "-1.4044",
        "hero_headline": "SOUTHAMPTON GEARBOX SPECIALISTS",
        "hero_sub": "South Coast's Leading Transmission Engineering Service. Free Recovery & Precision Rebuilds in Southampton.",
        "meta_title": "Southampton Gearbox Specialists | Automatic & Manual Transmission Repairs",
        "meta_desc": "Specialist gearbox repair in Southampton. Automatic, manual, DSG & CVT gearbox reconditioning across Southampton, Eastleigh, Totton, Hedge End & Waterside with free collection.",
        "transit_logistics": "Direct transporter routes along the M27 coastal motorway (Junctions 3, 5, 7, 8), M3 terminus, and A33 artery covering all Hampshire maritime and port logistics zones.",
        "vehicle_demographics": "High commercial port logistics van traffic (Transit Custom, Sprinter 7G/9G-Tronic), coastal salt-exposed drivetrain components, and high-density commuter automatics.",
        "dealer_comparison": "Dealerships around Millbrook and Westquay charge premium replacement figures with long backorder delays. We recondition your gearbox with full warranty protection.",
        "sub_areas": ["Southampton City & Ocean Village", "Shirley & Millbrook", "Portswood & Highfield", "Eastleigh & Chandlers Ford", "Totton & Waterside", "Hedge End & West End"]
    },
    {
        "id": "brighton",
        "slug": "location-brighton.html",
        "name": "Brighton",
        "short_name": "Brighton",
        "region_group": "south",
        "region_label": "Sussex & South Coast",
        "postcodes": "BN1, BN2, BN3, BN41, BN42, BN43",
        "lat": "50.8225",
        "lng": "-0.1372",
        "hero_headline": "BRIGHTON GEARBOX SPECIALISTS",
        "hero_sub": "Sussex's Premier Transmission Specialists. Precision Rebuilds & Free Recovery in Brighton & Hove.",
        "meta_title": "Brighton Gearbox Specialists | Expert Gearbox Repair & Transmission Rebuilds",
        "meta_desc": "Specialist gearbox repair in Brighton & Hove. Manual, automatic and DSG transmission reconditioning across Brighton, Hove, Portslade, Shoreham & Lewes with free vehicle recovery.",
        "transit_logistics": "Comprehensive recovery coverage via the A23 London-Brighton trunk road and A27 South Coast arterial route.",
        "vehicle_demographics": "Steep hillside urban driving throughout Brighton & Hove placing heavy strain on manual clutches, automatic torque converters, and CVT belts.",
        "dealer_comparison": "Main dealer quotes in East Sussex routinely involve high crate replacement charges. We diagnose and rebuild gearboxes at component level, replacing only worn gears, synchros, and electronics.",
        "sub_areas": ["Brighton City & Kemptown", "Hove & Aldrington", "Portslade & Mile Oak", "Shoreham-by-Sea & Southwick", "Lewes & Falmer"]
    },
    {
        "id": "crawley",
        "slug": "location-crawley.html",
        "name": "Crawley",
        "short_name": "Crawley",
        "region_group": "south",
        "region_label": "Sussex & Gatwick",
        "postcodes": "RH10, RH11",
        "lat": "51.1091",
        "lng": "-0.1872",
        "hero_headline": "CRAWLEY GEARBOX SPECIALISTS",
        "hero_sub": "Gatwick Corridor Gearbox Specialists. Precision Reconditioning & Free Recovery in Crawley & West Sussex.",
        "meta_title": "Crawley Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Specialist gearbox repair in Crawley & Gatwick. Expert transmission rebuilds across Crawley, Horley, East Grinstead, Horsham & Redhill with free doorstep collection & warranty.",
        "transit_logistics": "Direct access via M23 Junctions 10/10A and A23 serving Gatwick Airport logistics, Manor Royal Industrial Park, and surrounding Surrey/Sussex towns.",
        "vehicle_demographics": "Airport transfer private hire fleets (Toyota Prius/Corolla e-CVT, Mercedes E-Class 9G-Tronic), airport cargo logistics vans, and commuter hatchbacks.",
        "dealer_comparison": "Fast turnaround is critical for Crawley fleets. We deliver complete transmission reconditioning, saving customers up to 60% compared to franchised main dealers.",
        "sub_areas": ["Crawley Town & Manor Royal", "Three Bridges & Pound Hill", "Tilgate & Broadfield", "Horley & Gatwick Airport", "Horsham & Southwater"]
    },
    {
        "id": "basingstoke",
        "slug": "location-basingstoke.html",
        "name": "Basingstoke",
        "short_name": "Basingstoke",
        "region_group": "south",
        "region_label": "Hampshire",
        "postcodes": "RG21, RG22, RG23, RG24",
        "lat": "51.2667",
        "lng": "-1.0876",
        "hero_headline": "BASINGSTOKE GEARBOX SPECIALISTS",
        "hero_sub": "Dealership-Grade Transmission Repairs & Free Doorstep Collection in Basingstoke & North Hampshire.",
        "meta_title": "Basingstoke Gearbox Specialists | Transmission Repair & Rebuilds",
        "meta_desc": "Expert gearbox repairs in Basingstoke. Manual, automatic, DSG and CVT gearbox reconditioning across Basingstoke, Chineham, Kempshott & Oakley with free collection & 12-month warranty.",
        "transit_logistics": "Direct connection via M3 Junction 6, A339, and A33 arterial route connecting Hampshire and Berkshire.",
        "vehicle_demographics": "Roundabout-heavy urban road network accelerating differential gear wear and automatic clutch actuation cycles, alongside long-distance M3 commuters.",
        "dealer_comparison": "Houndmills trade dealers charge high replacement markups. We rebuild transmissions with heavy-duty OEM components and provide full quality testing before return delivery.",
        "sub_areas": ["Basingstoke Town & Houndmills", "Chineham & Sherfield", "Kempshott & Hatch Warren", "Oakley & Worting", "Old Basing & Lychpit"]
    },
    {
        "id": "hampshire",
        "slug": "location-hampshire.html",
        "name": "Hampshire",
        "region_group": "south",
        "region_label": "Hampshire",
        "postcodes": "SO14, PO1, RG21, GU14, SO23, SO51",
        "lat": "51.0500",
        "lng": "-1.3000",
        "hero_headline": "HAMPSHIRE GEARBOX SPECIALISTS",
        "hero_sub": "County-Wide Transmission Rebuild Network. Free Doorstep Recovery Across Southampton, Portsmouth, Winchester & Basingstoke.",
        "meta_title": "Hampshire Gearbox Specialists | County-Wide Gearbox Rebuilds",
        "meta_desc": "Hampshire's specialist gearbox repair network. Dealership-grade transmission reconditioning across Southampton, Portsmouth, Basingstoke, Farnborough, Winchester & Andover.",
        "transit_logistics": "Complete M3 and M27 motorway coverage, servicing all Hampshire towns with dedicated flatbed transporters.",
        "vehicle_demographics": "Port logistics commercial fleets, coastal commuter automatics, and rural Hampshire 4WD drivetrains.",
        "dealer_comparison": "Save thousands compared to Hampshire main dealerships with our 12-month / 12,000-mile warranty.",
        "sub_areas": ["Southampton Area", "Portsmouth & Southsea", "Basingstoke & Deane", "Farnborough & Aldershot", "Winchester & Eastleigh", "Andover & Test Valley"]
    },
    {
        "id": "sussex",
        "slug": "location-sussex.html",
        "name": "Sussex",
        "region_group": "south",
        "region_label": "East & West Sussex",
        "postcodes": "BN1, BN2, RH10, RH11, PO19, TN34, BN21",
        "lat": "50.9000",
        "lng": "0.0000",
        "hero_headline": "SUSSEX GEARBOX SPECIALISTS",
        "hero_sub": "County-Wide Transmission Engineering Coverage. Free Vehicle Collection Across Brighton, Crawley, Worthing, Eastbourne & Chichester.",
        "meta_title": "Sussex Gearbox Specialists | County-Wide Transmission Repair Network",
        "meta_desc": "Specialist gearbox repair across East and West Sussex. Manual, automatic and DSG transmission reconditioning across Brighton, Crawley, Worthing, Horsham & Eastbourne with free recovery.",
        "transit_logistics": "Operates along the A23, A27, and M23 corridors servicing all Sussex coastal and inland towns.",
        "vehicle_demographics": "Coastal lifestyle SUVs, airport logistics vans, and commuter vehicles facing coastal traffic conditions.",
        "dealer_comparison": "Component-level remanufacturing saves Sussex motorists up to 60% compared to main dealer quotes.",
        "sub_areas": ["Brighton & Hove Area", "Crawley & Gatwick", "Worthing & Shoreham", "Eastbourne & Lewes", "Chichester & Bognor", "Horsham & Mid Sussex"]
    },

    # --- ESSEX & EAST ANGLIA (5 LOCATIONS) ---
    {
        "id": "chelmsford",
        "slug": "location-chelmsford.html",
        "name": "Chelmsford",
        "short_name": "Chelmsford",
        "region_group": "east",
        "region_label": "Essex & East Anglia",
        "postcodes": "CM1, CM2, CM3",
        "lat": "51.7356",
        "lng": "0.4686",
        "hero_headline": "CHELMSFORD GEARBOX SPECIALISTS",
        "hero_sub": "Essex's Specialist Gearbox Service. Dealership-Grade Transmission Repairs & Free Recovery in Chelmsford.",
        "meta_title": "Chelmsford Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Expert gearbox repairs in Chelmsford. Manual, automatic and DSG transmission reconditioning across Chelmsford, Springfield, Broomfield, Great Baddow & Danbury with free recovery.",
        "transit_logistics": "Fast collection along the A12 trunk road, A130, and A414 connecting Central Essex directly to our specialist transmission engineering partner facility.",
        "vehicle_demographics": "High proportion of executive London commuter saloons (BMW, Audi, Mercedes), agricultural trade pickups, and family SUVs.",
        "dealer_comparison": "Chelmsford main dealerships charge £180+/hour in diagnostic labour. We rebuild transmissions with genuine OEM components, offering up to 60% savings.",
        "sub_areas": ["Chelmsford Central & Moulsham", "Springfield & Chelmer Village", "Broomfield & Writtle", "Great Baddow & Danbury", "South Woodham Ferrers"]
    },
    {
        "id": "cambridge",
        "slug": "location-cambridge.html",
        "name": "Cambridge",
        "short_name": "Cambridge",
        "region_group": "east",
        "region_label": "Cambridgeshire",
        "postcodes": "CB1, CB2, CB3, CB4, CB5, CB21, CB22, CB23, CB24",
        "lat": "52.2053",
        "lng": "0.1218",
        "hero_headline": "CAMBRIDGE GEARBOX SPECIALISTS",
        "hero_sub": "Cambridgeshire's Specialist Transmission Service. Precision Rebuilds & Free Recovery in Cambridge.",
        "meta_title": "Cambridge Gearbox Specialists | Automatic & Manual Transmission Repairs",
        "meta_desc": "Specialist gearbox repair in Cambridge. Expert automatic, manual & DSG gearbox reconditioning across Cambridge, Milton, Histon, Trumpington & Ely with free collection & 12-month warranty.",
        "transit_logistics": "Direct transporter dispatch via the M11 corridor (Junctions 11–14), A14 freight trunk route, and A428 connecting Cambridgeshire science parks and residential communities.",
        "vehicle_demographics": "High proportion of modern hybrid vehicles (Toyota/Lexus e-CVT, BMW/Mercedes plug-in hybrids), commuter dual-clutches, and tech corridor commercial vans.",
        "dealer_comparison": "Cambridge dealership service departments charge exorbitant rates. We provide transparent, fixed-price reconditioning with rigorous bench testing before return delivery.",
        "sub_areas": ["Cambridge City Centre", "Chesterton & Milton", "Trumpington & Great Shelford", "Histon & Impington", "Bar Hill & Cambourne", "Ely & Waterbeach"]
    },
    {
        "id": "ashford",
        "slug": "location-ashford.html",
        "name": "Ashford",
        "short_name": "Ashford",
        "region_group": "east",
        "region_label": "Kent",
        "postcodes": "TN23, TN24, TN25, TN26, TN27",
        "lat": "51.1465",
        "lng": "0.8750",
        "hero_headline": "ASHFORD GEARBOX SPECIALISTS",
        "hero_sub": "Kent's International Transport Corridor Specialists. Free Recovery & Precision Rebuilds in Ashford.",
        "meta_title": "Ashford Gearbox Specialists | Transmission Repair & Rebuilds",
        "meta_desc": "Specialist gearbox repair in Ashford, Kent. Manual, automatic and DSG transmission reconditioning across Ashford, Tenterden, Charing & Kingsnorth with free vehicle collection.",
        "transit_logistics": "Immediate dispatch via the M20 motorway (Junctions 9/10/10A) and A28 corridor servicing East Kent and Channel logistics routes.",
        "vehicle_demographics": "Heavy commercial freight support vans, high-mileage Channel crossing commuter cars, and rural 4x4 utility vehicles.",
        "dealer_comparison": "We eliminate dealer delays by holding extensive stock of precision replacement components for rapid turnarounds.",
        "sub_areas": ["Ashford Town & Designer Outlet", "Kingsnorth & Park Farm", "Kennington & Willesborough", "Tenterden & Charing", "Great Chart & Singleton"]
    },
    {
        "id": "essex",
        "slug": "location-essex.html",
        "name": "Essex",
        "region_group": "east",
        "region_label": "Essex",
        "postcodes": "CM1, SS1, CO1, RM1, IG1, CM12, CM20",
        "lat": "51.7500",
        "lng": "0.5000",
        "hero_headline": "ESSEX GEARBOX SPECIALISTS",
        "hero_sub": "County-Wide Transmission Rebuild Network. Free Doorstep Collection Across Chelmsford, Colchester, Southend, Brentwood & Basildon.",
        "meta_title": "Essex Gearbox Specialists | County-Wide Transmission Rebuilds",
        "meta_desc": "Specialist gearbox repairs across Essex. Expert automatic, manual & DSG gearbox reconditioning across Chelmsford, Colchester, Southend-on-Sea, Romford, Brentwood & Harlow with free recovery.",
        "transit_logistics": "Comprehensive coverage of the A12, A127, A13, and M25 Junctions 26–31 with dedicated flatbed transporters.",
        "vehicle_demographics": "High trade and commercial vehicle density, dual-clutch Powershift/DSG family cars, and London commuter vehicles.",
        "dealer_comparison": "Component-level reconditioning saves Essex motorists up to 60% compared to franchised main dealer replacement costs.",
        "sub_areas": ["Chelmsford Area", "Colchester & Tendring", "Southend & Basildon", "Brentwood & Shenfield", "Harlow & Epping Forest", "Braintree & Witham"]
    },
    {
        "id": "kent",
        "slug": "location-kent.html",
        "name": "Kent",
        "region_group": "east",
        "region_label": "Kent",
        "postcodes": "ME1, CT1, TN1, DA1, CT19, TN23, ME14",
        "lat": "51.2787",
        "lng": "0.5217",
        "hero_headline": "KENT GEARBOX SPECIALISTS",
        "hero_sub": "Garden of England Transmission Specialists. Free Doorstep Recovery Across Maidstone, Canterbury, Dartford & Ashford.",
        "meta_title": "Kent Gearbox Specialists | County-Wide Transmission Repair Network",
        "meta_desc": "Specialist gearbox repairs across Kent. Automatic, manual and DSG transmission reconditioning across Maidstone, Canterbury, Dartford, Bromley, Ashford & Medway with free recovery.",
        "transit_logistics": "Direct access via M20, M2, and A2 corridors connecting all Kent towns directly to our specialist transmission engineering partner facility.",
        "vehicle_demographics": "Cross-channel freight support vans, rural SUV drivetrains, and London commuter vehicles.",
        "dealer_comparison": "Precision rebuilds with full 12-month / 12,000-mile warranty at 50–60% below main dealer quotes.",
        "sub_areas": ["Maidstone Area", "Ashford International", "Canterbury & East Kent", "Dartford & Thames Gateway", "Medway Towns", "Tunbridge Wells & Sevenoaks"]
    },

    # --- OXFORDSHIRE & BUCKS (4 LOCATIONS) ---
    {
        "id": "oxford",
        "slug": "location-oxford.html",
        "name": "Oxford",
        "short_name": "Oxford",
        "region_group": "oxford",
        "region_label": "Oxfordshire",
        "postcodes": "OX1, OX2, OX3, OX4, OX14, OX20",
        "lat": "51.7520",
        "lng": "-1.2577",
        "hero_headline": "OXFORD GEARBOX SPECIALISTS",
        "hero_sub": "Oxfordshire's Premier Transmission Specialists. Precision Rebuilds & Free Recovery in Oxford.",
        "meta_title": "Oxford Gearbox Specialists | Automatic & Manual Transmission Repairs",
        "meta_desc": "Specialist gearbox repair in Oxford. Expert automatic, manual & DSG gearbox reconditioning across Oxford, Abingdon, Witney, Bicester & Didcot with free vehicle recovery.",
        "transit_logistics": "Servicing the A34 corridor, M40 Junctions 8/8A/9, and A40 linking Oxford city and county distribution parks.",
        "vehicle_demographics": "Academic commuter vehicles, rural Oxfordshire 4WD drivetrains (BMW xDrive, Land Rover), and electric/hybrid e-CVT drivetrains.",
        "dealer_comparison": "Component reconditioning saves Oxford motorists significantly compared to Oxford main dealer whole-unit replacements.",
        "sub_areas": ["Oxford City & Headington", "Cowley & Blackbird Leys", "Summertown & Marston", "Abingdon & Didcot", "Witney & Carterton", "Bicester & Kidlington"]
    },
    {
        "id": "aylesbury",
        "slug": "location-aylesbury.html",
        "name": "Aylesbury",
        "short_name": "Aylesbury",
        "region_group": "oxford",
        "region_label": "Buckinghamshire",
        "postcodes": "HP19, HP20, HP21, HP22",
        "lat": "51.8156",
        "lng": "-0.8128",
        "hero_headline": "AYLESBURY GEARBOX SPECIALISTS",
        "hero_sub": "Bucks Transmission Engineering Specialists. Precision Rebuilds & Free Recovery in Aylesbury Vale.",
        "meta_title": "Aylesbury Gearbox Specialists | Automatic & Manual Transmission Rebuilds",
        "meta_desc": "Specialist gearbox repair in Aylesbury. Manual, automatic and DSG transmission reconditioning across Aylesbury, Wendover, Tring, Thame & Buckingham with free collection & warranty.",
        "transit_logistics": "Rapid vehicle collection along the A41 trunk road, A413, and A418 serving the entire Aylesbury Vale region.",
        "vehicle_demographics": "Rural Buckinghamshire 4WD estate vehicles, London commuter automatics, and light trade commercial vans.",
        "dealer_comparison": "Our component-level repairs save Bucks drivers up to 60% compared to franchised main dealer complete unit quotes.",
        "sub_areas": ["Aylesbury Town Centre", "Bierton & Broughton", "Wendover & Weston Turville", "Stoke Mandeville & Fairford Leys", "Thame & Haddenham", "Winslow & Buckingham"]
    },
    {
        "id": "bedfordshire",
        "slug": "location-bedfordshire.html",
        "name": "Bedfordshire",
        "region_group": "oxford",
        "region_label": "Bedfordshire",
        "postcodes": "MK40, MK41, MK42, LU1, LU2, LU3, SG18",
        "lat": "52.1386",
        "lng": "-0.4667",
        "hero_headline": "BEDFORDSHIRE GEARBOX SPECIALISTS",
        "hero_sub": "County-Wide Transmission Engineering Coverage. Free Flatbed Recovery Across Bedford, Luton, Dunstable & Biggleswade.",
        "meta_title": "Bedfordshire Gearbox Specialists | County-Wide Transmission Rebuilds",
        "meta_desc": "Bedfordshire's specialist gearbox network. Dealership-grade manual, automatic & DSG repairs across Bedford, Luton, Dunstable, Leighton Buzzard & Kempston with free recovery.",
        "transit_logistics": "Direct access via M1 (Junctions 10 to 14), A1(M) corridor, and A421 expressway connecting East and West Bedfordshire.",
        "vehicle_demographics": "Major distribution warehouse commercial fleet vans, airport transit vehicles, and Bedford commuter saloons.",
        "dealer_comparison": "Bedford and Luton motorists save thousands on transmission repairs compared to local main dealer replacements.",
        "sub_areas": ["Bedford & Kempston", "Luton Area", "Dunstable & Houghton Regis", "Leighton Buzzard", "Biggleswade & Sandy", "Flitwick & Ampthill"]
    },
    {
        "id": "northamptonshire",
        "slug": "location-northamptonshire.html",
        "name": "Northamptonshire",
        "region_group": "oxford",
        "region_label": "East Midlands & Northamptonshire",
        "postcodes": "NN1, NN2, NN3, NN4, NN5, NN14, NN15, NN16, NN17, NN18",
        "lat": "52.2405",
        "lng": "-0.9027",
        "hero_headline": "NORTHAMPTONSHIRE GEARBOX SPECIALISTS",
        "hero_sub": "Logistics Golden Triangle Transmission Specialists. Free Recovery Across Northampton, Kettering, Corby & Wellingborough.",
        "meta_title": "Northamptonshire Gearbox Specialists | County-Wide Transmission Repair",
        "meta_desc": "Specialist gearbox repair in Northamptonshire. Automatic, manual & DSG gearbox reconditioning across Northampton, Kettering, Corby, Wellingborough & Daventry with free collection.",
        "transit_logistics": "Servicing the M1 corridor (Junctions 15 to 18), A14, A45, and A43 connecting all major logistics routes.",
        "vehicle_demographics": "Heavy commercial logistics van fleets, motorsport-grade drivetrains, and regional commuter saloons.",
        "dealer_comparison": "We recondition and rebuild transmissions at up to 60% below franchised main dealer replacement quotes.",
        "sub_areas": ["Northampton Area", "Kettering & Barton Seagrave", "Corby & Weldon", "Wellingborough & Rushden", "Daventry & Brackley", "Towcester & Silverstone Corridor"]
    },

    # --- MIDLANDS & SOUTH WEST EXPANSIONS (8 HIGH-VALUE HUBS) ---
    {
        "id": "birmingham",
        "slug": "location-birmingham.html",
        "name": "Birmingham",
        "region_group": "midlands",
        "region_label": "West Midlands",
        "postcodes": "B1, B2, B3, B4, B5, B15, B16, B17, B29, B90, B91",
        "lat": "52.4862",
        "lng": "-1.8904",
        "hero_headline": "BIRMINGHAM GEARBOX SPECIALISTS",
        "hero_sub": "West Midlands Premier Gearbox Engineering Service. Precision Rebuilds & Free Recovery Across Greater Birmingham.",
        "meta_title": "Birmingham Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Birmingham's specialist transmission service. Complete DSG, automatic & manual gearbox reconditioning across Birmingham, Solihull, Sutton Coldfield & Edgbaston with free collection.",
        "transit_logistics": "Rapid recovery along the M6 (Junctions 5–9), M5, M42, and A38(M) Aston Expressway with fully Clean Air Zone compliant transporters.",
        "vehicle_demographics": "Heavy commercial distribution transit vans, executive German saloons (BMW ZF 8HP, Mercedes 9G-Tronic), and high-mileage commuter dual-clutch hatchbacks.",
        "dealer_comparison": "Birmingham main dealers charge premium replacement fees. We rebuild transmissions with genuine OEM components, offering up to 60% savings.",
        "sub_areas": ["Birmingham City Centre", "Solihull & Shirley", "Sutton Coldfield & Four Oaks", "Edgbaston & Harborne", "Digbeth & Aston", "Erdington & Great Barr"]
    },
    {
        "id": "milton-keynes",
        "slug": "location-milton-keynes.html",
        "name": "Milton Keynes",
        "region_group": "oxford",
        "region_label": "Buckinghamshire",
        "postcodes": "MK1, MK2, MK3, MK4, MK5, MK6, MK7, MK8, MK9, MK10, MK11, MK12, MK13, MK14, MK15",
        "lat": "52.0406",
        "lng": "-0.7594",
        "hero_headline": "MILTON KEYNES GEARBOX SPECIALISTS",
        "hero_sub": "Grid City Transmission Specialists. Precision Rebuilds & Free Recovery Across Milton Keynes & Bletchley.",
        "meta_title": "Milton Keynes Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Specialist gearbox repair in Milton Keynes. Precision manual, automatic & DSG transmission rebuilds across Central MK, Bletchley, Newport Pagnell & Wolverton with free collection.",
        "transit_logistics": "Operates via the M1 (Junctions 13 and 14), A5 dual carriageway, and H/V grid road network for immediate collection dispatch.",
        "vehicle_demographics": "Roundabout-heavy driving accelerating dual-clutch shift-fork and mechatronic solenoid wear, alongside national distribution fleet vans.",
        "dealer_comparison": "Rebuilding your existing transmission provides dealership-level reliability at up to 60% savings compared to main dealer crate replacements.",
        "sub_areas": ["Central Milton Keynes", "Bletchley & Fenny Stratford", "Newport Pagnell", "Wolverton & Stony Stratford", "Kingston & Walnut Tree", "Shenley & Loughton"]
    },
    {
        "id": "portsmouth",
        "slug": "location-portsmouth.html",
        "name": "Portsmouth",
        "region_group": "south",
        "region_label": "Hampshire & South Coast",
        "postcodes": "PO1, PO2, PO3, PO4, PO5, PO6, PO7, PO8, PO9, PO16",
        "lat": "50.8198",
        "lng": "-1.0880",
        "hero_headline": "PORTSMOUTH GEARBOX SPECIALISTS",
        "hero_sub": "Solent Premier Transmission Specialists. Precision Rebuilds & Free Recovery Across Portsmouth, Southsea & Waterlooville.",
        "meta_title": "Portsmouth Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Specialist gearbox repair in Portsmouth. Expert manual, automatic & DSG transmission reconditioning across Southsea, Cosham, Havant, Waterlooville & Fareham with free recovery.",
        "transit_logistics": "Rapid vehicle transport via the M275, A3(M) corridor, and M27 serving the Portsmouth island and mainland commuter belt.",
        "vehicle_demographics": "Island commuter stop-start traffic, naval base trade fleet vehicles, and commercial maritime port support vans.",
        "dealer_comparison": "Our component-level rebuilds save Portsmouth motorists up to 60% compared to franchised main dealer replacement invoices.",
        "sub_areas": ["Portsmouth City & Southsea", "Cosham & Drayton", "Havant & Leigh Park", "Waterlooville & Cowplain", "Fareham & Portchester", "Gosport & Lee-on-the-Solent"]
    },
    {
        "id": "luton",
        "slug": "location-luton.html",
        "name": "Luton",
        "region_group": "oxford",
        "region_label": "Bedfordshire",
        "postcodes": "LU1, LU2, LU3, LU4",
        "lat": "51.8787",
        "lng": "-0.4200",
        "hero_headline": "LUTON GEARBOX SPECIALISTS",
        "hero_sub": "Bedfordshire's Specialist Gearbox Service. Dealership-Grade Transmission Repairs & Free Recovery in Luton.",
        "meta_title": "Luton Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Expert gearbox repairs in Luton. Manual, automatic and DSG transmission reconditioning across Luton, Dunstable, Leagrave, Stopsley & Airport corridor with free recovery.",
        "transit_logistics": "Fast vehicle collection along the M1 (Junctions 10 & 11), A505 relief artery, and A6 connecting South Bedfordshire.",
        "vehicle_demographics": "High airport transport and private hire volume (Toyota e-CVT, Mercedes 9G-Tronic), delivery fleet manuals (Vauxhall Vivaro, Transit), and commuter saloons.",
        "dealer_comparison": "Luton main dealerships typically require weeks for replacement units. We recondition your gearbox with full 12-Month / 12,000-Mile warranty protection.",
        "sub_areas": ["Luton Town Centre", "Airport & Stopsley", "Leagrave & Marsh Farm", "Bury Park & Biscot", "Dunstable & Houghton Regis", "Wigmore & Round Green"]
    },
    {
        "id": "colchester",
        "slug": "location-colchester.html",
        "name": "Colchester",
        "region_group": "east",
        "region_label": "Essex",
        "postcodes": "CO1, CO2, CO3, CO4, CO5, CO6, CO7",
        "lat": "51.8959",
        "lng": "0.8919",
        "hero_headline": "COLCHESTER GEARBOX SPECIALISTS",
        "hero_sub": "North Essex Premier Transmission Service. Precision Rebuilds & Free Recovery in Colchester & Tendring.",
        "meta_title": "Colchester Gearbox Specialists | Automatic & Manual Transmission Rebuilds",
        "meta_desc": "Specialist gearbox repair in Colchester. Expert manual, automatic & DSG transmission reconditioning across Colchester, Stanway, Lexden, Mile End & Wivenhoe with free collection.",
        "transit_logistics": "Operates along the A12 trunk corridor, A120 to Harwich/Stansted, and A133 covering North Essex and the Tendring peninsula.",
        "vehicle_demographics": "London commuter saloons (Audi S-Tronic, BMW ZF 8HP), agricultural utility 4WDs, and military garrison logistics vehicles.",
        "dealer_comparison": "Component-level remanufacturing saves Colchester motorists up to 60% compared to main dealer quotes.",
        "sub_areas": ["Colchester Town Centre", "Stanway & Tollgate", "Lexden & Prettygate", "Mile End & Highwoods", "Wivenhoe & Greenstead", "Tiptree & West Mersea"]
    },
    {
        "id": "maidstone",
        "slug": "location-maidstone.html",
        "name": "Maidstone",
        "region_group": "east",
        "region_label": "Kent",
        "postcodes": "ME14, ME15, ME16, ME17, ME18",
        "lat": "51.2704",
        "lng": "0.5227",
        "hero_headline": "MAIDSTONE GEARBOX SPECIALISTS",
        "hero_sub": "Kent County Town Transmission Specialists. Precision Rebuilds & Free Recovery Across Maidstone & Medway Valley.",
        "meta_title": "Maidstone Gearbox Specialists | Expert Transmission Repairs & Rebuilds",
        "meta_desc": "Specialist gearbox repair in Maidstone. Manual, automatic and DSG transmission reconditioning across Maidstone, Bearsted, Allington, Barming & Loose with free vehicle recovery.",
        "transit_logistics": "Direct transporter dispatch via the M20 motorway (Junctions 5, 6, 7), A229 Blue Bell Hill, and A249 connecting Central Kent and Medway.",
        "vehicle_demographics": "Executive London commuter saloons, rural family 4x4s (Land Rover Discovery, Audi Quattro), and Kent trade vans.",
        "dealer_comparison": "We eliminate main dealer delays by holding extensive stock of precision bearings, mechatronic circuit boards, and torque converters for rapid rebuilds.",
        "sub_areas": ["Maidstone Town Centre", "Bearsted & Penenden Heath", "Allington & Barming", "Loose & Coxheath", "Aylesford & Ditton", "Headcorn & Staplehurst"]
    },
    {
        "id": "swindon",
        "slug": "location-swindon.html",
        "name": "Swindon",
        "region_group": "berkshire",
        "region_label": "Wiltshire & Thames Valley West",
        "postcodes": "SN1, SN2, SN3, SN4, SN5, SN25, SN26",
        "lat": "51.5558",
        "lng": "-1.7797",
        "hero_headline": "SWINDON GEARBOX SPECIALISTS",
        "hero_sub": "M4 Corridor Transmission Engineering Specialists. Free Doorstep Recovery & Precision Rebuilds in Swindon.",
        "meta_title": "Swindon Gearbox Specialists | Automatic & Manual Transmission Rebuilds",
        "meta_desc": "Specialist gearbox repair in Swindon. Expert automatic, manual & DSG transmission rebuilds across Swindon, North Swindon, Wroughton & Highworth with free collection & 12-month warranty.",
        "transit_logistics": "Immediate dispatch via the M4 Motorway (Junctions 15 and 16), A419 dual carriageway to Cirencester/Gloucester, and A420 to Oxford.",
        "vehicle_demographics": "High automotive manufacturing heritage fleet vehicles, commuter saloons, and logistics support vans operating on the M4 corridor.",
        "dealer_comparison": "Swindon dealerships typically charge high sums for complete crate units. We recondition your existing transmission to factory tolerances with full warranty protection.",
        "sub_areas": ["Central Swindon & Old Town", "North Swindon & Haydon Wick", "West Swindon & Freshbrook", "Wroughton & Chiseldon", "Highworth & Blunsdon", "Stratton St Margaret"]
    },
    {
        "id": "bristol",
        "slug": "location-bristol.html",
        "name": "Bristol",
        "region_group": "south",
        "region_label": "South West & Bristol",
        "postcodes": "BS1, BS2, BS3, BS4, BS5, BS6, BS7, BS8, BS9, BS10, BS16",
        "lat": "51.4545",
        "lng": "-2.5879",
        "hero_headline": "BRISTOL GEARBOX SPECIALISTS",
        "hero_sub": "South West's Specialist Transmission Engineering Service. Free Vehicle Collection Across Greater Bristol & Bath.",
        "meta_title": "Bristol Gearbox Specialists | Automatic, DSG & Manual Gearbox Repair",
        "meta_desc": "Specialist gearbox repair in Bristol. Expert automatic, manual & DSG gearbox reconditioning across Bristol, Clifton, Bedminster, Filton & Kingswood with free recovery & 12-month warranty.",
        "transit_logistics": "Comprehensive coverage of the M4/M5 Almondsbury interchange, M32 city artery, and A4 Portway with Clean Air Zone compliant transporters.",
        "vehicle_demographics": "Major aerospace and tech corridor fleet vehicles, urban hybrids (Toyota e-CVT), executive automatics (ZF 8HP), and high-mileage trade commercial vans.",
        "dealer_comparison": "Bristol franchised dealerships charge £190+/hour in diagnostic labour. We rebuild transmissions with genuine OEM components, offering up to 60% savings.",
        "sub_areas": ["Bristol City Centre & Harbourside", "Clifton & Redland", "Bedminster & Southville", "Filton & Patchway", "Kingswood & Fishponds", "Stoke Bishop & Henleaze"]
    }
]


def render_html_page(loc):
    """
    Renders clean, beautiful, semantic HTML5 for each location page.
    """
    sub_areas_html = ""
    for area in loc["sub_areas"]:
        sub_areas_html += f"""
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.25rem 1.5rem;">
            <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.4rem;">
              <span style="color:var(--amber-400); font-size:1.1rem;">📍</span>
              <h4 style="color:#ffffff; font-size:1.05rem; font-weight:800; margin:0;">{area}</h4>
            </div>
            <p style="color:#94a3b8; font-size:0.85rem; margin:0; line-height:1.4;">
              Full recovery coverage, doorstep inspection, and rapid transport directly to our specialist transmission engineering partner facility.
            </p>
          </div>
        """

    faqs = [
        {
            "q": f"How does vehicle collection and recovery work in {loc['name']}?",
            "a": f"We provide complimentary flatbed vehicle recovery on all completed repairs across {loc['name']} postcodes ({loc['postcodes'].split(',')[0]} and surrounding areas). Our driver collects your vehicle from your home, workplace, or roadside and transports it directly to our specialist engineering facility. (If a repair is declined following vehicle transport and diagnostic inspection, a standard recovery fee from £150 applies)."
        },
        {
            "q": f"How does Gearbox Giants compare to {loc['name']} franchised main dealers?",
            "a": f"Main dealerships in {loc['name']} typically quote for complete brand-new crate replacements with long backorders. Gearbox Giants reconditions and rebuilds your existing transmission with OEM-grade components, saving customers up to 60% with full 12-Month / 12,000-Mile warranty protection."
        },
        {
            "q": f"What types of gearboxes and transmissions do you repair in {loc['name']}?",
            "a": f"We service and recondition all transmission types including manual gearboxes, torque-converter automatics (ZF 6HP/8HP/9HP, Mercedes 7G/9G-Tronic, Aisin), dual-clutch systems (VAG DSG DQ200/DQ250/DQ381/DQ500, Ford Powershift, BMW DCT), hybrid e-CVTs, and 4WD transfer boxes."
        },
        {
            "q": f"How quickly is a gearbox repair or rebuild completed for {loc['name']} customers?",
            "a": f"We operate a prompt turnaround from vehicle collection. Once precision-reconditioned and quality-verified, we deliver your vehicle back to your doorstep in {loc['name']} fully road-tested with a complimentary car wash for all completed jobs."
        },
        {
            "q": f"What warranty is provided with your {loc['name']} gearbox repairs?",
            "a": f"Qualifying full gearbox rebuilds and reconditioned gearbox installations include our 12-Month / 12,000-Mile warranty covering parts and labour, with targeted component repairs covered for 6 months / 6,000 miles."
        }
    ]

    faq_html = ""
    for f in faqs:
        faq_html += f"""
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:1.25rem 1.5rem; margin-bottom:1rem;">
            <h4 style="color:#ffffff; font-size:1.05rem; font-weight:800; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:var(--amber-400);">Q:</span> {f['q']}
            </h4>
            <p style="color:#94a3b8; font-size:0.92rem; line-height:1.6; margin:0;">
              {f['a']}
            </p>
          </div>
        """

    faq_schema_items = []
    for f in faqs:
        faq_schema_items.append({
            "@type": "Question",
            "name": f["q"],
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f["a"]
            }
        })

    json_ld_schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AutoRepair",
                "@id": f"https://gearboxgiants.co.uk/{loc['slug']}#autorepair",
                "name": f"Gearbox Giants {loc['name']} Transmission Specialists",
                "image": "https://gearboxgiants.co.uk/assets/workshop_facility.jpg",
                "telephone": "0208 058 9668",
                "email": "Contact@gearboxgiants.co.uk",
                "url": f"https://gearboxgiants.co.uk/{loc['slug']}",
                "description": loc["meta_desc"],
                "priceRange": "££",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": loc["name"],
                    "addressRegion": loc["region_label"],
                    "addressCountry": "GB"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": loc["lat"],
                    "longitude": loc["lng"]
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "opens": "09:00",
                        "closes": "18:00"
                    }
                ],
                "areaServed": loc["sub_areas"],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": f"{loc['name']} Gearbox & Transmission Repair Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": f"{loc['name']} Gearbox Repair & Reconditioning",
                                "description": f"Complete manual, automatic and dual-clutch transmission reconditioning in {loc['name']}."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": f"{loc['name']} DSG Mechatronic Diagnostics",
                                "description": f"Dealership-grade mechatronic unit testing and calibration in {loc['name']}."
                            }
                        }
                    ]
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "128",
                    "bestRating": "5"
                }
            },
            {
                "@type": "FAQPage",
                "@id": f"https://gearboxgiants.co.uk/{loc['slug']}#faq",
                "mainEntity": faq_schema_items
            },
            {
                "@type": "BreadcrumbList",
                "@id": f"https://gearboxgiants.co.uk/{loc['slug']}#breadcrumbs",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://gearboxgiants.co.uk/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Locations",
                        "item": "https://gearboxgiants.co.uk/locations.html"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": loc["name"],
                        "item": f"https://gearboxgiants.co.uk/{loc['slug']}"
                    }
                ]
            }
        ]
    }

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>{loc['meta_title']}</title>
  
  <!-- Primary Meta Tags -->
  <meta name="title" content="{loc['meta_title']}">
  <meta name="description" content="{loc['meta_desc']}">
  <meta name="author" content="Gearbox Giants UK">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://gearboxgiants.co.uk/{loc['slug']}">

  <!-- Open Graph / Social -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://gearboxgiants.co.uk/{loc['slug']}">
  <meta property="og:title" content="{loc['meta_title']}">
  <meta property="og:description" content="{loc['meta_desc']}">
  <meta property="og:image" content="https://gearboxgiants.co.uk/assets/workshop_facility.jpg">

  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2.2'><circle cx='12' cy='12' r='3'/><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'/></svg>">

  <!-- Core Stylesheets -->
  <link rel="stylesheet" href="css/style.css?v=52.0">
  <link rel="stylesheet" href="css/components.css?v=52.0">
  <link rel="stylesheet" href="css/animations.css?v=5.2">

  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
{json.dumps(json_ld_schema, indent=2)}
  </script>
</head>
<body>

  <!-- ==========================================================================
       HEADER
       ========================================================================== -->
  <header class="site-header">
    <div class="container nav-container">
      <a href="index.html" class="brand-logo" aria-label="Gearbox Giants Homepage">
        <svg class="brand-gear-icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
        <span class="brand-title">Gearbox <span>GIANTS</span></span>
      </a>

      <div class="nav-right-group">
        <nav aria-label="Main Navigation">
          <ul class="nav-links">
            <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="services.html" class="nav-link">Services</a></li>
            <li class="nav-item"><a href="fault-finding.html" class="nav-link">Fault Finding</a></li>
            <li class="nav-item"><a href="locations.html" class="nav-link active">Locations</a></li>
          </ul>
        </nav>

        <div class="nav-actions">
          <a href="tel:02080589668" class="phone-link-clean" aria-label="Call Gearbox Giants">0208 058 9668</a>
          <button class="nav-quote-link" onclick="window.openQuoteModal('{loc['name']}')">Quote Me <span>→</span></button>
          <button id="mobile-menu-toggle" class="btn-mobile-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobile-nav-backdrop" class="mobile-nav-backdrop"></div>
  <div id="mobile-nav-drawer" class="mobile-nav-drawer">
    <div>
      <div class="mobile-drawer-header">
        <div class="brand-logo">
          <svg class="brand-gear-icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          <span class="brand-title" style="font-size:1.1rem;">Gearbox <span>GIANTS</span></span>
        </div>
        <button id="mobile-drawer-close" class="mobile-drawer-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>
      <ul class="mobile-nav-links">
        <li><a href="index.html" class="mobile-nav-link">Home <span>→</span></a></li>
        <li><a href="services.html" class="mobile-nav-link">Services <span>→</span></a></li>
        <li><a href="fault-finding.html" class="mobile-nav-link">Fault Finding <span>→</span></a></li>
        <li><a href="locations.html" class="mobile-nav-link active">Locations <span>→</span></a></li>
      </ul>
    </div>
    <div>
      <a href="tel:02080589668" class="btn btn-secondary btn-full" style="margin-bottom:0.75rem;">0208 058 9668</a>
      <button class="btn btn-primary btn-full btn-lg" onclick="window.openQuoteModal('{loc['name']}')">Quote Me Now</button>
    </div>
  </div>

  <main>
    <!-- ==========================================================================
         CINEMATIC HERO SECTION
         ========================================================================== -->
    <section class="cinematic-hero-section">
      <div class="hero-parallax-layer hero-img-locations"></div>
      <div class="hero-parallax-overlay"></div>

      <div class="container" style="position:relative; z-index:10;">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" style="margin-bottom:1rem; font-size:0.85rem; color:#94a3b8;">
          <a href="index.html" style="color:#cbd5e1; text-decoration:none;">Home</a> &nbsp;/&nbsp; 
          <a href="locations.html" style="color:#cbd5e1; text-decoration:none;">Locations</a> &nbsp;/&nbsp; 
          <span style="color:var(--amber-400); font-weight:700;">{loc['name']}</span>
        </nav>

        <div class="cinematic-hero-content fade-in-up">
          <div class="hero-tag-simple desktop-only">GEARBOX COLLECTION & REPAIR SERVICE &bull; {loc['region_label'].upper()}</div>

          <h1 class="hero-title-cinematic">
            <span class="title-line-nowrap">{loc['hero_headline']}</span><br>
            <span class="highlight-amber">PRECISION RECONDITIONING & FREE RECOVERY</span>
          </h1>

          <p class="hero-desc-cinematic">
            Dedicated vehicle collection covering {loc['name']}. Precision reconditioning, mechatronic repairs, and quality testing completed through our specialist transmission partner facilities with 12-month / 12,000-mile warranty.
          </p>

          <!-- Clean Registration Form -->
          <div class="hero-action-row">
            <form class="hero-reg-form" onsubmit="event.preventDefault(); window.openQuoteModal('{loc['name']}', '', this.querySelector('.uk-reg-input').value);">
              <div class="uk-reg-box">
                <div class="uk-reg-flag">
                  <svg viewBox="0 0 60 30" width="16" height="10"><path d="M0 0h60v30H0z" fill="#012169"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>
                  <span>GB</span>
                </div>
                <input type="text" class="uk-reg-input" placeholder="ENTER REG" maxlength="8" autocomplete="off" autocorrect="off" autocapitalize="characters">
              </div>
              <button type="submit" class="btn-hero-quote">
                <span>GET QUOTE IN {loc['name'].upper()}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Ticker -->
    <div class="trust-ticker-container">
      <div class="marquee-track">
        <div class="marquee-content">
          <span>FREE FLATBED RECOVERY (COMPLETED REPAIRS)</span>
          <span class="ticker-dot">✦</span>
          <span>12-MONTH / 12,000-MILE WARRANTY</span>
          <span class="ticker-dot">✦</span>
          <span>ALL MAKES & MODELS &bull; DSG &bull; AUTO &bull; MANUAL</span>
          <span class="ticker-dot">✦</span>
          <span>COMPLIMENTARY CAR WASH ON RETURN</span>
          <span class="ticker-dot">✦</span>
          <span>COMPONENT-LEVEL RECONDITIONING</span>
          <span class="ticker-dot">✦</span>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         SECTION 1: OVERVIEW & LOCAL LOGISTICS
         ========================================================================== -->
    <section class="section" style="padding-top:4rem; padding-bottom:4rem;">
      <div class="container">
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:3rem; align-items:center;">
          <div>
            <div class="section-tag-gold">{loc['name'].upper()} SERVICE AREA</div>
            <h2 style="font-size:clamp(1.9rem, 3.5vw, 2.6rem); color:#ffffff; font-family:var(--font-heading); margin-bottom:1.25rem;">
              Specialist Transmission Repairs Covering <span class="highlight-amber">{loc['name']}</span>.
            </h2>
            <p style="color:#cbd5e1; font-size:1.05rem; line-height:1.7; margin-bottom:1.25rem;">
              When your vehicle experiences transmission slipping, loss of gears, harsh engagement, or mechatronic warning lights in {loc['name']}, our dedicated collection service arranges rapid transport directly to our central specialist transmission facility.
            </p>
            <p style="color:#94a3b8; font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem;">
              <strong>Transport & Recovery Routes:</strong> {loc['transit_logistics']}
            </p>
            <div style="display:flex; gap:1rem; flex-wrap:wrap;">
              <button class="btn btn-primary" onclick="window.openQuoteModal('{loc['name']}')">Get Your Free {loc['name']} Quote →</button>
              <a href="tel:02080589668" class="btn btn-secondary">Speak to a Specialist Technician</a>
            </div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:2rem;">
            <h3 style="color:#ffffff; font-size:1.25rem; font-weight:800; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;">
              <span style="color:var(--amber-400);">📍</span> Doorstep Collection & Recovery
            </h3>
            <p style="color:#94a3b8; font-size:0.92rem; line-height:1.6; margin-bottom:1.25rem;">
              We operate insured flatbed vehicle recovery covering postcodes {loc['postcodes']}. Your vehicle is collected, fully diagnosed and reconditioned at our specialist facility, and returned to your doorstep.
            </p>
            <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:1rem;">
              <div style="font-size:0.8rem; font-weight:800; color:var(--amber-400); text-transform:uppercase; margin-bottom:0.4rem;">
                Indicative Dealer Comparison
              </div>
              <p style="color:#cbd5e1; font-size:0.88rem; line-height:1.5; margin:0;">
                Main dealerships typically quote for complete crate unit replacements. Reconditioning the specific failure components at our specialist facility provides an OEM-grade repair at significant savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         SECTION 2: COMPLETE TRANSMISSION SERVICES
         ========================================================================== -->
    <section class="section" style="background:#0c0e14; padding-top:4rem; padding-bottom:4rem; border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05);">
      <div class="container">
        <div style="text-align:center; max-width:760px; margin:0 auto 3rem auto;">
          <div class="section-tag-gold">CENTRAL ENGINEERING FACILITY</div>
          <h2 style="font-size:clamp(1.9rem, 3.5vw, 2.6rem); color:#ffffff; font-family:var(--font-heading);">
            Complete Gearbox Engineering For All Vehicle Types
          </h2>
          <p style="color:#94a3b8; font-size:1rem;">
            Precision rebuild benches, electronic diagnostic rigs, and dynamic component testing for vehicles collected across {loc['name']}.
          </p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.5rem;">
          <!-- Card 1: DSG / Dual-Clutch -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.75rem;">
            <div style="font-size:1.8rem; margin-bottom:0.75rem;">🏎️</div>
            <h3 style="color:#ffffff; font-size:1.15rem; font-weight:800; margin-bottom:0.5rem;">DSG & S-Tronic Dual-Clutch</h3>
            <p style="color:#94a3b8; font-size:0.88rem; line-height:1.6; margin-bottom:1rem;">
              Specialist repairs for VAG DQ200, DQ250, DQ381, DQ500, DL501, and Ford Powershift 6DCT450. Valve body replacement, clutch pack recalibration, and mechatronic board repairs.
            </p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <a href="services.html#dsg-repairs" style="color:var(--amber-400); font-weight:700; font-size:0.85rem; text-decoration:none;">Explore DSG Repairs →</a>
              <a href="fault-finding.html#warning-lights" style="color:#64748b; font-size:0.8rem; text-decoration:none;">Limp Mode Guide</a>
            </div>
          </div>

          <!-- Card 2: Torque-Converter Automatic -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.75rem;">
            <div style="font-size:1.8rem; margin-bottom:0.75rem;">⚡</div>
            <h3 style="color:#ffffff; font-size:1.15rem; font-weight:800; margin-bottom:0.5rem;">Automatic Transmissions</h3>
            <p style="color:#94a3b8; font-size:0.88rem; line-height:1.6; margin-bottom:1rem;">
              Full reconditioning of ZF 6HP/8HP/9HP, Mercedes 7G/9G-Tronic, Aisin, and GM automatics. Torque converter remanufacturing, planetary gearset overhauls, and hydraulic pressure testing.
            </p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <a href="services.html#automatic-gearboxes" style="color:var(--amber-400); font-weight:700; font-size:0.85rem; text-decoration:none;">Explore Automatic Repairs →</a>
              <a href="fault-finding.html#delayed-engagement" style="color:#64748b; font-size:0.8rem; text-decoration:none;">Slipping Guide</a>
            </div>
          </div>

          <!-- Card 3: Manual Gearboxes -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.75rem;">
            <div style="font-size:1.8rem; margin-bottom:0.75rem;">⚙️</div>
            <h3 style="color:#ffffff; font-size:1.15rem; font-weight:800; margin-bottom:0.5rem;">Manual Gearboxes & Clutches</h3>
            <p style="color:#94a3b8; font-size:0.88rem; line-height:1.6; margin-bottom:1rem;">
              5-speed and 6-speed manual gearbox overhauls for passenger and commercial fleet vans. Upgraded high-load tapered roller bearings, brass synchromesh rings, and dual-mass flywheels.
            </p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <a href="services.html#manual-gearboxes" style="color:var(--amber-400); font-weight:700; font-size:0.85rem; text-decoration:none;">Explore Manual Repairs →</a>
              <a href="fault-finding.html#unusual-sounds" style="color:#64748b; font-size:0.8rem; text-decoration:none;">Bearing Whine Guide</a>
            </div>
          </div>

          <!-- Card 4: Transfer Boxes & 4WD -->
          <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.75rem;">
            <div style="font-size:1.8rem; margin-bottom:0.75rem;">🚙</div>
            <h3 style="color:#ffffff; font-size:1.15rem; font-weight:800; margin-bottom:0.5rem;">4WD Transfer Boxes & Differentials</h3>
            <p style="color:#94a3b8; font-size:0.88rem; line-height:1.6; margin-bottom:1rem;">
              Precision servicing for Land Rover, BMW xDrive, Mercedes 4MATIC, and Audi Quattro transfer boxes, Haldex couplings, and viscous center differentials.
            </p>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <a href="services.html#transfer-boxes-4wd" style="color:var(--amber-400); font-weight:700; font-size:0.85rem; text-decoration:none;">Explore 4WD Repairs →</a>
              <a href="fault-finding.html#fluid-leaks" style="color:#64748b; font-size:0.8rem; text-decoration:none;">Fluid Leak Guide</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         SECTION 3: LOCAL AREA COVERAGE
         ========================================================================== -->
    <section class="section" style="padding-top:4rem; padding-bottom:4rem;">
      <div class="container">
        <div style="text-align:center; max-width:760px; margin:0 auto 2.5rem auto;">
          <div class="section-tag-gold">DOORSTEP VEHICLE RECOVERY</div>
          <h2 style="font-size:clamp(1.9rem, 3.5vw, 2.5rem); color:#ffffff; font-family:var(--font-heading);">
            Collection Coverage Across {loc['name']}
          </h2>
          <p style="color:#94a3b8; font-size:0.95rem;">
            Covering postcodes <strong>{loc['postcodes']}</strong> with fully insured flatbed recovery directly to our central transmission facility.
          </p>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1.25rem;">
          {sub_areas_html}
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         SECTION 4: LOCALIZED FAQS
         ========================================================================== -->
    <section class="section" style="background:#0c0e14; padding-top:4rem; padding-bottom:4rem; border-top:1px solid rgba(255,255,255,0.05);">
      <div class="container" style="max-width:860px;">
        <div style="text-align:center; margin-bottom:2.5rem;">
          <div class="section-tag-gold">FREQUENTLY ASKED QUESTIONS</div>
          <h2 style="font-size:clamp(1.9rem, 3.5vw, 2.5rem); color:#ffffff; font-family:var(--font-heading);">
            {loc['name']} Transmission FAQs
          </h2>
          <p style="color:#94a3b8; font-size:0.95rem;">
            Frequently asked questions regarding our vehicle collection process, turnaround times, and warranty coverage for {loc['name']} motorists.
          </p>
        </div>

        <div>
          {faq_html}
        </div>

        <div style="text-align:center; margin-top:2.5rem;">
          <button class="btn btn-primary btn-lg" onclick="window.openQuoteModal('{loc['name']}')">
            Request Your Instant {loc['name']} Quote →
          </button>
        </div>
      </div>
    </section>
  </main>

  <!-- ==========================================================================
       FOOTER
       ========================================================================== -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <a href="index.html" class="brand-logo" style="margin-bottom:1rem;">
            <svg class="brand-gear-icon" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            <span class="brand-title">Gearbox <span>GIANTS</span></span>
          </a>
          <p style="font-size:0.92rem; line-height:1.5; margin-bottom:1rem; color:#94a3b8;">
            Specialist transmission reconditioning with complimentary recovery across {loc['name']} and the UK. All engineering performed at our central specialist facility.
          </p>
          <a href="tel:02080589668" style="color:#ffffff; font-weight:800; text-decoration:none; font-size:1.05rem;">
             0208 058 9668
          </a>
        </div>
        <div class="footer-nav-col">
          <h3 class="footer-col-title">Navigation</h3>
          <ul class="footer-links">
            <li><a href="index.html" class="footer-link">Home</a></li>
            <li><a href="services.html" class="footer-link">Services</a></li>
            <li><a href="fault-finding.html" class="footer-link">Fault Finding</a></li>
            <li><a href="locations.html" class="footer-link">Locations Directory</a></li>
          </ul>
        </div>
        <div class="footer-nav-col">
          <h3 class="footer-col-title">Legal & Terms</h3>
          <ul class="footer-links">
            <li><a href="privacy.html" class="footer-link">Privacy Policy</a></li>
            <li><a href="terms.html" class="footer-link">Terms & Conditions</a></li>
            <li><a href="warranty.html" class="footer-link">Warranty Terms</a></li>
            <li><a href="cookies.html" class="footer-link">Cookie Policy</a></li>
            <li><a href="complaints.html" class="footer-link">Complaints</a></li>
          </ul>
        </div>
        <div class="footer-hours-col">
          <h3 class="footer-col-title">Hours</h3>
          <ul class="opening-hours-list">
            <li><span>Mon–Sun:</span> <span>09:00 – 18:00</span></li>
          </ul>
          <p style="margin-top:0.75rem; font-size:0.85rem; color:#94a3b8;">
            Contact@gearboxgiants.co.uk
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2024–2026 Gearbox Giants UK. All Rights Reserved. &bull; {loc['name']} Service Area</div>
      </div>
    </div>
  </footer>

  <script src="js/parallax-hero.js?v=37.0"></script>
  <script src="js/quote.js?v=52.0"></script>
  <script src="js/app.js?v=5.2"></script>
</body>
</html>
"""
    return html


def update_locations_directory_page():
    """
    Updates locations.html to cleanly present all locations with active pill links.
    """
    pills_html = ""
    for loc in LOCATION_CONFIGS:
        pills_html += f'            <a href="{loc["slug"]}" class="symptom-tag-pill">{loc["name"]}</a>\n'

    with open(os.path.join(BASE_DIR, "locations.html"), "r", encoding="utf-8") as f:
        loc_html = f.read()

    # Replace the location pills section
    pills_block = f"""          <div class="locations-pills-grid">
{pills_html}          </div>"""

    loc_html = re.sub(
        r'<div class="locations-pills-grid">[\s\S]*?</div>',
        pills_block,
        loc_html,
        count=1
    )

    with open(os.path.join(BASE_DIR, "locations.html"), "w", encoding="utf-8") as f:
        f.write(loc_html)

    print("Updated locations.html directory grid!")


def update_sitemap():
    """
    Regenerates sitemap.xml with all canonical site pages and location pages.
    """
    core_pages = [
        ("https://gearboxgiants.co.uk/", "1.0", "daily"),
        ("https://gearboxgiants.co.uk/services.html", "0.9", "weekly"),
        ("https://gearboxgiants.co.uk/fault-finding.html", "0.9", "weekly"),
        ("https://gearboxgiants.co.uk/locations.html", "0.9", "weekly"),
        ("https://gearboxgiants.co.uk/quote.html", "0.9", "weekly"),
        ("https://gearboxgiants.co.uk/warranty.html", "0.8", "monthly"),
        ("https://gearboxgiants.co.uk/terms.html", "0.7", "monthly"),
        ("https://gearboxgiants.co.uk/privacy.html", "0.7", "monthly"),
        ("https://gearboxgiants.co.uk/cookies.html", "0.6", "monthly"),
        ("https://gearboxgiants.co.uk/complaints.html", "0.6", "monthly"),
    ]

    sitemap_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    for url, priority, freq in core_pages:
        sitemap_lines.append(f"""  <url>
    <loc>{url}</loc>
    <lastmod>2026-09-02</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

    for loc in LOCATION_CONFIGS:
        sitemap_lines.append(f"""  <url>
    <loc>https://gearboxgiants.co.uk/{loc['slug']}</loc>
    <lastmod>2026-09-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")

    sitemap_lines.append('</urlset>')

    with open(os.path.join(BASE_DIR, "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write("\n".join(sitemap_lines))

    print(f"Updated sitemap.xml with {len(core_pages) + len(LOCATION_CONFIGS)} URLs!")


def main():
    print("Building all location pages...")
    for loc in LOCATION_CONFIGS:
        html = render_html_page(loc)
        target = os.path.join(BASE_DIR, loc["slug"])
        with open(target, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"  ✓ Built {loc['slug']} ({loc['name']})")

    update_locations_directory_page()
    update_sitemap()
    print("\nAll location pages, directory hubs, and sitemap successfully rebuilt!")


if __name__ == "__main__":
    main()
