import { useState } from "react";

const AudioTranscribe = () => {
  const [loading, setLoading] = useState(false);
  const [generatedTranslation, setGeneratedTranslation] = useState("");
  const [selectedFile, setselectedFile] = useState();

  const url = "https://api.openai.com/v1/audio/transcriptions";

  const transcribe = async () => {
    const formData = new FormData();
    if (selectedFile){
      formData.append('file', selectedFile);
    }
    formData.append("model", "whisper-1");
    formData.append("response_format", "verbose_json");
    
    const headers = new Headers();
    headers.append("Authorization", "Bearer" + process.env.OPENAI_API_KEY);

    return fetch(url, {
      method: "POST",
      body: formData,
      headers: headers
    })
    .then((response) => response.json())
    .catch((error) => {console.error(error); 
    });
  }
  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file){
      setselectedFile(file);
    }

  }

  // return(
  //   <div>
  //     <p>Upload Audio File</p>
  //     <input type="file" onChange={handleFileChange}> />
  //   </div>
  // )
}
