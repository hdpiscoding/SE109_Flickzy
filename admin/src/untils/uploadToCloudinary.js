export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "flickzy");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dwye9udip/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const result = await res.json();
  if (result.secure_url) return result.secure_url;
  throw new Error(result.error?.message || "Upload failed");
};
