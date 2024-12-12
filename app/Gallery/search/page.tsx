import GalleryPage from "../page";

interface PageProps {
  searchParams: {
    [key: string]: string | string[];
  };
}

async function Page({ searchParams }: PageProps) {
  const { query } = await searchParams;

  return (
    <div>
      <GalleryPage username={query} />
    </div>
  );
}

export default Page;
