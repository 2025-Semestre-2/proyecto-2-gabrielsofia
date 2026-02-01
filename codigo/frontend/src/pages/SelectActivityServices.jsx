import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

export default function SelectListingDetails() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+506");
  const [legalId, setLegalId] = useState("");

  const [socials, setSocials] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    x: "",
  });

  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (photos.length + files.length > 3) return;

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid =
    title.trim().length > 3 &&
    description.trim().length > 10 &&
    Number(price) > 0 &&
    contactName.trim().length > 2 &&
    email.includes("@") &&
    phone.length >= 8 &&
    legalId.length >= 9 &&
    photos.length === 3;

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-6 border-b">
        <h1 className="font-bold text-2xl text-[#99BFA1]">LimonT&H</h1>
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <FaTimes className="text-xl text-gray-600" />
        </button>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 w-full px-6 md:px-12 lg:px-20 py-10">
        <div className="w-full">
          <div className="bg-white rounded-2xl border shadow-sm p-6 md:p-10 w-full">
            {/* TÍTULO */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Terminemos con unos últimos detalles :D
              </h2>
              <p className="text-gray-600">
                Esta información se usará para promover tu actividad
              </p>
            </div>

            <div className="space-y-12">
              {/* NOMBRE + PRECIO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Nombre de tu empresa de actividades
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border px-5 py-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Precio por persona (₡)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-xl border px-5 py-4"
                  />
                </div>
              </div>

              {/* DESCRIPCIÓN */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Descripción
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border px-5 py-4 resize-none"
                />
              </div>

              {/* CONTACTO */}
              <div className="pt-10 border-t space-y-8">
                <h3 className="text-2xl font-bold text-center">
                  Datos de contacto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Persona de contacto
                    </label>
                    <input
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-xl border px-5 py-4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border px-5 py-4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Teléfono
                    </label>
                    <div className="flex gap-3">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-28 rounded-xl border px-3 py-4 bg-gray-50"
                      >
                        <option value="+506">+506</option>
                      </select>

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ""))
                        }
                        className="flex-1 rounded-xl border px-5 py-4"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Cédula jurídica
                    </label>
                    <input
                      value={legalId}
                      onChange={(e) =>
                        setLegalId(e.target.value.replace(/\D/g, ""))
                      }
                      className="w-full rounded-xl border px-5 py-4"
                    />
                  </div>
                </div>
              </div>

              {/* REDES */}
              <div className="pt-10 border-t">
                <h3 className="text-xl font-bold mb-6 text-center">
                  Redes sociales
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(socials).map(([key]) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold mb-2 capitalize">
                        {key}
                      </label>
                      <input
                        value={socials[key]}
                        onChange={(e) =>
                          setSocials({ ...socials, [key]: e.target.value })
                        }
                        className="w-full rounded-xl border px-5 py-4"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* FOTOS */}
              <div className="pt-10 border-t">
                <label className="block text-sm font-semibold mb-4">
                  Fotos de la actividad (3)
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative h-40 rounded-xl overflow-hidden border"
                    >
                      <img
                        src={photo.preview}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  ))}

                  {photos.length < 3 && (
                    <label className="h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer text-gray-400">
                      <FaPlus className="text-2xl" />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* BOTONES */}
            <div className="flex justify-center gap-6 mt-16">
              <button
                onClick={() => navigate(-1)}
                className="px-10 py-4 rounded-2xl font-bold bg-gray-200 text-gray-600"
              >
                ← Atrás
              </button>

              <button
                disabled={!isValid}
                className={`px-14 py-4 rounded-2xl font-bold transition ${
                  isValid
                    ? "bg-gradient-to-r from-[#99BFA1] to-[#8BB593] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Terminar la publicacion
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
