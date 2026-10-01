/* Exact Wikipedia article titles for places and dishes.
   The site shows the lead photo of that article, so the photo matches the place.
   If a name is not listed here, the site tries the place's own name as a title,
   then a Wikipedia search, then falls back to the drawn illustration.
   To use your own photo instead, add {img:"images/your-photo.jpg"} to the place in data.js,
   or use "Change photo" on the website. */
const WIKI = {
  // Jaipur
  "Amer Fort":"Amber Fort","City Palace|jaipur":"City Palace, Jaipur","Jantar Mantar":"Jantar Mantar, Jaipur",
  "Galta Ji":"Galtaji","Sambhar Salt Lake":"Sambhar Salt Lake","Albert Hall Museum":"Albert Hall Museum",
  // Dausa
  "Chand Baori, Abhaneri":"Chand Baori","Mehandipur Balaji":"Mehandipur Balaji Temple","Bhandarej":"Bhandarej",
  "Neelkanth Mahadev & Dausa Fort":"Dausa",
  // Alwar
  "Bala Quila (Alwar Fort)":"Bala Quila","City Palace (Vinay Vilas)":"City Palace, Alwar","Siliserh Lake":"Siliserh Lake",
  "Sariska Tiger Reserve":"Sariska Tiger Reserve","Bhangarh Fort":"Bhangarh Fort",
  // Shekhawati
  "Mandawa":"Mandawa","Nawalgarh":"Nawalgarh, Rajasthan","Khetri Mahal":"Khetri Mahal","Rani Sati Temple":"Rani Sati Temple",
  "Lohargal":"Lohargal","Khatu Shyam Ji Temple":"Khatu Shyam Temple","Harshnath Temple":"Harshnath Temple","Jeen Mata Temple":"Jeen Mata",
  "Fatehpur":"Fatehpur, Rajasthan","Laxmangarh Fort":"Laxmangarh, Sikar","Ganeshwar":"Ganeshwar",
  // Kotputli-Behror, Khairthal-Tijara
  "Neemrana Fort Palace":"Neemrana Fort-Palace","Neemrana Baori":"Neemrana Baori","Viratnagar (Bairath)":"Bairat",
  "Tijara Fort Palace":"Tijara","Tijara Jain Temple (Dehra)":"Tijara Jain Temple",
  // Jodhpur
  "Mehrangarh Fort":"Mehrangarh","Jaswant Thada":"Jaswant Thada","Umaid Bhawan Palace":"Umaid Bhawan Palace",
  "Clock Tower & Sardar Market":"Ghanta Ghar, Jodhpur","Toorji ka Jhalra":"Toorji Ka Jhalra","Mandore Gardens":"Mandore","Osian":"Osian, Jodhpur",
  // Barmer, Balotra, Phalodi
  "Kiradu Temples":"Kiradu temples","Garh Mandir (Jogmaya)":"Barmer","Nakoda Parshvanath Temple":"Nakoda Jain Temple",
  "Tilwara Cattle Fair Ground":"Tilwara","Rani Bhatiyani Temple, Jasol":"Jasol","Khichan Bird Sanctuary":"Khichan",
  "Phalodi Fort":"Phalodi",
  // Jaisalmer
  "Jaisalmer Fort (Sonar Qila)":"Jaisalmer Fort","Patwon ki Haveli":"Patwon Ki Haveli","Gadisar Lake":"Gadisar Lake",
  "Bada Bagh":"Bada Bagh","Kuldhara":"Kuldhara","Sam Sand Dunes":"Sam Sand Dunes","Tanot Mata & Longewala":"Tanot",
  // Jalore, Sirohi, Pali
  "Jalore Fort":"Jalore Fort","Sundha Mata Temple":"Sundha Mata","Bhinmal":"Bhinmal",
  "Dilwara Temples":"Dilwara Temples","Nakki Lake":"Nakki Lake","Guru Shikhar":"Guru Shikhar","Sunset Point":"Mount Abu",
  "Achalgarh":"Achalgarh Fort","Ranakpur Jain Temple":"Ranakpur Jain temple","Jawai Bandh":"Jawai Dam","Om Banna (Bullet Baba)":"Om Banna",
  "Sojat":"Sojat",
  // Ajmer division
  "Ajmer Sharif Dargah":"Ajmer Sharif Dargah","Adhai Din ka Jhonpra":"Adhai Din Ka Jhonpra","Ana Sagar Lake":"Ana Sagar Lake",
  "Soniji ki Nasiyan":"Soniji Ki Nasiyan","Pushkar Lake & Brahma Temple":"Pushkar Lake","Savitri Temple, Pushkar":"Savitri Temple, Pushkar",
  "Kishangarh":"Kishangarh","Menal":"Menal","Bijolia":"Bijolia","Mandalgarh Fort":"Mandalgarh","Badnore Fort":"Badnore",
  "Shahpura Ramdwara":"Shahpura, Bhilwara","Ahhichatragarh Fort":"Nagaur Fort","Khinvsar Fort":"Khimsar Fort",
  "Meera Bai Temple, Merta":"Merta City","Sunehri Kothi":"Sunehri Kothi","Arabic & Persian Research Institute":"Arabic and Persian Research Institute",
  "Bisalpur Dam":"Bisalpur Dam","Hadi Rani Kund, Todaraisingh":"Todaraisingh","Old Walled Town & Chang Gate":"Beawar",
  "Rawli-Todgarh Wildlife Sanctuary":"Todgarh-Raoli Wildlife Sanctuary","Kuchaman Fort":"Kuchaman City",
  "Makrana Marble Quarries":"Makrana marble","Jain Vishva Bharati, Ladnun":"Jain Vishva Bharati Institute","Nawa salt pans (Sambhar edge)":"Sambhar Salt Lake",
  // Bikaner division
  "Junagarh Fort":"Junagarh Fort","Lalgarh Palace":"Lalgarh Palace","Rampuria Havelis":"Rampuria Haveli","Bhandasar Jain Temple":"Bhandasar Jain Temple",
  "National Research Centre on Camel":"National Research Centre on Camel","Karni Mata Temple, Deshnoke":"Karni Mata Temple","Gajner Palace":"Gajner Palace",
  "Sethani ka Johara":"Sethani Ka Johara","Salasar Balaji":"Salasar Balaji","Tal Chhapar Sanctuary":"Tal Chhapar Sanctuary",
  "Surana Haveli":"Churu","Kanhaiyalal Bagla Haveli":"Churu",
  "Hindumalkot Border":"Hindumalkot","Gurudwara Buddha Johad":"Gurudwara Buddha Johad","Laila Majnu ki Mazar, Binjaur":"Laila Majnu ki Mazar",
  "Bhatner Fort":"Bhatner fort","Kalibangan":"Kalibangan","Gogamedi":"Gogamedi",
  // Udaipur division
  "City Palace|udaipur":"City Palace, Udaipur","Lake Pichola & Jag Mandir":"Lake Pichola","Jagdish Temple":"Jagdish Temple, Udaipur",
  "Saheliyon ki Bari":"Saheliyon-ki-Bari","Fateh Sagar Lake":"Fateh Sagar Lake","Sajjangarh Monsoon Palace":"Monsoon Palace",
  "Bagore ki Haveli":"Bagore-ki-Haveli","Eklingji":"Eklingji","Kumbhalgarh Fort":"Kumbhalgarh",
  "Shrinathji Temple, Nathdwara":"Shrinathji Temple","Statue of Belief":"Statue of Belief","Haldighati":"Haldighati","Rajsamand Lake":"Rajsamand Lake",
  "Chittorgarh Fort":"Chittor Fort","Vijay Stambh":"Vijaya Stambha","Padmini Palace":"Rani Padmini's Palace","Meera Temple":"Chittor Fort",
  "Sanwariya Seth Temple":"Sanwariya Seth Temple","Sita Mata Wildlife Sanctuary":"Sitamata Wildlife Sanctuary","Devgarh (Deolia)":"Pratapgarh, Rajasthan",
  "Mahi Bajaj Sagar Dam":"Mahi Bajaj Sagar Dam","Tripura Sundari Temple":"Tripura Sundari Temple, Banswara","Arthuna Temples":"Arthuna",
  "Mangarh Dham":"Mangarh massacre","Juna Mahal":"Juna Mahal","Udai Bilas Palace":"Udai Bilas Palace","Gaib Sagar Lake":"Gaib Sagar Lake",
  "Baneshwar Dham":"Baneshwar","Deo Somnath":"Deo Somnath","Galiakot Dargah":"Galiakot","Jaisamand Lake":"Jaisamand Lake",
  "Jaisamand Wildlife Sanctuary":"Jaisamand Wildlife Sanctuary","Idana Mata Temple":"Idana Mata","Salumbar Palace & Old Town":"Salumbar",
  // Kota division
  "Garh Palace & Rao Madho Singh Museum":"City Palace, Kota","Chambal River Front":"Chambal River Front","Kishore Sagar & Jag Mandir":"Kishore Sagar",
  "Seven Wonders Park":"Seven Wonders Park","Garadia Mahadev":"Garadia Mahadev Temple","Mukundra Hills Tiger Reserve":"Mukundra Hills National Park",
  "Taragarh Fort":"Taragarh Fort, Bundi","Garh Palace & Chitrashala":"Bundi Palace","Raniji ki Baori":"Raniji Ki Baori","Sukh Mahal":"Sukh Mahal",
  "84 Pillared Cenotaph":"Chaurasi Khambon ki Chhatri","Bhimlat Waterfall":"Bhimlat Falls","Ramgarh Vishdhari Tiger Reserve":"Ramgarh Vishdhari Tiger Reserve",
  "Ramgarh Crater & Bhand Devra":"Ramgarh crater","Shergarh Fort":"Shergarh Fort, Baran","Sitabari":"Sitabari","Kapil Dhara":"Baran, Rajasthan",
  "Gagron Fort":"Gagron Fort","Sun Temple, Jhalrapatan":"Surya Temple, Jhalrapatan","Chandrabhaga Temples":"Jhalrapatan",
  "Bhawani Natya Shala":"Bhawani Natya Shala","Garh Palace":"Jhalawar","Kolvi Buddhist Caves":"Kolvi Caves",
  // Bharatpur division
  "Keoladeo National Park":"Keoladeo National Park","Lohagarh Fort":"Lohagarh Fort","Government Museum (Kamra Khas)":"Lohagarh Fort","Ganga Mandir":"Ganga Mandir, Bharatpur",
  "Machkund":"Machkund","Talab-e-Shahi":"Talab-e-Shahi","Damoh Waterfall":"Damoh Waterfall","National Chambal Sanctuary":"National Chambal Sanctuary",
  "Shergarh Fort|dholpur":"Shergarh Fort, Dholpur","Kaila Devi Temple":"Kaila Devi","Madan Mohan ji Temple":"Karauli","City Palace Karauli":"Karauli",
  "Timangarh Fort":"Timangarh Fort","Ranthambore National Park":"Ranthambore National Park","Ranthambore Fort":"Ranthambore Fort",
  "Trinetra Ganesh Temple":"Trinetra Ganesh Temple","Chauth Mata Temple":"Chauth Ka Barwara","Deeg Palace (Jal Mahal)":"Deeg Palace",
  "Deeg Fort":"Deeg Palace","Kaman (Kamyavan)":"Kaman, Rajasthan"
};
const FOODWIKI = {
  "Dal Baati Churma":"Dal bati","Dal Baati":"Dal bati","Pyaaz Kachori":"Pyaaz kachori","Ghevar":"Ghevar","Malai Ghewar":"Ghevar",
  "Laal Maas":"Laal maas","Lassi":"Lassi","Makhaniya Lassi":"Lassi","Rose Lassi":"Lassi","Lassi in Kulhad":"Lassi",
  "Mirchi Bada":"Mirchi bada","Mawa Kachori":"Mawa kachori","Kachori":"Kachori","Kota Kachori":"Kachori","Kadhi Kachori":"Kachori",
  "Kachori-Sabzi":"Kachori","Kachori-Aloo Sabzi":"Kachori","Bajra Roti & Lehsun Chutney":"Bhakri","Bajra Rotla":"Bhakri",
  "Bajra Rotla & Kadhi":"Bhakri","Kadhi & Bajra":"Kadhi","Bajre ki Khichdi":"Khichdi","Bajra Khichdi":"Khichdi","Bajre ka Khichda":"Khichdi",
  "Ker Sangri":"Ker sangri","Dhaba Paratha & White Butter":"Paratha","Milk Cake":"Milk cake","Alwar Milk Cake (Kalakand)":"Milk cake",
  "Ghotua Laddoo":"Laddu","Panchdhari Laddoo":"Laddu","Gond ke Laddoo":"Laddu","Salasar Churma":"Churma","Bundi Laddoo":"Boondi",
  "Kadhi Pakoda":"Kadhi","Mount Abu Fudge":"Fudge","Rabri":"Rabri","Gulab Jamun ki Sabzi":"Gulab jamun","Sohan Halwa":"Sohan halwa",
  "Malpua":"Malpua","Methi Mangodi":"Fenugreek","Nawabi Kebabs & Biryani":"Biryani","Sheer Khurma":"Sheer khurma","Til Patti":"Chikki",
  "Gajak":"Gajak","Bikaneri Bhujia":"Bikaneri bhujia","Rasgulla":"Rasgulla","Camel Milk Tea & Kulfi":"Camel milk",
  "Sarson da Saag & Makki Roti":"Sarson da saag","Sarson da Saag":"Sarson da saag","Kinnow Juice":"Kinnow","Gatte ki Sabzi":"Gatte",
  "Nathdwara Thor & Prasad":"Prasada","Gulkand":"Gulkand","Makki ki Roti":"Makki di roti","Makki ki Roti & Kadhi":"Makki di roti",
  "Poha-Jalebi":"Poha (rice)","Poha with Sev":"Poha (rice)","Dal Panya":"Dal bati","Mahua Laddoo":"Madhuca longifolia",
  "Bohra Thal":"Dawoodi Bohra","Makki ki Raab":"Raab","Raab":"Raab","Bajra Raab":"Raab","Kachri ki Chutney":"Kachri",
  "Orange (Santra)":"Orange (fruit)","Peda":"Peda","Bedmi Puri":"Bedmi puri","Gujiya":"Gujiya","Guava (Amrood)":"Guava"
};
