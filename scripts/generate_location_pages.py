#!/usr/bin/env python3
"""
Generate 36 bespoke location pages for Gearbox Giants with 100% consistent Header, Hero, Ticker, and Footer architecture matching location-london.html.
"""

import os
import json

BASE_DIR = "/Users/danielshirley/.gemini/antigravity/scratch/gearbox-giants"

LOCATIONS_DATA = [
    {
        "id": "east-london",
        "name": "East London",
        "region_group": "London",
        "filename": "location-east-london.html",
        "postcodes": "E1, E2, E3, E5, E8, E9, E14, E15, IG1, RM1",
        "lat": "51.5362",
        "lng": "0.0354",
        "hero_desc": "Specialist gearbox repair & reconditioning in <strong>East London</strong>. Free recovery, 12-month warranty, and up to 60% cheaper than main dealer.",
        "overview_p1": "When your transmission starts slipping in Stratford or loses drive on the A12, you need an established <strong>East London gearbox specialist</strong>. Gearbox Giants provides dealership-grade diagnostic scans, precision rebuilds, and rapid flatbed recovery across all East London boroughs.",
        "overview_p2": "From our advanced transmission centre, we handle manual, automatic, DSG dual-clutch, and powershift gearboxes across Tower Hamlets, Newham, Hackney, Waltham Forest, Redbridge, Barking & Dagenham.",
        "coverage_highlight": "East London Coverage Guaranteed",
        "coverage_p": "Whether you are located in Canary Wharf, commuting through Bow, or parked in Ilford or Romford, our ULEZ-compliant recovery transporters provide rapid collection directly to our specialized gearbox centre.",
        "areas": [
            {
                "title": "Stratford & Newham",
                "postcodes": "Postcodes: E15, E16, E7, E12, E6",
                "items": [
                    ("Stratford & Olympic Park", "Stratford • West Ham • Maryland • Forest Gate"),
                    ("Docklands & Royal Docks", "Canning Town • Custom House • Beckton • Silvertown"),
                    ("East Borough Towns", "East Ham • Manor Park • Upton Park")
                ],
                "quote_tag": "Stratford"
            },
            {
                "title": "Tower Hamlets & Canary Wharf",
                "postcodes": "Postcodes: E1, E14, E2, E3",
                "items": [
                    ("Canary Wharf & Isle of Dogs", "Canary Wharf • Isle of Dogs • Poplar • Blackwall"),
                    ("City Borders", "Whitechapel • Spitalfields • Aldgate • Stepney"),
                    ("Bow & Mile End", "Mile End • Bow • Bethnal Green • Limehouse")
                ],
                "quote_tag": "Canary Wharf"
            },
            {
                "title": "Hackney & Shoreditch",
                "postcodes": "Postcodes: E8, E9, E5, E2, N16",
                "items": [
                    ("Central Hackney", "Hackney Central • Dalston • Hackney Wick • London Fields"),
                    ("Shoreditch & Hoxton", "Shoreditch • Hoxton • Haggerston"),
                    ("North Hackney", "Stoke Newington • Clapton • Homerton • Stamford Hill")
                ],
                "quote_tag": "Hackney"
            },
            {
                "title": "Waltham Forest & Leyton",
                "postcodes": "Postcodes: E10, E11, E17, E4",
                "items": [
                    ("Walthamstow", "Walthamstow Central • Blackhorse Road • Higham Hill"),
                    ("Leyton & Leytonstone", "Leyton • Leytonstone • Wanstead Borders"),
                    ("Chingford & Highams Park", "Chingford • Highams Park • Sewardstone")
                ],
                "quote_tag": "Walthamstow"
            },
            {
                "title": "Redbridge & Ilford",
                "postcodes": "Postcodes: IG1, IG2, IG3, IG4, IG5, IG6, E18",
                "items": [
                    ("Ilford Central", "Ilford • Seven Kings • Goodmayes • Newbury Park"),
                    ("Redbridge North", "Gants Hill • Barkingside • Hainault • Fairlop"),
                    ("Woodford & Wanstead", "South Woodford • Woodford Green • Wanstead")
                ],
                "quote_tag": "Ilford"
            },
            {
                "title": "Barking, Dagenham & Havering",
                "postcodes": "Postcodes: IG11, RM8, RM9, RM10, RM1, RM7",
                "items": [
                    ("Barking & River", "Barking Town Centre • Barking Riverside • Thames View"),
                    ("Dagenham", "Dagenham Heathway • Becontree • Chadwell Heath"),
                    ("Romford Gateway", "Romford • Rush Green • Rainham • A13 Corridor")
                ],
                "quote_tag": "Barking"
            }
        ]
    },
    {
        "id": "south-london",
        "name": "South London",
        "region_group": "London",
        "filename": "location-south-london.html",
        "postcodes": "SE1, SE10, SE15, SW2, SW4, SW9, SW11, CR0, BR1",
        "lat": "51.4500",
        "lng": "-0.0900",
        "hero_desc": "Specialist gearbox repair & reconditioning in <strong>South London</strong>. Free recovery, 12-month warranty, and up to 60% cheaper than main dealer.",
        "overview_p1": "From gearbox clunks on the South Circular to mechatronic faults in Croydon, our <strong>South London gearbox specialist</strong> engineers provide fast diagnosis and precision rebuilds with genuine OEM components.",
        "overview_p2": "We serve all South East and South West London postcodes with dedicated recovery trucks transporting vehicles to our state-of-the-art repair centre.",
        "coverage_highlight": "South London Coverage Guaranteed",
        "coverage_p": "Covering Lambeth, Southwark, Wandsworth, Lewisham, Greenwich, Croydon, and Bromley with prompt doorstep collection and clean return delivery.",
        "areas": [
            {
                "title": "Croydon & Sutton",
                "postcodes": "Postcodes: CR0, CR2, CR7, CR9, SM1, SM2, SM5",
                "items": [
                    ("Croydon Central", "East Croydon • West Croydon • South Croydon • Purley"),
                    ("Thornton Heath & Norbury", "Thornton Heath • Norbury • Selhurst • Woodside"),
                    ("Sutton & Cheam", "Sutton • Carshalton • Wallington • Cheam • Belmont")
                ],
                "quote_tag": "Croydon"
            },
            {
                "title": "Wandsworth, Clapham & Battersea",
                "postcodes": "Postcodes: SW11, SW12, SW4, SW18, SW15",
                "items": [
                    ("Battersea & Clapham", "Battersea • Clapham Common • Clapham Junction • Nine Elms"),
                    ("Wandsworth & Putney", "Wandsworth Town • Southfields • Putney • Roehampton"),
                    ("Balham & Tooting", "Balham • Tooting Broadway • Tooting Bec • Earlsfield")
                ],
                "quote_tag": "Clapham"
            },
            {
                "title": "Lambeth & Brixton",
                "postcodes": "Postcodes: SW9, SW2, SE11, SE24, SE27",
                "items": [
                    ("Brixton & Stockwell", "Brixton • Stockwell • Kennington • Oval"),
                    ("Streatham & Norwood", "Streatham Hill • Streatham Common • West Norwood"),
                    ("Herne Hill & Tulse Hill", "Herne Hill • Tulse Hill • Gipsy Hill")
                ],
                "quote_tag": "Brixton"
            },
            {
                "title": "Southwark & Greenwich",
                "postcodes": "Postcodes: SE1, SE10, SE15, SE16, SE22",
                "items": [
                    ("Greenwich & Blackheath", "Greenwich Town • North Greenwich • Blackheath • Charlton"),
                    ("Peckham & Dulwich", "Peckham • East Dulwich • Dulwich Village • Camberwell"),
                    ("Bermondsey & Rotherhithe", "Bermondsey • Rotherhithe • Surrey Quays • London Bridge")
                ],
                "quote_tag": "Greenwich"
            },
            {
                "title": "Lewisham & Bromley",
                "postcodes": "Postcodes: SE13, SE6, SE8, BR1, BR2, BR3",
                "items": [
                    ("Lewisham & Catford", "Lewisham • Catford • Deptford • Hither Green"),
                    ("Bromley & Beckenham", "Bromley Town • Beckenham • Chislehurst • West Wickham"),
                    ("Forest Hill & Sydenham", "Forest Hill • Sydenham • Brockley • Lee")
                ],
                "quote_tag": "Bromley"
            },
            {
                "title": "Kingston & Merton",
                "postcodes": "Postcodes: KT1, KT2, KT3, SW19, SW20",
                "items": [
                    ("Wimbledon & Merton", "Wimbledon Village • Wimbledon Town • Colliers Wood • Merton Park"),
                    ("Kingston upon Thames", "Kingston • Surbiton • New Malden • Norbiton"),
                    ("Mitcham & Morden", "Mitcham • Morden • Raynes Park • Motspur Park")
                ],
                "quote_tag": "Wimbledon"
            }
        ]
    },
    {
        "id": "north-london",
        "name": "North London",
        "region_group": "London",
        "filename": "location-north-london.html",
        "postcodes": "N1, N4, N7, N12, N22, NW1, NW3, EN1, EN5",
        "lat": "51.5800",
        "lng": "-0.1200",
        "hero_desc": "Specialist gearbox repair & reconditioning in <strong>North London</strong>. Free recovery, 12-month warranty, and up to 60% cheaper than main dealer.",
        "overview_p1": "When searching for a trusted <strong>North London gearbox repair specialist</strong>, Gearbox Giants delivers unmatched engineering excellence, free collection, and guaranteed 12-month warranties.",
        "overview_p2": "We service all automatic, manual, dual-clutch DSG, and hybrid transmissions across Highgate, Finchley, Enfield, Islington, Barnet, and Camden.",
        "coverage_highlight": "North London Coverage Guaranteed",
        "coverage_p": "Prompt collection from your driveway or local garage along the North Circular (A406), A1, A10, and M1 corridors.",
        "areas": [
            {
                "title": "Barnet & Finchley",
                "postcodes": "Postcodes: EN5, N12, N2, N3, N20",
                "items": [
                    ("High Barnet & Chipping", "High Barnet • Chipping Barnet • Arkley • Totteridge"),
                    ("Finchley & Whetstone", "North Finchley • East Finchley • Church End • Whetstone"),
                    ("Hendon & Mill Hill", "Mill Hill • Hendon • Golders Green • Edgware Borders")
                ],
                "quote_tag": "Barnet"
            },
            {
                "title": "Enfield & Southgate",
                "postcodes": "Postcodes: EN1, EN2, EN3, N14, N21",
                "items": [
                    ("Enfield Town & Chase", "Enfield Town • Enfield Chase • Botany Bay • Clay Hill"),
                    ("Southgate & Winchmore Hill", "Southgate • Winchmore Hill • Palmers Green • Cockfosters"),
                    ("Ponders End & Edmonton", "Ponders End • Edmonton • Enfield Lock • Brimsdown")
                ],
                "quote_tag": "Enfield"
            },
            {
                "title": "Haringey & Wood Green",
                "postcodes": "Postcodes: N22, N8, N10, N15, N17",
                "items": [
                    ("Muswell Hill & Crouch End", "Muswell Hill • Crouch End • Hornsey • Highgate"),
                    ("Wood Green & Turnpike Lane", "Wood Green • Turnpike Lane • Bounds Green • Bowes Park"),
                    ("Tottenham & Seven Sisters", "Tottenham • Seven Sisters • West Green • Harringay")
                ],
                "quote_tag": "Wood Green"
            },
            {
                "title": "Islington & Highbury",
                "postcodes": "Postcodes: N1, N5, N7, N19",
                "items": [
                    ("Angel & Upper Street", "Angel • Islington High Street • Canonbury • Barnsbury"),
                    ("Highbury & Holloway", "Highbury • Holloway • Finsbury Park • Nag's Head"),
                    ("Archway & Tufnell Park", "Archway • Tufnell Park • Dartmouth Park • Upper Holloway")
                ],
                "quote_tag": "Islington"
            },
            {
                "title": "Camden & Hampstead",
                "postcodes": "Postcodes: NW1, NW3, NW5, NW8",
                "items": [
                    ("Camden Town & Kentish Town", "Camden Town • Chalk Farm • Kentish Town • Primrose Hill"),
                    ("Hampstead & Belsize Park", "Hampstead Village • Belsize Park • Swiss Cottage • Fortune Green"),
                    ("St John's Wood & Regent's", "St John's Wood • Regent's Park • Euston • King's Cross")
                ],
                "quote_tag": "Camden"
            },
            {
                "title": "A406 North Circular Corridor",
                "postcodes": "Postcodes: N9, N11, N13, NW2, NW4",
                "items": [
                    ("Arnos Grove & New Southgate", "Arnos Grove • New Southgate • Friern Barnet"),
                    ("Brent Cross & Staples Corner", "Brent Cross • Staples Corner • Cricklewood • Neasden"),
                    ("A10 & A1 Fast Access", "Great Cambridge Road • Falloden Way • Great North Road")
                ],
                "quote_tag": "North Circular"
            }
        ]
    }
]

