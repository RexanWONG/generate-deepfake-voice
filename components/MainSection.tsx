"use client"

import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { addVoice } from '@/app/api';

const MainSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [voiceName, setVoiceName] = useState<string>('');

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
        console.log("Successfully uploaded voice with ID:", voiceId);
      } catch (error) {
        console.error("Error uploading voice:", error);
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
    </div>
  );
}

export default MainSection;
