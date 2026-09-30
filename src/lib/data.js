// Demo data for PlayMix — royalty-free audio (SoundHelix), picsum images, YouTube trailer embeds

const img = (seed, w = 600, h = 400) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const musicTracks = [
  { id: "m1", title: "Midnight Drive", artist: "Neon Skyline", cover: img("music-midnight", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", duration: 372 },
  { id: "m2", title: "Velvet Pulse", artist: "Lunar Echo", cover: img("music-velvet", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", duration: 426 },
  { id: "m3", title: "Chromatic Dreams", artist: "Aurora Wave", cover: img("music-chromatic", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", duration: 348 },
  { id: "m4", title: "Synth Sunset", artist: "Glass Horizon", cover: img("music-sunset", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", duration: 289 },
  { id: "m5", title: "Electric Bloom", artist: "Violet Circuit", cover: img("music-bloom", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", duration: 311 },
  { id: "m6", title: "Deep Current", artist: "Monochrome Sea", cover: img("music-current", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", duration: 395 },
  { id: "m7", title: "Neon Rain", artist: "City Lights", cover: img("music-rain", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", duration: 264 },
  { id: "m8", title: "Gravity Fields", artist: "Stellar Drift", cover: img("music-gravity", 400, 400), src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", duration: 338 },
];

export const galleryCategories = ["Nature", "Animals", "Cities", "Technology", "Art"];

export const galleryImages = [
  { id: "g1", title: "Misty Pines", category: "Nature", url: img("nature-1", 800, 600) },
  { id: "g2", title: "Golden Valley", category: "Nature", url: img("nature-2", 800, 600) },
  { id: "g3", title: "Still Waters", category: "Nature", url: img("nature-3", 800, 600) },
  { id: "g4", title: "Autumn Trail", category: "Nature", url: img("nature-4", 800, 600) },
  { id: "g5", title: "Curious Fox", category: "Animals", url: img("animal-1", 800, 600) },
  { id: "g6", title: "Resting Lion", category: "Animals", url: img("animal-2", 800, 600) },
  { id: "g7", title: "Flight Path", category: "Animals", url: img("animal-3", 800, 600) },
  { id: "g8", title: "Quiet Stare", category: "Animals", url: img("animal-4", 800, 600) },
  { id: "g9", title: "Skyline Glow", category: "Cities", url: img("city-1", 800, 600) },
  { id: "g10", title: "Avenue Lights", category: "Cities", url: img("city-2", 800, 600) },
  { id: "g11", title: "Bridge at Dusk", category: "Cities", url: img("city-3", 800, 600) },
  { id: "g12", title: "Tower District", category: "Cities", url: img("city-4", 800, 600) },
  { id: "g13", title: "Circuit Bloom", category: "Technology", url: img("tech-1", 800, 600) },
  { id: "g14", title: "Data Stream", category: "Technology", url: img("tech-2", 800, 600) },
  { id: "g15", title: "Silicon Path", category: "Technology", url: img("tech-3", 800, 600) },
  { id: "g16", title: "Signal Grid", category: "Technology", url: img("tech-4", 800, 600) },
  { id: "g17", title: "Color Field", category: "Art", url: img("art-1", 800, 600) },
  { id: "g18", title: "Brushstroke", category: "Art", url: img("art-2", 800, 600) },
  { id: "g19", title: "Abstract Form", category: "Art", url: img("art-3", 800, 600) },
  { id: "g20", title: "Gallery Wall", category: "Art", url: img("art-4", 800, 600) },
];

export const movieGenres = ["Action", "Sci-Fi", "Drama", "Thriller", "Animation", "Adventure"];

export const movies = [
  { id: "mv1", title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8, poster: img("movie-inception", 400, 600), backdrop: img("movie-inception-bd", 1280, 720), youtubeId: "YoHD9XIp7fw", description: "A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO." },
  { id: "mv2", title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, poster: img("movie-interstellar", 400, 600), backdrop: img("movie-interstellar-bd", 1280, 720), youtubeId: "zSWdZVtXT7E", description: "A team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable." },
  { id: "mv3", title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0, poster: img("movie-darkknight", 400, 600), backdrop: img("movie-darkknight-bd", 1280, 720), youtubeId: "EXeTwQjrEes", description: "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy and forces the Dark Knight closer to the line between hero and vigilante." },
  { id: "mv4", title: "The Matrix", year: 1999, genre: "Action", rating: 8.7, poster: img("movie-matrix", 400, 600), backdrop: img("movie-matrix-bd", 1280, 720), youtubeId: "vKQi3bBA1y8", description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers." },
  { id: "mv5", title: "Dune", year: 2021, genre: "Adventure", rating: 8.0, poster: img("movie-dune", 400, 600), backdrop: img("movie-dune-bd", 1280, 720), youtubeId: "n9xhJrPXop4", description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset in this adaptation of the seminal sci-fi novel." },
  { id: "mv6", title: "Joker", year: 2019, genre: "Drama", rating: 8.4, poster: img("movie-joker", 400, 600), backdrop: img("movie-joker-bd", 1280, 720), youtubeId: "zAGVQLHvwOY", description: "A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain in Gotham City." },
  { id: "mv7", title: "Parasite", year: 2019, genre: "Thriller", rating: 8.5, poster: img("movie-parasite", 400, 600), backdrop: img("movie-parasite-bd", 1280, 720), youtubeId: "5xHhHJ3Ce58", description: "A poor family schemes to become employed by a wealthy family by infiltrating their household one by one, with unexpected consequences." },
  { id: "mv8", title: "Spider-Man: No Way Home", year: 2021, genre: "Action", rating: 8.2, poster: img("movie-spiderman", 400, 600), backdrop: img("movie-spiderman-bd", 1280, 720), youtubeId: "JfVOs4VSpmM", description: "With his identity exposed, Peter Parker asks Doctor Strange for help — but a spell tears open the multiverse and unleashes familiar foes." },
  { id: "mv9", title: "Avatar", year: 2009, genre: "Adventure", rating: 7.9, poster: img("movie-avatar", 400, 600), backdrop: img("movie-avatar-bd", 1280, 720), youtubeId: "5PSNL1qE6VY", description: "A paraplegic marine dispatched to the moon Pandora becomes torn between following orders and protecting the world he feels is his home." },
  { id: "mv10", title: "Up", year: 2009, genre: "Animation", rating: 8.3, poster: img("movie-up", 400, 600), backdrop: img("movie-up-bd", 1280, 720), youtubeId: "ORFW9a_YwPI", description: "An elderly widower fulfills a lifelong dream by tying balloons to his house and flying to South America, with an unexpected stowaway aboard." },
  { id: "mv11", title: "Mad Max: Fury Road", year: 2015, genre: "Action", rating: 8.1, poster: img("movie-madmax", 400, 600), backdrop: img("movie-madmax-bd", 1280, 720), youtubeId: "YWNWiZWL8Rc", description: "In a post-apocalyptic wasteland, a drifter and a fugitive rebel against a tyrant in a high-octane chase across the desert." },
  { id: "mv12", title: "WALL·E", year: 2008, genre: "Animation", rating: 8.4, poster: img("movie-walle", 400, 600), backdrop: img("movie-walle-bd", 1280, 720), youtubeId: "alIqIdg0AWI", description: "A lone robot on a future Earth discovers a new purpose when he meets a sleek probe and follows her across the galaxy." },
];

export const games = [
  { id: "tictactoe", title: "Tic-Tac-Toe", icon: "Grid3x3", desc: "Classic 3-in-a-row duel.", accent: "purple" },
  { id: "rps", title: "Rock Paper Scissors", icon: "Hand", desc: "Beat the AI in quick rounds.", accent: "blue" },
  { id: "memory", title: "Memory Cards", icon: "LayoutGrid", desc: "Flip and match the pairs.", accent: "pink" },
  { id: "number_guess", title: "Number Guessing", icon: "Hash", desc: "Find the secret number fast.", accent: "purple" },
  { id: "quiz", title: "Quiz Challenge", icon: "HelpCircle", desc: "Test your trivia reflexes.", accent: "blue" },
];

export const quizQuestions = [
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
  { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
  { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: 2 },
  { q: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Gd", "Go"], answer: 0 },
  { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
  { q: "Which language is primarily used for web styling?", options: ["HTML", "Python", "CSS", "Java"], answer: 2 },
  { q: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
  { q: "Which instrument has 88 keys?", options: ["Guitar", "Piano", "Harp", "Violin"], answer: 1 },
  { q: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Bangkok", "Tokyo"], answer: 3 },
  { q: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
];