EXTRA_LOCATIONS = [
    ("slough", "Slough", "Berkshire", "location-slough.html", "SL1, SL2, SL3, SL0, SL9", "51.5105", "-0.5950", "Slough Central, Burnham & Cippenham, Langley, Farnham Common, Iver, Windsor Borders"),
    ("richmond", "Richmond", "London", "location-richmond.html", "TW9, TW10, TW1, TW2, SW13, SW14, KT2", "51.4613", "-0.3037", "Richmond Town, Kew & Sheen, Twickenham, Teddington, Barnes, Ham & Petersham"),
    ("reading", "Reading", "Berkshire", "location-reading.html", "RG1, RG2, RG4, RG6, RG30, RG31", "51.4543", "-0.9781", "Reading Central, Tilehurst & Calcot, Earley & Woodley, Green Park, Theale, Winnersh"),
    ("harrow", "Harrow", "London", "location-harrow.html", "HA1, HA2, HA3, HA5, HA7, HA8, HA9", "51.5806", "-0.3420", "Harrow on the Hill, Wealdstone, Pinner, Stanmore, South Harrow, Kenton"),
    ("romford", "Romford", "Essex", "location-romford.html", "RM1, RM2, RM3, RM5, RM7", "51.5760", "0.1830", "Romford Town Centre, Gidea Park, Harold Wood, Collier Row, Rush Green, Hornchurch"),
    ("guildford", "Guildford", "Surrey", "location-guildford.html", "GU1, GU2, GU3, GU4, GU5", "51.2362", "-0.5704", "Guildford Town, Burpham & Merrow, Onslow Village, Stoughton, Shalford, Godalming"),
    ("farnborough", "Farnborough", "Hampshire", "location-farnborough.html", "GU14, GU17, GU51, GU52", "51.2900", "-0.7500", "Farnborough Town, Cove & Southwood, Fleet, Hawley & Blackwater, Yateley, Frimley Borders"),
    ("aldershot", "Aldershot", "Hampshire", "location-aldershot.html", "GU11, GU12, GU10", "51.2484", "-0.7629", "Aldershot Town, Ash & Ash Vale, Tongham, Badshot Lea, Wellesley, Hog's Back Corridor"),
    ("aylesbury", "Aylesbury", "Buckinghamshire", "location-aylesbury.html", "HP19, HP20, HP21, HP22", "51.8168", "-0.8124", "Aylesbury Town, Stoke Mandeville, Wendover, Bierton, Stone, Aston Clinton"),
    ("ashford", "Ashford", "Surrey / Kent", "location-ashford.html", "TW15, TN23, TN24, TN25", "51.4320", "-0.4670", "Ashford Town, Stanwell, Sunbury Borders, Staines Road, Feltham Link, Bedfont"),
    ("barnet", "Barnet", "London", "location-barnet.html", "EN5, EN4, N12, N20, N2", "51.6500", "-0.2000", "High Barnet, Chipping Barnet, East Barnet, New Barnet, Totteridge, Whetstone"),
    ("basingstoke", "Basingstoke", "Hampshire", "location-basingstoke.html", "RG21, RG22, RG23, RG24, RG25", "51.2667", "-1.0876", "Town Centre, Chineham, Kempshott, Basing, Viables, Hatch Warren"),
    ("bedfordshire", "Bedfordshire", "Bedfordshire", "location-bedfordshire.html", "MK40, MK41, MK42, LU1, LU2, SG18", "52.1359", "-0.4667", "Bedford Town, Luton, Dunstable, Leighton Buzzard, Biggleswade, Kempston"),
    ("berkshire", "Berkshire", "Berkshire", "location-berkshire.html", "RG1, RG12, SL1, SL4, SL6, RG42", "51.4500", "-0.9700", "Reading, Slough, Windsor, Maidenhead, Bracknell, Newbury"),
    ("bracknell", "Bracknell", "Berkshire", "location-bracknell.html", "RG12, RG42, RG45", "51.4160", "-0.7490", "Lexicon Centre, Crown Wood, Warfield, Binfield, Priestwood, Great Hollands"),
    ("bromley", "Bromley", "London", "location-bromley.html", "BR1, BR2, BR3, BR5, BR6", "51.4070", "0.0150", "Bromley Town, Beckenham, Chislehurst, Orpington, West Wickham, Petts Wood"),
    ("camberley", "Camberley", "Surrey", "location-camberley.html", "GU15, GU16, GU17", "51.3350", "-0.7420", "Camberley Town, Frimley, Frimley Green, Deepcut, Mytchett, Heatherside"),
    ("cambridge", "Cambridge", "Cambridgeshire", "location-cambridge.html", "CB1, CB2, CB3, CB4, CB5", "52.2053", "0.1218", "City Centre, Science Park, Cherry Hinton, Trumpington, Chesterton, Girton"),
    ("chelmsford", "Chelmsford", "Essex", "location-chelmsford.html", "CM1, CM2, CM3", "51.7356", "0.4686", "City Centre, Springfield, Great Baddow, Broomfield, Writtle, Galleywood"),
    ("woking", "Woking", "Surrey", "location-woking.html", "GU21, GU22, GU24", "51.3190", "-0.5590", "Town Centre, Horsell, Knaphill, West Byfleet, Old Woking, Goldsworth Park"),
    ("southampton", "Southampton", "Hampshire", "location-southampton.html", "SO14, SO15, SO16, SO17, SO18", "50.9097", "-1.4044", "City Centre, Ocean Village, Portswood, Shirley, Bitterne, Totton"),
    ("northamptonshire", "Northamptonshire", "Midlands", "location-northamptonshire.html", "NN1, NN2, NN3, NN5, NN15", "52.2405", "-0.9027", "Northampton Town, Kettering, Corby, Wellingborough, Daventry, Towcester"),
    ("uxbridge", "Uxbridge", "London", "location-uxbridge.html", "UB8, UB9, UB10, UB11", "51.5447", "-0.4760", "Uxbridge Town, Ickenham, Ruislip, Cowley, Harefield, Hillingdon"),
    ("crawley", "Crawley", "Sussex", "location-crawley.html", "RH10, RH11", "51.1091", "-0.1872", "Town Centre, Gatwick Airport, Three Bridges, Tilgate, Pound Hill, Broadfield"),
    ("brighton", "Brighton", "Sussex", "location-brighton.html", "BN1, BN2, BN3, BN41", "50.8225", "-0.1372", "City Centre, Hove, Preston Park, Kemptown, Portslade, Rottingdean"),
    ("enfield", "Enfield", "London", "location-enfield.html", "EN1, EN2, EN3, N21, N14", "51.6520", "-0.0810", "Enfield Town, Southgate, Palmers Green, Winchmore Hill, Edmonton, Ponders End"),
    ("essex", "Essex", "Essex", "location-essex.html", "CM1, SS1, CO1, RM1, IG1", "51.7500", "0.5000", "Chelmsford, Colchester, Southend-on-Sea, Brentwood, Basildon, Harlow"),
    ("oxford", "Oxford", "Oxfordshire", "location-oxford.html", "OX1, OX2, OX3, OX4", "51.7520", "-1.2577", "City Centre, Headington, Cowley, Summertown, Botley, Marston"),
    ("sussex", "Sussex", "Sussex", "location-sussex.html", "BN1, RH10, BN21, PO19, TN34", "50.9000", "0.0000", "Brighton & Hove, Crawley, Eastbourne, Chichester, Horsham, Worthing"),
    ("watford", "Watford", "Hertfordshire", "location-watford.html", "WD17, WD18, WD24, WD25", "51.6565", "-0.3903", "Town Centre, Cassiobury, North Watford, Garston, Oxhey, Leavesden"),
    ("croydon", "Croydon", "London", "location-croydon.html", "CR0, CR2, CR7, CR9", "51.3762", "-0.0982", "Central Croydon, Purley, Thornton Heath, South Norwood, Addington, Coulsdon"),
    ("hampshire", "Hampshire", "Hampshire", "location-hampshire.html", "SO14, PO1, RG21, GU14, SO23", "51.0500", "-1.3000", "Southampton, Portsmouth, Winchester, Basingstoke, Farnborough, Andover"),
    ("kent", "Kent", "Kent", "location-kent.html", "ME1, CT1, TN1, DA1, CT19", "51.2787", "0.5217", "Maidstone, Canterbury, Dartford, Tunbridge Wells, Folkestone, Rochester")
]

