const Song = require('./Song.js');

class Station {
  /**
   * @param {Client} client The client that initiated this station.
   * @param {Object} raw The raw data from the API.
   */
  constructor(client, raw) {
    /**
     * The client that initiated this station.
     * @type {Client}
     */
    this.client = client;

    /**
     * This station's ID.
     * @type {string}
     */
    this.id = raw.stationId;

    /**
     * The internal Factory Pandora ID.
     * @type {string}
     */
    this.factoryId = raw.stationFactoryPandoraId;

    /**
     * This internal Pandora ID.
     * @type {string}
     */
    this.pandoraId = raw.pandoraId;

    /**
     * @typedef StationArt
     * @property {String} url The URL for this art.
     * @property {number} size The size in pixels of this art.
     */
    /**
     * The station art.
     * @type {Array<StationArt>}
     */
    this.art = raw.art;

    /**
     * The date this station was created.
     * @type {date}
     */
    this.created = new Date(raw.dateCreated);

    /**
     * The date this station was last played.
     * @type {date}
     */
    this.lastPlayed = new Date(raw.lastPlayed);

    /**
     * Whether or not this is a new station.
     * @type {boolean}
     */
    this.isNew = raw.isNew;

    /**
     * Whether or not the user is allowed to
     * delete this station.
     * @type {boolean}
     */
    this.deletingAllowed = raw.allowDelete;

    /**
     * Whether or not the user is allowed to
     * rename this station.
     * @type {boolean}
     */
    this.renamingAllowed = raw.allowRename;

    /**
     * Whether or not the user is allowed to
     * set the description of this station.
     * @type {boolean}
     */
    this.editingAllowed = raw.allowEditDescription;

    /**
     * Whether or not the user is allowed to
     * add a seed to this station.
     * @type {boolean}
     */
    this.seedingAllowed = raw.allowAddSeed;

    /**
     * Whether or not this station is shared with
     * other people.
     * @type {boolean}
     */
    this.shared = raw.isShared;

    /**
     * Whether or nor the user is allowed to
     * transform this station.
     * @type {boolean}
     */
    this.transformingAllowed = raw.isTransformAllowed;

    /**
     * Whether or not this station is on demand
     * for editorials. (?)
     * @type {boolean}
     */
    this.isOnDemandEditorial = raw.isOnDemandEditorialStation;

    /**
     * Whether or not this station is for
     * advertisers. (?)
     * @type {boolean}
     */
    this.advertiser = raw.isAdvertiser;

    /**
     * Whether or not the user is allowed to
     * shuffle this station.
     * @type {boolean}
     */
    this.suffleAllowed = raw.canShuffleStation;

    /**
     * Whether or not the user is allowed to
     * automatically share this station. (?)
     * @type {boolean}
     */
    this.autoSharingAllowed = raw.canAutoshare;

    /**
     * The advertising key for this station.
     * @type {string}
     */
    this.advertisingKey = raw.advertisingKey;

    /**
     * Whether or not artist audio messages are
     * enabled for this station.
     * @type {boolean}
     */
    this.artistMessages = raw.isArtistMessagesEnabled;

    /**
     * Whether or not this station is the user's
     * thumbprint radio.
     * @type {boolean}
     */
    this.thumbprint = raw.isThumbprint;

    /**
     * Whether or not this station is on shuffle
     * mode. (?)
     * @type {boolean}
     */
    this.shuffle = raw.isShuffle;

    /**
     * The genre(s) that this station is classified
     * under.
     * @type {Array<String>}
     */
    this.genres = raw.genre;

    /**
     * The sponsorship for this genre. (?)
     * @type {String}
     */
    this.genreSponsorship = raw.genreSponsorship;

    /**
     * The genre for the advertisements. (?)
     * @type {String}
     */
    this.adGenre = raw.adGenre;

    /**
     * (?)
     * @type {boolean}
     */
    this.antiTarget = raw.antiTarget;

    /**
     * The initial seed for this station.
     * @type {Object}
     */
    this.initialSeed = {

      /**
       * The music id for this seed. (?)
       * @type {String}
       */
      musicId: raw.initialSeed.musicId,

      /**
       * The pandora id for this seed.
       * @type {String}
       */
      pandoraId: raw.initialSeed.pandoraId
    };

    /**
     * Look, adkv is back. For all your adkv needs.
     * @type {Object}
     */
    this.adkv = {

      /**
       * The artist for this adkv.
       * @type {String}
       */
      artist: raw.adkv.artist,

      /**
       * The genre for this adkv.
       * @type {String}
       */
      genre: raw.adkv.genre,

      /**
       * Whether or not this adkv is clean. (?)
       * @type {string}
       */
      clean: raw.adkv.clean,

      /**
       * Green Cats. Maybe? (?)
       * @type {String}
       */
      gcat: raw.adkv.gcat
    };


    /**
     * The username of the user who made this
     * station.
     * @type {string}
     */
    this.creatorUsername = raw.creatorWebname;

    /**
     * The ID for the art of this station.
     * @type {string}
     */
    this.artId = raw.artId;
  }

  /**
   * Returns a list of songs to play.
   * @param {boolean} isStationStart Whether or not this is the first time requested for songs from this station.
   * @param {Object} options
   * @param {String} options.audioFormat The audioURL return format.
   * @returns {Promise<Array<Song>>}
   */
  async getSongList(isStationStart, options = {}) {
    const list = await this.client.rest.playlistGetFragment(this.id, isStationStart, options);
    const rSongs = [];
    for (let i = 0; i < list.tracks.length; i++) {
      rSongs.push(new Song(this.client, this, list.tracks[i]));
    }
    return rSongs;
  }
}

module.exports = Station;