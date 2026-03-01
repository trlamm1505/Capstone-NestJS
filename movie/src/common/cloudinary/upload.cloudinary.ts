import cloudinary from './init.cloudinary';

const FOLDER_PHIM = 'phim';

/**
 * Upload media (ảnh / video) lên Cloudinary từ buffer.
 * @returns URL (secure_url) sau khi upload
 */
export async function uploadImageToCloudinary(
  buffer: Buffer,
  mimeType: string,
  folder: string = FOLDER_PHIM,
): Promise<string> {
  const dataUri = `data:${mimeType};base64,${buffer.toString('base64')}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: 'auto',
  });
  return result.secure_url;
}
