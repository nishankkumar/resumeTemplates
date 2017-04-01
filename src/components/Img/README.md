# Img component

Component for rendering image tag based on api object.

```
 "promo_image": {
   "alt": "",
   "title": "",
   "caption": "",
   "sizes": {
     "16x9": {
       "tiny": "16x9_tiny/public/968361.jpg?itok=lyCYRzV1",
       "small": "16x9_small/public/968361.jpg?itok=W9DfqmrY",
       "medium": "16x9_medium/public/968361.jpg?itok=RQrzsDdv",
       "large": "16x9_large/public/968361.jpg?itok=YK3YR_KW",
       "full": "16x9_full/public/968361.jpg?itok=CE-cSnjJ"
     },
     "square": {
       "tiny": "square_tiny/public/968361.jpg?itok=iDLgKUlW",
       "small": "square_small/public/968361.jpg?itok=u_KZ7YpB",
       "medium": "square_medium/public/968361.jpg?itok=FLuX-CnM",
       "large": "square_large/public/968361.jpg?itok=4Q6avL-F",
       "full": "square_full/public/968361.jpg?itok=3EJbt6Ls"
     },
     "article": {
       "tiny": "article_tiny/public/968361.jpg?itok=ejCX-WMv",
       "small": "article_small/public/968361.jpg?itok=FpZkEMkz",
       "medium": "article_medium/public/968361.jpg?itok=GKU8zK7a",
       "large": "article_large/public/968361.jpg?itok=QN3-mtAB",
       "full": "article_full/public/968361.jpg?itok=n5I6eYUZ"
     }
   }
  },
```

Example:
```
<Img imgObj={image} type={'article'} size={'small'} />
```
