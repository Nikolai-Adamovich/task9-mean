import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  getBase64 = getBase64;

  /* https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#implementing-a-custom-upload-adapter */
  base64UploadAdapterPlugin(editor) {
    class Base64UploadAdapter {
      loader: any;

      constructor(loader: {
        file: Promise<File>
      }) {
        this.loader = loader;
      }

      upload() {
        return this.loader.file
          .then((file: File) => new Promise(async (resolve, reject) => {
            const imageUrl = await getBase64(file);

            if (imageUrl) {
              resolve({
                default: imageUrl
              });
            } else {
              reject('Failed to upload image');
            }
          }));
      }

      abort() { }
    }

    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new Base64UploadAdapter(loader);
    };
  }
}

function getBase64(file: File): Promise < string > {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}
