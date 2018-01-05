import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product-service/product.service";
import { Product } from '../../models/product';
import { ErrorHandlerService } from "../../services/error-handler.service";
import { Router, ActivatedRoute } from '@angular/router';
import 'hammerjs';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';





@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  showGallery: boolean = false;
  product: Product = new Product();
  relatedProducts: Array<Product> = new Array<Product>();
  visibleImages = new Array<string>();
  invisibleImages = new Array<string>();


  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = new Array<any>();



  constructor(private route: ActivatedRoute, private productService: ProductService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {



    this.route.params.subscribe((params) => {
      this.productService.getProductById(params.id).then((data) => {
        this.product = data;
        if (this.product.images.length > 0) {
          for (let i = 0; i < this.product.images.length; i++) {
            let instance = {
              small: this.product.images[i],
              medium: this.product.images[i],
              big: this.product.images[i]
            }
            this.galleryImages.push(instance);
          }
          this.setupGallery();
        }

        this.productService.getPorductByCategoryIdWithLimit(this.product.categoryId).then((data) => {
          this.relatedProducts = data;
          console.log(this.relatedProducts);
        }).catch((err) => {
          console.log('err1');
        })
      }).catch((err) => {
        console.log(err);
      });

    });
  }


  setupGallery() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewCloseOnClick: true,
        previewKeyboardNavigation: true,
        thumbnailsArrows: true,
        thumbnailsRemainingCount: true,
        preview: true,
        previewSwipe: true,
        previewCloseOnEsc: true,
        previewInfinityMove: true,
        previewZoom: true,
        previewFullscreen: true
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 70,
        thumbnailsPercent: 100,
        thumbnailsMargin: 0,

      },
      // max-width 400
      {
        breakpoint: 100,
        preview: true,

      }
    ];
    this.showGallery = true;
  }


}
