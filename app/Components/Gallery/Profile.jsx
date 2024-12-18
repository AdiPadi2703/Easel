import "./Profile.css";

export default function Profile(props) {
  return (
    <div className="profile-box">
      <div className="profile-avatar">
        <img src={props.metadata.user_avatar} draggable="false" />
      </div>
      <div className="profile-username">{props.metadata.username}</div>

      <div className="total-posts">
        Total Posts: {props.metadata.total_posts}
      </div>
    </div>
  );
}
