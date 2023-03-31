


let sizeInBites = 0;
function fileSizes(videos) {
  for (const video in videos) {
    sizeInBites += video.storage_size
  }
}