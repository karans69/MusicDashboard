import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { FaUser } from "react-icons/fa";
import axios from "axios";

const TrackUploadPage = () => {
  const URL = "https://musicdashboard.onrender.com";

  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    lline: "",
    cline: "",
    producer: "",
    engineer: "",
    musicians: "",
    others: "",
    recording: "",
    upc: "",
    format: "",
    albumName: "",
    lyricsLanguage: "",
    artist: "",
    labels: "",
    featuring: "",
    isrc: "",
    releaseDate: "",
    revenu: "0",
  });

  const [authors, setAuthors] = useState([{ firstName: "", lastName: "" }]);
  const [composers, setComposers] = useState([{ firstName: "", lastName: "" }]);

  const handleMultiFieldChange = (setter, index, field) => (e) =>
    setter((prev) => {
      const arr = [...prev];
      arr[index][field] = e.target.value;
      return arr;
    });

  const addAuthor = () =>
    setAuthors((prev) => [...prev, { firstName: "", lastName: "" }]);
  const addComposer = () =>
    setComposers((prev) => [...prev, { firstName: "", lastName: "" }]);

  const [artwork, setArtwork] = useState(null);
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");
  const artworkRef = useRef();
  const audioRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = (setter, refSetter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
    }
  };

  const validateFields = () => {
    const requiredFields = ["title", "genre", "lline", "cline", "releaseDate"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setMessage(`❌ Please fill out: ${field}`);
        return false;
      }
    }
    if (!artwork || !audio) {
      setMessage("❌ Please upload both artwork and audio file");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateFields()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not logged in");
      return;
    }

    const trackForm = new FormData();
    trackForm.append("title", formData.title);
    trackForm.append("genre", formData.genre);
    trackForm.append("lline", formData.lline);
    trackForm.append("cline", formData.cline);
    trackForm.append("upc", formData.upc);
    trackForm.append("format", formData.format);
    trackForm.append("albumName", formData.albumName);
    trackForm.append("language", formData.lyricsLanguage);
    trackForm.append("artist", formData.artist);
    trackForm.append("labels", formData.labels);
    trackForm.append("featuring", formData.featuring);
    trackForm.append("isrc", formData.isrc);
    trackForm.append("producers", formData.producer); // ✅ fixed name
    trackForm.append("engineers", formData.engineer); // ✅ fixed name
    trackForm.append("musicians", formData.musicians);
    trackForm.append("otherContributors", formData.others); // ✅ fixed name
    trackForm.append("recordingDetails", formData.recording); // ✅ fixed name
    trackForm.append("releaseDate", formData.releaseDate);
    trackForm.append("artwork", artwork);
    trackForm.append("audio", audio);
    trackForm.append("authors", JSON.stringify(authors));
    trackForm.append("composers", JSON.stringify(composers));
    trackForm.append("revenu", formData.revenu);

    try {
      const res = await axios.post(`${URL}/api/tracks/upload`, trackForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Track uploaded successfully!");
      // Clear form after success
      setFormData({
        title: "",
        genre: "",
        lline: "",
        cline: "",
        upc: "",
        artist: "",
        producer: "",
        engineer: "",
        musicians: "",
        others: "",
        recording: "",
        releaseDate: "",
        revenu: "0",
      });
      setArtwork(null);
      setAudio(null);
      setAuthors([{ firstName: "", lastName: "" }]);
      setComposers([{ firstName: "", lastName: "" }]);
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Releases" />

      <main className="flex-1 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto space-y-6"
        >
          <h2 className="text-2xl font-semibold">Upload New Track</h2>
          {message && <p className="text-red-600 text-sm">{message}</p>}

          <input
            id="title"
            placeholder="Track Title *"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Genre *</option>
            <option>Pop</option>
            <option>Rock</option>
            <option>Hip-hop</option>
            <option>Jazz</option>
            <option> African</option>
            <option> Alternative</option>
            <option> Ambient</option>
            <option> Americana</option>
            <option> Big Band</option>
            <option> Blues</option>
            <option> Children's Music</option>
            <option> Christian/Gospel </option>
            <option>Classical Crossover</option>
            <option> Comedy</option>
            <option> Country</option>
            <option> Dance</option>
            <option> Electronic</option>
            <option> Fitness & Workout </option>
            <option>Folk </option>
            <option> French Pop</option>
            <option> German Folk</option>
            <option> German Pop</option>
            <option> Heavy Metal</option>
            <option> Hip Hop/Rap </option>
            <option> Holiday </option>
            <option> Indian</option>
            <option> Instrumental</option>
            <option> J Pop</option>
            <option> Jazz</option>
            <option> K Pop </option>
            <option> Karaoke </option>
            <option>Latin </option>
            <option> New Age</option>
            <option> Pop</option>
            <option> R&B/Soul</option>
            <option> Reggae</option>
            <option> Rock </option>
            <option> Singer/Songwriter</option>
            <option> Soundtrack</option>
            <option> Spoken Word</option>
            <option> Vocal</option>
            <option> World</option>
          </select>

          {/* Copyrights */}
          <input
            id="lline"
            placeholder="Ⓛline *"
            value={formData.lline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            id="cline"
            placeholder="©line *"
            value={formData.cline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            id="upc"
            placeholder="UPC (optional)"
            value={formData.upc}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            id="format"
            value={formData.format}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Format*</option>
            <option value="Single">Single</option>
            <option value="Album">Album</option>
          </select>

          <input
            id="albumName"
            placeholder="Album Name *"
            value={formData.albumName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Author Details */}
          <div>
            <h3 className="font-semibold">Author Details*</h3>
            {authors.map((author, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={author.firstName}
                  onChange={handleMultiFieldChange(
                    setAuthors,
                    index,
                    "firstName"
                  )}
                  className="w-1/2 border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={author.lastName}
                  onChange={handleMultiFieldChange(
                    setAuthors,
                    index,
                    "lastName"
                  )}
                  className="w-1/2 border p-2 rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAuthor}
              className="mt-2 bg-black text-white w-full p-2 rounded"
            >
              + Add New Author
            </button>
          </div>

          <label
            className="block text-sm font-medium mb-1"
            htmlFor="releaseTitle"
          >
            Language <span className="text-red-500">*</span>
          </label>

          <select
            id="lyricsLanguage"
            value={formData.lyricsLanguage}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="English">English</option>
            <option value="Dutch">Dutch</option>
            <option value="German">German</option>
            <option value="Finnish">Finnish</option>
            <option value="French">French</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Norwegian">Norwegian</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Spanish">Spanish</option>
            <option value="Swedish">Swedish</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="Arabic">Arabic</option>
            <option value="Assamese">Assamese (অসমীয়া)</option>
            <option value="Rajbanshi">Rajbanshi (রাজবংশী)</option>
            <option value="Bengali">Bengali (বাংলা)</option>
            <option value="Bhojpuri">Bhojpuri</option>
            <option value="Bodo">Bodo</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="yue-Hant">yue-Hant</option>
            <option value="Catalan">Catalan</option>
            <option value="Chinese (Simplified)">Chinese (Simplified)</option>
            <option value="Chinese (Traditional)">Chinese (Traditional)</option>
            <option value="Croatian">Croatian</option>
            <option value="Czech">Czech</option>
            <option value="Danish">Danish</option>
            <option value="Dogri">Dogri</option>
            <option value="Estonian">Estonian</option>
            <option value="Fijian">Fijian</option>
            <option value="Garo">Garo</option>
            <option value="Greek">Greek</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Haitian Creole">Haitian/Haitian Creole</option>
            <option value="Hebrew">Hebrew</option>
            <option value="Hindi">Hindi</option>
            <option value="Hungarian">Hungarian</option>
            <option value="Icelandic">Icelandic</option>
            <option value="Igbo">Igbo</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Irish">Irish</option>
            <option value="Kannada">Kannada</option>
            <option value="Kashmiri">Kashmiri</option>
            <option value="Kazakh">Kazakh</option>
            <option value="Khasi">Khasi</option>
            <option value="Kok Borok">Kok Borok</option>
            <option value="Konkani">Konkani</option>
            <option value="Korean">Korean</option>
            <option value="Kurdish">Kurdish</option>
            <option value="Kutchi">Kutchi</option>
            <option value="Kyrgyz">Kyrgyz</option>
            <option value="Lao">Lao</option>
            <option value="Latin">Latin</option>
            <option value="Latvian">Latvian</option>
            <option value="Lingala">Lingala</option>
            <option value="Lithuanian">Lithuanian</option>
            <option value="Maithili">Maithili</option>
            <option value="Malay">Malay</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Manipuri">Manipuri</option>
            <option value="Maori">Maori</option>
            <option value="Marathi">Marathi</option>
            <option value="Mizo">Mizo</option>
            <option value="Nepali">Nepali</option>
            <option value="Oriya">Oriya</option>
            <option value="Punjabi">Panjabi/Punjabi</option>
            <option value="Persian">Persian</option>
            <option value="Polish">Polish</option>
            <option value="Romanian">Romanian</option>
            <option value="Russian">Russian</option>
            <option value="Sanskrit">Sanskrit</option>
            <option value="Santali">Santali</option>
            <option value="Sindhi">Sindhi</option>
            <option value="Slovak">Slovak</option>
            <option value="Slovenian">Slovenian</option>
            <option value="Somali">Somali</option>
            <option value="Swahili">Swahili</option>
            <option value="Tagalog">Tagalog</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Thai">Thai</option>
            <option value="Tsonga">Tsonga</option>
            <option value="Tulu">Tulu</option>
            <option value="Turkish">Turkish</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Urdu">Urdu</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Wolof">Wolof</option>
            <option value="Yoruba">Yoruba</option>
            <option value="Zulu">Zulu</option>
          </select>

          <input
            id="artist"
            placeholder="Artist *"
            value={formData.artist}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            id="labels"
            placeholder="Add Labels *"
            value={formData.labels}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            id="featuring"
            placeholder="Add Featuring"
            value={formData.featuring}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Composer Section */}
          <div>
            <h3 className="font-semibold">Composer Details*</h3>
            {composers.map((composer, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={composer.firstName}
                  onChange={handleMultiFieldChange(
                    setComposers,
                    index,
                    "firstName"
                  )}
                  className="w-1/2 border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={composer.lastName}
                  onChange={handleMultiFieldChange(
                    setComposers,
                    index,
                    "lastName"
                  )}
                  className="w-1/2 border p-2 rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addComposer}
              className="mt-2 bg-black text-white w-full p-2 rounded"
            >
              + Add New Composer
            </button>
          </div>

          <input
            id="isrc"
            placeholder="ISRC (optional)"
            value={formData.isrc}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          {/* Artwork Upload */}
          <div
            onClick={() => artworkRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer"
          >
          
            <input
              type="file"
              accept="image/*"
              ref={artworkRef}
              onChange={handleFileUpload(setArtwork)}
              className="hidden"
            />
            <p className="text-gray-500">
              {artwork ? artwork.name : "Click to upload artwork"}
            </p>
          </div>

          {/* Audio Upload */}
          <div
            onClick={() => audioRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer"
          >
            <input
              type="file"
              accept="audio/*"
              ref={audioRef}
              onChange={handleFileUpload(setAudio)}
              className="hidden"
            />
            <p className="text-gray-500">
              {audio ? audio.name : "Click to upload audio file"}
            </p>
          </div>

          {/* Extra Metadata */}
          <input
            id="producer"
            placeholder="Producer(s)"
            value={formData.producer}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            id="engineer"
            placeholder="Engineer(s)"
            value={formData.engineer}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            id="musicians"
            placeholder="Musicians/Performers"
            value={formData.musicians}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            id="others"
            placeholder="Other Contributors"
            value={formData.others}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            id="recording"
            placeholder="Recording Details"
            value={formData.recording}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows={3}
          />
          <input
            type="date"
            id="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition active:scale-95"
          >
            Finish Upload
          </button>
          {message && <p className="text-red-600 text-sm">{message}</p>}
        </form>
      </main>

      <aside className="w-64 bg-white shadow-2xl rounded-2xl p-6 z-20 hidden lg:block">
        <div className="flex justify-end mb-4">
          <FaUser className="text-2xl" />
        </div>
        <hr className="mb-4" />
        <h1 className="text-xl font-semibold mb-4">Notices</h1>
        <div className="bg-gray-100 p-3 rounded-lg">
          <strong className="block">🎧 Reminder</strong>
          <p className="text-xs text-gray-600">
            Upload high-quality audio and proper artwork.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default TrackUploadPage;
