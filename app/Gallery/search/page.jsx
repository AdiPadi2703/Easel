import GalleryPage from "../page";

async function Page({ searchParams }) {
  const { username, avatar } = await searchParams;

  return (
    <div>
      <GalleryPage username={username} avatar={avatar} />
    </div>
  );
}

export default Page;
