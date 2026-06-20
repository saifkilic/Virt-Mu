export interface Artifact {
  _id: string;
  museumId: string;
  name: { en: string; ur: string };
  period: { en: string; ur: string };
  description: { en: string; ur: string };
  img: string;
}

export const getArtifactsByMuseum = async (museumId: string): Promise<Artifact[]> => {
  const response = await fetch(`/api/artifacts/museum/${museumId}`);
  if (!response.ok) {
    throw new Error('Network response error');
  }
  return response.json();
};