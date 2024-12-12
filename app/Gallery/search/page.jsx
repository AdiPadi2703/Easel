import GalleryPage from "../page";

async function Page({ searchParams }) {
  const { query } = await searchParams;

  return (
    <div>
      <GalleryPage username={query} />
    </div>
  );
}

export default Page;