for item in EXTRA_LOCATIONS:
    loc_id, name, region_group, filename, postcodes, lat, lng, zones_str = item
    zones = [z.strip() for z in zones_str.split(",")]
    while len(zones) < 6:
        zones.append(f"{name} Sub-district {len(zones)+1}")
    
    postcode_list = [p.strip() for p in postcodes.split(",")]
    
    areas = []
    for idx, z in enumerate(zones[:6]):
        pc = postcode_list[idx % len(postcode_list)]
        areas.append({
            "title": f"{z} & District",
            "postcodes": f"Postcodes: {pc}, {pc}1, {pc}2",
            "items": [
                (f"{z} Central", f"{z} High Street • Town Centre • Main Line Rail"),
                (f"{z} Commercial Area", f"{z} Business Park • Trade Estates • Retail Parks"),
                (f"Surrounding {name}", f"Connecting routes • Bypass Corridors • Local Wards")
            ],
            "quote_tag": z
        })
    
    LOCATIONS_DATA.append({
        "id": loc_id,
        "name": name,
        "region_group": region_group,
        "filename": filename,
        "postcodes": postcodes,
        "lat": lat,
        "lng": lng,
        "hero_desc": f"Specialist gearbox repair & reconditioning across <strong>{name}</strong>. Free recovery, 12-month warranty, and up to 60% cheaper than main dealer.",
        "overview_p1": f"When searching for a dedicated <strong>{name} gearbox specialist</strong>, Gearbox Giants delivers precision transmission rebuilds, dealer-grade diagnostics, and free vehicle collection directly from your home or garage.",
        "overview_p2": f"From our advanced transmission centre, we handle manual, automatic, DSG dual-clutch, CVT, and hybrid drivetrains across all {name} districts and postcodes.",
        "coverage_highlight": f"{name} Coverage Guaranteed",
        "coverage_p": f"Our flatbed transporter fleet operates daily across {name}, collecting your vehicle safely and delivering it back road-tested, valeted, and backed by warranty.",
        "areas": areas
    })

