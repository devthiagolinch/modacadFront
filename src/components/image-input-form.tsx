import { FileVideo, Upload } from "lucide-react";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ChangeEvent, useMemo, useRef, useState } from "react";

import { getFFmpeg } from "../lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

import {api} from "../lib/axios";

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const statusMessages = {
  converting: 'Convertendo....',
  uploading: 'Carregando...',
  generating: 'Transcrevendo...',
  success: 'Finalizado!'
}

interface ImageInputFormProps {
  onVideoUploaded: (id: string) => void
}

export function VideoInputForm(props: ImageInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("waiting")


  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if(!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('converter started')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.png', await fetchFile())

    //ffmpeg.on('log', log => {
    // console.log(log)
    //})

    ffmpeg.on('progress', progress => {
      console.log('convert progress:' + Math.round(progress.progress * 100))
    })

    await ffmpeg.exec([
      '-i',
      'input.png',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.png'
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], {type: 'audio/mpeg'})
    const audioFile = new File([audioFileBlob], 'audio.mp3')

    console.log('Convert fished')

    return audioFile

  }

  async function handleUploadVideo(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()

    const prompt = promptInputRef.current?.value

    if(!videoFile){
      return
    }

    setStatus('converting')

    // converter video em audio
    const audioFile = await convertVideoToAudio(videoFile)


    const data =new FormData()

    data.append('file', audioFile)

    setStatus('uploading')

    const response = await api.post('/videos', data)

    const videoId = response.data.video.id
    console.log(videoId)

    setStatus('generating')

    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    })

    setStatus('success')


    props.onVideoUploaded(videoId)
    
  }

  const previewULR = useMemo(() => {
    if(!videoFile){
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])


  return (
      <form onSubmit={handleUploadVideo} className="space-y-6">
          <label
            htmlFor="video"
            className="border relative flex rodded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5"
          >
            {previewULR ? (
              <video src={previewULR} controls={false} className="pointer-events-none absolute inset-0" />
            ) : (
              <>
                <FileVideo w-4 h-4 />
                Selecione um vídeo
              </>
            )}
          </label>

          <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />

          <Separator />

          <div>
            <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
            <Textarea
              disabled={status != 'waiting'}
              ref={promptInputRef}
              id="transcription_prompt"
              className="h-20 leading-relaxed resize-none"
              placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
            />
          </div>

          <Button disabled={status != 'waiting'} type="submit" className="w-full" >
              {status === 'waiting' ? (
                <>
                  Carregar video
                  <Upload className="w-4 h-4 ml-2" />
                </>
              ) : statusMessages[status]}
          </Button>
      </form>
  )
}