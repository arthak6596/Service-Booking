require('dotenv').config(); // load .env
const mongoose = require('mongoose');
const Service = require('./models/service'); // adjust path if needed


const randomPrice = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(2);
}

const randomRating = () => {
  return (Math.random() * 5).toFixed(1);
}

const services = [

  {
    "name": "House Cleaning",
    "description": "Full home deep cleaning with eco-friendly products.",
    "image": "https://pixabay.com/get/g9123036abaace5e12cc786091a6610c4f82d9c8de4f1e332f623f9b0db106c11a194bf5da90042956956ca1836729a13e49d4cbc1b5c263aef06bcda4ca3ac52_640.jpg",
    "price": "$117",
    "rating": "4.0"
  },
  {
    "name": "Bathroom Cleaning",
    "description": "Detailed bathroom cleaning with disinfectants.",
    "image": "https://pixabay.com/get/g2cbfe15cdf45fc55c4a9781c00dfbf9044704a5034225134bc3bd931760f8156142856780929b1da6a97a9381506956ea44f4d1a44728aefea2ad08678ff9f34_640.jpg",
    "price": "$177",
    "rating": "4.7"
  },
  {
    "name": "Kitchen Deep Cleaning",
    "description": "Grease removal and deep sanitization of kitchen.",
    "image": "https://pixabay.com/get/g0e4dffa029231b7b73984b65afb13b8534e342db0ac9e55ccab92b3e2a1c30637499ceb19d837aa50e597b462ac50bcd25603159caf31625a7fdd24a7e36c874_640.jpg",
    "price": "$119",
    "rating": "4.1"
  },
  {
    "name": "Sofa Cleaning",
    "description": "Professional upholstery and fabric cleaning service.",
    "image": "https://pixabay.com/get/ge9423b8276029af0b1d5a0042f39a12b14b24a7f1e4f4663487372aeba1367a99a012ecaf2250ba4416c915071b8a427ccf0c4a82f861972eb5dac578ba207da_640.jpg",
    "price": "$139",
    "rating": "4.2"
  },
  {
    "name": "Carpet Cleaning",
    "description": "Steam cleaning for carpets and rugs.",
    "image": "https://pixabay.com/get/gbecad361cd1ec7aa988759e60d2f616b1ef4c9d807ae52719b81165986fdfa507369c8cc7c494b615819a325573d8f24_640.jpg",
    "price": "$96",
    "rating": "4.8"
  },
  {
    "name": "Window Cleaning",
    "description": "Exterior and interior window glass cleaning.",
    "image": "https://pixabay.com/get/g28f8b8490feff2dd64c30a14b725160257313ed30558180edae62bb587d43f5e8803db3a52a835d2bba3069f7ffadc4dbc9d971c551768b5366df330cc930bb3_640.jpg",
    "price": "$189",
    "rating": "4.4"
  },
  {
    "name": "Electrical Wiring",
    "description": "Home electrical wiring and rewiring services.",
    "image": "https://pixabay.com/get/g2190d3c2bb9198ec11366d9e20c54290f6c507581eb652681646c244516914613425119a9506c779f240e08668f13bba6fe3a5ec7034efcda5694f9bf7c5b405_640.jpg",
    "price": "$122",
    "rating": "4.3"
  },
  {
    "name": "Fan Installation",
    "description": "Ceiling, wall, and exhaust fan installations.",
    "image": "https://pixabay.com/get/ge075ed8c77c1c2600bf26712ab7fd974472eb98831a308272558097a8272ff498459578c7c87a48d81df6687fd880d797cbed98b601c903b21c8edc9db8f1c4c_640.jpg",
    "price": "$134",
    "rating": "4.1"
  },
  {
    "name": "Light Fitting",
    "description": "LED and chandelier light installations.",
    "image": "https://pixabay.com/get/gc4b81cf9e41edd68a930d28e2f1099801a2a6561672fe91d96a7b288741fa60813d3140f16dad35eaca54d66a02a6b10547a0b2d04b5b5ea56f0b649e7c84010_640.jpg",
    "price": "$77",
    "rating": "5.0"
  },
  {
    "name": "Inverter Repair",
    "description": "Home inverter installation and repair services.",
    "image": "https://pixabay.com/get/gdc087b9b31f073828e85907e626557c20b737afb7351ea89c85f1e05c617d21f98b03ea5accabc03e63d8caae5e59aa0_640.jpg",
    "price": "$150",
    "rating": "4.5"
  },
  {
    "name": "Plumbing Service",
    "description": "Leak repair, installation, and maintenance.",
    "image": "https://pixabay.com/get/gc206f7f4bfabc401b87c570a6e9e3185ee8e47ca611d8ac7243b854d38a9e6f20231d1f9635308f298e1b2249e0101c5_640.jpg",
    "price": "$54",
    "rating": "4.3"
  },
  {
    "name": "Toilet Repair",
    "description": "Unclogging and repairing toilet systems.",
    "image": "https://pixabay.com/get/ge74e278c6d0601866f9dfa46fbf29f4a31b15740e23a8660fc9d8e4ddf4246e2d58afbe0a0001a82c76e5e2abf785e8d64a3375b60556f927e036664cebeabce_640.jpg",
    "price": "$198",
    "rating": "4.0"
  },
  {
    "name": "Water Tank Cleaning",
    "description": "Overhead and underground tank cleaning.",
    "image": "https://pixabay.com/get/g629317f1a54b095b1956a00c0b0f8b61d8ca58ff44246c02ab47ab416a08d250118428a4016ad7a38ee5b5ad6491701a5955975901cc4b90b895c943d700aee7_640.jpg",
    "price": "$85",
    "rating": "4.1"
  },
  {
    "name": "Water Purifier Installation",
    "description": "RO, UV purifier setup and maintenance.",
    "image": "https://pixabay.com/get/g16d6d64d8d33c1762a42b5b1f2f5c2060903b0c399aace55063c276f1a39a577b011a0b7841d3b9ec82f4c040737a74335b1ff3a976d2b7e6d5b6bc7e9a88186_640.png",
    "price": "$55",
    "rating": "4.6"
  },
  {
    "name": "AC Repair",
    "description": "AC gas refill, maintenance, and installation.",
    "image": "https://pixabay.com/get/g5c4b7cc936c3738866603b7568bad832a8e9a55bd8b419357a45b21a58d3c206de088c218b2ecef1c7fd7441de4384d1_640.jpg",
    "price": "$142",
    "rating": "4.2"
  },
  {
    "name": "Refrigerator Repair",
    "description": "Fridge cooling and compressor repair.",
    "image": "https://pixabay.com/get/g88f5b49de722b2c9230ffe948ed022bbba15e3f663cd6d351eb315cd78027ce2680867548563561cf59bd486b3a9fc37_640.jpg",
    "price": "$136",
    "rating": "4.8"
  },
  {
    "name": "Washing Machine Repair",
    "description": "Front and top-load washing machine service.",
    "image": "https://pixabay.com/get/gbadb9dfb0a8dff0402c8e72c6ed9a68017b6156d3b96dd192a4936ba0ba02d8f0fed241e2873526301dbacf2916a255ec39cb6905b6483e451014ae0b41ea1e2_640.jpg",
    "price": "$152",
    "rating": "4.2"
  },
  {
    "name": "Microwave Repair",
    "description": "Microwave heating and electrical fix.",
    "image": "https://pixabay.com/get/gaa320c7d6fb848128798376a3c6829dc92e0c4e4b47895122d46ca2244ecb582c1950cd989d14d338a178117a1372c65_640.jpg",
    "price": "$167",
    "rating": "4.0"
  },
  {
    "name": "TV Mounting",
    "description": "LED TV wall mounting and setup.",
    "image": "https://pixabay.com/get/gf9f25685a2bcdafc26a9a99f2c40cf2289d80c129733edbc18721fbbb47b3a7ae6eb98da55472f37cc905917459fa328454a1dfde99d63cad103100596493c4f_640.jpg",
    "price": "$199",
    "rating": "4.3"
  },
  {
    "name": "Lawn Care",
    "description": "Trimming, fertilizing, and lawn maintenance.",
    "image": "https://pixabay.com/get/g0d0e84773b8c30a1254a246390020b7b6a991bf53556a29bcd1343f5b8bd6f5dee3f3de8c6f635ad476649e70367622a7949974f98dc2f01da659fc1316eec25_640.jpg",
    "price": "$55",
    "rating": "4.9"
  },
  {
    "name": "Tree Trimming",
    "description": "Tree cutting and maintenance services.",
    "image": "https://pixabay.com/get/gd77c0367eeb52757eae9f426f7cfef77b772ee8e8c5ba0dcf7ff7092898b261f3d4715f18ae762d7d8c66278b74a0124aac71c4e6221d5f41c8ad01c75069e99_640.jpg",
    "price": "$141",
    "rating": "4.3"
  },
  {
    "name": "Pest Control",
    "description": "Termite, mosquito, and pest extermination.",
    "image": "https://pixabay.com/get/ge888dcaa6cf71bb588c8fba49bce53686f8eb32acf4144a99196b73a7c3cf0783b91933de05eee4c7158f540afefe15f0244e3e10913202440bd9d1bb4e726ae_640.jpg",
    "price": "$115",
    "rating": "4.8"
  },
  {
    "name": "Yoga Instructor",
    "description": "Personal yoga sessions at your home.",
    "image": "https://pixabay.com/get/ga382a5e9f1748f48602a3f9d7bd931fedb265d87ea6a1e9dc0dbb7bf26fed2ec4f04137df9a26cde40502c4b3154886e2e13b616373b400e3d7be4fb0be96902_640.jpg",
    "price": "$193",
    "rating": "4.9"
  },
  {
    "name": "Fitness Trainer",
    "description": "Certified personal training for strength and cardio.",
    "image": "https://pixabay.com/get/gcc2b52ee11523b54ea34e67f515bf70309f2a989d38f4e950e01c8b4c71add9cefa67ef65de327d9f9c909929f550fd863ac49122b420839634ec3fb5866a14e_640.jpg",
    "price": "$171",
    "rating": "5.0"
  },
  {
    "name": "Massage Therapy",
    "description": "Relaxation and therapeutic body massages.",
    "image": "https://pixabay.com/get/gaa43ad131990599dc93bb49efea23891903f2b53a2af5a13b6e97c36fcc7c39d23297f42695f5a1d52a39444d8fcdea206137ca14b42919b7f725c0ff841aabf_640.jpg",
    "price": "$148",
    "rating": "4.7"
  },
  {
    "name": "Nutritionist Consultation",
    "description": "Diet and nutrition guidance sessions.",
    "image": "https://pixabay.com/get/g995375e3bc558f14f8c7cc75b58ca05845f83ff1e793ca449e1ee00941b9feeb87fda00507ed694a9f5c984b169708ecb9cc310a736ca4f947d223769c25587f_640.jpg",
    "price": "$163",
    "rating": "4.3"
  },
  {
    "name": "Computer Repair",
    "description": "Laptop and desktop troubleshooting and upgrades.",
    "image": "https://pixabay.com/get/g958008b2b41e98c5242b5d5e4905dfa8ff0303ef25c740d606e31da4770a9043a8ae06cc00ab6f7bd04d7062815c84a4_640.jpg",
    "price": "$148",
    "rating": "4.4"
  },
  {
    "name": "Mobile Repair",
    "description": "Screen replacement and battery repair.",
    "image": "https://pixabay.com/get/g14bc38c212f012a0695894d27cf8afa375d027eb44d1fdd742cb286569a2bcf3e58f57a50af50b3ecde3497686b97adc78ce81ed0d5d2182e82a44b8ed2d9664_640.jpg",
    "price": "$98",
    "rating": "4.2"
  },
  {
    "name": "Data Recovery",
    "description": "Recover lost or corrupted files from devices.",
    "image": "https://pixabay.com/get/g23f294e79d8b507fe4fcabde3154feabc4cc3b3b6fbb59b380b69384911e175c36e5e5c164b3de5eaf8fa2904aabfcaf1be795c6d2de19a5c84784d223ace71d_640.jpg",
    "price": "$118",
    "rating": "4.8"
  },
  {
    "name": "CCTV Installation",
    "description": "Home and office CCTV setup and monitoring.",
    "image": "https://pixabay.com/get/g737c47cc87a6d3b40b3608de751801b77bc8fa92aa1c08ac714e3625781d4733ee68870df194e8a8f7ccb6682cf70c12ae08899ff6c690ea5182a7b1ac5f60d5_640.jpg",
    "price": "$129",
    "rating": "4.6"
  },
  {
    "name": "Event Photographer",
    "description": "Professional photoshoot and event coverage.",
    "image": "https://pixabay.com/get/g698c373d3cf8633cff99a50c66d73b2ef3d71c9c38fc1ee52549a90af75013321b44199abdbd3d46d0b7c750de82797b8480f1b6f0996292e2e04caaaf42f9fd_640.jpg",
    "price": "$107",
    "rating": "4.5"
  },
  {
    "name": "Makeup Artist",
    "description": "Bridal and party makeup services.",
    "image": "https://pixabay.com/get/g31de08555c12eb104e545237e1b9ca3e4e259f66b73c340f0111affb24f8a66ad54894b41dfc908ffb17cc1bcfbebfcabac7c697a50e09656c3dc7f7f10fb23e_640.jpg",
    "price": "$171",
    "rating": "4.3"
  },
  {
    "name": "Hair Stylist",
    "description": "Haircut, coloring, and styling at home.",
    "image": "https://pixabay.com/get/g2a00389e609aacf87df5c3b49500a6db66c574cd9328d43b7ee02e78f9541f45ead7a64f38c4c364879c1870ba4469a2740868c58328aeb998b55333a4439595_640.jpg",
    "price": "$103",
    "rating": "4.8"
  },
  {
    "name": "Party Decorator",
    "description": "Themed event decorations for birthdays and parties.",
    "image": "https://pixabay.com/get/g6f1539fecd039cce9c657e1586fa2d8a44fc586180f21be2a0f3d38387ef7398c956ad2512c81d6548b806133c6070d4172e38c4491c1163acb77ccbaeef5306_640.jpg",
    "price": "$179",
    "rating": "4.7"
  },
  {
    "name": "DJ Services",
    "description": "Professional DJ for events and weddings.",
    "image": "https://pixabay.com/get/g23f790f7c8425d8c67ef3ce52167fda43fa3bd08237bba3779e698c1bdf30adc63645a9211ec8987e6aec8cc41bbe6abd582a30d7dad37327450de5793f2ee2d_640.jpg",
    "price": "$160",
    "rating": "4.2"
  }
]

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log('✅ Services added successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error:', err);
    mongoose.disconnect();
  });