def render_page(loc):
    name = loc["name"]
    name_upper = name.upper()
    filename = loc["filename"]
    postcodes = loc["postcodes"]
    lat = loc["lat"]
    lng = loc["lng"]
    hero_desc = loc["hero_desc"]
    overview_p1 = loc["overview_p1"]
    overview_p2 = loc["overview_p2"]
    coverage_highlight = loc["coverage_highlight"]
    coverage_p = loc["coverage_p"]
    areas = loc["areas"]

    # Render the 6 area cards
    area_cards_html = ""
    for a in areas:
        title = a["title"]
        a_postcodes = a["postcodes"]
        quote_tag = a["quote_tag"]
        
        items_html = ""
        for bold_lbl, text_val in a["items"]:
            items_html += f"                <li><strong>{bold_lbl}:</strong> {text_val}</li>\n"
        
        card_html = f"""          <!-- Area Card: {title} -->
          <div class="borough-hub-card">
            <div>
              <div class="borough-hub-header">
                <h3 class="borough-hub-title">{title}</h3>
                <div class="borough-hub-postcodes">{a_postcodes}</div>
              </div>
              <ul class="borough-towns-list">
{items_html}              </ul>
            </div>
            <button class="btn btn-secondary btn-sm btn-full" onclick="window.openQuoteModal('{quote_tag}')">
              Get {quote_tag} Quote →
            </button>
          </div>
"""
        area_cards_html += card_html

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary SEO Meta Tags -->
  <title>{name} Gearbox Repair Specialist | Rebuilds & Replacement | Gearbox Giants</title>
  <meta name="description" content="Specialist {name} gearbox repair, reconditioning, and replacement. Free doorstep vehicle collection across {name} ({postcodes}), 12-month warranty & 0% repair finance.">
  <meta name="keywords" content="{name.lower()} gearbox, {name.lower()} gearbox repair, {name.lower()} transmission repair, gearbox specialist {name.lower()}, automatic gearbox repair {name.lower()}, DSG repair {name.lower()}">
  <link rel="canonical" href="https://gearboxgiants.co.uk/{filename}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://gearboxgiants.co.uk/{filename}">
  <meta property="og:title" content="{name} Gearbox Repair Specialist | Gearbox Giants">
  <meta property="og:description" content="Specialist {name} gearbox repair and reconditioning. Free vehicle collection across all {name} postcodes with a 12-Month / 12,000-Mile Warranty.">
  <meta property="og:image" content="https://gearboxgiants.co.uk/assets/hero_gearbox_focus.jpg">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Syne:wght@700;800;900&display=swap" rel="stylesheet">

  <!-- Core CSS -->
  <link rel="stylesheet" href="css/style.css?v=5.2">
  <link rel="stylesheet" href="css/components.css?v=5.2">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f59e0b' stroke-width='2.2'><circle cx='12' cy='12' r='3'/><path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'/></svg>">

  <!-- Structured Data Schema: AutoRepair -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Gearbox Giants - {name} Gearbox Specialist",
    "image": "https://gearboxgiants.co.uk/assets/hero_gearbox_focus.jpg",
    "@id": "https://gearboxgiants.co.uk/{filename}#autorepair",
    "url": "https://gearboxgiants.co.uk/{filename}",
    "telephone": "+442080589668",
    "priceRange": "££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Debit Card, Bank Transfer, Finance",
    "openingHoursSpecification": [
      {{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }},
      {{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:30",
        "closes": "14:00"
      }}
    ],
    "geo": {{
      "@type": "GeoCoordinates",
      "latitude": {lat},
      "longitude": {lng}
    }},
    "areaServed": {{
      "@type": "AdministrativeArea",
      "name": "{name}"
    }},
    "description": "Specialist {name} gearbox repair, reconditioning and replacement for all makes and models. Free doorstep collection and 12-month warranty.",
    "hasOfferCatalog": {{
      "@type": "OfferCatalog",
      "name": "{name} Transmission Services",
      "itemListElement": [
        {{
          "@type": "Offer",
          "itemOffered": {{
            "@type": "Service",
            "name": "Manual Gearbox Repair & Reconditioning"
          }}
        }},
        {{
          "@type": "Offer",
          "itemOffered": {{
            "@type": "Service",
            "name": "Automatic Transmission Repair & Rebuild"
          }}
        }},
        {{
          "@type": "Offer",
          "itemOffered": {{
            "@type": "Service",
            "name": "DSG & Dual-Clutch Mechatronic Repairs"
          }}
        }}
      ]
    }}
  }}
  </script>

  <!-- Structured Data Schema: FAQPage -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "Do you offer free vehicle collection in {name}?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Yes. We provide complimentary flatbed vehicle recovery directly from your home, workplace, or local garage across {name} ({postcodes}) straight to our specialist transmission facility."
        }}
      }},
      {{
        "@type": "Question",
        "name": "How long does a gearbox repair take for {name} customers?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Standard gearbox repairs and reconditioning typically take 2 to 4 business days. For common models, we also maintain off-the-shelf reconditioned units that can be fitted within 24 to 48 hours."
        }}
      }},
      {{
        "@type": "Question",
        "name": "What warranty is included with my gearbox repair?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "All our gearbox repairs and reconditioned units come with a comprehensive 12-Month / 12,000-Mile parts and labour warranty."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Do you repair both manual and automatic gearboxes in {name}?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Yes, we specialize in all transmission types: manual gearboxes, torque converter automatics, dual-clutch DSG / S-Tronic / Powershift units, CVT gearboxes, and hybrid drivetrains."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Can I pay for my gearbox repair in monthly instalments?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Yes! We offer 0% interest repair finance options allowing you to spread the cost over 3, 6, 9, or 12 manageable monthly payments with no hidden fees."
        }}
      }}
    ]
  }}
  </script>
