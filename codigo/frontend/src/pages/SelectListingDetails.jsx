import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";

export default function SelectListingDetails() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [socials, setSocials] = useState({
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    x: "",
  });

  const [phones, setPhones] = useState([
    { countryCode: "+506", number: "" },
    { countryCode: "+506", number: "" },
  ]);

  const [legalId, setLegalId] = useState("");
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
    photos.length === 3;

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 border-b">
        <h1 className="font-bold text-2xl text-[#99BFA1]">LimonT&H</h1>
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <FaTimes className="text-xl text-gray-600" />
        </button>
      </header>

      {/* CONTENIDO */}
      <main className="flex-1 flex justify-center py-10 overflow-auto">
        <div className="w-full max-w-xl px-6">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Terminemos con unos últimos detalles :D
          </h2>
          <p className="text-gray-500 mb-10 text-center">
            Esta información se usará para promover tu alojamiento
          </p>

          <div className="space-y-6">
            {/* NOMBRE */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Nombre del alojamiento
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
              />
            </div>

            {/* PRECIO */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Precio por noche (₡)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
              />
            </div>

            {/* DESCRIPCIÓN */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Descripción
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
              />
            </div>

            {/* DATOS PARA PUBLICACIÓN */}
            <div className="pt-8 border-t">
              <h3 className="text-xl font-bold mb-6 text-center">
                Datos para crear tu publicación
              </h3>

              {/* REDES SOCIALES */}
              <div className="space-y-3 mb-8">
                {[
                  { key: "facebook", label: "Facebook" },
                  { key: "instagram", label: "Instagram" },
                  { key: "youtube", label: "YouTube" },
                  { key: "tiktok", label: "TikTok" },
                  { key: "x", label: "X (Twitter)" },
                ].map((s) => (
                  <div key={s.key}>
                    <label className="block text-xs font-medium mb-1">
                      {s.label}
                    </label>
                    <input
                      value={socials[s.key]}
                      onChange={(e) =>
                        setSocials({ ...socials, [s.key]: e.target.value })
                      }
                      className="w-full rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:ring-[#99BFA1]"
                    />
                  </div>
                ))}
              </div>

              {/* TELÉFONOS */}
              <div className="space-y-4 mb-8">
                <p className="text-sm text-gray-500 mb-3">
                  Ingrese dos números para contactar
                </p>

                {phones.map((phone, index) => (
                  <div key={index} className="flex gap-3">
                    <select
                      value={phone.countryCode}
                      onChange={(e) => {
                        const copy = [...phones];
                        copy[index].countryCode = e.target.value;
                        setPhones(copy);
                      }}
                      className="rounded-lg border px-2 py-2 text-sm"
                    >
                      <option value="+506">🇨🇷 +506</option>
                    </select>

                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Número de teléfono"
                      value={phone.number}
                      onChange={(e) => {const onlyNumbers = e.target.value.replace(/\D/g, "");
                      const copy = [...phones];
                      copy[index].number = onlyNumbers;
                      setPhones(copy);}}
                      className="flex-1 rounded-xl border px-3 py-2 text-sm focus:ring-2 focus:ring-[#99BFA1]"
                    />
                  </div>
                ))}
              </div>

              {/* CÉDULA */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Cédula jurídica
                </label>
                <input
                  value={legalId}
                  onChange={(e) => setLegalId(e.target.value)}
                  className="w-full rounded-xl border px-5 py-4 focus:ring-2 focus:ring-[#99BFA1]"
                />
              </div>
            </div>

            {/* FOTOS */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Fotos del alojamiento (mínimo 3)
              </label>

              <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-full h-28 rounded-xl overflow-hidden border"
                  >
                    <img
                      src={photo.preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}

                {photos.length < 3 && (
                  <label className="w-full h-28 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[#99BFA1]">
                    <FaPlus className="text-xl mb-1" />
                    <span className="text-xs">Agregar foto</span>
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
          <div className="flex justify-center gap-6 mt-12">
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-4 rounded-2xl font-bold bg-gray-200 text-gray-600"
            >
              ← Atrás
            </button>

            <button
              disabled={!isValid}
              onClick={() => navigate("/registro/hospedaje/resumen")}
              className={`px-14 py-4 rounded-2xl font-bold transition-all ${
                isValid
                  ? "bg-gradient-to-r from-[#99BFA1] to-[#8BB593] text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Crear anuncio
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
