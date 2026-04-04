const gamesData = [
  {
    id: 1,
    name: "Honor of Kings",
    image: "/Game asset/Honorofkings.jpg",
    description:
      "A fast-paced mobile MOBA where players battle in teams using unique heroes. Known for its competitive gameplay and massive esports scene in China.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20fast-paced%20mobile%20MOBA%20where%20players%20battle%20in%20teams%20using%20unique%20heroes.%20Known%20for%20its%20competitive%20gameplay%20and%20massive%20esports%20scene%20in%20China.",
    price: 20,
  },
  {
    id: 2,
    name: "PUBG Mobile (Game for Peace)",
    image: "/Game asset/pubg-combat-4k-qpsj99bev5m4d206.jpg",
    description:
      "A battle royale shooter where 100 players fight to survive on a shrinking map. Realistic combat and strategy make it one of the most popular mobile games.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20battle%20royale%20shooter%20where%20100%20players%20fight%20to%20survive%20on%20a%20shrinking%20map.%20Realistic%20combat%20and%20strategy%20make%20it%20one%20of%20the%20most%20popular%20mobile%20games.",
    price: 30,
  },
  {
    id: 3,
    name: "Genshin Impact",
    image: "/Game asset/genshin-impact-game-poster-wlq3ykrxbaoadjow.jpg",
    description:
      "An open-world RPG with anime-style visuals and elemental combat system. Players explore a vast world filled with quests, puzzles, and characters.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=An%20open-world%20RPG%20with%20anime-style%20visuals%20and%20elemental%20combat%20system.%20Players%20explore%20a%20vast%20world%20filled%20with%20quests,%20puzzles,%20and%20characters.",
    price: 50,
  },
  {
    id: 4,
    name: "League of Legends",
    image: "/Game asset/leaugeoflegends.jpg",
    description:
      "A competitive MOBA where teams of champions battle to destroy the enemy base. It has one of the largest esports scenes in the world.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20competitive%20MOBA%20where%20teams%20of%20champions%20battle%20to%20destroy%20the%20enemy%20base.%20It%20has%20one%20of%20the%20largest%20esports%20scenes%20in%20the%20world.",
    price: 19,
  },
  {
    id: 5,
    name: "CrossFire",
    image: "/Game asset/crossfire.jpg",
    description:
      "A classic first-person shooter focused on team-based combat missions. Widely popular in internet cafes across Asia.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20classic%20first-person%20shooter%20focused%20on%20team-based%20combat%20missions.%20Widely%20popular%20in%20internet%20cafes%20across%20Asia.",
    price: 44,
  },
  {
    id: 6,
    name: "Naraka: Bladepoint",
    image: "/Game asset/naraka.jpg",
    description:
      "A unique battle royale combining martial arts and melee combat mechanics. Features fast movement, grappling, and intense duels.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20unique%20battle%20royale%20combining%20martial%20arts%20and%20melee%20combat%20mechanics.%20Features%20fast%20movement,%20grappling,%20and%20intense%20duels.",
    price: 20,
  },
  {
    id: 7,
    name: "Dungeon & Fighter: Origins",
    image: "/Game asset/dunfire dnf.jpg",
    description:
      "A side-scrolling action RPG with combo-heavy combat and dungeon exploration. Known for its nostalgic gameplay and strong progression system.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20side-scrolling%20action%20RPG%20with%20combo-heavy%20combat%20and%20dungeon%20exploration.%20Known%20for%20its%20nostalgic%20gameplay%20and%20strong%20progression%20system.",
    price: 30,
  },
  {
    id: 8,
    name: "QQ Speed Mobile",
    image: "/Game asset/qq.jpg",
    description:
      "An arcade racing game featuring high-speed drifting and colorful tracks. Popular for its competitive multiplayer racing modes.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=An%20arcade%20racing%20game%20featuring%20high-speed%20drifting%20and%20colorful%20tracks.%20Popular%20for%20its%20competitive%20multiplayer%20racing%20modes.",
    price: 50,
  },
  {
    id: 9,
    name: "Identity V",
    image: "/Game asset/identity v.jpg",
    description:
      "A gothic horror survival game where players act as hunters or survivors. Unique art style and asymmetric gameplay make it stand out.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20gothic%20horror%20survival%20game%20where%20players%20act%20as%20hunters%20or%20survivors.%20Unique%20art%20style%20and%20asymmetric%20gameplay%20make%20it%20stand%20out.",
    price: 19,
  },
  {
    id: 10,
    name: "Teamfight Tactics (Golden Spatula)",
    image: "/Game asset/teamlight tactics.jpg",
    description:
      "An auto-battler strategy game where players build teams and compete tactically. Success depends on planning, positioning, and synergy.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=An%20auto-battler%20strategy%20game%20where%20players%20build%20teams%20and%20compete%20tactically.%20Success%20depends%20on%20planning,%20positioning,%20and%20synergy.",
    price: 44,
  },
  {
    id: 11,
    name: "Call of Duty: Mobile",
    image: "/Game asset/call of duty.jpg",
    description:
      "A fast-paced FPS offering multiplayer and battle royale modes. Combines classic Call of Duty gameplay with mobile accessibility.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20fast-paced%20FPS%20offering%20multiplayer%20and%20battle%20royale%20modes.%20Combines%20classic%20Call%20of%20Duty%20gameplay%20with%20mobile%20accessibility.",
    price: 20,
  },
  {
    id: 12,
    name: "Honkai: Star Rail",
    image: "/Game asset/honkai star rail.jpg",
    description:
      "A turn-based RPG set in a sci-fi universe with rich storytelling. Features strategic combat and beautifully designed characters.",
    audio:
      "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=A%20turn-based%20RPG%20set%20in%20a%20sci-fi%20universe%20with%20rich%20storytelling.%20Features%20strategic%20combat%20and%20beautifully%20designed%20characters.",
    price: 30,
  },
];

export default gamesData;