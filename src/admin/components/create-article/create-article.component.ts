import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent {
  private article = {
    title: '',
    content: ''
  };
  public Editor = ClassicEditor;

  constructor() { }

  onFormSubmit() {
    console.log(this.article.title);
    console.log(this.article.content);
  }

}
