export const XI_API_KEY = process.env.NEXT_PUBLIC_XI_API_KEY;

export const addVoice = async (name, audioFile) => {
  try {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('files', audioFile); 

    const res = await fetch(`https://api.elevenlabs.io/v1/voices/add`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "xi-api-key": `${XI_API_KEY}`
      },
      body: formData,
    });

    const { voice_id } = await res.json();
    return voice_id;
  } catch (error) {
    console.error(error);
  }
};
