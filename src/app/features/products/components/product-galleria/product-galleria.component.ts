import { Component, model } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'buyez-product-galleria',
  imports: [GalleriaModule],
  templateUrl: './product-galleria.component.html',
})
export class ProductGalleriaComponent {
  images = model([]);
  imagesJson = [
    {
      itemImageSrc: 'assets/images/1.jpg',
      thumbnailImageSrc: 'assets/images/1.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: 'assets/images/2.jpg',
      thumbnailImageSrc: 'assets/images/2.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
    {
      itemImageSrc: 'assets/images/3.jpg',
      thumbnailImageSrc: 'assets/images/3.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },

    {
      itemImageSrc: 'assets/images/4.jpg',
      thumbnailImageSrc: 'assets/images/4.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },

    {
      itemImageSrc: 'assets/images/5.jpg',
      thumbnailImageSrc: 'assets/images/5.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1',
    },
  ];

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
}
