module.exports  = function generateAddress() {
    const indianStates = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal",
      ];
      const indianPincodes = [
        "110001",
        "400001",
        "500001",
        "600001",
        "700001",
        "800001",
        "900001",
        "110002",
        "400002",
        "500002",
        "600002",
        "700002",
        "800002",
        "900002",
        "110003",
        "400003",
        "500003",
        "600003",
        "700003",
        "800003"
      ];

      const indianStreets = [
        "MG Road",
        "Linking Road",
        "Brigade Road",
        "Park Street",
        "Sarojini Naidu Marg",
        "Hill Road",
        "Hauz Khas Village",
        "Connaught Place",
        "Commercial Street",
        "Chandni Chowk",
        "Gariahat Road",
        "Lavelle Road",
        "Abids Road",
        "Bandra Kurla Complex",
        "Janpath Road",
      ];
      
            
    let add = {}


    // add.zipCode = indianPincodes[Math.floor(Math.random() * indianPincodes.length)];
    add.street = indianStreets[Math.floor(Math.random() * indianStreets.length)];


return add

}


