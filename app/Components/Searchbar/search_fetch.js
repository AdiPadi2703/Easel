"use server";

export async function search_fetch(query) {
  const result = await fetch(
    `https://easel-alpha.vercel.app/api/search-usernames?query=${query}`,
    {
      method: "GET",
      next: {
        revalidate: 30,
      },
    }
  );
  const result_json = await result.json();
  return result_json;
}
