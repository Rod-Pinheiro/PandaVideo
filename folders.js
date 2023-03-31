import dotenv from "dotenv";
import fs from 'fs';


dotenv.config()

import axios from 'axios';

async function getAllFolders() {
  const options = {
    method: 'GET',
    url: 'https://api-v2.pandavideo.com.br/folders',
    headers: {
      accept: 'application/json',
      Authorization: `${process.env.API_KEY}`
    }
  };
  let folders;
  await axios
    .request(options)
    .then(function (response) {
      folders = response.data.folders;
    })
    .catch(function (error) {
      console.error(error);
    });
  return folders;
}

async function createFolderStructure() {
  if (!fs.existsSync('./cursos')) {
    fs.mkdirSync('./cursos')
  }
  const newFolders = await getAllFolders();
  newFolders.sort((a, b) => a.parent_folder_id === null ? -1 : 1);
  for (const folder of newFolders) {
    if (folder.parent_folder_id === null) {
      if (!fs.existsSync(`./cursos/${folder.name}`)) {
        fs.mkdirSync(`./cursos/${folder.name}`)
      } else {
        console.log(`${folder.name} ja existe`);
      }
    } else {
      const parent = newFolders.find((elem) => folder.parent_folder_id === elem.id);
      if (!fs.existsSync(`./cursos/${parent.name}`)) {
        const granParent = newFolders.find((elem) => elem.id === parent.parent_folder_id);
        fs.mkdirSync(`./cursos/${granParent.name}/${parent.name}/${folder.name}`)
      } else {
        fs.mkdirSync(`./cursos/${parent.name}/${folder.name}`)
      }
    }
  }
}

