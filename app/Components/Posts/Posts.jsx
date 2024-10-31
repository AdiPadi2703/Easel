import React from "react";
import Post from "./Post";
import "./Posts.css";

function Posts() {
  const images = [
    "https://blog.sabrillu.com/wp-content/uploads/2020/11/dscf6574.jpg",
    "https://skyryedesign.com/wp-content/uploads/2024/07/22.jpg",
    "https://ralphparker.wordpress.com/wp-content/uploads/2016/03/03111614292at900.jpg?w=584",
    "https://cdn.shopify.com/s/files/1/0595/4361/7588/files/15._Urban_Sketch_of_European_city_in_ink_with_watercolour.jpg?v=1671425587",
    "https://ralphparker.wordpress.com/wp-content/uploads/2016/06/0528160818a-modified-at900.jpg?w=584",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/85eb85cc-bfdc-437a-9a64-4a54a29fc9bd/d6zqlub-db83d3ea-70d0-47fa-b088-df9dc73d2c07.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg1ZWI4NWNjLWJmZGMtNDM3YS05YTY0LTRhNTRhMjlmYzliZFwvZDZ6cWx1Yi1kYjgzZDNlYS03MGQwLTQ3ZmEtYjA4OC1kZjlkYzczZDJjMDcuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.S-94YC2CDDS6ATWf9S1xZ9swA2XqqaZqgAPchh71YTg",
    "https://d3rf6j5nx5r04a.cloudfront.net/F9XoaT6bmYIIsPpIsymQRaa7rWE=/1120x0/product/b/e/679c1972afbb4b19affcfff0615970ef_opt.jpg",
    "https://assets.artfullywalls.com/works/56936/big-thumb-2023-03-06--2H5oJNmrLHn4yC2m2U4ikidbnTnsuweSblFeeIYWc1kumcCq3__Y58NKKP9Rw14SRFZfh3QIM8ULpnU.jpg",
    "https://a.1stdibscdn.com/a_10411/a_80573821620723611597/Le_portail__master.jpg?width=768",
    "https://i.pinimg.com/736x/fb/31/1b/fb311b0fc380b0eb5009ebe102b04b4d.jpg",
    "https://i.etsystatic.com/11855537/r/il/3d3e69/2973639044/il_fullxfull.2973639044_8ro9.jpg",
    "https://i.pinimg.com/736x/a0/07/f6/a007f6f2de8fbc33af89f50f9459de0f.jpg",
    "https://cdn.pixabay.com/photo/2023/04/05/07/04/portrait-7900797_640.jpg",
    "https://i.etsystatic.com/11855537/r/il/7b331a/3887123545/il_fullxfull.3887123545_cpll.jpg",
    "https://i.etsystatic.com/16500849/r/il/d9227a/2110691797/il_570xN.2110691797_37gl.jpg",
  ];

  return (
    <div className="posts">
      <h1>Posts</h1>
      {images.map((image, index) => {
        return <Post key={index} src={image} />;
      })}
    </div>
  );
}

export default Posts;
