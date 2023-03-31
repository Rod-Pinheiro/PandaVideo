import fs from 'fs';
import fetch from 'node-fetch';
import env from 'dotenv'
import csv from 'fast-csv';
env.config()

// const caminho = './cursos/Aulas Antigas/13 a 36 meses'


const apiKey = process.env.API_KEY
const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    Authorization: apiKey
  })
};


export async function downloadVideos(obj, folderPath) {
  for (const video of obj.videos) {
    if (fs.existsSync(`${folderPath}/${video.title}`)) {
      console.log('Video ja existe!')
    } else {
      await download(video, folderPath);

    }
  }
}


async function download(video, folderPath) {

  const response = await fetch(`https://download-us01.pandavideo.com:7443/videos/${video.id}/download`, options)

  if (response.ok) {
    const path = folderPath ? folderPath : process.env.FOLDER;
    console.log(`Iniciando Download do video: ${video.title}`);
    const dest = fs.createWriteStream(`${path}/${video.title.slice(0,-4)}`);
    response.body.pipe(dest).on('finish', () => {
      console.log('Vídeo salvo com sucesso!');
    });
  } else {
    const data = [
      [video.id, video.title, video.folder_id, video.status]
    ]
    
    const ws = fs.createWriteStream('error.csv', {flags: 'a'});
    
    csv
      .write(data, { headers: true })
      .pipe(ws)
      .on('finish', () => console.log('Arquivo CSV gravado com sucesso.'));
    console.error(`Erro ao baixar o vídeo:${video.id}`, response.statusText);
  }

  
  
  
  
}