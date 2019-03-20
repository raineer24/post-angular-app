import  { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = ''; 
    
    constructor() { }

    onAddPost(){
        const post = {
            title: this.enteredTitle,
            content: this.enteredContent
        };
    }

    ngOnInit() { }
} 