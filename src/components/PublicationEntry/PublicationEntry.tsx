import { Anchor, Text } from "@mantine/core";
import "./PublicationEntry.css";

type PublicationEntryProps = {
  title: string;
  authors: string;
  journal?: string;
  year?: string;
  url?: string | null;
};

export function PublicationEntry({ title, authors, journal, year, url }: PublicationEntryProps) {
  return (
    <div className="publication-entry">
      <h3 className="publication-title">
        {url ? (
          <Anchor href={url} target="_blank" rel="noopener noreferrer" className="publication-link" aria-label={`${title} (opens in new tab)`}>
            {title}
          </Anchor>
        ) : (
          <span className="publication-title-text">{title}</span>
        )}
      </h3>
      {journal && <Text className="publication-journal">{journal}{year ? ` (${year})` : ""}</Text>}
      <Text className="publication-authors">{authors}</Text>
    </div>
  );
}
