import axios from 'axios'

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

export const generateTextToSpeech = async (voice_id, text) => {
  try {
    const options = {
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      headers: {
        accept: 'audio/mpeg', 
        'content-type': 'application/json', 
        'xi-api-key': `${XI_API_KEY}`,
      },
      data: {
        text: text, 
      },
      responseType: 'arraybuffer'
    };
  
    const speechDetails = await axios.request(options);
  
    return speechDetails.data;
  } catch (error) {
    console.error(error)
  }
};