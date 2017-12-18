import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params)=>{
      console.log('updatedParams', params);
    });


  }

}
