"use client"

import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { addVoice, generateTextToSpeech } from '@/app/api';

const MainSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [voiceName, setVoiceName] = useState<string>('');

  const [voiceId, setVoiceId] = useState('')
  const [isVoiceUploaded, setIsVoiceUploaded] = useState(false)
  const [textToGenerate, setTextToGenerate] = useState('')

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  const togglePlayPause = () => {
    if (selectedFile) {
      if (!audioRef.current) {
        audioRef.current = new Audio(URL.createObjectURL(selectedFile));
      }
  
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
  
      setIsPlaying(!isPlaying);
    }
  };

  const handleVoiceUpload = async () => {
    if (selectedFile && voiceName) {
      try {
        const voiceId = await addVoice(voiceName, selectedFile);
        setIsVoiceUploaded(true)
        setVoiceId(voiceId)
      } catch (error) {
        console.error("Error uploading voice:", error);
      }
    }
  };

  const handleGenerateTextToSpeech = async () => {
    if (isVoiceUploaded && voiceId && textToGenerate) {
      try {
        const audioFile = await generateTextToSpeech(voiceId, textToGenerate);
        console.log("Done : ", audioFile)
        
        if (audioFile && audioRef.current) {
          const blob = new Blob([audioFile], { type: 'audio/mpeg' });
  
          const url = URL.createObjectURL(blob);
  
          console.log(url)

          audioRef.current.src = url;
          audioRef.current.play(); 
        }
      } catch (error) {
        console.error("Error generating text-to-speech:", error);
      }
    }
  };
  
  return (
    <div className="flex flex-col">
      <div className='flex flex-row items-center justify-center'>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-full">
          Insert your audio file here :
        </h4>
        <Input
          id="audio"
          type="file" 
          accept="audio/*"
          className='hover:bg-blue-400 p-1.5'
          onChange={handleFileUpload}
        />
      </div>

      <div className='flex flex-row items-center justify-center mt-5'>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-full">
          Insert your name here :
        </h4>
        <Input
          id="voiceName"
          type="text"
          placeholder="Voice Name"
          value={voiceName}
          onChange={e => setVoiceName(e.target.value)}
      />
      </div>

      {selectedFile && (
        <div className="mt-4">
          <Button className="hover:bg-blue-500 mr-4" onClick={togglePlayPause}>
            {isPlaying ? "Pause Audio" : "Play Audio"}
          </Button>
          <Button className="hover:bg-blue-500" onClick={handleVoiceUpload}>
            Upload Voice
          </Button>
        </div>
      )}

      {isVoiceUploaded && voiceId ? (
        <div className='mt-16'>
           <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Voice uploaded!
            </h2>

            <p className="leading-7 [&:not(:first-child)]:mt-2 border-b pb-2">
              Voice ID : {voiceId}
            </p>


            <div className='mt-10'>
              <Label>Try out your deepfake voice : </Label>
              <Input 
                id="textToGenerate"
                type="text"
                placeholder="Type or paste text here.  The model works best on longer fragments"
                value={textToGenerate}
                onChange={e => setTextToGenerate(e.target.value)}
              />

              <Button onClick={handleGenerateTextToSpeech} className="hover:bg-blue-500 mt-5 w-full">
                Generate
              </Button>

              <div className='mt-5'>
                <audio ref={audioRef} />
              </div>
            </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MainSection;
