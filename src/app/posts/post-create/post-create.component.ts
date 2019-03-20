import  { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html'
})

export class PostCreateComponent implements OnInit {
    newPost = 'NO CONTENT';

    constructor() { }

    onAddPost(postInput: HTMLTextAreaElement){
        console.log(postInput);
        console.dir(postInput);
        this.newPost = postInput.value
    }

    ngOnInit() { }
} 