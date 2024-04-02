import fs from "fs";

export function getFlashDrivePath(): string | null {
  const mediaDir = "/media";

  // find all directories in the media directory
  const mediaDirs = fs.readdirSync(mediaDir);

  // handle no media directories found
  if (mediaDirs.length === 0) {
    console.warn(`no media dirs found in '${mediaDir}'`);

    return null;
  }

  // get the first media directory
  const firstMediaDir = mediaDirs[0];
  const flashDrives = fs.readdirSync(`${mediaDir}/${firstMediaDir}`);

  // handle no flash drives found
  if (flashDrives.length === 0) {
    console.warn(`no flash drives found in '${mediaDir}/${firstMediaDir}'`);

    return null;
  }

  // get the first flash drive and build the capture path
  const flashDrivePath = `${mediaDir}/${firstMediaDir}/${flashDrives[0]}`;
  const capturePath = `${flashDrivePath}/capture`;

  // attempt to create the capture directory
  if (!fs.existsSync(capturePath)) {
    console.log(`attempting to create capture directory '${capturePath}'`);

    fs.mkdirSync(capturePath);
  }

  return capturePath;
}
