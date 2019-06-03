import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as slug from 'slug';
import { UserService } from '../../../app/services/user/user.service';
import { ToolsService } from '../../../app/services/tools/tools.service';
import { IUser } from '../../../app/interfaces/user.interface';
import { IArticle } from '../../../app/interfaces/article.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  public currentUser: IUser | undefined;
  public editor = ClassicEditor;
  public config = {
    image: {
      toolbar: ['imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],
      styles: [
        'full',
        'alignLeft',
        'alignRight',
      ]
    },
    extraPlugins: [this.toolsService.base64UploadAdapterPlugin],
  };

  constructor(private userService: UserService, private toolsService: ToolsService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((data: IUser | undefined) => {
      this.currentUser = data;
    });
  }

  onFormSubmit(createArticleForm: NgForm) {
    console.log(createArticleForm.value.title);
    console.log(createArticleForm.value.slug);
    console.log(createArticleForm.value.imgUrl);
    console.log(createArticleForm.value.content);
    console.log(this.currentUser.username);
  }

  onTitleInput(createArticleForm: NgForm) {
    const articleSlug = slug(createArticleForm.controls.title.value, { lower: true });
    createArticleForm.controls.slug.setValue(articleSlug);
  }

}
