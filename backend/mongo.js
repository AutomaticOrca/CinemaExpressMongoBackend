const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin1220@cluster0.uu1yaxt.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getArtists(req, res, next) {
  let artists;

  try {
    await client.connect();
    const db = client.db("MusicDB");
    artists = await db.collection("artists").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve artists. :(" });
  }
  client.close();

  res.json(artists);
}

async function createArtist(req, res, next) {
  const newArtist = {
    name: req.body.name,
    genre: req.body.genre,
    albums: req.body.albums,
  };

  try {
    await client.connect();
    const db = client.db("MusicDB");
    const result = await db.collection("artists").insertOne(newArtist);
    console.log("Artist created: ", result);
  } catch (error) {
    return res.json({ message: "Could not store data." });
  } finally {
    await client.close();
  }

  res.json(newArtist);
}

async function getTracks(req, res, next) {
  let tracks;

  try {
    await client.connect();
    const db = client.db("MusicDB");
    tracks = await db.collection("tracks").find().toArray();
  } catch (error) {
    return res.json({ message: "Could not retrieve tracks. :(" });
  }
  client.close();

  res.json(tracks);
}

const createTrack = async (req, res, next) => {
  const newTrack = {
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    duration: req.body.duration,
  };

  try {
    await client.connect();
    const db = client.db("MusicDB");
    const artistsCollection = db.collection("tracks");
    const result = await artistsCollection.insertOne(newTrack);
    console.log("Track created: ", result);
  } catch (error) {
    console.error("Create Track Error: ", error);
  } finally {
    await client.close();
  }
};

exports.getArtists = getArtists;
exports.createArtist = createArtist;
exports.getTracks = getTracks;
exports.createTrack = createTrack;