</head>
<body>

  <!-- ==========================================================================
       HEADER & NAVIGATION (EXACT SITE CONSISTENCY)
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

          <button class="nav-quote-link" onclick="window.openQuoteModal('{name}')">
            Quote Me <span>→</span>
          </button>

          <button id="mobile-menu-toggle" class="btn-mobile-toggle" aria-label="Open mobile menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
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
        <button id="mobile-drawer-close" class="mobile-drawer-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
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
      <button class="btn btn-primary btn-full btn-lg" onclick="window.openQuoteModal('{name}')">Quote Me Now</button>
    </div>
  </div>

  <main>
    <!-- ==========================================================================
         CINEMATIC HERO SECTION: LOCALIZED FOR {name_upper}
         ========================================================================== -->
    <section class="cinematic-hero-section">
      <!-- Scroll Zoom Image Layer (Exact Consistent Image as Homepage) -->
      <div class="hero-parallax-layer"></div>
      <div class="hero-parallax-overlay"></div>

      <div class="container" style="position:relative; z-index:10;">
        <div class="cinematic-hero-content fade-in-up">
          <div class="hero-tag-simple desktop-only">SPECIALIST TRANSMISSION WORKSHOP</div>

          <h1 class="hero-title-cinematic">
            <span class="title-line-nowrap">{name_upper} GEARBOX</span><br>
            <span class="highlight-amber">REPAIR & SPECIALIST.</span>
          </h1>

          <p class="hero-desc-cinematic">
            {hero_desc}
          </p>

          <!-- Reg Lookup & Quick Actions: All on One Single Line -->
          <div class="hero-action-row">
            <form class="hero-reg-form" onsubmit="event.preventDefault(); window.openQuoteModal('{name}', '', this.querySelector('.uk-reg-input').value);">
              <div class="uk-reg-box">
                <div class="uk-reg-flag">
                  <svg viewBox="0 0 60 30" width="16" height="10"><path d="M0 0h60v30H0z" fill="#012169"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>
                  <span>UK</span>
                </div>
                <input type="text" class="uk-reg-input" placeholder="ENTER REG" maxlength="8" onkeydown="if(event.key==='Enter'){{event.preventDefault(); window.openQuoteModal('{name}', '', this.value);}}">
              </div>

              <button type="submit" class="btn-hero-quote" onclick="const v = this.form.querySelector('.uk-reg-input')?.value; window.openQuoteModal('{name}', '', v);">
                QUOTE ME <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         YELLOW MARQUEE TICKER BANNER
         ========================================================================== -->
    <div class="marquee-ticker-bar">
      <div class="marquee-track">
        <div class="marquee-content">
          <span>{name_upper} GEARBOX SPECIALIST</span>
          <span class="ticker-dot">✦</span>
          <span>UP TO 60% CHEAPER THAN MAIN DEALER</span>
          <span class="ticker-dot">✦</span>
          <span>FREE {name_upper} RECOVERY & DELIVERY</span>
          <span class="ticker-dot">✦</span>
          <span>12-MONTH WARRANTY INCLUDED</span>
          <span class="ticker-dot">✦</span>
          <span>ALL MAKES & MODELS</span>
          <span class="ticker-dot">✦</span>
          <span>TRANSMISSION REPAIR EXPERTS</span>
          <span class="ticker-dot">✦</span>
          <span>0% FINANCE AVAILABLE</span>
          <span class="ticker-dot">✦</span>
          <span>COMPLIMENTARY CARWASH</span>
          <span class="ticker-dot">✦</span>
        </div>
        <div class="marquee-content" aria-hidden="true">
          <span>{name_upper} GEARBOX SPECIALIST</span>
          <span class="ticker-dot">✦</span>
          <span>UP TO 60% CHEAPER THAN MAIN DEALER</span>
          <span class="ticker-dot">✦</span>
          <span>FREE {name_upper} RECOVERY & DELIVERY</span>
          <span class="ticker-dot">✦</span>
          <span>12-MONTH WARRANTY INCLUDED</span>
          <span class="ticker-dot">✦</span>
          <span>ALL MAKES & MODELS</span>
          <span class="ticker-dot">✦</span>
          <span>TRANSMISSION REPAIR EXPERTS</span>
          <span class="ticker-dot">✦</span>
          <span>0% FINANCE AVAILABLE</span>
          <span class="ticker-dot">✦</span>
          <span>COMPLIMENTARY CARWASH</span>
          <span class="ticker-dot">✦</span>
        </div>
      </div>
    </div>

    <!-- ==========================================================================
         1. OVERVIEW & WORKSHOP CAPACITY
         ========================================================================== -->
    <section class="section" id="location-overview" style="padding-top: 4.5rem; padding-bottom: 4.5rem;">
      <div class="container">
        <div class="grid-2" style="align-items: center; gap: 3.5rem;">
          <div class="fade-in-up">
            <div class="section-tag" style="margin-bottom: 1rem;">
              LOCAL {name_upper} GEARBOX SPECIALIST
            </div>

            <h2 style="margin-bottom: 1.25rem; font-size: clamp(2.2rem, 4.5vw, 3.2rem);">
              YOUR TRUSTED <span class="highlight-amber">{name_upper} GEARBOX</span> EXPERTS
            </h2>

            <p style="font-size: 1.05rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1.25rem;">
              {overview_p1}
            </p>

            <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 2rem;">
              {overview_p2}
            </p>

            <!-- Trust Stats -->
            <div class="hero-stats-row">
              <div class="stat-item">
                <div class="stat-num">25<span>+</span></div>
                <div class="stat-label">UK Specialist Centres</div>
              </div>
              <div class="stat-item">
                <div class="stat-num">60<span>%</span></div>
                <div class="stat-label">Cheaper Than Dealer</div>
              </div>
              <div class="stat-item">
                <div class="stat-num">100<span>%</span></div>
                <div class="stat-label">Free Doorstep Valet</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Location Highlights Card -->
          <div class="fade-in-up delay-1">
            <div style="background: #141519; border: 1px solid rgba(255,255,255,0.1); border-radius: var(--border-radius-xl); padding: 2.5rem; box-shadow: var(--shadow-lg); position: relative; overflow: hidden;">
              <div style="position: absolute; top:0; right:0; width: 140px; height: 140px; background: radial-gradient(circle, rgba(245,158,11,0.2), transparent 70%); pointer-events: none;"></div>

              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: var(--amber-400); box-shadow: 0 0 12px var(--amber-400);"></div>
                <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; text-transform: uppercase; color: #fff; letter-spacing: 0.05em;">
                  {coverage_highlight}
                </span>
              </div>

              <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.75rem;">
                {coverage_p}
              </p>

              <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
                <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.03); padding:0.75rem 1rem; border-radius:var(--border-radius-sm); border:1px solid var(--border-subtle);">
                  <span style="color:var(--amber-400); font-weight:900;">✓</span>
                  <span style="font-size:0.9rem; font-weight:600; color:#fff;">Full ULEZ & Low-Emission Recovery Fleet</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.03); padding:0.75rem 1rem; border-radius:var(--border-radius-sm); border:1px solid var(--border-subtle);">
                  <span style="color:var(--amber-400); font-weight:900;">✓</span>
                  <span style="font-size:0.9rem; font-weight:600; color:#fff;">12-Month / 12,000-Mile Rebuild Warranty</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.03); padding:0.75rem 1rem; border-radius:var(--border-radius-sm); border:1px solid var(--border-subtle);">
                  <span style="color:var(--amber-400); font-weight:900;">✓</span>
                  <span style="font-size:0.9rem; font-weight:600; color:#fff;">0% Interest Monthly Repair Finance</span>
                </div>
              </div>

              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn btn-primary btn-full btn-lg" onclick="window.openQuoteModal('{name}')">
                  Request Instant {name} Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         2. LOCAL DISTRICTS & POSTCODES SERVED (6-CARD DIRECTORY)
         ========================================================================== -->
    <section class="section" id="areas-served" style="padding: 5.5rem 0; background: #08090c; border-bottom:1px solid var(--border-subtle);">
      <div class="container">
        <div class="section-header fade-in-up" style="margin-bottom: 3.5rem;">
          <div class="section-tag">ALL {name_upper} AREAS COVERED</div>
          <h2>{name_upper} <span class="highlight-amber">AREAS SERVED</span></h2>
          <p>Our dedicated recovery transporters operate daily across every sector of {name}, providing prompt collection and rapid return delivery.</p>
        </div>

        <div class="grid-3 fade-in-up delay-1" style="gap: 2rem; align-items: stretch;">
{area_cards_html}        </div>
      </div>
    </section>

    <!-- ==========================================================================
         3. COMPREHENSIVE GEARBOX SERVICES (ALIGNED BASELINE BUTTONS)
         ========================================================================== -->
    <section class="section" id="services" style="background: var(--bg-surface); border-bottom:1px solid var(--border-subtle);">
      <div class="container">
        <div class="section-header fade-in-up">
          <div class="section-tag">SPECIALIST TRANSMISSION SERVICES</div>
          <h2>EXPERT <span class="highlight-amber">GEARBOX REPAIR</span> SERVICES IN {name_upper}</h2>
          <p>Comprehensive transmission repair and reconditioning solutions for manual, automatic, DSG, and hybrid drivetrains.</p>
        </div>

        <div class="grid-3" style="align-items: stretch;">
          <!-- 1. Precision Repairs -->
          <div class="step-card fade-in-up">
            <div class="step-card-media" style="height: 180px;">
              <img src="assets/gearbox_internals.jpg" alt="{name} gearbox specialist repairing transmission" loading="lazy">
            </div>
            <div class="step-card-body">
              <div>
                <h3 style="font-size:1.45rem; min-height: 3.5rem; display: flex; align-items: flex-start; margin-bottom:0.75rem; color:#fff;">GEARBOX REPAIR</h3>
                <p style="font-size:0.95rem; line-height:1.6; color:var(--text-secondary); margin-bottom:1.5rem;">
                  Targeted mechanical and electronic <strong>gearbox repair</strong> for crunching gears, worn synchros, faulty solenoids, and clutch pack failures.
                </p>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.75rem;">
                  <li>✓ Manual synchromesh & selector forks</li>
                  <li>✓ Automatic torque converter & valve bodies</li>
                  <li>✓ Mechatronic TCU software recalibration</li>
                </ul>
              </div>
              <button class="btn btn-secondary btn-full" onclick="window.openQuoteModal('{name}', 'Gearbox Repair')">
                Get Repair Quote
              </button>
            </div>
          </div>

          <!-- 2. Expert Reconditioning -->
          <div class="step-card fade-in-up delay-1">
            <div class="step-card-media" style="height: 180px;">
              <img src="assets/workshop_facility.jpg" alt="Transmission repair and reconditioning in {name}" loading="lazy">
            </div>
            <div class="step-card-body">
              <div>
                <h3 style="font-size:1.45rem; min-height: 3.5rem; display: flex; align-items: flex-start; margin-bottom:0.75rem; color:#fff;">GEARBOX RECONDITIONING</h3>
                <p style="font-size:0.95rem; line-height:1.6; color:var(--text-secondary); margin-bottom:1.5rem;">
                  Complete zero-mile reconditioning. Every unit is chemically stripped, inspected under microscope, and rebuilt with brand-new heavy-duty OEM parts.
                </p>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.75rem;">
                  <li>✓ Ultrasonic deep chemical cleaning</li>
                  <li>✓ High-load OEM bearings & oil seals</li>
                  <li>✓ Dynamic dyno bench load testing</li>
                </ul>
              </div>
              <button class="btn btn-secondary btn-full" onclick="window.openQuoteModal('{name}', 'Gearbox Reconditioning')">
                Get Reconditioning Quote
              </button>
            </div>
          </div>

          <!-- 3. Custom Replacement -->
          <div class="step-card fade-in-up delay-2">
            <div class="step-card-media" style="height: 180px;">
              <img src="assets/step_1_quote.jpg" alt="Direct OEM replacement transmission stock in {name}" loading="lazy">
            </div>
            <div class="step-card-body">
              <div>
                <h3 style="font-size:1.45rem; min-height: 3.5rem; display: flex; align-items: flex-start; margin-bottom:0.75rem; color:#fff;">TRANSMISSION REPAIR & REPLACEMENT</h3>
                <p style="font-size:0.95rem; line-height:1.6; color:var(--text-secondary); margin-bottom:1.5rem;">
                  Off-the-shelf replacement units for rapid turnaround when your original unit is beyond economical repair.
                </p>
                <ul style="list-style:none; display:flex; flex-direction:column; gap:0.5rem; font-size:0.9rem; color:var(--text-secondary); margin-bottom:1.75rem;">
                  <li>✓ Stock for Audi, BMW, Mercedes, VW, Ford & more</li>
                  <li>✓ Rapid turnaround and express fitting</li>
                  <li>✓ 12-Month / 12,000-Mile Guarantee</li>
                </ul>
              </div>
              <button class="btn btn-secondary btn-full" onclick="window.openQuoteModal('{name}', 'Transmission Replacement')">
                Get Replacement Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         4. COMMON GEARBOX ISSUES & FAULT MATRIX
         ========================================================================== -->
    <section class="section" style="background: #08090c; border-top:1px solid var(--border-subtle);">
      <div class="container">
        <div class="media-split-card fade-in-up" style="margin-bottom: 2rem;">
          <div class="media-split-img">
            <img src="assets/diagnostic_scan.jpg" alt="Computerized transmission diagnostic scanner" loading="lazy">
          </div>
          <div class="media-split-content">
            <div class="section-tag" style="margin-bottom: 1rem;">{name_upper} FAULT DIAGNOSTICS</div>
            <h2 style="font-size: clamp(1.85rem, 3.2vw, 2.5rem); line-height: 1.1; margin-bottom: 1rem;">
              COMMON TRANSMISSION ISSUES WE FIX IN <span class="highlight-amber">{name_upper}</span>
            </h2>
            <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1.5rem;">
              Experiencing warning lights or erratic shifts in {name}? Select your vehicle's symptom below to immediately request a diagnostic quote:
            </p>

            <!-- Interactive Symptom Tag Grid -->
            <div style="display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.75rem;">
              <button class="symptom-tag-pill" onclick="window.openQuoteModal('{name}', 'Symptom: DSG Clutch Shudder / Judder')">
                DSG Clutch Shudder
              </button>
              <button class="symptom-tag-pill" onclick="window.openQuoteModal('{name}', 'Symptom: Grinding in 2nd/3rd Gear')">
                Grinding in 2nd/3rd Gear
              </button>
              <button class="symptom-tag-pill" onclick="window.openQuoteModal('{name}', 'Symptom: Delayed Engagement / No Drive')">
                Delayed Drive Engagement
              </button>
              <button class="symptom-tag-pill" onclick="window.openQuoteModal('{name}', 'Symptom: Transmission Whine / Bearing Noise')">
                High-Pitched Transmission Whine
              </button>
              <button class="symptom-tag-pill" onclick="window.openQuoteModal('{name}', 'Symptom: Mechatronic Warning / PRNDS Flashing')">
                Mechatronic Error / Flashing PRNDS
              </button>
            </div>

            <button class="btn btn-primary" onclick="window.openQuoteModal('{name}', 'Diagnostics & Scan')">
              Book Diagnostic Assessment in {name} →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ==========================================================================
         5. INTERACTIVE SEO FAQ ACCORDION
         ========================================================================== -->
    <section class="section" style="background: var(--bg-surface); border-top:1px solid var(--border-subtle);">
      <div class="container" style="max-width: 900px;">
        <div class="section-header fade-in-up">
          <div class="section-tag">{name_upper} SERVICE FAQS</div>
          <h2>FREQUENTLY ASKED <span class="highlight-amber">QUESTIONS</span></h2>
          <p>Everything you need to know about gearbox repair, collection, and reconditioning across {name}.</p>
        </div>

        <div class="fade-in-up delay-1" style="display:flex; flex-direction:column; gap:1rem;">
          <!-- FAQ 1 -->
          <details class="seo-faq-card">
            <summary class="seo-faq-summary">
              <span>Do you collect broken-down vehicles across {name}?</span>
              <svg class="seo-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <div class="seo-faq-content">
              Yes, we provide complimentary flatbed vehicle recovery directly from your home, workplace, or local garage across {name} ({postcodes}) straight to our specialist transmission facility. Our transporters are fully insured and ULEZ-compliant.
            </div>
          </details>

          <!-- FAQ 2 -->
          <details class="seo-faq-card">
            <summary class="seo-faq-summary">
              <span>How long does a gearbox repair take in {name}?</span>
              <svg class="seo-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <div class="seo-faq-content">
              Standard repairs and full reconditioning typically take between 2 to 4 working days from collection to return delivery. For high-demand vehicles (such as Audi S-Tronic, VW DSG, BMW ZF 8-Speed, Ford Powershift), we maintain pre-built zero-mile units for same-week dispatch.
            </div>
          </details>

          <!-- FAQ 3 -->
          <details class="seo-faq-card">
            <summary class="seo-faq-summary">
              <span>What warranty do you provide on {name} repairs?</span>
              <svg class="seo-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <div class="seo-faq-content">
              Every reconditioned gearbox and comprehensive repair comes with our full <strong>12-Month / 12,000-Mile parts and labour warranty</strong> for total peace of mind.
            </div>
          </details>

          <!-- FAQ 4 -->
          <details class="seo-faq-card">
            <summary class="seo-faq-summary">
              <span>Can I pay in instalments with 0% finance?</span>
              <svg class="seo-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <div class="seo-faq-content">
              Yes! We offer 0% interest repair finance options that let you spread the repair costs over 3, 6, 9, or 12 manageable monthly payments with no hidden fees and instant soft-search approval.
            </div>
          </details>

          <!-- FAQ 5 -->
          <details class="seo-faq-card">
            <summary class="seo-faq-summary">
              <span>How much cheaper are you compared to main dealerships?</span>
              <svg class="seo-faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </summary>
            <div class="seo-faq-content">
              Because we specialize exclusively in drivetrain reconditioning and rebuild rather than simply ordering expensive crated units, our customers typically save between <strong>40% to 60%</strong> compared to main dealer franchised quotes.
            </div>
          </details>
        </div>
      </div>
    </section>
  </main>

  <!-- ==========================================================================
       FOOTER (EXACT SITE CONSISTENCY)
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
            {name}'s premier gearbox repair, reconditioning and transmission specialists.
          </p>
          <a href="tel:02080589668" style="color:#ffffff; font-weight:800; text-decoration:none; font-size:1.05rem;">
             0208 058 9668
          </a>
        </div>
        <div class="footer-nav-col">
          <h3 class="footer-col-title">Navigation</h3>
          <ul class="footer-links">
            <li><a href="index.html" class="footer-link">Home</a></li>
            <li><a href="services.html" class="footer-link">Services & Repairs</a></li>
            <li><a href="fault-finding.html" class="footer-link">Fault Finding</a></li>
            <li><a href="locations.html" class="footer-link">Locations</a></li>
          </ul>
        </div>
        <div class="footer-services-col">
          <h3 class="footer-col-title">{name} Services</h3>
          <ul class="footer-links">
            <li><a href="services.html#replacement" class="footer-link">Gearbox Replacement</a></li>
            <li><a href="services.html#reconditioning" class="footer-link">Gearbox Reconditioning</a></li>
            <li><a href="services.html#clutch" class="footer-link">Clutch & DSG Repair</a></li>
          </ul>
        </div>
        <div class="footer-hours-col">
          <h3 class="footer-col-title">Opening Times</h3>
          <ul class="opening-hours-list">
            <li><span>Mon–Sun:</span> <span>09:00 – 18:00</span></li>
          </ul>
          <p style="margin-top:0.75rem; font-size:0.85rem; color:#94a3b8;">
            Contact@gearboxgiants.co.uk
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2024–2026 Gearbox Giants UK. {name} Hub. All Rights Reserved.</div>
      </div>
    </div>
  </footer>

  <!-- JavaScript Modules -->
  <script src="js/parallax-hero.js?v=5.2"></script>
  <script src="js/map.js?v=5.2"></script>
  <script src="js/quote.js?v=5.2"></script>
  <script src="js/app.js?v=5.2"></script>
</body>
</html>
"""
    return html_content

def main():
    os.makedirs(BASE_DIR, exist_ok=True)
    generated = []

    for loc in LOCATIONS_DATA:
        filepath = os.path.join(BASE_DIR, loc["filename"])
        content = render_page(loc)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        generated.append(loc["filename"])
        print(f"Generated: {loc['filename']} ({loc['name']})")

    print(f"\n✅ Successfully generated {len(generated)} location pages with 100% consistent Header, Hero, Ticker, and Footer!")

if __name__ == "__main__":
    main()
