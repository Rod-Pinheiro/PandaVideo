import readline from "readline-sync"
import { getVideos } from './videos.js';
import { downloadVideos } from './downloadVideo.js'
import { videosByFolder } from "./foldersToDownload.js";

let option = readline.question("Escolha uma opcao: \n 1 - Listar todos os videos \n 2 - listar todas as pastas \n 3 - Baixar videos\n");

switch (option) {
  case "1":
    const response = await getVideos();
    console.log(`Quantidade de videos: ${response.total}`);
    break;
  case "2":
    break;
  case "3":
    videosByFolder.forEach(async element => {
      
      const videos = await getVideos();
      for (let index = 1; index <= videos.pages; index++) {
        const videosByPage = await getVideos(index, element.folderId);
        downloadVideos(videosByPage, element.folderPath)
      }
    });
    break;
  default:
    alert("Opção inválida");
}