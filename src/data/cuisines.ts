export type Dish = {
  name: string;
  description: string;
  photo: string;
  tags: string[];
};

export type CuisineEntry = {
  name: string;
  slug: string;
  emoji: string;
  region: "Europe" | "Asia" | "Americas" | "Middle East" | "Africa";
  description: string;
  photo: string;
  dishes: Dish[];
};

export const CUISINES: CuisineEntry[] = [
  // ── Europe ──────────────────────────────────────────────────────────────────
  {
    name: "Italian",
    slug: "italian",
    emoji: "🍝",
    region: "Europe",
    description:
      "Pasta, risotto, and wood-fired pizza from the heart of the Mediterranean.",
    photo: "photo-1555396273-367ea4eb4db5",
    dishes: [
      {
        name: "Spaghetti Carbonara",
        description:
          "Creamy pasta with guanciale, eggs, and Pecorino Romano — Rome's iconic comfort dish.",
        photo: "photo-1608756687911-aa1599ab3bd9",
        tags: ["pasta", "classic", "roman"],
      },
      {
        name: "Margherita Pizza",
        description:
          "San Marzano tomatoes, fresh mozzarella, and basil on a thin Neapolitan crust.",
        photo: "photo-1513104890138-7c749659a591",
        tags: ["pizza", "neapolitan", "vegetarian"],
      },
      {
        name: "Risotto ai Funghi",
        description:
          "Creamy Arborio rice with wild mushrooms, white wine, and aged Parmigiano.",
        photo: "photo-1476124369491-e7addf5db371",
        tags: ["rice", "creamy", "vegetarian"],
      },
      {
        name: "Tiramisu",
        description:
          "Espresso-soaked savoiardi layered with mascarpone cream and dusted with cocoa.",
        photo: "photo-1571877227200-a0d98ea607e9",
        tags: ["dessert", "coffee", "classic"],
      },
      {
        name: "Osso Buco",
        description:
          "Braised veal shanks slow-cooked with vegetables, white wine, and gremolata.",
        photo: "photo-1544025162-d76694265947",
        tags: ["meat", "milanese", "braise"],
      },
      {
        name: "Focaccia",
        description:
          "Olive oil-drenched flatbread, dimpled and topped with sea salt, herbs, or olives.",
        photo: "photo-1571091718767-18b5b1457add",
        tags: ["bread", "bake", "vegetarian"],
      },
    ],
  },
  {
    name: "French",
    slug: "french",
    emoji: "🥐",
    region: "Europe",
    description:
      "The foundation of modern gastronomy — from croissants to coq au vin.",
    photo: "photo-1414235077428-338989a2e8c0",
    dishes: [
      {
        name: "Croissant",
        description:
          "Buttery, flaky laminated pastry — the crown jewel of French viennoiserie.",
        photo: "photo-1555507036-ab1f4038808a",
        tags: ["pastry", "breakfast", "buttery"],
      },
      {
        name: "Coq au Vin",
        description:
          "Free-range chicken braised with red wine, mushrooms, lardons, and pearl onions.",
        photo: "photo-1414235077428-338989a2e8c0",
        tags: ["chicken", "wine", "braise"],
      },
      {
        name: "Crème Brûlée",
        description:
          "Silky vanilla custard with a caramelized sugar crust that cracks beautifully.",
        photo: "photo-1470124182917-cc6e71b22ecc",
        tags: ["dessert", "classic", "custard"],
      },
      {
        name: "Ratatouille",
        description:
          "Provençal vegetable medley of tomatoes, zucchini, eggplant, and bell peppers.",
        photo: "photo-1546069901-ba9599a7e63c",
        tags: ["vegetarian", "provençal", "baked"],
      },
      {
        name: "French Onion Soup",
        description:
          "Slow-caramelized onion broth topped with croutons and melted Gruyère cheese.",
        photo: "photo-1547592166-23ac45744acd",
        tags: ["soup", "cheese", "winter"],
      },
      {
        name: "Bouillabaisse",
        description:
          "Marseille's legendary fish stew with saffron, fennel, and rouille toasts.",
        photo: "photo-1476224203421-9ac39bcb3df1",
        tags: ["seafood", "stew", "saffron"],
      },
    ],
  },

  // ── Asia ────────────────────────────────────────────────────────────────────
  {
    name: "Japanese",
    slug: "japanese",
    emoji: "🍣",
    region: "Asia",
    description:
      "Delicate sushi, ramen broths, and the art of umami perfection.",
    photo: "photo-1611143669185-af224c5e3252",
    dishes: [
      {
        name: "Sushi Platter",
        description:
          "Vinegared rice topped with fresh sashimi-grade fish, seasoned nori, and wasabi.",
        photo: "photo-1617196034183-421b4040ed20",
        tags: ["seafood", "raw", "art"],
      },
      {
        name: "Tonkotsu Ramen",
        description:
          "Rich, creamy pork bone broth with chashu, soft-boiled egg, and bamboo shoots.",
        photo: "photo-1569050467447-ce54b3bbc37d",
        tags: ["noodle", "broth", "pork"],
      },
      {
        name: "Chicken Karaage",
        description:
          "Crispy Japanese fried chicken marinated in soy, ginger, and sake.",
        photo: "photo-1559410545-0bdcd187e0a6",
        tags: ["fried", "chicken", "street food"],
      },
      {
        name: "Gyoza",
        description:
          "Pan-fried pork and cabbage dumplings with a crispy bottom and tender top.",
        photo: "photo-1547592166-23ac45744acd",
        tags: ["dumpling", "pork", "pan-fried"],
      },
      {
        name: "Miso Soup",
        description:
          "Dashi broth with fermented soy paste, tofu, seaweed, and spring onions.",
        photo: "photo-1547592180-85f173990554",
        tags: ["soup", "vegan", "umami"],
      },
      {
        name: "Matcha Mochi",
        description:
          "Soft, chewy rice cakes filled with sweet red bean paste and dusted with matcha.",
        photo: "photo-1582716401301-b2407dc7563d",
        tags: ["dessert", "matcha", "rice"],
      },
    ],
  },
  {
    name: "Indian",
    slug: "indian",
    emoji: "🍛",
    region: "Asia",
    description:
      "Aromatic curries, tandoor-baked breads, and a universe of spices.",
    photo: "photo-1585937421612-70a008356fbe",
    dishes: [
      {
        name: "Butter Chicken",
        description:
          "Tender chicken in a velvety tomato-cream-butter sauce spiced with garam masala.",
        photo: "photo-1603894584373-5ac82b2ae398",
        tags: ["curry", "creamy", "chicken"],
      },
      {
        name: "Lamb Biryani",
        description:
          "Fragrant basmati rice layered with slow-cooked spiced lamb, saffron, and crispy onions.",
        photo: "photo-1563379091339-03b21ab4a4f8",
        tags: ["rice", "lamb", "festive"],
      },
      {
        name: "Samosa",
        description:
          "Crispy pastry filled with spiced potatoes, peas, and herbs — deep fried to golden perfection.",
        photo: "photo-1601050690597-df0568f70950",
        tags: ["snack", "vegetarian", "fried"],
      },
      {
        name: "Garlic Naan",
        description:
          "Fluffy, pillowy flatbread baked in a tandoor, brushed with garlic butter and cilantro.",
        photo: "photo-1588166524941-3bf61a9c41db",
        tags: ["bread", "tandoor", "vegetarian"],
      },
      {
        name: "Dal Makhani",
        description:
          "Slow-cooked black lentils and kidney beans simmered overnight with cream and butter.",
        photo: "photo-1631515243349-e0cb75fb8d3a",
        tags: ["vegetarian", "lentil", "creamy"],
      },
      {
        name: "Gulab Jamun",
        description:
          "Soft milk-solid dumplings soaked in rose and cardamom sugar syrup.",
        photo: "photo-1558961363-fa8fdf82db35",
        tags: ["dessert", "sweet", "syrup"],
      },
    ],
  },
  {
    name: "Thai",
    slug: "thai",
    emoji: "🍜",
    region: "Asia",
    description:
      "Sweet, sour, salty, spicy — Thai cuisine balances all four in perfect harmony.",
    photo: "photo-1559314809-0d155014e29e",
    dishes: [
      {
        name: "Pad Thai",
        description:
          "Stir-fried rice noodles with shrimp, tofu, bean sprouts, and tamarind sauce.",
        photo: "photo-1559314809-0d155014e29e",
        tags: ["noodle", "stir-fry", "street food"],
      },
      {
        name: "Green Curry",
        description:
          "Fragrant coconut milk curry with green chili paste, bamboo shoots, and Thai basil.",
        photo: "photo-1455619452474-d2be8b1e70cd",
        tags: ["curry", "coconut", "spicy"],
      },
      {
        name: "Tom Yum Soup",
        description:
          "Hot and sour broth with lemongrass, galangal, kaffir lime leaves, and shrimp.",
        photo: "photo-1569718212165-3a8278d5f624",
        tags: ["soup", "spicy", "seafood"],
      },
      {
        name: "Mango Sticky Rice",
        description:
          "Glutinous rice cooked in coconut milk, served with ripe mango slices and sesame seeds.",
        photo: "photo-1560719887-fe3105fa1e55",
        tags: ["dessert", "mango", "coconut"],
      },
      {
        name: "Som Tum",
        description:
          "Crunchy green papaya salad pounded with palm sugar, fish sauce, lime, and chili.",
        photo: "photo-1562802378-063ec186a863",
        tags: ["salad", "spicy", "vegetarian"],
      },
      {
        name: "Massaman Curry",
        description:
          "Mild, rich curry with potatoes, peanuts, and beef or chicken in coconut-peanut sauce.",
        photo: "photo-1599487488155-1aa8829b5b06",
        tags: ["curry", "mild", "peanut"],
      },
    ],
  },
  {
    name: "Chinese",
    slug: "chinese",
    emoji: "🥟",
    region: "Asia",
    description:
      "Dim sum, Peking duck, stir-fries — centuries of culinary mastery.",
    photo: "photo-1563245372-f21724e3856d",
    dishes: [
      {
        name: "Dim Sum",
        description:
          "Assorted steamed and fried dumplings, buns, and rolls served in bamboo steamers.",
        photo: "photo-1563245372-f21724e3856d",
        tags: ["dumpling", "steamed", "shared"],
      },
      {
        name: "Peking Duck",
        description:
          "Crispy lacquered duck skin served with thin pancakes, scallions, and hoisin sauce.",
        photo: "photo-1525755662778-989d0524087e",
        tags: ["duck", "classic", "beijing"],
      },
      {
        name: "Mapo Tofu",
        description:
          "Silken tofu in a fiery Sichuan bean paste sauce with ground pork and numbing peppercorns.",
        photo: "photo-1603133872878-684f208fb84b",
        tags: ["tofu", "sichuan", "spicy"],
      },
      {
        name: "Kung Pao Chicken",
        description:
          "Wok-fried chicken with dried chilies, peanuts, and Sichuan peppercorns.",
        photo: "photo-1569058242253-92a9c755a0ec",
        tags: ["chicken", "peanut", "stir-fry"],
      },
      {
        name: "Hot Pot",
        description:
          "Communal simmering broth with fresh meats, vegetables, and tofu cooked at the table.",
        photo: "photo-1534422298391-e4f8c172789a",
        tags: ["shared", "communal", "broth"],
      },
      {
        name: "Char Siu Bao",
        description:
          "Fluffy steamed buns filled with sweet barbecued pork — a dim sum staple.",
        photo: "photo-1547592180-85f173990554",
        tags: ["bun", "pork", "steamed"],
      },
    ],
  },

  // ── Americas ────────────────────────────────────────────────────────────────
  {
    name: "Mexican",
    slug: "mexican",
    emoji: "🌮",
    region: "Americas",
    description:
      "Bold tacos, enchiladas, and vibrant salsas rooted in ancient traditions.",
    photo: "photo-1565299585323-38d6b0865b47",
    dishes: [
      {
        name: "Tacos al Pastor",
        description:
          "Marinated pork cooked on a vertical spit, served on corn tortillas with pineapple and cilantro.",
        photo: "photo-1565299585323-38d6b0865b47",
        tags: ["street food", "pork", "spicy"],
      },
      {
        name: "Guacamole",
        description:
          "Fresh avocado mashed with lime juice, cilantro, jalapeño, and diced tomato.",
        photo: "photo-1541519227354-08fa5d50c820",
        tags: ["vegetarian", "dip", "avocado"],
      },
      {
        name: "Enchiladas Rojas",
        description:
          "Corn tortillas filled with chicken and smothered in rich ancho chili sauce and cheese.",
        photo: "photo-1534352956036-cd81e27dd615",
        tags: ["chicken", "cheese", "baked"],
      },
      {
        name: "Churros",
        description:
          "Crispy fried dough dusted with cinnamon sugar, served with thick chocolate dipping sauce.",
        photo: "photo-1578985545062-69928b1d9587",
        tags: ["dessert", "fried", "sweet"],
      },
      {
        name: "Pozole Rojo",
        description:
          "Slow-cooked hominy soup with tender pork and dried red chili broth, topped with shredded cabbage.",
        photo: "photo-1585937421612-70a008356fbe",
        tags: ["soup", "pork", "hominy"],
      },
      {
        name: "Quesadillas",
        description:
          "Flour tortillas filled with melted cheese, peppers, and your choice of protein.",
        photo: "photo-1552332386-f8dd00dc2f85",
        tags: ["cheese", "quick", "grilled"],
      },
    ],
  },

  // ── Middle East ─────────────────────────────────────────────────────────────
  {
    name: "Lebanese",
    slug: "lebanese",
    emoji: "🧆",
    region: "Middle East",
    description: "Fresh hummus, falafel, and the warm flavours of the Levant.",
    photo: "photo-1540189549336-e6e99c3679fe",
    dishes: [
      {
        name: "Hummus",
        description:
          "Creamy blended chickpeas with tahini, lemon, garlic, and a drizzle of olive oil.",
        photo: "photo-1512621776951-a57141f2eefd",
        tags: ["vegetarian", "dip", "chickpea"],
      },
      {
        name: "Falafel",
        description:
          "Crispy deep-fried balls of ground chickpeas, herbs, and spices.",
        photo: "photo-1529006557810-274b9b2fc783",
        tags: ["vegan", "fried", "street food"],
      },
      {
        name: "Shawarma",
        description:
          "Spiced marinated chicken or lamb shaved from a rotating spit and wrapped in flatbread.",
        photo: "photo-1529006557810-274b9b2fc783",
        tags: ["wrap", "spiced", "street food"],
      },
      {
        name: "Tabbouleh",
        description:
          "Finely chopped parsley, tomato, and bulgur wheat dressed with lemon and olive oil.",
        photo: "photo-1540189549336-e6e99c3679fe",
        tags: ["salad", "vegan", "fresh"],
      },
      {
        name: "Kibbeh",
        description:
          "Ground beef and bulgur wheat shells filled with spiced lamb, pine nuts, and onions.",
        photo: "photo-1476224203421-9ac39bcb3df1",
        tags: ["lamb", "bulgur", "baked"],
      },
      {
        name: "Baklava",
        description:
          "Paper-thin phyllo layers filled with chopped pistachios and drenched in rose-water syrup.",
        photo: "photo-1519676867240-f03562e64548",
        tags: ["dessert", "pastry", "sweet"],
      },
    ],
  },

  // ── Africa ──────────────────────────────────────────────────────────────────
  {
    name: "Nigerian",
    slug: "nigerian",
    emoji: "🇳🇬",
    region: "Africa",
    description:
      "Bold and spicy West African flavours — jollof rice, egusi soup, and smoky suya.",
    photo: "photo-1604329760661-e71dc83f8f26",
    dishes: [
      {
        name: "Jollof Rice",
        description:
          "One-pot tomato-based rice slow-cooked with peppers, spices, and smoked seasoning — the crown of West African cooking.",
        photo: "photo-1604329760661-e71dc83f8f26",
        tags: ["rice", "smoky", "party food"],
      },
      {
        name: "Egusi Soup",
        description:
          "Rich soup made from ground melon seeds, leafy greens, palm oil, and assorted meats.",
        photo: "photo-1476224203421-9ac39bcb3df1",
        tags: ["soup", "hearty", "traditional"],
      },
      {
        name: "Suya",
        description:
          "Spiced beef skewers rubbed with groundnut powder, ginger, and paprika, grilled over open flame.",
        photo: "photo-1544025162-d76694265947",
        tags: ["grilled", "street food", "spicy"],
      },
      {
        name: "Puff Puff",
        description:
          "Deep-fried dough balls — Nigeria's beloved sweet street snack, crispy outside and fluffy inside.",
        photo: "photo-1567620905732-2d1ec7ab7445",
        tags: ["snack", "fried", "sweet"],
      },
      {
        name: "Fried Plantain (Dodo)",
        description:
          "Ripe plantains sliced and pan-fried until caramelized — a staple side dish at every Nigerian table.",
        photo: "photo-1574782672170-7fd25d622ce6",
        tags: ["vegetarian", "side", "sweet"],
      },
      {
        name: "Pepper Soup",
        description:
          "Spicy, aromatic light broth with goat meat, uziza leaves, and traditional African spices.",
        photo: "photo-1547592180-85f173990554",
        tags: ["soup", "spicy", "medicinal"],
      },
    ],
  },
  {
    name: "Ethiopian",
    slug: "ethiopian",
    emoji: "🇪🇹",
    region: "Africa",
    description:
      "Injera-based communal dining with rich stews, vibrant spices, and ancient tradition.",
    photo: "photo-1565958011703-44f9829ba187",
    dishes: [
      {
        name: "Doro Wat",
        description:
          "Ethiopia's national dish — a deeply spiced berbere chicken stew served on spongy injera.",
        photo: "photo-1585937421612-70a008356fbe",
        tags: ["chicken", "stew", "spicy"],
      },
      {
        name: "Injera",
        description:
          "Sour, spongy sourdough flatbread made from teff flour — the edible plate of Ethiopian cuisine.",
        photo: "photo-1603133872878-684f208fb84b",
        tags: ["bread", "sourdough", "vegan"],
      },
      {
        name: "Kitfo",
        description:
          "Ethiopian steak tartare — minced raw beef spiced with mitmita and niter kibbeh clarified butter.",
        photo: "photo-1544025162-d76694265947",
        tags: ["raw", "beef", "ceremonial"],
      },
      {
        name: "Shiro Wat",
        description:
          "Slow-simmered chickpea flour stew with berbere, garlic, and onions — a beloved vegan dish.",
        photo: "photo-1476224203421-9ac39bcb3df1",
        tags: ["vegan", "chickpea", "stew"],
      },
      {
        name: "Tibs",
        description:
          "Sautéed cubes of beef or lamb with rosemary, onions, and jalapeño in a hot clay pot.",
        photo: "photo-1525755662778-989d0524087e",
        tags: ["lamb", "beef", "sautéed"],
      },
      {
        name: "Kategna",
        description:
          "Injera toasted with niter kibbeh and berbere — Ethiopia's answer to garlic bread.",
        photo: "photo-1555507036-ab1f4038808a",
        tags: ["bread", "snack", "spiced"],
      },
    ],
  },
  {
    name: "Moroccan",
    slug: "moroccan",
    emoji: "🇲🇦",
    region: "Africa",
    description:
      "Fragrant tagines, couscous, and a harmony of sweet and savoury Moorish spices.",
    photo: "photo-1489424731084-a5d8b06d6f4f",
    dishes: [
      {
        name: "Lamb Tagine",
        description:
          "Slow-cooked lamb with preserved lemon, olives, and saffron in a conical clay pot.",
        photo: "photo-1585937421612-70a008356fbe",
        tags: ["lamb", "slow-cooked", "spiced"],
      },
      {
        name: "Couscous Royal",
        description:
          "Steamed semolina grains topped with a vegetable stew of chickpeas, root veg, and harissa.",
        photo: "photo-1603133872878-684f208fb84b",
        tags: ["vegetarian", "grain", "friday"],
      },
      {
        name: "Pastilla",
        description:
          "Flaky phyllo pie layered with pigeon or chicken, almonds, eggs, and cinnamon sugar.",
        photo: "photo-1476124369491-e7addf5db371",
        tags: ["pastry", "sweet-savoury", "festive"],
      },
      {
        name: "Harira Soup",
        description:
          "Hearty tomato-lentil soup with lamb, chickpeas, and fresh herbs — a traditional Ramadan staple.",
        photo: "photo-1547592166-23ac45744acd",
        tags: ["soup", "lentil", "lamb"],
      },
      {
        name: "Zaalouk",
        description:
          "Smoky roasted aubergine and tomato dip seasoned with cumin, paprika, and preserved lemon.",
        photo: "photo-1546069901-ba9599a7e63c",
        tags: ["dip", "vegan", "smoky"],
      },
      {
        name: "Chebakia",
        description:
          "Rose water-scented sesame pastry fried and drenched in honey — a Ramadan speciality.",
        photo: "photo-1519676867240-f03562e64548",
        tags: ["dessert", "sesame", "sweet"],
      },
    ],
  },
  {
    name: "Ghanaian",
    slug: "ghanaian",
    emoji: "🇬🇭",
    region: "Africa",
    description:
      "Fufu, waakye, and kelewele — Ghana's food is bold, communal, and full of soul.",
    photo: "photo-1567620905732-2d1ec7ab7445",
    dishes: [
      {
        name: "Fufu with Groundnut Soup",
        description:
          "Pounded cassava and plantain served with a rich, smoky peanut-based soup and goat meat.",
        photo: "photo-1476224203421-9ac39bcb3df1",
        tags: ["traditional", "stew", "peanut"],
      },
      {
        name: "Waakye",
        description:
          "Rice and beans cooked together with sorghum leaves, served with stew, spaghetti, and a medley of sides.",
        photo: "photo-1604329760661-e71dc83f8f26",
        tags: ["rice", "beans", "street food"],
      },
      {
        name: "Kelewele",
        description:
          "Diced ripe plantain fried with ginger, hot pepper, and cloves — a popular street snack.",
        photo: "photo-1574782672170-7fd25d622ce6",
        tags: ["snack", "sweet", "spicy"],
      },
      {
        name: "Banku & Okra Soup",
        description:
          "Fermented corn-cassava dough served with a thick okra and seafood soup.",
        photo: "photo-1547592180-85f173990554",
        tags: ["fermented", "seafood", "traditional"],
      },
      {
        name: "Red Red",
        description:
          "Black-eyed pea stew cooked in palm oil with fried plantain — a beloved street food combo.",
        photo: "photo-1544025162-d76694265947",
        tags: ["beans", "palm oil", "vegan"],
      },
      {
        name: "Kontomire Stew",
        description:
          "Cocoyam leaves cooked in palm nut soup with smoked fish and agushi seeds.",
        photo: "photo-1546069901-ba9599a7e63c",
        tags: ["stew", "vegetables", "smoked"],
      },
    ],
  },
  {
    name: "South African",
    slug: "south-african",
    emoji: "🇿🇦",
    region: "Africa",
    description:
      "Braai culture, bobotie, and biltong — a melting pot of bold, diverse flavours.",
    photo: "photo-1544025162-d76694265947",
    dishes: [
      {
        name: "Braai (Barbecue)",
        description:
          "South Africa's sacred fire ritual — boerewors, lamb chops, and sosaties grilled over open flame.",
        photo: "photo-1544025162-d76694265947",
        tags: ["grilled", "social", "meat"],
      },
      {
        name: "Bunny Chow",
        description:
          "A hollowed-out loaf of white bread filled with curry — Durban's iconic street food.",
        photo: "photo-1585937421612-70a008356fbe",
        tags: ["curry", "street food", "bread"],
      },
      {
        name: "Bobotie",
        description:
          "Spiced minced meat baked with an egg custard topping — Cape Malay comfort at its finest.",
        photo: "photo-1563379091339-03b21ab4a4f8",
        tags: ["baked", "spiced", "cape malay"],
      },
      {
        name: "Boerewors Roll",
        description:
          "Juicy coiled South African sausage in a hotdog roll with chakalaka relish and chutney.",
        photo: "photo-1565299585323-38d6b0865b47",
        tags: ["sausage", "street food", "quick"],
      },
      {
        name: "Pap & Wors",
        description:
          "Stiff maize meal porridge served with grilled sausage and a tomato-onion chakalaka.",
        photo: "photo-1603133872878-684f208fb84b",
        tags: ["maize", "traditional", "braai"],
      },
      {
        name: "Malva Pudding",
        description:
          "Sticky, spongy apricot jam cake soaked in a sweet cream sauce — served warm with custard.",
        photo: "photo-1571877227200-a0d98ea607e9",
        tags: ["dessert", "sweet", "baked"],
      },
    ],
  },
];

export const REGION_ORDER = [
  "Africa",
  "Asia",
  "Europe",
  "Americas",
  "Middle East",
] as const;
