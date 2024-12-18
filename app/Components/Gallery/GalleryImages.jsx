export default function GalleryImages(props) {
  return (
    <div className="gallery-images">
      <ul>
        {props.images.map((image, index) => {
          return (
            <li key={index} onClick={() => props.image_on_click(image)}>
              <img src={image.image_url} draggable="false" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
