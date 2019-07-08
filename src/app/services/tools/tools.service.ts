import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private sanitizer: DomSanitizer) { }

  getBase64(file: File): Promise<SafeResourceUrl> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        /* https://github.com/angular/angular/issues/18950#issuecomment-423791125 */
        const srcData: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
        resolve(srcData);
      };
      reader.onerror = error => reject(error);
    });
  }

  /* https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html#implementing-a-custom-upload-adapter */
  base64UploadAdapterPlugin(editor) {
    /* CKEditor doesn't upload SVG */
    const getBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    };

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

