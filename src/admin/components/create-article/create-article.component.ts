import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as slug from 'slug';
import { UserService } from '../../../app/services/user/user.service';
import { IUser } from '../../../app/interfaces/user.interface';
import { IArticle } from '../../../app/interfaces/article.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  private currentUser: IUser | undefined;
  public Editor = ClassicEditor;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((data: IUser | undefined) => {
      this.currentUser = data;
    });
  }

  onFormSubmit() {
    console.log(this.currentUser);
  }

  onTitleInput(createArticleForm: NgForm) {
    // this.article.slug = slug(this.article.title, { lower: true });
    // createArticleForm.controls.slug.touched = true;
    const articleSlug = slug(createArticleForm.controls.title.value, { lower: true });
    createArticleForm.controls.slug.setValue(articleSlug);
  }

}
