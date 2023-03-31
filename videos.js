import axios from 'axios';
import dotenv from "dotenv";



dotenv.config()

const apiKey = process.env.API_KEY



export async function getVideos(page = 1, folderId =  process.env.ID) {
  const options = {
    method: 'GET',
    url: 'https://api-v2.pandavideo.com.br/videos',
    params: {page: `${page}`, folder_id: folderId},
    headers: {
      accept: 'application/json',
      Authorization: apiKey
    }
  };

  const videos = {
    pages: 0,
    total: 0,
    videos: [],
  }

  await axios
    .request(options)
    .then(function (response) {
      videos.pages = response.data.pages;
      videos.total = response.data.total;
      response.data.videos.forEach(element => {
        videos.videos.push(element);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
  return videos;
}